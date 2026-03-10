import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = createServerClient();

  const { count: sectionCount } = await supabase.from('sections').select('*', { count: 'exact', head: true });
  const { count: unitCount } = await supabase.from('units').select('*', { count: 'exact', head: true });

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e8ecf5', marginBottom: 24 }}>Admin Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        <div style={{ background: '#1e2335', border: '1px solid #2a3045', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#059669' }}>{unitCount || 0}</div>
          <div style={{ fontSize: 13, color: '#6b7a99', marginTop: 4 }}>Units</div>
        </div>
        <div style={{ background: '#1e2335', border: '1px solid #2a3045', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#059669' }}>{sectionCount || 0}</div>
          <div style={{ fontSize: 13, color: '#6b7a99', marginTop: 4 }}>Sections</div>
        </div>
      </div>

      <Link href="/admin/sections" style={{
        display: 'inline-block', padding: '10px 24px', background: '#059669', color: 'white',
        borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none'
      }}>
        Manage Sections →
      </Link>
    </div>
  );
}
