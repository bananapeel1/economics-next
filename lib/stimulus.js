/**
 * The extract a question is answered FROM, read off disk and cut into blocks.
 *
 * Packet 12.6, E035. Every one of the sixty-six model answers carries `stimulusRef: null` while six
 * real extracts sit unattached in `content/data-response/`. A question that awards application
 * marks and shows the student nothing to apply them to is asking for recall, whatever its tariff
 * says. So an item may now name a `stimulus`, and the page puts that extract IN THE PAGE FLOW above
 * the questions — not behind a `<details>`, not in a modal, not collapsed by default. A student on a
 * 390px screen reads it by scrolling and by nothing else.
 *
 * WHY THIS DOES NOT REUSE `lib/lab-data-response.js`. That module answers a different question —
 * "does this section have a live /data-response page to link to?" — and deliberately renders nothing
 * of the piece, because two indexed pages carrying the same extract is a duplicate-content problem.
 * That reasoning still holds for the LINK, which is unchanged. This module reads the `## Stimulus`
 * section only: the extract, not the question ladder and not the model answers, which stay on the
 * live page. The two modules are kept apart so that neither's constraint silently becomes the
 * other's.
 *
 * WHY IT PARSES RATHER THAN RENDERING MARKDOWN. The block list below is data, and the page renders
 * it as React nodes. Nothing from the file reaches `dangerouslySetInnerHTML`, so a stray `<script>`
 * in an extract is text, and the table can be given a real `<table>` with a caption instead of
 * whatever a generic markdown renderer decides at 390px.
 *
 * NOTHING HERE TOUCHES SUPABASE (rule 2): one `readFileSync`, guarded, degrading to `null`. The
 * file is deployed beside the route by `outputFileTracingIncludes` in `next.config.mjs`, which
 * already names `./content/data-response/**` for both model-answer routes.
 */

import fs from 'node:fs';
import path from 'node:path';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'data-response');

/** `**bold**` and `*italic*` as a token list. Everything else is literal text. */
export function inlineTokens(text) {
  const out = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push({ kind: 'text', text: text.slice(last, m.index) });
    if (m[1] !== undefined) out.push({ kind: 'strong', text: m[1] });
    else out.push({ kind: 'em', text: m[2] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ kind: 'text', text: text.slice(last) });
  return out;
}

const isTableRow = (line) => line.trimStart().startsWith('|');
const isTableRule = (line) => /^\s*\|[\s|:-]+\|\s*$/.test(line);
const splitRow = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

/**
 * The `## Stimulus` section of an extract, as blocks.
 *
 * @returns {{kind:'paragraph',tokens:object[]}|{kind:'table',head:string[],rows:string[][]}[]}
 */
