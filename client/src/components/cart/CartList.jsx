import CartItem from './CartItem';

export default function CartList({ items, onCambiarCantidad, onQuitar }) {
  return (
    <ul className="carrito__lista">
      {items.map((linea) => (
        <CartItem
          key={linea.producto.id}
          linea={linea}
          onCambiarCantidad={onCambiarCantidad}
          onQuitar={onQuitar}
        />
      ))}
    </ul>
  );
}
