/**
 * The Learn Mode step model. Packet 5.
 *
 * One place decides what a step is, so the engine (components/LearnModeTab.jsx) and the overview
 * count (components/StudyApp.jsx) cannot disagree — they did, by 60% on some sections (F030).
 *
 * WHAT A STEP IS
 *
 *   teach    one subsection: its title, key idea, body, example, misconception, exam lens, and its
 *            own recall BELOW the teaching. One heading per step.
 *   checkin  the end of a chapter: diagram, quick quiz, practice question, a spaced recall from an
 *            earlier chapter, explain-it-back, takeaway. One per chapter that has subsections.
 *   legacy   an old-format block with `concepts` instead of `sections`; rendered whole.
 *
 * WHY. The previous model paired two subsections per step, hung every end-of-chapter widget on the
 * last pair, and put the previous step's recall at the TOP of the next step. The audit measured
 * the result: 5,300-5,900px steps on a 390px phone (F065), the same recall twice in a row on every
 * single-subsection step (F036, F053), a recall the student had not been taught anything about as
 * the first thing on a new step (F038, F066, F100), the second recall of every pair never shown at
 * all (F037), and a step count the overview could not predict (F047). Three quarters of section
 * opens ended on step 0.
 *
 * SPACING. A recall is shown on its own teach step, and once more, on a later check-in, only if
 * that check-in belongs to a LATER chapter and the recall has not been used as a spaced recall yet
 * this session. That is at least a full chapter apart — never one tap apart — and every recall is
 * spaced at most once, so none is lost and none is doubled.
 *
 * WHICH one, and this is V034. The rule used to be "the earliest unspaced recall", which reads as
 * fair and is not: a five-chapter section has four spaced slots, chapter 1 usually holds four or
 * more recalls, and it therefore filled every slot. Measured over the corpus before the change, 80%
 * of staged spaced showings and 64% of live ones came from chapter 1, and ten staged sections drew
 * EVERY slot from it — `financial-planning` read "Recall from chapter 1" at all four check-ins. The
 * rule now spreads first and ages second: the eligible chapter that has contributed the FEWEST
 * spaced recalls so far, oldest such chapter first, then the earliest unused recall inside it. A
 * chapter is only revisited once every other eligible chapter has been drawn from once.
 */

import { reorderStartOrder } from './recall-widgets.js';

/**
 * @param {Array} content  the section_content array (blocks)
 * @returns {Array} steps, in order
 */
export function buildSteps(content) {
  if (!Array.isArray(content) || !content.length) return [];
  const steps = [];
  const blockCount = content.length;
  content.forEach((block, bi) => {
    if (!block || typeof block !== 'object') return;
    const secs = Array.isArray(block.sections) ? block.sections.filter(Boolean) : null;
    if (!secs) { steps.push({ type: 'legacy', key: `legacy:${bi}`, block, blockIndex: bi, blockCount, blockTitle: block.title || '' }); return; }
    secs.forEach((section, si) => {
      steps.push({
        type: 'teach',
        key: `teach:${section.id || `${bi}-${si}`}`,
        blockIndex: bi,
        blockCount,
        blockTitle: block.title || '',
        partIndex: si,
        partCount: secs.length,
        isFirstInBlock: si === 0,
        isLastInBlock: si === secs.length - 1,
        section,
      });
    });
    steps.push({
      type: 'checkin',
      key: `checkin:${bi}`,
      blockIndex: bi,
      blockCount,
      blockTitle: block.title || '',
      takeaway: Array.isArray(block.takeaway) ? block.takeaway : null,
      diagramRef: block.diagramRef,
      diagramId: block.diagramId,
      quizIndices: block.quizIndices,
      quizIds: block.quizIds,
      practiceIndices: block.practiceIndices,
      practiceIds: block.practiceIds,
    });
  });
  return steps;
}

/** The number the overview shows and the engine counts. Same function, so the same number. */
export function countSteps(content) {
  return buildSteps(content).length;
}

