/**
 * PACKET 29 — market-structures-contestability, Learn Mode content and Notes.
 *
 * Economics Unit 3 (WEC13), IAL topic 3.3.3, audit/raw/econ_spec.txt:1359-1440 — a span that crosses
 * a page break and resumes at :1411 as "3.3.3 Market structures and contestability (continued)",
 * where sub-topic 5 finishes and monopoly, monopsony and contestability begin. EIGHT blocks,
 * forty-four subsections, one idea each, in the specification's own order.
 *
 * EIGHT AND NOT SEVEN, and the cost is named rather than discovered. `freeQuizPayload()` gives every
 * chapter a question first and then tops up the pre-test's headroom, all bounded by FREE_QUIZ_MAX
 * (10), so at eight blocks a signed-out student's pre-test is two questions rather than three and at
 * nine it is one (NEXT.md, measured against the shipping functions on 17 September). Seven chapters
 * would carry 54 leaves at 7.7 a chapter against the 6.6 packet 22 proved at 46 leaves in seven, and
 * would mean folding two of the three oligopoly chapters together — when Oligopoly alone is 25 of the
 * 54 leaves, nearly half the section. Specification order also puts Oligopoly before Monopoly, which
 * `structure-07` says explicitly works, and fixes `structure-03` and `structure-04` at the root the
 * way packet 20 did rather than patching the fallback that produced them.
 *
 * FIVE SCOPE DECISIONS THE SPECIFICATION SETTLED BEFORE A WORD WAS WRITTEN (see NEXT.md for all
 * eleven wrong claims; these are the five that changed what is on the page):
 *
 *   - THE KINKED DEMAND CURVE IS GONE, AND IT HAD A SUBSECTION, A DIAGRAM, QUIZ ITEMS AND A 20-MARK
 *     ESSAY. `kinked` is **0 hits** in econ_spec.txt. `specGap-12` says it does not recall the model
 *     as an IAL bullet and asks for it to be verified before keeping it at that weight; verified, and
 *     it is not there. What the specification asks for instead, at :1393-1399, is `5c`
 *     Interdependence of firms: simple game theory in a two-firm/two-outcome model, reasons for
 *     collusive and non-collusive behaviour, cartels, price leadership, price wars. Those five are
 *     block 5. This is the rule-2 case in its hardest form — an audit item tells you what is MISSING
 *     and never what is PRESENT and should not be — and the section's own `common_mistakes` already
 *     warned students not to confuse the kinked demand curve with game theory, which is the clue
 *     that the model was doing a job the specification had given to something else.
 *   - THE BARRIERS TAXONOMY IS OLIGOPOLY'S, NOT CONTESTABILITY'S. `specGap-10` asks for "types of
 *     barriers to entry and exit (legal, sunk costs, economies of scale, brand loyalty, predatory
 *     behaviour)" under Contestability. The taxonomy is `5b` at :1386-1391 and its six bullets are
 *     economies of scale, limit pricing, patents, branding, sunk costs and legal. "Predatory
 *     behaviour" is not among them; it is `5e-2`, price competition. So the six are taught in block 4
 *     and contestability refers back to them, which is also what makes `8d` — the significance of
 *     sunk costs — a conclusion rather than a definition repeated.
 *   - MONOPOLY'S STAKEHOLDERS ARE FIRMS AND CONSUMERS. `specGap-08` asks for "costs and benefits of
 *     monopoly to firms, employees and suppliers (spec asks for all stakeholder groups)". `6d` at
 *     :1426 says firms and consumers. Employees and suppliers are `5g`'s list and workers are `5d`'s;
 *     the finding has imported another leaf's stakeholders into this one. Each leaf gets the groups
 *     the specification gives it, which is why block 5 discusses workers and governments, block 6
 *     employees and suppliers, and block 7 firms and consumers.
 *   - NON-PRICE COMPETITION HAS FIVE FORMS AND "LOYALTY SCHEMES" IS NOT ONE. `specGap-06` names
 *     advertising, branding, loyalty schemes and quality. `loyalty scheme` is 0 hits; `5f` at
 *     :1417-1421 is advertising and branding, quality, ENDORSEMENT, PRODUCT PLACEMENT and AFTER-SALES
 *     SERVICE. The finding omits three of the five it was written to ask for.
 *   - THE SHORT-RUN SHUTDOWN POINT IS SHARED WITH 3.3.2 AND IS APPLIED HERE, NOT RE-TAUGHT.
 *     `specGap-11` is unsure whether it belongs to this section. It belongs to both: `3.3.3 · 3c` at
 *     :1372 under Perfect competition, and `3.3.2 · 4b` at :1353 as "short-run and long-run shutdown
 *     points", which is packet 28's section and whose last diagram is titled for it. X-inefficiency
 *     divides the same way — `3.3.2 · 3f` owns it as a source of diseconomies of scale, `3.3.3 · 1a-4`
 *     as a concept of efficiency — and packet 28's runner bans from itself, as this section's
 *     material, exactly what this section owns: profit maximisation, MR = MC, perfect competition,
 *     monopoly, allocative, productive and dynamic efficiency, barriers to entry and sunk costs.
 *
 * Money is in dollars throughout. Every figure belongs to one of the six exhibits in
 * `_packet29-util.mjs` and is derived there. Real examples name a KIND of firm in a kind of market
 * and carry NO year, NO named company and NO figure — which is how `structure-09` (every example UK
 * and unrecognisable to students in Hong Kong, Malaysia, Pakistan or the Gulf) and `accuracy-04` (two
 * named airlines said to lease aircraft they mostly own) are answered by the same decision.
 */
import {
  subId, SECTION, hash8, money, qty, pct, elasticity, round2,
  COSTS, MWANGI, NILE, ZAHRA, NATURAL, PD, MONOPSONY, CR, GAME, PRICING,
  EFFICIENCY, BARRIERS, INTERDEPENDENCE, PRICE_COMPETITION, NON_PRICE, DIFFERENTIATION, CONTESTABLE,
} from './_packet29-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;

/*
 * The validator reads a why line off each match PAIR and each classify GROUP
 * (lib/content-validator.mjs:458, :478), while a reorder carries one array for the whole recall.
 * Authoring keeps the single `why` array in every case and it is distributed here, so a reason cannot
 * drift away from the item it explains and a missing one is a length mismatch rather than a silent
 * undefined.
 */
const recall = (sid, r) => {
  const out = { id: `${sid}:recall`, ...r };
  if (r.type === 'match' && Array.isArray(r.why)) { out.pairs = r.pairs.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  if (r.type === 'classify' && Array.isArray(r.why)) { out.groups = r.groups.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  return out;
};

const M = MWANGI, NI = NILE, Z = ZAHRA, NAT = NATURAL, MS = MONOPSONY, G = GAME, PR = PRICING;

export const B1 = 'Efficiency and Concentration';
export const B2 = 'Perfect Competition';
export const B3 = 'Monopolistic Competition';
export const B4 = 'Oligopoly: Barriers to Entry and Exit';
export const B5 = 'Oligopoly: Interdependence and Collusion';
export const B6 = 'Oligopoly: Price and Non-Price Competition';
export const B7 = 'Monopoly';
export const B8 = 'Monopsony and Contestability';

/* ══ Block 1 — Efficiency and concentration (3.3.3 · 1a, 2a, 2b) ════════════ */
/*
 * THIS CHAPTER EXISTS BECAUSE OF `structure-05`, AND IT IS THE ONE STRUCTURAL FINDING IN THIS SECTION
 * THAT COULD NOT BE FIXED WITHIN A CHAPTER. The live section used allocative, productive and dynamic
 * efficiency from its first subsection onward and defined them in its LAST, and the specification
 * puts Efficiency first at :1363. Moving the definitions forward is not a tidying-up: every one of
 * the four structures is then judged against a standard the student already holds, which is what
 * makes `3d`, `4d` and `6h` comparisons rather than three separate lists.
 */

const allocativeEfficiency = (() => {
  const sid = subId('allocative-efficiency');
  return {
    id: sid,
    title: 'Allocative Efficiency',
    keyIdea: `Allocative efficiency is reached where price equals marginal cost, so the last unit produced is worth exactly what it cost society to make.`,
    body: [
      { type: 'paragraph', text: `The seven chapters after this one describe the market structures in turn, and each ends with the same question: is this a good way to organise an industry? **Efficiency** is how that question is answered, and there are three kinds of it plus one kind of failure.` },
      { type: 'paragraph', text: `**Allocative efficiency** is about the MIX of what gets produced. It is reached where **P = MC**.` },
      { type: 'paragraph', text: `The reason that condition means what it does is worth slowing down for. A price is what the last buyer was willing to pay, so it measures the value of the last unit to whoever bought it. Marginal cost is what the resources used to make that unit would otherwise have produced. So where price equals marginal cost, the last unit is worth exactly what it cost to make.` },
      { type: 'paragraph', text: `Where **P > MC**, the last unit is worth more than it cost, so there are units worth making that are not being made: too little is produced. Where **P < MC**, resources are going into units worth less than they cost: too much is produced.` },
    ],
    realExample: { emoji: '🚰', text: `A piped-water network that charges well above the cost of supplying one more litre is allocatively inefficient: there are households that value water at more than it costs to deliver and are not buying it.` },
    misconception: `Students read "allocative efficiency" as "producing as cheaply as possible". That is the next definition. Allocative efficiency is about producing the right MIX of goods, and its test is a comparison of price with marginal cost, not a comparison of one firm's costs with another's.`,
    examMatters: `Appendix 6 defines Define as requiring knowledge and understanding only: the meaning of a term, concept or phrase. Two marks for allocative efficiency means the condition and what the condition means, which are two things and not one said twice.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Apply the condition to a firm charging ${money(40)} where the last unit cost ${money(25)} to make:`,
      template: [
        `Price ${money(40)} against marginal cost ${money(25)}: the last unit is worth ___ than it cost`,
        'So there are units worth making that are not being made, and the market produces too ___',
        `To reach allocative efficiency this firm would have to ___ its price to ${money(25)}`,
      ],
      answers: ['more', 'little', 'lower'],
      hints: ['compare the two figures', 'the direction of the shortfall', 'what has to happen to the price'],
      distractors: ['less', 'much', 'raise'],
    }),
  };
})();

const productiveEfficiency = (() => {
  const sid = subId('productive-efficiency');
  return {
    id: sid,
    title: 'Productive Efficiency',
    keyIdea: `Productive efficiency is reached at the lowest point of the average cost curve, where the output being made costs as little per unit as it can.`,
    body: [
      { type: 'paragraph', text: `**Productive efficiency** is about the COST of what gets produced. A firm is productively efficient when it is producing at the **lowest attainable average cost** — the bottom of its average cost curve.` },
      { type: 'paragraph', text: `${M.name} grows ${M.good} and sells it by the ${M.unit}. Its average cost is ${money(M.ac(4))} a ${M.unit} at ${qty(4)} ${M.units} ${M.per}, ${money(M.minAc)} at ${qty(M.atMinAc.q)}, and ${money(M.ac(9))} at ${qty(9)}. Only one of those outputs can be the productively efficient one: below it the fixed cost is spread too thinly, and above it the variable cost per ${M.unit} climbs faster than the fixed cost thins.` },
      { type: 'paragraph', text: `There is a marker for that output that needs no table at all. Marginal cost cuts average cost from below at exactly the point where average cost is lowest, so **MC = AC** identifies it wherever the two curves meet from below.` },
      { type: 'paragraph', text: `Note what productive efficiency does NOT say. It says nothing about whether this is the right good to be growing, and nothing about whether the price is reasonable. It is a statement about one firm's costs and about nothing else.` },
    ],
    realExample: { emoji: '🏭', text: `A cement works running one kiln below its designed throughput has a higher cost a tonne than the same works running it at capacity. Nothing about the market has changed; only how much of the plant is being used.` },
    misconception: `Students write that a firm with low costs is productively efficient. Low compared with what? The test is the firm's own lowest ATTAINABLE average cost, which is a point on its own curve — so a firm can have the lowest costs in its industry and still be missing it.`,
    examMatters: `Appendix 6 defines Explain of a term or the characteristics as requiring knowledge, understanding and application. Applying it here means naming the output, not only the condition: which point on the curve, and how you know it is that one.`,
  };
})();

const dynamicEfficiency = (() => {
  const sid = subId('dynamic-efficiency');
  return {
    id: sid,
    title: 'Dynamic Efficiency',
    keyIdea: `Dynamic efficiency is about improvement over time: investment and innovation that shift the cost curves down or make the product better.`,
    body: [
      { type: 'paragraph', text: `The first two kinds of efficiency are photographs. They describe a firm at a moment, with its cost curves where they are. **Dynamic efficiency** is about whether those curves MOVE.` },
      { type: 'paragraph', text: `A dynamically efficient industry invests and innovates, so over time average costs fall at every output — the whole curve shifts down — or the product improves at the same cost. Neither shows up in a static diagram at all, which is why a market structure can look poor on the first two tests and defensible on the third.` },
      { type: 'paragraph', text: `What pays for it matters. Investment and research have to be funded, and profit above the normal level is where the funding usually comes from. So there is a real tension in this topic, and it runs through all four structures: the profit that looks like a cost to consumers today may be what buys them lower costs later.` },
      { type: 'paragraph', text: `The tension is not resolved by definition. A firm earning supernormal profit MAY invest it, and may equally distribute it or let costs drift. Chapters 2 and 7 are the two ends of that argument.` },
    ],
    realExample: { emoji: '📡', text: `A mobile network that reinvests in a new generation of equipment lowers its cost per gigabyte year after year. A network that pays the same money out instead has the same costs in ten years that it has today.` },
    misconception: `Students treat dynamic efficiency as a third box to tick on a static diagram, and look for a point on the curves. It cannot be shown on one diagram, because it is a claim about how the diagram changes. Instead: talk about the curve shifting, and say what funds the shift.`,
    examMatters: `Appendix 6 says Analyse focuses on depth rather than breadth and does not include evaluation. A chain about dynamic efficiency has to reach the cost curve moving; stopping at "the firm can invest" has not said what the investment does.`,
  };
})();

const xInefficiency = (() => {
  const sid = subId('x-inefficiency');
  const wasteful = 32;
  return {
    id: sid,
    title: 'X-Inefficiency',
    keyIdea: `X-inefficiency is producing above the lowest attainable cost for the output being made — waste, not a wrong choice of output.`,
    body: [
      { type: 'paragraph', text: `The three kinds of efficiency all assume the firm is doing as well as it possibly could with what it has. **X-inefficiency** is the assumption failing.` },
      { type: 'paragraph', text: `A firm is X-inefficient when its costs sit **above the lowest attainable level** for the output it is producing — not because it has chosen the wrong output, but because nothing is forcing it to keep costs down. On a diagram the firm is not on its average cost curve at all; it is at a point above it.` },
      { type: 'paragraph', text: `${M.name} at ${qty(M.atMinAc.q)} ${M.units} ${M.per} should have an average cost of ${money(M.minAc)}. Suppose it actually runs at ${money(wasteful)} a ${M.unit}: overtime nobody checks, stock that spoils, a lorry running half full. That is ${money(round2(wasteful - M.minAc))} a ${M.unit} of X-inefficiency, or ${money(round2((wasteful - M.minAc) * M.atMinAc.q))} ${M.per} — and a competitor at ${money(M.minAc)} can undercut it while earning more.` },
      { type: 'paragraph', text: `The word "forcing" is the reason X-inefficiency belongs in this topic at all rather than in a chapter about management. What forces costs down is the prospect of losing customers or losing the firm. Where that prospect is remote, the costs drift — and how remote it is depends on the market structure, which is the next six chapters.` },
    ],
    realExample: { emoji: '🚌', text: `A bus operator holding an exclusive route licence can carry an expensive depot and an over-staffed roster for years. The same operator bidding to keep the route every three years cannot.` },
    misconception: `Students use X-inefficiency as a general word for "badly run", or confuse it with producing at the wrong output. Producing away from the bottom of the average cost curve is productive inefficiency; being ABOVE the curve at whatever output you have chosen is X-inefficiency.`,
    examMatters: `Appendix 6 defines Define as the meaning of a term, concept or phrase. The meaning here has two parts that are easy to collapse into one: costs above the lowest attainable level, and for the output actually being produced.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each description by which kind of efficiency or inefficiency it describes:',
      groups: [
        { name: 'Productive inefficiency', items: ['A cannery running one shift a day in a plant built for three', 'A grower picking 2 crates where 6 would cost less each'] },
        { name: 'X-inefficiency', items: ['A depot paying overtime nobody has checked for two years', 'Stock spoiling in a warehouse because no one counts it', 'A lorry sent out half full on a route that runs daily'] },
        { name: 'Allocative inefficiency', items: ['A water network charging four times what the last litre costs to deliver', 'Households that would pay more than the supply cost and are not served'] },
      ],
      why: [
        'Productive inefficiency is a wrong choice of OUTPUT: the firm is on its cost curve, at the wrong point on it.',
        'X-inefficiency is a failure at whatever output has been chosen: the firm is above its own cost curve.',
        'Allocative inefficiency is about the MIX of goods, and its test compares price with marginal cost.',
      ],
    }),
  };
})();

const efficiencyAcrossStructures = (() => {
  const sid = subId('efficiency-across-structures');
  return {
    id: sid,
    title: 'Efficiency in Different Market Structures',
    keyIdea: `The number of firms, the ease of entry and the similarity of the product decide how much pressure a firm is under on price and on cost.`,
    body: [
      { type: 'paragraph', text: `The specification asks for efficiency **in different market structures**, so before the structures arrive, here is what separates them. Three questions do almost all the work.` },
      { type: 'bullets', items: [
        `**How many firms sell in this market, and how large are the largest?** One, a few, or many.`,
        `**Can a new firm enter, and can a firm leave without losing what it spent?** Freely, or not at all.`,
        `**Is one firm's product the same as another's, or different?** Identical, or differentiated.`,
      ] },
      { type: 'paragraph', text: `Those answers decide how much **pressure** a firm is under. Where entry is free and the product identical, a firm charging above cost loses every customer and one letting costs drift is undercut — so price is pushed towards marginal cost and cost towards its minimum. Where entry is blocked and the product unique, neither pressure operates.` },
      { type: 'paragraph', text: `So the four structures in this section are not four separate topics. They are four settings of the same three dials, and each chapter ends by asking what those settings do to the efficiency tests you have just learnt. Chapter 2 is one extreme, chapter 7 is the other, and the two in between are where almost every real market sits.` },
    ],
    realExample: { emoji: '🥬', text: `A wholesale vegetable market at dawn and a city's only water network are the two extremes in the same city: dozens of sellers of an identical product who cannot influence the price, and one seller of something nobody else may supply.` },
    misconception: `Students learn the four structures as lists of features to recite. The features ARE the reasons a structure produces the efficiency outcome it does. Instead: name the assumption, then the pressure it creates or removes.`,
    examMatters: `Appendix 6 says Examine requires evaluation and a brief assessment of the arguments as well as a chain of reasoning. Comparing two structures on efficiency is that shape: the chain is why each produces its outcome, the assessment is which consideration weighs more.`,
  };
})();

