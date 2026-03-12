import { createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get('subject_id');

  const supabase = createServerClient();
  let query = supabase
    .from('glossary_terms')
    .select('term, definition')
    .order('term');

  if (subjectId) {
    query = query.eq('subject_id', subjectId);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data || []);
}
