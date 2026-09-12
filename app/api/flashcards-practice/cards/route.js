import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { hasPremiumAccess } from '@/lib/entitlements';
import { getSubscriptionRow } from '@/lib/subscription-lookup';
import { PREVIEW_LIMITS } from '@/lib/preview-limits';

/**
 * GET /api/flashcards-practice/cards?sections=section1,section2,...
 *
 * The third door into paywalled content, and the last of the set. F086 closed
 * /api/practice/questions and then /api/sections/[id]; this one has the identical shape — anon
 * client, no auth, no premium check, no bound on the section list — and served the whole
 * flashcard bank to anyone who asked. Flashcards are a preview-then-paywall surface, so the
 * paywall on them was decorative for as long as this route existed.
 *
 * Same rule as its siblings: signed out gets nothing, a free account gets the same preview slice
 * the Flashcards tab shows, a paying account gets the bank, and the true totals ship separately
 * so any "N of M" copy stays honest.
 */

const MAX_SECTIONS = 50;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sectionsParam = searchParams.get('sections');

  if (!sectionsParam) {
    return NextResponse.json({ error: 'Missing sections parameter' }, { status: 400 });
  }

  const sectionIds = [...new Set(sectionsParam.split(',').filter(Boolean))];
  if (sectionIds.length === 0) {
    return NextResponse.json({ error: 'No sections provided' }, { status: 400 });
  }
  if (sectionIds.length > MAX_SECTIONS) {
    return NextResponse.json({ error: 'Too many sections requested.' }, { status: 400 });
  }

  const supabaseAuth = await createClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Please sign in to practise flashcards.', reason: 'signed-out' },
      { status: 401 },
    );
  }

  const db = createServerClient();
  const sub = await getSubscriptionRow(db, user.id);
  const isPremium = hasPremiumAccess(sub) || user.app_metadata?.role === 'admin';

  const { data, error } = await db
    .from('section_flashcards')
    .select('section_id, data')
    .in('section_id', sectionIds);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const cards = {};
  const counts = {};
  let totalAvailable = 0;
  let totalReturned = 0;

  for (const row of data || []) {
    const all = Array.isArray(row.data) ? row.data : [];
    counts[row.section_id] = all.length;
    totalAvailable += all.length;
    const served = isPremium ? all : all.slice(0, PREVIEW_LIMITS.flashcards);
    totalReturned += served.length;
    cards[row.section_id] = served;
  }
  for (const id of sectionIds) {
    if (!cards[id]) { cards[id] = []; counts[id] = counts[id] ?? 0; }
  }

  return NextResponse.json({
    cards,
    counts,
    limited: !isPremium,
    previewLimit: isPremium ? null : PREVIEW_LIMITS.flashcards,
    totalAvailable,
    totalReturned,
  });
}
