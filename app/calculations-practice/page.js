import { createClient } from '@/lib/supabase/server';
import { createServerClient } from '@/lib/supabase-server';
import CalculationsEngine from '@/components/CalculationsEngine';
import Link from 'next/link';

export const metadata = {
  title: 'Calculations Practice — Revvy Learn',
  description: 'Calculation drills for Edexcel IAL Economics and Business with fresh figures every time. Marked step by step with the own figure rule, and spaced so each method comes back before you forget it.',
};

/*
 * Packet 13.4. Mirrors /flashcards-practice and /practice: the structure is read server-side and
 * the session runs in the browser. `code` and `number` are what a topic's calculations are
 * derived from (lib/quant-pool.js).
 */
export default async function CalculationsPracticePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const isLoggedIn = !!user;

  const db = createServerClient();

  const [{ data: subjects }, { data: units }, { data: sections }] = await Promise.all([
    db.from('subjects').select('id, name, slug').order('sort_order'),
    db.from('units').select('id, number, code, title, subject_id, subjects(slug)').order('number'),
    db.from('sections').select('id, title, short_title, unit_id, sort_order, number').order('sort_order'),
  ]);

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Calculations</h1>
        <p className="resource-page-subtitle">
          The method stays the same and the numbers change every time, so the only thing
          to remember is how. Calculations you get right come back later; the ones you miss
          come back sooner.
        </p>
      </div>
      <CalculationsEngine
        subjects={subjects || []}
        units={units || []}
        sections={sections || []}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
