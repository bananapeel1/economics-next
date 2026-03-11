"use client";
import { useState, useRef, useEffect } from 'react';
import { highlightGlossaryTerms } from '@/lib/glossary-highlight';

export default function ContentTab({ data, glossaryTerms, onStepChange, initialPosition }) {
  // key={sectionId} on parent forces remount, so useState initials work correctly
  const [activeStep, setActiveStep] = useState(initialPosition?.activeStep || 0);
  const [furthestStep, setFurthestStep] = useState(initialPosition?.furthestStep || 0);
  const stepRefs = useRef([]);
  const containerRef = useRef(null);

  // Report step changes to parent (for sidebar dots + position memory)
  useEffect(() => {
    if (onStepChange && data?.length) {
      onStepChange({ activeStep, furthestStep, totalSteps: data.length });
    }
  }, [activeStep, furthestStep, data?.length, onStepChange]);

  if (!data || !data.length) {
    return <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No content available.</div>;
  }

  function g(html) {
    return highlightGlossaryTerms(html, glossaryTerms);
  }

  function goToStep(index) {
    // All steps are always accessible
    setActiveStep(index);
    // Expand furthest if jumping ahead
    if (index > furthestStep) {
      setFurthestStep(index);
    }
    setTimeout(() => {
      stepRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  function handleContinue(e) {
    e.stopPropagation();
    const next = activeStep + 1;
    if (next < data.length) {
      const newFurthest = Math.max(furthestStep, next);
      setFurthestStep(newFurthest);
      setActiveStep(next);
      setTimeout(() => {
        stepRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  function handleMarkComplete(e) {
    e.stopPropagation();
    setFurthestStep(data.length - 1);
  }

  const isLastStep = activeStep === data.length - 1;
  const allComplete = furthestStep >= data.length - 1;

  return (
    <div className="stepper-container" ref={containerRef}>
      {data.map((block, i) => {
        const isActive = i === activeStep;
        const isVisited = i <= furthestStep;

        return (
          <div
            key={i}
            ref={el => (stepRefs.current[i] = el)}
            className={`stepper-step ${isActive ? 'active' : ''} ${isVisited && !isActive ? 'completed' : ''}`}
          >
            {/* Step indicator line on left */}
            <div className="stepper-rail">
              <div
                className={`stepper-node ${isActive ? 'active' : ''} unlocked`}
                onClick={() => goToStep(i)}
                style={{ cursor: 'pointer' }}
              >
                {isVisited && !isActive ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              {i < data.length - 1 && (
                <div className={`stepper-line ${i < furthestStep ? 'filled' : ''}`} />
              )}
            </div>

            {/* Step content */}
            <div className="stepper-content">
              <div
                className="stepper-step-header"
                onClick={() => goToStep(i)}
                style={{ cursor: 'pointer' }}
              >
                <h2 className="stepper-step-title">{block.title || `Topic ${i + 1}`}</h2>
                {isVisited && !isActive && (
                  <span className="stepper-expand-hint">Click to review</span>
                )}
              </div>

              {isActive && (
                <div className="stepper-step-body">
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

                  {/* Continue / Complete button */}
                  <div className="stepper-action">
                    {!isLastStep ? (
                      <button className="stepper-continue-btn" onClick={handleContinue}>
                        Continue to next topic
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : !allComplete ? (
                      <button className="stepper-continue-btn complete" onClick={handleMarkComplete}>
                        Mark as complete
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </button>
                    ) : (
                      <div className="stepper-complete-message">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="16 8 10 16 7 13" />
                        </svg>
                        You&apos;ve covered all topics in this section!
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
