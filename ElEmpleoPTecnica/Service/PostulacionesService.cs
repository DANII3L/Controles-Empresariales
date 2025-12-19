using ElEmpleoPTecnica.Interface;
using ElEmpleoPTecnica.Models;

namespace ElEmpleoPTecnica.Services;
public class PostulacionesService : IPostulaciones
{
    public readonly IDataService _dataService;
    public PostulacionesService(IDataService dataService)
    {
        _dataService = dataService;
    }
    public async Task<PagedResult_Model<Postulaciones_Response_Model>> GetPostulacionesAsync(int VacanteId)
    {

        var postulaciones = await _dataService.EjecutarProcedimientoAsync<Postulaciones_Response_Model>("crud_select_usuarios_postulados", new { VacanteId });

        if(!postulaciones.Success)
            throw new Exception(postulaciones.Message);

        return postulaciones;
    }

    public async Task CreatePostulacionAsync(Postulaciones_Model model)
    {
        var result = await _dataService.EjecutarProcedimientoAsync<Postulaciones_Model>("crud_upsert_postulaciones", model);

        if (!result.Success)
            throw new Exception(result.Message);
    }
}