const concentrationRatios = (() => {
  const sid = subId('concentration-ratios');
  const rows = CR.firms.map(([n, s]) => `${n} ${pct(s)}`).join(', ');
  return {
    id: sid,
    title: 'Calculating an n-Firm Concentration Ratio',
    keyIdea: `An n-firm concentration ratio is the combined market share of the largest n firms: add the shares, and say which n you used.`,
    body: [
      { type: 'paragraph', text: `"A few firms" needs a number. The **n-firm concentration ratio** supplies one: the combined market share of the largest n firms in the market.` },
      { type: 'paragraph', text: `Take a market with these shares: ${rows}, with the remaining ${pct(CR.others)} spread among small firms.` },
      { type: 'paragraph', text: `The **three-firm concentration ratio** is the largest three added together: ${CR.firms.slice(0, 3).map(([, s]) => pct(s)).join(' + ')} = **${pct(CR.cr3)}**. The **five-firm concentration ratio** adds the next two: ${pct(CR.cr3)} + ${pct(CR.firms[3][1])} + ${pct(CR.firms[4][1])} = **${pct(CR.cr5)}**.` },
      { type: 'paragraph', text: `Two things about the arithmetic. Shares must all be measured the same way — by sales value, by volume or by capacity, but not a mixture — and the answer is meaningless without its n. "A concentration ratio of ${pct(CR.cr5)}" does not say anything until you know it is five firms and not three.` },
      { type: 'paragraph', text: `Market share itself is one firm's sales as a percentage of total sales in the market, so the definition of "the market" decides the answer. A national ratio and a city ratio for the same industry can be far apart.` },
    ],
    realExample: { emoji: '📱', text: `Mobile networks are a standard case: a country with three licensed networks has a three-firm concentration ratio of 100% by construction, which tells you about the licensing rather than about the competition.` },
    misconception: `Students quote a concentration ratio without its n, or compare a CR3 in one market with a CR5 in another and conclude that the second is more concentrated. Instead: state n every time, and compare like with like.`,
    examMatters: `Appendix 6 defines Calculate as requiring a calculation involving several stages based on given data, and advises showing workings. Two stages is still several: write both of them down, because an answer that shows only its total cannot be followed if the arithmetic slips.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'Complete the method for a concentration ratio:',
      /*
       * THE ANSWERS MUST BE UNIQUE, CASE-INSENSITIVELY. The first version of this recall asked for
       * `n` in two blanks — how many firms, and what the answer must be quoted with — and
       * `fillin.dup-answers` is a BLOCK precisely because the second chip vanishes when its twin is
       * placed and the recall cannot then be completed at all (F106).
       */
      template: [
        'Rank the firms by market ___, largest first',
        'Add the shares of the largest ___ firms',
        'Quote the answer together with the number of firms it covers, because a bare percentage is ___',
      ],
      answers: ['share', 'n', 'meaningless'],
      hints: ['what the ranking is done on', 'how many firms the ratio covers', 'what a bare percentage tells you'],
      distractors: ['profit', 'decisive'],
    }),
  };
})();

const readingConcentrationRatios = (() => {
  const sid = subId('reading-concentration-ratios');
  return {
    id: sid,
    title: 'What a Concentration Ratio Does and Does Not Tell You',
    keyIdea: `A high ratio says a few firms hold most of the market; it does not say they compete weakly, and two markets with the same ratio can behave completely differently.`,
    body: [
      { type: 'paragraph', text: `The specification asks separately for the **significance** of concentration ratios, and the honest answer is that it is a useful first measurement and a poor conclusion.` },
      { type: 'paragraph', text: `What it does tell you: roughly which structure you are looking at. A ratio near zero across many firms points to the many-seller structures of chapters 2 and 3; a high three-firm ratio points to oligopoly; a one-firm ratio at or near 100% points to monopoly.` },
      { type: 'paragraph', text: `What it does not tell you, and this is the part worth marks. First, it says nothing about the SHAPE of the market. Take ${CR.twin.name}: shares of ${CR.twin.firms.map(([, s]) => pct(s)).join(', ')} give it a five-firm ratio of ${pct(CR.twin.cr5)} — the same as the market above — and a three-firm ratio of ${pct(CR.twin.cr3)} against ${pct(CR.cr3)}. One market has a clear leader; the other has five near-equals. They behave differently.` },
      { type: 'paragraph', text: `Second, it says nothing about **behaviour**. Two firms holding the whole market may compete ferociously or may not compete at all, and chapter 5 is about why either can happen. Third, it says nothing about **contestability** — whether the firms outside the market could enter, which chapter 8 shows can discipline a concentrated market as effectively as rivals inside it.` },
    ],
    realExample: { emoji: '🛳️', text: `A single container terminal serving a city looks like a pure monopoly on any concentration measure. If a terminal one day's sailing away can take the same cargo, the measure has missed the competition that matters.` },
    misconception: `Students treat a high concentration ratio as proof of weak competition. The ratio counts who holds the market; it does not measure how they behave. Instead: use it to identify the structure, then argue about conduct separately.`,
    examMatters: `Appendix 6 says Discuss requires the validity and significance of arguments and concepts to be considered, and a recognition of different viewpoints. A concentration ratio is a concept whose validity is exactly what can be discussed: what it measures, and what it leaves out.`,
  };
})();

/* ══ Block 2 — Perfect competition (3.3.3 · 3a-3d) ══════════════════════════ */

const pcAssumptions = (() => {
  const sid = subId('perfect-competition-assumptions');
  return {
    id: sid,
    title: 'Assumptions of Perfect Competition',
    keyIdea: `Perfect competition assumes many small firms, an identical product, free entry and exit and perfect information — leaving a firm no influence over price.`,
    body: [
      { type: 'paragraph', text: `**Perfect competition** turns the three dials of chapter 1 as far as they go: as many firms as possible, no differentiation, entry and exit completely free. It describes almost no real market and is the benchmark every other chapter is measured against.` },
      { type: 'bullets', items: [
        `**Many buyers and sellers**, each too small for its own output to affect the market price.`,
        `**A homogeneous product** — one firm's output is indistinguishable from another's, so no buyer prefers a supplier.`,
        `**Free entry and exit**, with no barrier and nothing lost on the way out.`,
        `**Perfect information** — every firm and buyer knows the market price and the available technology.`,
        `**Profit maximisation** as the firm's objective, so it produces where MR = MC.`,
      ] },
      { type: 'paragraph', text: `The first two together drive everything else. A firm asking more than the market price sells nothing, because an identical product is on sale at that price elsewhere; a firm asking less gains nothing, because it could have sold its whole output at the market price anyway.` },
      { type: 'paragraph', text: `So the firm faces a **horizontal demand curve at the market price**, and for it alone AR = MR = P. That is why the profit-maximising condition MR = MC becomes **P = MC** in this structure — and P = MC is the allocative-efficiency condition from chapter 1.` },
    ],
    realExample: { emoji: '🌾', text: `A grain auction comes close. The crop is graded, so one farm's grade-two wheat is another's; hundreds of farms sell into it; and no single harvest moves the price it settles at.` },
    misconception: `Students say a perfectly competitive firm "has no demand curve" or "faces the market demand curve". It faces a horizontal line at the market price — perfectly elastic demand for its own output — while the MARKET demand curve slopes down as usual.`,
    examMatters: `Appendix 6 defines Explain of the characteristics as requiring knowledge, understanding and application. The application is what an assumption makes true: many small firms and an identical product mean the firm cannot set its price.`,
  };
})();

const pcShortRun = (() => {
  const sid = subId('pc-short-run-equilibrium');
  const s = M.shortRun;
  return {
    id: sid,
    title: 'Short-Run Equilibrium and Supernormal Profit',
    keyIdea: `The firm produces where P = MC; if the price is above average cost at that output, it earns supernormal profit — and in the short run nothing stops it.`,
    body: [
      { type: 'paragraph', text: `${M.name} takes the market price as given and chooses only its output. It maximises profit where **MR = MC**, and because MR = P here, that is where **P = MC**.` },
      { type: 'paragraph', text: `Suppose the market price is ${money(s.price)} a ${M.unit}. Marginal cost reaches ${money(s.price)} at ${qty(s.q)} ${M.units} ${M.per}, so that is the output. Average cost at ${qty(s.q)} ${M.units} is ${money(s.ac)}, so every ${M.unit} leaves ${money(s.perUnit)} above cost and total profit is ${money(s.perUnit)} × ${qty(s.q)} = **${money(s.profit)}** ${M.per}.` },
      { type: 'paragraph', text: `That is **supernormal profit**: profit above the level the owners need to keep their resources in this industry. On a diagram it is the rectangle between the price line and the average cost curve, measured over the output produced.` },
      { type: 'paragraph', text: `Why "short run"? Because free entry has not yet had time to operate. Every existing firm in the industry is seeing the same price and the same profit, and so is every firm outside it — perfect information is one of the assumptions. That is the whole of the next subsection.` },
    ],
    realExample: { emoji: '🍋', text: `A season in which a crop fails elsewhere leaves growers who did harvest facing an unusually high price and earning well above their normal return. Nothing about their costs has changed.` },
    misconception: `Students read "supernormal profit" as "a lot of profit" and "normal profit" as "none". Normal profit is the return the owners could have earned elsewhere, and it is already inside the average cost curve. Supernormal is whatever is left on top of that.`,
    examMatters: `Appendix 6 defines Draw as requiring an accurately labelled diagram using quantitative skills. Accurately labelled here means the price line marked AR = MR = P, the output at the intersection with MC, and the profit area bounded by the price and average cost at that output.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Complete the short-run equilibrium for ${M.name} at a price of ${money(s.price)}:`,
      template: [
        `Output is chosen where price equals ___ cost`,
        `That output is ${qty(s.q)} ${M.units}, where average cost is ${money(s.ac)}, so profit a ${M.unit} is ${money(s.perUnit)} and total profit is ___`,
        `Profit above what the owners need to stay in the industry is called ___ profit`,
      ],
      answers: ['marginal', money(s.profit), 'supernormal'],
      hints: ['which cost curve the price line is read against', 'profit a unit multiplied by the output', 'the word for profit on top of the normal return'],
      distractors: ['average', 'normal'],
    }),
  };
})();

const pcLongRun = (() => {
  const sid = subId('pc-long-run-equilibrium');
  const s = M.shortRun, l = M.longRun;
  return {
    id: sid,
    title: 'Long-Run Equilibrium and Normal Profit',
    keyIdea: `Supernormal profit attracts entry, entry raises supply and pushes price down, and it stops only where price equals the lowest average cost.`,
    body: [
      { type: 'paragraph', text: `Free entry does the work here, and in one direction only: towards the price at which there is no reason left to enter.` },
      { type: 'paragraph', text: `At ${money(s.price)} a ${M.unit} every grower earns supernormal profit and every potential grower can see it. New growers enter, industry supply rises, and the market price falls. Each firm's horizontal demand line falls with it, and profit shrinks.` },
      { type: 'paragraph', text: `It stops when supernormal profit is gone — when price has fallen to the **lowest average cost**. For ${M.name} that is ${money(M.minAc)} a ${M.unit} at ${qty(l.q)} ${M.units} ${M.per}: revenue ${money(l.revenue)}, total cost ${money(l.tc)}, profit ${money(l.profit)}.` },
      { type: 'paragraph', text: `So long-run equilibrium under perfect competition has a signature worth memorising: **P = MR = MC = AC**, all four equal, at the minimum of the average cost curve. The firm earns **normal profit** — enough to keep it in the industry and no more — and there is no longer any reason for anybody to enter or leave.` },
      { type: 'paragraph', text: `The same process runs backwards. Had the price started below ${money(M.minAc)}, firms would have been making losses, some would have left, industry supply would have fallen and the price would have risen — to the same place.` },
    ],
    realExample: { emoji: '🛺', text: `A city that opens ride-hailing to any driver with a licence sees earnings above other work draw in drivers until earnings fall back to what those drivers could get elsewhere. Nothing coordinates it; each driver is deciding alone.` },
    misconception: `Students write that firms enter "until profit is zero". Profit IS zero on the diagram and the firm is not working for nothing: the normal return to the owners is already counted as a cost. Instead: profit falls to the NORMAL level.`,
    examMatters: `Appendix 6 says Analyse requires a chain of reasoning and focuses on depth rather than breadth. The chain has four links — profit, entry, supply, price — and an answer that names entry and jumps to normal profit has left out the two that explain it.`,
  };
})();

const pcShutdown = (() => {
  const sid = subId('pc-shutdown-point');
  const d = M.shutdown;
  return {
    id: sid,
    title: 'The Short-Run Shutdown Point',
    keyIdea: `In the short run the fixed cost is owed whether or not the firm produces, so it keeps producing while the price covers average variable cost — and stops below that.`,
    body: [
      { type: 'paragraph', text: `A firm making a loss has two questions with different answers. Should it leave the industry? That is a long-run question. Should it produce at all this week? That is the **short-run shutdown** decision, and 3.3.2 supplies the cost measures it turns on.` },
      { type: 'paragraph', text: `The fixed cost is why. ${M.name} owes ${money(M.tfc)} ${M.per} in rent and interest whether it picks any ${M.good} or not, so the comparison is not with average cost but with **average variable cost** — the part it avoids by stopping.` },
      { type: 'paragraph', text: `The rule: **produce while P ≥ AVC**. Above average variable cost, each ${M.unit} sold leaves something over towards the fixed cost, so producing loses less than stopping. Below it, each ${M.unit} adds to the loss.` },
      { type: 'paragraph', text: `The **shutdown point** is where the two come to the same thing: the minimum of average variable cost, ${money(M.minAvc)} a ${M.unit}, at ${qty(d.q)} ${M.units}. Check it. Revenue ${money(d.revenue)}, total cost ${money(d.tc)}, loss ${money(d.profit)} — exactly the fixed ${money(M.tfc)} it would lose by shutting. The contribution (P ${'−'} AVC) × Q is ${money(d.contribution)}.` },
      { type: 'paragraph', text: `In the long run nothing is owed, so the test is stricter: stay while **P ≥ AC**, here ${money(M.minAc)}.` },
    ],
    realExample: { emoji: '⛴️', text: `A ferry with a lease to pay sails a poorly booked crossing while the fares cover fuel and crew, because the lease is owed in port. When they stop covering the fuel it stays tied up.` },
    misconception: `Students shut the firm down as soon as it makes a loss. A loss means price below average cost; the firm still produces while price is above average VARIABLE cost, because the fixed cost is owed either way. Instead: name which cost the comparison uses.`,
    examMatters: `Appendix 6 defines Explain of a reason as including analysis, because it requires a two-stage chain. The two stages are that the fixed cost is unavoidable in the short run, and that producing therefore only has to beat stopping rather than beat breaking even.`,
  };
})();

const pcEfficiency = (() => {
  const sid = subId('pc-efficiency');
  const l = M.longRun, s = M.shortRun;
  return {
    id: sid,
    title: 'Efficiency in the Short Run and the Long Run',
    keyIdea: `In long-run equilibrium perfect competition is both allocatively and productively efficient; in the short run it need be neither, and on dynamic efficiency it has little to offer.`,
    body: [
      { type: 'paragraph', text: `Now the benchmark can be measured against chapter 1's tests, and the specification asks for it in both periods.` },
      { type: 'paragraph', text: `**Allocative efficiency, both periods.** The firm produces where P = MC, always, because MR = P for it. So allocative efficiency holds in the short run and the long run alike — at ${money(s.price)} and at ${money(l.price)}, price equals marginal cost at the output chosen.` },
      { type: 'paragraph', text: `**Productive efficiency, long run only.** Price is driven to the minimum of average cost, so the firm produces ${qty(l.q)} ${M.units} where AC is ${money(M.minAc)}. In the short run there is no reason for that: at ${money(s.price)} it produces ${qty(s.q)} ${M.units} at ${money(s.ac)}, above the minimum.` },
      { type: 'paragraph', text: `**Dynamic efficiency: the weak point.** In the long run every firm earns normal profit only, so there is no surplus to fund research — and perfect information makes any improvement immediately available to everybody, so there is no reward for making it.` },
      { type: 'paragraph', text: `One caution. Firms here face relentless pressure to adopt whatever lowers cost, since a firm that does not is undercut — so the incentive to INVENT is weak while the incentive to ADOPT is strong.` },
    ],
    realExample: { emoji: '🧺', text: `Growers selling an identical graded crop take up a new seed variety fast, because the first to do so has a cost advantage and the last to do so is selling below cost. None of them funded the breeding.` },
    misconception: `Students conclude that perfect competition is the efficient structure and stop. It is efficient on two static tests in long-run equilibrium only, and it is the weakest of the four on dynamic efficiency. Instead: name which test, and which period.`,
    examMatters: `Appendix 6 says Examine requires evaluation and a brief assessment of the arguments as well as a chain of reasoning. The assessment here is which matters more — static efficiency now or improvement over time — and it cannot be answered by listing the three tests.`,
  };
})();

/* ══ Block 3 — Monopolistic competition (3.3.3 · 4a-4d) ═════════════════════ */

const mcAssumptions = (() => {
  const sid = subId('monopolistic-competition-assumptions');
  return {
    id: sid,
    title: 'Assumptions of Monopolistic Competition',
    keyIdea: `Monopolistic competition keeps the many firms and free entry of perfect competition and drops the identical product — so each firm has a little price-setting power and no more.`,
    body: [
      { type: 'paragraph', text: `**Monopolistic competition** changes exactly one of the five assumptions of chapter 2, and the change is enough to alter every result.` },
      { type: 'bullets', items: [
        `**Many firms**, each small relative to the market — unchanged.`,
        `**Free entry and exit** with low barriers — unchanged.`,
        `**A DIFFERENTIATED product.** Each firm's output is slightly different from every other firm's. This is the change.`,
        `**Independent decisions** — there are too many firms for any one of them to plan around a particular rival, which is what distinguishes this structure from oligopoly.`,
        `**Profit maximisation** at MR = MC — unchanged.`,
      ] },
      { type: 'paragraph', text: `Differentiation means a firm has some customers who prefer ITS version. So if it raises its price a little it does not lose everybody, as it would in chapter 2 — it loses some. Its demand curve slopes **downward** rather than being horizontal.` },
      { type: 'paragraph', text: `But the curve is **highly elastic**, because there are many close substitutes and a customer who does not much mind will switch. A firm here has a little power over its price and very little room to use it — and because MR now lies below AR, the profit-maximising condition MR = MC no longer coincides with P = MC.` },
    ],
    realExample: { emoji: '💈', text: `Barbers, cafés and printing shops in one district are the standard case: many of them, easy to open and close, and each with regulars who prefer it — but none able to charge much above the others for long.` },
    misconception: `The name misleads, and students read it as a kind of monopoly. A monopolistically competitive firm has many rivals and free entry; it has a downward-sloping demand curve, which is the only feature it shares with a monopoly. Instead: read the name as "competition among many differentiated sellers".`,
    examMatters: `Appendix 6 defines Explain of the characteristics as requiring knowledge, understanding and application. The application that earns the second stage is what differentiation does to the demand curve: downward-sloping, and highly elastic because substitutes are close.`,
  };
})();

