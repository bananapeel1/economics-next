/**
 * PACKET 29 — market-structures-contestability helpers: the id scheme, the validator's own word
 * counter, the specification's own lists, and the SIX exhibits this section carries across its body,
 * diagrams, notes and assessment.
 *
 * IAL Economics 3.3.3 is the largest topic in the programme: econ_spec.txt:1359-1440, eight
 * sub-topics, 54 substantive leaves against packet 22's 46. Nine of its ten diagram-bearing leaves
 * are equilibria — `3b`, `3c`, `3d`, `4c`, `4d`, `6c`, `6h`, `7a`, `7b` — and an equilibrium is a
 * pair of curves meeting at a point. The three findings `accuracy-01`, `-02` and `-03` are all one
 * defect: the March diagrams drew the curves by hand and then typed the point in, so AR sat 13px
 * above AC at a labelled TANGENCY and a monopoly's welfare-loss triangle had an apex nowhere near
 * the intersection it was supposed to be measured from. Packet 17's rule is the answer and it applies
 * here with more force than in any section so far: where a section's arithmetic recurs, define it
 * once as a function and generate every surface from it.
 *
 * So there are no drawn curves in this section. There are cost and demand FUNCTIONS, and the runner
 * re-derives every marked point from them and then re-derives it a second time out of the emitted
 * SVG. A tangency is tangent because AR'(q) equals AC'(q), not because it looks it.
 *
 * ONE COST SPINE CARRIES THREE OF THE EIGHT SUB-TOPICS, AND IT WAS CHOSEN FOR ITS EXACT ROOTS.
 *
 *     TFC = $72   TVC(q) = q³ − 10q² + 40q
 *     AVC(q) = q² − 10q + 40      MC(q) = 3q² − 20q + 40      AC(q) = AVC(q) + 72/q
 *
 *   q      2     3     4     5      6      8      9     10
 *   AVC   24    19    16    15     16     24     31     40
 *   AC    60    43    34    29.40  28     33     39     47.20
 *   MC    12     7     8    15     28     72    103    140
 *
 *   - **min AVC = $15 at 5 crates, and MC(5) = 15.** Marginal cost cuts average variable cost at its
 *     lowest point, exactly, without a curve being drawn.
 *   - **min AC = $28 at 6 crates, and MC(6) = 28.** The same property one curve up, which is what
 *     makes $28 the long-run competitive price rather than a number chosen to look like one.
 *   - The three prices the perfect-competition chapters need are the three exact roots of MC(q) = P:
 *     3q² − 20q − 32 = 0 gives q = 8 at **P = $72**; 3q² − 20q + 12 = 0 gives q = 6 at **P = $28**;
 *     3q² − 20q + 25 = 0 gives q = 5 at **P = $15**. The discriminants are 784, 256 and 100 — three
 *     perfect squares, which is why every figure below is exact and none is rounded.
 *   - At P = $15 the loss is exactly **−$72**, which is total fixed cost, and the contribution
 *     (P − AVC) × Q is exactly **$0**. That is `3c`'s short-run shutdown point: not a price below
 *     which the firm suffers, a price at which producing and stopping come to the same thing.
 *   - q = 7 is left off every table. 72/7 is $10.29 and AC would print as $29.29 beside a total cost
 *     of $205, a discrepancy of a cent a student could find and could not resolve (packet 28's rule).
 *
 * THE SAME SPINE THEN GIVES MONOPOLISTIC COMPETITION ITS TANGENCY FOR FREE. Tangency of AR to AC at
 * an output implies MR = MC there — profit is (AR − AC)q, which is zero with a zero derivative — so
 * fixing the demand curve to touch AC at 4 crates FIXES the profit-maximising output at 4 crates as
 * well, and `4c` and `4d` are then one calculation rather than two drawings that have to agree.
 * AC'(4) = −6.5 exactly, so the long-run demand curve is P = 60 − 6.5Q and nothing else.
 *
 * Every firm is fictional and given no country, as Zuri (packet 16), Tafari (17), Yusra Foods (19),
 * Kavira Ceramics (23), Sabaya (24) and Nadira and Bahri (28) were: the REAL examples carry the
 * internationalisation that `structure-09` asks for, and they carry it by naming a KIND of firm and
 * a kind of market with NO year, NO named company and NO figure. That is how `accuracy-04` is
 * answered rather than patched. It says the section's illustration of low sunk costs — two named
 * airlines said to lease rather than buy their aircraft — is false of both of them. `topFix-05`
 * proposes two other airlines instead. Both are dated claims about a real firm's balance sheet that
 * this repository cannot check, so the SHAPE goes with the claim (packet 15's rule, packet 25's
 * application): what the example has to carry is that an aircraft can be flown somewhere else next
 * week and a rail tunnel cannot, and no company name is required to carry it.
 *
 * One currency, dollars. One minus sign, U+2212, emitted by `money` itself.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'market-structures-contestability';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;

/* ── formatting ────────────────────────────────────────────────────────────── */

