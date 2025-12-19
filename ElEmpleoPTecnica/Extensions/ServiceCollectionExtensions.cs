using ElEmpleoPTecnica.Services;
using ElEmpleoPTecnica.Interface;

namespace ElEmpleoPTecnica.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHttpContextAccessor();

        services.AddScoped<IRequest, RequestService>();
        services.AddScoped<IDataService, DataService>();
        services.AddScoped<IJwt, JwtService>();

        services.AddSingleton<IArgon2, Argon2Service>();
        services.AddTransient<IAuth, AuthService>();

        services.AddScoped<IVacantes, VacantesService>();
        services.AddScoped<IPostulaciones, PostulacionesService>();
        services.AddScoped<IUsuario,UsuarioService>();

        services.AddHttpClient();
        
        return services;
    }
}

