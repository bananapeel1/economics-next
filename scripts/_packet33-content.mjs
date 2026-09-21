/**
 * PACKET 33 — globalisation: SIX blocks in the specification's own order, 29 subsections from 4.
 *
 * `structure-07` is the finding: *"Both blocks are exactly one 2-section step each … with only two
 * steps the section is very short for a topic with five spec sub-bullets."* It is right, and the fix
 * is packet 17's: **one subsection is one step**, so the answer is more steps rather than denser
 * ones. Four subsections become 29, and every one of the 28 substantive leaves of `BUS-4.3.1` has a
 * subsection that teaches it — the runner's `LEAF_MAP` names which, and refuses to stage if one is
 * missing.
 *
 * THE BLOCK ORDER IS THE SPECIFICATION'S, WHICH FIXES `structure-05` AT THE ROOT. The live section
 * has "Globalisation & Business" and "Trade Blocs"; the document has 1 Growing economies, 2
 * International trade and business growth, 3 Factors contributing to increased globalisation, 4
 * Protectionism, 5 Trading blocs. Following it puts protectionism where the three MCQs that already
 * test it can be pinned, and leaves no room for the 4.3.2 material (`off-shoring and outsourcing`,
 * `bus_spec.txt:1382`) or the terms in neither specification (`transfer pricing`, `hedging`) that the
 * second half of the old block 0 was made of. Packet 20's lesson: reorder to the specification and
 * the structural findings close at the root instead of being patched.
 *
 * Sub-topic 3 is split across TWO chapters because it has nine leaves and one chapter of nine
 * subsections is a chapter students leave. 3a-3e in chapter 3, 3f-3i in chapter 4.
 *
 * ── WHAT IS NOT HERE, AND WHY ──
 *
 * The integration ladder and trade creation against trade diversion are not taught in this section.
 * Every term they are made of is 0 in `bus_spec.txt` and 1 in `econ_spec.txt`, inside Economics
 * 4.3.2 · 4 (`econ_spec.txt:1659-1670`), which is `trade-global-economy`, packet 39. `topFix-01`, `topFix-05`, `accuracy-02`,
 * `structure-01` and `structure-02` all ask for more of it; the widgets they ask for are built out of
 * this specification's content instead. See `_packet33-util.mjs` for the measurements.
 *
 * ── AND WHAT THE OPENING SUBSECTION IS FOR ──
 *
 * The specification never defines globalisation. It asks what causes it (sub-topic 3) and what it
 * does to businesses (3i, 4e, 5b), which means the definition has to be built from its own
 * sub-topics rather than imported. `accuracy-03` is the live section's "Three forces drive it" —
 * technology, trade liberalisation, deregulation — where the document lists NINE factors, none of
 * which is "deregulation" (0 hits) and none of which is "technology" by that name. The opener
 * therefore says what a student can see in the rest of the chapter list, and chapter 3 does the
 * naming.
 */
import {
  subId, money, qty, pct, bn, mn, round2,
  ECONOMIES, LUMINA, HDI, FACTORS, PROTECTION_REASONS, BARRIERS, BLOCS,
} from './_packet33-util.mjs';

const blockId = (title) => subId(title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));

const recall = (sid, r) => {
  const out = { id: `${sid}:recall`, ...r };
  if (r.type === 'match' && Array.isArray(r.why)) { out.pairs = r.pairs.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  if (r.type === 'classify' && Array.isArray(r.why)) { out.groups = r.groups.map((x, i) => ({ ...x, why: r.why[i] })); delete out.why; }
  return out;
};

const L = LUMINA, E = ECONOMIES;

export const B1 = 'Growing Economies';
export const B2 = 'International Trade and Business Growth';
export const B3 = 'What Drives Globalisation: Trade, Politics, Transport, Firms';
export const B4 = 'Migration, Labour and Structural Change';
export const B5 = 'Protectionism';
export const B6 = 'Trading Blocs';

/* ══ Block 1 — Growing economies (4.3.1 · 1a-1d) ═════════════════════════ */

const whatGlobalisationMeans = (() => {
  const sid = subId('what-globalisation-means-for-a-business');
  return {
    id: sid,
    title: 'What Globalisation Means for a Business',
    keyIdea: 'Globalisation is businesses buying, selling, investing and employing across national borders on a growing scale — and this unit asks what causes that and what it does to firms.',
    body: [
      { type: 'paragraph', text: `This topic is not a description of the world. It is five questions about **firms**, and the unit says so: the effects of globalisation are to be understood *in relation to businesses*. Everything below is about what a manager can now do, and now faces.` },
      { type: 'paragraph', text: `**Globalisation** is the growing scale on which businesses trade, invest, produce and hire across national borders. You can read that definition off this chapter list: firms sell into economies that were too poor to buy from them, buy parts made better or more cheaply somewhere else, build plants abroad, and hire people who have moved.` },
      { type: 'bullets', items: [
        `**Growing economies** — which markets are becoming worth selling to, and how you tell.`,
        `**Trade and business growth** — exports, imports, specialising, and investing abroad.`,
        `**What drives it** — nine factors the specification names, not three.`,
        `**Protectionism** — the barriers governments put back, and what each does to a firm.`,
        `**Trading blocs** — what it is worth being inside one, priced.`,
      ] },
      { type: 'paragraph', text: `One firm runs through all five. **${L.name}** assembles electronic units in a Southeast Asian country: it buys a module in at ${money(L.importedModule)}, adds ${money(L.ownAssembly)} of its own work, and ships the finished unit abroad for ${money(L.freight)}. Every figure below comes from that one unit, so you can watch what each chapter does to it.` },
    ],
    realExample: { emoji: '🏭', text: `A contract assembler is a good test case because it is exposed at both ends: it imports most of what it builds with and exports almost everything it builds.` },
    misconception: `Students treat globalisation as a topic about countries and write an answer with no firm in it. The unit's own description says the effects are to be understood in relation to businesses.`,
    examMatters: `Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by details or examples. Here the effect must land on a business: "world trade grew" is a cause with its effect missing.`,
  };
})();

const threeKindsOfEconomy = (() => {
  const sid = subId('developed-developing-and-emerging-economies');
  return {
    id: sid,
    title: 'Developed, Developing and Emerging Economies',
    keyIdea: 'The three labels describe income a head and what an economy produces, not its size — and a big economy can be a poor market.',
    body: [
      { type: 'paragraph', text: `The specification's first requirement is the *characteristics* of developed, developing and emerging economies. The characteristic that does most work is **income a head**, because that is what decides whether a market can buy what a firm sells.` },
      { type: 'bullets', items: [
        `**Developed** — high income a head, most output and most jobs in services, markets already mature.`,
        `**Developing** — low income a head, output concentrated in farming and raw materials.`,
        `**Emerging** — middle income a head and rising quickly, with manufacturing and services both expanding.`,
      ] },
      { type: 'paragraph', text: `Put three economies side by side and the labels stop being vocabulary. The developed one produces ${bn(E.developed.gdpNow)} a year, the emerging one ${bn(E.emerging.gdpNow)} and the developing one ${bn(E.developing.gdpNow)}. That looks like the whole story until you divide by the people: ${mn(E.developed.population)}, ${mn(E.emerging.population)} and ${mn(E.developing.population)} respectively.` },
      { type: 'paragraph', text: `Income a head is then ${money(E.developed.perCapitaNow)}, ${money(E.emerging.perCapitaNow)} and ${money(E.developing.perCapitaNow)} — a factor of ${qty(E.perCapitaGap)} between the first and the last. For ${L.name}, selling a unit that lands at ${money(L.landed)}, that difference decides which of the three is a market at all and which is somewhere to produce.` },
      { type: 'paragraph', text: `The word **emerging** is doing something the other two are not. It is not a middle point on a scale; it says the economy is MOVING, and a firm entering it is betting on where it will be.` },
    ],
    realExample: { emoji: '🛵', text: `A scooter manufacturer entering an emerging market prices for the income a head it expects in five years, and takes a thin margin until then. The same firm entering a developed market is competing on features, not price.` },
    misconception: `Students use "developing" and "emerging" as the same word. The distinction is direction as well as level: a developing economy has low income a head, an emerging one middle income a head and is rising fast.`,
    examMatters: `Appendix 6 defines Define as requiring students to define a term or phrase. Two marks needs two separate things — the income level and the direction — and the second is the one students leave out.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each description under the kind of economy it fits:',
      groups: [
        { name: 'Developed', items: ['Income a head is high and most people work in services', 'Markets are mature: growth comes from taking share, not from new buyers'] },
        { name: 'Emerging', items: ['Income a head is middle and rising fast', 'Factories and offices are both expanding at once'] },
        { name: 'Developing', items: ['Income a head is low and output is mostly farming and raw materials'] },
      ],
      why: [
        'High income a head with output in services is the developed description, and the market consequence is that new customers are scarce.',
        'Middle income a head plus speed is what separates emerging from developing — the label is about direction as much as level.',
        'Low income a head with output in primary production is the developing description, and a firm treats it as a place to buy from before a place to sell to.',
      ],
    }),
  };
})();

const whereGrowthIs = (() => {
  const sid = subId('growing-economic-power-of-asia-and-africa');
  return {
    id: sid,
    title: 'Where the Growth Is Happening',
    keyIdea: 'Economic power is shifting towards countries in Asia, Africa and elsewhere — and fast growth and low income a head are both true at once.',
    body: [
      { type: 'paragraph', text: `The next requirement names it directly: the **growing economic power of countries within Asia, Africa and other parts of the world**. It is a statement about change rather than about level, and the two get confused constantly.` },
      { type: 'paragraph', text: `Take the same three economies over one period. The emerging economy's output rose from ${bn(E.emerging.gdpThen)} to ${bn(E.emerging.gdpNow)}, which is ${pct(E.emerging.growth)}. The developed one rose from ${bn(E.developed.gdpThen)} to ${bn(E.developed.gdpNow)}, which is ${pct(E.developed.growth)}. The emerging economy grew ${qty(E.growthRatio)} times as fast.` },
      { type: 'paragraph', text: `And it is still ${qty(E.emergingGap)} times poorer a head: ${money(E.emerging.perCapitaNow)} against ${money(E.developed.perCapitaNow)}. **Both sentences are true, and an answer with only one of them is half an answer.** Fast growth is why a firm enters; low income a head is why it changes what it sells when it gets there.` },
      { type: 'paragraph', text: `For a business the shift has three consequences, and they are not the same thing. New **customers** appear as incomes cross the level at which a product becomes affordable. New **suppliers** appear, because economies that grow build capability. And new **competitors** appear, because the firms that grew up serving those customers eventually come looking for yours.` },
      { type: 'paragraph', text: `The third is the one firms in developed markets underestimate. ${L.name} exists because its economy became able to build electronics to an export standard — and the firms it now undercuts did not see it coming.` },
    ],
    realExample: { emoji: '📈', text: `A European appliance maker that opened a sales office in a fast-growing Asian economy found its main rival there ten years later was a local firm that had started as a parts supplier.` },
    misconception: `Students write that an emerging economy "has overtaken" a developed one because its growth rate is higher. A percentage change is measured against that economy's own starting point, so the slower rate can be the bigger rise.`,
    examMatters: `Appendix 6 defines Calculate as requiring a calculation based on given data, with workings given. A percentage change is (new − old) ÷ old × 100, and dividing by the new figure is the commonest slip.`,
  };
})();

