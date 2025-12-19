import axios from 'axios';
import { } from '../../contexts/AuthContext';
import { navigationService } from './navigation.service';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/* =======================
   REQUEST INTERCEPTOR
======================= */
api.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData && config.headers) {
        delete config.headers['Content-Type'];
    }

    return config;
});

const handleUnauthorized = () => {
  console.log('Usuario no autorizado, cerrando sesión...');
  
  setTimeout(() => {
    navigationService.navigate('/');
  }, 1000);
};

/* =======================
   RESPONSE INTERCEPTOR
======================= */
api.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        const status = error.response?.status;
        const url = error.config?.url || '';

        if (status === 401) {
            if (!url.includes('Auth/login')) {
                handleUnauthorized();
            }
        } else if (status === 403) {
            console.error('No tienes permisos para realizar esta acción', 'Acceso Denegado');
        } else if (status === 404) {
            console.error('El recurso solicitado no existe', 'No Encontrado');
        } else if (status >= 500) {
            console.error('Ha ocurrido un error interno del servidor', 'Error del Servidor');
        }

        return Promise.reject(error);
    }
);

function normalizeError(error: any) {
  const res = error?.response;
  const data = res?.data;

  let message =
    typeof data === 'string'
      ? data
      : data?.error ||
        data?.message ||
        data?.title ||
        error?.message ||
        'Error desconocido';

  const validationErrors =
    data?.errors && typeof data.errors === 'object'
      ? data.errors
      : null;

  if (validationErrors) {
    const msgs = Object.entries(validationErrors)
      .flatMap(([field, errs]) =>
        Array.isArray(errs) ? errs.map(e => `${field}: ${e}`) : []
      );

    if (msgs.length) {
      message = msgs.join(', ');
    }
  }

  return {
    data: data ?? null,
    message,
    success: data?.success ?? false,
    status: res?.status ?? 500,
    validationErrors
  };
}


/* =======================
   API SERVICE
======================= */
export const apiService = {
    get: async(url: string, params?: any) => {
        const res = await api.get(url, { params });
        return res.data;
    },

    post: async(url: string, data?: any) => {
        try {
            const res = await api.post(url, data);
            return res.data;
        } catch (error : any) {
            return normalizeError(error);
        }
    },

    put: async (url: string, data?: any) => {
        const res = await api.put(url, data);
        return res.data;
    },

    delete: async(url: string) => {
        const res = await api.delete(url);
        return res.data;
    },
};
