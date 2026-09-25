#!/usr/bin/env node
/**
 * Packet 2.92 (V060): are the eight held rebuilds pinned on the LIVE site?
 *
 *   node audit/runs/packet-2.92/live-pins.mjs --prod <dir> [--json <file>] [--plant <kind>]
 *
 * <dir> holds `lib/` and `components/learn-mode/` exactly as origin/main has them, because that is the
 * code production runs and this branch's copy is not it (831ca27 is not on main):
 *
 *   git archive origin/main lib components/learn-mode | tar -x -C <dir>
 *   echo '{"type":"module"}' > <dir>/package.json
 *
 * READ-ONLY. It never writes to the database or the site. Three sources, none of them the app's own
 * data helpers:
 *   1. Supabase over raw PostgREST (service key from .env.local): each table's data, draft, published_at.
 *   2. The production API, https://revvylearn.com/api/sections/<id>, fetched with no cookie (signed out).
 *   3. The packet bundle in audit/snapshots/ that each rebuild's own verifier signed off.
 *
 * WHAT IT ASSERTS, per section:
 *   A. Published. No table holds a draft, and section_content was published on 2026-09-25.
 *   B. What went live is what was verified. Every table's live `data` deep-equals the packet bundle,
 *      except the fields `LATER` names: verified fixes packet 2.7 re-staged after the dump.
 *   C. Every chapter pins its quiz (indices or ids, or [] = decided none), its practice item, and its
 *      diagram (an id, or null = decided none). Every index is in range and every id names a live item.
 *      One exception, printed: a chapter with no diagram field when every diagram is pinned elsewhere.
 *   D. What production SHOWS is what the pins NAME. Production's placeChapterItems (origin/main) is run
 *      over a Pro reader's bank (the whole live table) and a signed-out reader's (the production API
 *      payload, whose quiz pins freeQuizPayload rewrites), and each check-in is compared with a
 *      hand-written reading of the pins. A slot filled by a FALLBACK rather than a pin is a failure,
 *      never a pass: an unpinned chapter looks exactly like a pinned one on screen.
 *
 * --plant proves the checks can fail (run it, see it fire, then run without it):
 *   absent-quiz   delete quizIndices from the first chapter of the first section (C and D must fire)
 *   bad-diagram   point the first chapter's diagramId at a diagram that does not exist (C and D)
 *   draft         pretend section_quiz still holds a draft on the first section (A must fire)
 *   drift         reword the first live quiz question of the first section (B must fire)
 *   drift-notes   reword a live notes string of the first section, a table no check-in reads (B must fire)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const argv = process.argv.slice(2);
const val = (n) => { const i = argv.indexOf(n); return i < 0 ? null : argv[i + 1]; };
const PROD = val('--prod');
const JSON_OUT = val('--json');
const PLANT = val('--plant');
if (!PROD) { console.error('--prod <dir> is required (origin/main lib + components/learn-mode)'); process.exit(2); }

const { placeChapterItems } = await import(pathToFileURL(resolve(PROD, 'lib/checkin-placement.js')).href);
const { buildSteps } = await import(pathToFileURL(resolve(PROD, 'lib/learn-steps.js')).href);

// The eight sections V060 names, and the bundle each rebuild's verifier signed off.
const SECTIONS = {
  'balance-payments-exchange-rates': 'packet-40-bundle__economics__balance-payments-exchange-rates.json',
  'business-objectives-strategy': 'packet-27-bundle__business__business-objectives-strategy.json',
  'causes-effects-globalisation': 'packet-34-bundle__economics__causes-effects-globalisation.json',
  'globalisation': 'packet-33-bundle__business__globalisation.json',
  'market-structures-contestability': 'packet-29-bundle__economics__market-structures-contestability.json',
  'revenue-costs-profits': 'packet-28-bundle__economics__revenue-costs-profits.json',
  'trade-global-economy': 'packet-39b-bundle__economics__trade-global-economy.json',
  'types-sizes-businesses': 'packet-20-bundle__economics__types-sizes-businesses.json',
};
const TABLES = ['section_content', 'section_notes', 'section_quiz', 'section_practice',
  'section_flashcards', 'section_diagrams', 'section_extras', 'section_common_mistakes'];
/*
 * Verified changes made AFTER a bundle was dumped. Packet 2.7 (12b7e2e, 19 Sep) fixed two of these
 * sections in their modules and re-staged them without re-dumping the snapshot, so live is right and
 * the bundle is stale in exactly these fields. Each is a confirmed ledger id. Any OTHER difference
 * still fails, because the comparison lists every differing path, not the first.
 */
