/**
 * Maps every audit finding to a packet in PLAN.md and reports anything unmapped.
 * Run: node audit/verify-coverage.mjs
 *
 * Rules are deliberately explicit and conservative. A finding only counts as
 * covered if a rule names it. Anything that falls through is reported, not
 * silently absorbed — silent absorption is how the first two plans were wrong.
 */
import { readFileSync } from 'fs';

const dir = new URL('./raw/', import.meta.url);
const code = JSON.parse(readFileSync(new URL('code-findings-flat.json', dir), 'utf8'));
const content = JSON.parse(readFileSync(new URL('content-work-flat.json', dir), 'utf8'));

/* ── Packet rules. Each: [packet, test]. First match wins. ────────────────── */
const has = (f, ...words) => {
  const hay = `${f.title} ${f.file} ${f.fix || ''} ${f.impact || ''}`.toLowerCase();
  return words.some(w => hay.includes(w.toLowerCase()));
};
const inFile = (f, ...parts) => parts.some(p => f.file.toLowerCase().includes(p.toLowerCase()));

const RULES = [
  ['0 hotfix', f => has(f, 'pre-test', 'pretest') && has(f, 'gate', 'skip', 'optional', 'persist')],
  ['0 hotfix', f => has(f, '24 spec points', 'marketing', 'adaptive flashcard', 'blackjack', 'claim')],

  ['1 measure', f => has(f, 'progress row', 'step 0 on every section open', 'auto-written', 'instrumentation', 'funnel', 'furthest')],
  ['2 ids', f => has(f, 'item id', 'stable id', 'question_index', 'index pin', 'versioning', 'rollback', 'overwrite', 'idempotent', 'push log', 'no item ids')],
  ['3 validator', f => inFile(f, 'scripts/_upgrade-template', 'check-learn-content') || has(f, 'validator', 'validation', 'lint')],
  ['4 progress+mastery', f => inFile(f, 'lib/strength', 'ReviewMode', 'PostTest', 'CompletionScreen', 'api/learn-mode/progress')
      || has(f, 'strength', 'score breakdown', 'review schedule', 'mixedreview', 'quick fire', 'spaced review', 'interval', 'boolean', 'dashboard', 'mastery', 'total_steps', 'block count')],
  ['5 step 0', f => inFile(f, 'LearnModeTab', 'PreTest', 'StudyApp', 'InlinePractice', 'ExplainItBack')
      || has(f, 'subsection per step', 'duplicate title', 'chapter title', 'sticky', 'recall renders', 'spaced recall', 'step transition', 'resume', 'navigation', 'forced learn tab', 'keyboard nav', 'visual hierarchy', 'never let', 'type')],

  ['6 re-entry', f => has(f, 'email', 'push', 'reminder', 'bring a student back', 'due review', 'outbound')],
  ['7 widgets', f => inFile(f, 'ReorderRecall', 'FillInRecall', 'RecallCheckpoint', 'InteractiveDiagram', 'DiagramLabelDrill')
      || has(f, 'reorder', 'fill-in', 'fillin', 'recall widget', 'shuffle', 'dismiss', 'word bank', 'drag-and-drop', 'never mounted')],
  ['8 quiz hygiene', f => inFile(f, 'expand-quiz') || has(f, 'option b', 'correct answer', 'duplicate stem', 'key balance', 'shuffled at render', 'quiz bank', 'correctindex')],
  ['9 AI', f => inFile(f, 'grade-explanation', 'api/chat', 'written-practice/evaluate', 'TutorTab', 'rate-limit')
      || has(f, 'gemini', 'grading', 'tutor', 'maxtokens', 'rubric', 'subscription lookup', '.single()')],
  ['10 smart practice', f => inFile(f, 'PracticeEngine', 'practice/QuestionCard', 'practice/SessionSummary', 'practice/TopicSelector', 'lib/spaced-repetition', 'QuizTab', 'InlineQuiz')
      || has(f, 'smart practice', 'no questions available', 'retried', 'topic picker', 'confidence', 'session composition')],
  ['11 perf+a11y', f => inFile(f, 'globals.css', 'glossary-highlight', 'GlossaryTooltip', 'AnimatedTabBar', 'parse-inline-markdown', 'api/sections/', 'notes/', 'next.config')
      || has(f, 'aria', 'focus-visible', 'contrast', 'tap target', 'payload', 'cache', 'reduced-motion', 'font size', 'loading state', 'diagram svg', 'render at 270', 'tab bar', 'unescaped')],
  ['12 monetisation', f => inFile(f, 'upgrade/page', 'PaywallOverlay', 'api/subscription', 'UpgradePageClient')
      || has(f, 'premium delta', 'paywall', 'free vs premium', 'ispremium', 'padlock', 'trial')],
  ['13 off-spec strip', f => has(f, 'off-spec', 'not in the ial spec', 'merit', 'deadweight', 'vrio', 'accelerator', 'uk-centric', 'international')],

  ['14-56 sections', f => has(f, 'unit 3', 'unit 4', 'cliff', 'diagramref', 'business has zero diagrams', 'quizindices', 'practiceindices', 'wiring', 'not genuine sequences')],
  ['57 cross-surface', f => has(f, 'notes tab', 'flashcards', 'extras')],
  ['— sidebar/misc', f => inFile(f, 'Sidebar', 'HomeScreen', 'AuthProvider', 'Icons')],
];

