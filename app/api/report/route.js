import { NextResponse } from 'next/server';
import { SURFACES, isAllowed } from '@/lib/feedback/taxonomy';
import {
  str, int, readJson, sameOrigin, serviceDb, identify, overLimit, pageFields,
  resolveSection, resolveItem, ingestReport, isMissingTable, fingerprint,
} from '@/lib/feedback/server';

/**
 * POST /api/report — "Report a problem" on a question, note, diagram or flashcard.
 *
 * The body says WHICH item and what the student thinks is wrong with it. Everything else is
 * decided here: who they are (session, anon id, IP hash), what the item actually is (resolved
 * from the live `data` column and snapshotted), which issue it belongs to, and how severe that
 * issue now is. See scripts/create-feedback-tables.sql for why reports attach to issues.
 *
 * Unlike /api/events this route does NOT answer 202 when its tables are missing. A funnel event
 * can be dropped quietly; a student who wrote "the answer to Q7 is B, not C" and pressed Send
 * must not be told "Thanks" when nothing was stored. 503 makes the sheet say it did not send.
 */
export const runtime = 'nodejs';

let warnedMissingTable = false;

export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Cross-site request refused' }, { status: 403 });
  const body = await readJson(request, 8_000);
  if (!body) return NextResponse.json({ error: 'Expected a JSON body under 8 KB' }, { status: 400 });

  // ── what the student says ───────────────────────────────────────────────────────────────────
  const surface = SURFACES[body.surface] ? body.surface : null;
  const revealed = body.answer?.revealed !== false;
  const category = surface && isAllowed(surface, body.category, { revealed }) ? body.category : null;
  const sectionId = str(body.sectionId, 120);
  if (!surface || !category || !sectionId) {
    return NextResponse.json({ error: 'Unknown surface, category or section' }, { status: 400 });
  }
  // Minted ids all begin with their section (`<sectionId>:<kind>:<key>`); anything else is not one.
  const itemId = str(body.itemId, 200);
  if (itemId && !itemId.startsWith(`${sectionId}:`)) {
    return NextResponse.json({ error: 'Item does not belong to that section' }, { status: 400 });
  }
  const note = str(body.note, 1000);
  const stem = str(body.rendered?.stem, 600);
  const text = (v) => str(v, 300);
  const answer = body.answer && typeof body.answer === 'object'
    ? {
        chosen: text(body.answer.chosen),
        // The marked answer is recorded only when the student had already been shown it.
        marked: revealed ? text(body.answer.marked) : null,
        correct: typeof body.answer.correct === 'boolean' ? body.answer.correct : null,
        revealed,
      }
    : null;
  const rendered = {
    stem,
    scenario: str(body.rendered?.scenario, 120),
    chapterTitle: str(body.rendered?.chapterTitle ?? body.notes?.chapterTitle, 200),
  };
  const notes = surface === 'notes'
    ? { chapterIndex: int(body.notes?.chapterIndex, 0, 200), chapterTitle: str(body.notes?.chapterTitle, 200) }
    : null;

  // ── who is saying it ────────────────────────────────────────────────────────────────────────
  const db = serviceDb();
  if (!db) return NextResponse.json({ error: 'Reports are not available on this deployment' }, { status: 503 });

  try {
    const who = await identify(request, body.anonId, db);
    if (!who.reporterKey) return NextResponse.json({ error: 'Could not identify the sender' }, { status: 400 });
    if (await overLimit(db, 'content_reports', who, { perHour: 10, perDay: 30 })) {
      return NextResponse.json({ error: 'Too many reports' }, { status: 429 });
    }

    // ── what it is about, resolved from the live content ──────────────────────────────────────
    const section = await resolveSection(db, sectionId);
    if (!section) return NextResponse.json({ error: 'Unknown section' }, { status: 400 });
    const item = await resolveItem(db, { sectionId, surface, itemId, stem, notes });
    // Not in the live content any more (or never was: a stale cache, an old review copy).
    // Keep it: "students are still seeing a deleted question" is itself worth knowing.
    const itemKey = item?.key ?? itemId ?? `${sectionId}:${surface}:unresolved:${fingerprint(stem ?? rendered.chapterTitle ?? '')}`;

    const result = await ingestReport(db, {
      itemKey,
      surface,
      section,
      item,
      who,
      category,
      note,
      report: {
        question_index: int(body.questionIndex, 0, 5000),
        step: int(body.step, 0, 5000),
        rendered,
        answer,
        ...pageFields(body, request),
      },
    });
    return NextResponse.json({ ok: true, duplicate: result.duplicate }, { status: result.duplicate ? 200 : 201 });
  } catch (error) {
    if (isMissingTable(error)) {
      if (!warnedMissingTable) {
        warnedMissingTable = true;
        console.warn('[report] content_reports missing — run scripts/create-feedback-tables.sql in the Supabase SQL editor.');
      }
      return NextResponse.json({ error: 'Reports are not switched on yet' }, { status: 503 });
    }
    console.error('[report] failed', error?.code, error?.message);
    return NextResponse.json({ error: 'Could not save the report' }, { status: 500 });
  }
}
