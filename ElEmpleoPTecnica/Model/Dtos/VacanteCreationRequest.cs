namespace ElEmpleoPTecnica.Models;
public class VacanteCreationRequest
{
    public Vacantes_Model vacante_Model { get; set; }
    public IEnumerable<VacanteHabilidades_Model> habilidades_Model { get; set; }
}
