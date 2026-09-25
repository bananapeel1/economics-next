#!/usr/bin/env node
//
// npm run spec-coverage — is a student EXAMINED on every spec leaf?
//
//   npm run spec-coverage                                    every section; exit 1 on any failure
//   npm run spec-coverage -- --section market-failure        one section, with its unexamined leaves
//   npm run spec-coverage -- --baseline                      print the failure keys, do not fail
//   npm run spec-coverage -- --baseline --confirm            rewrite audit/spec-coverage-baseline.json
//   npm run spec-coverage -- --staged                        measure the staged rebuilds instead of live
//   npm run spec-coverage -- --json                          machine-readable, for a test
//
// Packet 12.1, E002. The flags mirror audit/scripts/validate-content.mjs on purpose: the same hands
// run both, and a guard with its own dialect gets run less.
//
// WHAT IT MEASURES, AND WHAT IT DOES NOT. `validate-content.mjs` has a `spec.coverage` rule, but it
// asks whether the TEACHING TEXT evidences each spec leaf. This asks whether a QUESTION examines it.
// Those are different claims and only the second is the product's claim. Nothing measured either
// before packet 12.1.
//
// THE DENOMINATOR IS 1,165. That is the count of `kind: 'leaf'` rows in audit/raw/spec-items.json.
// It is not 1,362 (leaves plus the requirement headers above them) and not 1,073 (the March coverage
// audit's requirement count). The 1,362-vs-1,073 gap is already reconciled inside the oracle
// (`reconciliationNote`, 14 September) and must not be re-reconciled here — a guard built on the
// wrong denominator reports a confident wrong percentage, which is worse than reporting nothing.
//
// THE TWO BANKS, both read-only:
//   1. data/modelAnswersData.js (+ modelAnswersExpansion.js) — 66 items behind the SEO pages.
//   2. section_practice — the app's Practice tab. Read from files, never from the database: the t=0
//      dump in audit/content-sections/, the last file-level snapshot of the published tables,
//      or with --staged the newest rebuild in audit/snapshots/. Nothing here opens a Supabase
//      client, so this can run in CI and cannot be the thing that breaks a Vercel build (rule 2).
//
// TAGS FOR BANK 2 come from audit/runs/packet-12.1/section_practice-tags.json while the
// `spec_items` column does not exist. The guard says so in its header rather than pretending the
// column is there and empty — "absent" and "tagged as nothing" are different facts.
//
// THE THREE FAILURES:
//   tariff   a (command, marks) pair that is not in lib/ial-marking.js for that subject
//   specid   a specItems id that is not in audit/raw/spec-items.json, or an empty specItems array
//   noeval   a section with at least one question and no evaluative question. Evaluative means
//            Evaluate 20 in either subject, or Discuss 14 in Economics. Business Discuss is 8 and
//            is NOT evaluative for this rule; Business's evaluative items are Assess and Evaluate.
//
// An UNTAGGED question is not a failure. It is the ordinary state of 45 of the 46 sections today,
// and it is reported as a count so the coverage number cannot be read as better than it is.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// Packet 12.2, E013. The per-section computation that used to sit in `collect()` below now lives in
// lib/spec-coverage.js, so the lab page and this guard cannot report different numbers for the same
// section. What stays here is everything this file is: the flags, the two banks, and the report.
import { loadOracle, loadSections, sectionCoverage } from '../../lib/spec-coverage.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const ONLY = (() => { const i = args.indexOf('--section'); return i >= 0 ? args[i + 1] : null; })();
const BASELINE_MODE = args.includes('--baseline');
const CONFIRM = args.includes('--confirm');
const JSON_OUT = args.includes('--json');
const FIXTURE = (() => { const i = args.indexOf('--fixture'); return i >= 0 ? args[i + 1] : null; })();
const STAGED = args.includes('--staged');
const BASELINE_PATH = path.join(ROOT, 'audit/spec-coverage-baseline.json');

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const exists = (p) => { try { fs.accessSync(p); return true; } catch { return false; } };

/* ── The oracle and the 43 sections, both from lib/spec-coverage.js ──────────────────────────── */

const LEAVES = loadOracle().leaves;
const SECTIONS = loadSections();

/* ── Bank 1: the model answers ───────────────────────────────────────────────────────────────── */

async function modelAnswerItems() {
  const mod = await import(`file://${path.join(ROOT, 'data/modelAnswersData.js')}`);
  return mod.MODEL_ANSWERS.map((a) => ({
    bank: 'modelAnswers',
    ref: a.id,
    subject: a.subject,
    topic: a.sectionNumber,
    command: a.commandWord,
    marks: a.marks,
    specItems: a.specItems,
    question: a.question,
    kind: a.kind,
    ao: a.ao,
    stimulusRef: a.stimulusRef,
    commandWord: a.commandWord,
  }));
}

