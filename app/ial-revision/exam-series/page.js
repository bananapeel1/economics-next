import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import BackToApp from '@/components/BackToApp';
import { Clipboard } from '@/components/Icons';
import IALScrollBar from '../IALScrollBar';
import ExamTimetable from '../ExamTimetable';
import { oct2026, jan2027, lastJanuaryResults } from '@/data/ialTimetables';
import '@/styles/landing.css';

export const metadata = {
  title: 'Edexcel IAL Exam Series — October, January & June Dates | Revvy Learn',
  description: 'How the three Edexcel IAL exam series work for Economics (WEC11–14) and Business (WBS11–14), with every paper date for October 2026 and January 2027 from Pearson’s final timetables. Retakes, time zones and modular planning.',
  alternates: { canonical: 'https://revvylearn.com/ial-revision/exam-series' },
  openGraph: {
    title: 'Edexcel IAL Exam Series — October, January & June Dates | Revvy Learn',
    description: 'October 2026 and January 2027 IAL Economics and Business exam dates, plus how the three exam series work.',
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
          "text": "IAL Economics and Business have three exam series each year: January, May/June and October. In the October 2026 series the papers run from 8 to 30 October; in January 2027 from 11 to 21 January. Pearson publishes the final timetable for each series. Students can sit any combination of units in any series."
        }
      },
      {
        "@type": "Question",
        "name": "Do IAL exam start times depend on my country?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The timetable lists each paper as a morning or afternoon session, and Pearson publishes separate start times for each time zone. Your exams officer confirms the exact start time at your centre."
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
        "name": "What is the difference between the IAL exam series?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All three series cover the same units. The differences are timing: October exams run through October, January exams are in mid-January (January 2026 results reached students on 19 March 2026), and the May/June series is the largest, with results in August. Many students sit AS units early and A2 units in June."
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

      <SiteHeader crumb="IAL Revision / Exam Series" />

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Edexcel IAL Exam Sessions</div>
            <h1 className="elp-hero-title">October, January &amp; June<br /><em>exam series</em></h1>
            <p className="elp-hero-desc">
              IAL Economics and Business can be sat in three exam series a year: October, January and May/June. Below are the October 2026 dates, the January 2027 dates and how to plan your units across the series.
            </p>
            <div className="elp-hero-actions">
              <Link href="/ial-revision/january-2027" className="elp-btn-primary">January 2027 timetable &rarr;</Link>
              <a href="#october-2026" className="elp-btn-secondary">October 2026 dates &darr;</a>
            </div>
          </div>
        </div>
      </section>

      <div className="elp-section">
        <div className="elp-units-header elp-fade-up">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />How it works</div>
          <h2 className="elp-s-title">The modular advantage</h2>
          <p className="elp-s-sub" style={{ maxWidth: '720px' }}>
            IAL is modular: you choose which units to sit in each series. You can take Units 1 and 2 (AS) in one series and Units 3 and 4 (A2) in a later one, or sit everything together.
          </p>
        </div>

        <div className="elp-wyg-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="elp-wyg-card elp-fade-up">
            <div className="elp-wyg-title">October exam series</div>
            <div className="elp-wyg-desc">Runs through October. In 2026, the Economics and Business papers are from Thursday 8 to Friday 30 October. Useful for retakes and for spreading units across the year.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up">
            <div className="elp-wyg-title">January exam series</div>
            <div className="elp-wyg-desc">Mid-January: 11 to 21 January in 2027. {lastJanuaryResults.series} results reached students on {lastJanuaryResults.students}. Popular for sitting AS units early and for retakes.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.07s' }}>
            <div className="elp-wyg-title">June exam series</div>
            <div className="elp-wyg-desc">Late May to mid-June. Results released in August. The main exam session &mdash; most students sit their A2 units (Units 3 &amp; 4) here, and many complete all units in this session.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.14s' }}>
            <div className="elp-wyg-title">Start times and time zones</div>
            <div className="elp-wyg-desc">The timetable gives a morning or afternoon session. Pearson publishes separate start times for each time zone, and your exams officer confirms the exact start time at your centre.</div>
          </div>
          <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.21s' }}>
            <div className="elp-wyg-title">Retake flexibility</div>
            <div className="elp-wyg-desc">You can retake individual units without retaking the whole qualification, in any of the three series.</div>
          </div>
        </div>
      </div>

      <div className="elp-section" id="october-2026">
        <div className="elp-units-header">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-amber)' }} />Next series</div>
          <h2 className="elp-s-title">October 2026 timetable</h2>
          <p className="elp-s-sub" style={{ maxWidth: '720px' }}>
            Every Economics and Business paper in the October 2026 series. Start times depend on your time zone; your exams officer confirms the exact time.
          </p>
        </div>
        <ExamTimetable series={oct2026} />
      </div>

      <div className="elp-section" id="january-2027">
        <div className="elp-units-header">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />After that</div>
          <h2 className="elp-s-title">January 2027 timetable</h2>
          <p className="elp-s-sub" style={{ maxWidth: '720px' }}>
            Both Unit 1 papers are on Monday 11 January, and WBS12 and WEC13 share the morning of Friday 15 January. <Link href="/ial-revision/january-2027">Plan for January 2027 &rarr;</Link>
          </p>
        </div>
        <ExamTimetable series={jan2027} />
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

      <BackToApp

        icon={Clipboard}

        heading={"Know the dates. Now build the plan."}

        sub={"Free notes for both subjects, in the order you will sit them"}

        href="/economics/unit-1/introductory-concepts"

        cta={"Start at 1.3.1"}

      />


      <footer className="elp-footer">
        <div className="elp-footer-inner">
          <Link href="/" className="elp-footer-logo"><img src="/logo.svg" alt="" className="elp-footer-mark" width={18} height={18} />Revvy Learn</Link>
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
