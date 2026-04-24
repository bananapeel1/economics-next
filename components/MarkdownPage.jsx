import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Renders a markdown document with site-consistent typography.
 * Used by /data-response/[slug] and any future markdown-backed routes.
 */
export default function MarkdownPage({ content }) {
  return (
    <article className="markdown-page">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
