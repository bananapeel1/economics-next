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
    .from('past_papers')
    .select('*')
    .order('year', { ascending: false })
    .order('session')
    .order('paper_number');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const formData = await request.formData();
  const supabase = createServerClient();

  const title = formData.get('title');
  const year = parseInt(formData.get('year'));
  const session = formData.get('session'); // e.g. "January", "June", "October"
  const paper_number = parseInt(formData.get('paper_number')) || 1;
  const unit = parseInt(formData.get('unit')) || 1;
  const paperFile = formData.get('paper_file');
  const markSchemeFile = formData.get('mark_scheme_file');

  if (!title || !year || !session) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  let paper_url = null;
  let mark_scheme_url = null;

  // Upload question paper PDF
  if (paperFile && paperFile.size > 0) {
    const fileName = `papers/${year}-${session}-P${paper_number}-paper-${Date.now()}.pdf`;
    const { error: uploadErr } = await supabase.storage
      .from('past-papers')
      .upload(fileName, paperFile, { contentType: 'application/pdf', upsert: true });

    if (uploadErr) return NextResponse.json({ error: `Paper upload failed: ${uploadErr.message}` }, { status: 500 });

    const { data: urlData } = supabase.storage.from('past-papers').getPublicUrl(fileName);
    paper_url = urlData.publicUrl;
  }

  // Upload mark scheme PDF
  if (markSchemeFile && markSchemeFile.size > 0) {
    const fileName = `mark-schemes/${year}-${session}-P${paper_number}-ms-${Date.now()}.pdf`;
    const { error: uploadErr } = await supabase.storage
      .from('past-papers')
      .upload(fileName, markSchemeFile, { contentType: 'application/pdf', upsert: true });

    if (uploadErr) return NextResponse.json({ error: `Mark scheme upload failed: ${uploadErr.message}` }, { status: 500 });

    const { data: urlData } = supabase.storage.from('past-papers').getPublicUrl(fileName);
    mark_scheme_url = urlData.publicUrl;
  }

  // Check if we're updating
  const id = formData.get('id');
  if (id) {
    const updateData = { title, year, session, paper_number, unit };
    if (paper_url) updateData.paper_url = paper_url;
    if (mark_scheme_url) updateData.mark_scheme_url = mark_scheme_url;

    const { data, error } = await supabase
      .from('past_papers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  // Create new
  const { data, error } = await supabase
    .from('past_papers')
    .insert({ title, year, session, paper_number, unit, paper_url, mark_scheme_url })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const supabase = createServerClient();
  const { error } = await supabase.from('past_papers').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