/*
 * ONE MINUS SIGN for the whole section, emitted by `money` itself rather than by a separate helper.
 * This section prints a loss on five surfaces — the shutdown case, the welfare loss, the
 * predatory-pricing case, the monopsony wage gap and two practice model answers — and packet 18
 * shipped 55 ASCII hyphens beside 13 of these in a section about negative numbers because the sign
 * lived in a helper somebody had to remember to reach for.
 */
export const MINUS = '−';
export const money = (n) => `${n < 0 ? MINUS : ''}$${Number.isInteger(Math.abs(n)) ? Math.abs(n).toLocaleString('en-GB') : Math.abs(n).toFixed(2)}`;
export const qty = (n) => (Number.isInteger(n) ? n.toLocaleString('en-GB') : n.toFixed(2));
export const pct = (n) => `${Number.isInteger(n) ? n : n.toFixed(1)}%`;
/** An elasticity of demand is negative; a magnitude quoted for comparison is not. */
export const elasticity = (n) => `${n < 0 ? MINUS : ''}${Math.abs(n).toFixed(2)}`;

/* ── the cost spine: one short-run firm, shared by sub-topics 3, 4 and 1 ───── */

const TFC = 72;
export const COSTS = (() => {
  const tvc = (q) => q ** 3 - 10 * q ** 2 + 40 * q;
  const avc = (q) => q ** 2 - 10 * q + 40;
  const mc = (q) => 3 * q ** 2 - 20 * q + 40;
  const ac = (q) => round2(avc(q) + TFC / q);
  const tc = (q) => round2(tvc(q) + TFC);
  const afc = (q) => round2(TFC / q);
  /* The exact rows only: 72/7 and 72/11 do not terminate, so 7 and 11 are not offered. */
  const outputs = [2, 3, 4, 5, 6, 8, 9, 10];
  const rows = outputs.map((q) => ({ q, afc: afc(q), avc: avc(q), ac: ac(q), mc: mc(q), tc: tc(q), tvc: tvc(q) }));
  /*
   * THE TWO MINIMA ARE FOUND, NOT TYPED. `qAtMinAc` is the output on the table with the lowest
   * average cost and the runner separately asserts MC equals AC there — the property that makes it
   * the minimum of the continuous curve and not merely the lowest row.
   */
  const lowestBy = (key) => rows.reduce((best, r) => (r[key] < best[key] ? r : best), rows[0]);
  const atMinAc = lowestBy('ac');
  const atMinAvc = lowestBy('avc');
  /** The profit-maximising output at a given price: the root of MC(q) = P that lies above MC's own minimum. */
  const qAtPrice = (p) => {
    const disc = 400 - 12 * (40 - p);
    const q = (20 + Math.sqrt(disc)) / 6;
    return round2(q);
  };
  const outcomeAt = (p) => {
    const q = qAtPrice(p);
    const revenue = round2(p * q);
    return {
      price: p, q, revenue,
      ac: ac(q), avc: avc(q), afc: afc(q), tc: tc(q),
      profit: round2(revenue - tc(q)),
      perUnit: round2(p - ac(q)),
      /* What producing adds over shutting down: (P − AVC) × Q. Zero at the shutdown point. */
      contribution: round2((p - avc(q)) * q),
      lossIfShut: TFC,
    };
  };
  return {
    tfc: TFC, unit: 'crate', units: 'crates', per: 'a day',
    tvc, avc, mc, ac, tc, afc, rows, outputs, qAtPrice, outcomeAt,
    atMinAc, atMinAvc, minAc: atMinAc.ac, minAvc: atMinAvc.avc,
    /* AC'(q), needed to fix the monopolistic-competition tangency and asserted against it. */
    acSlope: (q) => round2(2 * q - 10 - TFC / q ** 2),
    mcSlope: (q) => round2(6 * q - 20),
  };
})();

