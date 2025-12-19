CREATE TABLE Postulaciones (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioId INT NOT NULL,
    VacanteId INT NOT NULL,
    FechaPostulacion DATETIME NOT NULL DEFAULT GETDATE(),
    Estado BIT DEFAULT 1,
    CONSTRAINT FK_Postulaciones_Usuarios
        FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id),
    CONSTRAINT FK_Postulaciones_Vacantes
        FOREIGN KEY (VacanteId) REFERENCES Vacantes(Id),
    CONSTRAINT UQ_Usuario_Vacante UNIQUE (UsuarioId, VacanteId)
);