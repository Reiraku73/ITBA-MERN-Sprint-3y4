export default function Benefits() {
  return (
    <section className="beneficios">
      <h2>Por qué elegirnos</h2>

      <ul className="beneficios__grid">
        <li className="beneficio-card">
          <img src="/icons/envio.svg" alt="" width={40} height={40} />
          <h3>Envío a todo el país</h3>
          <p>Coordinamos la entrega hasta la puerta de tu casa, con seguimiento del pedido.</p>
        </li>

        <li className="beneficio-card">
          <img src="/icons/garantia.svg" alt="" width={40} height={40} />
          <h3>Garantía de 2 años</h3>
          <p>Cada mueble cubre defectos de fabricación durante 24 meses desde la compra.</p>
        </li>

        <li className="beneficio-card">
          <img src="/icons/pago-seguro.svg" alt="" width={40} height={40} />
          <h3>Pago 100% seguro</h3>
          <p>Tarjetas, transferencia o cuotas, con la protección de nuestra pasarela de pagos.</p>
        </li>

        <li className="beneficio-card">
          <img src="/icons/artesanal.svg" alt="" width={40} height={40} />
          <h3>Fabricación artesanal</h3>
          <p>Cada pieza se trabaja a mano en nuestro taller, sin producción en serie.</p>
        </li>
      </ul>
    </section>
  );
}
