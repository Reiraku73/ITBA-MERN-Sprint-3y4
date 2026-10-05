// 265000 → "$265.000"
export function formatCurrency(valor) {
  return '$' + valor.toLocaleString('es-AR');
}
