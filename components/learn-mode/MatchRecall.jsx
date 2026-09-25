"use client";
import { useState } from 'react';
import { matchChips, gradeMatch, partialLine } from '@/lib/recall-widgets';
import { RecallFrame, RecallOutcome, RecallAnswer, ATTEMPTS_BEFORE_ANSWER } from './RecallFrame';

/**
 * Match, packet 7 (W001). The left column is fixed; the rights, plus any distractors, are a chip bank
 * in a seeded order. Tap a left item then a chip, or a chip then a left item; tap a filled slot to
 * take its chip back. Graded per pair; Try again locks the pairs that were right; the answer panel
 * carries the content's `why` per pair.
 *
 * This is the type the March audit's "Match X to Y" reorders should have been (F057, F107): a pairing
 * has one right answer per row and no order at all, so nothing is marked wrong for being defensible.
 */
export default function MatchRecall({ recall, onComplete, onSkip, showing = 'first' }) {
  const pairs = Array.isArray(recall.pairs) ? recall.pairs : [];
  const [chips] = useState(() => matchChips(recall, showing));
  const [assigned, setAssigned] = useState(() => pairs.map(() => null)); // chip id per pair
  const [locked, setLocked] = useState(() => pairs.map(() => false));
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedChip, setSelectedChip] = useState(null);
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [grade, setGrade] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const chipById = (id) => chips.find((c) => c.id === id) || null;
  const available = chips.filter((c) => !assigned.includes(c.id));

  function place(left, chipId) {
    const next = [...assigned];
    // A chip can sit in one slot only: lift it from wherever it was.
    const prev = next.indexOf(chipId);
    if (prev >= 0 && !locked[prev]) next[prev] = null;
    next[left] = chipId;
    setAssigned(next);
    setSelectedLeft(null); setSelectedChip(null);
  }

  function handleTapLeft(i) {
    if (checked || locked[i]) return;
    if (assigned[i] != null) { const next = [...assigned]; next[i] = null; setAssigned(next); setSelectedLeft(i); setSelectedChip(null); return; }
    if (selectedChip != null) { place(i, selectedChip); return; }
    setSelectedLeft(selectedLeft === i ? null : i);
  }

  function handleTapChip(id) {
    if (checked) return;
    if (selectedLeft != null) { place(selectedLeft, id); return; }
    const firstEmpty = assigned.findIndex((a, i) => a == null && !locked[i]);
    if (selectedChip === id) { setSelectedChip(null); return; }
    if (firstEmpty >= 0 && selectedChip == null && assigned.every((a, i) => a == null || locked[i]) && false) { place(firstEmpty, id); return; }
    setSelectedChip(id);
  }

  function check() {
    if (checked) return;
    const g = gradeMatch(assigned, recall, chips);
    setGrade(g);
    setChecked(true);
    setSelectedLeft(null); setSelectedChip(null);
    const next = attempts + 1;
    setAttempts(next);
    if (next === 1) onComplete?.(g.allCorrect);
    if (!g.allCorrect && next >= ATTEMPTS_BEFORE_ANSWER) setShowAnswer(true);
  }

  function retry() {
    if (!grade) return;
    const nextLocked = locked.map((l, i) => l || !!grade.results[i]);
    setLocked(nextLocked);
    setAssigned(assigned.map((a, i) => (nextLocked[i] ? a : null)));
    setChecked(false);
  }

  const allFilled = assigned.every((a) => a != null);
  const answerEntries = pairs.map((p) => ({ text: `${p.left} → ${p.right}`, why: p.why }));

  return (
    <RecallFrame label="Match" prompt={recall.prompt} showing={showing} skipped={skipped}
      onSkip={onSkip ? () => { onSkip(); setSkipped(true); } : undefined}>
      {!checked && (
        <p className="lm-recall-hint-text">Tap an item on the left, then the option that goes with it. Tap a filled slot to take the option back.</p>
      )}

      <div className="lm-match-rows" role="group" aria-label="Match each item on the left to an option.">
        {pairs.map((p, i) => {
          const chip = chipById(assigned[i]);
          const isRight = (checked && grade?.results[i]) || (!checked && locked[i]);
          const isWrong = checked && !grade?.results[i];
          const interactive = !checked && !locked[i];
          const selected = selectedLeft === i;
          return (
            <div key={i} className={`lm-match-row ${isRight ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}>
              <span className="lm-match-left">{p.left}</span>
              <span
                role="button"
                tabIndex={interactive ? 0 : -1}
                aria-pressed={selected}
                aria-label={checked
                  ? `${p.left}: ${isRight ? `matched with ${chip?.text}, correct.` : `you put ${chip?.text}; the answer is ${p.right}.`}`
                  : locked[i] ? `${p.left}: ${chip?.text}, correct and locked.`
                    : chip ? `${p.left}: ${chip.text}. Activate to take it back.` : `${p.left}: empty.${selected ? ' Selected: tap an option.' : ' Activate to select.'}`}
                className={`lm-match-slot ${chip ? 'filled' : ''} ${isRight ? 'correct' : ''} ${isWrong ? 'wrong' : ''} ${selected ? 'selected' : ''} ${locked[i] && !checked ? 'locked' : ''}`}
                onClick={() => handleTapLeft(i)}
                onKeyDown={(e) => { if (interactive && (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar')) { e.preventDefault(); handleTapLeft(i); } }}
              >
                {isWrong ? (<><s className="lm-fillin-was">{chip?.text}</s><span className="lm-fillin-answer">{p.right}</span></>) : (chip?.text || 'tap to match')}
              </span>
            </div>
          );
        })}
      </div>

      {!checked && available.length > 0 && (
        <div className="lm-word-bank" role="group" aria-label="Options. Choose one for the selected item.">
          {available.map((c) => (
            <span key={c.id} role="button" tabIndex={0} aria-pressed={selectedChip === c.id} aria-label={`Use ${c.text}`}
              className={`lm-word-chip ${selectedChip === c.id ? 'selected' : ''}`}
              onClick={() => handleTapChip(c.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); handleTapChip(c.id); } }}>
              {c.text}
            </span>
          ))}
        </div>
      )}

      {!checked ? (
        <div className="lm-recall-actions">
          <button type="button" className="lm-recall-check-btn" onClick={check} disabled={!allFilled}>Check matches</button>
        </div>
      ) : (
        <RecallOutcome allCorrect={grade.allCorrect} line={`✗ ${partialLine('match', grade.correct, pairs.length)}`}
          canRetry={!grade.allCorrect} onRetry={retry} canShowAnswer={!grade.allCorrect && !showAnswer} onShowAnswer={() => setShowAnswer(true)} />
      )}
      {checked && !grade.allCorrect && showAnswer && <RecallAnswer label="The pairs" entries={answerEntries} ordered={false} />}
    </RecallFrame>
  );
}
