CREATE TABLE VacanteHabilidades (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    VacanteId INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    CONSTRAINT FK_VH_Vacantes
        FOREIGN KEY (VacanteId) REFERENCES Vacantes(Id)
);
