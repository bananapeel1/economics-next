/**
 * scripts/_read-cache.mjs, driven through a real supabase-js client against a fake PostgREST, so
 * the requests are the exact shapes the scripts send (maybeSingle, update().select(), filters).
 * The fake bumps content_versions on every write, the way scripts/content-versions.sql's trigger
 * does, and counts what reaches the "network".
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { createReadCache, sectionIdsOf } from '../scripts/_read-cache.mjs';

const TABLES = ['section_content', 'section_notes', 'section_quiz', 'section_practice',
  'section_flashcards', 'section_diagrams', 'section_extras', 'section_common_mistakes', 'sections'];

/** A shared fake database: rows, versions, and a log of every request that reached it. */
function fakeDb({ versions = true, truncateVersions = false } = {}) {
  const tables = new Map(TABLES.map((t) => [t, new Map()]));
  const ver = new Map();
  let seq = 0;
  const bump = (t, sid) => { if (t.startsWith('section_')) ver.set(`${t}|${sid}`, ++seq); };
  const calls = [];
  let failNext = 0;
  const put = (t, row) => { tables.get(t).set(row.section_id ?? row.id, { ...row }); bump(t, row.section_id); };

  const match = (row, params) => {
    for (const [k, v] of params) {
      if (['select', 'order', 'limit', 'offset'].includes(k)) continue;
      const val = row[k];
      if (v.startsWith('eq.')) { if (String(val) !== v.slice(3)) return false; }
      else if (v === 'is.null') { if (val != null) return false; }
      else if (v === 'not.is.null') { if (val == null) return false; }
      else if (v.startsWith('in.(')) { if (!v.slice(4, -1).split(',').includes(String(val))) return false; }
      else throw new Error(`fake: unsupported filter ${k}=${v}`);
    }
    return true;
  };
  const pick = (row, select) => {
    if (!select || select === '*') return { ...row };
    return Object.fromEntries(select.split(',').map((c) => c.trim()).filter(Boolean).map((c) => [c, row[c] ?? null]));
  };
  const json = (status, body, headers = {}) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });

  async function fetch(input, init = {}) {
    const url = new URL(input);
    const method = (init.method || 'GET').toUpperCase();
    const h = new Headers(init.headers);
    const t = url.pathname.replace('/rest/v1/', '');
    calls.push({ method, table: t, search: url.search, apikey: h.get('apikey') });
    if (failNext > 0) { failNext -= 1; return json(500, { message: 'boom' }); }
    if (t === 'content_versions') {
      if (!versions) return json(404, { code: 'PGRST205', message: "Could not find the table 'public.content_versions' in the schema cache" });
      const rows = [...ver].map(([k, v]) => { const [table_name, section_id] = k.split('|'); return { table_name, section_id, version: v }; });
      const shown = truncateVersions ? rows.slice(0, 1) : rows;
      return json(200, shown, { 'content-range': `0-${shown.length - 1}/${rows.length}` });
    }
    const store = tables.get(t);
    if (!store) return json(404, { message: `no table ${t}` });
    const params = [...url.searchParams];
    if (method === 'GET') {
      const rows = [...store.values()].filter((r) => match(r, params)).map((r) => pick(r, url.searchParams.get('select')));
      return json(200, rows, { 'content-range': `0-${rows.length - 1}/*` });
    }
    if (method === 'PATCH') {
      const patch = JSON.parse(init.body);
      const hit = [...store.values()].filter((r) => match(r, params));
      for (const r of hit) { Object.assign(r, patch); bump(t, r.section_id); }
      return json(200, hit.map((r) => pick(r, url.searchParams.get('select'))));
    }
    if (method === 'POST') {
      const body = [].concat(JSON.parse(init.body));
      for (const r of body) put(t, r);
      return json(201, body);
    }
    throw new Error(`fake: unsupported ${method}`);
  }
  return {
    fetch, calls, put, tables,
    failNext: (n = 1) => { failNext = n; },
    contentGets: () => calls.filter((c) => c.method === 'GET' && c.table.startsWith('section_')).length,
    reset: () => { calls.length = 0; },
  };
}

function seed(db) {
  for (const sid of ['supply', 'demand', 'elasticity']) {
    db.put('section_content', { section_id: sid, data: [{ step: `${sid}-live` }], draft: null });
    db.put('section_quiz', { section_id: sid, data: [`${sid}-q`], draft: null });
  }
  db.tables.get('sections').set('supply', { id: 'supply', title: 'Supply' });
}

