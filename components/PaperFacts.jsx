import Link from 'next/link';
import { IAL_PAPERS } from '@/data/ialPapers';
import { oct2026, jan2027, jun2027 } from '@/data/ialTimetables';
import '@/styles/paper-facts.css';

/**
 * "The WEC11 paper": structure, marks and next sittings for a unit hub, so a search for the paper
 * code lands on an answer. Server component; upcoming dates are filtered at build time.
 */
export default function PaperFacts({ code }) {
  const paper = IAL_PAPERS[code];
  if (!paper) return null;
  const subject = code.startsWith('WEC') ? 'economics' : 'business';
  const today = new Date().toISOString().slice(0, 10);
  const sittings = [oct2026, jan2027, jun2027]
    .map((series) => ({ series, p: series.papers.find((x) => x.code === code) }))
    .filter(({ p }) => p && p.date >= today);

  return (
    <div className="elp-section pf" id="paper">
      <div className="elp-units-header">
        <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-amber)' }} />The exam</div>
        <h2 className="elp-s-title">The {code} paper</h2>
        <p className="elp-s-sub">{paper.length} &middot; 80 marks &middot; sat in January, June and October</p>
      </div>
      <div className="pf-grid">
        <ol className="pf-sections">
          {paper.sections.map(([letter, what, marks]) => (
            <li key={letter}>
              <span className="pf-letter">{letter}</span>
              <span className="pf-what">{what}</span>
              <span className="pf-marks">{marks} marks</span>
            </li>
          ))}
        </ol>
        <div className="pf-side">
          {sittings.length > 0 && (
            <div className="pf-box">
              <div className="pf-label">Next sittings</div>
              <ul>
                {sittings.map(({ series, p }) => (
                  <li key={series.series}><b>{p.day} {p.date.slice(0, 4)}</b> &middot; {p.session.toLowerCase()} &middot; {series.series} series</li>
                ))}
              </ul>
              <p className="pf-note">Start times vary by time zone. Your exams officer confirms yours.</p>
            </div>
          )}
          <div className="pf-links">
            <Link href="/past-papers">{code} past papers &rarr;</Link>
            <Link href={`/command-words#${subject}`}>Command words and marks &rarr;</Link>
            <Link href="/ial-revision/exam-series">Full exam timetables &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
