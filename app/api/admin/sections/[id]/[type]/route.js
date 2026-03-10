import { createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

const TABLE_MAP = {
  content: 'section_content',
  notes: 'section_notes',
  diagrams: 'section_diagrams',
  flashcards: 'section_flashcards',
  quiz: 'section_quiz',
};

export async function PUT(request, { params }) {
  const { id, type } = await params;
  const tableName = TABLE_MAP[type];

  if (!tableName) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  const { data: jsonData } = await request.json();
  const supabase = createServerClient();

  // Check if row exists
  const { data: existing } = await supabase
    .from(tableName)
    .select('id')
    .eq('section_id', id)
    .single();

  let result;
  if (existing) {
    result = await supabase
      .from(tableName)
      .update({ data: jsonData })
      .eq('section_id', id)
      .select()
      .single();
  } else {
    result = await supabase
      .from(tableName)
      .insert({ section_id: id, data: jsonData })
      .select()
      .single();
  }

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data: result.data });
}
