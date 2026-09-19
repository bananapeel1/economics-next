// Tests for the content validator. `npm test`.
//
// Three kinds of check, because each catches a different way of being wrong:
//
//   1. Fixtures. audit/fixtures/validator/cases.json holds a failing case for EVERY rule and passing
//      cases for the ones with a judgement in them. A rule with no failing fixture is a rule nobody
//      has watched fire, so the test refuses to pass until one exists.
//   2. Reference assets. The tariff tables in code must equal the one parsed from the spec text, and
//      both generated assets must be current with their generators (`--check`). A stale asset is the
//      12 September failure mode: a table everyone reads that nobody regenerated.
//   3. The corpus. The 43 audit snapshots are the golden set for the recall rules, judged against
//      the March per-recall verdicts. These are floors, not exact numbers: the rules are lexical and
//      the verdicts are semantic, and the point of the floor is to notice a future edit that quietly
//      stops the rules catching what they catch today.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { validateSection, RULES, laterUnitTerms } from './content-validator.mjs';
import { ECONOMICS, BUSINESS } from './ial-marking.js';

const cases = JSON.parse(readFileSync('audit/fixtures/validator/cases.json', 'utf8'));
const clone = (v) => JSON.parse(JSON.stringify(v));

/** Apply a dot-path patch. `*` fans out over arrays; `@first2` / `@first4` / `@words400` are macros. */
function applyPatch(base, ctx, patch) {
  const b = clone(base); const c = clone(ctx);
  for (const [path, raw] of Object.entries(patch)) {
    let value = raw;
    if (value === '@first2') value = clone(b.content).slice(0, 2);
    if (value === '@first4') value = clone(b.quiz).slice(0, 4);
    if (value === '@words400') value = Array.from({ length: 400 }, (_, i) => `word${i}`).join(' ');
    const isCtx = path.startsWith('ctx.');
    const parts = (isCtx ? path.slice(4) : path).split('.');
    const roots = [isCtx ? c : b];
    const set = (obj, keys) => {
      const [k, ...rest] = keys;
      if (k === '*') { (Array.isArray(obj) ? obj : []).forEach((o) => set(o, rest)); return; }
      if (!rest.length) { if (value === null) delete obj[k]; else obj[k] = clone(value); return; }
      if (obj[k] == null) obj[k] = /^\d+$/.test(rest[0]) ? [] : {};
      set(obj[k], rest);
    };
    for (const r of roots) set(r, parts);
  }
  if (c.laterUnitTerms) c.laterUnitTerms = new Set(c.laterUnitTerms);
  return { bundle: b, ctx: c };
}

const rulesOf = (bundle, ctx) => new Set(validateSection(bundle, ctx).findings.map((f) => f.rule));

test('the base fixture is clean apart from INFO', () => {
  const { findings } = validateSection(cases.base, cases.ctx);
  const nonInfo = findings.filter((f) => f.tier !== 'INFO');
  assert.deepEqual(nonInfo.map((f) => `${f.rule}: ${f.detail}`), [], 'base fixture must produce no BLOCK or DEBT');
});

test('every rule has at least one failing fixture', () => {
  const covered = new Set(cases.cases.filter((k) => k.fail).map((k) => k.rule));
  const missing = Object.keys(RULES).filter((r) => !covered.has(r));
  assert.deepEqual(missing, [], `rules with no failing fixture: ${missing.join(', ')}`);
});

for (const k of cases.cases) {
  if (k.fail) {
    test(`${k.rule} fires on its failing fixture`, () => {
      const { bundle, ctx } = applyPatch(cases.base, cases.ctx, k.fail);
      const fired = rulesOf(bundle, ctx);
      assert.ok(fired.has(k.rule), `${k.rule} did not fire; fired: ${[...fired].filter((r) => RULES[r].tier !== 'INFO').join(', ') || '(nothing)'}`);
    });
  }
  if (k.pass) {
    test(`${k.rule} stays quiet on its passing fixture`, () => {
      const { bundle, ctx } = applyPatch(cases.base, cases.ctx, k.pass);
      const fired = rulesOf(bundle, ctx);
      assert.ok(!fired.has(k.rule), `${k.rule} fired on a passing case`);
    });
  }
}

test('every finding carries a stable key and a known tier', () => {
  const { findings } = validateSection(cases.base, cases.ctx);
  for (const f of findings) {
    assert.ok(f.key.startsWith(`${cases.ctx.sectionId}|${f.rule}|`), f.key);
    assert.ok(['BLOCK', 'DEBT', 'INFO'].includes(f.tier));
    assert.equal(f.tier, RULES[f.rule].tier);
  }
});

