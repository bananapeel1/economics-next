import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import { hasPremiumAccess } from '@/lib/entitlements';
import { getSubscriptionRow } from '@/lib/subscription-lookup';
import { FUN_SUBJECTS, FUN_UNITS } from '@/lib/fun-pool';
import { redirect } from 'next/navigation';
import FunPage from '@/components/fun/FunPage';
import Link from 'next/link';

export const metadata = {
  title: 'Blackjack — Revvy Learn',
  robots: 'noindex, nofollow',
};

export default async function FunRoute({ searchParams }) {
  const params = (await searchParams) || {};
  /* `?subject=business&unit=3` is the Quiz tab's "Play Blackjack" link: open on the unit the student
     was just quizzed on. Anything else is ignored rather than guessed at. */
  const initialSubject = FUN_SUBJECTS.includes(params.subject) ? params.subject : null;
  const initialUnit = initialSubject && /^[1-4]$/.test(String(params.unit ?? '')) ? Number(params.unit) : null;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const back = initialSubject
      ? `/fun?subject=${initialSubject}${initialUnit ? `&unit=${initialUnit}` : ''}`
      : '/fun';
    redirect(`/login?redirect=${encodeURIComponent(back)}`);
  }

  /* The same Pro check as /api/fun/questions. This page used to run its own `.single()` read of
     `plan, status` with no admin role, so the two could disagree: a lapsed subscriber whose row
     still said active got the full game here (no `current_period_end`, so hasPremiumAccess could
     not see the lapse) but only the free preview of questions from the route, and an admin got the
     questions but the preview game. getSubscriptionRow also survives a user holding two rows. */
  const db = createServerClient();
  const [sub, { data: unitRows }] = await Promise.all([
    getSubscriptionRow(db, user.id),
    db.from('units').select('number, title, subjects(slug)').order('number'),
  ]);
  const isPremium = hasPremiumAccess(sub) || user.app_metadata?.role === 'admin';

  /* Unit titles for the picker, e.g. { economics: { 3: 'Business Behaviour' } }. If this read fails
     the picker falls back to plain "Unit 3", which still plays. */
  const unitTitles = Object.fromEntries(FUN_SUBJECTS.map((s) => [s, {}]));
  for (const u of unitRows || []) {
    const slug = u.subjects?.slug;
    if (unitTitles[slug] && FUN_UNITS.includes(u.number)) unitTitles[slug][u.number] = u.title;
  }

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Blackjack</h1>
        <p className="resource-page-subtitle">
          Beat the dealer, answer questions, level up your knowledge.
        </p>
      </div>
      <FunPage
        previewMode={!isPremium}
        unitTitles={unitTitles}
        initialSubject={initialSubject}
        initialUnit={initialUnit}
      />
    </div>
  );
}
