import { createServerClient } from '@/lib/supabase-server';
import StudyApp from '@/components/StudyApp';

export const metadata = {
  title: 'Free IAL Economics & Business Revision | Revvy Learn',
  description: 'Free notes, flashcards, quizzes and AI tutor for Edexcel IAL Economics and Business. Every spec point covered. Used by IAL students worldwide.',
  openGraph: {
    title: 'Free IAL Economics & Business Revision | Revvy Learn',
    description: 'Free notes, flashcards, quizzes and AI tutor for Edexcel IAL Economics and Business. Every spec point covered.',
    url: 'https://revvylearn.com',
    type: 'website',
  },
};

export default async function HomePage() {
  const supabase = createServerClient();

  // Fetch subjects, units and sections
  const { data: subjects } = await supabase
    .from('subjects')
    .select('*')
    .order('sort_order');

  const { data: units } = await supabase
    .from('units')
    .select('*, subjects(slug)')
    .order('number');

  const { data: sections } = await supabase
    .from('sections')
    .select('*')
    .order('sort_order');

  // Default to first subject
  const defaultSubject = subjects?.[0] || null;
  const defaultUnits = defaultSubject
    ? (units || []).filter(u => u.subject_id === defaultSubject.id)
    : [];
  const defaultSectionIds = new Set(
    (sections || []).filter(s => defaultUnits.some(u => u.id === s.unit_id)).map(s => s.id)
  );
  const firstSectionId = (sections || []).find(s => defaultSectionIds.has(s.id))?.id || null;

  // Fetch initial section data
  let initialData = null;
  if (firstSectionId) {
    const [content, notes, diagrams, flashcards, quiz, mistakes, practice, extras] = await Promise.all([
      supabase.from('section_content').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_notes').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_diagrams').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_flashcards').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_quiz').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_common_mistakes').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_practice').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_extras').select('data').eq('section_id', firstSectionId).single(),
    ]);
    initialData = {
      content: content.data?.data || [],
      notes: notes.data?.data || [],
      diagrams: diagrams.data?.data || [],
      flashcards: flashcards.data?.data || [],
      quiz: quiz.data?.data || [],
      mistakes: mistakes.data?.data || [],
      practice: practice.data?.data || [],
      extras: extras.data?.data || { chains: [], evaluation: [] },
    };
  }

  return (
    <>
      <h1 className="sr-only">Edexcel IAL Economics &amp; Business Revision — Free Notes, Flashcards &amp; Quizzes</h1>
      <StudyApp
        subjects={subjects || []}
        sections={sections || []}
        units={units || []}
        initialSectionData={initialData}
        initialSectionId={firstSectionId}
      />
    </>
  );
}
