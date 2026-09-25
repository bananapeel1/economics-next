/**
 * PACKET 32 — aggregate-demand: FIVE blocks, THIRTY subsections, the specification's own five
 * sub-topics in its own order.
 *
 * `audit/raw/econ_spec.txt:976-1018`, 31 leaves. The live section carries 4 blocks and ELEVEN
 * subsections, of which three teach the multiplier — which is 2.3.4's leaf — and ONE covers
 * "Government Spending (G) and Net Exports (X−M)" together, nine specification bullets on one step.
 * `structure-08` reads the pairing as coherent and it is; the problem is that eleven steps cannot
 * carry thirty-one leaves, and `specGap-02`, `-03`, `-06`, `-07` and all four `specThin` items are
 * the same shortage counted from different directions. The step-0 fix is MORE steps, not denser ones
 * (packets 16 and 17): one subsection is one step, and every leaf gets one.
 *
 * WHAT IS NOT HERE, AND WHY IT IS NOT:
 *   - **The multiplier block.** `multiplier` is four hits in `econ_spec.txt`, all at 1078-1086 =
 *     2.3.4 · 4. Named once below as a pointer and taught nowhere.
 *   - **The accelerator.** 0 hits in the specification, and already 0 hits in the live section.
 *   - **Animal spirits.** 0 hits. `3b`'s own words are "business confidence and expectations".
 *   - **Automatic stabilisers.** One hit, `econ_spec.txt:1855`, Unit 4. `4a-2` is "the level of
 *     economic activity" and that is what the subsection is called.
 *
 * EVERY EXAMPLE IS A KIND OF ECONOMY OR A KIND OF FIRM, WITH NO YEAR, NO COUNTRY AND NO COMPANY.
 * `structure-07` measures 11 of 14 live examples UK-centric and `quiz-02` records one a student
 * cannot answer without knowing what Jobseeker's Allowance is; this cohort sits WEC12 in Hong Kong,
 * Malaysia, Pakistan, Sri Lanka and the Gulf. Every figure belongs to the one economy in
 * `_packet32-util.mjs` and is derived there.
 */
import {
  subId, SECTION, hash8, bn, money, pct, qty, round2,
  AD, COMPONENTS, CONSUMPTION, INVESTMENT, INVESTMENT_POLICY, GOVERNMENT, NET_TRADE,
} from './_packet32-util.mjs';

const blockId = (title) => `${SECTION}:block:${hash8(title)}`;

/*
 * The validator reads a why line off each match PAIR and each classify GROUP
 * (`lib/content-validator.mjs:458, :478`), while a reorder carries one array for the whole recall.
 * Authoring keeps the single `why` array in every case and it is distributed here, so a reason
 * cannot drift from the item it explains and a missing one is a length mismatch, not an undefined.
 */