const tradeOpportunities = (() => {
  const sid = subId('trade-opportunities-for-businesses');
  return {
    id: sid,
    title: 'Trade Opportunities for Businesses',
    keyIdea: 'Growth creates customers a firm could not previously reach, and the opportunity arrives in a sequence rather than all at once.',
    body: [
      { type: 'paragraph', text: `The specification asks for the *implications of economic growth for individuals and businesses*, and names two. The first is **trade opportunities for businesses**.` },
      { type: 'paragraph', text: `An opportunity is not the same as a bigger market. It appears when income a head crosses the level at which a particular product stops being unaffordable, and that happens at a different moment for every product. When the emerging economy above went from ${money(E.emerging.perCapitaThen)} a head to ${money(E.emerging.perCapitaNow)}, it did not become ${pct(E.emerging.growth)} more attractive to every firm at once.` },
      { type: 'bullets', items: [
        `First, things people buy with the first money they have spare: better food, a phone, a scooter.`,
        `Then durables that need a household to have some certainty: an appliance, a motorcycle, insurance.`,
        `Then services and branded goods, which depend on income being not only higher but reliable.`,
      ] },
      { type: 'paragraph', text: `So the practical question is never "is this market growing" but **"has it reached my product yet"**. A firm that enters too early spends years funding an office that sells nothing; a firm that waits for the answer to be obvious finds a local competitor already there.` },
      { type: 'paragraph', text: `Growth also creates opportunities on the buying side. ${L.name}'s module supplier exists because an economy grew enough to build it, and the ${money(L.specialisationSaving)} a unit that saves is as real as any sale.` },
    ],
    realExample: { emoji: '🧊', text: `A refrigerator maker tracks income a head in each market it is considering and enters when the figure passes the point at which a household in that country typically buys its first fridge, rather than when total output passes some threshold.` },
    misconception: `Students say a growing economy is an opportunity for "all businesses". Growth reaches products in an order set by what a household buys with each extra unit of income, so a firm can arrive years early.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning and says it does not include evaluation. The chain runs from growth to income a head to affordability to a named product.`,
  };
})();

const employmentPatterns = (() => {
  const sid = subId('employment-patterns');
  return {
    id: sid,
    title: 'Employment Patterns',
    keyIdea: 'Growth moves people between kinds of work, which changes who a firm can hire, at what wage, and what its own customers do for a living.',
    body: [
      { type: 'paragraph', text: `The second named implication is **employment patterns**. As an economy grows, the kinds of work people do change, and that reaches a business through three doors at once.` },
      { type: 'paragraph', text: `**What it can hire.** Work moves out of farming and raw materials into factories and then into offices and services. For ${L.name}, an economy at that middle stage is exactly why the plant is there: enough people trained for assembly work, and wages that have not yet risen to developed levels.` },
      { type: 'paragraph', text: `**What it pays.** The same shift raises wages over time, because the workers a firm wants now have other employers to go to. A plant built for low labour cost has a clock running on it, and firms know this when they build.` },
      { type: 'paragraph', text: `**Who its customers are.** People in steadier, better-paid work buy differently: more services, more branded goods, more things bought on a plan rather than in cash. A firm reading a market only through income a head misses that the composition of spending changes as well as the amount.` },
      { type: 'paragraph', text: `For individuals the implication is the one the specification puts first: some kinds of work grow and some shrink, and the people in the shrinking kind do not automatically move into the growing kind. That is a real cost of growth and it belongs in a balanced answer.` },
    ],
    realExample: { emoji: '🧑‍🏭', text: `An assembly plant that opened in a low-wage economy fifteen years ago now competes for the same workers with call centres and logistics firms that did not exist when it arrived, and pays accordingly.` },
    misconception: `Students treat employment patterns as a statistic rather than a business constraint. It is in a Business specification because it decides whether a firm can staff a plant and what that will cost.`,
    examMatters: `Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by details or examples. One door followed properly beats three mentioned.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: 'An assembler builds a plant in an economy because wages are low. Ten years later the economy has grown strongly. Complete the chain:',
      template: [
        'Growth moves work out of farming and into factories and ___',
        'Workers the plant wants now have other employers to go to, so wages ___',
        'So the plant was built on an advantage that had a ___ running on it',
      ],
      answers: ['services', 'rise', 'clock'],
      hints: ['the third kind of work, after farming and factories', 'what happens to pay when workers have alternatives', 'what a temporary advantage has running on it'],
      distractors: ['mining', 'fall', 'guarantee'],
    }),
  };
})();

const gdpPerCapita = (() => {
  const sid = subId('gdp-and-gdp-per-capita');
  return {
    id: sid,
    title: 'GDP and GDP per Capita',
    keyIdea: 'GDP is the size of an economy and GDP per capita is GDP divided by the people in it — and only the second one tells a firm whether anybody can afford its product.',
    body: [
      { type: 'paragraph', text: `The specification names two indicators of growth under this heading, and the second is the first divided by something.` },
      { type: 'paragraph', text: `**Gross domestic product (GDP)** is the total value of what an economy produces in a year. **GDP per capita** is that figure divided by the population. The division is the whole point: it turns a measure of SIZE into a measure of how much there is a head.` },
      { type: 'paragraph', text: `The developed economy here produces ${bn(E.developed.gdpNow)} and the emerging one ${bn(E.emerging.gdpNow)} — six times as much. But the developed one has ${mn(E.developed.population)} people and the emerging one ${mn(E.emerging.population)}, so per capita it is ${money(E.developed.perCapitaNow)} against ${money(E.emerging.perCapitaNow)}, a factor of ${qty(E.emergingGap)} rather than six.` },
      { type: 'paragraph', text: `Which figure a firm should read depends on what it sells. **Total GDP** matters for a product bought by organisations — machinery, freight, construction — because what counts is how much building and producing the economy does. **GDP per capita** matters for anything sold to households, because it approximates what one buyer has.` },
      { type: 'paragraph', text: `Both hide the same thing: an average says nothing about the spread. An economy at ${money(E.emerging.perCapitaNow)} a head might have a large group at twice that and a larger one at half, and a firm selling to either has been told very little by the average.` },
    ],
    realExample: { emoji: '🏗️', text: `A crane hire firm reads total output, because cranes are hired by builders. A shampoo brand in the same country reads output a head, because shampoo is bought one household at a time.` },
    misconception: `Students use GDP and GDP per capita as though the larger economy is always the better market. Divide before deciding: ${bn(E.developed.gdpNow)} across ${mn(E.developed.population)} people is ${money(E.developed.perCapitaNow)} each.`,
    examMatters: `Appendix 6 defines Calculate as requiring a calculation based on given data, with workings given. GDP per capita is GDP ÷ population, and the scaling has to be done or the unit is wrong.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `An economy produces ${bn(E.emerging.gdpNow)} and has ${mn(E.emerging.population)} people. Work through it:`,
      template: [
        `GDP per capita is GDP divided by the ___`,
        `Which here gives ${money(E.emerging.perCapitaNow)} per ___`,
        `A firm selling to households should read that figure rather than ___ GDP`,
      ],
      answers: ['population', 'person', 'total'],
      hints: ['what you divide output by', 'what the division gives you output for, one of', 'the figure that measures the size of the whole economy'],
      distractors: ['workforce', 'year', 'national'],
    }),
  };
})();

const humanDevelopmentIndex = (() => {
  const sid = subId('human-development-index');
  return {
    id: sid,
    title: 'The Human Development Index',
    keyIdea: 'HDI combines income, schooling and how long people live into one figure, so two economies with the same income a head can score differently.',
    body: [
      { type: 'paragraph', text: `The second indicator the specification names is the **${HDI.name}**. It exists because income a head answers one question and a firm entering a market has three to ask.` },
      { type: 'paragraph', text: `HDI combines ${HDI.combines.join(', ')} into a single figure ${HDI.range}, where a higher number means more human development. It is an index: the value has no units and only means something next to another value.` },
      { type: 'paragraph', text: `For a business the two non-income parts are the operationally useful ones. **Schooling** is a rough guide to the workforce a firm could hire and how long training will take. **How long people live** tracks health and infrastructure, which reach a firm as absence, productivity and whether a distribution network functions.` },
      { type: 'paragraph', text: `So two economies at ${money(E.emerging.perCapitaNow)} a head can present a firm with quite different problems. One has schools and clinics and a workforce ready to be trained in weeks; the other does not, and the plant that looked identical on an income comparison takes a year longer to reach full output.` },
      { type: 'paragraph', text: `What HDI does not tell you is which **industries** are growing, which is the thing a firm most wants to know. It is a measure of development, not a market forecast, and an answer that uses it as one has over-read it.` },
    ],
    realExample: { emoji: '🏥', text: `Two markets with similar income a head can differ sharply on schooling and health, and a firm planning to train a local workforce will find one of them much slower to reach full output than the other.` },
    misconception: `Students describe HDI as "a better version of GDP per capita". It answers a different question: income a head says what a household can spend, HDI says something about the workforce.`,
    examMatters: `Appendix 6 defines Define as requiring students to define a term or phrase. A definition of HDI needs what it combines and that it is one index figure.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each question a firm asks to the indicator that answers it:',
      pairs: [
        { left: 'How big is this economy?', right: 'GDP' },
        { left: 'What can one household spend?', right: 'GDP per capita' },
        { left: 'What workforce will I hire from?', right: 'HDI' },
      ],
      why: [
        'Total output is the size of the whole economy, which is the figure for a product bought by organisations rather than households.',
        'Output a head approximates what one buyer has, which is the question a firm selling to households is asking.',
        'Schooling and how long people live are what income a head leaves out, and both reach a firm as the workforce it can train.',
      ],
    }),
  };
})();

/* ══ Block 2 — International trade and business growth (4.3.1 · 2a-2c) ═══ */

const exportsAndImports = (() => {
  const sid = subId('exports-and-imports');
  return {
    id: sid,
    title: 'Exports and Imports',
    keyIdea: 'Exports are what a country sells abroad and imports what it buys in — and most exporting firms are importers too, which is why the two are one topic.',
    body: [
      { type: 'paragraph', text: `**Exports** are goods and services produced in a country and sold to buyers in another. **Imports** are the reverse. The definitions are short; what matters is that the same firm is usually on both sides.` },
      { type: 'paragraph', text: `${L.name} is an exporter: it ships finished units abroad at a landed cost of ${money(L.landed)} — ${money(L.factoryCost)} to build and ${money(L.freight)} to deliver. It is also an importer: ${money(L.importedModule)} of that ${money(L.factoryCost)} is a module bought from a firm in another country.` },
      { type: 'paragraph', text: `That is ${pct(L.importedShare)} of its factory cost crossing a border inwards before anything crosses outwards. So a barrier its own government puts on imported components raises the price of its exports, and a policy meant to protect somebody else's jobs lands on its own.` },
      { type: 'paragraph', text: `This is why the specification treats trade and business growth as one requirement. A firm that grows by exporting usually grows its imports at the same time, and its exposure is at both ends: to what happens to the module it buys and to what happens at the border it sells across.` },
      { type: 'paragraph', text: `The figures to keep hold of: ${money(L.importedModule)} in, ${money(L.ownAssembly)} added here, ${money(L.freight)} to ship, ${money(L.landed)} landed. Every chapter after this one changes one of those numbers and leaves the rest alone.` },
    ],
    realExample: { emoji: '🚢', text: `An assembler whose government raised the duty on imported components found its own export prices rose, because the components were most of what it built with.` },
    misconception: `Students treat exporting and importing as opposite activities done by different firms, so an answer about a tariff on imports concludes that domestic producers benefit. Any producer using imported inputs is hit by it, and here that is ${pct(L.importedShare)} of the cost of every unit.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning, and says that where it is applied to given data it includes interpretation. With ${money(L.importedModule)} of a ${money(L.factoryCost)} unit imported, the interpretation is the ${pct(L.importedShare)}, not the two figures repeated.`,
  };
})();

