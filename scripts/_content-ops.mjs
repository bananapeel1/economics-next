/**
 * Declarative content surgery, for packets that remove or rename material across many sections.
 *
 * Packet 13 strips content the IAL specification does not contain. Doing that by hand across nine
 * sections is how index-pinned references get broken: `quizIndices` and `practiceIndices` are
 * positions in the section's arrays, so deleting question 7 silently re-points every pin above it.
 * So deletions are declared by ID and this module renumbers the pins, and the validator's
 * `pins.range` / `pins.reuse` rules are the check on the result.
 *
 * Item ids are never rewritten. A subsection id like
 * `market-failure:sub:allocative-inefficiency-deadweight-loss` keeps its legacy wording after the
 * text above it is renamed, because the id is what a student's progress row points at: renaming it
 * would orphan their history to save a word nobody sees.
 *
 * Every op is pure. `applyOps(bundle, ops)` returns a new bundle and a log of what it did, so a
 * caller can print the plan before writing and a reviewer can read it afterwards.
 */

const TABLES = ['content', 'notes', 'quiz', 'practice', 'flashcards', 'diagrams', 'extras', 'mistakes'];

const clone = (v) => (v == null ? v : JSON.parse(JSON.stringify(v)));

/** Recursively map every display string. Keys named `id` are left alone: ids are references. */
export function mapStrings(value, fn, key = null) {
  if (typeof value === 'string') return key === 'id' ? value : fn(value);
  if (Array.isArray(value)) return value.map((v) => mapStrings(v, fn, key));
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = mapStrings(v, fn, k);
    return out;
  }
  return value;
}

/** Apply ordered [pattern, replacement] rules to every display string. */
export function substitute(value, rules) {
  return mapStrings(value, (s) => {
    let out = s;
    for (const [from, to] of rules) out = out.replace(from, to);
    return out;
  });
}

const titleOf = (b) => String(b?.title ?? '');
const norm = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();

/**
 * Renumber every quizIndices / practiceIndices entry after items have been removed.
 * `keptQuiz` / `keptPractice` are the surviving items' ORIGINAL indices, in order.
 * A pin to a removed item is dropped, and the log records it.
 */
function renumberPins(content, keptQuiz, keptPractice, log) {
  const map = (kept) => new Map(kept.map((orig, next) => [orig, next]));
  const q = map(keptQuiz);
  const p = map(keptPractice);
  return content.map((block) => {
    const out = { ...block };
    for (const [field, m, label] of [['quizIndices', q, 'quiz'], ['practiceIndices', p, 'practice']]) {
      if (!Array.isArray(block[field])) continue;
      const next = [];
      for (const i of block[field]) {
        if (m.has(i)) next.push(m.get(i));
        else log.push(`  pin dropped: "${titleOf(block)}" pinned ${label} ${i}, which was removed`);
      }
      if (next.length) out[field] = next; else delete out[field];
    }
    return out;
  });
}

/**
 * @param {object} bundle  { content, notes, quiz, practice, flashcards, diagrams, extras, mistakes }
 * @param {Array} ops      see the op list below
 * @returns {{ bundle: object, log: string[], changed: string[] }}
 */
