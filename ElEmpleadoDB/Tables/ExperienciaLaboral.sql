CREATE TABLE ExperienciaLaboral (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioId INT NOT NULL,
    Empresa VARCHAR(150) NOT NULL,
    Cargo VARCHAR(100) NOT NULL,
    FechaInicio DATE NOT NULL,
    FechaFin DATE NULL,
    Descripcion VARCHAR(MAX),
    CONSTRAINT FK_ExperienciaLaboral_Usuarios
        FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
);