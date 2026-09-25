import fs from 'node:fs';
const ROOT = '/Users/arongijsel/Claude APP/economics-next-remediation';
const shells = JSON.parse(fs.readFileSync(ROOT + '/audit/runs/packet-12.3/shells-extracted.json', 'utf8'));

// unit + unitCode per (subject, sectionNumber), read from the t=0 bundles' own meta — metadata only
// (number/unit/unitCode), never content.
const meta = {};
for (const n of fs.readdirSync(ROOT + '/audit/content-sections')) {
  const j = JSON.parse(fs.readFileSync(ROOT + '/audit/content-sections/' + n, 'utf8'));
  const m = j.meta || {};
  meta[`${n.split('__')[0]}__${m.number}`] = { unit: Number(m.unit), unitCode: m.unitCode, sectionId: n.split('__')[1].replace('.json', '') };
}

const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";

const rows = [];
for (const v of Object.values(shells)) {
  const mk = meta[`${v.subject}__${v.sectionNumber}`];
  rows.push({
    subject: v.subject,
    slug: v.slug,
    sectionNumber: v.sectionNumber,
    sectionId: v.sectionId,
    unit: mk.unit,
    unitCode: mk.unitCode,
    topic: v.title.replace(/\s*Model Answers\s*$/i, '').trim(),
    backHref: v.backHref,
    backLabel: v.backLabel,
    subtitle: v.subtitle,
    description: v.metaDescription,
    ogDescription: v.ogDescription,
    _canonical: v.canonical,
    _ogUrl: v.ogUrl,
  });
}

// The ten Economics sections that already have model answers and had no page. E019.
// Titles are MODEL_ANSWERS_SECTIONS' own; section ids are the app's own section ids.
const NEW = [
  ['3.3.1', 'types-sizes-businesses', 'Types and Sizes of Businesses'],
  ['3.3.2', 'revenue-costs-profits', 'Revenue, Costs and Profits'],
  ['3.3.3', 'market-structures-contestability', 'Market Structures & Contestability'],
  ['3.3.4', 'labour-markets', 'Labour Markets'],
  ['3.3.5', 'government-intervention-firms', 'Government Intervention'],
  ['4.3.1', 'causes-effects-globalisation', 'Causes and Effects of Globalisation'],
  ['4.3.2', 'trade-global-economy', 'Trade and the Global Economy'],
  ['4.3.3', 'balance-payments-exchange-rates', 'Balance of Payments & Exchange Rates'],
  ['4.3.4', 'poverty-inequality', 'Poverty and Inequality'],
  ['4.3.6', 'growth-development', 'Growth and Development'],
];
const UNIT_LABEL = { 3: 'Unit 3: Business Behaviour', 4: 'Unit 4: Developments in the Global Economy' };
for (const [number, sectionId, topic] of NEW) {
  const mk = meta[`economics__${number}`];
  if (mk.sectionId !== sectionId) throw new Error(`section id mismatch for ${number}: ${mk.sectionId} !== ${sectionId}`);
  rows.push({
    subject: 'economics',
    slug: `${sectionId}-model-answers`,
    sectionNumber: number,
    sectionId,
    unit: mk.unit,
    unitCode: mk.unitCode,
    topic,
    backHref: `/economics/unit-${mk.unit}`,
    backLabel: UNIT_LABEL[mk.unit],
    subtitle: `Section ${number} — worked exam questions with mark schemes, model answers and examiner commentary.`,
    description: `Free worked Edexcel IAL Economics exam questions for ${topic} (${number}, Unit ${mk.unit} ${mk.unitCode}). Every question carries its command word, tariff and assessment objectives, with the mark scheme, a model answer and examiner commentary.`,
    ogDescription: `Worked Edexcel IAL Economics ${topic} exam questions with mark schemes and model answers.`,
    _canonical: null,
    _ogUrl: null,
  });
}

// Order: subject, then section number.
rows.sort((a, b) => (a.subject === b.subject ? a.sectionNumber.localeCompare(b.sectionNumber) : a.subject < b.subject ? -1 : 1));

// Canonical check for the 22 that already existed.
for (const r of rows) {
  if (!r._canonical) continue;
  const want = `/${r.subject}/${r.slug}`;
  if (r._canonical !== want) throw new Error(`canonical drift ${r._canonical} !== ${want}`);
  if (r._ogUrl !== `https://revvylearn.com${want}`) throw new Error(`og url drift ${r._ogUrl}`);
}

const body = rows.map((r) => `  {
    subject: ${q(r.subject)},
    slug: ${q(r.slug)},
    sectionNumber: ${q(r.sectionNumber)},
    sectionId: ${q(r.sectionId)},
    unit: ${r.unit},
    unitCode: ${q(r.unitCode)},
    topic: ${q(r.topic)},
    backLink: { href: ${q(r.backHref)}, label: ${q(r.backLabel)} },
    subtitle: ${q(r.subtitle)},
    description: ${q(r.description)},
    ogDescription: ${q(r.ogDescription)},
  },`).join('\n');

