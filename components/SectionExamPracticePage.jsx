/**
 * The lab exam-practice page for one section — server-rendered, question first.
 *
 * Packet 12.2, E010/E011/E012/E014/E015. A `noindex` route the founder can open to see what an
 * honest question-first page looks like before anything the student sees changes.
 *
 * THREE THINGS IT DOES THAT THE LIVE PRACTICE TAB DOES NOT:
 *
 *   1. It states its own spec coverage as a number, at the top, including when that number is zero.
 *      `measures-economic-performance` examines 0 of 48 requirements and the page says so. The
 *      competitor this was measured against stamps every page "may not be accurate" and states
 *      nothing; a real number that is bad is a stronger claim than a disclaimer.
 *   2. It builds the written questions from `data/modelAnswersData.js`, not from `section_practice`.
 *      Four of market-failure's five practice rows carry a tariff that does not exist in IAL
 *      Economics (`Define 4`, `Explain 6`, `Analyse 10`, `Outline 4` — `lib/ial-marking.js`). A page
 *      whose argument is that tariffs matter cannot display them.
 *   3. Everything collapsible is in the server HTML. `<details>` is closed, not absent: the mark
 *      scheme, the model answer, the examiner commentary and the mid-band panel are all curl-able
 *      without running the page's JavaScript.
 *
 * It renders no stimulus of its own. Where a section has a live `/data-response/<slug>` piece it
 * links out to it — see `lib/lab-data-response.js`.
 */

import Link from 'next/link';
import LabQuickCheck from '@/components/lab/LabQuickCheck';
import { aoListFor } from '@/lib/exam-item';
import { timeLabel, paperLabel } from '@/lib/exam-timing';
import { midBandAttempt, highestTariffItem } from '@/lib/mid-band-answer';
import './section-exam-practice.css';

const SUBJECT_LABEL = { economics: 'Economics', business: 'Business' };

function Meta({ item, subject, unit }) {
  const ao = aoListFor(subject, item.commandWord) || [];
  const time = timeLabel(subject, unit, item.marks);
  return (
    <p className="lab-item-meta">
      <span className="lab-chip lab-chip-command">{item.commandWord}</span>
      <span className="lab-chip">{item.marks} marks</span>
      {ao.length > 0 && <span className="lab-chip">{ao.join(' · ')}</span>}
      {time && <span className="lab-chip">{time}</span>}
    </p>
  );
}