/* ── 3 · Perfect competition: one price-taking grower, three prices ────────── */

export const MWANGI = (() => {
  const c = COSTS;
  return {
    name: 'Mwangi Orchards', good: 'fruit', ...c,
    /* P = $72: the short run the chapter opens on. Supernormal profit, which is what draws entry. */
    shortRun: c.outcomeAt(72),
    /* P = $28 = min AC: the long run entry drives the industry to. Normal profit, MC = AC = AR. */
    longRun: c.outcomeAt(28),
    /* P = $15 = min AVC: `3c` exactly. The contribution is zero and the loss is the fixed cost. */
    shutdown: c.outcomeAt(15),
  };
})();

/* ── 4 · Monopolistic competition: the same costs, a differentiated product ── */
/*
 * The long-run demand curve is DERIVED from the cost spine rather than chosen: it is the straight
 * line tangent to AC at 4 crates, so its gradient is AC'(4) and its intercept follows. That single
 * constraint delivers `4c` (profit-maximising equilibrium in the long run), `4d` (neither productive
 * nor allocative efficiency) and the excess capacity the chapter is about, all exactly.
 */
export const NILE = (() => {
  const c = COSTS;
  const qLong = 4;
  const b = -c.acSlope(qLong);                    // 6.5 — the tangency condition
  const aLong = round2(c.ac(qLong) + b * qLong);  // 60
  const qShort = 5;
  const aShort = round2(c.mc(qShort) + 2 * b * qShort); // 80 — MR = MC at 5 crates
  const curve = (a) => ({
    a, b,
    ar: (q) => round2(a - b * q),
    mr: (q) => round2(a - 2 * b * q),
    arSlope: -b,
  });
  /*
   * `mr` IS THE VALUE AT q AND `mrFn` IS THE CURVE, because the first version of this returned the
   * spread `...k` and then overwrote `mr` with a number — so the teaching text read the value it
   * wanted and the diagram module, asking for the curve, got `s.mr is not a function`. Both are
   * needed and they are now named differently: content prints `mr`, the plotter samples `mrFn`.
   */
  const at = (a, q) => {
    const k = curve(a);
    return {
      ...k, q, price: k.ar(q), mr: k.mr(q), mc: c.mc(q), ac: c.ac(q),
      arFn: k.ar, mrFn: k.mr,
      revenue: round2(k.ar(q) * q), tc: c.tc(q),
      profit: round2((k.ar(q) - c.ac(q)) * q),
      perUnit: round2(k.ar(q) - c.ac(q)),
    };
  };
  return {
    name: 'Nile Crafts', good: 'hand-finished tiles', ...c,
    /*
     * `b` IS EXPORTED ON THE FIRM AND NOT ONLY ON EACH DEMAND CURVE. Eight student-facing strings
     * interpolated `NI.b` — three Learn Mode teach bodies, a quiz stem and its explanation, an
     * extras chain step and two diagram titles — and every one of them printed "P = 80 − undefinedQ"
     * and "MR = 80 − NaNQ", because the gradient lived only on `short.b` and `long.b`. Both
     * verifiers found it independently; nothing in the runner or the validator did, because the
     * arithmetic was right and only the LABELS were broken. The two curves share one gradient by
     * construction — entry shifts the demand curve left without changing its slope — so one `b` for
     * the firm is also the honest model.
     */
    b,
    short: at(aShort, qShort),
    long: at(aLong, qLong),
    /* Excess capacity: the gap between the long-run output and the output at the lowest average cost. */
    excessCapacity: round2(c.atMinAc.q - qLong),
    productiveOutput: c.atMinAc.q,
  };
})();

