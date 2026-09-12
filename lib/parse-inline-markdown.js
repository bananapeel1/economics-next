import { highlightGlossaryTerms } from '@/lib/glossary-highlight';

/**
 * Converts simple inline markdown (**bold**, *italic*) to HTML, then applies glossary term
 * highlighting. The result goes into dangerouslySetInnerHTML.
 *
 * F071. The source text was interpolated into HTML unescaped, so anything in the content
 * containing `<` or `&` was interpreted as markup rather than shown. That is a rendering bug for
 * the economics this site teaches — "price < marginal cost", "AD & AS", "<10% inflation" — and it
 * is also the shape of an injection if content ever came from anywhere less trusted than our own
 * database. Escape first, then add the markup we intend.
 */
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function parseInlineMarkdown(text, glossaryTerms) {
  if (!text) return '';

  // Escape BEFORE adding markup, so the tags below are the only ones in the output.
  let html = escapeHtml(text);

  // Bold: **text** -> <strong>text</strong>
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic: *text* -> <em>text</em>  (single asterisks not adjacent to **)
  html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

  return highlightGlossaryTerms(html, glossaryTerms);
}
