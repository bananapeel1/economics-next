"use client";
import { useState, useRef, useEffect } from 'react';
import { classifyItems, gradeClassify, partialLine } from '@/lib/recall-widgets';
import { RecallFrame, RecallOutcome, RecallAnswer, ATTEMPTS_BEFORE_ANSWER } from './RecallFrame';

/**
 * Classify, packet 7 (W002). Two or three named groups and a bank of items in a seeded order. Tap an
 * item then a group, or a group then items; tap a placed item to send it back. Graded per item; Try
 * again locks the items that were right; the answer panel carries the content's `why` per group.
 *
 * An item can also be DRAGGED onto a group, or from a group back to the bank or into another group.
 * Pointer events, so one path serves mouse, pen and touch (phone and iPad). A press that moves less
 * than DRAG_START_PX is a tap and keeps the tap-tap behaviour above. The whole group box is a target
 * for both, not just its name: the founder found that tapping the box around the name did nothing.
 * Chips carry `touch-action: none` so a finger drags the chip instead of scrolling the page; the page
 * still scrolls from anywhere else, and a drag near the top or bottom edge scrolls it.
 *
 * This is the type for the March audit's rankings and "sort into" reorders (F057, F107): membership has
 * one right answer per item and no order, so nothing is marked wrong for a defensible sequence.
 */
const DRAG_START_PX = 8;
const EDGE_PX = 60;

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
  // { id, text, from: 'bank' | 'group', x, y, offsetX, offsetY, width, over: group index | 'bank' | null }
  const [drag, setDrag] = useState(null);
  const press = useRef(null); // the pointer that is down on a chip, before it becomes a drag
  const swallowClick = useRef(false);

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

  // ── Drag ────────────────────────────────────────────────────────────────
  function dropTargetAt(x, y) {
    const el = typeof document !== 'undefined' ? document.elementFromPoint(x, y) : null;
    const g = el?.closest?.('[data-classify-group]');
    if (g) return Number(g.getAttribute('data-classify-group'));
    if (el?.closest?.('[data-classify-bank]')) return 'bank';
    return null;
  }

  function onChipPointerDown(e, it, from) {
    if (checked || locked[it.id]) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const r = e.currentTarget.getBoundingClientRect();
    press.current = {
      pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, id: it.id, text: it.text, from,
      offsetX: e.clientX - r.left, offsetY: e.clientY - r.top, width: r.width,
    };
  }

  useEffect(() => {
    function move(e) {
      const p = press.current;
      if (!p || e.pointerId !== p.pointerId) return;
      if (!drag) {
        if (Math.hypot(e.clientX - p.startX, e.clientY - p.startY) < DRAG_START_PX) return;
        setSelectedItem(null); setSelectedGroup(null);
      }
      e.preventDefault();
      setDrag({ ...p, x: e.clientX, y: e.clientY, over: dropTargetAt(e.clientX, e.clientY) });
    }
    function up(e) {
      const p = press.current;
      if (!p || e.pointerId !== p.pointerId) return;
      press.current = null;
      if (!drag) return; // a tap: the chip's own click handler runs
      swallowClick.current = true;
      setTimeout(() => { swallowClick.current = false; }, 0);
      const target = e.type === 'pointercancel' ? null : dropTargetAt(e.clientX, e.clientY);
      if (typeof target === 'number') put(p.id, target);
      else if (target === 'bank' && p.from === 'group') handleTapPlaced(p.id);
      setDrag(null);
    }
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  });

  // While dragging near the top or bottom of the screen, scroll so a group off-screen can be reached.
  useEffect(() => {
    if (!drag) return;
    const h = window.innerHeight;
    const dy = drag.y < EDGE_PX ? -12 : drag.y > h - EDGE_PX ? 12 : 0;
    if (!dy) return;
    const t = setInterval(() => window.scrollBy(0, dy), 16);
    return () => clearInterval(t);
  }, [drag]);

  function onChipClick(fn) {
    return (e) => {
      e.stopPropagation(); // a chip inside a group box is not a tap on the box
      if (swallowClick.current) return;
      fn();
    };
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
        <p className="lm-recall-hint-text">Drag each item into its group, or tap an item and then the group. Tap a placed item to send it back.</p>
      )}

      <div className="lm-classify-groups">
        {groups.map((g, gi) => {
          const members = inGroup(gi);
          const selected = selectedGroup === gi;
          return (
            <div key={gi} data-classify-group={gi}
              className={`lm-classify-group ${selected ? 'selected' : ''} ${drag?.over === gi ? 'drop-over' : ''} ${!checked ? 'tappable' : ''}`}
              onClick={() => handleTapGroup(gi)}>
              <button type="button" className="lm-classify-group-name" aria-pressed={selected} disabled={checked}
                aria-label={`${g.name}.${selected ? ' Selected: tap items to add them.' : ' Activate, then tap items to add them.'}`}
                onClick={(e) => { e.stopPropagation(); handleTapGroup(gi); }}>
                {g.name}
              </button>
              <div className="lm-classify-members" aria-label={`Items in ${g.name}`}>
                {members.length === 0 && <span className="lm-classify-empty">{drag ? 'drop here' : selectedItem != null ? 'tap to put it here' : 'empty'}</span>}
                {members.map((it) => {
                  const r = checked ? resultOf(it) : null;
                  const isRight = (checked && r) || (!checked && locked[it.id]);
                  const isWrong = checked && r === false;
                  const interactive = !checked && !locked[it.id];
                  return (
                    <span key={it.id} role="button" tabIndex={interactive ? 0 : -1}
                      aria-label={checked ? `${it.text}: ${isRight ? 'correct.' : `wrong, it belongs in ${groups[it.group]?.name}.`}` : locked[it.id] ? `${it.text}, correct and locked.` : `${it.text}. Activate to send it back.`}
                      className={`lm-word-chip lm-classify-chip ${isRight ? 'correct' : ''} ${isWrong ? 'wrong' : ''} ${locked[it.id] && !checked ? 'locked' : ''} ${interactive ? 'draggable' : ''} ${drag?.id === it.id ? 'drag-source' : ''}`}
                      onPointerDown={(e) => onChipPointerDown(e, it, 'group')}
                      onClick={onChipClick(() => handleTapPlaced(it.id))}
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

      {!checked && (bank.length > 0 || drag?.from === 'group') && (
        <div className={`lm-word-bank ${drag?.over === 'bank' && drag.from === 'group' ? 'drop-over' : ''}`} data-classify-bank role="group" aria-label="Items to sort. Choose one, then a group.">
          {bank.map((it) => (
            <span key={it.id} role="button" tabIndex={0} aria-pressed={selectedItem === it.id} aria-label={`Sort ${it.text}`}
              className={`lm-word-chip lm-classify-chip draggable ${selectedItem === it.id ? 'selected' : ''} ${drag?.id === it.id ? 'drag-source' : ''}`}
              onPointerDown={(e) => onChipPointerDown(e, it, 'bank')}
              onClick={onChipClick(() => handleTapBankItem(it.id))}
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
      {drag && (
        <div className="lm-word-chip lm-classify-chip lm-classify-ghost" aria-hidden="true"
          style={{ left: drag.x - drag.offsetX, top: drag.y - drag.offsetY, width: drag.width }}>
          {drag.text}
        </div>
      )}
      {checked && !grade.allCorrect && showAnswer && <RecallAnswer label="The groups" entries={answerEntries} ordered={false} />}
    </RecallFrame>
  );
}