const LATER = {
  'globalisation': { section_practice: ['.5.guidance'] }, // V036: a Discuss needs a brief assessment, not a conclusion
  'market-structures-contestability': { section_diagrams: ['.6.scenarios.2.svg'] }, // V031: the MR curves drawn
};
// Written out rather than imported from lib/content-gate.mjs, so this probe shares no code with the app.
const BUNDLE_KEY = {
  section_content: 'content', section_notes: 'notes', section_quiz: 'quiz', section_practice: 'practice',
  section_flashcards: 'flashcards', section_diagrams: 'diagrams', section_extras: 'extras',
  section_common_mistakes: 'mistakes',
};
// The tables a check-in reads. A difference anywhere else is reported but cannot move a pin.
const PIN_TABLES = new Set(['section_content', 'section_quiz', 'section_practice', 'section_diagrams']);
const PUBLISH_DAY = '2026-09-25';
const SITE = 'https://revvylearn.com';

const env = {};
for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}
const URL_ = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_ || !KEY) { console.error('.env.local needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'); process.exit(2); }

async function row(table, id) {
  const r = await fetch(`${URL_}/rest/v1/${table}?section_id=eq.${encodeURIComponent(id)}&select=*`,
    { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } });
  if (!r.ok) throw new Error(`${table} ${id}: HTTP ${r.status}`);
  const rows = await r.json();
  if (rows.length > 1) throw new Error(`${table} ${id}: ${rows.length} rows`);
  return rows[0] ?? null;
}

/** Deep equality with object keys in any order (jsonb reorders them) and arrays in order. */
function same(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b || a === null || b === null || typeof a !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) return a.length === b.length && a.every((x, i) => same(x, b[i]));
  const ka = Object.keys(a).filter((k) => a[k] !== undefined);
  const kb = Object.keys(b).filter((k) => b[k] !== undefined);
  return ka.length === kb.length && ka.every((k) => Object.hasOwn(b, k) && same(a[k], b[k]));
}

/** Every leaf path at which two values differ. */
function diffPaths(a, b, path = '', out = []) {
  if (same(a, b)) return out;
  if (a && b && typeof a === 'object' && typeof b === 'object' && Array.isArray(a) === Array.isArray(b)
    && !(Array.isArray(a) && a.length !== b.length)) {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diffPaths(a[k], b[k], `${path}.${k}`, out);
    return out;
  }
  out.push(Array.isArray(a) && Array.isArray(b) ? `${path || '.'} length ${a.length} vs ${b.length}` : (path || '.'));
  return out;
}
const firstDiff = (a, b) => diffPaths(a, b)[0] ?? null;

/*
 * The pins, read by hand from the contract rather than by calling the shipping resolver: ids win
 * outright when present; otherwise the first index that is in range and not already taken by an
 * earlier chapter. Returns the index into `items`, or -1.
 */
function pinned(items, ids, indices, taken) {
  if (Array.isArray(ids) && ids.length) {
    for (const id of ids) {
      const i = items.findIndex((it) => it && it.id === id);
      if (i >= 0 && !taken.has(i)) { taken.add(i); return i; }
    }
    return -1;
  }
  if (Array.isArray(indices)) {
    for (const i of indices) {
      if (Number.isInteger(i) && i >= 0 && i < items.length && !taken.has(i)) { taken.add(i); return i; }
    }
  }
  return -1;
}

function pinnedDiagram(diagrams, id, taken) {
  if (typeof id !== 'string' || !id) return -1;
  const i = diagrams.findIndex((d) => d && d.id === id);
  if (i < 0 || taken.has(i)) return -1;
  taken.add(i);
  return i;
}

