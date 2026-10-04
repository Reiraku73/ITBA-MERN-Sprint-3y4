// "01 / 07": posición actual y total con ceros a la izquierda. Se arma
// siempre a partir del largo real del array de imágenes.
export function formatCounter(position, total) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(position)} / ${pad(total)}`;
}
