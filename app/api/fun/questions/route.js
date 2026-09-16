import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { hasPremiumAccess } from '@/lib/entitlements';
import { getSubscriptionRow } from '@/lib/subscription-lookup';
import { SUBJECT_SECTIONS } from '@/components/fun/constants';

/*
 * V007, found while closing the page payload. Blackjack is a paid feature — `app/fun/page.js`
 * renders it with `previewMode={!isPremium}` behind a PaywallOverlay — but this route asked only
 * for a session, so any signed-in free account could call it directly and receive every quiz
 * question of a whole subject, `correctIndex` included. The same shape as F086 and F120: the
 * interface gated it and the door behind did not.
 *
 * It also read `section_quiz` with the caller's own (anonymous-key) client, which is the last
 * reader outside this file's entitled path — so it would have broken the moment the row-level
 * security in scripts/packet-2-1-paid-table-rls.sql landed. Service role now, after the check.
 */

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject');

  if (!subject || !SUBJECT_SECTIONS[subject]) {
    return NextResponse.json({ error: 'Invalid subject' }, { status: 400 });
  }

  const supabaseAuth = await createClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { error: 'Please sign in to play.', reason: 'signed-out' },
      { status: 401 },
    );
  }

  const db = createServerClient();
  const sub = await getSubscriptionRow(db, user.id);
  const isPremium = hasPremiumAccess(sub) || user.app_metadata?.role === 'admin';
  if (!isPremium) {
    return NextResponse.json(
      { error: 'Blackjack is part of Pro.', reason: 'not-premium' },
      { status: 403 },
    );
  }

  const sectionIds = SUBJECT_SECTIONS[subject];

  const { data, error } = await db
    .from('section_quiz')
    .select('section_id, data')
    .in('section_id', sectionIds);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const pool = [];
  for (const row of (data || [])) {
    const questions = row.data || [];
    for (const q of questions) {
      pool.push({ ...q, sectionId: row.section_id });
    }
  }

  return NextResponse.json({ questions: pool });
}
