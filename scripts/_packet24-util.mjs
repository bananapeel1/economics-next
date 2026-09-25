/**
 * Packet 24 helpers: the id scheme scripts/mint-item-ids.mjs uses, so hand-authored items carry ids
 * of the same shape (`<section>:<kind>:<hash8(key)>`), the validator's own word counter, and the
 * Sabaya cylinder market — the one market whose figures this section carries across its body,
 * diagrams, notes and assessment.
 *
 * WHY ONE PAIR OF SCHEDULES. IAL Economics 1.3.4 is eleven leaves that look like four topics and are
 * really one: a demand curve and a supply curve crossing, and then four questions asked of that one
 * crossing — where it settles (1a), what moves it (1b), how it gets there (1c), what the two triangles
 * either side of the price are worth (2a, 2b), what the price is DOING while it settles (3a, 3b), and
 * what happens when a government drives a wedge into it (4a-4d). Every one of those falls out of a
 * single pair of straight lines, so there is exactly one pair here and every figure in the section is
 * computed from it:
 *
 *      demand   Qd = 1100 − 50P     choke price $22   (nobody buys at or above it)
 *      supply   Qs = 100P − 400     price foot  $4    (nobody supplies at or below it)
 *
 *      equilibrium          P* = $10, Q* = 600
 *      consumer surplus     ½ × ($22 − $10) × 600 = $3,600
 *      producer surplus     ½ × ($10 −  $4) × 600 = $1,800
 *
 * The slopes are chosen, not stumbled on. With |dQ/dP| = 50 on demand and 100 on supply, a wedge of
 * $3 splits two-to-one — consumers $2, producers $1 — which is the incidence rule of 4b and 4d stated
 * as arithmetic a student can check rather than as a sentence they have to trust. The SAME $3 wedge
 * runs both ways: a specific tax of $3 and a subsidy of $3 are the same shift in opposite directions,
 * and the split is 2:1 both times. And a 30% ad valorem tax is worth exactly $3 at the original price
 * and nothing like $3 anywhere else, which is the whole reason the specification names both kinds.
 *
 * The Sabaya cylinder market is fictional and, like packet 16's Zuri, 17's Tafari, 19's Yusra Foods
 * and 23's Kavira Ceramics, is given no country: the REAL examples carry the internationalisation.
 * One currency: dollars. Every figure below is re-derived by the runner from the emitted SVG, so a
 * number that changes in one surface and not another fails the build (packet 15's accuracy-01 rule).
 */
import { createHash } from 'node:crypto';

export const SECTION = 'price-determination';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;

/* ── the two schedules (1a) ────────────────────────────────────────────────── */
/*
 * A line is stored as the pair a student would read off it, not as a slope: the quantity at price
 * zero and the change in quantity per dollar. `q()` and `p()` are inverses of each other and every
 * other figure in this file goes through them, so nothing here can disagree with the curves drawn
 * from the same functions in _packet24-diagrams.mjs.
 */
const lineFrom = (intercept, perDollar) => ({ intercept, perDollar });
export const DEMAND = lineFrom(1100, -50);      // Qd = 1100 − 50P
export const SUPPLY = lineFrom(-400, 100);      // Qs = 100P − 400

export const q = (line, price) => round2(line.intercept + line.perDollar * price);
export const p = (line, quantity) => round2((quantity - line.intercept) / line.perDollar);

/** Where two lines cross: the price at which the quantities are equal, and that quantity. */
export const cross = (d, s) => {
  const price = round2((s.intercept - d.intercept) / (d.perDollar - s.perDollar));
  return { price, quantity: q(d, price) };
};

export const EQ = cross(DEMAND, SUPPLY);        // { price: 10, quantity: 600 }
export const P_EQ = EQ.price;
export const Q_EQ = EQ.quantity;

/** The price at which nobody buys (demand meets the axis) and the price below which nobody sells. */
export const CHOKE = p(DEMAND, 0);              // $22
export const FOOT = p(SUPPLY, 0);               // $4

/* ── excess demand and excess supply (1c) ──────────────────────────────────── */
/*
 * Deliberately symmetric: $3 either side of the equilibrium price opens a gap of 450 units each way,
 * so the two halves of leaf 1c are the same size and a student can see that the size of the gap is
 * about the DISTANCE from the equilibrium, not about which side of it you are on.
 */
export const P_LOW = 7;
export const P_HIGH = 13;
/** Positive when buyers want more than sellers offer — that is what "excess demand" names. */
export const excessDemand = (price) => round2(q(DEMAND, price) - q(SUPPLY, price));
export const excessSupply = (price) => round2(q(SUPPLY, price) - q(DEMAND, price));
export const EXCESS_DEMAND = excessDemand(P_LOW);   // 450
export const EXCESS_SUPPLY = excessSupply(P_HIGH);  // 450

/* ── surplus (2a, 2b) ──────────────────────────────────────────────────────── */
/*
 * Both are triangles between a curve and the price line, so both are ½ × base × height with the base
 * being the quantity traded. Written once, used for every case below — which is the point: 2b asks
 * what a SHIFT does to these areas, and the only honest way to answer is to recompute them.
 */
export const consumerSurplus = (d, price, quantity) => round2(0.5 * (p(d, 0) - price) * quantity);
export const producerSurplus = (s, price, quantity) => round2(0.5 * (price - p(s, 0)) * quantity);

export const CS = consumerSurplus(DEMAND, P_EQ, Q_EQ);   // 3600
export const PS = producerSurplus(SUPPLY, P_EQ, Q_EQ);   // 1800

