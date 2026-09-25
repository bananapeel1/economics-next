import { test } from 'node:test';
import assert from 'node:assert/strict';
import { freeQuizPayload, FREE_QUIZ_MAX, PREVIEW_LIMITS, PRETEST_HEADROOM } from './preview-limits.js';
import { pickPretestQuestions } from './pretest-pool.js';
import { distributeItems, resolvePinnedItem, fallbackItemForBlock } from '../components/learn-mode/utils.js';
import { readFileSync, readdirSync } from 'node:fs';

/* V017. Every exposure invariant below used to read `<= FREE_QUIZ_MAX`, and every headroom one
   `=== PRETEST_HEADROOM`. Both are tautologies: they assert the module against itself. Measured by
   sabotaging an isolated copy: each constant passed 11 of 11 while changing what students receive.

   The figures, re-measured over both corpora against THIS code (the finding's own "10 -> 15" and
   "6.60 -> 3.65" are neither of them reproducible — they were carried over from V015's comment and
   from a corpus of 58 sections that does not exist; `sections` holds 43):

     FREE_QUIZ_MAX = Infinity    largest payload 10 -> 11 live, 10 -> 13 staged
     PRETEST_HEADROOM = 0        average sent 6.81 -> 3.86 live, 7.19 -> 4.30 staged

   Neither is a number the module gets to choose: they are where the paywall sits. So the invariants
   below compare against the literals, and this test states them. Changing one deliberately means
   changing it here, in the same commit, which is the point — a product decision, not a refactor.
   `node audit/scripts/exposure-census.mjs --both` re-measures all of it. */
const MAX_SENT = 10;
const SPARE_FOR_PRETEST = 3;
const TAB_PREVIEW = 2;

test('the exposure numbers are the paywall, so the tests state them rather than import them', () => {
  assert.equal(FREE_QUIZ_MAX, MAX_SENT);
  assert.equal(PRETEST_HEADROOM, SPARE_FOR_PRETEST);
  assert.equal(PREVIEW_LIMITS.quiz, TAB_PREVIEW);
});

/* A bank of n questions with stable ids, and blocks that pin by array position — the shape the
   section template authors (packet 14 onward) and the shape that breaks under a naive slice. */
const bank = (n) => Array.from({ length: n }, (_, i) => ({ id: `q:${i}`, question: `Q${i}` }));
const block = (title, quizIndices) => ({ title, quizIndices });

/* Resolve the way components/LearnModeTab.jsx resolves: pins are read against the array the API
   sent, first unused wins. If this test's copy and that component ever disagree, this test is the
   one that is wrong. */
function resolve(quiz, content) {
  const byId = new Map(quiz.map((q, i) => [q && q.id, i]));
  const used = new Set();
  return content.map((b) => {
    const ids = Array.isArray(b.quizIds) && b.quizIds.length ? b.quizIds : null;
    const idxs = Array.isArray(b.quizIndices) ? b.quizIndices : null;
    if (ids) {
      for (const id of ids) {
        const i = byId.get(id);
        if (i != null && !used.has(i)) { used.add(i); return quiz[i]; }
      }
      return null;
    }
    if (idxs) {
      const i = idxs.find((x) => x >= 0 && x < quiz.length && !used.has(x));
      if (i != null) { used.add(i); return quiz[i]; }
    }
    return null;
  });
}

test('every chapter still resolves its own question after the payload is cut down', () => {
  const quiz = bank(32);
  const content = [
    block('Ch1', [4, 3, 5]),
    block('Ch2', [11, 8, 9]),
    block('Ch3', [14, 15]),
    block('Ch4', [22, 21]),
    block('Ch5', [29, 30, 31]),
  ];
  const free = freeQuizPayload(quiz, content);
  const got = resolve(free.quiz, free.content);
  assert.equal(got.filter(Boolean).length, 5, 'all five chapters resolve');
  // and they resolve to the questions the author pinned first, not to whatever landed at that index
  assert.deepEqual(got.map((q) => q.id), ['q:4', 'q:11', 'q:14', 'q:22', 'q:29']);
});

test('a flat slice loses every chapter pinned past the cut', () => {
  const quiz = bank(32);
  const content = [block('Ch1', [4, 3]), block('Ch2', [11, 8]), block('Ch3', [29, 30])];
  const flat = resolve(quiz.slice(0, 8), content);
  assert.equal(flat.filter(Boolean).length, 1, 'only the chapter pinned inside the first 8 survives');
  assert.equal(flat[2], null, 'the chapter pinned at 29 gets nothing');
});

