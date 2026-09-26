"use client";
import { useState, useEffect } from 'react';
import ReportProblem from '@/components/feedback/ReportProblem';

/** "in 3 days" / "tomorrow" / "in 6 hours", for the line under the result. */
function whenDue(nextReview) {
  if (!nextReview) return '';
  const hours = Math.round((nextReview - Date.now()) / 3600000);
  if (hours < 1) return 'in a few minutes';
  if (hours < 20) return `in ${hours} hour${hours === 1 ? '' : 's'}`;
  const days = Math.round(hours / 24);
  return days <= 1 ? 'tomorrow' : `in ${days} days`;
}

/* ── Question Card — Smart Practice Engine ── */
export default function QuestionCard({ question, sectionId, sectionTitle, questionNumber, totalQuestions, willReturn = true, onAnswer, onNext, onSkip }) {
  // Confidence is given WITH the answer: "Check answer" means sure, "Check — I guessed" means not.
  // F076 asked it after the reveal and blocked Next until it was answered, which cost a click on
  // every question, could not be answered from the keyboard, and was hindsight: once the reveal
  // shows you were right, "certain" is what you say. "Unsure" never reached the scheduler at all.
  const [guessed, setGuessed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState(0); // 0=picking, 1=selected, 2=revealed
  const [nextReview, setNextReview] = useState(null);

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const isCorrect = selected === question.correctIndex;

  // Reset state when question changes
  useEffect(() => {
    setSelected(null);
    setPhase(0);
    setGuessed(false);
    setNextReview(null);
  }, [question]);

  // Recorded at the reveal, so an answer counts even if the student ends the session straight after.
  function check(wasGuess) {
    if (phase !== 1 || selected === null) return;
    setGuessed(wasGuess);
    setPhase(2);
    Promise.resolve(onAnswer?.({ correct: selected === question.correctIndex, confidence: wasGuess ? 'guessed' : 'certain' }))
      .then((updated) => { if (updated?.nextReview) setNextReview(updated.nextReview); })
      .catch(() => {});
  }

  // Keyboard: 1-4/A-D select, Enter checks (sure), G checks as a guess, Enter again moves on.
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      // Keys pressed in an open dialog ("Report a problem") belong to it, not to this card.
      if (e.target.closest?.('[role="dialog"]')) return;
      const optCount = question.options?.length || 4;

      // Number keys 1-4 or letter keys A-D to select option.
      // F075: the range comparisons below are string comparisons, so "ArrowDown", "Control",
      // "Alt", "Backspace" and "CapsLock" all sort between "a" and "d" and used to pick an
      // answer. A single printable character is the only thing that may select one, and never
      // while a modifier is held.
      const isPrintable = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
      if (phase < 2 && isPrintable) {
        let idx = null;
        if (e.key >= '1' && e.key <= String(optCount)) idx = parseInt(e.key) - 1;
        else if (e.key.toLowerCase() >= 'a' && e.key.toLowerCase() <= String.fromCharCode(96 + optCount)) idx = e.key.toLowerCase().charCodeAt(0) - 97;
        if (idx !== null && idx < optCount) {
          e.preventDefault();
          setSelected(idx);
          setPhase(1);
          return;
        }
        // G is past F, the last possible option letter, so it can never also pick an answer.
        if (phase === 1 && e.key.toLowerCase() === 'g') {
          e.preventDefault();
          check(true);
          return;
        }
      }

      if (e.key === 'Enter') {
        // A focused action button or link handles its own Enter; acting here too would do it twice.
        // A focused answer option does not, so Enter after clicking one still checks.
        if (e.target.closest?.('.spe-qcard-actions, a, .rp-slot')) return;
        e.preventDefault();
        if (phase === 1) check(false);
        else if (phase === 2) onNext?.();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  function handleSelect(index) {
    if (phase >= 2) return;
    setSelected(index);
    setPhase(1);
  }

  const outcome = isCorrect ? (guessed ? 'lucky' : 'knew') : (guessed ? 'gap' : 'misconception');
  const due = whenDue(nextReview);

  function getOptionClass(index) {
    if (phase === 0) return '';
    if (phase === 1) return index === selected ? 'selected' : '';
    // phase 2: revealed
    if (index === question.correctIndex) return index === selected ? 'correct' : 'correct-reveal';
    if (index === selected) return 'incorrect';
    return 'dimmed';
  }

  function getOptionIcon(index) {
    if (phase < 2) return null;
    if (index === question.correctIndex) return '\u2713';
    if (index === selected && index !== question.correctIndex) return '\u2717';
    return null;
  }

  return (
    <div className="spe-qcard spe-question-animate">
      <div className="spe-qcard-top">
        <span className="spe-qcard-badge">{sectionTitle}</span>
        <span className="spe-qcard-counter">{questionNumber} / {totalQuestions}</span>
      </div>

      <p className="spe-qcard-question">{question.question}</p>

      <div className="spe-qcard-options">
        {question.options?.map((option, i) => (
          <button
            key={i}
            className={`spe-qcard-option ${getOptionClass(i)}`}
            onClick={() => handleSelect(i)}
            disabled={phase >= 2}
          >
            <span className="spe-qcard-letter">
              {getOptionIcon(i) || letters[i]}
            </span>
            <span className="spe-qcard-option-text">{option}</span>
          </button>
        ))}
      </div>

      {/* Result card */}
      {phase >= 2 && (
        <div className={`spe-qcard-result ${isCorrect ? 'spe-qcard-result--correct' : 'spe-qcard-result--incorrect'} spe-qcard-result--${outcome}`}>
          <div className="spe-qcard-result-header">
            {outcome === 'knew' && '\u2713 Correct'}
            {outcome === 'lucky' && '\u2713 Correct, but you guessed'}
            {!isCorrect && `\u2717 Not quite \u2014 the answer was ${letters[question.correctIndex]}`}
          </div>
          <p className="spe-qcard-result-next">
            {outcome === 'knew' && (due ? `You'll see this again ${due}.` : 'This one moves further back in your schedule.')}
            {outcome === 'lucky' && "A guess isn't knowing it yet, so this doesn't count towards mastery. It comes back tomorrow."}
            {outcome === 'misconception' && `You were sure, so this is worth fixing properly: a confident wrong answer is usually a misunderstanding, not a slip. It's saved to this topic's Mistakes tab${willReturn ? ", and you'll get it again before this session ends" : ''}.`}
            {outcome === 'gap' && (willReturn ? "You'll get this one again before the session ends." : "It's saved to this topic's Mistakes tab.")}
          </p>
          {outcome === 'misconception' && sectionId && (
            <a className="spe-qcard-note-link" href={`/?section=${sectionId}`} target="_blank" rel="noopener noreferrer">
              Read the note on {sectionTitle}{" \u2192"}
            </a>
          )}
          {question.explanation && <p className="spe-qcard-result-explanation">{question.explanation}</p>}
        </div>
      )}

      {/* Action row. Two ways to check, so the confidence the schedule needs costs no extra click. */}
      <div className="spe-qcard-actions">
        {phase < 2 && (
          <>
            <button className={`spe-qcard-check ${phase === 1 ? 'active' : ''}`} onClick={() => check(false)} disabled={phase === 0}>
              Check answer
            </button>
            <button className="spe-qcard-guess" onClick={() => check(true)} disabled={phase === 0}>
              Check &mdash; I guessed
            </button>
          </>
        )}
        {phase >= 2 && (
          <button className="spe-qcard-next" onClick={onNext}>
            Next question &rarr;
          </button>
        )}
        {phase < 2 && <button className="spe-qcard-skip" onClick={onSkip}>Skip</button>}
      </div>
      <p className="spe-qcard-keys" aria-hidden="true">
        {phase < 2 ? 'Enter to check \u00b7 G if you guessed' : 'Enter for the next question'}
      </p>

      {/* The same quiz items the Quiz tab serves, so a report from here joins the same issue. */}
      {sectionId && (
        <div className="rp-slot">
          <ReportProblem target={{
            surface: 'quiz',
            sectionId,
            itemId: question.id,
            label: `Smart Practice · ${questionNumber} of ${totalQuestions}`,
            rendered: { stem: question.question },
            answer: phase >= 2
              ? {
                  chosen: question.options?.[selected] ?? null,
                  marked: question.options?.[question.correctIndex] ?? null,
                  correct: isCorrect,
                  revealed: true,
                }
              : { chosen: question.options?.[selected] ?? null, revealed: false },
          }} />
        </div>
      )}
    </div>
  );
}
