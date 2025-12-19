import React, { useEffect, useState } from 'react';
import * as usuarioService from '../service/usuario.service';
import { Loader, Plus, X } from 'lucide-react';
import type { ExperienciaLaboral } from '../interfaces/interfacesUser';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../shared/components/useNotification';

const ExperienciasTab: React.FC = () => {
  const { user } = useAuth();
  const [experiencias, setExperiencias] = useState<ExperienciaLaboral[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { notify } = useNotification();
  const [form, setForm] = useState<ExperienciaLaboral | null>(null);

  useEffect(() => {
    const loadExperiencias = async () => {
      try {
        const res = await usuarioService.getExperienciasByUser(user?.id);
        setExperiencias(res.data);
      } catch {
        setExperiencias([]);
      } finally {
        setLoading(false);
      }
    };

    loadExperiencias();
  }, []);

  useEffect(() => {
    if (user?.id) {
      setForm({
        usuarioId: user.id,
        empresa: '',
        cargo: '',
        fechaInicio: '',
        fechaFin: null,
        descripcion: ''
      });
    }
  }, [user]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev!,
      [name]: value
    }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await usuarioService.createExperiencialab(form);
      if (!res.success) {
        notify('Error', `Error en registro de experiencia ${res.Message}`, 'error');
        return;
      }

      setExperiencias(res.data.listFind);
      setShowForm(false);
      setForm({
        usuarioId: user?.id ?? 0,
        empresa: '',
        cargo: '',
        fechaInicio: '',
        fechaFin: null,
        descripcion: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

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
        <form onSubmit={handleSubmit} className="border rounded-md p-4 space-y-3">
          <input
            name="empresa"
            placeholder="Empresa"
            className="w-full border rounded px-3 py-2"
            value={form?.empresa}
            onChange={handleChange}
            required
          />

          <input
            name="cargo"
            placeholder="Cargo"
            className="w-full border rounded px-3 py-2"
            value={form?.cargo}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              name="fechaInicio"
              className="border rounded px-3 py-2"
              value={form?.fechaInicio}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="fechaFin"
              className="border rounded px-3 py-2"
              value={form?.fechaFin || ''}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="descripcion"
            placeholder="Descripción"
            className="w-full border rounded px-3 py-2"
            value={form?.descripcion ?? ''}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Guardar experiencia
          </button>
        </form>
      )}

      {/* Lista */}
      {experiencias.length === 0 ? (
        <p className="text-gray-500">No hay experiencias registradas.</p>
      ) : (
        experiencias.map(exp => (
          <div key={exp.id} className="border rounded-md p-4">
            <h4 className="font-semibold">
              {exp.cargo} – {exp.empresa}
            </h4>
            <p className="text-sm text-gray-600">
              {(() => {
                const fecha = parseFecha(exp.fechaInicio);
                return fecha
                  ? fecha.toLocaleDateString('es-CO')
                  : 'No disponible';
              })()} - {(() => {
                const fecha = parseFecha(exp?.fechaFin);
                return fecha
                  ? fecha.toLocaleDateString('es-CO')
                  : 'Actualidad';
              })()}
            </p>
            {exp.descripcion && (
              <p className="mt-2 text-sm">{exp.descripcion}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ExperienciasTab;
