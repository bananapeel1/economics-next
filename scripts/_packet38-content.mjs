/**
 * PACKET 38 — macroeconomic-objectives-policies teaching content. Seven blocks, thirty
 * subsections, one subsection to a step.
 *
 * `audit/raw/econ_spec.txt:1132-1197`. Sub-topics 3 and 4 are each split across two chapters so
 * that no chapter is twice another's length (packet 31, 17 September), and **sub-topic 2 moves
 * LAST**:
 *
 *   1  What Governments Are Aiming At                    1a-1f          6 subsections
 *   2  Demand-Side Policy and the Fiscal Lever           4a, 4b         4
 *   3  Monetary Policy Instruments                       4c             4
 *   4  The Central Bank, and What Policy Can Do          4d, 4e         4
 *   5  Supply-Side Policies: The Free-Market Route       3a, 3b         4
 *   6  Supply-Side Policies: The Interventionist Route   3c, 3d         4
 *   7  Conflicts Between Objectives                      2a-2d          4
 *
 * ── WHY SUB-TOPIC 2 MOVES TO THE END ───────────────────────────────────────
 *
 * `structure-05` and `quiz-01` are one defect seen twice. The live block 0 teaches
 * `conflicts-between-objectives` as its fifth subsection — before fiscal, monetary or supply-side
 * policy exists — and then block 4 teaches the whole of it again, which is why `structure-05` can
 * say the two "substantially overlap". Worse, the live block 0 pins quiz[0], a Phillips-curve MCQ,
 * as its check-in, so **a student is asked about a curve four chapters before it is drawn**; and
 * the live block 0 fill-in demands the answer "Phillips" from a body that never says the word.
 *
 * A conflict is between two objectives, and `2a` is a trade-off a POLICY has to choose a point on.
 * Teaching it last is not a rearrangement for tidiness: it is the only order in which chapter 7
 * has anything to be about. The specification's own order is not an order of teaching — `3`
 * (supply-side) precedes `4` (demand-side) in the document, and demand-side is the easier of the
 * two and the one AD/AS is already set up for, so it goes first here too.
 *
 * ── SEVEN BLOCKS IS A MEASURED NUMBER, NOT A PREFERENCE ───────────────────
 *
 * Packet 25 measured `freeQuizPayload()` at every block count: at NINE a chapter is served no
 * check-in quiz at all and the runner refuses to build; at EIGHT the pre-test silently drops from
 * three questions to two. At seven, the pre-test is three and every chapter is served. The runner
 * asserts it rather than trusting this paragraph.
 *
 * ── WHAT THE LIVE SECTION TAUGHT THAT IS NOT HERE ──────────────────────────
 *
 * `structure-04`: `interest-rate-policy` body[3] lists all four transmission channels and the lag,
 * and `monetary-transmission-mechanism` then teaches the same four channels again, their two
 * fill-ins sharing the answer "asset". The reason there was room to say everything twice is that
 * **half the monetary instruments were missing**: `4c-3` "changes in lending criteria" and `4c-4`
 * "reserve asset (liquidity) requirements" are two of the four the specification names, and
 * neither is taught anywhere in the live section. The duplication is not removed, it is spent.
 *
 * `specGap-09`: the live `short-run-vs-long-run` teaches a vertical long-run Phillips curve and
 * calls the material "most frequently examined". `2a` says "including the **short-run** Phillips
 * curve" and says nothing else; `long-run Phillips`, `expectations-augmented`, `NAIRU` and
 * `natural rate` are each 0 hits. The block is replaced by the four conflicts the specification
 * actually lists, and the short-run curve's limits survive as one misconception.
 */
import {
  SECTION, subId, id, ECON, bn, pct, idx, ofGdp, round1,
  OBJECTIVES, CONFLICTS, FREE_MARKET, INTERVENTIONIST, MONETARY_INSTRUMENTS, CENTRAL_BANK_ROLES,
} from './_packet38-util.mjs';

const E = ECON;
const blockId = (title) => id('block', title);

/*
 * EVERY RECALL IS MINTED HERE so the id is a function of the subsection, never of array position —
 * the defect packet 2 spent a decision on. `shuffled` is never written: the renderer ignores it and
 * CONTENT-GATE says to delete it when you touch a reorder.
 */
const recall = (sid, spec) => ({ id: `${sid}:recall`, ...spec });

export const B1 = 'What Governments Are Aiming At';
export const B2 = 'Demand-Side Policy and the Fiscal Lever';
export const B3 = 'Monetary Policy Instruments';
export const B4 = 'The Central Bank, and What Policy Can Do';
export const B5 = 'Supply-Side Policies: The Free-Market Route';
export const B6 = 'Supply-Side Policies: The Interventionist Route';
export const B7 = 'Conflicts Between Objectives';

/* ══ Block 1 — What Governments Are Aiming At (2.3.6 · 1a-1f) ════════════ */

/*
 * SIX OBJECTIVES, AND THE LIVE SECTION TEACHES FOUR. `specGap-01` asks for three more and names
 * one that is not an objective at all: "protection of the environment" is `2b`, a CONFLICT —
 * "Economic growth and protection of the environment" — and it is taught in chapter 7 where the
 * specification puts it. The two that ARE missing objectives are `1e` and `1f`, and they are the
 * last two subsections here.
 */

const economicGrowthObjective = (() => {
  const sid = subId('economic-growth-objective');
  return {
    id: sid,
    title: 'Economic Growth',
    keyIdea: 'Governments aim for growth in real output that can be sustained, because growth is what pays for rising living standards without storing up a correction.',
    body: [
      { type: 'paragraph', text: `Sub-topic 1 lists six **macroeconomic objectives**, and the first is **economic growth** — a sustained rise in real GDP. Real matters: output measured at constant prices, so that a rise in the figure is more goods and services rather than the same ones at higher prices.` },
      { type: 'paragraph', text: `Growth is the objective the other five tend to be judged against, because it is the one that pays for them. A growing economy generates the incomes that reduce unemployment, the tax revenue that closes a budget gap, and the capacity to raise the poorest households' incomes without taking from anybody.` },
      { type: 'paragraph', text: `What governments want is not the highest possible number. Growth far above what an economy's capacity can support pulls inflation with it and tends to end in a contraction, so the objective is growth that can be **sustained**. In ${E.country}, ${E.what}, the government judges ${pct(E.growthTarget)} a year sustainable; real GDP is growing at ${pct(E.growth)}.` },
      { type: 'paragraph', text: `That gap is why the rest of this topic exists. Chapters 2 to 6 are the levers a government might pull to close one, and chapter 7 is what pulling them costs elsewhere.` },
    ],
    realExample: { emoji: '📈', text: `India's real GDP has grown at around 6 to 7% a year for much of the past decade, roughly double the rate of most high-income economies. Growth objectives are set against what a given economy can sustain, not against one global number.` },
    misconception: `Students treat any rise in GDP as growth. A rise measured at current prices can be pure inflation — the same output, repriced. Growth is the change in REAL GDP, and a question giving a nominal figure and an inflation rate is asking you to notice.`,
    examMatters: `Appendix 6 defines Define as requiring the meaning of a term, so "economic growth" needs "a sustained increase in real output", not an example. The word "real" is often the difference between the mark and none.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `An economy's nominal GDP rose 5% last year while prices rose 5%. Complete the analysis:`,
      template: [
        'Output measured at constant prices grew by ___% over the year.',
        'So the quantity of goods and services produced ___.',
        'A government judging this economy against a growth objective should read the ___ figure, not the nominal one.',
      ],
      answers: ['0', 'did not change', 'real'],
      hints: [
        'nominal growth minus the change in prices',
        'what happens to output when every extra dollar of spending was a price rise',
        'the word that distinguishes output from its money value',
      ],
      distractors: ['5', 'doubled', 'nominal'],
    }),
  };
})();

