import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard.jsx'

//const URL_PRODUCTOS = 'http://localhost:3000/api/productos'.
const URL_PRODUCTOS = '/data/productos.json'
const CANTIDAD_SKELETONS = 5

// onAgregar de Franco
function FeaturedProducts({ onAgregar }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setCargando(true)
    setError(null)

    fetch(URL_PRODUCTOS)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`Error al obtener productos (status ${respuesta.status})`)
        }
        return respuesta.json()
      })
      .then((data) => {
        setProductos(data.filter((producto) => producto.destacado))
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setCargando(false)
      })
  }, [])

  return (
    <section className="productos-destacados">
      <h2>Productos destacados</h2>

      <ul className="productos-destacados__grid" id="productos-destacados-grid">
        {cargando &&
          Array.from({ length: CANTIDAD_SKELETONS }).map((_, i) => (
            <li key={`skeleton-${i}`} className="skeleton-card" aria-hidden="true"></li>
          ))}

        {error && (
          <li className="estado-error">
            No pudimos cargar los productos destacados. Probá recargar la página.
          </li>
        )}

        {!cargando &&
          !error &&
          productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} onAgregar={onAgregar} />
          ))}
      </ul>

      <Link to="/productos" className="btn btn--primary productos-destacados__ver-todo">
        Ver todos los productos
      </Link>
    </section>
  )
}

export default FeaturedProducts