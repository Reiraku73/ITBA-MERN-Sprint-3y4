import { useCallback, useSyncExternalStore } from 'react';

const KEY = 'hermanos-jota-favorites';
const listeners = new Set();

function read() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

// useSyncExternalStore necesita un snapshot ESTABLE (mismo valor → misma
// referencia); por eso se guarda el string crudo y se parsea aparte.
function snapshot() {
  try {
    return localStorage.getItem(KEY) ?? '[]';
  } catch {
    return '[]';
  }
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Favoritos guardados en este navegador (no hay cuenta ni backend para esto
 * todavía). Todas las tarjetas que muestran el mismo producto se mantienen
 * sincronizadas entre sí.
 */
export function useFavorites() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => '[]');
  const favorites = (() => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const toggle = useCallback((id) => {
    const current = read();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // Sin storage no se puede persistir: el corazón simplemente no cambia.
    }
    listeners.forEach((l) => l());
  }, []);

  return { isFavorite: (id) => favorites.includes(id), toggle };
}