test('sending the right questions without remapping would point chapters at the wrong ones', () => {
  const quiz = bank(32);
  const content = [block('Ch1', [4, 3]), block('Ch2', [11, 8]), block('Ch3', [29, 30])];
  const free = freeQuizPayload(quiz, content);
  // the same payload, but with the pins as authored: this is the trap the remap exists to avoid
  const naive = resolve(free.quiz, content);
  assert.notDeepEqual(naive.map((q) => q && q.id), ['q:4', 'q:11', 'q:29']);
  const remapped = resolve(free.quiz, free.content);
  assert.deepEqual(remapped.map((q) => q.id), ['q:4', 'q:11', 'q:29']);
});

/* V016 changed this contract deliberately. The tab used to get two items of its own, taken before
   any pin, which left room for only 8 chapters under the cap. It now renders the first
   PREVIEW_LIMITS.quiz of whatever the payload holds — chapter questions included. */
test('the Quiz tab always has its preview, drawn from whatever the payload holds', () => {
  const quiz = bank(25);
  const free = freeQuizPayload(quiz, [block('Ch1', [9])]);
  assert.ok(free.quiz.length >= TAB_PREVIEW, 'the tab is never left short');
  // the chapter's pin is taken first now, so it leads the payload and the tab shows it
  assert.equal(free.quiz[0].id, 'q:9');
  assert.equal(free.content[0].quizIndices[0], 0, 'and the pin still points at it');
});

test('a ten-chapter section serves every chapter, which 8 dedicated tab slots prevented', () => {
  const quiz = bank(40);
  const content = Array.from({ length: 10 }, (_, i) => block(`Ch${i}`, [i + 5]));
  const free = freeQuizPayload(quiz, content);
  const empty = free.content.filter((b) => !b.quizIndices.length);
  assert.deepEqual(empty, [], 'no chapter is left with an empty check-in');
  assert.ok(free.quiz.length <= MAX_SENT, `sent ${free.quiz.length}, max ${MAX_SENT}`);
});

test('exposure is bounded however many chapters pin', () => {
  const quiz = bank(60);
  const content = Array.from({ length: 30 }, (_, i) => block(`Ch${i}`, [i + 5]));
  const free = freeQuizPayload(quiz, content);
  assert.ok(free.quiz.length <= MAX_SENT, `sent ${free.quiz.length}, max ${MAX_SENT}`);
  // a chapter that could not be served says so, rather than pointing at someone else's question
  const got = resolve(free.quiz, free.content);
  const served = got.filter(Boolean);
  assert.ok(served.length <= MAX_SENT);
  assert.equal(new Set(served.map((q) => q.id)).size, served.length, 'no question serves two chapters');
});

test('id pins are left alone, because they survive a slice', () => {
  const quiz = bank(20);
  const content = [{ title: 'Ch1', quizIds: ['q:12', 'q:13'] }];
  const free = freeQuizPayload(quiz, content);
  assert.deepEqual(free.content[0].quizIds, ['q:12', 'q:13'], 'pins untouched');
  assert.ok(free.quiz.some((q) => q.id === 'q:12'), 'and the pinned question is in the payload');
  assert.equal(resolve(free.quiz, free.content)[0].id, 'q:12');
});

test('a block with no pins, and a section with no quiz, are left as they are', () => {
  const content = [{ title: 'Ch1' }];
  assert.deepEqual(freeQuizPayload([], content), { quiz: [], content });
  const free = freeQuizPayload(bank(5), content);
  assert.deepEqual(free.content, content, 'an unpinned block is not rewritten');
  // its one chapter takes a question (V019), the tab is topped up to its two, then the headroom
  assert.equal(free.quiz.length, TAB_PREVIEW + SPARE_FOR_PRETEST);
});

/* V015. Without this the pre-test has nothing to ask on a section whose pins claim the whole
   payload — 22 of the 43 live sections, because their pins are 0,1,2… in block order. */
