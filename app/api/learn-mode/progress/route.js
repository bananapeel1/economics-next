import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';

/**
 * POST /api/learn-mode/progress
 * Records learn mode completion and step progress for a section.
 * Saves to practice_question_progress with 'lm-' prefix.
 * This feeds into the learning progress dashboard.
 */
export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { sectionId, totalSteps, completedStep, isComplete, preTestScore, postTestScore } = await request.json();

  if (!sectionId) {
    return NextResponse.json({ error: 'Missing sectionId' }, { status: 400 });
  }

  const db = createServerClient();
  const lmSectionId = `lm-${sectionId}`;

  // Save step progress (questionIndex = step number, so we track per-step)
  if (completedStep !== undefined) {
    await db
      .from('practice_question_progress')
      .upsert({
        user_id: user.id,
        section_id: lmSectionId,
        question_index: completedStep,
        ease: 2.5,
        interval_days: isComplete ? 7 : 1,
        repetitions: isComplete ? 3 : 1,
        next_review: new Date(Date.now() + (isComplete ? 7 : 1) * 86400000).toISOString(),
        last_result: 'correct',
        last_confidence: null,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,section_id,question_index',
      });
  }

  // If fully complete, also save a completion marker (step = -1 as special marker)
  if (isComplete) {
    await db
      .from('practice_question_progress')
      .upsert({
        user_id: user.id,
        section_id: lmSectionId,
        question_index: -1, // completion marker
        ease: 2.5,
        interval_days: 7,
        repetitions: totalSteps || 1,
        next_review: new Date(Date.now() + 7 * 86400000).toISOString(),
        last_result: postTestScore !== undefined ? `post:${postTestScore}` : 'complete',
        last_confidence: preTestScore !== undefined ? `pre:${preTestScore}` : null,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,section_id,question_index',
      });
  }

  return NextResponse.json({ ok: true });
}

/**
 * GET /api/learn-mode/progress?sections=sec1,sec2
 * Returns learn mode completion data for the progress dashboard.
 */
export async function GET(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const sectionsParam = searchParams.get('sections');
  if (!sectionsParam) return NextResponse.json({ error: 'Missing sections' }, { status: 400 });

  const sectionIds = sectionsParam.split(',').filter(Boolean);
  const lmIds = sectionIds.map(id => `lm-${id}`);

  const db = createServerClient();
  const { data, error } = await db
    .from('practice_question_progress')
    .select('section_id, question_index, repetitions, last_result')
    .eq('user_id', user.id)
    .in('section_id', lmIds);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Build summary per section
  const summary = {};
  for (const id of sectionIds) {
    const lmId = `lm-${id}`;
    const rows = (data || []).filter(r => r.section_id === lmId);
    const completionRow = rows.find(r => r.question_index === -1);
    const stepRows = rows.filter(r => r.question_index >= 0);
    summary[id] = {
      completed: !!completionRow,
      stepsCompleted: stepRows.length,
      totalRepetitions: completionRow?.repetitions || 0,
      lastResult: completionRow?.last_result || null,
    };
  }

  return NextResponse.json({ summary });
}
