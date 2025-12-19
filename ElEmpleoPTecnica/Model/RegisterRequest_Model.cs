/// <summary>
/// Modelo de solicitud de registro
/// </summary>
namespace ElEmpleoPTecnica.Models;
public class RegisterRequest_Model
{
    public User_Model User { get; set; }
    public Empleador_Model? Empleador { get; set; }
}