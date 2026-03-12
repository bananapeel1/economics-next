import { createServerClient } from '@/lib/supabase-server';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

async function checkAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized', status: 401 };
  if (user.app_metadata?.role !== 'admin') return { error: 'Forbidden', status: 403 };
  return { user };
}

export async function GET() {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .order('term');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await request.json();
  const supabase = createServerClient();

  if (body.id) {
    const { data, error } = await supabase
      .from('glossary_terms')
      .update({ term: body.term, definition: body.definition, subject_id: body.subject_id })
      .eq('id', body.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } else {
    const { data, error } = await supabase
      .from('glossary_terms')
      .insert({ term: body.term, definition: body.definition, subject_id: body.subject_id })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }
}

export async function DELETE(request) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const supabase = createServerClient();
  const { error } = await supabase.from('glossary_terms').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
