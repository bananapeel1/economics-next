import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import IALScrollBar from '../IALScrollBar';
import ExamTimetable from '../ExamTimetable';
import { jan2027, lastJanuaryResults } from '@/data/ialTimetables';
import '@/styles/landing.css';

export const metadata = {
  title: 'Edexcel IAL January 2027 Timetable — Economics & Business Exam Dates | Revvy Learn',
  description: 'Pearson’s final January 2027 timetable for IAL Economics (WEC11–WEC14) and Business (WBS11–WBS14): the date, session and length of every paper, plus the 15 January clash. Free revision notes for every unit.',
  alternates: { canonical: 'https://revvylearn.com/ial-revision/january-2027' },
  openGraph: {
    title: 'Edexcel IAL January 2027 Timetable — Economics & Business | Revvy Learn',
    description: 'Every IAL Economics and Business paper in January 2027: dates, sessions and lengths from Pearson’s final timetable.',
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

      <SiteHeader crumb="IAL Revision / January 2027" />

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Edexcel IAL &middot; January 2027 Exam Series</div>
            <h1 className="elp-hero-title">January 2027 IAL timetable<br /><em>Economics &amp; Business</em></h1>
            <p className="elp-hero-desc">
              All eight Economics and Business papers run between Monday 11 and Thursday 21 January 2027. The dates below are from Pearson&apos;s final timetable. Both Unit 1 papers are on the first day.
            </p>
            <div className="elp-hero-actions">
              <a href="#timetable" className="elp-btn-primary">See the timetable &darr;</a>
              <a href={jan2027.source} className="elp-btn-secondary" target="_blank" rel="noopener noreferrer">Pearson&apos;s PDF &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <div className="elp-section" id="timetable">
        <div className="elp-units-header">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />Final timetable</div>
          <h2 className="elp-s-title">Every Economics and Business paper, January 2027</h2>
          <p className="elp-s-sub" style={{ maxWidth: '720px' }}>
            Morning and afternoon start times depend on your country. Pearson publishes separate start times for each time zone, and your exams officer confirms the exact time.
          </p>
        </div>

        <ExamTimetable series={jan2027} />
      </div>

      <div className="elp-section">
        <div className="elp-units-header">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-amber)' }} />Plan around these</div>
          <h2 className="elp-s-title">Two dates to watch</h2>
        </div>
        <div className="elp-wyg-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="elp-wyg-card">
            <div className="elp-wyg-title">Monday 11 January: both Unit 1 papers</div>
            <div className="elp-wyg-desc">Business Unit 1 (WBS11) is in the morning and Economics Unit 1 (WEC11) in the afternoon. If you sit both, that is 3 hours 45 minutes of writing on the first day. Practise a full paper in each subject back to back before then.</div>
          </div>
          <div className="elp-wyg-card">
            <div className="elp-wyg-title">Friday 15 January: WBS12 and WEC13 at the same time</div>
            <div className="elp-wyg-desc">Business Unit 2 and Economics Unit 3 are both in the morning session. If you are entered for both, tell your exams officer now so your centre can arrange how you sit them.</div>
          </div>
        </div>
      </div>

      <div className="elp-section">
        <div className="elp-units-header">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />Planning ahead</div>
          <h2 className="elp-s-title">Why sit January exams?</h2>
          <p className="elp-s-sub" style={{ maxWidth: '720px' }}>
            IAL is modular, so you choose which units to sit in each series. January lets you spread your units across the year or retake a unit to improve your grade.
          </p>
        </div>

        <div className="elp-wyg-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="elp-wyg-card">
            <div className="elp-wyg-title">Spread the load</div>
            <div className="elp-wyg-desc">Sit Units 1 and 2 in January so you only need to focus on Units 3 and 4 in June. This gives you more revision time per unit and reduces exam-period stress.</div>
          </div>
          <div className="elp-wyg-card">
            <div className="elp-wyg-title">Retake a unit</div>
            <div className="elp-wyg-desc">If a unit from June 2026 went badly, January 2027 is your next chance. Focus your revision on the topics and question types that cost you marks.</div>
          </div>
          <div className="elp-wyg-card">
            <div className="elp-wyg-title">Results</div>
            <div className="elp-wyg-desc">Pearson has not yet published the results date for January 2027. {lastJanuaryResults.series} results reached students on {lastJanuaryResults.students}.</div>
          </div>
          <div className="elp-wyg-card">
            <div className="elp-wyg-title">Plan backwards from 11 January</div>
            <div className="elp-wyg-desc">Finish your notes first, then move on to timed past papers. Leave December for full papers under exam conditions, marked against the mark scheme.</div>
          </div>
        </div>
      </div>

      <div className="elp-section">
        <div className="elp-units-header">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-blue)' }} />Free notes for every paper</div>
          <h2 className="elp-s-title">Revise each unit</h2>
        </div>
        <div className="elp-wyg-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {[...jan2027.papers].sort((a, b) => a.code.localeCompare(b.code)).map((p) => (
            <Link key={p.code} href={`/${p.subject.toLowerCase()}/unit-${p.unit}`} className="elp-wyg-card" style={{ textDecoration: 'none' }}>
              <div className="elp-wyg-title">{p.code} &mdash; {p.title}</div>
              <div className="elp-wyg-desc">{p.subject} Unit {p.unit} &middot; exam {p.day}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Ready for 11 January?</h2>
          <p className="elp-cta-sub">Free notes, diagrams and practice questions for every Economics and Business unit.</p>
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
            <Link href="/ial-revision" className="elp-footer-link">IAL Revision</Link>
            <Link href="/past-papers" className="elp-footer-link">Past Papers</Link>
          </div>
          <div className="elp-footer-right">Edexcel IAL revision &copy; Revvy Learn</div>
        </div>
      </footer>
    </div>
  );
}