const header = `/**
 * Every model-answer page there is — one row per page, and the only place a page is declared.
 *
 * Packet 12.3, E018/E019/E020. Before this file the same 32 pages were declared in three places
 * that could disagree: 22 hand-written route shells under \`app/economics/\` and \`app/business/\`,
 * a hand-listed block of 22 URLs in \`app/sitemap.js\`, and \`SECTION_MODEL_ANSWERS_LINKS\` in
 * \`data/modelAnswersData.js\` (21 entries — the three lists were already out of step by one).
 *
 * WHAT READS THIS FILE, and why there is exactly one table:
 *   - \`app/economics/[unit]/page.jsx\` and \`app/business/[unit]/page.jsx\` — \`generateStaticParams\`
 *     and \`generateMetadata\` (E018);
 *   - \`app/sitemap.js\` — the model-answer block, derived rather than typed (E020);
 *   - \`SECTION_MODEL_ANSWERS_LINKS\` in \`data/modelAnswersData.js\`, which the Practice tab reads —
 *     derived from this table filtered to sections that actually have model answers (E019/E022).
 * Adding a row here therefore adds the page, the sitemap entry and the Practice-tab link at once.
 *
 * THE CANONICALS OF THE 22 PRE-EXISTING PAGES ARE THE OLD ONES, CHARACTER FOR CHARACTER. \`slug\`,
 * \`subtitle\`, \`description\` and \`ogDescription\` were extracted from the deleted route shells by
 * script (\`audit/runs/packet-12.3/shells-extracted.json\`) rather than retyped, and the generator
 * asserted \`/<subject>/<slug>\` against each shell's own \`alternates.canonical\` and \`openGraph.url\`
 * before emitting a row. Titles are NOT carried over: E021 retitles every page, and the rule that
 * builds the title lives in one place (\`modelAnswersPageTitle\` below), not in 32 strings.
 *
 * \`sectionId\` is the app's own section id (\`/?section=<id>\`), which is also the key
 * \`lib/lab-data-response.js\` uses. It is not always the URL slug: IAL Economics 1.3.2 is
 * \`consumer-behaviour-demand\` and its page is \`/economics/demand-model-answers\`.
 *
 * Business 1.3.2 \`the-market\` HAS a row and no model answers. That is deliberate: the page exists
 * and serves the honest empty state, and it is absent from \`SECTION_MODEL_ANSWERS_LINKS\` because
 * that map decides whether the Practice tab offers a link. Do not "fix" either half.
 *
 * Economics 4.3.5 (The Role of the State in the Macroeconomy) and eleven Business sections have no
 * row, because no model answer examines them yet. Writing them is a content packet's job; a row
 * here without content would be a page that ranks for a question it cannot answer.
 */

export const MODEL_ANSWER_PAGES = Object.freeze([
${body}
].map(Object.freeze));

const SUBJECT_LABEL = Object.freeze({ economics: 'Economics', business: 'Business' });

/** The page's path. The canonical of every pre-existing page, unchanged. */
export function modelAnswersPath(page) {
  return \`/\${page.subject}/\${page.slug}\`;
}

/**
 * Topics that two pages of the same subject share, so the heading can say which unit it is.
 * IAL Economics has exactly one such pair today — 1.3.6 and 3.3.5 are both called "Government
 * Intervention" — and two live pages carrying one \`<title>\` is a duplicate-title defect. Computed
 * from the table rather than hand-qualified, so a second collision cannot ship unqualified.
 */
const AMBIGUOUS = new Set(
  MODEL_ANSWER_PAGES.map((p) => \`\${p.subject}|\${p.topic}\`).filter(
    (k, i, all) => all.indexOf(k) !== i,
  ),
);

/**
 * E021's one title rule: "<Topic> — Exam Questions & Model Answers", so the page can rank for the
 * practice-question family and not only for "model answers". The \`<h1>\`, the metadata title and the
 * OG title are all built from this, which is why no row carries a title of its own.
 */
export function modelAnswersHeading(page) {
  const topic = AMBIGUOUS.has(\`\${page.subject}|\${page.topic}\`)
    ? \`\${page.topic} (Unit \${page.unit})\`
    : page.topic;
  return \`\${topic} — Exam Questions & Model Answers\`;
}

export function modelAnswersMetaTitle(page) {
  return \`\${modelAnswersHeading(page)} | Edexcel IAL \${SUBJECT_LABEL[page.subject]} | Revvy Learn\`;
}

export function modelAnswersOgTitle(page) {
  return \`\${modelAnswersHeading(page)} | Revvy Learn\`;
}

/** The row for one URL segment, or null. Used by the two dynamic routes to decide \`notFound()\`. */
export function modelAnswerPageFor(subject, slug) {
  return MODEL_ANSWER_PAGES.find((p) => p.subject === subject && p.slug === slug) || null;
}

/** Every row for one subject, in page order. */
export function modelAnswerPagesFor(subject) {
  return MODEL_ANSWER_PAGES.filter((p) => p.subject === subject);
}
`;

fs.writeFileSync(ROOT + '/data/modelAnswerPages.js', header);
console.log('rows', rows.length, 'economics', rows.filter(r => r.subject === 'economics').length, 'business', rows.filter(r => r.subject === 'business').length);
