/* ============================================================
   TuEventoHub.com — data-seed.js
   Carga los datos semilla desde data-seed.json y los guarda en
   localStorage solo si aún no existen (primera carga de la app).
   ============================================================ */

/**
 * Guarda un valor en localStorage serializándolo con JSON.stringify.
 */
const Storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    const raw = localStorage.getItem(key);
    return raw === null ? null : JSON.parse(raw);
  },
};

const STORAGE_KEYS = {
  CATEGORIAS: 'tueventohub_categorias',
  EVENTOS: 'tueventohub_eventos',
  CARRITO: 'tueventohub_carrito',
  VENTAS: 'tueventohub_ventas',
};

/**
 * Trae data-seed.json y siembra localStorage solo si las claves
 * de categorías y eventos aún no existen.
 * Debe llamarse con await antes de renderizar la app, por ejemplo:
 *   inicializarDatosSemilla().then(() => renderizarApp());
 */
async function inicializarDatosSemilla() {
  const necesitaCategorias = localStorage.getItem(STORAGE_KEYS.CATEGORIAS) === null;
  const necesitaEventos = localStorage.getItem(STORAGE_KEYS.EVENTOS) === null;

  if (necesitaCategorias || necesitaEventos) {
    try {
      const respuesta = await fetch('data-seed.json');
      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
      const datos = await respuesta.json(); // ya hace JSON.parse internamente

      if (necesitaCategorias) {
        Storage.set(STORAGE_KEYS.CATEGORIAS, datos.categorias);
      }
      if (necesitaEventos) {
        Storage.set(STORAGE_KEYS.EVENTOS, datos.eventos);
      }
    } catch (error) {
      console.error('Error cargando data-seed.json:', error);
    }
  }

  if (localStorage.getItem(STORAGE_KEYS.CARRITO) === null) {
    Storage.set(STORAGE_KEYS.CARRITO, []);
  }
  if (localStorage.getItem(STORAGE_KEYS.VENTAS) === null) {
    Storage.set(STORAGE_KEYS.VENTAS, []);
  }
}

/* ------------------------------------------------------------
   Ejemplos de uso una vez sembrados los datos
   ------------------------------------------------------------ */

// Leer eventos guardados:
// const eventos = Storage.get(STORAGE_KEYS.EVENTOS);

// Agregar un evento al carrito:
// const carrito = Storage.get(STORAGE_KEYS.CARRITO);
// carrito.push({ eventoId: 1, cantidad: 2 });
// Storage.set(STORAGE_KEYS.CARRITO, carrito);