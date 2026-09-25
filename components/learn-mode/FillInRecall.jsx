"use client";
import { useState } from 'react';
import { parseFillinTemplate, fillinChips, gradeFillin, displayHint, partialLine } from '@/lib/recall-widgets';
import { RecallFrame, RecallOutcome, ATTEMPTS_BEFORE_ANSWER } from './RecallFrame';

/**
 * Fill in the blanks, packet 7.
 *
 * The template is parsed into text and blank segments with a running blank index, so a line with two
 * blanks or `___ ___` renders whole (F051, F112). The blank count comes from the template: answers
 * beyond it are spare chips, blanks beyond the answers are inert, and Check needs only the live
 * blanks, so a mismatched recall is completable (F050). Chips are tracked by index, never by text
 * (F106). The bank is never a closed set: authored distractors, or two drawn from the section's other
 * fill-in answers (`pool`), sit among the chips (F054). Letter-prefix hints never reach the screen.
 *
 * F060: tap a blank to target it, tap a chip to fill the targeted (else the first empty) blank, tap a
 * filled blank to return its chip. No drag-and-drop. F063: after Check a wrong blank shows what the
 * student put, struck through, with the answer beside it; there is no separate answer strip.
 */
export default function FillInRecall({ recall, onComplete, onSkip, showing = 'first', pool = [] }) {
  const [parsed] = useState(() => parseFillinTemplate(recall.template));
  const [chips] = useState(() => fillinChips(recall, pool, showing));
  const answers = Array.isArray(recall.answers) ? recall.answers.map(String) : [];
  const live = Math.min(parsed.blanks, answers.length);

  const [placed, setPlaced] = useState(() => Array.from({ length: parsed.blanks }, () => null)); // chip id per blank
  const [locked, setLocked] = useState(() => Array.from({ length: parsed.blanks }, () => false));
  const [target, setTarget] = useState(null);
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [grade, setGrade] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const chipById = (id) => chips.find((c) => c.id === id) || null;
  const wordAt = (b) => chipById(placed[b])?.word ?? null;
  const availableChips = chips.filter((c) => !placed.includes(c.id));
  const firstEmpty = (from = 0) => { for (let i = from; i < live; i += 1) if (placed[i] == null && !locked[i]) return i; for (let i = 0; i < from; i += 1) if (placed[i] == null && !locked[i]) return i; return -1; };

  function handleTapChip(chipId) {
    if (checked) return;
    const b = target != null && placed[target] == null && !locked[target] ? target : firstEmpty();
    if (b < 0) return;
    const next = [...placed]; next[b] = chipId; setPlaced(next);
    const following = (() => { for (let i = b + 1; i < live; i += 1) if (next[i] == null && !locked[i]) return i; return null; })();
    setTarget(following);
  }

  function handleTapBlank(b) {
    if (checked || b >= live || locked[b]) return;
    if (placed[b] != null) { const next = [...placed]; next[b] = null; setPlaced(next); setTarget(b); return; }
    setTarget(target === b ? null : b);
  }

  function check() {
    if (checked) return;
    const g = gradeFillin(placed.slice(0, live).map((_, i) => wordAt(i)), answers);
    setGrade(g);
    setChecked(true);
    setTarget(null);
    const next = attempts + 1;
    setAttempts(next);
    if (next === 1) onComplete?.(g.allCorrect);
    if (!g.allCorrect && next >= ATTEMPTS_BEFORE_ANSWER) setShowAnswer(true);
  }

  function retry() {
    if (!grade) return;
    const nextLocked = locked.map((l, i) => l || !!grade.results[i]);
    setLocked(nextLocked);
    setPlaced(placed.map((p, i) => (nextLocked[i] ? p : null)));
    setChecked(false);
    setTarget(firstEmptyIn(nextLocked));
  }
  function firstEmptyIn(lockedNow) { for (let i = 0; i < live; i += 1) if (!lockedNow[i]) return i; return null; }

  const allFilled = placed.slice(0, live).every((p) => p != null);
  const hints = Array.isArray(recall.hints) ? recall.hints : null;

  return (
    <RecallFrame label="Fill in the Blanks" prompt={recall.prompt} showing={showing} skipped={skipped}
      onSkip={onSkip ? () => { onSkip(); setSkipped(true); } : undefined}>
      {!checked && (
        <p className="lm-recall-hint-text">Tap a blank, then tap a word. Tap a filled blank to take the word back.</p>
      )}

      <div className="lm-fillin-chain">
        {parsed.lines.map((line, li) => {
          const blanksHere = line.segments.filter((s) => 'blank' in s).map((s) => s.blank);
          const lineRight = checked && blanksHere.length > 0 && blanksHere.every((b) => b >= live || grade?.results[b]);
          const lineWrong = checked && blanksHere.some((b) => b < live && !grade?.results[b]);
          return (
            <div key={li} className={`lm-fillin-step ${lineRight ? 'correct' : ''} ${lineWrong ? 'wrong' : ''}`}>
              {line.segments.map((seg, si) => {
                if ('text' in seg) return <span key={si}>{seg.text}</span>;
                const b = seg.blank;
                // A blank with no answer behind it (the template and the answers disagree, F050). It is
                // drawn as text, not as a box, so it does not read as a question the student failed to
                // answer; the note under the chain says why. The section packet rewrites the content.
                if (b >= live) return <span key={si} className="lm-fillin-blank-inert" title="This blank is still being written and is not checked">___</span>;
                const word = wordAt(b);
                const isRight = (checked && grade?.results[b]) || (!checked && locked[b]);
                const isWrong = checked && !grade?.results[b];
                const isTarget = !checked && target === b && !locked[b];
                const interactive = !checked && !locked[b];
                const label = checked
                  ? `Blank ${b + 1}. ${isRight ? `Correct, ${word}.` : `Wrong, you put ${word}; the answer is ${answers[b]}.`}`
                  : locked[b]
                    ? `Blank ${b + 1}, ${word}, correct and locked.`
                    : word
                      ? `Blank ${b + 1}, filled with ${word}. Activate to take it back.`
                      : `Blank ${b + 1}, empty.${isTarget ? ' Selected: tap a word to fill it.' : ' Activate to select it.'}`;
                return (
                  <span
                    key={si}
                    role="button"
                    tabIndex={interactive ? 0 : -1}
                    aria-label={label}
                    aria-pressed={isTarget}
                    className={`lm-fillin-blank ${word ? 'filled' : ''} ${isRight ? 'correct' : ''} ${isWrong ? 'wrong' : ''} ${isTarget ? 'selected' : ''} ${locked[b] && !checked ? 'locked' : ''}`}
                    onClick={() => handleTapBlank(b)}
                    onKeyDown={(e) => {
                      if (!interactive) return;
                      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); handleTapBlank(b); }
                    }}
                  >
                    {isWrong ? (
                      <>
                        <s className="lm-fillin-was">{word}</s>
                        <span className="lm-fillin-answer">{answers[b]}</span>
                      </>
                    ) : (word || '___')}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      {parsed.blanks > live && (
        <p className="lm-fillin-note" role="note">
          {parsed.blanks - live === 1 ? 'One blank in this exercise' : `${parsed.blanks - live} blanks in this exercise`} still being written and not checked yet.
        </p>
      )}

      {showHint && !checked && hints && (
        <ul className="lm-fillin-hints">
          {answers.slice(0, live).map((a, i) => (
            <li key={i}><span className="lm-fillin-hint-num">Blank {i + 1}:</span> {displayHint(hints[i], a)}</li>
          ))}
        </ul>
      )}

      {!checked && availableChips.length > 0 && (
        <div className="lm-word-bank" role="group" aria-label="Word bank. Choose a word for the selected blank.">
          {availableChips.map((chip) => (
            <span
              key={chip.id}
              role="button"
              tabIndex={0}
              aria-label={`Use the word ${chip.word}`}
              className="lm-word-chip"
              onClick={() => handleTapChip(chip.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); handleTapChip(chip.id); }
              }}
            >
              {chip.word}
            </span>
          ))}
        </div>
      )}

      {!checked ? (
        <div className="lm-recall-actions">
          {!showHint && hints && <button type="button" className="lm-recall-hint-btn" onClick={() => setShowHint(true)}>Show hints</button>}
          <button type="button" className="lm-recall-check-btn" onClick={check} disabled={!allFilled}>Check answers</button>
        </div>
      ) : (
        <RecallOutcome
          allCorrect={grade.allCorrect}
          line={`${partialLine('fillin', grade.correct, live)}`}
          doneLine={parsed.blanks > live ? `✓ ${live} of ${live} right` : '✓ All correct!'}
          canRetry={!grade.allCorrect}
          onRetry={retry}
          canShowAnswer={false}
        />
      )}
      {/* F063: the answers are already shown beside each wrong blank; a separate strip would repeat them. */}
      {checked && !grade.allCorrect && showAnswer && null}
    </RecallFrame>
  );
}
