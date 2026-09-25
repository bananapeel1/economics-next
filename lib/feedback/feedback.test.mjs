import test from 'node:test';
import assert from 'node:assert/strict';
import { decidePrompt, emptyState, markActiveDay, recordOutcome, PROMPT_POLICY } from './prompt-policy.js';
import { computeSeverity } from './severity.js';
import { categoriesFor, isAllowed, SURFACES, CATEGORIES, NOTE_PROMPTS } from './taxonomy.js';

const DAY = 86_400_000;
const NOW = Date.UTC(2026, 8, 25, 12, 0, 0);
const seasoned = { ...emptyState(), activeDays: ['2026-09-20', '2026-09-25'] };
const base = {
  now: NOW,
  moment: 'section_complete',
  desktop: true,
  pathname: '/economics/unit-1/supply',
  sessionStartedAt: NOW - 10 * 60_000,
  focusLocked: false,
  state: seasoned,
};

test('shows at a moment for a returning student deep enough into a visit', () => {
  assert.deepEqual(decidePrompt(base), { show: true, reason: 'ok' });
});

test('never answers anything that is not a completion moment', () => {
  for (const moment of ['step_next', 'learn_open', 'page_view', undefined]) {
    assert.equal(decidePrompt({ ...base, moment }).reason, 'not-a-moment');
  }
});

test('phones and tablets never get the card unprompted, and a caller that forgets to say is refused', () => {
  assert.equal(decidePrompt({ ...base, desktop: false }).reason, 'not-desktop');
  const { desktop, ...unsaid } = base;
  assert.equal(decidePrompt(unsaid).reason, 'not-desktop', 'fails closed when the device is not given');
  assert.equal(decidePrompt({ ...base, desktop: 'true' }).reason, 'not-desktop', 'only the boolean true counts');
  // The device answer comes before the others, so a phone reads as "not-desktop", not "quiet-route".
  assert.equal(decidePrompt({ ...base, desktop: false, pathname: '/upgrade', focusLocked: true }).reason, 'not-desktop');
});

test('stays quiet in focus states, on quiet routes, on day one and early in a visit', () => {
  assert.equal(decidePrompt({ ...base, focusLocked: true }).reason, 'focus-locked');
  assert.equal(decidePrompt({ ...base, pathname: '/upgrade' }).reason, 'quiet-route');
  assert.equal(decidePrompt({ ...base, pathname: '/admin/inbox' }).reason, 'quiet-route');
  assert.equal(decidePrompt({ ...base, pathname: '/upgraded' }).show, true, 'a prefix match must be a path segment');
  assert.equal(decidePrompt({ ...base, state: { ...seasoned, activeDays: ['2026-09-25'] } }).reason, 'first-day');
  assert.equal(decidePrompt({ ...base, sessionStartedAt: NOW - 60_000 }).reason, 'too-early');
});

test('each outcome has its own cooldown, and each one expires', () => {
  const cases = [
    ['dismissed', 'lastDismissedAt', PROMPT_POLICY.dismissCooldownDays, 'dismissed-recently'],
    ['submitted', 'lastSubmittedAt', PROMPT_POLICY.submitCooldownDays, 'submitted-recently'],
    ['ignored', 'lastIgnoredAt', PROMPT_POLICY.ignoreCooldownDays, 'ignored-recently'],
  ];
  for (const [, field, days, reason] of cases) {
    const inside = { ...seasoned, [field]: NOW - (days * DAY - 1) };
    const outside = { ...seasoned, [field]: NOW - (days * DAY + 1) };
    assert.equal(decidePrompt({ ...base, state: inside }).reason, reason);
    assert.equal(decidePrompt({ ...base, state: outside }).show, true, `${field} should expire after ${days} days`);
  }
});

test('a submission on another device counts, through the server timestamp', () => {
  const r = decidePrompt({ ...base, serverLastSubmittedAt: NOW - 5 * DAY });
  assert.equal(r.reason, 'submitted-recently');
});

