CREATE PROCEDURE crud_upsert_habilidadesVac
    @Id INT = NULL,
    @VacanteId INT,
    @Nombre VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF @Id IS NULL
    BEGIN
        INSERT INTO VacanteHabilidades (VacanteId, Nombre)
        VALUES (@VacanteId, @Nombre);

        SET @Id = SCOPE_IDENTITY();
    END
    ELSE
    BEGIN
        UPDATE VacanteHabilidades
        SET VacanteId = @VacanteId,
            Nombre = @Nombre
        WHERE Id = @Id;
    END

    SELECT *
    FROM VacanteHabilidades h
    WHERE h.Id = @Id;
END;