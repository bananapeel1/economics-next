/**
 * PACKET 56 — global-industries-mncs assessment: the quiz bank, the practice set, the flashcards, the
 * common mistakes and the extras.
 *
 * ── THE BANK ───────────────────────────────────────────────────────────────
 *
 * The live bank's ten items: six (q2 Rana Plaza, q3 greenwashing, q5 "Controlling MNCs" with its
 * "campaigning → pressure group" giveaway, and the three other ethics/control stems topFix-01 names)
 * tested material no chapter taught (quiz-01/02/03, topFix-01, structure-04). The whole bank is
 * replaced by items on chapters that now teach those terms; the named real cases are retired under
 * Layer 4 rather than taught (see _packet56-util.mjs). Every item is tagged with the chapter that
 * teaches it; the runner derives `quizIndices` from the tag. Keys are written first and DEALT into a
 * position from a hash of the stem (packet 36).
 *
 * ── THE PRACTICE SET IS THE PAPER'S OWN SHAPE ──────────────────────────────
 *
 * 4.3.4 is Unit 4 (WBS14): Section A is one source-based set of 4 + 4 + 8 + 12 + 12 = 40, and
 * Sections B and C are one 20-mark Evaluate essay each, from sources (`audit/raw/ial-paper-
 * structure.json`, business.units_3_4; DECISIONS Settled 26 Sep). Seven items on ONE source.
 * The live five were Explain 4, Analyse 6, Assess 10, Explain 4 (production location, off-topic) and a
 * context-free "global economy" Evaluate 20 (topFix-04, practice-01, structure-08).
 *
 *   - topFix-04: both 4-markers are "Explain one…", on the source; the off-topic location item is gone;
 *     one essay is the ledger's own "Evaluate whether [country] should offer tax incentives to attract
 *     [MNC]"; every item above 6 marks carries levels naming knowledge, application, analysis and
 *     evaluation, and the 12s and 20s a short model answer.
 *   - The guidance OPENS with a scaffold and no figure, allocation or level (`practice.opening`).
 *   - `Discuss` asks for a brief assessment and never a conclusion (V036).
 */
import { id, hash8, FIRM, usd, usdm, units, pct } from './_packet56-util.mjs';
import { B1, B2, B3, B4 } from './_packet56-content.mjs';

const F = FIRM;

/* ══ Quiz ════════════════════════════════════════════════════════════════ */

