/**
 * Everything the two model-answer routes need, in one place.
 *
 * Packet 12.3, E016/E017/E018/E021. `app/economics/[unit]/page.jsx` and `app/business/[unit]/page.jsx`
 * are the same route twice over — Next.js needs one folder per top-level segment — so the work lives
 * here and each route file is a subject-bound shell. A bug fixed here is fixed for both subjects;
 * before this packet it would have had to be fixed in twenty-two files.
 *
 * NOTHING HERE TOUCHES SUPABASE (rule 2), and nothing opens the t=0 section dump (E017). The
 * two files it does read are read through `lib/spec-coverage.js` and `lib/lab-data-response.js`,
 * both of which already guard their own `readFileSync` and degrade to "no number" / "no link"
 * rather than throwing. `next.config.mjs` names both routes in `outputFileTracingIncludes` so those
 * files are deployed beside them — a green local build is not evidence that Vercel has them.
 */

import {
  MODEL_ANSWER_PAGES,
  modelAnswerPageFor,
  modelAnswersMetaTitle,
  modelAnswersOgTitle,
  modelAnswersPath,
} from '@/data/modelAnswerPages';
import { MODEL_ANSWERS } from '@/data/modelAnswersData';
import { isValidTariff } from '@/lib/practice-tariffs';
import { sectionCoverage, describeLeaves, loadOracle } from '@/lib/spec-coverage';
import { dataResponseFor } from '@/lib/lab-data-response';
import { stimulusFor } from '@/lib/stimulus';
import { paperFor } from '@/lib/ial-paper';

export const BASE_URL = 'https://revvylearn.com';

/**
 * The written bank for a page: the model answers for its section, valid IAL tariffs only.
 *
 * NOT `section_practice`. Four of market-failure's five practice rows carry a tariff that does not
 * exist in IAL Economics (`Define 4`, `Explain 6`, `Analyse 10`, `Outline 4` — `lib/ial-marking.js`),
 * and a page whose whole argument is that tariffs matter cannot display them. Packet 12.2, E010.
 */
export function writtenFor(page) {
  const bank = MODEL_ANSWERS.filter(
    (a) => a.subject === page.subject && a.sectionNumber === page.sectionNumber,
  ).filter((a) => isValidTariff(page.subject, a.commandWord, a.marks));

  /* Packet 12.7, E043. The questions set on the page's extract come first, in tariff order, and the
     rest follow in bank order, untouched. DECISIONS 2026-09-25: 1.3.5 "leads with the extract's set".
     Without this the page renders in array order, and `MODEL_ANSWERS` is BASE then EXPANSION, so a
     BASE item (the generic 1.3.5 4-mark) would always sit above the extract's questions.

     A partition, not a sort of the whole list: a page with no item carrying `stimulus` — every page
     but 1.3.5 today — returns exactly the list it returned before. */
  /* Packet 12.8, E061. On a page whose items carry `paper`, the order is the paper's: its sections in
     the order `audit/raw/ial-paper-structure.json` lists them, a data question's parts by letter,
     everything else in bank order; items without `paper` follow. This is the order the JSON-LD
     `Quiz` lists them in, and the order the shell reads. A page with no `paper` item — every page but
     1.3.5 — never reaches this branch. */
  const shaped = bank.filter((a) => a.paper && typeof a.paper === 'object');
  if (shaped.length) {
    const paper = paperFor(page.subject, page.unit);
    const order = paper ? paper.sections.map((s) => s.id) : [];
    const rank = (a) => {
      const i = order.indexOf(a.paper.section);
      return i === -1 ? order.length : i;
    };
    const part = (a) => (a.paper.kind === 'data_question' ? String(a.paper.part || '') : '');
    const sorted = shaped
      .map((a, n) => ({ a, n }))
      .sort((x, y) => rank(x.a) - rank(y.a) || part(x.a).localeCompare(part(y.a)) || x.n - y.n)
      .map((x) => x.a);
    return [...sorted, ...bank.filter((a) => !shaped.includes(a))];
  }

  const onExtract = bank.filter((a) => a.stimulus).sort((a, b) => Number(a.marks) - Number(b.marks));
  if (!onExtract.length) return bank;
  return [...onExtract, ...bank.filter((a) => !a.stimulus)];
}

