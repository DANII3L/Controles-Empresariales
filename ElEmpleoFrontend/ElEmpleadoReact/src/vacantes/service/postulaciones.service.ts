import { apiService } from '../../shared/services/api.service';

const postulaciones = async (VacanteId: any) => {
  return await apiService.get('Postulaciones', { VacanteId });
};

const createPostulaciones = async (Postulaciones : any) => {
  return await apiService.post('Postulaciones', Postulaciones);
};

export { createPostulaciones, postulaciones };