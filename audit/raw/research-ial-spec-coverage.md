SPEC COVERAGE AUDIT: REVVY LEARN vs PEARSON EDEXCEL IAL ECONOMICS (2018) AND IAL BUSINESS (2017)

SOURCES (all fetched and text-extracted with pdftotext; page refs are to the spec PDFs)
- IAL Economics spec Issue 2 (June 2018): https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Economics/2018/Specification-and-Sample-Assessment/International-A-Level-Economics-spec.pdf
- IAL Business spec Issue 1 (Sept 2017): https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Business/2018/Specification-and-Sample-Assessment/International-A-Level-Business-Spec.pdf
- WEC11 Jan 2023 mark scheme: https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Economics/2018/Exam-materials/wec11-01-rms-20230302.pdf
- WEC13 Jan 2023 mark scheme: https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Economics/2018/Exam-materials/wec13-01-rms-20230302.pdf
- WBS11 Oct 2022 question paper: https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Business/2018/Exam-materials/wbs11-01-que-20221012.pdf
- WBS13 Oct 2024 question paper: https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Business/2018/Exam-materials/wbs13-01-que-20241023.pdf
- IAL Business assessment support page: https://qualifications.pearson.com/en/news-policy/subject-updates/business/ial-business-assessment-support-page.html
- IAL Business & Economics guide: https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Business/IAL-Business-and-Economics-Guide.pdf
Extracted spec text is at /private/tmp/claude-503/-Users-arongijsel-Claude-APP/d0d0e740-ce29-4795-8742-653e772cf3c1/scratchpad/econ_spec.txt and bus_spec.txt.


1. SPEC HEADINGS WITH NO SECTION (top-level x.3.x headings)

Result: NONE missing. All 43 app sections map 1:1 onto the spec's numbered headings, in the correct order and with the correct IAL numbering.
- Economics: 1.3.1-1.3.6, 2.3.1-2.3.6, 3.3.1-3.3.5, 4.3.1-4.3.6 = 23 headings, 23 sections. Titles match verbatim except: app 4.3.6 "Growth and Development" vs spec "Growth and development in developing, emerging and developed economies"; app 3.3.5 "Government Intervention" (same as spec, but collides with app 1.3.6 title "Government Intervention" in index.json - two sections with identical titles in different units).
- Business: 1.3.1-1.3.5, 2.3.1-2.3.5, 3.3.1-3.3.6, 4.3.1-4.3.4 = 20 headings, 20 sections. All titles match.

Strength: heading-level structure is exactly the IAL spec, not the UK Theme 1-4 structure.

