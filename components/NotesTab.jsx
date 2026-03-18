"use client";
import { highlightGlossaryTerms } from '@/lib/glossary-highlight';

/* ── Rich Notes Tab — matches RevvyLearn Notes Redesign ── */
export default function NotesTab({ data, glossaryTerms }) {
  if (!data || !data.length) {
    return <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No notes available.</div>;
  }

  function g(html) {
    return highlightGlossaryTerms(html, glossaryTerms);
  }

  // Detect format: new rich format has "blocks" array, old format has "points" array
  const isRichFormat = data[0]?.blocks || data[0]?.keyIdea;

  if (!isRichFormat) {
    // Legacy format — simple bullet list
    return (
      <div>
        {data.map((section, i) => (
          <div className="notes-section" key={i}>
            <h3 className="notes-section-title">{section.title}</h3>
            <ul className="notes-list">
              {section.points?.map((point, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: g(point) }} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  // Rich format — chapters with blocks, flow chains, formulas, callouts
  return (
    <div className="rn-notes">
      {data.map((chapter, ci) => (
        <div className="rn-chapter" key={ci}>
          {/* Chapter heading */}
          <div className="rn-chapter-heading">
            <span>{chapter.title}</span>
            {chapter.meta && <span className="rn-ch-meta">{chapter.meta}</span>}
          </div>

          {/* Key Idea */}
          {chapter.keyIdea && (
            <div className="rn-key-idea">
              <div className="rn-key-idea-label">✦ KEY IDEA</div>
              <div className="rn-key-idea-text" dangerouslySetInnerHTML={{ __html: g(chapter.keyIdea) }} />
            </div>
          )}

          {/* Note blocks */}
          {chapter.blocks?.map((block, bi) => (
            <div className="rn-note-block" key={bi}>
              {block.title && (
                <div className="rn-block-title">{block.title}</div>
              )}
              <div className="rn-note-list">
                {block.items?.map((item, ii) => (
                  <div className="rn-note-item" key={ii}>
                    <div className={`rn-bullet ${item.type || 'def'}`} />
                    <div className="rn-note-text" dangerouslySetInnerHTML={{ __html: g(item.text) }} />
                    {item.tag && (
                      <span className={`rn-note-tag ${item.tag}`}>
                        {item.tag === 'exam' ? 'EXAM TIP' : item.tag === 'calc' ? 'FORMULA' : item.tag.toUpperCase()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Formula card */}
          {chapter.formula && (
            <div className="rn-formula-card">
              <div className="rn-formula-label">{chapter.formula.label || 'FORMULA'}</div>
              <div className="rn-formula-text">{chapter.formula.text}</div>
            </div>
          )}
          {/* Multiple formulas */}
          {chapter.formulas?.map((f, fi) => (
            <div className="rn-formula-card" key={fi}>
              <div className="rn-formula-label">{f.label || 'FORMULA'}</div>
              <div className="rn-formula-text">{f.text}</div>
            </div>
          ))}

          {/* Flow chain */}
          {chapter.flow && (
            <div className="rn-flow-chain">
              {chapter.flow.steps.map((step, si) => (
                <span key={si}>
                  {si > 0 && <span className="rn-flow-arrow">→</span>}
                  <span className="rn-flow-step">{step}</span>
                </span>
              ))}
              {chapter.flow.result && (
                <>
                  <span className="rn-flow-arrow">→</span>
                  <span className={`rn-flow-result ${chapter.flow.resultType === 'good' ? 'good' : 'bad'}`}>
                    {chapter.flow.result}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Exam Matters callout */}
          {chapter.examMatters && (
            <div className="rn-callout exam">
              <div className="rn-callout-label">📋 EXAM MATTERS</div>
              <div className="rn-callout-text" dangerouslySetInnerHTML={{ __html: g(chapter.examMatters) }} />
            </div>
          )}

          {/* Misconception callout */}
          {chapter.misconception && (
            <div className="rn-callout misconception">
              <div className="rn-callout-label">⚠ COMMON MISTAKE</div>
              <div className="rn-callout-text" dangerouslySetInnerHTML={{ __html: g(chapter.misconception) }} />
            </div>
          )}

          {/* Takeaway */}
          {chapter.takeaway && (
            <div className="rn-takeaway">
              <div className="rn-takeaway-label">CHAPTER TAKEAWAY</div>
              {chapter.takeaway.map((t, ti) => (
                <div className="rn-takeaway-item" key={ti}>
                  <span className="rn-check">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: g(t) }} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
