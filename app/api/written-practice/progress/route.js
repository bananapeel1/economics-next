import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { buildProgressRow, PROGRESS_CONFLICT_TARGET } from '@/lib/progress-row';

/**
 * GET /api/written-practice/progress?sections=section1,section2,...
 * Fetches per-question progress for written answers (wa- prefixed).
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
  const waSectionIds = sectionIds.map(id => `wa-${id}`);

  const db = createServerClient();
  const { data, error } = await db
    .from('practice_question_progress')
    .select('*')
    .eq('user_id', user.id)
    .in('section_id', waSectionIds);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ progress: data || [] });
}

/**
 * POST /api/written-practice/progress
 * Upserts per-question progress for written answers.
 */
export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { sectionId, questionIndex, itemId, ease, intervalDays, repetitions, nextReview, lastResult, lastConfidence } = body;

  if (!sectionId || questionIndex === undefined) {
    return NextResponse.json({ error: 'Missing sectionId or questionIndex' }, { status: 400 });
  }

  const db = createServerClient();
  const { data, error } = await db
    .from('practice_question_progress')
    .upsert(
      buildProgressRow({
        userId: user.id,
        sectionId, questionIndex, itemId,
        ease, intervalDays, repetitions, nextReview, lastResult, lastConfidence,
      }),
      { onConflict: PROGRESS_CONFLICT_TARGET },
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ updated: data });
}
