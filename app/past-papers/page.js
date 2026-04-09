import { createAnonClient } from '@/lib/supabase-anon';
import PastPapersPage from '@/components/PastPapersPage';
import Link from 'next/link';
import LandingScrollBar from '@/components/LandingScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Edexcel IAL Past Papers & Mark Schemes 2024–2016 — Free PDF Download',
  description: 'Download free Edexcel IAL Economics and Business past papers with mark schemes and worked answers. All units covered: WEC11, WEC12, WEC13, WEC14, WBS11, WBS12. Instant access — no sign-up required.',
  alternates: { canonical: 'https://revvylearn.com/past-papers' },
  openGraph: {
    title: 'Edexcel IAL Past Papers & Mark Schemes — Free PDF Download',
    description: 'Free Edexcel IAL Economics and Business past papers with mark schemes 2024–2016. All units, instant access, no sign-up.',
    url: 'https://revvylearn.com/past-papers',
  },
};

export default async function PastPapersRoute() {
  const supabase = createAnonClient();

  const [{ data: papers }, { data: subjects }, { data: units }] = await Promise.all([
    supabase.from('past_papers').select('*').order('year', { ascending: false }).order('session').order('paper_number'),
    supabase.from('subjects').select('id, name, slug').order('name'),
    supabase.from('units').select('id, number, subject_id').order('number'),
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
          Past Papers <span>/ Mark Schemes</span>
        </div>
      </nav>

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Exam Resources</div>
            <h1 className="elp-hero-title">
              IAL Past Papers<br />&amp; <em>Mark Schemes</em>
            </h1>
            <p className="elp-hero-desc">
              Download previous exam papers and mark schemes for Edexcel International A-Level Economics and Business. All units covered &mdash; instant access, no sign-up required.
            </p>
            <div className="elp-hero-proof">
              <div className="elp-proof-item"><strong>2016&ndash;2024</strong> papers</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">All units covered</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">Free PDF download</div>
            </div>
          </div>
        </div>
      </section>

      <div className="elp-section">
        <PastPapersPage papers={papers || []} subjects={subjects || []} units={units || []} />
      </div>

      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow">
          <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-teal)' }} />
          Also useful
        </div>
        <h2 className="elp-s-title" style={{ fontSize: '22px', marginBottom: '8px' }}>Related resources</h2>
        <div className="elp-resources-row">
          <Link href="/model-answers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128221;</span> Model Answers
          </Link>
          <Link href="/command-words" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128292;</span> Command Words
          </Link>
          <Link href="/economics" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128200;</span> Economics Notes
          </Link>
          <Link href="/business" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#127970;</span> Business Notes
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