const productDifferentiation = (() => {
  const sid = subId('product-differentiation');
  return {
    id: sid,
    title: 'Three Types of Product Differentiation',
    keyIdea: `Products are differentiated physically, by marketing, or by distribution — and the last two work even when the product itself is identical.`,
    body: [
      { type: 'paragraph', text: `Differentiation is the assumption this structure turns on, so the specification asks for its three types by name. Only the first is about the product.` },
      { type: 'bullets', items: DIFFERENTIATION.map(([k, , long]) => `**${k}** — ${long}.`) },
      { type: 'paragraph', text: `Separating them matters because the second and third work on products that are physically the same. Two shops may sell an identical bag of rice; one is trusted, or one delivers. The rice is undifferentiated and the OFFER is not.` },
      { type: 'paragraph', text: `What differentiation buys is a demand curve that slopes down instead of lying flat, and nothing else. The steeper the curve, the more successful it has been — and free entry means any success can itself be copied.` },
      { type: 'paragraph', text: `Note the difference from chapter 6's non-price competition: there a few interdependent firms advertise partly to answer each other, while here a firm differentiates simply to have customers of its own.` },
    ],
    realExample: { emoji: '🧋', text: `Two bubble-tea shops on one street may buy the same tea and the same tapioca. One differentiates physically by brewing stronger, one by its name and packaging, and a third by delivering to nearby offices.` },
    misconception: `Students treat differentiation as advertising alone. Advertising is the marketing type, one of three: the product can differ physically, or in how and where it can be bought. Instead: name the type you mean.`,
    examMatters: `Appendix 6 defines Define as requiring the meaning of a term, concept or phrase. A definition of product differentiation needs the idea that buyers see the products as different, not a list of examples of it.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each way of differentiating to the type of differentiation it is:',
      pairs: [
        { left: 'A longer-lasting battery in the same size of case', right: 'Physical' },
        { left: 'A redesigned wrapper and a name buyers recognise', right: 'Marketing' },
        { left: 'Ordering by telephone as well as in the shop', right: 'Distribution' },
      ],
      why: [
        'The product itself differs in what it does or how long it lasts, which is physical differentiation.',
        'The product may be unchanged; the packaging and the name are marketing differentiation.',
        'Where and how the product can be bought is distribution differentiation.',
      ],
      distractors: ['Financial', 'Technical'],
    }),
  };
})();

const mcShortRun = (() => {
  const sid = subId('mc-short-run');
  const s = NI.short;
  return {
    id: sid,
    title: 'Short-Run Equilibrium with a Downward-Sloping Demand Curve',
    keyIdea: `The firm produces where MR = MC and charges what its demand curve will bear at that output — so the price is above marginal cost from the start.`,
    body: [
      { type: 'paragraph', text: `${NI.name} makes ${NI.good}: many rivals, easy entry, and a product buyers can tell from the others. Its demand curve is **P = ${NI.short.a} ${'−'} ${NI.b}Q**, so its marginal revenue curve is **MR = ${NI.short.a} ${'−'} ${round2(NI.b * 2)}Q** — the same intercept and twice the gradient, as 3.3.2 established.` },
      { type: 'paragraph', text: `Profit is maximised where **MR = MC**. Marginal revenue reaches ${money(s.mr)} at ${qty(s.q)} ${NI.units} ${NI.per}, and marginal cost is also ${money(s.mc)} there, so ${qty(s.q)} ${NI.units} is the output.` },
      { type: 'paragraph', text: `The price is not read off the marginal revenue curve. It is read off the **demand curve** at that output: P = ${NI.short.a} ${'−'} ${NI.b} × ${qty(s.q)} = **${money(s.price)}**. Average cost at ${qty(s.q)} ${NI.units} is ${money(s.ac)}, so profit is ${money(s.perUnit)} × ${qty(s.q)} = **${money(s.profit)}** ${NI.per}: supernormal.` },
      { type: 'paragraph', text: `Two differences from chapter 2 are already visible. The price ${money(s.price)} is far above marginal cost ${money(s.mc)}, so the firm is **not allocatively efficient** even at this stage. And the output ${qty(s.q)} ${NI.units} is not where average cost is lowest, which for these costs is ${qty(NI.productiveOutput)} ${NI.units} at ${money(COSTS.minAc)}.` },
    ],
    realExample: { emoji: '🍞', text: `A neighbourhood bakery with a following can hold its price above the one across the road without emptying the shop. It cannot hold it far above, and it knows roughly how far.` },
    misconception: `Students read the price off the MR curve at the profit-maximising output, which gives a price below the true one. MR locates the OUTPUT; the demand curve gives the PRICE at that output. Instead: go up from the quantity to AR, not to MR.`,
    examMatters: `Appendix 6 defines Draw as requiring an accurately labelled diagram using quantitative skills. Accuracy here is mostly one thing: the price is marked on AR above the intersection of MR and MC, not at the intersection itself.`,
  };
})();

const mcLongRun = (() => {
  const sid = subId('mc-long-run-tangency');
  const s = NI.short, l = NI.long;
  return {
    id: sid,
    title: 'Long-Run Tangency and Normal Profit',
    keyIdea: `Entry by close substitutes pulls each firm's demand curve down and left until it is tangent to the average cost curve, leaving normal profit only.`,
    body: [
      { type: 'paragraph', text: `Free entry is still an assumption here, so supernormal profit cannot last. What entry does, though, is different from chapter 2: new firms do not sell an identical product at the same price, they sell **close substitutes**.` },
      { type: 'paragraph', text: `So each existing firm loses some customers to them and finds the rest more willing to switch. Its demand curve shifts **left**, and becomes **more elastic**. For ${NI.name} the long-run curve is **P = ${l.a} ${'−'} ${NI.b}Q**.` },
      { type: 'paragraph', text: `Entry stops when supernormal profit is gone — when the demand curve has been pushed down until it just **touches** the average cost curve at one point and lies below it elsewhere. That is the long-run **tangency**, the most important thing in this chapter.` },
      { type: 'paragraph', text: `At the tangency, output is ${qty(l.q)} ${NI.units} ${NI.per} and price ${money(l.price)}, exactly average cost there: profit ${money(l.profit)}. The tangency fixes the output too, because where AR touches AC the profit-maximising condition holds: MR ${money(l.mr)} = MC ${money(l.mc)}.` },
      { type: 'paragraph', text: `Note where the tangency is. It is on the **falling** part of the average cost curve, to the LEFT of the minimum — not at the bottom. It has to be: a downward-sloping demand curve can only touch a U-shaped average cost curve where the curve is also sloping down.` },
    ],
    realExample: { emoji: '☕', text: `A district where a successful café quickly attracts three more ends with four cafés, each busy enough to cover its costs and none of them doing better than that.` },
    misconception: `Students draw the long-run tangency at the bottom of the average cost curve, which is chapter 2's result and cannot happen here. A downward-sloping AR can only be tangent where AC is also falling — always left of the minimum.`,
    examMatters: `Appendix 6 says Analyse requires a chain of reasoning and diagrams where appropriate. The chain is entry, then a demand curve shifting left and flattening, then tangency — and the diagram must show it on the falling part of AC.`,
  };
})();

const mcEfficiency = (() => {
  const sid = subId('mc-efficiency-excess-capacity');
  const l = NI.long;
  return {
    id: sid,
    title: 'Excess Capacity and Efficiency',
    keyIdea: `Because the tangency is left of the lowest average cost, the firm is neither productively nor allocatively efficient, and the gap to the efficient output is excess capacity.`,
    body: [
      { type: 'paragraph', text: `The tangency's position decides this chapter's efficiency verdict, and the specification asks for it in both periods.` },
      { type: 'paragraph', text: `**Productive efficiency: no, in either period.** In the long run the firm produces ${qty(l.q)} ${NI.units} ${NI.per} where average cost is ${money(l.ac)}. The lowest average cost available to it is ${money(COSTS.minAc)}, at ${qty(NI.productiveOutput)} ${NI.units}. The gap of **${qty(NI.excessCapacity)} ${NI.units}** is what this chapter calls **excess capacity**: the firm has the capacity to produce more at a lower cost per unit and no reason to.` },
      { type: 'paragraph', text: `**Allocative efficiency: no, in either period.** At the tangency the price is ${money(l.price)} and marginal cost is ${money(l.mc)}, so P > MC by ${money(round2(l.price - l.mc))}. There are ${NI.good} worth more to buyers than they cost to make that are not being made.` },
      { type: 'paragraph', text: `**Dynamic efficiency: limited.** Normal profit leaves little to fund investment, though the motive to differentiate is a continuing pressure to improve the product that chapter 2 does not have.` },
      { type: 'paragraph', text: `But this is not simply a worse chapter 2. What the excess capacity BUYS is variety: one price and one product would be more efficient on both static tests, and consumers would have no choice. The diagram does not settle that trade.` },
    ],
    realExample: { emoji: '🚕', text: `A district with four small printing shops has presses standing idle in all four and a customer who can get a job done today. One large works would print more cheaply and nobody could choose.` },
    misconception: `Students say excess capacity means the firm is "wasting resources". It is producing less than the output at which cost per unit would be lowest — an outcome of the tangency, not a management error — and variety is what consumers get in return.`,
    examMatters: `Appendix 6 says Discuss requires a recognition of different viewpoints and a critical assessment of the evidence. The viewpoints here are a static-efficiency case against this structure and a variety-and-choice case for it, and both have to appear.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement by whether it describes long-run equilibrium in perfect competition or in monopolistic competition:',
      groups: [
        { name: 'Perfect competition', items: [`Price is driven to the minimum of average cost, ${money(COSTS.minAc)}`, 'Price equals marginal cost, so allocative efficiency holds', 'The demand curve facing the firm is horizontal'] },
        { name: 'Monopolistic competition', items: ['The demand curve is tangent to average cost on its falling part', `Price exceeds marginal cost at the chosen output`, `The firm produces ${qty(NI.excessCapacity)} ${NI.units} below the lowest-cost output`] },
      ],
      why: [
        'An identical product and a horizontal demand curve force price down to the bottom of the average cost curve, where P = MC as well.',
        'A downward-sloping demand curve can only touch AC where AC is falling, which leaves the firm short of the lowest-cost output and its price above marginal cost.',
      ],
    }),
  };
})();

/* ══ Block 4 — Oligopoly: barriers to entry and exit (3.3.3 · 5a, 5b) ═══════ */

const oligopolyAssumptions = (() => {
  const sid = subId('oligopoly-assumptions');
  return {
    id: sid,
    title: 'Assumptions of Oligopoly',
    keyIdea: `Oligopoly is a market dominated by a few firms whose decisions depend on each other, protected by barriers to entry — and interdependence is what makes it different.`,
    body: [
      { type: 'paragraph', text: `**Oligopoly** is a market in which a **few firms** hold most of the sales. It is the structure most real markets of any size actually have, and the specification gives it more than twice the content of any other sub-topic here.` },
      { type: 'bullets', items: [
        `**A few firms dominate** — a high concentration ratio, as chapter 1 measured.`,
        `**Barriers to entry and exit**, which is why the few remain few. This chapter.`,
        `**Interdependence**: each firm's best decision depends on what it expects the others to do. Chapter 5.`,
        `**Products may be identical or differentiated** — oil and cement are close to identical, supermarkets and airlines are differentiated. Either is an oligopoly.`,
        `**Imperfect information** — a firm cannot see a rival's costs or intentions, only its actions.`,
      ] },
      { type: 'paragraph', text: `**Interdependence** is the feature to hold on to, because it is what none of the three other structures has. A perfectly competitive grower does not care what any particular rival does; there are too many of them. A monopoly has no rival. A monopolistically competitive café has many rivals and plans around none of them in particular.` },
      { type: 'paragraph', text: `An oligopolist plans around named rivals, and knows they are planning around it. That is why this structure has no single equilibrium: the outcome depends on expectations, and chapter 5 is about the two directions they can run in.` },
    ],
    realExample: { emoji: '✈️', text: `Three airlines flying one international route watch each other's fares daily. Each knows a cut will be seen and matched within hours, and each knows the others know.` },
    misconception: `Students identify oligopoly by counting firms alone and expect a fixed number. There is no number: it is a market where the few largest firms are interdependent, which a concentration ratio indicates and does not prove.`,
    examMatters: `Appendix 6 defines Explain of the characteristics as requiring knowledge, understanding and application. The application is interdependence: not that there are few firms, but that few firms means each must anticipate the others.`,
  };
})();

const barriersScaleLimit = (() => {
  const sid = subId('barriers-scale-and-limit-pricing');
  return {
    id: sid,
    title: 'Economies of Scale and Limit Pricing',
    keyIdea: `An incumbent producing at a large scale has a lower average cost than an entrant could reach, and it can price below the entrant's cost while still profiting.`,
    body: [
      { type: 'paragraph', text: `The specification names six barriers to entry and exit. The first two work together and are the most powerful pair in the list.` },
      { type: 'paragraph', text: `**Economies of scale.** A firm already at a large scale is far down its long-run average cost curve; an entrant starts small and so starts high on the same curve. The barrier is not that entry is forbidden but that it is unprofitable at any scale an entrant could begin at.` },
      { type: 'paragraph', text: `**Limit pricing** turns that gap into a weapon. Say the incumbent's average cost is ${money(PR.incumbentAc)} a unit at its scale and an entrant would face ${money(PR.entrantAc)} at the scale it could start at. The incumbent prices at ${money(PR.limit)}.` },
      { type: 'paragraph', text: `Look at what that price does. The incumbent earns ${money(PR.limitMarginIncumbent)} a unit above its own cost — less than it could take, and a profit. An entrant selling at ${money(PR.limit)} would lose ${money(Math.abs(PR.limitMarginEntrant))} a unit. So entry does not happen, and the incumbent has not had to do anything to a rival: the price alone did it.` },
      { type: 'paragraph', text: `The name says what it is for: a limit price **limits entry** rather than maximising this year's profit, which is why an oligopolist's price can sit below what a profit-maximising calculation suggests.` },
    ],
    realExample: { emoji: '🏗️', text: `A cement producer with a deep-water terminal and a large kiln can quote a delivered price that a newcomer building one kiln could not match, without ever going below its own cost.` },
    misconception: `Students confuse limit pricing with predatory pricing. A limit price is below an ENTRANT's average cost and above the incumbent's, so the incumbent profits; a predatory price is below the incumbent's OWN average variable cost, so it loses money deliberately. Chapter 6 has the second.`,
    examMatters: `Appendix 6 defines Explain of a reason as including analysis, since it requires a two-stage chain. The two stages here are that scale gives the incumbent a lower average cost, and that a price between the two costs therefore blocks entry profitably.`,
  };
})();

const barriersLegalBranding = (() => {
  const sid = subId('barriers-patents-branding-legal');
  return {
    id: sid,
    title: 'Patents, Branding and Legal Barriers',
    keyIdea: `Three barriers work by making something unavailable to an entrant: the method, the customers, or permission to trade at all.`,
    body: [
      { type: 'paragraph', text: `Three of the six barriers share a shape. Each makes something an entrant needs unavailable, and they differ in what.` },
      { type: 'paragraph', text: `**Patents** make the METHOD unavailable. A patent gives its holder the exclusive right to use an invention for a period, so a rival cannot produce the same product the same way however much money it has. When the patent expires the barrier disappears, which is why this one has a clock on it.` },
      { type: 'paragraph', text: `**Branding** makes the CUSTOMERS unavailable, or at least expensive. Buyers attached to an established name have to be won away from it, and winning them costs an entrant money before it has sold anything. Note what makes this a barrier rather than ordinary competition: the spending is largely **sunk**, so an entrant that fails does not get it back.` },
      { type: 'paragraph', text: `**Legal barriers** make PERMISSION unavailable. A licence, a franchise or a statutory monopoly restricts who may operate in the market at all. A city that licenses three mobile networks has a three-firm market by law, whatever the costs and whatever the brands.` },
      { type: 'paragraph', text: `Two of the three are created deliberately by government — patents and legal restrictions — and that is worth remembering when chapter 7 asks whether a monopoly's position is earned.` },
    ],
    realExample: { emoji: '📜', text: `A port operating under a long concession from the state faces no entrant however profitable it becomes, because the right to operate a berth is not available to be bought.` },
    misconception: `Students list "brand loyalty" as a barrier and stop there. What makes it a barrier is that an entrant must spend heavily to overcome it and cannot recover the spending if it fails — so the barrier is really the sunk cost attached to the brand.`,
    examMatters: `Appendix 6 defines Define as requiring the meaning of a term, concept or phrase. A barrier to entry is anything that makes entry more costly or less profitable for a newcomer than for a firm already there — and a definition that lists three examples has not given the meaning.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each barrier to entry to what it makes unavailable to a new firm:',
      pairs: [
        { left: 'Patents', right: 'The production method' },
        { left: 'Branding', right: 'Customers, without heavy unrecoverable spending' },
        { left: 'Legal restrictions', right: 'Permission to operate at all' },
        { left: 'Economies of scale', right: 'A cost per unit low enough to compete' },
      ],
      why: [
        'A patent is an exclusive legal right to use an invention, so the method itself cannot be copied while it lasts.',
        'Established buyers must be won away, and the spending that wins them cannot be recovered if the entry fails.',
        'A licence or franchise limits who may trade in the market, whatever their costs.',
        'An incumbent at a large scale is further down its long-run average cost curve than an entrant starting small can reach.',
      ],
      distractors: ['A supply of skilled labour'],
    }),
  };
})();

const barriersSunkCosts = (() => {
  const sid = subId('barriers-sunk-costs');
  return {
    id: sid,
    title: 'Sunk Costs as a Barrier to Entry and Exit',
    keyIdea: `A sunk cost cannot be recovered on the way out, so it raises the risk of entering — which makes it a barrier to entry precisely because it is a barrier to exit.`,
    body: [
      { type: 'paragraph', text: `A **sunk cost** is spending that cannot be recovered if the firm leaves. It is the sixth barrier, the subtlest, and the one chapter 8 is built on.` },
      { type: 'paragraph', text: `A sunk cost is a barrier to **exit** and therefore to **entry**. Nothing stops a firm spending the money; what stops it is knowing that if the venture fails the money is gone.` },
      { type: 'paragraph', text: `So the test is not what entry costs but how much of it is recoverable. Two firms spend the same: one buys aircraft, which can be flown elsewhere or sold; the other bores a tunnel, which cannot be moved. The first can try the market and leave; the second is committed before it carries a passenger.` },
      { type: 'paragraph', text: `Which costs are sunk depends on the market, not the accounts. Advertising is almost entirely sunk; a specialised machine largely so; a general-purpose vehicle is not. A transferable licence is not sunk; one that cannot be sold on is.` },
      { type: 'paragraph', text: `Hence chapter 8's separate requirement for the **significance of sunk costs for contestability**: low sunk costs make a market easy to enter AND easy to leave, and the second makes the threat of entry believable.` },
    ],
    realExample: { emoji: '🛩️', text: `A carrier can open a route, find it thin and move the aircraft to another route next season. An operator that has built a terminal for that one route cannot move it anywhere.` },
    misconception: `Students treat any large start-up cost as a sunk cost. The question is whether the spending can be recovered by selling the asset or using it elsewhere: a fleet of standard vans is a large cost and barely sunk, while a modest advertising campaign is entirely sunk.`,
    examMatters: `Appendix 6 defines Define as requiring the meaning of a term, concept or phrase. Two marks for a sunk cost means the cost has been incurred AND cannot be recovered on leaving the market; an answer giving only "a cost already paid" has half of it.`,
  };
})();

/* ══ Block 5 — Oligopoly: interdependence and collusion (3.3.3 · 5c, 5d) ════ */

const interdependence = (() => {
  const sid = subId('interdependence');
  return {
    id: sid,
    title: 'Interdependence: Two Directions It Can Run',
    keyIdea: `Because each oligopolist's best move depends on the others' choices, the same market can settle into competing hard or into acting together.`,
    body: [
      { type: 'paragraph', text: `Chapter 4 explained why the few remain few. This chapter is about what the few then do, and the specification calls it the **interdependence of firms**.` },
      { type: 'paragraph', text: `Interdependence means a firm cannot find its best price from its own costs and demand curve alone. A cut that wins customers if rivals hold may win nothing if they match it, and may start something worse. The firm must form an expectation about their response before it can choose.` },
      { type: 'paragraph', text: `That single fact is why oligopoly has no single predicted outcome, and it is the honest answer to "what price does an oligopoly charge?". Two directions are available from the same starting point:` },
      { type: 'bullets', items: [
        `**Non-collusive behaviour** — each firm acts independently and expects retaliation. Prices can end up close to competitive levels, or lower during a price war.`,
        `**Collusive behaviour** — the firms act together on price or output, openly or without a word being exchanged, and prices end up closer to what a single monopolist would charge.`,
      ] },
      { type: 'paragraph', text: `The five things the specification names — game theory, the reasons for each kind of behaviour, cartels, price leadership and price wars — are all ways of managing one problem: the other firm is thinking about you.` },
    ],
    realExample: { emoji: '⛽', text: `Two filling stations facing each other across a junction change their boards within minutes of each other. Neither is obeying the other and neither can ignore it.` },
    misconception: `Students learn oligopoly as "firms collude" or "firms have price wars" and pick one. Both follow from the same structure, and which happens depends on the number of firms, how easily cheating is detected and how similar costs are.`,
    examMatters: `Appendix 6 says Discuss requires the validity and significance of arguments and concepts to be considered and a recognition of different viewpoints. Interdependence supplies two opposed predictions from one model, which is why an answer that gives only one has not discussed it.`,
  };
})();

