/**
 * Server-written funnel events for Learn Mode (audit/PLAN.md, packet 1).
 *
 * Why this exists: the only "progress" signal the app had was a furthest_step row written whenever a
 * section was open on any tab, so "75% never passed step 0" could not distinguish a student who bounced
 * off the pre-test from one who read the Notes tab. These events are written by explicit actions only,
 * for signed-in AND anonymous students (anonymous ones get a stable per-browser id), so the step-0 pass
 * rate can be measured for everyone.
 *
 * Transport: POST /api/events, fire-and-forget, keepalive so a tab close does not drop the last event.
 * The same event is mirrored to the page-analytics provider (lib/analytics.js) if one is installed.
 */
import { track as analyticsTrack } from './analytics';

export const FUNNEL_EVENTS = new Set([
  'learn_open',            // Learn Mode mounted with content for a section
  'pretest_offered',       // the optional pre-test offer was shown (step 0, first visit)
  'pretest_started',       // student chose "Test yourself first"
  'pretest_submitted',     // props: score, total
  'pretest_skipped',       // skipped from inside the pre-test
  'pretest_declined',      // "Just teach me"
  'step_view',             // a step rendered: step, totalSteps
  'step_next',             // student pressed Next on `step` (the true "passed step N" signal)
  'section_complete',      // "Complete topic" pressed
  'progress_write_failed', // a server progress write returned non-OK: props.status
  'cancel_reason',         // props: reason, comment (from the cancel modal)
]);

const ANON_KEY = 'revvy_anon_id';

export function getAnonId() {
  if (typeof window === 'undefined') return null;
  try {
    let id = localStorage.getItem(ANON_KEY);
    if (!id) {
      id = (crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`);
      localStorage.setItem(ANON_KEY, id);
    }
    return id;
  } catch {
    return null; // storage blocked: events still send, just without a stable anon id
  }
}

// Effect-driven events (learn_open, step_view, pretest_offered) can fire twice for one real occurrence:
// React StrictMode double-invokes effects in development, and a re-render can re-run an effect whose
// inputs did not meaningfully change. Drop an identical (event, section, step) within a short window.
const recent = new Map();
const DEDUPE_MS = 1500;
function isDuplicate(event, sectionId, step) {
  const key = `${event}|${sectionId ?? ''}|${step ?? ''}`;
  const now = Date.now();
  const last = recent.get(key);
  recent.set(key, now);
  if (recent.size > 200) for (const [k, t] of recent) if (now - t > DEDUPE_MS) recent.delete(k);
  return last != null && now - last < DEDUPE_MS;
}

/**
 * trackFunnel('step_next', { sectionId, step, totalSteps, ...anythingElse })
 * Never throws, never blocks the UI.
 */
export function trackFunnel(event, props = {}) {
  if (typeof window === 'undefined') return;
  if (!FUNNEL_EVENTS.has(event)) {
    if (process.env.NODE_ENV !== 'production') console.warn('[funnel] unknown event', event);
    return;
  }
  const { sectionId = null, step = null, totalSteps = null, ...rest } = props || {};
  if (isDuplicate(event, sectionId, step)) return;
  const body = JSON.stringify({
    anonId: getAnonId(),
    events: [{
      event,
      sectionId,
      step: Number.isFinite(step) ? step : null,
      totalSteps: Number.isFinite(totalSteps) ? totalSteps : null,
      props: Object.keys(rest).length ? rest : null,
      clientTs: new Date().toISOString(),
      tzOffsetMin: -new Date().getTimezoneOffset(),
      path: window.location.pathname,
    }],
  });
  try {
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {}
  try { analyticsTrack(event, { sectionId, step, totalSteps, ...rest }); } catch {}
}