test('tariff tables in code equal the census parsed from the specification', () => {
  const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8'));
  const fromCensus = (s) => Object.fromEntries(census.rows.filter((r) => r.subject === s).map((r) => [r.command, r.marks]));
  assert.deepEqual(ECONOMICS.tariffs, fromCensus('economics'));
  assert.deepEqual(BUSINESS.tariffs, fromCensus('business'));
  for (const a of ECONOMICS.absent) assert.ok(!(a in fromCensus('economics')), `${a} is listed absent but the census has it`);
  for (const a of BUSINESS.absent) assert.ok(!(a in fromCensus('business')), `${a} is listed absent but the census has it`);
});

test('generated assets are current with their generators', () => {
  execFileSync('node', ['audit/scripts/build-tariff-census.mjs', '--check'], { stdio: 'pipe' });
  execFileSync('node', ['audit/scripts/build-spec-items.mjs', '--check'], { stdio: 'pipe' });
});

test('spec-items is mechanically complete against the source text', () => {
  const j = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  for (const [subject, file] of [['economics', 'audit/raw/econ_spec.txt'], ['business', 'audit/raw/bus_spec.txt']]) {
    const raw = readFileSync(file, 'utf8').replace(/\f/g, '').split('\n');
    const rows = j.items.filter((i) => i.subject === subject);
    // V001: this census used to find bullets with /^\s*•/ — the parser's own assumption — so it
    // reported 0 missed for a parser that could not see a bullet sharing a line with a wrapped
    // left-column title, and 43 leaves stayed invisible for a month. The detector is now the bullet
    // CHARACTER at any position, which is the one thing the parser does not get to define.
    const HAS_BULLET = /[\u2022\u25cf\u25aa\u2023]/;
    const LETTERED = /\b[a-z]\)\s/;
    const rowStart = new Set(rows.map((i) => i.lines[0]));
    let leaks = 0;
    for (const it of rows.filter((i) => i.kind === 'leaf')) { const src = raw[it.lines[0] - 1] || ''; if (!(HAS_BULLET.test(src) || LETTERED.test(src))) leaks += 1; }
    const topics = j.topics.filter((t) => t.subject === subject).sort((a, b) => a.line - b.line);
    const stop = /^\s*(Unit [1-4]:\s+\S|Assessment information\s*$|Assessment objectives)/;
    let missed = 0;
    for (let t = 0; t < topics.length; t += 1) {
      const start = topics[t].line; let end = t + 1 < topics.length ? topics[t + 1].line : raw.length;
      for (let i = start; i < end; i += 1) if (stop.test(raw[i - 1] || '')) { end = i; break; }
      // A row must START at the line, not merely be swept up by some other row's wrap range: a
      // swallowed bullet sits inside the previous row's lines[] and would count as covered.
      for (let ln = start + 1; ln < end; ln += 1) { const src = raw[ln - 1] || ''; if ((HAS_BULLET.test(src) || LETTERED.test(src)) && !rowStart.has(ln)) missed += 1; }
    }
    assert.equal(leaks, 0, `${subject}: ${leaks} leaf rows point at a line that is neither a bullet nor a lettered requirement`);
    assert.equal(missed, 0, `${subject}: ${missed} bullet/lettered lines inside topic spans start no row`);
  }
  // A bullet character inside a row's wording means that row ate the bullet after it. 32 rows did
  // before V001 was fixed on 16 Sep 2026; the parser has no legitimate reason to produce one.
  const swallowed = j.items.filter((i) => /[\u2022\u25cf\u25aa\u2023]/.test(i.wording));
  assert.equal(swallowed.length, 0, `${swallowed.length} rows carry a bullet character inside their wording, e.g. ${swallowed[0]?.id}`);
  // The worked example from V001: econ_spec.txt:528-533 prints five bullets under 4a.
  const ppf = j.items.filter((i) => i.parent === 'ECON-1.3.1-4a');
  assert.equal(ppf.length, 5, `ECON-1.3.1-4a has ${ppf.length} bullets; the specification prints five`);
  assert.ok(j.counts.leaves >= 1150 && j.counts.leaves <= 1190, `leaf count ${j.counts.leaves} moved outside the verified range (1,165 on 16 Sep 2026, after V001); re-read the reconciliation note before accepting`);
});

