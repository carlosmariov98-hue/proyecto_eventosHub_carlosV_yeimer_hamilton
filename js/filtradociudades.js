/* ============================================================
   TuEventoHub.com — filtro-ciudades.js
   Convierte el filtro de ciudad en un input con autocompletado
   (datalist) alimentado por ciudades-colombia.json, y filtra
   los eventos guardados en localStorage según lo escrito.
   ============================================================ */

/**
 * Carga ciudades-colombia.json y llena el <datalist> que
 * alimenta al input de ciudad.
 *
 * Requiere en el HTML:
 *   <input type="text" id="filtroCiudad" list="listaCiudades"
 *          placeholder="Escribe una ciudad...">
 *   <datalist id="listaCiudades"></datalist>
 */
async function cargarCiudadesEnDatalist() {
    const datalist = document.getElementById('listaCiudades');
    if (!datalist) return;

    try {
        const respuesta = await fetch('ciudades-colombia.json');
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const ciudades = await respuesta.json();

        datalist.innerHTML = ciudades
            .map((ciudad) => `<option value="${ciudad}"></option>`)
            .join('');
    } catch (error) {
        console.error('Error cargando ciudades-colombia.json:', error);
    }
}

/**
 * Normaliza texto para comparar sin importar tildes ni mayúsculas.
 * "bogota" === "Bogotá"
 */
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // quita acentos
}

/**
 * Filtra los eventos guardados en localStorage por el texto
 * escrito en el input de ciudad, y llama a la función de
 * renderizado que ya tengas para pintar la lista de eventos.
 *
 * Ajusta STORAGE_KEYS.EVENTOS y renderizarEventos(...) a los
 * nombres reales que uses en tu proyecto.
 */
function filtrarEventosPorCiudad() {
    const input = document.getElementById('filtroCiudad');
    if (!input) return;

    const texto = normalizarTexto(input.value.trim());
    const eventos = Storage.get(STORAGE_KEYS.EVENTOS) || [];

    const eventosFiltrados = texto === ''
        ? eventos
        : eventos.filter((evento) => normalizarTexto(evento.ciudad).includes(texto));

    renderizarEventos(eventosFiltrados); // <-- reemplaza por tu función real de pintado
}

/**
 * Inicializa el filtro: carga las ciudades y engancha el evento
 * "input" para que filtre en tiempo real mientras se escribe.
 */
function inicializarFiltroCiudades() {
    cargarCiudadesEnDatalist();

    const input = document.getElementById('filtroCiudad');
    if (input) {
        input.addEventListener('input', filtrarEventosPorCiudad);
    }
}

document.addEventListener('DOMContentLoaded', inicializarFiltroCiudades);