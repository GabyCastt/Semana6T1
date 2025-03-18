using System.ComponentModel.DataAnnotations;

namespace Roles_Estructuras_Control.Models
{
    public class ProveedoresModels
    {
        public int Id { get; set; }
        [Display(Name = "Nombre del Proveedor")]
        [Required(ErrorMessage = "El campo es requerido")]
        [MinLength(3, ErrorMessage = "El campo requiere mínimo 3 letras")]
        public string NombreProveedor { get; set; }

        [Display(Name = "Dirección")]
        [Required(ErrorMessage = "El campo es requerido")]
        [MinLength(3, ErrorMessage = "El campo requiere mínimo 3 letras")]
        public string Dirección { get; set; }

        [Display(Name = "Número de Teléfono")]
        [Required(ErrorMessage = "El campo es requerido")]
        [MinLength(3, ErrorMessage = "El campo requiere mínimo 3 letras")]
        public string Teleforno { get; set; }

        [Display(Name = "Correo Electrónico")]
        [Required(ErrorMessage = "El campo es requerido")]
        [DataType(DataType.EmailAddress)]
        [EmailAddress(ErrorMessage = "No es un formato de correo Electrónico")]
        public string Correo { get; set; }
    }
}