/**
 * Coverage over THIS PAGE'S questions — deliberately narrower than `npm run spec-coverage`'s
 * per-section row, which also counts the `section_practice` rows this page refuses to display.
 * Same function, different item list; see `lib/spec-coverage.js`.
 */
export function coverageFor(page, written) {
  const oracle = loadOracle();
  const cov = sectionCoverage({
    subject: page.subject,
    topic: page.sectionNumber,
    slug: page.sectionId,
    items: written.map((a) => ({
      bank: 'modelAnswers',
      ref: a.id,
      command: a.commandWord,
      commandWord: a.commandWord,
      marks: a.marks,
      question: a.question,
      specItems: a.specItems,
      kind: a.kind,
      ao: a.ao,
      stimulusRef: a.stimulusRef,
      subject: page.subject,
    })),
  });

  return {
    available: oracle.available && cov.leaves > 0,
    questions: cov.questions,
    untagged: cov.untagged,
    examined: cov.examined,
    leaves: cov.leaves,
    pct: cov.pct,
    examinedLeaves: describeLeaves(cov.examinedIds),
    unexaminedLeaves: describeLeaves(cov.unexamined),
  };
}

/**
 * The extract this page's questions are answered from, or null.
 *
 * Packet 12.6, E035. One extract per page, taken from the `stimulus` its questions name. The page
 * renders it once, in the flow, above the questions — reprinting it per question is what packet 41's
 * walkthrough rejected on `external-influences` (the source card printed twelve times).
 *
 * If two questions on one page ever name DIFFERENT extracts this returns the first and the page
 * shows one, which would be wrong; today no page does, and R6 in
 * `audit/scripts/validate-model-answers.mjs` is where that would be caught if someone tried. It is
 * a real limit of this packet and it is recorded rather than papered over.
 */
export function stimulusForPage(written) {
  const named = written.map((a) => a.stimulus).filter(Boolean);
  if (!named.length) return null;
  return stimulusFor(named[0]);
}

/** Everything the component needs, or null when the slug is not a model-answer page. */
export function modelAnswersProps(subject, slug) {
  const page = modelAnswerPageFor(subject, slug);
  if (!page) return null;
  const written = writtenFor(page);
  return {
    page,
    written,
    coverage: coverageFor(page, written),
    dataResponse: dataResponseFor(subject, page.sectionId),
    stimulus: stimulusForPage(written),
  };
}

/**
 * The page's `metadata`, or `null` for a slug this route does not own.
 *
 * `alternates.canonical` is the ROOT-RELATIVE path and `openGraph.url` the absolute one, exactly as
 * the twenty-two deleted shells wrote them — the canonicals of every pre-existing page are byte for
 * byte what they were. Only the titles change, and they change by one rule for all 32 pages (E021),
 * with the empty page taking the rule's second form (E027) rather than an exception of its own.
 */
export function modelAnswersMetadata(subject, slug) {
  const page = modelAnswerPageFor(subject, slug);
  if (!page) return null;
  const path = modelAnswersPath(page);
  // Asked of the bank, not remembered here (E027): a section that gains its first model answer
  // gains the full title in the same edit, and one that has none can never claim them by mistake.
  const opts = { hasAnswers: writtenFor(page).length > 0 };
  return {
    title: modelAnswersMetaTitle(page, opts),
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title: modelAnswersOgTitle(page, opts),
      description: page.ogDescription,
      url: `${BASE_URL}${path}`,
    },
  };
}

/** `generateStaticParams` for one subject. The param is named `unit` for the reason in the routes. */
export function modelAnswersParams(subject) {
  return MODEL_ANSWER_PAGES.filter((p) => p.subject === subject).map((p) => ({ unit: p.slug }));
}