const specialisationSaves = (() => {
  const sid = subId('what-specialisation-saves');
  return {
    id: sid,
    title: 'What Specialising Saves',
    keyIdea: 'Countries and firms increasingly do one part of the job and buy the rest, because doing one part well is cheaper than doing every part adequately.',
    body: [
      { type: 'paragraph', text: `The specification asks for the **implications of increasing specialisation by countries and businesses**. The first implication is a subtraction and it is worth doing before anything is said about it.` },
      { type: 'paragraph', text: `If ${L.name} made every part of its unit itself, the unit would cost ${money(L.integratedCost)}. Buying the module in at ${money(L.importedModule)} and adding ${money(L.ownAssembly)} of its own assembly costs ${money(L.factoryCost)}.` },
      { type: 'paragraph', text: `The saving is ${money(L.specialisationSaving)} a unit, or ${pct(L.specialisationSavingPct)}. Across ${qty(L.plannedExports)} units a year that is ${money(round2(L.specialisationSaving * L.plannedExports))} — the difference between a business and a hobby, on one decision about what not to make.` },
      { type: 'paragraph', text: `The mechanism is the same for a country as for a firm. A producer that makes one thing repeatedly gets better at it, buys equipment that only makes sense at volume, and trains people who only do that. A producer that makes everything cannot do any of the three, because each of them needs concentration on one job.` },
      { type: 'paragraph', text: `**Increasing** specialisation is the word the specification uses, and it matters. The unit above used to be made in one factory; now the module is one firm's whole business and the assembly is another's. Each step is a step of the same kind, and each takes the cost down again.` },
    ],
    realExample: { emoji: '🔩', text: `A firm that once cast, machined and assembled its own components now buys castings from a specialist foundry, and its own costs fell even though it added a supplier's margin to the price it pays.` },
    misconception: `Students explain specialisation as "doing what you are best at" and stop. The reason cost falls is concrete: volume justifies equipment, repetition builds skill, and neither is available to a producer spreading its effort across every stage.`,
    examMatters: `Appendix 6 defines Calculate as requiring a calculation based on given data, with workings given. Here the saving is ${money(L.integratedCost)} − ${money(L.factoryCost)} = ${money(L.specialisationSaving)}, and as a percentage it is divided by the ORIGINAL cost, not the new one.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A unit costs ${money(L.integratedCost)} to make entirely in-house, or ${money(L.factoryCost)} if the main module is bought in. Work it through:`,
      template: [
        `The saving a unit is ${money(L.integratedCost)} minus ${money(L.factoryCost)}, which is ___ dollars`,
        `As a percentage of the original cost that is ___ per cent`,
        `Cost falls because volume justifies equipment and repetition builds ___`,
      ],
      answers: ['10', '20', 'skill'],
      hints: ['the difference between the two unit costs', 'the saving divided by the ORIGINAL cost, times 100', 'what doing the same job repeatedly builds'],
      distractors: ['8', '25', 'margin'],
    }),
  };
})();

const specialisationCosts = (() => {
  const sid = subId('what-specialisation-costs');
  return {
    id: sid,
    title: 'What Specialising Costs',
    keyIdea: 'The same decision that cut the unit cost by a fifth made most of that cost somebody else’s to control.',
    body: [
      { type: 'paragraph', text: `The specification says *implications*, plural, and the second one is the price of the first. It is the half students leave out, and it is visible in the same two numbers.` },
      { type: 'paragraph', text: `${L.name} saved ${money(L.specialisationSaving)} a unit by buying the module in. The module is ${money(L.importedModule)} of a ${money(L.factoryCost)} unit — **${pct(L.importedShare)} of what it costs to build**. So the firm has taken ${pct(L.specialisationSavingPct)} off its cost and handed control of the majority of what remains to a supplier in another country.` },
      { type: 'bullets', items: [
        `**Price.** If the module's price rises 10%, Lumina's factory cost rises ${money(round2(L.importedModule * 0.1))} a unit and it cannot make the part itself any more.`,
        `**Supply.** If the module does not arrive, the assembly line has nothing to assemble. Its own efficiency is irrelevant that week.`,
        `**Policy.** A tariff or a rule applied to that module reaches Lumina without anybody intending to touch it.`,
      ] },
      { type: 'paragraph', text: `For a country the shape is the same at a larger scale: an economy specialised in a narrow range of exports is efficient and exposed at once, and when demand for that range falls there is nothing else earning.` },
      { type: 'paragraph', text: `So the balanced answer is not that specialising is good or bad. It is that specialising **trades cost for control**, and whether that is worth doing depends on how reliable the supplier is and how easily the firm could find another.` },
    ],
    realExample: { emoji: '⛓️', text: `An assembler that had cut its costs by buying a single specialist component discovered during a shipping disruption that its efficiency was irrelevant for as long as the component was on a ship.` },
    misconception: `Students present specialisation as a straightforward gain and write one-sided answers. The gain and the exposure are the same decision seen twice: ${pct(L.specialisationSavingPct)} off the cost, and ${pct(L.importedShare)} of what is left decided by somebody else.`,
    examMatters: `Appendix 6 defines Discuss as requiring logical chains of reasoning in context showing causes and effects, with a brief assessment of competing arguments. This leaf supplies both sides from one pair of figures.`,
  };
})();

const fdiAndGrowth = (() => {
  const sid = subId('fdi-and-business-growth');
  return {
    id: sid,
    title: 'Foreign Direct Investment and Business Growth',
    keyIdea: 'FDI is a firm investing in productive assets in another country — a plant or a business, not a parcel of shares — and it is how a firm grows across a border.',
    body: [
      { type: 'paragraph', text: `**Foreign direct investment (FDI)** is investment by a firm in productive assets in another country: building a factory, buying a local business, or taking a controlling stake in one. The word that does the work is **direct**. Buying shares in a foreign company as an investment is not FDI; buying enough of it to run it is.` },
      { type: 'paragraph', text: `The specification asks for FDI *and link to business growth*, and the link is easiest to see from the money. ${L.name}'s parent invested ${money(L.fdi)} to build the plant. The plant can make ${qty(L.plannedExports)} units a year. That is ${money(L.fdiPerUnit)} of investment behind every unit of annual capacity.` },
      { type: 'paragraph', text: `The growth is the capacity; the FDI is how it was paid for. A firm wanting to sell ${qty(L.plannedExports)} more units a year could have made them at home and shipped them, and the reason it did not is in the next chapter.` },
      { type: 'paragraph', text: `FDI flows both ways, and the host economy gets something too: the plant employs people, buys local services and trains a workforce. That is why governments compete for it.` },
      { type: 'paragraph', text: `What FDI is not is free money. ${money(L.fdi)} is committed and cannot be moved if the market disappoints, which is precisely the difference between direct investment and the kind you can sell on a Tuesday.` },
    ],
    realExample: { emoji: '🏗️', text: `A manufacturer choosing between exporting to a region and building there compares the shipping and barrier costs it would keep paying against a one-off investment it cannot take back.` },
    misconception: `Students describe any money crossing a border as FDI. The test is control of productive assets, and a portfolio of foreign shares is not FDI because it can be sold at short notice.`,
    examMatters: `Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by details or examples. The chain is FDI to capacity to output; a definition without it has not answered.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each investment to what it is:',
      pairs: [
        { left: 'Building a plant in another country', right: 'FDI: assets built and controlled' },
        { left: 'Buying a controlling stake in a foreign firm', right: 'FDI: control acquired' },
        { left: 'Buying shares in a foreign firm for a return', right: 'Not FDI: no control' },
      ],
      why: [
        'Productive assets built and run abroad is the clearest case of direct investment.',
        'Control is the test, so a stake large enough to run the business counts as direct investment.',
        'A shareholding held for a return gives no control and can be sold at short notice.',
      ],
    }),
  };
})();

/* ══ Block 3 — Factors, part one (4.3.1 · 3a-3e) ═════════════════════════ */

const liberalisationAndBarriers = (() => {
  const sid = subId('trade-liberalisation-and-the-reduction-of-barriers');
  return {
    id: sid,
    title: 'Trade Liberalisation and Falling Barriers',
    keyIdea: 'Trade liberalisation is the deliberate lowering of the barriers governments put between their economies, and it is the first factor the specification names.',
    body: [
      { type: 'paragraph', text: `The specification lists **nine** factors contributing to increased globalisation. This chapter takes the first five and the next takes the rest. They are not interchangeable, and an answer that names one and describes another has lost the mark.` },
      { type: 'paragraph', text: `**Trade liberalisation** is governments agreeing to lower the barriers between their economies — tariffs, quotas and the rules that keep foreign goods out. It is a deliberate act of policy, which is why it can be undone, and chapter 5 is about what happens when it is.` },
      { type: 'paragraph', text: `What it does to a firm is arithmetic. ${L.name} lands a unit at ${money(L.landed)}. Against a ${pct(L.tariffRate)} tariff that becomes ${money(L.landedWithTariff)}, which is ${money(L.gapOutside)} above the ${money(L.rivalPrice)} a domestic rival charges. Remove the tariff and the same unit is ${money(L.gapInside)} **below** the rival. Nothing about the product changed.` },
      { type: 'paragraph', text: `That swing — from ${money(L.gapOutside)} over to ${money(L.gapInside)} under — is what liberalisation means to a business. It does not make a firm better; it decides whether being better is enough.` },
      { type: 'paragraph', text: `The reduction of trade barriers happens two ways: between two governments that agree it, and among a group of them that agree it together. The second is a trading bloc, and it is chapter 6.` },
    ],
    realExample: { emoji: '📉', text: `An exporter that had never been able to compete in a neighbouring market found its landed price undercut the local producer's the month a tariff was removed, without changing anything it made.` },
    misconception: `Students treat trade liberalisation and globalisation as the same thing. Liberalisation is one of the nine factors that cause globalisation, and it is the one governments control directly — which is why it is the one that can be reversed.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning, including interpretation where data is given. The interpretation here is the swing from ${money(L.gapOutside)} over to ${money(L.gapInside)} under, not the two prices restated.`,
  };
})();

