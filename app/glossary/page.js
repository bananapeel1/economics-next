import { createAnonClient } from '@/lib/supabase-anon';
import GlossaryPage from '@/components/GlossaryPage';
import Link from 'next/link';
import { ChartHistogram, Document, DrawerAlt, Glossary } from '@/components/Icons';
import SiteHeader from '@/components/SiteHeader';
import LandingScrollBar from '@/components/LandingScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'A–Z Economics & Business Key Terms — Edexcel IAL Glossary',
  description: 'A\u2013Z glossary of key terms and definitions for Edexcel International A-Level Economics and Business. Search by term or filter by subject \u2014 perfect for quick revision and exam reference.',
  openGraph: {
    title: 'A–Z Economics & Business Key Terms — Edexcel IAL Glossary',
    description: 'A\u2013Z key terms and definitions for Edexcel IAL Economics and Business. Search by term or filter by subject.',
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

      <SiteHeader crumb="Glossary / Key Terms" />

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Key Terms</div>
            <h1 className="elp-hero-title">
              Economics &amp; Business<br /><em>Glossary</em>
            </h1>
            <p className="elp-hero-desc">
              A&ndash;Z glossary of key terms and definitions for Edexcel International A-Level Economics and Business. Search by term or filter by subject &mdash; perfect for quick revision and exam reference.
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
            <span className="elp-resource-chip-icon"><Glossary size={18} /></span> Command Words
          </Link>
          <Link href="/economics" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><ChartHistogram size={18} /></span> Economics Notes
          </Link>
          <Link href="/business" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><DrawerAlt size={18} /></span> Business Notes
          </Link>
          <Link href="/past-papers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><Document size={18} /></span> Past Papers
          </Link>
        </div>
      </div>

      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Ready to start revising?</h2>
          <p className="elp-cta-sub">Free notes across all four units. Test your knowledge with flashcards and quizzes.</p>
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
