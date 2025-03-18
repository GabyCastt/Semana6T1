class DetalleFactura {
    constructor() { }

    listaClientes() {
        var html = "<option value=0>Seleccione una opción</option>";

        $.get("../../clientes/listaClientes", (listaClientes) => {
            $.each(listaClientes, (index, valor) => {
                html += `<option value="${valor.id}">${valor.nombre}</option>`;
            });

            $("#listaClientes").html(html); 
       });
    }

    unCliente(id) {
        $.get("../../clientes/unCliente?id="+id, (cliente) => {
            $("#NombreCliente").val(cliente.nombre)
            $("#DireccionCliente").val(cliente.direccion)
            $("#TelefonoCliente").val(cliente.telefono)
            $("#EmailCliente").val(cliente.email)
        })
    }
    nuevoCliente() {
        $("#NombreCliente").prop("disabled",false)
        $("#DireccionCliente").prop("disabled", false)
        $("#TelefonoCliente").prop("disabled", false)
        $("#EmailCliente").prop("disabled", false)
        $("#listaClientes").prop("disabled", false)
        $("#nuevoCliente").val(1)
        $("#cancelar").css("display", "block")

    }

    listaProductos() {

    }



    limpiarCampos() {
        $("#NombreCliente").prop("disabled", true)
        $("#DireccionCliente").prop("disabled", true)
        $("#TelefonoCliente").prop("disabled", true)
        $("#EmailCliente").prop("disabled", true)
        $("#listaClientes").prop("disabled", false)
        $("#nuevoCliente").val(0)
        $("#cancelar").css("display", "none")

    }
}
