/**
 * `/economics/<topic>-model-answers` — all twenty-two Economics model-answer pages, one route.
 *
 * Packet 12.3, E018. Twelve hand-written shells under `app/economics/` used to do this, each a
 * `metadata` object and a component call differing only in its strings, and ten Economics sections
 * that already had model answers had no page at all because nobody had typed a thirteenth shell.
 * Every page is now a row in `data/modelAnswerPages.js`; adding a row adds the page, its sitemap
 * entry and its Practice-tab link at once.
 *
 * WHY THE PARAM IS CALLED `unit`, WHICH IT IS NOT. `app/economics/[unit]/[topic]/page.jsx` (the
 * signed-in topic route) already owns the dynamic slot at this level, and Next.js refuses two
 * different slug names on the same path segment — `[slug]` beside `[unit]` is a build error, not a
 * preference. So this file lives inside the existing `[unit]` folder and the param carries a name
 * that describes its sibling's use of the segment, not its own. It is read straight into `slug`
 * below and never used as a unit anywhere.
 *
 * `/economics/unit-1`, `/economics/market-failure` and the other static pages are unaffected: a
 * literal segment beats a dynamic one in Next's router. Anything else this route is handed that is
 * not a model-answer page 404s, exactly as it did when the folder did not exist.
 */

import { notFound } from 'next/navigation';
import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';
import { modelAnswersMetadata, modelAnswersParams, modelAnswersProps } from '@/lib/model-answers-route';

export function generateStaticParams() {
  return modelAnswersParams('economics');
}

export async function generateMetadata({ params }) {
  const { unit: slug } = await params;
  return modelAnswersMetadata('economics', slug) || {};
}

export default async function EconomicsModelAnswersRoute({ params }) {
  const { unit: slug } = await params;
  const props = modelAnswersProps('economics', slug);
  if (!props) notFound();
  return <SectionModelAnswersPage {...props} />;
}
