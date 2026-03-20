import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import WrittenPracticeEngine from '@/components/WrittenPracticeEngine';
import Link from 'next/link';

export const metadata = {
  title: 'Written Practice — Revvy Learn',
  description: 'Practise written exam answers and receive instant AI marking with structured feedback. 4, 6, 10, and 20-mark questions.',
};

export default async function WrittenPracticePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const isLoggedIn = !!user;

  // Check premium status
  let isPremium = false;
  let isAdmin = false;
  if (user) {
    const db = createServerClient();
    const { data: sub } = await db
      .from('user_subscriptions')
      .select('plan, status')
      .eq('user_id', user.id)
      .single();
    isPremium = sub?.plan === 'premium' && sub?.status === 'active';
    isAdmin = user.app_metadata?.role === 'admin';
  }

  // Fetch subjects, units, sections
  const db = createServerClient();
  const [{ data: subjects }, { data: units }, { data: sections }] = await Promise.all([
    db.from('subjects').select('id, name, slug').order('sort_order'),
    db.from('units').select('id, number, title, subject_id, subjects(slug)').order('number'),
    db.from('sections').select('id, title, short_title, unit_id, sort_order').order('sort_order'),
  ]);

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Written Practice</h1>
        <p className="resource-page-subtitle">
          Practise exam-style written answers and receive instant AI marking
          with detailed feedback.
        </p>
      </div>

      {(!isLoggedIn || (!isPremium && !isAdmin)) ? (
        <div className="wap-paywall">
          <div className="wap-paywall-card">
            <span className="wap-paywall-icon">✍️</span>
            <h2 className="wap-paywall-title">Premium Feature</h2>
            <p className="wap-paywall-text">
              Written answer practice uses AI to mark your answers against
              Edexcel mark schemes. Upgrade to Pro for unlimited access.
            </p>
            {!isLoggedIn ? (
              <Link href="/login" className="spe-btn spe-btn-primary">Sign in to continue</Link>
            ) : (
              <Link href="/upgrade" className="spe-btn spe-btn-primary">Upgrade to Pro</Link>
            )}
          </div>
        </div>
      ) : (
        <WrittenPracticeEngine
          subjects={subjects || []}
          units={units || []}
          sections={sections || []}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
}
