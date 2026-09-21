// `npm test`. The read path, and the mirror of write-path.test.mjs. V007.
//
// `lib/write-path.test.mjs` fails the build if a new file WRITES a content table with a client of
// its own. This is the same guard on the way out: fail if anything but the entitled API READS one
// of the four paid tables with the anonymous client.
//
// It exists because the hole it closes was opened by a page doing something entirely reasonable.
// Both `[unit]/[topic]` pages and `app/page.js` read all eight section tables with
// `createAnonClient()` and handed the result to `StudyApp`, so the complete quiz bank — every
// `correctIndex` — the flashcards, the extras and the paid-only common mistakes sat in the HTML of
// a page that needs no account. F086 had already closed the same door on `GET /api/sections/[id]`
// and this one stayed open for another five weeks, because nothing looked. The next page that
// wants a quiz count will reach for the same client; this is what stops it.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// The four surfaces a subscription pays for. `section_content`, `section_notes`,
// `section_diagrams` and `section_practice` are free and are deliberately NOT here: the static
// build, the sitemap and the public Economics pages read them with the anon key on purpose.
const PAID_TABLES = ['section_quiz', 'section_flashcards', 'section_common_mistakes', 'section_extras'];
const READS_PAID_TABLE = new RegExp(`\\.from\\(\\s*['"\`](?:${PAID_TABLES.join('|')})['"\`]\\s*\\)`);
const ANON_CLIENT = /createAnonClient\s*\(/;

/**
 * The one reader that may hold a paid table and the anon client in the same file, with the reason.
 * Nothing qualifies today: the entitled route uses the service role, so it does not appear here.
 * An entry is a promise that the file checks entitlement before it sends anything it read.
 */
const ANON_READ_ALLOWLIST = new Map();

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(m?jsx?)$/.test(name)) out.push(p);
  }
  return out;
}

test('no page, component or route reads a paid section table with the anonymous client', () => {
  const files = ['app', 'components', 'lib'].flatMap((d) => walk(d));
  const offenders = [];
  for (const f of files) {
    if (f.endsWith('read-path.test.mjs')) continue;
    const src = readFileSync(f, 'utf8');
    if (!ANON_CLIENT.test(src) || !READS_PAID_TABLE.test(src)) continue;
    if (ANON_READ_ALLOWLIST.has(f)) continue;
    offenders.push(f);
  }
  assert.deepEqual(offenders, [], `paid tables read with the anon key: ${offenders.join(', ')}`);
  for (const f of ANON_READ_ALLOWLIST.keys()) assert.ok(existsSync(f), `allowlisted file ${f} no longer exists; remove it from the list`);
});

test('the guard catches a file that reads a paid table with the anon client', () => {
  // The rule is worth nothing if the regexes do not match the shape the offending pages actually
  // had. This is that shape, verbatim from `app/economics/[unit]/[topic]/page.jsx` before the fix.
  const offending = `
    import { createAnonClient } from '@/lib/supabase-anon';
    const supabase = createAnonClient();
    const quiz = await supabase.from('section_quiz').select('data').eq('section_id', topic).single();
  `;
  assert.ok(ANON_CLIENT.test(offending) && READS_PAID_TABLE.test(offending), 'the guard would not have caught the bug it exists for');

  const free = `
    import { createAnonClient } from '@/lib/supabase-anon';
    const supabase = createAnonClient();
    const practice = await supabase.from('section_practice').select('data').eq('section_id', topic).single();
  `;
  assert.ok(!READS_PAID_TABLE.test(free), 'a free table must not trip the guard');

  const serviceRole = `
    const db = createServerClient();
    const quiz = await db.from('section_quiz').select('data').eq('section_id', id).maybeSingle();
  `;
  assert.ok(!ANON_CLIENT.test(serviceRole), 'the service role is how the entitled route reads these');
});

