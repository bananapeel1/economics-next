import { supabase } from './_db.mjs';

/* ═══════════════════════════════════════════════════════════
 *  REVERT ALL SECTION NOTES TO ORIGINAL STATE
 *  (Reverting the rewrite from rewrite-notes.mjs)
 * ═══════════════════════════════════════════════════════════ */

const ORIGINAL_NOTES = {

'introductory-concepts': [
  { title: "Economics as a Social Science", points: [
    "Economics studies how scarce resources are allocated to satisfy unlimited wants.",
    "Models simplify reality; ceteris paribus isolates one variable at a time.",
    "Positive statements are testable; normative statements involve value judgements.",
    "Look for 'should/ought' to identify normative statements in exam questions."
  ]},
  { title: "Scarcity and Opportunity Cost", points: [
    "Scarcity = unlimited wants vs finite resources (the basic economic problem).",
    "Opportunity cost = the next best alternative forgone.",
    "Economic goods have an opportunity cost; free goods do not.",
    "Few goods are truly free in practice (e.g. clean air now has an opportunity cost)."
  ]},
  { title: "PPF Key Points", points: [
    "On the curve = productively efficient; inside = inefficient; outside = unattainable.",
    "Concave PPF = increasing opportunity cost (resources not perfectly transferable).",
    "Outward shift = economic growth (more resources/better technology).",
    "Inward shift = decline in productive capacity (disaster, resource depletion).",
    "More capital goods today = outward shift tomorrow (future growth)."
  ]},
  { title: "Specialisation & Money", points: [
    "Division of labour (Adam Smith's pin factory): increases productivity but may cause monotony/unemployment.",
    "Four functions of money: medium of exchange, store of value, unit of account, standard of deferred payment.",
    "Financial markets channel savings to investment, enabling economic growth."
  ]},
  { title: "Economic Systems", points: [
    "Free market: price mechanism allocates resources; efficient but causes market failure.",
    "Command: state decides allocation; can address equity but lacks efficiency/incentives.",
    "Mixed: combines both; most real economies are mixed with varying balance.",
    "Choice between systems involves normative judgements about equity vs efficiency."
  ]}
],

'consumer-behaviour-demand': [
  { title: "Rational Consumer & Behavioural Economics", points: [
    "Rational consumers maximise utility: MUa/Pa = MUb/Pb.",
    "Diminishing marginal utility explains the downward-sloping demand curve.",
    "Irrational behaviour: habitual behaviour, inertia, herding, poor computation, emotional needs, framing/bias.",
    "Behavioural economics challenges the assumption of rational utility maximisation."
  ]},
  { title: "Demand Curve Essentials", points: [
    "Demand = willingness AND ability to buy at a given price.",
    "Movement along = price change; Shift = non-price factor change.",
    "Shift factors: income, substitute/complement prices, tastes, population, expectations, interest rates.",
    "Use 'extension/contraction' for movements; 'increase/decrease in demand' for shifts."
  ]},
  { title: "PED Key Points", points: [
    "PED = %ΔQd / %ΔP (always negative, often stated as absolute value).",
    "|PED| > 1 = elastic, < 1 = inelastic, = 1 unit elastic, 0 = perfectly inelastic, ∞ = perfectly elastic.",
    "Elastic demand: price cut → TR rises. Inelastic demand: price rise → TR rises.",
    "PED varies along a linear demand curve (elastic at top, inelastic at bottom).",
    "Key factors: substitutes, necessity vs luxury, income proportion, time, habit, brand loyalty, market definition."
  ]},
  { title: "YED Key Points", points: [
    "YED = %ΔQd / %ΔIncome. Sign matters!",
    "YED > 0 = normal good; YED > 1 = luxury; 0 < YED < 1 = necessity; YED < 0 = inferior good.",
    "Luxury goods: demand volatile over the business cycle. Necessity goods: demand stable."
  ]},
  { title: "XED Key Points", points: [
    "XED = %ΔQd of A / %ΔP of B. Sign matters!",
    "XED > 0 = substitutes; XED < 0 = complements; XED = 0 = unrelated.",
    "Higher absolute value = stronger relationship between the goods.",
    "Used by firms for pricing strategy and by competition authorities to define markets."
  ]}
],

'supply': [
  { title: "Supply Curve Essentials", points: [
    "Supply = willingness AND ability to sell at a given price.",
    "Supply curve slopes upward: higher price = greater profit incentive + covers rising marginal costs.",
    "Movement along = own price change (extension/contraction of supply).",
    "Shift = non-price factor change (increase/decrease in supply)."
  ]},
  { title: "Factors Shifting Supply", points: [
    "Costs of production (wages, materials, energy).",
    "Technology (improvements shift supply right).",
    "Indirect taxes (shift supply left/upward by tax amount).",
    "Subsidies (shift supply right/downward by subsidy amount).",
    "Natural disasters/weather (shift supply left).",
    "Number of firms, related goods prices, expectations, regulations."
  ]},
  { title: "PES Key Points", points: [
    "PES = %ΔQs / %ΔP (usually positive).",
    "PES > 1 = elastic; PES < 1 = inelastic; PES = 0 perfectly inelastic; PES = ∞ perfectly elastic.",
    "Key factors: time period, stocks, spare capacity, factor mobility, barriers to entry, regulations, production cycle length.",
    "Supply is more elastic in the long run (all factors variable)."
  ]},
  { title: "Short Run vs Long Run", points: [
    "Short run: at least one factor fixed (usually capital). Only variable factors can be adjusted.",
    "Long run: all factors variable. Firms can expand/contract capacity, enter/exit market.",
    "The distinction is about factor fixity, NOT calendar time.",
    "Very short run: all factors fixed, supply perfectly inelastic.",
    "PES increases over time: momentary (inelastic) → short run → long run (elastic)."
  ]},
  { title: "PES Significance", points: [
    "Firms: plan production responses and inventory management.",
    "Government: PES affects tax incidence (inelastic supply = producers bear more tax burden).",
    "Government: subsidies more effective when supply is elastic.",
    "Consumers: inelastic supply means larger price rises when demand increases.",
    "Price volatility is greater for goods with inelastic supply (e.g. agriculture, oil, housing)."
  ]}
],

'price-determination': [
  { title: "Equilibrium", points: [
    "Equilibrium: Qd = Qs at the market-clearing price — no tendency for price to change.",
    "Increase in D → higher P, higher Q. Decrease in D → lower P, lower Q.",
    "Increase in S → lower P, higher Q. Decrease in S → higher P, lower Q.",
    "Magnitude of changes depends on elasticities of both D and S."
  ]},
  { title: "Excess Demand & Supply", points: [
    "Price below equilibrium → excess demand (shortage) → price bid up → equilibrium restored.",
    "Price above equilibrium → excess supply (surplus) → price falls → equilibrium restored.",
    "Markets self-correct through the price mechanism unless government intervenes."
  ]},
  { title: "Consumer & Producer Surplus", points: [
    "CS = area below D, above price. PS = area above S, below price.",
    "CS + PS = total economic surplus, maximised at free-market equilibrium.",
    "Tax/price control → reduces total surplus → creates deadweight loss.",
    "An increase in D raises PS unambiguously; an increase in S raises CS unambiguously."
  ]},
  { title: "Price Mechanism Functions", points: [
    "Rationing: prices allocate scarce goods to those willing and able to pay.",
    "Incentive: price changes motivate buyers and sellers to adjust behaviour.",
    "Signalling: prices convey information about relative scarcity and desirability."
  ]},
  { title: "Indirect Taxes", points: [
    "Specific tax: fixed per unit → parallel shift of S upward.",
    "Ad valorem tax: % of price → S pivots upward (wider gap at higher prices).",
    "Price rises by less than the tax; quantity falls; deadweight loss created.",
    "Tax incidence: inelastic side bears more burden. Perfectly inelastic demand → consumer pays all."
  ]},
  { title: "Subsidies", points: [
    "Subsidy shifts S down/right → lower price, higher quantity.",
    "Benefit shared: inelastic demand → more benefit to producers; elastic demand → more to consumers.",
    "Government cost = subsidy per unit × new quantity. Taxpayers bear the cost.",
    "May cause allocative inefficiency (overproduction) if no market failure to correct."
  ]},
  { title: "Alternative Behaviour Views", points: [
    "Consumers: bounded rationality, heuristics, loss aversion, present bias, nudge theory.",
    "Producers: may satisfice, revenue maximise, sales maximise, or pursue CSR.",
    "Principal–agent problem: managers may not maximise profit for shareholders.",
    "Behavioural economics challenges the assumption of rational, self-interested agents."
  ]}
],

'market-failure': [
  { title: "Market Failure Overview", points: [
    "Market failure = free market fails to achieve allocative efficiency (P ≠ MSC).",
    "Results in overproduction, underproduction, or non-provision of goods.",
    "Types: externalities, public goods, merit/demerit goods, information failures, moral hazard, monopoly power."
  ]},
  { title: "Externalities", points: [
    "MSC = MPC + MEC; MSB = MPB + MEB.",
    "Negative externality of production: MSC > MPC → overproduction. Examples: pollution, carbon emissions.",
    "Negative externality of consumption: MSB < MPB → overconsumption. Examples: smoking, alcohol.",
    "Positive externality of production: MSC < MPC → underproduction. Examples: R&D spillovers, worker training.",
    "Positive externality of consumption: MSB > MPB → underconsumption. Examples: education, vaccination.",
    "Welfare loss = triangle between social and private curves, from Qm to Qopt."
  ]},
  { title: "Public Goods", points: [
    "Two characteristics: non-rival (zero MC for extra user) and non-excludable (cannot prevent free riders).",
    "Free-rider problem → no revenue → private firms will not supply → complete market failure.",
    "Solution: government provision funded by taxation.",
    "Quasi-public goods: possess some characteristics (e.g., roads — non-excludable but rival when congested)."
  ]},
  { title: "Merit & Demerit Goods", points: [
    "Merit goods: underconsumed due to positive externalities + information failure (e.g., education, healthcare).",
    "Demerit goods: overconsumed due to negative externalities + information failure (e.g., cigarettes, alcohol).",
    "Both involve a value judgement by government about desirable consumption levels.",
    "Key distinction: merit/demerit goods combine externalities WITH information failure."
  ]},
  { title: "Information Failures & Moral Hazard", points: [
    "Imperfect info: consumers lack knowledge about quality, price, or consequences.",
    "Asymmetric info: one party has more information than the other (e.g., seller vs. buyer).",
    "Adverse selection: occurs BEFORE a transaction (wrong types self-select).",
    "Moral hazard: occurs AFTER an agreement — greater risk-taking because costs are not fully borne.",
    "Solutions: regulation, co-payments, monitoring, performance incentives."
  ]},
  { title: "Monopoly as Market Failure", points: [
    "Monopolist sets P > MC → allocative inefficiency → deadweight welfare loss.",
    "Output restricted below competitive level; consumer surplus transferred as supernormal profit.",
    "May cause X-inefficiency (lack of incentive to minimise costs).",
    "Counter-argument: economies of scale, dynamic efficiency (R&D investment)."
  ]}
],

'government-intervention': [
  { title: "Taxes to Correct Externalities", points: [
    "Set tax = MEC at Qopt → internalises the externality → shifts MPC to align with MSC.",
    "Advantages: market-based, generates revenue, incentivises cleaner methods.",
    "Problems: hard to calculate exact MEC, may be regressive, demand inelasticity limits effectiveness.",
    "Risk of government failure if tax is set at the wrong level."
  ]},
  { title: "Subsidies to Correct Externalities", points: [
    "Set subsidy = MEB at Qopt → shifts supply right → increases output to Qopt.",
    "Advantages: increases consumption of merit goods, lowers consumer price.",
    "Problems: opportunity cost (taxpayer funds), hard to calculate MEB, may create dependency.",
    "Risk of overcorrection or poor targeting (government failure)."
  ]},
  { title: "Maximum Prices (Price Ceilings)", points: [
    "Set below equilibrium → excess demand (shortage) → rationing needed.",
    "Advantages: improves affordability for low-income consumers.",
    "Problems: shortages, black markets, reduced supply incentive, DWL, lower quality long-run.",
    "Example: rent controls — affordable but reduce housing investment."
  ]},
  { title: "Minimum Prices (Price Floors)", points: [
    "Set above equilibrium → excess supply (surplus) → government may need to buy surplus.",
    "Advantages: guarantees producer income, can discourage demerit good consumption.",
    "Problems: surpluses (waste), higher consumer prices, DWL, may cause unemployment.",
    "Example: minimum alcohol pricing, EU CAP agricultural supports."
  ]},
  { title: "Tradeable Pollution Permits", points: [
    "Government sets cap on total emissions, firms trade permits on a market.",
    "Firms that can cut cheaply sell permits; high-cost firms buy them — cost-effective.",
    "Cap guarantees quantity reduction; price is market-determined.",
    "Problems: cap-setting difficulty, price volatility, lobbying, monitoring costs, pollution hotspots."
  ]},
  { title: "State Provision & Information", points: [
    "State provision: necessary for public goods (free-rider problem), useful for merit goods (free/subsidised).",
    "Problems: opportunity cost, allocative/productive inefficiency, political influence.",
    "Information provision: health warnings, labelling, campaigns — low cost, non-coercive.",
    "Problems: may be ignored (bounded rationality, addiction), slow to take effect."
  ]},
  { title: "Regulation & Deregulation", points: [
    "Regulation: command-and-control, sets legal limits — effective for banning harmful activities.",
    "Problems: costly enforcement, one-size-fits-all, regulatory capture, compliance costs.",
    "Deregulation: removes rules to boost competition — lower prices, more innovation.",
    "Problems: may reduce safety/quality, can increase market power, e.g., 2008 financial crisis."
  ]},
  { title: "Government Failure", points: [
    "Government failure: intervention causes net welfare loss or fails to correct market failure.",
    "Causes: imperfect info, unintended consequences, admin costs, political self-interest, regulatory capture.",
    "Examples: CAP surpluses, rent control shortages, biofuel deforestation, 2008 deregulation.",
    "Always evaluate intervention risk against the cost of leaving the market failure uncorrected."
  ]}
],

'measures-economic-performance': [
  { title: "GDP Essentials", points: [
    "GDP = total value of final goods and services produced within an economy in a year",
    "Real GDP adjusts for inflation (use this for growth comparisons); Nominal GDP does not",
    "GDP per capita = GDP / Population (better for living standards comparisons)",
    "PPP adjusts for cost of living differences between countries",
    "Three methods: Output (value added), Income (wages + rent + interest + profit), Expenditure (C+I+G+(X-M))",
    "All three methods should give the same figure in theory"
  ]},
  { title: "GDP Limitations", points: [
    "Ignores income distribution (inequality)",
    "Misses informal/shadow economy and non-market activities (housework, volunteering)",
    "Doesn't account for quality improvements or negative externalities",
    "Ignores leisure time and sustainability of growth",
    "HDI is an alternative combining GDP per capita, life expectancy, and education"
  ]},
  { title: "CPI and Inflation", points: [
    "CPI tracks price changes in a basket of ~700 goods, weighted by spending share",
    "Inflation rate = % change in CPI over 12 months",
    "CPI limitations: substitution bias, quality changes, not representative, excludes mortgage costs",
    "Demand-pull inflation: AD rises faster than AS (too much money chasing too few goods)",
    "Cost-push inflation: rising production costs shift SRAS left (can cause stagflation)",
    "Inflation harms those on fixed incomes, savers, and international competitiveness"
  ]},
  { title: "Deflation", points: [
    "Deflation = sustained fall in the general price level (negative inflation rate)",
    "Benign deflation from productivity gains (good); Malign deflation from falling AD (bad)",
    "Deflationary spiral: falling prices -> delayed spending -> less demand -> further price falls",
    "Deflation increases real debt burden and real interest rates",
    "Disinflation is different: it means the inflation rate is falling, not that prices are falling"
  ]},
  { title: "Unemployment", points: [
    "ILO definition: without work, actively seeking, available to start",
    "Claimant count: those claiming benefits (easy to measure, but underestimates)",
    "LFS: quarterly survey using ILO definition (internationally comparable, usually higher figure)",
    "Types: Frictional (between jobs), Structural (skills mismatch), Cyclical (demand-deficient), Seasonal",
    "Costs: lost output, lower tax revenue, higher benefit spending, hysteresis, social problems"
  ]},
  { title: "Current Account", points: [
    "Current account = trade in goods + trade in services + primary income + secondary income",
    "UK: typically deficit in goods, surplus in services",
    "Deficit causes: strong demand for imports, uncompetitive exports, overvalued exchange rate",
    "Surplus causes: competitive exports, weak domestic demand, undervalued exchange rate",
    "Deficits financed by capital/financial account surpluses (foreign investment inflows)",
    "Whether a deficit is a 'problem' depends on cause, size, and how it is financed"
  ]}
],

'aggregate-demand': [
  { title: "AD Components", points: [
    "AD = C + I + G + (X - M)",
    "Consumption (C) is the largest component (~60-65% of GDP)",
    "Investment (I) is the most volatile component",
    "Government spending (G) excludes transfer payments",
    "Net exports (X-M): positive = trade surplus; negative = trade deficit"
  ]},
  { title: "Why AD Slopes Downward", points: [
    "Wealth effect: lower prices increase real value of wealth, boosting spending",
    "International competitiveness: lower domestic prices make exports cheaper, imports dearer",
    "Interest rate effect: lower prices reduce demand for money, lowering interest rates, boosting C and I",
    "A movement ALONG AD = change in price level; a SHIFT of AD = change in C, I, G, or (X-M)"
  ]},
  { title: "Key Determinants of C and I", points: [
    "Consumption: disposable income, interest rates, confidence, wealth, credit availability, taxes",
    "Investment: interest rates, business confidence ('animal spirits'), government policy, technology, spare capacity",
    "Higher MPC = higher proportion of extra income spent = larger multiplier effect",
    "Animal spirits (Keynes): investment driven by confidence and expectations, not just rational calculation"
  ]},
  { title: "The Multiplier", points: [
    "Multiplier = 1/(1-MPC) = 1/MPW where MPW = MPS + MPT + MPM",
    "An initial injection leads to a LARGER final change in national income",
    "Works in both directions (expansionary and contractionary)",
    "Larger when MPC is high and leakages (saving, tax, imports) are low",
    "Limitations: time lags, crowding out, may cause inflation at full capacity, hard to measure"
  ]},
  { title: "The Accelerator", points: [
    "Investment depends on the RATE OF CHANGE of national income, not just its level",
    "Rising income at increasing rate = rising investment; rising income at decreasing rate = falling investment",
    "Makes investment highly volatile — amplifies the business cycle",
    "Multiplier-accelerator interaction can cause cumulative expansion or contraction",
    "Weak when there is spare capacity (firms can meet demand from existing resources)"
  ]}
],

'aggregate-supply': [
  { title: "SRAS Essentials", points: [
    "SRAS slopes upward: higher prices = higher profit margins = firms produce more (while costs are fixed in short run)",
    "SRAS shifts RIGHT when production costs fall (lower input costs, higher productivity, lower indirect taxes, stronger exchange rate for importers)",
    "SRAS shifts LEFT when production costs rise (higher oil prices, higher wages, weaker exchange rate, higher indirect taxes)",
    "SRAS becomes steeper as the economy approaches full capacity (bottlenecks and resource scarcity)"
  ]},
  { title: "LRAS: Classical vs Keynesian", points: [
    "Classical LRAS: VERTICAL at full employment output (Yfe) — changes in AD only affect prices in the long run",
    "Keynesian LRAS: Three sections — horizontal (spare capacity), upward sloping (bottlenecks), vertical (full capacity)",
    "Classical: economy self-corrects via flexible wages and prices",
    "Keynesian: wages are sticky downwards, so economy can stay below Yfe — government intervention needed",
    "Both agree LRAS shifts right with supply-side improvements (better technology, more/better factors of production)"
  ]},
  { title: "Shifting LRAS", points: [
    "More labour: immigration, population growth, higher participation rates",
    "Better labour: education, training, healthcare (human capital)",
    "More capital: investment in machinery, infrastructure, technology",
    "Better capital: technological innovation and adoption",
    "Natural resources: discovery of new resources",
    "Institutional: property rights, rule of law, deregulation, reduced corruption"
  ]},
  { title: "AD/AS Scenarios", points: [
    "Demand-pull inflation: AD shifts right -> higher PL AND higher Y (short run)",
    "Cost-push inflation: SRAS shifts left -> higher PL AND lower Y (stagflation)",
    "Economic growth: LRAS shifts right -> potential for non-inflationary growth",
    "Recession: AD shifts left -> lower PL (or disinflation) AND lower Y (negative output gap)",
    "Always identify what happens to BOTH price level and real output"
  ]},
  { title: "Key Evaluation Points", points: [
    "Classical: long-run self-correction works if wages/prices are flexible; supply-side policies are key",
    "Keynesian: self-correction is slow or fails; demand management is essential in recessions",
    "Cost-push inflation creates a policy dilemma: boosting AD raises inflation, tightening worsens recession",
    "Near full capacity, AD increases are mostly inflationary; with spare capacity, they mostly increase output",
    "Short-run and long-run effects often differ — always distinguish between them"
  ]}
],

'national-income': [
  { title: "Circular Flow of Income", points: [
    "Two-sector model: households supply factors to firms, firms pay factor incomes; income = output = expenditure",
    "Three-sector adds government: taxation (withdrawal), government spending (injection)",
    "Four-sector adds foreign sector: imports (withdrawal), exports (injection)",
    "Full model: three withdrawals (S, T, M) and three injections (I, G, X)"
  ]},
  { title: "Injections and Withdrawals", points: [
    "Withdrawals (leakages): savings, taxation, imports - reduce the circular flow",
    "Injections: investment, government spending, exports - increase the circular flow",
    "MPW = MPS + MPT + MPM (marginal propensity to withdraw)",
    "Actual J always = actual W (accounting identity); planned J may differ from planned W"
  ]},
  { title: "Equilibrium National Income", points: [
    "Equilibrium where planned injections = planned withdrawals (I + G + X = S + T + M)",
    "If planned J > planned W: unplanned stock falls, output rises, national income rises",
    "If planned W > planned J: unplanned stock rises, output falls, national income falls",
    "Equilibrium does NOT mean full employment - can have deflationary or inflationary gap"
  ]},
  { title: "The Multiplier", points: [
    "Multiplier (k) = 1 / MPW = 1 / (1 - MPC)",
    "Change in national income = multiplier x change in injection",
    "Works because one person's spending is another's income; each round is smaller due to leakages",
    "Higher MPW = smaller multiplier; lower MPW = larger multiplier",
    "Multiplier is larger when economy has spare capacity; weaker near full employment"
  ]},
  { title: "Circular Flow and AD", points: [
    "Rise in injections = rightward shift in AD; rise in withdrawals = leftward shift in AD",
    "AD = C + I + G + (X - M) maps directly onto circular flow components",
    "Multiplier explains why AD shifts by more than the initial change in spending",
    "Circular flow provides the mechanism through which AD changes affect national income"
  ]}
],

'economic-growth': [
  { title: "Actual vs Potential Growth", points: [
    "Actual growth: annual % change in real GDP; caused by demand-side factors; shown by AD shift or movement toward PPF",
    "Potential growth: increase in productive capacity; caused by supply-side factors; shown by LRAS shift or outward PPF shift",
    "Actual growth can occur without potential growth (using spare capacity) and vice versa"
  ]},
  { title: "Output Gaps", points: [
    "Positive output gap: actual GDP > potential GDP; above-trend growth; inflationary pressure; unsustainable",
    "Negative output gap: actual GDP < potential GDP; spare capacity; unemployment; deflationary pressure",
    "Output gap = (Actual GDP - Potential GDP) / Potential GDP x 100"
  ]},
  { title: "Business Cycle Phases", points: [
    "Boom: high growth, low unemployment, rising inflation, positive output gap, rising asset prices",
    "Recession: negative growth (2 consecutive Qs), rising unemployment, falling confidence, falling investment",
    "Slump: lowest point, high unemployment, possible deflation, large negative output gap",
    "Recovery: growth turns positive, unemployment falls, confidence returns, negative output gap closes"
  ]},
  { title: "Causes of Growth", points: [
    "Demand-side: rises in C, I, G, or (X-M) shift AD right causing actual growth",
    "Supply-side: capital investment, human capital, technology, institutions, resources shift LRAS right",
    "Demand-side growth is limited near full capacity; may cause inflation instead of real output gains"
  ]},
  { title: "Costs and Benefits", points: [
    "Benefits: higher living standards, lower unemployment, better public services, poverty reduction, fiscal dividend",
    "Costs: inflation, environmental damage, inequality, current account deterioration, structural unemployment",
    "Sustainable growth: meets present needs without compromising future generations; requires environmental balance"
  ]}
],

'macroeconomic-objectives-policies': [
  { title: "Macroeconomic Objectives", points: [
    "Four main objectives: economic growth, low inflation, low unemployment, balance of payments equilibrium",
    "Key conflicts: growth vs inflation, unemployment vs inflation (Phillips Curve), growth vs current account, growth vs environment",
    "Policy-makers must prioritise and accept trade-offs between conflicting objectives"
  ]},
  { title: "Fiscal Policy", points: [
    "Government spending (G) and taxation (T) used to influence AD; set by government in annual budget",
    "Expansionary: raise G / cut T to boost AD; Contractionary: cut G / raise T to reduce AD",
    "Automatic stabilisers work without policy changes; discretionary policy requires deliberate action",
    "Weaknesses: time lags, crowding out, political influence, rising national debt, multiplier may be small"
  ]},
  { title: "Monetary Policy", points: [
    "Interest rates and money supply set by independent central bank (Bank of England MPC)",
    "Transmission mechanism: interest rate change affects borrowing cost, saving, C, I, asset prices, exchange rate, then AD",
    "QE used when rates at zero lower bound: central bank buys bonds with new money to boost money supply",
    "Weaknesses: 12-24 month lag, blunt instrument, less effective in liquidity trap, asymmetric"
  ]},
  { title: "Supply-Side Policies", points: [
    "Aim to increase productive capacity (shift LRAS right); two types: market-based and interventionist",
    "Market-based: deregulation, privatisation, tax cuts, labour market flexibility, trade liberalisation",
    "Interventionist: education/training, infrastructure, industrial policy, healthcare, regional policy",
    "Strengths: growth without inflation, long-lasting; Weaknesses: long time lags, may increase inequality"
  ]},
  { title: "Phillips Curve and Trade-Offs", points: [
    "Short-run Phillips Curve: inverse relationship between unemployment and inflation",
    "Long-run Phillips Curve: vertical at the natural rate; no long-run trade-off",
    "Supply-side policies can shift the Phillips Curve left, reducing both unemployment and inflation",
    "Best approach: combine demand-side stabilisation (short run) with supply-side reform (long run)"
  ]}
]

};


async function main() {
  const ids = Object.keys(ORIGINAL_NOTES);
  console.log(`Reverting ${ids.length} sections to original notes...\n`);

  let success = 0;
  let failed = 0;

  for (const id of ids) {
    const notes = ORIGINAL_NOTES[id];
    const totalPoints = notes.reduce((s, sec) => s + sec.points.length, 0);

    const { error } = await supabase
      .from('section_notes')
      .update({ data: notes })
      .eq('section_id', id);

    if (error) {
      console.log(`  ✗ ${id}: ${error.message}`);
      failed++;
    } else {
      console.log(`  ✓ ${id} — reverted (${notes.length} sections, ${totalPoints} points)`);
      success++;
    }
  }

  console.log(`\nDone: ${success} reverted, ${failed} failed.`);
}

main();
