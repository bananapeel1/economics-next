import { parseInlineMarkdown } from '@/lib/parse-inline-markdown';
import FlowChain from './FlowChain';

export default function BodyRenderer({ blocks, glossaryTerms }) {
  if (!blocks?.length) return null;
  return (
    <div className="rl-body">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p
                key={i}
                className="rl-body-p"
                dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(block.text, glossaryTerms) }}
              />
            );
          case 'subheading':
            return <h4 key={i} className="rl-body-subhead">{block.text}</h4>;
          case 'flow':
            return (
              <FlowChain
                key={i}
                steps={block.steps}
                result={block.result}
                resultType={block.resultType}
              />
            );
          case 'bullets':
            return (
              <ul key={i} className="rl-body-bullets">
                {(block.items || []).map((item, j) => (
                  <li
                    key={j}
                    dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(item, glossaryTerms) }}
                  />
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
