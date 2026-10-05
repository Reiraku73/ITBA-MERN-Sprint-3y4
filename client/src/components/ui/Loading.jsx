export default function Loading({ children = 'Cargando...' }) {
  return (
    <p className="state-message" role="status" aria-live="polite">
      {children}
    </p>
  );
}
