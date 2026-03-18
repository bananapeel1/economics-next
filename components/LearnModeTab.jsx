"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { highlightGlossaryTerms } from '@/lib/glossary-highlight';
import { recordReview } from '@/lib/strength';
import { distributeItems, matchDiagramsToBlocks } from './learn-mode/utils';
import InlineDiagram from './learn-mode/InlineDiagram';
import InlinePractice from './learn-mode/InlinePractice';
import InlineQuiz from './learn-mode/InlineQuiz';
import PreTest from './learn-mode/PreTest';
import CompletionScreen from './learn-mode/CompletionScreen';
import RecallCheckpoint from './learn-mode/RecallCheckpoint';
import ExplainItBackUpgraded from './learn-mode/ExplainItBackUpgraded';
import { NoteSection, TakeawayCard } from './notes';

/* ── Main Learn Mode Tab ── */
export default function LearnModeTab({
  contentData, diagramsData, practiceData, quizData, glossaryTerms,
  sectionId, subjectId, currentSection, currentUnit,
  currentStep, onStepChange,
  isResuming, onResumeDismiss,
  onComplete, onNavigateToQuiz, onNavigateToTab,
  onAskTutor, isPremium,
  dueReviews, onStartReview, onStartMixedReview,
}) {
  const [showKeyboardHint, setShowKeyboardHint] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nodePopped, setNodePopped] = useState(false);
  const [isComplete, setIsComplete] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(`revvy_complete_${subjectId}_${sectionId}`) === 'true';
  });
  const [showPretest, setShowPretest] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Show pre-test only on first visit (not resume), if quiz data exists, and not already done
    const done = localStorage.getItem(`revvy_pretest_${subjectId}_${sectionId}`);
    return !done && !isResuming && (quizData?.length > 0);
  });
  const containerRef = useRef(null);
  const [revealedIndex, setRevealedIndex] = useState(0);
  const lastRevealedRef = useRef(null);

  const totalSteps = contentData?.length || 0;

  // Distribute diagrams, practice questions, and quiz questions across steps.
  // Structured blocks can declare diagramRef, quizIndices, practiceIndices
  // to pin items to specific blocks. Falls back to even distribution.
  const sortedPractice = [...(practiceData || [])].sort((a, b) => a.marks - b.marks);

  const { diagramMap, quizMap, practiceMap } = useMemo(() => {
    const dMap = {}, qMap = {}, pMap = {};
    const hasRefs = contentData?.some(b => b.diagramRef || b.quizIndices || b.practiceIndices);

    if (hasRefs) {
      // Block-level references — content is the single source of truth.
      // Each block declares which items belong to it. Bounds-checked.
      const usedDiagrams = new Set();
      const usedQuiz = new Set();
      const usedPractice = new Set();

      contentData.forEach((block, idx) => {
        // Diagram: match by title substring (case-insensitive, bidirectional)
        if (block.diagramRef && diagramsData?.length) {
          const ref = block.diagramRef.toLowerCase();
          const d = diagramsData.find((d, di) => {
            if (usedDiagrams.has(di)) return false;
            const t = (d.title || '').toLowerCase();
            return t.includes(ref) || ref.includes(t);
          });
          if (d) {
            dMap[idx] = d;
            usedDiagrams.add(diagramsData.indexOf(d));
          }
        }
        // Quiz: pick first valid index
        if (block.quizIndices?.length && quizData?.length) {
          const qi = block.quizIndices.find(i => i >= 0 && i < quizData.length && !usedQuiz.has(i));
          if (qi != null) { qMap[idx] = quizData[qi]; usedQuiz.add(qi); }
        }
        // Practice: pick first valid index
        if (block.practiceIndices?.length && sortedPractice?.length) {
          const pi = block.practiceIndices.find(i => i >= 0 && i < sortedPractice.length && !usedPractice.has(i));
          if (pi != null) { pMap[idx] = sortedPractice[pi]; usedPractice.add(pi); }
        }
      });

      // Unassigned items stay in their own tabs (Diagrams, Quiz, Practice)
      // — they do NOT spill into Learn Mode blocks without explicit refs.
    } else {
      // Legacy fallback — even distribution
      Object.assign(dMap, matchDiagramsToBlocks(diagramsData, contentData));
      Object.assign(qMap, distributeItems(quizData, totalSteps));
      Object.assign(pMap, distributeItems(sortedPractice, totalSteps));
    }
    return { diagramMap: dMap, quizMap: qMap, practiceMap: pMap };
  }, [contentData, diagramsData, quizData, sortedPractice, totalSteps]);

  // Determine practice mode for each distributed practice question (Worked Example Fading)
  const practiceStepIndices = useMemo(() => Object.keys(practiceMap).map(Number).sort((a, b) => a - b), [practiceMap]);
  function getPracticeMode(stepIndex) {
    const ordinal = practiceStepIndices.indexOf(stepIndex);
    const total = practiceStepIndices.length;
    if (total <= 1) return 'independent';
    if (ordinal === 0) return 'worked';
    if (ordinal === total - 1) return 'independent';
    return 'guided';
  }

  // Glossary highlighting
  function g(html) {
    return highlightGlossaryTerms(html, glossaryTerms);
  }

  // Scroll to top — instant for step transitions, smooth for reveals
  const scrollToTop = useCallback((instant = false) => {
    const behavior = instant ? 'instant' : 'smooth';
    const tabContent = document.querySelector('.tab-content');
    if (tabContent) tabContent.scrollTo({ top: 0, behavior });
    window.scrollTo({ top: 0, behavior });
  }, []);

  function navigateToStep(step) {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setNodePopped(true);
    // After exit animation (200ms), snap to top then swap content
    setTimeout(() => {
      scrollToTop(true);
      onStepChange(step);
      setIsTransitioning(false);
      setNodePopped(false);
    }, 200);
  }

  // Keyboard navigation (desktop)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' && currentStep < totalSteps - 1) {
        navigateToStep(currentStep + 1);
      } else if (e.key === 'ArrowLeft' && currentStep > 0) {
        navigateToStep(currentStep - 1);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, totalSteps]);

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

  // Reset progressive reveal when navigating to a new step
  useEffect(() => { setRevealedIndex(0); }, [currentStep]);

  function handleRevealNext() {
    setRevealedIndex(i => i + 1);
    setTimeout(() => {
      lastRevealedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  // Handle completion
  function handleComplete() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`revvy_complete_${subjectId}_${sectionId}`, 'true');

      // Snapshot quiz questions for spaced review schedule
      if (quizData?.length) {
        try {
          const existing = JSON.parse(localStorage.getItem('revvy_review_schedule') || '[]');
          // Don't duplicate if already scheduled
          if (!existing.find(r => r.sectionId === sectionId && r.subjectId === subjectId)) {
            const shuffled = [...quizData].sort(() => Math.random() - 0.5);
            const snapshotQuestions = shuffled.slice(0, Math.min(5, shuffled.length));
            existing.push({
              sectionId,
              subjectId,
              title: currentSection?.title || 'Unknown section',
              questions: snapshotQuestions,
              intervals: [1, 3, 7, 14],
              currentInterval: 0,
              nextDue: Date.now() + 1 * 24 * 60 * 60 * 1000, // 1 day from now
              lastScore: null,
            });
            localStorage.setItem('revvy_review_schedule', JSON.stringify(existing));
          }
        } catch {}
      }

      // Record initial review for strength meter
      recordReview(subjectId, sectionId, null);
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

  // Pre-test gate (before learning starts)
  if (showPretest && currentStep === 0) {
    return (
      <div className="lm-container">
        <PreTest
          quizData={quizData}
          subjectId={subjectId}
          sectionId={sectionId}
          onDone={() => { setShowPretest(false); setTimeout(scrollToTop, 50); }}
        />
      </div>
    );
  }

  // Completion screen
  if (isComplete) {
    return (
      <CompletionScreen
        subjectId={subjectId}
        sectionId={sectionId}
        currentSection={currentSection}
        contentData={contentData}
        quizData={quizData}
        onNavigateToQuiz={onNavigateToQuiz}
        onNavigateToTab={onNavigateToTab}
        onStartMixedReview={onStartMixedReview}
        onRetry={() => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem(`revvy_complete_${subjectId}_${sectionId}`);
          }
          setIsComplete(false);
          onStepChange(0);
          setTimeout(scrollToTop, 50);
        }}
      />
    );
  }

  const currentBlock = contentData[currentStep];
  const currentDiagram = diagramMap[currentStep];
  const currentPractice = practiceMap[currentStep];
  const currentQuiz = quizMap[currentStep];
  const isLastStep = currentStep === totalSteps - 1;
  const progressPct = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="lm-container" ref={containerRef}>
      {/* Review banner */}
      {dueReviews > 0 && onStartReview && (
        <div className="lm-review-banner">
          <span className="lm-review-banner-icon">&#128337;</span>
          <span className="lm-review-banner-text">
            {dueReviews} review{dueReviews !== 1 ? 's' : ''} due
          </span>
          <button className="lm-review-banner-btn" onClick={onStartReview}>Review now</button>
          {onStartMixedReview && (
            <button className="lm-review-banner-mixed-btn" onClick={onStartMixedReview}>Mixed review</button>
          )}
        </div>
      )}

      {/* Resume banner */}
      {isResuming && currentStep > 0 && (
        <div className="lm-resume-banner">
          <span className="lm-resume-text">
            You left off at section {currentStep + 1} of {totalSteps}. Pick up where you left off?
          </span>
          <div className="lm-resume-actions">
            <button className="lm-resume-continue" onClick={onResumeDismiss}>Continue</button>
            <button className="lm-resume-restart" onClick={() => { navigateToStep(0); onResumeDismiss?.(); }}>Start over</button>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="lm-progress-container">
        <div className="lm-progress-track">
          <div className="lm-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="lm-progress-label">{Math.round(progressPct)}%</span>
      </div>

      {/* Vertical stepper with rail */}
      <div className="lm-stepper-step">
        {/* Stepper rail on the left */}
        <div className="lm-stepper-rail">
          <div
            className={`lm-stepper-node active ${nodePopped ? 'node-pop' : ''}`}
            onClick={() => {}}
          >
            <span>{currentStep + 1}</span>
          </div>
          {!isLastStep && (
            <div className={`lm-stepper-line ${currentStep > 0 ? 'filled' : ''}`} />
          )}
        </div>

        {/* Main content on the right */}
        <div className={`lm-stepper-content ${isTransitioning ? 'step-exit' : 'step-enter'}`}>
          {/* Recall checkpoint — active recall of previous step */}
          {currentStep > 0 && (
            <RecallCheckpoint
              key={`recall-${currentStep}`}
              previousBlock={contentData[currentStep - 1]}
            />
          )}

          <div className="lm-section-counter">Section {currentStep + 1} of {totalSteps}</div>

          {/* Section title */}
          <h2 className="lm-section-title">{currentBlock.title || `Section ${currentStep + 1}`}</h2>

          {/* Content — dual-format: structured sections or legacy concept-box HTML */}
          <div className="lm-content">
            {Array.isArray(currentBlock.sections) ? (
              <>
                {/* Progressive reveal: sub-sections one at a time */}
                {currentBlock.sections.slice(0, revealedIndex + 1).map((section, idx) => (
                  <div
                    key={section.id}
                    ref={idx === revealedIndex ? lastRevealedRef : undefined}
                    className={idx === revealedIndex && revealedIndex > 0 ? 'rl-section-enter' : ''}
                  >
                    <NoteSection section={section} glossaryTerms={glossaryTerms} />
                  </div>
                ))}

                {revealedIndex < currentBlock.sections.length - 1 ? (
                  /* Continue button — more sub-sections to reveal */
                  <button className="lm-reveal-btn" onClick={handleRevealNext}>
                    Continue &middot; {revealedIndex + 1} of {currentBlock.sections.length} topics
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  /* All sub-sections revealed — show extras, takeaway, then nav */
                  <div className={currentBlock.sections.length > 1 ? 'rl-section-enter' : ''}>
                    {/* Diagram nestled after content */}
                    {currentDiagram && <InlineDiagram diagram={currentDiagram} />}

                    {/* Quiz nestled after diagram */}
                    {currentQuiz && (
                      <InlineQuiz
                        key={`quiz-${currentStep}`}
                        question={currentQuiz}
                        subjectId={subjectId}
                        sectionId={sectionId}
                        stepIndex={currentStep}
                      />
                    )}

                    {/* Practice question */}
                    {currentPractice && (
                      <InlinePractice
                        key={`practice-${currentStep}`}
                        question={currentPractice}
                        onAskTutor={onAskTutor}
                        mode={getPracticeMode(currentStep)}
                      />
                    )}

                    {/* Takeaway summary */}
                    {currentBlock.takeaway && (
                      <TakeawayCard items={currentBlock.takeaway} glossaryTerms={glossaryTerms} />
                    )}

                    {/* Explain It Back */}
                    {currentBlock.title && (
                      <ExplainItBackUpgraded
                        key={`explain-${currentStep}`}
                        title={currentBlock.title}
                        onAskTutor={onAskTutor}
                        isPremium={isPremium}
                      />
                    )}

                    {/* Navigation */}
                    <div className="lm-nav">
                      {currentStep > 0 && (
                        <button className="lm-nav-back" onClick={() => navigateToStep(currentStep - 1)} disabled={isTransitioning}>
                          &larr; Back
                        </button>
                      )}
                      <div className="lm-nav-spacer" />
                      {!isLastStep ? (
                        <button className="lm-nav-next" onClick={() => navigateToStep(currentStep + 1)} disabled={isTransitioning}>
                          Next section &rarr;
                        </button>
                      ) : (
                        <button className="lm-nav-complete" onClick={handleComplete} disabled={isTransitioning}>
                          Complete topic &#10003;
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Legacy format — no progressive reveal */
              <>
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

                {/* Legacy: extras outside progressive reveal */}
                {currentDiagram && <InlineDiagram diagram={currentDiagram} />}
                {currentQuiz && (
                  <InlineQuiz key={`quiz-${currentStep}`} question={currentQuiz} subjectId={subjectId} sectionId={sectionId} stepIndex={currentStep} />
                )}
                {currentPractice && (
                  <InlinePractice key={`practice-${currentStep}`} question={currentPractice} onAskTutor={onAskTutor} mode={getPracticeMode(currentStep)} />
                )}
                {currentBlock.title && (
                  <ExplainItBackUpgraded key={`explain-${currentStep}`} title={currentBlock.title} onAskTutor={onAskTutor} isPremium={isPremium} />
                )}

                {/* Legacy: navigation always visible */}
                <div className="lm-nav">
                  {currentStep > 0 && (
                    <button className="lm-nav-back" onClick={() => navigateToStep(currentStep - 1)} disabled={isTransitioning}>&larr; Back</button>
                  )}
                  <div className="lm-nav-spacer" />
                  {!isLastStep ? (
                    <button className="lm-nav-next" onClick={() => navigateToStep(currentStep + 1)} disabled={isTransitioning}>Next section &rarr;</button>
                  ) : (
                    <button className="lm-nav-complete" onClick={handleComplete} disabled={isTransitioning}>Complete topic &#10003;</button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Keyboard hint */}
          {showKeyboardHint && (
            <div className="lm-keyboard-hint">
              Use <kbd>&larr;</kbd> <kbd>&rarr;</kbd> arrow keys to navigate
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
