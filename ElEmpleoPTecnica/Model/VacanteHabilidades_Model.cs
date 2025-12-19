using System.Text.Json.Serialization;

namespace ElEmpleoPTecnica.Models;
public class VacanteHabilidades_Model
{
    [JsonPropertyName("vacanteId")]
    public int VacanteId { get; set; }
    [JsonPropertyName("nombre")]
    public string Nombre { get; set; }
}

