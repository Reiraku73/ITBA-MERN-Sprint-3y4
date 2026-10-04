import { Link } from 'react-router-dom';
import QuantitySelector from '../products/QuantitySelector';
import SafeImage from '../ui/SafeImage';
import { formatCurrency } from '../../utils/formatCurrency';

// Una línea del carrito: imagen, nombre y precio, cantidad, subtotal y "Quitar".
export default function CartItem({ linea, onCambiarCantidad, onQuitar }) {
  const { producto, cantidad } = linea;

  return (
    <li className="carrito__item">
      {/* alt vacío: el nombre ya está en el título de al lado. */}
      <SafeImage src={producto.imagen} alt="" width={80} height={80} />

      <div className="carrito__item-info">
        <h2>
          <Link to={`/productos/${producto.id}`}>{producto.nombre}</Link>
        </h2>
        <p className="carrito__item-precio">{formatCurrency(producto.precio)}</p>
      </div>

      <div className="carrito__item-stepper">
        <QuantitySelector
          value={cantidad}
          onChange={(nueva) => onCambiarCantidad(producto.id, nueva)}
          max={producto.stock}
          itemLabel={producto.nombre}
        />
      </div>

      <p className="carrito__item-subtotal">{formatCurrency(producto.precio * cantidad)}</p>

      <button
        type="button"
        className="btn btn--secondary carrito__item-quitar"
        aria-label={`Quitar ${producto.nombre} del carrito`}
        onClick={() => onQuitar(producto)}
      >
        Quitar
      </button>
    </li>
  );
}
