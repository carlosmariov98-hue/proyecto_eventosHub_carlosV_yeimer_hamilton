/* ============================================================
  TuEventoHub.com — data-seed.js
  Carga los datos iniciales desde archivos .json reales
  (assets/data/categorias.json y assets/data/eventos.json)
  y los guarda una sola vez en localStorage con JSON.stringify().
  Las siguientes veces se leen directo de localStorage con JSON.parse().
   ============================================================ */

  async function cargarJSON(ruta) {
    const respuesta = await fetch(ruta);
    if (!respuesta.ok) throw new Error(`No se pudo cargar ${ruta}`);
    return respuesta.json(); // fetch ya hace el JSON.parse() del texto recibido
  }
  
  /**
   * Inicializa localStorage con los datos semilla SOLO si las claves
   * de categorías y/o eventos aún no existen (primera carga de la app).
   * Debe esperarse con "await" antes de renderizar cualquier vista.
   */
  async function inicializarDatosSemilla() {
    try {
      if (localStorage.getItem(STORAGE_KEYS.CATEGORIAS) === null) {
        const categorias = await cargarJSON('assets/data/categorias.json');
        Storage.set(STORAGE_KEYS.CATEGORIAS, categorias); // aquí se hace JSON.stringify()
      }
      if (localStorage.getItem(STORAGE_KEYS.EVENTOS) === null) {
        const eventos = await cargarJSON('assets/data/eventos.json');
        Storage.set(STORAGE_KEYS.EVENTOS, eventos);
      }
    } catch (error) {
      // Si falla el fetch (por ejemplo al abrir el archivo directo con file://
      // sin servidor local), dejamos arrays vacíos para que la app no se rompa.
      console.error('Error cargando datos semilla desde JSON:', error);
      if (localStorage.getItem(STORAGE_KEYS.CATEGORIAS) === null) Storage.set(STORAGE_KEYS.CATEGORIAS, []);
      if (localStorage.getItem(STORAGE_KEYS.EVENTOS) === null) Storage.set(STORAGE_KEYS.EVENTOS, []);
    }
  
    if (localStorage.getItem(STORAGE_KEYS.CARRITO) === null) Storage.set(STORAGE_KEYS.CARRITO, []);
    if (localStorage.getItem(STORAGE_KEYS.VENTAS) === null) Storage.set(STORAGE_KEYS.VENTAS, []);
  }