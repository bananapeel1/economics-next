import ModelAnswersPage from '@/components/ModelAnswersPage';
import { MODEL_ANSWERS, MODEL_ANSWERS_FAQ, MODEL_ANSWERS_SECTIONS } from '@/data/modelAnswersData';
import Link from 'next/link';
import LandingScrollBar from '@/components/LandingScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Edexcel IAL Economics & Business Model Answers | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Economics and Business exam questions. Full mark 4, 8 and 20-mark responses with mark scheme breakdowns, examiner tips and evaluation frameworks.',
  alternates: {
    canonical: '/model-answers',
  },
  openGraph: {
    title: 'Edexcel IAL Economics & Business Model Answers | Revvy Learn',
    description: 'Free annotated model answers for Edexcel IAL Economics and Business. 4, 8 and 20-mark exam questions with mark scheme commentary.',
    url: 'https://revvylearn.com/model-answers',
  },
};

export default function ModelAnswersRoute() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: MODEL_ANSWERS_FAQ.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <div className="elp-page">
      <LandingScrollBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo">
          <span className="elp-nav-dot" />
          Revvy Learn
        </Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb">
          Model Answers <span>/ Exam Practice</span>
        </div>
      </nav>

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Exam Practice</div>
            <h1 className="elp-hero-title">
              Model<br /><em>Answers</em>
            </h1>
            <p className="elp-hero-desc">
              Annotated model answers for Edexcel International A-Level Economics and Business &mdash; 4, 8, and 20-mark questions with mark scheme breakdowns, PEEL structure, and examiner commentary.
            </p>
            <div className="elp-hero-proof">
              <div className="elp-proof-item"><strong>{MODEL_ANSWERS.length}</strong> model answers</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">Mark scheme breakdowns</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">Examiner commentary</div>
            </div>
          </div>
        </div>
      </section>

      <div className="elp-section">
        <ModelAnswersPage answers={MODEL_ANSWERS} sectionsMeta={MODEL_ANSWERS_SECTIONS} />
      </div>

      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow">
          <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-teal)' }} />
          Also useful
        </div>
        <h2 className="elp-s-title" style={{ fontSize: '22px', marginBottom: '8px' }}>Related resources</h2>
        <div className="elp-resources-row">
          <Link href="/command-words" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128292;</span> Command Words
          </Link>
          <Link href="/past-papers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128196;</span> Past Papers
          </Link>
          <Link href="/guides" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128218;</span> Revision Guides
          </Link>
          <Link href="/economics" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128200;</span> Economics Notes
          </Link>
        </div>
      </div>

      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Ready to start revising?</h2>
          <p className="elp-cta-sub">Free notes for every spec point. Practice with flashcards, quizzes and AI tutor.</p>
          <div className="elp-cta-actions">
            <Link href="/" className="elp-btn-primary" style={{ fontSize: '15px', padding: '14px 30px' }}>Open Revvy Learn &rarr;</Link>
          </div>
        </div>
      </div>

      <footer className="elp-footer">
        <div className="elp-footer-inner">
          <Link href="/" className="elp-footer-logo"><span className="elp-nav-dot" style={{ width: '7px', height: '7px' }} />Revvy Learn</Link>
          <div className="elp-footer-sep" />
          <div className="elp-footer-links">
            <Link href="/economics" className="elp-footer-link">Economics</Link>
            <Link href="/business" className="elp-footer-link">Business</Link>
            <Link href="/glossary" className="elp-footer-link">Glossary</Link>
            <Link href="/past-papers" className="elp-footer-link">Past Papers</Link>
          </div>
          <div className="elp-footer-right">Edexcel IAL revision &copy; Revvy Learn</div>
        </div>
      </footer>
    </div>
  );
}