/** Index of the first step of a chapter, for the chapter-dot strip and for resuming. */
export function firstStepOfBlock(steps, blockIndex) {
  const i = steps.findIndex((s) => s.blockIndex === blockIndex);
  return i < 0 ? 0 : i;
}

/**
 * The spaced recall for a check-in: a recall from an EARLIER chapter that has not yet been used as
 * a spaced recall, chosen to spread the showings across chapters (V034). Returns
 * { recall, id, fromStep, fromTitle, fromBlockIndex, fromBlockTitle } or null.
 *
 * @param {Array} steps       from buildSteps
 * @param {number} checkinIdx index of the check-in step
 * @param {Set<string>} used  recall ids already shown as spaced this session
 * @param {Set<string>} prefer recall ids the student skipped: shown first when eligible (F055)
 */
export function pickSpacedRecall(steps, checkinIdx, used = new Set(), prefer = new Set()) {
  const here = steps[checkinIdx];
  if (!here || here.type !== 'checkin') return null;

  /* How many spaced showings each chapter has already supplied. `used` holds ids and not chapters,
     so it is counted back off the step list rather than tracked — which also means the caller's
     contract does not change and a resumed session with a half-filled `used` set still spreads. */
  const contributed = new Map();
  const candidates = [];
  for (let i = 0; i < checkinIdx; i += 1) {
    const s = steps[i];
    if (s.type !== 'teach' || s.blockIndex >= here.blockIndex) continue;
    const r = s.section?.recall;
    if (!r || typeof r !== 'object') continue;
    const id = recallId(r, s);
    if (used.has(id)) { contributed.set(s.blockIndex, (contributed.get(s.blockIndex) || 0) + 1); continue; }
    candidates.push({ recall: r, id, fromStep: i, fromTitle: s.section.title || '', fromBlockIndex: s.blockIndex, fromBlockTitle: s.blockTitle });
  }

  // F055: a skipped recall is not gone. It comes back here, ahead of the default pick, so skipping
  // has a consequence the student can see.
  const skipped = candidates.find((c) => prefer.has(c.id));
  if (skipped) return skipped;

  /* V034. Spread first, age second. `candidates` is already in step order, so the reduce keeps the
     earliest chapter and the earliest recall inside it whenever the contribution counts tie — which
     is the old behaviour on the first pass over the chapters, and the whole of the change on the
     second. */
  return candidates.reduce((best, c) => {
    if (!best) return c;
    const a = contributed.get(c.fromBlockIndex) || 0;
    const b = contributed.get(best.fromBlockIndex) || 0;
    return a < b ? c : best;
  }, null);
}

/** A stable id for a recall even when the content has not minted one. */
export function recallId(recall, step) {
  return recall?.id || `${step?.key || 'recall'}:recall`;
}

/* ── the second showing of a reorder ───────────────────────────────────── */

/**
 * The order a reorder starts from on its spaced showing. Packet 7 moved the rule into the recall
 * contract (lib/recall-widgets.js): seeded by the recall id, never the identity, never with the
 * first item already in place, and never the first showing's order (F053, F113). Kept here as the
 * name the engine and the tests use.
 */
export function spacedPermutation(recall) {
  return reorderStartOrder(recall, 'spaced');
}

/** Clamp a saved step pointer into the current step range (F026: "Step 9 of 5"). */
export function clampStep(step, totalSteps) {
  if (!Number.isFinite(step) || totalSteps <= 0) return 0;
  return Math.max(0, Math.min(Math.floor(step), totalSteps - 1));
}

/**
 * The furthest step to STORE, given the one already stored and the one just reached.
 *
 * `furthest_step` is a high-water mark, so it needs the same clamp on the way in as on the way out.
 * Without one, a pointer written against a longer step list — a section rewritten smaller, or the
 * model above counting the same blocks differently from the one it replaced — is carried forward
 * for ever by the max and can never come back down. That is the other half of F026: "Step 20 of 9",
 * an empty body, and a "Next" that never becomes "Complete topic" because `isLastStep` can only be
 * true AT the last index, never past it. On 15 Sep 2026, 120 rows across 43 students were already
 * past their own total_steps. Clamping the carried-forward value as well as the new one lets a
 * poisoned row heal itself the next time the student takes a step.
 */
