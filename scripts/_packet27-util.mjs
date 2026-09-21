/**
 * PACKET 27 — business-objectives-strategy helpers: the id scheme scripts/mint-item-ids.mjs uses,
 * the validator's own word counter, and the ONE FIRM this section carries across its body, diagrams,
 * notes and assessment.
 *
 * WHY ONE FIRM. Packet 17's rule is that where a section's arithmetic recurs it is defined once and
 * every surface is generated from it. IAL Business 3.3.1 has no arithmetic spine — it is four
 * analytical tools and a hierarchy of objectives — but it has the same problem in a different form:
 * the March section taught Ansoff with Amazon, Porter with IKEA and SWOT with Netflix, so a student
 * met three unrelated firms and never saw that the four tools are four questions about ONE business.
 * `structure-06` is that observation. So there is one firm here, its figures are defined below, and
 * every chapter asks its own question about it.
 *
 *   ADISA HOME — a household appliance manufacturer, four product lines, $100m of revenue a year.
 *
 *      line                revenue     market growth    Adisa's share of that market
 *      water heaters        $48m            2%                     31%
 *      refrigerators        $30m            4%                     12%
 *      air conditioners     $18m           14%                      6%
 *      solar pumps           $4m           22%                      3%
 *
 * The shape of that table is the whole point of chapter 4 and it is not a coincidence: 78% of the
 * revenue comes from the two lines whose markets are barely growing and where Adisa is strongest,
 * and 22% from the two growing fastest, where it is weakest. That is what portfolio analysis is FOR
 * (3.3.1 · 2b), and it is also the pressure behind every other chapter's decision — which Ansoff
 * cell to move into, which Porter position to hold, which resources the move costs.
 *
 * NO FIGURE BELOW APPEARS ANYWHERE IN THE SECTION EXCEPT THROUGH THESE FUNCTIONS, and the runner
 * re-derives every one of them from the emitted SVG and from the practice mark schemes. Adisa is
 * fictional and has no country, as Zuri (packet 16), Tafari (17), Yusra Foods (19), Kavira Ceramics
 * (23), Sabaya (24), Kumbe and Amara (25) were: the REAL examples carry the internationalisation,
 * and they carry no year and no figure (packet 15's accuracy-01 rule).
 */
import { createHash } from 'node:crypto';

export const SECTION = 'business-objectives-strategy';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;
export const round1 = (n) => Math.round(n * 10) / 10;

/* ── Adisa Home ────────────────────────────────────────────────────────────── */

/** A market growing faster than this is "fast-growing" wherever the section uses the phrase. */
export const FAST_GROWTH = 10;

const LINES = [
  { name: 'Water heaters', revenue: 48, growth: 2, share: 32 },
  { name: 'Refrigerators', revenue: 30, growth: 4, share: 12 },
  { name: 'Air conditioners', revenue: 18, growth: 14, share: 6 },
  { name: 'Solar pumps', revenue: 4, growth: 22, share: 4 },
];

export const ADISA = (() => {
  const totalRevenue = LINES.reduce((n, l) => n + l.revenue, 0);
  const withShares = LINES.map((l) => ({
    ...l,
    /* The line's share of ADISA's revenue — not to be confused with `share`, which is Adisa's share
     * of that line's MARKET. Two different percentages, and a student who conflates them reads the
     * portfolio backwards, so they are named apart here and everywhere they are printed. */
    revenueShare: round1((100 * l.revenue) / totalRevenue),
    /* The size of the market this line sells into, from Adisa's revenue and Adisa's share of it. */
    marketSize: round2(l.revenue / (l.share / 100)),
    fast: l.growth >= FAST_GROWTH,
  }));
  const fast = withShares.filter((l) => l.fast);
  const slow = withShares.filter((l) => !l.fast);
  const sum = (xs, k) => round2(xs.reduce((n, l) => n + l[k], 0));
  return {
    name: 'Adisa Home',
    what: 'household appliances',
    lines: withShares,
    totalRevenue,
    fast, slow,
    fastRevenue: sum(fast, 'revenue'),
    slowRevenue: sum(slow, 'revenue'),
    fastRevenueShare: round1((100 * sum(fast, 'revenue')) / totalRevenue),
    slowRevenueShare: round1((100 * sum(slow, 'revenue')) / totalRevenue),
    /* Revenue-weighted growth of the markets Adisa sells into: the one number that says how fast the
     * portfolio as a whole is being carried, and it is nearer the slow lines than the fast ones
     * because that is where the revenue is. */
    weightedGrowth: round1(withShares.reduce((n, l) => n + l.growth * l.revenue, 0) / totalRevenue),
    biggest: withShares[0],
    fastest: withShares[3],
  };
})();

/**
 * THE STRATEGIC DECISION AND THE TACTICAL ONE, defined once, because 3.3.1 · 2c is about what each
 * of them does to three named kinds of resource and the contrast only works if both are concrete.
 */
export const DECISIONS = {
  strategic: {
    what: 'open a second factory line to make air conditioners',
    capital: 25,
    hires: 120,
    years: 4,
  },
  tactical: {
    what: 'run a four-week discount on refrigerators to clear stock before a model change',
    discount: 15,
    weeks: 4,
  },
};
/** The capital cost of the strategic decision as a share of a year's revenue — derived, not typed. */
export const CAPITAL_SHARE = round1((100 * DECISIONS.strategic.capital) / ADISA.totalRevenue);

/* ── formatting ────────────────────────────────────────────────────────────── */

/*
 * ONE CURRENCY, DOLLARS, and one minus sign for the whole section (packet 18 shipped 55 of one
 * beside 13 of the other): a negative typed by hand carries U+2212 and one printed by JavaScript
 * carries an ASCII hyphen.
 */
export const MINUS = '−';
export const money = (n) => `$${n.toLocaleString('en-GB')}m`;
export const pc = (n) => `${Number.isInteger(n) ? n : Number(n.toFixed(1))}%`;

/** The validator's own word counter, so the 350-word budget is measured the way step.words measures it. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