/** How a chapter pins each of the three things, from the block alone. */
function census(block, bank) {
  const kind = (ids, indices, items) => {
    if (Array.isArray(ids) && ids.length) {
      const missing = ids.filter((id) => !items.some((it) => it && it.id === id));
      return missing.length ? `BAD-ID(${missing.join(',')})` : 'ids';
    }
    if (Array.isArray(indices) && indices.length) {
      const bad = indices.filter((i) => !Number.isInteger(i) || i < 0 || i >= items.length);
      return bad.length ? `OUT-OF-RANGE(${bad.join(',')} of ${items.length})` : 'indices';
    }
    if (Array.isArray(ids) || Array.isArray(indices)) return 'decided-none';
    return 'ABSENT';
  };
  let diagram;
  if (typeof block.diagramId === 'string' && block.diagramId) {
    diagram = bank.diagrams.some((d) => d && d.id === block.diagramId) ? 'id' : `BAD-ID(${block.diagramId})`;
  } else if (block.diagramId === null) {
    diagram = 'decided-none';
  } else if (block.diagramRef) {
    diagram = 'LEGACY-REF';
  } else {
    diagram = 'ABSENT';
  }
  return {
    quiz: kind(block.quizIds, block.quizIndices, bank.quiz),
    practice: kind(block.practiceIds, block.practiceIndices, bank.practice),
    diagram,
  };
}

const idOf = (x) => (x && typeof x === 'object' ? (x.id ?? JSON.stringify(x).slice(0, 60)) : null);

/**
 * Run production's placement over one reader's bank and compare every check-in with the pins.
 * Returns one row per chapter: for quiz, practice and diagram, what shows and how it got there.
 */
function placement(bank) {
  const flatSteps = buildSteps(bank.content);
  const { quizMap, practiceMap, diagramMap } = placeChapterItems({
    flatSteps, contentData: bank.content, diagramsData: bank.diagrams, quizData: bank.quiz, practiceData: bank.practice,
  });
  const takenQ = new Set(), takenP = new Set(), takenD = new Set();
  const rows = [];
  flatSteps.forEach((s, idx) => {
    if (s.type !== 'checkin') return;
    const block = bank.content[s.blockIndex];
    const want = {
      quiz: pinned(bank.quiz, block.quizIds, block.quizIndices, takenQ),
      practice: pinned(bank.practice, block.practiceIds, block.practiceIndices, takenP),
      diagram: pinnedDiagram(bank.diagrams, block.diagramId, takenD),
    };
    const got = { quiz: quizMap[idx] ?? null, practice: practiceMap[idx] ?? null, diagram: diagramMap[idx] ?? null };
    const items = { quiz: bank.quiz, practice: bank.practice, diagram: bank.diagrams };
    const c = census(block, bank);
    const verdict = {};
    for (const k of ['quiz', 'practice', 'diagram']) {
      const named = want[k] >= 0 ? items[k][want[k]] : null;
      if (named && got[k] === named) verdict[k] = 'pin';
      else if (named && !got[k]) verdict[k] = 'DROPPED';
      else if (named && got[k] !== named) verdict[k] = 'MISMATCH';
      else if (!named && got[k]) verdict[k] = 'FALLBACK';
      else verdict[k] = c[k] === 'decided-none' ? 'decided-none' : 'EMPTY';
    }
    rows.push({
      chapter: s.blockIndex + 1, title: s.blockTitle, census: c, verdict,
      shows: { quiz: idOf(got.quiz), practice: idOf(got.practice), diagram: got.diagram?.title ?? null },
    });
  });
  return rows;
}

const report = [];
let failures = 0;
const fail = (sec, msg) => { failures += 1; sec.failures.push(msg); };

