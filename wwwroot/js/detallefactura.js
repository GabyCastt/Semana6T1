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
        $.get("../../clientes/unCliente?id=" + id, (cliente) => {
            $("#NombreCliente").val(cliente.nombre);
            $("#DireccionCliente").val(cliente.direccion);
            $("#TelefonoCliente").val(cliente.telefono);
            $("#EmailCliente").val(cliente.email);
        });
    }

    nuevoCliente() {
        $("#NombreCliente, #DireccionCliente, #TelefonoCliente, #EmailCliente").prop("disabled", false);
        $("#listaClientes").prop("disabled", false);
        $("#nuevoCliente").val(1);
        $("#cancelar").css("display", "block");
    }

    limpiarCampos() {
        $("#NombreCliente, #DireccionCliente, #TelefonoCliente, #EmailCliente").val("").prop("disabled", true);
        $("#listaClientes").prop("disabled", false);
        $("#nuevoCliente").val(0);
        $("#cancelar").css("display", "none");
    }

    listaProductos() {
        var html = "";
        $.get("../productos/ListaProductos", (listaproductos) => {
            $.each(listaproductos, (index, producto) => {
                html += `<tr>
                    <td>${index + 1}</td>
                    <td>${producto.nombreProducto}</td>
                    <td><input type="number" id="cantidad_${producto.id}" class="form-control" style="width:60px"></td>
                    <td>${producto.precioVenta.toFixed(2)}</td>
                    <td>
                        <button onclick="detallefactura.agregarProducto('${producto.id}', '${producto.nombreProducto}', ${producto.precioVenta})" class="btn btn-outline-success">
                            <i class="icon-plus"></i>
                        </button>
                    </td>
                </tr>`;
            });
            $("#cuerpoproducto").html(html);
        });
    }

    buscarProducto() {
        let nombreProducto = $("#buscador").val().toLowerCase();
        $.get("../productos/ListaProductos", (listaproductos) => {
            let html = "";
            let productosFiltrados = listaproductos.filter(producto =>
                producto.nombreProducto.toLowerCase().includes(nombreProducto)
            );

            $.each(productosFiltrados, (index, producto) => {
                html += `<tr>
                    <td>${index + 1}</td>
                    <td>${producto.nombreProducto}</td>
                    <td><input type="number" id="cantidad_${producto.id}" class="form-control" style="width:60px"></td>
                    <td>${producto.precioVenta.toFixed(2)}</td>
                    <td>
                        <button onclick="detallefactura.agregarProducto('${producto.id}', '${producto.nombreProducto}', ${producto.precioVenta})" class="btn btn-outline-success">
                            <i class="icon-plus"></i>
                        </button>
                    </td>
                </tr>`;
            });
            $("#cuerpoproducto").html(html);
        });
    }

    agregarProducto(id, nombre, precio) {
        let cantidad = parseInt($(`#cantidad_${id}`).val());
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Ingrese una cantidad válida.");
            return;
        }

        let total = cantidad * precio;

        let nuevaFila = `
        <tr data-id="${id}">
            <td>${$("#tablaProductos tbody tr").length + 1}</td>
            <td>${nombre}</td>
            <td>${cantidad}</td>
            <td>${precio.toFixed(2)}</td>
            <td>${total.toFixed(2)}</td>
            <td>
                <button onclick="detallefactura.eliminarProducto(${id})" class="btn btn-outline-danger">
                    <i class="icon-trash"></i>
                </button>
            </td>
        </tr>`;

        $("#tablaProductos tbody").append(nuevaFila);
        this.actualizarTotal();
    }

    eliminarProducto(id) {
        $(`#tablaProductos tbody tr[data-id="${id}"]`).remove();
        this.actualizarTotal();
    }

    actualizarTotal() {
        let sumaTotal = 0;
        $("#tablaProductos tbody tr").each(function () {
            let total = parseFloat($(this).find("td:nth-child(5)").text());
            sumaTotal += total;
        });
        $("#totalFactura").text(sumaTotal.toFixed(2));
    }
}

var detallefactura = new DetalleFactura();

$(document).ready(() => {
    detallefactura.listaClientes();

    // Permite buscar con Enter
    $("#buscador").keypress(function (e) {
        if (e.which == 13) {
            detallefactura.buscarProducto();
        }
    });
});
