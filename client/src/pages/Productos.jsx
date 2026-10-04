import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProductos } from '../services/productService';
import { useApiQuery } from '../hooks/useApiQuery';
import Loading from '../components/ui/Loading';
import Alert from '../components/ui/Alert';
import ProductGrid from '../components/products/ProductGrid';

// Quita tildes y pasa a minúsculas: "sillon" encuentra "Sillón".
const normalizar = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

// Listado: /productos  (el buscador del header manda /productos?q=texto)
// onAgregar(producto) lo pasa App (viene de useCart).
export default function Productos({ onAgregar }) {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') ?? '').trim();

  const {
    data: productos,
    loading,
    error,
    reload,
  } = useApiQuery((signal) => getProductos({ signal }), []);

  useEffect(() => {
    document.title = 'Productos | Hermanos Jota';
  }, []);

  // La API devuelve todo el catálogo: la búsqueda se filtra acá.
  const visibles = (productos ?? []).filter(
    (p) => !q || normalizar(`${p.nombre} ${p.categoria}`).includes(normalizar(q))
  );

  let contenido;
  if (loading) {
    contenido = <Loading>Cargando productos...</Loading>;
  } else if (error) {
    contenido = <Alert title="No pudimos cargar los productos" error={error} onRetry={reload} />;
  } else if (visibles.length === 0) {
    contenido = (
      <div className="state-message">
        <p>{q ? `No encontramos productos para "${q}".` : 'Todavía no hay productos para mostrar.'}</p>
        {q && <Link to="/productos">Ver todos los productos</Link>}
      </div>
    );
  } else {
    contenido = <ProductGrid productos={visibles} onAgregar={onAgregar} />;
  }

  return (
    <main>
      <section className="productos-listado" aria-labelledby="productos-listado-title">
        <h1 id="productos-listado-title">{q ? `Resultados para "${q}"` : 'Nuestros productos'}</h1>
        {contenido}
      </section>
    </main>
  );
}
