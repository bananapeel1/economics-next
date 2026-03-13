import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { SUBJECT_SECTIONS } from '@/components/fun/constants';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject');

  if (!subject || !SUBJECT_SECTIONS[subject]) {
    return NextResponse.json({ error: 'Invalid subject' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const sectionIds = SUBJECT_SECTIONS[subject];

  const { data, error } = await supabase
    .from('section_quiz')
    .select('section_id, data')
    .in('section_id', sectionIds);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const pool = [];
  for (const row of (data || [])) {
    const questions = row.data || [];
    for (const q of questions) {
      pool.push({ ...q, sectionId: row.section_id });
    }
  }

  return NextResponse.json({ questions: pool });
}
