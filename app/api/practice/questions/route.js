import { NextResponse } from 'next/server';
import { createAnonClient } from '@/lib/supabase-anon';

/**
 * GET /api/practice/questions?sections=section1,section2,...
 * Batch-fetches quiz data for multiple sections.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sectionsParam = searchParams.get('sections');

  if (!sectionsParam) {
    return NextResponse.json({ error: 'Missing sections parameter' }, { status: 400 });
  }

  const sectionIds = sectionsParam.split(',').filter(Boolean);
  if (sectionIds.length === 0) {
    return NextResponse.json({ error: 'No sections provided' }, { status: 400 });
  }

  const db = createAnonClient();
  const { data, error } = await db
    .from('section_quiz')
    .select('section_id, data')
    .in('section_id', sectionIds);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Transform to { [sectionId]: questionArray }
  const questions = {};
  for (const row of (data || [])) {
    questions[row.section_id] = row.data || [];
  }

  // Fill missing sections with empty arrays
  for (const id of sectionIds) {
    if (!questions[id]) questions[id] = [];
  }

  return NextResponse.json({ questions });
}