function assign(f) {
  for (const [packet, test] of RULES) if (test(f)) return packet;
  return null;
}

/* ── Run ──────────────────────────────────────────────────────────────────── */
const byPacket = {};
const unmapped = [];
for (const f of code) {
  const p = assign(f);
  if (p) (byPacket[p] ||= []).push(f);
  else unmapped.push(f);
}

console.log('CODE FINDINGS (117) mapped to packets\n');
const order = ['0 hotfix', '1 measure', '2 ids', '3 validator', '4 progress+mastery', '5 step 0', '6 re-entry',
  '7 widgets', '8 quiz hygiene', '9 AI', '10 smart practice', '11 perf+a11y', '12 monetisation',
  '13 off-spec strip', '14-56 sections', '57 cross-surface', '— sidebar/misc'];
let total = 0;
for (const p of order) {
  const list = byPacket[p] || [];
  total += list.length;
  const sev = { critical: 0, high: 0, medium: 0, low: 0 };
  list.forEach(f => sev[f.sev]++);
  console.log(`  ${String(list.length).padStart(3)}  ${p.padEnd(20)} [c${sev.critical} h${sev.high} m${sev.medium} l${sev.low}]`);
}
console.log(`  ${String(unmapped.length).padStart(3)}  UNMAPPED`);
console.log(`\n  total accounted: ${total + unmapped.length} of ${code.length}`);

if (unmapped.length) {
  console.log('\nUNMAPPED CODE FINDINGS — these have no packet:\n');
  for (const f of unmapped) console.log(`  [${f.sev}] ${f.title}\n        ${f.file}${f.line ? ':' + f.line : ''}`);
}

/* ── Content work items ───────────────────────────────────────────────────── */
const kinds = {};
for (const c of content) kinds[c.kind] = (kinds[c.kind] || 0) + 1;
console.log('\n\nCONTENT WORK ITEMS (1,170) by kind and owning packet\n');
const owner = {
  accuracy: '14-56 sections (critical ones at day 0)',
  quiz: '8 quiz hygiene + 14-56 sections',
  practice: '14-56 sections (day 0 hides bad tariffs first)',
  structure: '14-56 sections (block wiring is per-section)',
  specGap: '14-56 sections',
  topFix: '14-56 sections (topFixes ARE the section briefs)',
};
for (const [k, n] of Object.entries(kinds).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${k.padEnd(10)} -> ${owner[k] || 'UNOWNED'}`);
}
const unowned = Object.keys(kinds).filter(k => !owner[k]);
console.log(unowned.length ? `\n  UNOWNED KINDS: ${unowned.join(', ')}` : '\n  All content kinds have an owning packet.');

/* ── Sections covered ─────────────────────────────────────────────────────── */
const secs = new Set(content.map(c => c.section));
console.log(`\n  distinct sections with work items: ${secs.size} (packets 14-56 cover 43)`);
