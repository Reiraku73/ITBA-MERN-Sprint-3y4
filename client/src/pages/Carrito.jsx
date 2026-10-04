import { Link } from 'react-router-dom';
import CartList from '../components/cart/CartList';
import CartSummary from '../components/cart/CartSummary';

export default function Carrito({
  items,
  itemCount,
  subtotal,
  onQuantityChange,
  onRemove,
  onClear,
}) {
  return (
    <main className="cart-page">
      <header className="cart-page__header">
        <p className="cart-page__eyebrow">Hermanos Jota</p>
        <h1>Tu carrito</h1>
        {items.length > 0 && (
          <p className="cart-page__count">
            {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
          </p>
        )}
      </header>

      {items.length === 0 ? (
        <section className="cart-empty" aria-labelledby="cart-empty-title">
          <h2 id="cart-empty-title">Tu carrito está vacío</h2>
          <p>Descubrí muebles hechos para acompañarte durante muchos años.</p>
          <Link className="btn btn--primary" to="/productos">
            Explorar productos
          </Link>
        </section>
      ) : (
        <div className="cart-layout">
          <CartList
            items={items}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
          <CartSummary itemCount={itemCount} subtotal={subtotal} onClear={onClear} />
        </div>
      )}
    </main>
  );
}
