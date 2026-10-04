import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export const CartContext = createContext(undefined);

const STORAGE_KEY = 'hermanos-jota-cart';

// Del producto se guarda solo lo que el carrito necesita mostrar (no la
// descripción ni las specs): así el localStorage no se llena de texto que
// nunca se usa acá. El stock es opcional: el catálogo actual no lo trae.
function snapshot(producto) {
  return {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    imagen: producto.imagen,
    ...(typeof producto.stock === 'number' ? { stock: producto.stock } : {}),
  };
}

// Cantidad entera >= 1 y, si el producto tiene stock, sin pasarse de él.
function limitar(cantidad, stock) {
  const entero = Math.max(1, Math.floor(cantidad) || 1);
  return typeof stock === 'number' ? Math.max(1, Math.min(stock, entero)) : entero;
}

// Lo que viene de localStorage puede estar viejo, editado a mano o corrupto:
// se descarta cualquier línea con forma inesperada en vez de romper la página.
function esLineaValida(linea) {
  const p = linea?.producto;
  return (
    p != null &&
    (typeof p.id === 'string' || typeof p.id === 'number') &&
    typeof p.nombre === 'string' &&
    Number.isFinite(p.precio) &&
    p.precio >= 0 &&
    Number.isInteger(linea.cantidad) &&
    linea.cantidad >= 1
  );
}

function leerStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(esLineaValida) : [];
  } catch {
    // Storage bloqueado (modo incógnito estricto) o JSON inválido: se
    // arranca con el carrito vacío en vez de romper la app.
    return [];
  }
}

// Carrito de invitado: vive en el navegador (no hay login ni endpoints de
// carrito en este server). Cada línea es { producto: {...}, cantidad }.
export function CartProvider({ children }) {
  // Lazy initializer: lee localStorage una sola vez, al montar.
  const [items, setItems] = useState(leerStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage lleno o bloqueado: el carrito sigue funcionando en memoria,
      // solo que no sobrevive a una recarga.
    }
  }, [items]);

  const agregar = useCallback((producto, cantidad = 1) => {
    // Sin stock no se agrega (la ficha ya deshabilita el botón; esto cubre
    // cualquier otro lugar que llame a agregar).
    if (typeof producto.stock === 'number' && producto.stock < 1) return;

    setItems((prev) => {
      const existente = prev.find((l) => l.producto.id === producto.id);
      if (existente) {
        return prev.map((l) =>
          l.producto.id === producto.id
            ? { producto: snapshot(producto), cantidad: limitar(l.cantidad + cantidad, producto.stock) }
            : l
        );
      }
      return [...prev, { producto: snapshot(producto), cantidad: limitar(cantidad, producto.stock) }];
    });
  }, []);

  const quitar = useCallback((id) => {
    setItems((prev) => prev.filter((l) => l.producto.id !== id));
  }, []);

  const cambiarCantidad = useCallback((id, cantidad) => {
    setItems((prev) =>
      prev.map((l) => (l.producto.id === id ? { ...l, cantidad: limitar(cantidad, l.producto.stock) } : l))
    );
  }, []);

  const vaciar = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      cantidadTotal: items.reduce((suma, l) => suma + l.cantidad, 0),
      total: items.reduce((suma, l) => suma + l.producto.precio * l.cantidad, 0),
      agregar,
      quitar,
      cambiarCantidad,
      vaciar,
    }),
    [items, agregar, quitar, cambiarCantidad, vaciar]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
