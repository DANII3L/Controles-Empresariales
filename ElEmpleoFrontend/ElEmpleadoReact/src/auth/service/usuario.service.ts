import { apiService } from '../../shared/services/api.service';

const getEstudiosByUser = async (usuarioId: any) => {
  return await apiService.get('Usuario/EstudiosUsuario', { usuarioId });
};

const getExperienciasByUser = async (usuarioId: any) => {
  return await apiService.get('Usuario/ExperienciasLaborales', { usuarioId });
};

const getProfile = async (usuarioId: any) => {
  return await apiService.get('Usuario/Profile', { usuarioId });
};

const createExperiencialab = async (experiencias: any) => {
  return await apiService.post('Usuario/CrearExperienciasLaboralesUsuario', experiencias);
};

const createEstudios = async (estudios: any) => {
  return await apiService.post('Usuario/CrearEstudiosUsuario', estudios);
};


export { getEstudiosByUser, getExperienciasByUser, getProfile, createExperiencialab, createEstudios };