/**
 * PACKET 28 — revenue-costs-profits helpers: the id scheme, the validator's own word counter, and the
 * TWO firms this section carries across its body, diagrams, notes and assessment.
 *
 * IAL Economics 3.3.2 is the most arithmetic-heavy topic in the programme so far: 34 leaves, of which
 * fourteen are formulae to calculate (1a, 2c) and four are relationships between pairs of those
 * formulae (2d). Packet 17's rule therefore applies with more force than usual — where a section's
 * arithmetic recurs, define it once as a function and generate every surface from it — and the runner
 * re-derives every property the specification names rather than trusting the tables below.
 *
 * WHY TWO FIRMS AND NOT ONE. Sub-topic 1 is about revenue and needs a demand curve; sub-topics 2, 3
 * and 4 are about costs and need a production function. One firm carrying both would have to make the
 * two exhibits meet — its demand curve would have to cross its cost curves somewhere sensible — and
 * that meeting IS the profit-maximising equilibrium, which is 3.3.3 and not this section (see NEXT.md:
 * `profit maximisation` is econ_spec.txt:1278 and :1285, topic 3.3.1 · 3, and "profit-maximising
 * equilibrium" is :1374, :1383 and :1426, all 3.3.3). Forcing one firm would have smuggled another
 * section's central result into this one through the back door of the arithmetic. Two firms keep the
 * two toolkits separate, which is how the specification keeps them.
 *
 *   NADIRA TEXTILES — sub-topic 1, revenue. Rolls of cloth a day, dollars a roll.
 *      demand / AR   P = 40 − 2Q            TR = 40Q − 2Q²          MR = 40 − 4Q
 *      TR peaks at $200 at Q = 10, which is exactly where MR = 0 and where PED = −1.
 *      Elastic side:   $30 → $28 moves Q from 5 to 6.   PED = −3.00.  TR $150 → $168, RISES.
 *      Inelastic side: $10 → $8  moves Q from 15 to 16. PED = −0.33.  TR $150 → $128, FALLS.
 *      The two calculations start from the same revenue and end in opposite directions, on one line.
 *
 *   BAHRI BOTTLING — sub-topics 2, 3 and 4, costs and profit. Crates of water a day.
 *      total fixed cost $120 a day · wage $60 a worker a day · one fixed factor, the plant
 *      L      0     1     2     3     4     5
 *      TP     0     4    10    15    18    20        (crates a day)
 *      MP     —     4     6     5     3     2        diminishing from L = 3 (2b)
 *      AP     —     4     5     5   4.5     4        greatest at L = 2 and L = 3
 *
 *      Everything else is derived. The four relationships 2d asks for are then arithmetic rather than
 *      assertions, and the runner checks each at every row:
 *         MC = wage / MP          (2d-1)  · least where MP is greatest
 *         AVC = wage / AP         (2d-2)  · least where AP is greatest
 *         TC = TFC + wage × L     (2d-3)  · total product against total cost
 *         AC = AFC + AVC exactly at every row
 *      And MC over the 15 → 18 step is $20, which is AC at both ends: MC cuts AC at AC's minimum
 *      without a single curve being drawn by hand.
 *
 *      THE TABLE STOPS AT L = 5. At L = 6 total product is 21, and 120/21, 360/21 and 480/21 round to
 *      5.71, 17.14 and 22.86 — so AFC + AVC prints as 22.85 beside an AC of 22.86, a discrepancy of a
 *      cent that a student reading the row would find and could not resolve. Five rows where every
 *      figure is exact beat six where one is not.
 *
 * Both firms are fictional and given no country, as Zuri (packet 16), Tafari (17), Yusra Foods (19),
 * Kavira Ceramics (23), Sabaya (24), Kumbe Cement and Amara Skills (25) were: the REAL examples carry
 * the internationalisation. One currency, dollars. Neither accuracy-01's airline nor accuracy-02's AI
 * firm is replaced by another named company — both findings were dated claims about a real market
 * that this repository cannot check, so the shape goes with them (packet 25's rule).
 */