/** An item, authored KEY FIRST. `block` is null for the three pre-test items. */
const qi = (block, question, options, explanation) => ({
  id: id('quiz', question), block, question, options, explanation,
});

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
  /* ── the pre-test pool: three, unpinned, answerable from chapter one ── */
  qi(null, 'A business that owns and controls factories in several countries is best described as:',
    ['a multinational corporation', 'a firm that only exports', 'a franchise business', 'a campaigning pressure group'],
    'Owning and controlling operations in more than one country is what makes a business a multinational corporation (MNC). An exporter sells abroad from home, a franchise licenses its brand to others who own the outlets, and a pressure group campaigns rather than produces.'),
  qi(null, 'A carmaker spends money building a plant that it will own and run in another country. This spending is:',
    ['foreign direct investment', 'an export of capital goods', 'a transfer price', 'self-regulation'],
    'Money put into a lasting business abroad that the investor owns and runs is foreign direct investment. An export of capital goods is a sale of machinery abroad, a transfer price is what one part of a group charges another, and self-regulation is a firm setting its own rules.'),
  qi(null, 'Which local business is most likely to lose when an MNC opens a shoe factory nearby?',
    ['a local firm that makes shoes', 'a firm that sells it packaging', 'a café beside the factory', 'a bus company carrying its workers'],
    'A local shoemaker competes with the MNC for buyers and for skilled staff, so it faces crowding out. The packaging firm, the café and the bus company all gain customers from the factory and its workers.'),

  /* ── Chapter 1 ── (the block's leading item is the check-in's; written against nothing the
     chapter's diagram prints) */
  qi(B1, 'An investor buys 3% of the shares of a foreign company. Why is this not foreign direct investment?',
    ['so small a stake gives no control of the business', 'the company is in another country', 'shares cannot be bought from abroad', 'only governments can make FDI'],
    'FDI means owning and running a lasting business abroad, and a small shareholding brings no control, so it is not FDI. Being abroad is what FDI needs, foreign shares can be bought, and FDI is made by firms rather than governments.'),
  qi(B1, 'A plant pays workers $420 a month where the local average for similar work is $350. Its wage premium is:',
    ['20%', '17%', '70%', '14%'],
    'The premium is the extra $70 as a share of the local average: 70 ÷ 350 = 20%. Dividing by the plant\'s own wage gives about 17%, and $70 is the gap in dollars, not a percentage.'),
  qi(B1, 'Which effect of a foreign-owned plant on local labour is a risk rather than a gain?',
    ['senior posts filled by staff from abroad', 'pay above local rates', 'training on modern machines', 'new jobs in the area'],
    'Filling senior posts with staff from abroad leaves local workers the routine jobs, which limits what they gain. Higher pay, training and new jobs all leave local workers better off.'),
  qi(B1, 'A mine builds a clinic for the valley but pumps the groundwater that farmers\' wells rely on. Its impact on the local community:',
    ['includes both gains and costs', 'is wholly positive', 'affects only its own workers', 'is a national, not a local, impact'],
    'The clinic is a gain and the lost well water is a cost, and both fall on residents whether or not they work at the mine. So the impact is mixed, local, and wider than the workforce.'),

  /* ── Chapter 2 ── */
  qi(B2, 'An MNC exports $70m a year from a host country, imports $30m of parts and sends $12m of profit home. Its net yearly flow into the host country is:',
    ['$28m', '$40m', '$58m', '$112m'],
    'Exports bring in $70m, while imports ($30m) and profit sent home ($12m) take $42m out, leaving a net $28m. Leaving out the profit gives $40m, leaving out the imports gives $58m, and adding all three treats money going out as money coming in.'),
  qi(B2, 'A factory makes a product for $40 and sells it to its own sales company abroad for $45, when unrelated firms would pay $60. The host taxes profit at 20%. The host\'s tax lost on each unit is:',
    ['$3', '$1', '$4', '$12'],
    'At the internal price the host taxes $5 of profit instead of $20, so $15 of profit has moved abroad, and 20% of $15 is $3. The $1 is the tax still collected, the $4 is the tax at the fair price, and $12 is the profit moved minus the tax on it.'),
  qi(B2, 'Which of these is technology and skills transfer from an MNC to the host country?',
    ['a trained engineer leaving to start a local firm', 'the MNC exporting its output', 'the MNC sending profit home', 'the MNC paying above local wages'],
    'Know-how spreads beyond the MNC when a worker it trained takes the skills to a local firm. Exporting, sending profit home and paying above local wages are other effects, and none of them moves know-how to local firms.'),
  qi(B2, 'An MNC\'s factory exports everything it makes. Its main effect on consumers in the host country comes through:',
    ['the wages it pays local workers', 'cheaper products in local shops', 'a wider choice of its brands', 'higher local safety standards'],
    'Local buyers never see the exported goods, so the factory reaches them mainly through the incomes it pays, which workers spend. Lower prices, more brands and safety standards affect consumers only where the MNC sells locally.'),
  qi(B2, 'Which change in a host country\'s business culture could follow an MNC\'s arrival?',
    ['local firms promoting on merit, not family ties', 'more machines imported for the factory', 'higher exports of finished goods', 'lower import taxes on components'],
    'Business culture is how firms are run, and promotion on merit is a change in management practice that local firms can copy. Imported machines, exports and import taxes are trade and technology, not the way firms are run.'),
  qi(B2, 'For the host country, the profit an MNC\'s subsidiary sends to its head office is:',
    ['a flow out, and one cost among several effects', 'proof that the host loses from the MNC', 'a flow into its balance of payments', 'a form of foreign direct investment'],
    'Repatriated profit leaves the country, so it is a flow out and a real cost, but the host also keeps wages, orders, taxes and the plant, so it proves nothing about the overall result on its own. It is not money coming in, and it is not new investment.'),

  /* ── Chapter 3 ── */
  qi(B3, 'A shampoo bottle carries a picture of a tree and the words "planet friendly", though only its cap is recycled. This is an example of:',
    ['misleading product labelling', 'an inappropriate marketing activity', 'poor waste disposal', 'a stakeholder conflict'],
    'The false impression is created on the product\'s own pack, so it is misleading labelling, and claiming green benefits the product lacks is greenwashing. An inappropriate marketing activity concerns how and to whom a product is promoted, not what the pack claims.'),
  qi(B3, 'An MNC could cut costs by 8% by moving orders to suppliers with worse safety records. The clearest stakeholder conflict is between:',
    ['shareholders and the suppliers\' workers', 'consumers and competitors', 'the government and pressure groups', 'managers and head office'],
    'The saving raises profit for the owners while the risk falls on the workers making the goods, so their interests clash directly. Competitors, campaign groups and managers are not the ones who gain and lose from this decision.'),
  qi(B3, 'A drinks plant takes more water from a river each year than the river can spare in a dry season. Its use of resources is mainly a question of:',
    ['sustainability', 'emissions', 'waste disposal', 'marketing ethics'],
    'Using a resource faster than it can be replaced means the use cannot continue, which is sustainability. Nothing is being released into the air or dumped, and the issue has nothing to do with how the drinks are promoted.'),
  qi(B3, 'Why is child labour most often found in the lower tiers of a supply chain?',
    ['small workshops there are rarely inspected', 'MNCs own those workshops directly', 'the law allows it in such workshops', 'children earn more there than adults'],
    'Small workshops and farms far down the chain are the hardest for anyone to see or check, so abuses go unnoticed. MNCs rarely own them, the law does not permit harmful child labour there, and children are paid less, not more.'),
  qi(B3, 'Advertising sugary snacks with cartoon characters during children\'s television programmes is:',
    ['an inappropriate marketing activity', 'misleading product labelling', 'self-regulation', 'a supply chain consideration'],
    'The problem is whom the promotion targets and how, so it is an inappropriate marketing activity even if every claim is true. Nothing on the pack is false, no rule is being set by the firm, and the supply chain is not involved.'),
  qi(B3, 'An MNC obeys a host country\'s pollution law, which is weaker than the law at home. Why might this still be an ethical issue?',
    ['it pollutes more than home law would allow', 'it breaks the host country\'s law', 'the host law does not apply to MNCs', 'pollution abroad cannot be measured'],
    'Obeying a weaker law can still mean causing harm the firm knows it could not cause at home, which is an ethical choice, not a legal one. The firm is not breaking the host law, host law does apply to it, and pollution can be measured anywhere.'),

  /* ── Chapter 4 ── */
  qi(B4, 'Which of these is an example of self-regulation by an MNC?',
    ['a supplier code it writes and audits itself', 'a fine imposed by a host-country court', 'a boycott organised by a campaign group', 'a minimum wage set by the government'],
    'Self-regulation is the firm setting and checking its own rules, which is what a supplier code it audits does. A court fine and a minimum wage are legal control, and a boycott is pressure from outside the firm.'),
  qi(B4, 'A host government drops a planned pollution law after an MNC hints that it will move its plant abroad. This shows the MNC\'s:',
    ['political influence', 'self-regulation', 'consumer pressure', 'legal control'],
    'The MNC used the threat of taking its jobs elsewhere to change what the government decided, which is political influence. It set no rule of its own, buyers played no part, and the law was dropped rather than applied.'),
  qi(B4, 'Why can a small, poor country find it hard to control a large MNC?',
    ['it relies on the jobs and tax the MNC brings', 'MNCs are not bound by host-country law', 'small countries cannot pass laws on pay', 'MNCs never move production'],
    'A host that relies on an MNC\'s jobs and tax may not risk driving it away with strict rules, and the MNC can move. MNCs are bound by host law, any country can legislate on pay, and the ability to move is exactly what gives an MNC its power.'),
  qi(B4, 'Why has social media made pressure on MNCs faster?',
    ['images from a supplier can reach millions in days', 'it lets governments fine firms directly', 'it replaces the need for any law', 'MNCs cannot reply to posts'],
    'Evidence posted online spreads to buyers and campaigners in many countries almost at once, with no need for a newspaper or a government. Social media does not issue fines, does not replace law, and MNCs can and do reply in public.'),
  qi(B4, 'Why does consumer pressure work poorly on a firm that sells only to other businesses?',
    ['it has little public brand to protect', 'businesses never change suppliers', 'the law forbids business boycotts', 'its prices are set by government'],
    'Consumer pressure works by threatening a brand\'s sales to the public, and a firm with no public brand has little to lose from it. Businesses do change suppliers, boycotts are not banned, and its prices are its own.'),
  qi(B4, 'A minimum rate of tax on the profits of large MNCs, agreed by many governments together, is legal control through:',
    ['an international agreement', 'self-regulation by MNCs', 'a form of transfer pricing', 'political influence'],
    'A rule that many governments sign up to is an international agreement, one of the three levels of legal control. It is imposed on MNCs rather than set by them, it limits the gain from shifting profit rather than being a way to shift it, and it is governments, not MNCs, acting.'),
]);

