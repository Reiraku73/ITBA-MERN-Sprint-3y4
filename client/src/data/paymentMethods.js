// Medios de pago que se muestran en la ficha del producto. Es información
// de presentación: acá NO hay tasas, cuotas ni promociones (no están
// definidas en los datos del proyecto, y no se inventan). Si más adelante
// hay condiciones reales, se agregan a estos datos y la UI las toma de acá.
// Ids de logo válidos: 'mercadopago' | 'visa' | 'mastercard' | 'amex' | 'rapipago'.
export const PAYMENT_CATEGORIES = [
  {
    id: 'cuotas',
    title: 'Cuotas sin tarjeta',
    description: 'Pagá en cuotas sin necesidad de una tarjeta.',
    methods: [{ id: 'mercadopago', name: 'Mercado Pago' }],
  },
  {
    id: 'credito',
    title: 'Tarjetas de crédito',
    description: 'Pagá con tu tarjeta de crédito.',
    methods: [
      { id: 'visa', name: 'Visa' },
      { id: 'mastercard', name: 'Mastercard' },
      { id: 'amex', name: 'American Express' },
    ],
  },
  {
    id: 'debito',
    title: 'Tarjetas de débito',
    description: 'Pagá con tu tarjeta de débito.',
    methods: [
      { id: 'visa', name: 'Visa' },
      { id: 'mastercard', name: 'Mastercard' },
    ],
  },
  {
    id: 'efectivo',
    title: 'Efectivo',
    description: 'Pagá en efectivo.',
    methods: [{ id: 'rapipago', name: 'Rapipago' }],
  },
];
