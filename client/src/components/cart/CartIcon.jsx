import { NavLink } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

// Ícono del carrito del header, con el contador de productos.
export default function CartIcon() {
  const { cantidadTotal } = useCart();
  const texto = cantidadTotal === 1 ? '1 producto' : `${cantidadTotal} productos`;

  return (
    <NavLink to="/carrito" className="header__icon-link header__cart" aria-label={`Carrito de compras, ${texto}`}>
      <img src="/icons/cart.svg" alt="" width="24" height="24" />
      {/* El número es decorativo: el aria-label del link ya dice la cantidad. */}
      <span className="cart-count" aria-hidden="true">
        {cantidadTotal}
      </span>
    </NavLink>
  );
}
