#!/usr/bin/env node
/**
 * Packet 12.1, fix round B1 — the examiner commentary and the likely score on the 30 rewritten
 * 8-mark items.
 *
 * Run once, idempotent, dry by default:
 *   node scripts/packet-12-1b-commentary.mjs          # report only
 *   node scripts/packet-12-1b-commentary.mjs --write  # rewrite the two data files
 *
 * WHY. E004 replaced each item's point-based mark scheme with a levels grid whose Level 4 is
 * reached only by "a brief assessment of the arguments, factors or evidence" (Examine) or "a brief
 * assessment showing awareness of competing arguments or factors" (Discuss). Nothing touched the
 * examiner commentary or the likely score. Verify B walked the cards and found the result: 25 of
 * the 30 commentaries never mention evaluation at all, one of them tells the student the answer
 * "shows evaluative awareness without being asked to evaluate", and every card still claims its
 * old top-band score. A student reads a descriptor that demands an assessment beside a worked
 * answer whose explanation says it earned full marks without one.
 *
 * THE DERIVATION, so it can be checked rather than trusted.
 *
 * The score is read off the grid that is now printed on the card, and from ONE field:
 * `answerParagraphs`, the worked answer the student is shown. `peel` is the plan, not the answer,
 * and a Level 4 needs the assessment to be MADE, not planned — two items (`costs-benefits-growth-8`,
 * `biz-entrepreneur-role-8`) carry the assessment in the plan's Link sentence and nowhere in the
 * answer, and their new commentary says exactly that.
 *
 *   level 4 -> '7-8 / 8'  the answer makes a brief assessment: a qualification the chain depends
 *                         on, a counter-consideration, a stated limitation, or a weighing of
 *                         competing factors against each other.
 *   level 3 -> '5-6 / 8'  a developed chain in context, but the assessment is implied rather than
 *                         made. This is the grid's own Level 3 wording.
 *
 * 17 items are level 4 and 13 are level 3. Nothing is scored below Level 3: every one of the 30
 * carries a developed chain of reasoning in context, which is what Level 3 requires.
 *
 * Each new commentary states which level the worked answer reaches and why, and every level-3
 * commentary names the specific brief assessment that would take THAT answer to Level 4 — so the
 * card teaches the clause instead of contradicting it.
 *
 * Nothing here touches a content table, the DB or the mark schemes. Two source files only.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.argv.includes('--write');
const FILES = ['data/modelAnswersData.js', 'data/modelAnswersExpansion.js'].map((p) => path.join(ROOT, p));

const SCORE = { 3: '5–6 / 8', 4: '7–8 / 8' };

/** id -> { level, commentary }. One row per 8-mark item; the script fails if any id is not found. */
const REWRITES = {
  'supply-shift-8': {
    level: 4,
    commentary:
      "The chain is developed and in context: raw material costs fall → supply shifts right → price falls and quantity rises → consumer surplus rises. The oil price example supplies the application, and a supply and demand diagram would earn the diagram credit. What takes it into Level 4 is the assessment in paragraph 3: the revenue effect is not asserted but made conditional on PED, the opposite case is stated (inelastic demand, revenue falls), and it is then weighed against the cost saving. That brief assessment is the clause separating Examine from Analyse.",
  },
  'maximum-price-8': {
    level: 3,
    commentary:
      "The chain is developed and in context: a ceiling below equilibrium → shortage → non-price rationing → black market → less long-run investment, with rent controls as the application, and a diagram showing Pmax below Pe would earn the diagram credit. It stops at Level 3 because the assessment is implied rather than made — every consequence runs one way and nothing is weighed. One or two sentences would lift it: that the size of the shortage depends on how elastic supply and demand are, and that the policy does protect the consumers who get the good, so the verdict turns on how it is rationed.",
  },
  'indirect-tax-8': {
    level: 4,
    commentary:
      "A developed chain: tax → supply shifts left → price rises → quantity falls → welfare loss narrows, applied to the Soft Drinks Industry Levy, with the tax wedge available for the diagram credit. Level 4 is earned in paragraph 3, where the answer does not leave the tax working: the outcome is made conditional on PED, the inelastic case in which the levy raises revenue rather than changing behaviour is stated, and reformulation is set against it. That is the brief assessment the command requires.",
  },
  'unemployment-types-8': {
    level: 4,
    commentary:
      "Four types, each with a cause, an example and the policy that fits it, with the 2008–09 recession and the decline of UK manufacturing as application. The Level 4 clause is the closing judgement rather than the list: expansionary demand-side policy is the right response to cyclical unemployment and the wrong one to structural, where it would raise inflation without raising employment. That is a brief assessment of competing policies, made rather than implied.",
  },
  'supply-side-lras-8': {
    level: 4,
    commentary:
      "A developed chain in context: policy → productivity and capacity rise → LRAS shifts right → non-inflationary growth and lower structural unemployment, across both interventionist and market-based measures, with an LRAS diagram available for the diagram credit. Level 4 is reached by the closing qualification, which sets the gain against its timing and its cost: the benefits take years to appear and carry short-run spending and transition costs. Brief — but it is an assessment.",
  },
  'circular-flow-8': {
    level: 3,
    commentary:
      "The model is set out accurately and the chain is developed: injections and withdrawals defined, the multiplier mechanism explained with a concrete infrastructure example, and the equilibrium condition stated. A labelled circular flow diagram would earn the diagram credit. It stops at Level 3 because no assessment is made — the mechanism runs and nothing is weighed. Two sentences would lift it: the size of the change in national income depends on the marginal propensity to withdraw, so the same injection moves a high-tax, import-heavy economy far less than the bare model suggests.",
  },
  'interest-rates-inflation-8': {
    level: 4,
    commentary:
      "A developed chain: rate cut → borrowing costs fall → C and I rise → AD shifts right → demand-pull inflation, with an AD/AS diagram available for the diagram credit. The Level 4 clause is paragraph 3, which does not assert the inflation but sizes it: near full employment the AS curve is inelastic and the price effect is amplified, while in a deep recession the same shift mostly raises real output. That conditional is the brief assessment.",
  },
  'market-research-8': {
    level: 4,
    commentary:
      "Benefits and limitations are both developed rather than listed, and both sit in the launch context, with the tech start-up survey as application. Level 4 is earned because the competing factors are set against each other rather than stacked: cost and time are weighed against the launch risk the research removes, and social desirability bias is followed through to its consequence — a stated purchase intention is not a purchase. That awareness of competing arguments is what Discuss asks for beyond Analyse.",
  },
  'recruitment-approaches-8': {
    level: 4,
    commentary:
      "The advantages are developed in context — speed, cost, a candidate who already knows the systems, and the motivation effect linked to Maslow's esteem needs. Level 4 is earned because the answer does not stop at the advantages the question named: the narrower talent pool, and the chain of vacancies one promotion creates, are set against them. Discuss requires that brief assessment of competing factors, and this answer makes it rather than implying it.",
  },
  'sources-finance-8': {
    level: 4,
    commentary:
      "Three sources, each developed in the start-up context rather than described generically, with the failure rate explaining why banks are cautious. Level 4 is earned because each source is weighed rather than presented: savings against the limit of personal wealth, a loan against fixed repayments that start before revenue does, venture capital against the equity given up — and that last trade-off is judged, not merely stated. That is the brief assessment Discuss asks for.",
  },
  'break-even-8': {
    level: 4,
    commentary:
      "Break-even is applied to a real start-up decision, with the café calculation giving the application and the link to loan applications giving the context. Level 4 is earned in paragraph 3, where the limitations are explained rather than listed: the assumption that all output is sold is set against a start-up's uncertain demand, and the model's silence on the timing of cash is set against a business that can break even on paper and still fail. Competing factors, weighed.",
  },
  'cash-flow-management-8': {
    level: 4,
    commentary:
      "Three methods, each developed to a consequence rather than named. Level 4 is earned because every one carries its own counterweight: shorter credit terms against the customers they cost, longer supplier terms against the relationship they damage, sale and leaseback against the ongoing lease charge and the collateral surrendered. Three trade-offs made explicitly is the brief assessment Discuss requires.",
  },
  'lean-production-8': {
    level: 4,
    commentary:
      "JIT is explained and applied, with COVID-19 supply chain disruption and Toyota giving real application. Level 4 is earned because the benefit is set against the condition it depends on: the stockholding saving is weighed against having no buffer stock when a supplier fails, and the method is judged easier for a firm with Toyota's bargaining power than for a small business with none. That conditional judgement is the assessment of competing factors.",
  },
  'ppf-economic-growth-8': {
    level: 3,
    commentary:
      "The distinction between actual growth (a movement toward the frontier) and potential growth (an outward shift) is correct and developed, China supplies the application, and a labelled PPF showing both would earn the diagram credit. The trade-off between capital and consumer goods is analysis of the model rather than assessment of the argument, so this sits at Level 3. A Level 4 needs a brief assessment: the PPF shows the capacity to grow, not whether that capacity is used, so an outward shift is a potential gain only if aggregate demand rises with it.",
  },
  'yed-business-strategy-8': {
    level: 3,
    commentary:
      "Four distinct business uses of YED — forecasting, product portfolio, marketing spend and capacity planning — each developed, with the BMW and Aldi contrast giving strong application. It stays at Level 3 because the usefulness is asserted throughout and never assessed. A Level 4 needs one qualification: YED values are estimates from past data and move with tastes, and a pricing decision needs PED as well, so YED informs the decision rather than making it.",
  },
  'negative-externality-tax-8': {
    level: 3,
    commentary:
      "The chain is developed and correct: external cost → MSC above MPC → price too low → overproduction → deadweight welfare loss, with the steel factory as application and the welfare loss triangle available for the diagram credit. It sits at Level 3 because the assessment is implied rather than made — the Pigouvian tax in the final paragraph is offered as a remedy, not weighed. A Level 4 needs a brief assessment: how large the misallocation is, and whether intervention improves on it, depends on whether the external cost can actually be valued, and pollution damage rarely can be valued precisely.",
  },
  'interest-rates-ad-8': {
    level: 3,
    commentary:
      "Three transmission channels — consumption, investment, and the exchange rate through net exports — each developed into its own chain, with the 0.1% COVID-19 cut as application. It stops at Level 3 because each channel is asserted to work and none is qualified. A Level 4 needs one brief assessment: the size of the shift depends on confidence, and if households and firms expect worse to come, a cheaper loan is pushing on a string.",
  },
  'multiplier-effect-8': {
    level: 4,
    commentary:
      "The mechanism is developed concretely, and the £1bn → £800m → £640m walkthrough makes the rounds of spending visible. Level 4 is earned because the answer then assesses the mechanism rather than trusting it: leakages through saving, tax and imports are set against the theoretical value, the practical UK multiplier of 1.3–1.5 is contrasted with the textbook 5, and the capacity constraint is added as a further limit. That is a brief assessment, made.",
  },
  'costs-benefits-growth-8': {
    level: 3,
    commentary:
      "Three costs — inflation, environmental degradation and inequality — each developed into a chain and each applied, with UK inflation in 2021–22 and the health cost of China's industrialisation as evidence. It sits at Level 3 because the costs are set out and never weighed: nothing says which is the most serious, and nothing sets them against the benefits growth also brings. The plan's Link sentence reaches the judgement — that the quality of growth matters as much as its speed — but the answer itself never says it. Writing that sentence into the final paragraph is the Level 4 clause.",
  },
  'profit-maximisation-mc-mr-8': {
    level: 3,
    commentary:
      "The logic is exact and complete: below MC = MR expand, above it contract, at it neither, and the rule holds across market structures because only the shape of the revenue curve changes. A diagram with the profit area shaded would earn the diagram credit. It is Level 3 because no assessment is made. A Level 4 needs one: firms rarely know their marginal curves, and many pursue sales, growth or market share instead, so MC = MR is the benchmark rather than the behaviour.",
  },
  'monopsony-wages-8': {
    level: 3,
    commentary:
      "The mechanism is developed and correct, and the key insight is stated rather than assumed: MCL exceeds the wage because hiring one more worker raises the wage of everyone already employed. The NHS application is apt and a monopsony diagram would earn the diagram credit. It sits at Level 3 because the result is derived and never assessed. A Level 4 needs a brief assessment: a trade union or a minimum wage can raise both the wage and employment here, which is the opposite of their effect in a competitive labour market, so how much monopsony power the employer really has is what the outcome turns on.",
  },
  'mnc-host-country-8': {
    level: 4,
    commentary:
      "Benefits and costs are each developed into chains and each applied, with Nike in Vietnam carrying both sides. Level 4 is earned because the answer weighs rather than balances: employment and technology transfer are set against profit repatriation, weak labour standards and the crowding out of domestic firms, and the closing judgement makes the net effect conditional on the host country's regulatory framework and bargaining power.",
  },
  'gini-lorenz-inequality-8': {
    level: 4,
    commentary:
      "Both measures are explained with correct technical detail and made concrete by South Africa against Sweden; a sketched Lorenz curve would earn the diagram credit. Level 4 is earned by the third paragraph, which assesses the tools rather than using them: the Gini hides where in the distribution the inequality sits, both measures ignore wealth, and both depend on data that a large informal economy distorts. Three limitations, each developed.",
  },
  'aid-vs-trade-development-8': {
    level: 4,
    commentary:
      "Both sides are developed, with Vietnam's integration into global supply chains giving the application. Level 4 is earned because the answer reaches a judgement instead of alternating: trade's advantage is that the income is self-generating, but market access is not guaranteed, and aid builds the infrastructure without which a country cannot export at all — so the two are complements, and the answer says which combination it prefers. That is the brief assessment the command asks for.",
  },
  'biz-niche-mass-advantages-8': {
    level: 4,
    commentary:
      "Advantages and disadvantages are both developed, with Lush carrying the application throughout. Level 4 is earned because the disadvantages are weighed against the advantages rather than added after them: premium pricing and low direct competition are set against the loss of economies of scale and, more sharply, against the vulnerability of the whole model if a large firm enters the niche. The closing judgement — that it depends on the firm's ability to defend its position — completes the assessment.",
  },
  'biz-product-life-cycle-8': {
    level: 3,
    commentary:
      "All four stages are covered and each is tied to a specific marketing action, with Apple's iPhone extension strategy giving a strong application. It stops at Level 3 because the model is applied and never assessed. A Level 4 needs a brief assessment of the model itself: the PLC describes a pattern rather than predicting one, the length of each stage is only knowable afterwards, and an extension strategy can restart the cycle — so it guides a marketing budget rather than setting it.",
  },
  'biz-entrepreneur-role-8': {
    level: 3,
    commentary:
      "Five qualities, each tied to a real start-up difficulty, with Dyson's 5,127 prototypes making persistence concrete. It sits at Level 3 because the qualities are listed and never weighed against each other. The plan's Link sentence says their relative importance depends on the industry and the stage of the business — but the answer never makes that point. Writing it in, and naming one quality as the most fundamental with a reason (without risk tolerance the business never starts at all), is the brief assessment that reaches Level 4.",
  },
  'econ-diseconomies-scale-8': {
    level: 3,
    commentary:
      "Three causes — communication, coordination and worker alienation — each developed to the rising average cost it produces, with HSBC's repeated restructuring as application. It is Level 3 because the causes are explained and not assessed. A Level 4 needs a brief assessment: diseconomies are not inevitable at scale, since better information systems and decentralised divisions can postpone them, so how a firm is organised matters as much as how large it is.",
  },
  'econ-competition-policy-8': {
    level: 3,
    commentary:
      "Three instruments — merger control, anti-cartel enforcement and price capping — each with a chain ending in allocative efficiency, and the Microsoft/Activision and truck cartel examples are current and well chosen. It sits at Level 3 because the instruments are described as working and never assessed. A Level 4 needs a brief assessment of their limits: investigations run for years, tacit collusion is very hard to prove, and blocking a merger can forgo real economies of scale that would have reached consumers as lower prices.",
  },
  'econ-j-curve-depreciation-8': {
    level: 4,
    commentary:
      "Three concepts are integrated rather than listed: the competitiveness mechanism, the Marshall-Lerner condition and the J-curve lag, with sterling's fall after the 2016 referendum as application and a J-curve diagram available for the diagram credit. Level 4 is earned because the improvement is never asserted — it is made conditional on the combined elasticities, the inelastic case in which the current account worsens is stated, and the 12–24 month adjustment is given. That is the brief assessment.",
  },
};

