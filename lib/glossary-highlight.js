/**
 * Processes an HTML string and wraps glossary terms with tooltip spans.
 * Only processes text nodes (not inside HTML tags) to avoid corrupting markup.
 * Matches only the first occurrence of each term per string.
 */
export function highlightGlossaryTerms(html, glossaryTerms) {
  if (!html || !glossaryTerms?.length) return html;

  // Sort by length (longest first) to avoid partial matches
  // e.g. "aggregate demand" should match before "demand"
  const sorted = [...glossaryTerms].sort((a, b) => b.term.length - a.term.length);

  // Split HTML into tags and text segments
  const parts = html.split(/(<[^>]+>)/);
  const alreadyMatched = new Set();

  const result = parts.map(part => {
    // Skip HTML tags
    if (part.startsWith('<')) return part;

    let text = part;
    for (const { term, definition } of sorted) {
      if (alreadyMatched.has(term.toLowerCase())) continue;

      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b(${escaped})\\b`, 'i');

      if (regex.test(text)) {
        const escapedDef = definition
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');

        text = text.replace(regex, `<span class="glossary-highlight" data-definition="${escapedDef}">$1</span>`);
        alreadyMatched.add(term.toLowerCase());
      }
    }
    return text;
  });

  return result.join('');
}