/* ── 6 · Monopoly: linear demand, constant marginal cost, an exact loss ────── */
/*
 * MARGINAL COST IS CONSTANT HERE AND RISING IN THE TWO CHAPTERS BEFORE IT, DELIBERATELY. `6c` wants
 * the profit-maximising equilibrium and `6d` wants what it costs consumers, and the cost is the
 * triangle between the demand curve and marginal cost over the output the monopolist withholds. With
 * a constant MC that triangle has an exact area; with a rising one it has an area a student cannot
 * compute and a diagram cannot honestly shade. `accuracy-03` is a triangle whose apex was 46 units
 * from the intersection it claimed to start at, so this is the finding's root and not its symptom.
 */
export const ZAHRA = (() => {
  const a = 120, b = 4, mc = 24;
  const ar = (q) => round2(a - b * q);
  const mr = (q) => round2(a - 2 * b * q);
  const qm = round2((a - mc) / (2 * b));
  const qc = round2((a - mc) / b);
  const pm = ar(qm);
  const surplus = (q) => round2(0.5 * q * (a - ar(q)));
  return {
    name: 'Zahra Water', good: 'piped water', unit: 'megalitre', units: 'megalitres', per: 'a day',
    a, b, mc, ar, mr,
    qm, pm, qc, pc: mc,
    profit: round2((pm - mc) * qm),
    /* ½ × the output withheld × the gap between price and marginal cost. */
    dwl: round2(0.5 * (qc - qm) * (pm - mc)),
    csMonopoly: surplus(qm), csCompetition: surplus(qc),
    withheld: round2(qc - qm),
    /* |PED| on a straight line: (1/b) × (P/Q). At the profit-maximising output it is above one. */
    pedAtQm: round2((1 / b) * (pm / qm)),
  };
})();

/* ── 6e · Natural monopoly: an average cost that never stops falling ───────── */
/*
 * `specGap-02` asks for continuously falling LRAC, minimum efficient scale against the size of the
 * market, and why competition is wasteful. All three are one division: a fixed network cost spread
 * over output. Splitting the market does not move the curve, it moves the firm along it, and the
 * arithmetic says how much that costs.
 */
export const NATURAL = (() => {
  const networkCost = 9000, perUnit = 2, market = 1000;
  const lrac = (q) => round2(perUnit + networkCost / q);
  return {
    networkCost, perUnit, market, lrac,
    one: lrac(market),
    two: lrac(market / 2),
    outputs: [125, 200, 250, 500, 1000, 1500, 2000],
    extraPerUnit: round2(lrac(market / 2) - lrac(market)),
    extraTotal: round2((lrac(market / 2) - lrac(market)) * market),
  };
})();

/* ── 6f, 6g · Third-degree price discrimination: two markets, one seller ───── */
/*
 * The condition `6f` names that a student most often cannot state is DIFFERENT ELASTICITIES, so the
 * two markets are built to have exact ones: |PED| = 1.50 where the price is higher and 2.00 where it
 * is lower. That is the result `6g` turns on, and it is arithmetic here rather than an assertion.
 */
export const PD = (() => {
  const mc = ZAHRA.mc;
  const market = (label, who, a, b) => {
    const q = round2((a - mc) / (2 * b));
    const p = round2(a - b * q);
    return { label, who, a, b, q, price: p, ped: round2((1 / b) * (p / q)), profit: round2((p - mc) * q) };
  };
  const firm = market('Market A', 'business users with no alternative supply', 120, 4);
  const house = market('Market B', 'households who can store or go without', 72, 1.5);
  return {
    mc,
    less: firm, more: house,
    totalProfit: round2(firm.profit + house.profit),
    gap: round2(firm.price - house.price),
  };
})();

