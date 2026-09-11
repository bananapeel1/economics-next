/**
 * Packet 0 (day-0 hotfix) — in-place content corrections.
 *
 * Every change here edits a field IN PLACE. Nothing is inserted or removed from any array, so no
 * quizIndices / practiceIndices / question_index reference moves. That is the only kind of content
 * write allowed before stable item ids exist (packet 2). See audit/PLAN.md.
 *
 * Idempotent and assertive: for each field it requires the live value to equal either the OLD text
 * (then writes NEW) or the NEW text (then skips). Anything else aborts before any write.
 *
 * Run:   node audit/scripts/hotfix-packet-0-content.mjs            (dry run, prints the diff)
 *        node audit/scripts/hotfix-packet-0-content.mjs --apply    (writes to Supabase)
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const APPLY = process.argv.includes('--apply');
const env = {};
readFileSync('.env.local', 'utf8').split('\n').forEach(l => { const [k, ...r] = l.split('='); if (k && r.length) env[k.trim()] = r.join('=').trim(); });
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function findSub(content, subId) {
  for (const b of content) for (const s of (b.sections || [])) if (s.id === subId) return s;
  throw new Error(`subsection ${subId} not found`);
}
/** set(obj, key, OLD, NEW): assert obj[key] is OLD or NEW; return true if a write is needed. */
function set(label, obj, key, OLD, NEW) {
  const cur = obj[key]; const J = v => v === undefined ? "undefined" : JSON.stringify(v);
  if (cur === NEW) { console.log(`  = ${label}: already fixed`); return false; }
  if (cur !== OLD) { throw new Error(`${label}: live value differs from expected.\n   live: ${J(cur).slice(0, 220)}\n   want: ${J(OLD).slice(0, 220)}`); }
  obj[key] = NEW;
  console.log(`  ~ ${label}\n      - ${J(OLD).slice(0, 160)}\n      + ${J(NEW).slice(0, 160)}`);
  return true;
}
function replaceOnce(label, str, OLD, NEW) {
  const n = str.split(OLD).length - 1;
  if (n === 0 && str.includes(NEW)) { console.log(`  = ${label}: already fixed`); return str; }
  if (n !== 1) throw new Error(`${label}: expected exactly one occurrence of ${JSON.stringify(OLD)}, found ${n}`);
  console.log(`  ~ ${label}: ${JSON.stringify(OLD)} -> ${JSON.stringify(NEW)}`);
  return str.replace(OLD, NEW);
}

const writes = []; // { table, sectionId, data, label }
async function load(table, sectionId) {
  const { data, error } = await sb.from(table).select('data').eq('section_id', sectionId).single();
  if (error) throw new Error(`${table}/${sectionId}: ${error.message}`);
  return data.data;
}
function queue(table, sectionId, data, changed) { if (changed) writes.push({ table, sectionId, data }); }