const theWto = (() => {
  const sid = subId('the-role-of-the-wto');
  return {
    id: sid,
    title: 'The Role of the WTO',
    keyIdea: 'The WTO is the body through which member governments agree rules for trade between them and settle disputes about those rules — it does not set any country’s tariffs.',
    body: [
      { type: 'paragraph', text: `The specification names the **WTO** inside the same requirement as trade liberalisation, and this is the only place in the course a student meets it. So it is worth being exact about what it is, because most wrong answers claim more for it than it claims for itself.` },
      { type: 'paragraph', text: `The **World Trade Organization** is a body whose members are governments. It does three things.` },
      { type: 'bullets', items: [
        `**Rules.** Members agree a common set of rules for trade between them, so an exporter knows what treatment to expect.`,
        `**Negotiation.** It is the forum in which members bargain barriers down together rather than one pair at a time.`,
        `**Disputes.** A member that believes another has broken the rules has a process to raise it through.`,
      ] },
      { type: 'paragraph', text: `What it does **not** do matters as much. It does not set any country's tariffs — governments do that. It cannot compel a government to open a market. And membership is not free trade: members maintain tariffs, quotas and rules, and chapter 5 is entirely about those.` },
      { type: 'paragraph', text: `For a firm like ${L.name} the value is predictability rather than zero barriers. Knowing that a tariff is ${pct(L.tariffRate)} and will not become ${pct(40)} without a process is what makes it possible to price a contract for next year at all.` },
    ],
    realExample: { emoji: '⚖️', text: `An exporter facing a sudden new barrier in a member market has a route through which its own government can challenge it — slow, but a route, which a firm exporting to a non-member does not have.` },
    misconception: `Students write that the WTO "enforces free trade" or "removes tariffs". It does neither: members agree and police rules, and they keep substantial barriers.`,
    examMatters: `Appendix 6 defines Define as requiring students to define a term or phrase. The WTO's role needs what it is and what it does; "it promotes free trade" supplies neither.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each statement by whether it describes the WTO:',
      groups: [
        { name: 'The WTO does this', items: ['Provides a forum for members to negotiate lower barriers', 'Runs a process for settling disputes between members'] },
        { name: 'The WTO does not', items: ['Sets the tariff rate each country charges', 'Guarantees that trade between members is free of barriers'] },
      ],
      why: [
        'Negotiation and dispute settlement are what a membership body of governments can do, and both are in the requirement.',
        'Tariff rates are set by governments and members keep real barriers, so neither claim survives a check against what the body actually is.',
      ],
    }),
  };
})();

const politicalChange = (() => {
  const sid = subId('political-change');
  return {
    id: sid,
    title: 'Political Change',
    keyIdea: 'Governments decide whether foreign firms may sell, build and own inside their borders, and when that decision changes a market opens or closes at a stroke.',
    body: [
      { type: 'paragraph', text: `The second factor is **political change**, and it is the one that moves fastest. Trade barriers come down over years of negotiation; a government's attitude to foreign firms can change with an election.` },
      { type: 'paragraph', text: `What a government decides reaches a business in four ways: whether foreign firms may **sell** into the market, whether they may **build** there, whether they may **own** a local business outright or must take a partner, and whether profits may be sent home.` },
      { type: 'paragraph', text: `Each of those is a yes-or-no that sits above every calculation a firm makes. ${L.name}'s parent committed ${money(L.fdi)} to a plant in a country that permits foreign ownership of it. Had the answer been no, the arithmetic about ${money(L.landed)} against ${money(L.rivalPrice)} would never have been reached.` },
      { type: 'paragraph', text: `Political change has driven globalisation because the direction of travel across several decades has been towards **opening**: more countries allowing foreign firms to sell, build and own than closing to them. That is a fact about a period, not a law, and a firm planning a plant that takes fifteen years to repay is making a judgement about politics whether it admits it or not.` },
      { type: 'paragraph', text: `This is also where the risk in FDI actually lives. A plant cannot be moved. If the rules change after it is built, the firm's options are to accept the new terms or to write off ${money(L.fdi)}.` },
    ],
    realExample: { emoji: '🏛️', text: `A retailer that entered a market where foreign firms could not own stores outright operated through a joint venture with a local partner until the rule changed, and restructured when it did.` },
    misconception: `Students read political change as instability and write about war or unrest. The requirement is policy: whether a government permits foreign firms to trade, invest and own.`,
    examMatters: `Appendix 6 defines Assess as requiring a well-contextualised chain of reasoning with balanced awareness of competing factors, leading to a supported judgement. In Unit 4 it carries 12 marks.`,
  };
})();

const transportAndCommunication = (() => {
  const sid = subId('reduced-cost-of-transport-and-communication');
  return {
    id: sid,
    title: 'Cheaper Transport and Communication',
    keyIdea: 'When moving a unit and coordinating a job across a border both became cheap, where a thing is made stopped being decided by where it will be sold.',
    body: [
      { type: 'paragraph', text: `The third factor is the **reduced cost of transport and communication**, and it is the one most easily asserted and most easily priced. Price it.` },
      { type: 'paragraph', text: `${L.name} builds a unit for ${money(L.factoryCost)} and ships it abroad for ${money(L.freight)}. Freight is **${pct(L.freightShare)} of what the unit cost to make**. At that level, the cost of distance has almost stopped being a factor in where to produce.` },
      { type: 'paragraph', text: `Run the counterfactual, because it is the argument. If shipping cost ${money(20)} a unit rather than ${money(2.5)}, the landed cost would be ${money(round2(L.factoryCost + 20))} against a rival at ${money(L.rivalPrice)}, and the plant would not exist. Production would have stayed near the customer, which is where it was for most of history.` },
      { type: 'paragraph', text: `**Communication** is the half that is less visible and did as much. Building a unit in one country for a customer in another means agreeing a specification, inspecting quality, tracking a shipment and fixing a fault, all at a distance. When each of those cost a great deal in time and money, only high-value goods were worth making far away. Now they cost almost nothing.` },
      { type: 'paragraph', text: `Together the two mean a firm can put each stage of its work wherever that stage is done best or most cheaply, rather than putting all of it wherever it can be coordinated. That is what makes the specialisation in chapter 2 possible.` },
    ],
    realExample: { emoji: '📦', text: `A firm whose freight bill is a small single-digit percentage of its unit cost chooses a production site on labour, skills and barriers, and treats distance as a rounding error.` },
    misconception: `Students name this factor and then describe technology in general. The requirement is the falling COST of transport and communication, so the answer is a proportion.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning, and says it includes interpretation where data is given. ${money(L.freight)} on a ${money(L.factoryCost)} unit is ${pct(L.freightShare)}, and the interpretation is what that proportion permits.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `Shipping a unit costs ${money(L.freight)} and building it costs ${money(L.factoryCost)}. Turn that into an argument:`,
      template: [
        'As a share of what the unit cost to make, the freight is ___ per cent',
        'At that share, the distance to the customer adds almost ___ to the price',
        'So the firm chooses where to produce on wages, skills and ___ instead',
      ],
      answers: ['6.25', 'nothing', 'barriers'],
      hints: [`${money(L.freight)} divided by ${money(L.factoryCost)}, times 100`, 'how much a negligible cost adds', 'the third thing a location decision turns on in this topic'],
      distractors: ['5', 'everything', 'demand'],
    }),
  };
})();

const mncsAndInvestmentFlows = (() => {
  const sid = subId('mncs-and-increased-investment-flows');
  return {
    id: sid,
    title: 'MNCs and Investment Flows',
    keyIdea: 'A multinational corporation owns productive operations in more than one country, and the money that builds them is the FDI flow — the two factors are one mechanism seen twice.',
    body: [
      { type: 'paragraph', text: `Factors four and five are the **increased significance of global (multinational) corporations** and **increased investment flows (FDI)**. They are separate requirements and it is worth knowing why, because they are the same mechanism from two ends.` },
      { type: 'paragraph', text: `A **multinational corporation (MNC)** is a firm that owns productive operations in more than one country. Not a firm that exports — an exporter operates in one country and sells into others. An MNC has plants, offices or subsidiaries abroad and runs them.` },
      { type: 'paragraph', text: `**FDI** is how it got them, and it is the flow the fifth factor is about. ${L.name}'s parent is an MNC precisely because it spent ${money(L.fdi)} on a plant outside its own country; the money is the flow, the plant is the operation, and the firm is the multinational.` },
      { type: 'paragraph', text: `Why "increased significance"? Because an MNC makes decisions a national firm cannot. It can build where costs are lowest, sell where incomes are highest, and choose which side of a trade barrier to stand on — ${money(L.landed)} inside a bloc against ${money(L.landedWithTariff)} outside it.` },
      { type: 'paragraph', text: `The consequence for other firms is competitive. A national producer now competes with rivals that can source, produce and price across several countries at once — which is 3i, and it is the last subsection of the next chapter.` },
    ],
    realExample: { emoji: '🌐', text: `A firm that built assembly plants on both sides of a trade barrier supplies each market from the plant inside it, and neither plant pays the barrier.` },
    misconception: `Students call any large firm that sells abroad a multinational. The test is owning and running productive operations in more than one country, and an exporter’s exposure to a tariff is completely different.`,
    examMatters: `Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by details or examples. The chain runs from the FDI flow to a decision a national firm cannot take.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'Sort each firm by what the definitions make it:',
      groups: [
        { name: 'A multinational', items: ['It builds a plant in another country and runs it', 'It buys a controlling stake in a business abroad'] },
        { name: 'An exporter, not a multinational', items: ['It ships everything it makes from one factory to forty markets'] },
        { name: 'Neither', items: ['It holds shares in a foreign firm for the dividend and runs nothing'] },
      ],
      why: [
        'Owning and running productive operations abroad is the test, and it is what lets a firm choose which side of a barrier to produce on.',
        'Selling into many countries from one site is exporting: every unit still crosses the barrier, which is why its exposure to a tariff is completely different.',
        'A shareholding carries no operations and no control, so the firm produces in one country and has simply invested money in another.',
      ],
    }),
  };
})();

/* ══ Block 4 — Factors, part two (4.3.1 · 3f-3i) ═════════════════════════ */

const migration = (() => {
  const sid = subId('migration-within-and-between-economies');
  return {
    id: sid,
    title: 'Migration Within and Between Economies',
    keyIdea: 'People move for work, within a country and across borders, and for a business that is a question about who it can hire and at what wage.',
    body: [
      { type: 'paragraph', text: `The sixth factor is **migration within and between economies**. The specification names both kinds and a business feels them differently.` },
      { type: 'paragraph', text: `**Within** an economy, people move from where work is scarce to where it is plentiful — usually from rural areas towards cities and industrial areas. This is how a plant in a growing economy staffs itself: ${L.name} can hire ${qty(L.plannedExports)} units' worth of assembly labour because people moved to where the plants are.` },
      { type: 'paragraph', text: `**Between** economies, people move across borders for work. For a firm in the country they leave, that is a labour supply reduced and wages under pressure in the occupations that lose people. For a firm in the country they arrive in, it is the reverse — a wider pool, and skills that would have taken years to train.` },
      { type: 'paragraph', text: `Migration is a factor contributing to globalisation, rather than only a consequence of it, because it moves the thing that could not previously move. Goods and money crossed borders long before people did in these numbers, and a workforce that can move makes a firm's choice of where to produce a real choice.` },
      { type: 'paragraph', text: `The business question is always specific: which occupations, in which direction, and does it reach the ones this firm employs? An answer about migration in general has not reached a business decision.` },
    ],
    realExample: { emoji: '🧳', text: `A plant in an industrial region hires most of its assembly staff from people who moved there from farming areas, and competes for its engineers with employers in other countries entirely.` },
    misconception: `Students write about migration as a political subject. The requirement is what it does to businesses: labour supply, wage pressure and which skills are available.`,
    examMatters: `Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by details or examples. "Migration increases the labour supply" is a cause with no effect on a firm.`,
  };
})();

