import { createServerClient } from '@/lib/supabase-server';
import CommandWordsPage from '@/components/CommandWordsPage';
import Link from 'next/link';

export const metadata = {
  title: 'Command Words — Economics IAS',
  description: 'Edexcel Economics command words: what they mean and what examiners expect.',
};

export default async function CommandWordsRoute() {
  const supabase = createServerClient();
  const { data: words } = await supabase
    .from('command_words')
    .select('*')
    .order('sort_order')
    .order('word');

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">← Back to App</Link>
        <h1 className="resource-page-title">Command Words</h1>
        <p className="resource-page-subtitle">
          Understanding command words is essential for exam success. Each word tells you exactly what the examiner expects in your answer.
        </p>
      </div>
      <CommandWordsPage words={words || []} />
    </div>
  );
}
