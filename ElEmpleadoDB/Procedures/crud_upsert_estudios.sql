CREATE PROCEDURE crud_upsert_estudios
    @Id INT = NULL,
    @UsuarioId INT,
    @Institucion VARCHAR(50),
    @FechaInicial VARCHAR(20),
    @FechaFinal VARCHAR(20),
    @Descripcion VARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    IF @Id IS NULL
    BEGIN
        INSERT INTO Estudios (UsuarioId, Institucion, FechaInicial, FechaFinal, Descripcion)
        VALUES (@UsuarioId, @Institucion, @FechaInicial, @FechaFinal, @Descripcion);

        SET @Id = SCOPE_IDENTITY();
    END

    SELECT *
    FROM Estudios 
    WHERE UsuarioId = @UsuarioId;
END;