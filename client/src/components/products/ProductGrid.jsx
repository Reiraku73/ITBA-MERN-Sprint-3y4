import ProductCard from './ProductCard';

// Grilla de tarjetas del listado. Sin productos no dibuja la lista vacía:
// quien la usa decide qué mostrar en ese caso.
export default function ProductGrid({ productos, onAgregar }) {
  if (productos.length === 0) return null;

  return (
    <ul className="productos-listado__grid">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} onAgregar={onAgregar} />
      ))}
    </ul>
  );
}
