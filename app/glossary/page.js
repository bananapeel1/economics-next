import { createServerClient } from '@/lib/supabase-server';
import GlossaryPage from '@/components/GlossaryPage';
import Link from 'next/link';

export const metadata = {
  title: 'Glossary — Rivvy Learn',
  description: 'Comprehensive glossary of Edexcel Economics key terms and definitions.',
};

export default async function GlossaryRoute() {
  const supabase = createServerClient();
  const { data: terms } = await supabase
    .from('glossary_terms')
    .select('*')
    .order('term');

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">← Back to App</Link>
        <h1 className="resource-page-title">Glossary</h1>
        <p className="resource-page-subtitle">
          Key economics terms and definitions for Edexcel International A-Level.
        </p>
      </div>
      <GlossaryPage terms={terms || []} />
    </div>
  );
}
