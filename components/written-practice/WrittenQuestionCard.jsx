'use client';
import { useState, useRef, useEffect } from 'react';
import WrittenFeedbackCard from './WrittenFeedbackCard';

// Tokens, not literals: these are painted as text on a 12% tint of themselves,
// and the raw hues were tuned for a dark card (amber sat at 2.15:1 on white).
// Each token's dark value is the literal it replaced.
const COMMAND_COLORS = {
  'Define':   'var(--accent-blue)',
  'Outline':  'var(--accent-violet)',
  'Explain':  'var(--accent-amber)',
  'Analyse':  'var(--accent-pink)',
  'Assess':   'var(--accent-red)',
  'Evaluate': 'var(--accent-red)',
};

export default function WrittenQuestionCard({
  question,
  sectionTitle,
  questionNumber,
  totalQuestions,
  sectionId,
  questionIndex,
  subjectSlug,
  sessionId,
  onGraded,
  onNext,
  onSkip,
}) {
  const [answer, setAnswer] = useState('');
  const [phase, setPhase] = useState('writing'); // 'writing' | 'grading' | 'feedback'
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState('');
  const textareaRef = useRef(null);

  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const commandColor = COMMAND_COLORS[question.command] || 'var(--text-muted)';

  // Auto-focus textarea on mount
  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  const textareaRows = question.marks >= 20 ? 16 : question.marks >= 10 ? 12 : 8;

  async function handleSubmit() {
    if (wordCount < 3) return;
    setError('');
    setPhase('grading');

    try {
      const res = await fetch('/api/written-practice/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.question,
          command: question.command,
          marks: question.marks,
          guidance: question.guidance || '',
          studentAnswer: answer,
          // Which item this is. The route re-resolves command, tariff and subject from
          // section_practice rather than believing these, but without the identity it
          // has nothing to look the question up by.
          sectionId,
          questionIndex,
          subject: subjectSlug,
          sessionId,
          wordCount,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to grade answer');
      }

      const result = await res.json();
      setFeedback(result);
      setPhase('feedback');

      // Notify engine of the result
      if (onGraded) {
        onGraded({
          marksAwarded: result.marksSuggested || 0,
          grade: result.grade || 'partial',
          feedback: result,
          aoRunning: result.aoRunning || null,
        });
      }
    } catch (e) {
      setError(e.message || 'Something went wrong. Please try again.');
      setPhase('writing');
    }
  }

  return (
    <div className="wap-qcard">
      {/* Top bar */}
      <div className="wap-qcard-top">
        <span className="wap-qcard-badge">{sectionTitle}</span>
        <span className="wap-qcard-marks">{question.marks} marks</span>
      </div>

      {/* Command word badge */}
      <div className="wap-command-badge" style={{ '--cmd-color': commandColor }}>
        {question.command}
      </div>

      {/* Question text */}
      <p className="wap-qcard-question">{question.question}</p>

      {/* Writing phase */}
      {phase === 'writing' && (
        <>
          <textarea
            ref={textareaRef}
            className="wap-textarea"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            rows={textareaRows}
          />
          <div className="wap-textarea-meta">
            <span>{wordCount} word{wordCount !== 1 ? 's' : ''}</span>
            <span>{answer.length} characters</span>
          </div>
          {error && <p className="wap-error">{error}</p>}
          <div className="wap-qcard-actions">
            <button
              className="wap-submit-btn"
              disabled={wordCount < 3}
              onClick={handleSubmit}
            >
              Submit for Marking
            </button>
            <button className="wap-skip-btn" onClick={onSkip}>Skip</button>
          </div>
        </>
      )}

      {/* Grading phase */}
      {phase === 'grading' && (
        <div className="wap-grading">
          <span className="wap-grading-spinner" />
          <p>AI is marking your answer…</p>
        </div>
      )}

      {/* Feedback phase */}
      {phase === 'feedback' && feedback && (
        <>
          <WrittenFeedbackCard
            feedback={feedback}
            guidance={question.guidance}
            marks={question.marks}
            command={question.command}
            subject={subjectSlug}
            aoRunning={feedback.aoRunning || null}
            onNext={onNext}
          />
          {/* The marking succeeded and is on screen above; only the AO record failed. Said
              once, quietly, at note weight — a student must never find out later that their
              count is short, and must never be alarmed about work that was in fact marked. */}
          {feedback.aoStored === false && (
            <p className="aop-note">This answer was marked, but we could not add it to your AO profile.</p>
          )}
        </>
      )}
    </div>
  );
}
