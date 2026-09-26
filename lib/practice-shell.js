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
import { paperFor, sectionOfKind, sectionMarks, levelsFor } from './ial-paper.js';

/** An item marked point by point: the 12.6 marked-script shape. */
export const isPointsItem = (item) => Array.isArray(item?.criteria) && item.criteria.length > 0;

/** An item marked by levels (packet 12.85, E068): `levels.strands` in place of `criteria`. */
export const isLevelsItem = (item) => !!(item && item.levels && Array.isArray(item.levels.strands));

/** An item carries a marked script, by points or by levels. The shell's own flag. */
export const isShellItem = (item) => isPointsItem(item) || isLevelsItem(item);

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

/* ── Packet 12.8, E061: the paper's sections ──────────────────────────────────────────────────────

   An item that carries `paper` belongs to a section of its unit's real IAL paper. The shell shows
   such items as that paper's sections, in the paper's own order, each with a header naming what the
   section is and what it is worth — every number read from `audit/raw/ial-paper-structure.json`
   through `lib/ial-paper.js`, none written here. Criteria-bearing items without `paper` keep the
   12.75 grouping and follow the paper's sections under "More practice". A page with no `paper` item
   at all never reaches this code: `questionSets()` above serves it, unchanged. */

/** An item placed in a section of its unit's paper. */
export const isPaperItem = (item) => !!(item && item.paper && typeof item.paper === 'object');

/** True when a page's practice follows its paper's layout. After packet 12.8 that is 1.3.5 alone. */
export const hasPaper = (items) => (items || []).some((i) => isShellItem(i) && isPaperItem(i));

const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const word = (n) => WORDS[n] || String(n);
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/**
 * The criteria-bearing items as the paper's sections, in the paper's order, then "More practice".
 *
 * Within a section: a data question's parts by their letter (the paper's order), everything else in
 * the order the bank gives them. An item whose `paper` names a section the layout does not have
 * (validator R9 refuses that state) is not dropped: it joins "More practice", so nothing on a page
 * can disappear because of a data error.
 *
 * @returns {{ id, kind: 'extract'|'standalone', paperKind: string|null, section: string|null,
 *   stimulus: string|null, label: string, heading: string, note: string, total: number,
 *   choice: { offered: number, answer: number }|null, items: object[] }[]}
 */
export function paperSets(items, { subject, unit, extractLabel = 'Extract A' } = {}) {
  const shell = (items || []).filter(isShellItem);
  const paper = paperFor(subject, unit);
  const placed = new Set();
  const sets = [];
  for (const sec of paper ? paper.sections : []) {
    const its = shell.filter((i) => isPaperItem(i) && i.paper.section === sec.id && i.paper.kind === sec.kind);
    if (!its.length) continue;
    its.forEach((i) => placed.add(i));
    const total = sectionMarks(sec);
    if (sec.kind === 'data_question') {
      const ordered = its.slice().sort((a, b) => String(a.paper.part).localeCompare(String(b.paper.part)));
      sets.push({
        id: `paper-${sec.id}`,
        kind: 'extract',
        paperKind: sec.kind,
        section: sec.id,
        stimulus: ordered[0].stimulus || null,
        label: `Section ${sec.id}`,
        what: 'Data question',
        heading: `Section ${sec.id} · Data question · ${total} marks · ${extractLabel}`,
        instructions: ['Answer ALL parts.', `Read ${extractLabel} in the source booklet before you begin.`],
        total,
        choice: null,
        items: ordered,
      });
    } else if (sec.kind === 'short_answer') {
      sets.push({
        id: `paper-${sec.id}`,
        kind: 'standalone',
        paperKind: sec.kind,
        section: sec.id,
        stimulus: null,
        label: `Section ${sec.id}`,
        what: 'Short answers',
        heading: `Section ${sec.id} · Short answers · ${sec.parts} × ${sec.marksEach} marks`,
        instructions: ['Answer ALL questions.'],
        total,
        choice: null,
        items: its,
      });
    } else if (sec.kind === 'essay') {
      const choice = sec.offered > sec.answer ? { offered: sec.offered, answer: sec.answer } : null;
      sets.push({
        id: `paper-${sec.id}`,
        kind: 'standalone',
        paperKind: sec.kind,
        section: sec.id,
        stimulus: null,
        label: `Section ${sec.id}`,
        what: 'Essay',
        heading: choice
          ? `Section ${sec.id} · Essay · ${sec.marksEach} marks · answer ${word(sec.answer)} of ${word(sec.offered)}`
          : `Section ${sec.id} · Essay · ${sec.marksEach} marks`,
        instructions: [choice
          ? `Answer ${word(sec.answer).toUpperCase()} question${sec.answer === 1 ? '' : 's'} from this section.`
          : 'Answer ALL questions.'],
        choiceNote: choice ? `Answer ${word(sec.answer)} of ${word(sec.offered)}.` : '',
        total,
        choice,
        items: its,
      });
    }
  }
  const more = shell.filter((i) => !placed.has(i));
  if (more.length) {
    const byTariff = (a, b) => Number(a.marks) - Number(b.marks);
    const ordered = more.slice().sort(byTariff);
    sets.push({
      id: 'more',
      kind: 'standalone',
      paperKind: null,
      section: null,
      stimulus: null,
      label: 'More practice',
      what: 'Not part of the paper',
      heading: 'More practice',
      instructions: [`${plural(ordered.length, 'question', 'questions')} on this topic in a shape the paper does not use. ${ordered.length === 1 ? 'It is' : 'They are'} not counted in your marks for the paper.`],
      total: ordered.reduce((n, i) => n + (Number(i.marks) || 0), 0),
      choice: null,
      items: ordered,
    });
  }
  return sets;
}

