import { useState } from 'react';

/**
 * Selector de cantidad (− / número / +).
 *  - value / onChange: la cantidad vive en quien lo usa.
 *  - min / max: topes (max normalmente es el stock; sin tope si se omite).
 *  - itemLabel: para el aria-label cuando hay más de un selector en la
 *    página (ej. el carrito, uno por línea), así un lector de pantalla
 *    distingue a qué producto corresponde cada uno.
 */
export default function QuantitySelector({ value, onChange, min = 1, max, itemLabel }) {
  const suffix = itemLabel ? ` de ${itemLabel}` : '';

  // El input necesita su propio estado de texto, separado de `value`: si
  // estuviera 100% controlado por `value`, borrar el campo para escribir un
  // número nuevo no se podría (en cuanto quedara vacío se forzaría de vuelta
  // a un número y el dígito nuevo se pegaría sobre ese número: querer poner
  // "7" terminaba dando "17"). Mientras se tipea se deja pasar por un estado
  // vacío, y solo se confirma cuando hay un número completo o al perder el
  // foco.
  const [text, setText] = useState(String(value));

  // Si `value` cambia desde AFUERA (los botones +/-, u otra parte de la
  // app), el input tiene que reflejarlo. Patrón de React para "ajustar
  // estado cuando cambia una prop": comparar contra el último valor visto y
  // actualizar durante el render, en vez de en un useEffect aparte.
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setText(String(value));
  }

  function clamp(n) {
    return Math.min(max ?? Infinity, Math.max(min, n));
  }

  function commit(n) {
    const clamped = clamp(n);
    onChange(clamped);
    setText(String(clamped));
  }

  return (
    <div className="cantidad-stepper">
      <button
        type="button"
        className="cantidad-stepper__btn"
        aria-label={`Reducir cantidad${suffix}`}
        onClick={() => commit(value - 1)}
        disabled={value <= min}
      >
        −
      </button>

      <input
        type="number"
        className="cantidad-stepper__input"
        aria-label={`Cantidad${suffix}`}
        min={min}
        max={max}
        inputMode="numeric"
        value={text}
        onChange={(e) => {
          const raw = e.target.value;
          setText(raw);
          // Con el campo vacío (borrando para escribir de nuevo) no se
          // confirma nada todavía: eso pasa en onBlur, o en cuanto haya un
          // número completo.
          const parsed = Number(raw);
          if (raw !== '' && !Number.isNaN(parsed)) onChange(clamp(parsed));
        }}
        onBlur={() => {
          // Si quedó vacío o inválido al salir del campo, se restaura la
          // última cantidad válida en vez de dejarlo en blanco.
          const parsed = Number(text);
          if (text === '' || Number.isNaN(parsed)) setText(String(value));
          else commit(parsed);
        }}
      />

      <button
        type="button"
        className="cantidad-stepper__btn"
        aria-label={`Aumentar cantidad${suffix}`}
        onClick={() => commit(value + 1)}
        disabled={max !== undefined && value >= max}
      >
        +
      </button>
    </div>
  );
}
