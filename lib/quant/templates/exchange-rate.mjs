import { money, num, round } from '../format.mjs';

/**
 * An export price converted into US dollars before and after the exchange rate moves, the
 * percentage change in that dollar price, and what the move did to price competitiveness. One
 * generator, registered twice — once per subject, the way `percentage-change.mjs` is.
 *
 *   economics  Edexcel IAL Economics, WEC14 (Unit 4), spec 4.3.3 Balance of payments, exchange rates
 *              and international competitiveness: topic 2 leaves d and e, the distinction between
 *              revaluation and APPRECIATION and between devaluation and DEPRECIATION
 *              (econ_spec.txt:1734-1737), and topic 3a, whose measures of international
 *              competitiveness include "relative export prices" (:1759-1762); 3b lists the
 *              exchange rate as a factor influencing it (:1763, :1766). QS1 ratios and QS2 percentage
 *              changes (econ_spec.txt:2764, :2767).
 *   business   Edexcel IAL Business, WBS12 (Unit 2), spec 2.3.5 External influences, topic 1a "The
 *              effect on businesses of, and how they can best respond to, changes in: … exchange
 *              rates (appreciation, depreciation)" (bus_spec.txt:1013-1016). QS1 ratios and QS2
 *              percentages and percentage changes (bus_spec.txt:2267, :2270), which the appendix
 *              requires students "to apply … to relevant economic contexts" (:2259-2261).
 *
 * Neither specification writes "calculate" beside exchange rates. Economics supports the
 * calculation through "relative export prices" as a MEASURE of competitiveness; Business through
 * the effect of an appreciation or depreciation on a business, which for an exporter that holds its
 * home-currency price IS the change in its foreign-currency price. The Business registration sits
 * at 2.3.5 rather than 4.3.2 5a ("The impact on businesses of movements in exchange rates",
 * bus_spec.txt:1415) because 2.3.5 names appreciation and depreciation, the two words the choice
 * step turns on. The judgement is recorded in audit/runs/packet-13.3/templates-economics.md.
 *
 * ── The currency direction ──
 *
 * Every rate is quoted the way these currencies are quoted in the market — US$1 = so many units of
 * the home currency — so the dollar price is the home price DIVIDED by the rate. Multiplying is
 * the classic slip and it is named on both conversion steps. More home currency per dollar is a
 * depreciation; the dollar price falls; the export becomes more price competitive.
 *
 * ── Why the percentage change is drawn first ──
 *
 * The dollar price changes by R1/R2 − 1, not by the change in the rate, so drawing two rates and
 * hoping the price change comes out clean fails most of the time. The change is drawn from a clean
 * set and the new rate is derived from it; a draw whose new rate does not land on the currency's
 * quoting precision is rejected. The rate's own change is then a different number from the price
 * change, which is what makes "that is the change in the exchange rate" a nameable slip.
 *
 * Only floating currencies. The dirham, riyal and rufiyaa are pegged: moving them is a revaluation
 * or devaluation, which 4.3.3 2d-e distinguishes from appreciation and depreciation.
 */

const range = (low, high, step, dp) => {
  const out = [];
  for (let x = low; x <= high + 1e-9; x += step) out.push(round(x, dp));
  return out;
};

const CURRENCIES = {
  ringgit: { name: 'ringgit', symbol: 'RM', gap: '', dp: 2, rates: range(3.6, 5, 0.05, 2) },
  rupee: { name: 'rupee', symbol: 'Rs', gap: ' ', dp: 0, rates: range(240, 360, 5, 0) },
  shilling: { name: 'shilling', symbol: 'KSh', gap: ' ', dp: 0, rates: range(100, 160, 2, 0) },
  cedi: { name: 'cedi', symbol: 'GH₵', gap: '', dp: 2, rates: range(8, 16, 0.25, 2) },
  euro: { name: 'euro', symbol: '€', gap: '', dp: 2, rates: range(0.8, 1, 0.01, 2) },
};

const ECONOMICS_CONTEXTS = [
  { seller: 'A Malaysian furniture maker', item: 'a rattan dining set', currency: CURRENCIES.ringgit, usd: range(300, 900, 5, 0) },
  { seller: 'A Sri Lankan tea estate', item: 'a chest of tea', currency: CURRENCIES.rupee, usd: range(100, 400, 2, 0) },
  { seller: 'A Sri Lankan garment maker', item: 'a carton of cotton shirts', currency: CURRENCIES.rupee, usd: range(200, 800, 5, 0) },
  { seller: 'A Kenyan flower farm', item: 'a box of cut roses', currency: CURRENCIES.shilling, usd: range(40, 160, 1, 0) },
  { seller: 'A Kenyan coffee cooperative', item: 'a sack of coffee beans', currency: CURRENCIES.shilling, usd: range(150, 450, 5, 0) },
  { seller: 'A Ghanaian cocoa exporter', item: 'a tonne of cocoa beans', currency: CURRENCIES.cedi, usd: range(2000, 4000, 25, 0) },
  { seller: 'A Cypriot cheese maker', item: 'a pallet of halloumi', currency: CURRENCIES.euro, usd: range(500, 1500, 5, 0) },
];

