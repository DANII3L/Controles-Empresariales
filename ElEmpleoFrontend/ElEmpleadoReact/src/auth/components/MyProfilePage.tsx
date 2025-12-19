import React, { useState } from 'react';
import TabButton from './TabButton';
import EstudiosTab from './EstudiosTab';
import ExperienciaTab from './ExperienciasTab';
import InfoPrincipalTab from './InfoPrincipal';
import { useAuth } from '../../contexts/AuthContext';

type TabType = 'info' | 'estudios' | 'experiencia';

const MyProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow">

        {/* HEADER */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            Mi Perfil
          </h2>
        </div>

        {/* TABS */}
        <div className="flex border-b px-6">
          <TabButton label="Información" active={activeTab === 'info'} onClick={() => setActiveTab('info')} />
          {user?.rol === 'DEMANDANTE' && (
            <>
              <TabButton label="Estudios" active={activeTab === 'estudios'} onClick={() => setActiveTab('estudios')} />
              <TabButton label="Experiencia" active={activeTab === 'experiencia'} onClick={() => setActiveTab('experiencia')} />
            </>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {activeTab === 'info' && <InfoPrincipalTab />}
          {activeTab === 'estudios' && <EstudiosTab />}
          {activeTab === 'experiencia' && <ExperienciaTab />}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
