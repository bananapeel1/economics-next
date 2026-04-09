import { createAnonClient } from '@/lib/supabase-anon';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from('pdfs')
    .select('*')
    .order('category')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data || []);
}
