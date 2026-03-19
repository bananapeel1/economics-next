'use client';

import { useState, useCallback } from 'react';
import { buildQueue, computeNextReview, createDefaultProgress } from '@/lib/spaced-repetition';
import TopicSelector from '@/components/practice/TopicSelector';

/* ─── localStorage helpers (for non-auth users) ─── */

function loadLocalProgress(sectionIds) {
  try {
    const raw = JSON.parse(localStorage.getItem('revvy_practice_progress') || '{}');
    const filtered = {};
    for (const [key, val] of Object.entries(raw)) {
      if (sectionIds.some(id => key.startsWith(id + ':'))) {
        filtered[key] = val;
      }
    }
    return filtered;
  } catch {
    return {};
  }
}

function saveLocalProgress(key, progressObj) {
  try {
    const raw = JSON.parse(localStorage.getItem('revvy_practice_progress') || '{}');
    raw[key] = progressObj;
    localStorage.setItem('revvy_practice_progress', JSON.stringify(raw));
  } catch {
    // silently ignore storage errors
  }
}

/* ─── PracticeEngine ─── */

export default function PracticeEngine({ subjects, units, sections, isLoggedIn }) {
  const [phase, setPhase] = useState('setup');
  const [selectedSubjectSlug, setSelectedSubjectSlug] = useState(
    subjects[0]?.slug || ''
  );
  const [selectedSectionIds, setSelectedSectionIds] = useState(new Set());
  const [quizData, setQuizData] = useState({});
  const [progressMap, setProgressMap] = useState({});
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionResults, setSessionResults] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ─── Setup callbacks ─── */

  const handleSubjectChange = useCallback((slug) => {
    setSelectedSubjectSlug(slug);
    setSelectedSectionIds(new Set());
  }, []);

  const handleToggleSection = useCallback((sectionId) => {
    setSelectedSectionIds(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }, []);

  /* ─── Start session ─── */

  const handleStart = useCallback(async () => {
    if (selectedSectionIds.size === 0) return;
    setLoading(true);

    try {
      const sectionArr = Array.from(selectedSectionIds);

      // 1. Fetch quiz data
      const qRes = await fetch(
        `/api/practice/questions?sections=${sectionArr.join(',')}`
      );
      const qJson = await qRes.json();
      const fetchedQuizData = qJson.questions || {};
      setQuizData(fetchedQuizData);

      // 2. Fetch progress
      let fetchedProgressMap = {};

      if (isLoggedIn) {
        const pRes = await fetch(
          `/api/practice/progress?sections=${sectionArr.join(',')}`
        );
        const pJson = await pRes.json();
        const rows = pJson.progress || [];

        for (const row of rows) {
          const key = `${row.section_id}:${row.question_index}`;
          fetchedProgressMap[key] = {
            sectionId: row.section_id,
            questionIndex: row.question_index,
            ease: row.ease,
            intervalDays: row.interval_days,
            repetitions: row.repetitions,
            nextReview: new Date(row.next_review).getTime(),
            lastResult: row.last_result,
            lastConfidence: row.last_confidence,
          };
        }
      } else {
        fetchedProgressMap = loadLocalProgress(sectionArr);
      }

      setProgressMap(fetchedProgressMap);

      // 3. Build queue
      const sessionQueue = buildQueue(
        fetchedProgressMap,
        sectionArr,
        fetchedQuizData,
        20
      );

      setQueue(sessionQueue);
      setCurrentIndex(0);
      setSessionResults([]);
      setPhase('session');
    } catch (err) {
      console.error('Failed to start practice session:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedSectionIds, isLoggedIn]);

  /* ─── Answer handler ─── */

  const handleAnswer = useCallback(
    async ({ correct, confidence }) => {
      const item = queue[currentIndex];
      if (!item) return;

      const key = `${item.sectionId}:${item.questionIndex}`;

      // Get current progress or create default
      const current =
        progressMap[key] ||
        createDefaultProgress(item.sectionId, item.questionIndex);

      // Compute next review
      const updated = computeNextReview(current, correct, confidence);

      // Save progress
      if (isLoggedIn) {
        try {
          await fetch('/api/practice/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sectionId: updated.sectionId,
              questionIndex: updated.questionIndex,
              ease: updated.ease,
              intervalDays: updated.intervalDays,
              repetitions: updated.repetitions,
              nextReview: updated.nextReview,
              lastResult: updated.lastResult,
              lastConfidence: updated.lastConfidence,
            }),
          });
        } catch (err) {
          console.error('Failed to save progress:', err);
        }
      } else {
        saveLocalProgress(key, updated);
      }

      // Update local state
      setProgressMap(prev => ({ ...prev, [key]: updated }));
      setSessionResults(prev => [
        ...prev,
        {
          sectionId: item.sectionId,
          questionIndex: item.questionIndex,
          correct,
          confidence,
        },
      ]);
    },
    [queue, currentIndex, progressMap, isLoggedIn]
  );

  /* ─── Next question ─── */

  const handleNext = useCallback(() => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= queue.length) {
      setPhase('summary');
    } else {
      setCurrentIndex(nextIdx);
    }
  }, [currentIndex, queue.length]);

  /* ─── Restart ─── */

  const handleRestart = useCallback(() => {
    setPhase('setup');
    setQueue([]);
    setCurrentIndex(0);
    setSessionResults([]);
    // Keep selectedSectionIds so user doesn't have to re-pick
  }, []);

  const handleHome = useCallback(() => {
    window.location.href = '/';
  }, []);

  /* ─── Section title lookup ─── */

  const getSectionTitle = useCallback(
    (sectionId) => {
      const sec = sections.find(s => s.id === sectionId);
      return sec?.short_title || sec?.title || sectionId;
    },
    [sections]
  );

  /* ─── Render ─── */

  if (phase === 'setup') {
    return (
      <TopicSelector
        subjects={subjects}
        units={units}
        sections={sections}
        selectedSubjectSlug={selectedSubjectSlug}
        onSubjectChange={handleSubjectChange}
        selectedSectionIds={selectedSectionIds}
        onToggleSection={handleToggleSection}
        onStart={handleStart}
        loading={loading}
      />
    );
  }

  if (phase === 'session') {
    const item = queue[currentIndex];

    if (!item) {
      return (
        <div className="spe-empty">
          <p>No questions available for the selected topics.</p>
          <button className="spe-btn spe-btn-primary" onClick={handleRestart}>
            Back to Setup
          </button>
        </div>
      );
    }

    const question = item.question;
    const sectionTitle = getSectionTitle(item.sectionId);
    const hasAnswered = sessionResults.length > currentIndex;

    return (
      <div className="spe-session">
        <div className="spe-session-header">
          <span className="spe-session-progress">
            {currentIndex + 1} / {queue.length}
          </span>
          <span className="spe-session-topic">{sectionTitle}</span>
        </div>

        <QuestionCard
          question={question}
          sectionTitle={sectionTitle}
          onAnswer={handleAnswer}
          onNext={handleNext}
          hasAnswered={hasAnswered}
        />
      </div>
    );
  }

  if (phase === 'summary') {
    return (
      <SessionSummary
        sessionResults={sessionResults}
        sections={sections}
        onRestart={handleRestart}
        onHome={handleHome}
      />
    );
  }

  return null;
}

