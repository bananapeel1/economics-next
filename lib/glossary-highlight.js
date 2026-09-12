/**
 * Wraps the first occurrence of each glossary term in an HTML string with a tooltip span.
 * Only text between tags is touched, so markup is never corrupted.
 *
 * F089: the previous version built a fresh RegExp for every one of ~372 terms and re-split the
 * whole string once per term, on every render — so every re-render of a Learn Mode step, including
 * one caused by tapping a quiz option, redid ~372 regex constructions and ~372 full-string splits
 * per paragraph. Regexes are now compiled once and cached across calls, and the string is split
 * once. Inserted spans are never rescanned because scanning continues after the insertion point
 * rather than over the rebuilt string.
 *
 * F071: the definition used to be interpolated into a `String.replace` replacement string, where
 * `$&`, `$1` and `$\`` are substitution patterns. A definition containing any of them was silently
 * mangled. Replacement is done with a function, where the string is taken literally.
 */

// term (lowercased) -> compiled regex. Terms come from a fixed glossary, so this is bounded.
const regexCache = new Map();

function regexFor(term) {
  const key = term.toLowerCase();
  let re = regexCache.get(key);
  if (!re) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    re = new RegExp(`\\b(${escaped})\\b`, 'i');
    regexCache.set(key, re);
  }
  return re;
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function highlightGlossaryTerms(html, glossaryTerms) {
  if (!html || !glossaryTerms?.length) return html;

  // Longest first, so "aggregate demand" wins over "demand".
  const sorted = [...glossaryTerms]
    .filter((t) => t && t.term && t.definition)
    .sort((a, b) => b.term.length - a.term.length);

  const used = new Set();

  // One split for the whole string: odd indices are tags, even indices are text.
  const parts = html.split(/(<[^>]+>)/);

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part || part.startsWith('<')) continue;

    let out = '';
    let rest = part;

    // Walk the remaining text once per term. Because we only ever continue scanning the text
    // AFTER an insertion, the span we just wrote can never be matched again.
    for (const { term, definition } of sorted) {
      if (!rest) break;
      const key = term.toLowerCase();
      if (used.has(key)) continue;

      const match = regexFor(term).exec(rest);
      if (!match) continue;

      used.add(key);
      const at = match.index;
      const hit = match[0];
      out += rest.slice(0, at);
      out += `<span class="glossary-highlight" data-definition="${escapeAttribute(definition)}">${hit}</span>`;
      rest = rest.slice(at + hit.length);
    }

    parts[i] = out + rest;
  }

  return parts.join('');
}
