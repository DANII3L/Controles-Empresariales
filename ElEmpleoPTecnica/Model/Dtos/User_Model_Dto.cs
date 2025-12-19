using System.Text.Json.Serialization;
using ElEmpleoPTecnica.Models;

public class User_Model_Dto : User_Model
{
    /// <summary>
    /// Nombre del Rol de usuario
    /// </summary>
    [JsonPropertyName("rol")]
    public string Rol { get; set; }
    /// <summary>
    /// Id codigo de empleador en caso de serlo
    /// </summary>
    [JsonPropertyName("empleadorId")]
    public int? EmpleadorId { get; set; } = null;
    /// <summary>
    /// años de experiencia del demandante
    /// </summary>
    [JsonPropertyName("experienciaAnios")]
    public int ExperienciaAnios { get; set; }
    /// <summary>
    /// Ubicación de empleador
    /// </summary>
    [JsonPropertyName("ubicacion")]
    public string Ubicacion { get; set; }
    /// <summary>
    /// Número de empleados de empleador
    /// </summary>
    [JsonPropertyName("numeroEmpleados")]
    public int? NumeroEmpleados { get; set; }
}