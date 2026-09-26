/**
 * The practice shell's data, prepared on the server. Packet 12.75, E045-E048, E052.
 *
 * `components/SectionModelAnswersPage.jsx` stays the server component. On a page where at least one
 * written item carries `criteria` it hands this module's output to `components/PracticeShell.jsx`,
 * which renders the extract beside the work, question cards, the dock and the marking loop. Every
 * decision the shell makes about CONTENT is made here, in plain functions a test can call, so the
 * client component only decides what is visible.
 *
 * WHAT IS DERIVED, NEVER AUTHORED OR INFERRED:
 *   - which pages get the shell: any written item with `criteria` (not a section id);
 *   - the question sets: items grouped by `stimulus`, extract sets first, each ordered by tariff;
 *   - AO codes: the item's own `ao` array and each criterion's own `band` — never a lookup by command
 *     word, never the mockup (Define is AO1 only: audit/raw/econ_spec.txt:2704);
 *   - minutes: `item.minutes` when present, else `minutesForMarks()` in `lib/exam-timing.js`;
 *   - figures: `figuresIn()` / `linkFigures()` in `lib/stimulus.js`, from the extract's own text;
 *   - the table rows to highlight after marking: rows printing a figure the item's script cites.
 *
 * NOTHING HERE TOUCHES SUPABASE (rule 2). `lib/stimulus.js` reads one file off disk, at request or
 * prerender time, exactly as it did for packet 12.6.
 */

import { minutesForMarks } from './exam-timing.js';

/** An item carries the marked-script shape. The shell's own flag, as it was 12.6's. */
export const isShellItem = (item) => Array.isArray(item?.criteria) && item.criteria.length > 0;

/** True when this page renders the shell. After packet 12.7 that is Economics 1.3.5 alone. */
export const hasShell = (written) => (written || []).some(isShellItem);

/** Working minutes: the item's own figure, else the paper's constant. Never a new formula. */
export function minutesFor(item, subject, unit) {
  const own = Number(item?.minutes);
  if (Number.isFinite(own) && own > 0) return own;
  return minutesForMarks(subject, unit, item?.marks);
}

/**
 * The question stem cut around the FIRST occurrence of `keyTerm`, for the serif-italic emphasis.
 * With no keyTerm, or one the stem does not contain (validator R8 refuses that state), the stem is
 * returned whole with no emphasis — the page never guesses a term.
 */
export function stemParts(question, keyTerm) {
  const q = String(question ?? '');
  const k = typeof keyTerm === 'string' ? keyTerm : '';
  const at = k ? q.indexOf(k) : -1;
  if (at === -1) return { before: q, term: '', after: '' };
  return { before: q.slice(0, at), term: k, after: q.slice(at + k.length) };
}

/** "Negative externality of consumption" from a keyTerm; the command word when there is none. */
export function cardLabel(item) {
  const k = typeof item?.keyTerm === 'string' ? item.keyTerm.trim() : '';
  if (!k) return String(item?.commandWord || '');
  return k[0].toUpperCase() + k.slice(1);
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Criteria-bearing items grouped into sets. Items sharing a `stimulus` form one set ordered by
 * tariff; items with none form "Standalone questions". Extract sets come first, in the order their
 * first item appears; the standalone set is last. The sort is stable, so equal tariffs keep the
 * order `writtenFor()` gave them.
 *
 * @returns {{ id: string, kind: 'extract'|'standalone', stimulus: string|null, label: string,
 *   items: object[] }[]}
 */
export function questionSets(items) {
  const byTariff = (a, b) => Number(a.marks) - Number(b.marks);
  const extractOrder = [];
  const byStimulus = new Map();
  const standalone = [];
  for (const item of (items || []).filter(isShellItem)) {
    if (item.stimulus) {
      if (!byStimulus.has(item.stimulus)) {
        byStimulus.set(item.stimulus, []);
        extractOrder.push(item.stimulus);
      }
      byStimulus.get(item.stimulus).push(item);
    } else {
      standalone.push(item);
    }
  }
  const sets = extractOrder.map((stimulus, i) => ({
    id: `extract-${stimulus}`,
    kind: 'extract',
    stimulus,
    label: `Extract ${LETTERS[i] || i + 1}`,
    items: byStimulus.get(stimulus).slice().sort(byTariff),
  }));
  if (standalone.length) {
    sets.push({
      id: 'standalone',
      kind: 'standalone',
      stimulus: null,
      label: 'Standalone',
      items: standalone.slice().sort(byTariff),
    });
  }
  return sets;
}

/** The figure texts an item's model-answer script cites, in the extract's own characters. */
export function citedFigures(item, figures) {
  const html = (item?.script || []).flatMap((p) => (p.segments || []).map((s) => s.html)).join(' ');
  const plain = html.replace(/<[^>]*>/g, ' ').replace(/−/g, '-');
  const texts = [...new Set((figures || []).map((f) => f.text))];
  return texts.filter((t) => {
    const needle = t.replace(/−/g, '-').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(?<![\\w.])${needle}(?![\\d])`).test(plain);
  });
}

/**
 * Table rows to highlight once the student has marked or chosen to see the answer: every table-body
 * row that prints a figure the item's script cites, as `"<block>-<row>"` keys. While the student is
 * writing, the shell highlights nothing — in an exam nothing points at the row.
 */
export function focusRowsFor(item, figures) {
  const cited = new Set(citedFigures(item, figures));
  const rows = new Set();
  for (const f of figures || []) {
    if (f.row !== undefined && cited.has(f.text)) rows.add(`${f.block}-${f.row}`);
  }
  return [...rows];
}
