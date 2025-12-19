using ElEmpleoPTecnica.Models;

namespace ElEmpleoPTecnica.Interface;
/// <summary>
/// Interfaz para la generación de tokens JWT
/// </summary>
public interface IJwt
{
    /// <summary>
    /// Genera un token JWT para el usuario
    /// </summary>
    /// <param name="user">Usuario</param>
    /// <returns>Token JWT</returns>
    string GenerateJwtToken(User_Model user);
}