/* ── Bank 2: section_practice, from files ────────────────────────────────────────────────────── */

/**
 * Which file stands for `section_practice`. Never the database: nothing here opens a Supabase
 * client, so the guard runs in CI and cannot be the thing that breaks a Vercel build.
 *
 * DEFAULT IS THE t=0 DUMP, and that choice is load-bearing. `audit/content-sections/` is the last
 * file-level snapshot of the PUBLISHED tables, and packets 14-31 are staged and not published
 * (NEXT.md, "Nothing in packets 14-18 is live"). Reading the rebuilt bundles by default would have
 * the guard report the fixed content and hide the shipped defect, and NEXT.md is explicit that the
 * guard must REPORT market-failure's invalid tariffs rather than hide them.
 *
 * IT IS NOT LIVE, and the gap is real. Walking market-failure on the dev server on 18 September
 * showed `Analyse 6` and `Explain 4` where the t=0 dump holds `Analyse 10` and `Outline 4`: the
 * packet 0 and packet 13 in-place edits landed in the database and no file records them. So the
 * default is a LOWER BOUND on the live bank's quality, never an overstatement of it. Reading the
 * table itself is packet 12.4's job, once `spec_items` exists and there is something to read.
 *
 * `--staged` measures the newest bundle in audit/snapshots/ instead, which is what publishing would
 * serve. Run both: the gap between them is the value sitting unshipped.
 */
function practiceSourceFor(section) {
  const t0 = path.join(ROOT, 'audit/content-sections', `${section.subject}__${section.slug}.json`);
  if (STAGED) {
    const dir = path.join(ROOT, 'audit/snapshots');
    const suffix = `__${section.subject}__${section.slug}.json`;
    const bundles = exists(dir)
      ? fs.readdirSync(dir).filter((n) => n.includes('bundle') && n.endsWith(suffix)).sort()
      : [];
    if (bundles.length) return { file: path.join(dir, bundles[bundles.length - 1]), origin: 'staged' };
  }
  if (exists(t0)) return { file: t0, origin: 't=0 dump' };
  return null;
}

function practiceRows(section) {
  const src = practiceSourceFor(section);
  if (!src) return { rows: [], origin: 'missing' };
  const j = read(src.file);
  const rows = j.practice || j.tables?.practice || [];
  return { rows: Array.isArray(rows) ? rows : [], origin: src.origin };
}

/** Staged tags, while `section_practice.spec_items` does not exist. */
function stagedTags() {
  const p = path.join(ROOT, 'audit/runs/packet-12.1/section_practice-tags.json');
  if (!exists(p)) return { byQuestion: new Map(), columnPresent: false, file: null };
  const j = read(p);
  const byQuestion = new Map((j.rows || []).map((r) => [r.question, r.spec_items]));
  return { byQuestion, columnPresent: false, file: 'audit/runs/packet-12.1/section_practice-tags.json' };
}

/* ── The run ─────────────────────────────────────────────────────────────────────────────────── */

