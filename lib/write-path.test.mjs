// `npm test`. The write path around the validator: the client guard and the rule that nothing
// writes a content table except through it. These are the checks the packet-3 verifier ran by
// hand and found holes in; they are here so the holes cannot reopen quietly.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const CONTENT_TABLE = /section_(content|notes|quiz|practice|flashcards|diagrams|extras|common_mistakes)/;
// A write ON a content table: a literal `.from('section_x')` whose chain reaches update/upsert/insert,
// or a dynamic `.from(table)` chain that does, in a file that names a content table anywhere. The
// evaluate route reads section_practice and inserts into written_ao_attempts; that is neither.
const LITERAL_WRITE = /\.from\(\s*['"`]section_(?:content|notes|quiz|practice|flashcards|diagrams|extras|common_mistakes)['"`]\s*\)(?:\s*\.(?!update|upsert|insert|delete)\w+\([^()]*\))*\s*\.(?:update|upsert|insert|delete)\(/;
const DYNAMIC_WRITE = /\.from\(\s*[A-Za-z_$][\w$.]*\s*\)(?:\s*\.(?!update|upsert|insert|delete)\w+\([^()]*\))*\s*\.(?:update|upsert|insert|delete)\(/;
const OWN_CLIENT = /createClient\(/;
const SHARED = /from ['"](?:\.\.?\/)+(?:scripts\/)?_db\.mjs['"]/;
const writesContentTable = (src) => LITERAL_WRITE.test(src) || (CONTENT_TABLE.test(src) && DYNAMIC_WRITE.test(src));

/**
 * Files allowed to write a content table with a client of their own, each with the reason. The
 * admin route is the founder's live editor: it has no draft step, so it runs lib/content-gate.mjs
 * itself and reads the row back. Anything else that appears here needs the same treatment.
 */
const OWN_CLIENT_ALLOWLIST = new Map([
  ['app/api/admin/sections/[id]/[type]/route.js', 'validated in-route with gateSection(); reads back after write'],
  ['app/api/admin/diagrams/route.js', 'validated in-route with gateSection() before the upsert and the delete'],
]);

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(m?js)$/.test(name)) out.push(p);
  }
  return out;
}

test('every script or route that writes a content table goes through the guarded client or is allowlisted', () => {
  const files = ['scripts', 'seed', 'audit/scripts', 'app/api'].flatMap((d) => walk(d));
  const offenders = [];
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    if (!writesContentTable(src)) continue;
    if (OWN_CLIENT_ALLOWLIST.has(f)) continue;
    if (OWN_CLIENT.test(src) || !SHARED.test(src)) offenders.push(f);
  }
  assert.deepEqual(offenders, [], `writers outside the guard: ${offenders.join(', ')}`);
  for (const f of OWN_CLIENT_ALLOWLIST.keys()) assert.ok(existsSync(f), `allowlisted file ${f} no longer exists; remove it from the list`);
});

test('every allowlisted route runs the gate and refuses on BLOCK', () => {
  for (const f of OWN_CLIENT_ALLOWLIST.keys()) {
    const src = readFileSync(f, 'utf8');
    assert.match(src, /gateSection\(/, `${f} does not call gateSection`);
    assert.match(src, /status: 422/, `${f} does not refuse on BLOCK`);
    assert.match(src, /baseline\.keys/, `${f} does not compare with the committed baseline`);
  }
  const sections = readFileSync('app/api/admin/sections/[id]/[type]/route.js', 'utf8');
  assert.match(sections, /select\('data'\)\.eq\('section_id', id\)\.single\(\)/, 'the sections route does not read the row back');
});

// The guard itself, in a subprocess so a thrown error cannot be confused with a network call.
// Skipped when there are no credentials: _db.mjs exits without them, and the test cannot tell
// "guard missing" from "no env" in that case.
const hasEnv = existsSync('.env.local') || (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);
test('the client guard refuses a raw write of data on every path to from()', { skip: !hasEnv && 'no Supabase credentials' }, () => {
  const script = `
    import { supabase } from './scripts/_db.mjs';
    const out = [];
    const tryIt = (label, fn) => { try { const r = fn(); out.push(label + ':' + (r && typeof r.then === 'function' ? 'BUILDER' : typeof r)); } catch (e) { out.push(label + ':THROWS'); } };
    tryIt('from.update.data', () => supabase.from('section_quiz').update({ data: [] }));
    tryIt('from.upsert.data', () => supabase.from('section_quiz').upsert({ section_id: 'x', data: [] }));
    tryIt('from.insert.data', () => supabase.from('section_extras').insert({ section_id: 'x', data: {} }));
    tryIt('from.insert.array', () => supabase.from('section_quiz').insert([{ section_id: 'x', data: [] }]));
    tryIt('schema.from.update.data', () => supabase.schema('public').from('section_quiz').update({ data: [] }));
    tryIt('rest.from.update.data', () => supabase.rest.from('section_quiz').update({ data: [] }));
    tryIt('from.delete', () => supabase.from('section_quiz').delete());
    tryIt('schema.rest', () => { const r = supabase.schema('public').rest; return r === undefined ? 'UNDEF' : r; });
    tryIt('from.update.draft', () => supabase.from('section_quiz').update({ draft: [] }));
    tryIt('from.select', () => supabase.from('section_quiz').select('data'));
    tryIt('other.table.update.data', () => supabase.from('sections').update({ data: 1 }));
    process.env.REVVY_ALLOW_RAW_WRITE = '1';
    tryIt('override.update.data', () => supabase.from('section_quiz').update({ data: [] }));
    console.log(out.join(' '));
  `;
  const res = execFileSync('node', ['--input-type=module', '-e', script], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  const got = Object.fromEntries(res.split(' ').map((kv) => kv.split(':')));
  for (const k of ['from.update.data', 'from.upsert.data', 'from.insert.data', 'from.insert.array', 'schema.from.update.data', 'rest.from.update.data', 'from.delete']) assert.equal(got[k], 'THROWS', `${k} was not refused`);
  assert.notEqual(got['schema.rest'], 'THROWS', 'reading .rest on a schema client must not throw');
  for (const k of ['from.update.draft', 'from.select', 'other.table.update.data', 'override.update.data']) assert.equal(got[k], 'BUILDER', `${k} should return a builder`);
});

/* ── the read-back comparison ────────────────────────────────────────────── */

test('sameJson compares the way jsonb stores, not the way JSON.stringify prints', async () => {
  const { sameJson } = await import('./content-gate.mjs');
  // PostgreSQL jsonb sorts an object's keys by length then bytewise. Packet 3's read-back checks
  // used JSON.stringify, so the first hand-authored object packet 13 staged was reported as a
  // mismatch after a write that had in fact succeeded.
  const sent = { id: 'r1', type: 'fillin', prompt: 'Complete the chain:', template: ['a ___'], answers: ['x'], hints: ['h'] };
  const stored = { id: 'r1', type: 'fillin', hints: ['h'], prompt: 'Complete the chain:', answers: ['x'], template: ['a ___'] };
  assert.notEqual(JSON.stringify(sent), JSON.stringify(stored), 'fixture must actually differ in key order');
  assert.ok(sameJson(sent, stored), 'key order must not count as a difference');

  assert.ok(sameJson({ a: { b: [1, { c: 2, d: 3 }] } }, { a: { b: [1, { d: 3, c: 2 }] } }), 'nested key order must not count');
  assert.ok(sameJson(null, null) && sameJson([], []) && sameJson('x', 'x') && sameJson(3, 3));
  // Arrays are ordered: their order is content, in jsonb and here.
  assert.ok(!sameJson([1, 2], [2, 1]), 'array order is a real difference');
  assert.ok(!sameJson({ a: 1 }, { a: 2 }), 'a changed value is a real difference');
  assert.ok(!sameJson({ a: 1 }, { a: 1, b: 2 }), 'an added key is a real difference');
  // jsonb has no undefined; a key set to undefined is absent on both sides.
  assert.ok(sameJson({ a: 1, b: undefined }, { a: 1 }), 'an undefined value is an absent key');
});

/* ── the draft preview stays out of production ───────────────────────────── */

test('the section route serves `draft` only outside a production build', async () => {
  /*
   * Packet 16. `?draft=1` on GET /api/sections/[id] serves the staged draft payload, so a finished
   * section that may not be published yet can still be walked at 390x844. The whole guarantee that a
   * student never sees unpublished content is one expression in one file, so this test is what stops
   * it being deleted by a later refactor that "tidies" the condition away.
   */
  const src = readFileSync(new URL('../app/api/sections/[id]/route.js', import.meta.url), 'utf8');
  const guard = src.match(/const wantDraft = ([^;]+);/s);
  assert.ok(guard, 'the route no longer defines wantDraft — has the draft preview been removed or renamed?');
  const expr = guard[1].replace(/\s+/g, ' ');
  assert.match(expr, /process\.env\.NODE_ENV !== 'production'/, 'the draft flag is not gated on NODE_ENV');
  assert.match(expr, /searchParams\.get\('draft'\) === '1'/, 'the draft flag is not read from ?draft=1');
  // and the payload helper must fall back to `data`, so a table with no draft still renders
  assert.match(src, /wantDraft && r\.data\?\.draft != null \? r\.data\.draft : r\.data\?\.data/, 'the draft payload does not fall back to data');
  // a draft response must not be cached: a packet re-stages repeatedly while it is being built
  assert.match(src, /wantDraft \? 'no-store'/, 'a draft response is cacheable');
});
