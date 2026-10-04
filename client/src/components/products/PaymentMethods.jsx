import { PAYMENT_CATEGORIES } from '../../data/paymentMethods';
import PaymentLogo from './PaymentLogo';

/**
 * Franja de medios de pago: el título a la izquierda y, al lado, un grupo
 * por categoría (rótulo + logos). El detalle completo está en el modal
 * ("Ver todos los medios de pago", junto al precio).
 */
export default function PaymentMethods() {
  return (
    <section className="pay-strip" aria-labelledby="pay-strip-title">
      <h2 id="pay-strip-title" className="pay-strip__title">
        Medios de pago
      </h2>

      <ul className="pay-strip__groups">
        {PAYMENT_CATEGORIES.map((category) => (
          <li key={category.id} className="pay-strip__group">
            <h3 className="pay-strip__label">{category.title}</h3>
            <ul className="pay-strip__logos">
              {category.methods.map((method) => (
                <li key={method.id}>
                  <PaymentLogo id={method.id} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
