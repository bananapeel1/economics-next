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

export const BASE_URL = 'https://revvylearn.com';

/**
 * The written bank for a page: the model answers for its section, valid IAL tariffs only.
 *
 * NOT `section_practice`. Four of market-failure's five practice rows carry a tariff that does not
 * exist in IAL Economics (`Define 4`, `Explain 6`, `Analyse 10`, `Outline 4` — `lib/ial-marking.js`),
 * and a page whose whole argument is that tariffs matter cannot display them. Packet 12.2, E010.
 */
export function writtenFor(page) {
  return MODEL_ANSWERS.filter(
    (a) => a.subject === page.subject && a.sectionNumber === page.sectionNumber,
  ).filter((a) => isValidTariff(page.subject, a.commandWord, a.marks));
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
  };
}

/**
 * The page's `metadata`, or `null` for a slug this route does not own.
 *
 * `alternates.canonical` is the ROOT-RELATIVE path and `openGraph.url` the absolute one, exactly as
 * the twenty-two deleted shells wrote them — the canonicals of every pre-existing page are byte for
 * byte what they were. Only the titles change, and they change by one rule for all 32 pages (E021).
 */
export function modelAnswersMetadata(subject, slug) {
  const page = modelAnswerPageFor(subject, slug);
  if (!page) return null;
  const path = modelAnswersPath(page);
  return {
    title: modelAnswersMetaTitle(page),
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title: modelAnswersOgTitle(page),
      description: page.ogDescription,
      url: `${BASE_URL}${path}`,
    },
  };
}

/** `generateStaticParams` for one subject. The param is named `unit` for the reason in the routes. */
export function modelAnswersParams(subject) {
  return MODEL_ANSWER_PAGES.filter((p) => p.subject === subject).map((p) => ({ unit: p.slug }));
}
