import { createServerClient } from '@/lib/supabase-server';
import GlossaryPage from '@/components/GlossaryPage';
import Link from 'next/link';

export const metadata = {
  title: 'IAL Economics & Business Glossary | Revvy Learn',
  description: 'Key terms and definitions for Edexcel IAL Economics and Business, A–Z. Aligned to the Edexcel IAL specification for quick exam reference.',
  openGraph: {
    title: 'IAL Economics & Business Glossary | Revvy Learn',
    description: 'Key terms and definitions for Edexcel IAL Economics and Business, A–Z. Aligned to the IAL specification.',
    url: 'https://revvylearn.com/glossary',
  },
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
        <h1 className="resource-page-title">Edexcel IAL Economics & Business Glossary</h1>
        <p className="resource-page-subtitle">
          Key terms and definitions for Edexcel International A-Level.
        </p>
      </div>
      <GlossaryPage terms={terms || []} subjects={subjects || []} />
    </div>
  );
}
