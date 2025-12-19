using System.Text.Json.Serialization;

namespace ElEmpleoPTecnica.Models;
public class Postulaciones_Model
{
    /// <summary>
    /// Identificador del usuario que realiza la postulación
    /// </summary>
    [JsonPropertyName("usuarioId")]
    public int UsuarioId { get; set; }
    /// <summary>
    /// Identificador de la vacante a la que se postula
    /// </summary>
    [JsonPropertyName("vacanteId")]
    public int VacanteId { get; set; }
    /// <summary>
    /// Fecha en que se realizó la postulación
    /// </summary>
    [JsonPropertyName("fechaPostulacion")]
    public DateTime FechaPostulacion { get; set; }
    /// <summary>
    /// Estado de la postulación
    /// </summary>
    [JsonPropertyName("estado")]
    public bool Estado { get; set; } = true;
}
