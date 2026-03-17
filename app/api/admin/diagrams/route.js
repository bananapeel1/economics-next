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

// GET — fetch diagrams for a section
export async function GET(request) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { searchParams } = new URL(request.url);
  const sectionId = searchParams.get('section_id');
  if (!sectionId) return NextResponse.json({ error: 'Missing section_id' }, { status: 400 });

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('section_diagrams')
    .select('data')
    .eq('section_id', sectionId)
    .single();

  if (error && error.code !== 'PGRST116') return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data?.data || []);
}

// POST — upload image and add to section diagrams
export async function POST(request) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const formData = await request.formData();
  const sectionId = formData.get('section_id');
  const title = formData.get('title') || 'Untitled Diagram';
  const description = formData.get('description') || '';
  const file = formData.get('file');

  if (!sectionId || !file) {
    return NextResponse.json({ error: 'Missing section_id or file' }, { status: 400 });
  }

  const supabase = createServerClient();

  // Upload to Supabase Storage
  const ext = file.name.split('.').pop();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const path = `diagrams/${sectionId}/${Date.now()}-${slug}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadErr } = await supabase.storage
    .from('assets')
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (uploadErr) return NextResponse.json({ error: uploadErr.message }, { status: 500 });

  const { data: urlData } = supabase.storage.from('assets').getPublicUrl(path);
  const imageUrl = urlData.publicUrl;

  // Fetch existing diagrams
  const { data: existing } = await supabase
    .from('section_diagrams')
    .select('data')
    .eq('section_id', sectionId)
    .single();

  const diagrams = existing?.data || [];
  diagrams.push({ title, description, imageUrl });

  // Upsert
  const { error: upsertErr } = await supabase
    .from('section_diagrams')
    .upsert(
      { section_id: sectionId, data: diagrams },
      { onConflict: 'section_id' }
    );

  if (upsertErr) return NextResponse.json({ error: upsertErr.message }, { status: 500 });

  return NextResponse.json({ success: true, imageUrl, diagrams });
}

// DELETE — remove a diagram by index
export async function DELETE(request) {
  const auth = await checkAdmin();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { searchParams } = new URL(request.url);
  const sectionId = searchParams.get('section_id');
  const index = parseInt(searchParams.get('index'), 10);

  if (!sectionId || isNaN(index)) {
    return NextResponse.json({ error: 'Missing section_id or index' }, { status: 400 });
  }

  const supabase = createServerClient();
  const { data: existing } = await supabase
    .from('section_diagrams')
    .select('data')
    .eq('section_id', sectionId)
    .single();

  if (!existing?.data) return NextResponse.json({ error: 'No diagrams found' }, { status: 404 });

  const diagrams = [...existing.data];
  diagrams.splice(index, 1);

  const { error } = await supabase
    .from('section_diagrams')
    .update({ data: diagrams })
    .eq('section_id', sectionId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, diagrams });
}