import { createHash } from 'node:crypto';

export const SECTION = 'revenue-costs-profits';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;

/* ── Nadira Textiles: the revenue side (3.3.2 · 1a, 1b) ────────────────────── */
/*
 * A linear demand curve and the two revenue curves that follow from it. Nothing here is a drawing:
 * `mr` is the derivative of `tr`, and the runner checks that the discrete marginal revenue between
 * two quantities equals `mr` at the midpoint, which is the only honest way to put a continuous MR
 * beside a schedule a student reads in steps.
 */
export const NADIRA = (() => {
  const a = 40, b = 2;                       // P = a − bQ
  const ar = (q) => round2(a - b * q);
  const tr = (q) => round2(ar(q) * q);
  const mr = (q) => round2(a - 2 * b * q);   // the twice-the-gradient property, 1a's own relationship
  const qAtPrice = (p) => round2((a - p) / b);
  /* Point elasticity on a straight line: (1/slope) × (P/Q), negative throughout. */
  const ped = (q) => round2(-(1 / b) * (ar(q) / q));
  /*
   * A discrete elasticity, calculated the way a data-response question asks for it: percentage change
   * in quantity over percentage change in price, both measured from the starting values. QS8.
   */
  const pedBetween = (p0, p1) => {
    const q0 = qAtPrice(p0), q1 = qAtPrice(p1);
    return round2(((q1 - q0) / q0 * 100) / ((p1 - p0) / p0 * 100));
  };
  const trMaxQ = round2(a / (2 * b));        // where MR = 0
  return {
    name: 'Nadira Textiles', good: 'cloth', unit: 'roll', units: 'rolls', per: 'a day',
    a, b, ar, tr, mr, ped, pedBetween, qAtPrice,
    /* The schedule every revenue surface is read from. */
    schedule: [0, 2, 4, 6, 8, 10, 12, 14, 16].map((q) => ({ q, ar: ar(q), tr: tr(q), mr: mr(q) })),
    trMaxQ, trMax: tr(trMaxQ), priceAtTrMax: ar(trMaxQ),
    /* The elastic case: a price cut that RAISES revenue. */
    elastic: { p0: 30, p1: 28, q0: qAtPrice(30), q1: qAtPrice(28), tr0: round2(30 * qAtPrice(30)), tr1: round2(28 * qAtPrice(28)), ped: pedBetween(30, 28) },
    /* The inelastic case: the same cut in cash terms, at the other end, LOWERING revenue. */
    inelastic: { p0: 10, p1: 8, q0: qAtPrice(10), q1: qAtPrice(8), tr0: round2(10 * qAtPrice(10)), tr1: round2(8 * qAtPrice(8)), ped: pedBetween(10, 8) },
  };
})();

/* ── Bahri Bottling: the cost side (3.3.2 · 2, 3, 4) ───────────────────────── */

