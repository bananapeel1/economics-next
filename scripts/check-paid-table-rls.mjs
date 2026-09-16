#!/usr/bin/env node
/**
 * Can an anonymous visitor read the paid content tables? V007, layer two.
 *
 * The code fix (this packet) stops our own pages putting paid content in HTML that needs no
 * account. It does not stop anyone from asking Supabase directly: the anon key ships in the browser
 * bundle, and until row-level security says otherwise those four tables answer it. Only the SQL in
 * `scripts/packet-2-1-paid-table-rls.sql`, which the founder runs by hand, closes that.
 *
 * This is the before-and-after measurement for it, and it deliberately shares no code with the app:
 * a raw PostgREST request with the anon key, no Supabase client, no helper of ours. A check that
 * reuses the implementation cannot see the implementation's blind spot.
 *
 *   node scripts/check-paid-table-rls.mjs
 *
 * Exit 0 when every paid table refuses the anon key and every free table still answers it. Exit 1
 * otherwise, naming which table went the wrong way — a free table that stops answering is as much a
 * failure as a paid one that keeps answering, because the sitemap and the public pages read those.
 */
import { readFileSync, existsSync } from 'node:fs';

if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required.');
  process.exit(2);
}

const PAID = ['section_quiz', 'section_flashcards', 'section_common_mistakes', 'section_extras'];
const FREE = ['section_content', 'section_notes', 'section_diagrams', 'section_practice'];

async function readable(table) {
  const res = await fetch(`${url}/rest/v1/${table}?select=section_id&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  const body = await res.text();
  let rows_ = null;
  try { rows_ = JSON.parse(body); } catch { /* an error body is not an array */ }
  /* A ROW is the signal, not a 2xx. With RLS enabled and no policy, PostgREST answers the anon key
     `200 []` rather than an error — so a status check would report these tables closed while they
     were wide open, and report them open after the fix. Every one of the eight holds rows (the
     preflight below asserts it), so "no rows for the anon key" means the key was refused. */
  const rows = Array.isArray(rows_) ? rows_.length : 0;
  return { ok: res.ok && rows > 0, status: res.status, rows, body: body.slice(0, 160) };
}

/* The row-count signal is only valid while every table has rows to withhold. Ask the service role,
   which bypasses RLS, so a table that is genuinely empty is reported as such rather than silently
   turning this check into a tautology. */
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (service) {
  const empty = [];
  for (const t of [...PAID, ...FREE]) {
    const res = await fetch(`${url}/rest/v1/${t}?select=section_id&limit=1`, {
      headers: { apikey: service, Authorization: `Bearer ${service}` },
    });
    const rows = await res.json().catch(() => null);
    if (!Array.isArray(rows) || rows.length === 0) empty.push(t);
  }
  if (empty.length) {
    console.error(`These tables hold no rows, so "the anon key gets nothing" proves nothing: ${empty.join(', ')}`);
    process.exit(2);
  }
} else {
  console.log('(no service key: cannot confirm the tables hold rows)\n');
}

const bad = [];
console.log('Anonymous key against the content tables\n');
for (const t of PAID) {
  const r = await readable(t);
  console.log(`  ${r.ok ? 'OPEN  ' : 'closed'}  ${t.padEnd(24)} HTTP ${r.status}${r.ok ? ` · ${r.rows} row(s)` : ''}`);
  if (r.ok) bad.push(`${t} is still readable with the anon key`);
}
console.log();
for (const t of FREE) {
  const r = await readable(t);
  console.log(`  ${r.ok ? 'open  ' : 'CLOSED'}  ${t.padEnd(24)} HTTP ${r.status}${r.ok ? ` · ${r.rows} row(s)` : ''}`);
  if (!r.ok) bad.push(`${t} is a FREE surface and no longer answers the anon key: ${r.body}`);
}

console.log();
if (bad.length) {
  for (const b of bad) console.log(`  ✗ ${b}`);
  console.log('\nRun scripts/packet-2-1-paid-table-rls.sql in the Supabase SQL editor.');
  process.exit(1);
}
console.log('  ✓ paid tables closed, free tables open.');
