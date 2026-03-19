import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ProgressDashboard from '@/components/ProgressDashboard';
import Link from 'next/link';

export const metadata = {
  title: 'Learning Progress — Revvy Learn',
  description: 'Track your mastery across all topics with detailed analytics and progress insights.',
};

export default async function ProgressPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Learning Progress</h1>
        <p className="resource-page-subtitle">
          Track your mastery across all topics
        </p>
      </div>
      <ProgressDashboard />
    </div>
  );
}
