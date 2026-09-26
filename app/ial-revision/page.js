import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import BackToApp from '@/components/BackToApp';
import { BookAlt, Document, Glossary, LearnMode, PenIcon } from '@/components/Icons';
import IALScrollBar from './IALScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Edexcel IAL Revision — Free International A-Level Economics & Business Notes | Revvy Learn',
  description: 'Free revision notes and practice questions for Edexcel International A-Level (IAL) Economics and Business, plus free past papers and mark schemes for all four units. Flashcards, quizzes and the AI tutor unlock with Pro. Built for IAL students worldwide. October, January and June exam series covered.',
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
          "text": "Edexcel IAL (International A-Level) is a modular qualification offered by Pearson Edexcel, designed specifically for students outside the UK. It is available in subjects including Economics and Business and is recognised by universities worldwide. Unlike the UK domestic A-Level, IAL Economics and Business exams can be sat in three series a year: January, May/June and October."
        }
      },
      {
        "@type": "Question",
        "name": "Is IAL the same as A-Level?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IAL and the UK domestic A-Level cover similar content but differ in structure. IAL is modular — you sit individual unit exams across multiple series (January, May/June and October). The UK A-Level is linear — all exams are sat in June of the final year."
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
          "text": "IAL Economics and Business exams run in three series each year: January, May/June and October. This modular structure allows students to spread their units across multiple sittings, retake individual units to improve grades, or complete the full qualification in a single session."
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

      <SiteHeader crumb="IAL Revision / International A-Level" />

      {/* Hero */}
      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Edexcel International A-Level</div>
            <h1 className="elp-hero-title">
              IAL revision built for<br /><em>international students</em>
            </h1>
            <p className="elp-hero-desc">
              Free revision notes, practice questions and past papers for all four units for Edexcel IAL Economics and Business, with flashcards, quizzes and the AI tutor on Pro &mdash; built specifically for the International A-Level specification used at schools in Hong Kong, South Korea, Malaysia, Singapore, Pakistan, Sri Lanka and across the Middle East.
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
            <div className="elp-wyg-desc">4 units &middot; 23 spec points &middot; WEC11&ndash;WEC14</div>
            <div className="elp-wyg-desc">Microeconomics, macroeconomics, business behaviour and the global economy. Notes, diagrams and practice questions are free. Flashcards, quizzes and the AI tutor unlock with Pro.</div>
          </Link>
          <Link href="/business" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.07s' }}>
            <div className="elp-wyg-title">IAL Business</div>
            <div className="elp-wyg-desc">4 units &middot; 20 spec points &middot; WBS11&ndash;WBS14</div>
            <div className="elp-wyg-desc">Marketing, people, finance, strategy and global business. Notes, practice questions and past papers for all four units are free. Flashcards, quizzes and the AI tutor unlock with Pro.</div>
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
          <h2 className="elp-s-title">October, January &amp; June exam series</h2>
          <p className="elp-s-sub" style={{ maxWidth: '720px' }}>
            Unlike the UK domestic A-Level, IAL Economics and Business can be sat in three series a year. You can sit Units 1 and 2 in one series and Units 3 and 4 in a later one, or take all units in a single series.
          </p>
        </div>

        <div className="elp-wyg-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/ial-revision/exam-series#october-2026" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none' }}>
            <div className="elp-wyg-title">October 2026 Exam Series</div>
            <div className="elp-wyg-desc">Economics and Business papers from 8 to 30 October 2026: every date from Pearson&apos;s final timetable.</div>
          </Link>
          <Link href="/ial-revision/january-2027" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.07s' }}>
            <div className="elp-wyg-title">January 2027 Timetable</div>
            <div className="elp-wyg-desc">All eight Economics and Business papers, 11 to 21 January 2027, and the two dates to plan around.</div>
          </Link>
          <Link href="/ial-revision/june-2027" className="elp-wyg-card elp-fade-up" style={{ textDecoration: 'none', transitionDelay: '.14s' }}>
            <div className="elp-wyg-title">June 2027 Timetable</div>
            <div className="elp-wyg-desc">The biggest series: every Economics and Business paper from 5 May to 4 June 2027.</div>
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
            <span className="elp-resource-chip-icon"><Document size={18} /></span> IAL Past Papers
          </Link>
          <Link href="/model-answers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><PenIcon size={18} /></span> Model Answers
          </Link>
          <Link href="/command-words" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><Glossary size={18} /></span> Command Words
          </Link>
          <Link href="/glossary" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><BookAlt size={18} /></span> Key Terms Glossary
          </Link>
          <Link href="/guides" className="elp-resource-chip">
            <span className="elp-resource-chip-icon"><BookAlt size={18} /></span> Revision Guides
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Start your IAL revision today</h2>
          <p className="elp-cta-sub">
            Free notes across all four units. Built for Edexcel IAL students at international schools worldwide.
          </p>
          <div className="elp-cta-actions">
            <Link href="/economics" className="elp-btn-primary" style={{ fontSize: '15px', padding: '14px 30px' }}>
              Economics &rarr;
            </Link>
            <Link href="/business" className="elp-btn-secondary">Business &rarr;</Link>
          </div>
          <p className="elp-cta-note">No signup required &middot; October, January &amp; June series &middot; 80+ countries</p>
        </div>
      </div>

      {/* Footer */}
      <BackToApp
        icon={LearnMode}
        heading={"Start revising, free"}
        sub={"Economics and Business notes, no signup required"}
        href="/economics/unit-1/introductory-concepts"
        cta={"Open the app"}
      />

      <footer className="elp-footer">
        <div className="elp-footer-inner">
          <Link href="/" className="elp-footer-logo">
            <img src="/logo.svg" alt="" className="elp-footer-mark" width={18} height={18} />
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
