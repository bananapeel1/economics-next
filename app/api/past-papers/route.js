import { createAnonClient } from '@/lib/supabase-anon';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from('past_papers')
    .select('*')
    .order('year', { ascending: false })
    .order('session')
    .order('paper_number');

  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data || []);
}
