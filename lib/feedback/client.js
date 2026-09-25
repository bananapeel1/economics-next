/**
 * Browser half of feedback and reports: the moment signal, the per-browser prompt record, and the
 * context every submission carries. Never throws; storage can be blocked in a private window or
 * evicted by Safari after seven days, and neither may break a revision session.
 */
import { getAnonId } from '@/lib/funnel';

export const MOMENT_EVENT = 'revvy:moment';
export const OPEN_EVENT = 'revvy:feedback-open';

/**
 * Call where a student FINISHES something: the Learn Mode "Complete topic" handler, a quiz's final
 * score, a practice/flashcard/written engine entering its 'summary' phase. FeedbackPrompt decides
 * whether anything shows; the caller never has to know.
 */
export function signalMoment(moment, detail = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(MOMENT_EVENT, { detail: { ...detail, moment } }));
}

/** The always-available entry ("Send feedback" in the account menu and the sidebar). */
export function openFeedback(detail = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail }));
}

const PROMPT_KEY = 'revvy_feedback_prompt';
export function readPromptState() {
  try { return JSON.parse(localStorage.getItem(PROMPT_KEY)) || null; } catch { return null; }
}
export function writePromptState(state) {
  try { localStorage.setItem(PROMPT_KEY, JSON.stringify(state)); } catch {}
}

/** When this visit began. The first call of a tab's session sets it; FeedbackPrompt makes that call on mount. */
const SESSION_KEY = 'revvy_visit_started';
export function visitStartedAt() {
  try {
    let t = Number(sessionStorage.getItem(SESSION_KEY));
    if (!t) { t = Date.now(); sessionStorage.setItem(SESSION_KEY, String(t)); }
    return t;
  } catch {
    return Date.now(); // blocked storage reads as "just arrived", which errs towards not asking
  }
}

/**
 * True while a student is inside something that must not be interrupted: an open modal (any
 * <dialog open>, the cancel offer, the diagram enlarge view), or a surface that has declared
 * itself with data-focus-mode="on" (a timed paper, the pre-test, a written answer being typed).
 */
export function isFocusLocked() {
  if (typeof document === 'undefined') return false;
  return Boolean(document.querySelector('[data-focus-mode="on"], dialog[open], [role="dialog"][aria-modal="true"]'));
}

/**
 * A computer, not a phone or tablet. The main input is a mouse or trackpad (so it can hover and point
 * precisely) and the window is at least 1024px wide. The user agent cannot answer this: iPads have
 * identified as Macs since iPadOS 13. Input capability can: an iPad reports a coarse pointer and no
 * hover even with a trackpad attached, while a touchscreen laptop still reports its trackpad. The width
 * floor keeps the card out of narrow desktop windows, where the app switches to its phone layout at 768px.
 */
export const DESKTOP_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 1024px)';
export function isDesktop() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  try { return window.matchMedia(DESKTOP_QUERY).matches; } catch { return false; }
}

/** What every submission carries, and what the "What gets sent" panel lists. */
export function pageContext() {
  const theme = document.documentElement.dataset.theme;
  return {
    anonId: getAnonId(),
    path: window.location.pathname,
    viewportW: window.innerWidth,
    viewportH: window.innerHeight,
    theme: theme === 'light' || theme === 'dark' ? theme : null,
    clientTs: new Date().toISOString(),
    tzOffsetMin: -new Date().getTimezoneOffset(),
  };
}

/** "Safari on iPhone · 390×844 · dark". Display only; the server keeps the raw user agent. */
export function describeDevice() {
  if (typeof navigator === 'undefined') return '';
  const ua = navigator.userAgent;
  const browser = /Edg\//.test(ua) ? 'Edge' : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /FxiOS|Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : 'Browser';
  const device = /iPhone/.test(ua) ? 'iPhone' : /iPad/.test(ua) ? 'iPad' : /Android/.test(ua) ? 'Android' : /Mac OS X/.test(ua) ? 'Mac' : /Windows/.test(ua) ? 'Windows' : /CrOS/.test(ua) ? 'Chromebook' : 'computer';
  const theme = document.documentElement.dataset.theme;
  return [`${browser} on ${device}`, `${window.innerWidth}×${window.innerHeight}`, theme ? `${theme} mode` : null].filter(Boolean).join(' · ');
}

/** What to tell a student when a send fails, by cause. Never blame their connection for our 503. */
export function failureMessage(status, { kept = false } = {}) {
  const note = kept ? ' Your note is still here.' : '';
  if (status === 0) return `That didn’t send. Check your connection and try again.${note}`;
  if (status === 429) return `That’s a lot in a short time. Please try again in an hour.${note}`;
  if (status === 503) return `This isn’t available right now. Please try again later.${note}`;
  return `Something went wrong on our side. Please try again in a minute.${note}`;
}

export async function postJson(url, body, { keepalive = false } = {}) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive,
    });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false, status: 0 };
  }
}

// Items this browser has reported, so the button can say "Reported" instead of inviting a second tap.
const REPORTED_KEY = 'revvy_reported_items';
export function wasReported(itemKey) {
  try { return Boolean(JSON.parse(localStorage.getItem(REPORTED_KEY) || '{}')[itemKey]); } catch { return false; }
}
export function markReported(itemKey) {
  try {
    const map = JSON.parse(localStorage.getItem(REPORTED_KEY) || '{}');
    map[itemKey] = Date.now();
    const keep = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 200);
    localStorage.setItem(REPORTED_KEY, JSON.stringify(Object.fromEntries(keep)));
  } catch {}
}
