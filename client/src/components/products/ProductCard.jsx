import { Link } from 'react-router-dom'

function formatearPrecio(valor) {
  return '$' + valor.toLocaleString('es-AR')
}

function ProductCard({ producto, onAgregar }) {
  return (
    <li>
      <article className="producto-card">
        <Link to={`/producto/${producto.id}`} className="producto-card__link">
          <figure className="producto-card__media">
            <img 
              src={producto.imagen} 
              alt={`${producto.nombre}, ${producto.categoria.toLowerCase()}`} 
              width="600" 
              height="600" 
              loading="lazy" 
            />  
          </figure>
          <div className="producto-card__info">
            <p className="producto-card__categoria">{producto.categoria}</p>
            <h3>{producto.nombre}</h3>
            <p className="producto-card__price">{formatearPrecio(producto.precio)}</p>
          </div>
        </Link>
        <button
          type="button"
          className="btn btn--secondary producto-card__cta"
          onClick={() => onAgregar(producto)}
        >
          Agregar al carrito
        </button>
      </article>
    </li>
  )
}

export default ProductCard