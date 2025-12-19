using System.Text.Json.Serialization;

namespace ElEmpleoPTecnica.Models;
public class User_Model
{
    /// <summary>
    /// Email del usuario
    /// </summary>
    [JsonPropertyName("id")]
    public int? Id { get; set; } = null;
    /// <summary>
    /// Email del usuario
    /// </summary>
    [JsonPropertyName("email")]
    public string Email { get; set; }
    /// <summary>
    /// Contraseña del usuario
    /// </summary>
    [JsonPropertyName("passwordHash")]
    public string PasswordHash { get; set; }
    /// <summary>
    /// Télefono de usuario
    /// </summary>
    [JsonPropertyName("telefono")]
    public string? Telefono { get; set; }
    /// <summary>
    /// Nombres de usuario
    /// </summary>
    [JsonPropertyName("nombres")]
    public string Nombres { get; set; }
    /// <summary>
    /// Apellidos de usuario
    /// </summary>
    [JsonPropertyName("apellidos")]
    public string Apellidos { get; set; }
    /// <summary>
    /// Estado de usuario
    /// </summary>
    [JsonPropertyName("estado")]
    public bool? Estado { get; set; } = true;
    /// <summary>
    /// Fecha de creación de usuario
    /// </summary>
    [JsonPropertyName("fechaCreacion")]
    public string? FechaCreacion { get; set; } = null;
    /// <summary>
    /// Fecha de nacimiento de usuario
    /// </summary>
    [JsonPropertyName("fechaNacimiento")]
    public string FechaNacimiento { get; set; }
    /// <summary>
    /// Edad de usuario
    /// </summary>
    [JsonPropertyName("edad")]
    public int Edad { get; set; }
    /// <summary>
    /// Id Rol de usuario
    /// </summary>
    [JsonPropertyName("rolId")]
    public int? RolId { get; set; } = 2;
}