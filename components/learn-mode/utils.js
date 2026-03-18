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
 * Returns { stepIndex: diagram } where each diagram is placed on the
 * block whose title shares the most words with the diagram title.
 * Falls back to even distribution if no meaningful matches found.
 */
export function matchDiagramsToBlocks(diagrams, blocks) {
  if (!diagrams?.length || !blocks?.length) return {};
  const normalize = s => (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);

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

    if (bestScore > 0 && bestIdx >= 0) {
      map[bestIdx] = diagram;
      used.add(bestIdx);
    } else {
      // No match — place on first available step
      for (let i = 0; i < blocks.length; i++) {
        if (!used.has(i) && !map[i]) { map[i] = diagram; used.add(i); break; }
      }
    }
  }
  return map;
}
