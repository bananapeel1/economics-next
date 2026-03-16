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
    .from('pdfs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const formData = await request.formData();
  const supabase = createServerClient();

  const title = formData.get('title');
  const description = formData.get('description') || '';
  const category = formData.get('category') || 'General';
  const pdfFile = formData.get('pdf_file');

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  let file_url = null;
  let file_name = null;

  // Upload PDF file
  if (pdfFile && pdfFile.size > 0) {
    file_name = pdfFile.name;
    const safeName = title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const fileName = `uploads/${safeName}-${Date.now()}.pdf`;
    const { error: uploadErr } = await supabase.storage
      .from('pdfs')
      .upload(fileName, pdfFile, { contentType: 'application/pdf', upsert: true });

    if (uploadErr) return NextResponse.json({ error: `Upload failed: ${uploadErr.message}` }, { status: 500 });

    const { data: urlData } = supabase.storage.from('pdfs').getPublicUrl(fileName);
    file_url = urlData.publicUrl;
  }

  // Check if updating
  const id = formData.get('id');
  if (id) {
    const updateData = { title, description, category, updated_at: new Date().toISOString() };
    if (file_url) {
      updateData.file_url = file_url;
      updateData.file_name = file_name;
    }

    const { data, error } = await supabase
      .from('pdfs')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  // Create new
  if (!file_url) {
    return NextResponse.json({ error: 'PDF file is required for new uploads' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('pdfs')
    .insert({ title, description, category, file_url, file_name })
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
  const { error } = await supabase.from('pdfs').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