test('recall.recoverable is A/B\'d against REAL subsections out of the t=0 corpus, not against an invented teach (V029 reason 4)', () => {
  /*
   * VERIFY A REJECTED THE FIRST VERSION OF THIS PACKET FOR NOT HAVING THIS TEST, and it was right.
   * V029's fourth reason is that packet 29's A/B used "an INVENTED one-sentence teaching text that
   * omits the body paragraph the real step carries" — the negative control was a stripped-down fake
   * of the step it was clearing. The fixtures in audit/fixtures/validator/cases.json are a synthetic
   * bundle, and four of the recall.recoverable cases there patch the teach text as well as the
   * recall, which is the same pattern one layer down. A comment in content-validator.mjs claimed
   * the controls were "whole subsections out of the corpus"; they were not, and it said so for
   * several hours.
   *
   * audit/content-sections/ is the t=0 corpus, committed, 43 sections. These controls are whole
   * subsections out of it, body and all, named so a future reader can go and look at them.
   */
  const load = (section) => JSON.parse(readFileSync(`audit/content-sections/${section}.json`, 'utf8'));
  const flagged = (section) => {
    const d = load(section); const m = d.meta;
    const { findings } = validateSection(d, { sectionId: m.id, subject: m.subject, unitCode: m.unitCode, number: m.number });
    return new Set(findings.filter((f) => f.rule === 'recall.recoverable').map((f) => f.where));
  };

  /* POSITIVE: real steps whose answers are on the screen above the widget. */
  const el = flagged('business__entrepreneurs-leaders');
  for (const sub of ['what-entrepreneurs-do', 'creating-running-expanding', 'barriers-to-entrepreneurship', 'financial-motives']) {
    assert.ok(el.has(`sub:${sub}:recall`), `"${sub}" hands its answer to the student and the measure missed it`);
  }
  /* NEGATIVE: real steps, same sections, same body shapes, that it must leave alone. */
  for (const sub of ['intrapreneurship', 'skills-and-characteristics', 'conflicts-between-objectives']) {
    assert.ok(!el.has(`sub:${sub}:recall`), `"${sub}" is not answerable from its own step and the measure fired on it`);
  }
  const mf = flagged('business__managing-finance');
  for (const sub of ['interpreting-income-statements', 'liquidity-ratios', 'external-causes-of-failure']) {
    assert.ok(!mf.has(`sub:${sub}:recall`), `"${sub}" is not answerable from its own step and the measure fired on it`);
  }

  /*
   * THE CORPUS FLOOR, in the idiom this file already uses for the reorder rules: a number, measured,
   * that a future edit quietly weakening the measure has to move. 249 of 272 on 19 September 2026.
   * It is a FLOOR and not an exact figure — the rule may legitimately find more — so only a FALL is
   * an error, and the band is wide enough that a real authoring fix to the t=0 corpus (which is
   * frozen, so there will not be one) would not trip it.
   */
  let recalls = 0; let hits = 0;
  for (const f of readdirSync('audit/content-sections')) {
    const d = JSON.parse(readFileSync(`audit/content-sections/${f}`, 'utf8')); const m = d.meta;
    const { findings } = validateSection(d, { sectionId: m.id, subject: m.subject, unitCode: m.unitCode, number: m.number });
    hits += findings.filter((x) => x.rule === 'recall.recoverable').length;
    for (const b of d.content || []) for (const sec of b.sections || []) if (sec?.recall) recalls += 1;
  }
  assert.equal(recalls, 272, `the t=0 corpus holds 272 recalls; found ${recalls}`);
  assert.ok(hits >= 249, `the measure found ${hits} of ${recalls} recoverable in the t=0 corpus, below the 249 measured on 19 Sep 2026 — something weakened it`);
});

