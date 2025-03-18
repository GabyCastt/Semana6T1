namespace Roles_Estructuras_Control.Models
{
    public class DetalleFacturaModel
    {
        public int Id { get; set; }
        public int Cantidad { get; set; }
        public float Valor { get; set; }

        //relación con producto
        public int ProductoModelsId { get; set; }
        public ProductoModels ProductoModels { get; set; }
        //relación con factura
        public int FacturaModelId { get; set; }
        public FacturaModel FacturaModel { get; set; }
        //relación con stock
        public int StockModelsId { get; set; }
        public StockModels StockModels { get; set; }


    }
}
