"use client";
import { useState, useEffect } from 'react';

/* ── Inline Quiz Card (MCQ) with Confidence Rating ── */
export default function InlineQuiz({ question, subjectId, sectionId, stepIndex, onResult }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [revealPhase, setRevealPhase] = useState(0); // 0=unanswered, 1=user choice shown, 2=full reveal
  const [confidence, setConfidence] = useState(null);
  const [confidenceTimedOut, setConfidenceTimedOut] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  // Remediation state
  const [showRemediation, setShowRemediation] = useState(false);
  const [remSelected, setRemSelected] = useState(null);
  const [remAnswered, setRemAnswered] = useState(false);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  // F104: the confidence row used to disappear on a 4-second timer and the remediation slid in
  // 800ms after the answer, so the page moved under the student's thumb twice while they were
  // reading. A question they are still thinking about is not a question they have declined to
  // answer. The row now stays until they answer it or move on, and the remediation appears with
  // the explanation rather than on its own delay.
  //
  // The auto-dismiss state is kept so the row can still be hidden once confidence is given.
  useEffect(() => {
    if (confidence) setConfidenceTimedOut(true);
  }, [confidence]);

  function handleSelect(index) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    setRevealPhase(1);
    onResult?.(index === question.correctIndex);
    // After 200ms, reveal correct answer + explanation
    setTimeout(() => {
      setRevealPhase(2);
      // Appears with the explanation, not 800ms later, so nothing shifts under the reader.
      if (index !== question.correctIndex && question.remediation) {
        setShowRemediation(true);
      }
    }, 200);
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
    if (revealPhase === 1) {
      // Only show user's selected option feedback
      if (index === selected) return index === question.correctIndex ? 'correct' : 'incorrect';
      return '';
    }
    // revealPhase >= 2: full reveal
    if (index === question.correctIndex) return 'correct';
    if (index === selected && index !== question.correctIndex) return 'incorrect';
    return '';
  }

  return (
    <div className="lm-quiz-card">
      <div className="lm-card-label">&#128161; Quick quiz</div>
      <div className="lm-quiz-inner">
        <p className="lm-quiz-question">{question.question}</p>
        {/* F070: real buttons already, but nothing announced which was chosen or what the result
            was, and the group had no name. */}
        <div className="lm-quiz-options" role="group" aria-label="Answer options">
          {question.options?.map((option, i) => (
            <button
              key={i}
              type="button"
              className={`lm-quiz-option ${getOptionClass(i)}`}
              aria-pressed={selected === i}
              disabled={answered}
              onClick={() => handleSelect(i)}
            >
              <span className="lm-quiz-option-letter">{letters[i]}</span>
              {option}
            </button>
          ))}
        </div>
        {revealPhase >= 2 && (
          <div className="lm-quiz-explanation lm-animate-slide-in" role="status" aria-live="polite">
            <strong>{isCorrect ? 'Correct!' : 'Not quite.'}</strong>{' '}
            {question.explanation}
          </div>
        )}
        {/* Confidence rating */}
        {answered && !confidence && !confidenceTimedOut && (
          <div className="lm-confidence-row lm-animate-fade-in">
            <span className="lm-confidence-prompt">How sure were you?</span>
            <div className="lm-confidence-buttons">
              <button className="lm-confidence-btn lm-conf-guessed" onClick={() => handleConfidence('guessed')}>Guessed</button>
              <button className="lm-confidence-btn lm-conf-somewhat" onClick={() => handleConfidence('somewhat')}>Somewhat sure</button>
              <button className="lm-confidence-btn lm-conf-certain" onClick={() => handleConfidence('certain')}>Certain</button>
              <button className="lm-confidence-btn lm-conf-skip" onClick={() => setConfidenceTimedOut(true)}>Skip</button>
            </div>
          </div>
        )}
        {confidence && (
          <div className="lm-confidence-done">{feedbackMsg}</div>
        )}
        {confidenceTimedOut && !confidence && (
          <div className="lm-confidence-done" style={{ fontStyle: 'italic' }}>No worries — moving on.</div>
        )}

        {/* Remediation question — slides in after wrong answer */}
        {showRemediation && question.remediation && (
          <div className="lm-remediation rl-section-enter">
            <div className="lm-remediation-divider">
              <span className="lm-remediation-label">Let&apos;s reinforce this</span>
            </div>
            <p className="lm-quiz-question">{question.remediation.question}</p>
            <div className="lm-quiz-options">
              {question.remediation.options?.map((opt, i) => {
                let cls = '';
                if (remAnswered) {
                  if (i === question.remediation.correct) cls = 'correct';
                  else if (i === remSelected && i !== question.remediation.correct) cls = 'incorrect';
                }
                return (
                  <button key={i} className={`lm-quiz-option ${cls}`}
                    onClick={() => { if (!remAnswered) { setRemSelected(i); setRemAnswered(true); } }}>
                    <span className="lm-quiz-option-letter">{letters[i]}</span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {remAnswered && (
              <div className="lm-quiz-explanation lm-animate-slide-in" role="status" aria-live="polite">
                <strong>{remSelected === question.remediation.correct ? 'Got it!' : 'Not quite.'}</strong>{' '}
                {question.remediation.explanation}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