const gameTheory = (() => {
  const sid = subId('game-theory');
  return {
    id: sid,
    title: 'Simple Game Theory: Two Firms, Two Outcomes',
    keyIdea: `In a two-firm, two-outcome game each firm's best reply to either choice by the other is to cut its price — so both cut, and both end up worse off than if both had held.`,
    body: [
      { type: 'paragraph', text: `The specification asks for **simple game theory in a two-firm, two-outcome model** and nothing larger. Two firms, ${G.firmA} and ${G.firmB}; two choices each, hold or cut; four outcomes; a profit for each firm in each.` },
      { type: 'paragraph', text: `The payoffs, in ${G.unit}, ${G.firmA}'s figure first: both hold, ${qty(G.holdHold[0])} and ${qty(G.holdHold[1])}. ${G.firmA} cuts while ${G.firmB} holds, ${qty(G.cutHold[0])} and ${qty(G.cutHold[1])} — the cutter takes the other's customers. Reverse it and the figures reverse. Both cut, ${qty(G.cutCut[0])} each: same customers, lower price.` },
      { type: 'paragraph', text: `Now reason as ${G.firmA}, one column at a time. **If ${G.firmB} holds**, cutting pays ${qty(G.cutHold[0])} against ${qty(G.holdHold[0])} — so cut. **If ${G.firmB} cuts**, cutting pays ${qty(G.cutCut[0])} against ${qty(G.holdCut[0])} — so cut. Better whatever the rival does makes it a **dominant strategy**.` },
      { type: 'paragraph', text: `${G.firmB}'s figures mirror these, so cutting is dominant for it too. Both cut and both earn ${qty(G.cutCut[0])}. Neither can improve by changing its own choice alone, which makes both-cut the **equilibrium**.` },
      { type: 'paragraph', text: `And there is the result the model exists for: both holding would have paid each ${qty(G.holdHold[0])}, ${qty(G.jointLoss)} more between them. The outcome each firm rationally chooses is worse for both than the one they rejected — which is the case for collusion, and why the next subsections ask when it holds.` },
    ],
    realExample: { emoji: '🎫', text: `Two carriers on one route know a discount wins bookings this week and is matched next. Both discount, both fill the same seats, and both take less for them.` },
    misconception: `Students describe the equilibrium as "the best outcome for both firms". It is the best each can do given the other, and worse for both than cooperating. Instead: no firm can gain by changing its OWN choice alone.`,
    examMatters: `Appendix 6 says Analyse requires a chain of reasoning and that relevant data provided needs interpreting. With a payoff matrix that means reasoning through each of the rival's choices in turn, not describing the table.`,
  };
})();

const collusiveNonCollusive = (() => {
  const sid = subId('collusive-and-non-collusive');
  return {
    id: sid,
    title: 'Reasons for Collusive and Non-Collusive Behaviour',
    keyIdea: `Collusion is more likely with few firms, similar costs, stable demand and cheating that is easy to spot — and less likely as each of those reverses.`,
    body: [
      { type: 'paragraph', text: `Game theory says why firms WANT to collude: cooperating pays both more. The **reasons** the specification asks for are the conditions under which wanting is enough.` },
      { type: 'paragraph', text: `**Collusion is more likely when:**` },
      { type: 'bullets', items: [
        `**There are few firms.** An understanding between three is easier to reach and to police than one between fifteen.`,
        `**Costs are similar.** Firms with the same costs want roughly the same price; a low-cost firm gains from a lower price than its rivals want.`,
        `**Demand is stable.** A steady market makes a departure easy to notice; in a volatile one a fall in sales proves nothing.`,
        `**Cheating is easy to detect** — prices published, contracts visible. A discount nobody can see cannot be punished.`,
        `**The product is standardised**, so there is one price to agree on rather than a hundred.`,
      ] },
      { type: 'paragraph', text: `**Non-collusive behaviour is more likely when those reverse** — many firms, unequal costs, swinging demand, hidden prices — and for two reasons of its own. Price collusion is **illegal** in most jurisdictions, with penalties on firms and sometimes individuals; and a firm that believes it can win the market outright gains more by fighting.` },
      { type: 'paragraph', text: `And the temptation never goes away: in the game above, breaking a hold-the-price agreement while the other keeps it earns ${qty(G.temptation)} more. Every collusive arrangement has to hold that down.` },
    ],
    realExample: { emoji: '🧱', text: `A few cement producers selling a standardised product at published delivered prices is a textbook setting for tacit coordination. A hundred builders quoting privately is not.` },
    misconception: `Students treat collusion as a choice firms simply make. Whether an agreement can HOLD is the question, and it turns on detection: an arrangement nobody can police collapses under the temptation to cheat whatever the firms intended.`,
    examMatters: `Appendix 6 says Examine requires evaluation and a brief assessment of the arguments as well as a chain of reasoning. Weighing the conditions for collusion against the incentive to cheat is that assessment, and a list of conditions without it is an Analyse.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each condition by whether it makes collusion easier to sustain or harder:',
      groups: [
        { name: 'Easier to sustain', items: ['Three producers, all running the same kiln technology', 'A delivered price list every buyer and rival can read', 'Orders arriving at much the same rate every quarter'] },
        { name: 'Harder to sustain', items: ['Fifteen producers, four of them opened last year', 'One producer whose new plant undercuts the rest by a fifth', 'Every contract quoted privately and never published', 'A regulator that has already fined two firms in this industry'] },
      ],
      why: [
        'Few firms with similar costs want a similar price, and visible prices in a steady market make a departure from it easy to spot and punish.',
        'Many firms with different costs want different prices, hidden discounts cannot be policed, and the legal penalty raises the cost of agreeing at all.',
      ],
    }),
  };
})();

const cartelsPriceLeadership = (() => {
  const sid = subId('cartels-and-price-leadership');
  return {
    id: sid,
    title: 'Cartels and Price Leadership',
    keyIdea: `A cartel is a formal agreement to fix price or output; price leadership reaches a similar result with none, because one firm moves and the rest follow.`,
    body: [
      { type: 'paragraph', text: `The specification names two mechanisms by which collusion actually operates, and they differ in whether anything is agreed.` },
      { type: 'paragraph', text: `**A cartel** is a formal agreement to fix a price, restrict output or divide a market. Acting together, the members behave like a single monopolist: restrict output, raise the price, share the profit. Price fixing of this kind is illegal in most jurisdictions.` },
      { type: 'paragraph', text: `Cartels are unstable for the reason game theory gives: each member's quota is below what it would produce at the cartel price, so each has an incentive to exceed it — and the cartel price is what makes the extra sales attractive. This is **overt collusion**: agreed, and traceable.` },
      { type: 'paragraph', text: `**Price leadership** needs no agreement. One firm — usually the largest or lowest-cost — changes its price and the others follow, each doing what is best for it given the leader's move, so prices move together with nothing exchanged. This is **tacit collusion**, and far harder to act against because there is nothing to find.` },
      { type: 'paragraph', text: `The distinction matters for policy: a cartel can be prosecuted on evidence of the agreement, while parallel pricing from each firm rationally following a leader may be indistinguishable from ordinary competition.` },
    ],
    realExample: { emoji: '🛢️', text: `A group of oil-exporting states agreeing production quotas is the standard example of the form, and of its difficulty: a member that exceeds its quota gains from the price the others are holding up.` },
    misconception: `Students treat all collusion as a cartel and expect a meeting. Tacit collusion through price leadership produces similar prices with no agreement and no communication — which is why "prices moved together" is not evidence of a cartel.`,
    examMatters: `Appendix 6 defines Explain of a term or the characteristics as requiring knowledge, understanding and application. Applied here, the distinction to draw is overt against tacit — whether anything was agreed — and not merely that both raise prices.`,
  };
})();

const collusionCostsBenefits = (() => {
  const sid = subId('collusion-costs-benefits');
  return {
    id: sid,
    title: 'Costs and Benefits of Collusion',
    keyIdea: `Collusion raises price and profit for producers and lowers consumer surplus; for workers and governments the effects run both ways and depend on what the profit is used for.`,
    body: [
      { type: 'paragraph', text: `The specification asks for the costs and benefits of collusion to four groups by name: **producers, consumers, workers and governments**. Take them in turn, and give each both sides.` },
      { type: 'paragraph', text: `**Producers.** Higher and more predictable profit, and stability from not fighting a price war — which can fund investment, a dynamic-efficiency argument. Against it: the legal penalty if an overt agreement is discovered, and the market share a firm might have won by competing.` },
      { type: 'paragraph', text: `**Consumers.** Mostly cost: a higher price and less bought, transferring surplus to producers with a welfare loss on top — the welfare loss chapter 7 measures. Against that, collusion on **standards** rather than price can benefit consumers, and stable prices have value to a buyer planning ahead.` },
      { type: 'paragraph', text: `**Workers.** Stable profit can mean more secure employment and higher wages than a market fighting on price. Against that, output is lower so fewer workers are needed, and a firm shielded from competition has less reason to remove X-inefficiency — which eventually threatens the jobs it protected.` },
      { type: 'paragraph', text: `**Governments.** Higher profits may raise tax receipts. Against that, the cost of investigating and prosecuting, and a higher price for an input used across the economy — cement, fuel, freight — raises costs for every firm buying it.` },
    ],
    realExample: { emoji: '⚖️', text: `A competition authority that fines a group of suppliers recovers money and does not recover the higher prices already paid by the firms that bought from them.` },
    misconception: `Students answer "collusion is bad for consumers and good for firms" and stop, which cannot reach the marks for two of the four groups. Workers and governments both have arguments on each side, and the producers' own case is not one-sided either.`,
    examMatters: `Appendix 6 says Discuss requires logical and coherent chains of reasoning with a recognition of different viewpoints and a critical assessment of the evidence. Four named groups with two sides each is the structure that question asks for.`,
  };
})();

/* ══ Block 6 — Oligopoly: price and non-price competition (3.3.3 · 5e-5g) ═══ */

const priceWars = (() => {
  const sid = subId('price-wars');
  return {
    id: sid,
    title: 'Price Wars',
    keyIdea: `A price war is rounds of matched cuts that leave every firm selling at a price none of them wanted, and interdependence is what makes it self-sustaining.`,
    body: [
      { type: 'paragraph', text: `The specification lists **price competition** in three forms — price wars, predatory pricing and limit pricing — distinguished by what the price aims at. This subsection takes the first; the next takes the other two together.` },
      { type: 'paragraph', text: `A **price war** is a sequence of matched cuts. One firm cuts to win customers, the others match to keep theirs, and the first now has its old share at a lower price — so it cuts again. Nobody need intend a war for one to happen.` },
      { type: 'paragraph', text: `Chapter 5's game showed the mechanism: cutting is the better reply to either choice, so both cut and take ${qty(G.cutCut[0])} where holding paid ${qty(G.holdHold[0])}. A price war is that logic repeated.` },
      { type: 'paragraph', text: `Who it suits: a firm with **lower costs** or **deeper reserves** can hold a low price longer than its rivals, so a war can remove them. Where costs are similar it simply moves money from the firms to consumers until somebody stops.` },
      { type: 'paragraph', text: `And why they end: losses mount, a firm withdraws or is bought, or one raises its price and waits to see whether the others follow — chapter 5's price leadership, doing the opposite job.` },
    ],
    realExample: { emoji: '📦', text: `Two delivery firms chasing the same city contracts can spend a season undercutting each other until both carry parcels for less than the round costs. Customers are the only party better off.` },
    misconception: `Students describe a price war as good for consumers and leave it there. It is good for consumers while it lasts; if it ends with a firm leaving, the market is more concentrated afterwards and the price may settle higher than it began.`,
    examMatters: `Appendix 6 says Examine requires evaluation and a brief assessment of the arguments as well as a chain of reasoning. The evaluation here sets the short run against the long: a gain to consumers now, against a market with one fewer firm in it later.`,
  };
})();

const predatoryLimitPricing = (() => {
  const sid = subId('predatory-and-limit-pricing');
  return {
    id: sid,
    title: 'Predatory Pricing and Limit Pricing',
    keyIdea: `A predatory price is below the seller's own average variable cost and removes a rival; a limit price is below an entrant's average cost, above the seller's own, and stops entry.`,
    body: [
      { type: 'paragraph', text: `These two are constantly confused, and one comparison separates them: **whose cost is the price below?**` },
      { type: 'paragraph', text: `**Predatory pricing** sets a price below the SELLER's own average variable cost, held long enough to drive a rival out, then raised. Chapter 4's incumbent has an average cost of ${money(PR.incumbentAc)} a unit and average variable cost ${money(PR.incumbentAvc)}. A predatory ${money(PR.predatory)} loses ${money(Math.abs(PR.predatoryLossPerUnit))} a unit on the variable costs alone — below chapter 2's shutdown point, which no firm accepts except for what it does to a rival. If the rival leaves and the price goes to ${money(PR.afterwards)}, it recovers ${money(PR.recoveredPerUnit)} a unit.` },
      { type: 'paragraph', text: `**Limit pricing** sets a price below an ENTRANT's average cost and above the seller's own: ${money(PR.limit)}, against ${money(PR.entrantAc)} and ${money(PR.incumbentAc)}. The incumbent profits by ${money(PR.limitMarginIncumbent)} a unit throughout — sacrificing some profit and never making a loss.` },
      { type: 'paragraph', text: `So predatory pricing is a deliberate loss to remove a rival; limit pricing is a reduced profit taken indefinitely to stop one arriving. Predatory pricing is unlawful in most jurisdictions as an abuse of dominance; limit pricing is hard to tell from competitive pricing.` },
      { type: 'paragraph', text: `Both only pay if the price can be raised afterwards, so both depend on chapter 4's barriers. Where entry is easy, a predator that clears the market meets a new entrant the moment the price goes up.` },
    ],
    realExample: { emoji: '🚏', text: `A bus operator running a competing service at a fare below its own fuel and wage cost is pricing predatorily. One holding a fare a newcomer could not match while covering its own costs is limit pricing.` },
    misconception: `Students call any very low price predatory. The test is the seller's own average variable cost: above it the firm is competing, below it it is paying to remove a rival.`,
    examMatters: `Appendix 6 defines Explain of a reason as including analysis, since it needs a two-stage chain: which cost the price sits below, and what that implies about whether the seller is losing money.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `An incumbent has an average cost of ${money(PR.incumbentAc)} and an average variable cost of ${money(PR.incumbentAvc)}; an entrant would face ${money(PR.entrantAc)}. Name each of these three prices:`,
      template: [
        `${money(PR.limit)} is a ___ price: it blocks entry and the incumbent still profits`,
        `${money(PR.predatory)} is a ___ price: it is under the seller's own avoidable cost`,
        `${money(38)} is neither, because it is above what an ___ would have to cover and entry would pay`,
      ],
      answers: ['limit', 'predatory', 'entrant'],
      hints: ['the price that stops a rival arriving', 'the price that removes a rival already there', 'whose cost decides whether entry pays'],
      distractors: ['competitive', 'normal'],
    }),
  };
})();

const nonPriceCompetition = (() => {
  const sid = subId('non-price-competition');
  return {
    id: sid,
    title: 'Non-Price Competition: Five Forms',
    keyIdea: `Where a price cut will be matched within days, firms compete by advertising and branding, quality, endorsement, product placement and after-sales service instead.`,
    body: [
      { type: 'paragraph', text: `In an oligopoly a price cut is visible and matched by the afternoon, and chapter 5 showed where matching leads. **Non-price competition** is what firms do instead — the normal state of most oligopolies, not the exception.` },
      { type: 'paragraph', text: `The specification names five forms.` },
      { type: 'bullets', items: NON_PRICE.map(([k, , long]) => `**${k}** — ${long}.`) },
      { type: 'paragraph', text: `Why firms prefer it. A price cut is **immediately matched** and leaves everybody with the same customers and less money. A reputation for quality or a service network takes rivals **years** to copy, so the advantage lasts — and it makes the firm's demand curve less elastic, which is worth more than one season's sales.` },
      { type: 'paragraph', text: `And it is safer. A price cut invites retaliation in the same currency; a campaign invites a rival campaign, costing both money without lowering either price. Interdependence still operates, on a battleground where the firms keep their margins.` },
    ],
    realExample: { emoji: '📺', text: `Mobile networks in one country usually charge near-identical tariffs while competing on handset bundles, network coverage claims, sponsorships and the speed at which a fault is fixed.` },
    misconception: `Students list non-price competition as advertising and brand loyalty only. The specification names five forms and three of them are easy to forget: endorsement, product placement and after-sales service. Instead: learn all five, because a question can name any of them.`,
    examMatters: `Appendix 6 defines Define as requiring the meaning of a term, concept or phrase. Non-price competition is any attempt to win customers other than by lowering price — and the examples do not substitute for saying so.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each activity to the form of non-price competition it is:',
      pairs: [
        { left: 'A three-year warranty and a repair network', right: 'After-sales service' },
        { left: 'A well-known athlete associated with the product', right: 'Endorsement' },
        { left: 'The product visible in a popular programme', right: 'Product placement' },
        { left: 'A component that lasts twice as long at the same price', right: 'Quality' },
      ],
      why: [
        'Servicing, warranties and support after the sale reduce the buyer’s risk, which is after-sales service.',
        'A person or body buyers already trust being associated with the product is endorsement.',
        'Showing the product in a setting buyers are already watching, rather than in an advertisement, is product placement.',
        'A product that works better or lasts longer wins buyers without a price cut, which is competing on quality.',
      ],
      distractors: ['Predatory pricing'],
    }),
  };
})();

const competitionCostsBenefits = (() => {
  const sid = subId('competition-costs-benefits');
  return {
    id: sid,
    title: 'Costs and Benefits of Price and Non-Price Competition',
    keyIdea: `Price competition moves money to consumers and squeezes firms; non-price competition raises costs and can improve the product.`,
    body: [
      { type: 'paragraph', text: `The specification asks for costs and benefits of price AND non-price competition to four groups: **firms, consumers, employees and suppliers** — a different list from chapter 5's collusion leaf, which named workers and governments.` },
      { type: 'paragraph', text: `**Firms.** Price competition lowers margins and can end a firm, and forces out X-inefficiency, since a firm that cannot cut cost cannot survive the price. Non-price competition protects the margin and raises fixed costs — a budget and a service network are owed whether sales rise or not — which itself becomes a barrier to entry.` },
      { type: 'paragraph', text: `**Consumers.** Price competition is a gain while it lasts: lower price, more bought. Non-price competition brings better products, more choice and more information, at the cost of paying for the advertising in the price — and some of it is persuasion rather than information.` },
      { type: 'paragraph', text: `**Employees.** Non-price competition means more secure employment and skilled work in design, marketing and service. Price competition pressures wages and staffing, though it can expand employment where the lower price wins a larger market.` },
      { type: 'paragraph', text: `**Suppliers.** A firm squeezed on price passes the squeeze up the chain: hard on suppliers, and it can lower costs across the industry. A firm competing on quality needs reliable inputs and long relationships, which suits a supplier that can deliver them and shuts out one that cannot.` },
    ],
    realExample: { emoji: '🏬', text: `Grocery chains fighting on price press their growers on cost; the same chains competing on freshness pay more and sign longer contracts.` },
    misconception: `Students judge the two kinds of competition as good and bad. Each has a cost and a benefit for all four groups, and the best answers are where the two pull one group in opposite directions — as they do for employees and suppliers.`,
    examMatters: `Appendix 6 says Examine requires evaluation and a brief assessment of the arguments as well as a chain of reasoning, focusing on depth rather than breadth. Two groups taken properly will do more than four listed.`,
  };
})();

/* ══ Block 7 — Monopoly (3.3.3 · 6a-6h) ════════════════════════════════════ */

const monopolyAssumptions = (() => {
  const sid = subId('monopoly-assumptions');
  return {
    id: sid,
    title: 'Assumptions and Barriers',
    keyIdea: `A pure monopoly is the only seller of a product with no close substitute, protected by barriers high enough to keep it the only seller.`,
    body: [
      { type: 'paragraph', text: `**Monopoly** is the other extreme from chapter 2. One seller, no close substitute, and barriers to entry high enough that the position holds.` },
      { type: 'bullets', items: [
        `**A single seller** of the product, so the firm's demand curve IS the market demand curve.`,
        `**No close substitutes**, so buyers who want the product have no alternative supplier.`,
        `**High barriers to entry and exit**, which is what preserves the position — the six of chapter 4, at their strongest.`,
        `**Profit maximisation** at MR = MC, as everywhere else in this section.`,
        `**Price setting**: the firm chooses its price, and the quantity it sells follows from the demand curve.`,
      ] },
      { type: 'paragraph', text: `The **barriers** deserve naming rather than assuming, because they decide whether the position is temporary or permanent. A patent monopoly expires. A monopoly resting on economies of scale — chapter 7's natural monopoly — lasts as long as the technology does. A legal monopoly lasts as long as the law. A monopoly held only by branding is the most fragile of the four.` },
      { type: 'paragraph', text: `In practice competition law defines a dominant position at a share well below 100%, because a firm with most of a market and no effective rival behaves much as a pure monopolist does. The model is the extreme case; its predictions apply in weaker form to firms with market power short of it.` },
    ],
    realExample: { emoji: '🚇', text: `A city's metro system is the only supplier of its service within its network, protected by a construction cost nobody would repeat and by the law under which it operates.` },
    misconception: `Students require a 100% share before calling a firm a monopolist, then conclude the model applies to almost nothing. The assumptions are an extreme case; a firm with substantial market power and no close substitute behaves in the same direction.`,
    examMatters: `Appendix 6 defines Explain of the characteristics as requiring knowledge, understanding and application. The application is that a single seller faces the MARKET demand curve, which is what gives it a choice of price at all.`,
  };
})();

