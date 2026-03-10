"use client";
import { highlightGlossaryTerms } from '@/lib/glossary-highlight';

export default function ContentTab({ data, glossaryTerms }) {
  if (!data || !data.length) {
    return <div style={{ color: '#6b7a99', textAlign: 'center', padding: 40 }}>No content available.</div>;
  }

  function g(html) {
    return highlightGlossaryTerms(html, glossaryTerms);
  }

  return (
    <div>
      {data.map((block, i) => (
        <div key={i}>
          {block.title && (
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#059669', marginBottom: 16, marginTop: i > 0 ? 32 : 0 }}>
              {block.title}
            </h2>
          )}

          {block.concepts && block.concepts.map((concept, j) => (
            <div className="concept-box" key={j} style={concept.accent ? { borderLeftColor: concept.accent } : {}}>
              <div className="concept-box-title">{concept.title}</div>
              <div className="concept-box-content">
                {concept.points && (
                  <ul>
                    {concept.points.map((point, k) => (
                      <li key={k} dangerouslySetInnerHTML={{ __html: g(point) }} />
                    ))}
                  </ul>
                )}
                {concept.text && <p dangerouslySetInnerHTML={{ __html: g(concept.text) }} />}
                {concept.formula && <div className="formula-box">{concept.formula}</div>}
                {concept.formulas && concept.formulas.map((f, k) => (
                  <div className="formula-box" key={k}>{f}</div>
                ))}
              </div>
              {concept.examTip && (
                <div className="exam-tip">
                  <div className="exam-tip-label">Exam Tip</div>
                  {concept.examTip}
                </div>
              )}
            </div>
          ))}

          {block.examTip && (
            <div className="exam-tip">
              <div className="exam-tip-label">Exam Tip</div>
              {block.examTip}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
