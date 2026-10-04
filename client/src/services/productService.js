import { http } from './api';

// GET /api/productos → array con todos los productos.
export function getProductos(options) {
  return http.get('/productos', options);
}

// GET /api/productos/:id → un producto, o HttpError 404 si no existe.
// encodeURIComponent: un id con caracteres raros ("a/b", "a?b") no puede
// alterar la ruta.
export function getProductoById(id, options) {
  return http.get(`/productos/${encodeURIComponent(id)}`, options);
}
