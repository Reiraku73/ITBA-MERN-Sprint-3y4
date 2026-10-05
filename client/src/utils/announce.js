// Anuncios para lectores de pantalla en la región #live-region de App.jsx
// (ej. "Sofá agregado al carrito"): sin esto, agregar al carrito no da
// ninguna señal a quien no ve el contador del header.
let clearTimer;

export function announce(message) {
  const region = document.getElementById('live-region');
  if (!region) return;

  // Se vacía primero para que dos anuncios iguales seguidos (agregar el
  // mismo producto dos veces) se vuelvan a leer.
  region.textContent = '';
  clearTimeout(clearTimer);
  setTimeout(() => {
    region.textContent = message;
  }, 50);
  // Se limpia solo: ya fue leído, y no tiene por qué quedar en el DOM.
  clearTimer = setTimeout(() => {
    region.textContent = '';
  }, 2000);
}
