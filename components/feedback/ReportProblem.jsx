'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { trackFunnel } from '@/lib/funnel';
import { useClientValue } from '@/lib/use-client-storage';
import { categoriesFor, NOTE_PROMPTS, SURFACES } from '@/lib/feedback/taxonomy';
import { pageContext, postJson, describeDevice, wasReported, markReported, failureMessage } from '@/lib/feedback/client';

/**
 * "Report a problem" for one item: a quiet text button, and a native <dialog> the student opens.
 *
 * <dialog>.showModal() is used because this app has no modal primitive to share (CancelOfferModal
 * has no Escape or focus handling) and the platform's gives all of it: the top layer (so the sheet
 * escapes .content-header's `will-change: transform`), Escape, an inert page behind it, and focus
 * returned to the button on close.
 *
 * Icon only (founder's call, 25 Sep 2026), so it stays out of the way of the question. It carries its
 * name for screen readers and as a hover tooltip, and it is an alert circle, not a flag: a flag means
 * "come back to this question" in every exam tool these students use. After sending, it becomes a tick.
 *
 * target = {
 *   surface:   one of SURFACES in lib/feedback/taxonomy.js
 *   sectionId: 'supply'
 *   itemId:    the item's stored id (q.id, card.id, diagram.id, sub.id, recall.id); omit for notes
 *   label:     how a student would name it: 'Question 7 of 25'
 *   rendered:  { stem, scenario, chapterTitle }  what is on screen now
 *   notes:     { chapterIndex, chapterTitle }    notes only
 *   answer:    { chosen, marked, correct, revealed }  option TEXT, not indices (options are shuffled)
 *   questionIndex, step: debugging only
 * }
 * onOpenChange(open): lets a timed parent pause (QuickFireDrill advances after 1.5 s).
 */
