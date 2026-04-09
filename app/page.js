import { createAnonClient } from '@/lib/supabase-anon';
import StudyApp from '@/components/StudyApp';

export const metadata = {
  title: 'Edexcel IAL Economics & Business Revision | Free Notes, Flashcards & Quizzes | Revvy Learn',
  description: 'Free interactive revision for Edexcel International A-Level Economics and Business. Notes, flashcards, quizzes, past papers and AI tutor — all mapped to the IAL spec.',
  openGraph: {
    title: 'Edexcel IAL Economics & Business Revision | Free Notes, Flashcards & Quizzes | Revvy Learn',
    description: 'Free interactive revision for Edexcel International A-Level Economics and Business. Notes, flashcards, quizzes, past papers and AI tutor — all mapped to the IAL spec.',
    url: 'https://revvylearn.com',
    type: 'website',
  },
};

export default async function HomePage() {
  const supabase = createAnonClient();

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
      <section className="sr-only">
        <h2>Free Edexcel IAL Revision for International A-Level Students</h2>
        <p>
          Revvy Learn is a free interactive revision platform built specifically for the Edexcel International A-Level (IAL) specification in Economics and Business. Every topic is mapped directly to the IAL syllabus, covering all four Economics units (WEC11, WEC12, WEC13, WEC14) and all four Business units (WBS11, WBS12, WBS13, WBS14).
        </p>
        <p>
          Whether you are studying at an international school in Hong Kong, South Korea, Malaysia, Singapore, Pakistan, Sri Lanka or the Middle East, Revvy Learn gives you everything you need to revise for your Edexcel IAL exams. Our revision notes, adaptive flashcards, exam-style practice questions, model answers and AI tutor are all free to access — no signup required for notes.
        </p>
        <p>
          Unlike general A-Level revision sites, Revvy Learn is purpose-built for the International A-Level. Every spec point is covered with concise, exam-focused notes, clear diagrams, and spaced-repetition flashcards that adapt to your strengths and weaknesses. Our AI tutor answers any Economics or Business question instantly, helping you build evaluation chains and check your reasoning before exam day.
        </p>
        <p>
          Revvy Learn covers both the January and June exam series, so whether you are sitting papers in the winter or summer session, your revision is always aligned to the right content. Start revising today — choose Economics or Business and work through every topic at your own pace.
        </p>
      </section>
    </>
  );
}