test('the payload keeps back questions no chapter claimed, for the pre-test', () => {
  const quiz = bank(20);
  // pins 0..5: the identity pattern that claims the tab preview itself
  const content = Array.from({ length: 6 }, (_, i) => block(`Ch${i}`, [i]));
  const free = freeQuizPayload(quiz, content);

  const claimed = new Set(free.content.map((b) => b.quizIndices[0]).filter((i) => i != null));
  const spare = free.quiz.filter((_, i) => !claimed.has(i));
  assert.equal(spare.length, SPARE_FOR_PRETEST, 'three questions nobody will ask again');
  assert.ok(free.quiz.length <= MAX_SENT, `sent ${free.quiz.length}, max ${MAX_SENT}`);
  // and the tab preview is still the first two, unmoved
  assert.deepEqual(free.quiz.slice(0, TAB_PREVIEW).map((q) => q.id), ['q:0', 'q:1']);
});

test('the headroom never pushes the payload past the cap', () => {
  const quiz = bank(60);
  const content = Array.from({ length: 30 }, (_, i) => block(`Ch${i}`, [i + 5]));
  assert.ok(freeQuizPayload(quiz, content).quiz.length <= MAX_SENT);
});

test('a bank with nothing spare simply has no headroom, and does not repeat itself', () => {
  const quiz = bank(4);
  const content = Array.from({ length: 4 }, (_, i) => block(`Ch${i}`, [i]));
  const free = freeQuizPayload(quiz, content);
  assert.equal(new Set(free.quiz.map((q) => q.id)).size, free.quiz.length, 'no duplicates');
  assert.ok(free.quiz.length <= quiz.length);
});

/* V019 and V026. A chapter reserves a question whether or not it points at one, so the headroom is
   what is left after EVERY chapter has been served rather than after the pinned ones. Both defects
   were live: nine sections were already serving a short pre-test and three were one chapter from
   none, and two sections had a chapter with no question at all. */
test('an unpinned section reserves one question per chapter and still keeps the headroom', () => {
  for (const chapters of [1, 2, 3, 4, 5, 6, 7]) {
    const quiz = bank(25);
    const content = Array.from({ length: chapters }, (_, i) => ({ title: `Ch${i}` })); // no pins at all
    const free = freeQuizPayload(quiz, content);

    // the legacy client path, which is what a section with no refs anywhere actually runs
    const reserved = Object.values(distributeItems(free.quiz, chapters)).filter(Boolean);
    assert.equal(reserved.length, chapters, `${chapters} chapters, ${reserved.length} served`);
    assert.equal(
      pickPretestQuestions(free.quiz, reserved).length, SPARE_FOR_PRETEST,
      `${chapters} chapters left the pre-test with fewer than ${SPARE_FOR_PRETEST}`,
    );
    assert.ok(free.quiz.length <= MAX_SENT, `sent ${free.quiz.length}, max ${MAX_SENT}`);
  }
});

test('the cap still wins: a legacy section too big for both gets every question it can', () => {
  const quiz = bank(25);
  const content = Array.from({ length: 12 }, (_, i) => ({ title: `Ch${i}` }));
  const free = freeQuizPayload(quiz, content);
  assert.equal(free.quiz.length, MAX_SENT, 'the payload is full');
  // the chapters take what there is; the pre-test is the thing that goes without, as at ten pins
  assert.equal(Object.values(distributeItems(free.quiz, 12)).filter(Boolean).length, MAX_SENT);
});

/* A bank whose questions are about something, because the fallback below only places a question
   that shares vocabulary with the chapter — the F041 rule, applied to the quiz. */
const topical = [
  { id: 'q:0', question: 'What does the demand curve show?' },
  { id: 'q:1', question: 'Which of these shifts the supply curve?' },
  { id: 'q:2', question: 'What is meant by market equilibrium?' },
  { id: 'q:3', question: 'How does a free market allocate resources?' },
  { id: 'q:4', question: 'Which economy relies on central planning?' },
  { id: 'q:5', question: 'What is elasticity of demand?' },
];

test('a chapter that pins nothing, beside chapters that do, has a question reserved for it', () => {
  const content = [block('Demand', [0]), block('Supply', [1]), block('Equilibrium', [2]), { title: 'Free Market Economies' }];
  const free = freeQuizPayload(topical, content);

  assert.deepEqual(free.content.slice(0, 3).map((b) => b.quizIndices[0]), [0, 1, 2], 'the pins still resolve');
  // the unpinned chapter is given a pin of its own, into a question about that chapter
  assert.deepEqual(free.content[3].quizIndices, [3]);
  assert.equal(free.quiz[3].id, 'q:3', 'the free market question, not the next one in the bank');
});

