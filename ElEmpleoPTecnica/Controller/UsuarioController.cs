using ElEmpleoPTecnica.Controllers;
using ElEmpleoPTecnica.Interface;
using ElEmpleoPTecnica.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ElEmpleoPTecnica.Controller;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class UsuarioController : BaseApiController
{
    private readonly IUsuario _usuarioService;
    public UsuarioController(IUsuario usuarioService)
    {
        _usuarioService = usuarioService;
    }

    [HttpGet]
    [Route("DetalleUsuario")]
    public async Task<IActionResult> FindDetalleUsuarioUnificadoAsync(int UsuarioId)
    {
        try
        {
            if (UsuarioId == 0)
                return BadRequestResponse("El id del usuario es necesario.");

            var result = await _usuarioService.FindDetalleAplicanteAsync(UsuarioId);
            return OkResponse(result, "Habilidades encontradas correctamente.");
        }
        catch (Exception ex)
        {
            return BadRequestResponse($"Ha ocurrido un error al buscar detalles de usuario: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("EstudiosUsuario")]
    public async Task<IActionResult> EstudiosUsuarioAsync(int usuarioId)
    {
        try
        {
            if (usuarioId == 0)
                return BadRequestResponse("El id del usuario es necesario.");

            var usuario = await _usuarioService.FindEstudiosAsync(usuarioId);
            return OkResponse(usuario, "Estudios encontradas correctamente.");
        }
        catch (Exception ex)
        {
            return BadRequestResponse($"Ha ocurrido un error al buscar estudios del usuario: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("ExperienciasLaborales")]
    public async Task<IActionResult> ExperienciasLaboralesAsync(int usuarioId)
    {
        try
        {
            if (usuarioId == 0)
                return BadRequestResponse("El id del usuario es necesario.");

            var result = await _usuarioService.FindExperienciasLabAsync(usuarioId);
            return OkResponse(result, "Experiencias laborales encontradas correctamente.");
        }
        catch (Exception ex)
        {
            return BadRequestResponse($"Ha ocurrido un error al buscar experiencias laborales de usuario: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("Profile")]
    public async Task<IActionResult> ProfileAsync(int usuarioId)
    {
        try
        {
            if (usuarioId == 0)
                return BadRequestResponse("El id del usuario es necesario.");

            var usuario = await _usuarioService.FindProfileAsync(usuarioId);
            return OkResponse(usuario, "Usuario encontrado correctamente.");
        }
        catch (Exception ex)
        {
            return BadRequestResponse($"Ha ocurrido un error al crear la vacante: {ex.Message}");
        }
    }

    [HttpPost]
    [Route("CrearEstudiosUsuario")]
    public async Task<IActionResult> CreateEstudiosUsuarioAsync([FromBody] Estudios_Model estudios_Models)
    {
        try
        {
            var listaEsudios = await _usuarioService.CreateEstudios(estudios_Models);
            return OkResponse(listaEsudios, "Estudios creados correctamente.");
        }
        catch (Exception ex)
        {
            return BadRequestResponse($"Ha ocurrido un error al crear los estudios: {ex.Message}");
        }
    }

    [HttpPost]
    [Route("CrearExperienciasLaboralesUsuario")]
    public async Task<IActionResult> CreateExperienciasLaboralesUsuarioAsync([FromBody] ExperienciasLaborales_Model experienciasLaborales_Models)
    {
        try
        {
            var listaExperiencia = await _usuarioService.CreateExperienciasLaborales(experienciasLaborales_Models);
            return OkResponse(listaExperiencia, "Experiencias laborales creadas correctamente.");
        }
        catch (Exception ex)
        {
            return BadRequestResponse($"Ha ocurrido un error al crear las experiencias laborales: {ex.Message}");
        }
    }

}