/* ── 7 · Monopsony: one buyer of labour ────────────────────────────────────── */
/*
 * `7a` and `7b` are the whole of sub-topic 7 and the live section teaches neither (`specGap-01`,
 * `quiz-01`). The mechanism is the mirror of monopoly and the arithmetic is the same trick: the
 * supply curve of labour is the AVERAGE cost of labour, so the MARGINAL cost of labour falls twice
 * as fast — the buyer bidding the wage up for everyone it already employs, not only for the next
 * worker. Both equilibria are exact and the runner re-derives them.
 *
 * `quiz-01` also says the live explanation mislabels the mechanism as "MCL = marginal benefit" for a
 * generic input buyer. The condition is the marginal cost of the input against its marginal revenue
 * product, and that is the wording used on every surface here.
 */
export const MONOPSONY = (() => {
  const w0 = 20, slope = 2.5, mrp0 = 200, mrpSlope = 5;
  const supply = (L) => round2(w0 + slope * L);      // AC of labour
  const mcl = (L) => round2(w0 + 2 * slope * L);     // twice the gradient
  const mrp = (L) => round2(mrp0 - mrpSlope * L);
  const lMono = round2((mrp0 - w0) / (2 * slope + mrpSlope));
  const lComp = round2((mrp0 - w0) / (slope + mrpSlope));
  return {
    name: 'the only cannery in a fishing town', input: 'workers',
    w0, slope, mrp0, mrpSlope, supply, mcl, mrp,
    outputs: [4, 8, 12, 16, 18, 20, 24, 28],
    mono: { l: lMono, wage: supply(lMono), mcl: mcl(lMono), mrp: mrp(lMono) },
    comp: { l: lComp, wage: supply(lComp), mrp: mrp(lComp) },
    wageGap: round2(supply(lComp) - supply(lMono)),
    jobGap: round2(lComp - lMono),
    /* The gap between what the last worker adds and what they are paid. */
    exploitationGap: round2(mrp(lMono) - supply(lMono)),
  };
})();

/* ── 2 · Concentration ratios ──────────────────────────────────────────────── */
/*
 * `2a` is a calculation and `2b` is its interpretation, and `specGap-04` names only the first. The
 * shares below are chosen so that the three-firm and five-firm ratios are both whole numbers and so
 * that the SECOND reading — that a CR can hide the shape of the market — is available from the same
 * table: three firms hold 64% and the next two hold 16%, so a CR3 of 64 and a CR5 of 80 describe the
 * same market and answer different questions.
 */
export const CR = (() => {
  const firms = [
    ['Firm A', 28], ['Firm B', 22], ['Firm C', 14], ['Firm D', 9], ['Firm E', 7],
  ];
  const share = (n) => firms.slice(0, n).reduce((s, [, x]) => s + x, 0);
  return {
    firms,
    others: round2(100 - share(firms.length)),
    cr3: share(3), cr5: share(5),
    /* A second market with the same CR5 and a different shape, for `2b`. */
    twin: { name: 'a second market', firms: [['Firm P', 17], ['Firm Q', 16], ['Firm R', 16], ['Firm S', 16], ['Firm T', 15]], cr3: 49, cr5: 80 },
  };
})();

/* ── 5c-1 · Simple game theory: two firms, two outcomes ────────────────────── */
/*
 * The specification asks for a "simple game theory – two firm/two outcome model" and nothing larger,
 * so the payoffs are a 2×2 and the properties a student has to be able to READ OFF it are derived
 * below rather than described: that cutting is the better reply to either choice by the other firm,
 * that both cutting is therefore where the pair ends up, and that both holding would have paid both
 * of them more. `matrixSvg` draws it and throws if a cell does not fit one line.
 */