/**
 * The paper's multiple-choice section, as a row of the outline that sends the student to the topic in
 * the app — the founder's ruling (26 Sep): Section A is not rebuilt on a topic page. The app has no
 * deep link into its Quiz tab (StudyApp reads `?section=` and nothing else; ledger E056), so the copy
 * says the quiz is in the topic's Quiz tab and never claims the link lands on it (packet 12.85, E069).
 * Every number is read from the structure file. Null when the paper has no multiple-choice section or
 * the page has no app section to open.
 */
export function sectionARow({ subject, unit, sectionId, topic }) {
  const sec = sectionOfKind(subject, unit, 'multiple_choice');
  if (!sec || !sectionId) return null;
  const n = word(sec.parts);
  return {
    id: sec.id,
    label: `Section ${sec.id}`,
    what: 'Multiple choice',
    total: sectionMarks(sec),
    heading: `Section ${sec.id} · ${sec.parts} multiple-choice questions · ${sectionMarks(sec)} marks`,
    lead: `${n[0].toUpperCase()}${n.slice(1)} ${sec.marksEach}-mark questions.`,
    href: `/?section=${sectionId}`,
    linkText: `Open ${topic} in the app`,
    note: 'The quiz is in the topic’s Quiz tab (without Pro you see a short preview).',
  };
}

/* ── Packet 12.85: marking in Pearson's format ─────────────────────────────────────────────────────

   Up to 8 marks, Pearson's sample mark schemes mark point by point under objective headings with
   marks ("Knowledge 2", "Application 2", "Analysis 2", "Evaluation 2"); every point-marked item on a
   paper-shaped page carries exactly that heading as its criteria's `band`. 14 and 20 marks are marked
   by levels, whose bands come from the structure file (`levelsFor`). These helpers derive everything the
   exemplar prints (the margin letters and the verdict line) from the item, so nothing is authored twice. */

const ABBR = { Knowledge: 'K', Application: 'App', Analysis: 'An', Evaluation: 'E' };

/** "Knowledge 2" -> { objective: 'Knowledge', abbr: 'K' }; any other band keeps its own words. */
export function objectiveOf(band) {
  const m = /^(Knowledge|Application|Analysis|Evaluation)\b/.exec(String(band || ''));
  return m ? { objective: m[1], abbr: ABBR[m[1]] } : { objective: String(band || ''), abbr: String(band || '') };
}

/** Criteria grouped under their headings, in the order the item lists them. */
export function objectiveGroups(criteria) {
  const groups = [];
  for (const c of criteria || []) {
    const last = groups[groups.length - 1];
    if (last && last.band === c.band) last.items.push(c);
    else groups.push({ band: c.band, items: [c] });
  }
  return groups.map((g) => ({ ...g, marks: g.items.reduce((n, c) => n + (Number(c.marks) || 0), 0) }));
}

/** The exemplar's verdict for a point-marked item: the marks its own script earns, by objective. */
export function pointsVerdict(item) {
  const by = new Map();
  let total = 0;
  for (const c of item.criteria || []) {
    if (c.segRole === 'missed') continue;
    const { abbr } = objectiveOf(c.band);
    by.set(abbr, (by.get(abbr) || 0) + (Number(c.marks) || 0));
    total += Number(c.marks) || 0;
  }
  const parts = [...by].map(([a, n]) => `${a}${n}`);
  return `${parts.join(' · ')} = ${total}/${item.marks}`;
}

/** The levels scheme a levels-marked item is marked against: the structure file's bands, the item's
 *  indicative content. Null when either is missing (validator R14 refuses that state). */
export function levelsScheme(item) {
  if (!isLevelsItem(item)) return null;
  const scheme = levelsFor(item.subject, item.marks);
  if (!scheme) return null;
  return scheme.strands.map((st) => {
    const own = item.levels.strands.find((s) => s.strand === st.strand);
    return {
      strand: st.strand,
      name: st.name,
      marks: st.marks,
      levels: st.levels.map((l) => ({ level: l.level, lo: l.lo, hi: l.hi, descriptor: l.descriptor })),
      indicative: own ? own.indicative.slice() : [],
    };
  });
}

/** "KAA Level 3 (8) · E Level 3 (5) = 13/14", from the item's structured verdict. */
export function levelsVerdict(item) {
  const v = Array.isArray(item?.verdict) ? item.verdict : [];
  const total = v.reduce((n, x) => n + (Number(x.mark) || 0), 0);
  return `${v.map((x) => `${x.strand} Level ${x.level} (${x.mark})`).join(' · ')} = ${total}/${item.marks}`;
}
