using ElEmpleoPTecnica.Model.Dtos;
using ElEmpleoPTecnica.Models;

namespace ElEmpleoPTecnica.Interface;
public interface IUsuario
{
    Task<Postulaciones_Model_Dto> FindDetalleAplicanteAsync(int UsuarioId);
    Task<PagedResult_Model<ExperienciasLaborales_Model>> CreateExperienciasLaborales(ExperienciasLaborales_Model laborales_Models);
    Task<PagedResult_Model<Estudios_Model>> CreateEstudios(Estudios_Model estudios_Models);
    Task<IEnumerable<ExperienciasLaborales_Model>> FindExperienciasLabAsync(int UsuarioId);
    Task<IEnumerable<Estudios_Model>> FindEstudiosAsync(int UsuarioId);
    Task<User_Model_Dto> FindProfileAsync(int UsuarioId);
}
