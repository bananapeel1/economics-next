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
import ReorderRecall from './learn-mode/ReorderRecall';
import FillInRecall from './learn-mode/FillInRecall';
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

  // ── Score tracking for completion breakdown ──
  const [scores, setScores] = useState({ quiz: { correct: 0, total: 0 }, recall: { correct: 0, total: 0 }, explain: { attempts: 0, total: 0 } });
  function onQuizResult(correct) { setScores(s => ({ ...s, quiz: { correct: s.quiz.correct + (correct ? 1 : 0), total: s.quiz.total + 1 } })); }
  function onRecallResult(correct) { setScores(s => ({ ...s, recall: { correct: s.recall.correct + (correct ? 1 : 0), total: s.recall.total + 1 } })); }
  function onExplainAttempt() { setScores(s => ({ ...s, explain: { attempts: s.explain.attempts + 1, total: s.explain.total + 1 } })); }

  // ── Flatten blocks into steps — 2 topics per step where possible ──
  const flatSteps = useMemo(() => {
    if (!contentData?.length) return [];
    return contentData.flatMap((block, bi) => {
      if (Array.isArray(block.sections)) {
        const steps = [];
        const secs = block.sections;
        for (let si = 0; si < secs.length; si += 2) {
          const pair = [secs[si]];
          if (si + 1 < secs.length) pair.push(secs[si + 1]);
          const isLast = si + pair.length >= secs.length;
          steps.push({
            type: 'structured',
            sections: pair,  // 1 or 2 sections per step
            blockTitle: block.title,
            blockIndex: bi,
            isLastInBlock: isLast,
            isFirstInBlock: si === 0,
            takeaway: isLast ? block.takeaway : null,
            diagramRef: block.diagramRef,
            quizIndices: block.quizIndices,
            practiceIndices: block.practiceIndices,
          });
        }
        return steps;
      }
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

  const [stepComplete, setStepComplete] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  function navigateToStep(step) {
    if (isTransitioning) return;
    setIsTransitioning(true);

    if (step > currentStep) {
      // Going forward — checkmark pulse, instant scroll, then swap
      setStepComplete(true);
      setNodePopped(true);
      // Save step progress to server (fire-and-forget)
      saveLearnModeProgress(sectionId, totalSteps, currentStep, false);
      setTimeout(() => {
        scrollToTop(true); // instant — guarantees we're at the top
        setStepComplete(false);
        onStepChange(step);
        setNodePopped(false);
        setIsTransitioning(false);
      }, 350); // just enough for the checkmark pulse
    } else {
      // Going back — instant scroll + swap
      scrollToTop(true);
      onStepChange(step);
      setNodePopped(false);
      setIsTransitioning(false);
    }
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

      // Save learn mode completion to Supabase for progress dashboard
      saveLearnModeProgress(sectionId, totalSteps, currentStep, true);
    }
    setIsComplete(true);
    onComplete?.();
  }

  // Save learn mode progress to server (feeds into /progress dashboard)
  function saveLearnModeProgress(secId, total, step, complete) {
    fetch('/api/learn-mode/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sectionId: secId,
        totalSteps: total,
        completedStep: step,
        isComplete: complete,
      }),
    }).catch(() => {}); // fire-and-forget, don't block UI
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
        contentData={contentData} quizData={quizData} scores={scores}
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
          <div className={`lm-stepper-node active ${nodePopped ? 'node-pop' : ''} ${stepComplete ? 'step-done' : ''}`}>
            <span>{stepComplete ? '✓' : currentStep + 1}</span>
          </div>
          {!isLastStep && <div className={`lm-stepper-line ${currentStep > 0 ? 'filled' : ''}`} />}
        </div>

        <div className="lm-stepper-content">
          <div className="lm-section-counter-row">
            <div className="lm-section-counter">Step {currentStep + 1} of {totalSteps}</div>
            <div className="lm-more-menu-wrapper">
              <button className="lm-more-btn" onClick={() => setShowMoreMenu(v => !v)} title="More options">⋯</button>
              {showMoreMenu && (
                <div className="lm-more-dropdown">
                  <button className="lm-more-item" onClick={() => { navigateToStep(0); setShowMoreMenu(false); }}>
                    ↺ Restart learning
                  </button>
                  <button className="lm-more-item" onClick={() => { onNavigateToTab?.('content'); setShowMoreMenu(false); }}>
                    ☰ View all content
                  </button>
                </div>
              )}
            </div>
          </div>

          {step?.type === 'structured' ? (() => {
            // Gather recalls: current step's sections + previous step's last section
            const currentRecalls = step.sections.map(s => s.recall).filter(Boolean);
            const prevStepData = currentStep > 0 ? flatSteps[currentStep - 1] : null;
            const prevRecall = prevStepData?.type === 'structured'
              ? prevStepData.sections[prevStepData.sections.length - 1]?.recall
              : null;

            return (
            <>
              {/* Spaced recall from PREVIOUS step (appears at top) */}
              {prevRecall && (
                prevRecall.type === 'reorder' ? (
                  <ReorderRecall key={`spaced-${currentStep}`} recall={prevRecall} onComplete={onRecallResult} />
                ) : prevRecall.type === 'fillin' ? (
                  <FillInRecall key={`spaced-${currentStep}`} recall={prevRecall} onComplete={onRecallResult} />
                ) : null
              )}

              {/* 1-2 topics per step */}
              <div className="lm-content">
                {step.sections.map((sec, si) => (
                  <div key={sec.id}>
                    <h2 className="lm-section-title">{sec.title}</h2>
                    <NoteSection section={sec} glossaryTerms={glossaryTerms} />
                  </div>
                ))}

                {/* Diagram (on last step of block) */}
                {step.isLastInBlock && currentDiagram && <InlineDiagram diagram={currentDiagram} />}

                {/* Quiz (on last step of block) */}
                {step.isLastInBlock && currentQuiz && (
                  <InlineQuiz key={`quiz-${currentStep}`} question={currentQuiz}
                    subjectId={subjectId} sectionId={sectionId} stepIndex={currentStep}
                    onResult={onQuizResult} />
                )}

                {/* Practice (on last step of block) */}
                {step.isLastInBlock && currentPractice && (
                  <InlinePractice key={`practice-${currentStep}`} question={currentPractice}
                    onAskTutor={onAskTutor} mode={getPracticeMode(currentStep)} />
                )}

                {/* Explain It Back — BEFORE takeaway */}
                {step.isLastInBlock && step.blockTitle && (
                  <ExplainItBackUpgraded key={`explain-${currentStep}`} title={step.blockTitle}
                    onAskTutor={onAskTutor} isPremium={isPremium} />
                )}

                {/* Takeaway — AFTER explain it back */}
                {step.takeaway && <TakeawayCard items={step.takeaway} glossaryTerms={glossaryTerms} />}

                {/* Immediate recall — tests what you just learned on THIS step */}
                {currentRecalls[0] && (
                  currentRecalls[0].type === 'reorder' ? (
                    <ReorderRecall key={`immed-${currentStep}`} recall={currentRecalls[0]} onComplete={onRecallResult} />
                  ) : currentRecalls[0].type === 'fillin' ? (
                    <FillInRecall key={`immed-${currentStep}`} recall={currentRecalls[0]} onComplete={onRecallResult} />
                  ) : null
                )}
              </div>
            </>
            );
          })() : step?.type === 'legacy' ? (
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
