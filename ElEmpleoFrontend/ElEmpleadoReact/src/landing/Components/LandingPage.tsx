import { Briefcase, Users, Building2, CheckCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface HomePageProps {
  onNavigate: (page: string) => void
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Encuentra tu próximo trabajo
            <span className="block text-blue-600 mt-2">o el talento perfecto</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Esto es una prueba técnica de desarrollo de Controles Empresariales.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ¿Por qué elegir El Empleo P Técnica?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Miles de Vacantes
              </h3>
              <p className="text-gray-600">
                Sub titulo de vacantes nro 1.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Talento Calificado
              </h3>
              <p className="text-gray-600">
                 Sub titulo de vacantes nro 2.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Building2 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Empresas Verificadas
              </h3>
              <p className="text-gray-600">
                 Sub titulo de vacantes nro 3.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Para Candidatos
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    Busca y aplica a múltiples vacantes con un solo perfil
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    Accede a información detallada de cada puesto
                  </span>
                </li>
              </ul>
              {!user && (
                <button
                  onClick={() => onNavigate('signup')}
                  className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Crear Cuenta de Candidato
                </button>
              )}
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Para Empleadores
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    Publica vacantes en minutos y alcanza miles de candidatos
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    Gestiona todas las aplicaciones desde un solo panel
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    Filtra y marca candidatos destacados fácilmente
                  </span>
                </li>
              </ul>
              {!user && (
                <button
                  onClick={() => onNavigate('signup')}
                  className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Crear Cuenta de Empleador
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage