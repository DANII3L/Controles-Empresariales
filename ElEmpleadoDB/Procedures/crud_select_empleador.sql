-- =====================================================
-- PROCEDIMIENTOS DE SELECCIÓN PARA EMPLEADORES
-- =====================================================

CREATE PROCEDURE crud_select_empleador
    @Id INT = NULL,
    @UsuarioId INT = NULL,
    @NombreEmpresa VARCHAR(150) = NULL,
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @sql NVARCHAR(MAX);
    DECLARE @whereClause NVARCHAR(MAX) = N'
        WHERE (@Id IS NULL OR Emp.Id = @Id)
            AND (@UsuarioId IS NULL OR Emp.UsuarioId = @UsuarioId)
            AND (@NombreEmpresa IS NULL OR Emp.NombreEmpresa LIKE N''%'' + @NombreEmpresa + N''%'')
    ';

    SET @sql = N'
    ;WITH EmpleadoresFiltrados AS (
        SELECT
            Emp.Id,
            Emp.UsuarioId,
            Emp.NombreEmpresa,
            Emp.Industria,
            Emp.Ubicacion,
            Emp.NumeroEmpleados
        FROM Empleadores Emp    
        JOIN Usuarios u ON Emp.UsuarioId = u.Id
        ' + @whereClause + N'
        )
    SELECT *,
           (SELECT COUNT(*) FROM EmpleadoresFiltrados) AS TotalRecords
    FROM EmpleadoresFiltrados Emp
    ORDER BY Emp.Id
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
    ';

    EXEC sp_executesql @sql,
        N'@Id INT, @UsuarioId INT, @NombreEmpresa VARCHAR(150), @PageNumber INT, @PageSize INT',
        @Id = @Id,
        @UsuarioId = @UsuarioId,
        @NombreEmpresa = @NombreEmpresa,
        @PageNumber = @PageNumber,
        @PageSize = @PageSize;
END;