/* ══ Practice ════════════════════════════════════════════════════════════ */

const pr = (block, command, marks, question, guidance) => ({
  id: id('practice', question), block, command, marks, question, guidance,
});

/*
 * THE SOURCE. One extract carries every item, so a student meets the same MNC seven times, and
 * `PracticeQuestionsTab.jsx` prints the shared opening once. Every figure the items need is here.
 */
export const EXTRACT = `Source A. ${F.name} is a sportswear MNC with its head office in ${F.homeRegion}. It spent ${usdm(F.fdi)} building a shoe factory in ${F.host}, a lower-income country, where it employs ${units(F.workers)} workers at ${usd(F.wage)} a month; local factories pay an average of ${usd(F.localWage)}. The factory buys ${usdm(F.localPurchases)} a year of materials and services from local firms, and two local shoemakers say they have lost skilled staff to it. Each year it exports ${usdm(F.exportsYr)} of shoes, imports ${usdm(F.importsYr)} of components and sends ${usdm(F.profitsHome)} of profit to its head office. ${F.host} taxes company profits at ${pct(F.taxHost)}. The factory makes a pair for ${usd(F.costPair)} and sells it for ${usd(F.transferPrice)} to ${F.trading}, a subsidiary in ${F.lowTax}, where profits are taxed at ${pct(F.taxLow)}; unrelated firms trade similar pairs at ${usd(F.armsLength)}. It sells ${units(F.pairs)} pairs a year. Residents complain of dye in the river and smoke from the boilers; cleaner equipment would cost ${usdm(F.cleanKit)}. ${F.name} also buys clothing from ${F.suppliers} supplier factories in ${F.host}, and an inspection found children working at ${F.childSuppliers} of them, although its supplier code bans child labour. A video from one of them was shared widely on social media. Its "eco" range contains ${pct(F.recycledPct)} recycled material. ${F.name} now plans a second factory costing ${usdm(F.secondPlant)} and employing ${units(F.secondJobs)} people, and is choosing between ${F.host} and a neighbouring country; ${F.host}'s government is considering a ${F.holidayYears}-year tax holiday to win it.`;