const monopolyEquilibrium = (() => {
  const sid = subId('monopoly-equilibrium');
  return {
    id: sid,
    title: 'Profit-Maximising Equilibrium',
    keyIdea: `The monopolist produces where MR = MC and prices off the demand curve above that output, so price exceeds marginal cost and supernormal profit can persist.`,
    body: [
      { type: 'paragraph', text: `${Z.name} is the only supplier of ${Z.good} in its area. Its demand curve is **P = ${Z.a} ${'−'} ${Z.b}Q**, in dollars a ${Z.unit}, so marginal revenue is **MR = ${Z.a} ${'−'} ${Z.b * 2}Q**. Marginal cost is ${money(Z.mc)} a ${Z.unit} at every output.` },
      { type: 'paragraph', text: `Profit is maximised where **MR = MC**: ${Z.a} ${'−'} ${Z.b * 2}Q = ${Z.mc} gives **Q = ${qty(Z.qm)} ${Z.units} ${Z.per}**.` },
      { type: 'paragraph', text: `The price comes from the **demand curve** at that output, not from the marginal revenue curve: P = ${Z.a} ${'−'} ${Z.b} × ${qty(Z.qm)} = **${money(Z.pm)}**. Profit is (${money(Z.pm)} ${'−'} ${money(Z.mc)}) × ${qty(Z.qm)} = **${money(Z.profit)}** ${Z.per}, and unlike chapters 2 and 3 there is no entry to compete it away.` },
      { type: 'paragraph', text: `Compare that with what a competitive industry with the same costs would do. Competition drives price to marginal cost, so P = ${money(Z.mc)} and, from the demand curve, Q = ${qty(Z.qc)} ${Z.units}. The monopolist produces **${qty(Z.withheld)} ${Z.units} less** and charges **${money(round2(Z.pm - Z.mc))} more**.` },
      { type: 'paragraph', text: `Notice that the monopolist does not charge the highest price it can. At ${money(Z.pm)} it sells ${qty(Z.qm)} ${Z.units}; it could charge more and sell fewer. The demand curve constrains it, and MR = MC identifies the most profitable point on that curve.` },
    ],
    realExample: { emoji: '💧', text: `A water network supplies less at a higher price than a competitive industry with the same pipes and pumps would, which is why such networks are usually regulated on price rather than left alone.` },
    misconception: `Students say a monopolist "can charge what it likes" or reads the price off the MR curve. It faces a downward-sloping demand curve, so a higher price means fewer sales; and the price is read off AR above the MR = MC output.`,
    examMatters: `Appendix 6 defines Draw as requiring an accurately labelled diagram using quantitative skills. The labels that carry the marks are the output where MR cuts MC, the price vertically above it ON the demand curve, and the profit area between price and average cost.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Complete the monopoly equilibrium for a demand curve P = ${Z.a} ${'−'} ${Z.b}Q with marginal cost ${money(Z.mc)}:`,
      template: [
        `Marginal revenue is ${Z.a} ${'−'} ___Q, twice as steep as AR`,
        `Setting marginal revenue equal to marginal cost gives an output of ___ ${Z.units}`,
        `The price is read off the ___ curve above that output, giving ${money(Z.pm)}`,
      ],
      answers: [String(Z.b * 2), qty(Z.qm), 'demand'],
      hints: ['double the gradient of the demand curve', 'solve the equation for Q', 'the curve that says what buyers will pay'],
      distractors: ['marginal revenue', 'average cost'],
    }),
  };
})();

const monopolyCostsBenefits = (() => {
  const sid = subId('monopoly-costs-benefits');
  return {
    id: sid,
    title: 'Costs and Benefits to Firms and Consumers',
    keyIdea: `Consumers pay more and get less, and their loss exceeds the firm's gain by the welfare loss — but scale and innovation are real arguments the other way.`,
    body: [
      { type: 'paragraph', text: `The specification asks for costs and benefits to **firms and consumers**, and the previous subsection's arithmetic measures most of it.` },
      { type: 'paragraph', text: `**Consumers pay the cost.** Price rises from ${money(Z.mc)} to ${money(Z.pm)}, quantity falls from ${qty(Z.qc)} to ${qty(Z.qm)} ${Z.units}, and consumer surplus falls from ${money(Z.csCompetition)} to ${money(Z.csMonopoly)}. Part is **transferred** to the firm as profit of ${money(Z.profit)}; the rest goes nowhere.` },
      { type: 'paragraph', text: `**The welfare loss** is that remainder: the triangle between demand and marginal cost over the ${qty(Z.withheld)} ${Z.units} not produced, with area ½ × ${qty(Z.withheld)} × ${money(round2(Z.pm - Z.mc))} = **${money(Z.dwl)}** ${Z.per}. Those ${Z.units} were worth more to buyers than they would have cost to supply.` },
      { type: 'paragraph', text: `**The firm gains** ${money(Z.profit)}, and more than money: security, the ability to plan, research funded from retained profit. There is also a case that the prize of a monopoly position motivates the innovation that creates one.` },
      { type: 'paragraph', text: `**The arguments the other way.** A monopolist's scale may bring average cost BELOW what many small firms could reach, so the price may be lower than a competitive industry could offer — the next subsection's natural monopoly. And supernormal profit is where dynamic efficiency is funded, so a higher price now may buy a better product later. Neither is automatic: a monopolist MAY pass on scale economies and MAY invest, or may let X-inefficiency grow.` },
    ],
    realExample: { emoji: '🔌', text: `A single electricity network can be cheaper per household than competing sets of cables, and has no reason to pass the saving on unless a regulator requires it.` },
    misconception: `Students assert that monopoly always harms consumers. The static case is strong and the scale and innovation arguments are real; what keeps them arguments is that the firm need not pass anything on.`,
    examMatters: `Appendix 6 says Evaluate requires multi-stage chains of reasoning and a critical assessment so that informed judgements may be made. The judgement here rests on whether the scale and innovation arguments hold in the particular market.`,
  };
})();

const naturalMonopoly = (() => {
  const sid = subId('natural-monopoly');
  return {
    id: sid,
    title: 'Natural Monopoly',
    keyIdea: `Where average cost falls across the whole range of market demand, one firm supplies more cheaply than several — so competition itself raises costs.`,
    body: [
      { type: 'paragraph', text: `A **natural monopoly** exists where long-run average cost falls **continuously** across the whole range of market demand: minimum efficient scale is as large as the market or larger, so there is no room for two firms at an efficient size.` },
      { type: 'paragraph', text: `The arithmetic is one division. Say the network costs ${money(NAT.networkCost)} a day whatever it carries, plus ${money(NAT.perUnit)} a unit delivered: average cost is ${money(NAT.perUnit)} + ${money(NAT.networkCost)} ÷ Q, falling at every output and never turning up.` },
      { type: 'paragraph', text: `The market takes ${qty(NAT.market)} units a day. **One firm** supplies all of them at ${money(NAT.one)} a unit. **Two firms** supply ${qty(NAT.market / 2)} each at ${money(NAT.two)}, each duplicating the whole network for half the customers. Competition has raised the cost of supply by ${money(NAT.extraPerUnit)} a unit, ${money(NAT.extraTotal)} a day, for nothing.` },
      { type: 'paragraph', text: `**The implications** are what the specification asks for. Competition is wasteful here, so the usual remedy does not apply — but a natural monopoly left alone still restricts output and raises price, because the cost advantage does not remove the incentive. So policy usually allows one supplier and **regulates** it: cap the price, require a service standard, or own it publicly.` },
      { type: 'paragraph', text: `And the boundary moves with technology: a network monopoly stops being natural when something serves the same need without the network, which is why the list is shorter than it was.` },
    ],
    realExample: { emoji: '🚰', text: `Two sets of water mains down one street would double the buried cost and deliver the same water — which is why water networks are single suppliers almost everywhere, and regulated.` },
    misconception: `Students call any large monopoly natural. The test is whether average cost is still falling at the size of the whole market: a firm with a flat average cost curve over that range is not one, however large.`,
    examMatters: `Appendix 6 says Analyse requires a chain of reasoning and diagrams where appropriate, focusing on depth rather than breadth. The chain is continuously falling average cost, then the cost of splitting output between two firms, then the conclusion about competition.`,
  };
})();

const pdConditions = (() => {
  const sid = subId('price-discrimination-conditions');
  return {
    id: sid,
    title: 'Conditions for Third-Degree Price Discrimination',
    keyIdea: `Charging different prices to different groups for the same product needs market power, separable groups with different elasticities, and no resale between them.`,
    body: [
      { type: 'paragraph', text: `**Third-degree price discrimination** is charging different GROUPS different prices for the same product, where the difference does not reflect a difference in cost. The specification asks for the conditions necessary, and there are three.` },
      { type: 'paragraph', text: `**One: market power.** The firm must be able to set its price. A perfectly competitive grower cannot charge two prices, because it cannot charge a price at all.` },
      { type: 'paragraph', text: `**Two: separable groups with different price elasticities of demand.** The firm must know which group a buyer is in, and the groups must differ in price sensitivity. Different elasticities are what make two prices more profitable than one: the group that will not switch pays more.` },
      { type: 'paragraph', text: `**Three: no resale between the groups.** If the cheap group can sell on to the expensive group, the two prices collapse into one and the arrangement is worth nothing to the firm. This is why discrimination is common in services — a haircut or a bus ride cannot be resold — and difficult in portable goods.` },
      { type: 'paragraph', text: `Groups are separated by whatever the firm can verify and the buyer cannot fake: age, student or resident status, time of day, how far ahead a booking is made, household or business. Separating and enforcing costs money, and it must cost less than the extra profit.` },
    ],
    realExample: { emoji: '🎭', text: `A theatre charges students less for the same seat, checks a card at the door, and loses nothing by it: the seat cannot be resold and the students would not have come at the full price.` },
    misconception: `Students call any price difference discrimination. A peak fare reflecting a higher cost of supplying at peak is not; discrimination is a different price for the SAME product at the same cost. Check the cost first.`,
    examMatters: `Appendix 6 defines Explain of a term or the characteristics as requiring knowledge, understanding and application. Applying the conditions means saying why each is necessary — particularly the no-resale condition, which is the one students name without explaining.`,
  };
})();

const pdEffects = (() => {
  const sid = subId('price-discrimination-effects');
  return {
    id: sid,
    title: 'Costs and Benefits of Price Discrimination',
    keyIdea: `The firm charges each group what it will bear; some consumers pay more and some are served at all, so the verdict depends which group you are in.`,
    body: [
      { type: 'paragraph', text: `${Z.name} sells the same ${Z.good} into two markets it can tell apart and between which nothing can be resold. Marginal cost is ${money(PD.mc)} a ${Z.unit} in both.` },
      { type: 'paragraph', text: `**${PD.less.label}** is ${PD.less.who}: P = ${PD.less.a} ${'−'} ${PD.less.b}Q. MR = MC gives ${qty(PD.less.q)} ${Z.units} at **${money(PD.less.price)}**, elasticity ${elasticity(-PD.less.ped)}. **${PD.more.label}** is ${PD.more.who}: P = ${PD.more.a} ${'−'} ${PD.more.b}Q, giving ${qty(PD.more.q)} ${Z.units} at **${money(PD.more.price)}**, elasticity ${elasticity(-PD.more.ped)}.` },
      { type: 'paragraph', text: `There is the rule, and it falls out of the arithmetic rather than being asserted: **the less elastic market pays the higher price.** ${money(PD.gap)} more, for the same ${Z.good} at the same cost. Total profit is ${money(PD.totalProfit)}.` },
      { type: 'paragraph', text: `**For the firm** the benefit is that profit, each group charged closer to what it will bear. Against it: separating the groups, policing resale, and the regulatory risk if buyers think the difference unfair.` },
      { type: 'paragraph', text: `**For consumers** there is no single answer. The inelastic group pays more. The elastic group pays less than a single price would be — and in some markets is served only because of discrimination, since one price might be set above what it would pay. The profit can also cover fixed costs a single price would not, which is the argument for discriminatory fares on a route that would otherwise close.` },
    ],
    realExample: { emoji: '🚆', text: `A rail operator charges a commuter with no alternative more than an off-peak traveller who could stay at home, for the same seat.` },
    misconception: `Students say price discrimination is unfair and therefore harmful. Some pay more, some pay less, and some are served who would not be at a single price — so the verdict depends on which group is asked.`,
    examMatters: `Appendix 6 says Discuss requires a recognition of different viewpoints and a critical assessment of the evidence. Here two groups of consumers have opposite experiences of one policy, which is why "consumers lose" cannot be the answer.`,
  };
})();

const monopolyEfficiency = (() => {
  const sid = subId('monopoly-efficiency');
  return {
    id: sid,
    title: 'Productive, Allocative and Dynamic Efficiency',
    keyIdea: `A monopoly fails the two static efficiency tests and may pass the dynamic one, which is the whole of the argument about whether it should be broken up.`,
    body: [
      { type: 'paragraph', text: `All three tests, and the answers mirror chapter 2's.` },
      { type: 'paragraph', text: `**Allocative efficiency: no.** P is ${money(Z.pm)} and MC is ${money(Z.mc)}, so too little is produced — ${qty(Z.withheld)} ${Z.units} too little, a welfare cost of ${money(Z.dwl)} ${Z.per}. The failure is unavoidable: a profit maximiser sets MR = MC, and MR is below AR, so P exceeds MC necessarily.` },
      { type: 'paragraph', text: `**Productive efficiency: no reason to expect it.** Nothing drives the monopolist to the bottom of its average cost curve, because it does not need the lowest cost to survive — and the absence of pressure is the classic setting for **X-inefficiency**.` },
      { type: 'paragraph', text: `**Dynamic efficiency: possibly, and this is the real argument.** Supernormal profit of ${money(Z.profit)} ${Z.per} can fund research a firm on normal profit could not, and protection from imitation lets it capture the return. Against that, a firm with no rival has less need to innovate.` },
      { type: 'paragraph', text: `So the case against monopoly is static and measurable and the case for it dynamic and conditional. That asymmetry is why policy rarely breaks a monopoly up and instead attacks the conditions: regulate the price, require network access, remove the legal barrier, or — as chapter 8 shows — make entry credible enough that the firm behaves as if it had a rival.` },
    ],
    realExample: { emoji: '💊', text: `A patent lets a developer price well above manufacturing cost: allocatively inefficient, and also what repaid the development. When it expires, price falls towards cost and the incentive to develop the next one goes with it.` },
    misconception: `Students conclude that monopoly is inefficient and should be broken up. It fails two tests, may pass the third, and where it is a natural monopoly breaking it up raises costs.`,
    examMatters: `Appendix 6 says Evaluate requires the validity and significance of arguments to be considered and supported by chains of reasoning, with a critical assessment so that informed judgements may be made. Weighing a measurable static loss against a conditional dynamic gain is that judgement.`,
  };
})();

/* ══ Block 8 — Monopsony and contestability (3.3.3 · 7a, 7b, 8a-8d) ═════════ */

const monopsony = (() => {
  const sid = subId('monopsony');
  return {
    id: sid,
    title: 'Monopsony: a Single Buyer',
    keyIdea: `A monopsony is the only buyer, so the supply curve it faces is the average cost of what it buys — and the marginal cost rises twice as fast.`,
    body: [
      { type: 'paragraph', text: `Every chapter so far has been about a seller with power. **Monopsony** is the mirror: a single **buyer** facing many sellers.` },
      { type: 'bullets', items: [
        `**One buyer**, or one dominant buyer, of the good or labour in question.`,
        `**Many sellers**, none able to go elsewhere — the condition that matters most.`,
        `**Barriers to other buyers entering**: legal, geographical or of scale.`,
        `**The buyer minimises its costs**, as a monopolist maximises revenue.`,
      ] },
      { type: 'paragraph', text: `One step carries the rest. The **supply curve** of an input slopes up. For a single buyer it is the **average** cost of what it buys — and to get one more unit the price must rise for EVERY unit, not just the last. So the **marginal** cost of the input rises twice as fast.` },
      { type: 'paragraph', text: `Take ${MS.name}. Supply of ${MS.input} is w = ${money(MS.w0)} + ${MS.slope}L, so the marginal cost of labour is ${money(MS.w0)} + ${MS.slope * 2}L. It hires while that lies below the worker's **marginal revenue product**, here ${money(MS.mrp0)} ${'−'} ${MS.mrpSlope}L.` },
      { type: 'paragraph', text: `Setting the two equal gives **${qty(MS.mono.l)} ${MS.input}**, and the wage comes off the SUPPLY curve there: **${money(MS.mono.wage)}**. Note which curve — supply, not marginal cost — just as a monopolist's price comes off demand.` },
    ],
    realExample: { emoji: '🐟', text: `The only employer in a town faces workers who cannot take their labour elsewhere, and knows that offering more to hire one more means paying more to everyone.` },
    misconception: `Students read the wage off the MCL curve, which gives too high a wage. MCL locates the EMPLOYMENT level; supply gives the wage that attracts that many workers. The condition is also written as "marginal cost equals marginal benefit"; it is the marginal cost of the input against its marginal revenue product.`,
    examMatters: `Appendix 6 defines Explain of a reason as including analysis, since it needs a two-stage chain: a single buyer must raise the price for every unit to get one more, so the marginal cost of the input lies above its supply curve.`,
  };
})();

const monopsonyEffects = (() => {
  const sid = subId('monopsony-effects');
  return {
    id: sid,
    title: 'Costs and Benefits of a Monopsony',
    keyIdea: `A monopsony buys less at a lower price than a competitive market would, which cuts its costs and leaves sellers worse off.`,
    body: [
      { type: 'paragraph', text: `The specification asks for costs and benefits to **firms, consumers and employees**. Compare the outcome with a competitive market for the same input.` },
      { type: 'paragraph', text: `Competitively the wage settles where supply meets marginal revenue product: **${qty(MS.comp.l)} ${MS.input} at ${money(MS.comp.wage)}**. Under monopsony, **${qty(MS.mono.l)} at ${money(MS.mono.wage)}** — ${qty(MS.jobGap)} fewer jobs, ${money(MS.wageGap)} a worker less. The last worker adds ${money(MS.mono.mrp)} and is paid ${money(MS.mono.wage)}: a gap of ${money(MS.exploitationGap)}.` },
      { type: 'paragraph', text: `**For the firm**: a lower input cost, higher profit, more control over its supply chain. Against it, a wage below what the work is worth makes recruitment harder, and a supplier squeezed to the edge may fail — leaving the buyer without a supply.` },
      { type: 'paragraph', text: `**For employees and other sellers**, mostly cost: a lower price and fewer selling. Hence the case for a minimum wage here — a floor between ${money(MS.mono.wage)} and ${money(MS.comp.wage)} raises BOTH wage and employment, which it could not do in a competitive market.` },
      { type: 'paragraph', text: `**For consumers** it depends what the buyer does with the saving. A monopsonist that is competitive when it SELLS must pass the lower cost on. One with power on both sides keeps it, and consumers see nothing.` },
    ],
    realExample: { emoji: '🥛', text: `A single dairy processor buying from many small farms sets what it pays; whether shoppers see a lower price depends on whether it faces competition when it sells.` },
    misconception: `Students conclude that a minimum wage always reduces employment. In a competitive market a floor above equilibrium does; in a monopsonised one a floor between the two wages RAISES employment, because the firm already employs below the competitive level.`,
    examMatters: `Appendix 6 says Examine requires evaluation and a brief assessment of the arguments as well as a chain of reasoning. The assessment here turns on one question: does the buyer face competition when it sells? Everything for consumers follows from that.`,
  };
})();

