/**
 * A floating currency: a rise in relative interest rates. Edexcel IAL Economics, WEC14 (Unit 4),
 * spec 4.3.3. "Draw" carries 4 marks in Economics; this drill marks three (no area — see below).
 *
 * WHY 4.3.3, so nobody moves it. The specification lists what moves a floating rate in one place:
 * 4.3.3 Balance of payments, exchange rates and international competitiveness (econ_spec.txt:1708),
 * topic 2 "Exchange rates", leaf 2c "Factors influencing floating exchange rates", whose first bullet
 * is "relative interest rates" (:1726-1727). 2b (:1722-1725) also names "the use of interest rates",
 * but as GOVERNMENT INTERVENTION to hold a rate — a different question (defending a fixed or managed
 * rate), taught in a different chapter. 2.3.6 has interest rates as a monetary-policy tool and no
 * currency market. `checkSpecCitation` refuses every section but 4.3.3 with this specTerm.
 *
 * WHAT THE DIAGRAM ASSUMES. A freely floating currency: nobody intervenes, so the rate is where the
 * demand for and supply of euros cross. The euro is chosen because it floats (the exchange-rate
 * calculation in lib/quant/templates/exchange-rate.mjs uses it for the same reason, and IAL is sat in
 * Cyprus). The price of the euro is on the vertical axis, in US cents, and the quantity of euros on
 * the horizontal — the axes the section's own checklist asks for. The labels follow that checklist
 * too: "D to D₁", so the new equilibrium is ER₁ and Q₁.
 *
 * ONE CURVE, ON PURPOSE. Higher relative interest rates draw short-term capital IN: foreign savers
 * must buy euros before they can hold euro deposits or bonds, so DEMAND for the euro rises. That is
 * the effect the section teaches ("What Moves a Floating Rate", relative interest rates) and the
 * effect this drill marks. There is a second, smaller effect — euro-area savers may send less money
 * abroad, so SUPPLY of euros falls — which a mark scheme may also credit. The M1 feedback says so
 * rather than calling it wrong economics; whether IAL awards a supply shift here is flagged for the
 * founder in audit/runs/packet-13.8/specs.md. The prompt states the inflow (€20bn a day) so the
 * drill's "the gap should read 20" hint has a number to refer to; with D sloping at −1, 20bn to the
 * right is 20 cents up.
 *
 * WHY NO AREA. Welfare areas mean nothing in a currency market, and no family applies. `point` is
 * stated (D ∩ S) as the schema asks for a drill without a family.
 *
 * The numbers are illustrative: $1.10 to $1.20 per euro, a large move for one rate decision.
 */
const spec = {
  id: 'exchange-rate',
  subject: 'economics',
  unit: 'WEC14',
  specCode: '4.3.3',
  specTerm: 'relative interest rates',
  title: 'A floating currency: interest rates rise',
  topic: 'Balance of payments and exchange rates',
  // Learn Mode teaches the currency market in "What Moves a Floating Rate" (diagram "The Market for a
  // Floating Currency"); the next chapter, "Exchange Rate Systems and Intervention", shares "floating"
  // and "rate" with any title about floating exchange rates and would otherwise win the tie. These
  // words pin the drill to the chapter that teaches relative interest rates (live payload, 26 Sep).
  placeWith: ['What moves a floating rate', 'The market for a floating currency'],
  prompt:
    'The euro floats freely. The European Central Bank raises its interest rate while rates in the rest of the world stay where they are, and the wider gap draws an extra **€20bn a day** of short-term savings into the euro area. Show the effect on the market for euros and mark the new exchange rate.',

  axes: {
    x: { label: 'Quantity of euros (bn per day)', short: 'quantity of euros', max: 120 },
    y: { label: 'Exchange rate (US cents per euro)', short: 'exchange rate', max: 160 },
  },
  curves: {
    D: { intercept: 150, slope: -1, name: 'Demand for euros', shiftedLabel: 'D₁', ghostLabel: 'D' },
    S: { intercept: 70, slope: 1, name: 'Supply of euros', shiftedLabel: 'S₁', ghostLabel: 'S' },
  },
  point: { cross: ['D', 'S'] },
  expect: { curve: 'D', direction: 'up', size: 20 },
  tolerance: { q: 4, p: 6 },
  glyphs: { p1: 'ER', q1: 'Q', p2: 'ER₁', q2: 'Q₁' },

  steps: {
    shift: {
      name: 'Show the interest rate rise',
      prompt: 'Move the curve the higher interest rate changes. On a phone, tap it, use the arrows below, then Next.',
    },
    point: {
      name: 'Mark the new exchange rate',
      prompt: 'Tap the new equilibrium in the market for euros. It snaps if you are close enough.',
    },
  },
  criteria: {
    M1: 'Correct curve shifted',
    M2: 'Demand for the euro increased',
    M3: 'New exchange rate identified',
  },

  feedback: {
    rightCurve:
      'Demand for the euro. Foreign savers must buy euros before they can hold euro-area deposits or bonds, so the higher return shows up as more euros demanded at every exchange rate.',
    wrongCurve:
      'You moved the supply of euros. Supply comes from euro-area residents selling euros to buy foreign currency. The main effect of a higher interest rate runs the other way: it draws foreign savings IN, and those savers must BUY euros first — that is demand. (Euro-area savers may also send a little less abroad, which reduces supply, but the effect to draw first is the rise in demand.)',
    bothMoved:
      'Both curves moved. Draw the main effect on its own: the higher return draws foreign savings in, and that is a shift in the demand for euros.',
    nothingMoved: 'Nothing moved. The higher interest rate changes how many euros someone wants to buy; shift that curve.',
    wrongDirection:
      'You shifted demand to the left. A higher return in the euro area makes euro assets MORE attractive, so foreign savers buy more euros at every exchange rate: demand shifts right, by the €20bn a day, and the euro appreciates.',
    rightDirection: 'To the right: more euros demanded at every exchange rate.',
    noPoint: 'No point marked. Mark the new equilibrium in the market for euros.',
    equilibriumAtOldQuantity:
      'That is the original equilibrium quantity. With more euros demanded, the market clears at a higher price of the euro and with more euros traded.',
    equilibriumWrong:
      'Not where the new demand curve meets supply. The new exchange rate is where D₁ crosses S: a higher price of the euro, which is an appreciation.',
  },
};

export default spec;
