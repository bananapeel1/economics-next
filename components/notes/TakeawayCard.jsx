import { parseInlineMarkdown } from '@/lib/parse-inline-markdown';

export default function TakeawayCard({ items, glossaryTerms }) {
  if (!items?.length) return null;
  return (
    <div className="rl-takeaway">
      <div className="rl-takeaway-label">Chapter Takeaway</div>
      {items.map((item, i) => (
        <div key={i} className="rl-takeaway-item">
          <span className="rl-takeaway-check">✓</span>
          <span dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(item, glossaryTerms) }} />
        </div>
      ))}
    </div>
  );
}
