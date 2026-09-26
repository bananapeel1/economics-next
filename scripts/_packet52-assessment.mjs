/**
 * PACKET 52 — role-state-macroeconomy assessment: the quiz bank, the practice set, the flashcards,
 * the common mistakes and the extras.
 *
 * ── THE BANK IS REBUILT, NOT EDITED ──────────────────────────────────────────
 *
 * The live bank was twelve items, and structure-01's finding was that none of them tested what
 * the four live subsections taught (public goods, merit goods, UBI) while all of them tested what
 * the section never taught (transfer payments, Laffer, deficit and debt, automatic stabilisers,
 * crowding out, the structural deficit, transfer pricing, the 2008 response). One of them,
 * `quiz[10]`, tested the incidence of an indirect tax, which is 1.3.4 · 4b (`econ_spec.txt:713`),
 * not 4.3.5; it is not carried over. Every item here is authored against a chapter that teaches
 * it, and the runner refuses a quiz term no subsection teaches and a near-duplicate stem.
 *
 * ── THE PINS ARE DERIVED ─────────────────────────────────────────────────────
 *
 * Every item carries its block; `quizIndices` / `practiceIndices` are derived from the tag by the
 * runner, so a chapter's check-in cannot show another chapter's item (structure-02, topFix-02).
 * The FIRST item tagged to a block is its check-in, and each is written about something that
 * block's diagram does not show (CONTENT-GATE, "The check-in answer rule").
 *
 * ── THE PRACTICE SET FOLLOWS THE WEC14 PAPER ─────────────────────────────────
 *
 * The live five were "Define (4)", "Explain … (6)", "Assess … (10)", "Evaluate (20)" and "Outline
 * (4)" — four of five illegal in IAL Economics (topFix-04, practice-01). topFix-04 proposed keeping
 * practice[2] as an "Assess" with levels guidance and replacing "Outline" with "Distinguish
 * between": neither word is an IAL Economics command word (Appendix 6, `econ_spec.txt:2696-2745`),
 * so both are rebuilt at real command words instead. DECISIONS 2026-09-26 shapes practice on the
 * unit's paper. WEC14 is B: one data question 2/4/6/8/14 (Define or Calculate, Explain, Analyse,
 * Examine, Discuss) and C: two 20-mark essays from three (`audit/raw/ial-paper-structure.json`).
 */
import { id, hash8, ECON, bn, pct, money, mnd } from './_packet52-util.mjs';
import { B1, B2, B3, B4, B5, B6, B7 } from './_packet52-content.mjs';

const E = ECON;

/* ══ Quiz ════════════════════════════════════════════════════════════════ */

/** An item, authored KEY FIRST. `block` is null for the three pre-test items. */
const qi = (block, question, options, explanation) => ({
  id: id('quiz', question), block, question, options, explanation,
});

/*
 * EVERY ITEM IS AUTHORED WITH ITS KEY FIRST AND THE KEY IS THEN DEALT INTO A POSITION by ranking the
 * items on a hash of their own stem (packet 36). No explanation names an option by position or by
 * letter, because the dealing moves the key after the explanation was written.
 */
const placeKeys = (items) => {
  const rank = new Map(items.map((x, i) => [i, hash8(x.question)])
    .sort((a, b) => (a[1] < b[1] ? -1 : 1))
    .map(([i], r) => [i, r % 4]));
  return items.map((x, i) => {
    const slot = Math.min(rank.get(i), x.options.length - 1);
    return { ...x, options: [...x.options.slice(1, slot + 1), x.options[0], ...x.options.slice(slot + 1)], correctIndex: slot };
  });
};

