import Link from 'next/link';
import IALScrollBar from './IALScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Edexcel IAL Revision — Free International A-Level Economics & Business Notes | Revvy Learn',
  description: 'Free revision for Edexcel International A-Level (IAL) Economics and Business. Notes, flashcards, quizzes, past papers and AI tutor for all units — built for IAL students worldwide. January and June exam series covered.',
  alternates: { canonical: 'https://revvylearn.com/ial-revision' },
  openGraph: {
    title: 'Edexcel IAL Revision — Free International A-Level Notes | Revvy Learn',
    description: 'Free revision for Edexcel IAL Economics and Business. Built for international students in Hong Kong, South Korea, Malaysia, Singapore and beyond.',
    url: 'https://revvylearn.com/ial-revision',
    type: 'website',
  },
};

export default function IALRevisionPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Edexcel IAL?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Edexcel IAL (International A-Level) is a modular qualification offered by Pearson Edexcel, designed specifically for students outside the UK. It is available in subjects including Economics and Business and is recognised by universities worldwide. Unlike the UK domestic A-Level, IAL exams can be sat in both January and June exam series."
        }
      },
      {
        "@type": "Question",
        "name": "Is IAL the same as A-Level?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IAL and the UK domestic A-Level cover similar content but differ in structure. IAL is modular — you sit individual unit exams across multiple sessions (January and June). The UK A-Level is linear — all exams are sat in June of the final year. IAL also offers R papers (alternative papers for different time zones) to prevent paper leaks across regions."
        }
      },
      {
        "@type": "Question",
        "name": "Which countries offer Edexcel IAL?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Edexcel IAL is offered at international schools and exam centres in over 80 countries. Major markets include South Korea, Hong Kong, Malaysia, Singapore, Pakistan, Sri Lanka, the UAE and other Middle Eastern countries. It is particularly popular in East and Southeast Asia where English-medium international schools follow the Edexcel specification."
        }
      },
      {
        "@type": "Question",
        "name": "When are the IAL exam dates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Edexcel IAL exams run in two series each year: January (typically mid-January) and June (typically May–June). This modular structure allows students to spread their units across multiple sittings, retake individual units to improve grades, or complete the full qualification in a single session."
        }
      }
    ]
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://revvylearn.com" },
      { "@type": "ListItem", "position": 2, "name": "IAL Revision", "item": "https://revvylearn.com/ial-revision" }
    ]
  };

  return (
    <div className="elp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <IALScrollBar />

      {/* Header */}
      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo">
          <span className="elp-nav-dot" />
          Revvy Learn
        </Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb">
          IAL Revision <span>/ International A-Level</span>
        </div>
      </nav>

      {/* Hero */}
      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Edexcel International A-Level</div>
            <h1 className="elp-hero-title">
              IAL revision built for<br /><em>international students</em>
            </h1>
            <p className="elp-hero-desc">
              Free revision notes, flashcards, quizzes, past papers and AI tutor for Edexcel IAL Economics and Business &mdash; built specifically for the International A-Level specification used at schools in Hong Kong, South Korea, Malaysia, Singapore, Pakistan, Sri Lanka and across the Middle East.
            </p>
            <div className="elp-hero-actions">
              <Link href="/economics" className="elp-btn-primary">
                Economics revision &rarr;
              </Link>
              <Link href="/business" className="elp-btn-secondary">Business revision &rarr;</Link>
            </div>
            <div className="elp-hero-proof">
              <div className="elp-proof-item"><strong>8 units</strong> fully covered</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item"><strong>Jan &amp; June</strong> exam series</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">100% free notes</div>
            </div>
          </div>
        </div>
      </section>

      {/* What is IAL */}
      <div className="elp-section">
        <div className="elp-units-header elp-fade-up">
          <div className="elp-s-eyebrow">
            <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />
            Understanding IAL
          </div>
          <h2 className="elp-s-title">What is Edexcel IAL?</h2>
          <p className="elp-s-sub" style={{ maxWidth: '720px' }}>
            The Edexcel International A-Level (IAL) is a modular qualification designed for students studying outside the UK. It is offered by Pearson Edexcel and recognised by universities worldwide &mdash; including Russell Group universities in the UK, Ivy League in the US, and top institutions across Asia and Europe.
          </p>
        </div>

        <div className="elp-wyg-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="elp-wyg-card elp-fade-up">
            <div className="elp-wyg-title">Modular exam structure</div>
            <div className="elp-wyg-desc">Sit individual units in January or June. Retake units to improve your grade. Spread exams across multiple sessions to reduce pressure.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.07s' }}>
            <div className="elp-wyg-title">R papers for time zones</div>
            <div className="elp-wyg-desc">IAL offers alternative R papers for students in different time zones, preventing paper leaks across regions and ensuring exam integrity globally.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.14s' }}>
            <div className="elp-wyg-title">Same rigour as UK A-Level</div>
            <div className="elp-wyg-desc">IAL covers the same depth of content as the UK domestic A-Level. UCAS tariff points are identical, so universities treat IAL and A-Level grades equally.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.21s' }}>
            <div className="elp-wyg-title">Available in 80+ countries</div>
            <div className="elp-wyg-desc">Major markets include South Korea, Hong Kong, Malaysia, Singapore, Pakistan, Sri Lanka, UAE and Saudi Arabia. Over 2,500 international schools offer the Edexcel IAL.</div>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div className="elp-section">
        <div className="elp-units-header elp-fade-up">
          <div className="elp-s-eyebrow">
            <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-blue)' }} />
            Subjects
          </div>
          <h2 className="elp-s-title">Choose your subject</h2>
        </div>

        <div className="elp-wyg-grid" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Link href="/economics" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none' }}>
            <div className="elp-wyg-title">IAL Economics</div>
            <div className="elp-wyg-desc">4 units &middot; 24 spec points &middot; WEC11&ndash;WEC14</div>
            <div className="elp-wyg-desc">Microeconomics, macroeconomics, business behaviour and the global economy. Free notes, flashcards, quizzes and model answers for every topic.</div>
          </Link>
          <Link href="/business" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.07s' }}>
            <div className="elp-wyg-title">IAL Business</div>
            <div className="elp-wyg-desc">4 units &middot; 20 spec points &middot; WBS11&ndash;WBS14</div>
            <div className="elp-wyg-desc">Marketing, people, finance, strategy and global business. Free notes, flashcards, 20-mark essay guides and past paper practice.</div>
          </Link>
        </div>
      </div>

      {/* Exam series */}
      <div className="elp-section">
        <div className="elp-units-header elp-fade-up">
          <div className="elp-s-eyebrow">
            <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-amber)' }} />
            Exam sessions
          </div>
          <h2 className="elp-s-title">January &amp; June exam series</h2>
          <p className="elp-s-sub" style={{ maxWidth: '720px' }}>
            Unlike the UK domestic A-Level, Edexcel IAL offers two exam windows per year. This is a major advantage for international students &mdash; you can sit Units 1 and 2 in January and Units 3 and 4 in June, or take all units in a single session.
          </p>
        </div>

        <div className="elp-wyg-grid" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Link href="/ial-revision/june-2026" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none' }}>
            <div className="elp-wyg-title">June 2026 Exam Series</div>
            <div className="elp-wyg-desc">Revision resources and preparation guide for the upcoming June 2026 IAL exam session. Covers all Economics and Business units.</div>
          </Link>
          <Link href="/ial-revision/january-2027" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.07s' }}>
            <div className="elp-wyg-title">January 2027 Exam Series</div>
            <div className="elp-wyg-desc">Get ahead with early revision for the January 2027 session. Perfect for students sitting their first IAL units.</div>
          </Link>
        </div>
      </div>

      {/* Resources */}
      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow">
          <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-teal)' }} />
          Resources
        </div>
        <h2 className="elp-s-title" style={{ fontSize: '22px', marginBottom: '8px' }}>More revision tools</h2>
        <div className="elp-resources-row">
          <Link href="/past-papers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128196;</span> IAL Past Papers
          </Link>
          <Link href="/model-answers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128221;</span> Model Answers
          </Link>
          <Link href="/command-words" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128292;</span> Command Words
          </Link>
          <Link href="/glossary" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128214;</span> Key Terms Glossary
          </Link>
          <Link href="/guides" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128218;</span> Revision Guides
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Start your IAL revision today</h2>
          <p className="elp-cta-sub">
            Free notes for every spec point. Built for Edexcel IAL students at international schools worldwide.
          </p>
          <div className="elp-cta-actions">
            <Link href="/economics" className="elp-btn-primary" style={{ fontSize: '15px', padding: '14px 30px' }}>
              Economics &rarr;
            </Link>
            <Link href="/business" className="elp-btn-secondary">Business &rarr;</Link>
          </div>
          <p className="elp-cta-note">No signup required &middot; January &amp; June series &middot; 80+ countries</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="elp-footer">
        <div className="elp-footer-inner">
          <Link href="/" className="elp-footer-logo">
            <span className="elp-nav-dot" style={{ width: '7px', height: '7px' }} />
            Revvy Learn
          </Link>
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