const contestableCharacteristics = (() => {
  const sid = subId('contestable-markets');
  return {
    id: sid,
    title: 'Characteristics of a Contestable Market',
    keyIdea: `A market is contestable when outsiders could enter easily and leave without loss, so the THREAT of entry disciplines the firms inside it.`,
    body: [
      { type: 'paragraph', text: `Everything so far has counted the firms IN a market. **Contestability** is about the firms outside it.` },
      { type: 'paragraph', text: `A market is **contestable** when entry is easy and — the part students leave out — **exit is easy too**. Its characteristics:` },
      { type: 'bullets', items: CONTESTABLE.map(([k, , long]) => `**${k}** — ${long}.`) },
      { type: 'paragraph', text: `What makes this a separate theory is that **the threat of entry is enough**. A market with two firms may behave competitively if a third could enter next month, because both know that any price worth entering for will attract entry. No third firm need exist.` },
      { type: 'paragraph', text: `So contestability is a **spectrum, not a structure**. A market can hold one firm and be highly contestable, or a dozen and — if entry is blocked and exit costly — barely contestable. It asks a different question from the four chapters before it.` },
    ],
    realExample: { emoji: '🚚', text: `Road haulage on a route may have two firms and be priced as if it had ten, because a haulier elsewhere can put lorries on it within a week and take them off again.` },
    misconception: `Students define a contestable market by low barriers to ENTRY and stop. Exit matters as much: a firm that cannot leave without loss hesitates to enter.`,
    examMatters: `Appendix 6 defines Define as requiring the meaning of a term, concept or phrase. A contestable market is one where the threat of entry constrains incumbents — which needs entry AND exit to be easy, two conditions and not one.`,
  };
})();

const sunkCostsContestability = (() => {
  const sid = subId('sunk-costs-and-contestability');
  return {
    id: sid,
    title: 'The Significance of Sunk Costs',
    keyIdea: `Sunk costs are what make entry irreversible, so they determine contestability more directly than the cost of entering does.`,
    body: [
      { type: 'paragraph', text: `Sunk costs get their own requirement here, having already appeared among chapter 4's barriers, because for contestability they are not one barrier among six but the decisive one.` },
      { type: 'paragraph', text: `A firm thinking of entering asks not what entry costs but what it costs **if it goes wrong**. Where the assets can be sold or redeployed, a failed entry costs the difference between what was paid and what is recovered. Where they cannot, it costs everything.` },
      { type: 'paragraph', text: `So sunk costs turn a reversible experiment into a commitment, which changes who will try. A market can have low entry costs in total and be uncontestable if all of them are sunk — an advertising-intensive market is the standard case, since a campaign has no resale value.` },
      { type: 'paragraph', text: `The mirror is **hit-and-run entry**. A firm enters while incumbents' profit is above normal, takes some, and leaves when it is competed away, carrying its assets on. It is only possible where sunk costs are low, and its mere possibility holds the incumbents' price down.` },
      { type: 'paragraph', text: `Incumbents know this, which is why some create sunk costs deliberately: heavy brand spending, capacity ahead of demand and long exclusive contracts all raise what an entrant must commit and cannot recover.` },
    ],
    realExample: { emoji: '🛬', text: `An aircraft is among the least sunk of large assets: it can be flown to another route, leased out or sold into a world market. A tunnel under a strait is among the most sunk, and nobody enters that market speculatively.` },
    misconception: `Students equate high entry costs with low contestability. The question is what share of the cost is recoverable: a market needing a large fleet of standard vehicles can be highly contestable, while one needing a modest but entirely sunk marketing spend may not be.`,
    examMatters: `Appendix 6 says Discuss requires the validity and significance of arguments to be considered with reference to context. Sunk costs are context-dependent by nature — the same asset is sunk in one market and not another — so name the context.`,
  };
})();

const contestabilityBehaviour = (() => {
  const sid = subId('contestability-behaviour');
  return {
    id: sid,
    title: 'Implications for Profitability and Pricing',
    keyIdea: `In a contestable market incumbents hold profit near the normal level and price low enough to make entry unattractive, because the alternative is to invite it.`,
    body: [
      { type: 'paragraph', text: `The specification names two things contestability changes: **profitability** and **pricing decisions**.` },
      { type: 'paragraph', text: `**Profitability.** Supernormal profit here is a signal visible to everybody outside, and acting on it is cheap. So incumbents cannot hold profit above the normal level for long: either entry competes it away, or they keep it low enough that entry is not worth attempting. Either way, **profit tends to normal even with very few firms.**` },
      { type: 'paragraph', text: `**Pricing: limit pricing again, for a different reason.** In chapter 4 an oligopolist priced below an entrant's average cost to protect a position built on scale. Here the same tool answers a different threat: price low enough that entering is not worth the trouble, accepting a smaller margin than market share would allow.` },
      { type: 'paragraph', text: `Two more follow. Incumbents keep **costs down**, since a firm carrying X-inefficiency cannot also hold a low limit price — pressure the number of firms would not predict. And they may build **strategic barriers**: brand spending, capacity ahead of demand, exclusive contracts, all raising an entrant's sunk costs.` },
      { type: 'paragraph', text: `Hence the lesson this chapter exists for: **market structure is not conduct.** A concentration ratio counts who is inside; contestability asks who could come in.` },
    ],
    realExample: { emoji: '🧾', text: `A city with two accountancy practices may see fees held down by how easily a third could open. A regulator counting practices would see a problem that is not there.` },
    misconception: `Students conclude that a contestable market produces the perfectly competitive outcome. It pushes price and profit towards competitive levels without the many firms or the identical product, and it does so through a threat rather than through rivalry — so allocative efficiency is approached and not guaranteed.`,
    examMatters: `Appendix 6 says Evaluate requires multi-stage chains of reasoning with reference to context and a critical assessment so that informed judgements may be made. A judgement about a concentrated market needs the contestability question asked as well as the structure described.`,
  };
})();

const contestabilityCostsBenefits = (() => {
  const sid = subId('contestability-costs-benefits');
  return {
    id: sid,
    title: 'Costs and Benefits of Contestability',
    keyIdea: `Consumers gain lower prices and pressure on costs; firms lose the security that funds long-term investment, and the discipline can be undone by incumbents raising sunk costs.`,
    body: [
      { type: 'paragraph', text: `Costs and benefits to **firms and consumers** — monopoly's pair, with nearly the opposite answers.` },
      { type: 'paragraph', text: `**Consumers gain.** Prices sit closer to cost, so allocative inefficiency is smaller than the number of firms suggests; incumbents are pushed to remove X-inefficiency; and the market stays open to a firm with a better idea.` },
      { type: 'paragraph', text: `**And bear a cost, the dynamic one.** A firm that cannot hold supernormal profit has less to invest and less certainty of recovering a long investment, so where the improvement consumers want needs patient spending — a network, a research programme — contestability works against them. Hit-and-run entry has its own cost: a firm that takes the profitable business and leaves is not there when the market is thin.` },
      { type: 'paragraph', text: `**For firms** the cost is security: profit is harder to hold and costs must stay at their minimum permanently rather than when challenged. Against that, a contestable market is one a firm can ENTER, so what threatens an incumbent is every outsider's opportunity.` },
      { type: 'paragraph', text: `**And the discipline is not self-sustaining.** All of it depends on sunk costs staying low, and incumbents can raise them deliberately. A market that was contestable can be made less so, which is why competition authorities watch conduct that raises entry costs and not only prices.` },
    ],
    realExample: { emoji: '🛰️', text: `A market served by firms that enter and leave cheaply gets keen prices and little long-horizon investment. The infrastructure it runs on is usually built by somebody protected.` },
    misconception: `Students treat contestability as unambiguously good because it lowers prices. Its weakness is the same as perfect competition's — profit near the normal level leaves little to invest — and it can be dismantled by the incumbents it was disciplining.`,
    examMatters: `Appendix 6 says Evaluate requires the validity and significance of arguments and concepts to be considered and a critical assessment of the evidence. The significant qualification here is that contestability depends on a condition — low sunk costs — that firms in the market can change.`,
  };
})();

/* ══ The block plan ═════════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  { title: B1, subs: [allocativeEfficiency, productiveEfficiency, dynamicEfficiency, xInefficiency, efficiencyAcrossStructures, concentrationRatios, readingConcentrationRatios], takeaway: [
    'Allocative efficiency: P = MC. Productive efficiency: the lowest point of AC.',
    'Dynamic efficiency is about the curves MOVING over time, and needs funding.',
    `X-inefficiency is ABOVE the cost curve, at whatever output was chosen.`,
    `An n-firm concentration ratio adds the largest n shares: CR3 ${pct(CR.cr3)} and CR5 ${pct(CR.cr5)} here. Always quote n.`,
    'A ratio identifies the structure. It says nothing about conduct or about who could enter.',
  ] },
  { title: B2, subs: [pcAssumptions, pcShortRun, pcLongRun, pcShutdown, pcEfficiency], takeaway: [
    'Many firms, an identical product, free entry, perfect information. So AR = MR = P, horizontal.',
    `Short run: output where P = MC. At ${money(M.shortRun.price)} that is ${qty(M.shortRun.q)} ${M.units} and ${money(M.shortRun.profit)} of supernormal profit.`,
    `Long run: entry drives price to ${money(M.minAc)} at ${qty(M.longRun.q)} ${M.units}, where P = MR = MC = AC.`,
    `Shutdown point: the minimum of AVC, ${money(M.minAvc)}. There the loss equals the fixed cost either way.`,
    'Long run: allocatively AND productively efficient. Dynamically, the weakest of the four structures.',
  ] },
  { title: B3, subs: [mcAssumptions, productDifferentiation, mcShortRun, mcLongRun, mcEfficiency], takeaway: [
    'One assumption changed from chapter 2: the product is differentiated, so demand slopes down.',
    'Three types: physical, marketing, distribution. The last two work on identical products.',
    `Short run: MR = MC at ${qty(NI.short.q)} ${NI.units}, price read off AR at ${money(NI.short.price)}, profit ${money(NI.short.profit)}.`,
    `Long run: AR TANGENT to AC at ${qty(NI.long.q)} ${NI.units}, ${money(NI.long.price)} — on its FALLING part.`,
    `So neither efficiency holds: ${qty(NI.excessCapacity)} ${NI.units} of excess capacity, and P above MC.`,
  ] },
  { title: B4, subs: [oligopolyAssumptions, barriersScaleLimit, barriersLegalBranding, barriersSunkCosts], takeaway: [
    'A few firms dominate; barriers keep them few; INTERDEPENDENCE is what makes the structure different.',
    `A limit price of ${money(PR.limit)}, between ${money(PR.incumbentAc)} and ${money(PR.entrantAc)}, blocks entry AT A PROFIT.`,
    'Patents block the method, branding makes customers expensive, legal barriers block permission.',
    'Sunk costs bar EXIT and therefore ENTRY. The test is what share is recoverable.',
  ] },
  { title: B5, subs: [interdependence, gameTheory, collusiveNonCollusive, cartelsPriceLeadership, collusionCostsBenefits], takeaway: [
    'Interdependence gives no single outcome: collusion and non-collusion both follow from it.',
    `Cutting is dominant for each, so both cut and take ${qty(G.cutCut[0])} where holding paid ${qty(G.holdHold[0])}.`,
    'Collusion holds with few firms, similar costs, stable demand, detectable cheating.',
    'A cartel is overt and prosecutable; price leadership is tacit, with nothing to find.',
    'Collusion: costs and benefits to producers, consumers, WORKERS and GOVERNMENTS — two sides for each.',
  ] },
  { title: B6, subs: [priceWars, predatoryLimitPricing, nonPriceCompetition, competitionCostsBenefits], takeaway: [
    'A price war is matched cuts: good for consumers, and it can concentrate the market.',
    `Predatory is below the SELLER's own AVC, a deliberate loss; limit pricing is below an ENTRANT's AC.`,
    'Five forms: advertising and branding, quality, endorsement, placement, after-sales service.',
    'Costs and benefits to FIRMS, CONSUMERS, EMPLOYEES and SUPPLIERS — a different list from collusion’s.',
  ] },
  { title: B7, subs: [monopolyAssumptions, monopolyEquilibrium, monopolyCostsBenefits, naturalMonopoly, pdConditions, pdEffects, monopolyEfficiency], takeaway: [
    'One seller, no close substitute, high barriers. The firm’s demand curve IS the market demand curve.',
    `MR = MC gives ${qty(Z.qm)} ${Z.units}; the price comes off AR at ${money(Z.pm)}; profit ${money(Z.profit)} and no entry to remove it.`,
    `Against a competitive ${money(Z.mc)} and ${qty(Z.qc)} ${Z.units}: ${qty(Z.withheld)} withheld and a welfare loss of ${money(Z.dwl)}.`,
    `Natural monopoly: one firm at ${money(NAT.one)} beats two at ${money(NAT.two)}. Regulate, do not split.`,
    `Price discrimination needs power, DIFFERENT elasticities, no resale. The inelastic group pays more.`,
    'Fails allocative and productive efficiency; MAY deliver dynamic. That asymmetry is the argument.',
  ] },
  { title: B8, subs: [monopsony, monopsonyEffects, contestableCharacteristics, sunkCostsContestability, contestabilityBehaviour, contestabilityCostsBenefits], takeaway: [
    `One buyer: supply is the AVERAGE cost of the input, so marginal cost rises twice as fast.`,
    `${qty(MS.mono.l)} at ${money(MS.mono.wage)} against ${qty(MS.comp.l)} at ${money(MS.comp.wage)}: a floor between them raises BOTH.`,
    'Contestability needs easy entry AND easy exit. The THREAT is enough; no entrant need appear.',
    'Sunk costs turn a reversible experiment into a commitment. Hit-and-run entry needs them low.',
    'So profit tends to normal and price to a limit price. Structure is not conduct.',
    'And the discipline is not self-sustaining: incumbents can raise sunk costs deliberately.',
  ] },
];

export const SUBSECTIONS = BLOCK_PLAN.flatMap((b) => b.subs);

/* ══ The recall bank ══════════════════════════════════════════════════════ */
/*
 * `structure-01` IS THAT THIS SECTION HAS NO RECALL WIDGETS AT ALL — meta.reorder = 0,
 * meta.fillin = 0, no subsection carrying a `recall` key — so Learn Mode's retrieval layer renders
 * nothing and the step is read, one MCQ, one practice item. Completeness is therefore the property
 * that matters, and it is checkable: every one of the forty-three subsections carries a recall, and
 * the runner refuses if one does not. The eleven authored beside their subsections above are the
 * ones whose wording depends on the teaching text immediately before them; the thirty-two here are
 * collected so that the whole bank can be read at once and no two of them test the same thing.
 *
 * THE SIX REORDERS ARE SOURCED FROM EXTRAS CHAINS AND NOT FROM THE STEP. `topFix-04` asks for
 * "reorder recalls from the existing flows"; `lib/learn-steps.js:10` renders the recall below the
 * teaching on the same step, so a reorder built from a flow on that step has its answer printed
 * above it IN ORDER. Packet 25 banned the verbatim form, packet 27 reproduced it five times in
 * paraphrase and Layer 6 caught three, and packet 26's conclusion is the one applied here: rewording
 * makes a reorder EASIER to copy, not harder, because the words change and the order does not. So
 * this section authors no flow bodies at all and every reorder's sequence lives in the Extras tab.
 */
