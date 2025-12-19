-- =====================================================
-- PROCEDIMIENTOS DE SELECCIÓN PARA ESTUDIOS
-- =====================================================

CREATE PROCEDURE crud_select_estudios
    @UsuarioId INT = NULL,
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @sql NVARCHAR(MAX);
    DECLARE @whereClause NVARCHAR(MAX) = N'
        WHERE (@UsuarioId IS NULL OR est.UsuarioId = @UsuarioId)
    ';

    SET @sql = N'
    ;WITH EstFiltrados AS (
        SELECT
            est.Id,
            est.UsuarioId,
            est.Institucion,
            est.FechaInicial,
            est.FechaFinal,
            est.Descripcion
        FROM Estudios est
        ' + @whereClause + N'
        )
    SELECT *,
           (SELECT COUNT(*) FROM EstFiltrados) AS TotalRecords
    FROM EstFiltrados est
    ORDER BY est.Id
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
    ';

    EXEC sp_executesql @sql,
        N'@UsuarioId INT, @PageNumber INT, @PageSize INT',
        @UsuarioId = @UsuarioId,
        @PageNumber = @PageNumber,
        @PageSize = @PageSize;
END;