const globalLabourForce = (() => {
  const sid = subId('growth-of-the-global-labour-force');
  return {
    id: sid,
    title: 'Growth of the Global Labour Force',
    keyIdea: 'More of the world’s people are available to work for firms trading internationally, which widens where production can go and increases competition for the work.',
    body: [
      { type: 'paragraph', text: `The seventh factor is the **growth of the global labour force**. It is separate from migration because nobody has to move: the labour force available to a firm trading internationally grows when economies open, when populations grow, and when people who were not previously in paid work enter it.` },
      { type: 'paragraph', text: `For a firm the consequence is choice. Where production could once go to a handful of industrialised countries, there are now many places with a workforce able to do the work — which is why ${L.name}'s plant is where it is rather than in the country of the firm that owns it.` },
      { type: 'paragraph', text: `For workers the consequence is competition, and it runs in both directions. Assembly work that was done in a high-wage economy can now be done in a lower-wage one, and the workers in the lower-wage economy compete with each other and with workers in a third.` },
      { type: 'paragraph', text: `The effect on **wages** is not uniform, and a good answer says so. Where the global labour force grows in an occupation, wage growth in it is held down wherever it is done. Where the work cannot be moved — fitting a kitchen, treating a patient — none of this applies.` },
      { type: 'paragraph', text: `So the practical test is: **can this work be done somewhere else?** If it can, the global labour force is in the room whether or not the firm has ever traded abroad.` },
    ],
    realExample: { emoji: '👥', text: `A firm choosing between three countries for a new plant finds all three have a workforce able to do the work, so wages and trade barriers decide it.` },
    misconception: `Students treat this as the same requirement as migration. Migration is people moving; the global labour force grows without anybody moving at all.`,
    examMatters: `Appendix 6 defines Discuss as requiring logical chains of reasoning in context showing causes and effects, with a brief assessment of competing arguments — here the firm's choice against the worker's competition.`,
  };
})();

const structuralChange = (() => {
  const sid = subId('structural-change');
  return {
    id: sid,
    title: 'Structural Change',
    keyIdea: 'Structural change is a shift in which industries an economy’s output and jobs come from, and it turns a firm’s customers into its competitors over time.',
    body: [
      { type: 'paragraph', text: `The eighth factor is **structural change**: a lasting shift in which industries an economy's output and employment come from. Not a good year or a bad one — a change in what the economy is made of.` },
      { type: 'paragraph', text: `The pattern as economies grow is familiar. Output and jobs move out of farming and raw materials, into manufacturing, and then towards services. Each step changes what the economy buys and what it can make.` },
      { type: 'paragraph', text: `The consequence for a business is that a market's role changes. An economy that bought finished goods from abroad while its own output was in raw materials starts making those goods itself. ${L.name}'s economy is at exactly that point: it once imported electronic units and now exports them.` },
      { type: 'paragraph', text: `So a firm's customer becomes its competitor, and usually in that order. The exporter that served the market while it could not supply itself taught it what the product should be, and is then undercut by a local producer without the freight and with lower wages.` },
      { type: 'paragraph', text: `Structural change also works backwards through a firm's own economy. As output moves towards services at home, the manufacturing workforce shrinks, the suppliers thin out, and a firm that wanted to produce at home may find it can no longer find the skills — which sends it abroad for reasons that have nothing to do with wages.` },
    ],
    realExample: { emoji: '🔄', text: `An economy that imported assembled electronics for a decade now exports them, and the firms that used to supply it are competing with the customers they trained.` },
    misconception: `Students describe structural change as an economy "getting richer". The requirement is composition rather than level: which industries produce the output and employ the people.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning and says it does not include evaluation. Take the chain to a business consequence.`,
    recall: recall(sid, {
      type: 'reorder',
      prompt: 'Put the stages of this structural shift in order, as an economy develops:',
      shuffled: [
        'Local firms learn to make the product and supply the home market',
        'The economy produces raw materials and imports finished goods',
        'Those firms export, competing with the exporter that first served them',
        'Factories are built and manufacturing output grows',
      ],
      correctOrder: [
        'The economy produces raw materials and imports finished goods',
        'Factories are built and manufacturing output grows',
        'Local firms learn to make the product and supply the home market',
        'Those firms export, competing with the exporter that first served them',
      ],
      why: [
        'Nothing can be made locally yet, so the product arrives as an import and the market learns what it is.',
        'Capacity has to exist before anything can be built here, and that is what structural change supplies.',
        'With capacity and a known product, local firms can supply the home market without freight.',
        'Only a firm that already supplies at home has the scale to export — and that is the step that turns a market into a rival.',
      ],
    }),
  };
})();

const impactOnBusinesses = (() => {
  const sid = subId('impact-on-businesses-of-increased-globalisation');
  return {
    id: sid,
    title: 'What All of It Does to a Business',
    keyIdea: 'The same forces widen the market a firm sells into and widen the field it competes against, so the answer is always "for which business".',
    body: [
      { type: 'paragraph', text: `The last of the nine is a requirement rather than a summary: the **impact on businesses of increased globalisation**. Eight factors have been described; this asks what they add up to for a firm.` },
      { type: 'paragraph', text: `**What opens.** A larger market, because growing economies contain customers who could not previously afford the product. Cheaper inputs, because a firm can buy the best-value component anywhere — ${money(L.specialisationSaving)} a unit here. Somewhere better to produce, because capital, labour and the cost of distance are all now choices. And access to skills a firm could not find at home.` },
      { type: 'paragraph', text: `**What closes in.** Competition from firms that have every one of those advantages too, including ones the firm has never heard of. Dependence on suppliers it does not control, which is ${pct(L.importedShare)} of a unit's cost here. Exposure to decisions taken by governments elsewhere. And a cost advantage that erodes as the economy it was built on grows.` },
      { type: 'paragraph', text: `The two lists are the same forces read twice, which is the point. A firm cannot take the first without the second, and the specification's framing — impact on **businesses** — is asking which firms gain and which lose rather than whether the world is better off.` },
      { type: 'paragraph', text: `The pattern that usually holds: firms that can **move** gain most, firms that can **specialise** gain if they choose the right thing to specialise in, and firms whose advantage was simply being the only supplier within reach lose it entirely.` },
    ],
    realExample: { emoji: '⚖️', text: `A national producer with a protected home market and one factory faces a competitor that buys components from four countries, assembles in a fifth, and sells in all of them.` },
    misconception: `Students answer "is globalisation good for business" as a yes or no. The requirement is the impact on businesses, plural and different.`,
    examMatters: `Appendix 6 defines Evaluate as requiring fully developed chains of reasoning showing a range of causes and effects, with awareness of competing factors and a perceptive conclusion. Name which firm.`,
  };
})();

/* ══ Block 5 — Protectionism (4.3.1 · 4a-4e) ═════════════════════════════ */

const whyGovernmentsProtect = (() => {
  const sid = subId('reasons-for-protectionism');
  return {
    id: sid,
    title: 'Why Governments Protect',
    keyIdea: 'Protectionism is a government raising barriers against imports, and the reasons for it are arguments with real costs on both sides.',
    body: [
      { type: 'paragraph', text: `**Protectionism** is a government using barriers to make imported goods harder or more expensive to sell than domestic ones. The previous chapter was about barriers coming down; this one is about the same governments putting them back, and why.` },
      { type: 'paragraph', text: `The specification asks for the **reasons**, and gives no list, so here they are as arguments rather than as vocabulary to memorise.` },
      { type: 'bullets', items: PROTECTION_REASONS.map((r) => `**${r.short}** — ${r.body}.`) },
      { type: 'paragraph', text: `Each argument has a cost the same government pays. A barrier that protects a producer raises the price paid by **every buyer of that good**, including firms using it as an input — and ${L.name}, importing ${pct(L.importedShare)} of what each unit costs, is one of those buyers.` },
      { type: 'paragraph', text: `There is a second cost and it is the one exam answers forget: other governments respond. A country that raises barriers may find its own exporters facing new ones, so the jobs protected in one industry are paid for by jobs in another.` },
    ],
    realExample: { emoji: '🏛️', text: `A government that raised the duty on imported steel protected its steelmakers and raised costs for every domestic firm that builds with steel, which employed far more people.` },
    misconception: `Students write that protectionism is "bad for the economy" and stop. The specification asks for reasons, and they are real arguments with real costs.`,
    examMatters: `Appendix 6 defines Discuss as requiring logical chains of reasoning in context showing causes and effects, with a brief assessment of competing arguments — here, the downstream buyer.`,
  };
})();

const tariffs = (() => {
  const sid = subId('tariffs');
  return {
    id: sid,
    title: 'Tariffs',
    keyIdea: 'A tariff is a tax on an imported good, charged at the border, and it raises the landed cost of every unit that enters.',
    body: [
      { type: 'paragraph', text: `A **tariff** is a tax a government charges on a good as it is imported. It is usually a percentage of the value, and it is paid before the good can be sold.` },
      { type: 'paragraph', text: `Take the unit this section has been following. ${L.name} lands it at ${money(L.landed)} — ${money(L.factoryCost)} to build and ${money(L.freight)} to ship. A tariff of ${pct(L.tariffRate)} adds ${pct(L.tariffRate)} of ${money(L.landed)}, which is ${money(L.tariffPerUnit)}.` },
      { type: 'flow', steps: [
        `Landed cost before the border: ${money(L.landed)}`,
        `Tariff at ${pct(L.tariffRate)} of that: ${money(L.tariffPerUnit)}`,
        `Landed cost after the border: ${money(L.landedWithTariff)}`,
      ], result: `Against a domestic rival selling at ${money(L.rivalPrice)}, Lumina is now ${money(L.gapOutside)} more expensive and loses the sale`, resultType: 'bad' },
      { type: 'paragraph', text: `Two things about that sequence are worth holding onto. First, the tariff is charged on the **landed** value, so it taxes the freight as well as the goods. Second, it does not have to make the import impossible — it only has to close the gap. Lumina's unit was ${money(L.gapInside)} cheaper than the rival's; a ${pct(L.tariffRate)} tariff turned that into ${money(L.gapOutside)} dearer, and that is sufficient.` },
      { type: 'paragraph', text: `Who ends up paying depends on the market. The importer may absorb it and accept a thinner margin, or pass it on and sell fewer units. Either way the government collects ${money(L.tariffPerUnit)} on every unit that still comes in, which is one of the reasons for protectionism in the previous subsection.` },
    ],
    realExample: { emoji: '🛃', text: `An exporter whose unit was comfortably the cheapest in a market became the dearest overnight when a percentage duty was applied at the border, without its own costs changing at all.` },
    misconception: `Students say a tariff "stops imports". It taxes them. Whether it stops them depends on the gap it has to close: here ${money(L.tariffPerUnit)} turned a ${money(L.gapInside)} advantage into a ${money(L.gapOutside)} disadvantage.`,
    examMatters: `Appendix 6 defines Calculate as requiring a calculation based on given data, with workings given. A tariff is a percentage OF the landed value, including the freight.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A unit is built for ${money(L.factoryCost)} and shipped for ${money(L.freight)}. A tariff of ${pct(L.tariffRate)} applies at the border. Work it through:`,
      template: [
        `The landed cost before the border is ${money(L.factoryCost)} plus ${money(L.freight)}, which is ___ dollars`,
        `The tariff is ${pct(L.tariffRate)} of that, which is ___ dollars`,
        `So the cost after the border is ___ dollars`,
      ],
      answers: ['42.50', '8.50', '51.00'],
      hints: ['add the freight to the factory cost', 'a fifth of the landed cost', 'landed cost plus the tariff'],
      distractors: ['40.00', '8.00', '48.50'],
    }),
  };
})();

