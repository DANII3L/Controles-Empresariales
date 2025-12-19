import React, { useState } from 'react';
import { useNotification } from '../shared/components/useNotification';
import * as vacService from './service/vacantes.service';
import * as posService from './service/postulaciones.service';
import { useAuth } from '../contexts/AuthContext';

interface Vacante {
  id?: number;
  titulo: string;
  descripcion: string;
  nivelEducativoRequerido?: string;
  experienciaMinima?: number;
  ubicacion: string;
  empleadorId?: number;
  fechaPublicacion?: string;
  nombreEmpresa?: string;
}

interface ExperienciaLaboral {
  id: number;
  empresa: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
}

interface Estudio {
  id: number;
  institucion: string;
  fechaInicial: string;
  fechaFinal: string;
  descripcion: string;
}

interface Aplicante {
  id: number;
  email: string;
  telefono: string;
  edad: number;
  experienciaAnios: number;
  vacanteId: number;
  usuarioId: number;
}

interface VacanteHabilidades {
  id: number;
  nombre: string;
}

interface ModalVacantesProps {
  tipo: 'aplicantes' | 'registrar' | 'detalle';
  open: boolean;
  vacante: Vacante | null;
  onClose: () => void;
}

const ModalVacantes: React.FC<ModalVacantesProps> = ({
  tipo,
  open,
  vacante,
  onClose,
}) => {
  if (!open) return null;
  const { notify } = useNotification();
  const [aplicantes, setAplicantes] = useState<Aplicante[]>([]);
  const { user } = useAuth();
  const [habilidadInput, setHabilidadInput] = React.useState('');
  const [habilidades, setHabilidades] = React.useState<VacanteHabilidades[]>([]);
  const [experiencias, setExperiencias] = React.useState<ExperienciaLaboral[]>([]);
  const [estudios, setEstudios] = React.useState<Estudio[]>([]);

  const addHabilidades = () => {
    if (!habilidadInput.trim()) return;

    const nuevas = habilidadInput
      .split(',')
      .map(h => h.trim())
      .filter(h => h.length > 0)
      .filter(h => !habilidades.some(x => x.nombre.toLowerCase() === h.toLowerCase()))
      .map(h => ({
        id: Date.now() + Math.random(),
        nombre: h,
      }));

    setHabilidades(prev => [...prev, ...nuevas]);
    setHabilidadInput('');
  };

  const removeHabilidad = (id: number) => {
    setHabilidades(prev => prev.filter(h => h.id !== id));
  };

  const loadAplicantes = async () => {
    if (!vacante?.id) return;

    try {
      const res: any = await posService.postulaciones(vacante.id);

      if (!res.success) {
        notify('Error', 'No fue posible cargar los postulados', 'error');
        return;
      }
      setAplicantes(res.data.listFind && Array.isArray(res.data.listFind) ? res.data.listFind : []);
    } catch (error) {
      notify(
        'Error',
        'Ocurrió un error al cargar los postulados',
        'error'
      );
    }
  };

  const loadDetalle = async () => {
    if (!vacante?.id) return;

    try {
      const res: any = await vacService.findHabilidades(vacante.id);

      if (!res.success) {
        notify('Error', 'No fue posible cargar las habilidades de la vacante.', 'error');
        return;
      }
      setHabilidades(res.data.listFind && Array.isArray(res.data.listFind) ? res.data.listFind : []);
    } catch (error) {
      notify(
        'Error',
        'Ocurrió un error al buscar las habilidades de la vacante',
        'error'
      );
    }
  };

  React.useEffect(() => {
    if (open && tipo === 'aplicantes' && vacante?.id) {
      loadAplicantes();
      setAplicanteSeleccionado(null);
    } else if (open && tipo === 'detalle' && vacante?.id) {
      loadDetalle();
    }

    if (!open) {
      setAplicantes([]);
      setAplicanteSeleccionado(null);
    }
  }, [open, tipo, vacante?.id]);
  const [formVacante, setFormVacante] = useState<Vacante>({
    titulo: '',
    descripcion: '',
    nivelEducativoRequerido: '',
    experienciaMinima: 0,
    ubicacion: '',
  });

  const handleChangeVacante = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormVacante(prev => ({
      ...prev,
      [name]: name === 'experienciaMinima' ? Number(value) : value,
    }));
  };

  const handlerCreateVacante = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formVacante.titulo ||
      !formVacante.descripcion ||
      !formVacante.nivelEducativoRequerido ||
      !formVacante.ubicacion
    ) {
      notify(
        'Campos requeridos',
        'Por favor complete todos los campos obligatorios',
        'warning'
      );
      return;
    }

    try {
      const vacante_Model = {
        Titulo: formVacante.titulo,
        Descripcion: formVacante.descripcion,
        NivelEducativoRequerido: formVacante.nivelEducativoRequerido,
        Ubicacion: formVacante.ubicacion,
        EmpleadorId: user?.id,
        ExperienciaMinima: Number(formVacante.experienciaMinima)
      };

      const modelRegister = { vacante_Model, habilidades_Model: habilidades };

      const res: any = await vacService.createVacante(modelRegister);

      if (!res.success) {
        notify('Error', `No fue posible crear la vacante: ${res.message || 'Error desconocido'}, intente nuevamente`, 'error');
        return;
      }

      notify('Vacante creada', 'La vacante fue registrada correctamente', 'success');

      onClose();
    } catch (error) {
      notify(
        'Error',
        'No fue posible crear la vacante, intente nuevamente',
        'error'
      );
    }
  };

  const [aplicanteSeleccionado, setAplicanteSeleccionado] =
    React.useState<Aplicante | null>(null);

  const localidades = [
    'Bogotá',
    'Medellín',
    'Cali',
    'Barranquilla',
    'Cartagena',
    'Remoto'
  ];

  const loadDetallesAplicante = async (a: Aplicante) => {
    if (!a?.usuarioId) {
      setEstudios([]);
      setExperiencias([]);
      return;
    }

    try {
      const usuarioId = a?.usuarioId;
      console.log(a)
      const resEstudios: any = await vacService.detalleAplicante(usuarioId);

      if (!resEstudios.success) {
        notify('Error', 'No fue posible cargar las habilidades de la vacante.', 'error');
        return;
      }
      setExperiencias(resEstudios.data.experiencias && Array.isArray(resEstudios.data.experiencias) ? resEstudios.data.experiencias : []);
      setEstudios(resEstudios.data.estudios && Array.isArray(resEstudios.data.estudios) ? resEstudios.data.estudios : []);

    } catch (error) {
      notify(
        'Error',
        'Ocurrió un error al buscar las habilidades de la vacante',
        'error'
      );
    }
  };

  function parseFecha(fecha: string | undefined): Date | null {
    if (!fecha) return null;

    const limpia = fecha
      .replace(/\u202F/g, ' ')
      .replace('a. m.', 'AM')
      .replace('p. m.', 'PM');

    const [fechaParte, horaParte, ampm] = limpia.split(' ');
    const [day, month, year] = fechaParte.split('/').map(Number);
    const [hour, minute, second] = horaParte.split(':').map(Number);

    let horas = hour;
    if (ampm === 'PM' && horas < 12) horas += 12;
    if (ampm === 'AM' && horas === 12) horas = 0;

    return new Date(year, month - 1, day, horas, minute, second);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">

        {/* HEADER */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {tipo === 'registrar' && 'Registrar nueva vacante'}
            {tipo === 'aplicantes' && `Postulados – ${vacante?.titulo}`}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-4 overflow-y-auto flex-1">

          {/* ===================== APLICANTES ===================== */}
          {tipo === 'aplicantes' && (
            <>
              {aplicantes.length === 0 ? (
                <p className="text-gray-500">No hay postulados aún.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-md">
                    <thead className="bg-gray-100">
                      <tr className="text-sm text-gray-700">
                        <th className="px-3 py-2 text-left">Email</th>
                        <th className="px-3 py-2 text-left">Teléfono</th>
                        <th className="px-3 py-2 text-center">Edad</th>
                        <th className="px-3 py-2 text-center">Años de Experiencia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aplicantes.map(a => (
                        <tr
                          key={a.id}
                          onClick={() => {
                            setAplicanteSeleccionado(a);
                            loadDetallesAplicante(a);
                          }}
                          className={`
                          border-t text-sm cursor-pointer
                          hover:bg-blue-50
                          ${aplicanteSeleccionado?.id === a.id ? 'bg-blue-100' : ''}
                        `}
                        >
                          <td className="px-3 py-2">{a.email}</td>
                          <td className="px-3 py-2">{a.telefono}</td>
                          <td className="px-3 py-2 text-center">{a.edad}</td>
                          <td className="px-3 py-2 text-center">
                            {a.experienciaAnios} años
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              )}

              {aplicanteSeleccionado && (
                <div className="mt-6 border-t pt-4">
                  {/* Header del detalle */}
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      Detalle del postulante
                    </h4>

                    <button
                      onClick={() => setAplicanteSeleccionado(null)}
                      className="
          inline-flex items-center gap-1
          text-sm font-lower
          text-red-600 hover:text-red-700
          border border-red-200 hover:border-red-300
          px-3 py-1.5 rounded-md
          transition
        "
                    >
                      ✕
                    </button>
                  </div>

                  {/* INFO GENERAL */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{aplicanteSeleccionado.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <p className="font-medium">{aplicanteSeleccionado.telefono}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Edad</p>
                      <p className="font-medium">{aplicanteSeleccionado.edad}</p>
                    </div>
                  </div>

                  {/* EXPERIENCIAS */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-700 mb-2">
                      Experiencia laboral
                    </h5>

                    <table className="w-full border rounded-md text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left">Empresa</th>
                          <th className="px-3 py-2">Desde</th>
                          <th className="px-3 py-2">Hasta</th>
                          <th className="px-3 py-2 text-left">Descripción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {experiencias.map(exp => (
                          <tr key={exp.id} className="border-t">
                            <td className="px-3 py-2">{exp.empresa}</td>
                            <td className="px-3 py-2 text-center">
                              {(() => {
                                const fecha = parseFecha(exp.fechaInicio);
                                return fecha
                                  ? fecha.toLocaleDateString('es-CO')
                                  : 'No disponible';
                              })()}
                            </td>
                            <td className="px-3 py-2 text-center">
                              {(() => {
                                const fecha = parseFecha(exp.fechaFin);
                                return fecha
                                  ? fecha.toLocaleDateString('es-CO')
                                  : 'Actualidad';
                              })()}
                            </td>
                            <td className="px-3 py-2">{exp.descripcion}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* ESTUDIOS */}
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2">
                      Estudios
                    </h5>

                    <table className="w-full border rounded-md text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left">Institución</th>
                          <th className="px-3 py-2">Desde</th>
                          <th className="px-3 py-2">Hasta</th>
                          <th className="px-3 py-2 text-left">Descripción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {estudios.map(est => (
                          <tr key={est.id} className="border-t">
                            <td className="px-3 py-2">{est.institucion}</td>
                            <td className="px-3 py-2 text-center">
                              {(() => {
                                const fecha = parseFecha(est.fechaInicial);
                                return fecha
                                  ? fecha.toLocaleDateString('es-CO')
                                  : 'No disponible';
                              })()}
                            </td>
                            <td className="px-3 py-2 text-center">
                              {(() => {
                                const fecha = parseFecha(est.fechaFinal);
                                return fecha
                                  ? fecha.toLocaleDateString('es-CO')
                                  : 'Actualidad';
                              })()}
                            </td>
                            <td className="px-3 py-2">{est.descripcion}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ===================== REGISTRAR VACANTE ===================== */}
          {tipo === 'registrar' && (
            <form onSubmit={handlerCreateVacante} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Título
                </label>
                <input
                  name="titulo"
                  value={formVacante.titulo}
                  onChange={handleChangeVacante}
                  placeholder="Título"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Descripcion
                </label>
                <textarea
                  name="descripcion"
                  value={formVacante.descripcion}
                  onChange={handleChangeVacante}
                  placeholder="Descripción"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Ubicación
                </label>
                <select
                  name="ubicacion"
                  value={formVacante.ubicacion}
                  onChange={handleChangeVacante}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Seleccione una ciudad</option>
                  {localidades.map(localidad => (
                    <option key={localidad} value={localidad}>
                      {localidad}
                    </option>
                  ))}
                </select>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nivel Educativo
                  </label>
                  <select
                    name="nivelEducativoRequerido"
                    value={formVacante.nivelEducativoRequerido}
                    onChange={handleChangeVacante}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Seleccione nivel educativo</option>
                    <option value="TECNICO">Técnico</option>
                    <option value="TECNOLOGO">Tecnólogo</option>
                    <option value="PROFESIONAL">Profesional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Experiencia Mínima (años)
                  </label>
                  <input
                    type="number"
                    name="experienciaMinima"
                    value={formVacante.experienciaMinima}
                    onChange={handleChangeVacante}
                    className="w-full border rounded px-3 py-2"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Habilidades requeridas
                </label>

                <input
                  type="text"
                  placeholder="Ej: React, SQL, .NET"
                  value={habilidadInput}
                  onChange={e => setHabilidadInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addHabilidades();
                    }
                  }}
                  className="w-full border rounded px-3 py-2"
                />

                <button
                  type="button"
                  onClick={addHabilidades}
                  className="mt-2 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  Agregar
                </button>

                {/* Nuggets */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {habilidades.map(h => (
                    <span
                      key={h.id}
                      className="
          inline-flex items-center gap-1
          bg-blue-100 text-blue-700
          px-3 py-1 rounded-full text-sm
        "
                    >
                      {h.nombre}
                      <button
                        type="button"
                        onClick={() => removeHabilidad(h.id)}
                        className="text-blue-500 hover:text-blue-700 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Guardar Vacante
              </button>
            </form>
          )}

          {/* ===================== HABILIDADES VACANTE ===================== */}
          {tipo === 'detalle' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Habilidades Requeridas</h3>
              <>
                {habilidades.length === 0 ? (
                  <p className="text-gray-500">No hay habilidades requeridas inscritas.</p>
                ) : (
                  <ul className="list-disc list-inside">
                    {
                      habilidades.map((habilidad, index) => (
                        <li key={index}>{habilidad.nombre}</li>
                      ))
                    }
                  </ul>
                )}
              </>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ModalVacantes;
