CREATE TABLE Empleadores (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioId INT NOT NULL,
    NombreEmpresa VARCHAR(150),
    Industria VARCHAR(100),
    Ubicacion VARCHAR(150),
    NumeroEmpleados INT,
    CONSTRAINT FK_Empleadores_Usuarios
        FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
);
