import { createAnonClient } from '@/lib/supabase-anon';
import guidesData from '@/data/guidesData';
import { MODEL_ANSWER_PAGES, modelAnswersPath } from '@/data/modelAnswerPages';

export default async function sitemap() {
  const baseUrl = 'https://revvylearn.com';
  const now = new Date().toISOString();
  const supabase = createAnonClient();

  // Fetch all sections with their unit number and subject slug
  const { data: sections } = await supabase
    .from('sections')
    .select('id, unit_id, units(number, subject_id, subjects(slug))')
    .order('sort_order');

  // Build dynamic topic page URLs
  const topicPages = (sections || []).map(s => ({
    url: `${baseUrl}/${s.units.subjects.slug}/unit-${s.units.number}/${s.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    // ── Core pages ──
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/glossary`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/command-words`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/past-papers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/model-answers`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/pdfs`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/topic-links`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // ── IAL revision pages ──
    { url: `${baseUrl}/ial-revision`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/ial-revision/exam-series`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ial-revision/june-2026`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/ial-revision/january-2027`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // ── Economics landing pages ──
    { url: `${baseUrl}/economics`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/economics/unit-1`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/economics/unit-2`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/economics/unit-3`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/economics/unit-4`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/economics/market-failure`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/economics/macroeconomic-objectives`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/economics/globalisation`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/economics/aggregate-demand`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // ── Business landing pages ──
    { url: `${baseUrl}/business`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/business/unit-1`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/business/unit-2`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/business/unit-3`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/business/unit-4`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },

    // ── Section model answers, derived ──
    // Packet 12.3, E020. This was twenty-two hand-typed lines in two blocks, and it had already
    // drifted from the routes it claimed to list: the ten Economics Unit 3 and 4 sections that had
    // model answers and no page were missing from both. Every model-answer page is now a row in
    // `data/modelAnswerPages.js`, which is also what `generateStaticParams` walks in
    // `app/economics/[unit]/page.jsx` and `app/business/[unit]/page.jsx` — so a page and its
    // sitemap entry cannot exist without each other, and adding a section needs no second edit
    // here. Thirty-two rows today: 22 Economics, 10 Business.
    ...MODEL_ANSWER_PAGES.map(page => ({
      url: `${baseUrl}${modelAnswersPath(page)}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),

    // ── Guides ──
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...guidesData.map(guide => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),

    // ── Dynamic topic pages (from Supabase) ──
    ...topicPages,
  ];
}
