'use client';

import { useState, useCallback } from 'react';
import { buildQueue, computeNextReview, createDefaultProgress } from '@/lib/spaced-repetition';
import TopicSelector from '@/components/practice/TopicSelector';
import QuestionCard from '@/components/practice/QuestionCard';
import SessionSummary from '@/components/practice/SessionSummary';

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
  const [questionKey, setQuestionKey] = useState(0);

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
      setQuestionKey(Date.now());
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
      setQuestionKey(Date.now());
    }
  }, [currentIndex, queue.length]);

  /* ─── Restart ─── */

  const handleRestart = useCallback(() => {
    setPhase('setup');
    setQueue([]);
    setCurrentIndex(0);
    setSessionResults([]);
    setQuestionKey(0);
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

    return (
      <div className="spe-session">
        {/* Top bar with progress */}
        <div className="spe-session-top">
          <button className="spe-back-btn" onClick={handleRestart}>&#x2715;</button>
          <div className="spe-progress-bar">
            <div
              className="spe-progress-fill"
              style={{ width: `${((currentIndex + 1) / queue.length) * 100}%` }}
            />
          </div>
          <span className="spe-progress-count">
            {currentIndex + 1}/{queue.length}
          </span>
        </div>

        {/* Question with animation key */}
        <div className="spe-question-animate" key={questionKey}>
          <QuestionCard
            question={question}
            sectionTitle={sectionTitle}
            questionNumber={currentIndex + 1}
            totalQuestions={queue.length}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        </div>
      </div>
    );
  }

  if (phase === 'summary') {
    return (
      <SessionSummary
        results={sessionResults}
        sections={sections}
        onRestart={handleRestart}
      />
    );
  }

  return null;
}
