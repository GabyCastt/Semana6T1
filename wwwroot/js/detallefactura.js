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
        })
    }

    nuevoCliente() {
        $("#NombreCliente").prop("disabled", false);
        $("#DireccionCliente").prop("disabled", false);
        $("#TelefonoCliente").prop("disabled", false);
        $("#EmailCliente").prop("disabled", false);
        $("#listaClientes").prop("disabled", false);
        $("#nuevoCliente").val(1);
        $("#cancelar").css("display", "block");
    }

    limpiarCampos() {
        $("#NombreCliente").prop("disabled", true);
        $("#DireccionCliente").prop("disabled", true);
        $("#TelefonoCliente").prop("disabled", true);
        $("#EmailCliente").prop("disabled", true);
        $("#listaClientes").prop("disabled", false);
        $("#nuevoCliente").val(0);
        $("#cancelar").css("display", "none");
    }

    listaProductos() {
        $.get("../../Productos/listaProductos", (lista) => {
            let html = `<thead>
                        <tr><th>#</th><th>Nombre</th><th>Acción</th></tr>
                    </thead>`;
            $.each(lista, (index, producto) => {
                html += `<tr>
                        <td>${index + 1}</td>
                        <td>${producto.nombreProducto}</td>
                        <td><button class="btn btn-success" onclick="detallefactura.agregarProducto(${producto.id}, '${producto.nombreProducto}')">Agregar</button></td>
                     </tr>`;
            });
            $("#tablaBusqueda").html(html);
        });
    }

    buscarProducto() {
        let nombreProducto = $("#buscador").val();
        $.get("/Productos/ListaProductos", (data) => {
            let html = '';
            let contador = 1;
            let productosFiltrados = data.filter(p => p.nombreProducto.toLowerCase().includes(nombreProducto.toLowerCase()));

            productosFiltrados.forEach(producto => {
                html += `
                    <tr>
                        <td>${contador++}</td>
                        <td>${producto.nombreProducto}</td>
                        <td><input type="number" min="1" value="1" class="form-control cantidad-producto" data-id="${producto.id}" data-nombre="${producto.nombreProducto}"></td>
                        <td><input type="number" min="0" value="0" class="form-control precio-producto" data-id="${producto.id}"></td>
                        <td><button class="btn btn-success" onclick="detallefactura.agregarProducto('${producto.id}', '${producto.nombreProducto}')">Agregar</button></td>
                    </tr>`;
            });
            $("#resultadoProductos tbody").html(html);
        });
    }

    agregarProducto(id, nombre) {
        let cantidad = parseInt($(`.cantidad-producto[data-id='${id}']`).val());
        let precio = parseFloat($(`.precio-producto[data-id='${id}']`).val());
        let total = cantidad * precio;

        let nuevaFila = `
        <tr data-id="${id}">
            <td>#</td>
            <td>${nombre}</td>
            <td>${cantidad}</td>
            <td>${precio}</td>
            <td>${total}</td>
            <td><button class="btn btn-danger" onclick="detallefactura.eliminarProducto(${id})">Eliminar</button></td>
        </tr>`;

        $("#tablaProductos tbody").append(nuevaFila);

        this.actualizarTotal();
    }

    eliminarProducto(id) {
        $(`#tablaProductos tbody tr[data-id='${id}']`).remove();

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
$().ready(() => {
    detallefactura.listaClientes();
});
