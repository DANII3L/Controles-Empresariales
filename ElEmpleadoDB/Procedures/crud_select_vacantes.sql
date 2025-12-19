-- =====================================================
-- PROCEDIMIENTOS DE SELECCIÓN PARA VACANTES
-- =====================================================

CREATE PROCEDURE crud_select_vacantes
    @Id INT = NULL,
    @EmpleadorId INT = NULL,
    @Titulo VARCHAR(150) = NULL,
    @Descripcion NVARCHAR(MAX) = NULL,
    @Ubicacion VARCHAR(150) = NULL,
    @Estado BIT = NULL, -- ABIERTA | CERRADA
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @sql NVARCHAR(MAX);
    DECLARE @whereClause NVARCHAR(MAX) = N'
        WHERE (@Id IS NULL OR v.Id = @Id)
            AND (@EmpleadorId IS NULL OR v.EmpleadorId = @EmpleadorId)
            AND (@Titulo IS NULL OR v.Titulo LIKE N''%'' + @Titulo + N''%'')
            AND (@Descripcion IS NULL OR v.Descripcion LIKE N''%'' + @Descripcion + N''%'')
            AND (@Ubicacion IS NULL OR v.Ubicacion LIKE N''%'' + @Ubicacion + N''%'')
            AND (@Estado IS NULL OR v.Estado = @Estado)
    ';

    SET @sql = N'
    ;WITH VacantesFiltradas AS (
        SELECT
            v.Id,
            v.EmpleadorId,
            v.Titulo,
            v.Descripcion,
            v.NivelEducativoRequerido,
            v.ExperienciaMinima,
            v.Ubicacion,
            v.Estado,
            v.FechaPublicacion,
            Emp.NombreEmpresa,
            Emp.Industria,
            Emp.Ubicacion AS UbicacionEmpleador,
            Emp.NumeroEmpleados
        FROM Vacantes v
        JOIN Empleadores Emp ON v.EmpleadorId = Emp.Id
        ' + @whereClause + N'
        )
    SELECT *,
           (SELECT COUNT(*) FROM VacantesFiltradas) AS TotalRecords
    FROM VacantesFiltradas v
    ORDER BY v.EmpleadorId, v.FechaPublicacion DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
    ';

    EXEC sp_executesql @sql,
        N'@Id INT, @EmpleadorId INT, @Titulo VARCHAR(150), @Descripcion NVARCHAR(MAX), @Ubicacion VARCHAR(150), @Estado BIT, @PageNumber INT, @PageSize INT',
        @Id = @Id,
        @EmpleadorId = @EmpleadorId,
        @Titulo = @Titulo,
        @Descripcion = @Descripcion,
        @Ubicacion = @Ubicacion,
        @Estado = @Estado,
        @PageNumber = @PageNumber,
        @PageSize = @PageSize;
END;