import { parseInlineMarkdown } from '@/lib/parse-inline-markdown';

export default function MisconceptionCard({ text, glossaryTerms }) {
  if (!text) return null;
  const html = parseInlineMarkdown(text, glossaryTerms);
  return (
    <div className="rl-misconception">
      <div className="rl-misconception-label">Common Misconception</div>
      <p dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
