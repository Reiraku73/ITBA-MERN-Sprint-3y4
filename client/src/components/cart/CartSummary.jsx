import { formatCurrency } from '../../utils/formatCurrency';

// Total del carrito. Todavía no existe la pantalla de pago: el botón queda
// deshabilitado y lo explica la nota (aria-describedby). Cuando haya
// checkout, se reemplaza por un <Link to="/checkout" className="btn btn--primary">.
export default function CartSummary({ total, cantidadTotal }) {
  const texto = cantidadTotal === 1 ? '1 producto' : `${cantidadTotal} productos`;

  return (
    <div className="carrito__resumen">
      <p className="carrito__total">
        Total ({texto}): <strong>{formatCurrency(total)}</strong>
      </p>
      <button type="button" className="btn btn--primary" disabled aria-describedby="carrito-checkout-nota">
        Ir a pagar
      </button>
      <p id="carrito-checkout-nota" className="carrito__checkout-nota">
        El pago online todavía no está disponible.
      </p>
    </div>
  );
}
