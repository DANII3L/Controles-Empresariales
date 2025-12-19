CREATE TABLE Estudios
(
    Id INT IDENTITY(1,1) NOT NULL,
    UsuarioId INT NOT NULL,
    Institucion VARCHAR(50) NOT NULL,
    FechaInicial DATETIME NOT NULL,
    FechaFinal DATETIME NULL,
    Descripcion VARCHAR(MAX) NULL,

    CONSTRAINT PK_Estudios
        PRIMARY KEY (Id),

    CONSTRAINT FK_Estudios_Usuarios
        FOREIGN KEY (UsuarioId)
        REFERENCES dbo.Usuarios(Id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);
