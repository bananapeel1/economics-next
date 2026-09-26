import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Every body cell of a table carries its column heading as `data-label`. Packet 12.8, E054: at
 * phone width `app/data-response/markdown-page.css` stacks a table one row per block, and the
 * heading moves into the cell (`td::before { content: attr(data-label) }`) rather than being
 * dropped. Nothing is cut and nothing scrolls sideways — the founder's no-cut-text standard
 * (DECISIONS 2026-09-26). A rehype plugin, so it runs on the syntax tree and needs no dependency.
 */
function labelCells() {
  const text = (node) => (node.type === 'text' ? node.value : (node.children || []).map(text).join(''));
  const kids = (node, tag) => (node.children || []).filter((c) => c.type === 'element' && c.tagName === tag);
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'table') {
      const head = kids(node, 'thead')[0];
      const headRow = head && kids(head, 'tr')[0];
      const labels = headRow ? kids(headRow, 'th').map((th) => text(th).trim()) : [];
      for (const body of kids(node, 'tbody')) {
        for (const tr of kids(body, 'tr')) {
          kids(tr, 'td').forEach((td, i) => {
            if (labels[i]) td.properties = { ...(td.properties || {}), dataLabel: labels[i] };
          });
        }
      }
    }
    (node.children || []).forEach(visit);
  };
  return (tree) => visit(tree);
}

/** A table in a container the stacking rule can measure (a container query, not the viewport). */
function Table({ node, ...props }) {
  return (
    <div className="md-table">
      <table {...props} />
    </div>
  );
}

/**
 * Renders a markdown document with site-consistent typography.
 * Used by /data-response/[slug] and any future markdown-backed routes.
 */
export default function MarkdownPage({ content }) {
  return (
    <article className="markdown-page">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[labelCells]} components={{ table: Table }}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
