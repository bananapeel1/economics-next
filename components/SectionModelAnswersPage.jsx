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
 *   3. (Packet 12.3-12.4 printed the page's spec coverage here; packet 12.85, E071, removed it from every
 *      page as internal machinery. `npm run spec-coverage` still reports it.)
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
 * The FAQ schema and the back link are packet 12.1's and are kept; its "now try one yourself" CTA is one
 * quiet line since packet 12.85 (E071).
 */

import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { SECTION_MODEL_ANSWERS_FAQ } from '@/data/modelAnswersData';
import { modelAnswersHeading, modelAnswersPath } from '@/data/modelAnswerPages';
import { aoListFor } from '@/lib/exam-item';
import { timeLabel } from '@/lib/exam-timing';
import { midBandAttempt, pagePanelItem } from '@/lib/mid-band-answer';
import MarkedScriptAttempt from '@/components/MarkedScriptAttempt';
import PracticeShell from '@/components/PracticeShell';
import { stimulusFor, figuresIn, withFigures, linkFigures, parseBlocks } from '@/lib/stimulus';
import {
  hasShell, isShellItem, isPointsItem, questionSets, stemParts, focusRowsFor,
  hasPaper, paperSets, sectionARow, objectiveOf, objectiveGroups, pointsVerdict, levelsScheme, levelsVerdict,
} from '@/lib/practice-shell';
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

/* ── The practice shell: the exam paper and the examiner's marked script (packet 12.85) ───────────

   A page renders the shell IF AND ONLY IF one of its written items carries a marked script, by points
   (`criteria`) or by levels (`levels`). After packet 12.8 that is Economics 1.3.5 alone; every other
   page takes the untouched path at the bottom of this file, changed only by E071's removals.

   Everything the shell prints about content is prepared here, on the server, from the item itself:
   the stem cut around `keyTerm` (12.75, E052), the paper's sections, numbers and instructions from
   `audit/raw/ial-paper-structure.json` (12.8, E061), figures derived from the extract's own text and
   linked into the model answer by exact occurrence (12.75, E047), the objective headings and the
   exemplar's margin letters and verdict line from the criteria (E067), and the level bands from the
   structure file (E068). The client component decides only what is visible. */

// Ruled lines of answer space by tariff (E066): what a WEC11 answer booklet gives, rounded to the paper.
const ANSWER_LINES = { 2: 4, 4: 6, 6: 9, 8: 12, 14: 18, 20: 24 };

function shellItem(item, page, figures, numbering) {
  const texts = figures.map((f) => f.text);
  const points = isPointsItem(item);
  const criteria = points
    ? item.criteria.map((c) => ({
        id: c.id, band: c.band, text: c.text, marks: Number(c.marks) || 0, seg: c.seg,
        segRole: c.segRole === 'missed' ? 'missed' : 'earned',
      }))
    : [];
  // The margin beside each paragraph of the exemplar: the objectives its sentences earn (points), or
  // the strands they count towards (levels). A paragraph whose only criteria are ones the model
  // answer MISSES shows what is missing there instead.
  const earnedBySeg = new Map();
  const missedBySeg = new Map();
  for (const c of criteria) {
    const m = c.segRole === 'missed' ? missedBySeg : earnedBySeg;
    if (!m.has(c.seg)) m.set(c.seg, []);
    m.get(c.seg).push(objectiveOf(c.band).abbr);
  }
  const uniq = (xs) => [...new Set(xs)];
  return {
    id: item.id,
    n: numbering.n,
    part: numbering.part,
    label: numbering.label,
    railLabel: numbering.railLabel,
    short: numbering.short,
    commandWord: item.commandWord,
    marks: Number(item.marks) || 0,
    question: item.question,
    stem: stemParts(item.question, item.keyTerm),
    lines: ANSWER_LINES[Number(item.marks)] || 8,
    marking: points ? 'points' : 'levels',
    groups: points ? objectiveGroups(criteria) : [],
    scheme: points ? null : levelsScheme(item),
    verdict: points ? pointsVerdict(item) : levelsVerdict(item),
    levelsVerdict: points ? null : (item.verdict || []).map((v) => ({ strand: v.strand, level: v.level, mark: v.mark })),
    script: (item.script || []).map((p) => {
      const segs = p.segments || [];
      const earned = points ? uniq(segs.flatMap((sg) => earnedBySeg.get(sg.id) || [])) : uniq(segs.map((sg) => sg.strand).filter(Boolean));
      const missed = points ? uniq(segs.flatMap((sg) => missedBySeg.get(sg.id) || [])) : [];
      return {
        id: p.id,
        margin: earned,
        missed: missed.filter((x) => !earned.includes(x)),
        segments: segs.map((sg) => ({
          id: sg.id,
          html: texts.length ? linkFigures(sg.html, texts) : sg.html,
          note: sg.note || '',
          strand: sg.strand || null,
        })),
      };
    }),
    examinerHtml: item.examinerCommentary || '',
    // Packet 12.8, E061. A short answer's or an essay's own context, as blocks (a sentence or a small
    // table), shown above the stem in every mode. A Draw item is sketched on paper and self-marked;
    // its model answer is the diagram named by `diagram`, a file in public/diagrams/ (validator R9).
    context: item.paper && typeof item.paper.context === 'string' && item.paper.context.trim()
      ? parseBlocks(item.paper.context)
      : null,
    draw: item.commandWord === 'Draw',
    diagram: item.diagram && item.diagram.src
      ? { src: String(item.diagram.src), alt: String(item.diagram.alt || ''), width: Number(item.diagram.width) || null, height: Number(item.diagram.height) || null }
      : null,
    focusRows: figures.length ? focusRowsFor(item, figures) : [],
  };
}

