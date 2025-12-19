using System.Text.Json.Serialization;

namespace ElEmpleoPTecnica.Models;
public class Postulaciones_Response_Model : User_Model_Dto
{
    /// <summary>
    /// Identificador del demandante que realiza la postulación
    /// </summary>
    [JsonPropertyName("demandanteId")]
    public int DemandanteId { get; set; }
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
    /// <summary>
    /// Identificador de la vacante a la que se postula
    /// </summary>
    [JsonPropertyName("usuarioId")]
    public int UsuarioId { get; set; }
}