const lowStableInflation = (() => {
  const sid = subId('low-stable-inflation');
  return {
    id: sid,
    title: 'Low and Stable Inflation',
    keyIdea: 'The objective is not zero inflation but a low rate that people can predict, because it is unpredictability rather than the rate itself that damages decisions.',
    body: [
      { type: 'paragraph', text: `The specification's second objective is a **low and stable rate of inflation**, and both adjectives are doing work. Low, because high inflation erodes the real value of savings and fixed incomes. **Stable**, because a rate that jumps about is one nobody can plan around.` },
      { type: 'paragraph', text: `That second half is the part students lose. A firm signing a supply contract, a household taking a mortgage and a worker agreeing a wage are all betting on future prices. Inflation steady at ${pct(3)} can be built into all three; ${pct(1)} one year and ${pct(9)} the next cannot, and the safe response is to postpone.` },
      { type: 'paragraph', text: `Most governments that state a figure state a target of about ${pct(E.inflationTarget)} with a tolerance band either side. ${E.country}'s central bank is set ${pct(E.inflationTarget)} ± ${pct(E.inflationBand)}, and inflation is ${pct(E.inflation)} — inside the band, at its upper edge.` },
      { type: 'paragraph', text: `Why not zero? A small positive rate leaves room to push a real interest rate below zero in a downturn, and measured inflation tends to overstate the true rise in living costs. An economy at zero is one step from falling prices, which is the harder problem.` },
    ],
    realExample: { emoji: '🇯🇵', text: `Japan spent much of the 1990s and 2000s with inflation at or below zero. Households delayed purchases because goods were expected to be cheaper later, and the central bank could not cut rates far enough to change that. Falling prices proved far harder to escape than mild inflation.` },
    misconception: `Students write that zero inflation would be ideal because prices would be stable. Zero is the edge of deflation, and deflation makes waiting rational for every buyer — which removes the spending output depends on. A low positive rate is the objective precisely because it is not zero.`,
    examMatters: `A question naming an inflation target is usually testing whether you know the target belongs to the central bank and the objective belongs to the government (Appendix 6, Explain). Chapter 4 is where that division is made.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each situation by whether the problem a household faces is the LEVEL of inflation or its UNPREDICTABILITY:',
      groups: [
        { name: 'The level', items: ['Savings in a bank account lose a quarter of their purchasing power in three years', 'A pension fixed in money terms buys steadily less each year'], why: 'Both would happen at a high rate even if everyone had seen it coming years in advance — the damage is done by the size of the rate.' },
        { name: 'The unpredictability', items: ['A supplier refuses to quote a fixed price for a contract more than three months ahead', 'A union and an employer cannot agree a wage because they disagree about next year\'s prices', 'A firm postpones building a plant until it can forecast its costs'], why: 'Each is a decision that could be made at any steady rate. What blocks it is not knowing the rate, so the parties cannot agree what a future sum is worth.' },
      ],
    }),
  };
})();

const lowUnemploymentObjective = (() => {
  const sid = subId('low-unemployment-objective');
  return {
    id: sid,
    title: 'Low Unemployment',
    keyIdea: 'Low unemployment is an objective because idle labour is output the economy never produces and income a household never receives, and both losses are permanent.',
    body: [
      { type: 'paragraph', text: `The third objective is **low unemployment** — the smallest possible number of people who are willing and able to work, and actively looking, but without a job.` },
      { type: 'paragraph', text: `It matters on two counts. To the economy, an unemployed worker is capacity standing idle: output that could have been produced this year and now never will be, because a year of labour cannot be stored. To the household, it is income lost and skills decaying, and a long spell makes the next job harder to get.` },
      { type: 'paragraph', text: `The government also pays twice. Unemployment benefit is spending that rises exactly when tax revenue from wages falls, which is why a rise in unemployment widens a budget deficit from both sides at once. ${E.country}'s unemployment is ${pct(E.unemployment)}, and the deficit in chapter 1's fifth subsection is partly that figure.` },
      { type: 'paragraph', text: `Note what the objective is NOT: zero. Some unemployment is people moving between jobs, and an economy where nobody was ever between jobs would be one where nobody ever moved to a better one. The objective is low, and what counts as low differs between economies with different labour markets.` },
    ],
    realExample: { emoji: '🧑‍🏭', text: `Several Gulf economies run very low unemployment among nationals alongside large expatriate workforces, while South Africa's has stayed above a quarter of the labour force for years. The same objective is stated in both, and what counts as meeting it is not the same number.` },
    misconception: `Students treat anyone without a job as unemployed. A retired person, a full-time student and someone who has stopped looking are all without work and none is counted: the measure requires being available for work AND actively seeking it. This is why unemployment can fall because people gave up looking, which is not an improvement.`,
    examMatters: `Appendix 6 defines Analyse as a chain of reasoning without evaluation, so an Analyse on the costs of unemployment wants the links — idle labour to lost output to lost tax revenue — rather than a list of four costs.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each change in an economy to what happens to the government\'s budget position as a direct result:',
      pairs: [
        { left: 'Unemployment rises by two percentage points', right: 'Spending rises and tax revenue falls, so the deficit widens from both sides', why: 'The same people who stop paying income tax start receiving benefit, so one change moves both halves of the budget the same way.' },
        { left: 'Employment rises with no change in tax rates', right: 'Revenue rises without any decision being taken', why: 'More wages are being paid, so more income tax is collected at unchanged rates — the revenue moves because the base moved.' },
        { left: 'A worker moves between two jobs in the same month', right: 'Almost nothing, because the spell is too short to matter', why: 'Short frictional spells are the part of unemployment the objective does not try to remove, and they barely touch the budget.' },
      ],
      distractors: ['The central bank\'s inflation target is automatically lowered'],
    }),
  };
})();

const currentAccountEquilibrium = (() => {
  const sid = subId('current-account-equilibrium');
  return {
    id: sid,
    title: 'Balance of Payments Equilibrium on Current Account',
    keyIdea: 'The objective is a current account roughly in balance over time, because a persistent deficit has to be financed by selling assets or borrowing from abroad.',
    body: [
      { type: 'paragraph', text: `The fourth objective is **balance of payments equilibrium on the current account** — the record of trade in goods and services, plus income and transfers, between a country and the rest of the world.` },
      { type: 'paragraph', text: `"Equilibrium" here means roughly in balance over a run of years, not exactly zero in any one. A deficit means the country is buying more from abroad than it sells, and the difference has to be paid for: by borrowing from abroad, or by selling assets to foreign owners. Neither is free, and neither can continue indefinitely.` },
      { type: 'paragraph', text: `${E.country} runs a current account deficit of ${bn(Math.abs(E.currentAccount))}, which is ${ofGdp(Math.abs(E.currentAccountPctGdp))}. A deficit of that size is financeable while lenders are willing; the risk is that they stop being willing quickly, and an economy that has been importing more than it exports for years has no quick way to reverse it.` },
      { type: 'paragraph', text: `A surplus is not automatically the objective either. A large persistent surplus means an economy is consuming less than it produces and lending the difference abroad, which is a choice with its own costs. The specification asks for equilibrium, and equilibrium is the middle.` },
    ],
    realExample: { emoji: '🚢', text: `Pakistan and Sri Lanka have both faced episodes where a current account deficit became impossible to finance, forcing sharp import restrictions and currency falls. Singapore has run the opposite position — a large sustained surplus — and neither country is at the equilibrium the objective describes.` },
    misconception: `Students read a current account deficit as an economy "losing money". It is an accounting position, not a verdict: an economy importing capital equipment it cannot yet make runs a deficit in order to raise future output. What makes a deficit dangerous is its persistence and how it is financed.`,
    examMatters: `A Discuss wants both sides weighed, and Appendix 6 asks for recognition of different viewpoints — so the case that a deficit can be benign has to appear, not only the case against.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Two economies each import ${bn(24)} more than they export this year. One has a GDP of ${bn(800)}, the other ${bn(1200)}. Complete the comparison:`,
      template: [
        `For the first economy the gap is ___% of GDP.`,
        `For the second, the same ${bn(24)} is ___% of GDP.`,
        'So the same gap weighs less on the economy with the larger national ___.',
      ],
      answers: ['3', '2', 'income'],
      hints: [
        'the gap divided by the first economy\'s GDP, as a percentage',
        'the same gap divided by the larger GDP',
        'the annual flow GDP measures, which is what the gap is being compared against',
      ],
      distractors: ['24', '4', 'exports'],
    }),
  };
})();

const balancedGovernmentBudget = (() => {
  const sid = subId('balanced-government-budget');
  return {
    id: sid,
    title: 'Balanced Government Budget',
    keyIdea: 'A balanced budget means government spending matched by tax revenue over the cycle, so that the state is not adding to what it owes in order to meet its running costs.',
    body: [
      { type: 'paragraph', text: `The fifth objective is a **balanced government budget**, and it is the one the live version of this section never taught. The budget balance is a single subtraction: tax revenue minus government spending, over a year.` },
      { type: 'paragraph', text: `${E.country} collects ${bn(E.taxRevenue)} and spends ${bn(E.govSpending)}, so its balance is ${bn(E.budgetBalance)} — a **deficit** of ${bn(Math.abs(E.budgetBalance))}, or ${ofGdp(Math.abs(E.budgetPctGdp))}. Revenue above spending would be a **surplus**. Equality between the two is the balanced budget the objective names.` },
      { type: 'paragraph', text: `Why aim for balance? A deficit has to be borrowed, and borrowing carries interest paid out of future tax revenue — so a deficit run year after year takes a growing slice of future spending before any reaches a school or a road. A government borrowing heavily may also compete with firms for the same funds.` },
      { type: 'paragraph', text: `But the objective is balance **over the cycle**, not in every year. Revenue falls and benefit spending rises in a downturn with nobody deciding anything, so a government insisting on balance annually would cut spending exactly when the economy was weakest. Fiscal deficits as a stock of debt, and automatic stabilisers, are topic 4.3.5 in Unit 4.` },
    ],
    realExample: { emoji: '🛢️', text: `Saudi Arabia, Kuwait and Oman run budgets whose balance swings between surplus and deficit as the oil price moves, with no change of policy at all — a balance determined by the economy rather than by the government.` },
    misconception: `Students treat a deficit as automatically bad management. Borrowing to build infrastructure that raises future output is a different proposition from borrowing to meet running costs, because the first generates the revenue that repays it. The objective is balance over the cycle, so one year's figure settles nothing.`,
    examMatters: `Appendix 6 allows Calculate at 2 or 4 marks with workings shown, and a budget balance is the commonest 2-mark calculation on this topic: set out revenue minus spending as a line rather than writing the answer alone.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'A different government collects $410bn and spends $380bn. Sort each statement by whether it follows from those two figures or does not:',
      groups: [
        { name: 'Follows from the figures', items: ['The budget is in surplus by $30bn', 'No new borrowing is needed to meet this year\'s spending', 'The government could repay earlier borrowing out of this year\'s revenue'], why: 'Each is either the subtraction itself or its immediate consequence: revenue above spending leaves a sum that does not have to be raised, and can be used to pay something down.' },
        { name: 'Does not follow', items: ['The government is spending too little on schools and hospitals', 'The economy must be growing'], why: 'Neither is in the arithmetic. A surplus says the two flows differ this year; it says nothing about whether the spending was enough, or about what real output is doing.' },
      ],
    }),
  };
})();

const greaterIncomeEquality = (() => {
  const sid = subId('greater-income-equality');
  return {
    id: sid,
    title: 'Greater Income Equality',
    keyIdea: 'The sixth objective is a narrower spread of incomes, pursued because very unequal outcomes waste talent and weaken the spending that output depends on.',
    body: [
      { type: 'paragraph', text: `The last of the six is **greater income equality** — a narrower gap between the incomes of the best and worst paid. Like the balanced budget, it is absent from the live version of this section and it is an objective in its own right.` },
      { type: 'paragraph', text: `One way to state the gap is by shares. In ${E.country} the richest fifth of households receive ${pct(E.topFifthShare)} of all income and the poorest fifth receive ${pct(E.bottomFifthShare)}, a ratio of about ${E.equalityRatio} to one. Greater equality means moving that ratio down, whether by raising the bottom, lowering the top, or both.` },
      { type: 'paragraph', text: `The economic case is not only a moral one. A household near the bottom spends almost all of an extra dollar and one at the top saves much of it, so income concentrated at the top supports less demand than the same income spread wider. And a child whose education depends on family income becomes a worker whose productivity was set by something other than ability.` },
      { type: 'paragraph', text: `Equality is not the same as **equity**. Perfect equality — everybody paid identically — would remove the reward for training, for risk and for effort. The objective as the specification states it is *greater* equality, a direction rather than a destination, and chapter 7 is where its cost against growth is weighed.` },
    ],
    realExample: { emoji: '🇰🇷', text: `South Korea and Malaysia both narrowed their income gaps during periods of rapid growth, largely by expanding education rather than by redistribution alone. Growth and a narrower spread are not automatically opposed.` },
    misconception: `Students treat equality and equity as one objective. Equality is the spread of outcomes; equity is whether the process producing them is fair. A system can be equitable and unequal — identical rules, different results — and the objective here is the spread, which is why it reads GREATER equality.`,
    examMatters: `An Evaluate carries 20 marks and Appendix 6 asks for informed judgements, so listing advantages and disadvantages without reaching a supported position stops short of the command word.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this chain in the order the causes actually run, starting from the change in the distribution of income:',
      correctOrder: [
        'A larger share of national income goes to the highest-earning households',
        'Those households save a greater fraction of each extra dollar than poorer ones would',
        'Total consumer spending is lower than it would have been at the same national income',
        'Firms facing weaker demand produce less and hire fewer workers',
      ],
      criterion: 'each step is caused by the one before it, following the income from where it lands to what it does to output',
      why: [
        'This is the change in the distribution itself, before anything has responded to it — the starting point of the chain.',
        'The difference between rich and poor households here is the fraction of an extra dollar spent rather than saved, so where the income lands decides how much of it is spent.',
        'Spending is the sum of what every household spends, so shifting income towards savers lowers the total even though national income is unchanged.',
        'Firms respond to the demand they actually face, so weaker spending shows up as less output and fewer jobs — which is why this is an economic argument and not only a moral one.',
      ],
    }),
  };
})();

/* ══ Block 2 — Demand-Side Policy and the Fiscal Lever (2.3.6 · 4a, 4b) ══ */

const fiscalAndMonetary = (() => {
  const sid = subId('fiscal-and-monetary');
  return {
    id: sid,
    title: 'Fiscal Policy and Monetary Policy',
    keyIdea: 'Both demand-side policies work by moving aggregate demand. They differ in who acts and with what: the government with spending and taxes, the central bank with money and credit.',
    body: [
      { type: 'paragraph', text: `Sub-topic 4 opens with **the distinction between fiscal and monetary policy**, and it is the distinction the whole of chapters 2 to 4 is organised around. Both are **demand-side policies**: both work by moving aggregate demand, which is total planned spending on an economy's output.` },
      { type: 'paragraph', text: `**Fiscal policy** is the government changing its own spending or the taxes it collects. **Monetary policy** is the central bank changing the price or the availability of money and credit. The difference is not what they aim at — both aim at AD — but who holds the lever and what the lever is made of.` },
      { type: 'paragraph', text: `The second difference is speed and precision. A government can direct spending at a region or a group; a rate change reaches everyone who borrows or saves and cannot be aimed. But a rate decision takes an afternoon, while a tax or spending change needs a budget and a vote.` },
      { type: 'paragraph', text: `Hold on to the separation of hands, because chapter 4 turns on it: in most economies the government sets the objective and the central bank is left to hit the inflation target without being told how. That arrangement is sub-topic 4d, and it is the reason the two policies can pull against each other.` },
    ],
    realExample: { emoji: '🏛️', text: `When an economy weakens, two things happen from two different buildings: the finance ministry changes spending or taxes in its budget, and the central bank changes its policy rate at a scheduled meeting. Neither needs the other's permission.` },
    misconception: `Students treat "the government cuts interest rates" as ordinary shorthand. In most economies the government does not set the rate — an independent central bank does, deliberately. Writing it the other way loses the distinction this topic asks for in its first demand-side bullet.`,
    examMatters: `Appendix 6 gives Explain 4 marks for a two-stage chain, so "explain how fiscal policy affects AD" wants the instrument, then the component of AD it moves.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'A central bank and a finance ministry each announce measures on the same day. Sort each measure by which policy it belongs to:',
      groups: [
        { name: 'Fiscal policy', items: ['Income tax rates are cut by two percentage points', 'A $9bn programme of school building is announced', 'The rate of tax on company profits is raised'], why: 'Each is a change to what the government spends or what it collects, and only the government can make it.' },
        { name: 'Monetary policy', items: ['The policy interest rate is raised from 5% to 5.5%', 'The central bank begins buying government bonds from banks', 'Banks are required to hold a larger fraction of deposits as reserves'], why: 'Each changes the price or the availability of money and credit, and each is a decision of the central bank rather than the government.' },
      ],
    }),
  };
})();

const reflationaryAndDeflationary = (() => {
  const sid = subId('reflationary-and-deflationary');
  return {
    id: sid,
    title: 'Reflationary and Deflationary Policies',
    keyIdea: 'Reflationary policy pushes aggregate demand up; deflationary policy pushes it down. The pair names the direction, and either policy can be used in either direction.',
    body: [
      { type: 'paragraph', text: `The second half of sub-topic 4a is **the distinction between reflationary and deflationary policies**, and it is a distinction of DIRECTION rather than of instrument. Both fiscal and monetary policy can be run either way.` },
      { type: 'paragraph', text: `**Reflationary** — also called expansionary — means raising aggregate demand: higher government spending, lower taxes, lower interest rates, more credit. It is what a government reaches for when output is below what the economy could produce and unemployment is high.` },
      { type: 'paragraph', text: `**Deflationary** — also called contractionary — means lowering aggregate demand: lower government spending, higher taxes, higher interest rates, tighter credit. It is the response to inflation running above target, and to a current account deficit driven by spending on imports.` },
      { type: 'paragraph', text: `Put the two directions on the same axes and the symmetry is exact. A reflationary fiscal expansion in ${E.country} shifts AD right and takes real output from ${bn(E.gdp)} to ${bn(E.Yfiscal)} with the price level rising from ${idx(E.P0)} to ${idx(E.Pfiscal)}. The same measure reversed shifts AD left by the same distance: output ${bn(E.Ydeflate)}, price level ${idx(E.Pdeflate)}. **Output and the price level move the same way, whichever direction AD moves.**` },
    ],
    realExample: { emoji: '↕️', text: `Across 2021 and 2022 many economies switched direction within about a year: reflationary while output was recovering, then sharply deflationary as inflation rose — the same central banks and the same instruments, run the other way. Direction is a choice about circumstances, not a property of the tool.` },
    misconception: `Students hear "deflationary policy" and think it means causing deflation, so they avoid the word. It reduces aggregate demand and so slows the rate at which prices rise; it is normally used to bring inflation DOWN TO a target, not below zero. Deflation is an outcome, a deflationary policy is a direction.`,
    examMatters: `A question that describes a measure and asks you to identify it is usually asking for both labels — reflationary or deflationary AND fiscal or monetary — and Appendix 6 gives no credit twice for the same half.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'An economy has inflation above target and a widening current account deficit. Match each measure to the direction it moves aggregate demand and whose lever it is:',
      pairs: [
        { left: 'Raise the policy interest rate', right: 'Deflationary, and monetary', why: 'A higher rate makes borrowing dearer and saving more attractive, which lowers spending — and the rate is the central bank\'s to set.' },
        { left: 'Cut income tax rates', right: 'Reflationary, and fiscal', why: 'Households keep more of each dollar earned and spend part of it, so AD rises — and only the government can change a tax rate.' },
        { left: 'Reduce a planned government building programme', right: 'Deflationary, and fiscal', why: 'Government spending is a component of AD in its own right, so cancelling it removes the spending directly.' },
        { left: 'Buy government bonds from commercial banks', right: 'Reflationary, and monetary', why: 'It puts money into the banking system and pushes longer-term interest rates down, so it raises AD — and it is the central bank buying.' },
      ],
    }),
  };
})();

