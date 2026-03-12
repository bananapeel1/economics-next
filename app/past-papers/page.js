import { createServerClient } from '@/lib/supabase-server';
import PastPapersPage from '@/components/PastPapersPage';
import Link from 'next/link';

export const metadata = {
  title: 'Past Papers — Revvy Learn',
  description: 'Download Edexcel past papers and mark schemes for exam practice.',
};

export default async function PastPapersRoute() {
  const supabase = createServerClient();

  const [{ data: papers }, { data: subjects }, { data: units }] = await Promise.all([
    supabase.from('past_papers').select('*').order('year', { ascending: false }).order('session').order('paper_number'),
    supabase.from('subjects').select('id, name, slug').order('name'),
    supabase.from('units').select('id, number, subject_id').order('number'),
  ]);

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Past Papers</h1>
        <p className="resource-page-subtitle">
          Download previous exam papers and mark schemes for Edexcel International A-Level.
        </p>
      </div>
      <PastPapersPage papers={papers || []} subjects={subjects || []} units={units || []} />
    </div>
  );
}
