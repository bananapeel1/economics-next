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

/* ── Main Learn Mode Tab — v2: one topic per step ── */
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
    const done = localStorage.getItem(`revvy_pretest_${subjectId}_${sectionId}`);
    return !done && !isResuming && (quizData?.length > 0);
  });
  const containerRef = useRef(null);

  // ── Flatten blocks into one-topic-per-step ──
  const flatSteps = useMemo(() => {
    if (!contentData?.length) return [];
    return contentData.flatMap((block, bi) => {
      if (Array.isArray(block.sections)) {
        return block.sections.map((sec, si) => ({
          type: 'structured',
          section: sec,
          blockTitle: block.title,
          blockIndex: bi,
          isLastInBlock: si === block.sections.length - 1,
          isFirstInBlock: si === 0,
          takeaway: si === block.sections.length - 1 ? block.takeaway : null,
          diagramRef: block.diagramRef,
          quizIndices: block.quizIndices,
          practiceIndices: block.practiceIndices,
        }));
      }
      // Legacy block — keep as single step
      return [{ type: 'legacy', block, blockIndex: bi }];
    });
  }, [contentData]);

  const totalSteps = flatSteps.length || contentData?.length || 0;

  // ── Distribute diagrams/quiz/practice to flatStep indices ──
  const sortedPractice = useMemo(() => [...(practiceData || [])].sort((a, b) => a.marks - b.marks), [practiceData]);

  const { diagramMap, quizMap, practiceMap } = useMemo(() => {
    const dMap = {}, qMap = {}, pMap = {};
    if (!flatSteps.length) return { diagramMap: dMap, quizMap: qMap, practiceMap: pMap };

    const hasRefs = flatSteps.some(s => s.diagramRef || s.quizIndices || s.practiceIndices);

    if (hasRefs) {
      const usedDiagrams = new Set();
      const usedQuiz = new Set();
      const usedPractice = new Set();

      flatSteps.forEach((step, idx) => {
        // Only place items on last-in-block steps (end of chapter)
        if (step.type !== 'structured' || !step.isLastInBlock) return;

        if (step.diagramRef && diagramsData?.length) {
          const ref = step.diagramRef.toLowerCase();
          const d = diagramsData.find((d, di) => {
            if (usedDiagrams.has(di)) return false;
            const t = (d.title || '').toLowerCase();
            return t.includes(ref) || ref.includes(t);
          });
          if (d) { dMap[idx] = d; usedDiagrams.add(diagramsData.indexOf(d)); }
        }
        if (step.quizIndices?.length && quizData?.length) {
          const qi = step.quizIndices.find(i => i >= 0 && i < quizData.length && !usedQuiz.has(i));
          if (qi != null) { qMap[idx] = quizData[qi]; usedQuiz.add(qi); }
        }
        if (step.practiceIndices?.length && sortedPractice?.length) {
          const pi = step.practiceIndices.find(i => i >= 0 && i < sortedPractice.length && !usedPractice.has(i));
          if (pi != null) { pMap[idx] = sortedPractice[pi]; usedPractice.add(pi); }
        }
      });
    } else {
      // Legacy fallback
      Object.assign(dMap, matchDiagramsToBlocks(diagramsData, contentData));
      Object.assign(qMap, distributeItems(quizData, totalSteps));
      Object.assign(pMap, distributeItems(sortedPractice, totalSteps));
    }
    return { diagramMap: dMap, quizMap: qMap, practiceMap: pMap };
  }, [flatSteps, contentData, diagramsData, quizData, sortedPractice, totalSteps]);

  const practiceStepIndices = useMemo(() => Object.keys(practiceMap).map(Number).sort((a, b) => a - b), [practiceMap]);
  function getPracticeMode(stepIndex) {
    const ordinal = practiceStepIndices.indexOf(stepIndex);
    const total = practiceStepIndices.length;
    if (total <= 1) return 'independent';
    if (ordinal === 0) return 'worked';
    if (ordinal === total - 1) return 'independent';
    return 'guided';
  }

  function g(html) { return highlightGlossaryTerms(html, glossaryTerms); }

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
    setTimeout(() => {
      scrollToTop(true);
      onStepChange(step);
      setIsTransitioning(false);
      setNodePopped(false);
    }, 200);
  }

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' && currentStep < totalSteps - 1) navigateToStep(currentStep + 1);
      else if (e.key === 'ArrowLeft' && currentStep > 0) navigateToStep(currentStep - 1);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, totalSteps]);

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
      if (quizData?.length) {
        try {
          const existing = JSON.parse(localStorage.getItem('revvy_review_schedule') || '[]');
          if (!existing.find(r => r.sectionId === sectionId && r.subjectId === subjectId)) {
            const shuffled = [...quizData].sort(() => Math.random() - 0.5);
            existing.push({
              sectionId, subjectId,
              title: currentSection?.title || 'Unknown section',
              questions: shuffled.slice(0, Math.min(5, shuffled.length)),
              intervals: [1, 3, 7, 14], currentInterval: 0,
              nextDue: Date.now() + 1 * 24 * 60 * 60 * 1000, lastScore: null,
            });
            localStorage.setItem('revvy_review_schedule', JSON.stringify(existing));
          }
        } catch {}
      }
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

  // Pre-test gate
  if (showPretest && currentStep === 0) {
    return (
      <div className="lm-container">
        <PreTest quizData={quizData} subjectId={subjectId} sectionId={sectionId}
          onDone={() => { setShowPretest(false); setTimeout(scrollToTop, 50); }} />
      </div>
    );
  }

  // Completion screen
  if (isComplete) {
    return (
      <CompletionScreen
        subjectId={subjectId} sectionId={sectionId} currentSection={currentSection}
        contentData={contentData} quizData={quizData}
        onNavigateToQuiz={onNavigateToQuiz} onNavigateToTab={onNavigateToTab}
        onStartMixedReview={onStartMixedReview}
        onRetry={() => {
          if (typeof window !== 'undefined') localStorage.removeItem(`revvy_complete_${subjectId}_${sectionId}`);
          setIsComplete(false);
          onStepChange(0);
          setTimeout(scrollToTop, 50);
        }}
      />
    );
  }

  // ── Current step data ──
  const step = flatSteps[currentStep];
  const currentDiagram = diagramMap[currentStep];
  const currentPractice = practiceMap[currentStep];
  const currentQuiz = quizMap[currentStep];
  const isLastStep = currentStep === totalSteps - 1;
  const progressPct = ((currentStep + 1) / totalSteps) * 100;

  // Chapter heading: show when entering a new block
  const showChapterHeading = step?.type === 'structured' && step.isFirstInBlock;
  const prevStep = currentStep > 0 ? flatSteps[currentStep - 1] : null;

  return (
    <div className="lm-container" ref={containerRef}>
      {/* Review banner */}
      {dueReviews > 0 && onStartReview && (
        <div className="lm-review-banner">
          <span className="lm-review-banner-icon">&#128337;</span>
          <span className="lm-review-banner-text">{dueReviews} review{dueReviews !== 1 ? 's' : ''} due</span>
          <button className="lm-review-banner-btn" onClick={onStartReview}>Review now</button>
          {onStartMixedReview && <button className="lm-review-banner-mixed-btn" onClick={onStartMixedReview}>Mixed review</button>}
        </div>
      )}

      {/* Resume banner */}
      {isResuming && currentStep > 0 && (
        <div className="lm-resume-banner">
          <span className="lm-resume-text">You left off at step {currentStep + 1} of {totalSteps}. Pick up where you left off?</span>
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

      {/* Stepper */}
      <div className="lm-stepper-step">
        <div className="lm-stepper-rail">
          <div className={`lm-stepper-node active ${nodePopped ? 'node-pop' : ''}`}>
            <span>{currentStep + 1}</span>
          </div>
          {!isLastStep && <div className={`lm-stepper-line ${currentStep > 0 ? 'filled' : ''}`} />}
        </div>

        <div className={`lm-stepper-content ${isTransitioning ? 'step-exit' : 'step-enter'}`}>
          {/* Recall checkpoint */}
          {currentStep > 0 && prevStep?.type === 'structured' && (
            <RecallCheckpoint key={`recall-${currentStep}`} previousBlock={{ sections: [prevStep.section] }} />
          )}

          <div className="lm-section-counter">Step {currentStep + 1} of {totalSteps}</div>

          {step?.type === 'structured' ? (
            <>
              {/* Chapter heading — only on first topic of a new block */}
              {showChapterHeading && (
                <div className="lm-chapter-heading">{step.blockTitle}</div>
              )}

              {/* Topic title */}
              <h2 className="lm-section-title">{step.section.title}</h2>

              {/* Single NoteSection — one topic per step */}
              <div className="lm-content">
                <NoteSection section={step.section} glossaryTerms={glossaryTerms} />

                {/* Diagram (on last topic of block) */}
                {step.isLastInBlock && currentDiagram && <InlineDiagram diagram={currentDiagram} />}

                {/* Quiz (on last topic of block) */}
                {step.isLastInBlock && currentQuiz && (
                  <InlineQuiz key={`quiz-${currentStep}`} question={currentQuiz}
                    subjectId={subjectId} sectionId={sectionId} stepIndex={currentStep} />
                )}

                {/* Practice (on last topic of block) */}
                {step.isLastInBlock && currentPractice && (
                  <InlinePractice key={`practice-${currentStep}`} question={currentPractice}
                    onAskTutor={onAskTutor} mode={getPracticeMode(currentStep)} />
                )}

                {/* Explain It Back — BEFORE takeaway (Change 2) */}
                {step.isLastInBlock && step.blockTitle && (
                  <ExplainItBackUpgraded key={`explain-${currentStep}`} title={step.blockTitle}
                    onAskTutor={onAskTutor} isPremium={isPremium} />
                )}

                {/* Takeaway — AFTER explain it back */}
                {step.takeaway && <TakeawayCard items={step.takeaway} glossaryTerms={glossaryTerms} />}
              </div>
            </>
          ) : step?.type === 'legacy' ? (
            <>
              <h2 className="lm-section-title">{step.block.title || `Section ${currentStep + 1}`}</h2>
              <div className="lm-content">
                {step.block.concepts?.map((concept, j) => (
                  <div className="concept-box" key={j} style={concept.accent ? { borderLeftColor: concept.accent } : {}}>
                    <div className="concept-box-title">{concept.title}</div>
                    <div className="concept-box-content">
                      {concept.points && <ul>{concept.points.map((p, k) => <li key={k} dangerouslySetInnerHTML={{ __html: g(p) }} />)}</ul>}
                      {concept.text && <p dangerouslySetInnerHTML={{ __html: g(concept.text) }} />}
                      {concept.formula && <div className="formula-box">{concept.formula}</div>}
                      {concept.formulas?.map((f, k) => <div className="formula-box" key={k}>{f}</div>)}
                    </div>
                    {concept.examTip && <div className="exam-tip"><div className="exam-tip-label">Exam Tip</div>{concept.examTip}</div>}
                  </div>
                ))}
                {step.block.examTip && <div className="exam-tip"><div className="exam-tip-label">Exam Tip</div>{step.block.examTip}</div>}
                {currentDiagram && <InlineDiagram diagram={currentDiagram} />}
                {currentQuiz && <InlineQuiz key={`quiz-${currentStep}`} question={currentQuiz} subjectId={subjectId} sectionId={sectionId} stepIndex={currentStep} />}
                {currentPractice && <InlinePractice key={`practice-${currentStep}`} question={currentPractice} onAskTutor={onAskTutor} mode={getPracticeMode(currentStep)} />}
                {step.block.title && <ExplainItBackUpgraded key={`explain-${currentStep}`} title={step.block.title} onAskTutor={onAskTutor} isPremium={isPremium} />}
              </div>
            </>
          ) : null}

          {/* Navigation */}
          <div className="lm-nav">
            {currentStep > 0 && (
              <button className="lm-nav-back" onClick={() => navigateToStep(currentStep - 1)} disabled={isTransitioning}>&larr; Back</button>
            )}
            <div className="lm-nav-spacer" />
            {!isLastStep ? (
              <button className="lm-nav-next" onClick={() => navigateToStep(currentStep + 1)} disabled={isTransitioning}>
                Next &rarr;
              </button>
            ) : (
              <button className="lm-nav-complete" onClick={handleComplete} disabled={isTransitioning}>
                Complete topic &#10003;
              </button>
            )}
          </div>

          {showKeyboardHint && (
            <div className="lm-keyboard-hint">Use <kbd>&larr;</kbd> <kbd>&rarr;</kbd> arrow keys to navigate</div>
          )}
        </div>
      </div>
    </div>
  );
}
