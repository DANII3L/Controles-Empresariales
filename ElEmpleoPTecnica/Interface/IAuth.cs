using ElEmpleoPTecnica.Models;
/// <summary>
/// Interfaz para la autenticación de usuarios
/// </summary>
namespace ElEmpleoPTecnica.Interface;
public interface IAuth
{
    /// <summary>
    /// Inicia sesión en el sistema
    /// </summary>
    /// <param name="username">Nombre de usuario</param>
    /// <param name="password">Contraseña del usuario</param>
    /// <returns>Token JWT</returns>
    Task<(User_Model_Dto user, string token)> LoginUserAsync(string email, string password);

    /// <summary>
    /// Registro de usuario en el sistema
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
    Task<(User_Model_Dto user, string token)> RegisterUserAsync(RegisterRequest_Model user);
}