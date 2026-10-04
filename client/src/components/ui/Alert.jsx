import { HttpError, getErrorMessage } from '../../services/api';

// Mensaje de error con botón de reintentar: qué falló (title) + por qué (si
// es algo que la persona puede entender) + cómo reintentar.
// `error` es lo que devuelve useApiQuery: si es un HttpError muestra su
// mensaje; si es cualquier otra cosa muestra un texto genérico (nunca el
// mensaje técnico). El botón solo aparece si el error puede ser pasajero.
export default function Alert({ title = 'Algo salió mal', error, onRetry }) {
  const puedeReintentar = onRetry && (!(error instanceof HttpError) || error.retryable);

  return (
    <div className="state-message state-message--error" role="alert">
      <p>
        <strong>{title}.</strong> {getErrorMessage(error)}
      </p>
      {puedeReintentar && (
        <button type="button" className="btn btn--secondary" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}
