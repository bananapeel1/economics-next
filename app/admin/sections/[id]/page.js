import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';
import SectionEditor from '@/components/admin/SectionEditor';

export default async function EditSection({ params }) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data: section } = await supabase
    .from('sections')
    .select('*, units(number, title, code)')
    .eq('id', id)
    .single();

  if (!section) {
    return <div style={{ color: '#ef4444', padding: 40 }}>Section not found.</div>;
  }

  const [content, notes, diagrams, flashcards, quiz] = await Promise.all([
    supabase.from('section_content').select('data').eq('section_id', id).single(),
    supabase.from('section_notes').select('data').eq('section_id', id).single(),
    supabase.from('section_diagrams').select('data').eq('section_id', id).single(),
    supabase.from('section_flashcards').select('data').eq('section_id', id).single(),
    supabase.from('section_quiz').select('data').eq('section_id', id).single(),
  ]);

  const sectionData = {
    content: content.data?.data || [],
    notes: notes.data?.data || [],
    diagrams: diagrams.data?.data || [],
    flashcards: flashcards.data?.data || [],
    quiz: quiz.data?.data || [],
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <Link href="/admin/sections" style={{ color: '#6b7a99', textDecoration: 'none', fontSize: 13 }}>
          ← Back to Sections
        </Link>
      </div>

      <div style={{ marginBottom: 24 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#059669' }}>
          Section {section.number}
        </span>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e8ecf5', marginTop: 4 }}>
          {section.title}
        </h1>
        <span style={{ fontSize: 12, color: '#6b7a99' }}>
          Unit {section.units?.number}: {section.units?.title}
        </span>
      </div>

      <SectionEditor sectionId={id} initialData={sectionData} />
    </div>
  );
}
