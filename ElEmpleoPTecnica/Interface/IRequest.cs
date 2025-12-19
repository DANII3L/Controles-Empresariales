using ElEmpleoPTecnica.Models;

namespace ElEmpleoPTecnica.Interface;
/// <summary>
/// Servicio para manejar automáticamente los parámetros de las peticiones HTTP
/// </summary>
public interface IRequest
{
    /// <summary>
    /// Obtiene automáticamente los parámetros de paginación de la petición actual
    /// </summary>
    Paginacion_Model? GetPaginationParameters();

    /// <summary>
    /// Obtiene un parámetro específico de la petición (query string o body)
    /// </summary>
    T GetParameter<T>(string name, T? defaultValue = default);

    /// <summary>
    /// Obtiene el filtro de búsqueda de la petición
    /// </summary>
    string GetSearchFilter();

    /// <summary>
    /// Establece parámetros de paginación directamente desde un objeto
    /// </summary>
    void SetPaginationParameters(int? pageNumber, int? pageSize, string? filter);
}
