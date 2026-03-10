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
    .from('user_flashcard_progress')
    .select('card_index, status')
    .eq('user_id', user.id)
    .eq('section_id', sectionId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Convert array to object: { "0": "got-it", "1": "learning", ... }
  const statuses = {};
  data.forEach(row => { statuses[row.card_index] = row.status; });

  return NextResponse.json({ statuses });
}

export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { sectionId, statuses } = await request.json();
  if (!sectionId || !statuses) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

  // Build rows for upsert
  const rows = Object.entries(statuses).map(([cardIndex, status]) => ({
    user_id: user.id,
    section_id: sectionId,
    card_index: parseInt(cardIndex),
    status,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from('user_flashcard_progress')
    .upsert(rows, { onConflict: 'user_id,section_id,card_index' });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