const recall = (sid, r) => {
  const out = { id: `${sid}:recall`, ...r };
  if (r.type === 'match' && Array.isArray(r.why)) { out.pairs = r.pairs.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  if (r.type === 'classify' && Array.isArray(r.why)) { out.groups = r.groups.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  return out;
};

export const B1 = 'The Characteristics of Aggregate Demand';
export const B2 = 'Consumption (C)';
export const B3 = 'Investment (I)';
export const B4 = 'Government Expenditure (G)';
export const B5 = 'The Net Trade Balance (X − M)';

const sub = (slug, o) => ({ id: subId(slug), ...o });

/* ══ Block 1 — The characteristics of AD (2.3.2 · 1a-1c) ══════════════════ */

const whatAdIs = sub('what-aggregate-demand-is', {
  title: 'What Aggregate Demand Is',
  keyIdea: 'Aggregate demand is the total planned spending on a country’s own output at each price level, over a period of time.',
  body: [
    { type: 'paragraph', text: `The specification opens at 2.3.2 · 1a with **the concept of AD**, and three words in that sentence are doing work. **Total** means every buyer added together, not one market. **Planned** means intended at that price level, which is not the same as what is actually bought. **Over a period** means AD is a flow: so much spending a year, never a stock sitting somewhere.` },
    { type: 'paragraph', text: `The fourth phrase is the one students drop: **on a country’s own output**. Spending by residents on goods made abroad is demand for somebody else’s output, so it is taken back out. That single fact is why the identity in the next chapter ends in a subtraction rather than an addition.` },
    { type: 'paragraph', text: `Everything in this topic is one of two questions. Either the price level has changed, and spending moves along a curve; or one of the four groups of buyers has changed its plans at an unchanged price level, and the whole curve moves. The five sub-topics after this one are the second question asked four times over.` },
  ],
  realExample: { emoji: '🧮', text: `A middle-income open economy with total planned spending of ${bn(AD.total)} a year is describing a FLOW: that is what buyers intend to spend over twelve months, not what the country owns.` },
  misconception: `Students treat aggregate demand as the amount actually bought, so a fall in AD sounds like a fall in output that has already happened. AD is planned spending at each price level. What is actually produced and sold depends on aggregate supply meeting those plans, which is the next topic.`,
  examMatters: `Appendix 6 defines Define as requiring knowledge and understanding only — the meaning of a term, concept or phrase. So a definition of AD needs the meaning and nothing else: no diagram, no example, no list of the components unless the question asks for them.`,
});

const fourComponents = sub('the-four-components', {
  title: 'The Four Components',
  keyIdea: 'AD = C + I + G + (X − M). Four groups of buyers, and imports are subtracted because that spending buys another country’s output.',
  body: [
    { type: 'paragraph', text: `2.3.2 · 1b writes the identity out: **C + I + G + (X − M)**. Each letter is a group of buyers, not a kind of good. ${COMPONENTS.map(([k, , what]) => `**${k}** is ${what}`).join('; ')}.` },
    { type: 'bullets', items: COMPONENTS.map(([k, name], i) => {
      const v = [AD.C, AD.I, AD.G, AD.netTrade][i];
      return `**${k} · ${name}** — ${bn(v)}, ${pct(AD.shareOf(v))} of the ${bn(AD.total)} total.`;
    }) },
    { type: 'paragraph', text: `The shares decide how much a given shock matters. Consumption is much the largest and also the STEADIEST: households smooth spending across good years and bad. Investment is the smallest of the three positive components and by far the most volatile, because a firm can postpone a machine and a household cannot postpone eating.` },
    { type: 'paragraph', text: `Net trade is negative here, at ${bn(AD.netTrade)}. That is normal: this economy buys more from abroad than it sells, so the fourth term subtracts. The four still add to ${bn(AD.total)}.` },
  ],
  realExample: { emoji: '⚖️', text: `Two economies can both have AD of ${bn(AD.total)} and behave completely differently: one where exports are a quarter of it will be shaken by a foreign downturn, and one where they are a twentieth will not.` },
  misconception: `The most common single error on this topic is writing that consumption is the most volatile component because it is the largest. Size and volatility are different properties. C is the largest and the most stable; I is the smallest of C, I and G and the most volatile.`,
  examMatters: `Appendix 6 defines Calculate as assessing quantitative skills through a calculation involving several stages, and advises students to show workings. Finding a missing term in the identity is exactly that kind of calculation: write the subtraction down rather than doing it in your head.`,
});

const theAdCurve = sub('the-ad-curve', {
  title: 'The AD Curve',
  keyIdea: 'The AD curve slopes downward for three separate reasons, and none of them is the reason a single market’s demand curve slopes downward.',
  body: [
    { type: 'paragraph', text: `The second half of 2.3.2 · 1b is **the AD curve**: planned spending on the horizontal axis, the price level on the vertical. A student who explains its downward slope by saying "things are cheaper so people buy more" has given the answer for ONE market, where buyers switch to a substitute. There is no substitute for a whole economy’s output.` },
    { type: 'flow', resultType: 'neutral', steps: [
      { title: 'The wealth effect', subtitle: 'A lower price level makes a given stock of money savings worth more, so households can buy more with what they already hold.' },
      { title: 'The interest-rate effect', subtitle: 'At a lower price level the same transactions need less money, so the demand for money falls and MARKET interest rates fall with it — which makes borrowing-financed spending cheaper.' },
      { title: 'The trade effect', subtitle: 'Home-produced goods are now cheaper relative to foreign ones, so exports rise and imports fall, and (X − M) rises.' },
    ] },
    { type: 'paragraph', text: `All three run from the price level to a component, which is what makes them reasons for the SHAPE of the curve rather than reasons for it to move.` },
  ],
  realExample: { emoji: '💱', text: `If an economy’s prices fall while its trading partners’ prices do not, its exports become better value abroad at an unchanged exchange rate. That is the trade effect, and it happens with no policy decision behind it.` },
  misconception: `The interest-rate effect is regularly written as "the central bank raises interest rates". It is not a policy decision at all: it is the market rate moving because the demand for money has moved with the price level. A central bank CHOOSING to raise its policy rate is a change at an unchanged price level, which shifts AD left. The two belong on opposite sides of the next chapter’s distinction.`,
  examMatters: `Appendix 6 defines Explain as requiring a two-stage chain of reasoning for a reason or an impact: from the price level to the mechanism, and from the mechanism to the component.`,
});

const movementOrShift = sub('movement-or-shift', {
  title: 'Movement Along, or a Shift',
  keyIdea: 'Ask one question: did the PRICE LEVEL change? If it did, the economy moved along AD. If anything else changed, the whole curve moved.',
  body: [
    { type: 'paragraph', text: `2.3.2 · 1c is the distinction between a movement along and a shift of the AD curve, and it is the leaf most heavily tested in this topic because every later chapter depends on it. The test has one step. The price level is on an axis, so a change in it is a change in POSITION on the curve. Everything else is off the axes, so a change in it is a change in the CURVE.` },
    { type: 'paragraph', text: `That is why the three reasons in the last chapter are not shifts. Each of them starts at the price level, which is already on the diagram. A shift starts somewhere else: a tax cut, a fall in business confidence, a foreign recession, a decision about government spending.` },
    { type: 'paragraph', text: `Getting it wrong costs twice: a shift drawn for a price-level change contradicts your own words, and a movement drawn for a component change leaves nothing on the page to explain the cause.` },
  ],
  realExample: { emoji: '🎚️', text: `Two events, one economy: the general price level falls by two per cent, and a tax cut leaves households with more to spend. The first is a slide down a fixed curve; the second is a new curve to the right of the old one, at every price level.` },
  misconception: `"AD falls" and "AD shifts left" are used as if they were the same sentence. They are not. AD can fall because the price level rose, which is a movement UP and to the left along a curve that has not moved. Say which one you mean, and the diagram will agree with you.`,
  examMatters: `Appendix 6 defines Draw as requiring students to construct an accurately labelled diagram, and says the type may be stated or left to the student to decide. A shift needs the second curve labelled and the CAUSE named beside it; a diagram showing a shift with no cause is half an answer.`,
});

/* ══ Block 2 — Consumption (2.3.2 · 2a-2d) ════════════════════════════════ */

const disposableIncome = sub('disposable-income', {
  title: 'Disposable Income',
  keyIdea: 'Disposable income is income after direct taxes are taken off and benefits are added on: what a household actually has to spend or save.',
  body: [
    { type: 'paragraph', text: `2.3.2 · 2a lists six influences on consumption and puts **${CONSUMPTION[0][0]}** first, because it is the one the other five modify. It is ${CONSUMPTION[0][2]} — not what an employer pays, which is gross, and not what is earned, because a household with no earnings can still have disposable income from transfers.` },
    { type: 'paragraph', text: `In this economy households have ${bn(AD.Yd)} of it and spend ${bn(AD.C)}. The link runs one way: more disposable income, more consumption, and therefore a larger C in the identity and a rightward shift of AD.` },
    { type: 'paragraph', text: `It does not run one-for-one. Some of any extra goes unspent, which is the next few chapters’ subject. What matters here is the DIRECTION and the size of the component it moves: C is ${pct(AD.shareOf(AD.C))} of AD, so anything that moves disposable income moves the largest thing on the board.` },
  ],
  realExample: { emoji: '💼', text: `A cut in the lowest band of income tax raises disposable income without raising anybody’s pay, and a rise in the rate lowers it without anybody taking a pay cut. The employer never notices; C does.` },
  misconception: `Students use "income" and "disposable income" interchangeably and then cannot explain why a tax change alters consumption. If gross pay is fixed and the tax rate falls, gross income has not moved at all — only the disposable figure has, and it is the disposable figure that is spent.`,
  examMatters: `Appendix 6 defines Analyse as requiring a chain of reasoning and focusing on depth rather than breadth, and says explicitly that it does not include evaluation. Listing all six influences is breadth; taking one from the tax change to the shift in AD is depth.`,
});

const interestAndConsumption = sub('interest-rates-and-consumption', {
  title: 'Interest Rates and Consumption',
  keyIdea: 'A higher interest rate raises what borrowers pay and raises what savers are offered, so it cuts consumption twice over.',
  body: [
    { type: 'paragraph', text: `The second influence, **${CONSUMPTION[1][0]}**, works on households through two channels at once. Borrowers face a higher cost on what they already owe and on anything new; savers are offered a better reward for not spending. Both point the same way, which is why this influence is strong.` },
    { type: 'paragraph', text: `Put the arithmetic on it. Households in this economy owe ${bn(AD.debt)}. At ${pct(AD.rateLow)} that costs ${bn(AD.interestOnDebt(AD.rateLow))} a year in interest; at ${pct(AD.rateHigh)} it costs ${bn(AD.interestOnDebt(AD.rateHigh))}. The difference, ${bn(AD.interestRise)}, is money that was being spent and now is not.` },
    { type: 'paragraph', text: `Run it through the identity: C falls from ${bn(AD.C)} to ${bn(AD.afterInterest.C)}, and with I, G, X and M unchanged AD falls from ${bn(AD.total)} to ${bn(AD.afterInterest.total)}. The curve moves left at every price level, because nothing about the price level has changed.` },
  ],
  realExample: { emoji: '🏠', text: `Where most household debt is borrowing against property at a rate that resets, a rise in rates reaches spending within months. Where it is mostly fixed for years, the same rise reaches only new borrowers, and the effect is slower and smaller.` },
  misconception: `Students treat the interest rate as acting only on new borrowing. Most of the effect is on debt that already exists: the households paying ${bn(AD.interestRise)} more are not taking out new loans, they are servicing old ones, and that money leaves consumption whether or not anybody borrows again.`,
  examMatters: `Appendix 6 defines Calculate as a calculation involving several stages, based on given data, and advises showing workings. "Several stages" is the point: the interest bill at each rate, the difference, and then the new AD — three lines, each of which can be read.`,
});

const consumerConfidence = sub('consumer-confidence', {
  title: 'Consumer Confidence',
  keyIdea: 'Confidence is what households expect their income and their job to be worth next year, and it moves spending before any income has changed at all.',
  body: [
    { type: 'paragraph', text: `**${CONSUMPTION[2][0]}** is ${CONSUMPTION[2][2]}. It is the only influence on this list that can move consumption with nothing measurable having happened yet — the same pay, the same tax, the same rate, and less spending.` },
    { type: 'paragraph', text: `It works through the purchases a household can postpone. Nobody delays eating; plenty of people delay replacing a car, moving house, or booking a holiday. Those are large, infrequent purchases, so a small shift in how secure people feel produces a large shift in what is bought this quarter.` },
    { type: 'paragraph', text: `Because it is an expectation, it can also reverse quickly, and it feeds on itself: households that stop buying cause the redundancies that justify the fear. That is a chain worth writing out in an answer, because it explains why confidence shocks are sharp rather than gradual.` },
  ],
  realExample: { emoji: '📰', text: `News that a large regional employer is closing changes nobody’s pay on the day it is announced, and the showrooms nearby are emptier the following weekend.` },
  misconception: `Confidence is written as if it were a component of AD in its own right. It is not: it acts THROUGH consumption, and in the next chapter it appears again as business confidence acting through investment. In both cases the diagram shows C or I moving, not confidence.`,
  examMatters: `Appendix 6 defines Examine as requiring evaluation as well as analysis, with a brief assessment of the arguments or evidence. Here the assessment is usually about size: confidence moves postponable spending, so it matters more in an economy where a large share of consumption is postponable.`,
});

const welfarePayments = sub('welfare-payments', {
  title: 'The Level of Welfare Payments',
  keyIdea: 'Welfare payments are transfers to households with little or no earned income, and a dollar of them raises consumption by more than a dollar given to a high-income household.',
  body: [
    { type: 'paragraph', text: `The fourth influence is **the ${CONSUMPTION[3][0]}**: ${CONSUMPTION[3][2]}. They are part of disposable income, so they belong on this list rather than in the government chapter — and that catches out more students than any other point in this topic.` },
    { type: 'paragraph', text: `Why they matter more than their size suggests: they go to households near the bottom of the income distribution, and those households spend nearly all of any extra they receive because they have unmet needs and little saving. The same money paid to households with high incomes would be largely saved.` },
    { type: 'paragraph', text: `So a government can raise consumption more by raising welfare payments than by cutting taxes on high earners, dollar for dollar. That is an analysis point, and it is also the standard evaluation point against it: the money has to come from somewhere, and the taxes or borrowing that fund it have effects of their own.` },
  ],
  realExample: { emoji: '🧾', text: `A rise in payments to households out of work reaches spending almost immediately, because the households receiving it were already choosing which necessities to go without.` },
  misconception: `Welfare payments are counted in G. They are not. G is government spending ON GOODS AND SERVICES — the salaries of teachers, the concrete in a road. A transfer hands money to a household and buys nothing; it becomes demand only when the household spends it, and then it is C. Counting it in both places counts it twice.`,
  examMatters: `Appendix 6 defines Explain as requiring a two-stage chain of reasoning for a reason or an impact. The two stages here are that the payment reaches households who spend most of what they get, and that their spending is C, which shifts AD right.`,
});

const wealthEffects = sub('wealth-effects', {
  title: 'Wealth Effects',
  keyIdea: 'Wealth is what a household owns, not what it earns, and a rise in the value of what it owns raises spending with income unchanged.',
  body: [
    { type: 'paragraph', text: `**${CONSUMPTION[4][0]}** are the fifth influence: ${CONSUMPTION[4][2]}. Property and shares are the two that matter, because they are the two most households hold and the two whose prices move a long way.` },
    { type: 'paragraph', text: `Two mechanisms, and they are separate. A household that feels richer chooses to save less of its income, so consumption rises directly. And a household whose property is worth more can borrow against it on better terms, so consumption rises again through credit.` },
    { type: 'paragraph', text: `Both work in reverse, which is what makes asset-price falls so damaging to AD. Note also that this is not the same as the wealth effect behind the AD curve’s slope: that one is caused by the price level, and belongs to a movement along. This one is caused by asset prices, and shifts the curve.` },
  ],
  realExample: { emoji: '🏡', text: `A sustained rise in house prices in a city raises the spending of the families who already own there, and lowers the spending of the families still saving a deposit. The net effect depends on which group is larger.` },
  misconception: `Wealth and income are used as if they were one thing, so students write that a house-price rise "increases people’s income". It does not increase income by a dollar. It increases what they own, and it changes how much of their unchanged income they choose to spend.`,
  examMatters: `Appendix 6 defines Discuss as requiring a recognition of different viewpoints and a critical assessment of the evidence. A wealth-effect question is a good one for that: the owners gain and the savers lose, and which effect dominates is genuinely arguable.`,
});

const creditAvailability = sub('availability-of-credit', {
  title: 'Availability of Credit',
  keyIdea: 'Availability is whether a bank will lend at all. That is a different question from the interest rate, which is what lending costs.',
  body: [
    { type: 'paragraph', text: `The sixth and last influence on consumption is the **${CONSUMPTION[5][0]}** — ${CONSUMPTION[5][2]}. Banks decide how much deposit they require, how much income they will lend against, and how carefully they check. None of those is a price.` },
    { type: 'paragraph', text: `The distinction has real consequences. Rates can be low and lending still unavailable, because a bank rebuilding its own balance sheet turns down borrowers it would have accepted a year earlier. Consumption then falls even though borrowing has never been cheaper, and a student who has only learned the interest-rate channel cannot explain it.` },
    { type: 'paragraph', text: `It works on the same postponable purchases as confidence does, because those are the ones bought on credit. Tighter lending criteria therefore hit the same parts of consumption that a confidence shock hits, which is why the two so often arrive together.` },
  ],
  realExample: { emoji: '🏦', text: `A bank that raises its minimum deposit from a tenth of a property’s value to a fifth has not changed its interest rate at all, and has removed a large group of buyers from the market.` },
  misconception: `Availability and interest rates are merged into "credit conditions", and then only the price half is explained. They are separate influences and the specification lists them separately. The sharpest way to show you know: describe a case where the rate falls and consumption falls with it, because lending has been rationed.`,
  examMatters: `Appendix 6 defines Analyse as requiring a chain of reasoning with depth rather than breadth, and says any relevant data provided needs to be interpreted. If a question gives you both a rate and a lending figure, Analyse asks you to read the two against each other rather than quote them.`,
});

const savingAndConsumption = sub('saving-and-consumption', {
  title: 'Saving and Consumption',
  keyIdea: 'Disposable income has exactly two uses. Whatever is not consumed is saved, so saving is the residual and the two always add to disposable income.',
  body: [
    { type: 'paragraph', text: `2.3.2 · 2b is **the relationship between savings and consumption**, and the relationship is an identity rather than a correlation: ${bn(AD.Yd)} of disposable income, ${bn(AD.C)} consumed, ${bn(AD.S)} saved. Nothing else can happen to it.` },
    { type: 'paragraph', text: `That has a consequence students find surprising: every influence on consumption in this chapter is automatically an influence on saving, pointing the other way. A rise in interest rates cuts consumption AND raises saving, and those are not two facts. They are one fact stated twice.` },
    { type: 'paragraph', text: `Saving does not disappear, either. It is the funds that firms borrow to invest, which is the next block. So a change in the split between C and S moves two components of AD, and they can move in opposite directions.` },
  ],
  realExample: { emoji: '🪙', text: `A household that decides to put aside a larger share of an unchanged income has, by that single decision, reduced its consumption by exactly the amount it has added to its saving.` },
  misconception: `Students write that people "save what is left over after spending", which makes saving passive and hides the point. The specification’s relationship runs both ways: a decision about how much to save IS a decision about how much to consume, because the two have to add to disposable income.`,
  examMatters: `Appendix 6 defines Define as requiring the meaning of a term, concept or phrase, with knowledge and understanding only. If a question asks for saving, the meaning is the part of disposable income not spent on consumption — not "money in a bank account", which describes where it goes.`,
});

const savingsRatio = sub('the-savings-ratio', {
  title: 'The Savings Ratio',
  keyIdea: 'The savings ratio is saving expressed as a percentage of disposable income.',
  body: [
    { type: 'paragraph', text: `2.3.2 · 2c asks for the definition of the **savings ratio**, and it is one line: saving divided by disposable income, written as a percentage. In this economy that is ${bn(AD.S)} over ${bn(AD.Yd)}, which is ${pct(AD.ratio)}.` },
    { type: 'paragraph', text: `Two things the definition fixes. The denominator is DISPOSABLE income, not total income and not output, so a question that gives you gross pay has given you the wrong number. And it is a ratio of flows over a period: saving this year against income this year, not the stock of savings a household has built up.` },
    { type: 'paragraph', text: `Because consumption is the residual, the ratio also tells you the consumption side without a second calculation. A savings ratio of ${pct(AD.ratio)} is the same statement as consumption of ${pct(100 - AD.ratio)} of disposable income, and the two must add to a hundred.` },
  ],
  realExample: { emoji: '📊', text: `Two economies with the same disposable income can have savings ratios ten percentage points apart, and the one with the lower ratio has the larger C and therefore the larger AD, with every other component the same.` },
  misconception: `The ratio is calculated on the wrong base: students divide saving by GDP, or by gross income before tax. Both give a smaller number than the definition asks for. The denominator is what households actually had available — disposable income.`,
  examMatters: `Appendix 6 defines Calculate as assessing quantitative skills through a calculation based on given data, and advises showing workings. On a two-mark ratio the workings are the mark: write the division out with both figures before you write the percentage.`,
});

const ratioChanges = sub('changes-in-the-savings-ratio', {
  title: 'Changes in the Savings Ratio',
  keyIdea: 'A change in the savings ratio is a change in consumption with disposable income unchanged, so it shifts AD — and it changes the funds available to lend at the same time.',
  body: [
    { type: 'paragraph', text: `2.3.2 · 2d asks for the **causes and effects** of changes in the ratio. The causes are this chapter's influences read from the saving side: expectations of future income, interest rates, consumer confidence, wealth, welfare payments and how easily credit can be had if it is needed.` },
    { type: 'paragraph', text: `The effect on AD is arithmetic. Hold disposable income at ${bn(AD.Yd)} and raise the ratio from ${pct(AD.ratio)} to ${pct(AD.ratioUp)}: saving goes to ${bn(AD.savedUp)}, consumption falls to ${bn(AD.spentUp)}, and AD falls from ${bn(AD.total)} to ${bn(AD.afterSaving.total)} — a fall of ${pct(Math.abs(AD.changeIn(AD.afterSaving)))} — with nothing else in the identity moving.` },
    { type: 'paragraph', text: `The other effect points the other way and is the evaluation. Higher saving is a larger pool of funds for banks to lend, which can raise investment. So a rising savings ratio cuts one component of AD and can raise another, and which dominates is a real question rather than a rehearsed answer.` },
  ],
  realExample: { emoji: '⚠️', text: `Households that expect harder times ahead save more out of the same income. Every one of them is behaving sensibly, and together they reduce the demand that would have kept the harder times away.` },
  misconception: `Students treat a rising savings ratio as straightforwardly bad for the economy. In the short run it lowers C and therefore AD; in the longer run the same saving is what funds investment and the capital stock. The specification asks for causes AND effects, and the effects are genuinely two-sided.`,
  examMatters: `Appendix 6 defines Evaluate as requiring multi-stage chains of reasoning, a recognition of different viewpoints and a critical assessment of the evidence, so that informed judgements may be made. A savings-ratio question is the clearest place in this topic to show that: one chain down through C, one chain up through the funds available to lend.`,
});

/* ══ Block 3 — Investment (2.3.2 · 3a-3c) ═════════════════════════════════ */

const grossAndNet = sub('gross-and-net-investment', {
  title: 'Gross and Net Investment',
  keyIdea: 'Gross investment is everything firms spend on capital goods. Net investment is what is left after replacing what wore out, and it decides next year’s capacity.',
  body: [
    { type: 'paragraph', text: `2.3.2 · 3a is **the distinction between gross investment and net investment**, and the whole leaf is a subtraction. Gross investment is the total spent on capital goods in a period. Depreciation is the part of the capital stock used up over the same period. Net investment is gross minus depreciation.` },
    { type: 'paragraph', text: `In this economy gross investment is ${bn(AD.I)} and depreciation is ${bn(AD.depreciation)}, so net investment is ${bn(AD.netInvestment(AD.I))} and the capital stock is larger at the end of the year than at the start. It is the ${bn(AD.I)} that enters AD, because that is the spending; it is the ${bn(AD.netInvestment(AD.I))} that decides future capacity.` },
    { type: 'paragraph', text: `Now drop gross investment to ${bn(AD.grossLow)} with depreciation unchanged. Net investment is ${bn(AD.netInvestment(AD.grossLow))} — negative. Firms are still spending ${bn(AD.grossLow)}, AD still counts every dollar of it, and the country is producing with less capital than it had. That is why both figures are on the specification.` },
  ],
  realExample: { emoji: '🏭', text: `A textile firm replacing eight worn looms and adding two has made a gross investment in ten machines and a net investment in two. Only the two change what it can make next year.` },
  misconception: `Investment is written as buying shares or putting money in a bank. In economics it means spending on CAPITAL GOODS — machines, buildings, vehicles, equipment. Buying a share transfers the ownership of an asset that already exists and adds nothing to the capital stock, so it is not part of I.`,
  examMatters: `Appendix 6 defines Define as requiring the meaning of a term with knowledge and understanding only. Net investment has a precise meaning and it needs the word depreciation in it; "investment that adds to the capital stock" describes the effect and leaves out the calculation.`,
});

const growthAndInvestment = sub('the-rate-of-economic-growth', {
  title: 'The Rate of Economic Growth',
  keyIdea: 'Firms invest for demand they expect to exist, so the rate at which the economy is growing is itself a reason to invest.',
  body: [
    { type: 'paragraph', text: `2.3.2 · 3b lists five influences on investment and puts **${INVESTMENT[0][0]}** first. It is ${INVESTMENT[0][2]}. A machine bought today produces for years, so what matters is not today’s sales but the trend they sit on.` },
    { type: 'paragraph', text: `The link is capacity. A firm running its existing plant with room to spare can meet more orders without buying anything. A firm running near its limit cannot, so growth that continues forces the decision. That is why investment responds to the RATE of growth and not simply to the level of output.` },
    { type: 'paragraph', text: `It also explains the volatility noticed in the first block. Output can keep rising while its rate of increase slows, and firms that were buying capacity for a faster trend stop buying. Investment can fall in a year when the economy is still growing.` },
  ],
  realExample: { emoji: '📈', text: `A component maker with two production lines running at four fifths of capacity will not order a third until it expects demand that the two cannot meet. The order comes from the forecast, not from this month’s sales.` },
  misconception: `Students write that investment rises whenever output rises. It rises when output is expected to rise ENOUGH to need capacity that does not exist yet. A firm with spare capacity can serve a great deal more demand without spending a dollar on capital.`,
  examMatters: `Appendix 6 defines Analyse as requiring a chain of reasoning, focusing on depth rather than breadth, and says it does not include evaluation. The chain here is growth, to expected demand beyond current capacity, to the order for new plant, to I and AD — and it stops there.`,
});

const interestAndInvestment = sub('interest-rates-and-investment', {
  title: 'Interest Rates and Investment',
  keyIdea: 'A firm invests when the expected rate of return beats the interest rate, so raising the rate removes projects from the bottom of the list.',
  body: [
    { type: 'paragraph', text: `The second influence, **${INVESTMENT[1][0]}**, is ${INVESTMENT[1][2]}. The test is a comparison: the expected return on the project against the cost of the money, and it holds whether the firm borrows or uses its own funds, because using its own funds means giving up the interest it could have earned.` },
    { type: 'paragraph', text: `Take a machine costing ${money(AD.project.cost)} that is expected to add ${money(AD.project.yearly)} a year. Its rate of return is ${money(AD.project.yearly)} over ${money(AD.project.cost)}, or ${pct(AD.project.rateOfReturn)}. At an interest rate of ${pct(AD.project.interestLow)} the interest on ${money(AD.project.cost)} is ${money(AD.project.interestCost(AD.project.interestLow))} a year and the project earns ${money(AD.project.yearly)}, so it goes ahead.` },
    { type: 'paragraph', text: `At ${pct(AD.project.interestHigh)} the interest is ${money(AD.project.interestCost(AD.project.interestHigh))} against the same ${money(AD.project.yearly)}, and it does not. Nothing about the machine changed. Every project in the economy faces the same comparison, so a rise in rates removes the least profitable ones and I falls.` },
  ],
  realExample: { emoji: '⚙️', text: `A workshop weighing a machine against leaving the money on deposit is making the same comparison as a workshop weighing it against a loan. The interest rate is on both sides of the decision.` },
  misconception: `Students think the interest rate only matters to firms that borrow. It is the opportunity cost of the funds either way: a firm with cash that invests is giving up interest, and when that interest is high enough, holding the cash is the better return.`,
  examMatters: `Appendix 6 defines Calculate as a calculation involving several stages and advises showing workings. A rate-of-return comparison is two stages: the return as a percentage of the outlay, and then that percentage set against the interest rate. Write both.`,
});

const businessConfidence = sub('business-confidence-and-expectations', {
  title: 'Business Confidence and Expectations',
  keyIdea: 'A project’s return is expected, never known, so what firms believe about the future is one of the influences the specification names — and it can overrule the arithmetic.',
  body: [
    { type: 'paragraph', text: `The third influence is **${INVESTMENT[2][0]}**: ${INVESTMENT[2][2]}. Look back at the last chapter. Every figure in it was expected. The ${money(AD.project.yearly)} a year is a forecast, and if the firm doubts it, the ${pct(AD.project.rateOfReturn)} is not a rate of return but a hope.` },
    { type: 'paragraph', text: `So confidence does not act beside the calculation, it acts INSIDE it. A firm that halves its expected return has halved the rate it compares with the interest rate, and the project fails the test at an interest rate that would have passed it yesterday.` },
    { type: 'paragraph', text: `This is why investment is the most volatile component. Expectations can change in a week, capital spending can be postponed in a week, and unlike consumption there is no floor of necessity underneath it — a firm can buy no machines at all this year and still open tomorrow.` },
  ],
  realExample: { emoji: '🔮', text: `Two firms in the same industry, with the same order books and facing the same interest rate, will invest differently if one expects the next three years to be better than the last three and the other does not.` },
  misconception: `Confidence gets treated as a vague extra to mention at the end. It is not vague and it is not an extra: it determines the expected return, which is one half of the comparison that decides the project. Say WHICH number it moves and the point becomes analysis instead of assertion.`,
  examMatters: `Appendix 6 defines Examine as requiring analysis and evaluation, with a brief assessment of the arguments or evidence. Confidence is the standard place to find that assessment: the arithmetic of a project looks precise, and every figure in it is a forecast.`,
});

const creditForFirms = sub('availability-of-credit-for-firms', {
  title: 'Availability of Credit',
  keyIdea: 'A project can pass the return test and still not happen, because no bank will lend for it. Availability is a separate influence from price.',
  body: [
    { type: 'paragraph', text: `The fourth influence is the **${INVESTMENT[3][0]}** — ${INVESTMENT[3][2]}. It is the same distinction made for households two chapters ago, and it bites harder on firms because the sums are larger and the security is worth less if the project fails.` },
    { type: 'paragraph', text: `A bank rationing credit does not do it by raising its rate to everyone. It tightens the conditions: more of the firm’s own money in the project, shorter terms, security it can sell. A small firm with an ${pct(AD.project.rateOfReturn)} project and no property to pledge is turned down at a rate that a large firm is accepted at.` },
    { type: 'paragraph', text: `The consequence for AD is that investment can stay flat through a fall in interest rates. Cheaper money that nobody will lend does not buy a machine, and an answer that only knows the price channel has to call that a puzzle.` },
  ],
  realExample: { emoji: '🧾', text: `A bank that will now lend only half a project’s cost instead of three quarters has not changed its rate. It has required the firm to find the other half, and the firms that cannot do not invest.` },
  misconception: `Students reach for "interest rates are low so investment will rise" as an automatic step. It is a conditional step: cheap credit raises investment only if credit is available. The specification lists availability separately from the rate precisely because they can move in opposite directions.`,
  examMatters: `Appendix 6 defines Explain as requiring a two-stage chain of reasoning for a reason or an impact. Two stages here: the bank tightens what it requires, so projects that pass the return test are not funded, so I falls at an unchanged interest rate.`,
});

const taxOnProfits = sub('tax-on-company-profits', {
  title: 'Tax on Company Profits',
  keyIdea: 'The return a firm compares with the interest rate is the return it KEEPS, so a tax on profits lowers the rate of return on every project at once.',
  body: [
    { type: 'paragraph', text: `The fifth and last influence on 3b is **${INVESTMENT[4][0]}**: ${INVESTMENT[4][2]}. Return to the machine. It earns ${money(AD.project.yearly)} a year before tax, which was ${pct(AD.project.rateOfReturn)} on ${money(AD.project.cost)}.` },
    { type: 'paragraph', text: `With a profit tax of ${pct(AD.project.profitTax)} the firm keeps ${money(AD.project.kept)}, and the rate of return it can actually compare with the interest rate is ${pct(AD.project.returnAfterTax(AD.project.profitTax))}. Raise the tax to ${pct(AD.project.profitTaxHigh)} and the kept return is ${money(AD.project.keptAt(AD.project.profitTaxHigh))}, a rate of ${pct(AD.project.returnAfterTax(AD.project.profitTaxHigh))}.` },
    { type: 'paragraph', text: `Set those against an interest rate of ${pct(AD.project.interestLow)}. At the lower tax ${pct(AD.project.returnAfterTax(AD.project.profitTax))} beats it and the project goes ahead; at the higher tax ${pct(AD.project.returnAfterTax(AD.project.profitTaxHigh))} does not, and it does not. The machine, the demand and the interest rate are all unchanged, and the investment stops.` },
  ],
  realExample: { emoji: '🏢', text: `A firm choosing between two countries for a new plant, with identical costs and identical expected sales, is choosing between two after-tax rates of return. That is the whole decision.` },
  misconception: `The tax gets treated as a cost like any other, so students say it "reduces profit" and stop. The point is sharper: it reduces the rate of return the firm can set against the interest rate, which is what decides whether the project happens at all.`,
  examMatters: `Appendix 6 defines Analyse as requiring a chain of reasoning with any relevant data interpreted, and focusing on depth rather than breadth. If a question gives a tax rate and a rate of return, the analysis IS the after-tax figure: Analyse asks for the step to be done, not named.`,
});

const reliefAndSubsidies = sub('tax-relief-and-subsidies', {
  title: 'Tax Relief and Subsidies',
  keyIdea: 'Both cut what the firm pays for the asset rather than what it earns from it, so both raise the rate of return by shrinking the denominator.',
  body: [
    { type: 'paragraph', text: `2.3.2 · 3c is **government policy to promote investment**, and it names three tools. Two of them work on the cost side. **${INVESTMENT_POLICY[0][1]}** means ${INVESTMENT_POLICY[0][2]}. **${INVESTMENT_POLICY[1][1]}** mean ${INVESTMENT_POLICY[1][2]}.` },
    { type: 'paragraph', text: `Keep the last chapter's figures, so the comparison is like with like: after the ${pct(AD.project.profitTax)} profit tax the firm keeps ${money(AD.project.kept)} a year, which on a ${money(AD.project.cost)} machine is ${pct(AD.project.returnAfterTax(AD.project.profitTax))}. A subsidy of ${money(AD.project.subsidy)} leaves it paying ${money(AD.project.costAfterSubsidy)}, and the same ${money(AD.project.kept)} is now ${pct(AD.project.returnAfterSubsidy)}.` },
    { type: 'paragraph', text: `Tax relief reaches the same place by a different road: the outlay is set against taxable profit, so the state bears ${pct(AD.project.profitTax)} of it — ${money(AD.project.reliefWorth)} here, twice what the subsidy was worth — and the effective cost is ${money(AD.project.costAfterRelief)}, a return of ${pct(AD.project.returnAfterRelief)}. Projects sitting just below the interest rate now clear it, so I rises and AD shifts right.` },
  ],
  realExample: { emoji: '🛠️', text: `A government that wants more machines bought this year can pay part of the price or allow the whole price against tax. Both leave the firm out of pocket by less, and both cost the government revenue.` },
  misconception: `Students treat a subsidy as simply "free money for firms" and stop before the mechanism. It changes a specific number: the outlay the kept return is divided by. Neither tool makes a bad project good — a machine earning ${money(AD.project.kept)} a year still earns ${money(AD.project.kept)}. What they do is move projects that were sitting just below the interest rate over the line.`,
  examMatters: `Appendix 6 defines Examine as requiring evaluation as well as analysis, with a brief assessment of the arguments. The assessment here writes itself: both tools cost revenue, and some of the projects they subsidise would have gone ahead anyway.`,
});

const corporationTax = sub('lower-corporation-tax', {
  title: 'Reducing the Rate of Corporation Tax',
  keyIdea: 'Cutting the tax on company profits raises the kept return on every project at once, rather than on the projects a government has chosen.',
  body: [
    { type: 'paragraph', text: `The third tool in 3c is **${INVESTMENT_POLICY[2][0]}** — ${INVESTMENT_POLICY[2][2]}. It is the mirror of the fifth influence in the last chapter, run backwards, and the arithmetic is the same arithmetic.` },
    { type: 'paragraph', text: `The machine earns ${money(AD.project.yearly)} before tax. At ${pct(AD.project.profitTax)} the firm keeps ${money(AD.project.kept)}, a return of ${pct(AD.project.returnAfterTax(AD.project.profitTax))}. Cut the rate to ${pct(AD.project.profitTaxCut)} and it keeps ${money(AD.project.keptAt(AD.project.profitTaxCut))}, a return of ${pct(AD.project.returnAfterTax(AD.project.profitTaxCut))}. Every project in the economy moves up by the same proportion.` },
    { type: 'paragraph', text: `That breadth is the difference from the other two tools. A subsidy reaches the assets a government chose to subsidise; a rate cut reaches every firm with taxable profit, including the ones that were investing anyway. It is the blunter instrument, and the more expensive one.` },
  ],
  realExample: { emoji: '📉', text: `A cut of five percentage points in the profit tax raises the kept return on a project that was already going ahead by exactly as much as on one that was marginal. Only the marginal one changes behaviour.` },
  misconception: `A tax cut is written as if it were certain to raise investment. It raises the kept return, which raises investment only where the return was close to the interest rate. Firms with no taxable profit — which includes most firms in a downturn — get nothing from it at all.`,
  examMatters: `Appendix 6 defines Discuss as requiring a recognition of different viewpoints and a critical assessment of the evidence, supported by chains of reasoning. A corporation-tax question is one of the clearest: the same policy is a cost-effective incentive and an expensive windfall, and which it is depends on how many projects were marginal.`,
});

/* ══ Block 4 — Government expenditure (2.3.2 · 4a) ════════════════════════ */

const fiscalPolicy = sub('fiscal-policy', {
  title: 'Fiscal Policy',
  keyIdea: 'Fiscal policy is a deliberate decision about government spending and taxation, and it is the only influence on G that somebody chooses in a budget.',
  body: [
    { type: 'paragraph', text: `2.3.2 · 4a lists four **influences on government expenditure** and the first is **${GOVERNMENT[0][0]}**: ${GOVERNMENT[0][2]}. G is the one component of AD a government can move directly, which is why it is the component policy reaches for.` },
    { type: 'paragraph', text: `Take G from ${bn(AD.G)} to ${bn(AD.afterFiscal.G)}. With C, I, X and M unchanged, AD goes from ${bn(AD.total)} to ${bn(AD.afterFiscal.total)}: a rise of ${pct(AD.changeIn(AD.afterFiscal))} at every price level, so the curve shifts right rather than the economy sliding along it.` },
    { type: 'paragraph', text: `The tax side of the same decision reaches AD by a longer road. A tax cut raises disposable income, and households then decide how much of it to spend, so it arrives as C and only partly. Spending directly is the more certain route and the more visible one.` },
  ],
  realExample: { emoji: '🚧', text: `A decision to build a road adds the whole contract to G in the year it is spent. A tax cut of the same size adds to AD only the part households choose to spend rather than save.` },
  misconception: `A rise in G of ${bn(AD.fiscalRise)} raises AD by more than ${bn(AD.fiscalRise)}, because the money is spent again by whoever receives it. That further effect is called the multiplier and it belongs to topic 2.3.4, national income — it is not part of 2.3.2 and this section deliberately does not teach it. Here, the identity is the whole answer.`,
  examMatters: `Appendix 6 defines Explain as requiring a two-stage chain of reasoning for a reason or an impact. Two stages: the government raises its own spending on goods and services, so G in the identity is larger, so AD is larger at every price level.`,
});

const economicActivity = sub('the-level-of-economic-activity', {
  title: 'The Level of Economic Activity',
  keyIdea: 'Some government spending moves with the economy on its own: a downturn raises what is paid out and lowers what is taken in, with nothing decided.',
  body: [
    { type: 'paragraph', text: `The second influence is **${GOVERNMENT[1][0]}** — ${GOVERNMENT[1][2]}. It is the only one of the four that is not a choice, and that makes it the one students leave out.` },
    { type: 'paragraph', text: `The mechanism is direct. When output falls and unemployment rises, more households qualify for payments and more claim them, so spending rises. At the same time incomes and profits are smaller, so tax receipts fall. Take this economy into a downturn and G rises by ${bn(AD.benefitRise)}, to ${bn(AD.afterDownturn.G)}, with no minister deciding anything.` },
    { type: 'paragraph', text: `The effect on AD is to soften the fall. Spending rises exactly when private spending is falling, which is why it works in the opposite direction to the cycle. Read the other way: in a boom the payments fall away and receipts rise, so the same mechanism restrains AD without a decision either.` },
  ],
  realExample: { emoji: '🔁', text: `A factory closure raises payments to the households that worked there and lowers the tax they were paying, in the same quarter. Both happen because the rules already exist, not because anything was announced.` },
  misconception: `Students describe this as the government "responding to the downturn", which makes it sound like fiscal policy. It is not a response and nobody chose it: the rules were written in advance and the spending follows the economy. A choice can be reversed in a budget; this cannot, without changing the rules.`,
  examMatters: `Appendix 6 defines Analyse as requiring a chain of reasoning with depth rather than breadth, and any relevant data interpreted. The chain is output falls, so claims rise and receipts fall, so G rises without a decision, so AD falls by less than it otherwise would.`,
});

const marketFailures = sub('correction-of-market-failures', {
  title: 'Correction of Market Failures',
  keyIdea: 'Governments spend on the things a market left to itself provides too little of, and that spending is part of G whatever its purpose.',
  body: [
    { type: 'paragraph', text: `The third influence is the **${GOVERNMENT[2][0]}** — ${GOVERNMENT[2][2]}. Markets under-provide goods whose benefits reach people who did not pay for them, and goods nobody can be excluded from using. Defence, public health, basic research and flood protection are the standard cases.` },
    { type: 'paragraph', text: `For this topic the reason does not change the accounting. A government buying vaccines to correct a market failure adds exactly the same amount to G as a government buying them for any other reason. The correction is WHY the spending happens; AD only records THAT it happened.` },
    { type: 'paragraph', text: `What it does change is how much of G can be cut. Spending tied to a failure the market cannot fix is hard to remove without the failure returning, so this part of G is stickier than the parts driven by politics or by the cycle.` },
  ],
  realExample: { emoji: '💉', text: `A vaccination programme benefits people who never attend it, because they are less likely to meet an infected neighbour. Each buyer pays the whole price and receives only part of the benefit, so fewer are bought privately than are worth buying — and the shortfall is what the government purchase closes.` },
  misconception: `Students import the whole of the market-failure topic here and write two paragraphs on externalities. This leaf asks only why market failure is an INFLUENCE on the size of G. Name the failure, say what the government therefore buys, and put the purchase into the identity.`,
  examMatters: `Appendix 6 defines Explain as requiring a two-stage chain of reasoning when it asks for a reason or an impact. The chain here is short: name the specific failure in the case in front of you, then say what the government therefore buys and what that does to G.`,
});

const politicalPriorities = sub('political-priorities', {
  title: 'Political Priorities',
  keyIdea: 'The same total of government spending can be split completely differently by two governments, and the split is decided politically rather than economically.',
  body: [
    { type: 'paragraph', text: `The fourth influence is **${GOVERNMENT[3][0]}**: ${GOVERNMENT[3][2]}. Two governments facing identical economies, identical tax receipts and identical market failures will still spend differently, because they were elected to do different things.` },
    { type: 'paragraph', text: `Most of what this influence moves is the COMPOSITION of G rather than its total: more on transport and less on defence, more on schools and less on subsidies. For AD that can be neutral — the identity counts the total — while mattering a great deal to who benefits and to what the economy can produce later.` },
    { type: 'paragraph', text: `It also sets the direction of the other three. A government committed to a smaller state will use fiscal policy differently, treat the automatic rise in a downturn as a problem to be corrected, and take a narrower view of which failures are worth correcting. That is why the specification lists it last: it conditions the rest.` },
  ],
  realExample: { emoji: '🗳️', text: `A newly elected government that shifts spending from military procurement to rural clinics may leave G unchanged to the dollar, and change what the country looks like in ten years.` },
  misconception: `This influence is dismissed as "politics, not economics" and skipped. It is on the specification, and it has an economic consequence that can be stated precisely: it determines the composition of G, which determines what the spending builds, even where it leaves the total and therefore AD unchanged.`,
  examMatters: `Appendix 6 defines Evaluate as requiring multi-stage chains of reasoning and a recognition of different viewpoints so that informed judgements may be made. Different viewpoints is not decoration on this leaf: the disagreement about what a government should spend on is the leaf itself.`,
});

/* ══ Block 5 — The net trade balance (2.3.2 · 5a) ═════════════════════════ */

const realIncomeAndImports = sub('real-income-and-imports', {
  title: 'Real Income at Home',
  keyIdea: 'Higher real income at home is spent on everything, including goods made abroad, so imports rise and the net trade balance falls.',
  body: [
    { type: 'paragraph', text: `2.3.2 · 5a asks for **the impact on the net trade balance of changes in** five things, and the first is **${NET_TRADE[0][0]}**: ${NET_TRADE[0][2]}. Households do not buy only home-produced goods with extra income, so part of every rise leaks abroad.` },
    { type: 'paragraph', text: `Put a figure on it. If an extra ${bn(AD.incomeRise)} of spending takes about ${bn(AD.importsFromIncome)} of it abroad, imports go from ${bn(AD.M)} to ${bn(AD.afterIncome.M)} and the net trade balance from ${bn(AD.netTrade)} to ${bn(AD.afterIncome.netTrade)}. Exports have not moved: foreign buyers do not care what this economy’s income is doing.` },
    { type: 'paragraph', text: `That asymmetry is the point of the leaf. Domestic income moves M and leaves X alone; the third influence in this chapter does the opposite. Notice too that the fall in (X − M) works against the rise in C, so a boom at home partly exports its own demand.` },
  ],
  realExample: { emoji: '🛒', text: `A country whose households grow richer buys more of everything — and if the cars, phones and machinery it buys are made elsewhere, a large part of the new spending never reaches its own producers.` },
  misconception: `Students write that a rise in domestic income "worsens the trade balance and therefore reduces AD". It reduces the (X − M) term, but the same rise in income has raised C by more. The identity is a sum: look at all four components before saying which way AD went.`,
  examMatters: `Appendix 6 defines Calculate as a calculation involving several stages based on given data, with workings shown. Finding a new net trade balance from a change in imports is exactly that: the new M, then the subtraction, then the comparison with the old figure.`,
});

const exchangeRate = sub('the-exchange-rate', {
  title: 'The Exchange Rate',
  keyIdea: 'A weaker home currency makes exports cheaper abroad and imports dearer at home, and the arithmetic is a division you can do on one line.',
  body: [
    { type: 'paragraph', text: `The second influence is **${NET_TRADE[1][0]}**: ${NET_TRADE[1][2]}. Quote it as units of home currency per dollar. Suppose it moves from ${qty(AD.fx.before)} to ${qty(AD.fx.after)} units per dollar — more units for a dollar means each unit is worth less, which is a depreciation.` },
    { type: 'paragraph', text: `An export priced at ${qty(AD.fx.exportPrice)} units at home cost a foreign buyer ${money(AD.fx.exportCostsAbroad(AD.fx.before))} before and ${money(AD.fx.exportCostsAbroad(AD.fx.after))} after: cheaper abroad, with no change in the home price. An import priced at ${money(AD.fx.importPrice)} cost ${qty(AD.fx.importCostsAtHome(AD.fx.before))} units before and ${qty(AD.fx.importCostsAtHome(AD.fx.after))} after: dearer at home, with no change in the foreign price.` },
    { type: 'paragraph', text: `So a depreciation pushes X up and M down, and the net trade balance improves. The size of the improvement depends on how much buyers respond, which is a topic in Unit 4; for 2.3.2 the direction and the per-unit arithmetic are what the leaf asks for.` },
  ],
  realExample: { emoji: '✈️', text: `An exporter whose price list is unchanged in its own currency becomes cheaper in every market it sells to, overnight, because the currency moved. It has done nothing and it has just cut its foreign prices.` },
  misconception: `Going from ${qty(AD.fx.before)} to ${qty(AD.fx.after)} units per dollar is written as a ${pct(AD.fx.quoteRise)} fall in the currency. It is a ${pct(AD.fx.quoteRise)} rise in the QUOTE and a ${pct(AD.fx.depreciation)} fall in the CURRENCY: one unit was worth ${money(AD.fx.valueOf(AD.fx.before))} and is now worth ${money(AD.fx.valueOf(AD.fx.after))}. Work in what a unit is worth, not in how many of them a dollar buys.`,
  examMatters: `Appendix 6 defines Explain as requiring a two-stage chain of reasoning for a reason or an impact. Two stages on this leaf: the currency falls, so the home price converts into a lower foreign price, so foreign buyers order more and X rises.`,
});

const globalEconomy = sub('the-state-of-the-global-economy', {
  title: 'The State of the Global Economy',
  keyIdea: 'Exports are somebody else’s consumption, so the real income of the countries that buy them decides how much they buy.',
  body: [
    { type: 'paragraph', text: `The third influence is **${NET_TRADE[2][0]}** — ${NET_TRADE[2][2]}. Everything the first chapter of this block said about domestic income applies abroad: when partner economies grow, their households and firms buy more of everything, and some of that is this economy’s exports.` },
    { type: 'paragraph', text: `It is the mirror image and it is worth saying so. Domestic real income moves M and leaves X alone. Foreign real income moves X and leaves M alone. A student who can state that pair has the whole leaf, and can work out which way the net trade balance goes in either case without memorising it.` },
    { type: 'paragraph', text: `Concentration matters as much as the average. An economy selling to four buyers is exposed to those four; an economy selling to forty is not. That is why the same global downturn hits two exporters very differently, and it is the evaluation point on this leaf.` },
  ],
  realExample: { emoji: '🌏', text: `A slowdown in one large regional economy takes a measurable amount off the exports of every smaller economy that supplies its factories, before any of them has changed a single price.` },
  misconception: `A global downturn is treated as one shock hitting everybody equally. Its effect on an economy depends on whether it is exposed to it: an economy whose exports mostly go to a growing partner can be almost untouched by a recession elsewhere.`,
  examMatters: `Appendix 6 defines Discuss as requiring reference to context where appropriate, and a critical assessment of the evidence. Context is the whole of this leaf: an export figure means nothing until you know which economies the exports go to.`,
});

const protectionism = sub('degree-of-protectionism', {
  title: 'The Degree of Protectionism',
  keyIdea: 'Tariffs and quotas at home cut imports, and tariffs and quotas abroad cut exports — so protectionism can move both sides of the balance at once.',
  body: [
    { type: 'paragraph', text: `The fourth influence is the **${NET_TRADE[3][0]}**: ${NET_TRADE[3][2]}. Take a tariff first. A ${pct(AD.tariff)} tariff on an import priced at ${money(AD.fx.importPrice)} makes it ${money(AD.tariffPrice(AD.fx.importPrice))} to a buyer at home. Some buyers switch to home-produced substitutes, M falls, and (X − M) rises.` },
    { type: 'paragraph', text: `A quota reaches the same place by a different route: instead of raising the price it caps the quantity, so imports fall because they are not allowed in rather than because they are dear. Either way, M is smaller than it would have been.` },
    { type: 'paragraph', text: `Now the other side. The same tools exist abroad, and trading partners use them — often in response. A tariff on this economy’s exports raises their price to foreign buyers exactly as a home tariff raises import prices here, so X falls. Protectionism that started as a way to improve the balance can end with both terms smaller.` },
  ],
  realExample: { emoji: '🚢', text: `A duty imposed on imported steel raises the cost of every product made from steel in the importing country, including the ones it exports. The protection and the damage arrive in the same shipment.` },
  misconception: `Protectionism is treated as a one-way improvement in the trade balance. It cuts imports; whether it improves (X − M) depends on what happens to exports. A student who writes only the import half has answered half a leaf, and the specification's word is "degree", which points at both directions.`,
  examMatters: `Appendix 6 defines Examine as requiring analysis and evaluation, with a brief assessment of the arguments or evidence. The assessment on this leaf is almost always the same: the import effect is immediate and certain, the export effect depends on how partners respond.`,
});

const nonPriceFactors = sub('non-price-factors', {
  title: 'Non-Price Factors',
  keyIdea: 'Quality, design, reliability and delivery decide sales at an unchanged price, so an economy can improve its net trade balance without its currency or its prices moving at all.',
  body: [
    { type: 'paragraph', text: `The fifth influence is **${NET_TRADE[4][0]}**: ${NET_TRADE[4][2]}. Everything else in this chapter works through price. This one does not, which is why the specification names it separately and why it is the hardest for students to write about.` },
    { type: 'paragraph', text: `Put two exporters side by side at the same price. One delivers in three weeks and replaces a faulty unit without argument; the other delivers in ten and does not. Buyers choose the first, and no exchange rate, tariff or income figure explains the choice. X rises for one economy and falls for the other.` },
    { type: 'paragraph', text: `It is also the only influence on this list a firm controls itself, and the only one that is slow. A currency moves in a day; a reputation for reliability takes years and is not lost in a day either. That makes non-price competitiveness the durable form, and the expensive one to build.` },
  ],
  realExample: { emoji: '🔩', text: `A component supplier that has never missed a delivery keeps its foreign customers through a period when a cheaper rival is available, because a stopped production line costs more than the saving.` },
  misconception: `Students answer every trade question with the exchange rate, because it has arithmetic in it. An economy can lose export share while its currency weakens, if what it sells is slower, less reliable or worse designed than the alternative — and it can gain share with a strong currency for the opposite reason.`,
  examMatters: `Appendix 6 defines Evaluate as requiring a critical assessment of the evidence so that informed judgements may be made. Price data on its own cannot settle a question about competitiveness, and saying why not is the judgement this leaf is asking for.`,
});

/* ══ The blocks ═══════════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  { title: B1, subs: [whatAdIs, fourComponents, theAdCurve, movementOrShift], takeaway: [
    'AD is total PLANNED spending on a country’s own output, at each price level, over a period.',
    `C + I + G + (X − M): C is the largest and steadiest, I the smallest and most volatile.`,
    'The price level changes, you move ALONG the curve. Anything else changes, the curve moves.',
  ] },
  { title: B2, subs: [disposableIncome, interestAndConsumption, consumerConfidence, welfarePayments, wealthEffects, creditAvailability, savingAndConsumption, savingsRatio, ratioChanges], takeaway: [
    'Six influences on consumption, and disposable income is the one the other five modify.',
    'Interest rates are the PRICE of credit; availability is whether there is any. They can move apart.',
    `Saving is the residual: Yd = C + S, and the savings ratio is S over Yd — ${pct(AD.ratio)} here.`,
  ] },
  { title: B3, subs: [grossAndNet, growthAndInvestment, interestAndInvestment, businessConfidence, creditForFirms, taxOnProfits, reliefAndSubsidies, corporationTax], takeaway: [
    'Gross investment minus depreciation is net investment, and net investment can be negative.',
    'Every influence works on one comparison: the expected return KEPT, against the interest rate.',
    'Relief and subsidies cut what the asset costs; a lower profit tax raises what the return is worth.',
  ] },
  { title: B4, subs: [fiscalPolicy, economicActivity, marketFailures, politicalPriorities], takeaway: [
    'G is the component a government moves directly; fiscal policy is the decision to move it.',
    'The level of economic activity moves G with nobody deciding anything at all.',
    'Market failure and political priorities decide what G buys, not how much.',
  ] },
  { title: B5, subs: [realIncomeAndImports, exchangeRate, globalEconomy, protectionism, nonPriceFactors], takeaway: [
    'Domestic real income moves M and leaves X alone; foreign real income moves X and leaves M alone.',
    'A depreciation makes exports cheaper abroad and imports dearer at home.',
    'Protectionism cuts both sides if partners respond; non-price factors need no price change.',
  ] },
];

export const SUBSECTIONS = BLOCK_PLAN.flatMap((b) => b.subs);
export { BLOCK_PLAN };

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

/* ══ The recall bank ══════════════════════════════════════════════════════ */
/*
 * `topFix-03` IS THAT TEN OF THE LIVE RECALLS ARE NOT GENUINE — they restate the sentence above them
 * or give the answer away in a leading-letter hint — and it names five replacements by type: a
 * movement-versus-shift classifier, a C/I/G/(X−M) classifier, a calculation comparison, and two
 * more. The first two are below. The other three named a multiplier and an accelerator subsection,
 * so they are answered by the same evidence that removes those: `multiplier` is 2.3.4's leaf and
 * `accelerator` is 0 hits in the specification.
 *
 * EVERY RECALL HERE APPLIES THE IDEA TO A CASE THE TEACHING DOES NOT CONTAIN. Packet 29's Verify B
 * found 24 of 43 steps answerable by scrolling up and V029 then measured 32; the corrected check
 * (sentence split on `.!?` only, thresholds 0.70 / 0.75) runs over this bank in the runner, and its
 * negative control is a real subsection of this section rather than an invented one.
 *
 * NO HINT NAMES A LETTER OF ITS ANSWER. `topFix-03`'s last clause, enforced by the runner's prefix
 * test rather than by care.
 */
const ATTACH = {
  'what-aggregate-demand-is': {
    type: 'classify',
    prompt: 'A statistician is compiling this year’s aggregate demand. Sort each item by whether it belongs in the figure:',
    groups: [
      { name: 'In the figure', items: ['Orders placed with home producers for delivery this year', 'A government contract signed and paid this year'] },
      { name: 'Not in it', items: ['The total value of factories and machines the country owns', 'Orders placed with producers abroad', 'A purchase the firm has decided to make the year after next'] },
    ],
    why: [
      'Both are intended spending, this period, on output produced in this country — which is every word of the definition satisfied at once.',
      'Each fails one word of it: the first is a STOCK rather than a flow, the second buys another country’s output, and the third falls in a different PERIOD. Aggregate demand is not damaged by any of them; they simply are not it.',
    ],
  },
  'the-four-components': {
    type: 'classify',
    prompt: 'Sort each piece of spending into the component of AD it is counted in — C, I or G:',
    groups: [
      { name: 'C', items: ['A family pays a plumber to fit a new boiler', 'A household here buys a television made abroad'] },
      { name: 'I', items: ['A bakery buys an extra oven', 'A developer builds a warehouse it will rent out'] },
      { name: 'G', items: ['A ministry pays the salaries of nurses it employs', 'A city buys buses for its transport service'] },
    ],
    why: [
      'Both are households buying for their own use, which is consumption whoever made the item — and the second is the one to watch: an imported television is counted in C and then taken out again as part of M, so on balance it adds nothing to demand for this country’s output.',
      'Both are firms buying capital that will be used to produce in future periods, which is investment.',
      'Both are the government buying goods and services rather than handing money over, which is the G in the identity.',
    ],
  },
  'the-ad-curve': {
    type: 'match',
    prompt: 'The price level falls. Match each consequence to the effect that produces it:',
    pairs: [
      { left: 'A retired household living on its savings can afford a longer holiday', right: 'The wealth effect' },
      { left: 'A workshop finds a loan cheaper although the central bank has announced nothing', right: 'The interest-rate effect' },
      { left: 'A shipyard abroad places a larger order at an unchanged exchange rate', right: 'The trade effect' },
    ],
    why: [
      'Nobody earned anything and nobody borrowed: what changed is what the money the household already held will buy, which is the wealth channel.',
      'No decision was taken, so this cannot be policy. Lower prices mean less money is needed to do the same business, and the market rate falls on its own.',
      'This one reaches the fourth component rather than the first — and note the exchange rate did not move, so it is the home price level that made the order better value.',
    ],
  },
  'movement-or-shift': {
    type: 'classify',
    prompt: 'Sort each event by what it does to the AD diagram:',
    groups: [
      { name: 'Movement along AD', items: ['Inflation of four per cent and no other news', 'Prices fall across the board and money already held goes further'] },
      { name: 'Shift of AD', items: ['A central bank announces a higher policy rate', 'A trading partner enters a recession', 'Income tax is cut'] },
    ],
    why: [
      'Both of these are the general price level and nothing else, and that is on an axis — so the economy changes its position on a curve that has not moved.',
      'None of these three is the price level: an announcement, a foreign downturn and a tax change each alter a component at every price level, so the whole curve moves.',
    ],
  },

  'disposable-income': {
    type: 'fillin',
    prompt: 'A worker is paid the same gross wage this year as last, and the direct tax rate is cut. Apply the leaf:',
    template: [
      'Of the two income figures on the worker’s payslip, the larger one this year is the ___ figure',
      'The employer’s wage bill is ___',
      'Consumption rises, so the AD curve shifts to the ___',
    ],
    answers: ['disposable', 'unchanged', 'right'],
    hints: ['the kind of income that is measured after tax and benefits', 'what happens to a figure that did not move', 'the direction a curve moves when a component increases'],
    distractors: ['gross', 'larger', 'left'],
  },
  'interest-rates-and-consumption': {
    type: 'fillin',
    prompt: `Households owe ${bn(AD.debt)}. The rate goes from ${pct(AD.rateLow)} to ${pct(10)}. Work it through:`,
    template: [
      `At ${pct(10)} the annual interest bill is ___`,
      `The bill has risen by ___ against the ${pct(AD.rateLow)} case`,
      'That money leaves the ___ component of aggregate demand',
    ],
    answers: [bn(AD.interestOnDebt(10)), bn(round2(AD.interestOnDebt(10) - AD.interestOnDebt(AD.rateLow))), 'consumption'],
    hints: ['the debt multiplied by the new rate', 'the difference between the two interest bills', 'the component households are responsible for'],
    distractors: [bn(48), bn(12), 'investment'],
  },
  'consumer-confidence': {
    type: 'classify',
    prompt: 'Confidence falls sharply. Sort these purchases by how much they are likely to fall:',
    groups: [
      { name: 'Falls a lot', items: ['Replacing a car that still works', 'Booking a long holiday abroad', 'Moving to a larger house'] },
      { name: 'Barely falls', items: ['Weekly groceries', 'Electricity for the home'] },
    ],
    why: [
      'Each of these can be put off for a year at no real cost, and postponable spending is where a change in expectations shows up.',
      'These are bought every week whatever anybody expects, so there is very little for a confidence shock to remove.',
    ],
  },
  'welfare-payments': {
    type: 'fillin',
    prompt: 'A government pays an extra $1bn, once to households out of work and once as a tax cut for high earners. Compare:',
    template: [
      'The payment out of work adds more to consumption because those households ___ most of what they receive',
      'The transfer itself is not part of G, because G counts spending on goods and ___',
      'Until it is spent, the transfer has bought ___',
    ],
    answers: ['spend', 'services', 'nothing'],
    hints: ['what a household does with money it needs immediately', 'the second half of the phrase after goods', 'how much output a transfer buys on the day it is paid'],
    distractors: ['save', 'assets', 'capital'],
  },
  'wealth-effects': {
    type: 'fillin',
    prompt: 'Share prices rise sharply. Nobody’s pay changes. Apply the leaf:',
    template: [
      'Households that hold shares are richer, so what has risen is their ___ and not their income',
      'They choose to save a smaller share of an unchanged income, so ___ rises',
      'Because the cause is an asset price and not the price level, the curve ___',
    ],
    answers: ['wealth', 'consumption', 'shifts'],
    hints: ['the stock of what a household owns', 'the component households are responsible for', 'what a curve does when the cause is off the axes'],
    distractors: ['earnings', 'saving', 'steepens'],
  },
  'availability-of-credit': {
    type: 'classify',
    prompt: 'A bank makes each of these changes. Sort them into availability of credit or interest rates:',
    groups: [
      { name: 'Availability of credit', items: ['Applicants without a permanent contract are turned away', 'The longest term on offer is cut from twenty years to ten', 'Every application now needs two years of accounts'] },
      { name: 'Interest rates', items: ['The same loan now carries one percentage point more'] },
    ],
    why: [
      'None of these changes the price of borrowing: they change who is allowed to borrow and on what terms, which is the availability influence.',
      'This one changes what the borrowing costs and nothing else, which is the price influence and a separate line on the specification.',
    ],
  },
  'saving-and-consumption': {
    type: 'fillin',
    prompt: `A household has ${money(500)} of disposable income each week and saves ${money(80)} of it. Apply the relationship:`,
    template: [
      `Its weekly consumption is ___`,
      `It decides to save ${money(20)} more out of the same income, so its consumption falls by ___`,
      'Whatever it does, consumption and saving must add to ___',
    ],
    answers: [money(420), money(20), money(500)],
    hints: ['the income with the saving taken off', 'the amount the saving went up by', 'the income the household started with'],
    distractors: [money(580), money(80)],
  },
  'the-savings-ratio': {
    type: 'fillin',
    prompt: `An economy has ${bn(500)} available to households after tax, and they save ${bn(60)} of it. Work out the ratio:`,
    template: [
      'The savings ratio is ___',
      `The share of that ${bn(500)} which is consumed is ___`,
      `Consumption is therefore ___`,
    ],
    answers: [pct(12), pct(88), bn(440)],
    hints: ['the saving divided by the income, as a percentage', 'what is left when the ratio is taken from a hundred', 'that share applied to the income'],
    distractors: [pct(8.3), pct(80), bn(560)],
  },
  'changes-in-the-savings-ratio': {
    type: 'fillin',
    prompt: `Disposable income stays at ${bn(AD.Yd)} and the savings ratio falls from ${pct(AD.ratio)} to ${pct(AD.ratioDown)}. Work it through:`,
    template: [
      'Saving is now ___',
      'Consumption is now ___',
      `With the other three components unchanged, aggregate demand has risen by ___`,
    ],
    answers: [bn(AD.savingCase(AD.ratioDown).saved), bn(AD.savingCase(AD.ratioDown).spent), bn(AD.savingCase(AD.ratioDown).ad.total - AD.total)],
    hints: ['the income multiplied by the new ratio', 'the income with that saving taken off', 'the amount consumption went up by'],
    distractors: [bn(200), bn(600)],
  },

  'gross-and-net-investment': {
    type: 'fillin',
    prompt: `An economy spends ${bn(90)} on capital goods in a year in which ${bn(105)} of capital wears out. Apply the leaf:`,
    template: [
      'Net investment is ___',
      'The capital stock at the end of the year is ___ than at the start',
      `The figure that enters aggregate demand is ___`,
    ],
    answers: [bn(-15), 'smaller', bn(90)],
    hints: ['the spending with the wearing-out taken off', 'the direction a negative net figure points', 'the spending itself, before anything is taken off'],
    distractors: [bn(15), 'larger', bn(105)],
  },
  'the-rate-of-economic-growth': {
    type: 'classify',
    prompt: 'Sort each firm by whether the news is likely to make it order new plant:',
    groups: [
      { name: 'Orders new plant', items: ['Running at ninety-five per cent of capacity, and demand is expected to keep rising', 'Turning away orders it has no line to fill'] },
      { name: 'Does not', items: ['Running at sixty per cent of capacity, and demand is expected to rise a little', 'Growing, but expecting growth to be slower next year than the plant already ordered will cover'] },
    ],
    why: [
      'Both are at the limit of what existing capital can do, so more demand cannot be served without buying capacity.',
      'Both can serve more demand with the capital they already have, which is why output can rise without investment rising.',
    ],
  },
  'interest-rates-and-investment': {
    type: 'fillin',
    prompt: `A project costs ${money(800)} and is expected to add ${money(56)} a year. The interest rate is ${pct(8)}. Decide it:`,
    template: [
      'The expected rate of return is ___',
      `The annual interest on ${money(800)} at ${pct(8)} is ___`,
      'So the project ___ go ahead',
    ],
    answers: [pct(7), money(64), 'does not'],
    hints: ['the yearly gain as a percentage of the outlay', 'the outlay multiplied by the rate', 'the verdict when the return is below the rate'],
    distractors: [pct(14), money(56), 'does'],
  },
  'business-confidence-and-expectations': {
    type: 'fillin',
    prompt: `The ${money(AD.project.cost)} machine was expected to add ${money(AD.project.yearly)} a year. The firm now expects half that. The interest rate is ${pct(AD.project.interestLow)}:`,
    template: [
      'The expected return is now ___ a year',
      'As a rate of return on the outlay that is ___',
      `Against an interest rate of ${pct(AD.project.interestLow)}, the project now ___`,
    ],
    answers: [money(20), pct(4), 'fails'],
    hints: ['half of the original yearly figure', 'that yearly figure as a percentage of the outlay', 'the verdict when the return falls below the rate'],
    distractors: [money(40), pct(8), 'passes'],
  },
  'availability-of-credit-for-firms': {
    type: 'classify',
    prompt: 'A small firm with a profitable project is refused funding. Sort the reasons into availability or price:',
    groups: [
      { name: 'Availability', items: ['The bank now wants half the cost put up by the firm', 'The firm has no property it can pledge as security', 'The bank has stopped lending to firms in this industry'] },
      { name: 'Price', items: ['The loan would now cost two percentage points more'] },
    ],
    why: [
      'Each of these is a condition rather than a price: the money is not on offer to this firm at any rate, which is why the specification lists availability separately.',
      'Here the money is available and the question is only what it costs, which is the interest-rate influence.',
    ],
  },
  'tax-on-company-profits': {
    type: 'fillin',
    prompt: `A project costs ${money(1000)} and earns ${money(90)} a year before tax. The profit tax is ${pct(30)}:`,
    template: [
      'The firm keeps ___ a year',
      'The rate of return it can compare with the interest rate is ___',
      `At an interest rate of ${pct(7)} the project ___`,
    ],
    answers: [money(63), pct(6.3), 'fails'],
    hints: ['the yearly figure with the tax share removed', 'what the firm keeps as a percentage of the outlay', 'the verdict when the kept return is below the rate'],
    distractors: [money(27), pct(9), 'passes'],
  },
  'tax-relief-and-subsidies': {
    type: 'fillin',
    prompt: `A machine costs ${money(600)} and earns ${money(48)} a year. A subsidy of ${money(150)} is offered:`,
    template: [
      'The firm now pays ___ for the machine',
      'Its rate of return becomes ___',
      'The policy worked on what the asset ___, not on what it earns',
    ],
    answers: [money(450), pct(10.67), 'costs'],
    hints: ['the price with the subsidy taken off', 'the yearly gain over the price the firm actually paid', 'the side of the comparison a subsidy changes'],
    distractors: [money(750), pct(8)],
  },
  'lower-corporation-tax': {
    type: 'classify',
    prompt: `The profit tax is cut from ${pct(30)} to ${pct(20)}. Sort each firm by whether its behaviour changes:`,
    groups: [
      { name: 'Behaviour changes', items: ['A firm whose kept return was just below the interest rate', 'A firm with a project it shelved last year for being marginal'] },
      { name: 'Behaviour does not', items: ['A firm whose project was going ahead anyway', 'A firm making a loss, so it pays no profit tax at all'] },
    ],
    why: [
      'Both were close to the line, so a rise in what they keep is enough to move the project from rejected to accepted.',
      'One was already investing and simply keeps more; the other has no taxable profit for a lower rate to act on, so a cut reaches neither decision.',
    ],
  },

  'fiscal-policy': {
    type: 'fillin',
    prompt: `Government spending on goods and services goes from ${bn(AD.G)} to ${bn(260)}, with every other component unchanged:`,
    template: [
      'Aggregate demand rises by ___',
      'At the old price level the quantity demanded is larger, so the curve moves to the ___',
      'A tax cut of the same size would add ___ to aggregate demand, because households save part of it',
    ],
    answers: [bn(AD.compose({ g: 260 }).total - AD.total), 'right', 'less'],
    hints: ['the amount the third term went up by', 'the direction of an increase', 'the comparison when only part of the money is spent'],
    distractors: [bn(480), 'left', 'more'],
  },
  'the-level-of-economic-activity': {
    type: 'classify',
    prompt: 'Sort each change in government spending by whether somebody decided it:',
    groups: [
      { name: 'Decided', items: ['A budget raises the schools programme by a fifth', 'A minister announces a new rail line'] },
      { name: 'Not decided', items: ['Payments to households out of work rise as a factory closes', 'Tax receipts fall because profits are lower this year'] },
    ],
    why: [
      'Both required somebody to choose and could be reversed by a later choice, which is what makes them fiscal policy.',
      'Neither was announced: the rules already existed and the spending and receipts followed the economy on their own.',
    ],
  },
  'correction-of-market-failures': {
    type: 'classify',
    prompt: 'A government is deciding what to buy. Sort each case by what it does to G:',
    groups: [
      { name: 'G rises', items: ['A coastline has no flood barrier because no seller can charge the people it would protect', 'Vaccination is bought privately by far fewer people than would benefit from it'] },
      { name: 'G does not rise', items: ['A market is already supplying as much of a good as the economy wants', 'The government decides the shortfall is not large enough to be worth the spending'] },
    ],
    why: [
      'In both cases the market on its own leaves a gap between what is bought and what is worth buying, and closing that gap is a purchase of goods or services — so it enters G.',
      'Neither of these is a gap the government has decided to close, so nothing is bought and the identity does not move. The influence is on the SIZE of G, which is the leaf; naming the kind of failure is Unit 1\u2019s.',
    ],
  },
  'political-priorities': {
    type: 'fillin',
    prompt: 'A new government moves $30bn of spending from defence procurement to rural clinics, and changes the total by nothing:',
    template: [
      'G in the identity is ___',
      'Aggregate demand this year is therefore ___',
      'What has changed is the ___ of government spending rather than its size',
    ],
    answers: ['unchanged', 'unchanged too', 'composition'],
    hints: ['what happens to a total that did not move', 'the same verdict, applied to the whole identity', 'the word for how a total is divided up'],
    distractors: ['larger', 'smaller', 'level'],
  },

  'real-income-and-imports': {
    type: 'fillin',
    prompt: `Exports are ${bn(200)} and imports ${bn(230)}. Domestic real income rises and imports go up by ${bn(20)}:`,
    template: [
      'The net trade balance was ___',
      'It is now ___',
      'Exports are ___, because foreign buyers do not observe this economy’s income',
    ],
    answers: [bn(-30), bn(-50), 'unchanged'],
    hints: ['exports with imports taken off, before the rise', 'the same subtraction with the larger import figure', 'what happens to a figure nothing has acted on'],
    distractors: [bn(30), bn(-10), 'higher'],
  },
  'the-exchange-rate': {
    type: 'fillin',
    prompt: 'The rate moves from 8 units per dollar to 10. A good is priced at 2,400 units at home and an import at $50 abroad:',
    template: [
      'The export now costs a foreign buyer ___',
      'The import now costs ___ units at home',
      'One unit was worth $0.125 and is now worth $0.10, so the currency has fallen by ___',
    ],
    answers: [money(240), qty(500), pct(20)],
    hints: ['the home price divided by the new quote', 'the dollar price multiplied by the new quote', 'the fall in what one unit is worth, as a percentage'],
    distractors: [money(300), qty(400), pct(25)],
  },
  'the-state-of-the-global-economy': {
    type: 'classify',
    prompt: 'Sort each event by which side of the trade balance it acts on first:',
    groups: [
      { name: 'Acts on exports', items: ['The two economies that buy most of this country’s output enter a recession', 'A large trading partner grows faster than expected'] },
      { name: 'Acts on imports', items: ['Households here become richer and buy more of everything', 'A rise in domestic real income raises spending on foreign cars'] },
    ],
    why: [
      'Exports are foreign buyers’ spending, so what moves them is the real income of the countries doing the buying.',
      'Imports are residents’ spending on foreign output, so what moves them is the real income of the residents.',
    ],
  },
  'degree-of-protectionism': {
    type: 'fillin',
    prompt: `An import is priced at ${money(200)} abroad. A tariff of ${pct(15)} is imposed at home, and the partner responds with the same tariff on this country’s exports:`,
    template: [
      'The import now costs a buyer here ___',
      'Imports fall, so on that account the net trade balance ___',
      'The partner’s tariff makes this country’s exports dearer abroad, so ___ falls',
    ],
    answers: [money(230), 'improves', 'X'],
    hints: ['the price with the tariff added on', 'the direction when the subtracted term gets smaller', 'the letter for the term the partner’s tariff acts on'],
    distractors: [money(170), 'worsens', 'M'],
  },
  'non-price-factors': {
    type: 'classify',
    prompt: 'Two exporters charge exactly the same price. Sort what would still move orders between them:',
    groups: [
      { name: 'Non-price factors', items: ['One has never missed a promised shipping date', 'One answers a complaint the same day', 'One updates its design every two years'] },
      { name: 'Not a non-price factor', items: ['One country’s currency weakens against the buyer’s'] },
    ],
    why: [
      'None of these is a price, and each of them can decide an order between two suppliers charging the same amount.',
      'A currency move changes what the buyer pays, so it belongs to the exchange-rate influence rather than this one.',
    ],
  },
};

export const ATTACH_SLUGS = Object.keys(ATTACH);
for (const sec of SUBSECTIONS) {
  const slug = sec.id.replace(`${SECTION}:sub:`, '');
  if (sec.recall) continue;
  if (ATTACH[slug]) sec.recall = recall(sec.id, ATTACH[slug]);
}

/* ══ Notes ════════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, IN THE SAME ORDER, CARRYING THE SAME FIGURES FROM THE SAME MODULE, so
 * the two surfaces cannot drift apart without the build failing. `depth.notes-titles` requires every
 * Notes title to be taught in Learn Mode, which holds by construction when the titles ARE the block
 * titles.
 *
 * A WARNING FOR VERIFY B: notes are a FREE surface and ship in the server-rendered page from the
 * `data` column, so a `?draft=1` walk shows these notes only after publication. Until then the page
 * shows the old headings beside this packet's Learn Mode (DECISIONS, 16 September). Verify the notes
 * against the `draft` column, not against the page.
 */
const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '4 leaves',
    keyIdea: 'The concept of AD, the identity, the curve and the distinction that every later chapter depends on.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Aggregate demand</strong> — total planned spending on a country’s own output at each price level, over a period.'),
        def(`<strong>The identity</strong> — AD = C + I + G + (X − M). Here ${bn(AD.C)} + ${bn(AD.I)} + ${bn(AD.G)} + (${bn(AD.X)} − ${bn(AD.M)}) = ${bn(AD.total)}.`),
        def('<strong>Movement along AD</strong> — a change in the PRICE LEVEL, which is on an axis, so the position on the curve changes.'),
        def('<strong>Shift of AD</strong> — a change in anything else, so the curve itself moves at every price level.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('The curve slopes down for three reasons, all starting at the price level: the wealth effect on money already held, the interest-rate effect through the demand for money on to MARKET rates, and the trade effect on (X − M).'),
        mech(`Shares of the ${bn(AD.total)}: C ${pct(AD.shareOf(AD.C))}, I ${pct(AD.shareOf(AD.I))}, G ${pct(AD.shareOf(AD.G))}, (X − M) ${pct(AD.shareOf(AD.netTrade))}. Largest is not the same property as most volatile.`),
        link('A central bank CHOOSING to raise its policy rate is not the interest-rate effect: it is a change at an unchanged price level, so it shifts AD left.'),
      ] },
    ],
    takeaway: [
      'Planned spending, on a country’s OWN output, over a period.',
      'C is the largest and steadiest; I is the smallest of the three and the most volatile.',
      'Price level changed? Movement. Anything else changed? Shift.',
    ],
  },
  {
    title: B2,
    meta: '9 leaves',
    keyIdea: 'Six influences on consumption, and the identity that turns every one of them into a statement about saving.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def(`<strong>Disposable income</strong> — income after direct tax and after benefits: ${bn(AD.Yd)} here.`),
        def(`<strong>Saving</strong> — the part of disposable income not consumed. ${bn(AD.Yd)} − ${bn(AD.C)} = ${bn(AD.S)}.`),
        def(`<strong>Savings ratio</strong> — saving as a percentage of disposable income: ${pct(AD.ratio)}.`),
        def(`<strong>The six influences</strong> — ${CONSUMPTION.map(([k]) => k).join(', ')}.`),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Interest rates act twice: on the cost of debt and the reward for saving. Households owing ${bn(AD.debt)} pay ${bn(AD.interestOnDebt(AD.rateLow))} at ${pct(AD.rateLow)} and ${bn(AD.interestOnDebt(AD.rateHigh))} at ${pct(AD.rateHigh)} — ${bn(AD.interestRise)} out of consumption.`),
        mech('Availability of credit is whether a bank will lend; interest rates are what lending costs. They can move in opposite directions.'),
        mech(`Ratio to ${pct(AD.ratioUp)} on unchanged income: S ${bn(AD.savedUp)}, C ${bn(AD.spentUp)}, AD ${bn(AD.afterSaving.total)}.`),
        link('Welfare payments belong to consumption, not to G: a transfer buys nothing until the household spends it.'),
      ] },
    ],
    takeaway: [
      'Disposable income is the influence the other five modify.',
      'Price of credit and availability of credit are two separate influences.',
      'Yd = C + S, so every statement about one is a statement about the other.',
    ],
  },
  {
    title: B3,
    meta: '9 leaves',
    keyIdea: 'Gross against net investment, five influences and three policy tools — and all of them meet in one comparison.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def(`<strong>Gross investment</strong> — all spending on capital goods: ${bn(AD.I)}. This is what enters AD.`),
        def(`<strong>Depreciation</strong> — the capital used up over the period: ${bn(AD.depreciation)}.`),
        def(`<strong>Net investment</strong> — gross minus depreciation: ${bn(AD.netInvestment(AD.I))}, and it can be negative.`),
        def(`<strong>The five influences</strong> — ${INVESTMENT.map(([k]) => k).join(', ')}.`),
        def(`<strong>The three policy tools</strong> — ${INVESTMENT_POLICY.map(([k]) => k).join(', ')}.`),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`One project carries the chapter: ${money(AD.project.cost)} for ${money(AD.project.yearly)} a year is ${pct(AD.project.rateOfReturn)} before tax. It beats ${pct(AD.project.interestLow)} and fails ${pct(AD.project.interestHigh)}.`),
        mech(`Tax on profits cuts what is KEPT: at ${pct(AD.project.profitTax)} the return is ${pct(AD.project.returnAfterTax(AD.project.profitTax))}; at ${pct(AD.project.profitTaxHigh)} it is ${pct(AD.project.returnAfterTax(AD.project.profitTaxHigh))}.`),
        mech(`Subsidy and relief cut what is PAID, both priced on the SAME kept ${money(AD.project.kept)}: ${money(AD.project.subsidy)} off gives ${pct(AD.project.returnAfterSubsidy)}, relief worth ${money(AD.project.reliefWorth)} gives ${pct(AD.project.returnAfterRelief)}.`),
        link('Confidence is not an extra to mention at the end: it sets the expected return, which is one half of the comparison.'),
      ] },
    ],
    takeaway: [
      'Gross enters AD; net decides next year’s capacity and can be negative.',
      'Every influence acts on the expected return KEPT, or on the interest rate it is compared with.',
      'Subsidies and relief change the outlay; a lower profit tax changes the return.',
    ],
  },
  {
    title: B4,
    meta: '4 leaves',
    keyIdea: 'Four influences on G, and only one of them is not somebody’s decision.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Government expenditure (G)</strong> — government spending on goods and services. Transfers are not part of it.'),
        ...GOVERNMENT.map(([k, short, what]) => def(`<strong>${short}</strong> — ${what}.`)),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`G from ${bn(AD.G)} to ${bn(AD.afterFiscal.G)} takes AD from ${bn(AD.total)} to ${bn(AD.afterFiscal.total)}: a rise of ${pct(AD.changeIn(AD.afterFiscal))} at every price level.`),
        mech(`A downturn raises payments and lowers receipts with no decision: G to ${bn(AD.afterDownturn.G)} on its own, working against the cycle.`),
        link('Political priorities mostly move the COMPOSITION of G, which can leave AD unchanged and still change what the economy can produce later.'),
      ] },
    ],
    takeaway: [
      'G is the component a government moves directly.',
      'The level of economic activity moves G with nobody deciding anything.',
      'A tax cut of the same size adds less to AD, because part of it is saved.',
    ],
  },
  {
    title: B5,
    meta: '5 leaves',
    keyIdea: 'Five influences on (X − M), and a pair of mirror images that makes four of them one idea.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def(`<strong>Net trade balance</strong> — exports minus imports: ${bn(AD.X)} − ${bn(AD.M)} = ${bn(AD.netTrade)}.`),
        def('<strong>Depreciation of a currency</strong> — a fall in what one unit of it is worth in foreign currency.'),
        def('<strong>Tariff</strong> — a tax on an imported good, paid by the buyer in the importing country.'),
        def(`<strong>Non-price factors</strong> — ${NET_TRADE[4][2]}.`),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Domestic real income moves M and leaves X alone: ${bn(AD.incomeRise)} more spending takes ${bn(AD.importsFromIncome)} abroad, so (X − M) goes from ${bn(AD.netTrade)} to ${bn(AD.afterIncome.netTrade)}. Foreign real income does the mirror image.`),
        mech(`Exchange rate ${qty(AD.fx.before)} to ${qty(AD.fx.after)} units per dollar: an export at ${qty(AD.fx.exportPrice)} units falls from ${money(AD.fx.exportCostsAbroad(AD.fx.before))} to ${money(AD.fx.exportCostsAbroad(AD.fx.after))} abroad; an import at ${money(AD.fx.importPrice)} rises from ${qty(AD.fx.importCostsAtHome(AD.fx.before))} to ${qty(AD.fx.importCostsAtHome(AD.fx.after))} units at home.`),
        mech(`A ${pct(AD.tariff)} tariff takes an import from ${money(AD.fx.importPrice)} to ${money(AD.tariffPrice(AD.fx.importPrice))} at home. The same tool abroad acts on X.`),
        link(`That quote moving is a ${pct(AD.fx.quoteRise)} rise in the quote and a ${pct(AD.fx.depreciation)} fall in the currency. Work in what a unit is worth.`),
      ] },
    ],
    takeaway: [
      'Domestic income moves M; foreign income moves X.',
      'A depreciation makes exports cheaper abroad and imports dearer at home.',
      'Protectionism can shrink both terms, and non-price factors move trade with no price change.',
    ],
  },
];
