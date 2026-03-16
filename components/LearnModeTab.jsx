"use client";
import { useState, useEffect, useCallback } from 'react';
import { highlightGlossaryTerms } from '@/lib/glossary-highlight';

const MARK_COLORS = {
  4: { bg: 'var(--practice-4-bg)', border: 'var(--practice-4-border)', badge: 'var(--practice-4-badge)' },
  6: { bg: 'var(--practice-6-bg)', border: 'var(--practice-6-border)', badge: 'var(--practice-6-badge)' },
  10: { bg: 'var(--practice-10-bg)', border: 'var(--practice-10-border)', badge: 'var(--practice-10-badge)' },
  20: { bg: 'var(--practice-20-bg)', border: 'var(--practice-20-border)', badge: 'var(--practice-20-badge)' },
};

/* Evenly space n items across m steps. Returns { stepIndex: item } */
function distributeItems(items, totalSteps) {
  if (!items?.length || totalSteps <= 0) return {};
  const map = {};
  if (items.length >= totalSteps) {
    for (let i = 0; i < totalSteps; i++) map[i] = items[i];
  } else {
    const n = items.length;
    const m = totalSteps;
    for (let i = 0; i < n; i++) {
      const pos = Math.max(0, Math.min(Math.round(((i + 0.5) * m) / n) - 1, m - 1));
      map[pos] = items[i];
    }
  }
  return map;
}

