"use client";
import { highlightGlossaryTerms, newHighlightScope } from '@/lib/glossary-highlight';

/* ── Rich Notes Tab — matches RevvyLearn Notes Redesign ── */
export default function NotesTab({ data, glossaryTerms }) {
  if (!data || !data.length) {
    return <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No notes available.</div>;
  }

  // F068: one scope per chapter, so a term is underlined the first time it appears in that
  // chapter and not again in every card below it. `gPlain` skips highlighting entirely for the
  // surfaces where a tooltip competes with the point being made — the key idea a student is meant
  // to absorb, and the takeaways that summarise it.
  let scope = newHighlightScope();
  function resetScope() { scope = newHighlightScope(); }
  function g(html) {
    return highlightGlossaryTerms(html, glossaryTerms, scope);
  }
  function gPlain(html) {
    return highlightGlossaryTerms(html, null);
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
      {data.map((chapter, ci) => {
        // A term is worth underlining once per chapter. Starting a fresh scope here is what makes
        // that true, rather than once per section or once per card (F068).
        resetScope();
        return (
        <div className="rn-chapter" key={ci}>
          {/* Chapter heading */}
          <div className="rn-chapter-heading">
            <span>{chapter.title}</span>
            {chapter.meta && <span className="rn-ch-meta">{chapter.meta}</span>}
          </div>

          {/* Color key legend — below heading */}
          {ci === 0 && (
            <div className="rn-color-key">
              <span className="rn-color-key-item"><span className="rn-color-dot def" /> Definition</span>
              <span className="rn-color-key-item"><span className="rn-color-dot mech" /> Mechanism</span>
              <span className="rn-color-key-item"><span className="rn-color-dot imp" /> Implication</span>
              <span className="rn-color-key-item"><span className="rn-color-dot link" /> Link</span>
            </div>
          )}

          {/* Key Idea */}
          {chapter.keyIdea && (
            <div className="rn-key-idea">
              <div className="rn-key-idea-label">✦ KEY IDEA</div>
              <div className="rn-key-idea-text" dangerouslySetInnerHTML={{ __html: gPlain(chapter.keyIdea) }} />
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
                  <span dangerouslySetInnerHTML={{ __html: gPlain(t) }} />
                </div>
              ))}
            </div>
          )}
        </div>
        );
      })}
    </div>
  );
}