const BUSINESS_CONTEXTS = [
  { seller: '**Kandy Cycle Works, Sri Lanka**', item: 'a touring bicycle', currency: CURRENCIES.rupee, usd: range(150, 600, 2, 0) },
  { seller: '**Nairobi Fresh Juice Ltd**', item: 'a pallet of mango juice', currency: CURRENCIES.shilling, usd: range(300, 900, 5, 0) },
  { seller: '**Nicosia Print Co, Cyprus**', item: 'a catalogue print run', currency: CURRENCIES.euro, usd: range(400, 1600, 5, 0) },
  { seller: '**Penang Rattan Works, Malaysia**', item: 'a garden furniture set', currency: CURRENCIES.ringgit, usd: range(250, 800, 5, 0) },
  { seller: '**Kumasi Shea Traders, Ghana**', item: 'a drum of shea butter', currency: CURRENCIES.cedi, usd: range(400, 1200, 10, 0) },
];

/** Percentage change in the US-dollar price. Positive is an appreciation of the home currency. */
const PRICE_CHANGES = [-25, -20, -12.5, -10, -8, -5, -4, 4, 5, 8, 10, 12.5, 20, 25];

const TOL = { before: 0.05, after: 0.05, change: 0.05 };

const exactTo = (x, dp) => Math.abs(x - Number(x.toFixed(dp))) < 1e-9;
const signed = (n, dp) => (n < 0 ? `−${Math.abs(n).toFixed(dp)}` : `+${n.toFixed(dp)}`);

