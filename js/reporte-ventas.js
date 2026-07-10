    const selectAnio = document.getElementById("reporte-anio");
    const selectMes = document.getElementById("reporte-mes");
    const btnGenerarReporte = document.getElementById("btn-generar-reporte");
    const tablaReporteBody = document.getElementById("reporte-tbody");
    const totalGeneralTexto = document.getElementById("reporte-total-general");
    const linkReporte = document.getElementById("nav-reporte-ventas");

    function formatearMoneda(numero) {
    let texto = numero.toString();
    let resultado = "";
    let contador = 0;

    for (let i = texto.length - 1; i >= 0; i--) {
        resultado = texto[i] + resultado;
        contador = contador + 1;

        if (contador % 3 === 0 && i !== 0) {
        resultado = "." + resultado;
        }
    }

    return "$" + resultado;
    }

    // ------------------------------------------------------------
    // Busca un evento dentro del array de eventos según su id
    // ------------------------------------------------------------
    function buscarEventoPorId(eventos, idBuscado) {
    for (let i = 0; i < eventos.length; i++) {
        if (eventos[i].id === idBuscado) {
        return eventos[i];
        }
    }
    return null;
    }

    function cargarAniosDisponibles() {
    let ventas = obtenerVentasGuardadas();
    let aniosEncontrados = [];

    for (let i = 0; i < ventas.length; i++) {
        let partesFecha = ventas[i].fecha.split("-");
        let anioVenta = partesFecha[0];

        if (aniosEncontrados.includes(anioVenta) === false) {
        aniosEncontrados.push(anioVenta);
        }
    }


    if (aniosEncontrados.length === 0) {
        let anioActual = new Date().getFullYear().toString();
        aniosEncontrados.push(anioActual);
    }

    selectAnio.innerHTML = "";
    for (let j = 0; j < aniosEncontrados.length; j++) {
        let opcion = document.createElement("option");
        opcion.value = aniosEncontrados[j];
        opcion.textContent = aniosEncontrados[j];
        selectAnio.appendChild(opcion);
    }
    }

    // ------------------------------------------------------------
    // Función principal: genera el reporte de ventas del mes
    // y año que el usuario haya elegido en los select.
    // ------------------------------------------------------------
    function generarReporteVentas() {
    let anioSeleccionado = selectAnio.value;
    let mesSeleccionado = selectMes.value;

    let todasLasVentas = obtenerVentasGuardadas();
    let todosLosEventos = obtenerEventosGuardados();

    // Objeto donde vamos a acumular cantidad y total por cada evento
    let resumenPorEvento = {};

    // Recorremos todas las ventas guardadas
    for (let i = 0; i < todasLasVentas.length; i++) {
        let venta = todasLasVentas[i];
        let partesFecha = venta.fecha.split("-");
        let anioVenta = partesFecha[0];
        let mesVenta = partesFecha[1];

        // Solo nos interesan las ventas del año y mes seleccionados
        if (anioVenta === anioSeleccionado && mesVenta === mesSeleccionado) {
        // Cada venta tiene uno o varios eventos comprados (items)
        for (let j = 0; j < venta.items.length; j++) {
            let item = venta.items[j];
            let evento = buscarEventoPorId(todosLosEventos, item.eventoId);

            if (evento !== null) {
            // Si es la primera vez que vemos este evento, lo creamos en el resumen
            if (resumenPorEvento[evento.id] === undefined) {
                resumenPorEvento[evento.id] = {
                codigo: evento.codigo,
                nombre: evento.nombre,
                cantidad: 0,
                total: 0,
                };
            }

            resumenPorEvento[evento.id].cantidad = resumenPorEvento[evento.id].cantidad + item.cantidad;
            resumenPorEvento[evento.id].total = resumenPorEvento[evento.id].total + (evento.precio * item.cantidad);
            }
        }
        }
    }

    pintarReporte(resumenPorEvento);
    }

    // ------------------------------------------------------------
    // Pinta en la tabla el resumen calculado y el total general
    // ------------------------------------------------------------
    function pintarReporte(resumenPorEvento) {
    tablaReporteBody.innerHTML = "";
    let totalGeneral = 0;
    let hayDatos = false;

    for (let idEvento in resumenPorEvento) {
        hayDatos = true;
        let datos = resumenPorEvento[idEvento];

        let fila = document.createElement("tr");
        fila.innerHTML =
        "<td>" + datos.codigo + "</td>" +
        "<td>" + datos.nombre + "</td>" +
        "<td>" + datos.cantidad + "</td>" +
        "<td>" + formatearMoneda(datos.total) + "</td>";

        tablaReporteBody.appendChild(fila);

        totalGeneral = totalGeneral + datos.total;
    }

    if (hayDatos === false) {
        tablaReporteBody.innerHTML =
        "<tr><td colspan='4'><div class='empty-state'><h3>No hay ventas en ese periodo</h3>" +
        "<p>Prueba eligiendo otro año o mes.</p></div></td></tr>";
    }

    totalGeneralTexto.textContent = formatearMoneda(totalGeneral);
    }

    
    linkReporte.addEventListener("click", function () {
    cargarAniosDisponibles();
    });

    btnGenerarReporte.addEventListener("click", function () {
    generarReporteVentas();
    });

    cargarAniosDisponibles();