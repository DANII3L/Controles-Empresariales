import React, { createContext, useContext} from 'react';
import type { ReactNode } from 'react';
import Swal from 'sweetalert2';


interface NotificationContextType {
  notify: (
    title: string,
    message: string,
    type?: 'success' | 'error' | 'info' | 'warning'
  ) => void;

  confirm: (options: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'question' | 'warning';
    confirmColor?: string;
    cancelColor?: string;
  }) => Promise<boolean>;
}
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => { const context = useContext(NotificationContext);
   if (!context) { 
    throw new Error('useNotification must be used within NotificationProvider'); 
  } return context; };

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const notify = (
    title: string,
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
  ) => {
    Swal.fire({
      title,
      text: message,
      icon: type,
      confirmButtonColor: '#f97316', // naranja
    });
  };

  const confirm = async ({
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    type = 'question',
    confirmColor = '#16a34a', // green-600
    cancelColor = '#6b7280',  // gray-500
  }: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'question' | 'warning';
    confirmColor?: string;
    cancelColor?: string;
  }): Promise<boolean> => {
    const result = await Swal.fire({
      title,
      text: message,
      icon: type,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      confirmButtonColor: confirmColor,
      cancelButtonColor: cancelColor,
    });

    return result.isConfirmed;
  };

  return (
    <NotificationContext.Provider value={{ notify, confirm }}>
      {children}
    </NotificationContext.Provider>
  );
};

