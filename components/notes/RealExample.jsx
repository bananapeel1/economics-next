import { parseInlineMarkdown } from '@/lib/parse-inline-markdown';

export default function RealExample({ emoji, text, glossaryTerms }) {
  if (!text) return null;
  const html = parseInlineMarkdown(text, glossaryTerms);
  return (
    <div className="rl-real-example">
      <div className="rl-real-example-label">
        {emoji && <span>{emoji} </span>}Real Example
      </div>
      <p dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