/** A home-currency amount: "Rs 90,000", "RM1,914.50", "€460". */
const home = (cur, x) => {
  const whole = Math.abs(x - Math.round(x)) < 1e-9;
  return `${cur.symbol}${cur.gap}${x.toLocaleString('en-US', whole ? { maximumFractionDigits: 0 } : { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
/** A rate, at the currency's quoting precision: "RM4.40", "Rs 300", "€0.92". */
const rate = (cur, r) => `${cur.symbol}${cur.gap}${cur.dp ? r.toFixed(cur.dp) : num(r)}`;

function slipsFor(d) {
  const { name } = d.context.currency;
  const out = {
    before: [
      { value: round(d.price * d.r1, 2), note: `You multiplied by the exchange rate. US$1 buys ${rate(d.context.currency, d.r1)}, so the dollar price is the ${name} price DIVIDED by the rate.` },
    ],
    after: [
      { value: round(d.price * d.r2, 2), note: `You multiplied by the exchange rate. US$1 buys ${rate(d.context.currency, d.r2)}, so the dollar price is the ${name} price DIVIDED by the rate.` },
    ],
    change: [
      { value: round(((d.r2 - d.r1) / d.r1) * 100, 2), note: 'That is the percentage change in the exchange rate, not in the dollar price. The price moves by the old rate ÷ the new rate, which is a different number — work it from the two dollar prices.' },
      { value: round(((d.usd2 - d.usd1) / d.usd2) * 100, 2), note: 'You divided by the new dollar price. A percentage change is measured against the original figure.' },
      { value: -d.change, note: `The size is right but the direction is not. The dollar price ${d.change > 0 ? 'rose' : 'fell'}, so the change is ${d.change > 0 ? 'positive' : 'negative'}.` },
    ],
  };
  return out;
}

/** The new rate a price change implies, when it lands on the currency's quoting precision and
 *  stays roughly where that currency has traded (nothing here claims a particular year's rate). */
function newRate(cur, r1, change) {
  const r2 = round(r1 / (1 + change / 100), 9);
  if (!exactTo(r2, cur.dp)) return null;
  if (r2 < cur.rates[0] * 0.8 || r2 > cur.rates[cur.rates.length - 1] * 1.25) return null;
  return round(r2, cur.dp);
}

/** Whether a dollar price gives a home price a firm would set, and a new dollar price in cents. */
function priceWorks(cur, r1, usd1, change) {
  if (!exactTo(usd1 * r1, 2)) return false;
  // Whole tens in a currency quoted in whole units (KSh 5,410, not KSh 5,408, which reads as what
  // it is — a dollar figure multiplied out).
  if (cur.dp === 0 && round(usd1 * r1, 2) % 10 !== 0) return false;
  return exactTo(usd1 * (1 + change / 100), 2);
}

/** The draw, as a pure function of its picks. Returns null to reject. */
function accept({ context, r1, usd1, change }) {
  if (r1 === null || usd1 === null) return null;
  const cur = context.currency;
  const r2 = newRate(cur, r1, change);
  if (r2 === null || !priceWorks(cur, r1, usd1, change)) return null;
  const price = round(usd1 * r1, 2);
  const usd2 = round(usd1 * (1 + change / 100), 9);

  const d = { context, r1, r2, price, usd1, usd2: round(usd2, 2), change };

  const slips = slipsFor(d);
  const answers = { before: d.usd1, after: d.usd2, change: d.change };
  for (const [step, xs] of Object.entries(slips)) {
    if (xs.some((x) => !Number.isFinite(x.value) || Math.abs(x.value - answers[step]) <= TOL[step] * 2)) return null;
    // …and far enough from each other that the note a student reads is the one for what they did.
    for (let i = 0; i < xs.length; i++) for (let j = i + 1; j < xs.length; j++) {
      if (Math.abs(xs[i].value - xs[j].value) <= TOL[step] * 2) return null;
    }
  }
  // No answer may be a figure printed on the card: the home price, the two rates, and the 1 in
  // "US$1". A $250 dollar price beside a rate of Rs 250 would be read straight off the stem.
  const printed = [d.price, d.r1, d.r2, 1];
  const forms = (a) => [a, Math.abs(a), round(a, 1), Math.abs(round(a, 1))];
  if (Object.values(answers).some((a) => forms(a).some((f) => printed.includes(f)))) return null;
  return d;
}

export function makeExchangeRate(config) {
  const contexts = config.subject === 'economics' ? ECONOMICS_CONTEXTS : BUSINESS_CONTEXTS;

  return {
    id: config.id,
    subject: config.subject,
    unit: config.unit,
    specCode: config.specCode,
    specLeaf: config.specLeaf,
    qs: config.qs,
    specTerm: config.specTerm,
    title: config.title,
    topic: config.topic,
    // Distinct stems, counted by exhaustion over every pick the draw can make
    // (audit/runs/packet-13.3/templates-economics.md).
    variants: config.variants,

    draw(rng) {
      for (let attempt = 0; attempt < 400; attempt++) {
        // The change first, then only the rates and prices that suit it. Picking all three freely
        // and rejecting left 70% of draws at ±20% or ±25%, because a 20% or 25% move lands on almost
        // any rate and a 4% move on few; a drill that mostly shows one-in-a-decade moves teaches
        // that they are normal. Where nothing suits, the attempt still picks — a placeholder — so
        // every attempt makes the same four picks and `variants` can be counted by exhaustion.
        const context = rng.pick(contexts);
        const change = rng.pick(PRICE_CHANGES);
        const cur = context.currency;
        const rates = cur.rates.filter((r) => newRate(cur, r, change) !== null);
        const r1 = rng.pick(rates.length ? rates : [null]);
        const prices = r1 === null ? [] : context.usd.filter((u) => priceWorks(cur, r1, u, change));
        const usd1 = rng.pick(prices.length ? prices : [null]);
        const d = accept({ context, r1, usd1, change });
        if (d) return d;
      }
      throw new Error(`${config.id}: no clean draw in 400 attempts`);
    },

    /** Checked independently by audit/scripts/quant-check.mjs on every draw. */
    invariants(d) {
      const bad = [];
      if (Math.abs(d.price / d.r1 - d.usd1) > 1e-6) bad.push('the old dollar price is not the home price divided by the old rate');
      if (Math.abs(d.price / d.r2 - d.usd2) > 1e-6) bad.push('the new dollar price is not the home price divided by the new rate');
      if (Math.abs(((d.usd2 - d.usd1) / d.usd1) * 100 - d.change) > 1e-6) bad.push('the percentage change does not reproduce the two dollar prices');
      if (d.r1 === d.r2) bad.push('the exchange rate did not move');
      if ((d.r2 < d.r1) !== (d.change > 0)) bad.push('an appreciation did not raise the dollar price');
      return bad;
    },

    build(d) {
      const cur = d.context.currency;
      const appreciated = d.r2 < d.r1;
      const answer = appreciated
        ? `The ${cur.name} appreciated; the export is less price competitive`
        : `The ${cur.name} depreciated; the export is more price competitive`;
      const why = appreciated
        ? `US$1 now buys fewer ${cur.name === 'ringgit' ? 'ringgit' : `${cur.name}s`} (${rate(cur, d.r2)} against ${rate(cur, d.r1)}), so each ${cur.name} is worth more dollars: it has appreciated. The same ${cur.name} price now costs a US buyer ${money(d.usd2)} instead of ${money(d.usd1)}, so the export is less price competitive.`
        : `US$1 now buys more ${cur.name === 'ringgit' ? 'ringgit' : `${cur.name}s`} (${rate(cur, d.r2)} against ${rate(cur, d.r1)}), so each ${cur.name} is worth fewer dollars: it has depreciated. The same ${cur.name} price now costs a US buyer ${money(d.usd2)} instead of ${money(d.usd1)}, so the export is more price competitive.`;
      return {
        stem:
          `${d.context.seller} sells ${d.context.item} to buyers in the US for **${home(cur, d.price)}**, and keeps that ` +
          `${cur.name} price. The exchange rate moves from **US$1 = ${rate(cur, d.r1)}** to **US$1 = ${rate(cur, d.r2)}**.`,
        steps: [
          {
            id: 'before',
            label: 'Price in US dollars at the old exchange rate',
            method: `${cur.name} price ÷ ${cur.name === 'ringgit' ? 'ringgit' : `${cur.name}s`} per US$1`,
            prefix: '$',
            marks: 1,
            dp: 2,
            answer: d.usd1,
            tolerance: TOL.before,
            slips: slipsFor(d).before,
          },
          {
            id: 'after',
            label: 'Price in US dollars at the new exchange rate',
            method: `${cur.name} price ÷ ${cur.name === 'ringgit' ? 'ringgit' : `${cur.name}s`} per US$1`,
            prefix: '$',
            marks: 1,
            dp: 2,
            answer: d.usd2,
            tolerance: TOL.after,
            slips: slipsFor(d).after,
          },
          {
            id: 'change',
            label: 'Percentage change in the US dollar price',
            method: '(new dollar price − original dollar price) ÷ original dollar price × 100',
            suffix: '%',
            marks: 2,
            dp: 2,
            answer: d.change,
            tolerance: TOL.change,
            ofr: (v) => (Number.isFinite(v.before) && Number.isFinite(v.after) && v.before !== 0 ? ((v.after - v.before) / v.before) * 100 : null),
            slips: slipsFor(d).change,
          },
          {
            id: 'verdict',
            label: `What has happened to the ${cur.name}, and to this export’s price competitiveness in the US?`,
            method: 'fewer units of the home currency per US$1 is an appreciation; compare the two dollar prices',
            type: 'choice',
            marks: 1,
            choices: [
              `The ${cur.name} appreciated; the export is less price competitive`,
              `The ${cur.name} appreciated; the export is more price competitive`,
              `The ${cur.name} depreciated; the export is more price competitive`,
              `The ${cur.name} depreciated; the export is less price competitive`,
            ],
            answer,
            correctNote: why,
            wrongNote: `Not quite. ${why}`,
          },
        ],
        solution: [
          `Old: ${home(cur, d.price)} ÷ ${cur.dp ? d.r1.toFixed(cur.dp) : num(d.r1)} = **${money(d.usd1)}**`,
          `New: ${home(cur, d.price)} ÷ ${cur.dp ? d.r2.toFixed(cur.dp) : num(d.r2)} = **${money(d.usd2)}**`,
          `%Δ = (${money(d.usd2)} − ${money(d.usd1)}) ÷ ${money(d.usd1)} × 100 = **${signed(d.change, 2)}%**`,
          `${rate(cur, d.r1)} → ${rate(cur, d.r2)} per US$1: the ${cur.name} has **${appreciated ? 'appreciated' : 'depreciated'}**, so the export is **${appreciated ? 'less' : 'more'} price competitive**`,
        ],
      };
    },
  };
}

export const exchangeRateEconomics = makeExchangeRate({
  id: 'exchange-rate-economics',
  subject: 'economics',
  unit: 'WEC14',
  specCode: '4.3.3',
  specLeaf: '4.3.3 · 2d, 2e, 3a',
  qs: 'QS1, QS2',
  specTerm: 'relative export prices',
  title: 'Exchange rates and export prices',
  topic: 'Balance of payments and exchange rates',
  variants: 41_202,
});

export const exchangeRateBusiness = makeExchangeRate({
  id: 'exchange-rate-business',
  subject: 'business',
  unit: 'WBS12',
  specCode: '2.3.5',
  specLeaf: '2.3.5 · 1a',
  qs: 'QS1, QS2',
  specTerm: 'exchange rates (appreciation, depreciation)',
  title: 'Exchange rates and export prices',
  topic: 'External influences',
  variants: 41_123,
});
