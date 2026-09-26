/**
 * One topic's model-answer page — question first, server-rendered.
 *
 * Packet 12.3, E016/E017/E021. This component used to be a shell around `ModelAnswersPage`, the
 * card grid the `/model-answers` hub still uses. It now renders the layout packet 12.2 proved on
 * its noindex lab route, which packet 12.3 deleted in the same breath — that route was only ever
 * the place to look at this layout before a student could.
 *
 * WHAT THE LAYOUT DOES THAT THE CARD GRID DID NOT:
 *   1. The QUESTION is the visible thing. Mark scheme, model answer, examiner commentary and the
 *      mid-band panel are each a CLOSED `<details>` — closed, not absent, so every word of them is
 *      in the server HTML and can be curled without running the page's JavaScript. A student who
 *      opens the answer first has made a choice; the old grid made it for them.
 *   2. Every item states its command word, its tariff, its assessment objectives and a working-time
 *      estimate. The estimate comes from one constant per paper (`lib/exam-timing.js`), read off the
 *      specification's own rubric — not a per-question guess.
 *   3. The page states its own spec coverage as a number, including when that number is zero.
 *   4. The highest-tariff item carries "why this loses marks": the model answer with its closing
 *      material removed, annotated against the bands that removal puts out of reach. Constructed
 *      from the item, never invented (`lib/mid-band-answer.js`).
 *
 * WHAT DID NOT TRANSFER, and why — E017. The lab page's Quick Check read its MCQs from the t=0
 * dump of the published tables under `audit/`, frozen since 12 September and superseded for
 * eighteen sections since. That is fine behind `noindex` and wrong under a canonical URL, so the
 * block is gone rather than restaged, and `audit/runs/packet-12.3/built.md` records what that
 * cost. No file under `app/` or `components/` opens that dump any more, which is E017's own test.
 *
 * The FAQ schema, the back link and the "now try one yourself" CTA are packet 12.1's and are kept.
 */

import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { SECTION_MODEL_ANSWERS_FAQ } from '@/data/modelAnswersData';
import { modelAnswersHeading, modelAnswersPath } from '@/data/modelAnswerPages';
import { aoListFor } from '@/lib/exam-item';
import { timeLabel, paperLabel } from '@/lib/exam-timing';
import { midBandAttempt, highestTariffItem } from '@/lib/mid-band-answer';
import MarkedScriptAttempt from '@/components/MarkedScriptAttempt';
import './model-answers-layout.css';

const SUBJECT_LABEL = { economics: 'Economics', business: 'Business' };

