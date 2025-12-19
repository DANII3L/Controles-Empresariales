using ElEmpleoPTecnica.Interface;
using ElEmpleoPTecnica.Models;

namespace ElEmpleoPTecnica.Services;
public class AuthService : IAuth
{
    private readonly IDataService _dataService;
    private readonly IArgon2 _argon2;
    private readonly IJwt _jwt;
    public AuthService(IDataService dataService, IArgon2 argon2, IJwt jwt)
    {
        _dataService = dataService;
        _argon2 = argon2;
        _jwt = jwt;
    }

    public async Task<(User_Model_Dto user, string token)> LoginUserAsync(string email, string password)
    {
        var result = await _dataService.EjecutarProcedimientoAsync<User_Model_Dto>("crud_select_login", new { email });

        if (!result.Success)
            throw new Exception(result.Message);

        if (!result.ListFind.Any())
            throw new Exception($"No se ha encontrado el usuario {email}. Por favor, verifique sus credenciales.");

        var user = result.ListFind.FirstOrDefault();

        if (!_argon2.VerifyArgon2(password, user.PasswordHash))
            throw new Exception("Contraseña incorrecta. Por favor, verifique sus credenciales.");

        user.PasswordHash = null;

        return (user, _jwt.GenerateJwtToken(user));
    }

    public async Task<(User_Model_Dto user, string token)> RegisterUserAsync(RegisterRequest_Model request)
    {
        var user = request.User;

        var validateFind = await _dataService.EjecutarProcedimientoAsync<User_Model_Dto>("crud_select_login", new { email = user.Email});

        if(validateFind.ListFind.Any())
            throw new Exception("Correo electronico ya existente.");

        user.PasswordHash = _argon2.Argon2(user.PasswordHash);

        var result = await _dataService.EjecutarProcedimientoAsync<User_Model_Dto>("crud_upsert_usuarios", user);

        if (!result.Success)
            throw new Exception(result.Message);

        var userRegister = result.ListFind?.FirstOrDefault();
        if(userRegister is null)
            throw new Exception("No se ha encontrado el usuario a registrar en el proceso de validación.");

        var empleador = request.Empleador;

        if (empleador is not null)
        {
            empleador.UsuarioId = userRegister.Id ?? 0;
            empleador.NombreEmpresa = $"{user.Nombres} {user.Apellidos}";
            var resultEmpleador = await _dataService.EjecutarProcedimientoAsync<Empleador_Model>("crud_upsert_empleadores", empleador);
            if (!resultEmpleador.Success)
                throw new Exception(resultEmpleador.Message);
        }

        return (userRegister, _jwt.GenerateJwtToken(user));
    }
}