const MAX_PER_CAROUSEL = 8;

/**
 * Arma las dos listas de la ficha a partir del catálogo:
 *  - "También te puede gustar": otros productos de la MISMA categoría.
 *  - "Completá tu espacio": productos de OTRAS categorías.
 * El producto actual nunca aparece, y un producto no se repite entre las
 * dos listas. Si no hay nadie de la misma categoría, se reparte el resto.
 */
export function buildRelated(actual, todos) {
  const otros = todos.filter((p) => p.id !== actual.id);
  const mismos = otros.filter((p) => p.categoria === actual.categoria);
  const distintos = otros.filter((p) => p.categoria !== actual.categoria);

  if (mismos.length > 0) {
    return {
      alsoLike: mismos.slice(0, MAX_PER_CAROUSEL),
      complete: distintos.slice(0, MAX_PER_CAROUSEL),
    };
  }
  return {
    alsoLike: distintos.slice(0, 4),
    complete: distintos.slice(4, 4 + MAX_PER_CAROUSEL),
  };
}