test('a chapter with nothing to match keeps its check-in short rather than taking any question', () => {
  // F041's rule: "never dump on random blocks". checkinIntro omits what the check-in does not carry.
  const content = [block('Demand', [0]), { title: 'Zzz Unrelated Chapter' }];
  const free = freeQuizPayload(topical, content);
  assert.equal(free.content[1].quizIndices, undefined, 'no pin is invented for it');
  assert.equal(fallbackItemForBlock(topical, 'Zzz Unrelated Chapter', new Set()), null);
});

test('the unpinned chapter of a pinned section resolves, signed out and signed in', () => {
  const content = [block('Demand', [0]), block('Supply', [1]), block('Equilibrium', [2]), { title: 'Free Market Economies' }];

  // signed in: the whole bank, pins as authored — no payload involved, so this is pure resolution
  const used = new Set();
  const pro = content.map((b) => resolvePinnedItem(topical, { ids: b.quizIds, indices: b.quizIndices }, used));
  const proFilled = content.map((b, i) => pro[i] || fallbackItemForBlock(topical, b.title, used));
  assert.equal(proFilled.filter(Boolean).length, 4, 'every chapter resolves for a paying student');
  assert.equal(proFilled[3].id, 'q:3');

  // signed out: the server wrote the pin, so the client resolves it without reaching the fallback
  const free = freeQuizPayload(topical, content);
  const usedFree = new Set();
  const got = free.content.map((b) => resolvePinnedItem(free.quiz, { ids: b.quizIds, indices: b.quizIndices }, usedFree));
  assert.equal(got.filter(Boolean).length, 4, 'every chapter resolves for a signed-out student');
  assert.equal(new Set(got.map((q) => q.id)).size, 4, 'and no question serves two chapters');
});

test('the fallback matches on vocabulary and never takes a question a pin claimed', () => {
  const used = new Set([3]); // the free-market question, claimed by a pin
  assert.equal(fallbackItemForBlock(topical, 'Central planning in a command economy', used).id, 'q:4');
  assert.ok(used.has(4), 'and it is claimed, so a later chapter cannot take it too');
  // with the best match claimed it takes the next real match — 'market' is shared with q:2, and a
  // loose match is still a match; the matcher is as loose as matchDiagramsToBlocks, deliberately
  assert.equal(fallbackItemForBlock(topical, 'Free Market Economies', new Set([3])).id, 'q:2');
  // nothing shared at all is where it stops
  assert.equal(fallbackItemForBlock(topical, 'Zzz Qqq', new Set()), null);
});

/* V018, and it is a source check for the same reason lib/write-path.test.mjs is one: nothing in this
   suite renders a React component, so the Quiz tab's cap could be deleted and no test would fail.
   That cap stopped being cosmetic when V005 moved the slice to the server and V016 raised what the
   server sends: the payload now holds up to FREE_QUIZ_MAX questions WITH their correctIndex, and
   this one line is what keeps a signed-out reader from seeing all of them. The module's header used
   to say "the server now slices, and the components render what they are given", which read as an
   invitation to delete it; it now names the quiz as the exception, and this test holds the line
   either way. */
const quizTab = readFileSync(new URL('../components/QuizTab.jsx', import.meta.url), 'utf8');

test('the Quiz tab caps its preview, and takes the number from the shared constant', () => {
  assert.match(quizTab, /import \{[^}]*\bPREVIEW_LIMITS\b[^}]*\} from ['"][^'"]*preview-limits['"]/,
    'QuizTab must import PREVIEW_LIMITS rather than keep its own number');
  assert.match(quizTab, /previewMode\s*\?[^;]*\.slice\(\s*0\s*,\s*PREVIEW_LIMITS\.quiz\s*\)/,
    'the preview must still be sliced to PREVIEW_LIMITS.quiz — deleting this is the whole bank');
  assert.doesNotMatch(quizTab, /\.slice\(\s*0\s*,\s*\d+\s*\)/,
    'no numeric literal slice: that is the duplicate this finding is about');
});

