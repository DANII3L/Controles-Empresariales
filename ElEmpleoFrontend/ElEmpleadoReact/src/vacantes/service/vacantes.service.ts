import { apiService } from '../../shared/services/api.service';

const findVacantes = async () => {
  return await apiService.get('Vacantes');
};

const createVacante = async (vacante: any) => {
  return await apiService.post('Vacantes', vacante);
};

const findHabilidades = async (VacanteId: any) => {
  return await apiService.get('Vacantes/HabilidadesVac', {VacanteId} );
};

const detalleAplicante = async (UsuarioId: any) => {
  return await apiService.get('Usuario/DetalleUsuario', {UsuarioId});
};

export { findVacantes, createVacante, findHabilidades, detalleAplicante};