/* ── Inline Diagram Card ── */
function InlineDiagram({ diagram }) {
  const [activeScenario, setActiveScenario] = useState(0);
  const scenarios = diagram.scenarios || [{ label: 'Default', svg: diagram.svg }];
  const currentSvg = scenarios[activeScenario]?.svg || diagram.svg;

  return (
    <div className="lm-diagram-card">
      <div className="lm-card-label">&#128202; Diagram</div>
      <div className="lm-diagram-inner">
        <h3 className="diagram-title">{diagram.title}</h3>
        {diagram.description && <p className="diagram-description">{diagram.description}</p>}
        {scenarios.length > 1 && (
          <div className="scenario-switcher">
            {scenarios.map((s, i) => (
              <button key={i} className={`scenario-btn ${activeScenario === i ? 'active' : ''}`} onClick={() => setActiveScenario(i)}>
                {s.label}
              </button>
            ))}
          </div>
        )}
        <div className="diagram-svg-wrapper" dangerouslySetInnerHTML={{ __html: currentSvg }} />
        {diagram.checklist && (
          <div className="diagram-checklist">
            <div className="diagram-checklist-title">What examiners look for</div>
            <ul>{diagram.checklist.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Inline Practice Card ── */
function InlinePractice({ question }) {
  const [revealed, setRevealed] = useState(false);
  const colors = MARK_COLORS[question.marks] || MARK_COLORS[4];

  return (
    <div className="lm-practice-card">
      <div className="lm-card-label lm-card-label-red">&#9997;&#65039; Quick check</div>
      <div className="lm-practice-inner">
        <p className="lm-practice-question">{question.question}</p>
        <span className="lm-practice-marks" style={{ backgroundColor: colors.bg, color: colors.badge, borderColor: colors.border }}>
          {question.marks} marks
        </span>
        <button className="lm-practice-reveal-btn" onClick={() => setRevealed(!revealed)}>
          {revealed ? 'Hide mark scheme \u25B2' : 'Reveal mark scheme \u25BC'}
        </button>
        <div className={`lm-practice-answer ${revealed ? 'open' : ''}`}>
          <div className="lm-practice-answer-inner">
            {question.guidance?.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Learn Mode Tab ── */
export default function LearnModeTab({
  contentData, diagramsData, practiceData, glossaryTerms,
  sectionId, subjectId, currentSection, currentUnit,
  currentStep, onStepChange,
  isResuming, onResumeDismiss,
  onComplete, onNavigateToQuiz, onNavigateToTab,
}) {
  const [showKeyboardHint, setShowKeyboardHint] = useState(false);
  const [isComplete, setIsComplete] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(`revvy_complete_${subjectId}_${sectionId}`) === 'true';
  });

  const totalSteps = contentData?.length || 0;

  // Distribute diagrams and practice questions evenly across steps
  const sortedPractice = [...(practiceData || [])].sort((a, b) => a.marks - b.marks);
  const diagramMap = distributeItems(diagramsData, totalSteps);
  const practiceMap = distributeItems(sortedPractice, totalSteps);

  // Glossary highlighting
  function g(html) {
    return highlightGlossaryTerms(html, glossaryTerms);
  }

  // Keyboard navigation (desktop)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' && currentStep < totalSteps - 1) {
        onStepChange(currentStep + 1);
      } else if (e.key === 'ArrowLeft' && currentStep > 0) {
        onStepChange(currentStep - 1);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, totalSteps, onStepChange]);

  // Keyboard hint — show once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem('revvy_keyboard_hint_shown')) {
      setShowKeyboardHint(true);
      localStorage.setItem('revvy_keyboard_hint_shown', 'true');
      const timer = setTimeout(() => setShowKeyboardHint(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle completion
  function handleComplete() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`revvy_complete_${subjectId}_${sectionId}`, 'true');
    }
    setIsComplete(true);
    onComplete?.();
  }

  // Empty state
  if (!contentData?.length) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>&#128218;</div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>No content available for Learn Mode</div>
        <div style={{ fontSize: 14 }}>Content for this section is being prepared.</div>
      </div>
    );
  }

  // Completion screen
  if (isComplete) {
    return (
      <div className="lm-complete-screen">
        <div className="lm-complete-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="16 8 10 16 7 13" />
          </svg>
        </div>
        <h2 className="lm-complete-title">Topic complete</h2>
        <p className="lm-complete-topic">{currentSection?.title}</p>
        <div className="lm-complete-divider" />
        <div className="lm-complete-summary">
          <h3 className="lm-complete-summary-title">What you covered</h3>
          <ul className="lm-complete-summary-list">
            {contentData.map((block, i) => (
              <li key={i}>{block.title || `Section ${i + 1}`}</li>
            ))}
          </ul>
        </div>
        <button className="lm-complete-quiz-btn" onClick={onNavigateToQuiz}>
          Try the quiz &rarr;
        </button>
        <button className="lm-complete-explore-btn" onClick={() => onNavigateToTab?.('content')}>
          Explore this topic
        </button>
        <p className="lm-complete-or">or choose another topic</p>
      </div>
    );
  }

  const currentBlock = contentData[currentStep];
  const currentDiagram = diagramMap[currentStep];
  const currentPractice = practiceMap[currentStep];
  const isLastStep = currentStep === totalSteps - 1;
  const progressPct = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="lm-container">
      {/* Resume banner */}
      {isResuming && currentStep > 0 && (
        <div className="lm-resume-banner">
          <span className="lm-resume-text">
            You left off at section {currentStep + 1} of {totalSteps}. Pick up where you left off?
          </span>
          <div className="lm-resume-actions">
            <button className="lm-resume-continue" onClick={onResumeDismiss}>Continue</button>
            <button className="lm-resume-restart" onClick={() => { onStepChange(0); onResumeDismiss?.(); }}>Start over</button>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="lm-progress-track">
        <div className="lm-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="lm-section-counter">Section {currentStep + 1} of {totalSteps}</div>

      {/* Section title */}
      <h2 className="lm-section-title">{currentBlock.title || `Section ${currentStep + 1}`}</h2>

      {/* Content — reuses exact concept-box markup from ContentTab */}
      <div className="lm-content">
        {currentBlock.concepts?.map((concept, j) => (
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
              {concept.formulas?.map((f, k) => (
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
        {currentBlock.examTip && (
          <div className="exam-tip">
            <div className="exam-tip-label">Exam Tip</div>
            {currentBlock.examTip}
          </div>
        )}
      </div>

      {/* Inline diagram (if distributed to this step) */}
      {currentDiagram && <InlineDiagram diagram={currentDiagram} />}

      {/* Inline practice question (if distributed to this step) */}
      {currentPractice && <InlinePractice question={currentPractice} />}

      {/* Keyboard hint */}
      {showKeyboardHint && (
        <div className="lm-keyboard-hint">
          Use <kbd>&larr;</kbd> <kbd>&rarr;</kbd> arrow keys to navigate
        </div>
      )}

      {/* Navigation */}
      <div className="lm-nav">
        {currentStep > 0 && (
          <button className="lm-nav-back" onClick={() => onStepChange(currentStep - 1)}>
            &larr; Back
          </button>
        )}
        <div className="lm-nav-spacer" />
        {!isLastStep ? (
          <button className="lm-nav-next" onClick={() => onStepChange(currentStep + 1)}>
            Next section &rarr;
          </button>
        ) : (
          <button className="lm-nav-complete" onClick={handleComplete}>
            Complete topic &#10003;
          </button>
        )}
      </div>
    </div>
  );
}