test('the recall rules hold their measured floors against the March per-recall verdicts', () => {
  const audits = JSON.parse(readFileSync('audit/raw/content-audits.json', 'utf8'));
  let gen = 0; let bad = 0; const hit = { crit: [0, 0], union: [0, 0] };
  for (const f of readdirSync('audit/content-sections')) {
    const d = JSON.parse(readFileSync(`audit/content-sections/${f}`, 'utf8')); const m = d.meta;
    const { findings } = validateSection(d, { sectionId: m.id, subject: m.subject, unitCode: m.unitCode, number: m.number });
    const sub = (x) => x.where.replace(/:reorder$/, '').replace(/^sub:/, '');
    const crit = new Set(findings.filter((x) => x.rule === 'reorder.criterion').map(sub));
    const union = new Set(findings.filter((x) => /^reorder\.(criterion|source|lead)$/.test(x.rule)).map(sub));
    const a = audits.find((x) => x.sectionId === m.id);
    for (const r of a?.recallAudit || []) {
      if (r.type !== 'reorder') continue;
      const isBad = ['weak-or-arbitrary-sequence', 'not-orderable'].includes(r.verdict); const isGen = r.verdict === 'genuine-sequence';
      if (!isBad && !isGen) continue;
      if (isGen) gen += 1; else bad += 1;
      if (crit.has(r.subsectionId)) hit.crit[isGen ? 0 : 1] += 1;
      if (union.has(r.subsectionId)) hit.union[isGen ? 0 : 1] += 1;
    }
  }
  assert.equal(gen, 64); assert.equal(bad, 66);
  // Measured 14 Sep 2026: criterion 17/64 genuine, 40/66 bad; any of the three 27/64, 51/66.
  assert.ok(hit.crit[0] <= 20, `criterion flags ${hit.crit[0]} genuine sequences; it should flag only the underspecified prompts (~17)`);
  assert.ok(hit.crit[1] >= 38, `criterion flags ${hit.crit[1]} of 66 bad; floor 38`);
  assert.ok(hit.union[1] >= 50, `the three reorder rules together flag ${hit.union[1]} of 66 bad; floor 50`);
  assert.ok(hit.union[0] <= 32, `the three reorder rules together flag ${hit.union[0]} of 64 genuine; ceiling 32`);
});

test('the later-unit lint is built from spec labels and stays small', () => {
  const j = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  for (const s of ['economics', 'business']) {
    const terms = laterUnitTerms(j.items, s);
    assert.ok(terms.size >= 10 && terms.size <= 40, `${s}: ${terms.size} later-unit labels`);
    for (const t of terms) assert.ok(!/\b(and|or|in|of|the|for|to|versus)$/.test(t), `fragment: "${t}"`);
  }
});

/*
 * V012. The rule is "a term the spec introduces ONLY in Units 3-4". This asserts BOTH directions,
 * because the previous version of the check shared the implementation's blind spot: it only ever
 * asked whether the set was small and free of fragments, so two labels that Units 1-2 also teach sat
 * in it for a month and were reported against two sections quoting the specification at them.
 */
test('a Units 3-4 label that Units 1-2 also teach is not later-unit vocabulary', () => {
  const j = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const clean = (l) => String(l || '').toLowerCase().replace(/\s*\(continued\)\s*/g, ' ').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

  // Direction 1, the bug: no term survives that Units 1-2 state in their own label or wording.
  for (const s of ['economics', 'business']) {
    const early = j.items.filter((i) => i.subject === s && Number(String(i.topic).split('.')[0]) <= 2)
      .map((i) => `${clean(i.subtopicLabel)} ${clean(i.wording)}`).join(' | ');
    for (const t of laterUnitTerms(j.items, s)) {
      assert.ok(!early.includes(t), `"${t}" is flagged as later-unit vocabulary, but Units 1-2 of ${s} teach that exact phrase`);
    }
  }

  // The two the fix was measured on, named so a regression says which.
  assert.ok(!laterUnitTerms(j.items, 'business').has('niche markets'),
    '"niche markets" is Business 1.3.1 sub-topic 1a and the leaf 1.3.3 1e-2 before it is a Unit 4 heading');
  assert.ok(!laterUnitTerms(j.items, 'economics').has('exchange rates'),
    '"exchange rates" is taught in Economics Units 1-2, not only in Units 3-4');

  // Direction 2, the guard against over-correcting: genuine Unit 3-4 vocabulary is still caught.
  const bus = laterUnitTerms(j.items, 'business');
  const econ = laterUnitTerms(j.items, 'economics');
  assert.ok(bus.size >= 20, `business kept only ${bus.size} later-unit labels; the fix should drop one, not the set`);
  assert.ok(econ.size >= 15, `economics kept only ${econ.size} later-unit labels; the fix should drop one, not the set`);
});

