import { createAnonClient } from '@/lib/supabase-anon';
import guidesData from '@/data/guidesData';
import { MODEL_ANSWER_PAGES, modelAnswersPath } from '@/data/modelAnswerPages';
import { PAGE_DATES, MODEL_ANSWERS_UPDATED } from '@/data/pageDates';

export default async function sitemap() {
  const baseUrl = 'https://revvylearn.com';
  const supabase = createAnonClient();
  // A real date or none at all: see data/pageDates.js.
  const at = (path) => (PAGE_DATES[path] ? { lastModified: PAGE_DATES[path] } : {});

  // Fetch all sections with their unit number and subject slug
  const [{ data: sections }, { data: published }] = await Promise.all([
    supabase.from('sections').select('id, unit_id, units(number, subject_id, subjects(slug))').order('sort_order'),
    supabase.from('section_content').select('section_id, published_at'),
  ]);
  const publishedAt = Object.fromEntries((published || []).map(r => [r.section_id, r.published_at]));

  // Build dynamic topic page URLs
  const topicPages = (sections || []).map(s => ({
    url: `${baseUrl}/${s.units.subjects.slug}/unit-${s.units.number}/${s.id}`,
    ...(publishedAt[s.id] ? { lastModified: publishedAt[s.id] } : {}),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    // ── Core pages ──
    { url: `${baseUrl}/`, ...at('/'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/glossary`, ...at('/glossary'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/command-words`, ...at('/command-words'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/past-papers`, ...at('/past-papers'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/model-answers`, ...at('/model-answers'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, ...at('/contact'), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/pdfs`, ...at('/pdfs'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/topic-links`, ...at('/topic-links'), changeFrequency: 'monthly', priority: 0.7 },

    // ── IAL revision pages ──
    { url: `${baseUrl}/ial-revision`, ...at('/ial-revision'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/ial-revision/exam-series`, ...at('/ial-revision/exam-series'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ial-revision/june-2026`, ...at('/ial-revision/june-2026'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/ial-revision/january-2027`, ...at('/ial-revision/january-2027'), changeFrequency: 'monthly', priority: 0.7 },

    // ── Economics landing pages ──
    { url: `${baseUrl}/economics`, ...at('/economics'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/economics/unit-1`, ...at('/economics/unit-1'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/economics/unit-2`, ...at('/economics/unit-2'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/economics/unit-3`, ...at('/economics/unit-3'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/economics/unit-4`, ...at('/economics/unit-4'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/economics/market-failure`, ...at('/economics/market-failure'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/economics/macroeconomic-objectives`, ...at('/economics/macroeconomic-objectives'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/economics/globalisation`, ...at('/economics/globalisation'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/economics/aggregate-demand`, ...at('/economics/aggregate-demand'), changeFrequency: 'monthly', priority: 0.8 },

    // ── Business landing pages ──
    { url: `${baseUrl}/business`, ...at('/business'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/business/unit-1`, ...at('/business/unit-1'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/business/unit-2`, ...at('/business/unit-2'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/business/unit-3`, ...at('/business/unit-3'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/business/unit-4`, ...at('/business/unit-4'), changeFrequency: 'weekly', priority: 0.9 },

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
      lastModified: MODEL_ANSWERS_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),

    // ── Guides ──
    { url: `${baseUrl}/guides`, ...at('/guides'), changeFrequency: 'weekly', priority: 0.8 },
    ...guidesData.map(guide => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      ...(guide.updated || guide.published ? { lastModified: guide.updated || guide.published } : {}),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),

    // ── Dynamic topic pages (from Supabase) ──
    ...topicPages,
  ];
}
