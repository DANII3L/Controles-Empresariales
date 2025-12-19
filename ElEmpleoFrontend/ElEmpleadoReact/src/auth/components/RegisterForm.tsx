import { useState } from 'react';
import { useAuth, type User } from '../../contexts/AuthContext';
import { useNotification } from '../../shared/components/useNotification';

interface RegisterFormProps {
  onNavigate: (page: string) => void;
}

const RegisterForm = ({ onNavigate }: RegisterFormProps) => {
  const { notify } = useNotification();
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [rolId, setRolId] = useState<number>(2);
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [industria, setIndustria] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [numeroEmpleados, setNumeroEmpleados] = useState<number | ''>('');

  const esEmpleador = rolId === 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userData: User = {
      
      nombres,
      apellidos,
      email,
      passwordHash: password,
      Telefono: telefono || undefined,
      Estado: true,
      FechaCreacion: new Date().toISOString(),
      FechaNacimiento: fechaNacimiento || undefined,
      Edad: undefined,
      RolId: rolId
    };

    const employerData = esEmpleador
      ? {
        Industria: industria,
        Ubicacion: ubicacion,
        NumeroEmpleados: numeroEmpleados
      }
      : null;

    const res = await register(userData, employerData);

    setLoading(false);
    if (!res.success) {
      notify('Error', res.message, 'error');
    } else {
      onNavigate('home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Crear Cuenta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ROL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de cuenta
            </label>
            <select
              value={rolId}
              onChange={(e) => setRolId(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={2}>Candidato (Busco empleo)</option>
              <option value={1}>Empleador (Publico vacantes)</option>
            </select>
          </div>

          {/* NOMBRES */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombres
            </label>
            <input
              type="text"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nombres"
            />
          </div>

          {/* APELLIDOS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apellidos
            </label>
            <input
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Apellidos"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tu@email.com"
            />
          </div>

          {/* TELÉFONO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono (opcional)
            </label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="3001234567"
            />
          </div>

          {/* FECHA NACIMIENTO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* CONTRASEÑA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {esEmpleador && (
            <>

              {/* INDUSTRIA */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industria
                </label>
                <input
                  type="text"
                  value={industria}
                  onChange={(e) => setIndustria(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Tecnología, Construcción"
                />
              </div>

              {/* UBICACIÓN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>
                <input
                  type="text"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ciudad / País"
                />
              </div>

              {/* NÚMERO DE EMPLEADOS */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de empleados
                </label>
                <input
                  type="number"
                  min={1}
                  value={numeroEmpleados}
                  onChange={(e) =>
                    setNumeroEmpleados(e.target.value ? Number(e.target.value) : '')
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: 50"
                />
              </div>
            </>
          )}

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
