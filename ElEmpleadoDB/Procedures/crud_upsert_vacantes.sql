CREATE PROCEDURE crud_upsert_vacantes
    @Id INT = NULL,
    @EmpleadorId INT,
    @Titulo VARCHAR(150),
    @Descripcion TEXT,
    @NivelEducativoRequerido VARCHAR(100) = NULL,
    @ExperienciaMinima INT = NULL,
    @Ubicacion VARCHAR(150),
    @Estado BIT -- ABIERTA | CERRADA
AS
BEGIN
    SET NOCOUNT ON;

    IF @Id IS NULL
    BEGIN
        INSERT INTO Vacantes (EmpleadorId, Titulo, Descripcion, NivelEducativoRequerido, ExperienciaMinima, Ubicacion, Estado)
        VALUES (@EmpleadorId, @Titulo, @Descripcion, @NivelEducativoRequerido, @ExperienciaMinima, @Ubicacion, @Estado);

        SET @Id = SCOPE_IDENTITY();
    END
    ELSE
    BEGIN
        UPDATE Vacantes
        SET EmpleadorId = @EmpleadorId,
            Titulo = @Titulo,
            Descripcion = @Descripcion,
            NivelEducativoRequerido = @NivelEducativoRequerido,
            ExperienciaMinima = @ExperienciaMinima,
            Ubicacion = @Ubicacion,
            Estado = @Estado
        WHERE Id = @Id;
    END

    SELECT v.Id,
    v.EmpleadorId,
    v.Titulo,
    v.Descripcion,
    v.NivelEducativoRequerido,
    v.ExperienciaMinima,
    v.Ubicacion,
    v.Estado
    FROM Vacantes v
    WHERE v.Id = @Id;
END;