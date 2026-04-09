import Link from 'next/link';
import guidesData from '@/data/guidesData';
import LandingScrollBar from '@/components/LandingScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Edexcel IAL Revision Guides — Economics & Business | Revvy Learn',
  description: 'Free in-depth revision guides for Edexcel IAL Economics and Business. Comprehensive study guides covering market failure, macroeconomic objectives, globalisation and more.',
  alternates: { canonical: 'https://revvylearn.com/guides' },
  openGraph: {
    title: 'Edexcel IAL Revision Guides — Economics & Business | Revvy Learn',
    description: 'Free in-depth revision guides for Edexcel IAL Economics and Business.',
    url: 'https://revvylearn.com/guides',
  },
};

export default function GuidesIndexPage() {
  const economicsGuides = guidesData.filter(g => g.subject === 'economics');
  const businessGuides = guidesData.filter(g => g.subject === 'business');

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
          Guides <span>/ Revision Guides</span>
        </div>
      </nav>

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Edexcel IAL</div>
            <h1 className="elp-hero-title">
              Revision<br /><em>Guides</em>
            </h1>
            <p className="elp-hero-desc">
              In-depth guides for key Edexcel IAL Economics and Business topics. Each guide covers everything you need to know for your exams &mdash; with diagrams, exam tips, and evaluation frameworks.
            </p>
            <div className="elp-hero-proof">
              <div className="elp-proof-item"><strong>{economicsGuides.length}</strong> Economics guides</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item"><strong>{businessGuides.length}</strong> Business guides</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">100% free</div>
            </div>
          </div>
        </div>
      </section>

      {economicsGuides.length > 0 && (
        <div className="elp-section">
          <div className="elp-units-header elp-fade-up">
            <div className="elp-s-eyebrow">
              <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />
              Economics
            </div>
            <h2 className="elp-s-title">Economics Guides</h2>
          </div>
          <div className="elp-wyg-grid" style={{ maxWidth: '900px' }}>
            {economicsGuides.map((guide, i) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: `${i * 0.07}s` }}>
                <div className="elp-wyg-title">{guide.title}</div>
                <div className="elp-wyg-desc">{guide.metaDescription.slice(0, 140)}...</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {businessGuides.length > 0 && (
        <div className="elp-section">
          <div className="elp-units-header elp-fade-up">
            <div className="elp-s-eyebrow">
              <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-blue)' }} />
              Business
            </div>
            <h2 className="elp-s-title">Business Guides</h2>
          </div>
          <div className="elp-wyg-grid" style={{ maxWidth: '900px' }}>
            {businessGuides.map((guide, i) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: `${i * 0.07}s` }}>
                <div className="elp-wyg-title">{guide.title}</div>
                <div className="elp-wyg-desc">{guide.metaDescription.slice(0, 140)}...</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow">
          <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-teal)' }} />
          Also useful
        </div>
        <h2 className="elp-s-title" style={{ fontSize: '22px', marginBottom: '8px' }}>Related resources</h2>
        <div className="elp-resources-row">
          <Link href="/economics" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128200;</span> Economics Notes
          </Link>
          <Link href="/business" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#127970;</span> Business Notes
          </Link>
          <Link href="/model-answers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128221;</span> Model Answers
          </Link>
          <Link href="/past-papers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128196;</span> Past Papers
          </Link>
        </div>
      </div>

      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Start revising interactively</h2>
          <p className="elp-cta-sub">Use flashcards, quizzes and the AI tutor alongside these guides.</p>
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