const importQuotas = (() => {
  const sid = subId('import-quotas');
  return {
    id: sid,
    title: 'Import Quotas',
    keyIdea: 'A quota caps the number of units that may be imported, so it is measured in units rather than money and cannot be absorbed by accepting a thinner margin.',
    body: [
      { type: 'paragraph', text: `An **import quota** is a limit on the QUANTITY of a good that may be imported in a period. Not a tax — a cap. That difference decides how a firm responds to it.` },
      { type: 'paragraph', text: `${L.name} plans to sell ${qty(L.plannedExports)} units a year into a market. A quota caps imports of that product at ${qty(L.quotaCap)}. So ${qty(L.blockedUnits)} units cannot enter at any price — **${pct(L.blockedShare)} of what the firm planned to sell**, worth ${money(L.blockedRevenue)} at the ${money(L.rivalPrice)} the market pays.` },
      { type: 'paragraph', text: `Set the two barriers side by side and the difference is stark. A tariff of ${pct(L.tariffRate)} costs ${money(L.tariffPerUnit)} a unit and lets every unit in: a firm with a big enough margin absorbs it and carries on. A quota lets ${qty(L.quotaCap)} in at the ordinary price and refuses the rest, and no margin, however large, buys a way past it.` },
      { type: 'paragraph', text: `So which barrier hurts more depends on the firm. A high-margin producer fears the quota; a thin-margin one fears the tariff. And a quota makes the firms INSIDE the cap more profitable, because it removed the competition the other ${qty(L.blockedUnits)} units would have brought.` },
      { type: 'paragraph', text: `The strategic answer to a quota is different too. A tariff can be met by cutting cost. A quota can only be met by producing **inside** the market — which is FDI, and it is one of the main reasons firms build plants where they do.` },
    ],
    realExample: { emoji: '🚧', text: `An exporter that had already hit a volume cap by August built an assembly plant inside the market, because no cost saving could move another unit across that border.` },
    misconception: `Students treat a quota as a tariff with a different name and write that it "raises the price". It caps the quantity, and the firm's response is different in kind.`,
    examMatters: `Appendix 6 defines Analyse as requiring a brief chain of reasoning, including interpretation of given data. The chain runs from a cap in units to a decision about where to produce.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A firm plans ${qty(L.plannedExports)} units and the quota caps imports at ${qty(L.quotaCap)}. Work out what that means:`,
      template: [
        'The units that cannot enter at any price number ___ thousand',
        'Which is ___ per cent of what the firm planned to sell',
        'A cap in units cannot be absorbed by a margin, so the answer is to produce inside the ___',
      ],
      answers: ['30', '20', 'market'],
      hints: ['the plan minus the cap, in thousands', 'the blocked units over the plan, times 100', 'where a firm has to be to stop meeting the barrier'],
      distractors: ['120', '25', 'bloc'],
    }),
  };
})();

const otherBarriers = (() => {
  const sid = subId('other-trade-barriers');
  return {
    id: sid,
    title: 'Other Trade Barriers',
    keyIdea: 'Government legislation raises the cost of getting an imported good into a market, and a domestic subsidy lowers the rival’s price without touching the importer’s cost at all.',
    body: [
      { type: 'paragraph', text: `The specification names two more barriers, and they work in ways the first two do not.` },
      { type: 'paragraph', text: `**Government legislation** is a rule an imported good must satisfy before it may be sold: a safety standard, a labelling requirement, a certification. Some of it is genuinely about safety and some of it is a barrier wearing a safety coat, and from the exporter's side the two feel identical.` },
      { type: 'paragraph', text: `For ${L.name}, meeting a certification requirement costs ${money(L.certificationCost)} a year. Across ${qty(L.plannedExports)} units that is ${money(L.certificationPerUnit)} a unit — small next to the ${money(L.tariffPerUnit)} tariff, but with a sting: the cost is **fixed**, so it falls hardest on a small exporter. A firm shipping a tenth of the volume pays ${money(round2(L.certificationCost / (L.plannedExports / 10)))} a unit for the same certificate.` },
      { type: 'paragraph', text: `**A domestic subsidy** is a payment to the home producer for each unit it makes, and it is the barrier students misread. It does not touch the importer's cost. Lumina's unit still lands at ${money(L.landed)}. What changes is the rival: a subsidy of ${money(L.subsidyPerUnit)} a unit lets it sell at ${money(L.rivalPriceSubsidised)} instead of ${money(L.rivalPrice)}.` },
      { type: 'paragraph', text: `The effect is to cut Lumina's advantage from ${money(L.gapInside)} to ${money(round2(-L.gapAfterSubsidy))} without anything of Lumina's having changed. And it is invisible in the importer's own accounts, which is exactly why a firm that only watches its own costs does not see it coming.` },
    ],
    realExample: { emoji: '📋', text: `A small exporter and a large one meeting the same certification requirement pay the same fee, which is a rounding error for one of them and a serious cost a unit for the other.` },
    misconception: `Students say a subsidy to domestic producers "makes imports more expensive". It does not. The importer's cost is unchanged at ${money(L.landed)}; the domestic price falls to ${money(L.rivalPriceSubsidised)}.`,
    examMatters: `Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by details or examples. A subsidy's cause and effect run through the RIVAL's price.`,
    recall: recall(sid, {
      type: 'match',
      prompt: 'Match each barrier to what it changes:',
      pairs: [
        { left: 'Tariff', right: 'The importer’s cost a unit' },
        { left: 'Import quota', right: 'The number of units allowed in' },
        { left: 'Certification rule', right: 'A fixed cost spread over volume' },
        { left: 'Domestic subsidy', right: 'The rival’s price' },
      ],
      why: [
        'A tariff is charged on each imported unit, so it lands directly on the importer’s landed cost.',
        'A quota is a cap in units, which is why no margin can buy a way past it.',
        'A certification cost does not vary with volume, so its cost a unit depends entirely on how much the exporter ships.',
        'A subsidy is paid to the home producer, so the importer’s own cost is untouched and only the competing price moves.',
      ],
    }),
  };
})();

const protectionismOnBusiness = (() => {
  const sid = subId('impact-on-businesses-of-protectionism');
  return {
    id: sid,
    title: 'What Protectionism Does to a Business',
    keyIdea: 'A barrier can end a firm’s access to a market without its costs changing — and the firms it protects at home are not always the ones a government expected.',
    body: [
      { type: 'paragraph', text: `The final requirement of this sub-topic is the **impact on businesses of protectionism**, and there are three kinds of business to answer for.` },
      { type: 'paragraph', text: `**The exporter facing the barrier.** ${L.name} lands at ${money(L.landed)} against a rival at ${money(L.rivalPrice)} — ${money(L.gapInside)} cheaper, and the market is winnable. With a ${pct(L.tariffRate)} tariff it lands at ${money(L.landedWithTariff)}, ${money(L.gapOutside)} dearer, and the market is gone. Its costs, its quality and its efficiency are all exactly as they were.` },
      { type: 'paragraph', text: `**The protected domestic producer.** It keeps sales it would have lost, which is what the policy was for. What it also keeps is a cost base it no longer has to fix: a producer facing a cheaper competitor has a reason to get cheaper, and one behind a tariff does not.` },
      { type: 'paragraph', text: `**The domestic firm that BUYS the protected good.** This is the one governments underweight and exams reward. A barrier on components raises costs for every firm downstream that uses them. ${pct(L.importedShare)} of Lumina's unit cost is an imported module, so a tariff its own government placed on components would raise its export prices — protection for one industry paid for by another.` },
      { type: 'paragraph', text: `So "protectionism helps domestic business" is not a claim that survives the question **which** domestic business. A good answer names the three positions and says which dominates in the case in front of it.` },
    ],
    realExample: { emoji: '🏭', text: `A duty on imported components protected a small number of component makers and raised costs for a much larger number of manufacturers that bought from them.` },
    misconception: `Students conclude that protectionism benefits domestic firms and harms foreign ones. Domestic firms that buy the protected good are harmed too, and here that includes an exporter importing ${pct(L.importedShare)} of every unit’s cost.`,
    examMatters: `Appendix 6 defines Assess as requiring a well-contextualised chain of reasoning with balanced awareness of competing factors, leading to a supported judgement. In Unit 4 it carries 12 marks.`,
    recall: recall(sid, {
      type: 'classify',
      prompt: 'A government puts a tariff on imported electronic components. Sort each firm by how it is affected:',
      groups: [
        { name: 'Gains', items: ['A domestic maker of those components'] },
        { name: 'Loses', items: ['A foreign component maker that exported into this market', 'A domestic assembler that buys those components', 'An exporter whose own government did this, raising its export prices'] },
      ],
      why: [
        'The protected producer keeps sales it would have lost to a cheaper import, which is what the policy was for.',
        'Everyone downstream of the protected good pays more for it, and that includes domestic firms — which is why "protectionism helps domestic business" needs the question "which one".',
      ],
    }),
  };
})();

/* ══ Block 6 — Trading blocs (4.3.1 · 5a, 5b) ════════════════════════════ */

const euAndSingleMarket = (() => {
  const sid = subId('the-eu-and-the-single-market');
  return {
    id: sid,
    title: 'Trading Blocs and the EU',
    keyIdea: 'A trading bloc is a group of countries that have agreed to lower the barriers between them, and the EU and its single market is the one the specification names first.',
    body: [
      { type: 'paragraph', text: `A **trading bloc** is a group of countries that have agreed to reduce or remove the trade barriers between them, while each keeps barriers against countries outside the group. The specification names three, and asks about their **expansion** and their **impact on businesses**.` },
      { type: 'paragraph', text: `The **EU and its single market** is the first. Its member states have removed tariffs at the borders between them, so a unit made in one member state can be sold in the others without a duty on the way. For a business inside, several national markets behave more like one.` },
      { type: 'paragraph', text: `"Single market" says more than "no tariffs". Members work to a common set of product rules, so a good made to those rules can be sold in any of them without being re-certified for each — which, after the previous chapter, is worth as much as the tariff saving.` },
      { type: 'paragraph', text: `**Expansion** is what the requirement actually asks about. A bloc that adds members enlarges the barrier-free area for every firm already inside, and moves the border outwards — so a firm outside can find itself inside without moving.` },
      { type: 'paragraph', text: `For a firm the question is always the same one and it has a number attached: **which side of the boundary am I on, and what does that cost?** The last subsection of this chapter puts the number on it.` },
    ],
    realExample: { emoji: '🇪🇺', text: `A manufacturer inside a single market designs one product to one set of rules and sells it across every member state, where a competitor outside clears the boundary each time.` },
    misconception: `Students describe a trading bloc as a group with "free trade". Members remove barriers between THEMSELVES and keep them against outsiders, and that boundary is the whole mechanism.`,
    examMatters: `Appendix 6 defines Define as requiring students to define a term or phrase. A trading bloc needs both halves, or it describes something that does not exist.`,
  };
})();

