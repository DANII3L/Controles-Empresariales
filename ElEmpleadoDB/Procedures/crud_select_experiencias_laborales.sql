-- =====================================================
-- PROCEDIMIENTOS DE SELECCIÓN PARA EXPERIENCIAS LABORALES
-- =====================================================

CREATE PROCEDURE crud_select_experiencias_laborales
    @UsuarioId INT = NULL,
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @sql NVARCHAR(MAX);
    DECLARE @whereClause NVARCHAR(MAX) = N'
        WHERE (@UsuarioId IS NULL OR exp.UsuarioId = @UsuarioId)
    ';

    SET @sql = N'
    ;WITH ExpFiltrados AS (
        SELECT
            exp.Id,
            exp.UsuarioId,
            exp.Empresa,
            exp.Cargo,
            exp.FechaInicio,
            exp.FechaFin,
            exp.Descripcion
        FROM ExperienciaLaboral exp
        ' + @whereClause + N'
        )
    SELECT *,
           (SELECT COUNT(*) FROM ExpFiltrados) AS TotalRecords
    FROM ExpFiltrados exp
    ORDER BY exp.Id
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
    ';

    EXEC sp_executesql @sql,
        N'@UsuarioId INT, @PageNumber INT, @PageSize INT',
        @UsuarioId = @UsuarioId,
        @PageNumber = @PageNumber,
        @PageSize = @PageSize;
END;