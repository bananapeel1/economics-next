import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';

/**
 * Learn Mode state for the signed-in student: completion, review schedule, strength inputs and
 * pre-test. F001 and F027.
 *
 * This replaces the dead `/api/learn-mode/progress` route, which wrote strings into a boolean
 * column and never stored a row in the feature's lifetime. Deleted in packet 1 rather than fixed,
 * on the grounds that packet 4 would rebuild it on a real model. This is that.
 *
 * GET  ?sections=a,b,c   -> { state: { [sectionId]: {...} } }
 * POST { sectionId, ... } -> upserts one section's state and returns it
 *
 * Writes are partial by design: the client sends the fields the event changed, not the whole row,
 * so completing a section cannot clobber a review schedule written on another device.
 */

// 1, 3, 7, 14 then monthly. The ladder the product already promised in its copy.
const INTERVALS_DAYS = [1, 3, 7, 14, 30];

const WRITABLE = new Set([
  'subjectId', 'completed', 'reviewIndex', 'reviews', 'quizAccuracy', 'pretestState', 'pretestScore',
]);

function rowToState(r) {
  return {
    sectionId: r.section_id,
    completed: !!r.completed_at,
    completedAt: r.completed_at,
    reviewIndex: r.review_index,
    nextReview: r.next_review,
    reviews: r.reviews,
    lastReview: r.last_review,
    quizAccuracy: r.quiz_accuracy,
    pretestState: r.pretest_state,
    pretestScore: r.pretest_score,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const supabaseAuth = await createClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();

  // Not an error: a signed-out student is legitimately using localStorage only.
  if (!user) return NextResponse.json({ state: {}, signedIn: false });

  const db = createServerClient();
  let q = db.from('user_section_state').select('*').eq('user_id', user.id);

  const sections = (searchParams.get('sections') || '').split(',').filter(Boolean);
  if (sections.length) q = q.in('section_id', sections.slice(0, 60));

  const { data, error } = await q;
  if (error) {
    // The table may not exist yet (the SQL is run by hand). Say so rather than 500ing the app:
    // Learn Mode still works on localStorage, it just does not follow the student between devices.
    console.error('[learn-mode/state] read failed:', error.message);
    return NextResponse.json({ state: {}, signedIn: true, unavailable: true });
  }

  const state = {};
  for (const r of data || []) state[r.section_id] = rowToState(r);
  return NextResponse.json({ state, signedIn: true });
}

export async function POST(request) {
  const supabaseAuth = await createClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const sectionId = typeof body.sectionId === 'string' ? body.sectionId : null;
  if (!sectionId) return NextResponse.json({ error: 'sectionId is required.' }, { status: 400 });

  const db = createServerClient();

  // Read first: a partial write must not blank fields this event does not know about.
  const { data: existing } = await db
    .from('user_section_state')
    .select('*')
    .eq('user_id', user.id)
    .eq('section_id', sectionId)
    .maybeSingle();

  const patch = {
    user_id: user.id,
    section_id: sectionId,
    subject_id: body.subjectId ?? existing?.subject_id ?? null,
    completed_at: existing?.completed_at ?? null,
    review_index: existing?.review_index ?? 0,
    next_review: existing?.next_review ?? null,
    reviews: existing?.reviews ?? 0,
    last_review: existing?.last_review ?? null,
    quiz_accuracy: existing?.quiz_accuracy ?? null,
    pretest_state: existing?.pretest_state ?? null,
    pretest_score: existing?.pretest_score ?? null,
    updated_at: new Date().toISOString(),
  };

  if (body.completed === true && !patch.completed_at) {
    patch.completed_at = new Date().toISOString();
  }
  if (body.completed === false) {
    // Retrying a topic clears completion but keeps the review history: they did learn it once.
    patch.completed_at = null;
  }

  // A review advances the ladder and sets the next due date. Never backwards.
  if (body.reviewed === true) {
    patch.reviews = (patch.reviews || 0) + 1;
    patch.review_index = Math.min((patch.review_index || 0) + 1, INTERVALS_DAYS.length - 1);
    patch.last_review = new Date().toISOString();
    const days = INTERVALS_DAYS[patch.review_index];
    patch.next_review = new Date(Date.now() + days * 86400000).toISOString();
  }

  if (typeof body.quizAccuracy === 'number') patch.quiz_accuracy = body.quizAccuracy;
  if (body.pretestState === 'taken' || body.pretestState === 'skipped') patch.pretest_state = body.pretestState;
  if (typeof body.pretestScore === 'number') patch.pretest_score = body.pretestScore;

  const { data, error } = await db
    .from('user_section_state')
    .upsert(patch, { onConflict: 'user_id,section_id' })
    .select()
    .maybeSingle();

  if (error) {
    console.error('[learn-mode/state] write failed:', error.message);
    // Surfaced, not swallowed. The old route's defining bug was a client that ignored the error,
    // so nobody noticed it had never written a row.
    return NextResponse.json({ error: 'Could not save progress.', detail: error.message }, { status: 500 });
  }

  return NextResponse.json({ state: data ? rowToState(data) : null });
}
