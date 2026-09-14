#!/usr/bin/env node
/**
 * PACKET 13 — the off-spec strip and dedupe.
 *
 *   node scripts/packet-13-off-spec-strip.mjs              dry run: print the plan and the verdict
 *   node scripts/packet-13-off-spec-strip.mjs --stage      stage every change as a draft
 *   node scripts/packet-13-off-spec-strip.mjs --section market-failure [--stage]
 *
 * Nothing here is a judgement about good economics. Every removal is a claim that the Edexcel IAL
 * specification does not contain the material, checked against audit/raw/spec-items.json, which is
 * parsed from the specification text with a source line on every row. A student revising a topic the
 * paper cannot ask about is the specific harm; the September audit found the notes were adapted from
 * the UK GCE A-level rather than built from the IAL specification, and this is that difference.
 *
 * WHAT IS REMOVED, AND THE EVIDENCE
 *
 *   The accelerator (economics 2.3.2)          "accelerator" appears 0 times in the IAL Economics
 *                                              specification. UK GCE Theme 2 material.
 *   VRIO and core competencies (business 3.3.5) "VRIO", "core competenc" and "distinctive capabilit"
 *                                              appear 0 times in the IAL Business specification.
 *                                              3.3.5 is financial statements, ratio analysis and HR
 *                                              metrics; none of it is here yet (packet 54's work).
 *   The balanced scorecard, the triple bottom   0 occurrences anywhere in the IAL Business spec.
 *   line (business 3.3.5)
 *   Porter's five forces (business 3.3.5)      Real, but at 3.3.1.4c and 4.3.2.2b, not 3.3.5.
 *   Behavioural economics and bounded           1.3.4 has eleven lettered requirements and none is
 *   rationality (economics 1.3.4)               behavioural. The IAL's only behavioural content is
 *                                               1.3.2.1b, which consumer-behaviour-demand owns.
 *   Monopoly as market failure (economics 1.3.5) Monopoly is 3.3.3.6, a different unit and paper.
 *                                               market-structures-contestability teaches it.
 *   Merit and demerit goods (economics 1.3.5)   "merit" appears 0 times in the IAL Economics spec.
 *                                               The block is also a duplicate: its economics is
 *                                               already taught, in the specification's own words, by
 *                                               the Externalities block (external benefits and costs
 *                                               of consumption, 1.3.5.2c/d) and the Information
 *                                               Failures block (information gaps, 1.3.5.4b).
 *
 * WHAT IS RENAMED, NOT REMOVED
 *
 *   "deadweight loss" -> "welfare loss"        "deadweight" appears 0 times in the specification.
 *                                              It says "welfare loss or gain areas" (1.3.5.2d) and
 *                                              "a net welfare loss" (1.3.6.2a). Same economics, and
 *                                              the phrase a mark scheme will use.
 *   "merit/demerit good" -> "good with         Where the term survives outside 1.3.5 as a category
 *   external benefits/costs"                   of thing governments act on (1.3.6, 4.3.5).
 *
 * WHAT IS DEDUPLICATED, AND WHO OWNS IT (audit/SPEC-OWNERSHIP.md)
 *
 *   The price mechanism    1.3.4.3a-b   price-determination owns it; the single duplicate
 *                                       subsection in introductory-concepts (1.3.1) goes.
 *   Demergers              3.3.1.2g     types-sizes-businesses owns it; the duplicate subsection
 *                                       in business-growth (3.3.2) goes.
 *   The multiplier         2.3.4.4a-d   national-income owns it. NOT executed here: see the file
 *                                       above for why, and the manifest it leaves behind.
 *
 * Item ids are never rewritten, so a subsection id keeps its legacy wording after its title changes.
 * The id is what a student's progress row points at; renaming it would orphan their history.
 */
import { stageSection, loadBundle, contextFor, loadBaseline, TABLE_TO_KEY } from './_content-write.mjs';
import { applyOps } from './_content-ops.mjs';
// --plan dedupe runs the F081 quiz-dedupe plan instead of the off-spec strip.
import { validateSection } from '../lib/content-validator.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const ONLY = (() => { const i = args.indexOf('--section'); return i >= 0 ? args[i + 1] : null; })();
const WHICH = (() => { const i = args.indexOf('--plan'); return i >= 0 ? args[i + 1] : 'strip'; })();
const PLAN_FILES = { strip: './_packet13-plan.mjs', residual: './_packet13-residual-plan.mjs', dedupe: './_packet13-dedupe-plan.mjs', polish: './_packet13-polish-plan.mjs', pass3: './_packet13-pass3-plan.mjs', pass3b: './_packet13-pass3b-plan.mjs', pass3c: './_packet13-pass3c-plan.mjs' };
if (!PLAN_FILES[WHICH]) { console.error(`--plan must be one of ${Object.keys(PLAN_FILES).join(', ')}`); process.exit(1); }
const planModule = await import(PLAN_FILES[WHICH]);
const { PLAN } = planModule;
// A plan may declare phrases that must not survive it. Checked over the WHOLE would-be section, so a
// substitution that silently matched nothing is caught here rather than by the next verifier.
const MUST_NOT_SURVIVE = planModule.MUST_NOT_SURVIVE || [];
const allStrings = (v, out = []) => { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => allStrings(x, out)); return out; };