export const PRACTICE = [
  pr(B1, 'Explain', 4, `${EXTRACT} Explain one way ${F.name}'s factory could affect local businesses in ${F.host}. (4 marks)`,
    'Decide which kind of local firm you are writing about before you write, because firms that supply the factory and firms that compete with it are affected in opposite directions. Use one piece of evidence from the source and follow it through to what happens to that firm.\n'
    + `Knowledge: an MNC can help local businesses that supply it or serve its workers, and harm those that compete with it (1 mark). Application: the factory buys ${usdm(F.localPurchases)} a year of materials and services from local firms, or two local shoemakers have lost skilled staff to it (1 mark). Analysis: suppliers gain a large regular customer, so they can expand, hire and raise their standards to meet ${F.name}'s requirements (1 mark). Analysis: which makes them better able to win other customers too; or, for the shoemakers, losing trained staff raises their costs and cuts their output, so they may be crowded out (1 mark). An answer that gives both a gain and a loss without developing either earns fewer marks than one developed chain.`),

  pr(B2, 'Explain', 4, `${EXTRACT} Explain one impact of ${F.name}'s factory on ${F.host}'s balance of payments. (4 marks)`,
    'Sort the flows in the source into money coming into the country and money going out before you write. Then pick one impact and explain it through to its effect on the country.\n'
    + `Knowledge: the balance of payments records money flowing into and out of a country from trade and investment (1 mark). Application: ${F.name} exports ${usdm(F.exportsYr)} of shoes a year from ${F.host}, while ${usdm(F.importsYr)} leaves for components and ${usdm(F.profitsHome)} as profit sent home (1 mark). Analysis: the yearly flows bring in a net ${usdm(F.netFlow)}, which gives ${F.host} foreign currency to pay for its own imports (1 mark). Analysis: the benefit would shrink if the factory imported more of its components or sent more profit home, so it depends on how much ${F.name} buys locally (1 mark). Treating the profit sent home as proof that ${F.host} loses overall is a misreading; it is one outflow among several flows.`),

  pr(B3, 'Discuss', 8, `${EXTRACT} Discuss the stakeholder conflicts ${F.name} faces over conditions in its supplier factories. (8 marks)`,
    'Identify which stakeholders gain and which lose from the way the supplier factories are run, using the source rather than a general list. For each conflict, say why the interests clash, and leave room for a brief assessment of which conflict matters most for this firm.\n'
    + `Level 1: names stakeholders with little use of the source. Level 2: knowledge and application — shareholders gain from cheap supplier prices; workers at the ${F.suppliers} suppliers bear the cost, with children found at ${F.childSuppliers}; consumers want low prices but many object to child labour; ${F.host}'s government wants the jobs but also has laws to uphold. Level 3: analysis of the conflicts — raising standards means paying suppliers more, which cuts profit, while leaving things as they are risks a boycott, as the video shared on social media shows; the supplier code already bans child labour, so the conflict is between the cost of enforcing it and the damage from not doing so. Level 4: a brief assessment of which conflict matters most, for example that the clash between shareholders and suppliers' workers is sharpest because the brand's value, and so shareholders' own interest, depends on buyers' trust. Discuss needs this assessment; it does not need a final recommendation.`),

  pr(B2, 'Assess', 12, `${EXTRACT} Assess the impact of ${F.name}'s transfer pricing on ${F.host}'s tax revenues. (12 marks)`,
    'Work out what profit is reported in each country at the price the factory actually charges and at the price unrelated firms would pay, and what that means for the tax each country collects. Then weigh that against the other taxes the factory still brings in and what the government could do about it.\n'
    + `Level 1: knowledge of transfer pricing or tax revenues, described generally. Level 2: application — the factory sells at ${usd(F.transferPrice)} a pair against ${usd(F.armsLength)} between unrelated firms, so ${F.host} taxes ${usd(F.profitHostPair)} of profit a pair instead of ${usd(F.profitArmsPair)}; on ${units(F.pairs)} pairs at ${pct(F.taxHost)} it collects ${usdm(F.hostTaxActual)} rather than ${usdm(F.hostTaxArms)}, losing ${usdm(F.hostTaxLost)} a year, while ${F.lowTax} collects ${usdm(F.lowTaxPaid)} at ${pct(F.taxLow)}. Level 3: analysis of both sides — the lost ${usdm(F.hostTaxLost)} could have paid for public services, and the arrangement shifts the burden to local taxpayers; against that, the factory's ${units(F.workers)} workers still pay income tax, its local purchases generate taxable income, and ${F.host} could challenge the price under its transfer-pricing rules. Level 4: evaluation reaching a supported judgement, for example that the impact on profit tax is large, but that the overall effect on tax revenues depends on whether ${F.host} can enforce an arm's length price without driving ${F.name}'s second factory to its neighbour.\n`
    + `A strong answer, in outline: the internal price cuts ${F.host}'s profit tax from ${usdm(F.hostTaxArms)} to ${usdm(F.hostTaxActual)}; the factory still generates income and sales taxes; so the impact is significant but partly recoverable, and it turns on how firmly ${F.host} applies its rules while it competes for the second factory.`),

  pr(B3, 'Assess', 12, `${EXTRACT} Assess whether ${F.name} should spend ${usdm(F.cleanKit)} on cleaner equipment at its factory in ${F.host}. (12 marks)`,
    'Set out what the spending would buy and who would benefit, then what it costs the firm and what it might do instead. Your judgement should say whether the benefits justify the cost for this firm, and what it depends on.\n'
    + `Level 1: knowledge of emissions, waste disposal or sustainability, described generally. Level 2: application — residents complain of dye in the river and smoke from the boilers; the equipment would cost ${usdm(F.cleanKit)}; the firm already faces scrutiny on social media over its suppliers. Level 3: analysis of both sides — cleaner equipment reduces harm to the community, lowers the risk of stricter enforcement and protects a brand already under pressure, and it may cut fuel and water costs over time; against that, ${usdm(F.cleanKit)} is a large cost that reduces the ${usdm(F.profitsHome)} of profit sent home, and ${F.name} may argue that it already meets ${F.host}'s law. Level 4: evaluation reaching a supported judgement, for example that the spending is justified because the reputational risk is already live and the law is weaker than at home, provided the firm makes the improvement visible to buyers.\n`
    + `A strong answer, in outline: the harm is real and public; the cost is a fraction of a year's profit sent home; so ${F.name} should invest, unless it plans to leave ${F.host}, in which case the choice of where to build the second factory matters more.`),

  pr(B2, 'Evaluate', 20, `${EXTRACT} Evaluate whether ${F.host}'s government should offer ${F.name} a ${F.holidayYears}-year tax holiday to attract its second factory. (20 marks)`,
    'Set out what the second factory would bring to the country and what the tax holiday would cost, using the source, before judging. Then consider what the government risks by not offering it, and finish with a recommendation that says what would change it.\n'
    + `Level 1: describes the effects of MNCs or tax holidays with little reference to the source. Level 2: knowledge and application — the factory would bring ${usdm(F.secondPlant)} of FDI and ${units(F.secondJobs)} jobs, and the existing factory already pays above local wages and buys from local firms; a tax holiday means no profit tax for ${F.holidayYears} years, from a firm whose transfer pricing already cuts its profit tax in ${F.host}. Level 3: analysis — the jobs, wages, local orders and exports would add to growth and to income and sales taxes even without profit tax; but a holiday gives away revenue the country needs, rewards a firm already shifting profit to ${F.lowTax}, and invites every future investor to ask for the same; and without it, the factory may go to the neighbour. Level 4: evaluation — weighs these against the evidence, considers what is not in the source (how close the neighbour's offer is, how long ${F.name} is likely to stay), and reaches a perceptive recommendation with conditions.\n`
    + `A strong answer, in outline: the factory's jobs and local spending are worth more to ${F.host} than profit tax it may not collect anyway; but an unconditional holiday rewards profit shifting; so a shorter or conditional holiday is justified, tied to local hiring and an arm's length price, unless ${F.name} would come without one, in which case it is revenue given away for nothing.`),

  pr(B4, 'Evaluate', 20, `${EXTRACT} Evaluate whether pressure from consumers, pressure groups and social media is more likely than legal control to end child labour at ${F.name}'s suppliers. (20 marks)`,
    'Compare the two routes on the same questions: how directly each reaches the supplier factories, how quickly it works, and how long it lasts. Use the source for evidence of each, then bring in what the source does not show, and finish with a recommendation and the condition that would change it.\n'
    + `Level 1: describes ways of controlling MNCs in general terms. Level 2: knowledge and application — a video from a supplier has already been shared on social media; ${F.name} sells a consumer brand, so a boycott would hit its sales; its own supplier code bans child labour yet children were found at ${F.childSuppliers} of ${F.suppliers} suppliers; ${F.host}'s law applies to the suppliers, and some home countries make firms answer for forced labour abroad. Level 3: analysis — public pressure works quickly and reaches the brand directly, but attention fades and buyers often return on price; legal control is lasting and applies to every firm, but depends on inspectors ${F.host} may lack and on political will while it competes for the second factory. Level 4: evaluation — judges which is more likely to end the practice rather than hide it, notes that pressure often works by pushing firms to enforce their codes and governments to act, and reaches a perceptive recommendation with conditions.\n`
    + `A strong answer, in outline: pressure has already reached ${F.name} and threatens its sales, so it is likely to move the firm first; but only enforced law reaches suppliers who sell to firms with no brand to protect; so pressure is more likely to change ${F.name}'s own suppliers quickly, while ending the practice across ${F.host} needs law that is enforced.`),
];

