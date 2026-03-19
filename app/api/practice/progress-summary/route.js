import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';

/**
 * GET /api/practice/progress-summary?sections=section1,section2,...
 * Returns lightweight per-section mastery stats.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sectionsParam = searchParams.get('sections');

  if (!sectionsParam) {
    return NextResponse.json({ error: 'Missing sections parameter' }, { status: 400 });
  }

  const sectionIds = sectionsParam.split(',').filter(Boolean);
  if (sectionIds.length === 0) {
    return NextResponse.json({ summary: {} });
  }

  const db = createServerClient();

  // 1. Get question counts per section
  const { data: quizRows } = await db
    .from('section_quiz')
    .select('section_id, data')
    .in('section_id', sectionIds);

  const questionCounts = {};
  for (const row of (quizRows || [])) {
    questionCounts[row.section_id] = Array.isArray(row.data) ? row.data.length : 0;
  }

  // 2. Get user progress (if authenticated)
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const progressBySec = {};

  if (user) {
    const { data: progressRows } = await db
      .from('practice_question_progress')
      .select('section_id, question_index, repetitions')
      .eq('user_id', user.id)
      .in('section_id', sectionIds);

    for (const row of (progressRows || [])) {
      if (!progressBySec[row.section_id]) {
        progressBySec[row.section_id] = { attempted: 0, mastered: 0 };
      }
      progressBySec[row.section_id].attempted += 1;
      if (row.repetitions >= 3) {
        progressBySec[row.section_id].mastered += 1;
      }
    }
  }

  // 3. Build summary
  const summary = {};
  for (const id of sectionIds) {
    const total = questionCounts[id] || 0;
    const prog = progressBySec[id] || { attempted: 0, mastered: 0 };
    summary[id] = { total, attempted: prog.attempted, mastered: prog.mastered };
  }

  return NextResponse.json({ summary });
}