/* ─── QuestionCard (inline) ─── */

function QuestionCard({ question, sectionTitle, onAnswer, onNext, hasAnswered }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [confidence, setConfidence] = useState(null);

  if (!question) return null;

  const isCorrect =
    selectedOption !== null &&
    selectedOption === question.correctIndex;

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelectedOption(idx);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    setShowResult(true);
    onAnswer({
      correct: selectedOption === question.correctIndex,
      confidence,
    });
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowResult(false);
    setConfidence(null);
    onNext();
  };

  return (
    <div className="spe-qcard">
      <p className="spe-qcard-question">{question.question}</p>

      <div className="spe-qcard-options">
        {(question.options || []).map((opt, idx) => {
          let optClass = 'spe-qcard-option';
          if (selectedOption === idx && !showResult) {
            optClass += ' spe-qcard-option--selected';
          }
          if (showResult) {
            if (idx === question.correctIndex) {
              optClass += ' spe-qcard-option--correct';
            } else if (idx === selectedOption) {
              optClass += ' spe-qcard-option--wrong';
            }
          }
          return (
            <button
              key={idx}
              className={optClass}
              onClick={() => handleSelect(idx)}
              disabled={showResult}
            >
              <span className="spe-qcard-option-letter">
                {String.fromCharCode(65 + idx)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {!showResult && selectedOption !== null && (
        <div className="spe-qcard-confidence">
          <p className="spe-qcard-confidence-label">How confident are you?</p>
          <div className="spe-qcard-confidence-btns">
            {[
              { key: 'guessed', label: 'Guessed' },
              { key: 'somewhat', label: 'Somewhat' },
              { key: 'certain', label: 'Certain' },
            ].map(c => (
              <button
                key={c.key}
                className={`spe-confidence-btn${confidence === c.key ? ' spe-confidence-btn--active' : ''}`}
                onClick={() => setConfidence(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <button
            className="spe-btn spe-btn-primary"
            onClick={handleConfirm}
          >
            Submit Answer
          </button>
        </div>
      )}

      {showResult && (
        <div className="spe-qcard-result">
          <div
            className={`spe-qcard-result-banner ${isCorrect ? 'spe-qcard-result--correct' : 'spe-qcard-result--wrong'}`}
          >
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </div>
          {question.explanation && (
            <p className="spe-qcard-explanation">{question.explanation}</p>
          )}
          <button className="spe-btn spe-btn-primary" onClick={handleNext}>
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── SessionSummary (inline) ─── */

function SessionSummary({ sessionResults, sections, onRestart, onHome }) {
  const total = sessionResults.length;
  const correctCount = sessionResults.filter(r => r.correct).length;
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  // Group results by section
  const bySectionMap = {};
  for (const r of sessionResults) {
    if (!bySectionMap[r.sectionId]) {
      const sec = sections.find(s => s.id === r.sectionId);
      bySectionMap[r.sectionId] = {
        title: sec?.short_title || sec?.title || r.sectionId,
        correct: 0,
        total: 0,
      };
    }
    bySectionMap[r.sectionId].total += 1;
    if (r.correct) bySectionMap[r.sectionId].correct += 1;
  }

  const bySection = Object.values(bySectionMap);

  return (
    <div className="spe-summary">
      <h2 className="spe-summary-title">Session Complete</h2>

      <div className="spe-summary-score">
        <span className="spe-summary-pct">{pct}%</span>
        <span className="spe-summary-fraction">
          {correctCount} / {total} correct
        </span>
      </div>

      {bySection.length > 1 && (
        <div className="spe-summary-breakdown">
          <h3 className="spe-summary-breakdown-title">By Topic</h3>
          {bySection.map((sec, idx) => {
            const secPct =
              sec.total > 0
                ? Math.round((sec.correct / sec.total) * 100)
                : 0;
            return (
              <div key={idx} className="spe-summary-row">
                <span className="spe-summary-row-title">{sec.title}</span>
                <span className="spe-summary-row-score">
                  {sec.correct}/{sec.total} ({secPct}%)
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="spe-summary-actions">
        <button className="spe-btn spe-btn-primary" onClick={onRestart}>
          Practice Again
        </button>
        <button className="spe-btn spe-btn-secondary" onClick={onHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