/* ══ Flashcards ══════════════════════════════════════════════════════════ */

const fc = (front, back) => ({ id: id('flashcard', front), front, back });

export const FLASHCARDS = [
  fc('What is a multinational corporation (MNC)?', 'A business that owns and controls operations, such as factories, offices or shops, in more than one country.'),
  fc('What is a subsidiary?', 'A company owned and controlled by another company, registered in the country where it operates.'),
  fc('What is foreign direct investment (FDI)?', 'Money put into a lasting business abroad that the investor owns and runs. A small shareholding with no control is not FDI.'),
  fc('How can an MNC affect local labour?', 'It creates jobs and often pays above local wages; conditions can be better or worse; senior posts may go to staff from abroad.'),
  fc('How can an MNC affect local businesses?', 'Suppliers and nearby shops can gain; local rivals can lose customers and skilled staff, and be crowded out.'),
  fc('How can an MNC affect the local community and environment?', 'It may bring roads, power, clinics and schools, and also smoke, waste water, traffic and competition for land and water.'),
  fc('How does FDI add to economic growth?', 'It builds new capacity whose output counts in the country\'s production, and its spending supports other firms.'),
  fc('How does an MNC affect the balance of payments?', 'FDI and exports bring money in; imported components and profits sent home take money out. The impact is the balance.'),
  fc('Does profit sent home prove the host country loses?', 'No. It is one outflow; the host also keeps the wages, local orders, taxes and the capacity built.'),
  fc('What is technology and skills transfer?', 'Know-how and methods an MNC brings that spread to local firms, through trained workers, suppliers and imitation.'),
  fc('What is business culture?', 'The shared way firms in a country are run: decisions, management, promotion and what counts as acceptable practice.'),
  fc('How can an MNC affect consumers in the host country?', 'More choice, better quality and lower prices; but the risk of fewer rivals and higher prices later.'),
  fc('What is a transfer price?', 'The price one part of an MNC charges another part, such as a factory selling to the group\'s trading company.'),
  fc('What is the arm\'s length price?', 'The price unrelated firms would agree for the same goods; tax authorities use it to test transfer prices.'),
  fc('How does transfer pricing cut a host\'s tax revenue?', 'Low internal prices move profit to a low-tax country; the host taxes less profit, so it collects less.'),
  fc('What is a stakeholder conflict?', 'One decision that helps one group of stakeholders and harms another, such as owners gaining from cuts that hurt workers.'),
  fc('Emissions or waste disposal: what is the difference?', 'Emissions are released into the air; waste disposal is how leftover water, chemicals and scrap are got rid of.'),
  fc('What is sustainability?', 'Meeting today\'s needs without harming the ability of future generations to meet theirs.'),
  fc('What is child labour?', 'Work by children that harms their health or schooling; most common in the lower tiers of supply chains.'),
  fc('What is greenwashing?', 'Claiming environmental benefits a product does not have, a form of misleading labelling.'),
  fc('What is an inappropriate marketing activity?', 'Promotion that is unethical even if true: targeting children, pushing harmful products, hidden paid endorsements.'),
  fc('What gives an MNC power over a host country?', 'Its size, its ability to move production elsewhere, and how much the host relies on its jobs and tax.'),
  fc('What is political influence?', 'An MNC using its power over governments: lobbying, offering or withholding investment, negotiating special terms.'),
  fc('What are the three levels of legal control?', 'Host-country law, home-country law and international agreements.'),
  fc('How do consumer pressure, pressure groups and social media control MNCs?', 'They threaten sales and reputation: boycotts, campaigns and evidence shared online.'),
  fc('What is self-regulation, and its weakness?', 'The firm or its industry sets and checks its own rules; it relies on the firm enforcing them, so it needs independent checks.'),
];

