using ElEmpleoPTecnica.Interface;
using ElEmpleoPTecnica.Models;
using System.Reflection;

namespace ElEmpleoPTecnica.Services;
public class VacantesService : IVacantes
{
    private readonly IDataService _dataService;
    public VacantesService(IDataService dataService)
    {
        _dataService = dataService;
    }
    public async Task<PagedResult_Model<Vacantes_Model>> FindVacantesAsync()
    {
        var result = await _dataService.EjecutarProcedimientoAsync<Vacantes_Model>("crud_select_vacantes");
        if (!result.Success)
            throw new Exception(result.Message);

        return result;
    }
    public async Task<Vacantes_Model> CreateVacanteAsync(VacanteCreationRequest model)
    {
        var findEmpleador = await _dataService.EjecutarProcedimientoAsync<Vacantes_Model>("crud_select_empleador", new { UsuarioId = model.vacante_Model.EmpleadorId });

        if (!findEmpleador.Success || !findEmpleador.ListFind.Any())
            throw new Exception("Error al buscar empleador: " + findEmpleador.Message);

        model.vacante_Model.EmpleadorId = findEmpleador.ListFind.FirstOrDefault().Id ?? 0;

        var result = await createVacante(model.vacante_Model);
        await createHabilidadesVacante(model.habilidades_Model, result.Id ?? 0);

        return result;
    }

    private async Task<Vacantes_Model> createVacante(Vacantes_Model model)
    {
        var result = await _dataService.EjecutarProcedimientoAsync<Vacantes_Model>("crud_upsert_vacantes", model);

        if (!result.Success)
            throw new Exception(result.Message);

        return result.ListFind.FirstOrDefault();
    }

    private async Task createHabilidadesVacante(IEnumerable<VacanteHabilidades_Model> habilidades_Model, int VacanteId)
    {
        foreach (VacanteHabilidades_Model vac in habilidades_Model)
        {
            vac.VacanteId = VacanteId;
            var result = await _dataService.EjecutarProcedimientoAsync<Vacantes_Model>("crud_upsert_habilidadesVac", vac);

            if (!result.Success)
                throw new Exception(result.Message);
        }
    }

    public async Task<PagedResult_Model<VacanteHabilidades_Model>> FindHabilidadesVacantesAsync(int VacanteId)
    {
        var result = await _dataService.EjecutarProcedimientoAsync<VacanteHabilidades_Model>("crud_select_vacantes_habilidades", new { VacanteId });

        if (!result.Success)
            throw new Exception(result.Message);

        return result;
    }
}
