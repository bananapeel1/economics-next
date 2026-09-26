import Link from 'next/link';

/** Pearson timetable rows for one series (see data/ialTimetables.js). Server component. */
export default function ExamTimetable({ series }) {
  return (
    <div className="elp-tt-wrap">
      <table className="elp-tt">
        <thead>
          <tr><th scope="col">Date</th><th scope="col">Paper</th><th scope="col">Session</th></tr>
        </thead>
        <tbody>
          {series.papers.map((p) => (
            <tr key={p.code}>
              <td className="elp-tt-date">{p.day}</td>
              <td>
                <Link href={`/${p.subject.toLowerCase()}/unit-${p.unit}`} className="elp-tt-paper">
                  <span className={`elp-tt-code ${p.subject === 'Economics' ? 'is-econ' : 'is-bus'}`}>{p.code}</span>
                  {p.subject} Unit {p.unit}: {p.title}
                </Link>
              </td>
              <td className="elp-tt-session">{p.session}<span>{p.length}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="elp-tt-source">
        Source: <a href={series.source} target="_blank" rel="noopener noreferrer">Pearson Edexcel International Advanced Levels, {series.series} Examination Timetable ({series.status})</a>. Checked {new Date(series.checked).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}.
      </p>
    </div>
  );
}
