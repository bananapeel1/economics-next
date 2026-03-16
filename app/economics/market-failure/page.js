import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';
import RelatedModelAnswers from '@/components/RelatedModelAnswers';

export const metadata = {
  title: 'Market Failure \u2014 Edexcel IAL Economics Unit 1 | Revvy Learn',
  description: 'Free market failure revision notes for Edexcel IAL Economics (1.3.5). Covers externalities, public goods, merit goods, information failure and government intervention with diagrams, practice questions and model answers.',
  openGraph: {
    title: 'Market Failure \u2014 Edexcel IAL Economics Unit 1 | Revvy Learn',
    description: 'Complete market failure revision notes for Edexcel IAL Economics. Externalities, public goods, merit goods and government intervention.',
    url: 'https://revvylearn.com/economics/market-failure',
    type: 'article',
  },
};

export default async function MarketFailurePage() {
  const supabase = createServerClient();

  const [{ data: notes }, { data: practice }] = await Promise.all([
    supabase.from('section_notes').select('data').eq('section_id', 'market-failure').single(),
    supabase.from('section_practice').select('data').eq('section_id', 'market-failure').single(),
  ]);

  const notesData = notes?.data || [];
  const practiceData = (practice?.data || []).slice(0, 4);

  const faqSchema = practiceData.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": practiceData.map(q => ({
      "@type": "Question",
      "name": q.question || q.title || '',
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.guidance || q.answer || q.modelAnswer || ''
      }
    })).filter(q => q.name && q.acceptedAnswer.text)
  } : null;

  return (
    <div className="resource-page">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="resource-page-header">
        <Link href="/economics/unit-1" className="resource-back-link">&larr; Unit 1: Markets in Action</Link>
        <span className="seo-unit-badge">Section 1.3.5 · WEC11</span>
        <h1 className="resource-page-title">Edexcel IAL Market Failure Revision Notes</h1>
        <p className="resource-page-subtitle">
          Unit 1: Markets in Action — Key concepts on why markets fail and how governments respond.
        </p>
      </div>

      {/* Hero CTA */}
      <div className="seo-hero-cta">
        <div className="seo-hero-cta-content">
          <div className="seo-hero-cta-text">
            <span className="seo-hero-cta-label">Interactive Revision</span>
            <p>Flashcards, quizzes, AI tutor &amp; progress tracking for this topic</p>
          </div>
          <Link href="/?section=market-failure" className="seo-hero-cta-button">
            Open in App &rarr;
          </Link>
        </div>
      </div>

      {/* Vertical stepper — mimics app layout */}
      {notesData.length > 0 && (
        <div className="seo-stepper">
          {notesData.slice(0, 5).map((section, i) => (
            <div key={i} className="seo-stepper-step">
              <div className="seo-stepper-rail">
                <div className="seo-stepper-node">{i + 1}</div>
                {i < Math.min(notesData.length, 5) - 1 && <div className="seo-stepper-line" />}
              </div>
              <div className="seo-stepper-body">
                <h2>{section.title}</h2>
                <ul>
                  {(section.points || []).slice(0, 3).map((point, j) => (
                    <li key={j} dangerouslySetInnerHTML={{ __html: point }} />
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link href="/?section=market-failure" className="seo-section-link" style={{ display: 'block', marginBottom: '24px' }}>
        View all notes interactively in the app &rarr;
      </Link>

      {practiceData.length > 0 && (
        <div className="seo-faq-section">
          <h2>Exam-Style Practice Questions</h2>
          {practiceData.map((q, i) => (
            <details key={i} className="seo-faq-item">
              <summary>{q.question || q.title}</summary>
              <div className="seo-faq-answer">
                <p>{q.guidance || q.answer || q.modelAnswer}</p>
              </div>
            </details>
          ))}
        </div>
      )}

      <div className="seo-related-links">
        <h2>Related Topics</h2>
        <div className="seo-links-grid">
          <Link href="/?section=government-intervention">Government Intervention</Link>
          <Link href="/?section=price-determination">Price Determination</Link>
          <Link href="/economics/unit-1">All Unit 1 Topics</Link>
          <Link href="/glossary">Economics Glossary</Link>
        </div>
      </div>

      <RelatedModelAnswers
        href="/economics/market-failure-model-answers"
        sectionTitle="Market Failure"
        count={1}
      />

      <div className="seo-cta">
        <h2>Master Market Failure Interactively</h2>
        <p>Use flashcards, quizzes and the AI tutor to nail this topic.</p>
        <Link href="/?section=market-failure" className="seo-cta-button">Start Revising &rarr;</Link>
      </div>
    </div>
  );
}
