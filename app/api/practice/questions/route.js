import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { hasPremiumAccess } from '@/lib/entitlements';
import { getSubscriptionRow } from '@/lib/subscription-lookup';

/**
 * GET /api/practice/questions?sections=section1,section2,...
 * Returns the quiz bank for the requested sections, subject to entitlement.
 *
 * F086. This route used to take no auth and no premium check, used the anon client, and returned the
 * whole `section_quiz` array — `correctIndex` included — for every section id it was given, with no
 * bound on how many. So the bank the Quiz tab paywalls after two questions was one unauthenticated
 * request away in full, answer keys and all, and Smart Practice was built on that hole.
 *
 * The founder chose to keep the existing freemium boundary, so the boundary is enforced here rather
 * than redrawn: signed out gets nothing, a signed-in free student gets the same per-section preview
 * the Quiz tab gives, and a paying student gets the bank. The response says which of those happened
 * so the client can explain itself instead of rendering an empty state.
 */

// Same number the Quiz tab previews (components/QuizTab.jsx PREVIEW_LIMIT), so the two surfaces
// cannot disagree about what "free" means for the same bank.
const PREVIEW_LIMIT = 2;

// A bound on the request itself. 43 sections exist; anything beyond that is someone enumerating.
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
      { error: 'Please sign in to use Smart Practice.', reason: 'signed-out' },
      { status: 401 },
    );
  }

  const db = createServerClient();
  const sub = await getSubscriptionRow(db, user.id);
  const isPremium = hasPremiumAccess(sub) || user.app_metadata?.role === 'admin';

  const { data, error } = await db
    .from('section_quiz')
    .select('section_id, data')
    .in('section_id', sectionIds);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const questions = {};
  let totalAvailable = 0;
  let totalReturned = 0;

  for (const row of data || []) {
    const all = Array.isArray(row.data) ? row.data : [];
    totalAvailable += all.length;
    const served = isPremium ? all : all.slice(0, PREVIEW_LIMIT);
    totalReturned += served.length;
    questions[row.section_id] = served;
  }
  for (const id of sectionIds) {
    if (!questions[id]) questions[id] = [];
  }

  return NextResponse.json({
    questions,
    limited: !isPremium,
    previewLimit: isPremium ? null : PREVIEW_LIMIT,
    totalAvailable,
    totalReturned,
  });
}