test('the three pages that held the leak ship the free surfaces only', () => {
  // Named rather than derived: these three are the finding. If one of them grows a paid read again
  // the test above catches it, and if one of them stops calling the shared builder this does.
  for (const f of [
    'app/economics/[unit]/[topic]/page.jsx',
    'app/business/[unit]/[topic]/page.jsx',
    'app/page.js',
  ]) {
    const src = readFileSync(f, 'utf8');
    assert.match(src, /publicSectionPayload\(/, `${f} no longer builds its payload through publicSectionPayload`);
    for (const t of PAID_TABLES) assert.ok(!src.includes(t), `${f} reads ${t}`);
  }
});

test('publicSectionPayload withholds every paid surface and says so', async () => {
  const { publicSectionPayload, sectionPayload } = await import('./preview-limits.js');
  const tables = {
    content: [{ title: 'c' }],
    notes: [{ n: 1 }],
    diagrams: [{ d: 1 }],
    practice: [{ p: 1 }],
    quiz: [{ id: 'q1', correctIndex: 2 }, { id: 'q2', correctIndex: 0 }, { id: 'q3', correctIndex: 1 }],
    flashcards: [{ id: 'f1' }, { id: 'f2' }, { id: 'f3' }],
    mistakes: [{ id: 'm1' }],
    extras: { chains: [{ id: 'ch1' }, { id: 'ch2' }], evaluation: [{ id: 'e1' }, { id: 'e2' }] },
  };

  const page = publicSectionPayload(tables);
  assert.deepEqual(page.quiz, [], 'the page must not ship a quiz question');
  assert.deepEqual(page.flashcards, []);
  assert.deepEqual(page.mistakes, []);
  assert.deepEqual(page.extras, { chains: [], evaluation: [] });
  assert.equal(page.paidPending, true, 'the client cannot tell withheld from empty without this');
  assert.equal(page.isPremium, false);
  // The free surfaces are whole: this page is what Google reads and what a free student is promised.
  assert.deepEqual(page.content, tables.content);
  assert.deepEqual(page.practice, tables.practice);
  // Nothing paid survives serialisation into the HTML, under any key.
  assert.ok(!JSON.stringify(page).includes('correctIndex'), 'an answer key reached the page payload');
  assert.ok(!JSON.stringify(page).includes('m1'), 'a paid-only mistake reached the page payload');

  // And the entitled builder still caps a free student and serves a paying one.
  const free = sectionPayload(tables, { isPremium: false });
  assert.equal(free.flashcards.length, 2);
  assert.equal(free.mistakes.length, 0);
  assert.equal(free.counts.quiz, 3, 'the true total must survive the cap, or the paywall copy lies');
  assert.equal(free.paidPending, undefined, 'the API response is not pending anything');
  const pro = sectionPayload(tables, { isPremium: true });
  assert.equal(pro.quiz.length, 3);
  assert.equal(pro.flashcards.length, 3);
  assert.equal(pro.mistakes.length, 1);
  assert.deepEqual(pro.extras.chains, tables.extras.chains);
});

test('a withheld paid tab renders the loading card BEFORE entitlement is consulted', () => {
  /*
   * The no-flash guarantee is an ordering, and an ordering is exactly what a later tidy-up moves.
   * `renderTab` must answer `paidPending` first: reaching the entitlement branch while the paid
   * half is still in flight shows "Unlock Quiz" to a student who has paid — F035's bug, in a new
   * place and on the first paint of every visit, because V007 put that fetch on the critical path.
   * Asserted on the source the way write-path.test.mjs asserts the admin route's gate, because the
   * repository has no renderer to assert it on.
   */
  const src = readFileSync('components/StudyApp.jsx', 'utf8');
  const body = src.slice(src.indexOf('function renderTab()'));
  const pending = body.indexOf('paidPending &&');
  const paywall = body.indexOf('<PaywallOverlay');
  assert.ok(pending > -1, 'renderTab no longer answers the withheld state at all');
  assert.ok(paywall > -1, 'renderTab no longer renders a paywall — has the gate been removed?');
  assert.ok(pending < paywall, 'the paywall is reached before the withheld state is answered: a paying student sees it flash');

  // And the preview UI must follow the payload, not a second opinion about entitlement.
  assert.match(body, /const isPreview = PREVIEW_TABS\.has\(activeTab\) && !sectionData\.isPremium;/,
    'preview mode is no longer derived from the payload the student was actually sent');
});

test('the root layout does not read cookies, so the app still prerenders', () => {
  /*
   * V009. Packet 12 seeded AuthProvider from `supabase.auth.getUser()` in the ROOT layout to kill
   * F035's paywall flash. A cookie read in the root layout opts EVERY route in the app out of
   * prerendering: measured 21 September on this branch, 1 static route (`/sitemap.xml`) against
   * 113 dynamic, while `origin/main` — whose `RootLayout` is not even async — served
   * `/economics/unit-1/supply` as `x-vercel-cache: PRERENDER`. Merging would have undone PR #17's
   * caching for every public page, and nothing in the build, the tests or the ledger would have
   * said so: `next build` reports it in a table nobody diffs, and it exits 0 either way.
   *
   * The next person to want the user in the layout will reach for exactly the same two lines.
   */
  // Comments stripped first: this file's own explanation of the rule names the calls it forbids,
  // and a guard that cannot survive being described is not one anybody can document.
  const src = readFileSync('app/layout.js', 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
  for (const forbidden of [
    /from\s+['"]@\/lib\/supabase\/server['"]/,
    /from\s+['"]@\/lib\/supabase-server['"]/,
    /from\s+['"]next\/headers['"]/,
    /\bcookies\s*\(/,
    /auth\.getUser\s*\(/,
    /getSubscriptionRow\s*\(/,
  ]) {
    assert.ok(!forbidden.test(src),
      `app/layout.js matches ${forbidden} — a request-time read in the ROOT layout makes every route in the app dynamic (V009). Put it under a segment that is dynamic anyway, or hand the client the unknown state and let it resolve (AuthProvider.entitlementKnown).`);
  }
});

test('nothing draws a lock on an entitlement it does not have yet', () => {
  /*
   * V009, the other half. With the seed gone, `isPremium === false` on a prerendered page means
   * "nobody has answered yet" for the first moment of every visit, and `!isPremium` cannot tell
   * that apart from "this student is on the free plan". Every surface that makes a CLAIM about
   * what has been paid for — a padlock, a paywall, an upgrade CTA, a plan badge — has to test the
   * three-valued form. The ones that merely withhold a convenience may stay loose.
   */
  const cases = [
    ['components/StudyApp.jsx', /const locked = isPremium === false;/,
      'SectionOverview no longer derives its padlocks from the three-valued entitlement'],
    ['components/AnimatedTabBar.jsx', /const isLocked = tab\.premium && isPremium === false;/,
      'the tab bar padlock is back on a bare !isPremium'],
    ['components/PaywallOverlay.jsx', /if \(isPremium \|\| !entitlementKnown\) return null;/,
      'PaywallOverlay renders before entitlement is known — that is F035'],
    ['components/UpgradeButton.jsx', /if \(!entitlementKnown\)/,
      'UpgradeButton offers checkout before it knows whether this account already pays'],
    ['components/SettingsPage.jsx', /\{!entitlementKnown \?/,
      'the settings plan block states a plan before the lookup lands'],
    ['components/AuthProvider.jsx', /const entitlementKnown = !loading && settledFor === \(user\?\.id \?\? null\);/,
      'entitlementKnown no longer compares the settled answer against the CURRENT user: a sign-in gets one frame of the previous answer, and every padlock in the app draws on it'],
  ];
  for (const [file, pattern, why] of cases) {
    assert.match(readFileSync(file, 'utf8'), pattern, `${file}: ${why}`);
  }
});

test('the section paywall reads the payload, not the client opinion of entitlement', () => {
  /*
   * V009. `renderTab` used to reach `!isPremium` from `useAuth()`. On a prerendered page that is
   * false until /api/subscription answers, so a paying student who reloaded on the Tutor tab met
   * "Unlock Tutor" again — the exact defect the root layout's cookie read was added to prevent.
   * `sectionData.isPremium` is the server's verdict about this student, it has already arrived by
   * the time this line runs (the withheld state is answered above it), and it is what the preview
   * line beside it has read since packet 2.1.
   */
  const src = readFileSync('components/StudyApp.jsx', 'utf8');
  const body = src.slice(src.indexOf('function renderTab()'));
  assert.match(body, /if \(PREMIUM_TABS\.has\(activeTab\) && !sectionData\.isPremium\) \{/,
    'the premium-tab paywall is no longer decided by the payload the student was actually sent');

  const pending = body.indexOf('paidPending &&');
  const nullCheck = body.indexOf('if (!sectionData) {');
  const paywall = body.indexOf('<PaywallOverlay');
  assert.ok(pending < nullCheck && nullCheck < paywall,
    'ordering broken: the withheld state and the missing-payload state must both be answered before any paywall');
});
