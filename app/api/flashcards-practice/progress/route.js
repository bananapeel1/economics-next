import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';

/**
 * GET /api/flashcards-practice/progress?sections=section1,section2,...
 * Fetches per-card progress for the logged-in user.
 * Uses the same practice_question_progress table with fc- prefixed section IDs.
 */
export async function GET(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const sectionsParam = searchParams.get('sections');
  if (!sectionsParam) {
    return NextResponse.json({ error: 'Missing sections parameter' }, { status: 400 });
  }

  const sectionIds = sectionsParam.split(',').filter(Boolean);
  // Prefix with fc- for flashcard progress
  const fcSectionIds = sectionIds.map(id => `fc-${id}`);

  const db = createServerClient();
  const { data, error } = await db
    .from('practice_question_progress')
    .select('*')
    .eq('user_id', user.id)
    .in('section_id', fcSectionIds);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ progress: data || [] });
}

/**
 * POST /api/flashcards-practice/progress
 * Upserts per-card progress for the logged-in user.
 */
export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { sectionId, questionIndex, ease, intervalDays, repetitions, nextReview, lastResult, lastConfidence } = body;

  if (!sectionId || questionIndex === undefined) {
    return NextResponse.json({ error: 'Missing sectionId or questionIndex' }, { status: 400 });
  }

  const db = createServerClient();
  const { data, error } = await db
    .from('practice_question_progress')
    .upsert({
      user_id: user.id,
      section_id: sectionId,
      question_index: questionIndex,
      ease: ease ?? 2.5,
      interval_days: intervalDays ?? 0,
      repetitions: repetitions ?? 0,
      next_review: nextReview ? new Date(nextReview).toISOString() : new Date().toISOString(),
      last_result: lastResult ?? null,
      last_confidence: lastConfidence ?? null,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id,section_id,question_index',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ updated: data });
}
