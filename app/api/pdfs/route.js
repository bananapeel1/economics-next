import { createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('pdfs')
    .select('*')
    .order('category')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data || []);
}
