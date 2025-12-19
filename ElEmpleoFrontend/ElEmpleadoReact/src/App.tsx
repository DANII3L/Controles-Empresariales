import { useState } from 'react'
import LandingPage from './landing/Components/LandingPage'
import HeaderSection from './landing/Components/HeaderSection'
import { useAuth } from './contexts/AuthContext'
import LoginForm from './auth/components/LoginForm'
import RegisterForm from './auth/components/RegisterForm'
import VacantesPage from './vacantes/VacantesPage'
import MyProfilePage from './auth/components/MyProfilePage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    const { loading, user } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Cargando...</p>
          </div>
        </div>
      );
    }

    if (!user && (currentPage === 'my-applications' || currentPage === 'vacantes')) {
      return <LoginForm onNavigate={handleNavigate} />;
    }

    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginForm onNavigate={handleNavigate} />;
      case 'signup':
        return <RegisterForm onNavigate={handleNavigate} />;
      case 'my-profile':
        return <MyProfilePage />;
      case 'vacantes':
        return <VacantesPage />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'login' && currentPage !== 'signup' && (
        <HeaderSection onNavigate={handleNavigate} currentPage={currentPage} />
      )}
      {renderPage()}
    </div>
  )
}

export default App