const asean = (() => {
  const sid = subId('asean');
  return {
    id: sid,
    title: 'ASEAN',
    keyIdea: 'ASEAN is the Southeast Asian bloc the specification names, and for a firm producing in a member state it is the reason a unit can reach neighbouring markets without a duty.',
    body: [
      { type: 'paragraph', text: `**ASEAN** is the Association of Southeast Asian Nations, a bloc of ${BLOCS[1].who.replace('its Southeast Asian member states, among them ', 'Southeast Asian countries including ')}.` },
      { type: 'paragraph', text: `Its members have agreed to cut tariffs on most goods traded between them. For a firm assembling in one member state, that turns the neighbouring members into markets it can reach at its ordinary landed cost rather than at a tariffed one.` },
      { type: 'paragraph', text: `This is the bloc ${L.name} is inside, and it is the reason the plant is where it is. Its unit lands in a fellow member state at ${money(L.landed)}, against a local producer at ${money(L.rivalPrice)} — ${money(L.gapInside)} cheaper. The same unit sent to a market outside any bloc Lumina belongs to meets the ${pct(L.tariffRate)} tariff and lands at ${money(L.landedWithTariff)}.` },
      { type: 'paragraph', text: `ASEAN is also the clearest illustration of **expansion** as a business fact rather than a diplomatic one. As the bloc has widened and deepened what it covers, the area a member's exporter can sell into without a duty has grown, and each step has changed where it makes sense to build a plant.` },
      { type: 'paragraph', text: `For a firm outside, the same growth is a widening area it cannot reach on equal terms — which is one of the strongest reasons for the FDI in chapter 2. Building inside the bloc is how a firm outside it buys its way in.` },
    ],
    realExample: { emoji: '🌏', text: `An assembler in a Southeast Asian member state supplies neighbouring member markets from one plant, and a competitor outside the bloc supplying the same markets pays a duty on every shipment.` },
    misconception: `Students learn one bloc and answer every question about it. The specification names three, and the barrier the firm actually faces is the one that matters.`,
    examMatters: `Appendix 6 defines Explain as requiring a brief explanation of cause or effect supported by details or examples. Membership is the cause and the landed cost is the effect: ${money(L.landed)} inside against ${money(L.landedWithTariff)} outside, on the same unit.`,
  };
})();

const nafta = (() => {
  const sid = subId('nafta');
  return {
    id: sid,
    title: 'NAFTA',
    keyIdea: 'NAFTA is the North American bloc the specification names — Canada, Mexico and the United States — and it shows why firms build plants inside a bloc rather than exporting into it.',
    body: [
      { type: 'paragraph', text: `**NAFTA**, the North American Free Trade Agreement, is the third bloc the specification names. Its members are ${BLOCS[2].who}. It was replaced by a successor agreement between the same three countries in 2020; the specification names NAFTA, and that is the term for an answer.` },
      { type: 'paragraph', text: `What it did for business is the pattern this chapter is about, at a large scale. A plant in one member country could supply all three without a duty at their shared borders, so a firm's choice of where to build stopped being a choice about which market to serve.` },
      { type: 'paragraph', text: `That produced exactly the behaviour chapter 2 described. Firms from outside the bloc built plants inside it, because a plant in a member country sells into all three at the member price, while exports from outside meet the barrier at the boundary. **FDI is how a firm outside a bloc gets inside it**, and this is the clearest case of it.` },
      { type: 'paragraph', text: `It also shows the cost. Production moved to wherever inside the bloc was cheapest, because the barrier holding it in place was gone. The bloc did not create the cost difference; it removed what was suppressing it, and the employment effects fell on particular regions.` },
      { type: 'paragraph', text: `Three blocs, one lesson: a bloc redraws where the barrier is, and firms move to the profitable side of the new line.` },
    ],
    realExample: { emoji: '🚗', text: `A vehicle manufacturer from outside a North American bloc built one assembly plant inside it and supplied all three member markets with no duty at their shared borders.` },
    misconception: `Students write that a bloc "creates jobs" or "destroys jobs" as though the answer were the same everywhere. It moves production to wherever inside the bloc is cheapest, so it does both.`,
    examMatters: `Appendix 6 defines Evaluate as requiring fully developed chains of reasoning showing a range of causes and effects, with awareness of competing factors and a perceptive conclusion. Say for whom.`,
  };
})();

const insideAndOutside = (() => {
  const sid = subId('inside-the-bloc-and-outside-it');
  return {
    id: sid,
    title: 'Inside the Bloc and Outside It',
    keyIdea: 'The same unit, unchanged, is competitive inside a bloc and uncompetitive outside it — which is what membership is worth to a business, in dollars.',
    body: [
      { type: 'paragraph', text: `The last requirement of the topic is **the impact on businesses of trading blocs**. It is a subtraction, and it has been assembling all section.` },
      { type: 'paragraph', text: `One unit. ${money(L.importedModule)} of bought-in module, ${money(L.ownAssembly)} of assembly, ${money(L.freight)} of freight: ${money(L.landed)} landed. A domestic rival in the destination market sells at ${money(L.rivalPrice)}.` },
      { type: 'flow', steps: [
        `Inside the bloc: lands at ${money(L.landed)}, which is ${money(L.gapInside)} below the rival`,
        `Outside: the ${pct(L.tariffRate)} tariff adds ${money(L.tariffPerUnit)}`,
        `Lands at ${money(L.landedWithTariff)}, which is ${money(L.gapOutside)} above the rival`,
      ], result: `The product, the cost and the firm are identical in both lines. Only the side of the boundary changed`, resultType: 'neutral' },
      { type: 'paragraph', text: `That swing of ${money(round2(L.gapInside + L.gapOutside))} a unit is the impact of a trading bloc on this business, and it is bigger than anything its own managers could achieve in a year of cost reduction. It is also the reason ${qty(L.plannedExports)} units a year of capacity got built where it was.` },
      { type: 'paragraph', text: `**For firms inside**, a bloc is a larger market at the ordinary price and one set of rules to meet. **For firms outside**, it is a boundary to be paid at or produced behind. And competition inside a bloc is harder, because every member's producers arrive on the same terms.` },
      { type: 'paragraph', text: `So the balanced judgement is that a bloc does not make a firm competitive. It decides **where** its existing competitiveness counts — and, as the subsidy in chapter 5 showed, being ${money(L.gapInside)} ahead is not the same as being safe.` },
    ],
    realExample: { emoji: '📊', text: `A firm comparing two destination markets with identical demand found its price competitive in one and not the other, and the only difference was a trade agreement.` },
    misconception: `Students write that joining a bloc "makes firms more competitive". It changes the price at which a firm's product arrives, not the product: ${money(L.gapInside)} below the rival inside and ${money(L.gapOutside)} above it outside.`,
    examMatters: `Appendix 6 defines Construct as requiring an accurately labelled diagram, and says the type may be stated. A bar comparison inside and outside the bloc is what this asks for.`,
    recall: recall(sid, {
      type: 'fillin',
      prompt: `A unit lands at ${money(L.landed)}. The rival sells at ${money(L.rivalPrice)}. Outside the bloc a ${pct(L.tariffRate)} tariff applies. Complete it:`,
      template: [
        `Inside the bloc the unit is ___ dollars below the rival`,
        `Outside the bloc the tariff adds ${money(L.tariffPerUnit)}, putting it ___ dollars above the rival`,
        `What changed between the two cases is which side of the ___ the firm is on`,
      ],
      answers: ['5.50', '3.00', 'boundary'],
      hints: [`${money(L.rivalPrice)} minus ${money(L.landed)}`, `${money(L.landedWithTariff)} minus ${money(L.rivalPrice)}`, 'the line a bloc draws between members and non-members'],
      distractors: ['6.00', '2.50', 'border'],
    }),
  };
})();

/* ══ The plan ════════════════════════════════════════════════════════════ */

const BLOCK_PLAN = [
  { title: B1, subs: [whatGlobalisationMeans, threeKindsOfEconomy, whereGrowthIs, tradeOpportunities, employmentPatterns, gdpPerCapita, humanDevelopmentIndex], takeaway: [
    'Developed, developing and emerging describe income a head and direction, not size.',
    `GDP per capita is GDP divided by the population: ${bn(E.emerging.gdpNow)} across ${mn(E.emerging.population)} is ${money(E.emerging.perCapitaNow)}.`,
    `Fast growth and low income a head are both true at once: ${pct(E.emerging.growth)} growth, still ${qty(E.emergingGap)} times poorer a head.`,
    'HDI adds schooling and life span to income, which is a workforce question as much as a market one.',
  ] },
  { title: B2, subs: [exportsAndImports, specialisationSaves, specialisationCosts, fdiAndGrowth], takeaway: [
    `Most exporters are importers: ${pct(L.importedShare)} of this unit's cost crosses a border inwards first.`,
    `Specialising saved ${money(L.specialisationSaving)} a unit (${pct(L.specialisationSavingPct)}) and handed ${pct(L.importedShare)} of the cost to somebody else.`,
    'FDI is investment in productive assets abroad, and the test is control rather than amount.',
    `${money(L.fdi)} bought ${qty(L.plannedExports)} units a year of capacity: ${money(L.fdiPerUnit)} behind each one.`,
  ] },
  { title: B3, subs: [liberalisationAndBarriers, theWto, politicalChange, transportAndCommunication, mncsAndInvestmentFlows], takeaway: [
    'The specification names NINE factors, not three, and trading blocs is a separate sub-topic.',
    'The WTO is a forum for agreeing rules and settling disputes; it does not set tariffs.',
    `Freight at ${pct(L.freightShare)} of unit cost is why production stopped following the customer.`,
    'An MNC owns operations in more than one country; FDI is the flow that built them.',
  ] },
  { title: B4, subs: [migration, globalLabourForce, structuralChange, impactOnBusinesses], takeaway: [
    'Migration is people moving; a growing global labour force is more people available without moving.',
    'Structural change is about which industries produce the output, not about growth.',
    'A market that buys from you becomes a market that competes with you, usually in that order.',
    'The same forces widen the market and widen the competition — so ask which firm, not whether.',
  ] },
  { title: B5, subs: [whyGovernmentsProtect, tariffs, importQuotas, otherBarriers, protectionismOnBusiness], takeaway: [
    `A tariff is a tax on the landed value: ${pct(L.tariffRate)} of ${money(L.landed)} is ${money(L.tariffPerUnit)}.`,
    `A quota is a cap in units — ${qty(L.blockedUnits)} blocked here — and no margin buys a way past it.`,
    `A domestic subsidy moves the RIVAL's price to ${money(L.rivalPriceSubsidised)} and leaves the importer's cost untouched.`,
    'Protectionism helps some domestic firms and raises costs for every domestic firm downstream.',
  ] },
  { title: B6, subs: [euAndSingleMarket, asean, nafta, insideAndOutside], takeaway: [
    'Barriers down between members, kept against non-members: that boundary is the mechanism.',
    'The three the specification names are the EU and its single market, ASEAN and NAFTA.',
    `Inside, the unit is ${money(L.gapInside)} under the rival; outside, ${money(L.gapOutside)} over it. Nothing about the unit changed.`,
    'Building inside a bloc is how a firm outside it gets in — which is what links this chapter to FDI.',
  ] },
];