/** A JS single-quoted literal for `s`. The two data files are single-quoted throughout. */
function quote(s) {
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

/**
 * Replace one single-line `field: <literal>,` inside the block belonging to `id`.
 * The block runs from this item's `id:` line to the next one, so a field of the NEXT item can
 * never be hit by a search that overruns.
 */
function setField(src, id, field, literal) {
  const idAt = src.indexOf(`id: '${id}',`);
  if (idAt === -1) return null;
  const nextIdAt = src.indexOf("\n    id: '", idAt + 1);
  const end = nextIdAt === -1 ? src.length : nextIdAt;
  const block = src.slice(idAt, end);
  const re = new RegExp(`(\\n\\s*${field}: )(.*?)(,\\n)`);
  const m = block.match(re);
  if (!m) return null;
  if (m[2] === literal) return { src, changed: false };
  const newBlock = block.replace(re, `$1${literal}$3`);
  return { src: src.slice(0, idAt) + newBlock + src.slice(end), changed: true };
}

let touched = 0;
let already = 0;
const missing = [];
const report = [];

for (const file of FILES) {
  let src = fs.readFileSync(file, 'utf8');
  for (const [id, row] of Object.entries(REWRITES)) {
    if (!src.includes(`id: '${id}',`)) continue;
    let changed = false;
    for (const [field, literal] of [
      ['examinerCommentary', quote(row.commentary)],
      ['likelyScore', quote(SCORE[row.level])],
    ]) {
      const res = setField(src, id, field, literal);
      if (!res) {
        missing.push(`${id}.${field}`);
        continue;
      }
      src = res.src;
      changed = changed || res.changed;
    }
    if (changed) touched += 1;
    else already += 1;
    report.push(`  ${changed ? 'set ' : 'ok  '} ${id.padEnd(30)} level ${row.level}  ${SCORE[row.level]}`);
  }
  if (WRITE) fs.writeFileSync(file, src);
}

const seen = report.length;
console.log(report.join('\n'));
console.log(`\n${seen} of ${Object.keys(REWRITES).length} items found; ${touched} rewritten, ${already} already current.`);
const l4 = Object.values(REWRITES).filter((r) => r.level === 4).length;
console.log(`levels: ${l4} at Level 4 (${SCORE[4]}), ${Object.keys(REWRITES).length - l4} at Level 3 (${SCORE[3]}).`);
if (missing.length) {
  console.error(`\nFIELD NOT FOUND: ${missing.join(', ')}`);
  process.exit(1);
}
if (seen !== Object.keys(REWRITES).length) {
  console.error(`\nITEM NOT FOUND: expected ${Object.keys(REWRITES).length}, matched ${seen}`);
  process.exit(1);
}
console.log(WRITE ? '\nWritten.' : '\nDry run. Re-run with --write.');
