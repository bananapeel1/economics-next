import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

// GET — fetch all section progress for the logged-in user
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json([], { status: 401 });

  const db = createServerClient();
  const { data, error } = await db
    .from('user_content_progress')
    .select('section_id, furthest_step, total_steps')
    .eq('user_id', user.id);

  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data || []);
}

// POST — upsert progress for a single section
export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { section_id, furthest_step, total_steps } = body;

  if (!section_id || furthest_step === undefined || !total_steps) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const db = createServerClient();
  const { data, error } = await db
    .from('user_content_progress')
    .upsert(
      {
        user_id: user.id,
        section_id,
        furthest_step,
        total_steps,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,section_id' }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
