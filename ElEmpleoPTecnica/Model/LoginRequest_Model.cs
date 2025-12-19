using System.ComponentModel.DataAnnotations;

public class LoginRequest_Model
{
    /// <summary>
    /// Nombre de usuario para iniciar sesión
    /// </summary>
    [Required]
    public string Email { get; set; }

    /// <summary>
    /// Contraseña del usuario para iniciar sesión
    /// </summary>
    [Required]
    public string Password { get; set; }
}