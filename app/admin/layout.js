import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Admin — Rivvy Learn',
};

export default async function AdminLayout({ children }) {
  // Server-side auth check (defense in depth — middleware handles this too)
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/admin');
  }
  if (user.app_metadata?.role !== 'admin') {
    redirect('/');
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <nav style={{
        width: 240, minWidth: 240, background: '#0f1117',
        borderRight: '1px solid #2a3045', padding: '20px 0',
        display: 'flex', flexDirection: 'column', overflow: 'auto'
      }}>
        <div style={{ padding: '0 20px 16px', borderBottom: '1px solid #2a3045' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, background: 'linear-gradient(135deg, #059669, #10b981)',
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: 'white'
            }}>A</div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#e8ecf5' }}>Admin Panel</span>
          </div>
        </div>

        <div style={{ padding: '12px 0' }}>
          <Link href="/admin" style={{
            display: 'block', padding: '8px 20px', fontSize: 13, color: '#8892a8',
            textDecoration: 'none', transition: 'all 0.15s'
          }}>
            Dashboard
          </Link>
          <Link href="/admin/sections" style={{
            display: 'block', padding: '8px 20px', fontSize: 13, color: '#8892a8',
            textDecoration: 'none', transition: 'all 0.15s'
          }}>
            Sections
          </Link>
          <Link href="/admin/command-words" style={{
            display: 'block', padding: '8px 20px', fontSize: 13, color: '#8892a8',
            textDecoration: 'none', transition: 'all 0.15s'
          }}>
            Command Words
          </Link>
          <Link href="/admin/glossary" style={{
            display: 'block', padding: '8px 20px', fontSize: 13, color: '#8892a8',
            textDecoration: 'none', transition: 'all 0.15s'
          }}>
            Glossary
          </Link>
          <Link href="/admin/past-papers" style={{
            display: 'block', padding: '8px 20px', fontSize: 13, color: '#8892a8',
            textDecoration: 'none', transition: 'all 0.15s'
          }}>
            Past Papers
          </Link>
          <div style={{ borderTop: '1px solid #2a3045', margin: '12px 20px' }} />
          <Link href="/" style={{
            display: 'block', padding: '8px 20px', fontSize: 13, color: '#6b7a99',
            textDecoration: 'none'
          }}>
            ← Back to App
          </Link>
        </div>
      </nav>

      <main style={{ flex: 1, overflow: 'auto', padding: '28px 32px', background: '#0f1117' }}>
        {children}
      </main>
    </div>
  );
}
