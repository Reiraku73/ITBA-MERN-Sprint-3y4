import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductoById, getProductos } from '../services/productService';
import { isNotFound } from '../services/api';
import { useApiQuery } from '../hooks/useApiQuery';
import { buildRelated } from '../utils/related';
import Loading from '../components/ui/Loading';
import Alert from '../components/ui/Alert';
import ProductGallery from '../components/products/ProductGallery';
import ProductInfo from '../components/products/ProductInfo';
import TrustStrip from '../components/products/TrustStrip';
import ProductCarousel from '../components/products/ProductCarousel';
import PaymentMethods from '../components/products/PaymentMethods';
import PaymentMethodsModal from '../components/products/PaymentMethodsModal';
import ProductSpecs from '../components/products/ProductSpecs';
import ProductDescription from '../components/products/ProductDescription';

// Ficha de producto: /productos/:id
// onAgregar(producto, cantidad) lo pasa App (viene de useCart).
export default function Producto({ onAgregar }) {
  const { id = '' } = useParams();
  const {
    data: producto,
    loading,
    error,
    reload,
  } = useApiQuery((signal) => getProductoById(id, { signal }), [id]);

  useEffect(() => {
    document.title = producto ? `${producto.nombre} | Hermanos Jota` : 'Producto | Hermanos Jota';
  }, [producto]);

  // Al pasar de un producto a otro (desde un carrusel) se vuelve arriba.
  useEffect(() => {
    window.scrollTo?.(0, 0);
  }, [id]);

  // Renderizado condicional: cargando → no existe → error → ficha.
  // "No existe" y "no pudimos cargarlo" son cosas distintas: en el segundo
  // caso tiene sentido reintentar, en el primero no.
  let contenido;
  if (loading) {
    contenido = <Loading>Cargando producto...</Loading>;
  } else if (error != null && isNotFound(error)) {
    contenido = (
      <div className="state-message">
        <p role="alert">No encontramos ese producto. Puede que el enlace esté roto o que ya no esté disponible.</p>
        <Link to="/productos">Volver al catálogo</Link>
      </div>
    );
  } else if (error != null || !producto) {
    contenido = (
      <div>
        <Alert title="No pudimos cargar el producto" error={error} onRetry={reload} />
        <Link to="/productos">Volver al catálogo</Link>
      </div>
    );
  } else {
    // key: al pasar de un producto a otro se reinicia todo (cantidad, galería).
    contenido = <ProductDetail key={producto.id} producto={producto} onAgregar={onAgregar} />;
  }

  return (
    <main>
      <div className="pdp">
        <div className="pdp__inner">{contenido}</div>
      </div>
    </main>
  );
}

function Breadcrumb({ producto }) {
  return (
    <nav className="pdp__breadcrumb" aria-label="Ruta de navegación">
      <ol>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>{producto.categoria}</li>
        <li aria-current="page">{producto.nombre}</li>
      </ol>
    </nav>
  );
}

function ProductDetail({ producto, onAgregar }) {
  const [pagosAbierto, setPagosAbierto] = useState(false);

  // Los carruseles son un complemento: si el catálogo no carga, simplemente
  // no se muestran (la ficha del producto en sí ya está completa y usable).
  const { data: catalogo } = useApiQuery((signal) => getProductos({ signal }), []);
  const relacionados = buildRelated(producto, catalogo ?? []);

  return (
    <>
      <Breadcrumb producto={producto} />

      <article className="pdp__top">
        <div className="pdp__media">
          <ProductGallery producto={producto} />
        </div>
        <ProductInfo producto={producto} onAgregar={onAgregar} onShowPayments={() => setPagosAbierto(true)} />
      </article>

      <TrustStrip />

      <ProductCarousel title="También te puede gustar" productos={relacionados.alsoLike} />
      <PaymentMethods />
      <ProductSpecs specs={producto.specs} />
      <ProductDescription descripcion={producto.descripcion} />
      <ProductCarousel title="Completá tu espacio" productos={relacionados.complete} />

      {pagosAbierto && <PaymentMethodsModal onClose={() => setPagosAbierto(false)} />}
    </>
  );
}
