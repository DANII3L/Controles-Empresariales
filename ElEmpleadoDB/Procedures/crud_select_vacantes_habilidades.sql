-- =====================================================
-- PROCEDIMIENTOS DE SELECCIÓN PARA HABILIDADES DE VACANTES
-- =====================================================

CREATE PROCEDURE crud_select_vacantes_habilidades
    @VacanteId INT = NULL,
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @sql NVARCHAR(MAX);
    DECLARE @whereClause NVARCHAR(MAX) = N'
        WHERE (@VacanteId IS NULL OR vac.VacanteId = @VacanteId)
    ';

    SET @sql = N'
    ;WITH HabilidadesFiltradas AS (
        SELECT
            vac.Id,
            vac.VacanteId,
            vac.Nombre
        FROM VacanteHabilidades vac
        ' + @whereClause + N'
        )
    SELECT *,
           (SELECT COUNT(*) FROM HabilidadesFiltradas) AS TotalRecords
    FROM HabilidadesFiltradas vac
    ORDER BY vac.Id
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
    ';

    EXEC sp_executesql @sql,
        N'@VacanteId INT, @PageNumber INT, @PageSize INT',
        @VacanteId = @VacanteId,
        @PageNumber = @PageNumber,
        @PageSize = @PageSize;
END;