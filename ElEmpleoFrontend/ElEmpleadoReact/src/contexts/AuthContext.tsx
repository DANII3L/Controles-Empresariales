import { createContext, useContext, useEffect, useState } from 'react';
import * as segService from '../auth/service/Seg.service';

export interface User {
  id?: number;
  nombres: string;
  apellidos: string;
  email: string;
  rol?: string;
  passwordHash?: string;
  Telefono?: string;
  Estado: boolean;
  FechaCreacion: string;
  FechaNacimiento?: string;
  Edad?: number;
  RolId: number;
  empleadorId?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<any>;
  register: (User: User, employerData?: any) => Promise<any>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);

    const res : any = await segService.login({ email, password });
    if (!res.success || !res.data?.token) {
      setLoading(false);
      return { message: res.message, success: false };
    }

    setUser(res.data.user);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);

    setLoading(false);

    return { message: null, success: true};
  };

  const register = async (userData: User, employerData?: any) => {
    setLoading(true);

    const res : any = await segService.register({ User: userData, Empleador: employerData });
    if (!res.success || !res.data?.token) {
      setLoading(false);
      return { message: res.message, success: false };
    }

    setUser(res.data.user);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);

    setLoading(false);

    return { message: null, success: true};
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
