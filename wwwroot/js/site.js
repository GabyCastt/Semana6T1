$().ready(

    () => {
        detallefactura()

    }

);

var detallefactura = () => {
    var leerClientes = new DetalleFactura()
    leerClientes.listaClientes()
}
var unCliente = () => {
    var id = $('#listaClientes').val()
    var uncliente = new DetalleFactura()
    uncliente.unCliente(id)
}
var nuevoCliente = () => {
    var nuevoCliente = new DetalleFactura()
    nuevoCliente.nuevoCliente()
}
var limpiarcajas = () => {
    var limpiarcajas = new DetalleFactura()
    limpiarcajas.limpiarCampos()
}