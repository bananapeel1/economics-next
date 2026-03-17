/**
 * Processes an HTML string and wraps glossary terms with tooltip spans.
 * Only processes text nodes (not inside HTML tags) to avoid corrupting markup.
 * Matches only the first occurrence of each term per string.
 *
 * IMPORTANT: Re-splits on each term insertion so that attribute values of
 * previously inserted spans are not scanned by subsequent term regexes
 * (which would corrupt the HTML by inserting spans inside attribute values).
 */
export function highlightGlossaryTerms(html, glossaryTerms) {
  if (!html || !glossaryTerms?.length) return html;

  // Sort by length (longest first) to avoid partial matches
  // e.g. "aggregate demand" should match before "demand"
  const sorted = [...glossaryTerms].sort((a, b) => b.term.length - a.term.length);

  const alreadyMatched = new Set();
  let current = html;

  for (const { term, definition } of sorted) {
    if (alreadyMatched.has(term.toLowerCase())) continue;
    if (!definition) continue;

    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b(${escaped})\\b`, 'i');

    // Re-split on every term so newly inserted spans are treated as tags,
    // preventing subsequent regexes from matching inside attribute values.
    const parts = current.split(/(<[^>]+>)/);
    let matched = false;

    const newParts = parts.map(part => {
      if (matched || part.startsWith('<')) return part;
      if (!regex.test(part)) return part;

      const escapedDef = definition
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      matched = true;
      alreadyMatched.add(term.toLowerCase());
      return part.replace(regex, `<span class="glossary-highlight" data-definition="${escapedDef}">$1</span>`);
    });

    current = newParts.join('');
  }

  return current;
}
