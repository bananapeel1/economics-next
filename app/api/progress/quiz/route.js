import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sectionId = searchParams.get('sectionId');
  if (!sectionId) return NextResponse.json({ error: 'Missing sectionId' }, { status: 400 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('user_quiz_attempts')
    .select('id, score, total, answers, attempted_at')
    .eq('user_id', user.id)
    .eq('section_id', sectionId)
    .order('attempted_at', { ascending: false })
    .limit(10);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ attempts: data });
}

export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { sectionId, score, total, answers } = await request.json();
  if (!sectionId || score === undefined || !total) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('user_quiz_attempts')
    .insert({
      user_id: user.id,
      section_id: sectionId,
      score,
      total,
      answers,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ attempt: data });
}
