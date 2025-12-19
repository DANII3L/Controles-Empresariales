using System.Text.Json.Serialization;

namespace ElEmpleoPTecnica.Models;
public class Empleador_Model
{
    /// <summary>
    /// Id del usuario del empleador
    /// </summary>
    [JsonPropertyName("usuarioId")]
    public int UsuarioId { get; set; }
    /// <summary>
    /// Nombre de la empresa
    /// </summary>
    [JsonPropertyName("nombreEmpresa")]
    public string? NombreEmpresa { get; set; }
    /// <summary>
    /// industria de la empresa
    /// </summary>
    [JsonPropertyName("industria")]
    public string Industria { get; set; }
    /// <summary>
    /// Ubicación de la empresa
    /// </summary>
    [JsonPropertyName("ubicacion")]
    public string Ubicacion { get; set; }
    /// <summary>
    /// Número de empleados de la empresa
    /// </summary>
    [JsonPropertyName("numeroEmpleados")]
    public int NumeroEmpleados { get; set; }
}