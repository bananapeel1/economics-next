import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { hasPremiumAccess } from '@/lib/entitlements';
import { getSubscriptionRow } from '@/lib/subscription-lookup';
import { PREVIEW_LIMITS } from '@/lib/preview-limits';
import { FUN_SUBJECTS, parseUnits, sectionsForUnits, buildFunPool } from '@/lib/fun-pool';

/**
 * GET /api/fun/questions?subject=economics&units=1,3
 *
 * F119, and the last of the four doors into the quiz bank. This one asked for a sign-in and then
 * stopped: no premium check, so any free account got the whole pool across every section of a
 * subject. Anyone can create a free account, so the paywall the Quiz tab draws was one signup away
 * from bypassed for as long as this existed.
 *
 * The founder kept the existing freemium boundary, so the same rule applies here as everywhere
 * else: a free account gets the per-section preview, a paying one gets the bank.
 *
 * `units` picks which of Units 1-4 the pool covers, and defaults to 1-2, which is all this route
 * served until Units 3-4 were added. The sections come from the database, not a list in the code:
 * lib/fun-pool.js says why.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject');
  const units = parseUnits(searchParams.get('units'));

  if (!FUN_SUBJECTS.includes(subject)) {
    return NextResponse.json({ error: 'Invalid subject' }, { status: 400 });
  }
  if (!units) {
    return NextResponse.json({ error: 'Invalid units' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = createServerClient();
  const sub = await getSubscriptionRow(db, user.id);
  const isPremium = hasPremiumAccess(sub) || user.app_metadata?.role === 'admin';

  const [unitsRes, sectionsRes] = await Promise.all([
    db.from('units').select('id, number, subjects(slug)'),
    db.from('sections').select('id, title, short_title, unit_id').order('sort_order'),
  ]);
  const lookupError = unitsRes.error || sectionsRes.error;
  if (lookupError) return NextResponse.json({ error: lookupError.message }, { status: 500 });

  const sections = sectionsForUnits(unitsRes.data, sectionsRes.data, subject, units);

  const { data, error } = await db
    .from('section_quiz')
    .select('section_id, data')
    .in('section_id', sections.map((s) => s.id));

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const pool = buildFunPool(sections, data, { isPremium, previewLimit: PREVIEW_LIMITS.quiz });

  return NextResponse.json({
    questions: pool.questions,
    units,
    limited: !isPremium,
    previewLimit: isPremium ? null : PREVIEW_LIMITS.quiz,
    totalAvailable: pool.totalAvailable,
    totalReturned: pool.totalReturned,
  });
}
