import { updateSession } from '@/lib/supabase/middleware';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Cached section → canonical path map (built once on first request, reused after)
let sectionMap = null;

async function getSectionMap() {
  if (sectionMap) return sectionMap;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: sections } = await supabase
    .from('sections')
    .select('id, unit_id, units(number, subjects(slug))')
    .order('sort_order');

  sectionMap = new Map();
  for (const s of sections || []) {
    if (s.units?.subjects?.slug) {
      sectionMap.set(s.id, `/${s.units.subjects.slug}/unit-${s.units.number}/${s.id}`);
    }
  }

  return sectionMap;
}

export async function middleware(request) {
  const { searchParams, pathname } = request.nextUrl;
  const sectionParam = searchParams.get('section');

  // 301 redirect ?section= URLs to canonical topic URLs
  if (sectionParam && pathname === '/') {
    const map = await getSectionMap();
    const canonicalPath = map.get(sectionParam);

    if (canonicalPath) {
      const url = request.nextUrl.clone();
      url.pathname = canonicalPath;
      url.searchParams.delete('section');
      return NextResponse.redirect(url, 301);
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
