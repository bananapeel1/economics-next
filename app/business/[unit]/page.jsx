/**
 * `/business/<topic>-model-answers` — all ten Business model-answer pages, one route.
 *
 * Packet 12.3, E018. The Economics twin is `app/economics/[unit]/page.jsx` and carries the full
 * reasoning, including why the param is named `unit` when it holds a page slug (the sibling route
 * `[unit]/[topic]` already owns the slug name at this segment, and Next.js refuses a second name).
 *
 * `the-market-model-answers` is one of these ten and has no model answers: IAL Business 1.3.2 is
 * demand, supply and the elasticities, and after packet 12.1's E005 no answer in the bank examines
 * them. It keeps its page and its honest empty state, and it is absent from
 * `SECTION_MODEL_ANSWERS_LINKS`, so the Practice tab does not offer a link to an empty page. Both
 * halves are deliberate.
 */

import { notFound } from 'next/navigation';
import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';
import { modelAnswersMetadata, modelAnswersParams, modelAnswersProps } from '@/lib/model-answers-route';

export function generateStaticParams() {
  return modelAnswersParams('business');
}

export async function generateMetadata({ params }) {
  const { unit: slug } = await params;
  return modelAnswersMetadata('business', slug) || {};
}

export default async function BusinessModelAnswersRoute({ params }) {
  const { unit: slug } = await params;
  const props = modelAnswersProps('business', slug);
  if (!props) notFound();
  return <SectionModelAnswersPage {...props} />;
}
