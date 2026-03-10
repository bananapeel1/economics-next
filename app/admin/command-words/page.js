import { createServerClient } from '@/lib/supabase-server';
import CommandWordsEditor from '@/components/admin/CommandWordsEditor';

export default async function AdminCommandWords() {
  const supabase = createServerClient();
  const { data: words } = await supabase
    .from('command_words')
    .select('*')
    .order('sort_order')
    .order('word');

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e8ecf5', marginBottom: 4 }}>
        Command Words
      </h1>
      <p style={{ fontSize: 13, color: '#6b7a99', marginBottom: 24 }}>
        Manage the command word library. These appear on the public /command-words page.
      </p>
      <CommandWordsEditor initialWords={words || []} />
    </div>
  );
}
