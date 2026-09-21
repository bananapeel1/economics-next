/**
 * The recall contract, packet 7. Everything a recall widget decides that is not React lives here so it
 * can be tested without a browser and shared by the four widgets, the step model and the gallery.
 *
 * FOUR TYPES. `reorder` (a genuine sequence, 3-5 items, a `why` per item), `fillin` (a template with
 * `___` blanks, one answer per blank, semantic hints, 2-3 distractor chips), `match` (3-5 pairs plus
 * optional right-hand distractors) and `classify` (2-3 named groups, 4-8 items). The authoring contract
 * is written out in audit/CONTENT-GATE.md under "The recall contract"; lib/content-validator.mjs
 * enforces it; this file is what the widgets do with it.
 *
 * ORDERING IS SEEDED, NEVER RANDOM. Section content is server-rendered on first load, so a shuffle at
 * mount would differ between the server and the client (F118). Every start order is a Fisher-Yates
 * permutation seeded by the recall id and the showing ('first' or 'spaced'), with rejection rules:
 * never the identity, never with the first item already in place, and the spaced showing is never the
 * first showing's order (F053, F113). The stored `shuffled` field is ignored; it is not part of the
 * contract any more.
 *
 * ONE SCORE, UNLIMITED TRIES. A widget reports to the engine once, on the first check. Retrying locks
 * what was right and frees what was wrong; it is for consolidation, not for the score.
 */

/**
 * FIVE TYPES since packet 13.2. `diagram` is the drawing drill: the student shifts a curve, marks the
 * new equilibrium and shades an area, and is marked on geometry by lib/diagram. It carries no items of
 * its own — a `specId` naming a spec in lib/diagram/specs is the whole payload, and the validator
 * rejects one that names nothing, because a bad id would render as an empty step.
 */
export const RECALL_TYPES = ['reorder', 'fillin', 'match', 'classify', 'diagram'];

/** Types whose ordering is seeded. A diagram drill has no order to shuffle. */
export const SHUFFLED_RECALL_TYPES = ['reorder', 'fillin', 'match', 'classify'];
export const isRecallType = (t) => RECALL_TYPES.includes(t);

export function norm(s) {
  return String(s ?? '').trim().toLowerCase().replace(/[‘’‚‛“”„‟]/g, "'").replace(/[—–]/g, '-').replace(/\s+/g, ' ');
}

/* ── seeded randomness ─────────────────────────────────────────────────── */

