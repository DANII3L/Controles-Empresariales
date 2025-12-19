CREATE PROCEDURE crud_upsert_usuarios
    @Id INT = NULL,
    @Email NVARCHAR(150),
    @PasswordHash NVARCHAR(255),
    @Telefono NVARCHAR(20) = NULL,
    @Nombres NVARCHAR(100),
    @Apellidos NVARCHAR(100),
    @FechaNacimiento VARCHAR(50),
    @Edad INT,
    @RolId INT
AS
BEGIN
    SET NOCOUNT ON;

    IF @Id IS NULL
    BEGIN
        INSERT INTO Usuarios (Email, PasswordHash, Telefono, Nombres, Apellidos, FechaNacimiento, Edad, RolId)
        VALUES (@Email, @PasswordHash, @Telefono, @Nombres, @Apellidos, @FechaNacimiento, @Edad, @RolId);

        SET @Id = SCOPE_IDENTITY();
    END
    ELSE
    BEGIN
        UPDATE Usuarios
        SET Email = @Email,
            PasswordHash = @PasswordHash,
            Telefono = @Telefono,
            Nombres = @Nombres,
            Apellidos = @Apellidos,
            FechaNacimiento = @FechaNacimiento,
            Edad = @Edad,
            RolId = @RolId
        WHERE Id = @Id;
    END

    SELECT u.Id,
    u.Email, 
    u.PasswordHash, 
    u.Telefono, 
    u.Nombres, 
    u.Apellidos, 
    u.FechaNacimiento, 
    u.Edad, 
    u.RolId,
    r.Nombre Rol
    FROM Usuarios u
    JOIN Roles r ON r.Id = u.RolId
    WHERE u.Id = @Id;
END;