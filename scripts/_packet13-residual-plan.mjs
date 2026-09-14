/**
 * PACKET 13 — the residual pass.
 *
 * The first strip left mentions standing. Three causes, all worth recording because each is a class
 * rather than an instance:
 *
 *   1. The vocabulary rules matched "Merit Goods" and "merit goods" but not "Merit goods", which is
 *      the common form in prose. Eleven mentions survived in three sections. The sentence-case rules
 *      now live in SPEC_VOCAB in _packet13-plan.mjs, so the miss cannot recur.
 *   2. Three sections the first plan never listed carried the terms: the accelerator survives as a
 *      cross-reference in economic-growth and aggregate-supply, and "core competencies" is used as
 *      ordinary description in types-sizes-businesses. A term census over all 43 sections, not a
 *      list of sections, is what finds these; audit/scripts/packet-13-census.mjs is now that census.
 *   3. assessing-competitiveness still ASSESSED Porter's five forces after the teaching was removed,
 *      in two practice questions and an evaluation card. Removing a block without removing what
 *      tests it produces exactly the assessed-but-never-taught defect this programme is clearing.
 *
 * Kept as a separate plan rather than folded into the first one so that each plan stays strict: an
 * op whose target is missing throws, which is what catches a typo, and re-running a published plan
 * would trip that everywhere.
 */
import { SPEC_VOCAB, WELFARE_LOSS, DIRECT_INSTRUCTION, DE_UK } from './_packet13-plan.mjs';

const VOCAB_AND_CLAIMS = [...DE_UK, ...SPEC_VOCAB, ...WELFARE_LOSS, ...DIRECT_INSTRUCTION];

export const PLAN = {
  // The eleven sentence-case mentions the first pass missed.
  'market-failure': [{ op: 'substitute', rules: VOCAB_AND_CLAIMS, why: 'sentence-case mentions the first pass missed' }],
  'government-intervention': [{ op: 'substitute', rules: VOCAB_AND_CLAIMS, why: 'sentence-case mentions the first pass missed' }],
  'role-state-macroeconomy': [{ op: 'substitute', rules: VOCAB_AND_CLAIMS, why: 'sentence-case mentions the first pass missed' }],

  'economic-growth': [
      { op: 'substitute', why: 'the accelerator is not in the IAL Economics specification', rules: [
        [/, linking to the multiplier and accelerator effects covered in 2\.3\.4\./g, ', linking to the multiplier covered in 2.3.4.'],
        [/because firms amplify demand changes through the accelerator effect\./g, 'because firms bring forward or postpone capital spending as their expectations of demand change.'],
        [/The <strong>accelerator effect<\/strong> means that a change in the rate of growth of output causes a proportionally larger change in investment, amplifying the boom and deepening the recession\./g,
          'Business confidence swings more widely than output itself, so investment rises faster than GDP in a boom and falls faster in a downturn.'],
        [/Investment volatility, driven by the accelerator, is the main cyclical amplifier\./g, 'Investment volatility is the main cyclical amplifier.'],
      ] },
    ],
    'aggregate-supply': [
      { op: 'substitute', rules: [[/ \(accelerator effect\)/g, '']], why: 'the accelerator is not in the IAL Economics specification' },
    ],

    /* business 3.3.1 — "core competencies" used as ordinary description, but it is the off-spec term. */
    'types-sizes-businesses': [
      // "Outline" is not an IAL Economics command word; Explain carries 4 marks. Pre-existing, and
      // inherited here because the substitution below rewrites this item's guidance.
      { op: 'patchPractice', id: 'types-sizes-businesses:practice:713cf058', patch: {
        question: 'Explain two possible reasons why a firm might choose to demerge. (4 marks)',
        command: 'Explain',
        marks: 4,
      } },
      { op: 'substitute', why: 'core competencies appear 0 times in the IAL Business specification', rules: [
        [/focus on their core competencies/g, 'focus on their main activities'],
        [/Separate firms focus on core competencies/g, 'Separate firms focus on their main activities'],
        [/focus on its <strong>core competence<\/strong>/g, 'focus on its <strong>main activity</strong>'],
        [/core competencies/g, 'main activities'],
        [/core competence/g, 'main activity'],
      ] },
    ],


  /* business 3.3.5 — assessment that outlived its teaching. */
  'assessing-competitiveness': [
    // Three items assessed Porter's five forces, which is 3.3.1.4c and 4.3.2.2b, not 3.3.5, and
    // which this section no longer teaches. Re-asked on what 3.3.5 does contain. Business "Assess"
    // is 12 marks in Units 3-4, not 10, and "Outline" is not an IAL Business command word at all.
    { op: 'patchPractice', id: 'assessing-competitiveness:practice:0b1f6e16', patch: {
      question: 'A regional bakery reports a gross profit margin of 42% (industry average 38%) and a profit-for-the-year margin of 3% (industry average 9%). Its current ratio has fallen from 1.8 to 0.9 in two years. Assess what these figures tell the directors about the business. (12 marks)',
      command: 'Assess',
      marks: 12,
      guidance: 'Work from the numbers. A gross margin above the industry average says production and pricing are sound, so the problem lies below gross profit: operating expenses are consuming almost all of it, which points at overheads, marketing or distribution rather than at the product. The current ratio halving to 0.9 says current liabilities now exceed current assets, so the firm may not meet debts falling due. Judgement: profitability and liquidity are telling different stories, and the liquidity trend is the more urgent because a firm can trade profitably and still fail. Evaluate the limits of the comparison — one industry average, two years, no cash flow statement, and no sight of whether the fall in the ratio is a deliberate investment or a loss of control.',
    } },
    { op: 'patchPractice', id: 'assessing-competitiveness:practice:48b12cde', patch: {
      question: 'A business has revenue of $800,000, cost of sales of $460,000 and operating expenses of $260,000. Calculate its gross profit margin and its profit-for-the-year margin. (4 marks)',
      command: 'Calculate',
      marks: 4,
      guidance: 'Gross profit is revenue less cost of sales: 800,000 less 460,000 is 340,000. Gross profit margin is 340,000 divided by 800,000, times 100, which is 42.5% (2 marks). Profit for the year is gross profit less operating expenses: 340,000 less 260,000 is 80,000. The margin is 80,000 divided by 800,000, times 100, which is 10% (2 marks). Award the method marks even where the arithmetic slips.',
    } },
    { op: 'deleteExtra', key: 'evaluation', match: /Five Forces/i,
      why: "Porter's five forces is 3.3.1.4c and 4.3.2.2b, and this section no longer teaches it" },
  ],
};
