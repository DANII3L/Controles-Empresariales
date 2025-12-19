namespace ElEmpleoPTecnica.Interface;

/// <summary>
/// Interfaz para la generación y verificación de contraseñas usando Argon2
/// </summary>
public interface IArgon2
{
    /// <summary>
    /// Genera un hash de la contraseña usando Argon2
    /// </summary>
    /// <param name="password">Contraseña a hashear</param>
    /// <returns>Hash de la contraseña</returns>
    string Argon2(string password);
    /// <summary>
    /// Verifica si la contraseña es válida usando Argon2
    /// </summary>
    /// <param name="password">Contraseña a verificar</param>
    /// <param name="hash">Hash de la contraseña</param>
    /// <returns>True si la contraseña es válida, false en caso contrario</returns>
    bool VerifyArgon2(string password, string hash);
}