export function furthestStep(prev, step, totalSteps, complete = false) {
  if (totalSteps <= 0) return 0;
  const last = totalSteps - 1;
  if (complete) return last;
  return Math.max(clampStep(prev, totalSteps), clampStep(step, totalSteps));
}

/* ────────────────────────────────────────────────────────────────────────────
 * V038 — the step pointer carries the identity of the deck it was written against.
 *
 * `clampStep` and `furthestStep` above keep a pointer INSIDE the current deck. Neither of them
 * knows WHICH deck the number came from, and that is the third cause of the resume-pointer family
 * (packet 5.1 closed the other two). Measured on `national-income`
 * (audit/runs/packet-37/verify-b.md, section 3): a student who finished the live 14-step deck at
 * "Complete topic ✓" opened the rebuilt 29-step deck at "step 14 of 29 · 48%", three chapters into
 * material they had never seen, and the clamp rewrote their stored 18 down to 13 on the way past.
 * Nothing in the product could tell the two decks apart, because the stored value is a bare integer.
 *
 * Founder decision, 19 September 2026: key the saved position to the section's content version. A
 * pointer from another version is never applied silently — the student is told the topic has been
 * rebuilt and chooses start-again or jump-to-end. A legacy, unversioned pointer is another version.
 *
 * DEPARTURE, 21 September 2026, fix round 2, and it needs the founder's eye. The last sentence of
 * that decision, read literally, makes the notice fire for EVERY signed-out returner on EVERY
 * section the day this ships, because on that day every pointer in existence is unversioned and
 * almost no deck has been rebuilt — measured, false, and it discards the very place the decision
 * exists to protect (Verify A, audit/runs/packet-5/verify-a.md). What is implemented instead is the
 * decision's purpose: a legacy pointer is another version when something POSITIVELY says so, and
 * the strongest such signal — the deck having been published after legacy pointers stopped being
 * written — catches all ten staged rebuilds. See `LEGACY_POINTER_EPOCH`.
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * A short, deterministic fingerprint of the deck a pointer would be written against.
 *
 * Derived from the BUILT steps rather than from the raw content, because the step list is what a
 * pointer indexes into: a change that does not move a step index cannot strand anybody. The step
 * count alone is not enough — two rewrites that happen to keep the count would compare equal — so
 * the identity of each step goes in as well (its type, its key, its chapter title, and for a teach
 * step the subsection title and the id of its recall).
 *
 * Pure, so the same content always fingerprints the same way on the server, in the browser and in
 * a test. FNV-1a, 32-bit, printed base 36 behind the step count: "29.k3f1zb".
 *
 * @param {Array} content  the section_content array (blocks)
 * @returns {string} the version, or '' when there is no deck to version
 */
export function contentVersion(content) {
  const steps = buildSteps(content);
  if (!steps.length) return '';
  let h = 0x811c9dc5;
  const feed = (value) => {
    const s = String(value == null ? '' : value);
    for (let i = 0; i < s.length; i += 1) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    h ^= 0x1f;
    h = Math.imul(h, 0x01000193);
  };
  steps.forEach((s) => {
    feed(s.type);
    feed(s.key);
    feed(s.blockTitle);
    if (s.type === 'teach') {
      feed(s.section?.title);
      feed(s.section?.recall?.id);
    }
  });
  return `${steps.length}.${(h >>> 0).toString(36)}`;
}

/**
 * The localStorage wire format for `revvy_learnmode_<subject>_<section>_section`.
 *
 * The KEY is deliberately unchanged. Renaming it would make every pointer live today disappear,
 * which is a silent start-over — the one outcome the founder decision rules out. The value becomes
 * `{"v":"<version>","s":<step>}`; a bare integer is what every pointer written before this packet
 * looks like, and it parses as version `null`. What the resolver may conclude from that absence is
 * the subject of `LEGACY_POINTER_EPOCH` below.
 */
export function encodePointer(step, version) {
  const s = Math.max(0, Math.floor(Number(step) || 0));
  return version ? JSON.stringify({ v: version, s }) : String(s);
}

