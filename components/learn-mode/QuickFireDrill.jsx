"use client";
import { useState, useEffect, useRef, useMemo } from 'react';

const TIMER_SECONDS = 15;
const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * Timed rapid-fire quiz drill using all quiz questions from the section.
 * One question at a time, 15s countdown, auto-advance after feedback.
 */
export default function QuickFireDrill({ quizData, onClose }) {
  const questions = useMemo(() => {
    if (!quizData?.length) return [];
    return [...quizData].sort(() => Math.random() - 0.5);
  }, [quizData]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [results, setResults] = useState([]); // { correct, timedOut, timeUsed }[]
  const [phase, setPhase] = useState('drill'); // 'drill' | 'done'
  const [betweenQuestions, setBetweenQuestions] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const question = questions[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (phase !== 'drill' || answered) return;
    startTimeRef.current = Date.now();
    setTimeLeft(TIMER_SECONDS);

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = TIMER_SECONDS - elapsed;
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        setTimeLeft(0);
        handleTimedOut();
      } else {
        setTimeLeft(remaining);
      }
    }, 200);

    return () => clearInterval(timerRef.current);
  }, [currentIndex, phase]);

  function handleTimedOut() {
    setAnswered(true);
    setStreak(0);
    setResults(prev => [...prev, { correct: false, timedOut: true, timeUsed: TIMER_SECONDS }]);
    // Auto-advance after 2s
    setTimeout(advance, 2000);
  }

  function handleSelect(index) {
    if (answered) return;
    clearInterval(timerRef.current);
    const timeUsed = Math.round((Date.now() - startTimeRef.current) / 1000);
    const isCorrect = index === question.correctIndex;
    setSelected(index);
    setAnswered(true);
    setResults(prev => [...prev, { correct: isCorrect, timedOut: false, timeUsed }]);
    if (isCorrect) {
      setStreak(prev => {
        const next = prev + 1;
        setBestStreak(b => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }
    // Auto-advance after feedback
    setTimeout(advance, 1500);
  }

  function advance() {
    if (currentIndex + 1 >= questions.length) {
      setPhase('done');
    } else {
      // 300ms breathing space between questions
      setBetweenQuestions(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setSelected(null);
        setAnswered(false);
        setBetweenQuestions(false);
      }, 300);
    }
  }

  function getOptionClass(index) {
    if (!answered) return selected === index ? 'selected' : '';
    if (index === question.correctIndex) return 'correct';
    if (index === selected && index !== question.correctIndex) return 'incorrect';
    return '';
  }

  if (!questions.length) return null;

  // Final score screen
  if (phase === 'done') {
    const correctCount = results.filter(r => r.correct).length;
    const timedOutCount = results.filter(r => r.timedOut).length;
    const avgTime = results.length > 0
      ? Math.round(results.reduce((s, r) => s + r.timeUsed, 0) / results.length)
      : 0;
    const pct = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="lm-drill-container">
        <div className="lm-drill-result">
          <div className="lm-drill-result-icon">
            {pct >= 80 ? '\u{1F525}' : pct >= 50 ? '\u{1F4AA}' : '\u{1F4DA}'}
          </div>
          <h3 className="lm-drill-result-title">Quick Fire Complete!</h3>
          <div className="lm-drill-result-score">{correctCount} / {questions.length}</div>
          <div className="lm-drill-result-pct">{pct}% correct</div>
          <div className="lm-drill-stats">
            <div className="lm-drill-stat">
              <span className="lm-drill-stat-value">{avgTime}s</span>
              <span className="lm-drill-stat-label">avg time</span>
            </div>
            <div className="lm-drill-stat">
              <span className="lm-drill-stat-value">{timedOutCount}</span>
              <span className="lm-drill-stat-label">timed out</span>
            </div>
            {bestStreak >= 2 && (
              <div className="lm-drill-stat">
                <span className="lm-drill-stat-value">{'\u{1F525}'} {bestStreak}</span>
                <span className="lm-drill-stat-label">best streak</span>
              </div>
            )}
          </div>
          <button className="lm-drill-close-btn" onClick={onClose}>Done</button>
        </div>
      </div>
    );
  }

  // Drill UI
  const timerPct = (timeLeft / TIMER_SECONDS) * 100;
  const timerUrgent = timeLeft <= 5;

  return (
    <div className={`lm-drill-container ${betweenQuestions ? 'lm-drill-breathing' : ''}`}>
      {/* Timer bar */}
      <div className="lm-drill-timer-track">
        <div
          className={`lm-drill-timer-fill ${timerUrgent ? 'urgent' : ''}`}
          style={{ width: `${timerPct}%` }}
        />
      </div>

      <div className="lm-drill-header">
        <span className="lm-drill-counter">
          {currentIndex + 1} / {questions.length}
        </span>
        {streak >= 2 && (
          <span className="lm-drill-streak" key={streak}>
            {'\u{1F525}'} {streak} streak
          </span>
        )}
        <span className={`lm-drill-time ${timerUrgent ? 'urgent' : ''}`}>
          {timeLeft}s
        </span>
      </div>

      <p className="lm-drill-question">{question.question}</p>

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

      {answered && !selected && (
        <div className="lm-drill-timeout-msg">Time&apos;s up! The correct answer was highlighted.</div>
      )}
    </div>
  );
}
