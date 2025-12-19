import React, { useEffect, useState } from 'react';
import * as estudiosService from '../service/usuario.service';
import { Loader, Plus, X } from 'lucide-react';
import type { Estudio } from '../interfaces/interfacesUser';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../shared/components/useNotification';

const EstudiosTab: React.FC = () => {
  const [estudios, setEstudios] = useState<Estudio[]>([]);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotification();
  const [showForm, setShowForm] = useState(false);
  const [nuevoEstudio, setNuevoEstudio] = useState<Partial<Estudio>>({
    institucion: '',
    fechaInicial: '',
    fechaFinal: '',
    descripcion: ''
  });
  const [saving, setSaving] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const loadEstudios = async () => {
      try {
        const res = await estudiosService.getEstudiosByUser(user?.id);
        if (!res.success) {
          notify('Error', `Error en carga de estudios ${res.Message}`, 'error');
          return;
        }
        setEstudios(res.data);
      } catch {
        setEstudios([]);
      } finally {
        setLoading(false);
      }
    };
    loadEstudios();
  }, [user?.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNuevoEstudio(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    if (!nuevoEstudio.institucion || !nuevoEstudio.fechaInicial) return;

    setSaving(true);
    try {
      const res = await estudiosService.createEstudios({
        ...nuevoEstudio,
        usuarioId: user?.id
      } as Estudio);

      if (!res.success) {
        notify('Error', `Error en carga de estudios ${res.Message}`, 'error');
        return;
      }

      setShowForm(false);
      setEstudios(res.data.listFind);
      setNuevoEstudio({ institucion: '', fechaInicial: '', fechaFinal: '', descripcion: '' });
    } catch (error) {
      console.error('Error al agregar estudio', error);
    } finally {
      setSaving(false);
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

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      {/* Botón agregar */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
      >
        {showForm ? <X size={16} /> : <Plus size={16} />}
        {showForm ? 'Cancelar' : 'Agregar experiencia'}
      </button>

      {/* Formulario */}
      {showForm && (
        <>
          {/* Formulario para agregar estudio */}
          <div className="border rounded-md p-4 space-y-2">
            <h4 className="font-semibold">Agregar nuevo estudio</h4>
            <input
              type="text"
              name="institucion"
              placeholder="Institución"
              value={nuevoEstudio.institucion}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
            <input
              type="date"
              name="fechaInicial"
              placeholder="Fecha inicio"
              value={nuevoEstudio.fechaInicial}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
            <input
              type="date"
              name="fechaFinal"
              placeholder="Fecha fin"
              value={nuevoEstudio.fechaFinal || ''}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
            <textarea
              name="descripcion"
              placeholder="Descripción"
              value={nuevoEstudio.descripcion ?? ''}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={saving}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Agregar'}
            </button>
          </div>
        </>
      )}

      {/* Lista de estudios */}
      {estudios.length === 0 ? (
        <p className="text-gray-500">No hay estudios registrados.</p>
      ) : (
        estudios.map(e => (
          <div key={e.id} className="border rounded-md p-4">
            <h4 className="font-semibold">{e.institucion}</h4>
            <p className="text-sm text-gray-600">
              {(() => {
                const fecha = parseFecha(e.fechaInicial);
                return fecha
                  ? fecha.toLocaleDateString('es-CO')
                  : 'No disponible';
              })()} - {(() => {
                const fecha = parseFecha(e?.fechaFinal);
                return fecha
                  ? fecha.toLocaleDateString('es-CO')
                  : 'Actualidad';
              })()}
            </p>
            {e.descripcion && <p className="mt-2 text-sm">{e.descripcion}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default EstudiosTab;
