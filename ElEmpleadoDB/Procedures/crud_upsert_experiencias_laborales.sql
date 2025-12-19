CREATE PROCEDURE crud_upsert_experiencias_laborales
    @Id INT = NULL,
    @UsuarioId INT,
    @Empresa VARCHAR(150),
    @Cargo VARCHAR(50),
    @FechaInicio VARCHAR(50),
    @FechaFin VARCHAR(50),
    @Descripcion VARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF @Id IS NULL
    BEGIN
        INSERT INTO ExperienciaLaboral (UsuarioId, Empresa, Cargo, FechaInicio, FechaFin, Descripcion)
        VALUES (@UsuarioId, @Empresa, @Cargo, @FechaInicio, @FechaFin, @Descripcion);

        SET @Id = SCOPE_IDENTITY();
    END

    SELECT *
    FROM ExperienciaLaboral h
    WHERE h.UsuarioId = @UsuarioId;
END;