Coverage gaps are one level down (the numbered sub-topics inside each heading). Sub-topic-level gaps found by term scan across ALL sections (content[] + notes, case-insensitive; only the notable ones):
- econ 4.3.5 role-state-macroeconomy (2 blocks, 4 subsections): spec has 4 sub-topics (Public expenditure; Taxation; Public sector borrowing and debt; Macroeconomic policies). App has zero hits for "public expenditure", "capital expenditure", "regressive", "fiscal deficit", "national debt", "automatic stabiliser", "crowding out", "transfer pricing", "2008", "intergenerational". Blocks are "Market Failure and the State" and "Macroeconomic Policy" - roughly three of four spec sub-topics are absent. Largest gap in the catalogue.
- bus 3.3.5 assessing-competitiveness (2 blocks): spec = financial statements, ratio analysis (GPM, profit-for-year margin, current, acid test, gearing, ROCE), HR metrics (labour productivity, turnover/retention, absenteeism) + HR strategies. App has no "acid test", "balance sheet/statement of financial position", "labour productivity", "labour turnover", "absenteeism", "retention", "employee share". Second block "Core Competencies" (sections vrio-framework, tangible-intangible-competencies) is NOT in the IAL spec at all (spec grep "core compet"/"distinctive capabilit" = 0 hits). This is UK GCE 3.1.3-style content.
- bus 3.3.6 managing-change (2 blocks "Types of Change", "Managing Resistance"): spec sub-topic 2 "Contingency planning" (risk assessment: natural disasters, IT failure, loss of key staff; business continuity; succession planning) is absent (0 hits for contingency, succession, business continuity, risk assessment). Spec 1e "Transformative leadership" absent.
- bus 3.3.1 business-objectives-strategy: no "PESTLE", "five forces", "portfolio" (spec 3.3.1.2b, 3.3.1.4).
- bus 3.3.3 decision-making-techniques: spec 3.3.3.2 "Investment appraisal" (simple payback, ARR, NPV) and 3.3.3.5 "Contribution" not found ("average rate of return", "net present value", "contribution" = 0 hits). Block "Sales Forecasting" duplicates bus 2.3.2.
- bus 4.3.1 globalisation: no "emerging"/"BRICS" (spec 4.3.1.1 characteristics of developed/developing/emerging), no "protectionism" (4.3.1.4), no "trading bloc" (4.3.1.5 - block is titled "Trade Blocs" but the spec term "trading bloc" never appears).
- bus 4.3.2: no "pull" factors, "offshoring", "outsourcing", "spreading risk" (spec 4.3.2.1, 4.3.2.4).
- bus 4.3.4: no "stakeholder conflict", "pay and working conditions", "legal control", "political influence" (spec 4.3.4.2, 4.3.4.3).
- bus 2.3.1: no "family and friends", "peer(-to-peer)", "grant", "leasing" (spec 2.3.1.3 external finance list).
- econ 3.3.5 government-intervention-firms: no "competitive tendering", "maximum wage", "national insurance", "local sourcing", "trade liberalisation" (spec 3.3.5.1c-d, 3.3.5.2b).
- econ 4.3.6: no "Lewis" model, "capital flight", "tourism" (spec 4.3.6.2a, 4.3.6.3c).
- econ 1.3.2 consumer-behaviour-demand: spec 1.3.2.1b lists six reasons consumers may not maximise utility (herding, habitual behaviour, inertia, poor computational skills, need to feel valued, framing and bias); app has 0 hits for herding, inertia, computational, feel valued, framing. Also missing "durability" (PED factor 1.3.2.3d) and PED along a "straight line" demand curve (1.3.2.3f).
- econ 1.3.3 supply: no "ad valorem"/"specific" tax, "perishab(ility)", "legal constraint" (spec 1.3.3.1c, 1.3.3.2c).
- econ 1.3.6: no "property rights" (spec lists "extension of property rights" as an intervention method), no "agriculture"/"commodities"/"lack of incentives".
- econ 4.3.4 poverty-inequality: "wealth inequality" (spec 4.3.4.2a distinction wealth vs income inequality) absent. Lorenz/Gini present - good.
- econ 3.3.1: "sales volume maximisation", "not-for-profit", "public sector" absent (spec 3.3.1.1a, 3.3.1.3a/c).

Content in the app that is NOT in the IAL spec (GCE leftovers, risk of confusing students):
- econ 1.3.4 price-determination block "Alternative Views of Consumer & Producer Behaviour" (sections behavioural-economics, bounded-rationality; examMatters tells students to name biases and nudges). There is no such heading in IAL 1.3.4; the only behavioural content in IAL is 1.3.2.1b. The examMatters text is UK Theme 1.2.10 advice.
- econ 1.3.5 market-failure block "Merit Goods & Demerit Goods" (3 sections): the words "merit"/"demerit" appear 0 times in the IAL Economics spec. IAL uses external benefits/costs of consumption + information gaps.
- econ 1.3.5 block "Market Power as Market Failure" (monopoly deadweight loss): not in IAL 1.3.5; monopoly is Unit 3 (3.3.3.6).
- econ 1.3.5 blocks use "deadweight loss" throughout (32 hits); spec uses "welfare loss or gain areas" (1.3.5.2d) and never "deadweight".
- econ 2.3.2 aggregate-demand block "The Accelerator Effect": 0 hits in IAL spec.
- bus 3.3.5 "Core Competencies"/VRIO as above.
- bus 4.3.3 global-marketing: ethnocentric/polycentric/geocentric not in spec (fine that they are absent).


