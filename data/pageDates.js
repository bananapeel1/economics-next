/**
 * When each fixed page last changed, for the sitemap's <lastmod>.
 *
 * The sitemap used to stamp every URL with the build time, so all 104 URLs claimed to change on every
 * deploy and Google learns to ignore lastmod from a site that does that. Topic pages now use their
 * content's real `published_at`, guides their `updated` field, and the fixed pages the dates below
 * (initially the date their source last changed on main).
 *
 * Bump a date when you change what that page says. A page with no entry gets no lastmod, which is
 * better than a false one.
 */
export const PAGE_DATES = {
  '/': '2026-09-26',
  '/glossary': '2026-09-13',
  '/command-words': '2026-09-26',
  '/past-papers': '2026-09-26',
  '/model-answers': '2026-09-26',
  '/contact': '2026-09-13',
  '/pdfs': '2026-09-12',
  '/topic-links': '2026-09-12',
  '/ial-revision': '2026-09-26',
  '/ial-revision/exam-series': '2026-09-26',
  '/ial-revision/june-2026': '2026-09-26',
  '/ial-revision/january-2027': '2026-09-26',
  '/ial-revision/june-2027': '2026-09-26',
  '/economics': '2026-09-26',
  '/economics/unit-1': '2026-09-26',
  '/economics/unit-2': '2026-09-26',
  '/economics/unit-3': '2026-09-26',
  '/economics/unit-4': '2026-09-26',
  '/economics/market-failure': '2026-09-21',
  '/economics/macroeconomic-objectives': '2026-09-21',
  '/economics/globalisation': '2026-09-21',
  '/economics/aggregate-demand': '2026-09-13',
  '/business': '2026-09-26',
  '/business/unit-1': '2026-09-26',
  '/business/unit-2': '2026-09-26',
  '/business/unit-3': '2026-09-26',
  '/business/unit-4': '2026-09-26',
  '/guides': '2026-09-16',
};

/** All model-answer pages share one template and data file; bump when either changes. */
export const MODEL_ANSWERS_UPDATED = '2026-09-26';