test('the assessed-but-never-taught items are seen by Layer 3', () => {
  const j = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const ant = JSON.parse(readFileSync('audit/raw/assessed-not-taught-2026-09-13.json', 'utf8'));
  const tok = (s) => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(' ').filter((w) => w.length > 3));
  let caught = 0;
  for (const f of readdirSync('audit/content-sections')) {
    const key = f.replace('.json', ''); const mine = ant.filter((x) => x.sec === key); if (!mine.length) continue;
    const d = JSON.parse(readFileSync(`audit/content-sections/${f}`, 'utf8')); const m = d.meta;
    const items = j.items.filter((i) => i.subject === m.subject && i.topic === m.number);
    const { findings } = validateSection(d, { sectionId: m.id, subject: m.subject, unitCode: m.unitCode, number: m.number, specItems: items });
    const unc = new Set(findings.filter((x) => x.rule === 'spec.uncovered').map((x) => x.where.replace(/^spec:/, '')));
    for (const it of mine) {
      const req = it.req.replace(/^[0-9]+[a-z]?\)?\s*/, '');
      let best = null; let bs = 0;
      for (const leaf of items.filter((i) => i.kind === 'leaf')) { const A = tok(req); const B = tok(leaf.wording); let n = 0; for (const w of A) if (B.has(w)) n += 1; const jac = n / Math.max(1, A.size + B.size - n); if (jac > bs) { bs = jac; best = leaf; } }
      if (best && unc.has(best.id)) caught += 1;
    }
  }
  // 14 of 17 on 14 Sep 2026. The three misses are leaves whose words appear in passing without the
  // concept being taught; a lexical evidence test cannot see that, and the floor guards the 14.
  assert.ok(caught >= 13, `Layer 3 flags ${caught} of ${ant.length} assessed-but-untaught items; floor 13`);
});

/* ── keys: what the baseline can and cannot mask ─────────────────────────── */

const keysFor = (bundle, ctx, rule) => validateSection(bundle, ctx).findings.filter((f) => f.rule === rule).map((f) => f.key);

test('a rewritten item with the same id gets a new key (the verifier\'s masking case)', () => {
  const a = applyPatch(cases.base, cases.ctx, { 'quiz.0.question': 'Evaluate the case for a maximum price on rents.' });
  const b = applyPatch(cases.base, cases.ctx, { 'quiz.0.question': 'Evaluate whether a minimum wage raises unemployment.' });
  const ka = keysFor(a.bundle, a.ctx, 'quiz.essay-stem'); const kb = keysFor(b.bundle, b.ctx, 'quiz.essay-stem');
  assert.equal(ka.length, 1); assert.equal(kb.length, 1);
  assert.notEqual(ka[0], kb[0], 'same id, different stem, same key: a baselined BLOCK would mask the rewrite');
  assert.match(ka[0], /^fixture\|quiz\.essay-stem\|q1\|[0-9a-f]{8}$/);
});

test('reordering items and editing other items leave a key alone', () => {
  const a = applyPatch(cases.base, cases.ctx, { 'quiz.0.question': 'Evaluate the case for a maximum price on rents.' });
  const [k] = keysFor(a.bundle, a.ctx, 'quiz.essay-stem');
  const reordered = clone(a.bundle); reordered.quiz = [...reordered.quiz.slice(1), reordered.quiz[0]];
  assert.deepEqual(keysFor(reordered, a.ctx, 'quiz.essay-stem'), [k], 'moving the item in the array changed its key');
  const elsewhere = clone(a.bundle); elsewhere.quiz[1].explanation += ' Edited.'; elsewhere.content[0].sections[0].keyIdea = 'A different key idea, still short.';
  assert.deepEqual(keysFor(elsewhere, a.ctx, 'quiz.essay-stem'), [k], 'editing another item changed this one\'s key');
});

test('a recall\'s key follows the recall, not the surrounding teaching text', () => {
  const a = applyPatch(cases.base, cases.ctx, { 'content.0.sections.0.recall': { id: 'r1', type: 'fillin', template: ['Price ___ and demand ___'], answers: ['rises', 'rises'], hints: ['r', 'r'] } });
  const [k] = keysFor(a.bundle, a.ctx, 'fillin.dup-answers');
  assert.ok(k, 'fixture did not fire fillin.dup-answers');
  const prose = clone(a.bundle); prose.content[0].sections[0].keyIdea = 'A rewritten key idea for the same subsection.';
  assert.deepEqual(keysFor(prose, a.ctx, 'fillin.dup-answers'), [k], 'editing the subsection prose changed the recall\'s key');
  const recall = clone(a.bundle); recall.content[0].sections[0].recall.template = ['Price ___ so demand ___'];
  assert.notEqual(keysFor(recall, a.ctx, 'fillin.dup-answers')[0], k, 'editing the recall kept its key');
});