/* ══ Common mistakes — the fields MistakesTab.jsx reads: title, mistake, correction, examTip ═ */

const mk = (title, mistake, correction, examTip) => ({ id: id('mistake', title), title, mistake, correction, examTip });

export const MISTAKES = [
  mk('Calling any exporter an MNC',
    'Describing a firm that sells abroad from its home factories as a multinational.',
    'An MNC owns and controls operations in more than one country. Exporting is selling abroad; FDI is what makes a firm multinational.',
    'Check whether the firm in the case owns something abroad before calling it an MNC.'),
  mk('Treating profit sent home as proof the host loses',
    'Arguing that once repatriated profit exceeds the original investment, the host country is worse off.',
    'Any profitable, long-lived investment returns more than it cost. The host also keeps the wages, local orders, taxes and the capacity built, so the comparison settles nothing.',
    'Weigh every flow and effect in the case, and treat profit sent home as one cost among them.'),
  mk('Calling transfer pricing tax evasion',
    'Writing that an MNC setting prices between its own companies is breaking the law.',
    'Transfer pricing is legal and normal. Used to move profit to low-tax countries it is avoidance; it becomes evasion only when it breaks the law, for example with false invoices.',
    'Use the word avoidance, show the profit moved with the case figures, and say what rules the host could apply.'),
  mk('Judging workers by wages alone',
    'Stating that because an MNC pays above the local average, its workers are treated well.',
    'Pay is one part of the impact on labour; hours, safety, security and the kind of job matter too.',
    'Compare pay with the local figure, then say what the case shows about conditions.'),
  mk('Listing stakeholders without the conflict',
    'Naming shareholders, workers, consumers and government, and describing what each wants.',
    'Ethics questions turn on the clash: one decision that helps one group and harms another.',
    'Pick the two groups whose interests clash most in the case and judge which should come first, and why.'),
  mk('Treating legal as ethical',
    'Arguing that an MNC obeying the host country\'s law has behaved ethically.',
    'Where host law is weaker than at home, obeying it can still cause harm the firm could not cause at home.',
    'Ask whether the firm would be allowed to do the same at home, and who bears the harm.'),
  mk('Assuming a code of conduct is kept',
    'Using an MNC\'s published supplier code as evidence that its suppliers treat workers well.',
    'A code is a promise. Only independent checks and consequences for breaking it show whether it is kept.',
    'Say who checks the code in the case and what happens when it is broken.'),
];

