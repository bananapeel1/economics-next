export const MARK_COLORS = {
  4: { bg: 'var(--practice-4-bg)', border: 'var(--practice-4-border)', badge: 'var(--practice-4-badge)' },
  6: { bg: 'var(--practice-6-bg)', border: 'var(--practice-6-border)', badge: 'var(--practice-6-badge)' },
  10: { bg: 'var(--practice-10-bg)', border: 'var(--practice-10-border)', badge: 'var(--practice-10-badge)' },
  20: { bg: 'var(--practice-20-bg)', border: 'var(--practice-20-border)', badge: 'var(--practice-20-badge)' },
};

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
export function resolvePinnedDiagram(diagrams, pin, used) {
  if (!Array.isArray(diagrams) || !diagrams.length) return null;

  if (pin?.id) {
    const idx = diagrams.findIndex(d => d && d.id === pin.id);
    if (idx >= 0 && !used.has(idx)) { used.add(idx); return diagrams[idx]; }
    return null;
  }

  if (pin?.ref) {
    const ref = String(pin.ref).toLowerCase();
    const idx = diagrams.findIndex((d, di) => {
      if (used.has(di)) return false;
      const title = (d.title || '').toLowerCase();
      return title.includes(ref) || ref.includes(title);
    });
    if (idx >= 0) { used.add(idx); return diagrams[idx]; }
  }

  return null;
}