test('caps impressions per window, and old impressions roll off', () => {
  const shows = [NOW - 50 * DAY, NOW - 30 * DAY, NOW - 10 * DAY];
  assert.equal(decidePrompt({ ...base, state: { ...seasoned, shows } }).reason, 'shown-enough');
  const rolled = [NOW - 70 * DAY, NOW - 30 * DAY, NOW - 10 * DAY];
  assert.equal(decidePrompt({ ...base, state: { ...seasoned, shows: rolled } }).show, true);
});

test('state helpers: active days dedupe per local day, outcomes stamp the right field', () => {
  let s = markActiveDay(emptyState(), NOW);
  s = markActiveDay(s, NOW + 60_000);
  assert.equal(s.activeDays.length, 1);
  s = markActiveDay(s, NOW + DAY);
  assert.equal(s.activeDays.length, 2);
  assert.equal(recordOutcome(s, 'dismissed', NOW).lastDismissedAt, NOW);
  assert.deepEqual(recordOutcome(s, 'shown', NOW).shows, [NOW]);
  assert.deepEqual(recordOutcome(s, 'nonsense', NOW), s);
  // A corrupt or missing store falls back to empty rather than throwing.
  assert.equal(decidePrompt({ ...base, state: null }).reason, 'first-day');
});

test('severity: category sets the floor, reach raises it, two answer-key reports are critical', () => {
  assert.equal(computeSeverity([{ category: 'typo', reporterKey: 'u:1' }]), 'low');
  assert.equal(computeSeverity([{ category: 'unclear', reporterKey: 'u:1' }]), 'medium');
  assert.equal(computeSeverity([{ category: 'answer_wrong', reporterKey: 'u:1' }]), 'high');
  // The same student twice is still one reporter.
  assert.equal(computeSeverity([
    { category: 'answer_wrong', reporterKey: 'u:1' },
    { category: 'answer_wrong', reporterKey: 'u:1' },
  ]), 'high');
  assert.equal(computeSeverity([
    { category: 'answer_wrong', reporterKey: 'u:1' },
    { category: 'mark_scheme_wrong', reporterKey: 'a:x' },
  ]), 'critical');
  assert.equal(computeSeverity([
    { category: 'typo', reporterKey: 'u:1' },
    { category: 'typo', reporterKey: 'u:2' },
  ]), 'low', 'two reporters is not yet reach');
  assert.equal(computeSeverity([
    { category: 'typo', reporterKey: 'u:1' },
    { category: 'typo', reporterKey: 'u:2' },
    { category: 'typo', reporterKey: 'a:3' },
  ]), 'medium');
  assert.equal(computeSeverity([]), 'medium');
  assert.equal(computeSeverity([{ category: 'not-a-category', reporterKey: 'u:1' }]), 'medium');
});

test('taxonomy: every surface lists only known categories, and every category has a prompt', () => {
  for (const [surface, def] of Object.entries(SURFACES)) {
    for (const c of def.categories) assert.ok(CATEGORIES[c], `${surface} lists unknown ${c}`);
  }
  for (const c of Object.keys(CATEGORIES)) assert.ok(NOTE_PROMPTS[c], `no prompt for ${c}`);
  assert.equal(isAllowed('quiz', 'answer_wrong'), true);
  assert.equal(isAllowed('notes', 'answer_wrong'), false, 'notes have no marked answer');
  assert.equal(isAllowed('nope', 'other'), false);
  assert.deepEqual(categoriesFor('nope'), [{ id: 'other', label: 'Something else' }]);
  // Before the answer is shown, nothing that presumes having seen it.
  const before = categoriesFor('pretest', { revealed: false }).map((c) => c.id);
  assert.ok(!before.includes('answer_wrong') && !before.includes('explanation_wrong'));
  assert.ok(before.includes('multiple_correct') && before.includes('typo'));
  assert.equal(isAllowed('quiz', 'answer_wrong', { revealed: false }), false);
  assert.equal(isAllowed('written', 'marking_unfair', { revealed: false }), false);
});
