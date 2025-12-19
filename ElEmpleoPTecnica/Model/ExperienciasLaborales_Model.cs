namespace ElEmpleoPTecnica.Models;
public class ExperienciasLaborales_Model
{
    public int? Id { get; set; } = null;
    public int UsuarioId { get; set; }
    public string Empresa { get; set; }
    public string Cargo { get; set; }
    public string FechaInicio { get; set; }
    public string? FechaFin { get; set; }= null;
    public string? Descripcion { get; set; } = null;
}

