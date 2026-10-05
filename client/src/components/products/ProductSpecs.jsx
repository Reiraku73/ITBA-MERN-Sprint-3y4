/**
 * Especificaciones del producto (medidas, materiales, peso...): datos
 * técnicos en una grilla de etiqueta + valor. Las filas sin valor no se
 * muestran, y si no hay ninguna la sección entera se oculta.
 *
 * `specs` es un array de { label, value }, como lo manda la API.
 */
export default function ProductSpecs({ specs = [] }) {
  const items = specs.filter((spec) => spec.label?.trim() && spec.value?.trim());
  if (items.length === 0) return null;

  return (
    <section className="pdp-section" aria-labelledby="pdp-specs-title">
      <h2 id="pdp-specs-title">Especificaciones</h2>
      <dl className="spec-grid">
        {items.map(({ label, value }) => (
          <div key={label} className="spec-grid__item">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
