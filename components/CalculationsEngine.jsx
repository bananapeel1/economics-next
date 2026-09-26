'use client';

import { useMemo } from 'react';
import PracticeEngine from '@/components/PracticeEngine';
import { quantCount } from '@/lib/quant-practice';

/**
 * The calculations session (packet 13.4), beside FlashcardsEngine and WrittenPracticeEngine.
 *
 * It is Smart Practice's engine in calculations mode rather than a fourth copy of the setup,
 * queue and summary code: the three existing engines already drifted apart once (F084's session
 * length reached one of them), and a calculation is scheduled by exactly the same SM-2 step. What
 * is specific to it lives in `lib/quant-practice.js` and `components/practice/QuantPracticeCard`.
 *
 * Only topics that have a calculation are offered. A topic gains one the day a template claims
 * its spec number, so this list grows with the template library and nothing is stored.
 */
export default function CalculationsEngine({ subjects, units, sections, isLoggedIn }) {
  const withCalculations = useMemo(() => sections.filter((s) => {
    const unit = units.find((u) => u.id === s.unit_id);
    return unit && quantCount({ id: s.id, subject: unit.subjects?.slug, unitCode: unit.code, number: s.number }) > 0;
  }), [sections, units]);

  // Units and subjects with nothing to practise are left out too, or the subject card counts
  // "4 units" and opens onto two, and a subject with no calculations opens onto an empty list.
  const unitsWithCalculations = useMemo(
    () => units.filter((u) => withCalculations.some((s) => s.unit_id === u.id)),
    [units, withCalculations],
  );
  const subjectsWithCalculations = useMemo(
    () => subjects.filter((sub) => unitsWithCalculations.some((u) => u.subject_id === sub.id)),
    [subjects, unitsWithCalculations],
  );

  return (
    <PracticeEngine
      subjects={subjectsWithCalculations}
      units={unitsWithCalculations}
      sections={withCalculations}
      isLoggedIn={isLoggedIn}
      mode="calculations"
    />
  );
}
