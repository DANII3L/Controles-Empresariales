using ElEmpleoPTecnica.Controllers;
using ElEmpleoPTecnica.Interface;
using ElEmpleoPTecnica.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ElEmpleoPTecnica.Controller;


[ApiController]
[Authorize]
[Route("api/[controller]")]
public class PostulacionesController : BaseApiController
{
    public readonly IPostulaciones _postulacionesService;
    public PostulacionesController(IPostulaciones postulacionesService)
    {
        _postulacionesService = postulacionesService;
    }

    [HttpGet]
    public async Task<IActionResult> GetPostulaciones(int VacanteId)
    {
        try
        {
            if(VacanteId == 0)
                return BadRequestResponse("El Id es obligatorio.");

            var postulaciones = await _postulacionesService.GetPostulacionesAsync(VacanteId);
            return OkResponse(postulaciones, "Listado de postulaciones obtenido satisfactoriamente.");
        }
        catch (Exception ex)
        {
            return BadRequestResponse($"Ha ocurrido un error al obtener las postulaciones: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreatePostulacion(Postulaciones_Model model)
    {
        try
        {
            if(model == null)
                return BadRequestResponse("El modelo de postulación no puede ser nulo");

            await _postulacionesService.CreatePostulacionAsync(model);
            return OkResponse("Funcionalidad de creación de postulación no implementada aún");
        }
        catch (Exception ex)
        {
            return BadRequestResponse(ex.Message);
        }
    }
}