test('a section-level finding is re-keyed when its detail changes and term-level ones are not', () => {
  const a = applyPatch(cases.base, cases.ctx, { quiz: '@first4' });
  const b = applyPatch(cases.base, cases.ctx, { quiz: clone(cases.base.quiz).slice(0, 5) });
  assert.notEqual(keysFor(a.bundle, a.ctx, 'depth.quiz')[0], keysFor(b.bundle, b.ctx, 'depth.quiz')[0], '4 vs 5 quiz items should be different depth.quiz keys');
  const one = applyPatch(cases.base, cases.ctx, { 'content.0.sections.0.realExample.text': 'A merit good example.' });
  const two = applyPatch(cases.base, cases.ctx, { 'content.0.sections.0.realExample.text': 'A merit good example, and another merit good.' });
  assert.deepEqual(keysFor(one.bundle, one.ctx, 'terms.off-spec'), keysFor(two.bundle, two.ctx, 'terms.off-spec'), 'an off-spec term count must not re-key: removing a mention is not a regression');
});

test('a UK institution is one finding per sentence, so a new sentence is a new key', () => {
  const one = applyPatch(cases.base, cases.ctx, { 'content.0.sections.0.realExample.text': 'When the NHS raised charges, demand barely changed.' });
  const two = applyPatch(cases.base, cases.ctx, { 'content.0.sections.0.realExample.text': 'When the NHS raised charges, demand barely changed. The NHS then cut them again.' });
  const k1 = keysFor(one.bundle, one.ctx, 'locale.institution'); const k2 = keysFor(two.bundle, two.ctx, 'locale.institution');
  assert.equal(k1.length, 1); assert.equal(k2.length, 2);
  assert.ok(k2.includes(k1[0]), 'the unchanged sentence must keep its key');
});

test('locale.uk is a ratio: one UK example among international ones passes, the UK alone fails', () => {
  // The base fixture carries five international mentions, so the UK-only case fans out over every subsection.
  const alone = applyPatch(cases.base, cases.ctx, { 'content.*.sections.*.realExample.text': 'After Brexit, Tesco and Aldi UK cut prices across Britain.' });
  assert.ok(rulesOf(alone.bundle, alone.ctx).has('locale.uk'));
  const among = applyPatch(cases.base, cases.ctx, { 'content.0.sections.0.realExample.text': 'After Brexit prices rose in the UK; in Malaysia, Petronas held them, and in Nigeria Dangote cut them; Hong Kong retailers followed.' });
  assert.ok(!rulesOf(among.bundle, among.ctx).has('locale.uk'));
});

/* ── Layer 2: every spec-items row is verbatim against its cited lines ───── */

test('every spec-items wording token appears in its cited source lines (the truncation census)', () => {
  const j = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const src = { economics: readFileSync('audit/raw/econ_spec.txt', 'utf8').replace(/\f/g, '').split('\n'), business: readFileSync('audit/raw/bus_spec.txt', 'utf8').replace(/\f/g, '').split('\n') };
  const bad = [];
  for (const it of j.items) {
    const lines = src[it.subject].slice(it.lines[0] - 1, it.lines[1]).join(' ');
    const missing = it.wording.split(/\s+/).filter((t) => t && !lines.includes(t));
    if (missing.length) bad.push(`${it.id}: ${missing.join(' ')}`);
  }
  assert.deepEqual(bad, [], `${bad.length} rows carry text not on their cited lines`);
});

test('locale.institution does not fire on economics notation that looks like a UK acronym', () => {
  // MPC means marginal private cost here, not the Bank of England's Monetary Policy Committee.
  // 129 of the 131 live sentences using it mean the economics; treating it as an institution
  // produced 130 false BLOCK findings (packet 13).
  const econ = applyPatch(cases.base, cases.ctx, { 'content.0.sections.0.body.0.text': 'The MSC curve lies above the MPC curve, so the market overproduces.' });
  assert.ok(!rulesOf(econ.bundle, econ.ctx).has('locale.institution'), 'MPC as marginal private cost must not read as a UK institution');
  const prop = applyPatch(cases.base, cases.ctx, { 'content.0.sections.0.body.0.text': 'If the MPC is 0.8 the multiplier is 5.' });
  assert.ok(!rulesOf(prop.bundle, prop.ctx).has('locale.institution'), 'MPC as marginal propensity to consume must not read as a UK institution');
  // The real institution is still caught, by name.
  const real = applyPatch(cases.base, cases.ctx, { 'content.0.sections.0.body.0.text': "The Monetary Policy Committee sets the base rate each month." });
  assert.ok(rulesOf(real.bundle, real.ctx).has('locale.institution'), 'the Monetary Policy Committee is a UK institution and must still fire');
});
