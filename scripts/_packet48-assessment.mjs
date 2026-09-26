/**
 * PACKET 48 — government-intervention-firms assessment: the quiz bank, the practice items, the
 * flashcards, the common mistakes and the extras.
 *
 * ── THE BANK IS REBUILT, NOT EDITED ──────────────────────────────────────────
 *
 * Of the live ten, two test what 3.3.5 does not contain at all — the Laffer curve (`quiz-01`) and the
 * poverty trap (`quiz-03`), 0 hits each in `econ_spec.txt` — and one, occupational immobility
 * (`quiz-02`), tested a leaf the live section never taught. `quiz-02`'s CLAIM that the item belongs to
 * 3.3.4 is wrong against the specification: "measures to reduce geographical and occupational
 * immobility of labour" is 3.3.5 · 2b (`:1533-1534`). The item is replaced by ones on the MEASURES,
 * which chapter 6 now teaches. Every item rests on a subsection that teaches it (the runner checks
 * the key terms), and `topFix-01`'s three named replacements are here: mergers and a substantial
 * lessening of competition, predatory pricing as an abuse of dominance, and quality standards /
 * performance targets.
 *
 * ── THE PINS ARE DERIVED ─────────────────────────────────────────────────────
 *
 * Every item carries its own block tag and `quizIndices` / `practiceIndices` are DERIVED from the
 * tag (packet 30), so an item cannot be pinned to a chapter that does not teach it.
 *
 * ── THE PRACTICE SET IS THE UNIT 3 PAPER'S SHAPE ─────────────────────────────
 *
 * DECISIONS, 26 September: a WEC13 topic is practised as Section B's five-part data question
 * (2 · 4 · 6 · 8 · 14, `audit/raw/ial-paper-structure.json`) and Section C's 20-mark essay. The live
 * set — Define (4), Explain (6), Assess (10), Outline (4), Evaluate (20) — carries four illegal
 * tariffs or command words (`topFix-05`).
 */
