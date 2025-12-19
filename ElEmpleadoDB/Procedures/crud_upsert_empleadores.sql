CREATE PROCEDURE crud_upsert_empleadores
    @Id INT = NULL,
    @UsuarioId INT,
    @NombreEmpresa VARCHAR(150),
    @Industria NVARCHAR(100),
    @Ubicacion NVARCHAR(150),
    @NumeroEmpleados INT
AS
BEGIN
    SET NOCOUNT ON;

    IF @Id IS NULL
    BEGIN
        INSERT INTO Empleadores (UsuarioId, NombreEmpresa, Industria, Ubicacion, NumeroEmpleados)
        VALUES (@UsuarioId, @NombreEmpresa, @Industria, @Ubicacion, @NumeroEmpleados);

        SET @Id = SCOPE_IDENTITY();
    END
    ELSE
    BEGIN
        UPDATE Empleadores
        SET UsuarioId = @UsuarioId,
            NombreEmpresa = @NombreEmpresa,
            Industria = @Industria,
            Ubicacion = @Ubicacion,
            NumeroEmpleados = @NumeroEmpleados
        WHERE Id = @Id;
    END

    SELECT Id,
        UsuarioId,
        NombreEmpresa,
        Industria,
        Ubicacion,
        NumeroEmpleados
    FROM Empleadores 
    WHERE Id = @Id;
END;