using ElEmpleoPTecnica.Interface;
using ElEmpleoPTecnica.Model.Dtos;
using ElEmpleoPTecnica.Models;

namespace ElEmpleoPTecnica.Services;
public class UsuarioService : IUsuario
{
    public readonly IDataService _dataService;
    public UsuarioService(IDataService dataService)
    {
        _dataService = dataService;
    }

    public async Task<Postulaciones_Model_Dto> FindDetalleAplicanteAsync(int UsuarioId)
    {
        var experiencias = await FindExperienciasLabAsync(UsuarioId);
        var estudios = await FindEstudiosAsync(UsuarioId);
        var result = new Postulaciones_Model_Dto();
        result.estudios = estudios;
        result.experiencias = experiencias;
        return result;
    }

    public async Task<IEnumerable<Estudios_Model>> FindEstudiosAsync(int UsuarioId)
    {
        var estudiosResult = await _dataService.EjecutarProcedimientoAsync<Estudios_Model>("crud_select_estudios", new { UsuarioId });
        if (!estudiosResult.Success)
            throw new Exception(estudiosResult.Message);

        return estudiosResult.ListFind;
    }

    public async Task<IEnumerable<ExperienciasLaborales_Model>> FindExperienciasLabAsync(int UsuarioId)
    {
        var experienciasResult = await _dataService.EjecutarProcedimientoAsync<ExperienciasLaborales_Model>("crud_select_experiencias_laborales", new { UsuarioId });
        if (!experienciasResult.Success)
            throw new Exception(experienciasResult.Message);

        return experienciasResult.ListFind;
    }

    public async Task<PagedResult_Model<ExperienciasLaborales_Model>> CreateExperienciasLaborales(ExperienciasLaborales_Model laborales_Models)
    {
        var experienciasResult = await _dataService.EjecutarProcedimientoAsync<ExperienciasLaborales_Model>("crud_upsert_experiencias_laborales", laborales_Models);

        if (!experienciasResult.Success)
            throw new Exception(experienciasResult.Message);

        return experienciasResult;
    }

    public async Task<PagedResult_Model<Estudios_Model>> CreateEstudios(Estudios_Model estudios_Models)
    {
        var experienciasResult = await _dataService.EjecutarProcedimientoAsync<Estudios_Model>("crud_upsert_estudios", estudios_Models);

        if (!experienciasResult.Success)
            throw new Exception(experienciasResult.Message);

        return experienciasResult;
    }

    public async Task<User_Model_Dto> FindProfileAsync(int UsuarioId)
    {

        var profile = await _dataService.EjecutarProcedimientoAsync<User_Model_Dto>("crud_select_login", new { UsuarioId });
        if (!profile.Success)
            throw new Exception(profile.Message);

        return profile.ListFind.FirstOrDefault();
    }
}