import { id, hash8, NAT, TEL, CEM, LAB, MON, TOP, money, hr, k, h, pct } from './_packet48-util.mjs';
import { B1, B2, B3, B4, B5, B6 } from './_packet48-content.mjs';

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
  qi(null, 'A natural monopoly is usually regulated rather than broken up because:',
    ['one network can supply the market at the lowest average cost', 'it cannot make a profit without state support', 'its price is already equal to marginal cost', 'consumers have many close substitutes for its product'],
    'Duplicating a network of pipes or cables would double the fixed cost and serve the same customers, so a single supplier is cheapest. That is why its price is controlled instead. Left alone it prices well above marginal cost, it can be very profitable, and it faces few substitutes, which is the problem.'),
  qi(null, 'Under a CPI − X price cap, a regulated firm increases its profit if it:',
    ['cuts its costs by more than X', 'raises its price faster than inflation', 'adds capital it does not need', 'sells less than the regulator forecast'],
    'The cap fixes how fast price may rise, so any saving beyond X stays with the firm as profit: that is the incentive the cap creates. It may not raise price faster than inflation minus X; adding unneeded capital raises profit only under rate-of-return regulation; and selling less lowers revenue.'),
  qi(null, 'A competition authority is most likely to block a merger that would:',
    ['substantially lessen competition in the market', 'let the combined firm cut its costs', 'create a firm large enough to export', 'be financed with borrowed money'],
    'Merger law tests whether a deal would substantially lessen competition, leaving fewer rivals and so higher prices or less choice. Lower costs count in the deal\'s favour, and neither exporting nor how the deal is financed is the test.'),

  /* ── Block 1 · Controlling Monopolies and Mergers ─────────────────────────── */
  /* Check-in: the chapter's diagram draws the three price outcomes of a natural monopoly; the item
   * asks about PROFIT regulation, which the diagram does not draw. */
  qi(B1, 'Under rate-of-return regulation, a regulated utility has an incentive to:',
    ['invest in more capital than it needs', 'cut its costs faster than inflation', 'set its price below marginal cost', 'leave the market to new entrants'],
    'Allowed profit is a percentage of the capital base, so more capital means more permitted profit, and costs are passed on in prices. The incentive to cut costs faster than inflation belongs to a price cap. Nothing in the rule pushes price below marginal cost or the firm out of the market.'),
  qi(B1, 'A regulator requires a rail operator to run nine in ten trains on time or compensate passengers. This is:',
    ['a performance target', 'a price cap', 'a merger remedy', 'profit regulation'],
    'A measured level of performance with a penalty for missing it is a performance target. A price cap limits the fare, a merger remedy is a condition attached to clearing a deal, and profit regulation caps the rate of return.'),
  qi(B1, 'Inflation is 4% and a regulator sets X at 1%. A capped price of $50 may rise to at most:',
    ['$51.50', '$52.50', '$50.50', '$48.50'],
    'The cap may rise by inflation minus X: 4% − 1% = 3%, and 3% of $50 is $1.50, so $51.50. Adding X instead of subtracting it gives $52.50, using X alone gives $50.50, and treating the cap as a fall gives $48.50.'),
  qi(B1, 'A dominant firm sets prices below cost until a new rival leaves, then raises them. A competition authority would treat this as:',
    ['predatory pricing', 'a cartel', 'competitive tendering', 'a quality standard'],
    'Pricing below cost to force out a rival, then recovering the losses, is predatory pricing, an abuse of a dominant position. A cartel needs rivals agreeing together; tendering and quality standards are measures government uses, not conduct it investigates.'),

  /* ── Block 2 · Promoting Competition and Contestability ───────────────────── */
  /* Check-in: the diagram draws privatisation and entry in telecoms; the item asks about tendering. */
  qi(B2, 'Competitive tendering for a city\'s refuse collection is intended mainly to:',
    ['lower the cost of the service to the city', 'raise the charge paid by households', 'keep private firms out of the service', 'give one firm the service without bidding'],
    'Firms compete for the right to supply, so the city pays less for the same service: competition for the market. The other answers describe the opposite of tendering, which opens the service to private bidders and awards it on price and quality.'),
  qi(B2, 'Which measure is most likely to make a market more contestable?',
    ['removing a limit on the number of licences', 'granting one firm the sole right to supply', 'raising tariffs on imported substitutes', 'requiring firms to buy from local suppliers'],
    'Scrapping a licence limit lowers a barrier to entry, so rivals can enter when price is high: that is deregulation. Granting a sole right, raising tariffs and forcing local purchases all raise barriers or costs for rivals.'),
  qi(B2, 'A government offers overseas car makers a long profit-tax holiday if they build plants in the country. The measure mainly aims to:',
    ['attract foreign direct investment', 'protect domestic car makers', 'raise more tax from car makers', 'cut the price of imported cars'],
    'A tax holiday for firms from abroad that build here is an incentive to promote FDI, adding rivals and technology. It exposes domestic makers to more competition rather than protecting them, raises no tax during the holiday, and affects cars made here, not imports.'),
  qi(B2, 'Trade liberalisation is most likely to harm:',
    ['domestic firms with higher costs than foreign rivals', 'consumers of goods that can be imported', 'exporters that buy imported inputs', 'firms already competing successfully abroad'],
    'Lower barriers let imports in at lower prices, so domestic firms that cannot match foreign costs lose sales. Consumers gain lower prices and more choice, exporters gain cheaper inputs, and firms that already compete abroad are used to the rivalry.'),

  /* ── Block 3 · Protecting Suppliers and Employees ─────────────────────────── */
  /* Check-in: the diagram draws foreign cement firms barred; the item asks about nationalisation. */
  qi(B3, 'Nationalisation is most often justified as a way to:',
    ['keep a failing strategic firm and its jobs going', 'increase competition among private firms', 'reduce the government\'s spending', 'attract more foreign investors'],
    'Taking a firm the economy depends on into state ownership protects its employees, its suppliers and its service. It does not add rivals, it usually adds to government spending, and it tends to put off rather than attract foreign investors.'),
  qi(B3, 'A law requiring large supermarkets to pay small farmers within thirty days mainly restricts:',
    ['the monopsony power of the supermarkets', 'the monopoly power of the farmers', 'competition between supermarkets', 'imports of food from abroad'],
    'The supermarkets are dominant BUYERS, and delaying payment is one way they use that power over sellers. The farmers are small sellers with little power; the law does not limit competition between supermarkets or touch imports.'),
  qi(B3, 'Local-content rules requiring oil companies to use domestic contractors are most likely to:',
    ['raise the companies\' costs but support domestic suppliers', 'lower the companies\' costs and prices', 'widen the companies\' choice of foreign contractors', 'reduce employment at domestic contractors'],
    'Being made to buy locally, often at a higher price, raises the companies\' costs, while domestic contractors and their staff win work they would otherwise lose. It narrows the choice of foreign contractors and raises, not reduces, domestic employment.'),
  qi(B3, 'Employment legislation limiting weekly working hours is most likely to raise a firm\'s:',
    ['labour costs', 'revenue from sales', 'prices charged by rivals', 'hours worked by each employee'],
    'Covering the same work with shorter hours means hiring more or paying overtime rates, so labour costs rise. Revenue does not rise because of the law, rivals\' prices are their own decision, and a cap on hours reduces hours per worker.'),

  /* ── Block 4 · The Impact and Limits of Intervention ──────────────────────── */
  /* Check-in: the diagram draws an information gap; the item asks about regulatory capture. */
  qi(B4, 'Regulatory capture occurs when a regulator:',
    ['acts in the interests of the firms it regulates', 'takes a regulated firm into state ownership', 'lacks the budget to investigate cases', 'sets a price cap below marginal cost'],
    'Capture is the regulator coming to serve the industry rather than consumers. State ownership is nationalisation, too small a budget is inadequate resources, and a cap below marginal cost is a pricing decision, not capture.'),
  qi(B4, 'The largest fine a competition authority may impose is less than the profit a cartel makes. This limit to intervention is:',
    ['lack of regulatory power', 'regulatory capture', 'inadequate resources', 'trade liberalisation'],
    'The law does not give the authority enough power to deter the cartel, however well staffed it is. Capture is serving the industry, inadequate resources is too little money or staff, and trade liberalisation is a measure, not a limit.'),
  qi(B4, 'Which impact of a price cap is most likely to be negative for consumers?',
    ['quality may fall as the firm cuts costs', 'price rises more slowly than inflation', 'the firm has to become more efficient', 'profit above normal is squeezed'],
    'The cheapest way to meet a cap can be to cut quality, which is why regulators add quality standards. Slower price rises, efficiency gains and lower excess profit all benefit consumers.'),
  qi(B4, 'Comparing a regulated water company\'s costs with those of similar companies elsewhere helps the regulator to reduce:',
    ['the information gap about true costs', 'the company\'s fixed costs', 'the number of competitors', 'the rate of inflation'],
    'Benchmarking gives the regulator a check on the costs the company claims, narrowing the asymmetric information between them. It changes neither the company\'s costs nor the number of competitors, and it has no effect on inflation.'),

  /* ── Block 5 · Wage Controls in Labour Markets ────────────────────────────── */
  /* Check-in: the diagram draws the three wage-control outcomes; the item asks about elasticity. */
  qi(B5, 'A minimum wage is raised in a competitive labour market. Job losses are likely to be smallest where the demand for labour is:',
    ['inelastic', 'elastic', 'perfectly elastic', 'falling for other reasons'],
    'If firms find labour hard to replace and it is a small share of their costs, a higher wage cuts the quantity demanded only a little. The more elastic the demand, the more jobs go, and a demand curve already falling adds losses of its own.'),
  qi(B5, 'Which is a likely way for firms to get round a maximum wage?',
    ['paying more in benefits in kind such as housing', 'hiring more staff at the capped wage', 'raising junior pay above the cap', 'cutting the prices they charge'],
    'Pay that the cap does not cover — housing, cars, allowances — lets firms keep rewarding staff. A binding cap reduces the number willing to work, so hiring more at the cap is not possible, junior pay above the cap would breach it, and prices are unrelated.'),
  qi(B5, 'A minimum wage set below the equilibrium wage will:',
    ['have no effect on wages or employment', 'create a surplus of labour', 'create a shortage of labour', 'raise employment'],
    'A floor below the wage the market already pays does not bind: firms pay the market wage anyway. A surplus follows only from a floor above equilibrium, and a shortage from a ceiling below it.'),
  qi(B5, 'The case for labour-market intervention on grounds of equity rests mainly on:',
    ['full-time work that can still leave a family in poverty', 'workers being unable to move to where jobs are', 'firms investing in more capital than they need', 'regulators relying on firms for information'],
    'Equity is about fairness in outcomes, such as pay too low to live on. Immobility is an efficiency argument, over-investment is a feature of profit regulation, and reliance on firms for information is a limit to regulation.'),

  /* ── Block 6 · Taxes, Mobility and Fair Treatment ─────────────────────────── */
  /* Check-in: the diagram draws a payroll tax, retraining and discrimination; the item asks about a
   * GEOGRAPHICAL measure, which it does not draw. */
  qi(B6, 'Which measure is aimed mainly at geographical immobility of labour?',
    ['a grant towards the cost of moving for a job', 'a subsidised evening course in computer coding', 'a law requiring equal pay for equal work', 'a cut in the rate of corporation tax'],
    'A relocation grant tackles the cost of moving to where jobs are. A coding course targets occupational immobility, equal pay law targets discrimination, and corporation tax works through investment.'),
  qi(B6, 'A cut in corporation tax is most likely to raise the demand for labour over time because it:',
    ['raises the return on new investment after tax', 'lowers workers\' take-home pay', 'reduces the minimum wage', 'raises national insurance contributions'],
    'A lower tax on profits raises what firms keep from investing, so they invest more, some multinationals locate here, and demand for labour grows. It does not change take-home pay, the minimum wage or national insurance.'),
  qi(B6, 'An increase in employees\' national insurance contributions is most likely to:',
    ['reduce take-home pay at every wage', 'raise the cost of each worker to the firm', 'increase the demand for labour', 'increase the number willing to work'],
    'The employee\'s contribution is deducted from pay, so workers keep less of each wage and fewer may be willing to work. It is the employer\'s contribution that raises the cost of each worker to the firm, neither raises demand, and keeping less of each wage does not draw more people into work.'),
  qi(B6, 'Pay-gap reporting and equal pay laws are measures to reduce:',
    ['discrimination', 'geographical immobility', 'regulatory capture', 'the monopsony power of suppliers'],
    'Both target paying a group less for reasons unrelated to its work. Immobility is tackled with relocation help and training, capture concerns regulators, and suppliers are sellers, not buyers.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */
/*
 * CONTENT-GATE checklist 6: every guidance is at least two paragraphs, and `InlinePractice` prints
 * `guidance.split('\n')[0]` above the empty answer box in guided mode. The opening carries no
 * figure, no mark allocation and no answer. Nothing above 6 marks allocates points.
 */
const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

export const PRACTICE = [
  pr(B1, 'Calculate', 2, 'A water company\'s price is capped at $40 a unit. Inflation, measured by consumer prices, is 3% and the regulator sets X at 1%. Calculate the maximum price the company may charge next year. (2 marks)',
    `Work out the percentage change the cap allows before touching the price, and check which way X moves it.\nAllowed change = inflation − X = 3% − 1% = 2% (1 mark). Maximum price = $40 × 1.02 = $40.80 (1 mark). An answer that adds X, giving 4% and $41.60, has neither mark; an answer with the right 2% but the wrong price has the first.`),

  pr(B2, 'Evaluate', 20, 'Evaluate the case for privatising a state-owned natural monopoly. (20 marks)',
    `The phrase that decides the answer is "natural monopoly". Plan the case for private ownership, then what happens to price and choice when the new owner is still the only supplier, and decide in advance what your judgement will depend on.\nKnowledge, application and analysis are placed in levels, and evaluation is credited in levels of its own. Level 1 defines privatisation with little explanation. Level 2 explains the case for it: owners who want profit push managers to cut costs, the firm can raise money from investors, and the sale raises revenue. Level 3 develops both sides with a diagram: a private monopoly that cuts its costs still sets MR = MC, so price falls little and most of the saving becomes profit; without competition or a regulator, consumers gain little, and quality may be cut. Level 4 applies this to a named industry such as water or electricity networks. Evaluation that reaches the top of the range is a supported judgement: the case is strong only where privatisation comes with a regulator using price caps, quality standards and performance targets, or with rivals allowed to enter parts of the industry, and it depends on whether that regulator has the information, resources and power to hold the firm to them.`),

  pr(B2, 'Define', 2, "Define the term 'privatisation'. (2 marks)",
    `Two marks means two separate points. Say what changes hands, and between whom.\nPrivatisation is the transfer of ownership of a firm or industry (1 mark) from the public sector to the private sector, for example by selling its shares (1 mark). An answer that describes deregulation, opening a market to new firms, has neither mark: the owner does not change.`),

  pr(B2, 'Explain', 4, 'Explain two ways in which deregulation may increase competition in a market. (4 marks)',
    `Two ways, each with its reason. Choose rules whose removal lets new firms in or lets existing firms compete harder, and say what the removal changes.\nEach way earns a mark for identifying it and a mark for explaining it. Removing a limit on the number of licences (1 mark): new firms can enter, adding rivals, so prices are pushed down (1 mark). Removing controls on the prices or routes firms may offer (1 mark): firms can undercut each other and serve customers the old rules reserved for the incumbent (1 mark). Also creditworthy: ending a legal monopoly, and the threat of entry alone keeping incumbents\' prices down.`),

  pr(B3, 'Analyse', 6, 'Analyse the likely effects on domestic consumers and producers of barriers to entry of foreign firms. (6 marks)',
    `Follow one chain through linked stages and use a supply and demand diagram. Say which curve shifts, and why, before saying what happens to price, then separate the effect on consumers from the effect on domestic producers.\nKnowledge: barriers to entry of foreign firms, such as licences only for domestic firms or caps on foreign ownership, keep foreign suppliers out (1 mark). Application: market supply falls to domestic supply alone, a shift to the left (1 mark). Analysis: at the old price there is a shortage, so price rises (1 mark); consumers pay more, buy less and lose the foreign brands, while domestic producers sell more and hire more workers (1 mark). A correctly labelled diagram — price and quantity on the axes, supply shifting left, the higher price and lower quantity marked (2 marks).`),

  pr(B4, 'Examine', 8, 'Examine two limits to the effectiveness of a regulator in controlling a monopoly. (8 marks)',
    `Examine asks for chains of reasoning and a brief assessment. Choose two limits the specification names, show each at work on a regulated firm, and keep space to judge which matters more.\nLevel 1 names limits with little explanation. Level 2 explains two: regulatory capture, where reliance on the industry for information and staff leads the regulator to set lenient caps; and asymmetric information, where the firm knows its costs better and overstates them, so the cap is set too high. Level 3 develops them with application, for example a cap set on claimed costs that leaves the firm earning profit above normal. The brief assessment that reaches the top of the range judges which limit is harder to overcome — benchmarking narrows an information gap, while capture needs independence written into how the regulator is appointed — or weighs inadequate resources and lack of regulatory power against them.`),

  pr(B5, 'Evaluate', 20, 'Evaluate the likely effects of an increase in the minimum wage on a labour market. (20 marks)',
    `The answer turns on what kind of labour market it is. Plan the effects in a competitive market, then in a market where one employer dominates, and decide in advance what your judgement will depend on.\nKnowledge, application and analysis are placed in levels, and evaluation is credited in levels of its own. Level 1 describes the minimum wage with little explanation. Level 2 explains the competitive case with a labelled diagram: a floor above equilibrium means firms hire fewer and more people want work, a surplus of labour. Level 3 develops both sides: those who keep their jobs earn more, poverty falls and spending rises, but costs rise, so prices may rise and profits fall; and where one employer dominates, a floor between its wage and the competitive wage can raise both pay and employment (the model is topic 3.3.3). Level 4 applies this to named sectors or countries. Evaluation that reaches the top of the range is a supported judgement: the effect depends on how far above equilibrium the floor is set, the elasticity of demand for labour, how much power employers have, and how well the law is enforced where informal work is common.`),

  pr(B6, 'Discuss', 14, 'Discuss the effectiveness of measures to reduce occupational immobility of labour. (14 marks)',
    `Discuss wants different viewpoints and a critical assessment. Plan the measures, what each does to supply in shortage occupations, and what decides whether it works.\nLevel 1 describes occupational immobility with little explanation. Level 2 explains the measures — retraining schemes, subsidised courses and training credits, apprenticeships, recognition of qualifications — and how each lets workers move into jobs with shortages. Level 3 analyses the effect with a diagram: supply to the shortage occupation shifts right, vacancies fill, pay pressure eases and structural unemployment falls. Level 4 reaches a critical assessment: effectiveness depends on whether courses teach what firms want, how long training takes, whether older workers take it up, and the cost to government against the output gained.`),

  pr(B6, 'Explain', 4, 'Explain how an increase in employers\' national insurance contributions is likely to affect employment. (4 marks)',
    `Link the tax to what it does to the cost of a worker, then to the demand for labour, then to employment. Keep the direction of each change clear.\nThe contribution is paid by the employer on each worker, so the cost of employing each worker rises (1 mark). The demand for labour falls at every wage the worker receives (1 mark). The wage workers receive falls and firms move to fewer workers, so employment falls (1 mark). How much depends on the elasticity of demand and supply of labour, or the effect is small where labour is hard to replace (1 mark).`),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('What is the case for government intervention in product markets?', 'Firms with market power can raise prices, cut output, let quality slip and squeeze suppliers. Intervention protects consumers, suppliers and employees.'),
  fc('Why is a natural monopoly regulated rather than broken up?', 'One network supplies the market at the lowest average cost, so competition would duplicate the fixed cost. The single supplier\'s price is controlled instead.'),
  fc('What is price regulation?', 'A legal maximum on the price a monopoly may charge, often changed each year by CPI − X.'),
  fc('How does a CPI − X price cap work?', 'The price may rise each year by consumer-price inflation minus X, an efficiency factor. The firm keeps any cost saving beyond X as profit.'),
  fc(`Inflation ${pct(NAT.cpi)}, X ${pct(NAT.X)}: how far may a capped price rise?`, `By ${pct(NAT.allowed)}: ${money(NAT.avg.P)} becomes ${money(NAT.nextCap)}.`),
  fc('What is profit regulation?', 'A cap on the rate of return a monopoly may earn on its capital. Costs are passed on, so there is little incentive to cut them.'),
  fc('Why does rate-of-return regulation encourage over-investment?', 'Allowed profit is a percentage of the capital base, so adding capital raises permitted profit, even if the capital is not needed.'),
  fc('Quality standard or performance target: what is the difference?', 'A standard is a minimum the product must meet at all times; a target is a level of performance to reach, with a reward or penalty.'),
  fc('What does referral to a regulatory authority mean?', 'Passing a firm, a market or a deal to a competition authority or regulator to investigate, with power to fine or order changes.'),
  fc('What is predatory pricing?', 'A dominant firm pricing below cost to drive out a rival, then raising prices: an abuse of a dominant position.'),
  fc('What test does merger law usually apply?', 'Whether the deal would substantially lessen competition: fewer rivals, so higher prices, less choice or lower quality.'),
  fc('What can a competition authority do with a merger?', 'Clear it, clear it with remedies such as selling stores or brands, or block it.'),
  fc('How do tax incentives and grants promote competition?', 'They help new small firms start and attract FDI, adding rivals, so prices fall and choice widens.'),
  fc('What is deregulation?', 'Removing rules that restrict entry into a market or what firms may do there, lowering barriers to entry.'),
  fc('What is privatisation?', 'The transfer of a firm from state to private ownership, usually by selling its shares.'),
  fc('Why may privatising a natural monopoly not lower prices?', 'The new owner is still the only supplier and still sets MR = MC. Price falls only with competition or regulation.'),
  fc('What is competitive tendering?', 'Inviting private firms to bid for the right to supply a public service: competition for the market rather than in it.'),
  fc('What is trade liberalisation?', 'Reducing tariffs, quotas and other barriers to imports, so domestic firms face foreign rivals.'),
  fc('What is local sourcing, and who gains from a rule requiring it?', 'Buying a share of raw materials and components from domestic suppliers. Those suppliers and their workers gain; the buying firm and its customers pay.'),
  fc('What is exploitation of workers?', 'Treating workers in ways they accept only because they have no real alternative: pay withheld, unsafe work, excessive hours.'),
  fc('Name three barriers to entry of foreign firms.', 'Caps on foreign ownership, licences only for domestic firms, and tariffs or quotas on imports.'),
  fc('What is monopsony power, and how is it restricted?', 'The power of a dominant buyer. Restricted by codes for large buyers, prompt-payment laws, minimum prices and the minimum wage.'),
  fc('What is nationalisation?', 'The transfer of a firm from private to state ownership, often to rescue it or run it for social aims.'),
  fc('What five impacts is each measure judged on?', 'Price, profit, efficiency, quality and choice.'),
  fc('What is regulatory capture?', 'A regulator coming to act in the interest of the firms it regulates rather than consumers.'),
  fc('How does asymmetric information limit regulation?', 'The firm knows its costs better than the regulator and can overstate them, so the cap is set too high.'),
  fc('What is benchmarking?', 'Comparing a regulated firm\'s costs with those of similar firms, to narrow the information gap.'),
  fc('Inadequate resources or lack of regulatory power?', 'Resources: too little money and staff to investigate. Power: too little legal authority, such as fines below the gains.'),
  fc('What does a minimum wage above equilibrium do in a competitive market?', 'Firms hire fewer and more people want work: a surplus of labour.'),
  fc('When can a minimum wage raise employment?', 'Where one employer dominates, if the floor lies between that employer\'s wage and the competitive wage.'),
  fc('What does a binding maximum wage do?', 'Fewer are willing to work at the cap than firms want: a shortage, plus evasion through benefits in kind and emigration.'),
  fc('How does an employer\'s national insurance contribution affect employment?', 'It raises the cost of each worker, so demand for labour falls: the wage received and employment both fall.'),
  fc('How does corporation tax affect the labour market?', 'A higher rate lowers the return on investment, so firms invest less and demand for labour grows more slowly.'),
  fc('Give three measures to reduce geographical immobility.', 'Relocation grants, affordable housing where jobs are growing, and job-information services.'),
  fc('Give three measures to reduce occupational immobility.', 'Retraining schemes, subsidised courses or training credits, and apprenticeships.'),
  fc('What does removing discrimination do to a group\'s labour market?', 'Demand for the group\'s labour shifts right, so its wage and employment both rise.'),
];

/* ══ Common mistakes ═════════════════════════════════════════════════════ */

const mk = (title, looks_like, why, instead) => ({ id: id('mistake', title), title, looks_like, why, instead });

export const MISTAKES = [
  mk('Saying a CPI − X cap makes prices fall',
    '"Under the price cap, prices fall every year."',
    'The cap limits how fast the price may RISE: inflation minus X. It falls in money terms only when X is larger than inflation.',
    'Do the arithmetic: inflation minus X is the allowed change. Say whether it is a rise or a fall in money terms, and that it is a fall in real terms.'),

  mk('Treating privatisation as if it created competition',
    '"Privatising the water company will bring prices down through competition."',
    'Privatisation changes the owner, not the number of suppliers. A natural monopoly sold on is a private monopoly that still sets MR = MC.',
    'Separate ownership from competition: say whether rivals can enter, or whether a regulator will cap the price.'),

  mk('Drawing a regulated natural monopoly with a U-shaped average cost',
    '"The regulator sets price where MC cuts AC at its lowest point."',
    'A natural monopoly\'s average cost falls across the whole market, because its fixed network cost is spread over more units. A price equal to marginal cost is below average cost, so it makes a loss.',
    'Draw AC falling throughout. Mark the average-cost cap on the AC curve and say that a marginal-cost cap needs a subsidy.'),

  mk('Confusing monopsony with monopoly',
    '"The supermarket is a monopoly, so the government restricts its monopsony power over shoppers."',
    'A monopsonist is a dominant BUYER. Its power is over the suppliers and workers it buys from, not over its customers.',
    'Name which side of the market the power is on, then the group it harms and the measure that restricts it.'),

  mk('Saying a minimum wage always costs jobs',
    '"A minimum wage creates unemployment, so it should be abolished."',
    'Only a floor above equilibrium in a competitive market cuts jobs, and how many depends on the elasticity of demand for labour. Where one employer dominates, a floor in the right range raises employment.',
    'State the market structure, draw the matching diagram, and bring in the elasticity of demand for labour.'),

  mk('Listing why workers cannot move when asked for measures',
    '"Measures to reduce geographical immobility include the cost of moving and ties to home."',
    'Those are the causes, taught in topic 3.3.4. The measures are what government does about them.',
    'Pair each measure with the cause it targets: relocation grants for the cost of moving, housing where the jobs are, training for skills.'),

  mk('Judging a measure on price alone',
    '"Barring foreign firms is good because it protects jobs."',
    'The specification asks for the impact on price, profit, efficiency, quality and choice. A measure that protects jobs can raise prices and cut choice.',
    'Run the measure through all five impacts, then weigh them for the group named in the question.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */

/*
 * `ExtrasTab.jsx` maps `chain.steps`, so every chain has `steps` and a `title`, and every evaluation
 * frame a `content` string (V028, packet 28). No markdown bold in an evaluation frame: packet 45's
 * Verify B saw `**` render as literal asterisks there.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'From a natural monopoly to a price cap',
      steps: [
        `One water network serves the market; its average cost falls at every output because the network\'s fixed cost is spread over more units.`,
        `Left alone it sets MR = MC: ${k(NAT.mono.Q)} units at ${money(NAT.mono.P)}, above its average cost of ${money(NAT.mono.AC)}.`,
        `The regulator caps the price at average cost: ${money(NAT.avg.P)}, and output rises to ${k(NAT.avg.Q)}.`,
        `Each year the cap moves by CPI − X: with inflation ${pct(NAT.cpi)} and X ${pct(NAT.X)}, it rises to ${money(NAT.nextCap)}.`,
      ],
      result: 'Price falls and output rises, and the firm keeps any saving beyond X, so it has a reason to become more efficient. Quality standards stop it cutting quality instead.',
    },
    {
      title: 'Privatisation, then competition',
      steps: [
        `The state telecoms monopoly charges ${money(TEL.state.P)} a month with a marginal cost of ${money(TEL.state.mc)}.`,
        `Privatised, it cuts marginal cost to ${money(TEL.privat.mc)} but still sets MR = MC: ${money(TEL.privat.P)}.`,
        `Rival networks are licensed, and competition drives price towards marginal cost.`,
        `The price reaches ${money(TEL.open.P)} and subscribers rise to ${TEL.open.Q} million.`,
      ],
      result: 'The sale changed the owner and some costs; the entry of rivals changed the price.',
    },
    {
      title: 'A minimum wage, in two markets',
      steps: [
        `Many employers: the wage settles at ${hr(LAB.eq.W)} with ${k(LAB.eq.L)} employed.`,
        `A floor of ${hr(LAB.minW)}: firms hire ${k(LAB.minHired)} and ${k(LAB.minWilling)} want work, a surplus of ${k(LAB.minSurplus)}.`,
        `One dominant employer: it hires ${k(MON.mono.L)} at ${hr(MON.mono.W)} to keep the wage down (topic 3.3.3).`,
        `A floor of ${hr(MON.floor)}: extra workers cost just the floor, so it hires ${k(MON.withFloor.L)}.`,
      ],
      result: 'The same policy cuts jobs in one market and adds them in the other. The market structure, the size of the floor and the elasticity of demand for labour decide which.',
    },
    {
      title: 'An employer contribution, from tax to jobs',
      steps: [
        `The government adds a contribution of ${money(LAB.tax)} an hour on every worker, paid by the employer.`,
        `Each worker now costs the firm ${money(LAB.tax)} more at every wage, so the demand for labour shifts down.`,
        `The wage workers receive falls from ${hr(LAB.eq.W)} to ${hr(LAB.taxed.W)}; firms pay ${hr(LAB.firmPays)} in all.`,
        `Employment falls from ${k(LAB.eq.L)} to ${k(LAB.taxed.L)}.`,
      ],
      result: 'The tax is shared between workers and firms, and employment falls. How it is shared depends on the elasticities of demand and supply of labour.',
    },
  ],
  evaluation: [
    {
      title: 'Price cap or profit cap?',
      content: 'A CPI − X price cap rewards cost cutting, because the firm keeps what it saves beyond X; rate-of-return regulation guarantees a return on capital, which makes investment easier to fund but rewards spending. The judgement depends on what the industry most needs. A mature network that is inefficient needs the cap; one that must build new capacity may need the certainty of a return. Either way, the regulator\'s information, resources and independence decide how well it works.',
    },
    {
      title: 'Does intervention do better than the market?',
      content: 'Every measure in 3.3.5 answers a market failure, and every one can fail in its turn: capture, information gaps, too few resources, too little power. The strongest answers do not ask whether intervention is perfect but whether it improves on the market it replaces, measured on price, profit, efficiency, quality and choice, and they name the condition that tips the balance.',
    },
    {
      title: 'Does a minimum wage cost jobs?',
      content: 'In a competitive labour market, a floor above equilibrium cuts jobs, and more of them where the demand for labour is elastic. Where one employer dominates, a floor between its wage and the competitive wage raises pay and employment together. A strong judgement names the market structure, how far above equilibrium the floor is set, and whether it can be enforced where much work is informal.',
    },
  ],
};
