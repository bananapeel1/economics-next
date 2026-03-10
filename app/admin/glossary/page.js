import { createServerClient } from '@/lib/supabase-server';
import GlossaryEditor from '@/components/admin/GlossaryEditor';

export default async function AdminGlossary() {
  const supabase = createServerClient();
  const { data: terms } = await supabase
    .from('glossary_terms')
    .select('*')
    .order('term');

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e8ecf5', marginBottom: 4 }}>
        Glossary
      </h1>
      <p style={{ fontSize: 13, color: '#6b7a99', marginBottom: 24 }}>
        Manage glossary terms. These appear on the public /glossary page.
      </p>
      <GlossaryEditor initialTerms={terms || []} />
    </div>
  );
}
