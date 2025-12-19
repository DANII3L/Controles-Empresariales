CREATE PROCEDURE crud_select_usuarios_postulados
    @VacanteId INT = NULL,
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @sql NVARCHAR(MAX);
    DECLARE @whereClause NVARCHAR(MAX) = N'
        WHERE (@VacanteId IS NULL OR pos.VacanteId = @VacanteId)
        AND u.Estado = 1
    ';

    SET @sql = N'
    ;WITH EmpleadoresFiltrados AS (
        SELECT
            pos.Id,
            pos.VacanteId,
            pos.FechaPostulacion,
            pos.Estado,
            u.Nombres,
            u.Apellidos,
            u.Email,
            u.Telefono,
            u.Edad,
			u.Id as UsuarioId,
            CAST(
                SUM(
                    DATEDIFF(DAY, el.FechaInicio, ISNULL(el.FechaFin, GETDATE()))
                ) / 365.25
            AS DECIMAL(10,2)) AS experienciaAnios
        FROM Postulaciones pos
        JOIN Usuarios u ON pos.UsuarioId = u.Id
        LEFT JOIN ExperienciaLaboral el ON u.Id = el.UsuarioId
        ' + @whereClause + N'
        GROUP BY
            pos.Id,
            pos.VacanteId,
            pos.FechaPostulacion,
            pos.Estado,
            u.Nombres,
            u.Apellidos,
            u.Email,
            u.Telefono,
            u.Edad,
			u.Id 
        )
    SELECT *,
           (SELECT COUNT(*) FROM EmpleadoresFiltrados) AS TotalRecords
    FROM EmpleadoresFiltrados Emp
    ORDER BY Emp.Id
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
    ';

    EXEC sp_executesql @sql,
        N'@VacanteId INT, @PageNumber INT, @PageSize INT',
        @VacanteId = @VacanteId,
        @PageNumber = @PageNumber,
        @PageSize = @PageSize;
END;