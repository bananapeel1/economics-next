import { NextResponse } from 'next/server';
import { createAnonClient } from '@/lib/supabase-anon';

/**
 * GET /api/written-practice/questions?sections=section1,section2&marks=4
 * Fetches written practice questions from section_practice table.
 * Optional marks param filters by mark value.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sectionsParam = searchParams.get('sections');
  const marksParam = searchParams.get('marks');

  if (!sectionsParam) {
    return NextResponse.json({ error: 'Missing sections parameter' }, { status: 400 });
  }

  const sectionIds = sectionsParam.split(',').filter(Boolean);
  if (sectionIds.length === 0) {
    return NextResponse.json({ error: 'No sections provided' }, { status: 400 });
  }

  const db = createAnonClient();
  const { data, error } = await db
    .from('section_practice')
    .select('section_id, data')
    .in('section_id', sectionIds);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const questions = {};
  for (const row of (data || [])) {
    let items = row.data || [];
    // Filter by marks if specified
    if (marksParam && marksParam !== 'all') {
      const targetMarks = parseInt(marksParam, 10);
      if (!isNaN(targetMarks)) {
        items = items.filter(q => q.marks === targetMarks);
      }
    }
    questions[row.section_id] = items;
  }

  // Fill missing sections with empty arrays
  for (const id of sectionIds) {
    if (!questions[id]) questions[id] = [];
  }

  return NextResponse.json({ questions });
}