function shellFor(page, written, heading, subjectLabel) {
  const items = written.filter(isShellItem);
  // Packet 12.8, E061: a page whose items carry `paper` is laid out as its paper's sections; every
  // other shell page keeps 12.75's grouping by extract.
  const paperShaped = hasPaper(items);
  const grouped = paperShaped
    ? paperSets(items, { subject: page.subject, unit: page.unit })
    : questionSets(items);
  // Question numbers run through the paper's written sections in order, as the v8 design numbers
  // them (Section B 1-5, the data question 6 (a)-(e), the essays 7 and 8). "More practice" is not
  // part of the paper and is not numbered.
  let q = 0;
  const sets = grouped.map((set) => {
    const stim = set.stimulus ? stimulusFor(set.stimulus) : null;
    const figures = stim ? figuresIn(stim.blocks) : [];
    const inPaper = paperShaped && set.id !== 'more';
    let dataNo = null;
    const shaped = set.items.map((it, i) => {
      let numbering;
      // `label` is what the paper prints beside the stem ("6 (a)", then "(b)"); `railLabel` the outline's
      // shorter form; `short` names the question on its own ("6(c)", "3"), for the pager and phone bar.
      if (!inPaper) numbering = { n: '', part: null, label: '', railLabel: '', short: it.commandWord };
      else if (set.paperKind === 'data_question') {
        if (dataNo === null) { q += 1; dataNo = String(q); }
        const part = `(${String(it.paper.part || '')})`;
        numbering = { n: i === 0 ? dataNo : '', part, label: i === 0 ? `${dataNo} ${part}` : part, railLabel: i === 0 ? `${dataNo}${part}` : part, short: `${dataNo}${part}` };
      } else {
        q += 1;
        numbering = { n: String(q), part: null, label: String(q), railLabel: String(q), short: String(q) };
      }
      return shellItem(it, page, figures, numbering);
    });
    const total = Number.isFinite(set.total) ? set.total : shaped.reduce((n, it) => n + it.marks, 0);
    return {
      id: set.id,
      kind: stim ? 'extract' : 'standalone',
      paperKind: set.paperKind || null,
      inPaper,
      label: set.label,
      what: set.what || '',
      total,
      instructions: set.instructions || [],
      choice: set.choice || null,
      closing: set.paperKind === 'data_question' && dataNo ? `(Total for Question ${dataNo} = ${total} marks)` : '',
      // The extract's own name ("Extract A") for the booklet and the phone tab.
      extractLabel: stim ? (paperShaped ? 'Extract A' : set.label) : null,
      extract: stim ? { title: stim.title, blocks: withFigures(stim.blocks) } : null,
      items: shaped,
    };
  });
  const paperTotal = sets.filter((s) => s.inPaper).reduce((n, s) => n + s.total, 0);
  const topic = heading.startsWith(page.topic) ? page.topic : heading;
  const appHref = page.sectionId ? `/?section=${page.sectionId}` : '/';
  return {
    pageKey: modelAnswersPath(page),
    heading,
    headingLead: topic,
    headingRest: heading.slice(topic.length),
    crumbs: [
      { label: subjectLabel, href: `/${page.subject}` },
      { label: `Unit ${page.unit}`, href: page.backLink.href },
      { label: page.sectionNumber, href: null },
    ],
    appHref,
    appLine: `Open ${page.topic} in the Revvy Learn app`,
    sectionA: paperShaped
      ? sectionARow({ subject: page.subject, unit: page.unit, sectionId: page.sectionId, topic: page.topic })
      : null,
    paperTotal,
    sets,
  };
}