export default function ReportProblem({ target, onOpenChange, className = '' }) {
  const { user } = useAuth();
  const dialogRef = useRef(null);
  const uid = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | sending | sent | failed
  const [failStatus, setFailStatus] = useState(null);
  const [category, setCategory] = useState(null);
  const [note, setNote] = useState('');
  const key = target.itemId || `${target.sectionId}:${target.surface}:${target.notes?.chapterTitle ?? target.rendered?.stem ?? ''}`;
  const [reported, setReported] = useClientValue(() => wasReported(key), false, [key]);

  const revealed = target.answer?.revealed !== false;
  const choices = categoriesFor(target.surface, { revealed });
  const noun = SURFACES[target.surface]?.label ?? 'item';

  // The engines underneath listen on the document: QuestionCard answers on a-d, FlashcardCard
  // flips on Space and Enter and skips on S. Keys pressed in here stop at the dialog. (A React
  // onKeyDown here would not fire either, so none is used; Escape is the dialog's own.)
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return undefined;
    const stop = (e) => e.stopPropagation();
    el.addEventListener('keydown', stop);
    el.addEventListener('keyup', stop);
    return () => { el.removeEventListener('keydown', stop); el.removeEventListener('keyup', stop); };
  }, []);

  // showModal() after the body has rendered, so the dialog moves focus to the first option rather
  // than to an empty box.
  useEffect(() => {
    const el = dialogRef.current;
    if (isOpen && el && !el.open) el.showModal();
  }, [isOpen]);

  function openSheet(e) {
    e.stopPropagation(); // FlashcardsTab flips the card on any click inside it
    setPhase('idle');
    setCategory(null);
    setNote('');
    setIsOpen(true);
    onOpenChange?.(true);
    trackFunnel('report_opened', { sectionId: target.sectionId, surface: target.surface });
  }

  function closeSheet() {
    dialogRef.current?.close();
  }

  async function submit(e) {
    e.preventDefault();
    if (!category || phase === 'sending') return;
    setPhase('sending');
    const res = await postJson('/api/report', {
      surface: target.surface,
      category,
      note: note.trim() || null,
      sectionId: target.sectionId,
      itemId: target.itemId ?? null,
      questionIndex: target.questionIndex ?? null,
      step: target.step ?? null,
      rendered: target.rendered ?? null,
      notes: target.notes ?? null,
      answer: target.answer ?? null,
      ...pageContext(),
    });
    if (res.ok) {
      setPhase('sent');
      markReported(key);
      setReported(true);
      trackFunnel('report_sent', { sectionId: target.sectionId, surface: target.surface, category });
      setTimeout(closeSheet, 1800);
    } else {
      setFailStatus(res.status);
      setPhase('failed');
    }
  }

  const stem = target.rendered?.stem;
  return (
    <>
      <button
        type="button"
        className={`rp-trigger ${className}`.trim()}
        onClick={openSheet}
        aria-haspopup="dialog"
        aria-label={reported ? 'Reported. Report another problem' : 'Report a problem'}
        title={reported ? 'Reported. Report another problem' : 'Report a problem'}
        data-reported={reported ? 'true' : undefined}
      >
        {reported ? (
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.25 8.25l1.9 1.9 3.6-3.9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 4.75v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="11.25" r="0.9" fill="currentColor" />
          </svg>
        )}
      </button>

      <dialog
        ref={dialogRef}
        role="dialog"
        className="rp-dialog"
        aria-labelledby={`${uid}-title`}
        onClose={() => { setIsOpen(false); onOpenChange?.(false); }}
        onClick={(e) => {
          e.stopPropagation();
          // A click on the backdrop lands on the <dialog> itself. Close only if nothing is written.
          if (e.target === dialogRef.current && !note.trim()) closeSheet();
        }}
      >
        {/* The body renders only while open: nothing in it can differ between the server's HTML
            and the browser's (F118), and a 25-question quiz does not carry 25 hidden forms. */}
        {!isOpen ? null : phase === 'sent' ? (
          <div className="rp-sent" role="status">
            <p className="rp-title">Thanks. It’s on our list.</p>
            <p className="rp-sub">
              Every report is checked against the Edexcel IAL specification before anything changes.
            </p>
          </div>
        ) : (
          <form className="rp-form" onSubmit={submit}>
            <div>
              <h2 className="rp-title" id={`${uid}-title`}>What’s wrong with this {noun}?</h2>
              {target.label && <p className="rp-sub">{target.label}</p>}
            </div>

            <fieldset className="rp-options">
              <legend className="fb-sr">The problem</legend>
              {choices.map((c) => (
                <label key={c.id} className="rp-option">
                  <input type="radio" name={`${uid}-category`} value={c.id} checked={category === c.id} onChange={() => setCategory(c.id)} />
                  <span>{c.label}</span>
                </label>
              ))}
            </fieldset>

            <div className="rp-field">
              <label className="fb-label" htmlFor={`${uid}-note`}>
                Add detail <span className="fb-optional">Optional</span>
              </label>
              <textarea
                id={`${uid}-note`}
                className="fb-input"
                rows={3}
                maxLength={1000}
                placeholder={category ? NOTE_PROMPTS[category] : 'Choose a problem first'}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <details className="rp-context">
              <summary>What gets sent</summary>
              <dl>
                <dt>This {noun}</dt>
                <dd>{[target.label, stem && stem !== target.label && `“${stem.length > 90 ? `${stem.slice(0, 90)}…` : stem}”`].filter(Boolean).join(' · ') || target.sectionId}</dd>
                {target.rendered?.scenario && (<><dt>Showing</dt><dd>{target.rendered.scenario}</dd></>)}
                {target.answer?.chosen && (<><dt>Your answer</dt><dd>{target.answer.chosen}</dd></>)}
                {revealed && target.answer?.marked && (<><dt>Marked correct</dt><dd>{target.answer.marked}</dd></>)}
                <dt>Page</dt>
                <dd>{window.location.pathname}</dd>
                <dt>Device</dt>
                <dd>{describeDevice()}</dd>
                <dt>You</dt>
                <dd>{user ? 'Your account' : 'An anonymous ID for this browser'}</dd>
              </dl>
            </details>

            {phase === 'failed' && <p className="fb-error" role="alert">{failureMessage(failStatus, { kept: true })}</p>}

            <div className="rp-actions">
              <button type="button" className="fb-ghost" onClick={closeSheet}>Cancel</button>
              <button type="submit" className="fb-send" disabled={!category || phase === 'sending'}>
                {phase === 'sending' ? 'Sending…' : 'Send report'}
              </button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}
