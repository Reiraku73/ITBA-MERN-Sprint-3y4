/**
 * Formato mínimo de la descripción (para que sea editable sin HTML): una
 * línea en blanco separa bloques; un bloque que empieza con "# " es el
 * subtítulo; un bloque donde todas las líneas empiezan con "- " es una
 * lista; el resto son párrafos. Un texto plano es un único párrafo.
 *
 * Devuelve [{ type: 'lead' | 'list' | 'paragraph', text?, items? }].
 */
export function parseDescription(description) {
  return description
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split('\n').map((l) => l.trim());
      if (block.startsWith('# ')) return { type: 'lead', text: block.slice(2).trim() };
      if (lines.every((l) => l.startsWith('- '))) {
        return { type: 'list', items: lines.map((l) => l.slice(2).trim()) };
      }
      return { type: 'paragraph', text: lines.join(' ') };
    });
}
