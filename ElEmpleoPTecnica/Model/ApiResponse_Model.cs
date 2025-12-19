namespace ElEmpleoPTecnica.Models;

/// <summary>
/// Respuesta API
/// </summary>
/// <typeparam name="T">Tipo de datos</typeparam>
public class ApiResponse_Model<T>
{
    /// <summary>
    /// Indica si la operación fue exitosa
    /// </summary>
    public bool Success { get; set; }
    /// <summary>
    /// Mensaje de la respuesta
    /// </summary>
    public string? Message { get; set; }
    /// <summary>
    /// Datos de la respuesta
    /// </summary>
    public T? Data { get; set; }
} 