export const BAHRI = (() => {
  const tfc = 120, wage = 60;
  const TP = [0, 4, 10, 15, 18, 20];         // one fixed factor; labour is the only variable input
  const rows = TP.map((q, l) => {
    const tvc = round2(wage * l);
    const tc = round2(tfc + tvc);
    const prev = l > 0 ? TP[l - 1] : null;
    return {
      l, q, tfc, tvc, tc,
      mp: l > 0 ? round2(q - prev) : null,
      ap: l > 0 ? round2(q / l) : null,
      afc: q > 0 ? round2(tfc / q) : null,
      avc: q > 0 ? round2(tvc / q) : null,
      ac: q > 0 ? round2(tc / q) : null,
      /* Marginal cost over the step that reached this output: the extra cost of ONE more crate. */
      mc: l > 0 ? round2(wage / (q - prev)) : null,
    };
  });
  const at = (q) => rows.find((r) => r.q === q);
  const minAc = Math.min(...rows.filter((r) => r.ac != null).map((r) => r.ac));
  const minAvc = Math.min(...rows.filter((r) => r.avc != null).map((r) => r.avc));
  /*
   * ONE OUTPUT CARRIES THE WHOLE OF SUB-TOPIC 4. At 15 crates the firm's average cost is $20 and its
   * average variable cost is $12, so four given prices — one above AC, one equal to it, one between
   * AVC and AC, and one below AVC — produce the four cases 4a and 4b name, on one column of figures.
   * Nothing here needs the output to be chosen, which is what keeps 3.3.3 out of this section.
   */
  const ref = at(15);
  const outcomeAt = (price) => {
    const revenue = round2(price * ref.q);
    const profit = round2(revenue - ref.tc);
    const lossIfShut = tfc;                  // shut down and the fixed cost is still owed
    return {
      price, revenue, profit,
      lossIfShut,
      coversVariable: price >= ref.avc,
      coversTotal: price >= ref.ac,
      /* What producing saves against shutting down: (P − AVC) × Q, which is the contribution. */
      contribution: round2((price - ref.avc) * ref.q),
      produce: price >= ref.avc,
    };
  };
  return {
    name: 'Bahri Bottling', good: 'bottled water', unit: 'crate', units: 'crates', per: 'a day',
    tfc, wage, rows, at, minAc, minAvc, ref,
    supernormal: outcomeAt(26), normal: outcomeAt(20), shortRunLoss: outcomeAt(16), shutdown: outcomeAt(10),
    outcomeAt,
  };
})();

/* ── Bahri in the long run: LRAC and minimum efficient scale (2d-4, 3a, 3b) ── */
/*
 * Long-run average cost is an envelope rather than an algebraic law, so it is defined here by the
 * three stretches the specification's own vocabulary needs: economies of scale while it falls, a
 * minimum it reaches and holds, and diseconomies of scale while it rises. Minimum efficient scale is
 * then DERIVED — the lowest output at which LRAC is at its minimum, which is 3b's own wording — and
 * not a number typed beside a curve.
 *
 * The runner asserts the one property no validator rule can see: LRAC(q) ≤ SRAC(q) at every row of
 * the short-run table above. A long-run curve lying above a short-run one is impossible, because the
 * long run is the short run with the plant free to change too.
 */
export const LONGRUN = (() => {
  /*
   * THE FALLING STRETCH IS SET SO THAT LRAC TOUCHES THIS FIRM'S SHORT-RUN CURVE AT ITS OWN MINIMUM.
   * A long-run curve that stays strictly BELOW every short-run curve satisfies the envelope
   * inequality and is still wrong: it says the plant the student has spent two chapters on is not
   * the best plant for any output at all, and a student who reads the two tables against each other
   * finds it. With $13 and a gradient of 0.2, LRAC(15) is exactly $20, which is Bahri's own lowest
   * average cost — so the plant taught in chapters 3 and 4 IS the long-run plant for 15 crates a day,
   * and the envelope has a tangency rather than only a ceiling. Found by Layer 6; the runner now
   * asserts the tangency as well as the inequality.
   */
  const floor = 13, mes = 50, slopeDown = 0.2, slopeUp = 0.15, flatTo = 70;
  const lrac = (q) => round2(q < mes ? floor + (mes - q) * slopeDown : q <= flatTo ? floor : floor + (q - flatTo) * slopeUp);
  const outputs = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  return {
    floor, mes, flatTo, lrac, outputs,
    schedule: outputs.map((q) => ({ q, lrac: lrac(q) })),
    /* The fall from the smallest plant on the table to minimum efficient scale. */
    fallToMes: round2(lrac(outputs[0]) - floor),
  };
})();

