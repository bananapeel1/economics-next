"use client";
import { useState } from 'react';
import { classifyItems, gradeClassify, partialLine } from '@/lib/recall-widgets';
import { RecallFrame, RecallOutcome, RecallAnswer, ATTEMPTS_BEFORE_ANSWER } from './RecallFrame';

/**
 * Classify, packet 7 (W002). Two or three named groups and a bank of items in a seeded order. Tap an
 * item then a group, or a group then items; tap a placed item to send it back. Graded per item; Try
 * again locks the items that were right; the answer panel carries the content's `why` per group.
 *
 * This is the type for the March audit's rankings and "sort into" reorders (F057, F107): membership has
 * one right answer per item and no order, so nothing is marked wrong for a defensible sequence.
 */
export default function ClassifyRecall({ recall, onComplete, onSkip, showing = 'first' }) {
  const groups = Array.isArray(recall.groups) ? recall.groups : [];
  const [items] = useState(() => classifyItems(recall, showing));
  const [placed, setPlaced] = useState({}); // item id -> group index
  const [locked, setLocked] = useState({}); // item id -> true
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [grade, setGrade] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const bank = items.filter((it) => placed[it.id] == null);
  const inGroup = (gi) => items.filter((it) => placed[it.id] === gi);
  const resultOf = (it) => (grade ? grade.results[items.indexOf(it)] : null);

  function put(itemId, gi) {
    setPlaced((p) => ({ ...p, [itemId]: gi }));
    setSelectedItem(null);
  }
  function handleTapBankItem(id) {
    if (checked) return;
    if (selectedGroup != null) { put(id, selectedGroup); return; }
    setSelectedItem(selectedItem === id ? null : id);
  }
  function handleTapGroup(gi) {
    if (checked) return;
    if (selectedItem != null) { put(selectedItem, gi); return; }
    setSelectedGroup(selectedGroup === gi ? null : gi);
  }
  function handleTapPlaced(id) {
    if (checked || locked[id]) return;
    setPlaced((p) => { const n = { ...p }; delete n[id]; return n; });
    setSelectedItem(null);
  }

  function check() {
    if (checked) return;
    const g = gradeClassify(placed, items);
    setGrade(g);
    setChecked(true);
    setSelectedItem(null); setSelectedGroup(null);
    const next = attempts + 1;
    setAttempts(next);
    if (next === 1) onComplete?.(g.allCorrect);
    if (!g.allCorrect && next >= ATTEMPTS_BEFORE_ANSWER) setShowAnswer(true);
  }

  function retry() {
    if (!grade) return;
    const nextLocked = { ...locked };
    const nextPlaced = {};
    items.forEach((it, i) => { if (grade.results[i]) { nextLocked[it.id] = true; nextPlaced[it.id] = placed[it.id]; } });
    setLocked(nextLocked);
    setPlaced(nextPlaced);
    setChecked(false);
  }

  const allPlaced = bank.length === 0;
  const answerEntries = groups.map((g) => ({ text: `${g.name}: ${(g.items || []).join(', ')}`, why: g.why }));

  return (
    <RecallFrame label="Sort" prompt={recall.prompt} showing={showing} skipped={skipped}
      onSkip={onSkip ? () => { onSkip(); setSkipped(true); } : undefined}>
      {!checked && (
        <p className="lm-recall-hint-text">Tap an item, then the group it belongs to. Tap a placed item to send it back.</p>
      )}

      <div className="lm-classify-groups">
        {groups.map((g, gi) => {
          const members = inGroup(gi);
          const selected = selectedGroup === gi;
          return (
            <div key={gi} className={`lm-classify-group ${selected ? 'selected' : ''}`}>
              <button type="button" className="lm-classify-group-name" aria-pressed={selected} disabled={checked}
                aria-label={`${g.name}.${selected ? ' Selected: tap items to add them.' : ' Activate, then tap items to add them.'}`}
                onClick={() => handleTapGroup(gi)}>
                {g.name}
              </button>
              <div className="lm-classify-members" aria-label={`Items in ${g.name}`}>
                {members.length === 0 && <span className="lm-classify-empty">empty</span>}
                {members.map((it) => {
                  const r = checked ? resultOf(it) : null;
                  const isRight = (checked && r) || (!checked && locked[it.id]);
                  const isWrong = checked && r === false;
                  const interactive = !checked && !locked[it.id];
                  return (
                    <span key={it.id} role="button" tabIndex={interactive ? 0 : -1}
                      aria-label={checked ? `${it.text}: ${isRight ? 'correct.' : `wrong, it belongs in ${groups[it.group]?.name}.`}` : locked[it.id] ? `${it.text}, correct and locked.` : `${it.text}. Activate to send it back.`}
                      className={`lm-word-chip lm-classify-chip ${isRight ? 'correct' : ''} ${isWrong ? 'wrong' : ''} ${locked[it.id] && !checked ? 'locked' : ''}`}
                      onClick={() => handleTapPlaced(it.id)}
                      onKeyDown={(e) => { if (interactive && (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar')) { e.preventDefault(); handleTapPlaced(it.id); } }}>
                      {it.text}{isWrong && <span className="lm-classify-home"> → {groups[it.group]?.name}</span>}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {!checked && bank.length > 0 && (
        <div className="lm-word-bank" role="group" aria-label="Items to sort. Choose one, then a group.">
          {bank.map((it) => (
            <span key={it.id} role="button" tabIndex={0} aria-pressed={selectedItem === it.id} aria-label={`Sort ${it.text}`}
              className={`lm-word-chip lm-classify-chip ${selectedItem === it.id ? 'selected' : ''}`}
              onClick={() => handleTapBankItem(it.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); handleTapBankItem(it.id); } }}>
              {it.text}
            </span>
          ))}
        </div>
      )}

      {!checked ? (
        <div className="lm-recall-actions">
          <button type="button" className="lm-recall-check-btn" onClick={check} disabled={!allPlaced}>Check groups</button>
        </div>
      ) : (
        <RecallOutcome allCorrect={grade.allCorrect} line={`✗ ${partialLine('classify', grade.correct, items.length)}`}
          canRetry={!grade.allCorrect} onRetry={retry} canShowAnswer={!grade.allCorrect && !showAnswer} onShowAnswer={() => setShowAnswer(true)} />
      )}
      {checked && !grade.allCorrect && showAnswer && <RecallAnswer label="The groups" entries={answerEntries} ordered={false} />}
    </RecallFrame>
  );
}
