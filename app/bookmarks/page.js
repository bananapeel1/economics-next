import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import BookmarksPage from '@/components/BookmarksPage';
import Link from 'next/link';

export const metadata = {
  title: 'Bookmarks — Rivvy Learn',
};

export default async function BookmarksRoute() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/bookmarks');
  }

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">← Back to App</Link>
        <h1 className="resource-page-title">Your Bookmarks</h1>
        <p className="resource-page-subtitle">
          Sections you&apos;ve bookmarked for quick access.
        </p>
      </div>
      <BookmarksPage />
    </div>
  );
}
