import Link from 'next/link';
import IALScrollBar from '../IALScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'IAL January 2027 Revision — Edexcel Economics & Business Exam Preparation | Revvy Learn',
  description: 'Revision guide for the Edexcel IAL January 2027 exam series. Free notes, flashcards, past papers and model answers for IAL Economics (WEC11–WEC14) and Business (WBS11–WBS14). Start your revision early.',
  alternates: { canonical: 'https://revvylearn.com/ial-revision/january-2027' },
  openGraph: {
    title: 'IAL January 2027 Revision — Edexcel Economics & Business | Revvy Learn',
    description: 'Free revision for the January 2027 IAL exam series. Economics and Business notes, flashcards and past papers.',
    url: 'https://revvylearn.com/ial-revision/january-2027',
  },
};

export default function January2027Page() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://revvylearn.com" },
      { "@type": "ListItem", "position": 2, "name": "IAL Revision", "item": "https://revvylearn.com/ial-revision" },
      { "@type": "ListItem", "position": 3, "name": "January 2027", "item": "https://revvylearn.com/ial-revision/january-2027" }
    ]
  };

  return (
    <div className="elp-page">
      <IALScrollBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo"><span className="elp-nav-dot" />Revvy Learn</Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb"><Link href="/ial-revision" style={{ color: 'inherit', textDecoration: 'none' }}>IAL Revision</Link> <span>/ January 2027</span></div>
      </nav>

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Edexcel IAL &middot; January 2027 Exam Series</div>
            <h1 className="elp-hero-title">January 2027<br /><em>IAL revision guide</em></h1>
            <p className="elp-hero-desc">
              The January 2027 Edexcel IAL exam series takes place in mid-January. This session is popular for sitting AS units (Units 1 &amp; 2) or retaking units to improve your grade. Start your revision early with Revvy Learn&apos;s free resources.
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
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />Planning ahead</div>
          <h2 className="elp-s-title">Why sit January exams?</h2>
          <p className="elp-s-sub" style={{ maxWidth: '720px' }}>
            The January exam series is a strategic choice for IAL students. By sitting your AS units early, you reduce the number of exams in the June session and can focus entirely on A2 content. It also gives you a chance to retake any units where you want to improve your grade.
          </p>
        </div>

        <div className="elp-wyg-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="elp-wyg-card elp-fade-up">
            <div className="elp-wyg-title">Spread the load</div>
            <div className="elp-wyg-desc">Sit Units 1 and 2 in January so you only need to focus on Units 3 and 4 in June. This gives you more revision time per unit and reduces exam-period stress.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.07s' }}>
            <div className="elp-wyg-title">Retake opportunity</div>
            <div className="elp-wyg-desc">If you sat units in June 2026 and want to improve, January 2027 is your chance. Your best result counts, so there is no risk in retaking. Focus your revision on the specific topics you found hardest.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.14s' }}>
            <div className="elp-wyg-title">Early results</div>
            <div className="elp-wyg-desc">January results arrive in March, giving you early feedback on your performance. This helps you gauge your A2 readiness and adjust your revision strategy for the June session.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.21s' }}>
            <div className="elp-wyg-title">Start revising now</div>
            <div className="elp-wyg-desc">The best time to start January revision is immediately after the June exams. Use the summer to work through topic notes, then intensify with practice papers from October onwards.</div>
          </div>
        </div>
      </div>

      <div className="elp-section">
        <div className="elp-units-header elp-fade-up">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-blue)' }} />Popular January units</div>
          <h2 className="elp-s-title">AS units commonly sat in January</h2>
        </div>
        <div className="elp-wyg-grid" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Link href="/economics/unit-1" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none' }}>
            <div className="elp-wyg-title">WEC11 &mdash; Markets in Action</div>
            <div className="elp-wyg-desc">Microeconomics fundamentals: supply, demand, elasticity, market failure</div>
          </Link>
          <Link href="/economics/unit-2" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.07s' }}>
            <div className="elp-wyg-title">WEC12 &mdash; Macroeconomic Performance</div>
            <div className="elp-wyg-desc">AD/AS, national income, economic growth, macroeconomic policy</div>
          </Link>
          <Link href="/business/unit-1" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.14s' }}>
            <div className="elp-wyg-title">WBS11 &mdash; Marketing and People</div>
            <div className="elp-wyg-desc">Customer needs, marketing mix, managing people, entrepreneurs</div>
          </Link>
          <Link href="/business/unit-2" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.21s' }}>
            <div className="elp-wyg-title">WBS12 &mdash; Managing Business Activities</div>
            <div className="elp-wyg-desc">Finance, resource management, external influences</div>
          </Link>
        </div>
      </div>

      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Get ahead for January 2027</h2>
          <p className="elp-cta-sub">Free notes for every spec point. Start early, revise smart.</p>
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