/** Tags out, entities the bank actually uses back in. For JSON-LD only — never for rendering. */
function plainText(html) {
  return String(html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&(?:rsquo|apos|#39);/g, '’')
    .replace(/&(?:ldquo|rdquo|quot);/g, '"')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/\s+/g, ' ')
    .trim();
}

/** The model answer as one string, for `acceptedAnswer`. Paragraph bank first, PEEL bank second. */
function answerText(item) {
  const paragraphs = item.answerParagraphs || [];
  if (paragraphs.length) return plainText(paragraphs.map((p) => p.html).join(' '));
  const peel = item.peel || {};
  return plainText(['point', 'evidence', 'explain', 'link'].map((k) => peel[k]).filter(Boolean).join(' '));
}

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

/**
 * The key to the annotation chips. FIX ROUND B1.
 *
 * The chips (`<span class="ma-ann ma-ann-blue">K</span>`) are inside the answer HTML in
 * `data/modelAnswersData.js`, so they transferred with the content and nothing had to be done to
 * make them appear. The KEY was a component argument — `ModelAnswersPage.jsx:377` passes
 * `answer.annotationLegend` — and that call site was the one thing the 12.3 rewrite did not carry
 * across. Result: ~1,350 coloured letters on 31 of 32 pages with nothing anywhere saying what a
 * letter means. Every structural check still passed, which is why only the walkthrough caught it.
 *
 * `codesIn` filters the key to the codes the block it sits above actually contains. The mid-band
 * panel renders a SUBSET of the model answer's paragraphs, so the full legend above it would name
 * codes that are not in the text beneath — the same class of small dishonesty this page exists to
 * avoid. Matching on `>K<` is safe: the chip span is the only place a bare code sits between tags.
 */
function codesIn(html, legend) {
  const joined = String(html || '');
  return (legend || []).filter((a) => joined.includes(`>${a.code}<`));
}

function AnnotationLegend({ items }) {
  if (!items?.length) return null;
  return (
    <div className="lab-ann-legend">
      <span className="lab-ann-legend-title">What the marks in the margin mean</span>
      {items.map((a) => (
        <span className="lab-ann-item" key={a.code}>
          <span className={`ma-ann ma-ann-${a.color}`}>{a.code}</span>
          <span>{a.label}</span>
        </span>
      ))}
    </div>
  );
}

function ModelAnswer({ item }) {
  const paragraphs = item.answerParagraphs || [];
  const peel = item.peel;
  if (!paragraphs.length && !peel) return null;
  const legend = codesIn(paragraphs.map((p) => p.html).join(' '), item.annotationLegend);
  return (
    <details className="lab-details">
      <summary>Model answer{item.likelyScore ? ` — ${item.likelyScore}` : ''}</summary>
      <AnnotationLegend items={legend} />
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
      <AnnotationLegend
        items={codesIn(attempt.kept.map((p) => p.html).join(' '), item.annotationLegend)}
      />
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

/**
 * E035, packet 12.6. The extract, in the page flow.
 *
 * NOT a `<details>`, not a modal, not collapsed. Every other long block on this page is a closed
 * disclosure on purpose — a mark scheme a student opens is a choice they made. An extract is not
 * the same kind of thing: the questions below award application marks for using it, so hiding it
 * behind a click makes the default behaviour of the page "answer from memory", which is the exact
 * failure this packet exists to fix. It sits ABOVE the questions for the same reason a real paper
 * prints Section C's extract before Section C's questions.
 *
 * `blocks` comes from `lib/stimulus.js` as data and is rendered as React nodes here. Nothing from
 * the markdown file reaches `dangerouslySetInnerHTML`.
 */
function StimulusBlock({ stimulus }) {
  if (!stimulus) return null;
  const inline = (tokens, keyPrefix) =>
    tokens.map((t, i) => {
      if (t.kind === 'strong') return <strong key={`${keyPrefix}-${i}`}>{t.text}</strong>;
      if (t.kind === 'em') return <em key={`${keyPrefix}-${i}`}>{t.text}</em>;
      return <span key={`${keyPrefix}-${i}`}>{t.text}</span>;
    });

  return (
    <section className="lab-stimulus" aria-labelledby="lab-stimulus-head">
      <h2 id="lab-stimulus-head" className="lab-stimulus-head">
        The extract these questions are answered from
      </h2>
      {/* Packet 12.7, E043. Fix round B1's "Read this first" disclaimer is gone because what it
          disclaimed is gone: the only questions that carry this extract now are the extract's own,
          and their model answers use its figures. The three generic answers no longer attach it. */}
      <p className="lab-note">
        The first questions below are set on this extract, and their application marks are awarded for
        using it.
      </p>
      {stimulus.blocks.map((b, i) =>
        b.kind === 'table' ? (
          <div className="lab-stimulus-table-wrap" key={`b${i}`}>
            {b.caption && <p className="lab-stimulus-caption">{inline(b.caption, `c${i}`)}</p>}
            <table className="lab-stimulus-table">
              <thead>
                <tr>
                  {b.head.map((h, j) => (
                    <th key={`h${j}`} scope="col">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, r) => (
                  <tr key={`r${r}`}>
                    {row.map((cell, c) => (c === 0 ? <th key={`c${c}`} scope="row">{cell}</th> : <td key={`c${c}`}>{cell}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="lab-stimulus-para" key={`b${i}`}>{inline(b.tokens, `t${i}`)}</p>
        ),
      )}
      <p className="lab-note">
        <Link href={stimulus.href}>The full data-response piece</Link>
        {' — the same extract with its own question ladder and marked answers.'}
      </p>
    </section>
  );
}

/** E014. The section's real coverage, and the requirements no question on this page examines. */
function CoveragePanel({ coverage, page }) {
  if (!coverage.available) {
    return (
      <section className="lab-coverage lab-coverage-unknown">
        <p>
          Spec coverage is not computable here, so no number is shown rather than a guessed one.
        </p>
      </section>
    );
  }

  /* E031, packet 12.4. A page with no questions used to print "This page examines 0 of 24
     requirements in 1.3.2 The Market — 0.0%" and then list all 24, with no caveat: the floor line
     below is gated on `untagged > 0`, and a page with no items has nothing untagged. A percentage
     is a claim about how well the questions cover the specification, and with no questions there is
     no claim to make — 0.0% reads as "this page covers nothing" when the truth is "this page has
     nothing yet". The empty state below says that in words, so the panel says it too and shows no
     number. The unexamined list is dropped with it: enumerating every requirement a page with no
     questions fails to examine is not information, it is an accusation. */
  if (coverage.questions === 0) {
    return (
      <section className="lab-coverage" aria-labelledby="lab-coverage-head">
        <h2 id="lab-coverage-head" className="lab-coverage-head">
          No questions on this page yet, so there is no coverage figure for {page.sectionNumber}{' '}
          {page.topic}
        </h2>
        <p className="lab-coverage-sub">
          {`A percentage here would say how much of the specification this page's questions examine. With no questions, a figure of 0.0% would read as a judgement on the topic rather than on the page, so none is shown.`}
        </p>
      </section>
    );
  }

  const { examined, leaves, pct, examinedLeaves, unexaminedLeaves } = coverage;
  return (
    <section className="lab-coverage" aria-labelledby="lab-coverage-head">
      <h2 id="lab-coverage-head" className="lab-coverage-head">
        This page examines {examined} of {leaves} requirements in {page.sectionNumber} {page.topic}
        <span className="lab-coverage-pct">{pct.toFixed(1)}%</span>
      </h2>
      <p className="lab-coverage-sub">
        Counted over the {coverage.questions} written question{coverage.questions === 1 ? '' : 's'} on
        this page and nothing else — not the whole question bank, and not the revision notes, which
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
            {page.sectionNumber} that no question on this page examines
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

export default function SectionModelAnswersPage({ page, written = [], coverage, dataResponse, stimulus = null }) {
  const subjectLabel = SUBJECT_LABEL[page.subject] || page.subject;
  const heading = modelAnswersHeading(page, { hasAnswers: written.length > 0 });
  const totalMarks = written.reduce((n, a) => n + (Number(a.marks) || 0), 0);
  const midBandItem = highestTariffItem(written);
  const midBand = midBandItem ? midBandAttempt(midBandItem) : null;

  // Subject first: Business 1.3.1 and Economics 1.3.1 are different topics. Packet 12.1, E005.
  const faqs = (SECTION_MODEL_ANSWERS_FAQ[page.subject] || {})[page.sectionNumber] || [];

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null;

  /* E021. `Quiz` with a `Question` per written item — every property below is a real schema.org
     property of the type it sits on (`about` and `hasPart` from CreativeWork; `eduQuestionType`,
     `answerCount`, `text` and `acceptedAnswer` from Question), and nothing is invented to fill a
     field. `eduQuestionType` is omitted rather than guessed: schema.org's documented values are
     the multiple-choice family, and these are extended written answers. A page with no written
     question emits no Quiz at all — an empty `hasPart` would claim practice that is not there. */
  const quizSchema = written.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: heading,
    about: { '@type': 'Thing', name: `Edexcel IAL ${subjectLabel} ${page.sectionNumber} ${page.topic}` },
    educationalLevel: 'International A Level',
    hasPart: written.map((item) => ({
      '@type': 'Question',
      name: `${item.commandWord} (${item.marks} marks)`,
      text: item.question,
      answerCount: 1,
      acceptedAnswer: { '@type': 'Answer', text: answerText(item) },
    })),
  } : null;

  return (
    <div className="resource-page rl-night">
      <SiteHeader crumb={`${subjectLabel} / Model answers`} />

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {quizSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
        />
      )}

      <div className="resource-page-header">
        <Link href={page.backLink.href} className="resource-back-link">
          &larr; {page.backLink.label}
        </Link>
        <h1 className="resource-page-title">{heading}</h1>
        <p className="resource-page-subtitle" dangerouslySetInnerHTML={{ __html: page.subtitle }} />
      </div>

      <div className="lab-page">
        <header className="lab-header">
          <p className="lab-crumbs">
            {subjectLabel} &middot; {page.unitCode} &middot; Unit {page.unit} &middot; {page.sectionNumber}
          </p>
          {/* One expression per sentence. JSX trims the leading whitespace of a text node that spans
              more than one line, which is how "32marks" reached the lab page on its first render —
              the same trap as the empty note below (packet 12.1, fix round B1). */}
          <p className="lab-counts">
            {`${written.length} written question${written.length === 1 ? '' : 's'} · ${totalMarks} marks`}
          </p>
          <p className="lab-note">
            {`Time estimates come from one constant per paper — ${subjectLabel} Unit ${page.unit} is ${paperLabel(page.subject, page.unit)} — not from a per-question guess.`}
          </p>
        </header>

        <CoveragePanel coverage={coverage} page={page} />

        <StimulusBlock stimulus={stimulus} />

        <section className="lab-block" aria-labelledby="lab-written">
          <div className="lab-block-head">
            <h2 id="lab-written">Exam questions</h2>
            <p className="lab-block-sub">
              {`Every question here carries a tariff that exists in IAL ${subjectLabel}. Open the mark scheme before the model answer and you will see what the examiner is paid to look for.`}
            </p>
          </div>

          {written.length === 0 ? (
            /* Honest rather than blank. After E005 renumbered the Business bank by wording, IAL
               Business 1.3.2 (demand, supply, elasticities) has no model answer yet; the page used
               to show an empty card list with no explanation.

               One sentence, one expression. Written across two JSX lines it rendered as
               "The rest of Businessis covered": JSX drops the whitespace between an expression and
               a following line break, so the space before "is" disappeared. Packet 12.1, fix B1. */
            /* The closing clause used to read "use the link above to browse every topic". The only
               link above is the back-link to this page's own unit, which is not every topic, so the
               sentence sent the student to look for something that was not there. It is now a real
               link to the subject hub, which does list every topic in all four units. Packet 12.4,
               E027. */
            <p className="lab-empty-note" role="note">
              {`No model answers are published for this topic yet, so this block is empty on purpose rather than by accident. The rest of ${subjectLabel} is covered — `}
              <Link href={`/${page.subject}`}>{`browse every ${subjectLabel} topic`}</Link>
              {'.'}
            </p>
          ) : (
            <ol className="lab-item-list">
              {written.map((item) => (
                <li key={item.id} className="lab-item">
                  <Meta item={item} subject={page.subject} unit={page.unit} />
                  <p className="lab-item-question">{item.question}</p>
                  {/* E036, packet 12.6. The retrofitted shape is its own flag: an item renders the
                      attempt loop if and only if it carries `criteria`. Sixty-three items do not,
                      and everything below this line is the path they have always taken. */}
                  {item.criteria?.length > 0 && <MarkedScriptAttempt item={item} />}
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
      </div>

      {/* The old CTA sent the reader to /model-answers — another SEO page, not
          the app. Someone who has just read worked answers wants to attempt one,
          so this offers that, on the topic they are already reading, and it
          keeps the ?section= form so the click is measurable. */}
      <div className="seo-cta" style={{ marginTop: 32 }}>
        <h2>Now try one yourself</h2>
        <p>
          Practise {page.topic} in the app: exam-style questions filtered by mark
          value, each with model answer guidance you can open when you are ready.
          Free, and it opens exactly where you are. Getting your own written
          answers AI-marked is a Pro feature.
        </p>
        <Link
          href={page.sectionId ? `/?section=${page.sectionId}` : modelAnswersPath(page)}
          className="seo-cta-button"
        >
          Practise {page.topic} &rarr;
        </Link>
      </div>
    </div>
  );
}