/* The same duplicate anywhere else that serves a student — every `.js` and `.jsx` under
   `components/` and `app/`, subdirectories included. Three copies existed when this was written:
   FlashcardsTab and ExtrasTab (redundant, since the server caps those two) and
   `app/api/practice/questions/route.js`, which was NOT redundant — it slices what a signed-in free
   student is served, and it survived the first sweep because a route is not a component.
   WHAT THIS CANNOT SEE: it matches a declaration whose NAME says preview. A cap called `CARD_CAP`
   would pass. It catches the shape that actually recurred, not every spelling of the idea; the Quiz
   tab, where a copy is load-bearing, is pinned by name above. */
function sourceFiles(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const child = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, dir);
    if (entry.isDirectory()) sourceFiles(child, out);
    else if (/\.jsx?$/.test(entry.name)) out.push(child);
  }
  return out;
}

test('nothing that serves a student declares a preview number of its own', () => {
  const offenders = [];
  for (const dir of ['../components/', '../app/']) {
    const root = new URL(dir, import.meta.url);
    for (const u of sourceFiles(root)) {
      if (!/(?:const|let)\s+[A-Z_]*PREVIEW[A-Z_]*\s*=\s*\d/.test(readFileSync(u, 'utf8'))) continue;
      offenders.push(dir.slice(3) + decodeURIComponent(u.pathname).slice(decodeURIComponent(root.pathname).length));
    }
  }
  assert.deepEqual(offenders, [], `take the number from lib/preview-limits.js instead: ${offenders}`);
});

/* This test used to read `components/LearnModeTab.jsx`, because the census RESTATED the component's
   two resolution paths and nothing imported the component — so deleting the fallback would have left
   `npm test` and `npm run exposure` green while a paying student's check-in went empty: V026
   returning with its own census blind to it.

   V054 removed the reason. Placement now lives in `lib/checkin-placement.js` and the component, the
   census and `audit/scripts/checkin-attribution.mjs` all call it, so there is one statement of which
   item a chapter shows instead of three. The grep therefore moves to that file — and it is still a
   grep rather than a behavioural test for the original reason: nothing here renders React, so no
   test observes the component actually calling it. */
const placement = readFileSync(new URL('./checkin-placement.js', import.meta.url), 'utf8');

test('the shared placement still falls back for a chapter that pins nothing', () => {
  assert.match(placement, /import \{[^}]*\bfallbackItemForBlock\b[^}]*\}/,
    'the fallback must be imported');
  assert.match(placement, /fallbackItemForBlock\(\s*quizData\s*,\s*\w+\.blockTitle\s*,\s*usedQuiz\s*\)/,
    'and called with the payload, the chapter title and the set the pins claimed from');
  // it must run AFTER the pins, or it would displace one that worked
  const pinIdx = placement.indexOf('resolvePinnedItem(quizData');
  const fallbackIdx = placement.indexOf('fallbackItemForBlock(quizData');
  assert.ok(pinIdx > 0 && fallbackIdx > pinIdx, 'the fallback runs after the pins are resolved');
});

