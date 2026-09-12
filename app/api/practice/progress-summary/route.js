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
      .select('section_id, question_index, repetitions, next_review')
      .eq('user_id', user.id)
      .in('section_id', sectionIds);

    for (const row of (progressRows || [])) {
      if (!progressBySec[row.section_id]) {
        progressBySec[row.section_id] = { attempted: 0, mastered: 0, due: 0 };
      }
      progressBySec[row.section_id].attempted += 1;
      if (row.repetitions >= 3) {
        progressBySec[row.section_id].mastered += 1;
      }
      // F085: the chips promised "N questions, M due" and no due figure was ever computed.
      if (row.next_review && new Date(row.next_review).getTime() <= Date.now()) {
        progressBySec[row.section_id].due += 1;
      }
    }
  }

  // 3. Build summary
  const summary = {};
  for (const id of sectionIds) {
    const total = questionCounts[id] || 0;
    const prog = progressBySec[id] || { attempted: 0, mastered: 0, due: 0 };
    // An unseen question is due in the sense the student cares about: it is available to practise
    // now. So "due" is what is scheduled and ripe, plus everything never attempted.
    const dueNow = (prog.due || 0) + Math.max(0, total - prog.attempted);
    summary[id] = { total, attempted: prog.attempted, mastered: prog.mastered, due: dueNow };
  }

  return NextResponse.json({ summary });
}
