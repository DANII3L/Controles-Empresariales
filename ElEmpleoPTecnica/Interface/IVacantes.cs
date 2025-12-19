using ElEmpleoPTecnica.Models;

namespace ElEmpleoPTecnica.Interface;
public interface IVacantes
{
    Task<PagedResult_Model<Vacantes_Model>> FindVacantesAsync();
    Task<Vacantes_Model> CreateVacanteAsync(VacanteCreationRequest model);
    Task<PagedResult_Model<VacanteHabilidades_Model>> FindHabilidadesVacantesAsync(int VacanteId);
}
