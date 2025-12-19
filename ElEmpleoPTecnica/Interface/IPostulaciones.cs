using ElEmpleoPTecnica.Models;

namespace ElEmpleoPTecnica.Interface;
public interface IPostulaciones
{
    Task<PagedResult_Model<Postulaciones_Response_Model>> GetPostulacionesAsync(int VacanteId);
    Task CreatePostulacionAsync(Postulaciones_Model model);
}
