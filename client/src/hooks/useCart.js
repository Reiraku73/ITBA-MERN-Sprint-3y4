import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

// { items, cantidadTotal, total, agregar, quitar, cambiarCantidad, vaciar }
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}
