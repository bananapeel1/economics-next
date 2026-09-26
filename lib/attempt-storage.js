/**
 * One student's attempt at one question, in this browser's `localStorage`. Packet 12.6 wrote the
 * first version inside `components/MarkedScriptAttempt.jsx`; packet 12.75 (E048) moves the key and
 * the record here so the practice shell reads the SAME record, and a draft written on 22 September
 * is still there when the shell mounts.
 *
 * THE KEY AND THE SHAPE ARE A CONTRACT WITH DRAFTS ALREADY ON STUDENTS' DEVICES. The key is
 * `rl:attempt:v1:<question id>`, never renamed. The record is `{ draft, ticked }` as 12.6 wrote it,
 * EXTENDED (never reshaped) by the shell with `phase`, `time` and `open`. A 12.6 record has no
 * `phase`; the reader infers it: ticks mean the student marked, a draft alone means still writing.
 * Writes MERGE into whatever is stored, so neither writer can drop a field the other added.
 *
 * Every read and write is wrapped: a private window, blocked site data or a prerender return
 * nothing and the caller renders the empty state. Nothing here may run during render — callers read
 * in an effect after mount, or the first client render would differ from the server's.
 */

export const STORAGE_PREFIX = 'rl:attempt:v1:';

export function storageKey(questionId) {
  return `${STORAGE_PREFIX}${questionId}`;
}

const PHASES = new Set(['attempt', 'marking', 'revealed']);

/** The stored record, normalised, or null. */
export function readAttempt(questionId) {
  try {
    const raw = window.localStorage.getItem(storageKey(questionId));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    const draft = typeof parsed.draft === 'string' ? parsed.draft : '';
    const ticked = Array.isArray(parsed.ticked) ? parsed.ticked.filter((t) => typeof t === 'string') : [];
    const phase = PHASES.has(parsed.phase) ? parsed.phase : ticked.length > 0 ? 'marking' : 'attempt';
    const time = Number.isFinite(parsed.time) && parsed.time >= 0 ? Math.floor(parsed.time) : 0;
    return { draft, ticked, phase, time, open: parsed.open === true };
  } catch {
    return null;
  }
}

/** Merge `value` into the stored record. Fields the caller does not pass are kept. */
export function writeAttempt(questionId, value) {
  try {
    let prev = {};
    try {
      prev = JSON.parse(window.localStorage.getItem(storageKey(questionId)) || '{}') || {};
    } catch {
      prev = {};
    }
    window.localStorage.setItem(storageKey(questionId), JSON.stringify({ ...prev, ...value }));
  } catch {
    /* Quota, private mode, disabled storage. The attempt still works for this visit. */
  }
}
