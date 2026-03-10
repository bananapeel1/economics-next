import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('user_bookmarks')
    .select('section_id, created_at, sections(id, number, title, short_title, unit_id, units(number, title))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { sectionId } = await request.json();
  if (!sectionId) return NextResponse.json({ error: 'Missing sectionId' }, { status: 400 });

  const { data, error } = await supabase
    .from('user_bookmarks')
    .insert({ user_id: user.id, section_id: sectionId })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      // Already bookmarked — not an error
      return NextResponse.json({ already: true });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { sectionId } = await request.json();
  if (!sectionId) return NextResponse.json({ error: 'Missing sectionId' }, { status: 400 });

  const { error } = await supabase
    .from('user_bookmarks')
    .delete()
    .eq('user_id', user.id)
    .eq('section_id', sectionId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