/* ── run ───────────────────────────────────────────────────────────────────── */

const sections = ONLY ? [ONLY] : Object.keys(PLAN);
if (ONLY && !PLAN[ONLY]) { console.error(`no plan for section "${ONLY}"`); process.exit(1); }

const baseline = loadBaseline();
let staged = 0; let refused = 0;
const summary = [];

for (const sectionId of sections) {
  const live = await loadBundle(sectionId);
  const ctx = await contextFor(sectionId);
  const beforeFindings = validateSection(live, ctx).findings;
  const { bundle: next, log, changed } = applyOps(live, PLAN[sectionId]);

  console.log(`\n=== ${sectionId} (${ctx.number} ${ctx.unitCode}) — ${changed.length} table(s) change`);
  log.forEach((l) => console.log(l));

  const survivors = MUST_NOT_SURVIVE.filter((phrase) => allStrings(next).some((t) => t.includes(phrase)));
  if (survivors.length) { console.log(`  SURVIVED (plan says these must be gone): ${survivors.map((x) => JSON.stringify(x)).join(', ')}`); }

  const afterAll = validateSection(next, ctx);
  const newBlocks = afterAll.findings.filter((f) => f.tier === 'BLOCK' && !baseline.has(f.key));
  const clearedBlocks = beforeFindings.filter((f) => f.tier === 'BLOCK' && baseline.has(f.key) && !afterAll.findings.some((g) => g.key === f.key));
  const clearedDebt = beforeFindings.filter((f) => f.tier === 'DEBT' && baseline.has(f.key) && !afterAll.findings.some((g) => g.key === f.key));
  const newDebt = afterAll.findings.filter((f) => f.tier === 'DEBT' && !baseline.has(f.key));
  console.log(`  validator: ${clearedBlocks.length} baselined BLOCK cleared, ${clearedDebt.length} DEBT cleared, ${newBlocks.length} new BLOCK, ${newDebt.length} new DEBT`);
  for (const f of newBlocks) console.log(`    NEW BLOCK  ${f.rule.padEnd(22)} ${f.detail}`);
  for (const f of newDebt.slice(0, 6)) console.log(`    new debt   ${f.rule.padEnd(22)} ${f.detail.slice(0, 110)}`);
  if (newDebt.length > 6) console.log(`    new debt   … and ${newDebt.length - 6} more`);
  summary.push({ sectionId, changed: changed.length, clearedBlocks: clearedBlocks.length, clearedDebt: clearedDebt.length, newBlocks: newBlocks.length, newDebt: newDebt.length });

  if (!STAGE) continue;
  if (newBlocks.length) { console.log('  NOT STAGED: would introduce a BLOCK finding'); refused += 1; continue; }
  if (survivors.length) { console.log('  NOT STAGED: a phrase the plan says must be gone is still there'); refused += 1; continue; }
  for (const table of Object.keys(TABLE_TO_KEY)) {
    const key = TABLE_TO_KEY[table];
    if (!changed.includes(key)) continue;
    const res = await stageSection(sectionId, table, next[key]);
    if (!res.ok) { console.log(`  REFUSED ${table}: ${res.newBlocks.map((f) => f.rule).join(', ')}`); refused += 1; }
    else { console.log(`  staged ${table}`); staged += 1; }
  }
}

console.log('\n' + 'section'.padEnd(34) + 'tables  BLOCK-cleared  DEBT-cleared  new-BLOCK  new-DEBT');
for (const r of summary) console.log(r.sectionId.padEnd(34) + String(r.changed).padStart(6) + String(r.clearedBlocks).padStart(15) + String(r.clearedDebt).padStart(14) + String(r.newBlocks).padStart(11) + String(r.newDebt).padStart(10));
const tot = (k) => summary.reduce((a, r) => a + r[k], 0);
console.log('total'.padEnd(34) + String(tot('changed')).padStart(6) + String(tot('clearedBlocks')).padStart(15) + String(tot('clearedDebt')).padStart(14) + String(tot('newBlocks')).padStart(11) + String(tot('newDebt')).padStart(10));

if (!STAGE) console.log('\nDry run. Nothing written. Add --stage to write drafts, then publish with scripts/publish-section.mjs.');
else console.log(`\n${staged} table(s) staged as drafts${refused ? `, ${refused} refused` : ''}. Review: node scripts/publish-section.mjs <section>`);
if (refused) process.exit(1);