/* ── the four shift cases (1b, 2b) ─────────────────────────────────────────── */
/*
 * A demand shift moves the curve sideways by a quantity at every price; a supply shift moves it
 * vertically by a sum of money at every quantity. Those are the two shapes a shift can have, and
 * each is built here by rebuilding the LINE rather than by asserting a new equilibrium — so the
 * table in the diagrams and the sentences in the body are the same computation.
 */
export const DEMAND_SHIFT = 300;     // units at every price
export const SUPPLY_SHIFT = 3;       // dollars at every quantity

const shiftDemand = (units) => lineFrom(DEMAND.intercept + units, DEMAND.perDollar);
/** Up by $d means a producer needs $d more from the buyer at every quantity, so the foot rises by d. */
const shiftSupply = (dollars) => lineFrom(SUPPLY.intercept - SUPPLY.perDollar * dollars, SUPPLY.perDollar);

const caseOf = (label, d, s) => {
  const { price, quantity } = cross(d, s);
  return { label, demand: d, supply: s, price, quantity, cs: consumerSurplus(d, price, quantity), ps: producerSurplus(s, price, quantity) };
};

export const BASE_CASE = caseOf('No change', DEMAND, SUPPLY);
export const DEMAND_RISE = caseOf('Demand increases', shiftDemand(DEMAND_SHIFT), SUPPLY);
export const DEMAND_FALL = caseOf('Demand decreases', shiftDemand(-DEMAND_SHIFT), SUPPLY);
export const SUPPLY_RISE = caseOf('Supply increases', DEMAND, shiftSupply(-SUPPLY_SHIFT));
export const SUPPLY_FALL = caseOf('Supply decreases', DEMAND, shiftSupply(SUPPLY_SHIFT));
export const CASES = [DEMAND_RISE, DEMAND_FALL, SUPPLY_RISE, SUPPLY_FALL];

/* ── the wedge: an indirect tax and a subsidy (4a-4d) ──────────────────────── */
/*
 * A specific tax and a subsidy are ONE object with opposite signs. `wedge(t)` returns what a student
 * has to be able to state: the price the buyer pays, the price the seller keeps, the quantity traded,
 * how the wedge splits between the two sides, and what it costs or raises for the government.
 *
 * The government's line is leaf 4a and 4c's "and the government", which the March section stated in
 * prose and never drew: it is a rectangle, tax (or subsidy) per unit × the quantity actually traded
 * AFTER the wedge — not the quantity before it, which is the error the fourth common mistake names.
 */
export const TAX = 3;              // $ a cylinder
export const SUBSIDY = 3;          // $ a cylinder
export const AD_VALOREM = 30;      // % of the price the seller keeps

export const wedge = (amount) => {
  // A tax of `amount` lifts the supply curve by `amount`; a subsidy is the same thing negative.
  const taxed = shiftSupply(amount);
  const { price, quantity } = cross(DEMAND, taxed);
  const buyer = price;
  const seller = round2(price - amount);
  return {
    amount,
    buyer,
    seller,
    quantity,
    buyerShare: round2(buyer - P_EQ),        // + when a tax raises what the buyer pays
    sellerShare: round2(P_EQ - seller),      // + when a tax lowers what the seller keeps
    government: round2(Math.abs(amount) * quantity),
    cs: consumerSurplus(DEMAND, buyer, quantity),
    ps: producerSurplus(SUPPLY, seller, quantity),
  };
};

export const TAXED = wedge(TAX);            // buyer $12, seller $9, 500 units, $1,500 revenue
export const SUBSIDISED = wedge(-SUBSIDY);  // buyer $8, seller $11, 700 units, $2,100 cost

/* ── the ad valorem pivot (4a) ─────────────────────────────────────────────── */
/*
 * An ad valorem tax is a percentage of what the seller keeps, so the gap it opens is a different sum
 * of money at every quantity — which is exactly why the curve pivots instead of shifting parallel.
 * At the ORIGINAL equilibrium price the 30% gap is worth $3, the same as the specific tax, and
 * nowhere else is it. That coincidence is chosen: it is the cleanest way to show a student that the
 * two taxes are not interchangeable, because here they agree at one point and differ at every other.
 */
export const adValoremGap = (sellerPrice) => round2(sellerPrice * (AD_VALOREM / 100));
export const AD_VALOREM_AT_EQ = adValoremGap(P_EQ);   // $3.00 — equal to TAX by construction
export const AV_LOW_Q = 200;
export const AV_HIGH_Q = 600;
export const AV_GAP_LOW = adValoremGap(p(SUPPLY, AV_LOW_Q));    // $1.80 at $6
export const AV_GAP_HIGH = adValoremGap(p(SUPPLY, AV_HIGH_Q));  // $3.00 at $10

/* ── formatting ────────────────────────────────────────────────────────────── */
/** One money format for the whole section (packet 16's Layer 6 caught $108000 beside $108,000). */
export const money = (n) => (Number.isInteger(n) ? `$${n.toLocaleString('en-GB')}` : `$${n.toFixed(2)}`);
/** A percentage as a student would write it, with no trailing .0 on a whole number. */
export const pc = (n) => `${Number.isInteger(n) ? n : Number(n.toFixed(1))}%`;
/** A quantity of cylinders, formatted once. */
export const qty = (n) => n.toLocaleString('en-GB');
/*
 * ONE MINUS SIGN for the whole section (packet 18's rule: JS prints a negative with an ASCII hyphen
 * and a typed sentence carries U+2212, and packet 18 shipped 55 of one beside 13 of the other).
 */
export const MINUS = '−';
export const signedMoney = (n) => `${n < 0 ? MINUS : '+'}${money(Math.abs(n))}`;
export const signedQty = (n) => `${n < 0 ? MINUS : '+'}${qty(Math.abs(n))}`;

/** Words of teaching text in a subsection, exactly as lib/content-validator.mjs counts them. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
