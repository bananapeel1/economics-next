'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { trackFunnel } from '@/lib/funnel';
import { decidePrompt, markActiveDay, recordOutcome } from '@/lib/feedback/prompt-policy';
import { REASONS, TOPICS, bandFor } from '@/lib/feedback/taxonomy';
import {
  MOMENT_EVENT, OPEN_EVENT, readPromptState, writePromptState, visitStartedAt, isFocusLocked, isDesktop, pageContext, postJson, failureMessage,
} from '@/lib/feedback/client';

/**
 * The feedback card. Mounted once, in app/layout.js beside <AnalyticsEvents />, and renders
 * nothing until something asks for it:
 *
 *   - a MOMENT (signalMoment in lib/feedback/client.js) that clears lib/feedback/prompt-policy.js,
 *     which asks one question about the thing just finished. Computers only: a phone or tablet never
 *     gets the card unprompted;
 *   - "Send feedback" (openFeedback), which the student chose, so no policy applies, on any device.
 *
 * Never modal, never takes focus. A tapped rating counts as an answer even if the student closes
 * without writing anything.
 */

const QUESTIONS = {
  // The full title, quoted: short titles abbreviate ("Gov. Intervention") and a few full ones are long.
  section_complete: (title) => (title ? `How useful was “${title}” for your revision?` : 'How useful was this topic for your revision?'),
  quiz_complete: () => 'How were those quiz questions?',
  practice_complete: () => 'How was that practice set?',
  flashcards_complete: () => 'How were those flashcards?',
};

// Keep this line true. It is the whole "we are improving" claim, so it must never promise a pace
// or a result the programme does not keep. Phase 2 swaps it for a live count of fixes.
const EYEBROW = 'Help shape Revvy';

