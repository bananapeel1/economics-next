import { createAnonClient } from '@/lib/supabase-anon';
import { publicSectionPayload } from '@/lib/preview-limits';
import StudyApp from '@/components/StudyApp';

export const revalidate = 3600;

// Strip HTML tags to plain text
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').trim();
}

export async function generateStaticParams() {
  const supabase = createAnonClient();

  const { data: sections } = await supabase
    .from('sections')
    .select('id, unit_id, units(number, subject_id, subjects(slug))')
    .order('sort_order');

  return (sections || [])
    .filter(s => s.units?.subjects?.slug === 'business')
    .map(s => ({
      unit: `unit-${s.units.number}`,
      topic: s.id,
    }));
}

export async function generateMetadata({ params }) {
  const { topic } = await params;
  const supabase = createAnonClient();

  const { data: section } = await supabase
    .from('sections')
    .select('title, short_title, unit_id, units(number, title)')
    .eq('id', topic)
    .single();

  if (!section) {
    return { title: 'Topic Not Found | Revvy Learn' };
  }

  const title = `${section.title} — Edexcel IAL Business ${section.units.title} | Revvy Learn`;
  const description = `Free revision notes and practice questions for ${section.title}, plus flashcards and quizzes with Pro. Edexcel International A-Level Business ${section.units.title}.`;

  return {
    title,
    description,
    alternates: { canonical: `https://revvylearn.com/business/unit-${section.units.number}/${topic}` },
    openGraph: {
      title,
      description,
      url: `https://revvylearn.com/business/unit-${section.units.number}/${topic}`,
      type: 'article',
    },
  };
}

export default async function BusinessTopicPage({ params }) {
  const { topic } = await params;
  const supabase = createAnonClient();

  // Fetch all subjects, units, sections (same as homepage)
  const [{ data: subjects }, { data: units }, { data: sections }] = await Promise.all([
    supabase.from('subjects').select('*').order('sort_order'),
    supabase.from('units').select('*, subjects(slug)').order('number'),
    supabase.from('sections').select('*').order('sort_order'),
  ]);

  /*
   * V007. This page used to read all eight tables and hand the lot to StudyApp, so every quiz
   * question with its `correctIndex`, every flashcard, every extras chain and the paid-only common
   * mistakes sat in the HTML of a page that needs no account — behind a Quiz tab that sliced to two
   * in the browser and a Quick Fire drill that did not. It reads the four FREE tables now; the paid
   * half arrives from `GET /api/sections/[id]`, which is the only path that knows who is asking.
   *
   * The page carries `revalidate` and `generateStaticParams`, so one document is built and served
   * to everyone: it may not hold anything that depends on entitlement, in either direction.
   */
  const [content, notes, diagrams, practice] = await Promise.all([
    supabase.from('section_content').select('data, published_at').eq('section_id', topic).single(),
    supabase.from('section_notes').select('data').eq('section_id', topic).single(),
    supabase.from('section_diagrams').select('data').eq('section_id', topic).single(),
    supabase.from('section_practice').select('data').eq('section_id', topic).single(),
  ]);

  const initialData = publicSectionPayload({
    content: content.data?.data,
    notes: notes.data?.data,
    diagrams: diagrams.data?.data,
    practice: practice.data?.data,
    contentVersionSince: content.data?.published_at ?? null,
  });

  // Get section and unit info for SEO
  const section = (sections || []).find(s => s.id === topic);
  const unit = section ? (units || []).find(u => u.id === section.unit_id) : null;
  const contentData = initialData.content;

  // Build FAQs from first 2 concepts/sections of the first content step
  const faqs = [];
  if (contentData.length > 0) {
    const firstBlock = contentData[0];
    if (firstBlock.concepts) {
      firstBlock.concepts.slice(0, 2).forEach(concept => {
        const answer = concept.points.map(p => stripHtml(p)).join(' ');
        if (answer) {
          faqs.push({
            question: `What is ${concept.title} in ${section?.title || 'Business'}?`,
            answer,
          });
        }
      });
    } else if (firstBlock.sections) {
      firstBlock.sections.slice(0, 2).forEach(sec => {
        const answer = sec.keyIdea || '';
        if (answer) {
          faqs.push({
            question: `What is ${sec.title} in ${section?.title || 'Business'}?`,
            answer: answer.replace(/\*\*/g, ''),
          });
        }
      });
    }
  }

  // JSON-LD LearningResource
  const learningResourceLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    'name': section?.title || topic,
    'description': `Free revision notes for ${section?.title || topic} — Edexcel IAL Business ${unit ? `Unit ${unit.number}` : ''}`,
    'url': `https://revvylearn.com/business/unit-${unit?.number || 1}/${topic}`,
    'educationalLevel': 'Advanced Level',
    'learningResourceType': 'Revision Notes',
    'teaches': section?.title || topic,
    'inLanguage': 'en-GB',
    'isAccessibleForFree': true,
    'provider': {
      '@type': 'EducationalOrganization',
      'name': 'Revvy Learn',
      'url': 'https://revvylearn.com'
    },
  };

  // JSON-LD BreadcrumbList
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://revvylearn.com' },
      { '@type': 'ListItem', position: 2, name: 'Business', item: 'https://revvylearn.com/business' },
      { '@type': 'ListItem', position: 3, name: unit ? `Unit ${unit.number}: ${unit.title}` : 'Unit', item: `https://revvylearn.com/business/unit-${unit?.number || 1}` },
      { '@type': 'ListItem', position: 4, name: section?.title || topic },
    ],
  };

  // JSON-LD FAQPage
  const faqLd = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}


      {/* SSR content for Google (visually hidden, accessible) */}
      <div className="sr-only">
        <h1>{section?.title || topic} — Edexcel IAL Business</h1>
        {contentData.map((step, i) => (
          <div key={i}>
            <h2>{step.title}</h2>
            {step.concepts?.map((concept, j) => (
              <div key={j}>
                <h3>{concept.title}</h3>
                <ul>
                  {concept.points?.map((point, k) => (
                    <li key={k}>{stripHtml(point)}</li>
                  ))}
                </ul>
                {concept.examTip && <p><strong>Exam Tip:</strong> {stripHtml(concept.examTip)}</p>}
              </div>
            ))}
            {step.sections?.map((sec, j) => (
              <div key={j}>
                <h3>{sec.title}</h3>
                <p>{sec.keyIdea?.replace(/\*\*/g, '')}</p>
                {sec.body?.filter(b => b.type === 'paragraph').map((b, k) => (
                  <p key={k}>{b.text.replace(/\*\*/g, '').replace(/\*/g, '')}</p>
                ))}
                {sec.realExample && <p><strong>Real Example:</strong> {sec.realExample.text.replace(/\*\*/g, '')}</p>}
                {sec.examMatters && <p><strong>Exam Matters:</strong> {sec.examMatters.replace(/\*\*/g, '')}</p>}
              </div>
            ))}
          </div>
        ))}

        {/* FAQ section for SEO */}
        {faqs.length > 0 && (
          <div>
            <h2>Frequently Asked Questions</h2>
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full interactive app */}
      <StudyApp
        subjects={subjects || []}
        sections={sections || []}
        units={units || []}
        initialSectionData={initialData}
        initialSectionId={topic}
        requestedSectionId={topic}
      />
    </>
  );
}