function MarkScheme({ rows }) {
  if (!rows?.length) return null;
  return (
    <details className="lab-details">
      <summary>Mark scheme</summary>
      <dl className="lab-markscheme">
        {rows.map((r) => (
          <div key={r.range} className="lab-markscheme-row">
            <dt>{r.range}</dt>
            <dd>{r.desc}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

function ModelAnswer({ item }) {
  const paragraphs = item.answerParagraphs || [];
  const peel = item.peel;
  if (!paragraphs.length && !peel) return null;
  return (
    <details className="lab-details">
      <summary>Model answer{item.likelyScore ? ` — ${item.likelyScore}` : ''}</summary>
      {paragraphs.map((p, i) => (
        <div key={p.label || i} className="lab-answer-para">
          {p.label && <h4>{p.label}</h4>}
          <div dangerouslySetInnerHTML={{ __html: p.html }} />
        </div>
      ))}
      {!paragraphs.length && peel && (
        <dl className="lab-markscheme">
          {['point', 'evidence', 'explain', 'link'].filter((k) => peel[k]).map((k) => (
            <div key={k} className="lab-markscheme-row">
              <dt>{k[0].toUpperCase() + k.slice(1)}</dt>
              <dd dangerouslySetInnerHTML={{ __html: peel[k] }} />
            </div>
          ))}
        </dl>
      )}
    </details>
  );
}

function ExaminerCommentary({ html }) {
  if (!html) return null;
  return (
    <details className="lab-details">
      <summary>Examiner commentary</summary>
      <div className="lab-commentary" dangerouslySetInnerHTML={{ __html: html }} />
    </details>
  );
}

/** E011. The mid-band attempt and the mark-scheme rows it does not reach. */
function WhyThisLosesMarks({ item, attempt }) {
  if (!attempt) return null;
  return (
    <details className="lab-details lab-details-midband">
      <summary>Why this loses marks — a mid-band attempt at the same question</summary>
      <p className="lab-midband-basis">
        {`Not a real script, and not written for this panel. It is ${attempt.basis} Open the model answer above and the difference is exactly the paragraphs named here.`}
      </p>
      <div className="lab-midband-answer">
        {attempt.kept.map((p) => (
          <div key={p.index} className="lab-answer-para">
            <h4>{p.label}</h4>
            <div dangerouslySetInnerHTML={{ __html: p.html }} />
          </div>
        ))}
      </div>
      <h4 className="lab-midband-head">The band this attempt cannot reach</h4>
      {attempt.outOfReach.length > 0 ? (
        <dl className="lab-markscheme">
          {attempt.outOfReach.map((r) => (
            <div key={r.range} className="lab-markscheme-row">
              <dt>{r.range}</dt>
              <dd>{r.desc}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="lab-note">
          This item&rsquo;s mark scheme has no separate evaluation band &mdash; a four-mark{' '}
          {item.commandWord} is marked on definition and development. What the cut paragraph costs
          here is depth, not an objective.
        </p>
      )}
      {attempt.ceiling.length > 0 && (
        <>
          <h4 className="lab-midband-head">Where it tops out instead</h4>
          <dl className="lab-markscheme">
            {attempt.ceiling.map((r) => (
              <div key={r.range} className="lab-markscheme-row">
                <dt>{r.range}</dt>
                <dd>{r.desc}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
      <p className="lab-note">
        No mark is put on this attempt. The full answer above is marked{' '}
        {attempt.fullScore || 'at the top of the range'} by its own commentary; what a truncated
        version scores depends on the script, and inventing a number for it would be the kind of
        false precision this page exists to avoid.
      </p>
    </details>
  );
}

/** E014. The section's real coverage, and the requirements no question on this page examines. */
function CoveragePanel({ coverage, section }) {
  if (!coverage.available) {
    return (
      <section className="lab-coverage lab-coverage-unknown">
        <p>
          Spec coverage is not computable in this environment: the oracle
          (<code>audit/raw/spec-items.json</code>) was not readable. No number is shown rather than a
          guessed one.
        </p>
      </section>
    );
  }
  const { examined, leaves, pct, examinedLeaves, unexaminedLeaves } = coverage;
  return (
    <section className="lab-coverage" aria-labelledby="lab-coverage-head">
      <h2 id="lab-coverage-head" className="lab-coverage-head">
        This page examines {examined} of {leaves} requirements in {section.number} {section.title}
        <span className="lab-coverage-pct">{pct.toFixed(1)}%</span>
      </h2>
      <p className="lab-coverage-sub">
        Counted over the {coverage.questions} written question{coverage.questions === 1 ? '' : 's'} on
        this page and nothing else — not the whole question bank, and not the teaching notes, which
        are measured separately and are much better covered.
        {coverage.untagged > 0 && (
          <> {coverage.untagged} of them carry no spec tag yet, so this number is a floor, not an estimate.</>
        )}
      </p>

      {examinedLeaves.length > 0 && (
        <ul className="lab-leaf-list">
          {examinedLeaves.map((l) => (
            <li key={l.id}>
              <code>{l.id}</code> {l.wording}
            </li>
          ))}
        </ul>
      )}

      {unexaminedLeaves.length > 0 && (
        <details className="lab-details">
          <summary>
            {unexaminedLeaves.length} requirement{unexaminedLeaves.length === 1 ? '' : 's'} in{' '}
            {section.number} that no question on this page examines
          </summary>
          <ul className="lab-leaf-list">
            {unexaminedLeaves.map((l) => (
              <li key={l.id}>
                <code>{l.id}</code> {l.wording}
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}

export default function SectionExamPracticePage({
  section,
  written,
  quiz,
  coverage,
  dataResponse,
  provenance,
}) {
  const subjectLabel = SUBJECT_LABEL[section.subject] || section.subject;
  const totalMarks = written.reduce((n, a) => n + (Number(a.marks) || 0), 0);
  const midBandItem = highestTariffItem(written);
  const midBand = midBandItem ? midBandAttempt(midBandItem) : null;

  return (
    <div className="lab-page">
      <p className="lab-banner">
        Lab page &mdash; <code>noindex, nofollow</code>, not in the sitemap, not linked from the app.
        Built from files on disk, never from the database.
      </p>

      <header className="lab-header">
        <p className="lab-crumbs">
          {subjectLabel} &middot; {section.unitCode} &middot; Unit {section.unit} &middot; {section.number}
        </p>
        <h1>{section.title}</h1>
        {/* One expression per sentence. JSX trims the leading whitespace of a text node that spans
            more than one line, which is how "32marks" and "80 marks— not" reached the page on the
            first render of this component — the same trap as SectionModelAnswersPage's empty note
            (packet 12.1, fix round B1). */}
        <p className="lab-counts">
          {`${written.length} written question${written.length === 1 ? '' : 's'} · ${totalMarks} marks · ${quiz.sample.length} of ${quiz.bankSize} quick-check MCQs`}
        </p>
        <p className="lab-note">
          {`Time estimates come from one constant per paper — ${subjectLabel} Unit ${section.unit} is ${paperLabel(section.subject, section.unit)} — not from a per-question guess.`}
        </p>
      </header>

      <CoveragePanel coverage={coverage} section={section} />

      {quiz.sample.length > 0 && (
        <LabQuickCheck questions={quiz.sample} bankSize={quiz.bankSize} />
      )}

      <section className="lab-block" aria-labelledby="lab-written">
        <div className="lab-block-head">
          <h2 id="lab-written">Written questions</h2>
          <p className="lab-block-sub">
            {`Every question here carries a tariff that exists in IAL ${subjectLabel}. The section’s Practice tab holds ${provenance.practiceRows} written item${provenance.practiceRows === 1 ? '' : 's'} of its own` +
              (provenance.invalidTariffs > 0
                ? `, ${provenance.invalidTariffs} of which carry a tariff that does not exist in IAL ${subjectLabel}. Those are counted here and not displayed.`
                : `, all with valid tariffs. They are a separate bank and are not displayed here.`)}
          </p>
        </div>

        {written.length === 0 ? (
          /* The empty-state pattern from SectionModelAnswersPage.jsx (packet 12.1, fix round B1):
             one sentence, one expression, so JSX cannot swallow the space before a word. Business
             Units 3 and 4 have no model answers at all, and a blank block would read as a bug. */
          <p className="lab-empty-note" role="note">
            {`No model answer has been written for this topic yet, so this block is empty on purpose rather than by accident — the ${section.number} entry in data/modelAnswersData.js does not exist. The Quick Check above is real, and the coverage line above counts what is on this page, which is why it reads 0.`}
          </p>
        ) : (
          <ol className="lab-item-list">
            {written.map((item) => (
              <li key={item.id} className="lab-item">
                <Meta item={item} subject={section.subject} unit={section.unit} />
                <p className="lab-item-question">{item.question}</p>
                <MarkScheme rows={item.markScheme} />
                <ModelAnswer item={item} />
                <ExaminerCommentary html={item.examinerCommentary} />
                {midBandItem && item.id === midBandItem.id && (
                  <WhyThisLosesMarks item={item} attempt={midBand} />
                )}
              </li>
            ))}
          </ol>
        )}
      </section>

      {dataResponse && (
        <section className="lab-block" aria-labelledby="lab-data-response">
          <div className="lab-block-head">
            <h2 id="lab-data-response">Data response</h2>
          </div>
          <Link href={dataResponse.href} className="lab-dr-card">
            <span className="lab-dr-title">{dataResponse.title}</span>
            <span className="lab-dr-sub">
              Stimulus, question ladder and KAA+E model answers on the live page &rarr;
            </span>
          </Link>
        </section>
      )}

      <footer className="lab-footer">
        <p>
          Sources: written questions from <code>data/modelAnswersData.js</code> and{' '}
          <code>modelAnswersExpansion.js</code>; MCQs and practice counts from{' '}
          <code>{provenance.bundle}</code>, the t=0 dump of the published tables; spec requirements
          from <code>audit/raw/spec-items.json</code>. Nothing on this page reads the database.
        </p>
      </footer>
    </div>
  );
}
