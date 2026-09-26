/**
 * "What a correct diagram shows", collapsed by default (founder, 26 Sep 2026): the list took a
 * large share of the screen under every diagram, and most students scroll past it, but it is the
 * exam-drawing checklist, so it stays one tap away rather than going.
 *
 * Native <details>/<summary>: keyboard, screen reader (announced as expanded/collapsed) and touch
 * all work without script, on every browser the app supports. The summary carries the point count
 * so a collapsed box still says what is inside it.
 *
 * Not "what examiners look for": that is the uncited claim about marking the content gate blocks in
 * prose (claim.uncited). The checklist says what a correct diagram contains, which is checkable.
 */
export default function DiagramChecklist({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <details className="diagram-checklist">
      <summary className="diagram-checklist-title">
        <span>What a correct diagram shows</span>
        <span className="diagram-checklist-count">{items.length} {items.length === 1 ? 'point' : 'points'}</span>
      </summary>
      <ul>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </details>
  );
}
