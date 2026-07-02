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
│   ├── data-seed.js       # Datos iniciales (categorías y eventos)
│   ├── components.js      # Web Components: evento-card, carrito-item, categoria-card
│   ├── main.js             # Router y lógica de la vista pública
│   └── admin.js            # Login, guardia de sesión y CRUD del panel
└── assets/img/
```

## Persistencia (localStorage)

| Clave | Tipo | Uso |
|---|---|---|
| `categorias` | Array de objetos | Categorías disponibles |
| `eventos` | Array de objetos | Eventos creados por el administrador |
| `carrito` | Array de objetos | Eventos seleccionados por el cliente |
| `ventas` | Array de objetos | Compras realizadas |
| `sesionAdmin` | Objeto | Control de sesión del administrador |

## Cómo ejecutarlo

No requiere build ni dependencias. Basta con abrir `index.html` en el navegador
(recomendado servirlo con un servidor local, por ejemplo la extensión
"Live Server" de VS Code, para evitar restricciones de `file://` con módulos e imágenes).

## Flujo principal

1. El cliente explora eventos en `index.html`, filtra por categoría/ciudad/precio y agrega al carrito.
2. Completa sus datos en el checkout → se guarda una venta en `localStorage`.
3. El administrador inicia sesión en `admin.html` y gestiona categorías y eventos (CRUD completo).
4. El panel de ventas muestra los pedidos ordenados por fecha, con detalle por pedido.
