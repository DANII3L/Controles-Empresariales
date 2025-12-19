using ElEmpleoPTecnica.Interface;
using System.Security.Cryptography;
using Konscious.Security.Cryptography;
using System.Text;

namespace ElEmpleoPTecnica.Services;

/// <summary>
/// Servicio para la generación y verificación de contraseñas usando Argon2
/// </summary>
public class Argon2Service : IArgon2
{
    private const int SaltSize = 16;
    private const int HashSize = 32;
    public string Argon2(string password)
    {
        var salt = new byte[SaltSize];
        using (var rng = RandomNumberGenerator.Create())
            rng.GetBytes(salt);

        var hash = CreateArgon2Hash(password, salt);

        var combinedBytes = new byte[SaltSize + HashSize];
        Buffer.BlockCopy(salt, 0, combinedBytes, 0, SaltSize);
        Buffer.BlockCopy(hash, 0, combinedBytes, SaltSize, HashSize);

        return Convert.ToBase64String(combinedBytes);
    }

    public bool VerifyArgon2(string password, string storedHash)
    {
        if (string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(storedHash))
            return false;

        try
        {
            var combinedBytes = Convert.FromBase64String(storedHash);
            if (combinedBytes.Length != SaltSize + HashSize)
                return false;

            var salt = new byte[SaltSize];
            Buffer.BlockCopy(combinedBytes, 0, salt, 0, SaltSize);

            var storedHashBytes = new byte[HashSize];
            Buffer.BlockCopy(combinedBytes, SaltSize, storedHashBytes, 0, HashSize);

            var newHash = CreateArgon2Hash(password, salt);

            return CryptographicOperations.FixedTimeEquals(storedHashBytes, newHash);
        }
        catch (FormatException)
        {
            return false;
        }
    }

    private byte[] CreateArgon2Hash(string password, byte[] salt)
    {
        var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            Salt = salt,
            DegreeOfParallelism = 4,
            Iterations = 4,
            MemorySize = 65536
        };

        return argon2.GetBytes(HashSize);
    }
}