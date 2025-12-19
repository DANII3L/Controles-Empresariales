using System.Net;
using System.Text.Json;

namespace ElEmpleoPTecnica.Middleware;

public class MiddlewareException
{
    private readonly RequestDelegate _next;

    public MiddlewareException(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = ex switch
            {
                ArgumentException or InvalidOperationException => (int)HttpStatusCode.BadRequest,
                UnauthorizedAccessException => (int)HttpStatusCode.Unauthorized,
                KeyNotFoundException => (int)HttpStatusCode.NotFound,
                _ => (int)HttpStatusCode.InternalServerError
            };

            context.Response.ContentType = "application/json";

            var response = JsonSerializer.Serialize(new
            {
                success = false,
                message = string.IsNullOrWhiteSpace(ex.Message)
                    ? "Ha ocurrido un error inesperado"
                    : ex.Message
            });

            await context.Response.WriteAsync(response);
        }
    }
}
