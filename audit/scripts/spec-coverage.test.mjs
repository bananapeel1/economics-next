/**
 * The spec-coverage guard's own tests — packet 12.1, E003.
 *
 * Three fixtures, one per failure mode, and one clean fixture that must pass. The clean one is not
 * decoration: three fixtures that fail prove only that the guard fails on SOMETHING. The control is
 * what shows that each failure is caused by the one field the fixture changed, because the four
 * files are otherwise the same section.
 *
 * The guard is run as a SUBPROCESS, not imported. Importing it would run its CLI body and share this
 * process's argv, and — more to the point — the thing being tested is `npm run spec-coverage`'s exit
 * code, which is what a gate reads. A test that imported the module could pass while the command
 * exited 0 on a failure.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const GUARD = path.join(ROOT, 'audit/scripts/spec-coverage-check.mjs');
const FIXTURES = path.join(ROOT, 'audit/fixtures/spec-coverage');

function run(args) {
  try {
    const stdout = execFileSync(process.execPath, [GUARD, ...args], { cwd: ROOT, encoding: 'utf8' });
    return { code: 0, stdout };
  } catch (err) {
    return { code: err.status ?? 1, stdout: err.stdout || '' };
  }
}

function runJson(args) {
  const r = run(args);
  return { ...r, json: JSON.parse(r.stdout) };
}

function runFixture(name) {
  return runJson(['--fixture', path.join(FIXTURES, `${name}.json`), '--json']);
}

test('the clean fixture passes: valid tariffs, real spec ids, an evaluative question', () => {
  const { code, json } = runFixture('clean');
  assert.equal(code, 0, `expected exit 0, got ${code}: ${JSON.stringify(json.failures)}`);
  assert.deepEqual(json.failures, []);
  assert.equal(json.rows[0].questions, 4);
  assert.ok(json.rows[0].examined > 0, 'the clean fixture should examine at least one leaf');
});

test('an invented specItems id fails, and fails on the specid rule only', () => {
  const { code, json } = runFixture('invented-spec-id');
  assert.equal(code, 1);
  assert.deepEqual([...new Set(json.failures.map((f) => f.rule))], ['specid']);
  assert.ok(json.failures.some((f) => f.detail.includes('ECON-9.9.9-01')), JSON.stringify(json.failures));
});

test('Analyse 8 fails on the tariff rule — Analyse is 6 marks in both IAL subjects', () => {
  const { code, json } = runFixture('invalid-tariff');
  assert.equal(code, 1);
  assert.deepEqual([...new Set(json.failures.map((f) => f.rule))], ['tariff']);
  assert.ok(json.failures.some((f) => f.detail.startsWith('Analyse 8 is not an Economics tariff')), JSON.stringify(json.failures));
});

test('a section with questions but no evaluative question fails on the noeval rule', () => {
  const { code, json } = runFixture('no-evaluative');
  assert.equal(code, 1);
  assert.deepEqual([...new Set(json.failures.map((f) => f.rule))], ['noeval']);
  assert.ok(json.failures.some((f) => f.detail.includes('no evaluative question')), JSON.stringify(json.failures));
});

test('the real run reports all 43 sections against the 1,165-leaf denominator', () => {
  const { json } = runJson(['--json']);
  assert.equal(json.leafTotal, 1165, 'the denominator is the count of kind:"leaf" rows, not 1,362 and not 1,073');
  assert.equal(json.rows.length, 43);
  for (const row of json.rows) {
    assert.ok(row.pct >= 0 && row.pct <= 100, `${row.slug} reported ${row.pct}%`);
  }
});

test('--section narrows to one section and market-failure reports a real, partial percentage', () => {
  const { json } = runJson(['--section', 'market-failure', '--json']);
  assert.equal(json.rows.length, 1);
  const row = json.rows[0];
  assert.equal(row.slug, 'market-failure');
  assert.ok(row.pct > 0 && row.pct < 100, `expected a partial percentage, got ${row.pct}%`);
});

/*
 * E025, packet 12.4. Added with a fourth fixture rather than by rewording the criterion alone: the
 * acceptance line had no assertion behind it, so it was being read off the table by eye, which is
 * how "non-zero for every section with questions" survived being wrong about 13 sections.
 */
test('real ids belonging to ANOTHER section fail on the zerocov rule, and on that rule alone', () => {
  const { code, json } = runFixture('zero-coverage');
  assert.equal(code, 1);
  assert.deepEqual([...new Set(json.failures.map((f) => f.rule))], ['zerocov']);
  assert.equal(json.rows[0].examined, 0);
  assert.ok(json.failures.some((f) => f.detail.includes('examine 0 of')), JSON.stringify(json.failures));
});

test('the zerocov rule is silent when a section has no model answers at all', () => {
  // The honest exclusion, pinned. A section carrying only untagged section_practice rows examines
  // nothing and must NOT fail: 0.0% is true of it. If this ever starts failing, the rule has been
  // widened back to "has questions" and 13 sections are being blamed for an unrun migration.
  const { json } = runFixture('clean');
  assert.equal(json.failures.filter((f) => f.rule === 'zerocov').length, 0);
});

