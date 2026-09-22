"use client";
import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import PaywallOverlay from './PaywallOverlay';
import { Quiz as QuizIcon, CardClub } from './Icons';
import Link from 'next/link';
import { PREVIEW_LIMITS } from '@/lib/preview-limits';
import { subjectFrom } from '@/lib/ial-commands';
import { templatesForSection, quantItem } from '@/lib/quant-pool';
import CalculationItem from './quant/CalculationItem';

export default function QuizTab({ questions, sectionId, onAskTutor, previewMode = false, totalCount, unitCode, sectionNumber }) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [bestScore, setBestScore] = useState(null);
  const [saving, setSaving] = useState(false);
  /* Packet 13.2. The section's first quantitative drill, above the multiple choice.
   *
   * It is NOT part of the quiz score, and that is not a presentation choice. This tab posts
   * `{score, total}` to /api/progress/quiz and compares a best "like with like" on `total`;
   * adding a generated item to the total would re-bucket every attempt row already in the
   * table, so a student's 18/25 would stop matching their next 18/26 and their best would
   * silently disappear. A drill beside the quiz, marked by its own engine.
   *
   * No entitlement gate either: a generated item is not a content bank, so withholding it
   * protects nothing that F086 was about. Founder's call to overturn — see DECISIONS.md. */
  const [quantAttempts, setQuantAttempts] = useState({});
  /*
   * EVERY template the section has, not `[0]`. Verify A found `payback` reaching no student at
   * all: `decision-making-techniques` is the only WBS13 3.3.3 section, Learn Mode had room for
   * one drill on its two check-ins, and this tab took the first of the two in registry order —
   * `arr` both times. A template that is built, drawn, marked, guarded and unreachable is the
   * defect this packet opened with, so the surface with no sequence to protect shows them all.
   */
  const quantDrills = templatesForSection({
    subject: subjectFrom(unitCode),
    unitCode,
    number: sectionNumber,
  }).map((t) => quantItem({ sectionId }, t.id, quantAttempts[t.id] || 0)).filter(Boolean);
  const reseed = (templateId) => setQuantAttempts((a) => ({ ...a, [templateId]: (a[templateId] || 0) + 1 }));

  /* V018. This was a local `PREVIEW_LIMIT = 2`, a second copy of PREVIEW_LIMITS.quiz in a file that
     never mentioned it. Harmless while the server sent exactly two questions, load-bearing the
     moment V005 and V016 made it send up to FREE_QUIZ_MAX: this slice is the only thing between a
     signed-out reader and eight more questions with their `correctIndex` on them. Nothing renders
     this component in a test, so deleting the slice would fail nothing — `lib/preview-limits.test.mjs`
     therefore reads this file and asserts the cap is here and comes from the shared constant, the
     way lib/write-path.test.mjs guards the write path. */
  const displayQuestions = previewMode ? (questions || []).slice(0, PREVIEW_LIMITS.quiz) : (questions || []);
  // How many questions this student is actually being asked, which is what a score is out of.
  const quizLength = displayQuestions.length;

  // Reset state and load best score on section change
  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setBestScore(null);
    setQuantAttempts({});

    // F087. This used to require `!previewMode`, so a signed-in free student — who gets the same
    // two-question preview as a stranger — had their attempt discarded and never saw a best. Being
    // signed in did nothing, which is the opposite of what an account is for. Signed in is the
    // only condition that matters here; the preview is a smaller quiz, not a different student.
    if (user && sectionId) {
      fetch(`/api/progress/quiz?sectionId=${sectionId}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (!data || !data.attempts || data.attempts.length === 0) return;
          // Only compare like with like. A 2/2 preview and an 18/25 full attempt live in the same
          // table, and taking the max score across both would show "your best: 2" to somebody who
          // has answered eighteen correctly, or hide a perfect preview behind a longer attempt.
          const sameLength = data.attempts.filter(a => a.total === quizLength);
          if (!sameLength.length) return;
          setBestScore({ score: Math.max(...sameLength.map(a => a.score)), total: quizLength });
        })
        .catch(() => {});
    }
  }, [sectionId, user, previewMode, quizLength]);

  /* The drill survives a section with no quiz bank. This early return used to be the whole
     answer to "nothing to show"; it is now the answer to "no multiple choice", and a section
     that has a calculation still has something to do. */
  if (!questions || !questions.length) {
    return (
      <div>
        {quantDrills.map((item) => <QuantCard key={item.template} item={item} onReseed={() => reseed(item.template)} />)}
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No quiz available.</div>
      </div>
    );
  }

  function selectAnswer(qIndex, optIndex) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  }

  function handleSubmit() {
    setSubmitted(true);

    const finalScore = displayQuestions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0);

    // Saved for any signed-in student, preview included (F087). The row already records its own
    // `total`, so a two-question attempt cannot be mistaken for a full one later.
    if (user) {
      setSaving(true);
      fetch('/api/progress/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionId,
          score: finalScore,
          total: displayQuestions.length,
          answers,
        }),
      })
        .then(() => {
          if (!bestScore || finalScore > bestScore.score) {
            setBestScore({ score: finalScore, total: displayQuestions.length });
          }
        })
        .catch(() => {})
        .finally(() => setSaving(false));
    }
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
  }

  const score = submitted
    ? displayQuestions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0)
    : 0;

  const allAnswered = Object.keys(answers).length === displayQuestions.length;
  const scoreColor = submitted
    ? score >= displayQuestions.length * 0.8 ? 'var(--accent-green-light)'
    : score >= displayQuestions.length * 0.5 ? 'var(--accent-amber)'
    : 'var(--accent-red)'
    : 'var(--accent-green)';

  /* The server sends only the preview slice, so `questions.length` is the PREVIEW size, not the bank
     size, and this fell back to it — the "2 of 2" trap lib/preview-limits.js warns about. The only
     caller passes `counts.quiz` (components/StudyApp.jsx), so nothing was printing "2 of 2" in
     practice; what was wrong was the fallback standing ready to. `counts.quiz` is the only honest
     source, so when it is absent the copy below says how many were shown and claims no total. */
  const totalQuizQuestions = Number.isFinite(totalCount) ? totalCount : null;

  return (
    <div>
      {quantDrills.map((item) => <QuantCard key={item.template} item={item} onReseed={() => reseed(item.template)} />)}

      {bestScore && !submitted && (
        <div className="quiz-best-score">
          Your best: {bestScore.score}/{bestScore.total}
        </div>
      )}

      {submitted && (
        <div className="quiz-score">
          <div className="quiz-score-number" style={{ color: scoreColor }}>
            {score}/{displayQuestions.length}
          </div>
          <div className="quiz-score-label">
            {/* F087: the preview score reads like a quiz result when it is two questions out of a
                bank of 25, so "2/2" looked like mastery and "0/2" like failure. Say which it is,
                and name the real size so the number cannot be mistaken for a section score. */}
            {previewMode
              ? `${score} of ${displayQuestions.length} in the preview.${totalQuizQuestions ? ` The full quiz for this section has ${totalQuizQuestions} questions.` : ''}`
              : score === displayQuestions.length ? 'Perfect score!' :
                score >= displayQuestions.length * 0.8 ? 'Great work!' :
                score >= displayQuestions.length * 0.5 ? 'Good effort — review the explanations below.' :
                'Keep studying — review the explanations below.'}
          </div>
          {saving && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Saving...</div>}
          {/* Retry works in preview too. Refusing it made a two-question sample feel like a
              one-shot test the student had already failed. */}
          <button className="quiz-reset-btn" onClick={handleReset}>Try Again</button>
        </div>
      )}

      {displayQuestions.map((q, qIndex) => (
        <div className="quiz-question" key={qIndex}>
          <div className="quiz-question-num">Question {qIndex + 1}</div>
          <div className="quiz-question-text">{q.question}</div>
          <div className="quiz-options">
            {q.options.map((opt, optIndex) => {
              let className = 'quiz-option';
              if (submitted) {
                if (optIndex === q.correctIndex) className += ' correct';
                else if (answers[qIndex] === optIndex) className += ' incorrect';
              } else if (answers[qIndex] === optIndex) {
                className += ' selected';
              }

              return (
                <button
                  key={optIndex}
                  className={className}
                  onClick={() => selectAnswer(qIndex, optIndex)}
                >
                  <div className="quiz-option-radio" />
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
          {submitted && q.explanation && (
            <div className="quiz-explanation">{q.explanation}</div>
          )}
          {submitted && answers[qIndex] !== q.correctIndex && onAskTutor && !previewMode && (
            <button
              className="quiz-ask-tutor-btn"
              onClick={() => onAskTutor(
                `I got this quiz question wrong and need help understanding it:\n\n**Question:** ${q.question}\n**My answer:** ${q.options[answers[qIndex]]}\n**Correct answer:** ${q.options[q.correctIndex]}\n\nPlease explain why the correct answer is right and why my answer was wrong. Help me understand the underlying concept so I don't make this mistake again.`
              )}
            >
              🤖 Ask Tutor to Explain
            </button>
          )}
        </div>
      ))}

      {!submitted && (
        <button
          className="quiz-submit-btn"
          disabled={!allAnswered}
          onClick={handleSubmit}
        >
          Submit Answers
        </button>
      )}

      {/* Upgrade CTA after preview questions. This read the local literal too (V018) and it is the
          copy a student actually sees; it is now the number of questions rendered, so a section
          whose bank is smaller than the preview limit says "1 of 1" rather than claiming two. The
          total is printed only when `counts` supplied one. */}
      {previewMode && submitted && (
        <PaywallOverlay
          feature="Quiz"
          previewText={totalQuizQuestions
            ? `You've previewed ${displayQuestions.length} of ${totalQuizQuestions} questions`
            : `You've previewed ${displayQuestions.length} questions`}
        />
      )}

      {/* Post-quiz break prompt */}
      {submitted && !previewMode && (
        <div className="quiz-break-prompt">
          <div className="quiz-break-emoji">&#127881;</div>
          <div className="quiz-break-text">Nice work! Want a break?</div>
          <Link href="/fun" className="quiz-break-cta">
            <CardClub size={16} />
            Play Blackjack
          </Link>
        </div>
      )}
    </div>
  );
}

/**
 * The calculation, framed so it cannot be read as question 1 of the quiz. The heading says
 * what it is and the note says what it is not: the score below counts the multiple choice.
 */
function QuantCard({ item, onReseed }) {
  return (
    <div className="quiz-question">
      <div className="quiz-question-num">Calculation practice · {item.unit} · {item.topic}</div>
      {/* key={item.id}: the card's own contract. Without it "New figures" redrew the question
          and left the previous answers in the boxes with the previous marking under them. */}
      <CalculationItem key={item.id} item={item} onReseed={onReseed} />
      <div className="quiz-explanation">
        Marked on its own, step by step — it is not part of the quiz score below. Every time you
        ask for new figures the method stays and the numbers change.
      </div>
    </div>
  );
}
