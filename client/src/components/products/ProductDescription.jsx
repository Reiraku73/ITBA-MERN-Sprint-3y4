import { parseDescription } from '../../utils/parseDescription';

/** Descripción EDITORIAL: subtítulo, párrafos y listas con aire. */
export default function ProductDescription({ descripcion }) {
  const blocks = parseDescription(descripcion ?? '');
  if (blocks.length === 0) return null;

  return (
    <section className="pdp-section pdp-desc" aria-labelledby="pdp-desc-title">
      <h2 id="pdp-desc-title">Descripción</h2>
      {blocks.map((block, i) => {
        if (block.type === 'lead') {
          return (
            <p key={i} className="pdp-desc__lead">
              {block.text}
            </p>
          );
        }
        if (block.type === 'list') {
          return (
            <ul key={i} className="pdp-desc__list">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{block.text}</p>;
      })}
    </section>
  );
}