const ATTACH = {
  /* ── Block 1 ───────────────────────────────────────────────────────────── */
  'productive-efficiency': {
    type: 'fillin',
    prompt: `${M.name} has average costs of ${money(COSTS.ac(4))} at ${qty(4)} ${M.units}, ${money(COSTS.minAc)} at ${qty(6)} and ${money(COSTS.ac(9))} at ${qty(9)}. Work the three answers out from those figures:`,
    template: [
      `Of the three, the productively efficient output is ___ ${M.units}`,
      `Marginal cost at that output is also ___, which is how you could check it without the table`,
      `Producing ${qty(9)} ${M.units} instead would raise the cost a ${M.unit} by ___`,
    ],
    answers: [qty(COSTS.atMinAc.q), money(COSTS.minAc), money(round2(COSTS.ac(9) - COSTS.minAc))],
    hints: ['compare the three figures', 'the other curve passes through the same value', 'subtract the two average costs'],
    distractors: [qty(9), money(COSTS.ac(4)), money(20)],
  },
  'dynamic-efficiency': {
    type: 'classify',
    prompt: 'Sort each statement by whether it can be shown as a point on one static diagram:',
    groups: [
      { name: 'Can be shown on one diagram', items: ['Price equal to marginal cost at the chosen output', 'The lowest point of the average cost curve', 'A profit rectangle between price and average cost'] },
      { name: 'Cannot be shown on one diagram', items: ['The average cost curve shifting down over several years', 'A product improving while its price stays the same', 'Research funded out of this year’s supernormal profit'] },
    ],
    why: [
      'Allocative and productive efficiency are both conditions at a single output, so each is a point or an area on a diagram drawn at one moment.',
      'Dynamic efficiency is a claim about the diagram CHANGING, so it cannot appear on one drawn at a single moment.',
    ],
  },
  'efficiency-across-structures': {
    type: 'match',
    prompt: 'Match each setting of the three dials to the pressure it creates on a firm:',
    pairs: [
      { left: 'A graded crop sold at a dawn auction by hundreds of farms', right: 'No seller can set a price at all' },
      { left: 'The only water network in a city, protected by law', right: 'Nothing disciplines either the price or the cost' },
      { left: 'Four cafes on one street, each with its own regulars', right: 'Some power over price, and very little room to use it' },
      { left: 'Three airlines on one international route', right: 'Each watching what the other two will do next' },
    ],
    why: [
      'A firm charging above cost loses every customer and one letting costs drift is undercut, so both pressures operate at full strength.',
      'With no rival and no entrant there is nothing to lose customers to, so neither price nor cost is disciplined.',
      'Differentiation gives the firm some customers of its own, and close substitutes keep its demand curve highly elastic.',
      'A few firms means each is large enough to be noticed, which is interdependence rather than a pressure on price or cost.',
    ],
    distractors: ['A single buyer facing many sellers'],
  },
  'reading-concentration-ratios': {
    type: 'classify',
    prompt: 'Sort each question by whether a concentration ratio can answer it:',
    groups: [
      /*
       * "DOES ONE FIRM LEAD?" IS NOT ON THIS LIST, AND VERIFY B WAS RIGHT TO REJECT IT. The first
       * version marked it "cannot answer", while the paragraph above demonstrates the CR3/CR5 pair
       * answering exactly that question — a student reasoning from the teaching gets it marked wrong.
       * A single ratio cannot answer it; the ratio FAMILY can, which is the subsection's own point.
       * So the item is gone and the two that remain in the first group are re-asked as things a ratio
       * genuinely settles on its own.
       */
      { name: 'One ratio can settle this', items: ['What share do the largest three firms hold between them?', 'Is this market closer to one seller or to very many?'] },
      { name: 'One ratio cannot settle this', items: ['Do these firms compete hard or coordinate?', 'Would a tenth firm find it cheap to start trading here?', 'Are buyers paying more than a competitive market would charge?', 'Is anything stopping a firm from leaving again?'] },
    ],
    why: [
      'A concentration ratio counts who holds the market, so one figure answers how much the largest n hold and indicates roughly which structure this is.',
      'Conduct, contestability and the price all lie outside what any share-based figure measures. The SHAPE of the top tier is different: one ratio cannot settle it, but a CR3 beside a CR5 can, which is what the chapter shows.',
    ],
  },

  /* ── Block 2 ───────────────────────────────────────────────────────────── */
  'perfect-competition-assumptions': {
    type: 'fillin',
    prompt: 'Complete what the assumptions make true for a perfectly competitive firm:',
    template: [
      'Because the product is identical and the firm is small, the demand curve it faces is ___',
      'So for this firm alone, AR, MR and P are all ___',
      'And maximising profit then requires price to match ___',
    ],
    answers: ['horizontal', 'equal', 'marginal cost'],
    hints: ['the shape of a line that does not slope', 'what happens to the three measures', 'the cost measure price ends up matching'],
    distractors: ['downward-sloping', 'average cost'],
  },
  'pc-long-run-equilibrium': {
    type: 'reorder',
    prompt: 'Put these in the order in which they happen as entry drives a perfectly competitive industry to its long run:',
    correctOrder: [
      'The market price is high, and each grower produces where marginal cost reaches it',
      'Average cost at that output is below the price, so every grower earns supernormal profit',
      'Perfect information lets firms outside the industry see the profit, and free entry lets them act',
      'New growers begin trading, so industry supply rises and the market price falls',
      `Entry stops where the price has reached the lowest average cost, ${money(M.minAc)}`,
    ],
    why: [
      'A price-taking firm chooses output where marginal cost reaches the given price, so the price comes first and the output follows.',
      'Profit is only supernormal once average cost at that output is known to be below the price.',
      'Nothing happens next unless outsiders can both SEE the profit and act on it, which is two assumptions doing one job.',
      'Entry is what raises industry supply, and only a rise in supply can lower the market price — taking each firm’s own horizontal demand line down with it.',
      `The process has no reason to stop until supernormal profit is gone, which is at the minimum of average cost — ${money(M.minAc)} at ${qty(M.longRun.q)} ${M.units}.`,
    ],
  },
  'pc-shutdown-point': {
    type: 'fillin',
    prompt: `The price falls to ${money(20)}. This firm's lowest average cost is ${money(M.minAc)} and its lowest average variable cost is ${money(M.minAvc)}. Decide what it should do:`,
    template: [
      `At ${money(20)} the firm is making a ___, because the price is under ${money(M.minAc)}`,
      `It should keep ___ this week, because ${money(20)} still clears ${money(M.minAvc)}`,
      `It would stop only below ${money(M.minAvc)}, and it would leave the industry only below ___`,
    ],
    answers: ['loss', 'producing', money(M.minAc)],
    hints: ['compare the price with average cost', 'what to do while the price clears the avoidable cost', 'the long-run test, which is the stricter one'],
    distractors: ['profit', 'expanding'],
  },
  'pc-efficiency': {
    type: 'fillin',
    prompt: 'Complete the long-run equilibrium conditions for perfect competition and the efficiency verdict that follows:',
    template: [
      'In long-run equilibrium P, MR, MC and AC are all ___',
      `They meet at the ___ of the AC curve, which is ${money(M.minAc)} for this firm`,
      'So the firm is allocatively efficient because P = MC, and productively efficient because AC is at its ___ attainable level',
      'On dynamic efficiency the structure is the ___ of the four, because normal profit funds nothing',
    ],
    answers: ['equal', 'minimum', 'lowest', 'weakest'],
    hints: ['the relationship between all four measures', 'which end of the curve they meet at', 'which end of a range this level sits at', 'how this structure ranks on the third test'],
    distractors: ['rising', 'strongest'],
  },

  /* ── Block 3 ───────────────────────────────────────────────────────────── */
  'monopolistic-competition-assumptions': {
    type: 'classify',
    prompt: 'Sort each assumption by whether monopolistic competition shares it with perfect competition or changes it:',
    groups: [
      { name: 'Shared with perfect competition', items: ['A new barber can open next month and close the month after', 'No one shop is large enough to move the going rate', 'Each owner is trying to make as much profit as possible'] },
      { name: 'Changed', items: ['Regulars who prefer this barber will pay a little more to keep him', 'Raising the price by a tenth loses some customers and not all of them'] },
    ],
    why: [
      'Many firms, free entry and profit maximisation are carried over untouched, which is why the long run still ends in normal profit.',
      'Differentiation is the single change, and a downward-sloping demand curve is its consequence rather than a separate assumption.',
    ],
  },
  'mc-short-run': {
    type: 'reorder',
    prompt: 'Put these in the order in which they happen as entry removes a differentiated firm’s supernormal profit:',
    correctOrder: [
      `The firm maximises profit where MR = MC, charges ${money(NI.short.price)} off its demand curve and earns ${money(NI.short.profit)}`,
      'Outside firms see that profit, and low barriers mean they can begin trading',
      'What they bring to market is a close substitute rather than an identical product',
      'Each existing firm loses some customers, and keeps the rest on easier terms to switch',
      `So its demand curve shifts left, flattens, and comes to rest touching average cost at ${qty(NI.long.q)} ${NI.units}`,
    ],
    why: [
      'The supernormal profit is what the rest of the sequence removes, so it has to be established first.',
      'Nothing follows unless outsiders can both see the profit and afford to act on it.',
      'That the entrants sell SUBSTITUTES rather than the same good is what makes this different from perfect competition.',
      'Losing some customers is what shifts the curve; the remaining customers being readier to switch is what flattens it.',
      'Both effects together bring the curve to rest against average cost, and the tangency is where supernormal profit reaches zero.',
    ],
  },
  'mc-long-run-tangency': {
    type: 'fillin',
    prompt: 'Complete the long-run conditions for a monopolistically competitive firm:',
    template: [
      'The demand curve is ___ to the AC curve at the chosen output',
      'So price equals AC there and profit is ___',
      'The profit-maximising condition holds too, because MR equals ___',
      'And the point of contact lies on the ___ part of the AC curve, left of its minimum',
    ],
    answers: ['tangent', 'normal', 'MC', 'falling'],
    hints: ['what a line that touches a curve at one point is called', 'the kind of profit left when the supernormal part has gone', 'the measure marginal revenue comes to equal', 'which way the curve is sloping where they touch'],
    distractors: ['parallel', 'supernormal'],
  },

  /* ── Block 4 ───────────────────────────────────────────────────────────── */
  'oligopoly-assumptions': {
    type: 'classify',
    prompt: 'Sort each statement by whether it is required for a market to be an oligopoly:',
    groups: [
      { name: 'Required', items: ['Three licensed networks carry almost all the traffic', 'A fourth network cannot obtain a licence', 'Each network sets its tariff expecting the other two to respond'] },
      { name: 'Not required', items: ['All three sell an identical minute of calling time', 'All three happen to advertise the same monthly price', 'There happen to be exactly three of them'] },
    ],
    why: [
      'A high concentration ratio, barriers that sustain it and interdependence between the firms are what define the structure.',
      'Oligopolies exist with identical products and with differentiated ones, with matching prices and with price wars, and at no fixed number of firms.',
    ],
  },
  'barriers-scale-and-limit-pricing': {
    type: 'fillin',
    prompt: `Complete the limit-pricing arithmetic, with an incumbent average cost of ${money(PR.incumbentAc)} and an entrant’s ${money(PR.entrantAc)}:`,
    template: [
      `The incumbent sets a price of ${money(PR.limit)}, which is above its own average cost and ___ the entrant’s`,
      `So the incumbent still earns ${money(PR.limitMarginIncumbent)} a unit, while an entrant selling at that price would make a ___`,
      'Entry does not happen, and the incumbent has taken less profit than it could in order to ___ it',
    ],
    answers: ['below', 'loss', 'prevent'],
    hints: ['where the price sits relative to the entrant’s cost', 'what the entrant would make at that price', 'what the reduced profit is buying'],
    distractors: ['above', 'gain'],
  },
  'barriers-sunk-costs': {
    type: 'classify',
    prompt: 'Sort each item of entry spending by whether it is largely sunk or largely recoverable:',
    groups: [
      { name: 'Largely sunk', items: ['An advertising campaign to build a new brand', 'A tunnel bored for one route', 'A machine built for one firm’s process', 'A licence that cannot be transferred'] },
      { name: 'Largely recoverable', items: ['Aircraft that can be flown on another route or sold', 'Shelving and refrigeration units with a second-hand market', 'A licence that can be sold on to another operator'] },
    ],
    why: [
      'None of these can be sold on or used elsewhere, so a firm that enters and fails loses the whole of the spending.',
      'Each has a resale market or another use, so a failed entry costs only the difference between what was paid and what is recovered.',
    ],
  },

  /* ── Block 5 ───────────────────────────────────────────────────────────── */
  'interdependence': {
    type: 'match',
    prompt: 'Match each of the five faces of interdependence to what it means:',
    pairs: [
      { left: 'Game theory', right: 'Each firm’s best move depends on what it expects the other to do' },
      { left: 'Collusive behaviour', right: 'Firms act together on price or output, by agreement or without one' },
      { left: 'Cartels', right: 'A formal agreement to fix a price or restrict output' },
      { left: 'Price leadership', right: 'One firm moves its price and the others follow, with nothing agreed' },
      { left: 'Price wars', right: 'Rounds of matched cuts leaving everyone selling lower than they wanted' },
    ],
    why: [
      'A two-firm, two-outcome model in which neither firm can choose without an expectation about the other.',
      'The umbrella term: what matters is that the firms end up acting together, not whether they said so.',
      'The overt form, traceable because there is an agreement to find, and illegal in most jurisdictions.',
      'The tacit form: each follower is doing what is best for it given the leader’s move, so nothing is exchanged.',
      'The opposite outcome from the same interdependence, and where the two-firm game predicts the pair will end up.',
    ],
  },
  'game-theory': {
    type: 'fillin',
    prompt: 'Complete the reasoning through the two-firm, two-outcome game:',
    template: [
      `If the rival holds its price, cutting pays ${qty(G.cutHold[0])} against ${qty(G.holdHold[0])}; if the rival cuts, cutting pays ${qty(G.cutCut[0])} against ${qty(G.holdCut[0])}. Cutting is therefore a ___ strategy`,
      `Both firms reason the same way, so both cut and each takes ${qty(G.cutCut[0])}. Neither can improve by changing its ___ choice alone`,
      `Both holding would have paid each of them ${qty(G.holdHold[0])}, so the outcome they reach is ___ for both than the one they rejected`,
    ],
    answers: ['dominant', 'own', 'worse'],
    hints: ['the word for a choice that is better whatever the rival does', 'whose decision each firm controls', 'how the equilibrium compares with cooperating'],
    distractors: ['collusive', 'better'],
  },
  'cartels-and-price-leadership': {
    type: 'reorder',
    prompt: 'Put these in the order in which they happen as a cartel comes apart:',
    correctOrder: [
      'Members agree to restrict total output so that the price rises',
      'Each of them is given a quota below the output it would choose at that price',
      `Selling above quota therefore becomes attractive — ${qty(G.temptation)} more than keeping to the agreement`,
      'Somebody exceeds its quota, pushing total output up and the price back down',
      'Unless cheating can be detected and punished, those who kept the agreement stop keeping it',
    ],
    why: [
      'Restricting output is what raises the price, so it comes before anything the price causes.',
      'A quota only becomes a temptation once it is below what the member would produce at the agreed price.',
      'The size of the temptation is set BY the cartel price, which is why a successful cartel is the least stable one — and every member faces it.',
      'The extra output is what undoes the price rise the agreement was for.',
      'Detection is the condition, so it decides the outcome and is therefore last rather than first.',
    ],
  },
  'collusion-costs-benefits': {
    type: 'match',
    prompt: 'Match each group the specification names to the effect of collusion on it:',
    pairs: [
      { left: 'Producers', right: 'Higher and steadier profit, against a penalty if an overt agreement is found' },
      { left: 'Consumers', right: 'A higher price and less bought, unless the agreement is about standards' },
      { left: 'Workers', right: 'Steadier jobs at a lower output, with less pressure to remove waste' },
      { left: 'Governments', right: 'Possibly higher tax receipts, against the cost of investigating' },
    ],
    why: [
      'Collusion raises profit and removes the risk of a price war, and the legal penalty is the cost set against that.',
      'Consumers bear the main cost — a transfer of surplus to producers plus a welfare loss — and standards are the exception.',
      'Stability can mean better jobs, but output is lower so fewer are needed, and a shielded firm lets X-inefficiency grow.',
      'Higher profits may be taxed, while investigation and prosecution are paid for from public funds.',
    ],
  },

  /* ── Block 6 ───────────────────────────────────────────────────────────── */
  'price-wars': {
    type: 'reorder',
    prompt: 'Put these in the order in which they happen during a price war:',
    correctOrder: [
      'One firm lowers its price to win customers, knowing the cut is visible within hours',
      'Rivals match it to keep their own customers',
      'The first firm has its original market share back, and is selling it at a lower price',
      'So it cuts again, and they match again',
      'Losses mount until the weakest withdraws, or somebody raises its price and waits to be followed',
    ],
    why: [
      'Somebody has to move first, and the visibility of the cut is what guarantees a response.',
      'Matching is the better reply whatever the first firm does, so it follows immediately.',
      'The result of matching is the same customers at less money, which is what makes the next round rational.',
      'Repetition is what makes this a war rather than a single price change.',
      'Both endings remove the war — one by removing a firm, the other by restoring the higher price — and which arrives first depends on who can bear the losses longest.',
    ],
  },
  'competition-costs-benefits': {
    type: 'classify',
    prompt: 'Sort each effect by whether it comes from price competition or from non-price competition:',
    groups: [
      { name: 'Price competition', items: ['A grocery chain presses its growers for another two per cent', 'The weakest firm in the market closes after two thin years', 'A depot finally removes the overtime it could not justify'] },
      { name: 'Non-price competition', items: ['A firm takes on designers and a sponsorship budget it must pay for every year', 'A three-year warranty and a repair network the buyer funds in the price', 'A new entrant finds it must outspend an established name before selling anything'] },
    ],
    why: [
      'Everything here follows from the price itself falling: thinner margins, cost pressure inside the firm and pressure passed to suppliers.',
      'Everything here follows from spending to win customers some other way: the spending is a fixed cost, it creates work, and buyers fund it.',
    ],
  },

  /* ── Block 7 ───────────────────────────────────────────────────────────── */
  'monopoly-assumptions': {
    type: 'fillin',
    prompt: 'A city metro is the only supplier of its service and no one may build a second. Complete what follows:',
    template: [
      'The demand curve this firm faces is the whole ___ demand curve, so it slopes downward',
      'It can therefore choose its ___, and the quantity it sells follows from the curve',
      'What keeps the position is the construction cost and the law, which are ___ to entry',
    ],
    answers: ['market', 'price', 'barriers'],
    hints: ['whose demand curve a single seller ends up facing', 'the variable a single seller gets to set', 'the general name for what keeps rivals out'],
    distractors: ['industry', 'output'],
  },
  'monopoly-costs-benefits': {
    type: 'fillin',
    prompt: 'Complete the welfare arithmetic for this monopolist against a competitive industry with the same costs:',
    template: [
      `The monopolist produces ${qty(Z.qm)} ${Z.units} at ${money(Z.pm)}, against a competitive ${qty(Z.qc)} at ${money(Z.mc)}, so it ___ ${qty(Z.withheld)} ${Z.units}`,
      `Its profit of ${money(Z.profit)} is ___ from consumers rather than lost`,
      `The welfare loss of ${money(Z.dwl)} goes to ___`,
    ],
    answers: ['withholds', 'transferred', 'nobody'],
    hints: ['what the firm does with the output it does not make', 'what happens to the money the firm gains', 'who ends up with the remainder'],
    distractors: ['adds', 'the government'],
  },
  'natural-monopoly': {
    type: 'fillin',
    prompt: 'Complete the natural-monopoly case and what follows for policy:',
    template: [
      'A natural monopoly exists where long-run average cost is still ___ at an output as large as the whole market',
      `One firm serving ${qty(NAT.market)} units has an average cost of ${money(NAT.one)}; two firms serving half each have ${money(NAT.two)}, so competition ___ the cost of supply`,
      'A natural monopoly left alone still restricts output, so the usual policy answer is to allow one supplier and ___ it',
    ],
    answers: ['falling', 'raises', 'regulate'],
    hints: ['which way the curve is still going at that output', 'what splitting the market does to cost per unit', 'what to do instead of breaking it up'],
    distractors: ['rising', 'lowers'],
  },
  'price-discrimination-conditions': {
    type: 'fillin',
    prompt: 'Complete the three conditions necessary for third-degree price discrimination:',
    template: [
      'The firm must have market ___, so that it can set a price at all',
      'The groups must be separable and must differ in their price ___ of demand',
      'And there must be no ___ between the groups, or the two prices collapse into one',
    ],
    answers: ['power', 'elasticity', 'resale'],
    hints: ['what a firm facing a horizontal demand curve does not have', 'the property that makes two prices pay better than one', 'what the cheap group must not be able to do'],
    distractors: ['share', 'advertising'],
  },
  'price-discrimination-effects': {
    type: 'match',
    prompt: 'Match each party to what third-degree price discrimination does to it:',
    pairs: [
      { left: 'Buyers whose demand is less elastic', right: `Pay the higher price, ${money(PD.less.price)} here` },
      { left: 'Buyers whose demand is more elastic', right: `Pay less than a single price would be, ${money(PD.more.price)} here` },
      { left: 'The discriminating firm', right: 'Raises profit, and pays to separate the groups and police resale' },
      { left: 'A group a single price would have excluded', right: 'Is served at all, where one price would have been set above what it would pay' },
    ],
    why: [
      'The group that will not switch is the one that can be charged more, which is why different elasticities are a necessary condition.',
      'Charging the switchers less is what wins their custom, so discrimination is not simply a loss to every consumer.',
      'Each group is charged closer to what it will bear, and the separating and enforcing is the cost of doing so.',
      'This is the strongest argument for discrimination: without it a firm setting one price might have left that group unserved.',
    ],
  },
  'monopoly-efficiency': {
    type: 'classify',
    prompt: 'Sort each efficiency test by what a profit-maximising monopoly does on it:',
    groups: [
      { name: 'Fails necessarily', items: ['Allocative efficiency, because MR lies below AR so price exceeds marginal cost'] },
      { name: 'No pressure towards it', items: ['Productive efficiency, since the firm need not reach the lowest cost to survive', 'Freedom from X-inefficiency, since nothing forces costs down'] },
      { name: 'May be delivered', items: ['Dynamic efficiency, funded from supernormal profit', 'Innovation whose return the firm can capture because imitation is blocked'] },
    ],
    why: [
      'This one is not a tendency but an implication: a profit maximiser sets MR = MC, and MR is below AR, so P is above MC whatever the firm intends.',
      'Neither is impossible; there is simply nothing in the structure that drives the firm towards them, which is the classic setting for costs drifting upward.',
      'Supernormal profit and protection from imitation are exactly what a long research programme needs — which is why the case for monopoly is dynamic and conditional.',
    ],
  },

  /* ── Block 8 ───────────────────────────────────────────────────────────── */
  'monopsony': {
    type: 'reorder',
    prompt: 'Put these in the order in which they follow as a single buyer decides what to pay:',
    correctOrder: [
      'Supply of the input slopes upward: more is offered at a higher price',
      'Being the only buyer, the firm faces that curve as the AVERAGE cost of what it buys',
      'To attract one more unit it must raise the price for every unit it already buys',
      `So marginal cost rises twice as fast, and employment settles where it meets marginal revenue product at ${qty(MS.mono.l)} ${MS.input}`,
      `The wage is then read off the supply curve at that point: ${money(MS.mono.wage)}`,
    ],
    why: [
      'An upward-sloping supply curve is the starting fact; everything else in the chain is a consequence of it.',
      'It is being the ONLY buyer that turns the market supply curve into this firm’s average cost of the input.',
      'This is the step students skip, and it is the one that separates the average from the marginal.',
      'Twice the gradient follows from raising the price for every unit, and the quantity is settled by that marginal comparison.',
      'The price comes last and off a DIFFERENT curve, which is the error the whole chain exists to prevent.',
    ],
  },
  'monopsony-effects': {
    type: 'fillin',
    prompt: `Work the three gaps out from the two outcomes: ${qty(MS.mono.l)} workers at ${money(MS.mono.wage)} under monopsony, ${qty(MS.comp.l)} at ${money(MS.comp.wage)} competitively, with the last worker adding ${money(MS.mono.mrp)}:`,
    template: [
      `Jobs forgone: ${qty(MS.comp.l)} ${'\u2212'} ${qty(MS.mono.l)} = ___ workers`,
      `Wage forgone a worker: ${money(MS.comp.wage)} ${'\u2212'} ${money(MS.mono.wage)} = ___`,
      `And what the last worker adds against what she is paid: ${money(MS.mono.mrp)} ${'\u2212'} ${money(MS.mono.wage)} = ___`,
    ],
    answers: [qty(MS.jobGap), money(MS.wageGap), money(MS.exploitationGap)],
    hints: ['subtract the two employment figures', 'subtract the two wages', 'subtract the wage from the marginal revenue product'],
    distractors: [qty(10), money(30)],
  },
  'contestable-markets': {
    type: 'classify',
    prompt: 'Sort each statement by whether it is a characteristic of a contestable market:',
    groups: [
      /*
       * PROFITABILITY IS NOT ON THIS DIMENSION, AND THE FIRST VERSION OF THIS RECALL PUT IT ON BOTH
       * SIDES. It had "the incumbents are doing unusually well" under MORE contestable and "none of
       * them is earning much" under SAYS NOTHING, so high profit made a market contestable and low
       * profit was irrelevant — an exercise with no consistent answer, shown to the student with both
       * rationales on checking. Verify B found it. Incumbent profit is what TRIGGERS hit-and-run
       * entry; what makes the market contestable is whether entry and exit are cheap. Both
       * profitability items are therefore on the same side, which is the honest answer.
       */
      { name: 'Makes a market MORE contestable', items: ['A licence is not needed and the depot can be rented by the month', 'The lorries have a resale market if the route disappoints', 'Any operator can buy the same vehicles and the same software'] },
      { name: 'Says nothing about contestability', items: ['There are already nine firms trading in the market', 'Every firm sells an identical tonne-kilometre', 'The incumbents are currently earning unusually well', 'None of the incumbents is currently earning much'] },
    ],
    why: [
      'Contestability is about whether entry and exit are cheap: no licence to obtain, a depot that can be given up, assets with a resale market and methods anyone can buy.',
      'Everything here is about the firms INSIDE the market. Their number, their product and how much they are earning are separate questions — profit is what TRIGGERS entry into a contestable market, not what makes it contestable.',
    ],
  },
  'sunk-costs-and-contestability': {
    type: 'fillin',
    prompt: `Two firms each spend ${money(500000)} to enter. One buys aircraft; the other bores a tunnel. Complete the comparison:`,
    template: [
      'The aircraft can be sold or flown elsewhere, so most of that spending is ___',
      'The tunnel cannot be moved and has no other use, so all of it is ___',
      'Only the first firm can enter, take the excess profit and leave again, which is called ___ entry',
    ],
    answers: ['recoverable', 'sunk', 'hit-and-run'],
    hints: ['what an asset with a resale market makes the spending', 'the word for spending that cannot come back', 'the name for entering and leaving again'],
    distractors: ['avoidable', 'variable'],
  },
  'contestability-behaviour': {
    type: 'reorder',
    prompt: 'Put these in the order in which they happen as the threat of entry disciplines an incumbent:',
    correctOrder: [
      'Suppose an incumbent in a market with low sunk costs raises its price above the normal level',
      'Firms outside can see that profit, and low barriers make entering cheap',
      'Because exit is easy too, entering is a reversible experiment rather than a commitment',
      'Somebody enters, takes the profitable business and leaves again once the excess profit has gone',
      `Foreseeing all of it, the incumbent never raises the price at all: it holds a limit price of ${money(PR.limit)}`,
    ],
    why: [
      'The chain begins with a SUPPOSITION, because the sequence is what the incumbent foresees rather than what it does.',
      'Seeing the profit and being able to act on it are two separate conditions, and both are needed next.',
      'Easy EXIT is what makes entry worth attempting, and it is the condition students leave out.',
      'Entry removes the profit, and the departure is what makes it hit-and-run — which needs the low sunk costs of step three.',
      'The incumbent’s low price is the CONSEQUENCE of the whole sequence being foreseeable, so it comes last.',
    ],
  },
  'contestability-costs-benefits': {
    type: 'match',
    prompt: 'Match each party to what contestability does to it:',
    pairs: [
      { left: 'Consumers, in the short run', right: 'Prices closer to cost, and pressure on incumbents to remove waste' },
      { left: 'Consumers, over a longer horizon', right: 'Less patient investment, because supernormal profit cannot be held' },
      { left: 'Incumbent firms', right: 'Lose the security that lets them plan, and must hold costs at the minimum permanently' },
      { left: 'Firms outside the market', right: 'Gain the opportunity that the same conditions create' },
    ],
    why: [
      'The threat of entry pushes price towards cost and leaves no room for X-inefficiency, which is the case for contestability.',
      'The same mechanism removes the profit that funds a network or a research programme, which is the case against it.',
      'Profit is harder to hold and the pressure on cost never lets up, whether or not an entrant ever appears.',
      'What threatens an incumbent is an opportunity from the other side, which is why the same conditions cut both ways.',
    ],
  },
};

