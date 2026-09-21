/**
 * `/lab/exam-practice/<section>` — the lab exam-practice route. Packet 12.2, E009 and E015.
 *
 * NOINDEX, NOFOLLOW, and absent from `app/sitemap.js`, which is a hand-maintained array plus a
 * database query for topic pages and has no mechanism that could pick this route up. Nothing in the
 * app links to it. It exists so the founder can see a question-first page against real data before
 * any live page changes.
 *
 * IT READS FILES, NEVER THE DATABASE. Two sources, both on disk:
 *   - `audit/content-sections/<subject>__<slug>.json`, the t=0 dump of the published tables, for the
 *     section's metadata, its MCQ bank and the count of its `section_practice` rows;
 *   - `data/modelAnswersData.js` (+ `modelAnswersExpansion.js`) for the written questions.
 * No Supabase client is constructed anywhere in this tree, so this route cannot be the thing that
 * breaks a Vercel build (rule 2), and the page can say honestly where every number came from.
 *
 * The t=0 dump is a LOWER BOUND on the live bank, not a copy of it: packet 0 and packet 13 made
 * in-place edits that landed in the database and no file records. The page says which file it read.
 *
 * WHY THE WRITTEN BANK IS NOT `section_practice`. Four of market-failure's five practice rows carry
 * a tariff that does not exist in IAL Economics. They are counted and named on the page, and not
 * displayed. See the packet 12.2 spec in `audit/NEXT.md`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import SectionExamPracticePage from '@/components/SectionExamPracticePage';
import { MODEL_ANSWERS } from '@/data/modelAnswersData';
import { sectionCoverage, describeLeaves, loadOracle } from '@/lib/spec-coverage';
import { isValidTariff } from '@/lib/practice-tariffs';
import { practiceCommand } from '@/lib/ial-commands';
import { dataResponseFor } from '@/lib/lab-data-response';

/**
 * How many of the section's MCQs the page ships.
 *
 * Not decoration. Marking in the browser puts the answer key in the browser, and `section_quiz` is
 * the paid bank that packet 12's F086 is about, so the one mitigation available that is not theatre
 * is to ship less of it. Five is enough to show the mechanic at 390px; the page states the bank's
 * real size beside it so the sample cannot read as the whole thing.
 */
const QUICK_CHECK_SAMPLE = 5;

const SECTIONS_DIR = path.join(process.cwd(), 'audit', 'content-sections');

/** The `<subject>__<slug>.json` bundle for a slug, or null. Slug alone; the subject is discovered. */
function bundleFor(slug) {
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) return null;
  let names;
  try {
    names = fs.readdirSync(SECTIONS_DIR);
  } catch {
    return null;
  }
  const name = names.find((n) => n.endsWith(`__${slug}.json`));
  if (!name) return null;
  try {
    const json = JSON.parse(fs.readFileSync(path.join(SECTIONS_DIR, name), 'utf8'));
    return { json, file: `audit/content-sections/${name}`, subject: name.split('__')[0] };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { section: slug } = await params;
  const bundle = bundleFor(slug);
  const title = bundle?.json?.meta?.title || slug;
  return {
    title: `Lab — exam practice — ${title}`,
    // The object form, not the `'noindex, nofollow'` string the four other private routes use
    // (`app/settings`, `app/signup`, `app/login`, `app/fun`). Both are valid Next Metadata; the
    // packet spec names this one, and it renders the same `<meta name="robots">` content.
    robots: { index: false, follow: false },
  };
}

export default async function LabExamPracticeRoute({ params }) {
  const { section: slug } = await params;
  const bundle = bundleFor(slug);
  if (!bundle) notFound();

  const meta = bundle.json.meta || {};
  const subject = meta.subject || bundle.subject;
  const section = {
    slug,
    subject,
    title: meta.title || slug,
    number: meta.number || '',
    unit: Number(meta.unit) || 1,
    unitCode: meta.unitCode || '',
  };

  /* Written questions: the model-answer bank, filtered to this section, valid tariffs only. */
  const written = MODEL_ANSWERS.filter(
    (a) => a.subject === subject && a.sectionNumber === section.number,
  ).filter((a) => isValidTariff(subject, a.commandWord, a.marks));

  /* Coverage over THIS PAGE'S questions — deliberately narrower than `npm run spec-coverage`'s
     per-section row, which also counts the `section_practice` rows this page refuses to display.
     Same function, different item list; see lib/spec-coverage.js. */
  const oracle = loadOracle();
  const cov = sectionCoverage({
    subject,
    topic: section.number,
    slug,
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
      subject,
    })),
  });

  const coverage = {
    available: oracle.available && cov.leaves > 0,
    questions: cov.questions,
    untagged: cov.untagged,
    examined: cov.examined,
    leaves: cov.leaves,
    pct: cov.pct,
    examinedLeaves: describeLeaves(cov.examinedIds),
    unexaminedLeaves: describeLeaves(cov.unexamined),
  };

  /* Quick Check. `correctIndex` is renamed to `answer` on the way out only because the component
     reads `answer`; it is the same value and the page does not pretend otherwise — see the header
     of components/lab/LabQuickCheck.jsx. */
  const bank = Array.isArray(bundle.json.quiz) ? bundle.json.quiz : [];
  const quiz = {
    bankSize: bank.length,
    sample: bank.slice(0, QUICK_CHECK_SAMPLE).map((q) => ({
      question: q.question,
      options: q.options,
      answer: q.correctIndex,
      explanation: q.explanation,
    })),
  };

  const practice = Array.isArray(bundle.json.practice) ? bundle.json.practice : [];
  const provenance = {
    bundle: bundle.file,
    practiceRows: practice.length,
    invalidTariffs: practice.filter(
      (p) => !isValidTariff(subject, practiceCommand({ command: p.command, question: p.question }), p.marks),
    ).length,
  };

  return (
    <SectionExamPracticePage
      section={section}
      written={written}
      quiz={quiz}
      coverage={coverage}
      dataResponse={dataResponseFor(subject, slug)}
      provenance={provenance}
    />
  );
}