export const QUIZ = placeKeys([
  /* ── the pre-test pool: three items, unpinned, FIRST, all answerable from chapter one ── */
  qi(null, 'Which of these is a transfer payment?',
    ['a state pension paid to a retired worker', 'the salary of a public school teacher', 'the cost of building a new bridge', 'medicines bought for state hospitals'],
    'A transfer payment moves income from taxpayers to a person without the government receiving any good or service in return, as a pension does. Salaries and medicines are current spending, and a bridge is capital spending.'),
  qi(null, 'Capital expenditure by a government is spending on:',
    ['assets such as roads and hospitals that last for years', 'wages and running costs used up within the year', 'benefits paid to households with nothing produced in return', 'goods bought only from foreign suppliers'],
    'Capital expenditure buys assets that the state will use for years and that add to the economy\'s capital stock. Spending used up within the year is current expenditure, and benefits are transfers.'),
  qi(null, 'A rising share of people over 65 changing a country\'s public spending is an example of which reason in the specification?',
    ['changing age distributions', 'changing incomes', 'changing expectations', 'crowding out'],
    'The specification gives three reasons for the changing size and pattern of public expenditure. A shift in the share of each age group is a changing age distribution; it raises pension and health spending.'),

  /* ── Block 1 · Public Expenditure ─────────────────────────────────────── */
  qi(B1, 'Across countries, as GDP per head rises, public spending as a share of GDP tends to:',
    ['rise, as demand for health and education grows', 'fall, as households buy their own services', 'stay at exactly the same share', 'fall to zero in high-income economies'],
    'Demand for health care, education and pensions grows faster than income, and the state provides much of it, so richer economies usually spend a larger share of GDP through the state. A larger tax base also makes that affordable.'),
  qi(B1, 'An ageing population is most likely to raise public spending on:',
    ['pensions and health care', 'primary school places', 'maternity and child clinics', 'grants for new university students'],
    'More people over 65 means more state pensions, which are transfers, and much more health care. Spending on schools and children\'s services is driven by a young population.'),
  qi(B1, 'Unemployment benefit paid to a worker who has lost her job is classified as:',
    ['a transfer payment', 'current expenditure', 'capital expenditure', 'an indirect tax'],
    'The government receives no good or service in return for the benefit; it moves income to the worker. That makes it a transfer payment rather than current or capital spending on output.'),
  qi(B1, 'After a pandemic, voters insist that the government keep the wage support it introduced during the emergency. This illustrates:',
    ['changing expectations', 'changing age distributions', 'crowding out', 'a structural surplus'],
    'What citizens believe the state should provide has changed: support introduced in a crisis comes to be expected. That is the reason the specification calls changing expectations.'),
  qi(B1, 'A government spends $20bn on capital projects, $70bn on current spending and $30bn on transfers. GDP is $400bn. Public expenditure as a share of GDP is:',
    ['30%', '22.5%', '25%', '17.5%'],
    'Public expenditure includes all three kinds: 20 + 70 + 30 = $120bn, and 120 ÷ 400 × 100 = 30%. Leaving out the transfers gives 22.5%, which understates it.'),

  /* ── Block 2 · Public Spending as a Share of GDP ──────────────────────── */
  qi(B2, 'Crowding out is least likely to occur when:',
    ['the economy is in a deep recession with idle savings', 'the economy is at full employment', 'interest rates are already high and rising', 'firms are competing hard for scarce loans'],
    'With spare capacity and savings lying unused, government borrowing need not bid up interest rates or take resources from firms. Near full employment, with high rates and competition for funds, crowding out is greatest.'),
  qi(B2, 'Crowding out mainly occurs because government borrowing:',
    ['raises interest rates, so private investment falls', 'lowers taxes, so consumption rises', 'increases exports, so imports fall', 'reduces the national debt, so rates fall'],
    'The state competes with private borrowers for savers\' funds, pushing up interest rates. Projects that were worth doing at the lower rate are postponed, so private investment falls.'),
  qi(B2, 'Which public spending is most likely to raise long-run productivity?',
    ['building rail links to industrial zones', 'paying fuel subsidies to motorists', 'raising civil service pensions', 'covering a state bank\'s losses'],
    'Transport links to where firms produce cut their costs and add to the economy\'s capital stock, so output per worker rises. The other items are used up now or keep resources in low-value uses.'),
  qi(B2, 'Compared with a country whose public spending is 20% of GDP, one whose spending is 50% of GDP will usually need:',
    ['a higher share of GDP taken in tax', 'no taxes on income at all', 'lower interest rates on its debt', 'a smaller national debt'],
    'Spending must be paid for. Borrowing can fill a gap for a while, but over time a state that spends half of GDP must raise far more in tax than one that spends a fifth.'),
  qi(B2, 'A government borrows an extra $50bn to spend, and private investment falls by $15bn as interest rates rise. The share of the extra spending crowded out is:',
    ['30%', '70%', '15%', '35%'],
    'The share crowded out is the fall in private spending over the rise in public spending: 15 ÷ 50 × 100 = 30%. The other 70% is the net addition to total spending.'),

  /* ── Block 3 · Taxes: Types, Incentives and Revenue ───────────────────── */
  qi(B3, 'A worker\'s marginal rate of income tax rises from 20% to 30%. Of an extra $500 she earns, she now keeps:',
    ['$350', '$400', '$150', '$450'],
    'At a marginal rate of 30% she keeps 70% of the extra $500, which is $350; at 20% she kept $400. The lower reward for extra work is how a tax rise can weaken the incentive to work.'),
  qi(B3, 'Which of these is an indirect tax?',
    ['excise duty on cigarettes', 'corporation tax on profits', 'income tax on wages', 'a tax on inherited property'],
    'An indirect tax is levied on spending and passed on in the price, as a duty on cigarettes is. Taxes on profits, wages and inheritances are levied on income or wealth, so they are direct.'),
  qi(B3, 'A tax takes 4% of a $10,000 income and 2% of a $50,000 income. The tax is:',
    ['regressive', 'progressive', 'proportional', 'a direct tax by definition'],
    'The share of income taken falls as income rises, which is what makes a tax regressive, even though the richer household may pay more in dollars.'),
  qi(B3, 'According to Laffer curve analysis, cutting a tax rate will raise tax revenue only if:',
    ['the rate is above the revenue-maximising rate', 'the rate is below the revenue-maximising rate', 'the tax is an indirect tax', 'the tax base does not change'],
    'Above the peak, a lower rate lets the tax base grow by more than enough to make up for the lower rate. Below the peak, a cut loses revenue because the base grows too little.'),
  qi(B3, 'Which tax change is most likely to reduce income inequality after tax?',
    ['raising the tax-free allowance for low earners', 'raising the standard rate of VAT', 'cutting the top rate of income tax', 'replacing income tax with a flat charge per adult'],
    'Taking the lowest earners out of income tax is a large gain for them as a share of income and a small one for the rich. Higher VAT, a lower top rate and a flat charge all take relatively more from low incomes.'),
  qi(B3, 'A sales tax is usually regressive because:',
    ['lower-income households spend a larger share of their income', 'richer households pay a higher rate on each purchase', 'it is collected only from firms', 'it is charged only on luxury goods'],
    'Everyone pays the same rate on a purchase, but poorer households spend most of what they earn while richer ones save more, so the tax takes a larger share of a low income.'),

  /* ── Block 4 · Tax Changes and the Macroeconomy ───────────────────────── */
  qi(B4, 'A cut in corporation tax is most likely to attract extra FDI when:',
    ['rival locations are similar on skills, markets and stability', 'the country lacks roads and reliable power', 'every neighbour cuts its rate by the same amount', 'profits cannot be taken out of the country'],
    'TNCs choose locations above all for markets, skills and stability. Tax tips the choice between places that are otherwise alike; it cannot make up for missing infrastructure, and a cut that every neighbour matches changes nothing.'),
  qi(B4, 'A rise in the rate of VAT is best shown on an AD/AS diagram as:',
    ['a leftward shift of short-run aggregate supply', 'a rightward shift of aggregate demand', 'a rightward shift of long-run aggregate supply', 'no shift of any curve'],
    'An indirect tax is a cost of production passed on in prices, so SRAS shifts to the left: the price level rises and real output falls.'),
  qi(B4, 'Income tax is cut by $40bn and the marginal propensity to import is 0.2. Imports rise by about:',
    ['$8bn', '$32bn', '$20bn', '$2bn'],
    'Imports rise by the extra disposable income times the share spent on imports: 40 × 0.2 = $8bn. With exports unchanged, the trade balance worsens by that amount.'),
  qi(B4, 'An income tax cut is most likely to raise real output rather than only the price level when:',
    ['the economy has plenty of spare capacity', 'firms cannot hire any more workers', 'the whole cut is spent on imports', 'the economy is already at full employment'],
    'With idle workers and machines, firms meet extra demand by producing more. At full capacity, extra demand mostly raises prices; spending that goes entirely on imports adds nothing to home output.'),
  qi(B4, 'A project earns $10m a year before tax. If corporation tax is cut from 30% to 20%, the firm\'s profit after tax rises from:',
    ['$7m to $8m', '$3m to $2m', '$10m to $12m', '$7m to $9m'],
    'At 30% the firm keeps 70% of $10m, which is $7m; at 20% it keeps $8m. The higher return after tax is what can draw in foreign direct investment.'),

  /* ── Block 5 · Fiscal Deficits and the National Debt ──────────────────── */
  qi(B5, 'Borrowing is most likely to be fair between generations when it pays for:',
    ['a railway that will carry passengers for decades', 'a one-off cut in fuel prices', 'higher pay for current civil servants', 'a bonus for this year\'s pensioners'],
    'Future taxpayers who service and repay the debt also benefit from an asset that lasts. Spending used up now gives today\'s generation the benefit and leaves a later one the bill.'),
  qi(B5, 'A government\'s national debt falls in dollars only when it:',
    ['runs a fiscal surplus', 'reduces the size of its fiscal deficit', 'runs a smaller cyclical deficit', 'borrows at lower interest rates'],
    'Any deficit, however small, is borrowed and added to the debt. Only when revenue exceeds spending is there money left to repay debt.'),
  qi(B5, 'Which of these is an automatic stabiliser?',
    ['income tax receipts falling as earnings fall in a recession', 'a road-building programme announced in a recession', 'a temporary cut in VAT voted through parliament', 'a one-off grant to households approved by ministers'],
    'An automatic stabiliser needs no decision: tax receipts fall by themselves when earnings fall. A programme, a vote or an approved grant is discretionary fiscal policy.'),
  qi(B5, 'The structural deficit is the part of the fiscal deficit that:',
    ['would remain even with the economy at full capacity', 'disappears as the economy recovers from recession', 'is caused by the automatic stabilisers', 'is owed to lenders in other countries'],
    'The cyclical part is caused by the downturn and fades with recovery. What would be left at full capacity is structural, and needs a decision on taxes or spending to remove.'),
  qi(B5, 'A government owes $500bn at the start of the year and runs a fiscal deficit of $30bn. At the end of the year it owes:',
    ['$530bn', '$470bn', '$30bn', '$515bn'],
    'The deficit is borrowed and added to the stock of debt: 500 + 30 = $530bn. The deficit is the flow; the debt is the stock it adds to.'),
  qi(B5, 'A national debt of $300bn carries an average interest rate of 6%. Debt interest each year is about:',
    ['$18bn', '$50bn', '$6bn', '$1.8bn'],
    'Debt interest is the debt times the average interest rate: 300 × 6 ÷ 100 = $18bn a year, paid from revenue before any other spending.'),
  qi(B5, 'Which of these would widen a fiscal deficit with no new decision by the government?',
    ['a recession that cuts tax receipts', 'a new hospital-building programme', 'a vote to raise public sector pay', 'a budget that cuts income tax rates'],
    'In a recession tax receipts fall and benefit claims rise through the automatic stabilisers, widening the deficit without any policy choice. The other three are decisions.'),

  /* ── Block 6 · Macroeconomic Policies in Use ──────────────────────────── */
  qi(B6, 'In response to the global financial crisis of 2008, central banks in the largest economies:',
    ['cut interest rates close to zero', 'raised interest rates to defend their currencies', 'stopped all purchases of government bonds', 'imposed price controls on housing'],
    'Aggregate demand was collapsing, so central banks cut their policy rates towards zero and, in several cases, bought government bonds to increase the money supply. Governments added fiscal stimulus.'),
  qi(B6, 'Which of these is an example of a direct control?',
    ['a legal limit on the price of bread', 'a rise in the policy interest rate', 'a cut in the rate of VAT', 'a new scheme to train welders'],
    'A direct control sets an outcome by rule instead of working through prices and incentives. An interest rate change is monetary policy, a VAT cut is fiscal and training is supply-side.'),
  qi(B6, 'A country\'s inflation is caused by a jump in world oil prices. Raising interest rates to bring it down is likely to:',
    ['cut inflation at the cost of lower output and jobs', 'raise both inflation and output', 'leave output and employment unchanged', 'shift aggregate supply to the right'],
    'An oil price jump is a supply shock: prices are already up and output down. Squeezing demand lowers inflation only by reducing output and employment further.'),
  qi(B6, 'A government cuts public spending to reduce its deficit, but the deficit falls by less than planned. The main reason is that:',
    ['lower output cuts tax receipts and lifts benefit claims', 'interest rates on its existing debt fall sharply', 'the national debt is repaid in full at once', 'exports collapse as the currency strengthens'],
    'Spending cuts reduce aggregate demand; as output and incomes fall, the automatic stabilisers reduce tax receipts and raise benefit spending, offsetting part of the saving.'),
  qi(B6, 'A monthly cash transfer to poor families, paid only if their children attend school, reduces poverty now and also:',
    ['raises the children\'s future earning power', 'raises the price level permanently', 'reduces the national debt', 'attracts FDI through lower taxes'],
    'The condition builds human capital: children who stay in school earn more as adults, which is a supply-side route out of poverty as well as the transfer itself.'),
  qi(B6, 'A sudden rise in the world prices of food and fuel is best described as:',
    ['an external supply shock', 'an automatic stabiliser', 'discretionary fiscal policy', 'a structural deficit'],
    'It starts outside the economy and raises firms\' costs, shifting SRAS to the left, so it is an external shock on the supply side.'),

  /* ── Block 7 · TNCs and the Limits of Policy ──────────────────────────── */
  qi(B7, 'A central bank raises interest rates on the strength of a growth figure that is later revised down sharply. This illustrates the problem of:',
    ['inaccurate information', 'risks and uncertainties', 'an external shock', 'crowding out'],
    'The policy was based on data that turned out to be wrong. Inaccurate information is about the figures themselves; risks and uncertainties are about how a policy will work even when the figures are sound.'),
  qi(B7, 'Transfer pricing reduces a TNC\'s total tax bill when:',
    ['profit is shifted into a subsidiary in a low-tax country', 'every subsidiary pays the same rate of tax', 'it sells to independent firms at market prices', 'it pays its workers more in the high-tax country'],
    'By setting the internal price so that little profit is recorded where tax is high and more where it is low, the TNC pays less in total. If every country charged the same rate there would be nothing to gain.'),
  qi(B7, 'The arm\'s-length principle requires a transfer price to equal:',
    ['the price independent firms would agree', 'the cost of production in the home country', 'the price that minimises total tax', 'zero for trade within one firm'],
    'Regulators compare a transfer price with what two unrelated firms would agree in the market, and reassess tax where the internal price was set away from it.'),
  qi(B7, 'Which is the strongest limit on one government\'s ability to control a TNC?',
    ['the TNC can move production and profits abroad', 'TNCs are exempt from corporation tax', 'TNCs are not allowed to trade across borders', 'TNCs must publish every internal price'],
    'Mobility is the core limit: a government that taxes or regulates harshly risks losing the investment and jobs to another country, so acting alone it can go only so far.'),
  qi(B7, 'Tax avoidance differs from tax evasion because avoidance:',
    ['is legal, while evasion is not', 'is illegal, while evasion is not', 'applies only to indirect taxes', 'is carried out only by individuals'],
    'Avoidance arranges affairs within the law to pay less tax; evasion is illegal non-payment. That is why TNC avoidance is fought with new rules and agreements rather than prosecution.'),
  qi(B7, 'When US interest rates rise sharply, the most likely effect on the global economy is that:',
    ['emerging-economy currencies weaken as capital flows out', 'emerging economies can borrow more cheaply', 'world trade stops for a year', 'every exchange rate stays unchanged'],
    'Higher US returns draw capital out of emerging economies, so their currencies fall and their own borrowing costs rise: a policy change in one large economy with a global impact.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */

const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

const BANDS = 'A country\'s income tax charges nothing on the first $5,000 of income, 10% on income between $5,000 and $25,000, and 30% on income above $25,000.';

export const PRACTICE = [
  pr(B1, 'Define', 2, "Define the term 'transfer payments'. (2 marks)",
    `Two marks means two separate points. Say who pays whom, and then what makes this kind of spending different from paying a teacher or building a road.\nPayments made by the government to individuals, such as pensions, unemployment benefits or child grants (1 mark), for which no good or service is received in return, so they redistribute income rather than buy output (1 mark). An example alone, without the "nothing in return" point, earns only the first mark.`),

  pr(B2, 'Explain', 4, 'Explain how an increase in government borrowing to finance public expenditure may lead to crowding out. (4 marks)',
    `Appendix 6 wants linked stages for an Explain. Start from what the government does to raise the money, and follow it to what happens to private spending — each stage should cause the next.\nKnowledge: crowding out is a fall in private sector spending caused by a rise in public spending (1 mark). The government sells bonds and competes with private borrowers for savers' funds (1 mark). This pushes up interest rates across the economy (1 mark). At higher interest rates some private investment and borrowed consumption is no longer worthwhile, so the rise in total spending is smaller than the rise in public spending (1 mark).`),

  pr(B3, 'Calculate', 2, `${BANDS} Calculate the average rate of income tax paid by a person earning $40,000. (2 marks)`,
    `Calculate asks for the working as well as the answer (Appendix 6). Work band by band from the bottom, add up the tax, and only then turn it into a share of the whole income — the average rate is not the rate on the top slice.\nTax = 0 + 10% × $20,000 + 30% × $15,000 = $2,000 + $4,500 = $6,500 (1 mark). Average rate = $6,500 ÷ $40,000 × 100 = 16.25% (1 mark). Giving 30%, the marginal rate, earns no marks.`),

  pr(B3, 'Calculate', 4, `${BANDS} Calculate the average rate of income tax paid at incomes of $20,000 and $80,000, and use your answers to state whether the tax is progressive. (4 marks)`,
    `Calculate asks for workings (Appendix 6). Do each income separately, band by band, before comparing, and remember that the test of a tax structure is the share of income taken, not the dollars paid.\nAt $20,000: tax = 10% × $15,000 = $1,500 (1 mark); average rate = $1,500 ÷ $20,000 = 7.5% (1 mark). At $80,000: tax = $2,000 + 30% × $55,000 = $2,000 + $16,500 = $18,500; average rate = $18,500 ÷ $80,000 ≈ 23.1% (1 mark). The average rate rises as income rises, so the tax is progressive (1 mark).`),

  pr(B4, 'Analyse', 6, 'Analyse how an increase in the rate of an indirect tax may affect the price level and real output in an economy. (6 marks)',
    `Appendix 6 wants depth for an Analyse: one route followed through several linked stages. Decide first which curve moves, and why, before you describe what happens to prices and output.\nKnowledge: an indirect tax is a tax on spending, such as VAT or an excise duty (1 mark). Application: firms pass the higher tax on to buyers, raising their costs of supplying goods (1 mark). Analysis, first stage: short-run aggregate supply shifts to the left (1 mark). Analysis, second stage: the price level rises, a one-off rise of the cost-push kind (1 mark). Analysis, third stage: real output falls along the aggregate demand curve, so firms need fewer workers (1 mark). Development: the rise in prices continues only if workers win higher wages to compensate, setting off a wage-price spiral (1 mark).`),

  pr(B4, 'Evaluate', 20, 'Evaluate the likely economic effects of a significant cut in the rates of direct taxation. (20 marks)',
    `Appendix 6 wants multi-stage chains of reasoning, different viewpoints and informed judgements. Plan the effects on each of the specification's headings before writing — incentives, revenue, distribution, output and employment, prices, the trade balance and FDI — and decide in advance what your judgement will depend on.\nLevel 1 lists effects with little explanation. Level 2 explains one or two chains, such as a cut in income tax raising disposable income, consumption and aggregate demand. Level 3 develops several chains with application: higher output and employment where there is spare capacity; stronger incentives to work and invest; a lower corporation tax drawing in FDI; but also more imports worsening the trade balance, demand-pull pressure near full capacity, lost revenue unless rates were above the Laffer peak, and a wider gap between post-tax incomes if the top rate is cut. Level 4 reaches a supported judgement that follows from the argument: the effects depend on how much spare capacity there is, which taxes are cut and for whom, where the rates sit relative to the revenue-maximising rate, and how the lost revenue is replaced — by borrowing, spending cuts or other taxes.`),

  pr(B5, 'Examine', 8, 'Examine the significance of a large national debt for an economy. (8 marks)',
    `Appendix 6 wants a chain of reasoning and a brief assessment for an Examine, so save room for a judgement. Use the specification's three headings to organise the chains, and decide what makes a debt more or less of a problem.\nLevel 1 states that a large debt is bad, with little explanation. Level 2 explains one chain: a large debt must be serviced, so interest takes revenue that could fund schools or tax cuts. Level 3 develops two or three chains with application — interest payments as a share of revenue; heavy borrowing pushing up interest rates and crowding out private investment; future taxpayers repaying debt for spending they did not benefit from. The brief assessment that lifts an answer to the top of the range weighs its significance: it depends on the interest rate relative to growth, whether the debt is owed at home or abroad and in which currency, and whether it paid for assets that last.`),

  pr(B6, 'Discuss', 14, 'Discuss the effectiveness of the demand-side policies used in response to the global financial crisis of 2008. (14 marks)',
    `Appendix 6 wants chains of reasoning, different viewpoints and a critical assessment. Separate the fiscal response from the monetary response before writing, and decide how you will judge effectiveness — against what would have happened without them, and against their later costs.\nLevel 1 describes the crisis with little explanation of policy. Level 2 explains one response: stimulus spending and tax cuts raised aggregate demand, or near-zero interest rates cut the cost of borrowing. Level 3 develops both with application: fiscal stimulus in the US and China replaced collapsing private demand; interest rate cuts and bond buying to increase the money supply supported spending and asset prices; coordination through the G20 limited leakage into imports. Against that, banks were unwilling to lend, so low rates reached firms slowly; national debts rose sharply; and very low rates for years raised asset prices and wealth inequality. Level 4 reaches a supported judgement: the policies were effective in preventing a depression, less effective in producing a fast recovery, and left costs in debt that shaped policy for a decade.`),

  pr(B6, 'Evaluate', 20, 'Evaluate the policies a government might use to reduce a large fiscal deficit. (20 marks)',
    `Appendix 6 wants multi-stage chains of reasoning, different viewpoints and informed judgements. Plan the tools before writing — fiscal, monetary, supply-side, exchange-rate policy and direct controls — and decide what the judgement will turn on, such as how much spare capacity there is and whether the deficit is structural or cyclical.\nLevel 1 lists policies with little explanation. Level 2 explains how one or two work: higher taxes and lower spending close the gap directly; growth raises revenue. Level 3 develops several with chains and application: fiscal tightening reduces aggregate demand, so output and tax receipts fall and the deficit falls by less than planned; low interest rates cut the cost of servicing the debt; supply-side reform raises trend growth but takes years; a lower currency helps exports but raises the burden of foreign-currency debt; pay freezes are quick but can damage services. Level 4 reaches a supported judgement: a cyclical deficit needs growth rather than cuts, a structural deficit needs a decision; cutting current spending and subsidies harms growth less than cutting capital spending; and gradual consolidation with supportive monetary policy is usually more effective than sharp cuts in a weak economy.`),

  pr(B7, 'Evaluate', 20, 'Evaluate the measures governments can use to control the activities of transnational corporations (TNCs). (20 marks)',
    `Appendix 6 wants multi-stage chains of reasoning, different viewpoints and informed judgements. The specification pairs the measures with the limits on them, so plan both before writing, and decide whether acting alone or acting together is the key to your judgement.\nLevel 1 describes TNCs with little explanation of measures. Level 2 explains one or two measures: regulating transfer prices so they match arm's-length market prices; a minimum tax on profits. Level 3 develops the measures and their limits with application: transfer pricing rules protect the tax base, but brands and patents have no market price to check against; country-by-country reporting exposes profits booked where there is little activity; a global minimum tax removes much of the gain from tax havens; but TNCs are mobile, well advised and able to lobby, and a small tax authority may lack the staff and information to audit them. Level 4 reaches a supported judgement: measures by one country alone are limited by mobility, so their effectiveness depends on international cooperation, and on developing countries having the capacity to enforce what is agreed.`),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('What is capital expenditure?', 'Public spending on assets that last for years: roads, schools, hospitals, ports. It adds to the economy\'s capital stock.'),
  fc('What is current expenditure?', 'Public spending on goods and services used up within the year: the salaries of teachers and nurses, medicines, running costs.'),
  fc('What is a transfer payment?', 'A payment from government to an individual with no good or service received in return, such as a pension or unemployment benefit.'),
  fc('Name the three reasons the specification gives for changes in the size and pattern of public spending.', 'Changing incomes, changing age distributions and changing expectations.'),
  fc('How does an ageing population change public spending?', 'It raises spending on pensions and health care, may reduce spending on schools, and narrows the base of workers paying tax.'),
  fc('How can public spending raise productivity and growth?', 'Spending on infrastructure, education and health raises output per worker and shifts long-run aggregate supply to the right.'),
  fc('What is crowding out?', 'A fall in private sector spending caused by a rise in public spending, mainly because government borrowing pushes up interest rates.'),
  fc('When is crowding out most and least likely?', 'Most likely near full employment with high interest rates; least likely in a deep recession with spare capacity and idle savings.'),
  fc('Why does a large state mean high taxes?', 'Spending must be paid for. Borrowing can fill a gap for a time, but the debt and its interest are paid from future taxes.'),
  fc('What is the difference between a direct and an indirect tax?', 'A direct tax is levied on income or wealth (income tax, corporation tax); an indirect tax is levied on spending and passed on in the price (VAT, excise duties).'),
  fc('Define a progressive tax.', 'A tax that takes a rising share of income as income rises.'),
  fc('Define a proportional tax.', 'A tax that takes the same share of income at every level of income.'),
  fc('Define a regressive tax.', 'A tax that takes a falling share of income as income rises, even if richer people pay more in dollars.'),
  fc('What is the difference between the marginal and the average rate of tax?', 'The marginal rate is the tax on the last dollar earned; the average rate is total tax divided by total income.'),
  fc('How can a rise in income tax affect incentives to work?', 'It lowers the reward for extra work, so some work less or move abroad; people with an income target may work more.'),
  fc('What does the Laffer curve show?', 'Tax revenue rises with the tax rate up to a peak and then falls, as very high rates shrink the tax base.'),
  fc('When does cutting a tax rate raise revenue on Laffer analysis?', 'Only when the rate is above the revenue-maximising rate — and nobody knows exactly where that is.'),
  fc('How does raising VAT affect income distribution?', 'It takes a larger share of low incomes, because poorer households spend more of what they earn, so it widens inequality.'),
  fc('How does a cut in income tax affect real output and employment?', 'Disposable income and consumption rise, AD shifts right, and with spare capacity firms produce more and hire more workers.'),
  fc('How does a rise in indirect taxes affect the price level?', 'It raises costs passed on in prices, shifting SRAS left: a one-off rise in the price level and lower real output.'),
  fc('How does a cut in income tax affect the trade balance?', 'Part of the extra disposable income is spent on imports, so imports rise and the trade balance tends to worsen.'),
  fc('How can a cut in corporation tax affect FDI flows?', 'It raises the post-tax return on investing in the country, attracting inward FDI, though markets, skills and stability usually matter more.'),
  fc('What is a fiscal deficit?', 'The amount by which public expenditure exceeds government revenue in one year; it is borrowed.'),
  fc('What is the difference between a fiscal deficit and the national debt?', 'A deficit is a flow over one year; the national debt is the stock of past borrowing still owed. Each deficit adds to the debt.'),
  fc('What is an automatic stabiliser?', 'A change in tax receipts or benefit spending that happens without any decision as the economy changes, dampening the cycle.'),
  fc('What is discretionary fiscal policy?', 'A deliberate decision to change tax rates or public spending, such as a stimulus package.'),
  fc('What is the difference between a structural and a cyclical deficit?', 'The cyclical deficit is caused by the economic cycle and fades in recovery; the structural deficit would remain at full capacity.'),
  fc('Name four factors that influence the size of a fiscal deficit.', 'The economic cycle, spending and tax decisions, interest rates on the debt, and shocks such as disasters or banking crises.'),
  fc('What is debt servicing?', 'Paying the interest on the national debt and repaying or refinancing it as it falls due.'),
  fc('What does intergenerational equity mean for public debt?', 'Fairness between generations: future taxpayers repay today\'s borrowing, which is fairer when it paid for assets that benefit them too.'),
  fc('Name the five policy tools in 4.3.5.', 'Fiscal policy, monetary policy, exchange-rate policy, supply-side policies and direct controls.'),
  fc('What are direct controls?', 'Rules that set outcomes directly: price caps, wage controls, limits on imports or exports, and controls on capital flows.'),
  fc('How did governments respond to the global financial crisis of 2008?', 'Fiscal stimulus and tax cuts, interest rates cut close to zero, and central banks buying bonds to increase the money supply.'),
  fc('What is transfer pricing?', 'The price one part of a TNC charges another; set away from the market price, it moves profit to low-tax countries.'),
  fc('What is the arm\'s-length principle?', 'A transfer price must equal the price two independent firms would agree in the market.'),
  fc('Give three limits to a government\'s ability to control TNCs.', 'TNCs can move production and profit abroad; governments lack information on internal prices; one country cannot tax beyond its borders.'),
  fc('Name the three problems facing policymakers in the specification.', 'Inaccurate information, risks and uncertainties, and inability to control external shocks.'),
];

/* ══ Common mistakes ═════════════════════════════════════════════════════ */

const mk = (title, looks_like, why, instead) => ({ id: id('mistake', title), title, looks_like, why, instead });

export const MISTAKES = [
  mk('Confusing the fiscal deficit with the national debt',
    '"The government cut the deficit, so the national debt fell."',
    'The deficit is a yearly flow of new borrowing and the debt is the stock it adds to. A smaller deficit still adds to the debt, only more slowly.',
    'Say that the debt falls in dollars only in a surplus year, and that the debt ratio can fall if GDP grows faster than the debt.'),

  mk('Calling a sales tax proportional',
    '"VAT is proportional because everyone pays the same rate."',
    'Tax structures are judged by the share of income taken. Poorer households spend a larger share of their income, so a sales tax takes a larger share of it.',
    'Compare the tax with income at two or more income levels, and call it regressive when the share falls as income rises.'),

  mk('Treating crowding out as certain and complete',
    '"Government spending has no effect because it all crowds out private investment."',
    'Crowding out is usually partial, and close to zero in a deep recession when savings are idle and interest rates are low.',
    'State the conditions: crowding out is larger near full capacity with high rates and smaller with spare capacity.'),

  mk('Calling a stimulus package an automatic stabiliser',
    '"The government\'s new spending programme was an automatic stabiliser."',
    'Automatic stabilisers are changes that happen without a decision, such as falling tax receipts in a recession. A programme someone decided on is discretionary.',
    'Ask whether anyone had to decide it. If yes, it is discretionary fiscal policy.'),

  mk('Claiming the Laffer curve proves tax cuts pay for themselves',
    '"Cutting the tax rate will raise revenue because of the Laffer curve."',
    'A cut raises revenue only above the revenue-maximising rate, and nobody knows where that rate is. Below it, a cut loses revenue.',
    'Say where the economy is likely to be relative to the peak, and how uncertain that is.'),

  mk('Drawing an indirect tax rise as an AD shift',
    '"Higher VAT reduces demand, so AD shifts left and prices fall."',
    'An indirect tax is added to firms\' costs and prices, so short-run aggregate supply shifts left and the price level rises.',
    'Shift SRAS left for an indirect tax rise; shift AD for a change in income tax.'),

  mk('Calling TNC tax avoidance illegal',
    '"TNCs break the law by using transfer pricing to avoid tax."',
    'Tax avoidance is legal; evasion is not. Transfer pricing becomes a problem when the price is set away from the market price, which regulation then challenges.',
    'Distinguish avoidance from evasion, and name the measure that closes the route: arm\'s-length rules, reporting or a minimum tax.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */

/*
 * `ExtrasTab.jsx` maps `chain.steps`, so every chain has `steps` and a `title`, and every evaluation
 * frame a `content` string (V028, packet 28). The four chains are the genuine sequences topFix-03
 * named (crowding out, the automatic stabiliser in a recession, transfer pricing) plus 4b's
 * 2008 response; four of the section's reorders are sourced from them.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'Crowding out, in figures',
      steps: [
        `The government sells bonds to borrow ${bn(E.stimulus)} for new public spending.`,
        `Competing for savers' funds, it pushes interest rates up from ${pct(E.rateBefore)} to ${pct(E.rateAfter)}.`,
        `At the higher rate, firms postpone ${bn(E.investmentLost)} of investment projects.`,
        `Total spending rises by ${bn(E.netAddition)}, not ${bn(E.stimulus)}: ${pct(E.crowdedShare)} has been crowded out.`,
      ],
      result: 'Crowding out makes public spending less powerful than it looks, but rarely powerless. It is largest near full capacity with high interest rates and smallest in a deep recession.',
    },
    {
      title: 'Automatic stabilisers in a recession',
      steps: [
        'Output falls; workers lose overtime and jobs, and profits shrink.',
        `With no decision taken, income tax, corporation tax and VAT receipts fall by ${bn(E.recessionRevenueFall)} and, at the same time, claims for unemployment support rise by ${bn(E.recessionTransferRise)}.`,
        'Disposable income falls by less than earnings, so spending is cushioned.',
        `The deficit widens by ${bn(E.stabiliserSwing)}: this is the cyclical deficit, and it shrinks again in recovery.`,
      ],
      result: 'The stabilisers act at once and need no legislation, which is their advantage over discretionary policy. They are strongest where taxes are progressive and benefits generous.',
    },
    {
      title: 'Transfer pricing, in figures',
      steps: [
        `A TNC mines copper in Country H at a cost of ${mnd(E.tpCost)} and sells it to its own trading arm in Country L for ${mnd(E.rigged)}, below the world price of ${mnd(E.tpWorld)}.`,
        `Only ${mnd(E.profitH(E.rigged))} of profit is recorded in H, taxed at ${pct(E.taxH)}: ${mnd(E.profitH(E.rigged) * E.taxH / 100)}.`,
        `The trading arm resells at the world price and records ${mnd(E.profitL(E.rigged))} of profit in L, taxed at ${pct(E.taxL)}: ${mnd(E.profitL(E.rigged) * E.taxL / 100)}.`,
        `At the arm's-length price H would have taxed all ${mnd(E.profitH(E.armsLength))} of profit and collected ${mnd(E.taxArms)}; it collects ${mnd(E.taxLostH)} less.`,
      ],
      result: 'The copper, the mine and the workers are all in Country H; the profit is not. That is why transfer prices are regulated against the arm\'s-length market price.',
    },
    {
      title: 'The global financial crisis of 2008 and the response',
      steps: [
        'Losses on US housing loans spread to banks worldwide.',
        'Banks stop lending; spending, trade and output fall across the world.',
        'Governments pass stimulus packages; central banks slash rates to near zero and buy government bonds.',
        'Output stabilises and national debts rise sharply.',
      ],
      result: 'Demand-side policy on this scale prevented a depression. Its costs — higher debt and years of very low interest rates — shaped fiscal and monetary policy for the following decade.',
    },
  ],
  evaluation: [
    {
      title: 'Tax rises or spending cuts to close a deficit?',
      content: 'Neither is painless, and the answer depends on the economy and the deficit. **Ask first whether the deficit is structural or cyclical.** A cyclical deficit closes with recovery and needs no cuts; a structural one needs a decision. Tax rises spread the burden but may weaken incentives; spending cuts shrink the state but fall on the users of public services, and cuts to capital spending harm future growth. In a weak economy either reduces demand, so output and tax receipts fall and the deficit shrinks by less than planned.',
    },
    {
      title: 'Is a large national debt a problem?',
      content: 'The size alone says little. **What matters is the cost of servicing it and the capacity to carry it.** A debt at low interest rates in a growing economy, owed in the home currency to domestic savers, can be carried for decades, as Japan shows. The same ratio owed in foreign currency, at rising rates, in a slow-growing economy, can force painful cuts. And debt that paid for lasting assets leaves future generations something to show for it.',
    },
    {
      title: 'Can governments control TNCs?',
      content: 'Acting alone, only partly. **TNCs are mobile, well advised and better informed about their own affairs than any tax authority.** Transfer pricing rules work best for commodities with a world price and least for brands and patents. International agreements — the OECD minimum tax, shared reporting — change the balance, because they remove the option of moving profit to a country with no tax. Their effectiveness depends on enough countries joining and on developing countries having the capacity to enforce them.',
    },
  ],
};
