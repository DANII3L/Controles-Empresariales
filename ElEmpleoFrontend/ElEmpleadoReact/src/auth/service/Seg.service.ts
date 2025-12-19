import { apiService } from '../../shared/services/api.service';

const login = async (credentials: any) => {
  return await apiService.post('Auth/login', credentials);
};

const register = async (data: any) => {
  return await apiService.post('Auth/register', data);
};

export { login, register };