/** @returns {{step:number, version:string|null}|null} */
export function parsePointer(raw) {
  if (raw == null || raw === '') return null;
  if (typeof raw === 'number') return Number.isFinite(raw) ? { step: Math.max(0, Math.floor(raw)), version: null } : null;
  const text = String(raw).trim();
  if (!text) return null;
  if (text[0] === '{') {
    try {
      const o = JSON.parse(text);
      const step = Number(o?.s);
      if (!Number.isFinite(step)) return null;
      return { step: Math.max(0, Math.floor(step)), version: typeof o?.v === 'string' && o.v ? o.v : null };
    } catch { return null; }
  }
  const n = parseInt(text, 10);
  return Number.isFinite(n) ? { step: Math.max(0, n), version: null } : null;
}

/**
 * When unversioned pointers stopped being written.
 *
 * V038, fix round 2, and the whole of what Verify A rejected on 21 September. The first version of
 * this fix read the ABSENCE of a fingerprint as "another version". That reading is true of a
 * rebuilt deck and false of every other deck in the product, and on the day packet 5 ships every
 * pointer on every device is a bare integer while almost no deck has been rebuilt. Measured: a
 * legacy pointer of 5 on the UNCHANGED live 14-step `national-income` deck produced "This topic has
 * been rebuilt… your saved place was in an earlier version" — false — suppressed the resume banner,
 * and offered a signed-out student only two exits, both of which threw the place away. Once per
 * section per device, across every section, on the step-0 funnel this packet exists to move.
 *
 * So the absence of a fingerprint is not evidence, and the resolver now requires a POSITIVE
 * disagreement. For a legacy pointer there are three, in descending order of how often they fire:
 *
 *   1. the deck was published at or after this boundary. A bare integer can only have been written
 *      before this code shipped, so a deck that became current after it is a deck no legacy pointer
 *      can belong to. This is the one that catches the ten staged rebuilds: every one of them GROWS
 *      (14→29, 15→35, 32→55 …), so an old pointer is comfortably in range and nothing local can
 *      tell. A staged draft served through `?draft=1` has never been published at all, so the
 *      caller reports the request time and every legacy pointer is correctly foreign to it.
 *   2. the step is not an index in this deck at all (`step >= totalSteps`) — a shrinking rewrite.
 *   3. the server row says the student's last deck had a different number of steps.
 *
 * The twelve sections carrying a `published_at` today are all 14–15 September, before this, so
 * every pointer saved against them survives packet 5 untouched. Move this date only if you mean
 * "legacy pointers written after it are still trustworthy", which after the ship is never true.
 */
export const LEGACY_POINTER_EPOCH = Date.parse('2026-09-21T00:00:00Z');

/** Did the deck now on screen become current after legacy pointers stopped being written? */
function deckPostdatesLegacy(versionSince) {
  if (versionSince == null || versionSince === '') return false;
  const ms = typeof versionSince === 'number' ? versionSince : Date.parse(versionSince);
  return Number.isFinite(ms) && ms >= LEGACY_POINTER_EPOCH;
}

