import { createAnonClient } from '@/lib/supabase-anon';
import CommandWordsPage from '@/components/CommandWordsPage';
import Link from 'next/link';
import { BookAlt, Document, PenIcon } from '@/components/Icons';
import SiteHeader from '@/components/SiteHeader';
import LandingScrollBar from '@/components/LandingScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Edexcel IAL Command Words: Define, Explain, Analyse, Evaluate — Exam Guide',
  description: 'Understand what Edexcel IAL command words mean and what examiners expect from each one, with a sample question for every word covered. Define, Explain, Analyse, Assess and Evaluate, for Economics and Business.',
  alternates: { canonical: 'https://revvylearn.com/command-words' },
  openGraph: {
    title: 'Edexcel IAL Command Words — Exam Guide | Revvy Learn',
    description: 'Edexcel IAL command words explained, with what examiners expect and a sample question for each. Define, Explain, Analyse, Assess, Evaluate.',
    url: 'https://revvylearn.com/command-words',
  },
};

export default async function CommandWordsRoute() {
  const supabase = createAnonClient();
  const { data: words } = await supabase
    .from('command_words')
    .select('*')
    .order('sort_order')
    .order('word');

  const faqSchema = (words || []).length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (words || []).map(w => ({
      "@type": "Question",
      "name": `What does "${w.word}" mean in Edexcel IAL exams?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": w.definition || w.description || `${w.word} is a command word used in Edexcel IAL Economics and Business exams.`
      }
    }))
  } : null;

  return (
    <div className="elp-page">
      <LandingScrollBar />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <SiteHeader crumb="Command Words / Exam Guide" />

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Exam Technique</div>
            <h1 className="elp-hero-title">
              Edexcel IAL<br /><em>Command Words</em>
            </h1>
            <p className="elp-hero-desc">
              Understanding command words is essential for exam success. Each word tells you exactly what the examiner expects in your answer &mdash; from simple definitions to full evaluative essays.
            </p>
            <div className="elp-hero-proof">
              <div className="elp-proof-item"><strong>{(words || []).length}</strong> command words</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">Example answers included</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">Examiner expectations</div>
            </div>
          </div>
        </div>
      </section>

      <div className="elp-section">
        <CommandWordsPage words={words || []} />
      </div>

      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow">
          <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-teal)' }} />
          Also useful
        </div>
        <h2 className="elp-s-title" style={{ fontSize: '22px', marginBottom: '8px' }}>Related resources</h2>
        <div className="elp-resources-row">
          <Link href="/model-answers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><PenIcon size={18} /></span> Model Answers
          </Link>
          <Link href="/past-papers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><Document size={18} /></span> Past Papers
          </Link>
          <Link href="/guides" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><BookAlt size={18} /></span> Revision Guides
          </Link>
          <Link href="/glossary" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><BookAlt size={18} /></span> Glossary
          </Link>
        </div>
      </div>

      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Ready to start revising?</h2>
          <p className="elp-cta-sub">Free notes across all four units. Practice with exam-style questions and model answers.</p>
          <div className="elp-cta-actions">
            <Link href="/?section=introductory-concepts" className="elp-btn-primary" style={{ fontSize: '15px', padding: '14px 30px' }}>Open Revvy Learn &rarr;</Link>
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