export const SUBSECTIONS = BLOCK_PLAN.flatMap((b) => b.subs);

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

/* ══ Notes ═══════════════════════════════════════════════════════════════ */
/*
 * ONE NOTES TOPIC PER CHAPTER, IN THE SAME ORDER, CARRYING THE SAME FIGURES FROM THE SAME MODULE, so
 * the two surfaces cannot drift apart without the build failing. `structure-06` is that the live
 * notes define MNC and FDI while the taught content never does — the inconsistency is impossible
 * here because both surfaces read `_packet33-util.mjs`.
 *
 * AND A WARNING FOR VERIFY B: notes are a FREE surface and ship in the server-rendered page from the
 * `data` column, so a `?draft=1` walk shows these notes only after publication. Verify them against
 * the `draft` column, not against the page.
 */

const def = (html) => ({ type: 'definition', text: html });
const mech = (html) => ({ type: 'mechanism', text: html });
const link = (html) => ({ type: 'link', text: html });

export const NOTES = [
  {
    title: B1,
    meta: '6 leaves',
    keyIdea: 'The three kinds of economy, where growth is happening, what it does to trade and jobs, and the two indicators the specification names.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Developed economy</strong> — high income a head, most output and jobs in services, mature markets.'),
        def('<strong>Developing economy</strong> — low income a head, output concentrated in farming and raw materials.'),
        def('<strong>Emerging economy</strong> — middle income a head and rising quickly; the label is about direction as well as level.'),
        def('<strong>GDP</strong> — the total value of what an economy produces in a year.'),
        def('<strong>GDP per capita</strong> — GDP divided by the population: output a head.'),
        def(`<strong>HDI</strong> — an index ${HDI.range} combining ${HDI.combines.join(', ')}.`),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`${bn(E.developed.gdpNow)} across ${mn(E.developed.population)} people is ${money(E.developed.perCapitaNow)}; ${bn(E.emerging.gdpNow)} across ${mn(E.emerging.population)} is ${money(E.emerging.perCapitaNow)}. Six times the GDP, ${qty(E.emergingGap)} times the income a head.`),
        mech(`Growth is a percentage change on the economy's own base: ${pct(E.emerging.growth)} against ${pct(E.developed.growth)}, so the emerging economy grew ${qty(E.growthRatio)} times as fast and is still behind a head.`),
        mech('Growth reaches products in an order set by what a household buys with each extra unit of income, so "is this market growing" is the wrong question and "has it reached my product" is the right one.'),
        link('Employment patterns reach a firm three ways: who it can hire, what it will pay next year, and what its customers do for a living.'),
      ] },
    ],
    takeaway: [
      'Divide before deciding: GDP is size, GDP per capita is what a buyer has.',
      'Emerging means middle income AND moving; developing means low income.',
      'HDI answers a workforce question that income a head does not.',
    ],
  },
  {
    title: B2,
    meta: '3 leaves',
    keyIdea: `Exports and imports in one firm, what specialising saves and costs, and FDI as the money behind ${qty(L.plannedExports)} units of capacity.`,
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Exports</strong> — goods and services produced in a country and sold to buyers in another.'),
        def('<strong>Imports</strong> — goods and services bought in from producers in another country.'),
        def('<strong>Specialisation</strong> — a country or firm concentrating on part of the job and buying the rest in.'),
        def('<strong>FDI</strong> — investment by a firm in productive assets it controls in another country: a plant, an acquisition, or a controlling stake. Not a shareholding held for a return.'),
        def('<strong>MNC</strong> — a firm that owns and runs productive operations in more than one country.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Specialising: ${money(L.integratedCost)} to make everything, ${money(L.factoryCost)} to buy the module at ${money(L.importedModule)} and assemble for ${money(L.ownAssembly)}. Saving ${money(L.specialisationSaving)}, or ${pct(L.specialisationSavingPct)}.`),
        mech(`The same decision seen twice: ${pct(L.importedShare)} of the unit's cost is now bought in, so the price and the arrival of that module are outside the firm's control.`),
        mech(`FDI to growth: ${money(L.fdi)} bought ${qty(L.plannedExports)} units a year of capacity, which is ${money(L.fdiPerUnit)} of investment a unit.`),
        link('A tariff on components reaches an exporter through its imports, which is why exports and imports are one requirement.'),
      ] },
    ],
    takeaway: [
      'Exporters are usually importers; the exposure is at both ends.',
      `Specialisation trades cost for control: ${pct(L.specialisationSavingPct)} off, ${pct(L.importedShare)} handed over.`,
      'FDI is about control of productive assets, not the size of the sum.',
    ],
  },
  {
    title: B3,
    meta: '5 of the 9 factors',
    keyIdea: 'Trade liberalisation and the WTO, political change, the falling cost of transport and communication, MNCs and FDI flows.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Trade liberalisation</strong> — governments agreeing to lower the barriers between their economies.'),
        def('<strong>WTO</strong> — a body of member governments that agree rules for trade between them and run a process for settling disputes. It does not set tariffs.'),
        def('<strong>Political change</strong> — a change in whether a government permits foreign firms to sell, build, own and repatriate profits.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Liberalisation, priced: the same unit is ${money(L.gapInside)} below the rival with no tariff and ${money(L.gapOutside)} above it with one at ${pct(L.tariffRate)}.`),
        mech(`Transport, priced: ${money(L.freight)} of freight on a ${money(L.factoryCost)} unit is ${pct(L.freightShare)}, which is why production stopped following the customer.`),
        mech(`MNCs and FDI are one mechanism from two ends: ${money(L.fdi)} is the flow, the plant is the operation, the firm is the multinational.`),
        link(`THE SPECIFICATION NAMES NINE FACTORS: ${FACTORS.map((f) => f.short.toLowerCase()).join(', ')}. Trading blocs is a separate sub-topic and is not one of them.`),
      ] },
    ],
    takeaway: [
      'Nine factors, and the first five are liberalisation, the WTO, politics, transport and firms.',
      'The WTO agrees rules and settles disputes; governments set tariffs.',
      'Price the transport claim rather than asserting it.',
    ],
  },
  {
    title: B4,
    meta: '4 of the 9 factors',
    keyIdea: 'Migration, the growing global labour force, structural change, and what the nine add up to for a firm.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Migration</strong> — people moving for work, within an economy and between economies.'),
        def('<strong>Global labour force</strong> — the people available to work for internationally trading firms, which grows without anybody moving.'),
        def('<strong>Structural change</strong> — a lasting shift in which industries an economy’s output and employment come from.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech('Migration reaches a firm as labour supply, wage pressure and the availability of particular skills — and two firms in one country can be affected in opposite directions.'),
        mech('The test for whether the global labour force is in the room: can this work be done somewhere else? If it can, it is, whether or not the firm has ever traded abroad.'),
        mech('Structural change turns a customer into a competitor: the market that imported the product learns to make it, then exports it.'),
        link('The impact on businesses is the two lists read from the same forces: a wider market and cheaper inputs, against more competitors and more dependence.'),
      ] },
    ],
    takeaway: [
      'Migration is movement; a growing labour force is availability.',
      'Structural change is composition, not level.',
      'Ask which firm gains, not whether globalisation is good.',
    ],
  },
  {
    title: B5,
    meta: '6 leaves',
    keyIdea: `The reasons for protectionism, and four barriers priced on one ${money(L.landed)} unit.`,
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Protectionism</strong> — a government using barriers to make imports harder or dearer to sell than domestic goods.'),
        def('<strong>Tariff</strong> — a tax charged on a good as it is imported, usually a percentage of the landed value.'),
        def('<strong>Import quota</strong> — a cap on the QUANTITY of a good that may be imported in a period.'),
        def('<strong>Government legislation</strong> — a rule an imported good must satisfy before it may be sold.'),
        def('<strong>Domestic subsidy</strong> — a payment to the home producer for each unit it makes.'),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Tariff: ${pct(L.tariffRate)} of ${money(L.landed)} is ${money(L.tariffPerUnit)}, taking the unit to ${money(L.landedWithTariff)} against a rival at ${money(L.rivalPrice)}.`),
        mech(`Quota: ${qty(L.plannedExports)} planned, ${qty(L.quotaCap)} allowed, ${qty(L.blockedUnits)} blocked — ${pct(L.blockedShare)} of the plan and ${money(L.blockedRevenue)} of sales. No margin buys a way past it.`),
        mech(`Legislation: ${money(L.certificationCost)} a year is ${money(L.certificationPerUnit)} across ${qty(L.plannedExports)} units, and it is a FIXED cost, so it falls hardest on the smallest exporter.`),
        mech(`Subsidy: the importer's cost stays at ${money(L.landed)} and the rival's price falls to ${money(L.rivalPriceSubsidised)}. The gap closes from the other side, which is why firms miss it.`),
        link('Three positions on every protectionism question: the exporter facing it, the producer protected by it, and the domestic firm that BUYS the protected good.'),
      ] },
    ],
    takeaway: [
      'A tariff taxes the landed value, including the freight.',
      'A quota is in units and can only be answered by producing inside the market.',
      'A subsidy moves the rival’s price, not the importer’s cost.',
    ],
  },
  {
    title: B6,
    meta: '4 leaves',
    keyIdea: 'The three blocs the specification names, and the same unit costed inside and outside one.',
    blocks: [
      { title: 'DEFINITIONS', items: [
        def('<strong>Trading bloc</strong> — a group of countries that lower barriers between themselves and keep them against non-members.'),
        ...BLOCS.map((b) => def(`<strong>${b.name}</strong> — ${b.who}. For a business: ${b.forABusiness}.`)),
      ] },
      { title: 'MECHANISMS', items: [
        mech(`Inside: ${money(L.landed)} landed, which is ${money(L.gapInside)} below a rival at ${money(L.rivalPrice)}. Outside: ${money(L.landedWithTariff)}, which is ${money(L.gapOutside)} above it. A swing of ${money(round2(L.gapInside + L.gapOutside))} on an unchanged unit.`),
        mech('Expansion moves the boundary outwards: a firm can find itself inside without moving, and a competitor that supplied from outside now meets a barrier where there was none.'),
        mech('Building inside a bloc is how a firm outside it gets in, which is why a bloc attracts FDI from non-members.'),
        link(`A bloc does not make a firm competitive; it decides where its competitiveness counts. And being ${money(L.gapInside)} ahead is not safe — a subsidy of ${money(L.subsidyPerUnit)} cuts that to ${money(round2(-L.gapAfterSubsidy))}.`),
      ] },
    ],
    takeaway: [
      'Barriers down between members, kept against non-members: that boundary is the mechanism.',
      'EU and its single market, ASEAN, NAFTA — the three the specification names.',
      `Membership was worth ${money(round2(L.gapInside + L.gapOutside))} a unit to this firm, and it changed nothing about the product.`,
    ],
  },
];
