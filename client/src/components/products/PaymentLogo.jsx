const NAMES = {
  mercadopago: 'Mercado Pago',
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'American Express',
  rapipago: 'Rapipago',
};

/**
 * Logos hechos solo con CSS y texto (sin imágenes externas): cada uno es un
 * "chip" del mismo alto, así quedan alineados y parejos en cualquier fila.
 * El nombre accesible es el de la marca; lo visual es decorativo.
 */
export default function PaymentLogo({ id }) {
  return (
    <span className={`pay-logo pay-logo--${id}`} role="img" aria-label={NAMES[id]}>
      {id === 'visa' && <span aria-hidden="true">VISA</span>}
      {id === 'mastercard' && (
        <span className="pay-logo__circles" aria-hidden="true">
          <i />
          <i />
        </span>
      )}
      {id === 'amex' && (
        <span className="pay-logo__amex" aria-hidden="true">
          American
          <br />
          Express
        </span>
      )}
      {id === 'mercadopago' && (
        <span className="pay-logo__mp" aria-hidden="true">
          mercado
          <br />
          pago
        </span>
      )}
      {id === 'rapipago' && <span aria-hidden="true">rapipago</span>}
    </span>
  );
}
