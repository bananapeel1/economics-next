import Link from 'next/link';
import IALScrollBar from '../IALScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Edexcel IAL Exam Series — January & June Exam Dates & Revision | Revvy Learn',
  description: 'Everything you need to know about Edexcel IAL exam series. January and June exam dates, R papers for different time zones, unit structure and revision planning for International A-Level Economics and Business.',
  alternates: { canonical: 'https://revvylearn.com/ial-revision/exam-series' },
  openGraph: {
    title: 'Edexcel IAL Exam Series — January & June Dates | Revvy Learn',
    description: 'IAL exam dates, R papers and revision planning for Edexcel International A-Level Economics and Business.',
    url: 'https://revvylearn.com/ial-revision/exam-series',
  },
};

export default function ExamSeriesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "When are the Edexcel IAL exam dates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Edexcel IAL exams run in two series each year: January (typically mid-January) and June (typically late May to mid-June). Exact timetables are published by Pearson Edexcel each year. Students can sit any combination of units in either session."
        }
      },
      {
        "@type": "Question",
        "name": "What are R papers in IAL exams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "R papers (Reserve papers) are alternative versions of IAL exam papers used in different time zones. They ensure exam integrity by preventing paper leaks when students in earlier time zones finish before those in later zones begin. The content and difficulty are equivalent to the standard paper."
        }
      },
      {
        "@type": "Question",
        "name": "Can I sit IAL units in different exam series?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. IAL is modular, so you can sit individual units across multiple sessions. For example, you could sit Units 1 and 2 in January and Units 3 and 4 in June. You can also retake individual units to improve your grade without retaking the entire qualification."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between January and June IAL exams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The January and June exam series cover the same units with papers of equal difficulty. The main difference is timing — January exams are typically in mid-January and results arrive in March, while June exams run from late May to mid-June with results in August. Most students use January for AS units and June for A2 units."
        }
      }
    ]
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://revvylearn.com" },
      { "@type": "ListItem", "position": 2, "name": "IAL Revision", "item": "https://revvylearn.com/ial-revision" },
      { "@type": "ListItem", "position": 3, "name": "Exam Series", "item": "https://revvylearn.com/ial-revision/exam-series" }
    ]
  };

  return (
    <div className="elp-page">
      <IALScrollBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo"><span className="elp-nav-dot" />Revvy Learn</Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb"><Link href="/ial-revision" style={{ color: 'inherit', textDecoration: 'none' }}>IAL Revision</Link> <span>/ Exam Series</span></div>
      </nav>

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Edexcel IAL Exam Sessions</div>
            <h1 className="elp-hero-title">January &amp; June<br /><em>exam series</em></h1>
            <p className="elp-hero-desc">
              Edexcel IAL offers two exam windows per year, giving international students the flexibility to spread their units across multiple sessions. Here is everything you need to know about the January and June exam series for IAL Economics and Business.
            </p>
          </div>
        </div>
      </section>

      <div className="elp-section">
        <div className="elp-units-header elp-fade-up">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />How it works</div>
          <h2 className="elp-s-title">The modular advantage</h2>
          <p className="elp-s-sub" style={{ maxWidth: '720px' }}>
            Unlike the UK domestic A-Level where all exams are sat in June, IAL is modular. You choose which units to sit in each session. This means you can take Units 1 and 2 (AS) in January and Units 3 and 4 (A2) in June &mdash; or complete everything in one session.
          </p>
        </div>

        <div className="elp-wyg-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="elp-wyg-card elp-fade-up">
            <div className="elp-wyg-title">January exam series</div>
            <div className="elp-wyg-desc">Typically mid-January. Results released in March. Popular for sitting AS units (Units 1 &amp; 2) early, giving students more time to focus on A2 content for June. Also used for retakes.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.07s' }}>
            <div className="elp-wyg-title">June exam series</div>
            <div className="elp-wyg-desc">Late May to mid-June. Results released in August. The main exam session &mdash; most students sit their A2 units (Units 3 &amp; 4) here, and many complete all units in this session.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.14s' }}>
            <div className="elp-wyg-title">R papers (time zone variants)</div>
            <div className="elp-wyg-desc">IAL uses R papers (Reserve papers) as alternative versions for different time zones. Students in East Asia may sit the R paper while those in the Middle East sit the standard paper. Content and difficulty are equivalent.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.21s' }}>
            <div className="elp-wyg-title">Retake flexibility</div>
            <div className="elp-wyg-desc">You can retake individual units without retaking the entire qualification. Your best result counts towards your final grade. This makes IAL ideal for students aiming for A* grades.</div>
          </div>
        </div>
      </div>

      <div className="elp-section">
        <div className="elp-units-header elp-fade-up">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-blue)' }} />Upcoming sessions</div>
          <h2 className="elp-s-title">Start revising for your next exam</h2>
        </div>
        <div className="elp-wyg-grid" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Link href="/ial-revision/june-2026" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none' }}>
            <div className="elp-wyg-title">June 2026 &rarr;</div>
            <div className="elp-wyg-desc">Revision guide and preparation for the June 2026 IAL exam session.</div>
          </Link>
          <Link href="/ial-revision/january-2027" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.07s' }}>
            <div className="elp-wyg-title">January 2027 &rarr;</div>
            <div className="elp-wyg-desc">Get ahead with early preparation for the January 2027 session.</div>
          </Link>
        </div>
      </div>

      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Ready to start revising?</h2>
          <p className="elp-cta-sub">Free notes for every IAL spec point. Choose your subject and start today.</p>
          <div className="elp-cta-actions">
            <Link href="/economics" className="elp-btn-primary" style={{ fontSize: '15px', padding: '14px 30px' }}>Economics &rarr;</Link>
            <Link href="/business" className="elp-btn-secondary">Business &rarr;</Link>
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
