import { createServerClient } from '@/lib/supabase-server';
import GlossaryPage from '@/components/GlossaryPage';
import Link from 'next/link';

export const metadata = {
  title: 'Glossary — Revvy Learn',
  description: 'Comprehensive glossary of key terms and definitions for Edexcel International A-Level.',
};

export default async function GlossaryRoute() {
  const supabase = createServerClient();

  const [{ data: terms }, { data: subjects }] = await Promise.all([
    supabase.from('glossary_terms').select('*').order('term'),
    supabase.from('subjects').select('id, name, slug').order('name'),
  ]);

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Glossary</h1>
        <p className="resource-page-subtitle">
          Key terms and definitions for Edexcel International A-Level.
        </p>
      </div>
      <GlossaryPage terms={terms || []} subjects={subjects || []} />
    </div>
  );
}
