"use client";
import { useState, useEffect, useRef } from 'react';

/**
 * Explain It Back, with a real close-the-loop for everyone.
 *
 * F012. On the last step of every chapter the student was invited to explain it in their own words
 * and, unless they paid, got nothing back at all: no comparison, no acknowledgement, and the
 * completion screen read "Explain It Back 0". Writing an explanation and then reading the chapter's
 * own key ideas against it is the useful part, and it needs no model. So, for every student:
 *
 *   1. write;
 *   2. "Compare with the key ideas" reveals the chapter's key ideas (already in the content);
 *   3. a self-check, one tick per key idea: did I cover this?
 *
 * The attempt is counted when the comparison is opened, and the draft is kept per chapter in
 * localStorage so a student who leaves and comes back finds their words, not an empty box. The AI
 * grade stays a Pro control, and it is a real one (F029): it says what it does and where to get it.
 */
export default function ExplainItBackUpgraded({ title, onAskTutor, isPremium, onAttempt, rubric, sectionId, blockIndex }) {
  const draftKey = sectionId != null && blockIndex != null ? `revvy_explain_${sectionId}_${blockIndex}` : null;
  const [expanded, setExpanded] = useState(false);
  // F118: a stored draft is read after hydration, never during the first render. And it is only
  // ever WRITTEN after the student has typed: the first version persisted on every change of `text`,
  // including the empty fallback the first render starts from, so the stored draft was removed
  // before the read that would have restored it had run. Caught by the packet 5 verifier.
  const [text, setText] = useState('');
  const dirty = useRef(false);
  useEffect(() => {
    if (!draftKey) return;
    let stored = '';
    try { stored = localStorage.getItem(draftKey) || ''; } catch { /* blocked storage */ }
    dirty.current = false;
    setText(stored);
  }, [draftKey]);
  const [grading, setGrading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { grade, feedback, strengths, gaps }
  const [error, setError] = useState('');
  const [compared, setCompared] = useState(false);
  const [ticks, setTicks] = useState({});
  // One attempt per mounted box, however many times the student re-grades or re-compares.
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    if (!draftKey || !dirty.current) return;
    try { if (text) localStorage.setItem(draftKey, text); else localStorage.removeItem(draftKey); } catch { /* storage blocked */ }
  }, [text, draftKey]);

  const keyIdeas = String(rubric?.keyIdea || '').split('\n').map((s) => s.trim()).filter(Boolean);
  const ready = text.trim().length >= 10;

  function countAttempt() {
    if (counted) return;
    setCounted(true);
    if (typeof onAttempt === 'function') onAttempt();
  }

  async function handleGrade() {
    if (!ready) return;
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

  const gradeEmoji = { good: '✅', partial: '🟡', 'needs-work': '🟠' };
  const gradeLabel = { good: 'Great understanding!', partial: 'On the right track', 'needs-work': 'Needs more detail' };
  const ticked = Object.values(ticks).filter(Boolean).length;

  return (
    <div className="lm-explain-section">
      <button className="lm-explain-toggle" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
        <span className="lm-explain-toggle-icon">{expanded ? '▾' : '▸'}</span>
        <span className="lm-explain-toggle-text">Explain it back: <strong>{title}</strong></span>
        {text.trim() && !expanded && <span className="lm-explain-toggle-draft">draft saved</span>}
      </button>
      {expanded && (
        <div className="lm-explain-body">
          <p className="lm-explain-prompt">Try explaining what you just learned in your own words. This is one of the most effective ways to strengthen your memory.</p>
          <textarea
            className="lm-explain-textarea"
            placeholder="In my own words, this chapter is about..."
            value={text}
            onChange={(e) => { dirty.current = true; setText(e.target.value); }}
            rows={4}
          />

          {/* The path everyone has: the chapter's own key ideas, then a self-check. */}
          {ready && !compared && keyIdeas.length > 0 && (
            <button className="lm-explain-compare-btn" onClick={() => { setCompared(true); countAttempt(); }}>
              Compare with the key ideas &rarr;
            </button>
          )}
          {compared && keyIdeas.length > 0 && (
            <div className="lm-explain-compare" role="region" aria-label="Compare with the key ideas">
              <div className="lm-explain-compare-title">The chapter&apos;s key ideas. Did your explanation cover each one?</div>
              <ul className="lm-explain-checklist">
                {keyIdeas.map((idea, i) => (
                  <li key={i}>
                    <label className="lm-explain-check">
                      <input type="checkbox" checked={!!ticks[i]} onChange={(e) => setTicks((t) => ({ ...t, [i]: e.target.checked }))} />
                      <span>{idea}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <div className="lm-explain-compare-result" aria-live="polite">
                {ticked === keyIdeas.length
                  ? 'All of them. That is the chapter, in your words.'
                  : ticked === 0
                    ? 'Tick the ones you covered. The unticked ones are what to re-read before moving on.'
                    : `${ticked} of ${keyIdeas.length}. The unticked ones are what to re-read before moving on.`}
              </div>
            </div>
          )}

          {/* AI Grade button — premium only */}
          {/* V009: `isPremium` is three-valued here — true, false, or null for "not known yet".
              Both branches below are statements about what this student has paid for, so neither
              may draw on null; the panel simply shows the draft box until the answer arrives. */}
          {isPremium === true && !feedback && ready && (
            <button className="lm-explain-grade-btn" onClick={handleGrade} disabled={grading}>
              {grading ? 'Grading...' : '✨ Grade my explanation'}
            </button>
          )}
          {isPremium === true && onAskTutor && ready && (
            <button className="lm-explain-tutor-btn" onClick={handleTutorCheck}>
              &#129302; Check my explanation with AI Tutor
            </button>
          )}
          {isPremium === false && ready && (
            <div className="lm-explain-locked">
              <div className="lm-explain-locked-text">
                <strong>Pro marks this against what the chapter teaches</strong> and names what is missing. Your draft stays here either way.
              </div>
              <a className="lm-explain-locked-cta" href="/upgrade">See what Pro adds</a>
            </div>
          )}

          {error && <p className="lm-explain-error">{error}</p>}

          {feedback && (
            <div className={`lm-explain-feedback lm-explain-feedback-${feedback.grade}`}>
              <div className="lm-explain-feedback-header">
                <span className="lm-explain-feedback-emoji">{gradeEmoji[feedback.grade] || '✅'}</span>
                <span className="lm-explain-feedback-grade">{gradeLabel[feedback.grade] || 'Reviewed'}</span>
              </div>
              <p className="lm-explain-feedback-text">{feedback.feedback}</p>
              {feedback.strengths?.length > 0 && (
                <div className="lm-explain-feedback-list">
                  <div className="lm-explain-feedback-list-title">Strengths</div>
                  {feedback.strengths.map((s, i) => (
                    <div key={i} className="lm-explain-feedback-item lm-feedback-strength"><span className="lm-feedback-icon">✓</span> {s}</div>
                  ))}
                </div>
              )}
              {feedback.gaps?.length > 0 && (
                <div className="lm-explain-feedback-list">
                  <div className="lm-explain-feedback-list-title">Areas to review</div>
                  {feedback.gaps.map((g, i) => (
                    <div key={i} className="lm-explain-feedback-item lm-feedback-gap"><span className="lm-feedback-icon">○</span> {g}</div>
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