export default function FeedbackPrompt() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [card, setCard] = useState(null); // { source: 'moment'|'launcher', moment?, sectionId?, title? }
  const [phase, setPhase] = useState('ask'); // ask | sending | sent | failed
  const [rating, setRating] = useState(null);
  const [reasons, setReasons] = useState([]);
  const [topic, setTopic] = useState(null);
  const [message, setMessage] = useState('');
  const [failStatus, setFailStatus] = useState(null);
  const touched = useRef(false);
  const lastPath = useRef(pathname);

  // Every page view: start the visit clock and count today as a day this student used Revvy.
  useEffect(() => {
    visitStartedAt();
    writePromptState(markActiveDay(readPromptState(), Date.now()));
  }, []);

  const open = useCallback((next) => {
    setPhase('ask'); setRating(null); setReasons([]); setTopic(null); setMessage('');
    touched.current = false;
    setCard(next);
  }, []);

  useEffect(() => {
    let timer;
    const onMoment = async (e) => {
      const { moment, ...ctx } = e.detail || {};
      if (process.env.NEXT_PUBLIC_FEEDBACK_PROMPT === 'off') return;
      const input = {
        now: Date.now(),
        moment,
        desktop: isDesktop(),
        pathname: window.location.pathname,
        sessionStartedAt: visitStartedAt(),
        focusLocked: isFocusLocked(),
        state: readPromptState(),
      };
      if (!decidePrompt(input).show) return;
      if (user) {
        const res = await fetch('/api/feedback', { cache: 'no-store' }).catch(() => null);
        const last = res?.ok ? await res.json().catch(() => null) : null;
        const serverLastSubmittedAt = last?.lastSubmittedAt ? Date.parse(last.lastSubmittedAt) : null;
        if (!decidePrompt({ ...input, serverLastSubmittedAt }).show) return;
      }
      // Let the completion screen land before anything else moves.
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (isFocusLocked()) return;
        open({ source: 'moment', moment, ...ctx });
        writePromptState(recordOutcome(readPromptState(), 'shown', Date.now()));
        trackFunnel('feedback_prompt_shown', { sectionId: ctx.sectionId ?? null, moment });
      }, 1200);
    };
    const onOpen = (e) => open({ source: 'launcher', ...(e.detail || {}) });
    window.addEventListener(MOMENT_EVENT, onMoment);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener(MOMENT_EVENT, onMoment);
      window.removeEventListener(OPEN_EVENT, onOpen);
      clearTimeout(timer);
    };
  }, [user, open]);

  const send = useCallback(async ({ quiet = false } = {}) => {
    if (!card) return;
    const body = card.source === 'moment'
      ? { source: 'moment', moment: card.moment, sectionId: card.sectionId ?? null, rating, reasons, message: message.trim() || null }
      : { source: 'launcher', topic, sectionId: card.sectionId ?? null, message: message.trim() };
    if (!quiet) setPhase('sending');
    const res = await postJson('/api/feedback', { ...body, ...pageContext() }, { keepalive: quiet });
    if (card.source === 'moment' && res.ok) writePromptState(recordOutcome(readPromptState(), 'submitted', Date.now()));
    if (res.ok) trackFunnel('feedback_sent', { sectionId: card.sectionId ?? null, source: card.source, rating: rating ?? null });
    if (!quiet) { setFailStatus(res.ok ? null : res.status); setPhase(res.ok ? 'sent' : 'failed'); }
  }, [card, rating, reasons, topic, message]);

  const close = useCallback((outcome) => {
    if (card?.source === 'moment' && (phase === 'ask' || phase === 'failed')) {
      if (rating) {
        send({ quiet: true }); // the tap was the answer
      } else {
        writePromptState(recordOutcome(readPromptState(), outcome, Date.now()));
        trackFunnel(outcome === 'dismissed' ? 'feedback_prompt_dismissed' : 'feedback_prompt_ignored', { moment: card.moment });
      }
    }
    setCard(null);
  }, [card, phase, rating, send]);

  // Moving on without touching it is "ignored", a short cooldown. Once they have started, the card
  // stays across navigation rather than throw away what they wrote.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    if (card && !touched.current) close('ignored');
  }, [pathname, card, close]);

  // A thank-you with nobody reading it can go; one with keyboard focus inside waits to be closed.
  const ref = useRef(null);
  useEffect(() => {
    if (phase !== 'sent') return;
    const t = setTimeout(() => {
      if (!ref.current?.contains(document.activeElement)) setCard(null);
    }, 4000);
    return () => clearTimeout(t);
  }, [phase]);

  if (!card) return null;
  const isMoment = card.source === 'moment';
  const band = rating ? bandFor(rating) : null;
  const canSend = isMoment ? Boolean(rating) : Boolean(topic && message.trim());

  return (
    // A non-modal dialog: it asks a question, and every engine's key handler already ignores keys
    // from inside [role="dialog"], so Enter on Send sends instead of advancing the question behind.
    <section
      ref={ref}
      className="fb-card"
      role="dialog"
      aria-labelledby="fb-title"
      onPointerDownCapture={() => { touched.current = true; }}
      onFocusCapture={() => { touched.current = true; }}
    >
      {phase === 'sent' ? (
        <div className="fb-head" role="status">
          <p className="fb-title" id="fb-title">Thanks. This goes into what we fix next.</p>
          <button type="button" className="fb-close" aria-label="Close" onClick={() => setCard(null)}>×</button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); if (canSend) send(); }}>
          <div className="fb-head">
            <div>
              <p className="fb-eyebrow">{EYEBROW}</p>
              <h2 className="fb-title" id="fb-title">
                {isMoment ? QUESTIONS[card.moment]?.(card.title) : 'What should we fix or add?'}
              </h2>
            </div>
            <button type="button" className="fb-close" aria-label={isMoment ? 'Not now' : 'Close'} onClick={() => close('dismissed')}>×</button>
          </div>

          {isMoment ? (
            <fieldset className="fb-scale">
              <legend className="fb-sr">From 1, not useful, to 5, very useful</legend>
              <div className="fb-scale-row">
                {[1, 2, 3, 4, 5].map((n) => (
                  <label key={n} className="fb-scale-opt">
                    <input type="radio" name="fb-rating" value={n} checked={rating === n} onChange={() => { setRating(n); setReasons([]); }} />
                    <span>{n}</span>
                  </label>
                ))}
              </div>
              <div className="fb-scale-ends" aria-hidden="true"><span>Not useful</span><span>Very useful</span></div>
            </fieldset>
          ) : (
            <fieldset className="fb-chips">
              <legend className="fb-sr">What is it about?</legend>
              {TOPICS.map(([id, label]) => (
                <label key={id} className="fb-chip">
                  <input type="radio" name="fb-topic" value={id} checked={topic === id} onChange={() => setTopic(id)} />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>
          )}

          {(rating || !isMoment) && (
            <>
              {isMoment && (
                <fieldset className="fb-chips">
                  <legend className="fb-sr">What stood out? Choose any</legend>
                  {REASONS[band].map(([id, label]) => (
                    <label key={id} className="fb-chip">
                      <input
                        type="checkbox"
                        checked={reasons.includes(id)}
                        onChange={(e) => setReasons((r) => (e.target.checked ? [...r, id] : r.filter((x) => x !== id)))}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </fieldset>
              )}
              {topic === 'content' && (
                <p className="fb-hint">Found a mistake in a question? “Report a problem” under it tells us exactly which one.</p>
              )}
              <label className="fb-label" htmlFor="fb-message">
                {isMoment ? 'Anything we should fix or add?' : 'Tell us more'}
                {isMoment && <span className="fb-optional">Optional</span>}
              </label>
              <textarea id="fb-message" className="fb-input" rows={3} maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} />
              <p className="fb-fineprint">Please leave out personal details.</p>
              {phase === 'failed' && <p className="fb-error" role="alert">{failureMessage(failStatus)}</p>}
              <div className="fb-actions">
                <button type="button" className="fb-ghost" onClick={() => close('dismissed')}>{isMoment ? 'Not now' : 'Cancel'}</button>
                <button type="submit" className="fb-send" disabled={!canSend || phase === 'sending'}>
                  {phase === 'sending' ? 'Sending…' : 'Send'}
                </button>
              </div>
            </>
          )}
        </form>
      )}
    </section>
  );
}
