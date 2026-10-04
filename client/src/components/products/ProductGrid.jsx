import { useProductos } from '../../hooks/useProductos';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const { productos, cargando, error, reintentar } = useProductos();

  if (error) {
    return (
      <section className="productos-listado" aria-labelledby="productos-listado-title">
        <div style={{ padding: '2rem', textAlign: 'center', background: '#ffebee', color: '#c62828', borderRadius: '8px' }}>
          <p>⚠️ Ha habido un error: {error}</p>
          <button onClick={reintentar} className="btn btn--secondary" style={{ marginTop: '1rem' }}>
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="productos-listado" aria-labelledby="productos-listado-title">
      <h1 id="productos-listado-title">Catálogo completo</h1>
      <p className="productos-listado__intro">
        Once piezas, cada una fabricada a mano en nuestro taller. Elegí una
        para ver medidas, materiales y acabados en detalle.
      </p>

      {cargando ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-ink-soft)' }}>
          Cargando el catálogo...
        </div>
      ) : (
        <ul className="productos-listado__grid" id="productos-listado-grid">
          {productos.map((producto) => (
            <ProductCard 
              key={producto.id} 
              producto={producto} 
              // Aca se debe realizar la logica para el carrito (onAgregar)
            />
          ))}
        </ul>
      )}
    </section>
  );
}