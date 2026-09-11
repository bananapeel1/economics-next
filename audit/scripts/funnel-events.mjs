/**
 * Step-0 pass rate and section funnel from app_events (audit/PLAN.md, packet 1 baseline and packet 58
 * re-measure). Aggregates only; no personal data is printed or written.
 *
 * Run:  node audit/scripts/funnel-events.mjs [--since 2026-09-12] [--out audit/raw/funnel_events.json]
 *
 * Definitions
 *   start        = a learn_open for (student, section, day); a student is user_id, else anon_id
 *   passed step0 = that same (student, section) has a step_next with step = 0 on or after the start
 *   completed    = has a section_complete
 *   pre-test     = offered / started / submitted / skipped / declined counts
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'fs';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const SINCE = opt('--since', '2026-09-11');
const OUT = opt('--out', 'audit/raw/funnel_events.json');

const env = {};
readFileSync('.env.local', 'utf8').split('\n').forEach(l => { const [k, ...r] = l.split('='); if (k && r.length) env[k.trim()] = r.join('=').trim(); });
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function all(select) {
  const rows = []; let from = 0;
  for (;;) {
    const { data, error } = await sb.from('app_events').select(select).gte('created_at', SINCE).order('created_at').range(from, from + 999);
    if (error) {
      if (/schema cache|does not exist/i.test(error.message)) { console.log('app_events does not exist yet. Run scripts/create-app-events-table.sql, then collect data.'); process.exit(0); }
      throw new Error(error.message);
    }
    rows.push(...data); if (data.length < 1000) break; from += 1000;
  }
  return rows;
}

const ev = await all('user_id, anon_id, event, section_id, step, total_steps, created_at');
const who = r => r.user_id ? `u:${r.user_id}` : (r.anon_id ? `a:${r.anon_id}` : null);
const key = r => `${who(r)}|${r.section_id}`;

const starts = new Map();      // key -> first learn_open time
const passed = new Set();       // key with step_next step 0
const completed = new Set();
const pre = { offered: 0, started: 0, submitted: 0, skipped: 0, declined: 0 };
const perSection = {};
const students = { signedIn: new Set(), anon: new Set() };
let writeFailures = 0; const cancelReasons = {};

for (const r of ev) {
  const w = who(r); if (!w) continue;
  (r.user_id ? students.signedIn : students.anon).add(w);
  if (r.event === 'learn_open' && r.section_id) { const k = key(r); if (!starts.has(k)) starts.set(k, r.created_at); }
  else if (r.event === 'step_next' && r.step === 0 && r.section_id) passed.add(key(r));
  else if (r.event === 'section_complete' && r.section_id) completed.add(key(r));
  else if (r.event === 'pretest_offered') pre.offered++;
  else if (r.event === 'pretest_started') pre.started++;
  else if (r.event === 'pretest_submitted') pre.submitted++;
  else if (r.event === 'pretest_skipped') pre.skipped++;
  else if (r.event === 'pretest_declined') pre.declined++;
  else if (r.event === 'progress_write_failed') writeFailures++;
  else if (r.event === 'cancel_reason') { /* props not selected here; see cancelReasons query below */ }
}
for (const k of starts.keys()) {
  const sec = k.split('|')[1];
  const s = (perSection[sec] ||= { starts: 0, passedStep0: 0, completed: 0 });
  s.starts++; if (passed.has(k)) s.passedStep0++; if (completed.has(k)) s.completed++;
}
const { data: reasons } = await sb.from('app_events').select('props').eq('event', 'cancel_reason').gte('created_at', SINCE);
for (const r of reasons || []) { const k = r.props?.reason || 'unknown'; cancelReasons[k] = (cancelReasons[k] || 0) + 1; }

const totalStarts = starts.size, totalPassed = [...starts.keys()].filter(k => passed.has(k)).length, totalCompleted = [...starts.keys()].filter(k => completed.has(k)).length;
const pct = (a, b) => b ? Math.round(1000 * a / b) / 10 : null;
const summary = {
  since: SINCE, events: ev.length,
  students: { signedIn: students.signedIn.size, anonymous: students.anon.size },
  sectionStarts: totalStarts,
  passedStep0: totalPassed, passedStep0Pct: pct(totalPassed, totalStarts),
  completed: totalCompleted, completedPct: pct(totalCompleted, totalStarts),
  pretest: pre, progressWriteFailures: writeFailures, cancelReasons,
  perSection: Object.fromEntries(Object.entries(perSection).sort((a, b) => b[1].starts - a[1].starts).map(([k, v]) => [k, { ...v, passedStep0Pct: pct(v.passedStep0, v.starts) }])),
};
writeFileSync(OUT, JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ ...summary, perSection: undefined }, null, 2));
console.log('\nTop sections by starts:');
for (const [k, v] of Object.entries(summary.perSection).slice(0, 12)) console.log(`  ${k.padEnd(36)} starts ${String(v.starts).padStart(4)}  passed step 0 ${String(v.passedStep0Pct ?? '-').padStart(5)}%  completed ${v.completed}`);
console.log(`\nwritten to ${OUT}`);
