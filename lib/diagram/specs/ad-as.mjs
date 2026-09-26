/**
 * A fall in aggregate demand on the AD/AS diagram. Edexcel IAL Economics, WEC12 (Unit 2), spec
 * 2.3.4. Three marks: the shift, its direction, and the new equilibrium. No area — an AD/AS
 * diagram has no welfare region to shade.
 *
 * WHY 2.3.4, so nobody moves it. 2.3.4 topic 3, "Equilibrium level of real output", asks for "the
 * concept of equilibrium level of real national output" and the "causes of changes in equilibrium
 * real national output, as a result of shifts in AD and/or AS curves" (econ_spec.txt:1074-1077).
 * That is this drill: shift AD, read the new equilibrium. 2.3.2 Aggregate demand is the tempting
 * alternative — it holds the AD curve, the shift-versus-movement distinction (:985-987) and
 * consumer confidence as an influence on consumption (:991) — but it has no equilibrium, and the
 * mark this drill turns on is the equilibrium. 2.3.3 is aggregate SUPPLY. Learn Mode teaches the
 * diagram in 2.3.4's chapter "Equilibrium Real National Output" (live, 26 Sep), which is where
 * `placeWith` sends it.
 *
 * WHY A FALL IN CONSUMER CONFIDENCE. The chapter's worked example is a RISE in government
 * expenditure shifting AD right, so a drill on the same shock would test the example, not the
 * mechanism. A fall in confidence is a named influence on consumption (:991), the chapter's own
 * list says a rise in savings shifts AD left, and it makes the student choose the direction
 * rather than drawing the rightward shift every textbook opens with.
 *
 * WHY THE PROMPT GIVES A NUMBER. The marker's direction note says "the gap should read 20" when a
 * shift is far from `expect.size`. A prompt with no size would make that note name a number the
 * student was never given, so the prompt states the whole fall in AD — "in total", because the
 * same section teaches that the multiplier makes AD shift by more than the first cut in spending
 * (chapter "The Multiplier, AD and Economic Activity"); the $20bn is the final shift, not the
 * initial one. Slopes of -1 and +1 make the gap read 20 whether it is measured across or down.
 *
 * WHAT IS DRILLED. Three decisions students get wrong: shifting SRAS for a change in spending;
 * shifting AD right out of habit; and reading the new output straight off the horizontal shift
 * (Y = 30 at the old price level), as if the price level had not moved. The economy slides down
 * SRAS, so real output falls by $10bn, half the shift, and the price level falls with it. That is
 * the misconception the chapter names, and the reason the point mark is the one worth having.
 */
const spec = {
  id: 'ad-as',
  subject: 'economics',
  unit: 'WEC12',
  specCode: '2.3.4',
  specTerm: 'equilibrium level of real national output',
  title: 'AD/AS: a fall in consumer confidence',
  topic: 'National Income',
  // The title shares no word with the teaching chapter ("AD" and "AS" are too short to count as
  // words), so without this the drill goes to the LAST free check-in: "The Multiplier", two
  // chapters late (the last one holds the multiplier calculation). With it, chapter 4 of 6, whose
  // diagram has the same title. Checked against the live national-income section, 26 Sep.
  placeWith: ['Equilibrium real national output'],
  prompt:
    'Consumer confidence falls sharply. Households cut their spending and save more, and in total planned spending on the country’s output falls by **$20bn at every price level**. Show the change on the diagram and mark the new equilibrium level of real national output.',

  axes: {
    x: { label: 'Real national output ($bn)', short: 'real national output', max: 120 },
    y: { label: 'Price level', short: 'price level', max: 160 },
  },
  curves: {
    AD: { intercept: 150, slope: -1, label: 'AD', name: 'Aggregate demand curve', role: 'demand' },
    SRAS: { intercept: 50, slope: 1, label: 'SRAS', name: 'Short-run aggregate supply curve', role: 'supply' },
  },
  point: { cross: ['AD', 'SRAS'] },
  expect: { curve: 'AD', direction: 'down', size: 20 },
  tolerance: { q: 4, p: 6 },
  glyphs: { p: 'PL', q: 'Y' },

  steps: {
    shift: {
      name: 'Shift a curve',
      prompt: 'Drag the curve this change moves. On a phone, tap it, use the arrows below, then Next.',
    },
    point: {
      name: 'Mark the new equilibrium',
      prompt: 'Tap where the economy now settles: the new price level and real output. It snaps if you are close enough.',
    },
  },
  criteria: { M2: 'Shifted to the left' },

  // The original equilibrium: marking where the economy started, not where it settles.
  distractors: [
    {
      cross: ['AD', 'SRAS'], from: 'base',
      feedback:
        'That is the original equilibrium, where AD₁ met SRAS. With $20bn less spent at every price level the economy does not stay there: it settles where AD₂ crosses SRAS, at a lower price level and a lower real output.',
    },
  ],

  feedback: {
    rightCurve:
      'AD it is. Confidence changes how much households plan to spend, and consumption is a component of AD. Nothing has changed firms’ costs of production, so SRAS stays where it is.',
    wrongCurve:
      'You moved SRAS. SRAS shifts when the costs of production change — the costs of raw materials and energy, exchange rates, tax rates. A fall in consumer confidence changes planned spending, not costs, so it is AD that shifts.',
    bothMoved: 'Both curves moved. Only spending has changed here, so only AD shifts; SRAS stays where it is.',
    nothingMoved: 'Nothing moved. Decide which curve a fall in planned spending shifts, and move it.',
    wrongDirection:
      'You shifted AD to the right. Households are spending less at every price level, not more, so AD shifts LEFT: down and to the left, towards the origin.',
    rightDirection: 'Left: $20bn less is spent at every price level, so AD shifts left by $20bn.',
    noPoint: 'No point marked. Mark the new equilibrium, where AD₂ crosses SRAS.',
    equilibriumAtOldQuantity:
      'That is at the original real output, Y₁. With less spent at every price level, firms sell less and cut production, so real output falls: the new equilibrium is to the left, where AD₂ crosses SRAS.',
    equilibriumWrong:
      'Not where AD₂ crosses SRAS. The new equilibrium is on both curves at once: the economy slides down SRAS, so the price level falls too, and real output falls by less than the $20bn shift in AD.',
  },
};

export default spec;
