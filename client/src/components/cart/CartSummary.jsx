import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

export default function CartSummary({ itemCount, subtotal, onClear }) {
  return (
    <aside className="cart-summary" aria-labelledby="cart-summary-title">
      <h2 id="cart-summary-title">Resumen</h2>
      <p className="cart-summary__line">
        <span>Productos ({itemCount})</span>
        <span>{formatCurrency(subtotal)}</span>
      </p>
      <p className="cart-summary__total">
        <span>Subtotal</span>
        <strong>{formatCurrency(subtotal)}</strong>
      </p>
      <p className="cart-summary__note">
        El envío y los medios de pago se coordinan al confirmar el pedido.
      </p>
      <Link className="btn btn--primary cart-summary__continue" to="/productos">
        Seguir comprando
      </Link>
      <button className="cart-summary__clear" type="button" onClick={onClear}>
        Vaciar carrito
      </button>
    </aside>
  );
}
