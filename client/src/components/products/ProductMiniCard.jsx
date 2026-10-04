import { Link } from 'react-router-dom';
import SafeImage from '../ui/SafeImage';
import { formatCurrency } from '../../utils/formatCurrency';

/** Tarjeta chica para los carruseles de la ficha. */
export default function ProductMiniCard({ producto }) {
  return (
    <article className="mini-card">
      <Link to={`/productos/${producto.id}`} className="mini-card__link">
        <div className="mini-card__media">
          <SafeImage src={producto.imagen} alt="" width={400} height={400} loading="lazy" />
        </div>
        <div className="mini-card__body">
          <p className="mini-card__category">{producto.categoria}</p>
          <h3 className="mini-card__name">{producto.nombre}</h3>
          <p className="mini-card__price">{formatCurrency(producto.precio)}</p>
        </div>
      </Link>
    </article>
  );
}