async function collect() {
  const answers = FIXTURE ? [] : await modelAnswerItems();
  const staged = FIXTURE ? { byQuestion: new Map(), columnPresent: false, file: null } : stagedTags();
  const fixture = FIXTURE ? read(path.isAbsolute(FIXTURE) ? FIXTURE : path.join(ROOT, FIXTURE)) : null;
  const sections = fixture
    ? fixture.sections.map((s) => ({ slug: s.slug, subject: s.subject, topic: s.topic, title: s.title || s.slug, unit: Number(String(s.topic).split('.')[0]) }))
    : SECTIONS;

  const rows = [];
  const failures = [];

  for (const section of sections) {
    if (ONLY && section.slug !== ONLY) continue;

    let items;
    let origin;
    if (fixture) {
      const fs2 = fixture.sections.find((s) => s.slug === section.slug);
      origin = 'fixture';
      items = (fs2.items || []).map((q, i) => ({
        bank: 'fixture', ref: `${section.slug}:${i}`, subject: section.subject, topic: section.topic,
        command: q.command, commandWord: q.command, marks: q.marks, question: q.question,
        specItems: q.specItems, kind: q.kind, ao: q.ao, stimulusRef: q.stimulusRef,
      }));
    } else {
      const p = practiceRows(section);
      origin = p.origin;
      items = p.rows.map((q, i) => ({
        bank: 'section_practice', ref: `${section.slug}:${i}`, subject: section.subject, topic: section.topic,
        command: q.command, commandWord: q.command, marks: q.marks, question: q.question,
        specItems: staged.byQuestion.get(q.question), kind: q.kind, ao: q.ao, stimulusRef: q.stimulusRef,
      }));
      items = items.concat(
        answers.filter((a) => a.subject === section.subject && a.topic === section.topic),
      );
    }

    // The whole per-section computation — the three failure rules, the untagged count, the
    // examined/unexamined split, the command histogram — is lib/spec-coverage.js's job now. The t=0
    // rows for 24 sections carry no `command` field and that module derives it from the question's
    // first word, exactly as the Practice tab does; see its `sectionCoverage` header.
    const cov = sectionCoverage({
      subject: section.subject, topic: section.topic, slug: section.slug, items,
    });
    failures.push(...cov.failures);

    /*
     * E025, the zerocov rule. The defect this guard was built for: 3.3.1 shipped a live
     * model-answer page printing a 0.0% coverage line above two genuine exam questions, because
     * the questions examined 3.3.2's specification rather than its own. Every other rule stayed
     * silent — the tariffs were valid, the ids were real, an evaluative question was present — so
     * nothing caught it and a human read the table.
     *
     * It keys on HAVING MODEL ANSWERS, not on having questions, and that distinction is the whole
     * rule. All 43 sections carry exactly 5 `section_practice` rows, and those are untagged in
     * every one of them until scripts/packet-12-1-spec-items.sql is run, so "every section with
     * questions" would fail 13 sections — 11 Business, 2 Economics — for a reason that is uniform,
     * explicable and TRUE: they have no model answers, and 0.0% is the honest number for a section
     * that examines its specification with nothing. Keying on model answers keeps the original
     * defect in scope (a section that HAS them and still reads 0.0% fires) without tagging
     * anything to make the number move. Narrowing a rule until it cannot fail is the failure mode
     * this one is guarding against, so: `audit/fixtures/spec-coverage/zero-coverage.json` differs
     * from the clean control only in which section its ids belong to, and fires this rule alone.
     *
     * Counting by bank rather than from `answers` is deliberate: `answers` is empty under
     * --fixture, so a rule written against it could never be tested by a fixture at all.
     */
    const modelAnswers = items.filter((i) => i.bank !== 'section_practice').length;
    if (modelAnswers > 0 && cov.examined === 0) {
      failures.push({
        rule: 'zerocov', section: section.slug, ref: '-', bank: 'modelAnswers',
        detail: `${modelAnswers} model answer(s) examine 0 of this section's ${cov.leaves} leaves — a page would print 0.0% above real questions`,
        key: `zerocov|${section.slug}`,
      });
    }

    rows.push({
      slug: section.slug, subject: section.subject, unit: section.unit, topic: section.topic,
      title: section.title, origin,
      questions: cov.questions, untagged: cov.untagged,
      leaves: cov.leaves, examined: cov.examined,
      pct: cov.pct,
      unexamined: cov.unexamined,
      commands: cov.commands,
    });
  }

  return { rows, failures, staged, fixture: Boolean(fixture) };
}

const { rows, failures, staged, fixture } = await collect();

if (JSON_OUT) {
  console.log(JSON.stringify({
    leafTotal: LEAVES.length,
    rows: rows.map((r) => ({ slug: r.slug, questions: r.questions, examined: r.examined, leaves: r.leaves, pct: Number(r.pct.toFixed(1)) })),
    failures,
  }, null, 1));
  process.exit(failures.length ? 1 : 0);
}

/* ── Report ──────────────────────────────────────────────────────────────────────────────────── */

const pad = (s, n) => String(s).padEnd(n);
const lpad = (s, n) => String(s).padStart(n);

if (!fixture) {
  console.log('');
  console.log(`spec-coverage — leaves examined, against ${LEAVES.length.toLocaleString('en-GB')} \`kind: 'leaf'\` rows in audit/raw/spec-items.json`);
  console.log(`  bank 1  data/modelAnswersData.js + modelAnswersExpansion.js`);
  console.log(`  bank 2  section_practice, read from ${STAGED ? 'audit/snapshots/ (--staged: what publishing would serve)' : 'audit/content-sections/ (the t=0 dump of the published tables — a lower bound, not live; --staged for the rebuilds)'}`);
  if (!staged.columnPresent) {
    console.log(`  note    section_practice has no \`spec_items\` column: scripts/packet-12-1-spec-items.sql is written and NOT run.`);
    console.log(`          Tags for bank 2 come from ${staged.file || '(no staged file)'}.`);
  }
  console.log('');
}