export function parseStimulus(markdown) {
  const body = String(markdown || '');
  const start = body.indexOf('\n## Stimulus');
  if (start === -1) return [];
  const after = body.slice(start + 1);
  const end = after.indexOf('\n## ', 1);
  const section = (end === -1 ? after : after.slice(0, end))
    .replace(/^## Stimulus\s*/, '');

  const blocks = [];
  const chunks = section.split(/\n\s*\n/).map((c) => c.trim()).filter(Boolean);
  for (const chunk of chunks) {
    const lines = chunk.split('\n');
    if (lines.every(isTableRow)) {
      const rows = lines.filter((l) => !isTableRule(l)).map(splitRow);
      if (rows.length) blocks.push({ kind: 'table', head: rows[0], rows: rows.slice(1) });
      continue;
    }
    // A table with a caption paragraph glued to it by a single newline, which is how the
    // Market Failure extract writes "**Table 1: …**" directly above its own header row.
    const firstRow = lines.findIndex(isTableRow);
    if (firstRow > 0 && lines.slice(firstRow).every(isTableRow)) {
      const caption = lines.slice(0, firstRow).join(' ').trim();
      const rows = lines.slice(firstRow).filter((l) => !isTableRule(l)).map(splitRow);
      blocks.push({ kind: 'table', caption: inlineTokens(caption), head: rows[0], rows: rows.slice(1) });
      continue;
    }
    blocks.push({ kind: 'paragraph', tokens: inlineTokens(lines.join(' ')) });
  }
  return blocks;
}

/**
 * The extract named by an item's `stimulus`, or null when the basename has no file.
 *
 * Returning null rather than throwing is the same choice `dataResponseFor` makes: a page whose
 * extract has been renamed renders without it, which is wrong but readable, instead of 500ing.
 * R6 in `audit/scripts/validate-model-answers.mjs` is what stops that state reaching a commit.
 */
export function stimulusFor(slug) {
  if (!slug) return null;
  const basename = String(slug);
  if (!/^[a-z0-9-]+$/i.test(basename)) return null; // never build a path out of arbitrary text
  let raw;
  try {
    raw = fs.readFileSync(path.join(CONTENT_DIR, `${basename}.md`), 'utf8');
  } catch {
    return null;
  }
  const blocks = parseStimulus(raw);
  if (!blocks.length) return null;
  const title = (raw.match(/^#\s+(.+)$/m) || [])[1] || basename;
  return { slug: basename, title: title.trim(), href: `/data-response/${basename}`, blocks };
}

/* ── Figures (packet 12.75, E047) ──────────────────────────────────────────────────────────────

   The numbers in an extract are what application marks are paid for, so the practice shell links
   them both ways: a figure in the model answer scrolls the extract to where it is printed, and a
   figure in the extract says where the model answer uses it (or that it does not). They are
   DERIVED from the text here, never authored as a field, so a new extract gets its links for free
   and a model answer cannot claim a figure the extract does not print.

   What counts as a figure: a currency amount ("AED 0.25", "USD 25 billion"), a percentage ("45%",
   "12.3%"), a signed decimal ("-1.4", with a hyphen-minus or a true minus sign), and a count with
   "billion" or "million" ("11 billion"). A bare integer does not — that is how "2017" and "2024"
   stay years rather than becoming figures. A signed decimal must follow whitespace, an opening
   bracket or the start of the text, so "type-2 diabetes" is not read as the figure "-2".

   The extract writes both elasticities with an ASCII hyphen-minus ("-1.4", "-0.6"), and so do the
   model answers. The figure's text is the extract's own characters; the model-answer matcher below
   accepts either minus glyph for it, so a later edit that typesets a true minus cannot break a
   link silently. */

const FIGURE_SOURCE = [
  String.raw`(?:AED|USD|GBP|EUR|US\$|\$|£|€)\s?\d[\d,]*(?:\.\d+)?(?:\s(?:billion|million|bn|m)\b)?`,
  String.raw`\d[\d,]*(?:\.\d+)?%`,
  String.raw`(?<=^|[\s(])[-−]\d+(?:\.\d+)?`,
  String.raw`\d[\d,]*(?:\.\d+)?\s(?:billion|million)\b`,
].join('|');

/** A fresh global regex every call: a shared `lastIndex` is how two callers corrupt each other. */
const figureRe = () => new RegExp(`(?<![\\w.])(?:${FIGURE_SOURCE})(?![\\d])`, 'g');

/** Split a run of plain text into text and figure pieces, in order. */
export function figureSpans(text) {
  const s = String(text ?? '');
  const out = [];
  const re = figureRe();
  let last = 0;
  let m;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) out.push({ kind: 'text', text: s.slice(last, m.index) });
    out.push({ kind: 'figure', text: m[0] });
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push({ kind: 'text', text: s.slice(last) });
  return out;
}

const slugFigure = (t) =>
  String(t)
    .replace(/^[-−]/, 'neg-')
    .replace(/%/g, 'pct')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * The extract's blocks with every text run split into text and figure pieces, each figure carrying
 * a stable id: `fig-<slug>` for its first occurrence and `fig-<slug>-2`, `-3` … for repeats, in
 * document order (paragraphs, then a table's caption, head and rows, left to right). Same input,
 * same ids, on the server and in the browser.
 */
export function withFigures(blocks) {
  const seen = new Map();
  const idFor = (text) => {
    const slug = slugFigure(text);
    const n = (seen.get(slug) || 0) + 1;
    seen.set(slug, n);
    return n === 1 ? `fig-${slug}` : `fig-${slug}-${n}`;
  };
  const splitTokens = (tokens) =>
    (tokens || []).map((t) => ({
      ...t,
      parts: figureSpans(t.text).map((p) => (p.kind === 'figure' ? { ...p, id: idFor(p.text) } : p)),
    }));
  const splitCell = (cell) =>
    figureSpans(cell).map((p) => (p.kind === 'figure' ? { ...p, id: idFor(p.text) } : p));

  return (blocks || []).map((b) => {
    if (b.kind === 'table') {
      return {
        ...b,
        caption: b.caption ? splitTokens(b.caption) : b.caption,
        headParts: (b.head || []).map(splitCell),
        rowParts: (b.rows || []).map((row) => row.map(splitCell)),
      };
    }
    return { ...b, tokens: splitTokens(b.tokens) };
  });
}

/**
 * Every figure in an extract, in document order: `{ id, text, block, row? }`. `row` is the table
 * row index for a figure printed in a table body, so a page can highlight the rows a model answer
 * draws on without anybody authoring which rows those are.
 */
export function figuresIn(blocks) {
  const out = [];
  withFigures(blocks).forEach((b, bi) => {
    const take = (parts, extra) => parts.forEach((p) => p.kind === 'figure' && out.push({ id: p.id, text: p.text, block: bi, ...extra }));
    if (b.kind === 'table') {
      (b.caption || []).forEach((t) => take(t.parts));
      b.headParts.forEach((c) => take(c));
      b.rowParts.forEach((row, ri) => row.forEach((c) => take(c, { row: ri })));
    } else {
      b.tokens.forEach((t) => take(t.parts));
    }
  });
  return out;
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/**
 * A model-answer segment's HTML with every exact occurrence of an extract figure's text wrapped in
 * a button the shell can link. Only TEXT between tags is touched, never a tag or an attribute, and
 * the longest figure wins where two overlap ("USD 25 billion" before "25 billion"). A figure the
 * extract does not print is never wrapped: this links, it does not detect.
 *
 * `html` is trusted bank content (it already reaches `dangerouslySetInnerHTML`); the only markup
 * this adds is the button, whose one attribute is escaped.
 */
export function linkFigures(html, figureTexts) {
  const texts = [...new Set((figureTexts || []).filter(Boolean))].sort((a, b) => b.length - a.length);
  if (!texts.length) return String(html ?? '');
  const alt = texts
    .map((t) => escapeRe(t).replace(/^(?:\\-|-|−)/, '[-−]'))
    .join('|');
  const re = new RegExp(`(?<![\\w.])(${alt})(?![\\d])`, 'g');
  const canonical = (hit) => texts.find((t) => t === hit) || texts.find((t) => t.replace(/^−/, '-') === hit.replace(/^−/, '-')) || hit;
  return String(html ?? '')
    .split(/(<[^>]*>)/)
    .map((chunk) =>
      chunk.startsWith('<')
        ? chunk
        : chunk.replace(re, (hit) => `<button type="button" class="ps-fig" data-fig-text="${escapeAttr(canonical(hit))}">${hit}</button>`),
    )
    .join('');
}
