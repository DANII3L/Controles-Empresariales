using ElEmpleoPTecnica.Models;
using ElEmpleoPTecnica.Interface;

namespace ElEmpleoPTecnica.Services;

public class RequestService : IRequest
{
    private readonly IHttpContextAccessor _context;

    public RequestService(IHttpContextAccessor context)
    {
        _context = context;
    }

    public Paginacion_Model? GetPaginationParameters() => new()
    {
        PageNumber = GetParameter<int?>("pageNumber"),
        PageSize = GetParameter<int?>("pageSize"),
        Filter = GetParameter("filter", "")
    };

    public void SetPaginationParameters(int? pageNumber, int? pageSize, string? filter)
    {
        var ctx = _context.HttpContext;
        if (ctx == null) return;

        var query = new QueryString();

        if (pageNumber.HasValue) query = query.Add("pageNumber", pageNumber.Value.ToString());
        if (pageSize.HasValue) query = query.Add("pageSize", pageSize.Value.ToString());
        if (!string.IsNullOrEmpty(filter)) query = query.Add("filter", filter);

        var existing = ctx.Request.QueryString;
        ctx.Request.QueryString = existing.HasValue
            ? new QueryString(existing + "&" + query.Value!.TrimStart('?'))
            : query;
    }

    public T GetParameter<T>(string name, T? defaultValue = default)
    {
        var ctx = _context.HttpContext;
        if (ctx == null) return defaultValue!;

        if (TryConvert(ctx.Request.Query[name], out T queryValue))
            return queryValue;

        if (ctx.Request.RouteValues.TryGetValue(name, out var route) &&
            TryConvert(route?.ToString(), out T routeValue))
            return routeValue;

        return defaultValue!;
    }

    public string GetSearchFilter() => GetParameter("filter", "");

    private static bool TryConvert<T>(object? value, out T result)
    {
        try
        {
            if (value == null)
            {
                result = default!;
                return false;
            }

            var type = Nullable.GetUnderlyingType(typeof(T)) ?? typeof(T);
            result = (T)Convert.ChangeType(value, type);
            return true;
        }
        catch
        {
            result = default!;
            return false;
        }
    }
}
