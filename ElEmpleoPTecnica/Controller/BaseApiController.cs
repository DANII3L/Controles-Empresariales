using ElEmpleoPTecnica.Models;
using Microsoft.AspNetCore.Mvc;

namespace ElEmpleoPTecnica.Controllers
{
    /// <summary>
    /// Controlador base que proporciona métodos auxiliares para respuestas estandarizadas
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        /// <summary>
        /// Retorna una respuesta exitosa con datos
        /// </summary>
        protected IActionResult OkResponse<T>(T data, string message = "Operación exitosa")
        {
            return Ok(new ApiResponse_Model<T> { Success = true, Data = data, Message = message });
        }

        /// <summary>
        /// Retorna una respuesta exitosa sin datos
        /// </summary>
        protected IActionResult OkResponse(string message)
        {
            return Ok(new ApiResponse_Model<object> { Success = true, Message = message });
        }

        /// <summary>
        /// Retorna una respuesta de recurso no encontrado
        /// </summary>
        protected IActionResult NotFoundResponse(string message = "Recurso no encontrado")
        {
            return NotFound(new ApiResponse_Model<object> { Success = false, Message = message });
        }

        /// <summary>
        /// Retorna una respuesta de petición inválida
        /// </summary>
        protected IActionResult BadRequestResponse(string message)
        {
            return BadRequest(new ApiResponse_Model<object> { Success = false, Message = message });
        }

        /// <summary>
        /// Retorna una respuesta de no autorizado
        /// </summary>
        protected IActionResult UnauthorizedResponse(string message = "No autorizado")
        {
            return Unauthorized(new ApiResponse_Model<object> { Success = false, Message = message });
        }
    }
} 
