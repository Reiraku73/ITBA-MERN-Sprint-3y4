import { useRef, useId } from 'react';
import ProductMiniCard from './ProductMiniCard';
import { ChevronIcon } from '../ui/Icons';

/**
 * Carrusel horizontal de tarjetas: scroll con snap (también con el dedo o
 * el trackpad) y flechas para avanzar/retroceder una "página". Sin
 * productos no se muestra nada (nada de títulos con la lista vacía).
 */
export default function ProductCarousel({ title, productos }) {
  const listRef = useRef(null);
  const titleId = useId();
  if (productos.length === 0) return null;

  function scroll(direction) {
    const list = listRef.current;
    list?.scrollBy?.({ left: direction * list.clientWidth * 0.9, behavior: 'smooth' });
  }

  return (
    <section className="carousel" aria-labelledby={titleId}>
      <div className="carousel__head">
        <h2 id={titleId}>{title}</h2>
        <div className="carousel__arrows">
          <button type="button" aria-label={`${title}: anterior`} onClick={() => scroll(-1)}>
            <ChevronIcon direction="left" />
          </button>
          <button type="button" aria-label={`${title}: siguiente`} onClick={() => scroll(1)}>
            <ChevronIcon />
          </button>
        </div>
      </div>
      <ul className="carousel__track" ref={listRef}>
        {productos.map((producto) => (
          <li key={producto.id}>
            <ProductMiniCard producto={producto} />
          </li>
        ))}
      </ul>
    </section>
  );
}
