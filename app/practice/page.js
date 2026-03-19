import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import PracticeEngine from '@/components/PracticeEngine';
import Link from 'next/link';

export const metadata = {
  title: 'Smart Practice — Revvy Learn',
  description: 'Spaced repetition practice for Edexcel IAL Economics and Business. Questions adapt to your knowledge using the SM-2 algorithm.',
};

export default async function PracticePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const isLoggedIn = !!user;

  // Fetch subjects, units, sections (server-side with service client)
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
        <h1 className="resource-page-title">Smart Practice</h1>
        <p className="resource-page-subtitle">
          Questions adapt to you using spaced repetition. Topics you struggle
          with come back sooner, while mastered topics space out over time.
        </p>
      </div>
      <PracticeEngine
        subjects={subjects || []}
        units={units || []}
        sections={sections || []}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