export const GAME = (() => {
  const profits = {
    holdHold: [50, 50],
    cutHold: [70, 20],
    holdCut: [20, 70],
    cutCut: [30, 30],
  };
  /*
   * BOTH COMPARISONS READ FIRM A'S OWN PAYOFF, WHICH IS INDEX 0 IN EVERY PAIR. The first version of
   * this file read `holdCut[1]` for the second one — Firm B's 70 rather than Firm A's 20 — and
   * reported that cutting is NOT a dominant strategy for a payoff matrix in which it plainly is.
   * The check was wrong and the matrix was right, which is the only reason it was caught: a derived
   * property that disagrees with the arithmetic is visible, and a typed one is not.
   */
  const cutBeatsHoldIfRivalHolds = profits.cutHold[0] > profits.holdHold[0];
  const cutBeatsHoldIfRivalCuts = profits.cutCut[0] > profits.holdCut[0];
  return {
    firmA: 'Delta Freight', firmB: 'Orion Freight', unit: '$m a year',
    ...profits,
    nash: profits.cutCut,
    collusive: profits.holdHold,
    dominant: cutBeatsHoldIfRivalHolds && cutBeatsHoldIfRivalCuts,
    /* What the pair loses between them by both cutting rather than both holding. */
    jointLoss: round2(profits.holdHold[0] + profits.holdHold[1] - profits.cutCut[0] - profits.cutCut[1]),
    temptation: round2(profits.cutHold[0] - profits.holdHold[0]),
  };
})();

/* ── 5b-2, 5e · Limit pricing and predatory pricing, on one incumbent ──────── */
/*
 * These two are distinguished by ONE arithmetic fact and students conflate them constantly: a limit
 * price is below the ENTRANT's average cost and above the incumbent's, so the incumbent still
 * profits; a predatory price is below the INCUMBENT's own average variable cost, so it does not.
 * `specGap-05` asks for both and the live section teaches neither (limit pricing appears only as the
 * answer to a quiz item). The figures come off the same page so the contrast is visible at a glance.
 */
export const PRICING = (() => {
  const incumbentAc = 20, incumbentAvc = 16, entrantAc = 32;
  const limit = 28, predatory = 14, afterwards = 34;
  return {
    incumbentAc, incumbentAvc, entrantAc, limit, predatory, afterwards,
    limitMarginIncumbent: round2(limit - incumbentAc),
    limitMarginEntrant: round2(limit - entrantAc),
    predatoryLossPerUnit: round2(predatory - incumbentAvc),
    recoveredPerUnit: round2(afterwards - incumbentAc),
  };
})();

/* ── the specification's own lists, so every surface reads from one copy ───── */
/*
 * EACH ROW CARRIES A SHORT PHRASE AND A LONG ONE. The short phrase is the table cell and the long one
 * is the teaching sentence. That split is not tidiness: `gridColumns` computes each column from its
 * own widest cell and THROWS when the table does not fit, and `diagram.table-legible` was
 * recalibrated on 17 September to the 530px column a laptop actually gives. A cell that has to be
 * read at a glance and a sentence that has to explain a mechanism are different lengths.
 */

/** `1a` — the four concepts, in the specification's order, plus what each one is about. */
export const EFFICIENCY = [
  ['Allocative', 'P = MC', 'the mix of goods matches what buyers value: price equals marginal cost, so the last unit is worth exactly what it cost to make'],
  ['Productive', 'lowest AC', 'output is produced at the lowest attainable average cost, which is the bottom of the average cost curve'],
  ['Dynamic', 'costs fall over time', 'investment and innovation lower costs or improve the product over time, which the other two say nothing about'],
  ['X-inefficiency', 'above lowest cost', 'costs sit above the lowest attainable level for the output being produced, because nothing is forcing them down'],
];

/** `5b` — the six barriers, in the specification's order. `specGap-10` files these under Contestability; they are :1386-1391, Oligopoly. */
export const BARRIERS = [
  ['Economies of scale', 'incumbent produces at lower AC', 'an incumbent at a large scale has a lower average cost than any firm entering small could reach'],
  ['Limit pricing', 'price set below an entrant’s AC', 'the incumbent holds its price below the average cost an entrant would face, so entry cannot pay'],
  ['Patents', 'the method is owned', 'a patent makes the method or the product legally unavailable to anyone else for a period'],
  ['Branding', 'buyers must be won over', 'buyers attached to an established name have to be won away from it, which costs an entrant money before it sells anything'],
  ['Sunk costs', 'spending that cannot be recovered', 'spending that cannot be recovered if the firm leaves, so the risk of entering is larger than the risk of staying out'],
  ['Legal', 'entry is restricted by law', 'a licence, a franchise or a statutory monopoly restricts who may operate in the market at all'],
];