/* ── 1. the-market: strawberry supply example teaches a shift as a movement ── */
{
  const c = await load('section_content', 'the-market');
  const s = findSub(c, 'what-is-supply');
  let ch = set('the-market > what-is-supply > realExample.text', s.realExample, 'text',
    '**UK strawberry farmers** increase the quantity they supply during summer when retail prices are highest, and reduce output during off-peak months. The higher summer price makes extra labour and greenhouse costs worthwhile, showing the law of supply in action.',
    '**Ride-hailing drivers** in Jakarta and Manila log on in larger numbers when surge pricing lifts the fare per trip, and some log off again once the surge ends. Nothing about their costs has changed, only the price they receive, so this is a movement along the supply curve: the law of supply in action. (Seasonal changes in growing conditions are different: they shift the whole supply curve.)');
  ch = set('the-market > what-is-supply > realExample.emoji', s.realExample, 'emoji', '☀️', '🚗') || ch;
  queue('section_content', 'the-market', c, ch);

  const q = await load('section_quiz', 'the-market');
  const item = q[18];
  let qc = set('the-market quiz[18].question', item, 'question',
    'A local gym charges a monthly fee of $40 and has 500 members. It raises its fee to $50 and membership falls to 400. What does this imply about PED?',
    'A local gym charges a monthly fee of $40 and has 500 members. It raises its fee to $50 and membership falls to 450. What does this imply about PED?');
  qc = set('the-market quiz[18].options[0]', item.options, 0,
    'PED = -0.8, demand is inelastic so revenue rises',
    'PED = -0.4, demand is inelastic so revenue rises') || qc;
  qc = set('the-market quiz[18].explanation', item, 'explanation',
    '% change in Qd = -20%, % change in P = +25%. PED = -20/25 = -0.8 (inelastic). Revenue rises from $20,000 to $20,000... actually revenue = 500x40=20,000 vs 400x50=20,000. However, using the PED formula: demand is inelastic at -0.8, so a price rise should increase total revenue.',
    '% change in Qd = -10% (500 to 450), % change in P = +25% ($40 to $50). PED = -10 / 25 = -0.4, so demand is price inelastic. Total revenue rises from 500 x $40 = $20,000 to 450 x $50 = $22,500: with inelastic demand, a price rise increases revenue because the fall in quantity is proportionately smaller than the rise in price.') || qc;
  queue('section_quiz', 'the-market', q, qc);

  const p = await load('section_practice', 'the-market');
  const pc = set('the-market practice[3].hidden (off-topic 20-mark positioning essay)', p[3], 'hidden', undefined, true);
  queue('section_practice', 'the-market', p, pc);
}

/* ── 2. globalisation (business): Brexit salmon example is factually wrong and mislabels the concept ── */
{
  const c = await load('section_content', 'globalisation');
  const s = findSub(c, 'trade-creation-vs-diversion');
  let ch = set('globalisation > trade-creation-vs-diversion > realExample.text', s.realExample, 'text',
    'Post-Brexit, UK fisheries lost tariff-free access to the EU single market. Scottish salmon exporters now face customs checks and paperwork delays that add cost and reduce freshness — a real-world example of trade diversion as EU buyers increasingly switch to Norwegian salmon (Norway has an EEA arrangement).',
    'The **EU\'s Common External Tariff on bananas** long favoured growers in former colonies (the ACP countries) and EU territories over lower-cost Latin American producers. European shoppers bought from the higher-cost protected source because the tariff, not efficiency, made it cheaper at the border: that is trade diversion. After WTO rulings the tariff was cut from 2009, and Latin American bananas regained share.');
  ch = set('globalisation > trade-creation-vs-diversion > realExample.emoji', s.realExample, 'emoji', '🐟', '🍌') || ch;
  queue('section_content', 'globalisation', c, ch);
}

/* ── 3. national-income: transfer payments taught as G / an injection ── */
{
  const c = await load('section_content', 'national-income');
  const a = findSub(c, 'three-sector-model');
  let ch = set('national-income > three-sector-model > examMatters', a, 'examMatters',
    'Examiners frequently test whether you can correctly classify injections and withdrawals. A common trap is asking about transfer payments — these are government spending (injection) even though they are not payment for output. Always classify each flow before analysing its impact.',
    'Examiners frequently test whether you can correctly classify injections and withdrawals. A common trap is transfer payments (pensions, benefits): they are NOT counted in G, because they are not payment for output. The money only enters the circular flow when recipients spend it. Always classify each flow before analysing its impact.');
  const b = findSub(c, 'injections-explained');
  ch = set('national-income > injections-explained > body[0].text', b.body[0], 'text',
    'An **injection** is any addition of spending into the circular flow that does not originate from household consumption. There are three injections. **Investment (I)** is spending by firms on capital goods — machinery, factories, technology. **Government spending (G)** is expenditure on public services, infrastructure, and transfer payments.',
    'An **injection** is any addition of spending into the circular flow that does not originate from household consumption. There are three injections. **Investment (I)** is spending by firms on capital goods — machinery, factories, technology. **Government spending (G)** is expenditure on public services and infrastructure. Transfer payments such as pensions and benefits are excluded, because no output is being bought.') || ch;
  queue('section_content', 'national-income', c, ch);
}