for (const [id, bundleFile] of Object.entries(SECTIONS)) {
  const sec = { id, failures: [], notes: [] };
  report.push(sec);

  // A. Published.
  const rows = {};
  for (const t of TABLES) rows[t] = await row(t, id);
  if (PLANT === 'draft' && id === Object.keys(SECTIONS)[0]) rows.section_quiz = { ...rows.section_quiz, draft: [] };
  const drafted = TABLES.filter((t) => rows[t] && rows[t].draft != null);
  if (drafted.length) fail(sec, `A: draft still waiting on ${drafted.join(', ')}`);
  sec.publishedAt = rows.section_content?.published_at ?? null;
  if (!String(sec.publishedAt).startsWith(PUBLISH_DAY)) fail(sec, `A: section_content published_at ${sec.publishedAt}`);

  // B. Live = the verified bundle. Two shapes are on disk: {section_id, tables: {content, ...}} from
  // `--dump`, and a bare {content, ...} (packets 39a/39b). Both key by the bundle name, not the table.
  const bundle = JSON.parse(readFileSync(`audit/snapshots/${bundleFile}`, 'utf8'));
  if (bundle.section_id && bundle.section_id !== id) throw new Error(`${bundleFile} is for ${bundle.section_id}`);
  const built_ = bundle.tables ?? bundle;
  if (!Array.isArray(built_.content)) throw new Error(`${bundleFile}: no content array`);
  sec.bundle = bundleFile;
  sec.bundleDiff = {};
  if (PLANT === 'drift' && id === Object.keys(SECTIONS)[0]) {
    rows.section_quiz = { ...rows.section_quiz, data: structuredClone(rows.section_quiz.data) };
    rows.section_quiz.data[0].question = `${rows.section_quiz.data[0].question} (planted)`;
  }
  if (PLANT === 'drift-notes' && id === Object.keys(SECTIONS)[0]) {
    rows.section_notes = { ...rows.section_notes, data: structuredClone(rows.section_notes.data) };
    rows.section_notes.data[0] = { ...rows.section_notes.data[0], planted: true };
  }
  for (const t of TABLES) {
    const live = rows[t]?.data ?? null;
    const built = built_[BUNDLE_KEY[t]] ?? null;
    const paths = diffPaths(live, built);
    if (!paths.length) continue;
    sec.bundleDiff[t] = paths;
    const expected = LATER[id]?.[t] ?? [];
    const unexplained = paths.filter((p) => !expected.includes(p));
    if (!unexplained.length) { sec.notes.push(`B: ${t} differs at ${paths.join(', ')}, a verified later fix (packet 2.7)`); continue; }
    // Any table, not only the four a check-in reads: the spec says ANY other differing path fails, and
    // Verify A found this probe had downgraded the other four to notes (none differed, but a check that
    // cannot fail there is not the check the spec states).
    fail(sec, `B: ${t} live differs from ${bundleFile} at ${unexplained.join(', ')}${PIN_TABLES.has(t) ? '' : ' (a table no check-in reads)'}`);
  }
  for (const [t, expected] of Object.entries(LATER[id] ?? {})) {
    const missing = expected.filter((p) => !(sec.bundleDiff[t] ?? []).includes(p));
    if (missing.length) fail(sec, `B: expected packet 2.7's fix at ${t}${missing.join(', ')} and live does not carry it`);
  }

  // C and D, Pro reader: the whole live bank.
  const pro = {
    content: structuredClone(rows.section_content?.data ?? []),
    quiz: rows.section_quiz?.data ?? [],
    practice: rows.section_practice?.data ?? [],
    diagrams: rows.section_diagrams?.data ?? [],
  };
  if (PLANT && id === Object.keys(SECTIONS)[0]) {
    if (PLANT === 'absent-quiz') delete pro.content[0].quizIndices;
    if (PLANT === 'bad-diagram') pro.content[0].diagramId = 'planted-no-such-diagram';
  }
  sec.counts = { blocks: pro.content.length, quiz: pro.quiz.length, practice: pro.practice.length, diagrams: pro.diagrams.length };
  sec.pro = placement(pro);
  if (!sec.pro.length) fail(sec, 'C: no check-ins at all');
  /*
   * A chapter with no diagram field is NOT a pin failure when there is nothing it could be given:
   * every diagram in the table is pinned by another chapter, so no fallback can reach it, and it
   * shows none. That is 2.91's rule ("every chapter that SHOWS a diagram pins it"). It is still
   * printed, because `diagramId: null` would record the decision and this does not.
   */
  const allClaimed = pro.diagrams.every((d) => pro.content.some((b) => b && b.diagramId === d.id));
  const noneToPlace = (r) => r.census.diagram === 'ABSENT' && allClaimed && r.verdict.diagram === 'EMPTY';
  for (const r of sec.pro) {
    for (const k of ['quiz', 'practice', 'diagram']) {
      if (k === 'diagram' && noneToPlace(r)) {
        sec.notes.push(`C: ch${r.chapter} "${r.title}" has no diagram field; all ${pro.diagrams.length} diagrams are pinned to other chapters, so it shows none`);
        r.verdict.diagram = 'none-to-place';
        continue;
      }
      if (!['ids', 'indices', 'id', 'decided-none'].includes(r.census[k])) fail(sec, `C: ch${r.chapter} ${k} ${r.census[k]}`);
      if (!['pin', 'decided-none'].includes(r.verdict[k])) fail(sec, `D(pro): ch${r.chapter} ${k} ${r.verdict[k]}`);
    }
  }

  // D, signed-out reader: what the production API actually serves, no cookie.
  const res = await fetch(`${SITE}/api/sections/${id}`, { headers: { 'cache-control': 'no-cache' } });
  if (!res.ok) { fail(sec, `D(free): API HTTP ${res.status}`); continue; }
  const api = await res.json();
  sec.api = { isPremium: api.isPremium, contentVersionSince: api.contentVersionSince ?? null,
    quizSent: api.quiz?.length, quizTotal: api.counts?.quiz, practiceSent: api.practice?.length };
  if (api.isPremium !== false) fail(sec, `D(free): API isPremium=${api.isPremium} on a cookieless request`);
  // The served blocks must be the live blocks, bar the quiz pins freeQuizPayload rewrites.
  const strip = (c) => (c || []).map(({ quizIndices, ...rest }) => rest);
  if (!same(strip(api.content), strip(rows.section_content?.data))) {
    fail(sec, `D(free): served content differs from live data at ${firstDiff(strip(api.content), strip(rows.section_content?.data))}`);
  }
  const free = { content: api.content || [], quiz: api.quiz || [], practice: api.practice || [], diagrams: api.diagrams || [] };
  sec.free = placement(free);
  sec.free.forEach((r, i) => {
    const p = sec.pro[i];
    for (const k of ['quiz', 'practice', 'diagram']) {
      if (k === 'diagram' && p?.verdict.diagram === 'none-to-place' && r.verdict.diagram === 'EMPTY') { r.verdict.diagram = 'none-to-place'; continue; }
      if (!['pin', 'decided-none'].includes(r.verdict[k])) fail(sec, `D(free): ch${r.chapter} ${k} ${r.verdict[k]}`);
      // A signed-out reader sees the SAME pinned item a Pro reader sees, or nothing if the slice left it out.
      if (r.shows[k] && p && r.shows[k] !== p.shows[k] && !(PLANT && id === Object.keys(SECTIONS)[0])) {
        fail(sec, `D(free): ch${r.chapter} ${k} shows ${r.shows[k]} where Pro shows ${p.shows[k]}`);
      }
    }
  });
}

