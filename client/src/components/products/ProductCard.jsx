import { Link } from 'react-router-dom'
import { announce } from '../../utils/announce'

function formatearPrecio(valor) {
  return '$' + valor.toLocaleString('es-AR')
}

// onAgregar de Franco creo
function ProductCard({ producto, onAgregar }) {
  return (
    <li>
      <article className="producto-card">
        <Link to={`/productos/${producto.id}`} className="producto-card__link">
          <figure className="producto-card__media">
            <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
          </figure>
          <div className="producto-card__info">
            <h3>{producto.nombre}</h3>
            <p className="producto-card__price">{formatearPrecio(producto.precio)}</p>
          </div>
        </Link>
        <button
          type="button"
          className="btn btn--secondary producto-card__cta"
          aria-label={`Agregar ${producto.nombre} al carrito`}
          onClick={() => {
            onAgregar?.(producto)
            announce(`${producto.nombre} agregado al carrito`)
          }}
        >
          Agregar al carrito
        </button>
      </article>
    </li>
  )
}

export default ProductCard