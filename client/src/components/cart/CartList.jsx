import CartItem from './CartItem';

export default function CartList({ items, onQuantityChange, onRemove }) {
  return (
    <ul className="cart-list" aria-label="Productos en el carrito">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