export function hash(str) {
  let h = 2166136261;
  const s = String(str);
  for (let i = 0; i < s.length; i += 1) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export function seededRandom(seed) {
  let a = (typeof seed === 'number' ? seed : hash(seed)) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A permutation of 0..n-1 from a seed. `reject(perm)` returning true asks for another draw; after 16
 * draws the fallback is a rotation, which passes every rule used here except when n < 2.
 */
export function seededPermutation(n, seed, reject = () => false) {
  if (n < 2) return Array.from({ length: n }, (_, i) => i);
  const rnd = seededRandom(seed);
  for (let attempt = 0; attempt < 16; attempt += 1) {
    const perm = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i -= 1) { const j = Math.floor(rnd() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
    if (!reject(perm)) return perm;
  }
  const rot = Array.from({ length: n }, (_, i) => (i + 1) % n);
  if (!reject(rot)) return rot;
  return Array.from({ length: n }, (_, i) => (i + 2) % n);
}

const isIdentity = (p) => p.every((v, i) => v === i);
const same = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

/** The seed a recall's orders derive from. A recall with no id falls back to its own text. */
function seedOf(recall, showing) {
  const id = recall?.id || JSON.stringify(recall?.correctOrder || recall?.answers || recall?.pairs || recall?.groups || '');
  return `${id}|${showing}`;
}

/* ── reorder ───────────────────────────────────────────────────────────── */

/**
 * The order a reorder is shown in. Never the answer, never with the first item already in place
 * (the give-away F113 named), and on the spaced showing never the same puzzle as the first.
 */
export function reorderStartOrder(recall, showing = 'first') {
  const n = Array.isArray(recall?.correctOrder) ? recall.correctOrder.length : 0;
  const first = showing === 'first' ? null : reorderStartOrder(recall, 'first');
  return seededPermutation(n, seedOf(recall, showing), (p) => isIdentity(p) || (n >= 2 && p[0] === 0) || (first && n >= 3 && same(p, first)));
}

/**
 * Grade a reorder. `items` are the strings in the student's order. Position-exact, as an order must be,
 * but the partial credit says how near: `oneOff` counts wrong items that sit one place from home.
 */
export function gradeReorder(items, correctOrder) {
  const co = (correctOrder || []).map(norm);
  const results = (items || []).map((it, i) => norm(it) === co[i]);
  let oneOff = 0;
  (items || []).forEach((it, i) => {
    if (results[i]) return;
    const home = co.indexOf(norm(it));
    if (home >= 0 && Math.abs(home - i) === 1) oneOff += 1;
  });
  const correct = results.filter(Boolean).length;
  return { results, correct, oneOff, allCorrect: results.length > 0 && correct === results.length };
}

/**
 * Move an item from one position to another by insertion, leaving locked positions untouched. Locked
 * slots keep their items; the unlocked items are reordered among the unlocked slots only. Returns the
 * same array when the move is not possible.
 */
export function moveWithLocks(items, locked, from, to) {
  const n = items.length;
  if (from === to || from < 0 || to < 0 || from >= n || to >= n) return items;
  if (locked?.[from] || locked?.[to]) return items;
  const free = [];
  for (let i = 0; i < n; i += 1) if (!locked?.[i]) free.push(i);
  const a = free.indexOf(from); const b = free.indexOf(to);
  if (a < 0 || b < 0) return items;
  const sub = free.map((i) => items[i]);
  const [moved] = sub.splice(a, 1);
  sub.splice(b, 0, moved);
  const next = [...items];
  free.forEach((slot, k) => { next[slot] = sub[k]; });
  return next;
}

/** The nearest unlocked slot above (dir -1) or below (dir +1) a position, or -1. */
export function nextFreeSlot(locked, from, dir) {
  const n = locked.length;
  for (let i = from + dir; i >= 0 && i < n; i += dir) if (!locked[i]) return i;
  return -1;
}

/* ── fill-in ───────────────────────────────────────────────────────────── */

const BLANK = /_{3,}/g;

/**
 * Parse the template into lines of segments. A segment is `{ text }` or `{ blank }` where `blank` is
 * the running blank index across the whole template — so a line with two blanks, or `___ ___`, renders
 * whole instead of losing everything after the first blank (F051, F112).
 */
export function parseFillinTemplate(template) {
  let blank = 0;
  const lines = (Array.isArray(template) ? template : []).map((line) => {
    const s = String(line ?? '');
    const segments = [];
    let last = 0;
    for (const m of s.matchAll(BLANK)) {
      if (m.index > last) segments.push({ text: s.slice(last, m.index) });
      segments.push({ blank: blank++ });
      last = m.index + m[0].length;
    }
    if (last < s.length || !segments.length) segments.push({ text: s.slice(last) });
    return { segments };
  });
  return { lines, blanks: blank };
}

/** True when a stored hint would give the answer away: a prefix of it, or its length in underscores. */
export function hintLeaks(hint, answer) {
  const h = String(hint ?? ''); const a = norm(answer);
  if (!h.trim()) return false;
  const shown = norm(h).replace(/_.*$/, '').trim();
  const lengthReveal = /_/.test(h) && h.replace(/[^_a-z0-9]/gi, '').length === String(answer ?? '').length;
  return (!!shown && a.startsWith(shown)) || lengthReveal;
}

/** What "Show hints" shows: the semantic hint, or, for a leaky one, the first letter alone. */
export function displayHint(hint, answer) {
  const a = String(answer ?? '').trim();
  if (!hint || hintLeaks(hint, a)) return a ? `starts with "${a[0]}"` : '';
  return String(hint);
}

/** The words of the template outside its blanks, for the leak check and for filtering distractors. */
export function templateWords(template) {
  return new Set((Array.isArray(template) ? template : []).flatMap((l) => norm(String(l).replace(BLANK, ' ')).split(/[^a-z0-9'-]+/)).filter(Boolean));
}

/**
 * Distractor chips for a fill-in. Authored `distractors` win; otherwise draw `count` from the pool
 * (the section's other fill-in answers), seeded by the recall id, never an answer and never a word
 * already printed in the template.
 */
export function pickDistractors(recall, pool = [], count = 2) {
  const answers = new Set((recall?.answers || []).map(norm));
  const clean = (list) => [...new Set((list || []).map((w) => String(w).trim()).filter(Boolean))]
    .filter((w) => !answers.has(norm(w)));
  const authored = clean(recall?.distractors);
  if (authored.length) return authored.slice(0, 3);
  const printed = templateWords(recall?.template);
  const candidates = clean(pool).filter((w) => !printed.has(norm(w)) && !norm(w).split(' ').some((t) => answers.has(t)));
  if (!candidates.length) return [];
  const order = seededPermutation(candidates.length, seedOf(recall, 'distractors'));
  return order.slice(0, count).map((i) => candidates[i]);
}

/**
 * The chip bank: every answer (even beyond the blank count — a mismatched template's spare answers act
 * as distractors, F050) plus the distractors, in a seeded order.
 */
export function fillinChips(recall, pool = [], showing = 'first') {
  const answers = (recall?.answers || []).map((w) => ({ word: String(w), isAnswer: true }));
  const extra = pickDistractors(recall, pool).map((w) => ({ word: w, isAnswer: false }));
  const all = [...answers, ...extra];
  const order = seededPermutation(all.length, seedOf(recall, `chips|${showing}`), (p) => all.length >= 3 && isIdentity(p));
  return order.map((i, k) => ({ id: k, ...all[i] }));
}

/** Grade the live blanks: the ones that have an answer. `placed` holds a word (or null) per blank. */
export function gradeFillin(placed, answers) {
  const live = Math.min((placed || []).length, (answers || []).length);
  const results = [];
  for (let i = 0; i < live; i += 1) results.push(placed[i] != null && norm(placed[i]) === norm(answers[i]));
  const correct = results.filter(Boolean).length;
  return { results, correct, allCorrect: results.length > 0 && correct === results.length };
}

/* ── match ─────────────────────────────────────────────────────────────── */

/** The right-hand chips: every pair's right plus the distractors, seeded. */
export function matchChips(recall, showing = 'first') {
  const rights = (recall?.pairs || []).map((p) => ({ text: String(p?.right ?? ''), pair: true }));
  const extra = (recall?.distractors || []).map((d) => ({ text: String(d), pair: false }));
  const all = [...rights, ...extra];
  const order = seededPermutation(all.length, seedOf(recall, `match|${showing}`), (p) => all.length >= 3 && isIdentity(p));
  return order.map((i, k) => ({ id: k, ...all[i] }));
}

/** `assigned[i]` is the chip id placed on pair i, or null. Correct when its text is that pair's right. */
export function gradeMatch(assigned, recall, chips) {
  const pairs = recall?.pairs || [];
  const results = pairs.map((p, i) => {
    const chip = chips.find((c) => c.id === assigned?.[i]);
    return !!chip && norm(chip.text) === norm(p.right);
  });
  const correct = results.filter(Boolean).length;
  return { results, correct, allCorrect: results.length > 0 && correct === results.length };
}

/* ── classify ──────────────────────────────────────────────────────────── */

/** The flat item bank with each item's home group, in a seeded order. */
export function classifyItems(recall, showing = 'first') {
  const flat = [];
  (recall?.groups || []).forEach((g, gi) => (g?.items || []).forEach((it) => flat.push({ text: String(it), group: gi })));
  const order = seededPermutation(flat.length, seedOf(recall, `classify|${showing}`), (p) => {
    if (flat.length < 3) return false;
    // Reject an order that lists every group's items contiguously in group order: that is the answer.
    return p.every((v, i) => i === 0 || flat[v].group >= flat[p[i - 1]].group);
  });
  return order.map((i, k) => ({ id: k, ...flat[i] }));
}

/** `placed[itemId]` is a group index or undefined. */
export function gradeClassify(placed, items) {
  const results = items.map((it) => placed?.[it.id] === it.group);
  const correct = results.filter(Boolean).length;
  return { results, correct, allCorrect: results.length > 0 && correct === results.length };
}

/* ── shared ────────────────────────────────────────────────────────────── */

/** How many things a student manipulates: for the spaced-showing salt and for the validator's counts. */
export function recallSize(recall) {
  switch (recall?.type) {
    case 'reorder': return (recall.correctOrder || []).length;
    case 'fillin': return (recall.answers || []).length;
    case 'match': return (recall.pairs || []).length;
    case 'classify': return (recall.groups || []).reduce((n, g) => n + (g?.items || []).length, 0);
    default: return 0;
  }
}

/** The partial-credit line under a wrong check, in words a student can act on. */
export function partialLine(kind, correct, total, oneOff = 0) {
  const noun = { reorder: 'in the right position', fillin: 'right', match: 'matched', classify: 'in the right group' }[kind] || 'right';
  let s = `${correct} of ${total} ${noun}`;
  if (kind === 'reorder' && oneOff > 0) s += ` · ${oneOff} one place off`;
  return s;
}
