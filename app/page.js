import { createServerClient } from '@/lib/supabase-server';
import StudyApp from '@/components/StudyApp';

export default async function HomePage() {
  const supabase = createServerClient();

  // Fetch units and sections for sidebar
  const { data: units } = await supabase
    .from('units')
    .select('*')
    .order('number');

  const { data: sections } = await supabase
    .from('sections')
    .select('*')
    .order('sort_order');

  // Fetch initial section data (first section)
  const firstSectionId = sections?.[0]?.id;
  let initialData = null;
  if (firstSectionId) {
    const [content, notes, diagrams, flashcards, quiz, mistakes] = await Promise.all([
      supabase.from('section_content').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_notes').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_diagrams').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_flashcards').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_quiz').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_common_mistakes').select('data').eq('section_id', firstSectionId).single(),
    ]);
    initialData = {
      content: content.data?.data || [],
      notes: notes.data?.data || [],
      diagrams: diagrams.data?.data || [],
      flashcards: flashcards.data?.data || [],
      quiz: quiz.data?.data || [],
      mistakes: mistakes.data?.data || [],
    };
  }

  return (
    <StudyApp
      sections={sections || []}
      units={units || []}
      initialSectionData={initialData}
      initialSectionId={firstSectionId}
    />
  );
}