const fiscalInstruments = (() => {
  const sid = subId('fiscal-instruments');
  return {
    id: sid,
    title: 'Fiscal Policy Instruments: Spending and Taxation',
    keyIdea: 'Fiscal policy has two instruments. Government spending moves aggregate demand directly; taxation moves it through what households and firms do with what is left.',
    body: [
      { type: 'paragraph', text: `The specification gives fiscal policy two instruments and no more: **government spending and taxation** (sub-topic 4b). Everything a finance ministry does on the demand side is one of those two, or a combination.` },
      { type: 'paragraph', text: `**Government spending is a component of aggregate demand in its own right.** When the state buys a hospital, a road or a year of a teacher's time, that spending IS demand for output — it does not have to pass through anybody's decision first. A dollar of extra government spending is a dollar of extra AD, immediately.` },
      { type: 'paragraph', text: `**Taxation works one step removed.** Cutting income tax raises disposable income, and households spend SOME of the increase and save the rest. Cutting a tax on profits leaves firms more to invest, and they invest some of it. A dollar of tax cut therefore raises AD by less than a dollar, by an amount the government does not control.` },
      { type: 'paragraph', text: `That asymmetry is the practical difference between the two. ${E.country}'s government spends ${bn(E.govSpending)} and collects ${bn(E.taxRevenue)}; a ${bn(E.fiscalInjection)} rise in spending is ${bn(E.fiscalInjection)} of new demand, while a ${bn(E.fiscalInjection)} tax cut is ${bn(E.fiscalInjection)} of extra disposable income out of which some will be saved.` },
    ],
    realExample: { emoji: '🛣️', text: `Malaysia and Indonesia have both used large road and rail programmes as a demand-side measure while also adjusting fuel subsidies — the spending instrument and the tax-and-subsidy instrument being used at the same time, and in the same budget.` },
    misconception: `Students treat a tax cut and a spending rise of the same size as one policy. Spending enters AD in full; a tax cut enters only to the extent it is spent rather than saved. A question asking which of two equally costly measures raises AD more is asking for this.`,
    examMatters: `Appendix 6 defines Draw at 4 marks as an accurately labelled diagram, and a fiscal question that mentions AD is usually expecting one — price level on the vertical axis, real output on the horizontal, and the shift arrowed and labelled.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A government is choosing between ${bn(16)} of extra spending and a ${bn(16)} tax cut. Households spend 70 cents of each extra dollar of disposable income. Complete the comparison:`,
      template: [
        `The first measure adds ${bn(16)} to aggregate demand, because what the government buys is a ___ of AD.`,
        `The tax cut adds ${bn(11.2)} at the first round, because households ___ the rest.`,
        'So for the same cost to the budget, the ___ measure moves AD further.',
      ],
      answers: ['component', 'save', 'spending'],
      hints: [
        'what G is inside the expression for aggregate demand',
        'what a household does with the part of a tax cut it does not spend',
        'which of the two instruments enters demand without passing through a household decision',
      ],
      distractors: ['multiplier', 'borrow', 'taxation'],
    }),
  };
})();

const fiscalPolicyOnAdAs = (() => {
  const sid = subId('fiscal-policy-on-ad-as');
  return {
    id: sid,
    title: 'Fiscal Policy on AD/AS',
    keyIdea: 'A fiscal expansion shifts AD right and the economy moves up the short-run supply curve, so part of the change arrives as output and part as a higher price level.',
    body: [
      { type: 'paragraph', text: `Put the instruments of sub-topic 4b onto the AD/AS diagram and the argument becomes one picture. Price level on the vertical axis, real output on the horizontal, AD sloping down, short-run AS sloping up.` },
      { type: 'paragraph', text: `${E.country}'s government raises spending by ${bn(E.fiscalInjection)}. **AD shifts right by more than ${bn(E.fiscalInjection)}**, because the households and firms paid by that spending spend part of it again — the multiplier, which belongs to topic 2.3.4 and is taken as given here. At a multiplier of ${E.fiscalMultiplier}, the horizontal shift is ${bn(E.adShift)}.` },
      { type: 'paragraph', text: `Where the economy settles is decided by the supply curve the shifted AD now meets. Read it off either curve and the answer is the same: real output rises from ${bn(E.gdp)} to ${bn(E.Yfiscal)} and the price level from ${idx(E.P0)} to ${idx(E.Pfiscal)}. Only ${bn(E.Yfiscal - E.gdp)} of the ${bn(E.adShift)} shift arrived as output; the rest went into prices.` },
      { type: 'flow', resultType: 'neutral', steps: [
        { title: 'Government spending rises', subtitle: `${bn(E.fiscalInjection)} of new demand for output` },
        { title: 'AD shifts right', subtitle: `by ${bn(E.adShift)}, because the spending is respent` },
        { title: 'The economy moves up short-run AS', subtitle: 'firms raise both output and prices as demand rises' },
        { title: 'Output and the price level both rise', subtitle: `${bn(E.Yfiscal)} and ${idx(E.Pfiscal)}` },
      ] },
    ],
    realExample: { emoji: '📐', text: `The steeper the supply curve where the new demand lands, the more of a fiscal expansion becomes prices rather than output. The same measure gives mostly inflation near capacity and mostly output in a slump.` },
    misconception: `Students draw AD shifting right and read the increase in output as the full size of the shift. That happens only where the supply curve is flat. On an upward-sloping short-run AS the shift splits between output and the price level, and reading the horizontal distance as the output gain is the commonest error here.`,
    examMatters: `Appendix 6 allows a diagram anywhere it is appropriate, and on this topic an Analyse that shifts the wrong curve loses the chain rather than a label: a fiscal change moves AD, while chapters 5 and 6 move AS.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'A central bank cuts its policy interest rate. Put the effects in the order they actually occur, from the decision to the final position:',
      correctOrder: [
        'Borrowing becomes cheaper and saving less rewarding',
        'Households and firms bring forward purchases and investment projects',
        'Total planned spending on the economy\'s output rises',
        'Firms meet the extra demand by raising both output and prices',
      ],
      criterion: 'each step is caused by the one before it, from the rate decision through to where the economy settles',
      why: [
        'The rate is the price of borrowing and the reward for saving, so changing it changes both at once and before anything else has happened.',
        'A cheaper loan makes a project worth doing that was not worth doing yesterday, so the decisions respond before any spending appears.',
        'Those decisions are spending, and total planned spending on output is what the AD curve records.',
        'Where the new AD meets an upward-sloping supply curve, firms supply more only at a higher price — which is why both move together.',
      ],
    }),
  };
})();

/* ══ Block 3 — Monetary Policy Instruments (2.3.6 · 4c) ══════════════════ */

/*
 * FOUR INSTRUMENTS, AND THE LIVE SECTION TEACHES TWO. `4c-3` (changes in lending criteria) and
 * `4c-4` (reserve asset requirements) are untaught anywhere in the live bundle. No audit item says
 * so; `structure-04` complains about the OPPOSITE — that interest rates and the transmission
 * channels are taught twice. The two observations are the same fact from two sides.
 */

const interestRates = (() => {
  const sid = subId('interest-rates');
  return {
    id: sid,
    title: 'Interest Rates',
    keyIdea: 'The policy rate is the central bank\'s main instrument. It works on aggregate demand through borrowing, saving, wealth and the exchange rate, and it works slowly.',
    body: [
      { type: 'paragraph', text: `The first of the four monetary instruments is **interest rates**. The central bank sets one rate — its policy rate, ${pct(E.policyRate)} in ${E.country} — and commercial banks price their own lending and saving off it.` },
      { type: 'paragraph', text: `A change in that rate reaches aggregate demand along four routes at once. **Borrowing**: loans cost more or less, so house purchases and investment projects are brought forward or shelved. **Saving**: a higher rate rewards postponing consumption. **Wealth**: higher rates lower asset prices, and households that feel poorer spend less. **The exchange rate**: a higher rate attracts foreign funds, the currency appreciates, and exports become dearer abroad.` },
      { type: 'paragraph', text: `All four push the same way, which is why the instrument is powerful. The fourth route is also why a rate change moves the current account as well as inflation — a connection chapter 7 returns to.` },
      { type: 'paragraph', text: `The instrument's weakness is time. A rate change passes through to spending over months and to inflation over **up to about two years**, so a central bank is always setting a rate for an economy it cannot yet see. That lag is the same figure wherever it appears in this section.` },
    ],
    realExample: { emoji: '🇸🇬', text: `Singapore is the clear exception: its central bank conducts monetary policy through the exchange rate rather than an interest rate, because for an economy where trade is several times GDP the currency is the channel that matters most.` },
    misconception: `Students describe one channel — usually borrowing — and treat it as the whole mechanism. A rate change moves borrowing, saving, asset prices and the exchange rate simultaneously, and in a very open economy the exchange rate route can be the largest of the four. Naming one route is one link of a chain that has four.`,
    examMatters: `Appendix 6 defines Analyse as depth rather than breadth, so an Analyse on interest rates is better answered by following one channel all the way to output than by naming all four and developing none.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'A central bank raises its policy rate. Sort each consequence by which of the four channels it travels along:',
      groups: [
        { name: 'Borrowing and saving', items: ['A firm shelves a warehouse it was going to build with a loan', 'A household moves money into a deposit account instead of replacing its car'], why: 'Both respond to the rate as the price of borrowing or the reward for waiting — the household and the firm are answering the same question about timing.' },
        { name: 'Wealth', items: ['Bond and share prices fall, and households holding them cut back'], why: 'Higher rates make future income streams worth less today, so asset prices fall and the owners feel poorer without their income having changed.' },
        { name: 'The exchange rate', items: ['An overseas fund moves money into the country to earn the higher return, bidding the currency up', 'Exporters find their goods more expensive in foreign markets'], why: 'A higher return attracts capital, which raises the currency, which changes the foreign price of exports and the domestic price of imports.' },
      ],
    }),
  };
})();

const quantitativeEasing = (() => {
  const sid = subId('quantitative-easing');
  return {
    id: sid,
    title: 'Asset Purchases (Quantitative Easing)',
    keyIdea: 'Quantitative easing is the central bank buying assets from banks with newly created reserves, used when the policy rate is already near zero and cannot be cut further.',
    body: [
      { type: 'paragraph', text: `The second instrument is **asset purchases to increase money supply**, the specification's own wording for what is usually called **quantitative easing**. The central bank creates reserves and uses them to buy assets — normally government bonds — from commercial banks and other financial institutions.` },
      { type: 'paragraph', text: `It exists because the first instrument runs out. An interest rate cannot usefully be cut far below zero: savers can hold cash instead. A central bank that has cut to near zero and still needs to raise demand has no rate left to cut, and asset purchases are what it reaches for instead.` },
      { type: 'paragraph', text: `The mechanism is not the rate but the price of the assets. Heavy buying pushes bond prices up, which pushes the long-term rates built into them DOWN — and long rates are what mortgages and corporate borrowing are priced off. Sellers also end up holding money rather than bonds.` },
      { type: 'paragraph', text: `The costs are real. Asset prices rise, which enriches those who own assets and nobody else, so the measure works partly by widening the gap the sixth objective wants narrowed. And nothing guarantees banks lend the reserves on.` },
    ],
    realExample: { emoji: '💴', text: `Japan has run asset purchases on a very large scale since the early 2000s, having reached near-zero rates before any other major economy — the longest experiment with the instrument, and the one cited on both sides of the argument.` },
    misconception: `Students describe quantitative easing as the central bank printing money and handing it to the government. It is an exchange, not a gift: the bank buys an asset that already exists and the seller receives money for it, so the seller's wealth is unchanged at the moment of sale. What changes is the FORM it is held in, and the asset's price.`,
    examMatters: `An Examine carries 8 marks and Appendix 6 asks for a brief assessment, so an answer here needs the case that purchases support demand AND the case that they inflate asset prices, weighed rather than listed.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A bond pays $5 a year for ever. It costs $100 today, so it yields 5%. Complete the reasoning:',
      template: [
        'If a central bank buys on a scale that lifts the price to $125, the yield becomes ___%.',
        `So the rate built into the bond has moved ___ while its price moved up.`,
        'That is the route by which an asset purchase reaches ___ and spending, without any change in the policy rate.',
      ],
      answers: ['4', 'down', 'borrowing'],
      hints: [
        'the annual payment divided by the new price, as a percentage',
        'the direction a yield takes when the price carrying it rises',
        'what firms and households do more of when long-term rates are lower',
      ],
      distractors: ['5', 'up', 'saving'],
    }),
  };
})();

const lendingCriteria = (() => {
  const sid = subId('lending-criteria');
  return {
    id: sid,
    title: 'Changes in Lending Criteria',
    keyIdea: 'Changing the rules on who may borrow and how much controls the quantity of credit directly, without changing its price, and can be aimed at one market at a time.',
    body: [
      { type: 'paragraph', text: `The third instrument is **changes in lending criteria** — the rules governing who banks may lend to, and how much. Where an interest rate changes the PRICE of credit, lending criteria change its AVAILABILITY.` },
      { type: 'paragraph', text: `The rules are things like the maximum a household may borrow as a multiple of its income, the minimum deposit required on a property, and the checks a bank must run before approving a loan. Tightening any of them removes borrowers from the market at whatever the interest rate happens to be.` },
      { type: 'paragraph', text: `The instrument's advantage is that it can be **aimed**. A rate rise cools every market at once — mortgages, business investment, the currency. Lending rules can be tightened for property while leaving lending to firms alone, which matters when house prices are rising fast and business investment is weak at the same time.` },
      { type: 'paragraph', text: `Its weakness is that borrowing tends to find a way round it. Restricting one kind of lender pushes demand toward another that the rules do not cover, and a criterion set for an average borrower is blunt for an unusual one.` },
    ],
    realExample: { emoji: '🏘️', text: `Hong Kong, Singapore and Korea have all used loan-to-value caps on mortgages — limiting the share of a property's price that may be borrowed — to slow property markets while leaving interest rates set for the economy as a whole. Aiming at one market is the whole point of the instrument.` },
    misconception: `Students treat lending criteria as banking regulation rather than monetary policy, and leave them out of a demand-side answer. They are one of the four instruments the specification names, and they move aggregate demand the same way any credit measure does: by changing how much borrowing actually happens.`,
    examMatters: `A question asking why a central bank might use lending criteria rather than the interest rate is asking for the aiming argument, and Appendix 6 rewards the comparison rather than a description of each in turn.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Property prices are rising fast while business investment is weak. Match each instrument to what it would do to these two markets:',
      pairs: [
        { left: 'Raise the policy interest rate', right: 'Slows the property market and weak business investment alike', why: 'The rate is one price for all borrowing, so it cannot cool one market without cooling the other — which is the problem in this situation.' },
        { left: 'Raise the minimum deposit required on a mortgage', right: 'Slows property borrowing and leaves business borrowing untouched', why: 'The rule applies to one kind of loan only, so it removes buyers from that market at an unchanged interest rate everywhere else.' },
        { left: 'Buy government bonds from banks', right: 'Lowers long-term rates, so both markets are encouraged', why: 'Asset purchases work through the general level of long rates, which is the opposite of aiming — it pushes both markets the same way, and upward.' },
      ],
    }),
  };
})();

const reserveAssetRequirements = (() => {
  const sid = subId('reserve-asset-requirements');
  return {
    id: sid,
    title: 'Reserve Asset (Liquidity) Requirements',
    keyIdea: 'A reserve requirement is the fraction of deposits a bank must hold rather than lend. Raising it removes lending capacity directly and makes the banking system safer.',
    body: [
      { type: 'paragraph', text: `The fourth instrument is **reserve asset (liquidity) requirements**: the rule that a bank must hold a given fraction of its deposits as reserves or other assets it can turn into cash quickly, rather than lending them out.` },
      { type: 'paragraph', text: `The arithmetic is direct. A bank holding ${bn(100)} of deposits under a 10% requirement may lend ${bn(90)}. Raise the requirement to 15% and it may lend ${bn(85)} — ${bn(5)} of lending removed by a rule, with no interest rate touched. Lower it and lending capacity is released the same way.` },
      { type: 'paragraph', text: `The instrument does two jobs at once, which is why it is worth separating from the other three. It moves aggregate demand by moving the quantity of credit. It also makes the banking system **safer**, because a bank holding more liquid assets can meet more withdrawals before it has to ask anyone for help.` },
      { type: 'paragraph', text: `That second job is why it is used sparingly for demand management: changing it often would keep changing how safe banks are, so most central banks set it for stability and move rates instead.` },
    ],
    realExample: { emoji: '🏦', text: `China's central bank has moved its reserve requirement ratio far more often than most, using it as a routine lever on the quantity of credit. Many other central banks have left the same ratio unchanged for years and moved interest rates instead — the same instrument, a very different role.` },
    misconception: `Students think a reserve requirement means the money is gone. The reserves still belong to the bank and still count as its assets; the rule says only that they must be held in a form that can be paid out rather than lent for five years. It restricts what the money may be used for, not whether the bank has it.`,
    examMatters: `A question that lists monetary instruments expects all four the specification names — interest rates, asset purchases, lending criteria and reserve requirements — and Appendix 6 gives no extra credit for developing one of them twice.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A bank holds $200bn of deposits. The central bank raises the reserve requirement from 10% to 15%. Complete the calculation:',
      template: [
        'Before the change the bank could lend $___bn.',
        'After the change it can lend $___bn.',
        `So the rule has removed $___bn of lending capacity without changing the interest ___.`,
      ],
      answers: ['180', '170', '10', 'rate'],
      hints: [
        'deposits less the fraction that must be held back',
        'the same subtraction at the higher fraction',
        'the difference between the two lending figures',
        'the price of borrowing, which this instrument leaves alone',
      ],
      distractors: ['200', '30', '20'],
    }),
  };
})();

/* ══ Block 4 — The Central Bank, and What Policy Can Do (2.3.6 · 4d, 4e) ══ */

/*
 * `specGap-03` IS RIGHT AND IS LARGER THAN IT SAYS. It reports that the central bank's role is
 * "only implicit", with the practice[3] guidance mentioning independence while the notes do not.
 * `4d` is a REQUIREMENT with four sub-bullets — implementation, the inflation target, banker to the
 * government, lender of last resort — and all four are uncovered in the live bundle. That is four
 * of the section's 34 leaves in one finding.
 *
 * `4e` — "Strengths and weaknesses of different demand-side policies" — is `specGap-05`, and it is
 * one oracle row carrying two subsections here, because the strengths of fiscal policy and the
 * strengths of monetary policy are different arguments and an answer that runs them together is
 * the failure the leaf exists to prevent.
 */

const implementingMonetaryPolicy = (() => {
  const sid = subId('implementing-monetary-policy');
  return {
    id: sid,
    title: 'The Central Bank and the Inflation Target',
    keyIdea: 'The government sets the target and the central bank is left to hit it. Separating the two makes the commitment to low inflation credible in a way a promise is not.',
    body: [
      { type: 'paragraph', text: `Sub-topic 4d is **the role of central banks in the conduct of monetary policy**, and its first two bullets go together: **implementation of monetary policy** and **achieving an inflation target**.` },
      { type: 'paragraph', text: `The usual arrangement separates two jobs that used to be one. The government sets the objective — in ${E.country}, inflation of ${pct(E.inflationTarget)} with a band of ${pct(E.inflationBand)} either side — and then does not decide how to hit it. The central bank chooses the instruments from chapter 3 and answers for the result, normally by explaining itself publicly when inflation lands outside the band.` },
      { type: 'paragraph', text: `The reason is **credibility**, and it is an economic argument rather than an administrative one. A government controlling rates has a standing temptation to cut them before an election, and everybody knows it — so firms and workers build higher inflation into prices and wages in advance, which raises inflation before any rate has moved. A government that has given the decision away cannot yield, so the expectation never forms.` },
      { type: 'paragraph', text: `Inflation in ${E.country} is ${pct(E.inflation)}, at the top of the band. Because a rate change takes up to about two years to work through fully, the central bank is deciding today against a forecast, not against that figure.` },
    ],
    realExample: { emoji: '🇮🇳', text: `India adopted a formal inflation-targeting framework in 2016: the target set by the government, the rate decision taken by a committee at the central bank. That split is the standard modern design.` },
    misconception: `Students read central bank independence as the bank setting its own objective. The target is normally given to it by the government, and what the bank is independent in is the CHOICE OF INSTRUMENT. Independence over goals would put an unelected body in charge of a political decision.`,
    examMatters: `A question about who is responsible for inflation is testing the split, and Appendix 6 asks Explain to give a reason with a two-stage chain: name the separation, then why credibility follows from it.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each decision by whether it belongs to the government or to an independent central bank under the usual arrangement:',
      groups: [
        { name: 'The government decides', items: ['That the inflation target shall be 2%', 'How wide the tolerance band around the target is', 'That income tax rates will rise next year'], why: 'Each of these is a choice about what the economy should aim at or what the state collects, and those are political choices that belong with elected decision-makers.' },
        { name: 'The central bank decides', items: ['Whether to raise the policy rate this month', 'Whether to buy bonds rather than move the rate', 'How much a mortgage borrower may be lent relative to income'], why: 'Each is a choice of instrument aimed at a target somebody else set — which is exactly what the bank is independent in.' },
      ],
    }),
  };
})();

