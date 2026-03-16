"use client";
import { useState } from 'react';
import { MARK_COLORS } from './utils';

/* ── Inline Practice Card (with Worked Example Fading) ── */
export default function InlinePractice({ question, onAskTutor, mode = 'independent' }) {
  // mode: 'worked' | 'guided' | 'independent'
  const [revealed, setRevealed] = useState(mode === 'worked');
  const [guidedExpanded, setGuidedExpanded] = useState(false);
  const colors = MARK_COLORS[question.marks] || MARK_COLORS[4];

  const guidanceParagraphs = question.guidance?.split('\n').filter(Boolean) || [];
  const firstParagraph = guidanceParagraphs[0];
  const restParagraphs = guidanceParagraphs.slice(1);

  function handleAskTutor() {
    if (!onAskTutor) return;
    onAskTutor(
      `Write a full model answer for this ${question.marks}-mark exam question that would achieve full marks:\n\n**Question (${question.marks} marks):** ${question.question}${question.command ? `\n**Command word:** ${question.command}` : ''}\n\nPlease structure the answer exactly as an examiner would expect, include all key points needed for full marks, and explain how each point earns marks. Use relevant economic/business terminology and, where appropriate, include diagram references.`
    );
  }

  const labelText = mode === 'worked' ? '\u{1F4D6} Worked example'
    : mode === 'guided' ? '\u{1F9ED} Guided practice'
    : '\u270D\uFE0F Quick check';

  const labelClass = mode === 'worked' ? 'lm-card-label lm-card-label-blue'
    : mode === 'guided' ? 'lm-card-label lm-card-label-amber'
    : 'lm-card-label lm-card-label-red';

  return (
    <div className={`lm-practice-card ${mode === 'worked' ? 'lm-worked-example' : ''}`}>
      <div className={labelClass}>{labelText}</div>
      <div className="lm-practice-inner">
        <p className="lm-practice-question">{question.question}</p>
        <span className="lm-practice-marks" style={{ backgroundColor: colors.bg, color: colors.badge, borderColor: colors.border }}>
          {question.marks} marks
        </span>

        {mode === 'worked' && (
          /* Worked example: guidance shown by default */
          <div className="lm-practice-answer open">
            <div className="lm-practice-answer-inner lm-worked-answer">
              {guidanceParagraphs.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              {onAskTutor && (
                <button className="lm-practice-tutor-btn" onClick={handleAskTutor}>
                  &#129302; Get Full Model Answer from Tutor
                </button>
              )}
            </div>
          </div>
        )}

        {mode === 'guided' && (
          /* Guided: first paragraph visible, rest behind toggle */
          <>
            <div className="lm-practice-answer open">
              <div className="lm-practice-answer-inner lm-guided-answer">
                {firstParagraph && <p>{firstParagraph}</p>}
                {guidedExpanded && restParagraphs.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                {!guidedExpanded && restParagraphs.length > 0 && (
                  <button className="lm-guided-expand-btn" onClick={() => setGuidedExpanded(true)}>
                    See full guidance &#x25BC;
                  </button>
                )}
                {onAskTutor && (
                  <button className="lm-practice-tutor-btn" onClick={handleAskTutor}>
                    &#129302; Get Full Model Answer from Tutor
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {mode === 'independent' && (
          /* Independent: current behavior */
          <>
            <button className="lm-practice-reveal-btn" onClick={() => setRevealed(!revealed)}>
              {revealed ? 'Hide mark scheme \u25B2' : 'Reveal mark scheme \u25BC'}
            </button>
            <div className={`lm-practice-answer ${revealed ? 'open' : ''}`}>
              <div className="lm-practice-answer-inner">
                {guidanceParagraphs.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                {onAskTutor && (
                  <button className="lm-practice-tutor-btn" onClick={handleAskTutor}>
                    &#129302; Get Full Model Answer from Tutor
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
