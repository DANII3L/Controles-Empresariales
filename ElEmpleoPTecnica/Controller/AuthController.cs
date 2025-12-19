using ElEmpleoPTecnica.Interface;
using ElEmpleoPTecnica.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace ElEmpleoPTecnica.Controllers;

[ApiController]
[AllowAnonymous]
[Route("api/[controller]")]
public class AuthController : BaseApiController
{
    private readonly IAuth _authService;

    public AuthController(IAuth authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Inicia sesión en el sistema
    /// </summary>
    /// <param name="request">Datos de inicio de sesión</param>
    /// <returns>Token de acceso</returns>
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest_Model request)
    {
        try
        {
            var result = await _authService.LoginUserAsync(request.Email, request.Password);
            return OkResponse(new { User = result.user, Token = result.token }, "Inicio de sesión exitoso");
        }
        catch (Exception ex)
        {
            return BadRequestResponse($"Ha ocurrido un error al iniciar sesión: {ex.Message}");
        }
    }

    /// <summary>
    /// Registra un nuevo usuario en el sistema
    /// </summary>
    /// <param name="request">Datos del nuevo usuario</param>
    /// <returns>Resultado del registro</returns>
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest_Model request)
    {
        try
        {
            var result = await _authService.RegisterUserAsync(request);
            return OkResponse(new { User = result.user, Token = result.token }, "Usuario registrado exitosamente");
        }
        catch (Exception ex)
        {
            return BadRequestResponse($"Ha ocurrido un error al registrar el usuario: {ex.Message}");
        }
    }
}