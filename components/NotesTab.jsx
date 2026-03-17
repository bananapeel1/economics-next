"use client";
import { highlightGlossaryTerms } from '@/lib/glossary-highlight';
import NotesPageRenderer from './notes/NotesPageRenderer';

/**
 * Detects whether notes data uses the new structured format (specPoint with chapters)
 * vs the legacy flat format ([{ title, points }]).
 */
function isStructuredFormat(data) {
  return data && typeof data === 'object' && !Array.isArray(data) && Array.isArray(data.chapters);
}

export default function NotesTab({ data, glossaryTerms }) {
  // New structured format (specPoint object with chapters)
  if (isStructuredFormat(data)) {
    return <NotesPageRenderer specPoint={data} glossaryTerms={glossaryTerms} />;
  }

  // Legacy flat format ([{ title, points }])
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
