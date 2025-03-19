var detallefactura = new DetalleFactura();

$().ready(() => {
    detallefactura.listaClientes(); 
});

var unCliente = () => {
    var id = $('#listaClientes').val();
    detallefactura.unCliente(id);
}

var nuevoCliente = () => {
    detallefactura.nuevoCliente();
}

var limpiarcajas = () => {
    detallefactura.limpiarCampos();
}

function cargarProductos() {
    detallefactura.listaProductos();
}

var buscarProducto = () => {
    detallefactura.buscarProducto();
}