// Refuse to report green on an empty corpus.
const checkins = report.reduce((n, s) => n + (s.pro?.length || 0), 0);
if (report.length !== 8 || checkins === 0) { console.error(`corpus too small: ${report.length} sections, ${checkins} check-ins`); process.exit(1); }

const tally = (rows, k) => {
  const t = {};
  for (const r of rows || []) t[r.verdict[k]] = (t[r.verdict[k]] || 0) + 1;
  return Object.entries(t).map(([v, n]) => `${n} ${v}`).join(', ');
};
for (const s of report) {
  console.log(`\n${s.id}  published ${s.publishedAt}  ${s.counts?.blocks} chapters, ${s.counts?.quiz} quiz, ${s.counts?.practice} practice, ${s.counts?.diagrams} diagrams`);
  console.log(`  live = ${s.bundle}: ${Object.keys(s.bundleDiff || {}).length ? JSON.stringify(s.bundleDiff) : 'all 8 tables identical'}`);
  for (const [who, rows] of [['pro ', s.pro], ['free', s.free]]) {
    if (!rows) continue;
    console.log(`  ${who}  quiz: ${tally(rows, 'quiz')} | practice: ${tally(rows, 'practice')} | diagram: ${tally(rows, 'diagram')}`);
  }
  if (s.api) console.log(`  API signed out: isPremium=${s.api.isPremium}, quiz sent ${s.api.quizSent} of ${s.api.quizTotal}, contentVersionSince ${s.api.contentVersionSince}`);
  for (const n of s.notes) console.log(`  note  ${n}`);
  for (const f of s.failures) console.log(`  FAIL  ${f}`);
}
console.log(`\n${report.length} sections, ${checkins} check-ins, ${failures} failure(s)${PLANT ? `  [PLANTED: ${PLANT}]` : ''}`);
if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify(report, null, 1));
process.exit(failures ? 1 : 0);
