CREATE PROCEDURE crud_upsert_postulaciones
    @Id INT = NULL,
    @UsuarioId INT,
    @VacanteId INT,
    @Estado BIT
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM Postulaciones
        WHERE UsuarioId = @UsuarioId
          AND VacanteId = @VacanteId
          AND (@Id IS NULL OR Id <> @Id)
    )
    BEGIN
        RAISERROR('Ya existe una postulación para este usuario y vacante.', 16, 1);
        RETURN;
    END
    
    IF @Id IS NULL
    BEGIN
        INSERT INTO Postulaciones (UsuarioId, VacanteId, Estado)
        VALUES (@UsuarioId, @VacanteId, @Estado);

        SET @Id = SCOPE_IDENTITY();
    END
    ELSE
    BEGIN
        UPDATE Postulaciones
        SET UsuarioId = @UsuarioId,
            VacanteId = @VacanteId
        WHERE Id = @Id;
    END

    SELECT *
    FROM Postulaciones p
    WHERE p.Id = @Id;
END;