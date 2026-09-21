/**
 * One exemplar of each recall type, packet 7. These are the authoring templates: what a content
 * packet copies when it writes a recall, and what the widget gallery (/admin/widgets, /dev/widgets)
 * renders so the founder and the verifier can see every type working without live content.
 *
 * The match and classify exemplars are two of the March audit's "not orderable" reorders, converted:
 * planning-raising-finance asked students to ORDER "Match the finance source to the most appropriate
 * use", and financial-planning to order costs "from most fixed to most variable". Neither has an
 * order. Each has one right answer per row, which is what these two types grade.
 */

export const RECALL_FIXTURES = {
  reorder: {
    id: 'fixture:reorder', type: 'reorder',
    prompt: 'When demand for a good rises, put these in order from cause to effect:',
    correctOrder: [
      'Demand for the good rises',
      'At the old price there is a shortage',
      'The price rises',
      'Firms supply more and some buyers drop out',
    ],
    why: [
      'The rise in demand is the trigger; everything else follows from it',
      'At the old price buyers now want more than sellers offer: excess demand',
      'Excess demand bids the price up',
      'The higher price signals and incentivises extra supply and rations demand until the shortage clears',
    ],
  },
  fillin: {
    id: 'fixture:fillin', type: 'fillin',
    prompt: 'Complete the total revenue rule:',
    template: [
      'If demand is price ___, a price rise raises total revenue',
      '→ If demand is price ___, a price rise lowers total revenue',
      '→ Where demand is ___, total revenue is at its maximum',
    ],
    answers: ['inelastic', 'elastic', 'unit elastic'],
    hints: [
      'quantity responds less than proportionately to price',
      'quantity responds more than proportionately to price',
      'the price elasticity of demand is exactly one',
    ],
    distractors: ['normal', 'inferior'],
  },
  match: {
    id: 'fixture:match', type: 'match',
    prompt: 'Match each source of finance to the use it suits best:',
    pairs: [
      { left: 'Overdraft', right: 'Covering a short-term cash shortfall', why: 'Flexible and short-term, so it suits a temporary gap, not an asset that lasts years' },
      { left: 'Bank loan', right: 'Buying a delivery van', why: 'A fixed sum repaid over years matches an asset that earns over years' },
      { left: 'Share capital', right: 'Funding expansion without repayment', why: 'Equity is permanent capital: nothing to repay, but ownership is diluted' },
      { left: 'Trade credit', right: 'Paying a supplier 30 days after delivery', why: 'The supplier finances the stock for the length of the credit period' },
    ],
    distractors: ['Paying a dividend to shareholders'],
  },
  classify: {
    id: 'fixture:classify', type: 'classify',
    prompt: 'Sort these costs into fixed and variable:',
    groups: [
      { name: 'Fixed costs', items: ['Factory rent', 'Insurance premium', "A salaried manager's pay"], why: 'They do not change with output in the short run' },
      { name: 'Variable costs', items: ['Raw materials', 'Piece-rate wages', 'Packaging'], why: 'They rise and fall with each unit produced' },
    ],
  },
};

/** A demand-and-supply diagram whose four labels carry `class="draggable"`, the class the label drill needs. */
export const LABEL_DRILL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <line x1="60" y1="20" x2="60" y2="260" stroke="#94a3b8" stroke-width="2"/>
  <line x1="60" y1="260" x2="380" y2="260" stroke="#94a3b8" stroke-width="2"/>
  <text x="18" y="24" fill="#94a3b8" font-size="12">Price</text>
  <text x="330" y="284" fill="#94a3b8" font-size="12">Quantity</text>
  <line x1="80" y1="60" x2="340" y2="230" stroke="#3b82f6" stroke-width="2.5"/>
  <line x1="80" y1="230" x2="340" y2="60" stroke="#059669" stroke-width="2.5"/>
  <line x1="60" y1="145" x2="210" y2="145" stroke="#475569" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="210" y1="145" x2="210" y2="260" stroke="#475569" stroke-width="1" stroke-dasharray="4 3"/>
  <circle cx="210" cy="145" r="5" fill="#f59e0b"/>
  <text class="draggable" x="345" y="236" fill="#3b82f6" font-size="14" font-weight="600">Demand</text>
  <text class="draggable" x="345" y="60" fill="#059669" font-size="14" font-weight="600">Supply</text>
  <text class="draggable" x="6" y="140" fill="#e8ecf5" font-size="12" font-weight="600">Equilibrium price</text>
  <text class="draggable" x="150" y="280" fill="#e8ecf5" font-size="12" font-weight="600">Equilibrium quantity</text>
</svg>`;