const bankerToGovernmentAndBanks = (() => {
  const sid = subId('banker-to-government-and-banks');
  return {
    id: sid,
    title: 'Banker to the Government, Banker to the Banks',
    keyIdea: 'The central bank holds the state\'s account and manages its borrowing, and stands behind the commercial banks as the lender of last resort when they cannot fund themselves.',
    body: [
      { type: 'paragraph', text: `The other two bullets of sub-topic 4d are the roles that have nothing to do with the inflation target and everything to do with keeping the system running.` },
      { type: 'paragraph', text: `**As banker to the government**, the central bank holds the state's account, makes its payments and manages the issue of government bonds. ${E.country}'s ${bn(Math.abs(E.budgetBalance))} deficit has to be borrowed, and that borrowing is arranged through the central bank.` },
      { type: 'paragraph', text: `**As banker to the banks — lender of last resort**, it holds the commercial banks' reserves and lends to a solvent bank that cannot borrow anywhere else. A bank's problem is rarely that it is worthless; it is that its assets are long and its deposits are short, so a rush of withdrawals can sink a bank whose loans are perfectly good.` },
      { type: 'paragraph', text: `A lender of last resort is what stops the rush starting. If depositors know the bank can always meet them, they have no reason to queue, so the promise works mostly by never being needed. The cost is that a bank sure of rescue may take risks it otherwise would not — which is why chapter 3's reserve requirements exist beside it.` },
    ],
    realExample: { emoji: '🏛️', text: `Every central bank holds this role whether or not it targets inflation. Hong Kong's monetary authority manages a currency board rather than an inflation target, and still acts as banker to the government and as the backstop for the banking system.` },
    misconception: `Students think the lender of last resort rescues any bank in trouble. It lends to a bank that is SOLVENT but short of cash — assets worth more than debts, but not saleable quickly. A bank that is genuinely bust is a different problem, and blurring the two is what makes the risk-taking objection bite.`,
    examMatters: `Appendix 6 defines Define at 2 marks, and "lender of last resort" needs both halves: that it lends to banks, and that it does so when no one else will. One half is one mark.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'A commercial bank faces a sudden rush of withdrawals. Match each fact about its position to what it implies for the central bank\'s response:',
      pairs: [
        { left: 'Its loans are sound but will not be repaid for years', right: 'It is solvent but illiquid, so lending to it is the textbook case', why: 'The assets are worth more than the debts; the only problem is timing, which is exactly what a short-term loan fixes.' },
        { left: 'Its loans are worth less than the deposits it owes', right: 'It is insolvent, and a loan would postpone the problem rather than solve it', why: 'Lending to a bank whose assets cannot cover its debts leaves the shortfall in place and puts the lender\'s money behind it.' },
        { left: 'Depositors know the central bank stands behind it', right: 'The rush is less likely to start at all', why: 'The reason to queue is fear of being last; removing that fear removes the incentive, so the promise works without being used.' },
      ],
      distractors: ['The inflation target must be raised'],
    }),
  };
})();

const fiscalStrengthsWeaknesses = (() => {
  const sid = subId('fiscal-strengths-weaknesses');
  return {
    id: sid,
    title: 'Strengths and Weaknesses of Fiscal Policy',
    keyIdea: 'Fiscal policy is powerful and can be aimed at a region or a group, but it is slow to legislate, hard to reverse, and paid for out of a budget that has its own objective.',
    body: [
      { type: 'paragraph', text: `Sub-topic 4e asks for **strengths and weaknesses of different demand-side policies**, and the honest answer is different for each. Take fiscal policy first.` },
      { type: 'paragraph', text: `**Its strengths.** Government spending enters aggregate demand directly rather than waiting on somebody's decision, so it works even when confidence is low and a rate cut would be ignored. It can be **aimed**: at a depressed region, at low-income households, at construction. And spending on infrastructure or training raises capacity as well as demand, which no interest rate does.` },
      { type: 'paragraph', text: `**Its weaknesses.** It is slow: a tax change needs a budget and a vote, and a road takes years, so the demand can arrive after the downturn it was meant to cure. It is hard to reverse, because a programme begun has a constituency. It worsens the budget balance. And heavy government borrowing can raise the cost of borrowing for firms, displacing some of the private spending it meant to replace — **crowding out**.` },
      { type: 'paragraph', text: `Which dominates is a matter of circumstance, not principle. A fiscal expansion in a deep slump with spare capacity looks very different from the same measure at capacity.` },
    ],
    realExample: { emoji: '🚧', text: `Infrastructure is the clearest case of the timing problem: projects announced against a downturn have often still been in planning when the recovery arrived. The effect landed in a different year from the problem.` },
    misconception: `Students treat crowding out as automatic. It depends on whether the economy has idle resources: where savings are ample and firms are not trying to borrow, government borrowing need not raise the cost of funds at all. The argument is strongest near capacity and weakest in a slump.`,
    examMatters: `Appendix 6 gives Examine 8 marks for a chain of reasoning plus a brief assessment of the arguments, so an answer that lists three strengths and three weaknesses and stops has met neither requirement.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'A government is considering a large road-building programme as a response to a recession. Sort each consideration by whether it argues for the measure or against it:',
      groups: [
        { name: 'For', items: ['Workers can be hired on the programme while firms are still too wary to invest', 'The programme can be concentrated in the regions with the highest unemployment', 'A finished road raises what the economy can produce in future'], why: 'Each is something this instrument can do that a change in the interest rate cannot: act directly, aim, and add capacity.' },
        { name: 'Against', items: ['The first section of road will not be started for eighteen months', 'The borrowing widens a deficit that is already 4% of GDP', 'Once begun the programme will be difficult to stop'], why: 'Each is a cost of using this instrument rather than another: it is slow, it moves the budget away from its own objective, and it is hard to reverse.' },
      ],
    }),
  };
})();

const monetaryStrengthsWeaknesses = (() => {
  const sid = subId('monetary-strengths-weaknesses');
  return {
    id: sid,
    title: 'Strengths and Weaknesses of Monetary Policy',
    keyIdea: 'Monetary policy is fast to decide and easily reversed, but it cannot be aimed, it acts with a long lag, and near zero rates it runs out of room.',
    body: [
      { type: 'paragraph', text: `The other half of sub-topic 4e. Monetary policy's strengths and weaknesses are close to the mirror image of fiscal policy's, which is why the two are usually judged together.` },
      { type: 'paragraph', text: `**Its strengths.** The decision is quick: a committee meets and the rate changes, with no vote and no budget. It is **reversible** — a rate raised this quarter can be cut next quarter with no programme to unwind. And because it is taken by an independent body against a published target, it carries the credibility that chapter 4 opened with.` },
      { type: 'paragraph', text: `**Its weaknesses.** It cannot be aimed: one rate reaches every borrower and saver, so a rate set for an overheating property market also lands on a struggling exporter. It works with a lag of **up to about two years**, so the bank acts on a forecast. And it has a floor near zero, which is why chapter 3's second instrument exists.` },
      { type: 'paragraph', text: `There is a deeper limit. A rate cut lowers the cost of borrowing but cannot make anybody borrow. In a bad enough downturn, firms expecting no customers will not invest at any rate — the one case where the slower fiscal instrument is clearly better.` },
    ],
    realExample: { emoji: '⏳', text: `Japan illustrates both limits at once: rates at effectively zero for two decades, and a long stretch in which cheap credit did not produce the borrowing expected of it.` },
    misconception: `Students write that cutting interest rates increases investment, full stop. A rate cut makes borrowing cheaper; whether investment rises depends on whether firms expect demand for what the investment would produce. Cheap credit and no customers produces no investment, and treating the link as automatic is what makes the liquidity-trap argument invisible.`,
    examMatters: `A Discuss carries 14 marks and Appendix 6 asks for recognition of different viewpoints, so an answer comparing the two demand-side policies must reach a position on WHEN each is better rather than declaring one superior.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'An economy is in a deep recession with the policy rate already at 0.25%. Put the reasoning in the order it runs, from the attempted cut to the conclusion:',
      correctOrder: [
        'A cut takes the policy rate to 0.1%, close to its floor',
        'Borrowing is now barely cheaper than it was, and cannot be made much cheaper',
        'Firms expecting no customers decline to invest at any rate on offer',
        'Government spending rises instead, entering demand without needing a borrower',
      ],
      criterion: 'each step follows from the one before it, from the rate decision to the choice of a different instrument',
      why: [
        'This is the instrument being used first, and using up almost all the room it had left.',
        'A cut of a fraction of a point changes very little, and the floor means there is no larger cut available.',
        'The rate is the price of borrowing, not a reason to borrow — and expected demand is what decides whether a project is worth doing.',
        'Government spending is demand in itself, so it does not depend on persuading anyone to take a loan, which is precisely the failure above it.',
      ],
    }),
  };
})();

/* ══ Block 5 — Supply-Side Policies: The Free-Market Route (3a, 3b) ══════ */

/*
 * `specGap-07` IS RIGHT: `3a` names productivity, competition AND incentives, and the live section
 * names competition and incentives as one-word list items with no mechanism attached. They get a
 * subsection of their own here — which also gives this chapter four subsections against chapter
 * 1's six, keeping the ratio inside packet 31's rule.
 *
 * `3b` HAS FIVE BULLETS AND THE LIVE SECTION TEACHES FOUR. `cutting the costs of bureaucracy for
 * firms` (`:1159`) is absent.
 */

const supplySideAims = (() => {
  const sid = subId('supply-side-aims');
  return {
    id: sid,
    title: 'What Supply-Side Policies Aim At',
    keyIdea: 'Supply-side policies raise what an economy can produce rather than what it is currently spending, so they move the long-run supply curve instead of aggregate demand.',
    body: [
      { type: 'paragraph', text: `Sub-topic 3 opens with **supply-side policies designed to increase productivity, competition and incentives**. Everything in chapters 5 and 6 is one of those three targets, and all three work on the same thing: the economy's **capacity**.` },
      { type: 'paragraph', text: `That is the whole difference from chapters 2 to 4. A demand-side policy moves spending on output an economy can already produce; a supply-side policy changes how much it can produce at all — the **long-run supply curve** moving right rather than AD.` },
      { type: 'paragraph', text: `**Productivity** — output per worker per hour — is the first target and the largest. Workers who each produce more raise total output without anybody working longer, which is the only way output and living standards rise together indefinitely.` },
      { type: 'paragraph', text: `Watch a rightward shift of long-run supply in ${E.country}: real output rises from ${bn(E.gdp)} to ${bn(E.Ysupply)} and the price level FALLS from ${idx(E.P0)} to ${idx(E.Psupply)}. **Output and the price level move in opposite directions** — the reverse of a demand-side expansion, and why this is the one route to growth that does not cost inflation.` },
      { type: 'flow', resultType: 'good', steps: [
        { title: 'Capacity rises', subtitle: 'the same workers and firms can produce more' },
        { title: 'Long-run supply shifts right', subtitle: `by ${bn(E.lrasShift)} of extra output` },
        { title: 'Output rises and prices fall', subtitle: `${bn(E.Ysupply)} at a price level of ${idx(E.Psupply)}` },
      ] },
    ],
    realExample: { emoji: '🏭', text: `Korea's transformation over four decades came from rising productivity rather than demand management: more output per hour, through education, capital and technology.` },
    misconception: `Students call any policy a government likes supply-side. The test is which curve moves: a measure changing spending on existing capacity is demand-side; one changing the capacity is supply-side. A tax cut can be either, depending on whether it is aimed at what households spend or at what workers are willing to produce.`,
    examMatters: `Appendix 6 rewards a diagram where appropriate, and the commonest error on a supply-side question is drawing AD shifting right — which gives a higher price level and contradicts the answer being written above it.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A DIFFERENT economy sits at a price level of 100 with output of $600bn, and a policy raises its productive capacity by $24bn. Spending plans do not change. Complete the analysis:',
      template: [
        'Real output becomes $___bn.',
        'Buyers have to be persuaded to take output they were not planning to buy, so the price level must ___.',
        'The two have therefore moved in ___ directions, which no demand-side measure can produce.',
      ],
      answers: ['624', 'fall', 'opposite'],
      hints: [
        'the starting output plus the extra capacity',
        'what has to happen to price before unchanged spending plans will absorb more goods',
        'the word for output up and prices down at the same time',
      ],
      distractors: ['576', 'rise', 'the same'],
    }),
  };
})();

const competitionAndIncentives = (() => {
  const sid = subId('competition-and-incentives');
  return {
    id: sid,
    title: 'Competition and Incentives',
    keyIdea: 'Competition forces firms to cut costs and innovate to survive; incentives change whether working, training and investing are worth doing. Both raise capacity without spending.',
    body: [
      { type: 'paragraph', text: `Productivity is the target everyone names. The other two in sub-topic 3a — **competition** and **incentives** — are the ones the live section reduced to single words in a list, and each has a mechanism worth having.` },
      { type: 'paragraph', text: `**Competition** raises capacity by changing what happens to a firm that does not improve. A firm with no rivals can pass its costs on and survive; a firm facing five cannot, so it cuts costs, improves quality or loses customers. The levers are laws against price-fixing and abuse of a dominant position, and above all **lowering the barriers that keep new firms out** — licensing, minimum capital rules, exclusive rights.` },
      { type: 'paragraph', text: `**Incentives** raise capacity by changing whether an activity is worth doing. A worker facing a high marginal tax rate keeps little of the next dollar, so extra hours or retraining pay less. A firm keeping more of its profit has more reason to invest. The lever is the RATE at the margin, not the total collected.` },
      { type: 'paragraph', text: `Both share an attraction and a difficulty. Neither needs the government to spend, so neither worsens the budget balance. But both work slowly and through decisions the government does not make — a market opened to entrants produces nothing until somebody enters.` },
    ],
    realExample: { emoji: '✈️', text: `Opening aviation between Gulf and South-East Asian economies to more carriers cut fares faster than any subsidy would have: the incumbents had to respond because passengers could go elsewhere.` },
    misconception: `Students treat any tax cut as an incentive policy. What changes an incentive is the MARGINAL rate — what is kept out of the next dollar earned. A cut that raises the tax-free allowance puts money in pockets without touching the marginal rate, so it acts on demand, not on willingness to work.`,
    examMatters: `Appendix 6 defines Analyse as depth over breadth, so an Analyse here wants one mechanism followed all the way — lower barriers, more entrants, cost pressure, higher output — rather than three named in a line each.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each measure to the target of sub-topic 3a it works on, and to the mechanism that makes it work:',
      pairs: [
        { left: 'Removing a licence requirement that limits new taxi firms', right: 'Competition — incumbents can no longer pass costs on and survive', why: 'The barrier was what protected the existing firms from rivals, so removing it changes what happens to a firm that does not improve.' },
        { left: 'Cutting the tax rate paid on the highest slice of income', right: 'Incentives — the return on an extra hour worked rises', why: 'It is the rate at the margin that decides whether extra work or retraining is worth it, and this measure is exactly that rate.' },
        { left: 'Subsidising apprenticeships in engineering', right: 'Productivity — the same worker produces more per hour', why: 'Training changes what a worker can do, so output per hour rises whether or not competition or incentives change at all.' },
      ],
      distractors: ['Aggregate demand — total spending rises immediately'],
    }),
  };
})();

