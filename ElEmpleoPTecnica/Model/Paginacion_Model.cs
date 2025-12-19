namespace ElEmpleoPTecnica.Models;

/// <summary>
/// Modelo para parámetros de paginación y filtrado
/// </summary>
public class Paginacion_Model
{
    public Paginacion_Model() { }
    public Paginacion_Model(int? pageNumber = null, int? pageSize = null, string filter = null)
    {
        PageNumber = pageNumber;
        PageSize = pageSize;
        Filter = filter;
    }
    /// <summary>
    /// Número de página para paginación
    /// </summary>
    public int? PageNumber { get; set; } = null;

    /// <summary>
    /// Tamaño de página para paginación
    /// </summary>
    public int? PageSize { get; set; } = null;

    /// <summary>
    /// Filtro de búsqueda como string
    /// </summary>
    public string? Filter { get; set; } = null;
}