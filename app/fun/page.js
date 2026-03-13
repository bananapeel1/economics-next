import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import FunPage from '@/components/fun/FunPage';
import Link from 'next/link';

export const metadata = {
  title: 'Fun Zone — Revvy Learn',
};

export default async function FunRoute() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/fun');
  }

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Fun Zone</h1>
        <p className="resource-page-subtitle">
          Beat the dealer, answer questions, level up your knowledge.
        </p>
      </div>
      <FunPage />
    </div>
  );
}