function ShellPage({ page, written, heading, subjectLabel, faqSchema, quizSchema }) {
  const shell = shellFor(page, written, heading, subjectLabel);
  // Items without a marked script on a shell page keep the old rendering, below the shell. None today.
  const rest = written.filter((a) => !isShellItem(a));
  // Packet 12.85, E070: no `rl-night` and no `resource-page` (its dark ground and padding) here. The
  // shell is paper by default, themes itself and fills the page.
  return (
    <div className="ps-page">
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

      <PracticeShell shell={shell}>
        {rest.length > 0 && (
          <div className="lab-page">
            <section className="lab-block" aria-labelledby="lab-written">
              <div className="lab-block-head">
                <h2 id="lab-written">More exam questions</h2>
              </div>
              <ol className="lab-item-list">
                {rest.map((item) => (
                  <li key={item.id} className="lab-item">
                    <Meta item={item} subject={page.subject} unit={page.unit} />
                    <p className="lab-item-question">{item.question}</p>
                    <MarkScheme rows={item.markScheme} />
                    <ModelAnswer item={item} />
                    <ExaminerCommentary html={item.examinerCommentary} />
                  </li>
                ))}
              </ol>
            </section>
          </div>
        )}
      </PracticeShell>
    </div>
  );
}

export default function SectionModelAnswersPage({ page, written = [], dataResponse, stimulus = null }) {
  const subjectLabel = SUBJECT_LABEL[page.subject] || page.subject;
  const heading = modelAnswersHeading(page, { hasAnswers: written.length > 0 });
  // E053, every page (founder, 26 Sep 2026): no panel unless the top item's scheme is level-banded.
  const midBandItem = pagePanelItem(written);
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

  if (hasShell(written)) {
    return (
      <ShellPage
        page={page}
        written={written}
        heading={heading}
        subjectLabel={subjectLabel}
        faqSchema={faqSchema}
        quizSchema={quizSchema}
      />
    );
  }

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
        {/* Packet 12.85, E071: the "N written questions · M marks" line, the time-estimate method
            note and the coverage panel (spec ids, "This page examines…") are internal machinery and
            are gone from every page. Coverage stays an internal report: `npm run spec-coverage`. */}
        <header className="lab-header">
          <p className="lab-crumbs">
            {subjectLabel} &middot; {page.unitCode} &middot; Unit {page.unit} &middot; {page.sectionNumber}
          </p>
        </header>

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

        {/* E071: the data-response card becomes one quiet link line. */}
        {dataResponse && (
          <p className="lab-quiet-link">
            <Link href={dataResponse.href}>{`Data response: ${dataResponse.title}`}</Link>
          </p>
        )}

        {/* E071: the gradient "Now try one yourself" block becomes one quiet line to the topic in the
            app, keeping the ?section= form so the click is measurable. It names the topic, not the
            Practice tab: the app has no deep link into a tab (E056). */}
        <p className="lab-quiet-link">
          <Link href={page.sectionId ? `/?section=${page.sectionId}` : '/'}>{`Open ${page.topic} in the Revvy Learn app`}</Link>
        </p>
      </div>
    </div>
  );
}
