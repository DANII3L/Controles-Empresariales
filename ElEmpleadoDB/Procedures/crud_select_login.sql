-- =====================================================
-- PROCEDIMIENTOS DE SELECCIÓN PARA LOGIN
-- =====================================================

CREATE PROCEDURE crud_select_login
    @Email NVARCHAR(150) = NULL,
    @UsuarioId INT = NULL,
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @sql NVARCHAR(MAX);
    DECLARE @whereClause NVARCHAR(MAX) = '
        WHERE (@Email IS NULL OR u.Email LIKE N''%'' + @Email + N''%'')
        AND (@UsuarioId IS NULL OR u.Id = @UsuarioId)
    ';

    SET @sql = N'
    ;WITH UsuariosFiltrados AS (
        SELECT
            u.Id,
            u.Email,
            u.PasswordHash,
			r.Nombre as Rol,
            u.RolId,
            u.Nombres,
            u.Apellidos,
            u.Estado,
            u.Telefono,
            e.Id AS EmpleadorId,
            e.NumeroEmpleados,
            e.Ubicacion
        FROM Usuarios u
		JOIN Roles r ON r.Id = u.RolId
        LEFT JOIN Empleadores e ON u.Id = e.UsuarioId
        ' + @whereClause + N'
    )
    SELECT *,
           (SELECT COUNT(*) FROM UsuariosFiltrados) AS TotalRecords
    FROM UsuariosFiltrados users
    ORDER BY Id
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
    ';

    EXEC sp_executesql @sql,
        N'@Email NVARCHAR(150), @UsuarioId INT, @PageNumber INT, @PageSize INT',
        @Email = @Email,
        @UsuarioId= @UsuarioId,
        @PageNumber = @PageNumber,
        @PageSize = @PageSize;
END;