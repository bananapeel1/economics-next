import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { hasPremiumAccess } from '@/lib/entitlements';
import { getSubscriptionRow } from '@/lib/subscription-lookup';
import { PREVIEW_LIMITS } from '@/lib/preview-limits';
import { SUBJECT_SECTIONS } from '@/components/fun/constants';

/**
 * GET /api/fun/questions?subject=...
 *
 * F119, and the last of the four doors into the quiz bank. This one asked for a sign-in and then
 * stopped: no premium check, so any free account got the whole pool across every section of a
 * subject. Anyone can create a free account, so the paywall the Quiz tab draws was one signup away
 * from bypassed for as long as this existed.
 *
 * The founder kept the existing freemium boundary, so the same rule applies here as everywhere
 * else: a free account gets the per-section preview, a paying one gets the bank.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject');

  if (!subject || !SUBJECT_SECTIONS[subject]) {
    return NextResponse.json({ error: 'Invalid subject' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = createServerClient();
  const sub = await getSubscriptionRow(db, user.id);
  const isPremium = hasPremiumAccess(sub) || user.app_metadata?.role === 'admin';

  const sectionIds = SUBJECT_SECTIONS[subject];

  const { data, error } = await db
    .from('section_quiz')
    .select('section_id, data')
    .in('section_id', sectionIds);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const pool = [];
  let totalAvailable = 0;
  for (const row of (data || [])) {
    const questions = Array.isArray(row.data) ? row.data : [];
    totalAvailable += questions.length;
    const served = isPremium ? questions : questions.slice(0, PREVIEW_LIMITS.quiz);
    for (const q of served) {
      pool.push({ ...q, sectionId: row.section_id });
    }
  }

  return NextResponse.json({
    questions: pool,
    limited: !isPremium,
    previewLimit: isPremium ? null : PREVIEW_LIMITS.quiz,
    totalAvailable,
    totalReturned: pool.length,
  });
}
