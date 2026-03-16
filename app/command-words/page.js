import { createServerClient } from '@/lib/supabase-server';
import CommandWordsPage from '@/components/CommandWordsPage';
import Link from 'next/link';

export const metadata = {
  title: 'Edexcel IAL Command Words Guide \u2014 Define, Explain, Evaluate | Revvy Learn',
  description: 'Complete guide to Edexcel IAL Economics and Business command words. Learn what Define, Explain, Analyse, Assess and Evaluate mean in exams, how each is marked, and model opening sentences that hit top marks.',
  openGraph: {
    title: 'Edexcel IAL Command Words Guide | Revvy Learn',
    description: 'Guide to Edexcel IAL command words: Define, Explain, Analyse, Assess and Evaluate. How each is marked with model opening sentences.',
    url: 'https://revvylearn.com/command-words',
  },
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
        <h1 className="resource-page-title">Edexcel IAL Economics Command Words</h1>
        <p className="resource-page-subtitle">
          Understanding command words is essential for exam success. Each word tells you exactly what the examiner expects in your answer.
        </p>
      </div>
      <CommandWordsPage words={words || []} />
    </div>
  );
}
