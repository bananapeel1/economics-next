"use client";
import { useState } from 'react';

/**
 * Enhanced ExplainItBack with inline AI grading for premium users.
 * Free users get the same self-review experience (no AI button).
 */
export default function ExplainItBackUpgraded({ title, onAskTutor, isPremium }) {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState('');
  const [grading, setGrading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { grade, feedback, strengths, gaps }
  const [error, setError] = useState('');

  async function handleGrade() {
    if (!text.trim() || text.trim().length < 10) return;
    setGrading(true);
    setError('');
    try {
      const res = await fetch('/api/learn-mode/grade-explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: title, explanation: text }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || 'Something went wrong.');
        setGrading(false);
        return;
      }
      const result = await res.json();
      setFeedback(result);
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

          {/* Fallback: tutor redirect for premium, nothing for free */}
          {onAskTutor && !isPremium && text.trim().length > 10 && (
            <button className="lm-explain-tutor-btn" onClick={handleTutorCheck}>
              &#129302; Check my explanation with AI Tutor
            </button>
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