/*
 * Packet 12.5. Bank 2's tags moved from a question-text-keyed file for one section to
 * audit/practice-spec-items.json, keyed by item id, for every section and both banks. These tests
 * pin what the move must not lose. They read the REAL files, because the defects they guard against
 * (an empty array written as a tag, a tag for another topic, a cached number) live in data, not code.
 */
import fs from 'node:fs';
import os from 'node:os';

const TAGS = path.join(ROOT, 'audit/practice-spec-items.json');
const BANK = path.join(ROOT, 'audit/practice-bank.json');
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

test('every written tag is a real leaf of its own section, and no value is an empty array', () => {
  const tags = readJson(TAGS).items;
  const oracle = readJson(path.join(ROOT, 'audit/raw/spec-items.json')).items;
  const leaf = new Map(oracle.filter((r) => r.kind === 'leaf').map((r) => [r.id, r]));
  const sections = readJson(path.join(ROOT, 'audit/raw/spec-coverage.json')).bySection
    .map((s) => { const [subject, slug] = s.key.split('__'); return [slug, { subject, topic: s.number }]; });
  const topicOf = new Map(sections);
  const ids = Object.keys(tags);
  assert.ok(ids.length > 0, 'the tags file is empty');
  for (const id of ids) {
    const t = tags[id];
    assert.ok(id.startsWith(`${t.section}:practice:`), `${id} is filed under ${t.section}`);
    assert.ok(Array.isArray(t.specItems) && t.specItems.length > 0, `${id}: [] means "examines nothing" and is never written — an untagged item is absent`);
    assert.ok(['agreed', 'adjudicated'].includes(t.via), `${id}: via ${t.via}`);
    const want = topicOf.get(t.section);
    for (const s of t.specItems) {
      const l = leaf.get(s);
      assert.ok(l, `${id}: ${s} is not a leaf in audit/raw/spec-items.json`);
      assert.equal(`${l.subject} ${l.topic}`, `${want.subject} ${want.topic}`, `${id}: ${s} belongs to another section`);
    }
  }
});

test('the guard applies the tags file: removing one section\'s tags lowers that section\'s examined (negative control)', () => {
  const real = runJson(['--section', 'market-failure', '--json']).json.rows[0];
  const tags = readJson(TAGS);
  const cut = Object.fromEntries(Object.entries(tags.items).filter(([, t]) => t.section !== 'market-failure'));
  assert.ok(Object.keys(cut).length < Object.keys(tags.items).length, 'market-failure has no tags to remove');
  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'spec-cov-')), 'tags.json');
  fs.writeFileSync(tmp, JSON.stringify({ ...tags, items: cut }));
  const without = runJson(['--section', 'market-failure', '--tags', tmp, '--json']).json.rows[0];
  fs.rmSync(path.dirname(tmp), { recursive: true, force: true });
  assert.ok(without.examined < real.examined, `examined ${real.examined} with tags, ${without.examined} without — the guard is not reading the file`);
});

test('a tag whose item id is in neither bank is counted as an orphan and never applied', () => {
  const tags = readJson(TAGS);
  const [, some] = Object.entries(tags.items).find(([, t]) => t.section === 'market-failure');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'spec-cov-'));
  const ghostFile = path.join(dir, 'ghost.json');
  const emptyFile = path.join(dir, 'empty.json');
  fs.writeFileSync(ghostFile, JSON.stringify({ ...tags, items: { 'market-failure:practice:00000000': { ...some } } }));
  fs.writeFileSync(emptyFile, JSON.stringify({ ...tags, items: {} }));
  const ghost = runJson(['--section', 'market-failure', '--tags', ghostFile, '--json']).json;
  const empty = runJson(['--section', 'market-failure', '--tags', emptyFile, '--json']).json;
  fs.rmSync(dir, { recursive: true, force: true });
  assert.equal(ghost.bank2.orphanTags, 1);
  assert.equal(empty.bank2.orphanTags, 0);
  assert.equal(ghost.rows[0].examined, empty.rows[0].examined, 'an orphan tag changed the count, so it was applied');
  assert.equal(ghost.rows[0].untagged, empty.rows[0].untagged);
});

test('the header states the section-level columns from the dump, and never claims the SQL is unrun', () => {
  const out = run([]).stdout;
  assert.ok(!/NOT run/.test(out), 'the pre-12.5 note asserted the SQL was unrun from a hardcoded false');
  const { json } = runJson(['--json']);
  assert.deepEqual(json.bank2.sectionGrainColumns, readJson(BANK).sectionGrainColumns);
  assert.equal(json.bank2.source, 'audit/practice-bank.json');
});

test('every practice item in the bank dump carries an id, so a tag can reach it', () => {
  const bank = readJson(BANK);
  assert.equal(bank.sections.length, 43);
  for (const s of bank.sections) {
    for (const q of [...s.live, ...(s.staged || [])]) assert.ok(q.id && q.id.startsWith(`${s.slug}:practice:`), `${s.slug}: ${JSON.stringify(q).slice(0, 80)}`);
  }
});
