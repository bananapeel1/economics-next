import { createAnonClient } from '@/lib/supabase-anon';
import PastPapersPage from '@/components/PastPapersPage';
import Link from 'next/link';

export const metadata = {
  title: 'Edexcel IAL Past Papers & Mark Schemes 2024–2016 — Free PDF Download',
  description: 'Download free Edexcel IAL Economics and Business past papers with mark schemes and worked answers. All units covered: WEC11, WEC12, WEC13, WEC14, WBS11, WBS12. Instant access — no sign-up required.',
  alternates: { canonical: 'https://revvylearn.com/past-papers' },
  openGraph: {
    title: 'Edexcel IAL Past Papers & Mark Schemes — Free PDF Download',
    description: 'Free Edexcel IAL Economics and Business past papers with mark schemes 2024–2016. All units, instant access, no sign-up.',
    url: 'https://revvylearn.com/past-papers',
  },
};

export default async function PastPapersRoute() {
  const supabase = createAnonClient();

  const [{ data: papers }, { data: subjects }, { data: units }] = await Promise.all([
    supabase.from('past_papers').select('*').order('year', { ascending: false }).order('session').order('paper_number'),
    supabase.from('subjects').select('id, name, slug').order('name'),
    supabase.from('units').select('id, number, subject_id').order('number'),
  ]);

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Edexcel IAL Past Papers & Mark Schemes</h1>
        <p className="resource-page-subtitle">
          Download previous exam papers and mark schemes for Edexcel International A-Level.
        </p>
      </div>
      <PastPapersPage papers={papers || []} subjects={subjects || []} units={units || []} />
    </div>
  );
}