2. SUB-BULLETS MISSING INSIDE THE 3 SAMPLED SECTIONS

2a. economics__introductory-concepts.json (spec 1.3.1, spec p.13-14; 6 sub-topics, 20 lettered bullets)
App blocks: The Nature of Economics > [economics-as-a-social-science, positive-and-normative]; Scarcity, Choice and Opportunity Cost > [the-basic-economic-problem, opportunity-cost]; Production Possibility Frontiers > [the-ppf-model, shifts-of-the-ppf]; Specialisation, Division of Labour and Exchange > [specialisation-and-division-of-labour, money-and-exchange]; Economic Systems > [free-market-command-and-mixed, the-price-mechanism].
Covered well: 1a (inability to experiment), 1b/1c (models, ceteris paribus - 6 hits), 2a/2b (positive/normative, value judgements), 3a/3c, 4a/4b, 5a incl. Adam Smith (4 hits), 5b money functions incl. deferred payment, 6a/6b/6c.
Missing:
- 3b "renewable and non-renewable resources" - 0 hits.
- 3d "free goods and economic goods" - 0 hits in content (1 in notes).
- 4a bullet "opportunity cost (using marginal analysis)" - "marginal" 0 hits.
- 4c "capital goods and consumer goods" and 4d "significance of capital goods for productivity and growth" - 0 hits for either term. This is a common WEC11 MCQ/PPF-axis question.
- 5c "The role of financial markets" (facilitate saving, funds for businesses/individuals, exchange, forward markets in commodities/currencies, market for equities) - 0 hits for "financial market", "forward market", "saving". Entire sub-bullet absent; this is IAL-specific (see section 3).
Not in spec but present: block 4 section the-price-mechanism (signalling/incentive/rationing) is spec 1.3.4.3, and is duplicated in price-determination > "Functions of the Price Mechanism". Diagram "Circular Flow of Income" belongs to 2.3.4, not 1.3.1.