/* ── the specification's own lists, so every surface reads from one copy ───── */
/*
 * 3d, 3e and 3f are lists of named sources and the specification's wording is the wording that can be
 * asked about. `specGap-01` calls 3d-5 "purchasing/bulk-buying" — `bulk` is 0 in econ_spec.txt — and
 * gives the three diseconomies as "communication, coordination, motivation", where the spec's third
 * is X-INEFFICIENCY (:1339). `motivation` appears once in econ_spec.txt, at :294, in prose about the
 * specification itself. The lists below are the spec's, in its order.
 */
/*
 * EACH SOURCE CARRIES A SHORT PHRASE AND A LONG ONE. The short phrase is the table cell and the long
 * one is the teaching sentence. That split is not tidiness: `gridColumns` computes each column from
 * its own widest cell and THROWS when the table does not fit, and the first version of this file was
 * refused at 868 units against a frame of 508 — the layout refusing a collision before anybody could
 * build one. A table that has to be read at a glance and a sentence that has to explain a mechanism
 * are different lengths, and pretending otherwise is what produced forty-eight collisions in packet 25.
 */
export const INTERNAL_SOURCES = [
  ['Financial', 'borrows at a lower rate', 'a larger firm borrows at a lower rate of interest, because a lender treats it as a smaller risk'],
  ['Technical', 'bigger machines, longer runs', 'a machine or a production run that only pays at high output spreads its cost over more units'],
  ['Managerial', 'specialists worth employing', 'a specialist manager is worth employing once there is enough output for the post to be full-time'],
  ['Marketing', 'one campaign, more units', 'one campaign, one design and one set of packaging artwork are paid for once and used across more units'],
  ['Purchasing', 'a lower price a unit, larger order', 'a supplier quotes a lower price a unit for a larger and more regular order'],
  ['Risk bearing', 'several products, several markets', 'a firm selling several products in several markets is not ruined by one of them going wrong'],
];
export const EXTERNAL_SOURCES = [
  ['Availability of skilled labour', 'workers already trained nearby', 'workers already trained for this industry live nearby, so hiring and training cost less'],
  ['Access to transport links', 'a port or trunk road close by', 'a port, a rail head or a trunk road near the industry lowers what it costs to move goods'],
  ['Sharing knowledge', 'firms and suppliers learn together', 'firms in one place learn from each other, from their suppliers and from a shared research base'],
];
export const DISECONOMY_SOURCES = [
  ['Communication problems', 'messages arrive later and changed', 'a message crosses more people on its way, arrives later and arrives changed'],
  ['Coordination problems', 'more parts to keep in step', 'more parts have to be kept in step, and the effort of keeping them in step grows faster than output'],
  ['X-inefficiency', 'costs drift above the lowest attainable', 'costs drift above the lowest attainable level because nothing inside a large firm forces them down'],
];

/* ── formatting ────────────────────────────────────────────────────────────── */

/*
 * A NEGATIVE FIGURE IS PRINTED WITH U+2212 BY `money` ITSELF, not by a separate helper. Marginal
 * revenue goes negative in this section's own schedule — the half of 1a that a student most needs to
 * see — so a `money` that emitted an ASCII hyphen would put one in every revenue table before anybody
 * remembered to reach for `signedMoney`. Packet 18 shipped 55 of one sign beside 13 of the other.
 */
export const money = (n) => `${n < 0 ? MINUS : ''}$${Number.isInteger(n) ? Math.abs(n).toLocaleString('en-GB') : Math.abs(n).toFixed(2)}`;
/*
 * ONE MINUS SIGN for the whole section (packet 18 shipped 55 of one beside 13 of the other). A PED is
 * negative and appears on a dozen surfaces here, so this matters more in this section than in any
 * before it: every one of them is printed through `elasticity`.
 */
export const MINUS = '−';
export const qty = (n) => n.toLocaleString('en-GB');
export const elasticity = (n) => `${n < 0 ? MINUS : ''}${Math.abs(n).toFixed(2)}`;
export const signedMoney = (n) => `${n < 0 ? MINUS : '+'}${money(Math.abs(n))}`;

/** The validator's own word counter, so the 350-word budget is measured the way step.words measures it. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
