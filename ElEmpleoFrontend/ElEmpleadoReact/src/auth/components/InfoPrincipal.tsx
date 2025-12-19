import React, { useEffect, useState } from 'react';
import * as profileService from '../service/usuario.service';
import { Loader } from 'lucide-react';
import type { User } from '../interfaces/interfacesUser';
import InfoItem from './InfoItem';
import { useAuth } from '../../contexts/AuthContext';

const InfoPrincipalTab: React.FC = () => {
  const [userFind, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await profileService.getProfile(user?.id);
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return <Loader />;

  if (!userFind)
    return <p className="text-gray-500">No se pudo cargar la información.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InfoItem label="Nombres" value={userFind.nombres} />
      <InfoItem label="Apellidos" value={userFind.apellidos} />
      <InfoItem label="Email" value={userFind.email} />
      <InfoItem label="Teléfono" value={userFind.telefono || '—'} />
      <InfoItem label="Edad" value={`${userFind.edad} años`} />
      <InfoItem label="Nacimiento" value={new Date(userFind.fechaNacimiento).toLocaleDateString()} />
      {user?.rol === 'EMPLEADOR' && (
        <>
          <InfoItem label="Ubicación" value={userFind.ubicacion} />
          <InfoItem label="Número Empleados" value={userFind.numeroEmpleados} />
        </>
      )}
    </div>
  );
};

export default InfoPrincipalTab;