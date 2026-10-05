# 🪑 Hermanos Jota — E-commerce artesanal

**Proyecto final — Full Stack Developer**  
**ITBA Educación Ejecutiva**

Este repositorio contiene una aplicación e-commerce para **Hermanos Jota**, una mueblería artesanal argentina, desarrollada con un frontend en React y un backend con Express que ofrece una API REST.

La versión actual del proyecto no usa base de datos ni autenticación real del lado del servidor; la información de productos, opiniones, carrito y sesión se maneja principalmente del lado del cliente y desde archivos de datos del backend.

---

## 👥 Equipo

| Integrante | GitHub |
| --- | --- |
| **Orodaz Mateo** | [@Reiraku73](https://github.com/Reiraku73) |
| **Sacca Jurado Maximo Julian** | [@maximosacca](https://github.com/maximosacca) |
| **Martin de Achaval** | [@martindeachaval](https://github.com/martindeachaval) |
| **Tomás Zambrano** | [@tommyrk](https://github.com/tommyrk) |
| **Franco Lugo** | [@RoBeeBot](https://github.com/RoBeeBot) |

---

# 🎯 Objetivo del proyecto

Desarrollar una experiencia de compra completa para un e-commerce de muebles artesanales, combinando:

- una interfaz moderna y responsive en React,
- una API REST con Node.js y Express,
- navegación por catálogo y detalle de producto,
- carrito de compras,
- autenticación local de usuarios,
- y contenido dinámico como opiniones del cliente.

---

# 🏗️ Arquitectura del proyecto

El repositorio está separado en dos proyectos independientes:

```text
ITBA-MERN-Sprint-3y4/
├── client/   → Frontend en React + Vite
├── server/   → Backend en Express + API REST
├── README.md
└── .gitignore
```

```text
┌──────────────────────┐      HTTP JSON       ┌──────────────────────┐
│                      │ ───────────────────► │                      │
│   client (React)     │                      │   server (Express)    │
│   localhost:5173     │ ◄────────────────── │   localhost:3001     │
│                      │      productos,      │                      │
│                      │      opiniones,      │                      │
│                      │      etc.            │                      │
└──────────────────────┘                      └──────────────────────┘
```

---

# 🛠️ Stack tecnológico actual

| Tecnología | Uso |
| --- | --- |
| **React** | Interfaz de usuario |
| **Vite** | Desarrollo y build del frontend |
| **React Router** | Navegación entre páginas |
| **Node.js** | Entorno del servidor backend |
| **Express** | API REST y manejo de rutas |
| **CORS** | Permitir requests desde el frontend |
| **CSS3** | Estilos y responsive design |
| **localStorage** | Persistencia del carrito y sesión de usuario |

---

# ⚙️ Backend — `server/`

El backend corre con Express y expone varios endpoints REST para servir datos del e-commerce.

## Endpoints disponibles

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/productos` | Devuelve el listado completo de productos |
| `GET` | `/api/productos/:id` | Devuelve un producto por su `id` |
| `GET` | `/api/opiniones` | Devuelve una lista de opiniones del cliente |

## Middlewares y configuración

La app Express incluye:

- `cors()` para permitir conexiones desde el frontend
- `express.json({ limit: '100kb' })` para parsear JSON
- logger global para registrar cada request
- manejo de rutas no encontradas (`404`)
- manejador centralizado de errores

## Estructura del backend

```text
server/
├── package.json
├── .env.example
└── src/
    ├── app.js
    ├── server.js
    ├── controllers/
    │   ├── productController.js
    │   └── opinionsController.js
    ├── data/
    │   ├── productos.js
    │   └── opiniones.js
    ├── middleware/
    │   ├── logger.js
    │   ├── notFound.js
    │   └── errorHandler.js
    └── routes/
        ├── products.js
        └── opinions.js
```

---

# ⚛️ Frontend — `client/`

El frontend está desarrollado en React bajo Vite y consume la API del backend con `fetch` a través de un cliente HTTP centralizado.

## Funcionalidades principales

- Catálogo de productos
- Detalle del producto
- Carrito de compras con persistencia en `localStorage`
- Login y registro de usuarios
- Cuenta de usuario
- Formulario de contacto
- Páginas legales: términos, privacidad, cambios y devoluciones
- Carrusel de destacados y secciones de home
- Listado de opiniones

## Estructura del frontend

```text
client/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── public/
│   └── images/
│       ├── branding/
│       ├── icons/
│       ├── productos/
│       └── relacionadas/
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── components/
    │   ├── cart/
    │   ├── home/
    │   ├── layout/
    │   ├── products/
    │   └── ui/
    ├── data/
    ├── hooks/
    │   ├── useAuth.js
    │   └── useOpinions.js
    ├── pages/
    │   ├── Home.jsx
    │   ├── Productos.jsx
    │   ├── Producto.jsx
    │   ├── Carrito.jsx
    │   ├── Login.jsx
    │   ├── Registro.jsx
    │   ├── Cuenta.jsx
    │   ├── Contacto.jsx
    │   ├── NotFound.jsx
    │   ├── Terminos.jsx
    │   ├── Privacidad.jsx
    │   └── CambiosDevoluciones.jsx
    ├── services/
    │   └── api.js
    ├── styles/
    │   └── styles.css
    └── utils/
```

---

# 🚀 Instalación y ejecución

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

## 1. Clonar el repositorio

```bash
git clone https://github.com/Reiraku73/ITBA-MERN-Sprint-3y4.git
cd ITBA-MERN-Sprint-3y4
```

## 2. Configurar y levantar el backend

```bash
cd server
npm install
```

Crear `server/.env` a partir de `server/.env.example`:

```env
PORT=3001
```

Ejecutar:

```bash
npm run dev
```

La API queda disponible en:

```text
http://localhost:3001
```

## 3. Configurar y levantar el frontend

En otra terminal, desde la raíz del proyecto:

```bash
cd client
npm install
```

Crear `client/.env` a partir de `client/.env.example`:

```env
VITE_API_URL=http://localhost:3001/api
```

Ejecutar:

```bash
npm run dev
```

La aplicación queda disponible en:

```text
http://localhost:5173
```

> ⚠️ Es necesario tener ambos servidores corriendo simultáneamente para que el frontend pueda consumir la API y mostrar los productos correctamente.

---

# 🧪 Probar la API

Ejemplos de requests esperados:

```bash
GET http://localhost:3001/api/productos
GET http://localhost:3001/api/productos/1
GET http://localhost:3001/api/opiniones
```

Resultados esperados:

- `GET /api/productos` → devuelve JSON con el arreglo de productos
- `GET /api/productos/:id` → devuelve el producto solicitado o `404`
- `GET /api/opiniones` → devuelve JSON con las opiniones

---

# 🧭 Decisiones de implementación

- **Separación en dos proyectos**: frontend y backend viven en carpetas distintas con dependencias y scripts independientes.
- **React + Vite**: elección por rendimiento, simplicidad y compatibilidad moderna con React.
- **Express como API REST**: organiza la lógica del servidor y centraliza los datos de productos/opiniones.
- **`localStorage` para carrito y sesión**: permite mantener estado sin backend de persistencia.
- **API service centralizado**: la lógica de requests y manejo de errores queda agrupada en [client/src/services/api.js](client/src/services/api.js).
- **Rutas públicas y privadas**: la app redirige al usuario según si hay sesión activa.
- **Datos en archivos del servidor**: el backend expone información desde archivos de datos y no desde una base de datos aún.

---

# 🎨 Diseño y UX

El proyecto mantiene la identidad visual de la marca Hermanos Jota con:

- paleta cálida y artesanal,
- tipografías de estilo editorial,
- diseño responsive mobile-first,
- UX enfocada en compra, navegación y claridad visual,
- uso de componentes reutilizables para home, productos y layout.

---

# 📚 Estado actual y próximos pasos

## Estado actual

El proyecto ya incluye:

- [x] frontend React con rutas y layout
- [x] catálogo dinámico de productos
- [x] detalle de producto
- [x] carrito con persistencia local
- [x] login/registro y perfil de usuario
- [x] formulario de contacto
- [x] API REST con productos y opiniones
- [x] manejo de errores y rutas no encontradas

## Mejoras futuras sugeridas

- conectar la app a una base de datos real (MongoDB / Mongoose)
- implementar autenticación real con JWT y contraseñas hasheadas
- agregar endpoints `POST`, `PUT` y `DELETE`
- persistir pedidos y usuarios en backend
- separar aún más la lógica de negocio y validación de entrada

---

*Proyecto desarrollado en el marco del curso Full Stack Developer — ITBA Educación Ejecutiva.*
