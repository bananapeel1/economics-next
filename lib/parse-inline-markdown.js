import { highlightGlossaryTerms } from '@/lib/glossary-highlight';

/**
 * Converts simple inline markdown (**bold**, *italic*) to HTML,
 * then applies glossary term highlighting.
 * Returns an HTML string suitable for dangerouslySetInnerHTML.
 */
export function parseInlineMarkdown(text, glossaryTerms) {
  if (!text) return '';
  // Bold: **text** -> <strong>text</strong>
  let html = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic: *text* -> <em>text</em>  (single asterisks not adjacent to **)
  html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  // Glossary highlighting
  return highlightGlossaryTerms(html, glossaryTerms);
}