const deregulationAndPrivatisation = (() => {
  const sid = subId('deregulation-and-privatisation');
  return {
    id: sid,
    title: 'Deregulation and Privatisation',
    keyIdea: 'Deregulation removes rules that restrict how firms and workers may operate; privatisation moves an enterprise from state to private ownership. Both rely on competition to deliver.',
    body: [
      { type: 'paragraph', text: `Sub-topic 3b lists five **free market policies**, and the first two are the largest. Both rest on the same belief: that firms exposed to competition and free of restriction will find efficiencies a planner cannot.` },
      { type: 'paragraph', text: `**Deregulation of product and labour markets** means removing rules that restrict entry, pricing, or the terms on which people may be employed — licensing and exclusive rights in product markets, rules on hiring, dismissal and hours in labour markets. The argument is that a firm able to adjust its workforce hires more readily in the first place.` },
      { type: 'paragraph', text: `**Privatisation** is the transfer of an enterprise from state to private ownership. The argument is about who bears the consequences: a private owner whose costs exceed revenue loses money, while a state enterprise's losses are met from tax revenue — so the pressure to control costs is sharper under private ownership.` },
      { type: 'paragraph', text: `Both arguments share a weak point. **Each depends on competition following.** A state monopoly sold as a private monopoly has changed who receives the profit, not what the firm must do to earn it; a labour market deregulated with no other jobs to move to has removed protection without creating opportunity.` },
    ],
    realExample: { emoji: '📮', text: `Japan Post was moved into private ownership in stages from the mid-2000s. Whether such a transfer changes performance has generally turned on how much competition the new owner then faced.` },
    misconception: `Students write that privatisation increases efficiency because private firms are more efficient than state ones. The argument is not about ownership by itself but about the consequences of failing: a private owner facing rivals bears the loss. Sell a monopoly to a private owner and the pressure is absent, which is why the record is mixed rather than uniform.`,
    examMatters: `Appendix 6 requires an Evaluate at 20 marks to reach a judgement, so the conditions under which privatisation works have to be named rather than the arguments listed on both sides.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'A state-owned rail operator is sold. Sort each outcome by whether it follows from the change of ownership alone or needs competition as well:',
      groups: [
        { name: 'Follows from ownership alone', items: ['Losses now fall on shareholders rather than on tax revenue', 'The government receives a one-off sum from the sale'], why: 'Both are consequences of who owns the enterprise and who bears its results, and neither requires another operator to exist.' },
        { name: 'Needs competition as well', items: ['Fares fall for passengers', 'The operator invests to improve reliability', 'Costs per journey are driven down year after year'], why: 'Each of these is something a firm does because customers could go elsewhere. A private monopoly faces the same captive passengers the state one did.' },
      ],
    }),
  };
})();

const taxWelfareBureaucracy = (() => {
  const sid = subId('tax-welfare-bureaucracy');
  return {
    id: sid,
    title: 'Taxes, Welfare Payments and the Cost of Bureaucracy',
    keyIdea: 'The remaining free-market policies all work on incentives: what a worker keeps from the next hour, what is lost by taking a job, and what compliance costs a firm before it trades.',
    body: [
      { type: 'paragraph', text: `The last three of sub-topic 3b's five policies are all incentive measures, and all three are about what somebody keeps rather than what anybody spends.` },
      { type: 'paragraph', text: `**Reduction in taxation** as a supply-side measure means cutting MARGINAL rates — on income, so an extra hour is worth more; on profits, so a firm keeps more of the return on an investment. The same tax cut can be demand-side or supply-side, depending on where in the schedule it falls.` },
      { type: 'paragraph', text: `**Changing the levels of welfare payments** works on the gap between income out of work and income in it. Where a benefit is withdrawn steeply as earnings rise, a worker keeps very little of the wage and the incentive is weak. The lever is normally the RATE of withdrawal, not the level of the payment.` },
      { type: 'paragraph', text: `**Cutting the costs of bureaucracy for firms** is the time and money spent on registration, permits and compliance before any output is produced. A firm needing eight permits to open faces a cost no customer pays for, and small and new firms bear it hardest because it does not shrink with size.` },
    ],
    realExample: { emoji: '📝', text: `Several South and South-East Asian economies have cut business registration from months to under a week by replacing offices with online filing — a measure costing almost nothing that removes a fixed cost falling hardest on the smallest firms.` },
    misconception: `Students argue that cutting welfare must raise employment because work becomes more attractive. It raises the incentive to take a job and does nothing about whether a job exists. Where vacancies are short, the measure reduces the income of people who cannot find work — so the employment effect depends on which constraint binds.`,
    examMatters: `Appendix 6 gives Examine 8 marks for a brief assessment, so a welfare-reform answer weighs the incentive gain against the effect on the poorest rather than choosing one.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'A worker receiving $200 a week in benefits takes a job paying $200 a week. Benefits are withdrawn at 80 cents per dollar earned. Complete the analysis:',
      template: [
        'Benefits withdrawn come to $___ of the $200.',
        'So total income in work is $___ a week — the wage plus what is left of the benefit — against $200 out of work.',
        'A full week of work has raised income by $___, which is why the ___ of withdrawal is the lever rather than the level of the payment.',
      ],
      answers: ['160', '240', '40', 'rate'],
      hints: [
        'the wage multiplied by the fraction taken away',
        'the wage plus whatever benefit is still being paid',
        'the difference between income in work and income out of it',
        'the word for how steeply the payment is taken away as earnings rise',
      ],
      distractors: ['200', '400', '100'],
    }),
  };
})();

/* ══ Block 6 — Supply-Side Policies: The Interventionist Route (3c, 3d) ══ */

const educationTrainingSkills = (() => {
  const sid = subId('education-training-skills');
  return {
    id: sid,
    title: 'Investment in Education, Training and Skills',
    keyIdea: 'Raising what workers can do raises output per hour permanently, which makes it the strongest supply-side measure and the slowest to arrive.',
    body: [
      { type: 'paragraph', text: `Sub-topic 3c lists five **interventionist policies** — measures where the state acts directly rather than removing a restriction — and the first is **investment in education, training and skills**.` },
      { type: 'paragraph', text: `The mechanism is the most direct in the whole of sub-topic 3. A worker who can operate a machine, read a specification or write software produces more per hour than one who cannot, and that gain does not depend on anything else happening. It raises the long-run supply curve by raising what the same number of workers can make.` },
      { type: 'paragraph', text: `It is also the measure with the longest lag by a wide margin. A change to schooling reaches the workforce as the children do, a decade or more later; vocational training is faster but still measured in years. A government wanting a result inside one term will not find it here.` },
      { type: 'paragraph', text: `There is an argument for the state doing it rather than firms. A firm that trains a worker may lose them to a rival who did not pay, so each firm trains less than the economy would want — a reason for public funding that none of chapter 5's measures needs.` },
    ],
    realExample: { emoji: '🎓', text: `Germany's dual system combines classroom study with paid work at a firm, the qualification recognised across the industry rather than at one employer; Singapore has built comparable national schemes. Both solve the problem that no firm wants to train a worker who may leave.` },
    misconception: `Students count education spending as supply-side because the government is spending. The spending itself is demand-side — a component of AD the moment it is paid. It is supply-side because of what it does to capacity years later, and a good answer separates the two timings.`,
    examMatters: `Appendix 6 defines Evaluate at 20 marks as requiring informed judgements, so a question comparing supply-side measures should weigh size of effect against the time it takes to arrive — the comparison a list of measures cannot make.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'A government announces $4bn of spending on technical colleges. Sort each effect by when it arrives:',
      groups: [
        { name: 'This year, on demand', items: ['Construction firms building the colleges hire workers', 'Government spending rises by $4bn, so aggregate demand shifts right'], why: 'The money is spent now on output produced now, which is what makes it a component of aggregate demand regardless of its purpose.' },
        { name: 'In years to come, on capacity', items: ['Output per worker per hour rises in the industries the graduates enter', 'The long-run supply curve shifts right', 'Firms can fill vacancies they previously left open'], why: 'Each of these waits for people to be trained and to reach the workforce, which is why the supply-side effect of this measure is counted in years rather than months.' },
      ],
    }),
  };
})();

const investmentIncentivesInfrastructure = (() => {
  const sid = subId('investment-incentives-infrastructure');
  return {
    id: sid,
    title: 'Investment Incentives and Infrastructure',
    keyIdea: 'Tax incentives and subsidies make private investment projects worth doing; infrastructure gives every firm capacity it could not have bought for itself.',
    body: [
      { type: 'paragraph', text: `The next two interventionist policies both raise the capital a worker has to work with, one by persuading firms to buy it and one by the state providing it.` },
      { type: 'paragraph', text: `**Incentives to encourage investment: tax incentive or subsidies.** A project earning a modest return may not be worth doing after tax; let the firm write the investment off against its tax bill, or subsidise part of it, and the same project clears the bar. More capital per worker means more output per hour. The risk is paying for investment that would have happened anyway.` },
      { type: 'paragraph', text: `**Infrastructure investment** — ports, roads, power, water, telecommunications — is the one no firm will provide for itself. A road serves every firm that uses it, so no single firm can charge for it, and each would rather another paid. Left to the market it is under-provided, which is the classic case for the state building it.` },
      { type: 'paragraph', text: `Its effect on capacity is unusually broad: a port that halves container times lowers costs for every exporter at once. That breadth is why infrastructure appears in almost every growth strategy — and why chapter 4's timing problem bites hardest here.` },
    ],
    realExample: { emoji: '🚄', text: `China's expansion of high-speed rail and port capacity over two decades lowered transport costs across the whole economy rather than in one sector. Indonesia and India have both made comparable programmes the centre of their growth strategies for the same reason.` },
    misconception: `Students treat any subsidy to a firm as an investment incentive. An incentive changes whether a project goes ahead; a payment for something already decided changes only who paid for it. The test a question is really asking is whether the investment was marginal — and a subsidy paid on everything reaches mostly projects that did not need it.`,
    examMatters: `A question asking whether infrastructure spending is a supply-side policy is testing whether both effects are understood, and Appendix 6 rewards the chain: demand now, capacity later, and the two arriving in different years.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each feature of an investment project to what it implies about whether a tax incentive is worth offering:',
      pairs: [
        { left: 'The project earns slightly less than the firm requires after tax', right: 'The incentive is well aimed — it changes the decision', why: 'A marginal project is exactly the one that can be tipped over the line, so the money buys investment that would not otherwise happen.' },
        { left: 'The firm had already approved the project last year', right: 'The incentive is a windfall — it changes who paid, not what happens', why: 'The decision was taken before the incentive existed, so nothing about capacity changes and the state has simply transferred money to the firm.' },
        { left: 'The project is a port used by every exporter in the region', right: 'A subsidy may not be enough — no single firm can capture the return', why: 'Where the benefit spreads across firms that cannot be charged, each firm will still under-invest, which is the case for the state building it directly.' },
      ],
    }),
  };
})();

const startupFinanceRegionalPolicy = (() => {
  const sid = subId('startup-finance-regional-policy');
  return {
    id: sid,
    title: 'Finance for Start-Ups and Regional Policy',
    keyIdea: 'Start-up finance fills a gap where lenders will not lend to a new firm with no record; regional policy moves capacity to where labour is idle rather than creating it.',
    body: [
      { type: 'paragraph', text: `The last two of sub-topic 3c's five interventionist policies both target a specific failure rather than the economy as a whole.` },
      { type: 'paragraph', text: `**Finance for business start-ups.** A new firm has no trading record, so a lender cannot judge it and usually will not lend, and the founder has no assets to pledge. Some viable businesses are therefore never started, and those that are belong disproportionately to founders who already had money. State-backed loans, guarantees and equity schemes fill that gap.` },
      { type: 'paragraph', text: `**Regional policy** directs investment, infrastructure or tax relief towards areas with high unemployment and low output. Its logic is that labour does not move easily: a worker may not be able to sell a house or leave a family, so bringing work to the region uses capacity that would otherwise stand idle.` },
      { type: 'paragraph', text: `Regional policy carries an objection the others do not. If it moves a firm from one region to another rather than creating a firm, the national total is unchanged and only the map has altered. What decides it is whether the resources used in the assisted region were genuinely idle — which links straight back to the low-unemployment objective.` },
    ],
    realExample: { emoji: '🌏', text: `Malaysia's regional corridors and India's state-level industrial zones both offer tax relief and infrastructure to draw firms in. The persistent question is how much investment was genuinely new and how much simply relocated.` },
    misconception: `Students treat regional policy as automatically raising national output. It raises output in the assisted region for certain; whether the nation gains depends on whether the firm would have invested elsewhere in the same economy anyway. The measure is strongest where the region's workers and premises were genuinely unused, and weakest where the economy was already at capacity.`,
    examMatters: `Appendix 6 asks Discuss for a critical assessment of the evidence, so a regional-policy answer asks what the same money would otherwise have done.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'A government offers tax relief to firms locating in a region with 14% unemployment. Put the reasoning in the order it runs, from the measure to the national effect:',
      correctOrder: [
        'Tax relief makes the assisted region cheaper than it was for a firm choosing a site',
        'A manufacturer opens a plant there rather than in the capital',
        'Workers who were unemployed in that region are hired',
        'National output rises, because the labour used was not producing anything before',
      ],
      criterion: 'each step is caused by the one before it, from the measure through to whether the nation as a whole gains',
      why: [
        'The relief changes a cost, and a cost is what a firm compares between sites — nothing has moved yet.',
        'The comparison now favours the assisted region, so the location decision changes. This is the step the policy is actually buying.',
        'A plant needs workers, and in a region at 14% unemployment they are available without being taken from another employer.',
        'This is the step that makes it a national gain rather than a transfer: the labour was idle, so what it produces is added rather than moved.',
      ],
    }),
  };
})();

const supplySideStrengthsWeaknesses = (() => {
  const sid = subId('supply-side-strengths-weaknesses');
  return {
    id: sid,
    title: 'Strengths and Weaknesses of Supply-Side Policies',
    keyIdea: 'Supply-side policies are the only route to growth without inflation, but they are slow, uncertain, and their free-market and interventionist forms fail in opposite ways.',
    body: [
      { type: 'paragraph', text: `Sub-topic 3d asks for **strengths and weaknesses of different supply-side policies**, and the word doing the work is *different*: the free-market route and the interventionist route have opposite strengths, so a general verdict is not available.` },
      { type: 'paragraph', text: `**The shared strength** is chapter 5's first subsection. Raising capacity lets output rise while the price level falls — in ${E.country}, to ${bn(E.Ysupply)} at a price level of ${idx(E.Psupply)}. No demand-side policy can do that, which is why every long-run growth strategy is supply-side.` },
      { type: 'paragraph', text: `**The shared weakness is time and uncertainty.** Education reaches the workforce in a decade; a market opened to entrants produces nothing until somebody enters. Nothing guarantees the response: an incentive may be pocketed, a deregulated market may attract no firm. Demand-side policy is less powerful and far more predictable.` },
      { type: 'paragraph', text: `**They then fail in opposite directions.** Free-market measures cost the budget little but can widen the income gap — lower marginal rates on high incomes and tighter welfare withdrawal both work on greater income equality from the wrong end. Interventionist measures do not widen it, but they must be paid for, so they push against the balanced-budget objective; and they require the state to pick correctly, which it may not.` },
    ],
    realExample: { emoji: '⚖️', text: `Two economies pursuing the same growth objective can take opposite routes — one deregulating and cutting marginal rates, the other funding training and infrastructure — and both raise capacity. What differs is who bears the cost.` },
    misconception: `Students treat supply-side policy as one approach with one set of strengths. The two routes share only their target: one shrinks the state's role and risks a wider income gap, the other expands it and risks the budget. A question naming "supply-side policies" asks you to separate them first.`,
    examMatters: `Appendix 6 requires Evaluate to reach an informed judgement, so an answer that says supply-side policies are better in the long run without saying WHICH and under what conditions has not yet reached the command word.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each objection by whether it applies to free-market supply-side policies, to interventionist ones, or to both:',
      groups: [
        { name: 'Free-market measures', items: ['Cutting the top rate of income tax widens the gap between high and low earners', 'A market deregulated may simply attract no new entrant'], why: 'Both are costs of working by removing restrictions: nobody is obliged to respond, and the gains tend to reach those already best placed.' },
        { name: 'Interventionist measures', items: ['The programme has to be funded from a budget already in deficit', 'The state has to judge which industries and regions to back'], why: 'Both follow from the state acting directly: acting costs money, and acting requires choosing, which is where it can be wrong.' },
        { name: 'Both routes', items: ['The effect on capacity may take a decade to appear', 'Whether firms and workers respond at all is uncertain'], why: 'Neither route can compel a response, and neither changes what an economy can produce quickly — which is the whole comparison against demand-side policy.' },
      ],
    }),
  };
})();

/* ══ Block 7 — Conflicts Between Objectives (2.3.6 · 2a-2d) ══════════════ */

/*
 * THE FOUR CONFLICTS THE SPECIFICATION LISTS, AND THE LIVE SECTION TEACHES ONE OF THEM.
 * `2a` inflation/unemployment · `2b` growth/environment · `2c` inflation/current account ·
 * `2d` growth/income equality. The live blocks 0 and 4 between them cover `2a` twice — once
 * before any policy has been taught, which is `structure-05` — and `2b` only as a quiz
 * distractor. `2c` and `2d` are absent.
 *
 * AND THE CURVE IS THE SHORT-RUN ONE. `specGap-09` doubts the expectations-augmented curve is in
 * spec. It is not: `2a` reads "including the short-run Phillips curve" and `long-run Phillips`,
 * `expectations-augmented`, `NAIRU` and `natural rate` are each 0 hits. The live claim that the
 * material is "most frequently examined" goes with it.
 */

const inflationAndUnemployment = (() => {
  const sid = subId('inflation-and-unemployment');
  return {
    id: sid,
    title: 'Inflation and Unemployment: the Short-Run Phillips Curve',
    keyIdea: 'In the short run, demand-side policy that lowers unemployment tends to raise inflation. The Phillips curve plots the exchange rate between the two objectives.',
    body: [
      { type: 'paragraph', text: `Sub-topic 2 lists four **possible conflicts between macroeconomic objectives**, and the first is **inflation and unemployment, including the short-run Phillips curve**.` },
      { type: 'paragraph', text: `The mechanism is chapter 2's diagram read twice. A reflationary policy shifts AD right; output rises, firms hire, unemployment falls — and the same shift raises the price level. One policy has moved two objectives in opposite directions.` },
      { type: 'paragraph', text: `The **short-run Phillips curve** puts that on its own axes: unemployment along the bottom, inflation up the side, sloping down. ${E.country} sits at ${pct(E.unemployment)} unemployment and ${pct(E.phillipsHere)} inflation; moving to ${pct(E.uTarget)} unemployment means ${pct(E.piAtTarget)} inflation — **${E.unemploymentBought} points of unemployment bought with ${E.inflationPaid} points of inflation.**` },
      { type: 'paragraph', text: `That is what a trade-off is: a price, not a reason to do nothing. The curve does not say which point is right; a government weighing them is judging who is hurt by each.` },
      { type: 'paragraph', text: `One point of precision, because questions have turned on it. **Phillips' own curve plotted WAGE inflation**, not price inflation — the rate at which money wages rose against unemployment. The version drawn here and asked for today uses price inflation, and the link between the two is that wages are a firm's cost, so wage rises feed through into prices.` },
    ],
    realExample: { emoji: '📉', text: `Through 2022 and 2023 many central banks said publicly that raising rates to bring inflation down would also raise unemployment. The trade-off is the choice the decision is openly made against.` },
    misconception: `Students treat the short-run trade-off as permanent — as though unemployment could be held down indefinitely by accepting higher inflation. The curve describes the short run and says so in its name. Once higher inflation is expected, it is built into wages and prices, and the economy can end with the higher inflation AND the unemployment it started with.`,
    examMatters: `Appendix 6 rewards a diagram where appropriate: unemployment horizontal, inflation vertical, and the movement arrowed ALONG the curve rather than the curve redrawn.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'An economy sits at 8% unemployment and 1.8% inflation on its short-run Phillips curve. Policy moves it to 5% unemployment and 4% inflation. Complete the analysis:',
      template: [
        'Unemployment has fallen by ___ percentage points.',
        'Inflation has risen by ___ percentage points.',
        'The policy used must have been ___, because both changes follow a rightward shift of aggregate demand.',
        'A government unwilling to pay that price has to raise capacity instead, which means a ___ policy.',
      ],
      answers: ['3', '2.2', 'reflationary', 'supply-side'],
      hints: [
        'the fall between the two unemployment figures',
        'the rise between the two inflation figures',
        'the word for a policy that raises aggregate demand',
        'the family of policies that moves the long-run curve rather than demand',
      ],
      distractors: ['2.5', '1.8', 'deflationary'],
    }),
  };
})();

const growthAndTheEnvironment = (() => {
  const sid = subId('growth-and-the-environment');
  return {
    id: sid,
    title: 'Growth and Protection of the Environment',
    keyIdea: 'Producing more usually means using more energy and materials and emitting more, so the growth objective and environmental protection pull against each other.',
    body: [
      { type: 'paragraph', text: `The second conflict is **economic growth and protection of the environment**. Note where it sits: protection of the environment is not one of the six objectives in sub-topic 1 — it appears in the specification only here, as the thing growth conflicts with.` },
      { type: 'paragraph', text: `The mechanism is direct. More output generally means more energy burned, more raw material extracted, more freight moved and more waste produced. An economy growing at ${pct(E.growthTarget)} a year is, other things equal, adding that much to each of those every year.` },
      { type: 'paragraph', text: `The costs fall on people who are not party to the transaction — the household downwind of the plant, the fishery downstream, the next generation. That is why growth measured as real GDP can rise while wellbeing does not: GDP counts the output and not the air.` },
      { type: 'paragraph', text: `The conflict is real but not fixed. Growth from **productivity** — more output from the same inputs — need not raise emissions in proportion, which is why chapter 5's first subsection matters here. An economy can also grow by shifting towards services, or by generating power differently. The trade-off is a tendency, not an identity.` },
    ],
    realExample: { emoji: '🏭', text: `Several fast-growing Asian economies have met severe urban air pollution alongside rising output, then cut emissions per unit of output sharply through cleaner power and tighter standards — without ceasing to grow.` },
    misconception: `Students conclude that protecting the environment requires slower growth. What causes the damage is the resource use and emissions per unit of output, not the output itself. An economy that raises productivity or changes how it generates power can produce more and pollute less, which is why the specification lists this as a possible conflict rather than a certain one.`,
    examMatters: `Appendix 6 asks Discuss at 14 marks for recognition of different viewpoints, so an answer here needs the case that the conflict can be weakened as well as the case that it exists.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each route to higher output by whether it tends to worsen the conflict with the environment or to weaken it:',
      groups: [
        { name: 'Worsens the conflict', items: ['Output rises because more coal-fired power is built', 'Output rises because more raw material is extracted and shipped'], why: 'In each case the extra output comes from using more inputs, so emissions and resource use rise roughly in step with production.' },
        { name: 'Weakens the conflict', items: ['Output rises because workers are better trained and produce more per hour', 'Output rises because the same power is generated from cheaper renewables', 'Output rises because the economy shifts towards services'], why: 'Each of these raises output without a matching rise in what is burned or extracted, which is what breaks the proportionality between growing and polluting.' },
      ],
    }),
  };
})();

const inflationAndCurrentAccount = (() => {
  const sid = subId('inflation-and-current-account');
  return {
    id: sid,
    title: 'Inflation and the Current Account',
    keyIdea: 'Domestic inflation above the rest of the world makes exports dearer and imports relatively cheaper, so the price objective and the current account objective conflict.',
    body: [
      { type: 'paragraph', text: `The third conflict is **inflation and equilibrium on the current account of the balance of payments**, and it runs through competitiveness.` },
      { type: 'paragraph', text: `If ${E.country}'s prices are rising at ${pct(E.inflation)} while its trading partners' rise at ${pct(E.inflationTarget)}, its goods become dearer abroad each year relative to theirs. Exports fall. At the same time imports look cheaper against domestic goods, so imports rise. Both movements widen the current account deficit — which is already ${ofGdp(Math.abs(E.currentAccountPctGdp))}.` },
      { type: 'paragraph', text: `The conflict bites when policy tries to fix one of them. A reflationary policy aimed at unemployment raises demand, and part of the extra spending goes on imports, so the current account worsens while inflation rises too. The current account and the price level are being pushed the same way by a policy aimed at neither.` },
      { type: 'paragraph', text: `Run it the other way and the conflict reverses cleanly: a deflationary policy that brings inflation back to ${pct(E.inflationTarget)} also restores competitiveness and narrows the deficit — at the cost of the output and employment that chapter 7's first subsection just priced.` },
    ],
    realExample: { emoji: '💱', text: `Economies that have run inflation well above their trading partners for several years — Turkey and Argentina among them — have typically seen their current account positions deteriorate until a sharp currency fall restored competitiveness the hard way.` },
    misconception: `Students think a current account deficit is fixed by devaluing the currency, full stop. A lower currency helps only if domestic inflation does not then rise to cancel it: if import costs feed straight into prices and wages, the competitiveness gained is given back within a year or two. The two objectives are linked in both directions, which is what makes this a conflict rather than a remedy.`,
    examMatters: `A question giving two inflation rates and asking about trade is asking for the relative comparison, and Appendix 6 defines Explain as needing a two-stage chain: the price gap first, then what it does to exports and imports.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'An economy has inflation of 6% while its trading partners average 2%. Match each consequence to the reason it follows:',
      pairs: [
        { left: 'Exports fall', right: 'Domestic goods are rising in price faster than the foreign goods buyers could choose instead', why: 'Foreign buyers compare prices, and the gap between 6% and 2% widens every year the difference persists.' },
        { left: 'Imports rise', right: 'Foreign goods become cheaper relative to domestic ones for households at home', why: 'The same price gap seen from the other side: domestic substitutes are getting dearer, so buyers switch to imports.' },
        { left: 'The current account deficit widens', right: 'Both halves of the trade balance move against the economy at once', why: 'Exports falling and imports rising both subtract from the balance, so the two effects add rather than offset.' },
      ],
      distractors: ['The central bank\'s inflation target automatically rises to 6%'],
    }),
  };
})();

const growthAndIncomeEquality = (() => {
  const sid = subId('growth-and-income-equality');
  return {
    id: sid,
    title: 'Growth and Income Equality',
    keyIdea: 'Growth does not spread itself evenly, and the measures that raise it fastest often widen the income gap — so objectives 1a and 1f can pull against each other.',
    body: [
      { type: 'paragraph', text: `The fourth conflict is **economic growth and income equality**, and it is the one that ties chapters 5 and 6 back to chapter 1.` },
      { type: 'paragraph', text: `Growth raises total income without saying where it lands: a boom concentrated in finance or technology raises the incomes of people with those skills far faster than everyone else's, so the economy grows and the gap widens at once. In ${E.country} the top fifth receive ${pct(E.topFifthShare)} of income against the bottom fifth's ${pct(E.bottomFifthShare)}.` },
      { type: 'paragraph', text: `And the policies pull too. Cutting the top marginal rate of tax is a chapter 5 incentive measure aimed at growth and it widens the gap by construction. Raising benefits narrows the gap and, if withdrawal is steep, weakens the incentive to work. Each measure moves both objectives, in opposite directions.` },
      { type: 'paragraph', text: `But it is a *possible* conflict, not a law. Chapter 6's education measure raises growth AND narrows the gap, because it raises the earning power of those who had least — which is why naming the policy you mean is the whole of a good answer here.` },
    ],
    realExample: { emoji: '📚', text: `Korea and Malaysia both grew rapidly while narrowing their income gaps, largely by widening access to education. Other fast-growing economies saw gaps widen sharply. The outcome followed the policy mix, not the growth rate.` },
    misconception: `Students conclude that growth necessarily increases inequality, or necessarily reduces it. It does neither on its own: growth changes the size of total income, and the distribution depends on where the extra output comes from and what the tax and spending system does with it. The specification says POSSIBLE conflicts, and this one is the clearest case of why that word is there.`,
    examMatters: `Appendix 6 gives Evaluate 20 marks for informed judgements supported by chains of reasoning, so a strong answer here names a specific policy, traces it to both objectives, and then judges — rather than treating growth and equality as fixed opposites.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put this argument in the order the reasoning runs, from the policy chosen to the conflict it creates:',
      correctOrder: [
        'A cut to the highest marginal rate of income tax raises the return on extra work',
        'High earners keep more of each additional dollar, and some work or invest more',
        'Capacity and output rise, which is progress on the growth objective',
        'Those same households now receive a larger share of total income, widening the gap',
      ],
      criterion: 'each step is caused by the one before it, following one policy through to both objectives it touches',
      why: [
        'This is the measure itself, chosen for its effect on incentives, before anything has responded to it.',
        'The marginal rate is what decides the return on an extra hour or an extra investment, so the response comes from the people facing that rate.',
        'More work and more investment raise what the economy can produce, which is the objective the measure was chosen for.',
        'The same mechanism that produced the growth also concentrated the gain, which is why one policy has moved two objectives in opposite directions.',
      ],
    }),
  };
})();

/* ══ The block plan ══════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  {
    title: B1,
    subs: [economicGrowthObjective, lowStableInflation, lowUnemploymentObjective,
      currentAccountEquilibrium, balancedGovernmentBudget, greaterIncomeEquality],
    takeaway: [
      'Six objectives, not four — the budget and income equality are objectives too.',
      'Growth means REAL output, and the target is what can be sustained.',
      'The inflation objective is low and stable, not zero — zero is the edge of deflation.',
      'A balanced budget is revenue minus spending, aimed at over the cycle rather than each year.',
    ],
  },
  {
    title: B2,
    subs: [fiscalAndMonetary, reflationaryAndDeflationary, fiscalInstruments, fiscalPolicyOnAdAs],
    takeaway: [
      'Both demand-side policies move AD; they differ in whose lever it is.',
      'Reflationary raises AD and deflationary lowers it — a direction, not an instrument.',
      'Fiscal policy has two instruments: government spending and taxation.',
      'An AD shift moves output and the price level the SAME way.',
    ],
  },
  {
    title: B3,
    subs: [interestRates, quantitativeEasing, lendingCriteria, reserveAssetRequirements],
    takeaway: [
      'Four instruments, not two: rates, asset purchases, lending criteria and reserve requirements.',
      'A rate change travels four channels at once and takes up to about two years.',
      'Asset purchases exist because a rate cannot be cut far below zero.',
      'Lending criteria can be aimed at one market; an interest rate cannot.',
    ],
  },
  {
    title: B4,
    subs: [implementingMonetaryPolicy, bankerToGovernmentAndBanks,
      fiscalStrengthsWeaknesses, monetaryStrengthsWeaknesses],
    takeaway: [
      'The government sets the target; the central bank chooses the instrument.',
      'It is also banker to the government and lender of last resort to the banks.',
      'Fiscal policy is powerful and aimable, but slow and paid for from the budget.',
      'Monetary policy is fast and reversible, but unaimable and floored near zero.',
    ],
  },
  {
    title: B5,
    subs: [supplySideAims, competitionAndIncentives, deregulationAndPrivatisation, taxWelfareBureaucracy],
    takeaway: [
      'Supply-side policy moves long-run supply, so output rises AND the price level falls.',
      'The three targets are productivity, competition and incentives.',
      'Deregulation and privatisation deliver only if competition follows.',
      'Tax, welfare and bureaucracy measures all work on what somebody keeps at the margin.',
    ],
  },
  {
    title: B6,
    subs: [educationTrainingSkills, investmentIncentivesInfrastructure,
      startupFinanceRegionalPolicy, supplySideStrengthsWeaknesses],
    takeaway: [
      'Interventionist measures have the state act rather than remove a restriction.',
      'Education raises capacity most and arrives slowest.',
      'An incentive only counts if it changes a decision that was marginal.',
      'Free-market and interventionist routes fail in opposite directions.',
    ],
  },
  {
    title: B7,
    subs: [inflationAndUnemployment, growthAndTheEnvironment,
      inflationAndCurrentAccount, growthAndIncomeEquality],
    takeaway: [
      'Four conflicts are listed, and each is between two of the six objectives.',
      'The Phillips curve is the SHORT-RUN trade-off between inflation and unemployment.',
      'Inflation above your trading partners widens a current account deficit both ways.',
      'They are POSSIBLE conflicts: the right policy can move two objectives the same way.',
    ],
  },
];

export const SUBSECTIONS = BLOCK_PLAN.flatMap((b) => b.subs);
export const BLOCKS = BLOCK_PLAN.map((b) => b.title);

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

export const ATTACH_SLUGS = SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, ''));

/*
 * THE LEAF MAP, BY HAND. 34 leaves at `econ_spec.txt:1132-1197`, every one named against the
 * subsection that teaches it. The runner asserts this map against `audit/raw/spec-items.json` —
 * that every leaf the oracle holds for 2.3.6 appears here, that every slug named here exists, and
 * that nothing is mapped that the oracle does not have. A map checked against a comment is a
 * comment.
 *
 * `4e` carries TWO subsections because the strengths of fiscal policy and the strengths of
 * monetary policy are different arguments; `3a` carries two because "productivity" and
 * "competition and incentives" are the two halves of one sentence and `specGap-07` is that the
 * second half has no mechanism.
 */
export const LEAF_MAP = {
  'ECON-2.3.6-1a': ['economic-growth-objective'],
  'ECON-2.3.6-1b': ['low-stable-inflation'],
  'ECON-2.3.6-1c': ['low-unemployment-objective'],
  'ECON-2.3.6-1d': ['current-account-equilibrium'],
  'ECON-2.3.6-1e': ['balanced-government-budget'],
  'ECON-2.3.6-1f': ['greater-income-equality'],
  'ECON-2.3.6-2a': ['inflation-and-unemployment'],
  'ECON-2.3.6-2b': ['growth-and-the-environment'],
  'ECON-2.3.6-2c': ['inflation-and-current-account'],
  'ECON-2.3.6-2d': ['growth-and-income-equality'],
  'ECON-2.3.6-3a': ['supply-side-aims', 'competition-and-incentives'],
  'ECON-2.3.6-3b-1': ['deregulation-and-privatisation'],
  'ECON-2.3.6-3b-2': ['deregulation-and-privatisation'],
  'ECON-2.3.6-3b-3': ['tax-welfare-bureaucracy'],
  'ECON-2.3.6-3b-4': ['tax-welfare-bureaucracy'],
  'ECON-2.3.6-3b-5': ['tax-welfare-bureaucracy'],
  'ECON-2.3.6-3c-1': ['education-training-skills'],
  'ECON-2.3.6-3c-2': ['investment-incentives-infrastructure'],
  'ECON-2.3.6-3c-3': ['investment-incentives-infrastructure'],
  'ECON-2.3.6-3c-4': ['startup-finance-regional-policy'],
  'ECON-2.3.6-3c-5': ['startup-finance-regional-policy'],
  'ECON-2.3.6-3d': ['supply-side-strengths-weaknesses'],
  'ECON-2.3.6-4a-1': ['fiscal-and-monetary'],
  'ECON-2.3.6-4a-2': ['reflationary-and-deflationary'],
  'ECON-2.3.6-4b-1': ['fiscal-instruments', 'fiscal-policy-on-ad-as'],
  'ECON-2.3.6-4c-1': ['interest-rates'],
  'ECON-2.3.6-4c-2': ['quantitative-easing'],
  'ECON-2.3.6-4c-3': ['lending-criteria'],
  'ECON-2.3.6-4c-4': ['reserve-asset-requirements'],
  'ECON-2.3.6-4d-1': ['implementing-monetary-policy'],
  'ECON-2.3.6-4d-2': ['implementing-monetary-policy'],
  'ECON-2.3.6-4d-3': ['banker-to-government-and-banks'],
  'ECON-2.3.6-4d-4': ['banker-to-government-and-banks'],
  'ECON-2.3.6-4e': ['fiscal-strengths-weaknesses', 'monetary-strengths-weaknesses'],
};

/* ══ Notes ═══════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, IN THE SAME ORDER, GENERATED FROM THE SAME MODULE, so the two
 * surfaces cannot diverge. `depth.notes-titles` wants every notes title taught in Learn Mode;
 * making the titles BE the block titles satisfies it by construction.
 *
 * A WARNING FOR VERIFY B: notes ship in the server-rendered page from the `data` column, so a
 * `?draft=1` walk shows these only after publication (DECISIONS, 16 September). Verify them
 * against the `draft` column, not against the page.
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '2.3.6 · 1a-1f',
    keyIdea: 'Six objectives, and the two the live section never taught are the budget and the spread of incomes.',
    blocks: [
      { title: 'THE SIX', items: OBJECTIVES.map((o) => def(`<strong>${o.name}</strong> — 2.3.6 · 1${o.leaf.slice(1)}.`)) },
      { title: 'MECHANISMS', items: [
        mech('<strong>Real, not nominal</strong> — growth is the change in output at constant prices. Nominal growth equal to inflation is zero growth.'),
        mech('<strong>Low AND stable</strong> — the level erodes savings; the variability blocks decisions. Both adjectives are in the objective.'),
        mech(`<strong>The budget balance</strong> — tax revenue minus government spending. ${bn(E.taxRevenue)} − ${bn(E.govSpending)} = ${bn(E.budgetBalance)}, a deficit of ${ofGdp(Math.abs(E.budgetPctGdp))}.`),
        mech('<strong>Equality is not equity</strong> — equality is the spread of outcomes; equity is whether the process is fair. The objective is GREATER equality, a direction.'),
      ] },
      { title: 'WHERE IT GOES NEXT', items: [
        link('Chapters 2 to 4 are the demand-side levers; chapters 5 and 6 the supply-side ones.'),
        link('Chapter 7 is what pulling each lever costs at another objective.'),
        link('Fiscal deficits as a stock of debt, and automatic stabilisers, are topic 4.3.5 in Unit 4.'),
      ] },
    ],
  },
  {
    title: B2,
    meta: '2.3.6 · 4a, 4b',
    keyIdea: 'Two policies, two directions, and fiscal policy\'s two instruments.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Fiscal policy</strong> — the government changing its own spending or the taxes it collects.'),
        def('<strong>Monetary policy</strong> — the central bank changing the price or availability of money and credit.'),
        def('<strong>Reflationary</strong> — any policy that raises aggregate demand. Also called expansionary.'),
        def('<strong>Deflationary</strong> — any policy that lowers aggregate demand. Not the same as causing deflation.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('<strong>Spending versus taxation</strong> — government spending IS a component of AD; a tax cut reaches AD only through what households and firms then spend.'),
        mech(`<strong>On AD/AS</strong> — a ${bn(E.fiscalInjection)} rise in spending shifts AD right by ${bn(E.adShift)}; output ${bn(E.gdp)} → ${bn(E.Yfiscal)}, price level ${idx(E.P0)} → ${idx(E.Pfiscal)}.`),
        mech('<strong>The sign property</strong> — an AD shift moves output and the price level the SAME way, in both directions.'),
      ] },
      { title: 'WHERE IT GOES NEXT', items: [
        link('The multiplier behind the size of that shift is topic 2.3.4, national income.'),
        link('Chapter 4 weighs this instrument against the monetary one.'),
      ] },
    ],
  },
  {
    title: B3,
    meta: '2.3.6 · 4c',
    keyIdea: 'Four monetary instruments the specification names, and the live section taught two of them.',
    blocks: [
      { title: 'THE FOUR', items: MONETARY_INSTRUMENTS.map((m, i) => def(`<strong>${m.charAt(0).toUpperCase() + m.slice(1)}</strong> — 2.3.6 · 4c, bullet ${i + 1}.`)) },
      { title: 'MECHANISMS', items: [
        mech('<strong>Four channels from one rate</strong> — borrowing, saving, wealth and the exchange rate, all pushing the same way.'),
        mech('<strong>The lag</strong> — a rate change reaches inflation over up to about two years, so the decision is always taken against a forecast.'),
        mech('<strong>Asset purchases</strong> — buying bonds raises their price, which lowers the long-term rates built into them.'),
        mech('<strong>Price against quantity</strong> — rates and asset purchases change the PRICE of credit; lending criteria and reserve requirements change its QUANTITY.'),
      ] },
      { title: 'WHERE IT GOES NEXT', items: [
        link('Who decides which of the four to use, and against what target, is chapter 4.'),
        link('The exchange-rate channel is why chapter 7 links inflation to the current account.'),
      ] },
    ],
  },
  {
    title: B4,
    meta: '2.3.6 · 4d, 4e',
    keyIdea: 'The central bank\'s four roles, and an honest comparison of what each demand-side policy can do.',
    blocks: [
      { title: 'THE FOUR ROLES', items: CENTRAL_BANK_ROLES.map((r) => def(`<strong>${r.charAt(0).toUpperCase() + r.slice(1)}</strong> — 2.3.6 · 4d.`)) },
      { title: 'MECHANISMS', items: [
        mech('<strong>Goal versus instrument</strong> — the government sets the target, the bank chooses how to hit it. Independence is over instruments, not goals.'),
        mech('<strong>Credibility</strong> — a government that cannot cut rates before an election cannot be expected to, so the expectation never forms.'),
        mech('<strong>Solvent but illiquid</strong> — the lender of last resort lends to a bank whose assets are sound but slow, not to one that is bust.'),
        mech('<strong>The mirror</strong> — fiscal is powerful, aimable, slow, budget-costly; monetary is fast, reversible, unaimable, floored near zero.'),
      ] },
      { title: 'WHERE IT GOES NEXT', items: [
        link('Reserve requirements from chapter 3 are the counterweight to the lender-of-last-resort promise.'),
        link('Chapters 5 and 6 are the policies that move capacity rather than demand.'),
      ] },
    ],
  },
  {
    title: B5,
    meta: '2.3.6 · 3a, 3b',
    keyIdea: 'Capacity rather than spending, and the five free-market policies the specification lists.',
    blocks: [
      { title: 'THE FIVE', items: FREE_MARKET.map((f, i) => def(`<strong>${f.charAt(0).toUpperCase() + f.slice(1)}</strong> — 2.3.6 · 3b, bullet ${i + 1}.`)) },
      { title: 'MECHANISMS', items: [
        mech(`<strong>The opposite signs</strong> — long-run supply shifting right takes output to ${bn(E.Ysupply)} and the price level DOWN to ${idx(E.Psupply)}.`),
        mech('<strong>Three targets</strong> — productivity, competition and incentives (3a). Competition works by removing the option of not improving.'),
        mech('<strong>Marginal, not average</strong> — an incentive measure changes what is kept out of the NEXT dollar, not the total collected.'),
        mech('<strong>The shared weak point</strong> — deregulation and privatisation both deliver only if competition follows.'),
      ] },
      { title: 'WHERE IT GOES NEXT', items: [
        link('Chapter 6 is the other route: the state acting rather than removing a restriction.'),
        link('The income-gap cost of these measures is chapter 7\'s fourth conflict.'),
      ] },
    ],
  },
  {
    title: B6,
    meta: '2.3.6 · 3c, 3d',
    keyIdea: 'Five interventionist policies, and why the two routes fail in opposite directions.',
    blocks: [
      { title: 'THE FIVE', items: INTERVENTIONIST.map((x, i) => def(`<strong>${x.charAt(0).toUpperCase() + x.slice(1)}</strong> — 2.3.6 · 3c, bullet ${i + 1}.`)) },
      { title: 'MECHANISMS', items: [
        mech('<strong>Two effects, two timings</strong> — spending on training is demand-side today and supply-side in a decade.'),
        mech('<strong>The training externality</strong> — a firm may lose the worker it trained, so each firm trains less than the economy wants.'),
        mech('<strong>Marginal projects only</strong> — an incentive paid on an investment already decided changes who paid, not what happens.'),
        mech('<strong>Idle or not</strong> — regional policy adds to national output only where the resources it uses were genuinely unused.'),
      ] },
      { title: 'WHERE IT GOES NEXT', items: [
        link('3d is the comparison: free-market measures risk the income gap, interventionist ones risk the budget.'),
        link('Both routes are slower and less certain than anything in chapters 2 to 4.'),
      ] },
    ],
  },
  {
    title: B7,
    meta: '2.3.6 · 2a-2d',
    keyIdea: 'Four conflicts, each between two of the six objectives, and every one of them possible rather than certain.',
    blocks: [
      { title: 'THE FOUR', items: CONFLICTS.map((c) => def(`<strong>${c.pair}</strong> — 2.3.6 · ${c.leaf}.`)) },
      { title: 'MECHANISMS', items: [
        mech(`<strong>The short-run Phillips curve</strong> — unemployment horizontal, inflation vertical, sloping down. At ${pct(E.unemployment)} unemployment inflation is ${pct(E.phillipsHere)}; at ${pct(E.uTarget)} it is ${pct(E.piAtTarget)}.`),
        mech('<strong>Growth and the environment</strong> — the link runs through resource use per unit of output, which productivity growth can weaken.'),
        mech('<strong>Inflation and the current account</strong> — inflation above trading partners makes exports dearer and imports relatively cheaper, widening a deficit from both sides.'),
        mech('<strong>Growth and equality</strong> — the same incentive measure can raise capacity and concentrate the gain.'),
      ] },
      { title: 'WHERE IT GOES NEXT', items: [
        link('The word in the specification is POSSIBLE conflicts: education raises growth AND narrows the gap.'),
        link('Protection of the environment appears only here — it is not one of the six objectives.'),
      ] },
    ],
  },
];
