import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import SettingsPage from '@/components/SettingsPage';
import Link from 'next/link';

export const metadata = {
  title: 'Settings — Revvy Learn',
};

export default async function SettingsRoute() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/settings');
  }

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Settings</h1>
        <p className="resource-page-subtitle">
          Manage your account, subscription and preferences.
        </p>
      </div>
      <SettingsPage />
    </div>
  );
}
