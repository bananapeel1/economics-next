import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { rateLimit } from '@/lib/rate-limit';
import { FUNNEL_EVENTS } from '@/lib/funnel';

/**
 * POST /api/events — Learn Mode funnel events (audit/PLAN.md, packet 1).
 *
 * Accepts a small batch from lib/funnel.js, validates every field against an allow-list, attaches the
 * signed-in user if there is one, and inserts with the service role. Anonymous students are kept by
 * their per-browser anon_id so the step-0 pass rate covers everyone, not just the 211 who signed in.
 *
 * Until scripts/create-app-events-table.sql has been run, the table does not exist: the route then
 * answers 202 and logs once per server instance instead of failing, so the client never sees an error.
 */
export const runtime = 'nodejs';

const MAX_BATCH = 20;
const MAX_STR = 120;
let warnedMissingTable = false;

const str = (v, max = MAX_STR) => (typeof v === 'string' && v.length <= max ? v : null);
const int = v => (Number.isInteger(v) && v >= -1 && v <= 10000 ? v : null);
const ts = v => (typeof v === 'string' && !Number.isNaN(Date.parse(v)) ? new Date(v).toISOString() : null);

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Bad JSON' }, { status: 400 }); }

  const anonId = str(body?.anonId, 64);
  const events = Array.isArray(body?.events) ? body.events.slice(0, MAX_BATCH) : [];
  if (!events.length) return NextResponse.json({ error: 'No events' }, { status: 400 });

  // Best-effort rate limit (in-memory; per instance). Keyed on anon id, else on IP.
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const { allowed } = rateLimit(`events:${anonId || ip}`, 600);
  if (!allowed) return NextResponse.json({ error: 'Too many events' }, { status: 429 });

  // Attach the signed-in user when there is one; anonymous is fine.
  let userId = null;
  try {
    const supabaseAuth = await createClient();
    const { data: { user } } = await supabaseAuth.auth.getUser();
    userId = user?.id ?? null;
  } catch {}

  const rows = [];
  for (const e of events) {
    const event = str(e?.event, 40);
    if (!event || !FUNNEL_EVENTS.has(event)) continue;
    let props = null;
    if (e?.props && typeof e.props === 'object' && !Array.isArray(e.props)) {
      const s = JSON.stringify(e.props);
      if (s.length <= 2000) props = e.props;
    }
    rows.push({
      user_id: userId,
      anon_id: anonId,
      event,
      section_id: str(e?.sectionId),
      step: int(e?.step),
      total_steps: int(e?.totalSteps),
      props,
      client_ts: ts(e?.clientTs),
      tz_offset_min: Number.isInteger(e?.tzOffsetMin) && Math.abs(e.tzOffsetMin) <= 900 ? e.tzOffsetMin : null,
      path: str(e?.path, 200),
    });
  }
  if (!rows.length) return NextResponse.json({ error: 'No valid events' }, { status: 400 });

  const db = createServerClient();
  const { error } = await db.from('app_events').insert(rows);
  if (error) {
    const missing = /schema cache|does not exist|42P01/i.test(error.message || '');
    if (missing) {
      if (!warnedMissingTable) {
        warnedMissingTable = true;
        console.warn('[events] app_events table missing — run scripts/create-app-events-table.sql in the Supabase SQL editor. Events are being dropped until then.');
      }
      return new NextResponse(null, { status: 202 });
    }
    console.error('[events] insert failed', error.message);
    return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
  }
  return new NextResponse(null, { status: 204 });
}