/** `5c` — the five faces of interdependence, in the specification's order. */
export const INTERDEPENDENCE = [
  ['Game theory', 'each firm plans around the other', 'a two-firm, two-outcome model in which each firm’s best move depends on what it expects the other to do'],
  ['Collusive behaviour', 'agree, openly or tacitly', 'firms act together on price or output, whether by agreement or by each following a pattern without one'],
  ['Non-collusive behaviour', 'compete and expect retaliation', 'firms act independently, each expecting the others to respond to whatever it does'],
  ['Cartels', 'a formal agreement on price or output', 'a formal agreement between firms to fix a price or restrict output, which is illegal in most jurisdictions'],
  ['Price leadership', 'one firm moves and the rest follow', 'one firm changes its price and the others follow it, so prices move together with no agreement at all'],
];

/** `5e` — price competition. `price wars` is also `5c-5`; it appears in both lists and that is the specification's own doing. */
export const PRICE_COMPETITION = [
  ['Price wars', 'rounds of matching cuts', 'each firm matches the last cut and all of them end up selling at a lower price than any of them wanted'],
  ['Predatory pricing', 'below the seller’s own AVC', 'a price below the seller’s own average variable cost, held long enough to drive a rival out and then raised'],
  ['Limit pricing', 'below an entrant’s AC', 'a price below the average cost an entrant would face, held to stop entry rather than to remove a rival'],
];

/** `5f` — the five forms of non-price competition. `specGap-06` names "loyalty schemes", which is 0 hits in econ_spec.txt, and omits three of these. */
export const NON_PRICE = [
  ['Advertising and branding', 'make the name mean something', 'spending that makes buyers ask for this firm’s product by name rather than compare prices'],
  ['Quality', 'a better product at the same price', 'a product that lasts longer or works better, which wins buyers without a price cut'],
  ['Endorsement', 'somebody buyers trust says so', 'a person or body buyers already trust is associated with the product'],
  ['Product placement', 'the product appears where buyers look', 'the product is shown in a setting buyers are already watching rather than in an advertisement'],
  ['After-sales service', 'the firm is there afterwards', 'servicing, warranties and support that make the purchase less risky'],
];

/** `4b` — the three types of product differentiation. These are `specThin-01`, `-02` and `-03`: named in the live section and never explained. */
export const DIFFERENTIATION = [
  ['Physical', 'product features', 'the product itself differs — what it is made of, what it does, how long it lasts, how it looks'],
  ['Marketing', 'advertising, packaging', 'the product may be near-identical and the way it is presented is not: the name, the advertising, the packaging'],
  ['Distribution', 'shop, online, telephone', 'where and how the product can be bought — in a shop, online, by telephone — which is part of what the buyer is choosing'],
];

/** `8a` — the characteristics of a contestable market, which `structure-08` says students reduce to low entry barriers alone. */
export const CONTESTABLE = [
  ['Low barriers to entry', 'a new firm can start', 'nothing legal, technical or financial stops a new firm from beginning to trade'],
  ['Low barriers to exit', 'and can stop again', 'a firm that enters and does badly can leave without losing what it spent getting in'],
  ['Low sunk costs', 'the assets go elsewhere', 'the assets can be sold or used in another market, so entering is not a one-way bet'],
  ['Equal access to technology', 'no secret method', 'an entrant can obtain the same methods and the same inputs as the firms already there'],
  ['Perfect information', 'the profits are visible', 'potential entrants can see that the incumbents are earning more than normal profit'],
];

/* ── the word counter the validator itself uses ────────────────────────────── */

/** The validator's own word counter, so the 350-word budget is measured the way `step.words` measures it. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
