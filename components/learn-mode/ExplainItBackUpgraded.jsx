"use client";
import { useState } from 'react';

/**
 * Enhanced ExplainItBack with inline AI grading for premium users.
 * Free users get the same self-review experience (no AI button).
 */
export default function ExplainItBackUpgraded({ title, onAskTutor, isPremium, onAttempt, rubric }) {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState('');
  const [grading, setGrading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { grade, feedback, strengths, gaps }
  const [error, setError] = useState('');
  // One attempt per mounted box, however many times the student re-grades. The completion screen
  // counts boxes engaged with, not button presses.
  const [counted, setCounted] = useState(false);

  function countAttempt() {
    if (counted) return;
    setCounted(true);
    if (typeof onAttempt === 'function') onAttempt();
  }

  async function handleGrade() {
    if (!text.trim() || text.trim().length < 10) return;
    setGrading(true);
    setError('');
    try {
      const res = await fetch('/api/learn-mode/grade-explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: title, explanation: text, ...(rubric || {}) }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || 'Something went wrong.');
        setGrading(false);
        return;
      }
      const result = await res.json();
      setFeedback(result);
      countAttempt();
    } catch (e) {
      setError('Network error. Please try again.');
    }
    setGrading(false);
  }

  function handleTutorCheck() {
    if (!onAskTutor || !text.trim()) return;
    onAskTutor(
      `A student tried to explain '${title}' in their own words. Review their explanation for accuracy, highlight any misconceptions, and provide encouraging feedback:\n\n**Student's explanation:**\n${text}`
    );
  }

  const gradeEmoji = {
    'good': '\u2705',
    'partial': '\ud83d\udfe1',
    'needs-work': '\ud83d\udfe0',
  };

  const gradeLabel = {
    'good': 'Great understanding!',
    'partial': 'On the right track',
    'needs-work': 'Needs more detail',
  };

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
            onBlur={() => { if (text.trim().length >= 10) countAttempt(); }}
            rows={4}
          />

          {/* AI Grade button — premium only */}
          {isPremium && !feedback && text.trim().length > 10 && (
            <button
              className="lm-explain-grade-btn"
              onClick={handleGrade}
              disabled={grading}
            >
              {grading ? 'Grading...' : '\u2728 Grade my explanation'}
            </button>
          )}

          {/* F029: this branch was dead. StudyApp passes `onAskTutor` as null for anyone without a
              subscription, so `onAskTutor && !isPremium` was never true and a free student who
              typed 200 words got nothing at all — no feedback, no acknowledgement, no sign that
              anything existed to unlock. The box read as broken rather than as premium.
              A locked control says what it does and what it costs. */}
          {isPremium && onAskTutor && text.trim().length > 10 && (
            <button className="lm-explain-tutor-btn" onClick={handleTutorCheck}>
              &#129302; Check my explanation with AI Tutor
            </button>
          )}

          {!isPremium && text.trim().length > 10 && (
            <div className="lm-explain-locked">
              <div className="lm-explain-locked-text">
                <strong>Writing it out is the useful part, and you have done it.</strong>{' '}
                Pro marks this against what the chapter actually teaches and names what is missing.
              </div>
              <a className="lm-explain-locked-cta" href="/upgrade">See what Pro adds</a>
            </div>
          )}

          {error && (
            <p className="lm-explain-error">{error}</p>
          )}

          {/* AI Feedback card */}
          {feedback && (
            <div className={`lm-explain-feedback lm-explain-feedback-${feedback.grade}`}>
              <div className="lm-explain-feedback-header">
                <span className="lm-explain-feedback-emoji">{gradeEmoji[feedback.grade] || '\u2705'}</span>
                <span className="lm-explain-feedback-grade">{gradeLabel[feedback.grade] || 'Reviewed'}</span>
              </div>
              <p className="lm-explain-feedback-text">{feedback.feedback}</p>

              {feedback.strengths?.length > 0 && (
                <div className="lm-explain-feedback-list">
                  <div className="lm-explain-feedback-list-title">Strengths</div>
                  {feedback.strengths.map((s, i) => (
                    <div key={i} className="lm-explain-feedback-item lm-feedback-strength">
                      <span className="lm-feedback-icon">\u2713</span> {s}
                    </div>
                  ))}
                </div>
              )}

              {feedback.gaps?.length > 0 && (
                <div className="lm-explain-feedback-list">
                  <div className="lm-explain-feedback-list-title">Areas to review</div>
                  {feedback.gaps.map((g, i) => (
                    <div key={i} className="lm-explain-feedback-item lm-feedback-gap">
                      <span className="lm-feedback-icon">\u25CB</span> {g}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
