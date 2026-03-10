"use client";
export default function NotesTab({ data }) {
  if (!data || !data.length) {
    return <div style={{ color: '#6b7a99', textAlign: 'center', padding: 40 }}>No notes available.</div>;
  }

  return (
    <div>
      {data.map((section, i) => (
        <div className="notes-section" key={i}>
          <h3 className="notes-section-title">{section.title}</h3>
          <ul className="notes-list">
            {section.points.map((point, j) => (
              <li key={j} dangerouslySetInnerHTML={{ __html: point }} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
