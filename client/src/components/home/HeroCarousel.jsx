import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HeroCarousel() {
  const [slidesArray, setSlidesArray] = useState([])
  const [slide, setSlide] = useState(0)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const SLIDE_DURATION = 7000

  const route = 'http://localhost:3001/api/productos'

  async function slideFetching() {
    try {
      const res = await fetch(route)

      if (!res.ok) throw new Error('Error en la respuesta')

      const data = await res.json()

      setSlidesArray(data)
      setCargando(false)
    }
    catch (err) {
      setCargando(false)
      setError(err.message)
      console.error('Fallo en la conversion o red', err)
    }
  }

  useEffect(() => {
    slideFetching()
  }, [])

  useEffect(() => {
    const matches = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (matches) return

    if (slidesArray.length === 0) return

    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % slidesArray.length)
    }, SLIDE_DURATION)

    return () => {
      clearInterval(interval)
    }
  }, [slidesArray.length])
  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <h1>Muebles con historia, hechos para durar</h1>
          <p className="hero__subtitle">
            Diseño artesanal en madera maciza, pensado para acompañar tu casa
            por generaciones.
          </p>
          <Link to="/productos" className="btn btn--primary hero__cta">
            Ver colección
          </Link>
        </div>

        <div className="hero__media">
          {error ? (
            <div className="hero__carousel-error" style={{ padding: '2rem', textAlign: 'center', background: '#ffebee', color: '#c62828', borderRadius: '8px' }}>
              <p>⚠️Ha habido un error: {error}</p>
              <button onClick={slideFetching} className="btn btn--secondary" style={{ marginTop: '1rem' }}>Reintentar</button>
            </div>) : cargando ? (
              <div className="hero__carousel-loading">Cargando destacados...</div>
            ) : (
            <div className="hero__carousel" id="hero-carousel">
              {(() => {
                const slideActual = slidesArray[slide]

                return (
                  <Link
                    key={slideActual.id}
                    className="hero__carousel-slide"
                    to={`/producto/${slideActual.id}`}
                    style={{ '--slide-duration': `${SLIDE_DURATION}ms` }}
                  >
                    <img
                      className="hero__carousel-img"
                      src={`${slideActual.imagen}`}
                      alt={`${slideActual.nombre}, pieza destacada de Hermanos Jota`}
                    />
                  </Link>
                )
              })()}
            </div>
          )}
        </div>
      </section>
    </>
  );
}