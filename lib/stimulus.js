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