test('the component does not place items itself — placement has exactly one home', () => {
  // V053's root cause was a placement branch buried in a useMemo where no checker could reach it.
  const component = readFileSync(new URL('../components/LearnModeTab.jsx', import.meta.url), 'utf8');
  assert.match(component, /import \{ placeChapterItems \}/, 'the component calls the shared placement');
  assert.doesNotMatch(component, /\bdistributeItems\s*\(/,
    'positional distribution is what served a chapter-3 question at chapter 1 (V053)');
});

/* Packet 2.9. An explicit empty pin is a decision, and the fallback must not overrule it.

   Pinning the 21 unpinned live sections moved them onto the pinned path, where V026's fallback fills
   any chapter without a pin from the unclaimed items on one shared title word. Six chapters had been
   read and found to have NO item they teach; on global-markets-expansion the fallback then served a
   "push factor" question no chapter of the section teaches. Each test below runs the same fixture
   twice — once with the chapter's pin absent, which MUST fall back (so the fixture really reaches the
   fallback), and once with `quizIndices: []`, which must not. Without the control, a fixture whose
   titles shared no word with the bank would pass the second half for the wrong reason. */
import { placeChapterItems } from './checkin-placement.js';
import { buildSteps } from './learn-steps.js';
import { decidedNoQuestion } from './checkin-fallback.js';

const decidedFixture = (chapter2Pin) => {
  const sec = (id) => [{ id, title: id, body: [{ type: 'paragraph', text: 'x' }] }];
  const content = [
    { id: 'b1', title: 'Market Development', sections: sec('s1'), quizIndices: [0] },
    { id: 'b2', title: 'Push and Pull Factors', sections: sec('s2'), ...chapter2Pin },
    { id: 'b3', title: 'Exchange Rates', sections: sec('s3'), quizIndices: [2] },
  ];
  const quiz = [
    { id: 'q0', question: 'A firm selling its existing product in a new country is pursuing:' },
    { id: 'q1', question: "Which of the following is a 'push' factor for international expansion?" },
    { id: 'q2', question: 'A stronger currency makes exports:' },
    { id: 'q3', question: 'Spare item for the pre-test.' },
  ];
  return { content, quiz };
};

const chapterQuiz = ({ content, quiz }) => {
  const flatSteps = buildSteps(content);
  const { quizMap } = placeChapterItems({ flatSteps, contentData: content, diagramsData: [], quizData: quiz, practiceData: [] });
  const out = {};
  flatSteps.forEach((s, i) => { if (s.type === 'checkin') out[s.blockIndex] = quizMap[i]?.id ?? null; });
  return out;
};

test('decidedNoQuestion: only an explicit empty list, with no pin in the other field', () => {
  assert.equal(decidedNoQuestion({}), false, 'no field: nobody decided, so the fallback may run');
  assert.equal(decidedNoQuestion({ quizIndices: [] }), true);
  assert.equal(decidedNoQuestion({ quizIds: [] }), true);
  assert.equal(decidedNoQuestion({ quizIndices: [3] }), false);
  assert.equal(decidedNoQuestion({ quizIds: ['a'], quizIndices: [] }), false, 'an id pin wins');
  assert.equal(decidedNoQuestion(null), false);
});

test('client placement: an absent pin falls back, an explicit empty pin asks nothing', () => {
  const absent = chapterQuiz(decidedFixture({}));
  assert.equal(absent[1], 'q1', 'CONTROL: with no pin, the fallback reaches chapter 2 on the word "push"');
  const decided = chapterQuiz(decidedFixture({ quizIndices: [] }));
  assert.equal(decided[1], null, 'an explicit empty pin is honoured');
  assert.equal(decided[0], 'q0', 'the other chapters keep their pins');
  assert.equal(decided[2], 'q2');
});

test('signed-out payload: an explicit empty pin reserves nothing and gets no fallback pin', () => {
  const ctl = decidedFixture({});
  const ctlFree = freeQuizPayload(ctl.quiz, ctl.content);
  assert.equal(ctlFree.content[1].quizIndices?.length, 1, 'CONTROL: with no pin, the server writes a fallback pin');
  assert.equal(chapterQuiz({ content: ctlFree.content, quiz: ctlFree.quiz })[1], 'q1');

  const f = decidedFixture({ quizIndices: [] });
  const free = freeQuizPayload(f.quiz, f.content);
  assert.deepEqual(free.content[1].quizIndices, [], 'the decision survives the payload rewrite');
  const shown = chapterQuiz({ content: free.content, quiz: free.quiz });
  assert.equal(shown[1], null, 'and a signed-out reader is asked nothing there, like a Pro one');
  assert.equal(shown[0], 'q0');
  assert.equal(shown[2], 'q2');
  // Nothing is spent on chapter 2, so the rejected item goes back to the pre-test pool rather than
  // being reserved for a check-in that will never ask it.
  const reserved = Object.values(shown).filter(Boolean).map((id) => free.quiz.find((q) => q.id === id));
  assert.ok(pickPretestQuestions(free.quiz, reserved).some((q) => q.id === 'q1'));
});

/* Packet 2.91, V056. The same decision for diagrams, through the door `matchDiagramsToBlocks` guards.

   On role-state-macroeconomy the chapter on public goods showed "Crowding Out in the Loanable Funds
   Market", matched on the word `market`; crowding out is taught nowhere in the section. A reader
   decided the chapter shows no diagram, and without a way to say so the fallback puts the rejected
   diagram straight back. Each test runs the absent case first as a CONTROL, so a fixture whose
   titles never reached the fallback cannot pass for the wrong reason. */
import { decidedNoDiagram } from './checkin-fallback.js';

const diagramFixture = (chapter1Pin, { pinned = true } = {}) => {
  const sec = (id) => [{ id, title: id, body: [{ type: 'paragraph', text: 'x' }] }];
  const content = [
    { id: 'b1', title: 'Market Failure and the State', sections: sec('s1'), ...(pinned ? { quizIndices: [0] } : {}), ...chapter1Pin },
    { id: 'b2', title: 'Macroeconomic Policy', sections: sec('s2'), ...(pinned ? { diagramId: 'd-adas' } : {}) },
  ];
  const diagrams = [
    { id: 'd-laffer', title: 'The Laffer Curve' },
    { id: 'd-crowding', title: 'Crowding Out in the Loanable Funds Market' },
    { id: 'd-adas', title: 'AD/AS: Macroeconomic Policy Effects' },
  ];
  return { content, diagrams };
};

const chapterDiagram = ({ content, diagrams }) => {
  const flatSteps = buildSteps(content);
  const { diagramMap } = placeChapterItems({ flatSteps, contentData: content, diagramsData: diagrams, quizData: [{ id: 'q0', question: 'x' }], practiceData: [] });
  const out = {};
  flatSteps.forEach((s, i) => { if (s.type === 'checkin') out[s.blockIndex] = diagramMap[i]?.id ?? null; });
  return out;
};

test('decidedNoDiagram: only an explicit null, and a working ref overrules it', () => {
  assert.equal(decidedNoDiagram({}), false, 'absent: nobody decided, so the fallback may run');
  assert.equal(decidedNoDiagram({ diagramId: undefined }), false, 'undefined is absence, which buildSteps copies from a block without the field');
  assert.equal(decidedNoDiagram({ diagramId: null }), true);
  assert.equal(decidedNoDiagram({ diagramId: 'd-adas' }), false);
  assert.equal(decidedNoDiagram({ diagramId: null, diagramRef: 'Laffer' }), false, 'a legacy ref is a pin, not a decision against one');
  assert.equal(decidedNoDiagram({ diagramId: '' }), false, 'only null means decided; an empty string is a broken pin for pin-check to report');
  assert.equal(decidedNoDiagram(null), false);
});

test('pinned path: an absent diagram pin falls back on a title word, an explicit null shows nothing', () => {
  const absent = chapterDiagram(diagramFixture({}));
  assert.equal(absent[0], 'd-crowding', 'CONTROL: with no pin, the fallback reaches chapter 1 on the word "market" — the live defect');
  const decided = chapterDiagram(diagramFixture({ diagramId: null }));
  assert.equal(decided[0], null, 'the decision is honoured');
  assert.equal(decided[1], 'd-adas', 'the other chapter keeps its pin');
});

test('the decision survives the step model: buildSteps copies null, not undefined', () => {
  const { content } = diagramFixture({ diagramId: null });
  const step = buildSteps(content).find((s) => s.type === 'checkin' && s.blockIndex === 0);
  assert.equal(step.diagramId, null);
  assert.ok(decidedNoDiagram(step));
});

test('unpinned path: a decided chapter is not offered to the matcher, and its diagram stays free', () => {
  const ctl = chapterDiagram(diagramFixture({}, { pinned: false }));
  assert.equal(ctl[0], 'd-crowding', 'CONTROL: a wholly unpinned section matches the same way');
  const decided = chapterDiagram(diagramFixture({ diagramId: null }, { pinned: false }));
  assert.equal(decided[0], null);
  assert.equal(decided[1], 'd-adas', 'the chapter after it still matches its own diagram');
});

test('the corpus had no null diagramId before 2.91, so no shipped block changes meaning', () => {
  // The t=0 export is the only corpus in the repository; the live and draft tables were measured at
  // 0 of 363 blocks on 25 September 2026 (audit/runs/packet-2.91/census.mjs). A null anywhere in
  // the export would mean some block's author already meant something else by it.
  const dir = new URL('../audit/content-sections/', import.meta.url);
  const nulls = readdirSync(dir).filter((f) => f.endsWith('.json')).flatMap((f) => {
    const j = JSON.parse(readFileSync(new URL(f, dir), 'utf8'));
    return (j.content || []).filter((b) => b && 'diagramId' in b && b.diagramId === null).map((b) => `${f}:${b.title}`);
  });
  assert.deepEqual(nulls, []);
});