2b. economics__market-failure.json (spec 1.3.5, p.19-20; 6 sub-topics)
App blocks: Types of Market Failure; Externalities (4 sections, one per production/consumption x positive/negative); Public Goods; Merit Goods & Demerit Goods; Information Failures; Market Power as Market Failure; Welfare Loss & Deadweight Loss.
Covered well: 1a, 2a-2d (private/external/social cost & benefit, marginal analysis diagrams, welfare loss areas), 3a/3b (rival/excludable, free rider), 4a (symmetric/asymmetric, 14 hits), 5a moral hazard (9 hits) and 5b "insurance" (5 hits).
Missing:
- 1b bullet "speculation and market bubbles" and entire sub-topic 6 "Speculation and market bubbles" (how bubbles arise; impact on consumers/producers/workers/governments in housing and stocks and shares) - "bubble", "speculat", "housing", "stocks" all 0 hits. The WEC11 Jan 2023 Section C data response was entirely about a New Zealand housing bubble (12(a) define market failure, 12(e) "discuss the likely microeconomic effects of a housing market bubble"), so this is an examined gap.
- 5b moral hazard in "banking" - 0 hits (insurance covered, banking not).
- 4c contexts: "pensions" 0 hits, "environment" 0 hits; "transport" only 1 hit. Spec asks for externalities in transport/health/education/environment/financial (2e) and information failure in healthcare/education/pensions/insurance (4c).
- 4b "significance of information gaps" - "information gap" 1 hit (the spec's term; app uses "information failure").
Not in spec (see section 1): Merit/Demerit block, Market Power block, "deadweight loss" terminology (IAL says "welfare loss").

2c. business__meeting-customer-needs.json (spec 1.3.1, p.13; 3 sub-topics)
App blocks: The Market: Mass vs Niche > [mass-markets, niche-markets, dynamic-markets]; Competition, Risk and Uncertainty > [competition, risk-vs-uncertainty]; Market Research Methods > [primary-research, secondary-research, qualitative-vs-quantitative]; Sampling Methods > [types-of-sampling, sample-size-and-bias]; Market Positioning and Orientation > [product-vs-market-orientation, market-mapping]; Segmentation and Competitive Advantage > [market-segmentation, competitive-advantage, adding-value].
Covered well: 1a characteristics, 1b dynamic markets, 1c competition, 1d risk vs uncertainty (16-23 hits), 2a purpose of research, 2d sampling (random/quota/stratified all present), 3a-3d, 3f adding value.
Missing / thin:
- 1a bullets "market size and market share" - only 1 and 3 hits in content (9/6 in notes); no worked calculation of market share (a Calculate-4 staple; WBS11 Oct 2022 Q1(a) was "Define market share").
- 1a "brands" - 16 hits in content but no dedicated section (notes tab has a "Branding" note that Learn Mode does not surface).
- 1b bullet "online retailing" - 1 hit.
- 2b primary methods: "consumer panels" 0, "product trials" 0 (test marketing 2, focus groups 4, surveys 2, interviews 3).
- 2c secondary methods: "social media" 0, "databases" 0, "newspapers/magazines/TV/radio" 1 hit, "websites" 1.
- 2a purposes "quantify likely demand" - 0 hits for "quantify".
- 3e "The purpose of product differentiation" - "product differentiation" 0 hits in content (3 in notes); "differentiat" only 2.
- "Sample size and bias" section exists but spec 1.3.1.2d does not require it (harmless).
Also: index.json shows reorder 0 / fillin 0 / diagrams 0 for this section, so Learn Mode has no recall widgets or diagram here at all, unlike the-market (5/6) or marketing-mix-strategy (6/9).


3. IAL-SPECIFIC THINGS THE CONTENT MUST GET RIGHT (vs UK GCE Economics A 9EC0 / Business 9BS0)

Economics
- Numbering/structure: IAL is Units 1-4 with headings 1.3.x-4.3.x; there are no "Themes" and no 1.1.x/1.2.x codes. App gets this right.
- Behavioural economics is NOT a standalone topic in IAL Unit 1. The only behavioural content is 1.3.2.1b: six listed reasons consumers may not maximise utility (herding, habitual behaviour, inertia, poor computational skills, need to feel valued, framing and bias). No "nudges", "choice architecture", "default choices", "bounded self-control", "anchoring" as in GCE 1.2.10/1.4.? The app's price-determination block "Alternative Views of Consumer & Producer Behaviour" and its examMatters ("name specific biases... explain how a nudge could address it") teaches the GCE version and omits the six IAL bullets.
- Merit/demerit goods are not IAL vocabulary (0 occurrences). IAL frames these as external benefits/costs of consumption and information gaps; mark schemes credit "external benefits of consumption" not "merit good".
- IAL says "welfare loss/gain areas" (1.3.5.2d), not "deadweight loss".
- IAL 1.3.1 uniquely includes: Adam Smith's views on division of labour (5a), money as "method of deferred payment" (5b), and "The role of financial markets" (5c: saving, funds for business, exchange, forward markets, equities). GCE Theme 1 has none of 5c (it sits in GCE Theme 4.4). App has 5a/5b, lacks 5c.
- IAL 1.3.1 includes renewable vs non-renewable resources, free vs economic goods, capital vs consumer goods (3b, 3d, 4c, 4d). GCE 1.1.2/1.1.3 has similar; app lacks all four.
- IAL 1.3.5 uniquely includes moral hazard (insurance, banking) and speculation/market bubbles (housing, stocks and shares) INSIDE Unit 1 market failure. In GCE these are Theme 4 financial-market failure. App has moral hazard, lacks bubbles.
- IAL 1.3.4 puts indirect taxes and subsidies (impact and incidence on consumers/producers/government) under Price determination; 1.3.6 then lists interventions: indirect taxation (ad valorem and specific), subsidies, maximum and minimum (guaranteed) prices, tradeable pollution permits, extension of property rights, state provision, regulation, provision of information; contexts: health, housing, education, transport, environment, energy, agriculture, commodities. Government failure causes: information gaps, lack of incentives, unintended consequences, excessive administrative costs, moral hazard. App covers most; misses property rights, agriculture/commodities contexts, "lack of incentives".
- PPF: IAL wording is "productive potential", "efficient or inefficient allocation", "possible and unobtainable production", "opportunity cost (using marginal analysis)", "economic growth and decline", plus movements vs shifts. Same as GCE in substance.
- IAL 1.3.3 supply-shift list: costs, new technology, indirect taxes (specific and ad valorem), subsidies, natural disasters. PES factors: time period, stock/perishability, factor mobility, legal constraints, capacity. App lacks ad valorem/specific, perishability, legal constraints.
- IAL 1.3.2 elasticity list: PED, YED, XED with formulae, interpretation of numerical values (five PED categories, four YED categories), factors (availability of substitutes, branding, percentage of total expenditure, addictiveness, durability), TR calculation, PED along a straight-line demand curve, significance for firms/consumers/government. App lacks durability and straight-line PED.
- Unit 2: LRAS shapes "Keynesian" and "classical" (2.3.3.3a) - app has both. Short-run Phillips curve named in 2.3.6.2a - app has it. No accelerator in IAL.
- Unit 3 (WEC13) is "Business behaviour" with 3.3.1 types/sizes/objectives (incl. public vs private sector, satisficing, principal-agent, demergers), 3.3.3 incl. n-firm concentration ratio and monopsony, 3.3.4 labour incl. wage setting in public sector/state-owned enterprises (IAL-specific), 3.3.5 incl. nationalisation, competitive tendering, restrictions on monopsony, maximum wage controls (IAL-specific items GCE lacks). Unit 3 papers "may draw on any content covered in Units 1 and 2" (spec p.31).
- Unit 4 (WEC14) includes 4.3.5 "Role of the state" with Laffer curve, fiscal deficit vs national debt, structural vs cyclical deficits, measures to control TNCs (transfer pricing), demand-side response to the 2008 crisis; 4.3.6 includes Prebisch-Singer, Harrod-Domar, Lewis dual-sector, buffer stocks, microfinance, tourism, debt relief, aid, World Bank/IMF/NGOs. App 4.3.5 largely missing (see section 1).
- Terminology: spec and mark schemes use "external costs/benefits", "social optimum", "information gaps", "guaranteed (minimum) prices", "state provision", "TNCs" (not MNCs) in Economics Unit 4; Business uses "MNCs". App econ 4.3.1 block is titled "Multinational Corporations".
- International context: spec p.40 requires "awareness of trends and developments in the global economy over the last 40 years" and papers use non-UK data (Jan 2023 WEC11: NZ housing, rice minimum price, fertiliser; WEC13: UK energy price cap). Examples should not default to UK institutions (Bank of England/MPC, HMRC, CMA) - IAL students are in HK/SG/MY/PK/LK/ME.
- Quantitative skills are at least 20% of marks (Appendix 7) and calculators are allowed (Appendix 8); every paper has a Draw/Calculate item.

Business
- IAL Business has FOUR units of 5/5/6/4 headings (20 total) vs GCE's four Themes with 6/6/6/4 = many more sub-headings. IAL is leaner: no separate "1.1.x" codes; no GCE 1.4.5 "Business ethics"-in-Theme-1 (IAL puts ethics in 3.3.4); no Theme 2.1.x "Raising finance" split (IAL 2.3.1 merges planning + finance + forms of business + liability).
- IAL 1.3.1 market research primary/secondary lists are explicit (surveys/questionnaires, focus groups/consumer panels, face-to-face/telephone interviews, product trials/test marketing; websites/social media, newspapers/magazines/TV/radio, reports, databases) and sampling is exactly random/quota/stratified. GCE 1.1.3 does not enumerate methods this way; mark schemes reward the listed items.
- IAL 1.3.2 demand factors add "external shocks" and "seasonality" (app the-market lacks "seasonality"); supply list adds "external shocks". Students must "construct" (IAL command word, GCE says "draw") a supply/demand diagram labelled Price/Quantity with old and new equilibrium (support page).
- IAL 1.3.5 adds "intrapreneurship", "barriers to entrepreneurship", "home working", "profit satisficing" (app lacks home working, satisficing, cost efficiency).
- IAL 3.3.1: Ansoff's Matrix, Porter's Strategic Matrix, "aim of portfolio analysis", SWOT, PESTLE, Porter's five forces. No Kay's distinctive capabilities, no VRIO, no "core competences" (GCE 3.1.3 only). App has VRIO/core competencies (should be removed or flagged as beyond spec) and lacks PESTLE/five forces.
- IAL 3.3.3: moving averages, simple payback (plus ARR/NPV per 3.3.3.2), decision trees, critical path analysis, contribution. App lacks ARR/NPV/contribution.
- IAL 3.3.5 HR metrics: labour productivity, labour turnover and retention, absenteeism (GCE 3.5.3 same) - app lacks.
- IAL 3.3.6 has "Contingency planning" (natural disasters, IT failure, loss of key staff; business continuity, succession planning) and "Transformative leadership"; no Kotter/Lewin (correctly absent from app). App lacks contingency planning.
- IAL 4.3.x is Business Unit 4 "Global business": 4.3.1 characteristics of developed/developing/emerging economies, trade liberalisation/WTO, protectionism, trading blocs (EU, ASEAN, NAFTA named); 4.3.2 push/pull factors, assessing a country as a market and as a production location, offshoring/outsourcing, exchange-rate impact; 4.3.3 glocalisation; 4.3.4 MNC impact, stakeholder conflicts, controlling MNCs. Synoptic: Unit 4 "may require students to draw on their knowledge from Units 1, 2 and 3" (spec p.33, line 1310).
- Ratios: PED always negative; percentages must carry "%"; acid test/current ratio expressed as x:1 (support page).


4. EXAM STRUCTURE PER UNIT (for mirroring in Learn Mode practice)

ECONOMICS (spec p.8-10; mark schemes confirm)
- WEC11 Unit 1 Markets in action and WEC12 Unit 2 Macro: 1 hour 45 minutes, 80 marks, calculator allowed, Source booklet.
  Section A: 6 multiple-choice questions, 1 mark each (6). MCQs are single-best-answer with 4 options; some require calculation/diagram reading (QS4/QS8).
  Section B: 5 short-answer questions x 4 marks (20). Jan 2023 WEC11: Q7 "Draw a diagram to illustrate the impact of the introduction of this minimum price for rice" (K1 A3), Q8-Q11 Explain/Calculate-type 4-markers, e.g. "Explain the likely impact of a 5% increase in the price of...". Each is a mini-stimulus (2-4 lines of data).
  Section C: one 5-part data-response question on 2 extracts + figure(s) (34): (a) Define 2 [Jan 2023: "Define the term 'market failure' (Extract A, line 14)"]; (b) Analyse 6 "with reference to paragraph 1 of Extract A... Illustrate your answer with a supply and demand diagram" (K2 A2 An2); (c) Explain 4 (K2 A2, e.g. "explain why the supply of new houses is likely to be price inelastic" - QS8 elasticity); (d) Examine 8 (K2 A2 An2 Ev2, e.g. whether national parks are public goods); (e) Discuss 14 (levels-based, "with reference to Figure 1, Extract A and Extract B, discuss the likely microeconomic effects of a housing market bubble").
  Section D: one 20-mark essay from a choice of two, command word Evaluate (levels-based, e.g. "Evaluate two possible measures that could be introduced to reduce the price that consumers pay for energy"; "Evaluate the impact of the 400% increase in the cost of fertiliser on farmers"). Note the 20-marker still carries a short context line.
- WEC13 Unit 3 Business behaviour and WEC14 Unit 4 Global economy: 2 hours, 80 marks.
  Section A: 6 MCQ x 1 (6).
  Section B: one 5-part data response (34): Jan 2023 WEC13: 7(a) Calculate 2 ("calculate the percentage change in the wholesale price of gas... show your working"; A2); 7(b) Explain 4 ("explain what is meant by the term 'concentration ratio'", K2 A2); 7(c) Analyse 6 ("analyse two barriers to entry", K2 A2 An2); 7(d) Examine 8 (K2 A2 An2 Ev2); 7(e) Discuss 14 ("discuss the likely effects of the increase in the energy price cap on both energy suppliers and consumers. Illustrate your answer with an appropriate cost and revenue diagram").
  Section C: TWO 20-mark Evaluate essays from a choice of three (40). Jan 2023 WEC13 examples: "Evaluate the view that the objectives of state-owned enterprises and private..." ; "Evaluate the benefits of growth by takeover for a business in an industry of your choice".
  Unit 3 and 4 questions may draw on Units 1-2 content (spec p.31, p.40).
- Economics command-word taxonomy (Appendix 6, spec p.68) - the ONLY tariffs used:
  Define 2; Calculate 2 or 4; Draw 4; Explain 4 (two-stage chain when explaining a reason/impact); Analyse 6 (chain of reasoning + diagram, no evaluation); Examine 8 (chain + brief assessment); Discuss 14 (levels, context, different viewpoints); Evaluate / To what extent 20 (multi-stage chains, judgement).
  There is NO 10-mark, NO 12-mark, NO "Assess" and NO "Outline" in IAL Economics.
- App mismatch: every Economics section's practice[] uses marks {4, 6, 10, 20} with command words Define(4), Explain(6), Assess/Analyse(10), Evaluate(20), Outline(4) - e.g. introductory-concepts practice[0] "Define the term 'opportunity cost'. (4 marks)" (spec: Define = 2), practice[2] "Assess the usefulness of a PPF diagram... (10)" (Assess/10 do not exist in Economics), practice[4] "Outline two assumptions... (4)" (Outline not a command word). No 2-mark Define, no Calculate, no Draw, no Examine-8, no Discuss-14 anywhere in the 23 Economics sections. The InlinePractice widget therefore never shows an IAL-shaped item.

BUSINESS (spec p.8-10; papers confirm)
- WBS11 Unit 1 Marketing and people and WBS12 Unit 2 Managing business activities: 2 hours, 80 marks, calculator allowed, all questions source-based (Extracts A-D plus figures/tables in the paper itself - no separate booklet).
  Section A (30): Q1 (a)-(e) on Extracts A/B; Section B (30): Q2 (a)-(e) on Extracts C/D. Oct 2022 WBS11 tariff pattern, identical in both sections: (a) Define 2 ["Define the term 'market share'. (Extract A, line 10)"]; (b) Explain 4 or Construct 4 ["Construct a supply and demand diagram to show the impact on the shoe market..."]; (c) Analyse 6 ("Analyse two elements of the design mix..." - always TWO factors: K2 A2 An2); (d) Discuss 8 (levels, "Discuss the advantages for Birkenstock of using focus groups..."); (e) Assess 10 (levels, "Assess the usefulness of the product life cycle to Birkenstock...").
  Section C (20): Q3 Evaluate 20 on all extracts ("Evaluate the extent to which a centralised organisational structure may benefit Hilton").
  Unit 2 papers may require Unit 1 knowledge (spec p.20).
- WBS13 Unit 3 Business decisions and strategy and WBS14 Unit 4 Global business: 2 hours, 80 marks.
  Section A (40): one question on Extracts A-D; Oct 2024 WBS13: 1(a) Calculate 4 ("calculate, to two decimal places, the current ratio for Samsung"); 1(b) Calculate 4 (PED-based "if a retailer... reduces its price by 4%, calculate..."); 1(c) Discuss 8; 1(d) Assess 12; 1(e) Assess 12.
  Section B (20): one 20-mark question, may embed a quantitative technique ("Using the data in Extracts E and F, and decision tree analysis (DTA) calculations, evaluate...").
  Section C (20): one Evaluate 20 essay on the competitive environment / strategy.
  Unit 3 may draw on Units 1-2; Unit 4 on Units 1-3 (spec lines 831, 1077, 1310).
- Business command-word taxonomy (Appendix 6, spec p.56) - the ONLY tariffs used:
  Define 2; Calculate 4; Construct 4; Explain 4; Analyse 6; Discuss 8; Assess 10 (Units 1/2) or 12 (Units 3/4); Evaluate 20 (conclusion that "proposes a solution and/or recommendations").
  No 14-mark, no Examine, no Draw (it is Construct), no Outline.
- App mismatch: Business practice[] also uses {4, 6, 10, 20} with Define(4), Explain(6), Assess(10), Evaluate(20), Outline(4); Unit 3/4 sections use Assess 10 where the exam uses Assess 12; no Define-2, Calculate-4, Construct-4, Analyse-6 "two factors", or Discuss-8 items; no source extracts at all (every real Business question is anchored to a named extract line). Business Explain-6 does not exist (Explain is 4).
- Mark-scheme conventions worth mirroring in AI grading (from mark schemes + support page): point-based K/A/An/Ev for <=8 marks, levels-based for Discuss/Assess/Evaluate; "two" in the stem means credit best two; Explain 4 in Business = 1 knowledge + 2 application + 1 analysis; Calculate 4 = formula/data/answer/units; % sign required; Evaluate 20 in Business needs a recommendation.


5. STRENGTHS (do not change)
- Section list and numbering exactly match both IAL specs at heading level; no UK Theme numbering anywhere.
- Economics Unit 1-2 sections are richly subdivided (5-8 blocks, 10-24 subsections) and track the spec's numbered sub-topics closely (1.3.4, 1.3.6, 2.3.1, 2.3.3, 2.3.6 had zero missing terms in the scan).
- IAL-only items present: Adam Smith (1.3.1.5a), deferred payment (5b), moral hazard in insurance (1.3.5.5), Keynesian vs classical LRAS, Phillips curve, Lorenz/Gini, Laffer in 4.3.5? (no - only in 2.3.6 scan: missing there too; present in poverty scan? no) - Lorenz and Gini present in 4.3.4; HDI, Prebisch-Singer, Harrod-Domar, buffer stocks, microfinance, IMF/World Bank/NGOs present in 4.3.6; regulatory capture, privatisation, nationalisation, monopsony present in 3.3.5; concentration ratio, kinked demand, price discrimination, natural monopoly, sunk costs present in 3.3.3.
- Business 1.3.3 marketing mix and 1.3.4 managing people had zero missing spec terms (Maslow/Herzberg/Taylor/Mayo, PLC, Boston Matrix, pricing strategies, B2B/B2C, leadership styles all present).
- Business 3.3.x and 4.3.x sections are thin (2 blocks, 4 subsections, 9-14 quiz, 0 recall) relative to Units 1-2 (4-6 blocks, 11-19 subsections, 25 quiz), which matches where the biggest sub-topic gaps in section 1 sit.