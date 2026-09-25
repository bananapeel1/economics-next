/**
 * When the feedback card may appear. Pure: no DOM, no storage, no clock of its own, so every
 * branch is testable with node --test.
 *
 * The rule the brief set was "not during high-focus revision". A timer cannot know that: 45 seconds
 * into a visit is usually the middle of a question. So the card only ever answers a MOMENT, the
 * point where a student has just finished something (a Learn Mode topic, a quiz, a practice set,
 * a flashcard run), and even then it has to clear every guard below.
 *
 * And only on a computer. On a phone or tablet anything that arrives unprompted takes over too much
 * of the screen (founder's call, 25 Sep 2026), so the card never appears there by itself. "Send
 * feedback" and "Report a problem" still work everywhere, because the student opens those.
 *
 * Returns { show, reason } rather than a boolean so a refusal can be logged and asserted on.
 */

import { MOMENTS } from './taxonomy.js';

const DAY = 24 * 60 * 60 * 1000;

export const PROMPT_POLICY = {
  moments: MOMENTS,
  minActiveDays: 2,            // a first visit is when the app has to impress, not ask
  minSessionMs: 3 * 60 * 1000, // a completion inside three minutes is a skim, not an opinion
  dismissCooldownDays: 14,     // they pressed "Not now" (the brief's figure; the showing cap does the rest)
  submitCooldownDays: 60,      // they answered
  ignoreCooldownDays: 3,       // it showed and they moved on without touching it
  maxShowsPerWindow: 3,
  showWindowDays: 60,
};

// Never on the way in, the way out, or while money is involved.
const QUIET_PREFIXES = ['/login', '/signup', '/auth', '/upgrade', '/admin', '/settings'];

/**
 * @param {object} input
 * @param {number} input.now                 Date.now()
 * @param {string} input.moment              what just finished
 * @param {boolean} input.desktop            isDesktop() in lib/feedback/client.js; anything but true refuses
 * @param {string} input.pathname
 * @param {number} input.sessionStartedAt    ms timestamp of this visit's first page
 * @param {boolean} input.focusLocked        a timed or assessment state, or an open modal dialog
 * @param {object}  input.state              the per-browser record (see emptyState)
 * @param {number|null} input.serverLastSubmittedAt  signed in only: the latest user_feedback row
 */
export function decidePrompt({ now, moment, desktop, pathname, sessionStartedAt, focusLocked, state, serverLastSubmittedAt = null, policy = PROMPT_POLICY }) {
  const s = { ...emptyState(), ...(state || {}) };
  const ago = (t) => (t ? now - t : Infinity);

  if (!policy.moments.includes(moment)) return { show: false, reason: 'not-a-moment' };
  if (desktop !== true) return { show: false, reason: 'not-desktop' }; // fails closed if a caller forgets
  if (QUIET_PREFIXES.some((p) => pathname === p || pathname?.startsWith(`${p}/`))) return { show: false, reason: 'quiet-route' };
  if (focusLocked) return { show: false, reason: 'focus-locked' };
  if (s.activeDays.length < policy.minActiveDays) return { show: false, reason: 'first-day' };
  if (ago(sessionStartedAt) < policy.minSessionMs) return { show: false, reason: 'too-early' };

  const lastSubmitted = Math.max(s.lastSubmittedAt || 0, serverLastSubmittedAt || 0) || null;
  if (ago(lastSubmitted) < policy.submitCooldownDays * DAY) return { show: false, reason: 'submitted-recently' };
  if (ago(s.lastDismissedAt) < policy.dismissCooldownDays * DAY) return { show: false, reason: 'dismissed-recently' };
  if (ago(s.lastIgnoredAt) < policy.ignoreCooldownDays * DAY) return { show: false, reason: 'ignored-recently' };

  const recentShows = s.shows.filter((t) => ago(t) < policy.showWindowDays * DAY).length;
  if (recentShows >= policy.maxShowsPerWindow) return { show: false, reason: 'shown-enough' };

  return { show: true, reason: 'ok' };
}

export function emptyState() {
  return { activeDays: [], shows: [], lastDismissedAt: null, lastSubmittedAt: null, lastIgnoredAt: null };
}

/** Record today as an active day. Local calendar date, so "two days" means two of the student's days. */
export function markActiveDay(state, now) {
  const s = { ...emptyState(), ...(state || {}) };
  const d = new Date(now);
  const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  if (s.activeDays.includes(day)) return s;
  return { ...s, activeDays: [...s.activeDays, day].slice(-14) };
}

export function recordOutcome(state, outcome, now) {
  const s = { ...emptyState(), ...(state || {}) };
  switch (outcome) {
    case 'shown':     return { ...s, shows: [...s.shows, now].slice(-10) };
    case 'dismissed': return { ...s, lastDismissedAt: now };
    case 'submitted': return { ...s, lastSubmittedAt: now };
    case 'ignored':   return { ...s, lastIgnoredAt: now };
    default:          return s;
  }
}