/**
 * Decide what a saved pointer may do to the deck now on screen.
 *
 * Two sources, resolved separately and only then combined, because they carry their identity
 * differently:
 *   local  `{ step, version }` — a real fingerprint, so it catches a rewrite that kept the count.
 *          `version === null` is a legacy pointer: see `LEGACY_POINTER_EPOCH`.
 *   db     `{ step, totalSteps }` — `user_content_progress` has no version column, so the step
 *          count it was written with is the proxy. It catches the measured 14→29 case and every
 *          other length change; a server-side rewrite that preserves the step count is its blind
 *          spot, and the local fingerprint covers that on the device the student is actually using.
 *
 * A source whose identity matches the deck is VALID and may resume. A source that positively
 * disagrees is another version. The pointer is stale — "this topic has been rebuilt" — only when
 * another version would carry the student FURTHER than anything valid does, which is exactly the
 * silent mid-deck drop. A stale pointer is never written back; the caller offers start-again /
 * jump-to-end instead.
 *
 * The proxy may not overrule the fingerprint. When the local pointer positively disagrees, a db row
 * whose step COUNT happens to match is not evidence that this deck is the one it was written
 * against — it is the proxy's known blind spot, a rewrite that kept the count — so it stops
 * counting as valid. Without this, `stale = other > valid` let a 13-of-14 row mask a 13-of-14
 * fingerprint mismatch and dropped the student silently at the old index (Verify A's second gap;
 * not reachable at this checkpoint, since all ten staged rebuilds change the count).
 *
 * Fix round 4: `deck.versionSince` has three states, not two. A date and `null` are both ANSWERS —
 * "published then" and "never republished" — and a legacy pointer can be judged against either.
 * `undefined` is not an answer: it means the payload carrying the evidence has not arrived, or did
 * not come from this section at all. On that input a legacy pointer gets NO verdict: it does not
 * resume (`step` stays 0) and it is not called foreign (`stale` stays false), because both of those
 * would be a judgement made with evidence the caller has admitted it does not have.
 *
 * @param {{versionSince?:string|number|null}} [deck] when the deck on screen became current;
 *   `undefined` means "not known yet", which is different from `null` ("never republished").
 * @returns {{step:number, stale:boolean, staleStep:number}} step = where a resume may legitimately
 *   land; staleStep = what was refused, for the funnel.
 */
export function resolvePointer(saved, version, totalSteps, deck) {
  const out = { step: 0, stale: false, staleStep: 0 };
  if (!(totalSteps > 0)) return out;

  const db = saved?.db;
  const dbStep = db && Number.isFinite(db.step) && db.step > 0 ? db.step : 0;
  const dbTotal = db && Number.isFinite(db.totalSteps) ? db.totalSteps : null;
  const dbSameLength = dbTotal != null && dbTotal === totalSteps;
  const dbLengthDiffers = dbTotal != null && dbTotal !== totalSteps;

  let valid = 0;
  let other = 0;
  let localDisagrees = false;

  const local = saved?.local;
  if (local && Number.isFinite(local.step) && local.step > 0) {
    const at = clampStep(local.step, totalSteps);
    if (local.version) {
      if (version && local.version === version) valid = Math.max(valid, at);
      else { other = Math.max(other, at); localDisagrees = true; }
    } else if (deck?.versionSince === undefined && !(local.step >= totalSteps) && !dbLengthDiffers) {
      /*
       * Fix round 4. The evidence has not arrived (or belongs to another section, which the caller
       * must not let happen — see StudyApp's learn-mode guard). The two local signals that need no
       * date have already been checked above and neither fired, so there is nothing left to decide
       * with. Park the pointer: not valid, not other. It is neither resumed nor refused, and the
       * next render, with the payload present, decides. Costs at most one render; costs no place.
       */
    } else if (deckPostdatesLegacy(deck?.versionSince) || local.step >= totalSteps || dbLengthDiffers) {
      other = Math.max(other, at);
      localDisagrees = true;
    } else {
      // Nothing contradicts it, and the deck has said so with a real answer (a date, or null for
      // "never republished"): this deck is the one it was written against, so it resumes.
      //
      // Fix round 4: it is NOT stamped. The automatic claim used to write this deck's fingerprint
      // onto the pointer here, which is the one destructive step in this whole path — and the step
      // every rejected round got wrong, because a wrong deck stamps just as eagerly as a right one.
      // Nothing is lost by dropping it: every step change writes a versioned pointer
      // (LearnModeTab -> onStepChange -> encodePointer), and a pointer that is still legacy on the
      // next visit is caught by LEGACY_POINTER_EPOCH exactly as it was on this one.
      valid = Math.max(valid, at);
    }
  }

  if (dbStep > 0) {
    const at = clampStep(dbStep, totalSteps);
    if (dbSameLength && !localDisagrees) valid = Math.max(valid, at); else other = Math.max(other, at);
  }

  out.step = valid;
  out.staleStep = other;
  out.stale = other > valid;
  return out;
}