/* ── 4. aggregate-demand: consumption called the most volatile component ── */
{
  const c = await load('section_content', 'aggregate-demand');
  const s = findSub(c, 'determinants-of-consumption');
  const ch = set('aggregate-demand > determinants-of-consumption > keyIdea', s, 'keyIdea',
    'Consumption depends on disposable income, interest rates, consumer confidence, wealth effects and the availability of credit -- it is the largest and most volatile component of AD.',
    'Consumption depends on disposable income, interest rates, consumer confidence, wealth effects and the availability of credit -- it is the largest and most stable component of AD; investment is the most volatile.');
  queue('section_content', 'aggregate-demand', c, ch);
}

/* ── 5. types-sizes-businesses: Skype example wrong on facts and concept ── */
{
  const c = await load('section_content', 'types-sizes-businesses');
  const s = findSub(c, 'diseconomies-demergers');
  const ch = set('types-sizes-businesses > diseconomies-demergers > realExample.text', s.realExample, 'text',
    'eBay acquired Skype in 2005 for $2.6bn, hoping for synergies. The fit was poor — video calling had little to do with online auctions. eBay demerged Skype in 2009, selling it to Microsoft, which could better integrate it into its own ecosystem.',
    '**GSK** demerged its consumer healthcare arm as **Haleon** in 2022: GSK shareholders received shares in the new, separately listed company. Running prescription medicines and toothpaste under one roof had produced coordination costs and a diluted focus, classic diseconomies of scale. Note the difference from a sell-off: when eBay disposed of a majority stake in Skype to outside investors in 2009, that was a divestment, not a demerger.');
  queue('section_content', 'types-sizes-businesses', c, ch);
}

/* ── 6. trade-global-economy: comparative-advantage diagram does not show a gain ── */
{
  const d = await load('section_diagrams', 'trade-global-economy');
  const g = d[0];
  if (g.title !== 'Comparative Advantage: Numerical Example') throw new Error('diagrams[0] is not the comparative advantage diagram');
  let svg = g.svg;
  svg = replaceOnce('diagram after-label', svg, 'After (full specialisation)', 'After (B fully, A partly specialised)');
  svg = replaceOnce('diagram A after', svg, 'A: 0 wheat + 50 cars', 'A: 30 wheat + 35 cars');
  svg = replaceOnce('diagram total after', svg, 'Total: 40W + 50C', 'Total: 70W + 35C');
  svg = replaceOnce('diagram net gain', svg, 'Net gain: +20 Cars (more output from same resources)', 'Net gain: +5 cars, same wheat (more output from same resources)');
  const svgChanged = svg !== g.svg;
  if (svgChanged) g.svg = svg;
  let sc = set('diagram scenarios[1].label', g.scenarios[1], 'label', 'Full specialisation', 'Specialisation by comparative advantage');
  sc = set('diagram scenarios[1].description', g.scenarios[1], 'description',
    'Country A produces only cars, Country B produces only wheat. Total world output increases. Both can consume more through trade at a rate between 2 and 4 wheat per car.',
    'Country B produces only wheat (its comparative advantage). Country A shifts resources towards cars but keeps producing some wheat. World output rises from 70 wheat + 30 cars to 70 wheat + 35 cars: the same wheat and five more cars from the same resources. Both can consume more through trade at a rate between 2 and 4 wheat per car.') || sc;
  queue('section_diagrams', 'trade-global-economy', d, svgChanged || sc);
}

/* ── 7. financial-planning quiz[3]: two identical options ── */
{
  const q = await load('section_quiz', 'financial-planning');
  const ch = set('financial-planning quiz[3].options[2]', q[3].options, 2, '£500', '-£500');
  queue('section_quiz', 'financial-planning', q, ch);
}

