using ElEmpleoPTecnica.Models;
using LibraryDBApi.Models;

namespace ElEmpleoPTecnica.Interface;

/// <summary>
/// Interfaz para el servicio de datos
/// </summary>
public interface IDataService
{
    /// <summary>
    /// Ejecuta un procedimiento almacenado y retorna los resultados
    /// </summary>
    /// <typeparam name="TResult">Tipo de resultado</typeparam>
    /// <param name="nombreProcedimiento">Nombre del procedimiento almacenado</param>
    /// <param name="parametros">Parámetros del procedimiento</param>
    /// <returns>Resultados del procedimiento</returns>
    Task<PagedResult_Model<TResult>> EjecutarProcedimientoAsync<TResult>(string nombreProcedimiento, object parametros) where TResult : new();
    /// <summary>
    /// Ejecuta un procedimiento almacenado y retorna los resultados
    /// </summary>
    /// <typeparam name="TResult">Tipo de resultado</typeparam>
    /// <param name="procedureName">Nombre del procedimiento almacenado</param>
    /// <returns>Resultados del procedimiento</returns>
    Task<PagedResult_Model<TResult>> EjecutarProcedimientoAsync<TResult>(string procedureName) where TResult : new();
}