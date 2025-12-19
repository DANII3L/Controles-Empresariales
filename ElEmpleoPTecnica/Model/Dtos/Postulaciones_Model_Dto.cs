using ElEmpleoPTecnica.Models;

namespace ElEmpleoPTecnica.Model.Dtos
{
    public class Postulaciones_Model_Dto : Postulaciones_Response_Model
    {
        public IEnumerable<Estudios_Model>? estudios { get; set; } = null;
        public IEnumerable<ExperienciasLaborales_Model>? experiencias { get; set; } = null;
    }
}
