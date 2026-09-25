import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { MOMENTS, REASON_IDS, TOPIC_IDS } from '@/lib/feedback/taxonomy';
import {
  str, int, readJson, sameOrigin, serviceDb, identify, overLimit, pageFields, resolveSection, isMissingTable,
} from '@/lib/feedback/server';

/**
 * POST /api/feedback — the card after a finished task ('moment') and "Send feedback" ('launcher').
 * GET  /api/feedback — for a signed-in student, when they last sent any, so a card answered on the
 *                      school laptop is not asked again on the phone.
 */
export const runtime = 'nodejs';

let warnedMissingTable = false;

export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Cross-site request refused' }, { status: 403 });
  const body = await readJson(request, 6_000);
  if (!body) return NextResponse.json({ error: 'Expected a JSON body under 6 KB' }, { status: 400 });

  const source = body.source === 'moment' || body.source === 'launcher' ? body.source : null;
  const message = str(body.message, 2000);
  let row;
  if (source === 'moment') {
    const moment = MOMENTS.includes(body.moment) ? body.moment : null;
    const rating = int(body.rating, 1, 5);
    if (!moment || !rating) return NextResponse.json({ error: 'A moment needs its name and a 1-5 rating' }, { status: 400 });
    const reasons = Array.isArray(body.reasons) ? [...new Set(body.reasons.filter((r) => REASON_IDS.has(r)))].slice(0, 5) : [];
    row = { source, moment, rating, reasons: reasons.length ? reasons : null, message };
  } else if (source === 'launcher') {
    const topic = TOPIC_IDS.has(body.topic) ? body.topic : null;
    if (!topic || !message) return NextResponse.json({ error: 'Feedback needs a topic and a message' }, { status: 400 });
    row = { source, topic, message };
  } else {
    return NextResponse.json({ error: 'Unknown source' }, { status: 400 });
  }

  const db = serviceDb();
  if (!db) return NextResponse.json({ error: 'Feedback is not available on this deployment' }, { status: 503 });

  try {
    const who = await identify(request, body.anonId, db);
    if (!who.reporterKey) return NextResponse.json({ error: 'Could not identify the sender' }, { status: 400 });
    if (await overLimit(db, 'user_feedback', who, { perHour: 5, perDay: 12 })) {
      return NextResponse.json({ error: 'Too much feedback in a short time' }, { status: 429 });
    }

    const sectionId = str(body.sectionId, 120);
    const section = sectionId ? await resolveSection(db, sectionId) : null;

    const { error } = await db.from('user_feedback').insert({
      ...row,
      // Words get triaged; a bare rating goes straight to the topic ratings (uf_status_iff_msg).
      status: row.message ? 'open' : null,
      user_id: who.userId,
      anon_id: who.anonId,
      ip_hash: who.ipHash,
      reporter_plan: who.plan,
      section_id: section?.id ?? null,
      subject: section?.subject ?? null,
      ...pageFields(body, request),
    });
    if (error) throw error;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (isMissingTable(error)) {
      if (!warnedMissingTable) {
        warnedMissingTable = true;
        console.warn('[feedback] user_feedback missing — run scripts/create-feedback-tables.sql in the Supabase SQL editor.');
      }
      return NextResponse.json({ error: 'Feedback is not switched on yet' }, { status: 503 });
    }
    console.error('[feedback] failed', error?.code, error?.message);
    return NextResponse.json({ error: 'Could not save feedback' }, { status: 500 });
  }
}

export async function GET() {
  const noStore = { headers: { 'Cache-Control': 'private, no-store' } };
  let userId = null;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {}
  const db = userId ? serviceDb() : null;
  if (!db) return NextResponse.json({ lastSubmittedAt: null }, noStore);

  const { data } = await db
    .from('user_feedback')
    .select('created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return NextResponse.json({ lastSubmittedAt: data?.created_at ?? null }, noStore);
}
