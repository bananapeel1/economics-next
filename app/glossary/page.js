import { createAnonClient } from '@/lib/supabase-anon';
import GlossaryPage from '@/components/GlossaryPage';
import Link from 'next/link';
import LandingScrollBar from '@/components/LandingScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Edexcel IAL Economics & Business Key Terms Glossary | Revvy Learn',
  description: 'A\u2013Z glossary of key terms and definitions for Edexcel International A-Level Economics and Business. Every definition aligned to the IAL specification \u2014 perfect for quick revision and exam reference.',
  openGraph: {
    title: 'Edexcel IAL Economics & Business Key Terms Glossary | Revvy Learn',
    description: 'A\u2013Z key terms and definitions for Edexcel IAL Economics and Business, aligned to the IAL specification.',
    url: 'https://revvylearn.com/glossary',
  },
};

export default async function GlossaryRoute() {
  const supabase = createAnonClient();

  const [{ data: terms }, { data: subjects }] = await Promise.all([
    supabase.from('glossary_terms').select('*').order('term'),
    supabase.from('subjects').select('id, name, slug').order('name'),
  ]);

  return (
    <div className="elp-page">
      <LandingScrollBar />

      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo">
          <span className="elp-nav-dot" />
          Revvy Learn
        </Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb">
          Glossary <span>/ Key Terms</span>
        </div>
      </nav>

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Key Terms</div>
            <h1 className="elp-hero-title">
              Economics &amp; Business<br /><em>Glossary</em>
            </h1>
            <p className="elp-hero-desc">
              A&ndash;Z glossary of key terms and definitions for Edexcel International A-Level Economics and Business. Every definition aligned to the IAL specification &mdash; perfect for quick revision and exam reference.
            </p>
            <div className="elp-hero-proof">
              <div className="elp-proof-item"><strong>{(terms || []).length}</strong> key terms</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">A&ndash;Z navigation</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">Filter by subject</div>
            </div>
          </div>
        </div>
      </section>

      <div className="elp-section">
        <GlossaryPage terms={terms || []} subjects={subjects || []} />
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
          <Link href="/economics" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128200;</span> Economics Notes
          </Link>
          <Link href="/business" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#127970;</span> Business Notes
          </Link>
          <Link href="/past-papers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128196;</span> Past Papers
          </Link>
        </div>
      </div>

      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Ready to start revising?</h2>
          <p className="elp-cta-sub">Free notes for every spec point. Test your knowledge with flashcards and quizzes.</p>
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
