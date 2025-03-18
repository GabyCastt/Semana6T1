using System.ComponentModel.DataAnnotations;

namespace Roles_Estructuras_Control.Models
{
    public class FacturaModel
    {
        public int Id { get; set; }
        public DateOnly FechaIngreso { get; set; }
        [Display(Name ="Número de Factura")]
        public int NumeroFactura { get; set; }

        //// relación con cliente
        public int ClientesModelId { get; set; }
        public ClientesModel ClientesModel { get; set; }
    }
}
