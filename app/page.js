import { createAnonClient } from '@/lib/supabase-anon';
import { cachedPagePayload } from '@/lib/preview-limits';
import StudyApp from '@/components/StudyApp';

export const metadata = {
  title: 'Edexcel IAL Economics & Business Revision | Free Notes & Practice | Revvy Learn',
  description: 'Interactive revision for Edexcel International A-Level Economics and Business, across 23 Economics and 20 Business sections. Notes, diagrams and practice questions are free. Flashcards, quizzes and the AI tutor unlock with Pro.',
  openGraph: {
    title: 'Edexcel IAL Economics & Business Revision | Free Notes & Practice | Revvy Learn',
    description: 'Interactive revision for Edexcel International A-Level Economics and Business, across 23 Economics and 20 Business sections. Notes, diagrams and practice questions are free. Flashcards, quizzes and the AI tutor unlock with Pro.',
    url: 'https://revvylearn.com',
    type: 'website',
  },
};

export default async function HomePage({ searchParams }) {
  const supabase = createAnonClient();

  // Honour ?section= during server render. Without this the server always
  // assumed the first subject, and because StudyApp seeds its subject state on
  // that first render, a Business link opened the Economics syllabus.
  const { section: requestedSection } = (await searchParams) || {};

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
  const requestedSectionId = requestedSection
    && (sections || []).some(s => s.id === requestedSection)
    ? requestedSection
    : null;

  const firstSectionId = requestedSectionId
    || (sections || []).find(s => defaultSectionIds.has(s.id))?.id
    || null;

  // Fetch initial section data
  let initialData = null;
  if (firstSectionId) {
    /* V007, same rule as the topic pages: this document is cached and served to everyone, so it
       carries the free preview only. The four paid tables are not read here. */
    const [content, notes, diagrams, practice] = await Promise.all([
      supabase.from('section_content').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_notes').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_diagrams').select('data').eq('section_id', firstSectionId).single(),
      supabase.from('section_practice').select('data').eq('section_id', firstSectionId).single(),
    ]);
    initialData = cachedPagePayload({
      content: content.data?.data || [],
      notes: notes.data?.data || [],
      diagrams: diagrams.data?.data || [],
      practice: practice.data?.data || [],
    });
  }

  return (
    <>
      <h1 className="sr-only">Edexcel IAL Economics &amp; Business Revision — Free Notes and Practice Questions</h1>
      <StudyApp
        subjects={subjects || []}
        sections={sections || []}
        units={units || []}
        initialSectionData={initialData}
        initialSectionId={firstSectionId}
        requestedSectionId={requestedSectionId}
      />
      <section className="sr-only">
        <h2>Free Edexcel IAL Revision for International A-Level Students</h2>
        <p>
          Revvy Learn is a free interactive revision platform built specifically for the Edexcel International A-Level (IAL) specification in Economics and Business. Every topic is mapped directly to the IAL syllabus, covering all four Economics units (WEC11, WEC12, WEC13, WEC14) and all four Business units (WBS11, WBS12, WBS13, WBS14).
        </p>
        <p>
          Whether you are studying at an international school in Hong Kong, South Korea, Malaysia, Singapore, Pakistan, Sri Lanka or the Middle East, Revvy Learn gives you everything you need to revise for your Edexcel IAL exams. Our revision notes, diagrams and exam-style practice questions are free to access, with no signup required for notes, and the first model answer on every page is free to read. Flashcards, quizzes and the AI tutor unlock with Pro.
        </p>
        <p>
          Unlike general A-Level revision sites, Revvy Learn is purpose-built for the International A-Level. All 23 Economics sections and all 20 Business sections have concise, exam-focused notes, and every Economics section comes with clear exam diagrams. Flashcards use spaced repetition (SM-2), so the cards you get wrong come back sooner. Our AI tutor answers any Economics or Business question instantly, helping you build evaluation chains and check your reasoning before exam day.
        </p>
        <p>
          Revvy Learn covers both the January and June exam series, so whether you are sitting papers in the winter or summer session, your revision is always aligned to the right content. Start revising today — choose Economics or Business and work through every topic at your own pace.
        </p>
      </section>
    </>
  );
}
