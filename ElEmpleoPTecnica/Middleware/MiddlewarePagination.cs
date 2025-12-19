using System.Text.Json;

namespace ElEmpleoPTecnica.Middleware;

public class MiddlewarePagination
{
    private readonly RequestDelegate _next;

    public MiddlewarePagination(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Method is "POST" or "PUT")
            await TryInjectPaginationAsync(context);

        await _next(context);
    }

    private static async Task TryInjectPaginationAsync(HttpContext context)
    {
        try
        {
            context.Request.EnableBuffering();

            using var reader = new StreamReader(context.Request.Body, leaveOpen: true);
            var body = await reader.ReadToEndAsync();
            context.Request.Body.Position = 0;

            if (string.IsNullOrWhiteSpace(body)) return;

            using var json = JsonDocument.Parse(body);
            var root = json.RootElement;

            var query = context.Request.QueryString;

            if (root.TryGetProperty("pageNumber", out var pn) && pn.ValueKind == JsonValueKind.Number)
                query = query.Add("pageNumber", pn.GetInt32().ToString());

            if (root.TryGetProperty("pageSize", out var ps) && ps.ValueKind == JsonValueKind.Number)
                query = query.Add("pageSize", ps.GetInt32().ToString());

            if (root.TryGetProperty("Filter", out var f) && f.ValueKind == JsonValueKind.String)
                query = query.Add("filter", f.GetString());

            context.Request.QueryString = query;
        }
        catch
        {
            context.Request.Body.Position = 0;
        }
    }
}
