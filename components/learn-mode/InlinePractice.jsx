"use client";
import { useState, useEffect, useMemo } from 'react';
import { markColor } from './utils';
import { checklistFrom } from '@/lib/practice-checklist';

/* F117: the question text carries "(N marks)" and the badge says it again. Strip it at render. */
const stripMarks = (q) => String(q || '').replace(/\s*\(\s*\d+\s*marks?\s*\)\s*$/i, '');

/* ── Inline Practice Card (with Worked Example Fading) ──
   F016. All three modes were read-only views of the same guidance: a 20-mark question the student
   read, revealed, read again, and moved on from. There is an answer box now, in every mode, and a
   self-mark checklist built from the guidance's own "(n marks)" fragments; a written answer counts on
   the completion screen. For a free student the model-answer button is a locked control that says
   what Pro adds, not a button that is simply missing. */
export default function InlinePractice({ question, onAskTutor, mode = 'independent', onShown, onAttempt }) {
  // mode: 'worked' | 'guided' | 'independent'
  const [revealed, setRevealed] = useState(mode === 'worked');
  const [guidedExpanded, setGuidedExpanded] = useState(false);
  const [answer, setAnswer] = useState('');
  const [marking, setMarking] = useState(false);
  const [ticks, setTicks] = useState({});
  const [counted, setCounted] = useState(false);
  const colors = markColor(question.marks);

  useEffect(() => { if (typeof onShown === 'function') onShown(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const guidanceParagraphs = question.guidance?.split('\n').filter(Boolean) || [];
  const firstParagraph = guidanceParagraphs[0];
  const restParagraphs = guidanceParagraphs.slice(1);
  const checklist = useMemo(() => checklistFrom(question.guidance), [question.guidance]);

  function handleAskTutor() {
    if (!onAskTutor) return;
    onAskTutor(
      `Write a full model answer for this ${question.marks}-mark exam question that would achieve full marks:\n\n**Question (${question.marks} marks):** ${question.question}${question.command ? `\n**Command word:** ${question.command}` : ''}\n\nPlease structure the answer exactly as an examiner would expect, include all key points needed for full marks, and explain how each point earns marks. Use relevant economic/business terminology and, where appropriate, include diagram references.`
    );
  }

  function startMarking() {
    setMarking(true);
    setRevealed(true);
    if (!counted) { setCounted(true); if (typeof onAttempt === 'function') onAttempt(); }
  }

  const labelText = mode === 'worked' ? '\u{1F4D6} Worked example'
    : mode === 'guided' ? '\u{1F9ED} Guided practice'
    : '✍️ Quick check';
  const labelClass = mode === 'worked' ? 'lm-card-label lm-card-label-blue'
    : mode === 'guided' ? 'lm-card-label lm-card-label-amber'
    : 'lm-card-label lm-card-label-red';
  const labelDesc = mode === 'worked' ? "Read the model, then have a go"
    : mode === 'guided' ? 'The opening is given; write the rest'
    : "You're on your own — write it, then mark it";

  const tutorControl = onAskTutor ? (
    <button className="lm-practice-tutor-btn" onClick={handleAskTutor}>
      &#129302; Get Full Model Answer from Tutor
    </button>
  ) : (
    <a className="lm-practice-tutor-btn lm-practice-tutor-locked" href="/upgrade">
      &#128274; Full model answer, marked to the IAL grid &mdash; Pro
    </a>
  );

  const claimed = checklist.reduce((n, c, i) => n + (ticks[i] ? (c.marks || 0) : 0), 0);
  const available = checklist.reduce((n, c) => n + (c.marks || 0), 0);

  const answerBox = (
    <div className="lm-practice-write">
      <label className="lm-practice-write-label" htmlFor={`practice-answer-${question.id || question.marks}`}>Your answer</label>
      <textarea
        id={`practice-answer-${question.id || question.marks}`}
        className="lm-practice-textarea"
        placeholder={mode === 'worked' ? 'Now write it in your own words...' : 'Write your answer here, as you would in the exam...'}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={question.marks >= 10 ? 7 : 4}
      />
      {!marking && (
        <button className="lm-practice-mark-btn" onClick={startMarking} disabled={answer.trim().length < 15}>
          Mark my answer
        </button>
      )}
      {marking && checklist.length === 0 && (
        <p className="lm-practice-compare" role="status">
          Compare your answer with the mark scheme {mode === 'independent' ? 'below' : 'above'}: check you made each point it makes.
        </p>
      )}
      {marking && checklist.length > 0 && (
        <div className="lm-practice-selfmark" role="region" aria-label="Self-mark checklist">
          <div className="lm-practice-selfmark-title">Tick what your answer includes</div>
          <ul className="lm-practice-checklist">
            {checklist.map((c, i) => (
              <li key={i}>
                <label className="lm-practice-check">
                  <input type="checkbox" checked={!!ticks[i]} onChange={(e) => setTicks((t) => ({ ...t, [i]: e.target.checked }))} />
                  <span>{c.text}{c.marks ? <em className="lm-practice-check-marks"> {c.marks} mark{c.marks === 1 ? '' : 's'}</em> : null}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="lm-practice-selfmark-total" aria-live="polite">
            {available ? `${claimed} of ${available} marks claimed` : `${Object.values(ticks).filter(Boolean).length} of ${checklist.length} points covered`}
            {question.marks > 6 && <span className="lm-practice-selfmark-note"> &middot; questions above 6 marks are levels-marked in the exam; this is a coverage check, not a grade</span>}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`lm-practice-card ${mode === 'worked' ? 'lm-worked-example' : ''}`}>
      <div className={labelClass}>{labelText}</div>
      <div className="lm-card-label-desc">{labelDesc}</div>
      <div className="lm-practice-inner">
        <p className="lm-practice-question">{stripMarks(question.question)}</p>
        <span className="lm-practice-marks" style={{ backgroundColor: colors.bg, color: colors.badge, borderColor: colors.border }}>
          {question.marks} marks
        </span>

        {mode === 'worked' && (
          <>
            <div className="lm-practice-answer open">
              <div className="lm-practice-answer-inner lm-worked-answer">
                {guidanceParagraphs.map((line, i) => <p key={i}>{line}</p>)}
                {tutorControl}
              </div>
            </div>
            {answerBox}
          </>
        )}

        {mode === 'guided' && (
          <>
            <div className="lm-practice-answer open">
              <div className="lm-practice-answer-inner lm-guided-answer">
                {firstParagraph && <p>{firstParagraph}</p>}
                {(guidedExpanded || marking) && restParagraphs.map((line, i) => <p key={i}>{line}</p>)}
                {!guidedExpanded && !marking && restParagraphs.length > 0 && (
                  <button className="lm-guided-expand-btn" onClick={() => setGuidedExpanded(true)}>
                    See full guidance &#x25BC;
                  </button>
                )}
                {tutorControl}
              </div>
            </div>
            {answerBox}
          </>
        )}

        {mode === 'independent' && (
          <>
            {answerBox}
            <button className="lm-practice-reveal-btn" onClick={() => setRevealed(!revealed)} aria-expanded={revealed}>
              {revealed ? 'Hide mark scheme ▲' : 'Reveal mark scheme ▼'}
            </button>
            <div className={`lm-practice-answer ${revealed ? 'open' : ''}`}>
              <div className="lm-practice-answer-inner">
                {guidanceParagraphs.map((line, i) => <p key={i}>{line}</p>)}
                {tutorControl}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