console.log(pad('section', 38) + pad('subj', 5) + lpad('qs', 4) + lpad('untag', 7) + lpad('examined', 10) + lpad('leaves', 8) + lpad('%', 8));
console.log('-'.repeat(80));
for (const r of rows) {
  console.log(
    pad(r.slug, 38) + pad(r.subject.slice(0, 4), 5) + lpad(r.questions, 4) +
    lpad(r.untagged, 7) + lpad(r.examined, 10) + lpad(r.leaves, 8) + lpad(`${r.pct.toFixed(1)}%`, 8),
  );
}

const byUnit = new Map();
for (const r of rows) {
  const key = `${r.subject} unit ${r.unit}`;
  if (!byUnit.has(key)) byUnit.set(key, { examined: 0, leaves: 0, questions: 0 });
  const u = byUnit.get(key);
  u.examined += r.examined; u.leaves += r.leaves; u.questions += r.questions;
}
console.log('');
console.log('per unit');
for (const [key, u] of [...byUnit.entries()].sort()) {
  console.log(`  ${pad(key, 22)}${lpad(u.examined, 6)} / ${lpad(u.leaves, 5)} leaves  ${lpad(`${((u.examined / (u.leaves || 1)) * 100).toFixed(1)}%`, 7)}  (${u.questions} questions)`);
}

const totalExamined = rows.reduce((n, r) => n + r.examined, 0);
const totalLeaves = fixture ? rows.reduce((n, r) => n + r.leaves, 0) : LEAVES.length;
const totalQuestions = rows.reduce((n, r) => n + r.questions, 0);
const totalUntagged = rows.reduce((n, r) => n + r.untagged, 0);

if (ONLY || rows.length === 1) {
  const r = rows[0];
  if (r) {
    console.log('');
    console.log(`command words in ${r.slug}: ${r.commands.map(([c, n]) => `${c} ×${n}`).join(' · ') || '(none)'}`);
    console.log('');
    console.log(`unexamined leaves in ${r.topic} (${r.unexamined.length} of ${r.leaves}):`);
    for (const id of r.unexamined) {
      const leaf = LEAVES.find((l) => l.id === id);
      console.log(`  ${pad(id, 20)}${leaf ? leaf.wording : ''}`);
    }
  }
}

console.log('');
console.log(`${totalQuestions} questions across ${rows.length} section${rows.length === 1 ? '' : 's'}; ${totalUntagged} carry no specItems yet.`);
console.log(`${totalExamined} of ${totalLeaves.toLocaleString('en-GB')} spec leaves are examined by at least one question — ${((totalExamined / totalLeaves) * 100).toFixed(1)}%.`);

const byRule = new Map();
for (const f of failures) byRule.set(f.rule, (byRule.get(f.rule) || 0) + 1);

if (BASELINE_MODE) {
  const keys = [...new Set(failures.map((f) => f.key))].sort();
  console.log('');
  console.log(`baseline: ${keys.length} failure key(s)`);
  if (!CONFIRM) {
    console.log('Not written. Add --confirm to write audit/spec-coverage-baseline.json.');
    process.exit(0);
  }
  fs.writeFileSync(BASELINE_PATH, `${JSON.stringify({
    generated: new Date().toISOString().slice(0, 10),
    note: 'Failure keys live when the spec-coverage guard landed (packet 12.1). The gate fails only on keys not in this list. Like the validator baseline, this file should only ever shrink.',
    keys,
  }, null, 1)}\n`);
  console.log(`written ${path.relative(ROOT, BASELINE_PATH)}`);
  process.exit(0);
}

// A fixture is a test of the RULES, so the baseline never applies to it: a fixture whose failure
// key happened to be baselined would pass silently and the test would prove nothing.
const baseline = !fixture && exists(BASELINE_PATH) ? new Set(read(BASELINE_PATH).keys) : new Set();
const fresh = failures.filter((f) => !baseline.has(f.key));

console.log('');
if (!failures.length) {
  console.log('no failures');
} else {
  console.log(`${failures.length} failure(s): ${[...byRule.entries()].map(([r, n]) => `${r} ×${n}`).join(' · ')}${baseline.size ? ` — ${fresh.length} not in the baseline` : ''}`);
  for (const f of fresh.slice(0, 60)) {
    console.log(`  ${pad(f.rule, 8)}${pad(f.section, 34)}${pad(f.ref, 22)}${f.detail}`);
  }
  if (fresh.length > 60) console.log(`  … and ${fresh.length - 60} more`);
}
console.log('');

process.exit(fresh.length ? 1 : 0);
