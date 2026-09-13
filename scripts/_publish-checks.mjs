// The two checks scripts/publish-section.mjs runs before overwriting live content.
//
// Split out of that script so they can be tested on their own. publish-section.mjs does work the
// moment it is imported, so anything left inside it can only be tested by running a publish, and a
// check nobody can test is not a check.
//
// F115 and F109.

const size = (v) => (Array.isArray(v) ? `${v.length} items` : v == null ? 'no row' : `${JSON.stringify(v).length} chars`);

/** Letters and digits only, matching components/learn-mode/utils.js so the report matches the app. */
const norm = (v) => String(v || '').toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * What changed between two payloads, by item id where the items have one.
 *
 * Item ids were minted by scripts/mint-item-ids.mjs precisely so a change could be described rather
 * than weighed. Without them a reviewer sees "1800 chars → 1900 chars" and has no way to know
 * whether that is a fixed typo or a deleted question.
 */
export function describeChange(live, draft) {
  if (!Array.isArray(live) || !Array.isArray(draft)) {
    if (JSON.stringify(live) === JSON.stringify(draft)) return ['identical'];
    return [`${size(live)} → ${size(draft)}`];
  }
  const keyed = (arr) => new Map(arr.map((it, i) => [it && it.id ? `id:${it.id}` : `pos:${i}`, it]));
  const a = keyed(live);
  const b = keyed(draft);
  const added = [...b.keys()].filter((k) => !a.has(k));
  const removed = [...a.keys()].filter((k) => !b.has(k));
  const changed = [...b.keys()].filter((k) => a.has(k) && JSON.stringify(a.get(k)) !== JSON.stringify(b.get(k)));
  const lines = [];
  if (added.length) lines.push(`+${added.length} added   ${added.slice(0, 6).join(' ')}${added.length > 6 ? ' …' : ''}`);
  if (removed.length) lines.push(`-${removed.length} REMOVED ${removed.slice(0, 6).join(' ')}${removed.length > 6 ? ' …' : ''}`);
  if (changed.length) lines.push(`~${changed.length} changed ${changed.slice(0, 6).join(' ')}${changed.length > 6 ? ' …' : ''}`);
  if (!lines.length) lines.push('identical');
  return lines;
}

/** Resolve the draft's diagram pins the way the app does. Returns the ones that reach nothing. */
export function unresolvedPins(content, diagrams) {
  if (!Array.isArray(content)) return [];
  const list = Array.isArray(diagrams) ? diagrams : [];
  const used = new Set();
  const bad = [];
  for (const block of content) {
    const pin = block?.diagramId || block?.diagramRef;
    if (!pin) continue;
    let idx = -1;
    if (block.diagramId) {
      idx = list.findIndex((d, i) => d?.id === block.diagramId && !used.has(i));
    } else {
      const ref = norm(block.diagramRef);
      idx = list.findIndex((d, i) => {
        if (used.has(i)) return false;
        const t = norm(d?.title);
        return t && ref && (t.includes(ref) || ref.includes(t));
      });
    }
    if (idx >= 0) used.add(idx);
    else bad.push(pin);
  }
  return bad;
}

