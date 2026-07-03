# TuEventoHub.com

Plataforma web de venta de entradas para eventos, dividida en dos frentes:
vista pública para clientes (`index.html`) y panel de administración (`admin.html`).

## Acceso administrador
- **Correo:** `admin@mail.com`
- **Contraseña:** `123456`

## Estructura de carpetas

```
Proyecto_TuEventoHub/
├── index.html          # Vista pública (home, eventos, detalle, carrito, compra)
├── admin.html           # Login + panel de administración
├── css/
│   ├── styles.css        # Variables :root, reset, componentes y layout
│   └── responsive.css     # Breakpoints tablet / móvil
├── js/
│   ├── storage.js         # Capa de persistencia sobre localStorage
│   ├── data-seed.js       # Carga categorias.json/eventos.json a localStorage (fetch + JSON.stringify)
│   ├── components.js      # Web Components: evento-card, carrito-item, categoria-card
│   ├── main.js             # Router y lógica de la vista pública
│   └── admin.js            # Login, guardia de sesión y CRUD del panel
└── assets/
    ├── img/
    └── data/
        ├── categorias.json
        └── eventos.json
```

> **Importante:** como `data-seed.js` usa `fetch()` para leer los `.json`, el proyecto
> **debe abrirse con un servidor local** (Live Server, `npx serve`, etc.) y no con
> doble clic sobre `index.html` (`file://`), porque los navegadores bloquean `fetch`
> a archivos locales por seguridad (CORS).

## Persistencia (localStorage)

| Clave | Tipo | Uso | Origen la primera vez |
|---|---|---|---|
| `categorias` | Array de objetos | Categorías disponibles | `assets/data/categorias.json` |
| `eventos` | Array de objetos | Eventos creados por el administrador | `assets/data/eventos.json` |
| `carrito` | Array de objetos | Eventos seleccionados por el cliente | Array vacío `[]` |
| `ventas` | Array de objetos | Compras realizadas | Array vacío `[]` |
| `sesionAdmin` | Objeto | Control de sesión del administrador | No existe hasta iniciar sesión |

En cargas posteriores, `data-seed.js` detecta que las claves ya existen en
`localStorage` y **no vuelve a hacer fetch**: todo se lee directo con
`JSON.parse(localStorage.getItem(clave))` a través de `Storage.get()`.

## Cómo ejecutarlo

No requiere build ni dependencias, pero **sí necesita un servidor local**
(por el `fetch()` a los `.json`). Opciones simples:

```bash
# Con Node instalado
npx serve .

# o con Python
python3 -m http.server 5500
```

Y luego abrir `http://localhost:5500` (o el puerto que indique). También
funciona con la extensión "Live Server" de VS Code.

## Flujo principal

1. El cliente explora eventos en `index.html`, filtra por categoría/ciudad/precio y agrega al carrito.
2. Completa sus datos en el checkout → se guarda una venta en `localStorage`.
3. El administrador inicia sesión en `admin.html` y gestiona categorías y eventos (CRUD completo).
4. El panel de ventas muestra los pedidos ordenados por fecha, con detalle por pedido.