import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const HeaderSection = ({ onNavigate, currentPage }: HeaderProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <span className="text-xl font-bold text-white">El Empleo P Técnica</span>
        </div>

        <div className="flex gap-8">
          <button
            onClick={() => onNavigate('home')}
            className={`text-sm font-semibold hover:text-blue-400 transition-colors ${currentPage === 'home' ? 'text-blue-400' : 'text-white'
              }`}
          >
            Inicio
          </button>
          
            <button
              onClick={() => onNavigate('vacantes')}
              className={`text-sm font-semibold hover:text-blue-400 transition-colors ${currentPage === 'vacantes' ? 'text-blue-400' : 'text-white'
                }`}
            >
             {user?.rol === 'EMPLEADOR' && ( <>Mis Vacantes</>) || (<>Vacantes Disponibles</>)}
            </button>
          
          {user?.rol === 'DEMANDANTE' && (
            <>
              <button
                onClick={() => onNavigate('my-applications')}
                className={`text-sm font-semibold hover:text-blue-400 transition-colors ${currentPage === 'my-applications' ? 'text-blue-400' : 'text-white'
                  }`}
              >
                Mis Postulaciones
              </button>
            </>
          )}
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-4">
               <button
                onClick={() => onNavigate('my-profile')}
                className={`text-sm font-semibold hover:text-blue-400 transition-colors ${currentPage === 'my-profile' ? 'text-blue-400' : 'text-white'
                  }`}
              >
                {user.nombres} {user.apellidos}
              </button>
              <button
                onClick={logout}
                className="text-sm font-semibold text-white hover:text-blue-400 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="text-sm font-semibold text-white hover:text-blue-400 transition-colors"
            >
              Iniciar Sesión
            </button>
          )}
        </div>

      </nav>
    </header>
  );
};

export default HeaderSection;
