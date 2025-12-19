using ElEmpleoPTecnica.Controllers;
using ElEmpleoPTecnica.Interface;
using ElEmpleoPTecnica.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ElEmpleoPTecnica.Controller;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class VacantesController : BaseApiController
{
    private readonly IVacantes _vacantesService;
    public VacantesController(IVacantes vacantesService)
    {
        _vacantesService = vacantesService;
    }

    [HttpGet]
    public async Task<IActionResult> GetVacantes()
    {
        try
        {
            var vacantes = await _vacantesService.FindVacantesAsync();
            return OkResponse(vacantes, "Vacantes obtenidas exitosamente");
        }
        catch (Exception ex)
        {
            return BadRequestResponse($"Ha ocurrido un error al obtener las vacantes: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateVacante(VacanteCreationRequest model)
    {
        try
        {
            if(model is null)
                return BadRequestResponse("El modelo de vacante no puede ser nulo");
            
            var vacantes = await _vacantesService.CreateVacanteAsync(model);
            return OkResponse(vacantes, "Funcionalidad de creación de vacante no implementada aún");
        }
        catch (Exception ex)
        {
            return BadRequestResponse($"Ha ocurrido un error al crear la vacante: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("HabilidadesVac")]
    public async Task<IActionResult> FindHabilidadesVacantesAsync(int VacanteId)
    {
        try
        {
            if (VacanteId == 0)
                return BadRequestResponse("El id de la vacante es necesario.");

            var vacantes = await _vacantesService.FindHabilidadesVacantesAsync(VacanteId);
            return OkResponse(vacantes, "Habilidades encontradas correctamente.");
        }
        catch (Exception ex)
        {
            return BadRequestResponse($"Ha ocurrido un error al crear la vacante: {ex.Message}");
        }
    }
}

