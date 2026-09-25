"use client";
import { useState } from 'react';
import { DrawerAlt } from './Icons';
import { SECTION_MODEL_ANSWERS_LINKS } from '@/data/modelAnswersData';
import Link from 'next/link';
import { isPracticeVisible, subjectFrom } from '@/lib/ial-commands';
import { markFiltersForSection, markColorsFor, markColor } from '@/lib/practice-tariffs';
import ReportProblem from './feedback/ReportProblem';

export default function PracticeQuestionsTab({ questions: allQuestions = [], onAskTutor, sectionId, sectionNumber, unitCode }) {
  const MARK_COLORS = markColorsFor(unitCode);
  // Keyed by subject as well as number: Business 1.3.1 and Economics 1.3.1 are different topics with
  // the same number, and a flat lookup sent every Business section to the Economics page that shares
  // its number. Packet 12.1, E005.
  const modelAnswersHref = sectionNumber
    ? (SECTION_MODEL_ANSWERS_LINKS[subjectFrom(unitCode)] || {})[sectionNumber]
    : null;
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedIds, setExpandedIds] = useState(new Set());

  // Withhold items whose command word is not on the IAL list for this subject (or flagged hidden).
  // They rehearse a question shape the student will never sit. See audit/PLAN.md day-0 hotfix.
  const questions = allQuestions.filter(q => isPracticeVisible(q, unitCode));
  const withheldCount = allQuestions.length - questions.length;

  // Count questions by marks. Computed before the chips, because the chips are built FROM it: the
  // row is the subject's tariff ladder (lib/ial-marking.js) plus any tariff these visible questions
  // actually carry. Packet 12.1 E006 used the ladder alone and dropped the 10 Marks chip while two
  // live Economics sections still served a 10-mark Analyse question — visible in the list, reachable
  // from no chip. Founder decision, 18 September 2026: the off-ladder tariff gets its own chip,
  // labelled "10 · not IAL" so the student is not told it is an exam tariff. Fix round B1.
  const counts = {};
  questions.forEach(q => {
    counts[q.marks] = (counts[q.marks] || 0) + 1;
  });
  const MARK_FILTERS = markFiltersForSection(unitCode, Object.keys(counts).map(Number));

  if (!questions.length) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}><DrawerAlt size={48} /></div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>No Practice Questions Yet</div>
        <div style={{ fontSize: 14 }}>Practice questions for this section are coming soon.</div>
      </div>
    );
  }

  const filtered = activeFilter === 'all'
    ? questions
    : questions.filter(q => q.marks === activeFilter);

  function toggleGuidance(index) {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className="practice-tab">
      <div className="practice-header">
        <h2 className="practice-title">Practice Questions</h2>
        <p className="practice-subtitle">
          Exam-style questions to test your understanding. Click &quot;Show Guidance&quot; to see model answer structures.
        </p>
        {withheldCount > 0 && (
          <p className="practice-withheld-note" role="note">
            {withheldCount} question{withheldCount === 1 ? ' is' : 's are'} being rewritten to match the IAL exam format and {withheldCount === 1 ? 'is' : 'are'} hidden for now.
          </p>
        )}
      </div>

      {modelAnswersHref && (
        <Link href={modelAnswersHref} className="practice-ma-card">
          <div className="practice-ma-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M9 15l2 2 4-4" />
            </svg>
          </div>
          <div className="practice-ma-text">
            <strong>Model Answers</strong>
            <p>Annotated model answers with mark scheme breakdowns for this section.</p>
          </div>
          <span className="practice-ma-arrow">View &rarr;</span>
        </Link>
      )}

      <div className="practice-filters">
        {MARK_FILTERS.map(f => {
          const count = f.value === 'all' ? questions.length : (counts[f.value] || 0);
          // The whole ladder is shown, so a student can see what the paper contains; a tariff this
          // section has no question at yet is disabled rather than hidden.
          const empty = f.value !== 'all' && count === 0;
          // A chip for a tariff this subject's papers do not carry. It exists only because this
          // section has a live question at it; the label says so, so the ladder is not misread.
          const offLadder = f.offLadder === true;
          return (
            <button
              key={f.value}
              className={`practice-filter-btn ${activeFilter === f.value ? 'active' : ''}${empty ? ' empty' : ''}${offLadder ? ' off-ladder' : ''}`}
              onClick={() => setActiveFilter(f.value)}
              disabled={empty}
              aria-disabled={empty || undefined}
              // aria-label, not title: a title attribute REPLACES the button's text as its
              // accessible name, so a screen reader announced "No 2 marks question in this section
              // yet" and never said which chip it was on.
              aria-label={
                empty
                  ? `${f.label} — none in this section yet`
                  : offLadder
                    ? `${f.value} marks — not an IAL tariff for this subject`
                    : undefined
              }
            >
              {f.label}
              <span className="practice-filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="practice-questions-list">
        {filtered.map((q, i) => {
          // An item sitting at a tariff the subject's ladder does not contain is still shown under
          // "All Questions"; it gets a resolvable palette rather than a blank card.
          const colors = MARK_COLORS[q.marks] || markColor(q.marks);
          const isExpanded = expandedIds.has(i);
          const globalIndex = questions.indexOf(q);

          return (
            <div
              key={globalIndex}
              className="practice-question-card"
              style={{ '--card-bg': colors.bg, '--card-border': colors.border }}
            >
              <div className="practice-question-top">
                <span
                  className="practice-marks-badge"
                  style={{ backgroundColor: colors.badge }}
                >
                  {q.marks} marks
                </span>
                {q.command && (
                  <span className="practice-command-badge">
                    {q.command}
                  </span>
                )}
              </div>

              <p className="practice-question-text">{q.question}</p>

              <button
                className={`practice-guidance-toggle ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleGuidance(i)}
              >
                <span className="practice-guidance-icon">{isExpanded ? '▼' : '▶'}</span>
                {isExpanded ? 'Hide Guidance' : 'Show Guidance'}
              </button>

              {isExpanded && (
                <div className="practice-guidance">
                  <div className="practice-guidance-label">Model Answer Guidance</div>
                  <div className="practice-guidance-text">
                    {q.guidance.split('\n').map((line, li) => (
                      <p key={li}>{line}</p>
                    ))}
                  </div>
                  {onAskTutor && (
                    <button
                      className="practice-model-answer-btn"
                      onClick={() => onAskTutor(
                        `Write a full model answer for this ${q.marks}-mark exam question that would achieve full marks:\n\n**Question (${q.marks} marks):** ${q.question}${q.command ? `\n**Command word:** ${q.command}` : ''}\n\nPlease structure the answer exactly as an examiner would expect, include all key points needed for full marks, and explain how each point earns marks. Use relevant economic/business terminology and, where appropriate, include diagram references.`
                      )}
                    >
                      🤖 Get Full Model Answer from Tutor
                    </button>
                  )}
                </div>
              )}

              {/* "The mark scheme is wrong" is only offered once the guidance has been opened. */}
              {sectionId && (
                <div className="rp-slot">
                  <ReportProblem target={{
                    surface: 'practice',
                    sectionId,
                    itemId: q.id,
                    questionIndex: globalIndex,
                    label: `${q.marks}-mark ${q.command || 'question'}`,
                    rendered: { stem: q.question },
                    answer: { revealed: isExpanded },
                  }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
