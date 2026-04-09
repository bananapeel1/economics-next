import { createAnonClient } from '@/lib/supabase-anon';
import CommandWordsPage from '@/components/CommandWordsPage';
import Link from 'next/link';

export const metadata = {
  title: 'Edexcel IAL Command Words: Define, Explain, Analyse, Evaluate — Exam Guide',
  description: 'Master every Edexcel IAL command word with example answers and mark breakdowns. Learn exactly what Define, Explain, Analyse, Assess and Evaluate mean, how marks are awarded, and model opening sentences that hit top bands.',
  alternates: { canonical: 'https://revvylearn.com/command-words' },
  openGraph: {
    title: 'Edexcel IAL Command Words — Exam Guide | Revvy Learn',
    description: 'Complete guide to Edexcel IAL command words with example answers and mark breakdowns. Define, Explain, Analyse, Assess, Evaluate.',
    url: 'https://revvylearn.com/command-words',
  },
};

export default async function CommandWordsRoute() {
  const supabase = createAnonClient();
  const { data: words } = await supabase
    .from('command_words')
    .select('*')
    .order('sort_order')
    .order('word');

  const faqSchema = (words || []).length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (words || []).map(w => ({
      "@type": "Question",
      "name": `What does "${w.word}" mean in Edexcel IAL exams?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": w.definition || w.description || `${w.word} is a command word used in Edexcel IAL Economics and Business exams.`
      }
    }))
  } : null;

  return (
    <div className="resource-page">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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
