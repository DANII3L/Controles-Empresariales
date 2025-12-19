CREATE TABLE Vacantes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    EmpleadorId INT NOT NULL,
    Titulo VARCHAR(150),
    Descripcion NVARCHAR(MAX),
    NivelEducativoRequerido VARCHAR(100),
    ExperienciaMinima INT,
    Ubicacion VARCHAR(150),
    Estado BIT, -- ABIERTA | CERRADA
    FechaPublicacion DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Vacantes_Empleadores
        FOREIGN KEY (EmpleadorId) REFERENCES Empleadores(Id)
);
