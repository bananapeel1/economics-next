"use client";
import { useState, useEffect } from 'react';
import { recordAnswer, recordConfidence } from '@/lib/answer-log';
import ReportProblem from '@/components/feedback/ReportProblem';

/* ── Inline Quiz Card (MCQ) with Confidence Rating ── */
export default function InlineQuiz({ question, subjectId, sectionId, stepIndex, onResult }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [revealPhase, setRevealPhase] = useState(0); // 0=unanswered, 1=user choice shown, 2=full reveal
  const [confidence, setConfidence] = useState(null);
  const [confidenceTimedOut, setConfidenceTimedOut] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  // F104: the confidence row used to disappear on a 4-second timer, so a question the student was
  // still thinking about was treated as one they had declined to answer. It now stays until they
  // answer it or skip it.
  //
  // F017: the follow-up "let's reinforce this" question that used to slide in here is gone. It
  // read `question.remediation`, and not one of the 43 sections has ever carried that field, so
  // the branch had never run. Authoring 769 remediation questions is a content decision, not a
  // dead branch to leave lying in the component.
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
    const wasCorrect = index === question.correctIndex;
    onResult?.(wasCorrect);
    // F017: the wrong answer used to end here, as +0 on a counter. Logged now, so the post-test
    // can ask it again and a later session can see it.
    recordAnswer(subjectId, sectionId, question, wasCorrect);
    // After 200ms, reveal correct answer + explanation
    setTimeout(() => {
      setRevealPhase(2);
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

    // F017: this used to write to `revvy_confidence_*`, a key nothing has ever read. It goes to
    // the shared answer log now, where the drill orders questions by it — being wrong while
    // certain is what a student most needs asked again.
    recordConfidence(subjectId, sectionId, question, level);
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
        {/* Until an option is picked nothing is revealed, so the answer categories stay hidden. */}
        <div className="rp-slot">
          <ReportProblem target={{
            surface: 'checkin',
            sectionId,
            itemId: question.id,
            step: stepIndex,
            label: 'Check-in question',
            rendered: { stem: question.question },
            answer: answered
              ? {
                  chosen: question.options?.[selected] ?? null,
                  marked: question.options?.[question.correctIndex] ?? null,
                  correct: isCorrect,
                  revealed: revealPhase >= 2,
                }
              : { revealed: false },
          }} />
        </div>

      </div>
    </div>
  );
}
