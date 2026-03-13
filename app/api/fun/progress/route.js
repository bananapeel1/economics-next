import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get('subjectId');
  if (!subjectId) return NextResponse.json({ error: 'Missing subjectId' }, { status: 400 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('user_fun_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('subject_id', parseInt(subjectId))
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    progress: data || {
      level: 1, xp: 0, games_played: 0, games_won: 0,
      current_streak: 0, best_streak: 0, quiz_correct: 0, quiz_total: 0,
    },
  });
}

export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { subjectId, level, xp, games_played, games_won, current_streak, best_streak, quiz_correct, quiz_total } = body;

  const { data, error } = await supabase
    .from('user_fun_progress')
    .upsert({
      user_id: user.id,
      subject_id: parseInt(subjectId),
      level, xp, games_played, games_won,
      current_streak, best_streak,
      quiz_correct, quiz_total,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,subject_id' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ progress: data });
}
