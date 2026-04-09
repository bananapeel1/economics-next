import Link from 'next/link';
import IALScrollBar from '../IALScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'IAL June 2026 Revision — Edexcel Economics & Business Exam Preparation | Revvy Learn',
  description: 'Revision guide for the Edexcel IAL June 2026 exam series. Free notes, flashcards, past papers and model answers for IAL Economics (WEC11–WEC14) and Business (WBS11–WBS14). Last-minute revision tips and exam preparation.',
  alternates: { canonical: 'https://revvylearn.com/ial-revision/june-2026' },
  openGraph: {
    title: 'IAL June 2026 Revision — Edexcel Economics & Business | Revvy Learn',
    description: 'Free revision for the June 2026 IAL exam series. Economics and Business notes, flashcards and past papers.',
    url: 'https://revvylearn.com/ial-revision/june-2026',
  },
};

export default function June2026Page() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://revvylearn.com" },
      { "@type": "ListItem", "position": 2, "name": "IAL Revision", "item": "https://revvylearn.com/ial-revision" },
      { "@type": "ListItem", "position": 3, "name": "June 2026", "item": "https://revvylearn.com/ial-revision/june-2026" }
    ]
  };

  return (
    <div className="elp-page">
      <IALScrollBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo"><span className="elp-nav-dot" />Revvy Learn</Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb"><Link href="/ial-revision" style={{ color: 'inherit', textDecoration: 'none' }}>IAL Revision</Link> <span>/ June 2026</span></div>
      </nav>

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Edexcel IAL &middot; June 2026 Exam Series</div>
            <h1 className="elp-hero-title">June 2026<br /><em>IAL revision guide</em></h1>
            <p className="elp-hero-desc">
              The June 2026 Edexcel IAL exam series runs from late May to mid-June. Whether you are sitting Economics units (WEC11&ndash;WEC14) or Business units (WBS11&ndash;WBS14), Revvy Learn has free revision resources for every spec point.
            </p>
            <div className="elp-hero-actions">
              <Link href="/economics" className="elp-btn-primary">Economics revision &rarr;</Link>
              <Link href="/business" className="elp-btn-secondary">Business revision &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="elp-section">
        <div className="elp-units-header elp-fade-up">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />Revision plan</div>
          <h2 className="elp-s-title">How to prepare for June 2026</h2>
          <p className="elp-s-sub" style={{ maxWidth: '720px' }}>
            With the June session approaching, here is a structured approach to revision for IAL Economics and Business. Focus on understanding core concepts first, then build exam technique with practice questions and past papers.
          </p>
        </div>

        <div className="elp-wyg-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="elp-wyg-card elp-fade-up">
            <div className="elp-wyg-title">8&ndash;6 weeks before</div>
            <div className="elp-wyg-desc">Work through all topic notes systematically. Use Revvy Learn&apos;s structured notes for each spec point. Focus on understanding, not memorisation. Create flashcards for key definitions and concepts.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.07s' }}>
            <div className="elp-wyg-title">6&ndash;4 weeks before</div>
            <div className="elp-wyg-desc">Start active revision with flashcards and practice questions. Use spaced repetition to lock in definitions and theory. Begin practising diagram drawing under timed conditions.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.14s' }}>
            <div className="elp-wyg-title">4&ndash;2 weeks before</div>
            <div className="elp-wyg-desc">Transition to past paper practice. Work through full papers under timed conditions. Review mark schemes and model answers. Identify weak topics and revisit those notes.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.21s' }}>
            <div className="elp-wyg-title">Final 2 weeks</div>
            <div className="elp-wyg-desc">Focus on exam technique: essay structure, evaluation frameworks, and command word responses. Review common mistakes. Use the AI tutor to test your understanding of tricky topics.</div>
          </div>
        </div>
      </div>

      <div className="elp-section">
        <div className="elp-units-header elp-fade-up">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-blue)' }} />Units</div>
          <h2 className="elp-s-title">Economics &amp; Business units for June 2026</h2>
        </div>
        <div className="elp-wyg-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/economics/unit-1" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none' }}>
            <div className="elp-wyg-title">WEC11 &mdash; Markets in Action</div>
            <div className="elp-wyg-desc">Supply, demand, elasticity, market failure, government intervention</div>
          </Link>
          <Link href="/economics/unit-2" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.07s' }}>
            <div className="elp-wyg-title">WEC12 &mdash; Macroeconomic Performance</div>
            <div className="elp-wyg-desc">AD/AS, national income, growth, policy tools</div>
          </Link>
          <Link href="/economics/unit-3" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.14s' }}>
            <div className="elp-wyg-title">WEC13 &mdash; Business Behaviour</div>
            <div className="elp-wyg-desc">Theory of the firm, market structures, labour markets</div>
          </Link>
          <Link href="/economics/unit-4" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.21s' }}>
            <div className="elp-wyg-title">WEC14 &mdash; Global Economy</div>
            <div className="elp-wyg-desc">Globalisation, trade, development, poverty</div>
          </Link>
          <Link href="/business/unit-1" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.28s' }}>
            <div className="elp-wyg-title">WBS11 &mdash; Marketing and People</div>
            <div className="elp-wyg-desc">Customer needs, marketing mix, managing people</div>
          </Link>
          <Link href="/business/unit-2" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.35s' }}>
            <div className="elp-wyg-title">WBS12 &mdash; Managing Business Activities</div>
            <div className="elp-wyg-desc">Finance, resource management, external influences</div>
          </Link>
        </div>
      </div>

      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-teal)' }} />Resources</div>
        <h2 className="elp-s-title" style={{ fontSize: '22px', marginBottom: '8px' }}>Revision tools</h2>
        <div className="elp-resources-row">
          <Link href="/past-papers" className="elp-resource-chip"><span className="elp-resource-chip-icon">&#128196;</span> Past Papers</Link>
          <Link href="/model-answers" className="elp-resource-chip"><span className="elp-resource-chip-icon">&#128221;</span> Model Answers</Link>
          <Link href="/command-words" className="elp-resource-chip"><span className="elp-resource-chip-icon">&#128292;</span> Command Words</Link>
          <Link href="/guides" className="elp-resource-chip"><span className="elp-resource-chip-icon">&#128218;</span> Revision Guides</Link>
        </div>
      </div>

      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Start your June 2026 revision now</h2>
          <p className="elp-cta-sub">Free notes for every spec point. The earlier you start, the better your results.</p>
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
            <Link href="/ial-revision" className="elp-footer-link">IAL Revision</Link>
            <Link href="/past-papers" className="elp-footer-link">Past Papers</Link>
          </div>
          <div className="elp-footer-right">Edexcel IAL revision &copy; Revvy Learn</div>
        </div>
      </footer>
    </div>
  );
}