/* ── 8. external-influences quiz[15]: currency typo makes the stem unreadable ── */
{
  const q = await load('section_quiz', 'external-influences');
  const ch = set('external-influences quiz[15].question', q[15], 'question',
    'A UK-based exporter sells goods to the US. The exchange rate moves from $1 = $1.30 to $1 = $1.40. How does this affect the exporter?',
    'A UK-based exporter sells goods to the US. The exchange rate moves from £1 = $1.30 to £1 = $1.40. How does this affect the exporter?');
  queue('section_quiz', 'external-influences', q, ch);
}

/* ── 9. supply quiz[21]: wrong key on the supply condition ── */
{
  const q = await load('section_quiz', 'supply');
  const item = q[21];
  let ch = set('supply quiz[21].correctIndex', item, 'correctIndex', 0, 1);
  ch = set('supply quiz[21].explanation', item, 'explanation',
    'A firm supplies output when the market price covers its average total costs, ensuring at least normal profit. If price falls below average total costs in the long run, the firm will exit the market.',
    'In the short run a firm keeps supplying as long as the price at least covers the marginal cost of the next unit (P = MC is the supply condition), and it shuts down only if price falls below average variable cost. Covering average total cost decides whether the firm stays in the market in the long run, not whether it supplies a unit now.') || ch;
  queue('section_quiz', 'supply', q, ch);
}

/* ── 10. market-failure quiz[18]: keys the external-cost area as the welfare loss, contradicting quiz[5] ── */
{
  const q = await load('section_quiz', 'market-failure');
  const item = q[18];
  let ch = set('market-failure quiz[18].options[0]', item.options, 0,
    'The area between the MSC and MPC curves, up to the free market quantity',
    'The triangle between the MSC and MSB (= MPB) curves, from the socially optimal quantity to the free-market quantity');
  ch = set('market-failure quiz[18].explanation', item, 'explanation',
    'The welfare loss is the area between MSC and MPC (or MSB, since MSB = MPB when there are no consumption externalities) from the socially optimal quantity to the free market quantity, representing the excess social cost.',
    'The welfare loss is the triangle between MSC and MSB (which equals MPB when there is no consumption externality) from the social optimum Qopt to the free-market quantity Qm: the units produced beyond the optimum, where marginal social cost exceeds marginal social benefit. The area between MSC and MPC from 0 to Qm is the total external cost, a common distractor.') || ch;
  queue('section_quiz', 'market-failure', q, ch);
}

/* ── 11. Off-topic / off-spec practice items: flag hidden (never delete: deletion renumbers) ── */
{
  const p = await load('section_practice', 'managing-finance');
  let ch = set('managing-finance practice[1].hidden (gearing is WBS13; Explain 6 is not a Business tariff)', p[1], 'hidden', undefined, true);
  ch = set('managing-finance practice[3].hidden (ROCE/gearing/asset turnover/dividend yield off WBS12)', p[3], 'hidden', undefined, true) || ch;
  queue('section_practice', 'managing-finance', p, ch);
}
{
  const p = await load('section_practice', 'price-determination');
  const ch = set('price-determination practice[3].hidden (WEC12 macro essay inside 1.3.4)', p[3], 'hidden', undefined, true);
  queue('section_practice', 'price-determination', p, ch);
}

/* ── Write ────────────────────────────────────────────────────────────────── */
console.log(`\n${writes.length} table row(s) to update: ${writes.map(w => `${w.table}/${w.sectionId}`).join(', ') || 'none'}`);
if (!APPLY) { console.log('\nDRY RUN. Re-run with --apply to write.'); process.exit(0); }
for (const w of writes) {
  const { error } = await sb.from(w.table).update({ data: w.data }).eq('section_id', w.sectionId);
  if (error) throw new Error(`write failed ${w.table}/${w.sectionId}: ${error.message}`);
  console.log(`  wrote ${w.table}/${w.sectionId}`);
}
console.log('\nDone. Re-run without --apply to confirm every field now reads "already fixed".');
