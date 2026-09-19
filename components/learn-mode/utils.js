import { bestUnclaimedIndex } from '../../lib/checkin-fallback.js';

/**
 * The inline-practice card's colours. This was the twin of the hardcoded 4/6/10/20 map in
 * PracticeQuestionsTab; both are now one derivation from lib/ial-marking.js, so a tariff exists
 * in exactly one place. `markColor` covers every tariff in both subjects and falls back rather
 * than emitting an unresolved var(). Packet 12.1, E006.
 */
export { markColor } from '../../lib/practice-tariffs.js';

/* Evenly space n items across m steps. Returns { stepIndex: item } */
export function distributeItems(items, totalSteps) {
  if (!items?.length || totalSteps <= 0) return {};
  const map = {};
  if (items.length >= totalSteps) {
    for (let i = 0; i < totalSteps; i++) map[i] = items[i];
  } else {
    const n = items.length;
    const m = totalSteps;
    for (let i = 0; i < n; i++) {
      const pos = Math.max(0, Math.min(Math.round(((i + 0.5) * m) / n) - 1, m - 1));
      map[pos] = items[i];
    }
  }
  return map;
}

/**
 * Match diagrams to content blocks by title word-overlap.
 * Returns { stepIndex: diagram } — STRICT: only places a diagram if
 * there is a genuine title match (score >= 1). Unmatched diagrams are
 * skipped entirely so they never appear on an unrelated block.
 */
export function matchDiagramsToBlocks(diagrams, blocks) {
  if (!diagrams?.length || !blocks?.length) return {};
  // Three-letter joining words ('and', 'the', 'for') were counted as topic matches, so a
  // block could be handed a diagram it shares nothing with but a conjunction.
  const STOP = new Set(['and', 'the', 'for', 'its', 'with', 'from', 'into', 'that', 'this',
    'are', 'was', 'how', 'why', 'what', 'their', 'them', 'not', 'but', 'can', 'has', 'over']);
  const normalize = s => (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/)
    .filter(w => w.length > 2 && !STOP.has(w));

  const map = {};
  const used = new Set();

  for (const diagram of diagrams) {
    const dWords = new Set(normalize(diagram.title));
    let bestIdx = -1, bestScore = 0;

    blocks.forEach((block, idx) => {
      if (used.has(idx)) return;
      const bWords = normalize(block.title);
      const score = bWords.filter(w => dWords.has(w)).length;
      if (score > bestScore) { bestScore = score; bestIdx = idx; }
    });

    // Only place if there's a genuine word match — never dump on random blocks
    if (bestScore > 0 && bestIdx >= 0) {
      map[bestIdx] = diagram;
      used.add(bestIdx);
    }
    // No match → diagram stays in Diagrams tab only, not in Learn Mode
  }
  return map;
}

/**
 * The question a check-in falls back to when its chapter pins none. V026.
 *
 * The rule, the reason and the F041 precedent it follows are in lib/checkin-fallback.js. This is
 * the client half: the server can only rewrite the payload a SIGNED-OUT reader gets, and a paying
 * one is handed the bank with the pins as authored, so the same chapter resolves to nothing for
 * them unless the resolution itself falls back. Runs after the pins, out of what no pin claimed,
 * so it can never displace one that worked.
 */
export function fallbackItemForBlock(items, text, used) {
  const idx = bestUnclaimedIndex(items, text, used);
  if (idx < 0) return null;
  used.add(idx);
  return items[idx];
}

/* ── Pin resolution ──────────────────────────────────────────────────────────
   A block pins its quiz, practice and diagram either by id (after packet 2) or by
   positional index / title substring (the legacy form). Both are supported for one
   release so content can be re-pinned section by section rather than all at once.

   Ids win outright: a block that carries ids ignores its own legacy indices, so a
   half-migrated section cannot resolve two different ways depending on the field.
   A pin by id that finds nothing renders nothing and is reported by
   audit/scripts/pin-check.mjs — silently falling back to an index would hide exactly
   the breakage the ids exist to prevent.                                          */

/**
 * @param {Array} items      the raw item array, in authored order
 * @param {object} pin       { ids?: string[], indices?: number[] }
 * @param {Set} used         indices already consumed by earlier blocks
 * @returns {object|null}
 */
export function resolvePinnedItem(items, pin, used) {
  if (!Array.isArray(items) || !items.length) return null;

  if (Array.isArray(pin?.ids) && pin.ids.length) {
    for (const id of pin.ids) {
      const idx = items.findIndex(it => it && it.id === id);
      if (idx >= 0 && !used.has(idx)) { used.add(idx); return items[idx]; }
    }
    return null;
  }

  if (Array.isArray(pin?.indices) && pin.indices.length) {
    const idx = pin.indices.find(i => i >= 0 && i < items.length && !used.has(i));
    if (idx != null) { used.add(idx); return items[idx]; }
  }

  return null;
}

/**
 * Diagrams pin by id, or by the legacy two-way substring match on the title.
 * @param {Array} diagrams
 * @param {object} pin  { id?: string, ref?: string }
 * @param {Set} used
 */
/** Letters and digits only, so punctuation and spacing cannot break a pin. */
export function norm(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function resolvePinnedDiagram(diagrams, pin, used) {
  if (!Array.isArray(diagrams) || !diagrams.length) return null;

  if (pin?.id) {
    const idx = diagrams.findIndex(d => d && d.id === pin.id);
    if (idx >= 0 && !used.has(idx)) { used.add(idx); return diagrams[idx]; }
    return null;
  }

  if (pin?.ref) {
    // F052. The old comparison lowercased but kept punctuation and spacing, so a block asking for
    // "fiscal-policy-ad" never matched the diagram titled "Fiscal Policy: AD/AS Impact" and the
    // block silently rendered nothing. Normalising both sides to letters and digits recovers four
    // of the twenty-four broken pins; the other twenty name a diagram that does not exist, which
    // is a content gap and is reported by `npm run diagrams` rather than hidden here.
    const ref = norm(pin.ref);
    if (ref) {
      const idx = diagrams.findIndex((d, di) => {
        if (used.has(di)) return false;
        const title = norm(d.title);
        return title && (title.includes(ref) || ref.includes(title));
      });
      if (idx >= 0) { used.add(idx); return diagrams[idx]; }
    }
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `[diagrams] pin "${pin.ref}" matched no diagram. Available: ` +
          (diagrams.map((d) => d.title).join(' | ') || '(none)'),
      );
    }
  }

  return null;
}
