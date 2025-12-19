using System.Text.Json.Serialization;

namespace ElEmpleoPTecnica.Models;
public class Vacantes_Model
{
    /// <summary>
    /// Id de la vacante
    /// </summary>
    [JsonPropertyName("id")]
    public int? Id { get; set; } = null;
    /// <summary>
    /// Titulo de la vacante
    /// </summary>
    [JsonPropertyName("titulo")]
    public string Titulo { get; set; }
    /// <summary>
    /// Descripción de la vacante
    /// </summary>
    [JsonPropertyName("descripcion")]
    public string Descripcion { get; set; }
    /// <summary>
    /// Nivel educativo requerido para la vacante
    /// </summary>
    [JsonPropertyName("nivelEducativoRequerido")]
    public string NivelEducativoRequerido { get; set; }
    /// <summary>
    /// Experiencia mínima requerida para la vacante
    /// </summary>
    [JsonPropertyName("experienciaMinima")]
    public int ExperienciaMinima { get; set; }
    /// <summary>
    /// Ubicación de la vacante
    /// </summary>
    [JsonPropertyName("ubicacion")]
    public string Ubicacion { get; set; }
    /// <summary>
    /// Id del empleador que publica la vacante
    /// </summary>
    [JsonPropertyName("empleadorId")]
    public int EmpleadorId { get; set; }
    /// <summary>
    /// Estado de la vacante
    /// </summary>
    [JsonPropertyName("estado")]
    public bool Estado { get; set; } = true;
    /// <summary>
    /// Fecha de publicación de la vacante
    /// </summary>
    [JsonPropertyName("fechaPublicacion")]
    public string? FechaPublicacion { get; set; } = null;
    /// <summary>
    /// Id codigo de empleador en caso de serlo
    /// </summary>
    [JsonPropertyName("nombreEmpresa")]
    public string? NombreEmpresa { get; set; } = null;
}