/* ══ Extras ══════════════════════════════════════════════════════════════ */
/*
 * The first two chains are what the reorders drill (`reorder.source` finds a sequence the section
 * teaches in an extras chain, in the same order). They sit on the Extras tab, not on the recall's own
 * step, so neither recall is answerable by scrolling up.
 */
export const EXTRAS = {
  chains: [
    {
      title: 'From FDI to tax revenue',
      steps: [
        'An MNC builds a factory with foreign direct investment.',
        'Its factory hires local workers and orders from local suppliers.',
        'Workers and suppliers earn and spend more income.',
        'Government collects more tax on the extra income and spending.',
      ],
      result: 'The investment reaches the government through incomes; profit shifting can still cut the profit tax.',
    },
    {
      title: 'How social media pressure reaches an MNC',
      steps: [
        'A worker films unsafe conditions at a supplier.',
        'Footage spreads widely on social media.',
        'Buyers boycott the brand and pressure groups campaign.',
        'Head office changes its supplier rules to protect sales.',
      ],
      result: 'Pressure works through sales and reputation, and only while buyers keep caring.',
    },
    {
      title: 'How transfer pricing moves tax',
      steps: [
        'A factory in a high-tax country sells to its own trading company abroad.',
        'The price is set below what unrelated firms would pay.',
        'Most of the profit is reported where the trading company is, at a low tax rate.',
        'The high-tax host collects less profit tax than it would at a fair price.',
      ],
      result: 'The group pays less tax overall; the host loses the difference unless it enforces an arm\'s length price.',
    },
  ],
  evaluation: [
    {
      title: 'Is an MNC good for the host country?',
      content: `Neither answer holds in general. ${F.name}'s factory brings ${units(F.workers)} jobs at a ${pct(F.premiumPct)} wage premium, ${usdm(F.localPurchases)} a year of local orders and a net ${usdm(F.netFlow)} a year into the balance of payments; it also shifts profit to ${F.lowTax} and pollutes the river. Three things decide it. HOW MUCH STAYS: local buying, local hiring, tax actually paid. HOW MUCH SPREADS: skills, methods and standards reaching local firms. HOW WELL IT IS CONTROLLED: whether the host can enforce its rules without the MNC leaving.`,
    },
    {
      title: 'Which control works best?',
      content: 'Law is lasting and covers every firm, but depends on enforcement and can be escaped by moving. Consumer pressure, pressure groups and social media are fast and reach the brand directly, but fade and barely touch firms with no public brand. Self-regulation can go beyond the law in every country, but relies on the firm policing itself. The strongest answers treat them as working together: pressure pushes firms to enforce their codes and governments to act.',
    },
    {
      title: 'Should a host country compete for FDI with tax breaks?',
      content: 'A tax break can win jobs, exports and know-how a country would not otherwise get, and income and sales taxes still flow. But it gives away profit tax, rewards firms that would have come anyway, and invites a race in which every country offers more. Conditions — local hiring, a time limit, an arm\'s length price — make it more defensible than an open-ended holiday.',
    },
  ],
};
