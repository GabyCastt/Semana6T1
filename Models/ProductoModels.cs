using System.ComponentModel.DataAnnotations;

namespace Roles_Estructuras_Control.Models
{
    public class ProductoModels
    {
        public int ID { get; set; }
        
        [Display(Name = "Nombre del Producto")]
        [MinLength(3, ErrorMessage = "El campo requiere mínimo 3 letras")]
        [Required(ErrorMessage = "El campo es requerido")]
        public string NombreProducto { get; set; }

        [Display(Name = "Presentación del Producto")]
        [MinLength(3, ErrorMessage = "El campo requiere mínimo 3 letras")]
        [Required(ErrorMessage = "El campo es requerido")]
        public string Presentacion { get; set; }

        [Display(Name = "Código de Barras")]
        [MinLength(5, ErrorMessage = "El campo requiere mínimo 5 DÍGITOS")]
        public string CodigoBarras { get; set;}

    }
}
