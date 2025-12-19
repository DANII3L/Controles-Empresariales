using LibraryDBApi.Models;
using System.Data;

namespace ElEmpleoPTecnica.Models;
public class PagedResult_Model<T>
{
    public IEnumerable<T> ListFind { get; set; } = new List<T>();
    public int? TotalRecords { get; set; } = 0;
    public int? PageNumber { get; set; } = 1;
    public int? PageSize { get; set; } = 10;
    public bool Success { get; set; }
    public string? Message { get; set; }
    public Exception Exception { get; set; }
    public PagedResult_Model()
    {
    }
    public PagedResult_Model(Exception exception, string message = null)
    {
        Success = false;
        Exception = exception;
        Message = message ?? exception?.Message ?? "Error desconocido";
    }

    public static PagedResult_Model<T> PaginatedResponse(StoredProcedureResult<IEnumerable<T>> spResult)
    {
        return new PagedResult_Model<T>
        {
            ListFind = spResult.Data,
            TotalRecords = spResult.TotalRecords,
            PageNumber = spResult.PageNumber ?? 1,
            PageSize = spResult.PageSize ?? 10,
            Success = spResult.IsSuccess,
            Message = spResult.Message
        };
    }

    public static PagedResult_Model<T> Failure(Exception exception, string message = null)
    {
        return new PagedResult_Model<T>(exception, message);
    }
}

