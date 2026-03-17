"use client";
import { highlightGlossaryTerms } from '@/lib/glossary-highlight';

export default function NotesTab({ data, glossaryTerms }) {
  if (!data || !data.length) {
    return <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No notes available.</div>;
  }

  function g(html) {
    return highlightGlossaryTerms(html, glossaryTerms);
  }

  return (
    <div>
      {data.map((section, i) => (
        <div className="notes-section" key={i}>
          <h3 className="notes-section-title">{section.title}</h3>
          <ul className="notes-list">
            {section.points.map((point, j) => (
              <li key={j} dangerouslySetInnerHTML={{ __html: g(point) }} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
