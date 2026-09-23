# Hermanos Jota

E-commerce artesanal desarrollado como proyecto de Full Stack Developer.

## Stack

### Client
- React
- Vite
- TypeScript
- React Router
- Context API
- CSS

### Server
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt

## Estructura

```text
|-- ITBA-MERN-Sprint-3y4/
    |-- client/
    |   |-- public/
    |   |   |-- images/
    |   |       |-- branding/
    |   |       |-- productos/
    |   |       |-- relacionadas/
    |   |-- src/
    |       |-- components/
    |       |   |-- auth/
    |       |   |-- cart/
    |       |   |-- home/
    |       |   |-- layout/
    |       |   |-- products/
    |       |   |-- ui/
    |       |-- context/
    |       |-- hooks/
    |       |-- pages/
    |       |-- services/
    |       |-- styles/
    |       |-- types/
    |       |-- utils/
    |-- server/
        |-- src/
            |-- config/
            |-- controllers/
            |-- middleware/
            |-- models/
            |-- routes/
```
## Desarrollo

El frontend y backend se ejecutan como proyectos independientes.

Antes de ejecutar el servidor, configurar `server/.env` a partir de `server/.env.example`.

Antes de ejecutar el cliente, configurar `client/.env` a partir de `client/.env.example`.
