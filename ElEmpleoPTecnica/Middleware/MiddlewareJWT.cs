using System.Text.Json;
using Microsoft.AspNetCore.Authorization;

namespace ElEmpleoPTecnica.Middleware;

public class MiddlewareJWT
{
    private readonly RequestDelegate _next;

    public MiddlewareJWT(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var path = context.Request.Path.Value?.ToLower();

        // Permitir swagger y endpoints públicos
        if (path == "/" || path == "" || path.StartsWith("/swagger") ||
            context.GetEndpoint()?.Metadata.GetMetadata<IAllowAnonymous>() != null)
        {
            await _next(context);
            return;
        }

        var authHeader = context.Request.Headers["Authorization"].ToString();

        if (string.IsNullOrWhiteSpace(authHeader) || !authHeader.StartsWith("Bearer "))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Response.ContentType = "application/json";

            var response = JsonSerializer.Serialize(new
            {
                success = false,
                message = "No autorizado"
            });

            await context.Response.WriteAsync(response);
            return;
        }

        await _next(context);
    }
}