export function applyOps(bundle, ops) {
  const b = {};
  for (const t of TABLES) b[t] = clone(bundle[t]);
  const log = [];
  const before = Object.fromEntries(TABLES.map((t) => [t, JSON.stringify(bundle[t] ?? null)]));

  // Track which quiz/practice items survive, by original index, so pins can be renumbered once.
  let keptQuiz = (b.quiz || []).map((_, i) => i);
  let keptPractice = (b.practice || []).map((_, i) => i);

  const dropFrom = (table, keep, predicate, label) => {
    const arr = b[table];
    if (!Array.isArray(arr)) return;
    const survivors = [];
    const survivorIdx = [];
    arr.forEach((item, i) => {
      if (predicate(item, i)) log.push(`  - ${label}: ${describe(item)}`);
      else { survivors.push(item); if (keep) survivorIdx.push(keep[i]); }
    });
    b[table] = survivors;
    return survivorIdx;
  };

  for (const op of ops) {
    switch (op.op) {
      case 'deleteBlock': {
        const hit = (b.content || []).filter((bl) => norm(titleOf(bl)) === norm(op.title));
        if (!hit.length) throw new Error(`deleteBlock: no block titled "${op.title}"`);
        log.push(`  - block "${op.title}" (${(hit[0].sections || []).length} subsections)${op.why ? ` — ${op.why}` : ''}`);
        b.content = (b.content || []).filter((bl) => norm(titleOf(bl)) !== norm(op.title));
        break;
      }
      case 'deleteSub': {
        let found = false;
        b.content = (b.content || []).map((bl) => {
          const keep = (bl.sections || []).filter((s) => s.id !== op.id);
          if (keep.length !== (bl.sections || []).length) { found = true; log.push(`  - subsection ${op.id} from "${titleOf(bl)}"${op.why ? ` — ${op.why}` : ''}`); }
          return { ...bl, sections: keep };
        });
        if (!found) throw new Error(`deleteSub: no subsection ${op.id}`);
        break;
      }
      case 'deleteQuiz': {
        const ids = new Set(op.ids);
        const seen = new Set();
        keptQuiz = dropFrom('quiz', keptQuiz, (q) => { if (ids.has(q.id)) { seen.add(q.id); return true; } return false; }, `quiz${op.why ? ` (${op.why})` : ''}`);
        for (const id of ids) if (!seen.has(id)) throw new Error(`deleteQuiz: no quiz item ${id}`);
        break;
      }
      case 'deletePractice': {
        const ids = new Set(op.ids);
        const seen = new Set();
        keptPractice = dropFrom('practice', keptPractice, (p) => { if (ids.has(p.id)) { seen.add(p.id); return true; } return false; }, `practice${op.why ? ` (${op.why})` : ''}`);
        for (const id of ids) if (!seen.has(id)) throw new Error(`deletePractice: no practice item ${id}`);
        break;
      }
      case 'deleteFlashcard': {
        const n = (b.flashcards || []).length;
        dropFrom('flashcards', null, (f) => op.match.test(String(f?.front ?? f?.term ?? '')), `flashcard${op.why ? ` (${op.why})` : ''}`);
        if ((b.flashcards || []).length === n) throw new Error(`deleteFlashcard: nothing matched ${op.match}`);
        break;
      }
      case 'deleteNote': {
        const n = (b.notes || []).length;
        dropFrom('notes', null, (x) => norm(titleOf(x)) === norm(op.title), `note${op.why ? ` (${op.why})` : ''}`);
        if ((b.notes || []).length === n) throw new Error(`deleteNote: no note titled "${op.title}"`);
        break;
      }
      case 'deleteDiagram': {
        const n = (b.diagrams || []).length;
        dropFrom('diagrams', null, (d) => norm(titleOf(d)) === norm(op.title), `diagram${op.why ? ` (${op.why})` : ''}`);
        if ((b.diagrams || []).length === n) throw new Error(`deleteDiagram: no diagram titled "${op.title}"`);
        break;
      }
      case 'deleteMistake': {
        const n = (b.mistakes || []).length;
        dropFrom('mistakes', null, (m) => op.match.test(JSON.stringify(m)), `mistake${op.why ? ` (${op.why})` : ''}`);
        if ((b.mistakes || []).length === n) throw new Error(`deleteMistake: nothing matched ${op.match}`);
        break;
      }
      case 'deleteExtra': {
        const arr = b.extras?.[op.key];
        if (!Array.isArray(arr)) throw new Error(`deleteExtra: extras.${op.key} is not an array`);
        const keep = arr.filter((e) => !op.match.test(JSON.stringify(e)));
        if (keep.length === arr.length) throw new Error(`deleteExtra: nothing matched ${op.match} in extras.${op.key}`);
        arr.filter((e) => op.match.test(JSON.stringify(e))).forEach((e) => log.push(`  - extras.${op.key}: ${describe(e)}${op.why ? ` — ${op.why}` : ''}`));
        b.extras = { ...b.extras, [op.key]: keep };
        break;
      }
      case 'patchBlock': {
        let found = false;
        b.content = (b.content || []).map((bl) => {
          if (norm(titleOf(bl)) !== norm(op.title)) return bl;
          found = true; log.push(`  ~ block "${op.title}" -> ${JSON.stringify(op.patch).slice(0, 110)}`);
          return { ...bl, ...op.patch };
        });
        if (!found) throw new Error(`patchBlock: no block titled "${op.title}"`);
        break;
      }
      case 'patchSub': {
        let found = false;
        b.content = (b.content || []).map((bl) => ({
          ...bl,
          sections: (bl.sections || []).map((s) => {
            if (s.id !== op.id) return s;
            found = true; log.push(`  ~ subsection ${op.id} -> ${Object.keys(op.patch).join(', ')}`);
            return { ...s, ...op.patch };
          }),
        }));
        if (!found) throw new Error(`patchSub: no subsection ${op.id}`);
        break;
      }
      case 'patchQuiz': {
        let found = false;
        b.quiz = (b.quiz || []).map((q) => { if (q.id !== op.id) return q; found = true; log.push(`  ~ quiz ${op.id}: ${Object.keys(op.patch).join(', ')}`); return { ...q, ...op.patch }; });
        if (!found) throw new Error(`patchQuiz: no quiz item ${op.id}`);
        break;
      }
      case 'patchPractice': {
        let found = false;
        b.practice = (b.practice || []).map((p) => { if (p.id !== op.id) return p; found = true; log.push(`  ~ practice ${op.id}: ${Object.keys(op.patch).join(', ')}`); return { ...p, ...op.patch }; });
        if (!found) throw new Error(`patchPractice: no practice item ${op.id}`);
        break;
      }
      case 'patchFlashcard': {
        let found = false;
        b.flashcards = (b.flashcards || []).map((f) => { if (!op.match.test(String(f?.front ?? ''))) return f; found = true; log.push(`  ~ flashcard "${String(f.front).slice(0, 60)}"`); return { ...f, ...op.patch }; });
        if (!found) throw new Error(`patchFlashcard: nothing matched ${op.match}`);
        break;
      }
      case 'patchNote': {
        let found = false;
        b.notes = (b.notes || []).map((n) => { if (norm(titleOf(n)) !== norm(op.title)) return n; found = true; log.push(`  ~ note "${op.title}" -> ${Object.keys(op.patch).join(', ')}`); return { ...n, ...op.patch }; });
        if (!found) throw new Error(`patchNote: no note titled "${op.title}"`);
        break;
      }
      case 'substitute': {
        const n = countMatches(b, op.rules);
        for (const t of TABLES) b[t] = substitute(b[t], op.rules);
        log.push(`  ~ ${n} string${n === 1 ? '' : 's'} rewritten${op.why ? ` — ${op.why}` : ''}`);
        break;
      }
      // `repin` takes ORIGINAL indices. Deletions are renumbered once, at the end, over every pin.
      case 'repin': {
        let found = false;
        b.content = (b.content || []).map((bl) => {
          if (norm(titleOf(bl)) !== norm(op.title)) return bl;
          found = true; log.push(`  ~ repin "${op.title}" quiz=${JSON.stringify(op.quizIndices ?? null)} practice=${JSON.stringify(op.practiceIndices ?? null)}`);
          const out = { ...bl };
          if (op.quizIndices) out.quizIndices = op.quizIndices; else delete out.quizIndices;
          if (op.practiceIndices) out.practiceIndices = op.practiceIndices; else delete out.practiceIndices;
          return out;
        });
        if (!found) throw new Error(`repin: no block titled "${op.title}"`);
        break;
      }
      default: throw new Error(`unknown op ${op.op}`);
    }
  }

  b.content = renumberPins(b.content || [], keptQuiz, keptPractice, log);

  const changed = TABLES.filter((t) => JSON.stringify(b[t] ?? null) !== before[t]);
  return { bundle: b, log, changed };
}

function describe(item) {
  if (typeof item === 'string') return item.slice(0, 80);
  const t = item?.question ?? item?.title ?? item?.front ?? item?.term ?? item?.mistake ?? item?.result ?? JSON.stringify(item);
  return String(t).slice(0, 90);
}

function countMatches(bundle, rules) {
  let n = 0;
  mapStrings(bundle, (s) => { if (rules.some(([re]) => (re instanceof RegExp ? new RegExp(re.source, re.flags.replace('g', '')).test(s) : s.includes(re)))) n += 1; return s; });
  return n;
}

export { TABLES };
