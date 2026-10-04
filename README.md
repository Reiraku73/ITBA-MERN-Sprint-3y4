# 🪑 Hermanos Jota — E-commerce de Mueblería Artesanal

**Proyecto Final — Sprints 3 y 4 — Full Stack Developer**
**ITBA Educación Ejecutiva**

Sitio web de e-commerce para **Hermanos Jota**, una mueblería artesanal argentina.

En esta etapa el proyecto pasa de ser un sitio estático (HTML, CSS y JavaScript nativo, Sprints 1 y 2) a una **aplicación cliente-servidor**:

* El **frontend** se reconstruye desde cero con **React**.
* El **backend** es una **API REST propia** hecha con **Node.js** y **Express**, que sirve los datos de los productos.

El frontend ya no usa datos locales: le pide la información a la API con `fetch` y la muestra dinámicamente.

---

## 👥 Equipo

| Integrante                     | GitHub                                                 |
| ------------------------------ | ------------------------------------------------------ |
| **Orodaz Mateo**               | [@Reiraku73](https://github.com/Reiraku73)             |
| **Sacca Jurado Maximo Julian** | [@maximosacca](https://github.com/maximosacca)         |
| **Martin de Achaval**          | [@martindeachaval](https://github.com/martindeachaval) |
| **Tomás Zambrano**             | [@tommyrk](https://github.com/tommyrk)                 |
| **Franco Lugo**                | [@RoBeeBot](https://github.com/RoBeeBot)               |

---

# 🎯 Objetivos de aprendizaje

### Sprint 3 — Backend

1. Conocer el rol de Node.js y Express.js en la construcción de servidores web.
2. Configurar un servidor Express básico.
3. Crear endpoints de API para manejar solicitudes GET.
4. Entender el ciclo de solicitud/respuesta HTTP.
5. Probar los endpoints con Postman.
6. Organizar las rutas de forma modular con `express.Router`.
7. Implementar middlewares propios (logging).

### Sprint 4 — Frontend con React

1. Conocer los conceptos centrales de React: componentes, JSX, props y estado.
2. Configurar un entorno de desarrollo React.
3. Construir componentes de UI.
4. Manejar el estado con `useState` y pasar datos entre componentes con props.
5. Manejar eventos del usuario.
6. Renderizar listas con `.map()` usando `key` correctamente.
7. Usar renderizado condicional para mostrar distintas vistas.
8. Conectar React con la API usando `fetch` y manejar el ciclo de la petición (carga, éxito, error).

---

# 🏗️ Arquitectura

El repositorio tiene dos proyectos independientes, cada uno con su `package.json`:

```text
ITBA-MERN-Sprint-3y4/
├── client/   → Aplicación de React (frontend)
└── server/   → Aplicación de Node.js + Express (backend / API REST)
```

```text
┌──────────────────────┐   GET /api/productos    ┌──────────────────────┐
│                      │ ──────────────────────► │                      │
│   client (React)     │                         │   server (Express)   │
│   localhost:5173     │ ◄────────────────────── │   localhost:3001     │
│                      │      JSON productos     │                      │
└──────────────────────┘                         └──────────┬───────────┘
                                                            │
                                                            ▼
                                                 data/productos.js
                                                 (array de objetos)
```

---

# ⚙️ Backend — `server/`

## Endpoints

| Método | Ruta                 | Respuesta                                         |
| ------ | -------------------- | ------------------------------------------------- |
| GET    | `/api/productos`     | Listado completo de productos en JSON             |
| GET    | `/api/productos/:id` | Un producto por `id`, o **404** si no existe      |

## Middlewares

* **Logger global:** registra en consola el método y la URL de cada petición.
* **`express.json()`:** procesa cuerpos JSON, preparado para futuras peticiones POST.
* **Manejador de 404:** responde cuando la ruta pedida no existe.
* **Manejador de errores centralizado:** atrapa los errores de toda la app y devuelve una respuesta uniforme.

## Estructura

```text
server/
├── package.json
├── .env.example
└── src/
    ├── server.js              → Levanta el servidor en el puerto configurado
    ├── app.js                 → Configura Express, middlewares y rutas
    ├── data/
    │   └── productos.js       → Array de productos (fuente de datos)
    ├── routes/
    │   └── productos.js       → Rutas de /api/productos con express.Router
    ├── controllers/
    │   └── productController.js
    └── middleware/
        ├── logger.js
        ├── notFound.js
        └── errorHandler.js
```

---

# ⚛️ Frontend — `client/`

## Componentes

| Componente             | Ubicación                 | Descripción                                                   |
| ---------------------- | ------------------------- | ------------------------------------------------------------- |
| `Navbar`               | `components/layout/`      | Logo, buscador, accesos a cuenta y carrito con contador       |
| `MobileMenu`           | `components/layout/`      | Navegación principal, con apertura en mobile                  |
| `Footer`               | `components/layout/`      | Navegación, información legal, contacto y redes               |
| `HeroCarousel`         | `components/home/`        | Carrusel de productos destacados con estados de carga y error |
| `SustainableMaterials` | `components/home/`        | Sección de materiales sustentables (`MaterialCard` por props) |
| `ProductCard`          | `components/products/`    | Tarjeta individual de producto                                |
| `ProductList`          | `components/products/`    | Listado de productos renderizado con `.map()`                 |
| `ProductDetail`        | `components/products/`    | Detalle de un producto (renderizado condicional)              |
| `ContactForm`          | `components/`             | Formulario de contacto controlado con `useState`              |

## Funcionalidades

* **Catálogo dinámico:** `fetch` a `GET /api/productos`, con estados de **carga** y **error**.
* **Detalle de producto:** se muestra con renderizado condicional al seleccionar un producto.
* **Carrito de compras:** el estado vive en `App.jsx` y la cantidad llega al contador del Navbar por props.
* **Formulario de contacto controlado:** cada campo está vinculado a un estado con `useState`.
* **Navegación** entre páginas con React Router y página **404** para rutas inexistentes.

## Estructura

```text
client/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── public/
│   └── images/
│       ├── branding/        → Logo, isotipo y favicons
│       ├── icons/           → Íconos SVG (carrito, usuario, redes, etc.)
│       ├── productos/       → Fotos de productos
│       └── relacionadas/    → Imágenes de secciones (materiales, historia)
└── src/
    ├── main.jsx             → Punto de entrada
    ├── App.jsx              → Rutas, estado del carrito y layout general
    ├── components/
    │   ├── home/
    │   ├── layout/
    │   ├── products/
    │   └── ui/
    ├── pages/               → Home, Productos, Producto, Contacto, NotFound, etc.
    ├── services/            → Funciones que hacen fetch a la API
    └── styles/
        └── styles.css       → Hoja de estilos global (sistema de diseño de la marca)
```

---

# 🚀 Instalación y ejecución

## Requisitos

* [Node.js](https://nodejs.org/) 18 o superior (incluye npm).
* [Git](https://git-scm.com/).
* [Postman](https://www.postman.com/) (opcional, para probar la API).

## 1. Clonar el repositorio

```bash
git clone https://github.com/Reiraku73/ITBA-MERN-Sprint-3y4.git
cd ITBA-MERN-Sprint-3y4
```

## 2. Levantar el backend

En una terminal:

```bash
cd server
npm install
```

Crear el archivo `server/.env` a partir de `server/.env.example`:

```env
PORT=3001
```

Ejecutar:

```bash
npm run dev
```

La API queda disponible en `http://localhost:3001/api/productos`.

## 3. Levantar el frontend

En **otra** terminal, desde la raíz del proyecto:

```bash
cd client
npm install
```

Crear el archivo `client/.env` a partir de `client/.env.example`:

```env
VITE_API_URL=http://localhost:3001/api
```

Ejecutar:

```bash
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

> ⚠️ Los dos servidores tienen que estar corriendo al mismo tiempo para que el frontend pueda obtener los productos.

## 4. Probar la API con Postman

| Prueba                 | Petición                                     | Resultado esperado         |
| ---------------------- | -------------------------------------------- | -------------------------- |
| Listado completo       | `GET http://localhost:3001/api/productos`    | `200` + array de productos |
| Producto existente     | `GET http://localhost:3001/api/productos/1`  | `200` + un producto        |
| Producto inexistente   | `GET http://localhost:3001/api/productos/999`| `404`                      |
| Ruta inexistente       | `GET http://localhost:3001/api/cualquiera`   | `404`                      |

---

# 🧭 Decisiones tomadas

* **Separación `client/` y `server/`:** son dos proyectos independientes, con dependencias y scripts propios. Así cada uno se puede desarrollar, probar y desplegar por separado.
* **Vite en lugar de Create React App:** CRA está discontinuado. Vite arranca y recarga mucho más rápido y es la herramienta que hoy recomienda la documentación de React.
* **JavaScript (`.jsx`) en lugar de TypeScript:** la estructura inicial se pensó con TypeScript, pero se migró a JSX para enfocarse en los conceptos de React que pide el sprint (componentes, props, estado y eventos).
* **Datos en un archivo `.js` del servidor:** como pide la consigna, los productos viven en un array de objetos en el backend. Más adelante se podrán reemplazar por una base de datos (MongoDB) sin tocar el frontend, porque este solo consume la API.
* **Rutas modulares con `express.Router`:** cada recurso tiene su archivo de rutas, así `app.js` queda limpio y es fácil sumar recursos nuevos.
* **Carrito en `App.jsx`:** el estado del carrito vive en el componente más alto que lo necesita y baja por props al Navbar (contador) y a los productos (botón de agregar).
* **Datos de UI en arrays + `.map()`:** los links del Footer y las tarjetas de materiales se definen como arrays de objetos y se renderizan con `.map()`. Agregar un ítem nuevo es sumar un objeto, sin repetir JSX.
* **Rutas absolutas para imágenes (`/images/...`):** con React Router, una ruta relativa como `images/...` se rompe en URLs anidadas (por ejemplo `/producto/3`). Por eso todas las imágenes usan rutas que empiezan con `/`.
* **Nombres de archivo sin tildes ni espacios:** los recursos del proyecto usan nombres simples para evitar errores de rutas y diferencias de mayúsculas/minúsculas en servidores Linux.
* **Se reutiliza el CSS del Sprint 1 y 2:** los componentes usan los mismos nombres de clase (metodología BEM) que la versión HTML, así el sistema de diseño de la marca se mantiene sin reescribir estilos.

---

# 🎨 Diseño y accesibilidad

El diseño respeta el **Manual de Marca** de Hermanos Jota:

* **Paleta:** Siena Tostado, Verde Salvia, Alabastro Cálido, Vara de Oro y Rosa Polvoriento, definida como variables CSS.
* **Tipografías:** Playfair Display (títulos) e Inter (cuerpo).
* **Diseño responsive** mobile-first con media queries.

Prácticas de accesibilidad:

* HTML semántico (`header`, `nav`, `main`, `footer`, `address`).
* Atributos `alt` en imágenes y `aria-label` en links que solo tienen ícono.
* Atributos ARIA en el menú mobile (`aria-expanded`, `aria-controls`).
* Indicadores visuales de foco para navegar con teclado.
* Respeto de `prefers-reduced-motion` en el carrusel y las animaciones.

---

# 🛠️ Stack tecnológico

| Tecnología       | Uso                                         |
| ---------------- | ------------------------------------------- |
| **React**        | Interfaz de usuario basada en componentes   |
| **Vite**         | Entorno de desarrollo y build del frontend  |
| **React Router** | Navegación entre páginas                    |
| **CSS3**         | Estilos y diseño responsive                 |
| **Node.js**      | Entorno de ejecución del servidor           |
| **Express**      | Servidor web y API REST                     |
| **Postman**      | Pruebas de los endpoints                    |
| **Git / GitHub** | Control de versiones y trabajo colaborativo |

---

# 📚 Próximas etapas

* Base de datos con MongoDB y Mongoose.
* Endpoints POST, PUT y DELETE (el servidor ya usa `express.json()`).
* Registro, login y autenticación con JWT y contraseñas hasheadas con bcrypt.
* Persistencia del carrito y gestión de órdenes.

---

# 📤 Entregables

* [x] Repositorio en GitHub con las carpetas `/client` y `/server`.
* [x] Historial de commits de todos los integrantes.
* [x] API REST con `GET /api/productos` y `GET /api/productos/:id`.
* [x] Middleware de logging, `express.json()`, manejador de 404 y de errores.
* [x] Frontend en React consumiendo la API con estados de carga y error.
* [x] Carrito con estado en `App.jsx` y contador en el Navbar.
* [x] Formulario de contacto controlado.
* [x] README con integrantes, instalación, arquitectura y decisiones.

---

*Proyecto desarrollado en el marco del curso Full Stack Developer — ITBA Educación Ejecutiva.*