/** One "process": its own cache instance and client, sharing the fake database and a disk dir. */
function proc(db, { dir, clock, key = 'service-key', ttlMs = 5000 } = {}) {
  const cache = createReadCache({ fetch: db.fetch, dir, ttlMs, now: clock ? () => clock.t : Date.now });
  const client = createClient('http://fake.local', key, {
    global: { fetch: cache.fetch },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return { cache, client };
}

const tmp = () => mkdtempSync(join(tmpdir(), 'read-cache-test-'));

test('sectionIdsOf: only a single eq/in filter on section_id confines a query', () => {
  assert.deepEqual(sectionIdsOf(new URLSearchParams('select=data&section_id=eq.supply')), ['supply']);
  assert.deepEqual(sectionIdsOf(new URLSearchParams('section_id=in.(a,b)')), ['a', 'b']);
  assert.equal(sectionIdsOf(new URLSearchParams('select=data')), null);
  assert.equal(sectionIdsOf(new URLSearchParams('section_id=eq.a&section_id=eq.b')), null);
  assert.equal(sectionIdsOf(new URLSearchParams('section_id=in.("a,b",c)')), null);
  assert.equal(sectionIdsOf(new URLSearchParams('section_id=neq.a')), null);
});

test('without content_versions: memory only, one fetch per identical read, a write clears it', async () => {
  const db = fakeDb({ versions: false }); seed(db);
  const dir = tmp();
  try {
    const { client, cache } = proc(db, { dir });
    const read = () => client.from('section_quiz').select('data, draft').eq('section_id', 'supply').maybeSingle();
    const a = await read(); const b = await read();
    assert.deepEqual(a.data, { data: ['supply-q'], draft: null });
    assert.deepEqual(b.data, a.data);
    assert.equal(db.contentGets(), 1, 'second identical read reached the network');
    assert.equal(cache.mode, 'memory');
    assert.match(cache.modeReason, /PGRST205/);
    assert.deepEqual(readdirSync(dir), [], 'memory mode must not write to disk (nothing to validate it against)');

    const up = await client.from('section_quiz').update({ draft: ['new'] }).eq('section_id', 'supply').select('section_id');
    assert.equal(up.error, null);
    const c = await read();
    assert.deepEqual(c.data.draft, ['new'], 'read-back after our own write served a stale copy');
    assert.equal(db.contentGets(), 2);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('shared: a second process is served from disk, and pays only the version read', async () => {
  const db = fakeDb(); seed(db);
  const dir = tmp();
  try {
    const A = proc(db, { dir });
    const r1 = await A.client.from('section_content').select('data').eq('section_id', 'demand').maybeSingle();
    assert.deepEqual(r1.data, { data: [{ step: 'demand-live' }] });
    assert.equal(A.cache.mode, 'shared');
    db.reset();
    const B = proc(db, { dir });
    const r2 = await B.client.from('section_content').select('data').eq('section_id', 'demand').maybeSingle();
    assert.deepEqual(r2.data, r1.data);
    assert.equal(db.contentGets(), 0, 'process B re-fetched content A had already cached');
    assert.equal(db.calls.filter((c) => c.table === 'content_versions').length, 1);
    assert.equal(B.cache.stats.diskHits, 1);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('shared: another process\'s write is picked up once the version read expires, and only for that section', async () => {
  const db = fakeDb(); seed(db);
  const dir = tmp();
  const clock = { t: 1000 };
  try {
    const A = proc(db, { dir, clock, ttlMs: 5000 });
    const read = (sid) => A.client.from('section_content').select('data, draft').eq('section_id', sid).maybeSingle();
    await read('supply'); await read('demand');
    const W = proc(db, { dir, clock });   // a peer session writes
    await W.client.from('section_content').update({ draft: [{ step: 'peer' }] }).eq('section_id', 'supply').select('section_id');
    db.reset();
    // Inside the TTL, A still trusts its version read: the documented bound on staleness.
    assert.equal((await read('supply')).data.draft, null);
    assert.equal(db.contentGets(), 0);
    clock.t += 5001;                        // A's version read is now stale
    const s = await read('supply');
    assert.deepEqual(s.data.draft, [{ step: 'peer' }], 'A served a copy older than the peer write after TTL');
    const d = await read('demand');
    assert.deepEqual(d.data, { data: [{ step: 'demand-live' }], draft: null });
    const fetched = db.calls.filter((c) => c.table === 'section_content').map((c) => new URLSearchParams(c.search).get('section_id'));
    assert.deepEqual(fetched, ['eq.supply'], 'an unchanged section was re-fetched');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('shared: our own write is visible to our next read even inside the TTL', async () => {
  const db = fakeDb(); seed(db);
  const dir = tmp();
  const clock = { t: 1000 };
  try {
    const A = proc(db, { dir, clock, ttlMs: 60_000 });
    const read = () => A.client.from('section_quiz').select('draft').eq('section_id', 'elasticity').maybeSingle();
    assert.deepEqual((await read()).data, { draft: null });
    await A.client.from('section_quiz').update({ draft: ['staged'] }).eq('section_id', 'elasticity').select('section_id');
    assert.deepEqual((await read()).data, { draft: ['staged'] }, 'the read-back check would have seen the old draft');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('shared: a query not confined to one section is invalidated by any change in its table', async () => {
  const db = fakeDb(); seed(db);
  const dir = tmp();
  const clock = { t: 1000 };
  try {
    const A = proc(db, { dir, clock });
    const waiting = () => A.client.from('section_quiz').select('section_id, data, draft').not('draft', 'is', null);
    assert.deepEqual((await waiting()).data, []);
    assert.deepEqual((await waiting()).data, []);
    assert.equal(db.contentGets(), 1);
    const W = proc(db, { dir, clock });
    await W.client.from('section_quiz').update({ draft: ['x'] }).eq('section_id', 'demand').select('section_id');
    clock.t += 5001;
    const after = await waiting();
    assert.deepEqual(after.data.map((r) => r.section_id), ['demand']);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('passes through: other tables, embedded selects, errors (never cached)', async () => {
  const db = fakeDb(); seed(db);
  const dir = tmp();
  try {
    const A = proc(db, { dir });
    await A.client.from('sections').select('id, title').eq('id', 'supply').maybeSingle();
    await A.client.from('sections').select('id, title').eq('id', 'supply').maybeSingle();
    assert.equal(db.calls.filter((c) => c.table === 'sections').length, 2, 'a non-content table was cached');

    await A.client.from('section_quiz').select('data').eq('section_id', 'supply').maybeSingle();  // version read done
    assert.equal(A.cache.mode, 'shared');
    db.failNext(1);
    const bad = await A.client.from('section_notes').select('data').eq('section_id', 'supply').maybeSingle();
    assert.ok(bad.error, 'expected the injected 500');
    const good = await A.client.from('section_notes').select('data').eq('section_id', 'supply').maybeSingle();
    assert.equal(good.error, null, 'an error response was cached and served again');

    const before = db.calls.length;
    const u = new URL('http://fake.local/rest/v1/section_quiz?select=data,sections(title)&section_id=eq.supply');
    await A.cache.fetch(u.href, { method: 'GET', headers: { apikey: 'service-key' } });
    await A.cache.fetch(u.href, { method: 'GET', headers: { apikey: 'service-key' } });
    assert.equal(db.calls.length - before, 2, 'an embedded select was cached');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('identical reads issued together share one fetch; maybeSingle of a missing row is null', async () => {
  const db = fakeDb(); seed(db);
  const dir = tmp();
  try {
    const A = proc(db, { dir });
    const one = () => A.client.from('section_content').select('data').eq('section_id', 'supply').maybeSingle();
    const rs = await Promise.all([one(), one(), one()]);
    for (const r of rs) assert.deepEqual(r.data, { data: [{ step: 'supply-live' }] });
    assert.equal(db.contentGets(), 1);
    const missing = await A.client.from('section_content').select('data').eq('section_id', 'no-such').maybeSingle();
    assert.equal(missing.data, null);
    assert.equal(missing.error, null);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('a truncated version read disables the shared cache instead of trusting it', async () => {
  const db = fakeDb({ truncateVersions: true }); seed(db);
  const dir = tmp();
  try {
    const A = proc(db, { dir });
    await A.client.from('section_quiz').select('data').eq('section_id', 'supply').maybeSingle();
    assert.equal(A.cache.mode, 'memory');
    assert.match(A.cache.modeReason, /read 1 of \d+ rows/);
    assert.deepEqual(readdirSync(dir), []);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('different credentials never share an entry', async () => {
  const db = fakeDb(); seed(db);
  const dir = tmp();
  try {
    await proc(db, { dir, key: 'service-key' }).client.from('section_quiz').select('data').eq('section_id', 'supply').maybeSingle();
    db.reset();
    await proc(db, { dir, key: 'anon-key' }).client.from('section_quiz').select('data').eq('section_id', 'supply').maybeSingle();
    assert.equal(db.contentGets(), 1, 'a response fetched with one key was served to another');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
