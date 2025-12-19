namespace ElEmpleoPTecnica.Models;
public class Estudios_Model
{
    public int? Id { get; set; } = null;
    public int UsuarioId { get; set; }
    public string Institucion { get; set; }
    public string FechaInicial { get; set; }
    public string? FechaFinal { get; set; } = null;
    public string? Descripcion { get; set; } = null;
}