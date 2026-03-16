"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { highlightGlossaryTerms } from '@/lib/glossary-highlight';
import { recordReview, recordPretest } from '@/lib/strength';
import StrengthMeter from './StrengthMeter';
import RecallCheckpoint from './learn-mode/RecallCheckpoint';
import ExplainItBackUpgraded from './learn-mode/ExplainItBackUpgraded';
import PostTest from './learn-mode/PostTest';
import QuickFireDrill from './learn-mode/QuickFireDrill';

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

/* ── Inline Practice Card (with Worked Example Fading) ── */
function InlinePractice({ question, onAskTutor, mode = 'independent' }) {
  // mode: 'worked' | 'guided' | 'independent'
  const [revealed, setRevealed] = useState(mode === 'worked');
  const [guidedExpanded, setGuidedExpanded] = useState(false);
  const colors = MARK_COLORS[question.marks] || MARK_COLORS[4];

  const guidanceParagraphs = question.guidance?.split('\n').filter(Boolean) || [];
  const firstParagraph = guidanceParagraphs[0];
  const restParagraphs = guidanceParagraphs.slice(1);

  function handleAskTutor() {
    if (!onAskTutor) return;
    onAskTutor(
      `Write a full model answer for this ${question.marks}-mark exam question that would achieve full marks:\n\n**Question (${question.marks} marks):** ${question.question}${question.command ? `\n**Command word:** ${question.command}` : ''}\n\nPlease structure the answer exactly as an examiner would expect, include all key points needed for full marks, and explain how each point earns marks. Use relevant economic/business terminology and, where appropriate, include diagram references.`
    );
  }

  const labelText = mode === 'worked' ? '\u{1F4D6} Worked example'
    : mode === 'guided' ? '\u{1F9ED} Guided practice'
    : '\u270D\uFE0F Quick check';

  const labelClass = mode === 'worked' ? 'lm-card-label lm-card-label-blue'
    : mode === 'guided' ? 'lm-card-label lm-card-label-amber'
    : 'lm-card-label lm-card-label-red';

  return (
    <div className={`lm-practice-card ${mode === 'worked' ? 'lm-worked-example' : ''}`}>
      <div className={labelClass}>{labelText}</div>
      <div className="lm-practice-inner">
        <p className="lm-practice-question">{question.question}</p>
        <span className="lm-practice-marks" style={{ backgroundColor: colors.bg, color: colors.badge, borderColor: colors.border }}>
          {question.marks} marks
        </span>

        {mode === 'worked' && (
          /* Worked example: guidance shown by default */
          <div className="lm-practice-answer open">
            <div className="lm-practice-answer-inner lm-worked-answer">
              {guidanceParagraphs.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              {onAskTutor && (
                <button className="lm-practice-tutor-btn" onClick={handleAskTutor}>
                  &#129302; Get Full Model Answer from Tutor
                </button>
              )}
            </div>
          </div>
        )}

        {mode === 'guided' && (
          /* Guided: first paragraph visible, rest behind toggle */
          <>
            <div className="lm-practice-answer open">
              <div className="lm-practice-answer-inner lm-guided-answer">
                {firstParagraph && <p>{firstParagraph}</p>}
                {guidedExpanded && restParagraphs.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                {!guidedExpanded && restParagraphs.length > 0 && (
                  <button className="lm-guided-expand-btn" onClick={() => setGuidedExpanded(true)}>
                    See full guidance &#x25BC;
                  </button>
                )}
                {onAskTutor && (
                  <button className="lm-practice-tutor-btn" onClick={handleAskTutor}>
                    &#129302; Get Full Model Answer from Tutor
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {mode === 'independent' && (
          /* Independent: current behavior */
          <>
            <button className="lm-practice-reveal-btn" onClick={() => setRevealed(!revealed)}>
              {revealed ? 'Hide mark scheme \u25B2' : 'Reveal mark scheme \u25BC'}
            </button>
            <div className={`lm-practice-answer ${revealed ? 'open' : ''}`}>
              <div className="lm-practice-answer-inner">
                {guidanceParagraphs.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                {onAskTutor && (
                  <button className="lm-practice-tutor-btn" onClick={handleAskTutor}>
                    &#129302; Get Full Model Answer from Tutor
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Inline Quiz Card (MCQ) with Confidence Rating ── */
function InlineQuiz({ question, subjectId, sectionId, stepIndex }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [confidence, setConfidence] = useState(null); // null | 'guessed' | 'somewhat' | 'certain'
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  function handleSelect(index) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
  }

  const isCorrect = answered && selected === question.correctIndex;

  function handleConfidence(level) {
    setConfidence(level);

    // Feedback messages
    const messages = {
      guessed: 'Noted \u2014 this topic needs more practice.',
      somewhat: 'Good awareness \u2014 keep reviewing.',
      certain: isCorrect
        ? 'Great self-knowledge!'
        : 'Hmm \u2014 this is a good one to revisit.',
    };
    setFeedbackMsg(messages[level]);

    // Save to localStorage
    if (typeof window !== 'undefined' && subjectId && sectionId) {
      try {
        const key = `revvy_confidence_${subjectId}_${sectionId}`;
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({
          questionIndex: stepIndex,
          correct: isCorrect,
          confidence: level,
          timestamp: Date.now(),
        });
        localStorage.setItem(key, JSON.stringify(existing));
      } catch {}
    }
  }

  function getOptionClass(index) {
    if (!answered) return selected === index ? 'selected' : '';
    if (index === question.correctIndex) return 'correct';
    if (index === selected && index !== question.correctIndex) return 'incorrect';
    return '';
  }

  return (
    <div className="lm-quiz-card">
      <div className="lm-card-label">&#128161; Quick quiz</div>
      <div className="lm-quiz-inner">
        <p className="lm-quiz-question">{question.question}</p>
        <div className="lm-quiz-options">
          {question.options?.map((option, i) => (
            <button
              key={i}
              className={`lm-quiz-option ${getOptionClass(i)}`}
              onClick={() => handleSelect(i)}
            >
              <span className="lm-quiz-option-letter">{letters[i]}</span>
              {option}
            </button>
          ))}
        </div>
        {answered && (
          <div className="lm-quiz-explanation">
            <strong>{isCorrect ? 'Correct!' : 'Not quite.'}</strong>{' '}
            {question.explanation}
          </div>
        )}
        {/* Confidence rating — shown after answering, before rating */}
        {answered && !confidence && (
          <div className="lm-confidence-row">
            <span className="lm-confidence-prompt">How sure were you?</span>
            <div className="lm-confidence-buttons">
              <button className="lm-confidence-btn lm-conf-guessed" onClick={() => handleConfidence('guessed')}>Guessed</button>
              <button className="lm-confidence-btn lm-conf-somewhat" onClick={() => handleConfidence('somewhat')}>Somewhat sure</button>
              <button className="lm-confidence-btn lm-conf-certain" onClick={() => handleConfidence('certain')}>Certain</button>
            </div>
          </div>
        )}
        {confidence && (
          <div className="lm-confidence-done">{feedbackMsg}</div>
        )}
      </div>
    </div>
  );
}

/* ── "Explain It Back" Prompt ── */
function ExplainItBack({ title, onAskTutor }) {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState('');

  function handleTutorCheck() {
    if (!onAskTutor || !text.trim()) return;
    onAskTutor(
      `A student tried to explain '${title}' in their own words. Review their explanation for accuracy, highlight any misconceptions, and provide encouraging feedback:\n\n**Student's explanation:**\n${text}`
    );
  }

  return (
    <div className="lm-explain-section">
      <button className="lm-explain-toggle" onClick={() => setExpanded(!expanded)}>
        <span className="lm-explain-toggle-icon">{expanded ? '\u25BE' : '\u25B8'}</span>
        <span className="lm-explain-toggle-text">Explain it back: <strong>{title}</strong></span>
      </button>
      {expanded && (
        <div className="lm-explain-body">
          <p className="lm-explain-prompt">Try explaining what you just learned in your own words. This is one of the most effective ways to strengthen your memory.</p>
          <textarea
            className="lm-explain-textarea"
            placeholder="In my own words, this topic is about..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
          />
          {onAskTutor && text.trim().length > 10 && (
            <button className="lm-explain-tutor-btn" onClick={handleTutorCheck}>
              &#129302; Check my explanation with AI Tutor
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Pre-test Before Learning ── */
function PreTest({ quizData, subjectId, sectionId, onDone }) {
  const questions = useMemo(() => {
    if (!quizData?.length) return [];
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(3, shuffled.length));
  }, [quizData]);

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  function handleSelect(qIdx, optIdx) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  }

  function handleSubmit() {
    if (Object.keys(answers).length < questions.length) return;
    setSubmitted(true);

    // Calculate score
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    const score = questions.length > 0 ? correct / questions.length : 0;

    // Save pre-test result + questions for post-test comparison
    if (typeof window !== 'undefined') {
      localStorage.setItem(`revvy_pretest_${subjectId}_${sectionId}`, JSON.stringify({
        completed: true,
        score: correct,
        total: questions.length,
        timestamp: Date.now(),
        questions: questions.map((q, i) => ({
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation,
          userAnswer: answers[i],
        })),
      }));
    }

    // Record to strength meter
    recordPretest(subjectId, sectionId, score);
  }

  const correctCount = questions.reduce((c, q, i) => c + (answers[i] === q.correctIndex ? 1 : 0), 0);
  const allCorrect = correctCount === questions.length;
  const noneCorrect = correctCount === 0;

  if (!questions.length) {
    onDone?.();
    return null;
  }

  return (
    <div className="lm-pretest-container">
      <div className="lm-pretest-header">
        <div className="lm-pretest-icon">&#129504;</div>
        <h2 className="lm-pretest-title">Quick pre-test</h2>
        <p className="lm-pretest-subtitle">Let&apos;s see what you already know. This primes your brain for learning.</p>
      </div>

      {questions.map((q, qIdx) => (
        <div className="lm-pretest-question" key={qIdx}>
          <p className="lm-pretest-q-text">{qIdx + 1}. {q.question}</p>
          <div className="lm-quiz-options">
            {q.options?.map((option, i) => {
              let cls = '';
              if (submitted) {
                if (i === q.correctIndex) cls = 'correct';
                else if (i === answers[qIdx] && i !== q.correctIndex) cls = 'incorrect';
              } else if (answers[qIdx] === i) {
                cls = 'selected';
              }
              return (
                <button
                  key={i}
                  className={`lm-quiz-option ${cls}`}
                  onClick={() => handleSelect(qIdx, i)}
                >
                  <span className="lm-quiz-option-letter">{letters[i]}</span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted && (
        <div className="lm-pretest-actions">
          <button
            className="lm-pretest-submit"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
          >
            Check my answers
          </button>
          <button className="lm-pretest-skip" onClick={onDone}>
            Skip pre-test &rarr;
          </button>
        </div>
      )}

      {submitted && (
        <div className="lm-pretest-result">
          <div className="lm-pretest-score">
            {correctCount} / {questions.length} correct
          </div>
          <p className="lm-pretest-encouragement">
            {allCorrect
              ? 'Impressive \u2014 you already know some of this!'
              : noneCorrect
                ? 'Perfect \u2014 your brain is now primed to learn this.'
                : 'Good start! Your brain is now primed for learning.'}
          </p>
          <button className="lm-pretest-continue" onClick={onDone}>
            Start learning &#8594;
          </button>
        </div>
      )}
    </div>
  );
}

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
  const [completeView, setCompleteView] = useState('main'); // 'main' | 'posttest' | 'drill'
  const containerRef = useRef(null);

  const totalSteps = contentData?.length || 0;

  // Distribute diagrams, practice questions, and quiz questions evenly across steps
  const sortedPractice = [...(practiceData || [])].sort((a, b) => a.marks - b.marks);
  const diagramMap = distributeItems(diagramsData, totalSteps);
  const practiceMap = distributeItems(sortedPractice, totalSteps);
  const quizMap = distributeItems(quizData, totalSteps);

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

  // Auto-scroll to top when navigating
  const scrollToTop = useCallback(() => {
    const tabContent = document.querySelector('.tab-content');
    if (tabContent) {
      tabContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  function navigateToStep(step) {
    onStepChange(step);
    setTimeout(scrollToTop, 50);
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
          onDone={() => setShowPretest(false)}
        />
      </div>
    );
  }

  // Completion screen
  if (isComplete) {
    // Count completed sections for mixed review eligibility
    let completedCount = 0;
    if (typeof window !== 'undefined') {
      try {
        const schedule = JSON.parse(localStorage.getItem('revvy_review_schedule') || '[]');
        completedCount = schedule.length;
      } catch {}
    }

    // Check if pre-test data exists for post-test
    const hasPretestData = typeof window !== 'undefined' &&
      (() => { try { const d = JSON.parse(localStorage.getItem(`revvy_pretest_${subjectId}_${sectionId}`) || '{}'); return d.questions?.length > 0; } catch { return false; } })();

    // Post-test sub-view
    if (completeView === 'posttest') {
      return (
        <div className="lm-complete-screen">
          <PostTest
            subjectId={subjectId}
            sectionId={sectionId}
            onClose={() => setCompleteView('main')}
          />
        </div>
      );
    }

    // Quick fire drill sub-view
    if (completeView === 'drill') {
      return (
        <div className="lm-complete-screen">
          <QuickFireDrill
            quizData={quizData}
            onClose={() => setCompleteView('main')}
          />
        </div>
      );
    }

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

        {/* Strength meter */}
        <StrengthMeter subjectId={subjectId} sectionId={sectionId} size="medium" />

        <div className="lm-complete-divider" />
        <div className="lm-complete-summary">
          <h3 className="lm-complete-summary-title">What you covered</h3>
          <ul className="lm-complete-summary-list">
            {contentData.map((block, i) => (
              <li key={i}>{block.title || `Section ${i + 1}`}</li>
            ))}
          </ul>
        </div>

        {/* Post-test: re-test pre-test questions */}
        {hasPretestData && (
          <button className="lm-complete-posttest-btn" onClick={() => setCompleteView('posttest')}>
            &#128200; Test your improvement
          </button>
        )}

        {/* Quick fire drill */}
        {quizData?.length > 0 && (
          <button className="lm-complete-drill-btn" onClick={() => setCompleteView('drill')}>
            &#9889; Quick fire drill ({quizData.length} questions)
          </button>
        )}

        <button className="lm-complete-quiz-btn" onClick={onNavigateToQuiz}>
          Try the quiz &rarr;
        </button>
        {completedCount >= 3 && onStartMixedReview && (
          <button className="lm-complete-mixed-btn" onClick={onStartMixedReview}>
            Mixed review ({completedCount} topics) &#8644;
          </button>
        )}
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
            className={`lm-stepper-node active`}
            onClick={() => {}}
          >
            <span>{currentStep + 1}</span>
          </div>
          {!isLastStep && (
            <div className={`lm-stepper-line ${currentStep > 0 ? 'filled' : ''}`} />
          )}
        </div>

        {/* Main content on the right */}
        <div className="lm-stepper-content">
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

          {/* Inline quiz question — key forces reset on step change */}
          {currentQuiz && (
            <InlineQuiz
              key={`quiz-${currentStep}`}
              question={currentQuiz}
              subjectId={subjectId}
              sectionId={sectionId}
              stepIndex={currentStep}
            />
          )}

          {/* Inline practice question with worked example fading */}
          {currentPractice && (
            <InlinePractice
              key={`practice-${currentStep}`}
              question={currentPractice}
              onAskTutor={onAskTutor}
              mode={getPracticeMode(currentStep)}
            />
          )}

          {/* Explain It Back prompt with AI grading */}
          {currentBlock.title && (
            <ExplainItBackUpgraded
              key={`explain-${currentStep}`}
              title={currentBlock.title}
              onAskTutor={onAskTutor}
              isPremium={isPremium}
            />
          )}

          {/* Keyboard hint */}
          {showKeyboardHint && (
            <div className="lm-keyboard-hint">
              Use <kbd>&larr;</kbd> <kbd>&rarr;</kbd> arrow keys to navigate
            </div>
          )}

          {/* Navigation */}
          <div className="lm-nav">
            {currentStep > 0 && (
              <button className="lm-nav-back" onClick={() => navigateToStep(currentStep - 1)}>
                &larr; Back
              </button>
            )}
            <div className="lm-nav-spacer" />
            {!isLastStep ? (
              <button className="lm-nav-next" onClick={() => navigateToStep(currentStep + 1)}>
                Next section &rarr;
              </button>
            ) : (
              <button className="lm-nav-complete" onClick={handleComplete}>
                Complete topic &#10003;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
