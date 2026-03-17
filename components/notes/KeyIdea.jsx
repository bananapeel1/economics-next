import { parseInlineMarkdown } from '@/lib/parse-inline-markdown';

export default function KeyIdea({ text, glossaryTerms }) {
  if (!text) return null;
  const html = parseInlineMarkdown(text, glossaryTerms);
  return (
    <div className="rl-key-idea">
      <div className="rl-key-idea-label">Key Idea</div>
      <p dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
