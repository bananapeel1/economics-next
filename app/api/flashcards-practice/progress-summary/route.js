import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';

/**
 * GET /api/flashcards-practice/progress-summary?sections=section1,section2,...
 * Returns lightweight per-section mastery stats for flashcards.
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

  // 1. Get flashcard counts per section
  const { data: flashcardRows } = await db
    .from('section_flashcards')
    .select('section_id, data')
    .in('section_id', sectionIds);

  const cardCounts = {};
  for (const row of (flashcardRows || [])) {
    cardCounts[row.section_id] = Array.isArray(row.data) ? row.data.length : 0;
  }

  // 2. Get user progress (if authenticated)
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const progressBySec = {};

  if (user) {
    // Fetch fc- prefixed progress
    const fcSectionIds = sectionIds.map(id => `fc-${id}`);
    const { data: progressRows } = await db
      .from('practice_question_progress')
      .select('section_id, question_index, repetitions')
      .eq('user_id', user.id)
      .in('section_id', fcSectionIds);

    for (const row of (progressRows || [])) {
      // Strip fc- prefix for the response
      const originalId = row.section_id.replace(/^fc-/, '');
      if (!progressBySec[originalId]) {
        progressBySec[originalId] = { attempted: 0, mastered: 0 };
      }
      progressBySec[originalId].attempted += 1;
      if (row.repetitions >= 3) {
        progressBySec[originalId].mastered += 1;
      }
    }
  }

  // 3. Build summary
  const summary = {};
  for (const id of sectionIds) {
    const total = cardCounts[id] || 0;
    const prog = progressBySec[id] || { attempted: 0, mastered: 0 };
    summary[id] = { total, attempted: prog.attempted, mastered: prog.mastered };
  }

  return NextResponse.json({ summary });
}
