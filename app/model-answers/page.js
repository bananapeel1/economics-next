import ModelAnswersPage from '@/components/ModelAnswersPage';
import { MODEL_ANSWERS, MODEL_ANSWERS_FAQ, MODEL_ANSWERS_SECTIONS } from '@/data/modelAnswersData';
import Link from 'next/link';
import { BookAlt, ChartHistogram, Document, Glossary } from '@/components/Icons';
import SiteHeader from '@/components/SiteHeader';
import LandingScrollBar from '@/components/LandingScrollBar';
import '@/styles/landing.css';
import '@/styles/hub-links.css';
import { MODEL_ANSWER_PAGES, modelAnswersPath } from '@/data/modelAnswerPages';
import { parseBlocks } from '@/lib/stimulus';

/* Packet 12.8. A short answer or an essay shaped like the paper opens with its own context (a sentence
   or a small table, `paper.context`); a Calculate question is unanswerable without it. The hub lists
   every answer, so it carries each one's context too, parsed here on the server. Items without a
   context are passed through untouched. */
const ANSWERS = MODEL_ANSWERS.map((a) =>
  a.paper && typeof a.paper.context === 'string' && a.paper.context.trim()
    ? { ...a, contextBlocks: parseBlocks(a.paper.context) }
    : a,
);

export const metadata = {
  title: 'Edexcel IAL Economics & Business Model Answers | Revvy Learn',
  description: 'Annotated model answers for Edexcel IAL Economics and Business exam questions. Top-band 4, 8 and 20-mark responses with mark scheme breakdowns, PEEL structure and examiner commentary.',
  alternates: {
    canonical: '/model-answers',
  },
  openGraph: {
    title: 'Edexcel IAL Economics & Business Model Answers | Revvy Learn',
    description: 'Annotated model answers for Edexcel IAL Economics and Business. 4, 8 and 20-mark exam questions with mark scheme commentary.',
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

      <SiteHeader crumb="Model Answers / Exam Practice" />

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
        <ModelAnswersPage answers={ANSWERS} sectionsMeta={MODEL_ANSWERS_SECTIONS} />
      </div>

      <div className="elp-section" id="by-topic">
        <div className="elp-units-header">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />Every topic</div>
          <h2 className="elp-s-title">Model answers by topic</h2>
        </div>
        <div className="ma-index">
          {['economics', 'business'].map((subject) => {
            const pages = MODEL_ANSWER_PAGES.filter((p) => p.subject === subject);
            const units = [...new Set(pages.map((p) => p.unit))].sort();
            return (
              <div key={subject}>
                <h3>{subject === 'economics' ? 'Economics' : 'Business'}</h3>
                {units.map((u) => (
                  <div key={u}>
                    <h4>Unit {u} &middot; {pages.find((p) => p.unit === u).unitCode}</h4>
                    <ul>
                      {pages.filter((p) => p.unit === u).map((p) => (
                        <li key={p.slug}>
                          <Link href={modelAnswersPath(p)}><span className="ma-num">{p.sectionNumber}</span>{p.topic}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow">
          <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-teal)' }} />
          Also useful
        </div>
        <h2 className="elp-s-title" style={{ fontSize: '22px', marginBottom: '8px' }}>Related resources</h2>
        <div className="elp-resources-row">
          <Link href="/command-words" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><Glossary size={18} /></span> Command Words
          </Link>
          <Link href="/past-papers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><Document size={18} /></span> Past Papers
          </Link>
          <Link href="/guides" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><BookAlt size={18} /></span> Revision Guides
          </Link>
          <Link href="/economics" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><ChartHistogram size={18} /></span> Economics Notes
          </Link>
        </div>
      </div>

      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Ready to start revising?</h2>
          <p className="elp-cta-sub">Free notes across all four units. Flashcards, quizzes and the AI tutor unlock with Pro.</p>
          <div className="elp-cta-actions">
            <Link href="/economics/unit-1/introductory-concepts" className="elp-btn-primary" style={{ fontSize: '15px', padding: '14px 30px' }}>Open Revvy Learn &rarr;</Link>
          </div>
        </div>
      </div>


      <footer className="elp-footer">
        <div className="elp-footer-inner">
          <Link href="/" className="elp-footer-logo"><img src="/logo.svg" alt="" className="elp-footer-mark" width={18} height={18} />Revvy Learn</Link>
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