/*
 * Attached rather than inlined, and the runner asserts the result: every subsection carries exactly
 * one recall, no slug in ATTACH is unused, and no subsection is left without one. A typo in a slug
 * would otherwise be silent — the recall would simply not appear.
 */
export const ATTACH_SLUGS = Object.keys(ATTACH);
for (const sec of SUBSECTIONS) {
  const slug = sec.id.replace(`${SECTION}:sub:`, '');
  if (sec.recall) continue;
  if (ATTACH[slug]) sec.recall = recall(sec.id, ATTACH[slug]);
}

export function buildContent({ diagramIds, quizIndices, practiceIndices }) {
  return BLOCK_PLAN.map((b) => ({
    id: blockId(b.title),
    title: b.title,
    sections: b.subs,
    takeaway: b.takeaway,
    diagramId: diagramIds[b.title],
    quizIndices: quizIndices[b.title],
    practiceIndices: practiceIndices[b.title],
  }));
}

/* ══ Notes ════════════════════════════════════════════════════════════════ */
/*
 * `structure-05` is that the March notes and the March Learn Mode content described different
 * sections: a "Spectrum of Market Structures" overview existed in `notes[0]` and NOT in `content[]`,
 * so Learn Mode opened cold on perfect competition with no map of the four structures. The notes
 * below are one per chapter, in the same order, carrying the same figures from the same module — so
 * the two surfaces cannot drift apart without the build failing, and the overview the notes had is
 * now chapter 1's fifth subsection where a student reading Learn Mode will actually meet it.
 *
 * AND A WARNING FOR VERIFY B: notes are a FREE surface and ship in the server-rendered page from the
 * `data` column, so a `?draft=1` walk shows THESE notes only after publication. Until then the page
 * shows the March headings beside this packet's Learn Mode (DECISIONS, 16 September). Verify the
 * notes against the `draft` column, not against the page.
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '7 leaves',
    keyIdea: 'The four concepts of efficiency, and how a concentration ratio is calculated and read.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Allocative efficiency</strong> — reached where P = MC: the last unit is worth exactly what it cost to make.'),
        def('<strong>Productive efficiency</strong> — producing at the lowest attainable average cost, the bottom of the AC curve.'),
        def('<strong>Dynamic efficiency</strong> — investment and innovation lowering costs or improving the product over time.'),
        def('<strong>X-inefficiency</strong> — costs ABOVE the lowest attainable level for the output chosen.'),
        def('<strong>n-firm concentration ratio</strong> — the combined market share of the largest n firms.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`MC cuts AC at AC's minimum, so MC = AC identifies the productively efficient output: ${money(COSTS.minAc)} at ${qty(COSTS.atMinAc.q)} ${COSTS.units}.`),
        mech('P > MC means too little is produced; P < MC means too much. The gap is the measure of allocative inefficiency.'),
        mech(`CR3 = ${CR.firms.slice(0, 3).map(([, s]) => pct(s)).join(' + ')} = ${pct(CR.cr3)}; CR5 adds ${pct(CR.firms[3][1])} and ${pct(CR.firms[4][1])} to give ${pct(CR.cr5)}.`),
        link(`Two markets can share a CR5 of ${pct(CR.cr5)} and have CR3s of ${pct(CR.cr3)} and ${pct(CR.twin.cr3)}: the ratio hides the SHAPE of the market, and says nothing about conduct or contestability.`),
      ] },
    ],
    takeaway: [
      'Allocative is about the MIX (P = MC); productive is about the COST (lowest AC).',
      'X-inefficiency is above the curve; productive inefficiency is the wrong point on it.',
      'Quote n with every concentration ratio, and use it to identify a structure, not to judge conduct.',
    ],
  },
  {
    title: B2,
    meta: '4 leaves',
    keyIdea: 'The benchmark structure: assumptions, both equilibria, the shutdown point and the efficiency verdict.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Perfect competition</strong> — many small firms, a homogeneous product, free entry and exit, perfect information.'),
        def('<strong>Normal profit</strong> — the return that keeps resources in the industry; already inside the AC curve.'),
        def('<strong>Shutdown point</strong> — the minimum of average variable cost: the price at which producing and stopping lose the same.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('The firm faces a HORIZONTAL demand curve at the market price, so AR = MR = P and MR = MC becomes P = MC.'),
        mech(`Short run at ${money(M.shortRun.price)}: output ${qty(M.shortRun.q)} ${M.units}, AC ${money(M.shortRun.ac)}, profit ${money(M.shortRun.profit)}.`),
        mech(`Entry raises supply and lowers price until P = lowest AC = ${money(M.minAc)} at ${qty(M.longRun.q)} ${M.units}: P = MR = MC = AC, profit ${money(M.longRun.profit)}.`),
        mech(`Short run: produce while P ≥ AVC. At ${money(M.minAvc)} the loss is ${money(M.shutdown.profit)} — exactly the fixed cost — and the contribution is ${money(M.shutdown.contribution)}.`),
        link('Long run: allocatively and productively efficient; dynamically the weakest, because normal profit funds nothing and perfect information rewards nobody.'),
      ] },
    ],
    takeaway: [
      'The firm’s demand curve is horizontal; the MARKET demand curve still slopes down.',
      `Long-run signature: P = MR = MC = AC at the bottom of AC, ${money(M.minAc)}.`,
      'Shut down below min AVC, not below min AC: the fixed cost is owed either way.',
    ],
  },
  {
    title: B3,
    meta: '6 leaves',
    keyIdea: 'Many firms and free entry with a differentiated product, and the long-run tangency that follows.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Monopolistic competition</strong> — many firms, free entry, a DIFFERENTIATED product, independent decisions.'),
        def('<strong>Product differentiation</strong> — buyers seeing firms’ products as different: physical, marketing or distribution.'),
        def(`<strong>Excess capacity</strong> — the gap between the long-run output and the lowest-cost output: ${qty(NI.excessCapacity)} ${NI.units} here.`),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Differentiation makes the firm’s demand curve slope DOWN, and close substitutes keep it highly elastic.'),
        mech(`Short run: MR = MC at ${qty(NI.short.q)} ${NI.units}; price off AR at ${money(NI.short.price)}; AC ${money(NI.short.ac)}; profit ${money(NI.short.profit)}.`),
        mech(`Entry by close substitutes shifts AR LEFT and flattens it until AR is TANGENT to AC: ${qty(NI.long.q)} ${NI.units} at ${money(NI.long.price)} = AC, profit ${money(NI.long.profit)}.`),
        mech(`Tangency implies MR = MC there as well: MR ${money(NI.long.mr)} = MC ${money(NI.long.mc)} at ${qty(NI.long.q)} ${NI.units}.`),
        link(`A downward-sloping AR can only touch a U-shaped AC where AC is FALLING, so the tangency is left of the minimum: neither productive (${money(NI.long.ac)} against ${money(COSTS.minAc)}) nor allocative (P ${money(NI.long.price)} against MC ${money(NI.long.mc)}) efficiency holds.`),
      ] },
    ],
    takeaway: [
      'One assumption changed from perfect competition: the product is differentiated.',
      'The long-run tangency is on the FALLING part of AC, never at its minimum.',
      'Excess capacity and P > MC are the price of variety, not evidence of failure.',
    ],
  },
  {
    title: B4,
    meta: '7 leaves',
    keyIdea: 'What oligopoly assumes, and the six barriers that keep the few firms few.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Oligopoly</strong> — a few firms dominate; each firm’s best decision depends on the others’. Products may be identical or differentiated.'),
        def('<strong>Interdependence</strong> — a firm must anticipate rivals’ responses before it can choose its own price or output.'),
        def('<strong>Sunk cost</strong> — spending that cannot be recovered on leaving the market.'),
        def(`<strong>Limit pricing</strong> — a price below an ENTRANT's average cost and above the incumbent's: ${money(PR.limit)} against ${money(PR.entrantAc)} and ${money(PR.incumbentAc)}.`),
      ] },
      { title: 'MECHANISMS', items: [
        mech('The six barriers (spec order): economies of scale, limit pricing, patents, branding, sunk costs, legal.'),
        mech(`Scale and limit pricing together: the incumbent earns ${money(PR.limitMarginIncumbent)} a unit while an entrant would lose ${money(Math.abs(PR.limitMarginEntrant))}.`),
        mech('Patents make the METHOD unavailable, branding makes CUSTOMERS expensive, legal barriers make PERMISSION unavailable.'),
        link('Sunk costs are a barrier to EXIT and therefore to ENTRY: the test is what share of the entry cost is recoverable, not how large it is.'),
      ] },
    ],
    takeaway: [
      'Interdependence, not the number of firms, is what makes oligopoly different.',
      'A limit price is profitable for the incumbent. That is what separates it from predatory pricing.',
      'A large recoverable entry cost is a weaker barrier than a small sunk one.',
    ],
  },
  {
    title: B5,
    meta: '6 leaves',
    keyIdea: 'Interdependence, the two-firm game, and how collusion works and fails.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Collusive behaviour</strong> — firms acting together on price or output, by agreement (overt) or without one (tacit).'),
        def('<strong>Cartel</strong> — a formal agreement to fix price, restrict output or divide a market. Illegal in most jurisdictions.'),
        def('<strong>Price leadership</strong> — one firm moves its price and the others follow, with no agreement.'),
        def('<strong>Dominant strategy</strong> — a choice that is best whatever the other firm does.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`The two-firm game, ${G.unit}: both hold ${qty(G.holdHold[0])}/${qty(G.holdHold[1])}; one cuts ${qty(G.cutHold[0])}/${qty(G.cutHold[1])}; both cut ${qty(G.cutCut[0])}/${qty(G.cutCut[1])}.`),
        mech(`Cutting beats holding against EITHER choice by the rival (${qty(G.cutHold[0])} > ${qty(G.holdHold[0])}, and ${qty(G.cutCut[0])} > ${qty(G.holdCut[0])}), so both cut and both do worse by ${qty(G.jointLoss)} between them.`),
        mech('Collusion holds with few firms, similar costs, stable demand, detectable cheating, a standardised product.'),
        mech(`It fails as those reverse, and because breaking an agreement while the other keeps it pays ${qty(G.temptation)} more.`),
        link('Collusion’s four stakeholder groups are PRODUCERS, CONSUMERS, WORKERS and GOVERNMENTS — each with a cost and a benefit.'),
      ] },
    ],
    takeaway: [
      'The equilibrium is the best each can do given the other, not the best for both.',
      'Overt collusion can be prosecuted; tacit price leadership leaves nothing to find.',
      'Whether collusion HOLDS turns on detection, not on intention.',
    ],
  },
  {
    title: B6,
    meta: '9 leaves',
    keyIdea: 'The three forms of price competition, the five of non-price competition, and who gains from each.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Price war</strong> — a sequence of matched price cuts, leaving every firm selling lower than it wanted.'),
        def(`<strong>Predatory pricing</strong> — a price below the SELLER's own average variable cost, to remove a rival: ${money(PR.predatory)} against an AVC of ${money(PR.incumbentAvc)}.`),
        def('<strong>Non-price competition</strong> — winning customers by any means other than lowering price.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Price competition: price wars, predatory pricing, limit pricing. Non-price: advertising and branding, quality, endorsement, product placement, after-sales service.'),
        mech(`The test that separates the two low prices: predatory is below the SELLER's AVC and loses ${money(Math.abs(PR.predatoryLossPerUnit))} a unit; limit pricing is below an ENTRANT's AC and earns ${money(PR.limitMarginIncumbent)}.`),
        mech('Firms prefer non-price competition because a price cut is matched within days and a reputation takes rivals years to copy — and it makes demand less elastic.'),
        link('Costs and benefits run to FIRMS, CONSUMERS, EMPLOYEES and SUPPLIERS, and the two kinds of competition pull employees and suppliers in opposite directions.'),
      ] },
    ],
    takeaway: [
      'Name the cost the price is being compared with: the seller’s AVC, or an entrant’s AC.',
      'All five forms of non-price competition, including endorsement, product placement and after-sales service.',
      'A price war can end with one fewer firm and a higher price than it started at.',
    ],
  },
  {
    title: B7,
    meta: '8 leaves',
    keyIdea: 'The monopoly equilibrium and its welfare loss, natural monopoly, price discrimination, and all three efficiency tests.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Monopoly</strong> — one seller, no close substitute, high barriers to entry and exit.'),
        def('<strong>Natural monopoly</strong> — average cost falling across the whole range of market demand, so one firm supplies more cheaply than several.'),
        def('<strong>Third-degree price discrimination</strong> — different prices to different GROUPS for the same product, not reflecting a cost difference.'),
        def('<strong>Welfare loss</strong> — the area between demand and MC over the output a monopolist withholds.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`P = ${Z.a} − ${Z.b}Q so MR = ${Z.a} − ${Z.b * 2}Q; MR = MC = ${money(Z.mc)} gives Q = ${qty(Z.qm)} ${Z.units}; price off AR = ${money(Z.pm)}; profit ${money(Z.profit)}.`),
        mech(`Competitive comparison: P = MC = ${money(Z.mc)}, Q = ${qty(Z.qc)}. So ${qty(Z.withheld)} ${Z.units} withheld, and DWL = ½ × ${qty(Z.withheld)} × ${money(round2(Z.pm - Z.mc))} = ${money(Z.dwl)}.`),
        mech(`Natural monopoly: AC = ${money(NAT.perUnit)} + ${money(NAT.networkCost)} ÷ Q. One firm at ${qty(NAT.market)} costs ${money(NAT.one)} a unit; two at ${qty(NAT.market / 2)} cost ${money(NAT.two)}. Regulate rather than split.`),
        mech(`Price discrimination needs market power, separable groups with different elasticities, and no resale. ${PD.less.label} (|PED| ${PD.less.ped.toFixed(2)}) pays ${money(PD.less.price)}; ${PD.more.label} (|PED| ${PD.more.ped.toFixed(2)}) pays ${money(PD.more.price)}.`),
        link('Allocative: fails, necessarily, since MR < AR. Productive: no pressure towards it, and X-inefficiency is likely. Dynamic: may be funded by the supernormal profit.'),
      ] },
    ],
    takeaway: [
      'The price comes off AR above the MR = MC output, never off MR.',
      `The welfare loss is a triangle and it has an area: ${money(Z.dwl)} here.`,
      'A natural monopoly should be regulated, not broken up. The less elastic market pays the higher price.',
    ],
  },
  {
    title: B8,
    meta: '7 leaves',
    keyIdea: 'The single buyer, and why the threat of entry can discipline a market with few firms in it.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Monopsony</strong> — a single buyer of a good or of labour, facing many sellers who cannot go elsewhere.'),
        def('<strong>Contestable market</strong> — one in which the THREAT of entry constrains incumbents: easy entry AND easy exit, low sunk costs.'),
        def('<strong>Hit-and-run entry</strong> — entering while profit is above normal and leaving when it is competed away.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`A single buyer must raise the price for EVERY unit to get one more, so the marginal cost of the input rises twice as fast as supply: w = ${money(MS.w0)} + ${MS.slope}L and MCL = ${money(MS.w0)} + ${MS.slope * 2}L.`),
        mech(`MCL = MRP gives ${qty(MS.mono.l)} ${MS.input}; the wage comes off SUPPLY at ${money(MS.mono.wage)}. Competitively: ${qty(MS.comp.l)} at ${money(MS.comp.wage)} — ${qty(MS.jobGap)} more jobs and ${money(MS.wageGap)} more a worker.`),
        mech(`The last worker adds ${money(MS.mono.mrp)} and is paid ${money(MS.mono.wage)}: a gap of ${money(MS.exploitationGap)}. A minimum wage between ${money(MS.mono.wage)} and ${money(MS.comp.wage)} raises wage AND employment.`),
        mech('Contestability: profit tends to normal and price towards a limit price, however few firms are in the market, because supernormal profit invites entry.'),
        link('It all depends on SUNK COSTS staying low — and incumbents can raise them deliberately through brand spending, capacity ahead of demand or exclusive contracts.'),
      ] },
    ],
    takeaway: [
      'Read the monopsony wage off the SUPPLY curve, not off MCL.',
      'Contestability needs easy exit as well as easy entry. The threat is enough.',
      'Structure is not conduct: count who could enter, not only who is in.',
    ],
  },
];
