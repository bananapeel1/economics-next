#!/usr/bin/env node
/**
 * PACKET 36 — the independent read-back of what is actually in `draft`.
 *
 * PROTOCOL.md gate step 5: a content packet verifies the staged result against the DATABASE, field
 * by field, and not against the file it wrote. The reason is on the record — the runner is the only
 * writer, so a fix applied to a module and re-dumped leaves a repository that agrees with itself
 * while the row still holds the defect, and nothing else in the gate can see it.
 *
 * VERIFY INDEPENDENTLY. This script does NOT import `_packet36-util.mjs`. Every figure it checks is
 * re-derived from the four raw statement lines PARSED OUT OF THE SERVED TEXT, so if the spine and
 * the prose ever disagreed, the arithmetic here would be computed from the prose and would fail.
 * The section's structural claims are re-counted off the row rather than off `SUBSECTIONS`.
 *
 *   node audit/runs/packet-36/verify-draft.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';

const env = {};
readFileSync('.env.local', 'utf8').split('\n').forEach((l) => { const [k, ...r] = l.split('='); if (k && r.length) env[k.trim()] = r.join('=').trim(); });
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const TABLES = {
  section_content: 'content', section_notes: 'notes', section_quiz: 'quiz', section_practice: 'practice',
  section_flashcards: 'flashcards', section_diagrams: 'diagrams', section_extras: 'extras',
  section_common_mistakes: 'mistakes',
};

const bad = [];
const ok = [];
const check = (label, condition, detail = '') => { (condition ? ok : bad).push(`${label}${detail ? ` — ${detail}` : ''}`); };

const row = {};
for (const [table, key] of Object.entries(TABLES)) {
  const { data, error } = await sb.from(table).select('draft, data, published_at').eq('section_id', 'managing-finance').single();
  if (error) { bad.push(`${table}: ${error.message}`); continue; }
  row[key] = data.draft;
  check(`${table} holds a draft`, data.draft != null);
  check(`${table} LIVE data is untouched (rule 6: staged, not published)`, JSON.stringify(data.data) !== JSON.stringify(data.draft));
}
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }

/* ── every string a student can read, collected from the ROW ──────────────── */
const strings = (v, out = []) => { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach((x) => strings(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => strings(x, out)); return out; };
const all = strings(row);
const prose = all.filter((s) => !s.startsWith('<svg') && !/^managing-finance:/.test(s));
const svgText = all.filter((s) => s.startsWith('<svg')).map((s) => [...s.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' '));
const readable = [...prose, ...svgText];
const hay = readable.join('  ');

/* ══ 1 · the ledger items that are assertions about the TEXT ═══════════════ */

/* topFix-01, practice-01, practice-02: out-of-scope ratio vocabulary is gone */
for (const [term, why] of [
  ['gearing', 'practice-01/02, bus_spec.txt:1233 — Unit 3'],
  ['ROCE', 'practice-01, bus_spec.txt:1234 — Unit 3'],
  ['return on capital employed', 'practice-01 — Unit 3'],
  ['asset turnover', 'practice-01 — 0 hits in the specification'],
  ['dividend yield', 'practice-01 — 0 hits in the specification'],
  ['ratio analysis', 'terms.later-unit, bus_spec.txt:1229 — Unit 3'],
]) check(`no "${term}"`, !new RegExp(`\\b${term}\\b`, 'i').test(hay), why);

/* topFix-05: the named real firm and the dated claim are gone */
check('no named real company', !/\bCarillion\b|\bNike\b|\bAmazon\b|\bTesco\b/i.test(hay), 'topFix-05');
check('no four-digit year in prose', !prose.some((s) => /\b(?:19|20)\d{2}\b/.test(s)), 'topFix-05');
check('no "profitable on paper"', !/profitable on paper/i.test(hay), 'topFix-05');

/*
 * accuracy-01 and quiz-01: the conflation, in every form it took.
 *
 * ONE DECLARED EXHIBIT IS ALLOWED AND IT IS THE POINT OF A MISTAKE CARD. `looks_like` quotes the
 * sentence a student actually writes, so the wrong sentence has to be sayable in order to be
 * refuted — the same rule packet 35 applied to "revenue maximisation". It may appear there and
 * nowhere else, and exactly once, so a third use cannot arrive quietly.
 */
{
  const exhibits = row.mistakes.filter((m) => /also called operating profit/i.test(String(m.looks_like)));
  const elsewhereHits = readable.filter((s) => /also called operating profit/i.test(s) && !row.mistakes.some((m) => String(m.looks_like) === s));
  check('the conflation appears once, as a mistake card\'s quoted exhibit', exhibits.length === 1, 'accuracy-01');
  check('the conflation appears nowhere a student meets it as teaching', elsewhereHits.length === 0, elsewhereHits[0]?.slice(0, 70) || 'accuracy-01');
  check('the exhibit is refuted on the same card', exhibits.length === 1 && /interest/i.test(`${exhibits[0].why} ${exhibits[0].instead}`), 'accuracy-01');
}
check('operating profit is never defined as after interest', !/operating profit[^.]{0,40}after interest/i.test(hay), 'accuracy-01');
check('"profit for the year (net profit)" is taught as one line', /profit for the year \(net profit\)|also calls it net profit|profit for the year and net profit are the same/i.test(hay), 'accuracy-01');

/* structure-09: the liquidity contradiction */
const forbidsAssetSale = /(?:never|do not|don't|cannot|must not)[^.]{0,60}sell(?:ing)?[^.]{0,40}asset/i.test(hay);
check('the takeaway no longer forbids selling an asset', !forbidsAssetSale, 'structure-09');
check('selling an underused asset is taught as one of the four ways', /sell(?:ing|s)? an underused asset|Selling Assets/i.test(hay), 'structure-09');

/* topFix-04 Q19: the working-capital claim */
check('nothing claims that raising current liabilities improves working capital', !/current liabilities[^.]{0,60}improv\w+[^.]{0,20}working capital/i.test(hay), 'topFix-04');
check('the section states that supplier credit leaves working capital unchanged', /working capital is unchanged|does not move it|Working capital therefore changes by/i.test(hay), 'topFix-04');

/* structure-12 / topFix-02: no fill-in hint is a prefix of its answer */
{
  let hints = 0; let prefix = 0; let underscore = 0;
  for (const block of row.content) for (const sec of block.sections) {
    const r = sec.recall;
    if (!r || r.type !== 'fillin') continue;
    (r.hints || []).forEach((h, i) => {
      hints += 1;
      const a = String((r.answers || [])[i] ?? '').toLowerCase();
      const shown = String(h).toLowerCase().replace(/_.*$/, '').trim();
      if (a && shown && a.startsWith(shown)) prefix += 1;
      if (/_/.test(String(h))) underscore += 1;
    });
  }
  check(`${hints} fill-in hints, none a prefix of its answer`, prefix === 0, 'structure-12, topFix-02');
  check('no hint uses underscores to reveal a length', underscore === 0, 'structure-12');
}

/* structure-08: duplicate flashcards */
{
  const fronts = row.flashcards.map((c) => String(c.front).trim().toLowerCase());
  const backs = row.flashcards.map((c) => String(c.back).trim().toLowerCase());
  check(`${fronts.length} flashcards, every front distinct`, new Set(fronts).size === fronts.length, 'structure-08');
  check('every flashcard back distinct', new Set(backs).size === backs.length, 'structure-08');
}

/* structure-02: no two consecutive steps carrying the same recall */
{
  const subs = row.content.flatMap((b) => b.sections);
  const body = (r) => (r?.template ? r.template : r?.correctOrder ? r.correctOrder : r?.groups ? r.groups.map((g) => g.items) : r?.pairs ? r.pairs.map((p) => p.left) : []);
  const sig = subs.map((s) => JSON.stringify([s.recall?.type, body(s.recall)]));
  check('no two subsections carry the same recall', new Set(sig).size === sig.length, 'structure-02');
  check(`all ${subs.length} subsections carry a recall`, subs.every((s) => s.recall), 'structure-12');
  /*
   * ROUND 1 REJECTION, and it is this check that was blind. Comparing WHOLE recall bodies saw two
   * different templates and passed, while their second lines were identical — "Its gross profit
   * margin is ___", answer "30%" on both of two consecutive steps, with "30%" in the later word
   * bank. The duplication is at the BLANK, so the blank is the unit compared.
   */
  const units = (r) => {
    if (!r) return [];
    if (r.type === 'fillin') return (r.template || []).filter((l) => /_{3,}/.test(String(l))).map((l, i) => `${String(l).toLowerCase().replace(/\s+/g, ' ').trim()}→${String((r.answers || [])[i] ?? '').toLowerCase().trim()}`);
    if (r.type === 'reorder') return (r.correctOrder || []).map((x) => String(x).toLowerCase().trim());
    if (r.type === 'classify') return (r.groups || []).flatMap((g) => (g.items || []).map((x) => String(x).toLowerCase().trim()));
    if (r.type === 'match') return (r.pairs || []).map((p) => `${String(p.left).toLowerCase().trim()}→${String(p.right).toLowerCase().trim()}`);
    return [];
  };
  let repeats = 0; let example = '';
  let freebies = 0;
  for (let i = 1; i < subs.length; i += 1) {
    const prev = new Set(units(subs[i - 1].recall));
    const shared = units(subs[i].recall).filter((u) => prev.has(u));
    if (shared.length) { repeats += 1; example ||= `${subs[i].title}: "${shared[0].slice(0, 60)}"`; }
    const prevAnswers = new Set((subs[i - 1].recall?.answers || []).map((a) => String(a).toLowerCase().trim()));
    if ((subs[i].recall?.answers || []).some((a) => prevAnswers.has(String(a).toLowerCase().trim()))) freebies += 1;
  }
  check('no step repeats a blank, item or pair from the step before it', repeats === 0, example || 'structure-02');
  check('no word bank hands over an answer the previous step has just given', freebies === 0, 'structure-02');
}

/* structure-11: the filler misconception */
check('the "having a good idea is enough" filler is gone', !/good idea is enough/i.test(hay), 'structure-11');

/* structure-01: the meta number is the specification's own */
{
  /* the page breaks in the extracted PDF are form feeds, and one sits before every topic heading */
  const spec = readFileSync('audit/raw/bus_spec.txt', 'utf8').split('\n').map((l) => l.replace(/\f/g, ''));
  check('bus_spec.txt:921 is the heading "2.3.3 Managing finance"', /^2\.3\.3 Managing finance\s*$/.test(spec[920]), 'structure-01 refused: 2.3.1/2.3.2/2.3.3 as Profit/Liquidity/Business failure is UK GCE numbering');
  check('bus_spec.txt:885 is "2.3.2 Financial planning"', /^2\.3\.2 Financial planning\s*$/.test(spec[884]), 'structure-01 refused');
  check('Profit, Liquidity and Business failure are sub-topics 1, 2 and 3 of 2.3.3', /^1 Profit/.test(spec[924]) && /^2 Liquidity/.test(spec[934]) && /^3 Business failure/.test(spec[942]), 'structure-01 refused');
}

/* ══ 2 · the arithmetic, RE-DERIVED FROM THE PROSE ═════════════════════════ */
/*
 * The four raw lines are parsed out of the served teaching text and every figure the section prints
 * is recomputed from them here. Nothing is imported from the spine.
 */
/*
 * PARSED FROM THE TWO PRACTICE EXTRACTS, which are the only places in the section where the firm's
 * own statements are printed as data rather than referred to in prose. The first attempt scanned the
 * whole of the teaching text and picked up the recall prompts, which describe RIVAL firms on purpose
 * — the recalls were rewritten away from Lantana's figures so that they could not be answered by
 * scrolling up. Grabbing the first "revenue of $…" in the section therefore read a rival's $900,000
 * and every derived figure below was wrong. That is the check being wrong, not the content, and it
 * is the third time in this packet that a lexical shortcut has had to be replaced by an anchor.
 */
const num = (s) => Number(String(s).replace(/[^0-9.]/g, ''));
const extract = (re) => (row.practice.map((p) => String(p.question)).find((q) => re.test(q)) || '');
const sciText = extract(/reports, for the year:/);
const sfpText = extract(/statement of financial position shows:/);
check('the practice set prints a statement of comprehensive income as data', !!sciText, 'structure-05');
check('the practice set prints a statement of financial position as data', !!sfpText, 'specGap-07, structure-05');
const grabFrom = (text, re) => { const m = String(text).match(re); return m ? num(m[1]) : NaN; };
const revenue = grabFrom(sciText, /revenue \$([\d,]+)/);
const costOfSales = grabFrom(sciText, /cost of sales \$([\d,]+)/);
const operatingExpenses = grabFrom(sciText, /other operating expenses \$([\d,]+)/);
const interest = grabFrom(sciText, /interest \$([\d,]+)/);
check('the four raw lines are all printed and parseable', [revenue, costOfSales, operatingExpenses, interest].every(Number.isFinite), `${revenue} / ${costOfSales} / ${operatingExpenses} / ${interest}`);

const fmt = (n) => `$${n.toLocaleString('en-GB')}`;
const gross = revenue - costOfSales;
const operating = gross - operatingExpenses;
const forYear = operating - interest;
check(`gross profit ${fmt(gross)} is printed`, hay.includes(fmt(gross)));
check(`operating profit ${fmt(operating)} is printed`, hay.includes(fmt(operating)));
check(`profit for the year ${fmt(forYear)} is printed`, hay.includes(fmt(forYear)));
const pctOf = (p) => `${Math.round((p / revenue) * 1000) / 10}%`.replace('.0%', '%');
for (const [name, p] of [['gross', gross], ['operating', operating], ['for the year', forYear]]) {
  check(`the ${name} margin ${pctOf(p)} is printed and is that profit over REVENUE`, hay.includes(pctOf(p)));
}

/* the statement of financial position, parsed and balanced */
const inventory = grabFrom(sfpText, /inventory \$([\d,]+)/);
const receivables = grabFrom(sfpText, /trade receivables \$([\d,]+)/);
const cash = grabFrom(sfpText, /cash \$([\d,]+)/);
const payables = grabFrom(sfpText, /trade payables \$([\d,]+)/);
const overdraft = grabFrom(sfpText, /bank overdraft \$([\d,]+)/);
const otherPayables = grabFrom(sfpText, /other payables \$([\d,]+)/);
const ca = inventory + receivables + cash;
const cl = payables + overdraft + otherPayables;
check('the six current lines are printed and parseable', [inventory, receivables, cash, payables, overdraft, otherPayables].every(Number.isFinite), `${ca} / ${cl}`);
check(`current assets ${fmt(ca)} is printed`, hay.includes(fmt(ca)));
check(`current liabilities ${fmt(cl)} is printed`, hay.includes(fmt(cl)));
check(`working capital ${fmt(ca - cl)} is printed`, hay.includes(fmt(ca - cl)));
const rat = (n) => `${(Math.round(n * 100) / 100).toFixed(2)}:1`;
check(`the current ratio ${rat(ca / cl)} is printed`, hay.includes(rat(ca / cl)));
check(`the acid test ${rat((ca - inventory) / cl)} is printed`, hay.includes(rat((ca - inventory) / cl)));
check('the current ratio is above one and the acid test below it', ca / cl > 1 && (ca - inventory) / cl < 1, `${rat(ca / cl)} against ${rat((ca - inventory) / cl)}`);

/* the two claims the liquidity chapter rests on, recomputed */
{
  const extra = Math.round((costOfSales * 30) / 365);
  const after = { ca: ca + extra, cl: cl + extra };
  check('extending supplier credit leaves working capital unchanged', after.ca - after.cl === ca - cl);
  check('extending supplier credit lowers the current ratio', after.ca / after.cl < ca / cl, `${rat(after.ca / after.cl)}`);
  check('extending supplier credit raises the acid test', (after.ca - inventory) / after.cl > (ca - inventory) / cl, `${rat((after.ca - inventory) / after.cl)}`);
  check('the section prints the supplier-credit current ratio', hay.includes(rat(after.ca / after.cl)));
}
{
  const fee = Math.round((receivables * 3) / 100);
  const after = { ca: ca - fee, quick: ca - inventory - fee };
  check('factoring lowers the acid test while raising cash', after.quick / cl < (ca - inventory) / cl && cash + receivables - fee > cash, `${rat(after.quick / cl)}`);
  check('the section prints the factored acid test', hay.includes(rat(after.quick / cl)));
}
{
  const cut = revenue * 0.95;
  check('a five per cent price cut halves the operating profit', cut - costOfSales - operatingExpenses === operating / 2, fmt(cut - costOfSales - operatingExpenses));
  check('the section prints the halved operating profit', hay.includes(fmt(cut - costOfSales - operatingExpenses)));
}

/* ══ 3 · structure and wiring, counted off the ROW ═════════════════════════ */
check('5 blocks', row.content.length === 5, row.content.map((b) => b.title).join(' | '));
check('24 subsections', row.content.reduce((n, b) => n + b.sections.length, 0) === 24);
check('28 quiz items', row.quiz.length === 28);
check('11 practice items', row.practice.length === 11);
check('8 diagrams', row.diagrams.length === 8);
check('4 extras chains and 2 evaluation points', (row.extras.chains || []).length === 4 && (row.extras.evaluation || []).length === 2);
check('7 common mistakes', row.mistakes.length === 7);
check('5 notes topics', row.notes.length === 5);

/* structure-04: every block has a quiz, a practice item and a diagram that resolves */
{
  const diagramIds = new Set(row.diagrams.map((d) => d.id));
  const pinnedQuiz = row.content.flatMap((b) => b.quizIndices || []);
  const pinnedPractice = row.content.flatMap((b) => b.practiceIndices || []);
  for (const b of row.content) {
    check(`"${b.title}" pins a quiz item`, (b.quizIndices || []).length > 0, 'structure-04');
    check(`"${b.title}" pins a practice item`, (b.practiceIndices || []).length > 0, 'structure-04: blocks 1 and 4 of the live section had none');
    check(`"${b.title}" pins a diagram that resolves`, diagramIds.has(b.diagramId), 'structure-06');
  }
  check('no quiz item is pinned twice', new Set(pinnedQuiz).size === pinnedQuiz.length);
  check('no practice item is orphaned', row.practice.every((_, i) => pinnedPractice.includes(i)), 'structure-04');
  check('three quiz items are left unpinned for the pre-test', row.quiz.length - pinnedQuiz.length === 3);
  check('the unpinned three are the first three', [0, 1, 2].every((i) => !pinnedQuiz.includes(i)));
  check('quizIndices are not the identity mapping', !row.content.every((b, i) => (b.quizIndices || [])[0] === i), 'pins.identity');
}

/* topFix-01 and structure-05: the practice set */
{
  const commands = row.practice.map((p) => `${p.command} ${p.marks}`);
  const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'business');
  for (const p of row.practice) {
    const c = census.find((r) => r.command === p.command);
    const allowed = c ? (p.command === 'Assess' ? [10] : c.marks) : [];
    check(`practice "${p.command} (${p.marks})" is a Business Unit 2 tariff`, allowed.includes(p.marks), c ? `census allows ${allowed.join(' or ')}` : 'not a Business command word');
  }
  check('every Business command word is practised', census.every((c) => row.practice.some((p) => p.command === c.command)), commands.join(', '));
  check('a Calculate on the two liquidity ratios exists', row.practice.some((p) => p.command === 'Calculate' && /current ratio[\s\S]*acid test/i.test(p.question)), 'structure-05, specGap-07');
  check('an Assess on the internal causes of failure exists', row.practice.some((p) => p.command === 'Assess' && /internal causes/i.test(p.question)), 'structure-05');
  check('an Evaluate on liquidity against profitability exists', row.practice.some((p) => p.command === 'Evaluate' && /liquidity[\s\S]*profitability/i.test(p.question)), 'topFix-01');
  check('no practice item mentions gearing', !row.practice.some((p) => /gearing/i.test(`${p.question} ${p.guidance}`)), 'topFix-01, practice-02');
}

/* practice-03: the Assess guidance */
for (const p of row.practice.filter((x) => x.command === 'Assess')) {
  check(`Assess "${p.question.slice(0, 34)}…" names a judgement`, /judgement/i.test(p.guidance), 'practice-03');
  check(`Assess "${p.question.slice(0, 34)}…" has no "No explicit judgement mark"`, !/no explicit judgement/i.test(p.guidance), 'practice-03');
  check(`Assess "${p.question.slice(0, 34)}…" uses level bands`, /Level 1[\s\S]*Level 4/.test(p.guidance), 'practice-03');
}
/* every practice item: the scaffold opening */
for (const [i, p] of row.practice.entries()) {
  const paras = String(p.guidance).split('\n').filter((x) => x.trim());
  check(`practice ${i} has at least two guidance paragraphs`, paras.length >= 2, 'practice.opening');
  check(`practice ${i}'s opening paragraph carries no figure and no allocation`, !/\$[\d,]/.test(paras[0]) && !/\(\s*\d+\s*marks?/i.test(paras[0]), 'CONTENT-GATE Layer 1b item 6');
}

/* topFix-04: quiz repairs */
{
  const stems = row.quiz.map((q) => String(q.question));
  const tok = (s) => new Set(s.toLowerCase().match(/[a-z]{3,}/g) || []);
  let near = 0;
  for (let i = 0; i < stems.length; i += 1) for (let j = i + 1; j < stems.length; j += 1) {
    const A = tok(stems[i]); const B = tok(stems[j]);
    const inter = [...A].filter((x) => B.has(x)).length;
    if (inter / (A.size + B.size - inter) >= 0.5) near += 1;
  }
  check('no two quiz stems near-duplicate', near === 0, 'topFix-04: Q5/Q17 and Q9/Q13');
  check('no quiz stem opens with an essay command word', !stems.some((s) => /^\s*(evaluate|assess|discuss|examine)\b/i.test(s)), 'topFix-04');
  check('no quiz item has duplicate options', row.quiz.every((q) => new Set(q.options.map((o) => String(o).trim().toLowerCase())).size === q.options.length));
  const hist = [0, 0, 0, 0];
  row.quiz.forEach((q) => { hist[q.correctIndex] += 1; });
  check('the answer histogram is even', Math.max(...hist) - Math.min(...hist) <= 3, JSON.stringify(hist));
  const longest = row.quiz.filter((q) => { const c = String(q.options[q.correctIndex]).length; return q.options.every((o, j) => j === q.correctIndex || String(o).length < c); }).length;
  check('the key is not usually the longest option', longest / row.quiz.length <= 0.35, `${longest} of ${row.quiz.length}`);
  /*
   * ROUND 1 REJECTION. `placeKeys` deals the key into position and `QuizTab.jsx:150` /
   * `InlineQuiz.jsx:87` render `options` in array order, so an explanation that counts to an option
   * is describing the author's draft. The shipped bank explained 8% by saying the wrong method
   * "gives the last figure" — and 8% WAS the last figure. Checked here against the SERVED row, so
   * the rendered order is the order being judged.
   */
  const ORDINAL = /\b(?:first|second|third|fourth|fifth|last|final)\b(?!\s+(?:year|years|week|weeks|month|months|day|days|quarter|quarters|time)\b)/i;
  const counted = row.quiz.filter((q) => ORDINAL.test(String(q.explanation)));
  check('no quiz explanation counts to an option instead of naming it', counted.length === 0, counted.length ? `topFix-04: "${String(counted[0].explanation).slice(0, 80)}"` : 'topFix-04, quiz-01');
  check('the ordinal check still fires on the rejected string', ORDINAL.test('Dividing the interest by revenue instead gives the last figure.'), 'A/B control');
  check('the ordinal check does not fire on "last year"', !ORDINAL.test('Last year\'s profit settles no invoices.'), 'A/B control');
}

/*
 * VERIFY B REJECTION, round 1. The 10-mark Assess added for `structure-05` interpolated
 * `INTERNAL_CAUSES` at the start of a sentence, and the specification writes those causes in lower
 * case: "…failing to pay a supplier. weak cash flow, overestimation of sales…". A student reads
 * that as a template that did not finish. Checked against the SERVED row over every readable
 * string, so a lower-case opening anywhere in the section fails, not only in the item that had one.
 */
{
  const SENTENCE_CASE = /(?<!\b(?:e\.g|i\.e|etc|vs|approx|Fig|No))(?<=[a-z0-9)%”"'\]])\.\s+[a-z]/;
  const offenders = prose.filter((s) => SENTENCE_CASE.test(s));
  check('no sentence opens in lower case', offenders.length === 0, offenders.length ? `"${offenders[0].slice(0, 110)}"` : 'Verify B round 1');
  check('the sentence-case check still fires on the rejected stem', SENTENCE_CASE.test('closes after failing to pay a supplier. weak cash flow, overestimation of sales are all suggested.'), 'A/B control');
  check('the sentence-case check does not fire on a two-decimal ratio', !SENTENCE_CASE.test('Acid test = $160,000 ÷ $250,000 = 0.64:1. The gap is the inventory.'), 'A/B control');
}

/*
 * VERIFY A / WALKTHROUGH ARITHMETIC. The working capital cycle is printed as two stages and as
 * their total, and a fill-in hint tells the student the total is "the two stages added together".
 * Rounding each term at print time gave 67, 27 and 95, so the student who followed the hint typed
 * 94 and was marked wrong. Re-derived here from the SERVED text: the three day figures are read
 * back out of the recall the student actually answers, and the total must be the sum of the parts.
 */
{
  const fill = strings(row.content).join('  ');
  const subs = row.content.flatMap((block) => block.sections || []);
  const cycle = subs.map((sub) => sub.recall).filter(Boolean).find((r) => /tied up in the cycle/i.test(JSON.stringify(r)));
  check('the working capital cycle recall is on the served row', !!cycle, cycle ? `${cycle.answers?.length} answers` : 'not found');
  if (cycle) {
    const nums = (cycle.answers || []).map((a) => Number(String(a).match(/-?\d+/)?.[0]));
    check('the cycle total is the sum of its two printed stages', nums[0] + nums[1] === nums[2], `${nums[0]} + ${nums[1]} = ${nums[0] + nums[1]}, printed ${nums[2]}`);
    const hintAdds = (cycle.hints || []).some((h) => /added together/i.test(h));
    check('the hint that promises addition is still the one being checked', hintAdds, 'the check is only meaningful while the hint says to add');
  }
  const printed = [...fill.matchAll(/(\d+) days/g)].map((m) => Number(m[1]));
  check('no day figure is printed with a fractional part', !/\d+\.\d+ days/.test(fill), printed.length ? `${new Set(printed).size} distinct day figures printed` : 'none');
}

/* specGap 01-07 and specThin 01-03: each requirement, by its WORDING */
const teaching = strings(row.content).concat(strings(row.notes)).join('  ').toLowerCase();
for (const [label, re, why] of [
  ['operating profit margin', /operating profit margin/, 'specGap-01, bus_spec.txt:932'],
  ['statement of comprehensive income', /statement of comprehensive income/, 'specGap-02, :930'],
  ['profit for the year', /profit for the year/, 'specGap-02, :928'],
  ['distinction between profit and cash', /profit is not cash|distinction between profit and cash/, 'specGap-03, :935'],
  ['statement of financial position', /statement of financial position/, 'specGap-04, :936'],
  ['working capital and its management', /working capital/, 'specGap-05, :941'],
  ['poor marketing', /poor marketing/, 'specGap-06, :948'],
  ['poor quality', /poor quality/, 'specGap-06, :949'],
  ['extraction from a supplied statement', /extract|take the current assets|find the current assets/, 'specGap-07, :816-821'],
  ['overestimation of sales', /overestimation of sales/, 'specThin-01, :945'],
  ['poor inventory control', /poor inventory control/, 'specThin-02, :947'],
  ['interest rates', /interest rates/, 'specThin-03, :955'],
  ['factoring', /factoring/, 'the first of the four items the coverage audit found missing, :940'],
  ['exchange rates', /exchange rates/, 'the second, :954'],
  ['supplier problems', /supplier problems/, 'the third, :957'],
  ['natural phenomena', /natural phenomena/, 'the fourth, :958'],
]) check(`"${label}" is taught in content[] or notes[]`, re.test(teaching), why);

/* structure-07: nothing quizzed or flashcarded that the teaching text does not cover */
for (const [name, items] of [['quiz', row.quiz.map((q) => `${q.question} ${q.options.join(' ')}`)], ['flashcards', row.flashcards.map((c) => `${c.front} ${c.back}`)]]) {
  const missing = ['statement of financial position', 'current assets', 'current liabilities', 'working capital', 'acid test']
    .filter((t) => items.join(' ').toLowerCase().includes(t) && !teaching.includes(t));
  check(`nothing in the ${name} tests a term the teaching text omits`, missing.length === 0, missing.join(', ') || 'structure-07');
}

/* ══ verdict ═══════════════════════════════════════════════════════════════ */
console.log(`\n${ok.length} checks passed against the draft row.`);
if (bad.length) {
  console.error(`\n${bad.length} FAILED:`);
  for (const b of bad) console.error(`  - ${b}`);
  process.exit(1);
}
console.log('draft verified field by field against the database, with every figure re-derived from the served text.');
