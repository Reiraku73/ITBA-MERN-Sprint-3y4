import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { announce } from '../utils/announce';
import CartList from '../components/cart/CartList';
import CartSummary from '../components/cart/CartSummary';

// Carrito: /carrito
export default function Carrito() {
  const { items, cantidadTotal, total, quitar, cambiarCantidad } = useCart();

  useEffect(() => {
    document.title = 'Carrito | Hermanos Jota';
  }, []);

  function handleQuitar(producto) {
    quitar(producto.id);
    announce(`${producto.nombre} quitado del carrito`);
  }

  if (items.length === 0) {
    return (
      <main>
        <section id="carrito-contenido">
          <div className="carrito__vacio">
            <h1>Tu carrito está vacío</h1>
            <p>Todavía no agregaste productos.</p>
            <Link to="/productos" className="btn btn--primary">
              Ver productos
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section id="carrito-contenido" aria-labelledby="carrito-titulo">
        <h1 id="carrito-titulo">Tu carrito</h1>
        <CartList items={items} onCambiarCantidad={cambiarCantidad} onQuitar={handleQuitar} />
        <CartSummary total={total} cantidadTotal={cantidadTotal} />
      </section>
    </main>
  );
}
