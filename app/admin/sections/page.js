import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';

export default async function AdminSections() {
  const supabase = createServerClient();

  const { data: sections } = await supabase
    .from('sections')
    .select('*, units(number, title)')
    .order('sort_order');

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e8ecf5', marginBottom: 24 }}>Manage Sections</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {(sections || []).map(section => (
          <Link
            key={section.id}
            href={`/admin/sections/${section.id}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 20px', background: '#1e2335', border: '1px solid #2a3045',
              borderRadius: 10, textDecoration: 'none', transition: 'all 0.15s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#059669', minWidth: 40 }}>
                {section.number}
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#e8ecf5' }}>
                {section.title}
              </span>
            </div>
            <span style={{ fontSize: 12, color: '#6b7a99' }}>
              Unit {section.units?.number}: {section.units?.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
