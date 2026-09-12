'use client';

import { AO_DISPLAY, AO_KEYS } from '@/lib/ao-labels';
import { aoShortfallLine, aoUnmappedLine } from '@/lib/ao-profile';

const GRADE_CONFIG = {
  excellent: { icon: '🎯', label: 'Excellent', colorClass: 'wap-grade-excellent' },
  good:      { icon: '✅', label: 'Good',      colorClass: 'wap-grade-good' },
  partial:   { icon: '⚠️',  label: 'Partial',   colorClass: 'wap-grade-partial' },
  weak:      { icon: '📚', label: 'Needs Work', colorClass: 'wap-grade-weak' },
};

/**
 * The explanatory line under the breakdown, and never a sentence this component wrote:
 * every student-facing claim in the AO feature is assembled in lib/ao-profile.js so the
 * card and the profile can never phrase the same fact two ways. Null means there is
 * nothing true to say, and the try/catch means a fault in the AO additions costs a
 * caveat rather than the marking the student came for.
 */
function shortfallLine({ subject, command, tariff }) {
  try {
    return aoShortfallLine({ subject, command, tariff }) || null;
  } catch {
    return null;
  }
}

function AOBreakdown({ feedback, marks, subject, command }) {
  const hasAO = AO_KEYS.some(k => feedback[k] && feedback[k].max > 0);

  // No breakdown at all means the command word is off-spec, which is a statement worth making
  // rather than an empty space. Guarded like the shortfall line: a fault here costs the caveat,
  // never the marking.
  if (!hasAO) {
    let unmapped = null;
    try {
      unmapped = aoUnmappedLine({ subject, command, tariff: marks });
    } catch {
      unmapped = null;
    }
    return unmapped ? <p className="aop-note">{unmapped}</p> : null;
  }

  // An answer's four maxima can legitimately total less than the tariff it was served at:
  // Appendix 6 says Define requires knowledge and understanding only, so an Economics
  // Define served at 4 marks assesses 2. Without a line saying so, a student reads a
  // "3 / 4 marks" header above rows totalling 2 and concludes the app is broken. The
  // maxima are never renormalised up to the tariff — that would invent an allocation.
  // subject and command are the client's copy of the same bank record the route resolved
  // server-side; the gate is the server's own maxima, so a disagreement makes the line
  // absent rather than wrong.
  const aoTotal = AO_KEYS.reduce((sum, k) => sum + (feedback[k]?.max || 0), 0);
  const shortfall = aoTotal < marks ? shortfallLine({ subject, command, tariff: marks }) : null;

  return (
    <div className="wap-ao-breakdown">
      <h4 className="wap-section-title">Assessment Objective Breakdown</h4>
      <div className="wap-ao-grid">
        {AO_KEYS.map(k => {
          const ao = feedback[k];
          // Not assessed is absent, not zero. This is the same max > 0 test the aggregate
          // uses, which is what stops the card and the profile ever disagreeing about
          // whether an objective was in play.
          if (!ao || ao.max === 0) return null;
          const { label, color } = AO_DISPLAY[k];
          const pct = ao.max > 0 ? Math.round((ao.marks / ao.max) * 100) : 0;
          return (
            // The colour rides a custom property rather than an inline color/background:
            // .wap-ao-label and .wap-ao-bar-fill read it from globals.css, where
            // npm run contrast can see it. A hex in JSX is invisible to that guard.
            <div key={k} className="wap-ao-card" style={{ '--wap-ao-color': color }}>
              <div className="wap-ao-header">
                <span className="wap-ao-label">{label}</span>
                <span className="wap-ao-score">{ao.marks}/{ao.max}</span>
              </div>
              <div className="wap-ao-bar">
                <div className="wap-ao-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              {k === 'ao3' && typeof ao.chains === 'number' && (
                <div className="wap-ao-chains">{ao.chains} analytical chain{ao.chains !== 1 ? 's' : ''} identified</div>
              )}
              {ao.comment && <div className="wap-ao-comment">{ao.comment}</div>}
            </div>
          );
        })}
      </div>
      {shortfall && <p className="aop-note">{shortfall}</p>}
    </div>
  );
}

export default function WrittenFeedbackCard({ feedback, guidance, marks, subject, command, aoRunning, onNext }) {
  const grade = GRADE_CONFIG[feedback.grade] || GRADE_CONFIG.partial;

  return (
    <div className="wap-feedback">
      {/* Grade header */}
      <div className={`wap-feedback-header ${grade.colorClass}`}>
        <span className="wap-grade-icon">{grade.icon}</span>
        <div className="wap-grade-info">
          <span className="wap-grade-label">{grade.label}</span>
          <span className="wap-grade-marks">{feedback.marksSuggested} / {marks} marks</span>
        </div>
      </div>

      {/* Feedback text */}
      <p className="wap-feedback-text">{feedback.feedback}</p>

      {/* AO Breakdown */}
      <AOBreakdown feedback={feedback} marks={marks} subject={subject} command={command} />

      {/* What keeps happening across this student's answers. The server produced the
          sentence; null means no floor was cleared and there is nothing to render. */}
      {aoRunning && aoRunning.text && (
        <div className="aop-running">
          <p className="aop-running-text">{aoRunning.text}</p>
          {aoRunning.technique && <p className="aop-running-tip">{aoRunning.technique}</p>}
          {aoRunning.disclosure && <p className="aop-running-note">{aoRunning.disclosure}</p>}
        </div>
      )}

      {/* Strengths */}
      {feedback.strengths?.length > 0 && (
        <div className="wap-feedback-section">
          <h4 className="wap-section-title wap-section-green">Strengths</h4>
          <ul className="wap-feedback-list">
            {feedback.strengths.map((s, i) => (
              <li key={i} className="wap-feedback-item wap-item-green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gaps */}
      {feedback.gaps?.length > 0 && (
        <div className="wap-feedback-section">
          <h4 className="wap-section-title wap-section-amber">Gaps to address</h4>
          <ul className="wap-feedback-list">
            {feedback.gaps.map((g, i) => (
              <li key={i} className="wap-feedback-item wap-item-amber">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {g}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvement tip */}
      {feedback.improvementTip && (
        <div className="wap-improvement-tip">
          <span className="wap-tip-icon">💡</span>
          <p>{feedback.improvementTip}</p>
        </div>
      )}

      {/* Model answer expandable */}
      {guidance && (
        <details className="wap-model-answer">
          <summary className="wap-model-answer-toggle">View Mark Scheme Guidance</summary>
          <div className="wap-model-answer-content">
            <p>{guidance}</p>
          </div>
        </details>
      )}

      {/* Next button */}
      <button className="wap-next-btn" onClick={onNext}>
        Next Question →
      </button>
    </div>
  );
}
