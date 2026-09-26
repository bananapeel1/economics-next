"use client";
import { useRef, useState } from 'react';
import CalculationItem from '@/components/quant/CalculationItem';
import { quantPracticeItem, quantRecalled } from '@/lib/quant-practice';

/** "in 3 days" / "tomorrow" / "in 6 hours". Same wording as QuestionCard's line under a result. */
function whenDue(nextReview) {
  if (!nextReview) return '';
  const hours = Math.round((nextReview - Date.now()) / 3600000);
  if (hours < 1) return 'in a few minutes';
  if (hours < 20) return `in ${hours} hour${hours === 1 ? '' : 's'}`;
  const days = Math.round(hours / 24);
  return days <= 1 ? 'tomorrow' : `in ${days} days`;
}

/**
 * One calculation in a spaced-repetition session (packet 13.3; the calculations session in 13.4
 * renders the same card).
 *
 * The item is built ONCE, when the card mounts, from the schedule as it stood then. Answering
 * saves a new schedule, and the seed is derived from the schedule (lib/quant-practice.js), so a
 * card that rebuilt on every render would swap its own figures out from under the student the
 * moment they pressed Mark. The next review, or the in-session retry of a wrong one, mounts a
 * new card and gets new figures — which is the point of the item type.
 *
 * Only the first marking reaches the scheduler, as in Learn Mode: a student may correct a figure
 * and mark again to see the working agree, but the schedule records what they could do unaided.
 * Full marks is "recalled"; confidence is not asked, because the working already says how sure
 * the student could be.
 */
export default function QuantPracticeCard({
  sectionId, templateId, progress, sectionTitle, questionNumber, totalQuestions,
  willReturn = true, onAnswer, onNext, onSkip, surface = 'practice',
}) {
  const [item] = useState(() => quantPracticeItem(sectionId, templateId, progress));
  const [first, setFirst] = useState(null);
  const [nextReview, setNextReview] = useState(null);
  const reported = useRef(false);

  async function onResult(result) {
    if (reported.current) return;
    reported.current = true;
    setFirst(result);
    const updated = await onAnswer?.({ correct: quantRecalled(result), confidence: null });
    if (updated?.nextReview) setNextReview(updated.nextReview);
  }

  if (!item) {
    // A template removed from the registry while a schedule still names it. Say so and move on,
    // rather than render an empty card the student cannot get past.
    return (
      <div className="spe-qcard spe-quant-card">
        <p className="spe-qcard-question">This calculation is no longer available.</p>
        <div className="spe-qcard-actions">
          <button className="spe-qcard-next" onClick={onSkip}>Next question &rarr;</button>
        </div>
      </div>
    );
  }

  const recalled = quantRecalled(first);
  const due = whenDue(nextReview);

  return (
    <div className="spe-qcard spe-quant-card">
      <div className="spe-qcard-top">
        <span className="spe-qcard-badge">{sectionTitle}</span>
        <span className="spe-qcard-counter">{questionNumber} / {totalQuestions}</span>
      </div>

      <CalculationItem key={item.id} item={item} onResult={onResult} track={{ surface, sectionId }} />

      {first && (
        <div className={`spe-qcard-result ${recalled ? 'spe-qcard-result--correct' : 'spe-qcard-result--incorrect'}`} role="status">
          <div className="spe-qcard-result-header">
            {recalled ? `✓ ${first.awarded} of ${first.total}` : `✗ ${first.awarded} of ${first.total} on your first marking`}
          </div>
          <p className="spe-qcard-result-next">
            {recalled
              ? (due ? `It comes back ${due}, with different figures.` : 'It moves further back in your schedule, and comes back with different figures.')
              : willReturn
                ? 'You will get this calculation again before the session ends, with new figures, so the method is what carries over.'
                : 'It comes back soon with new figures. The method is the thing to take away.'}
          </p>
        </div>
      )}

      <div className="spe-qcard-actions">
        {first
          ? <button className="spe-qcard-next" onClick={onNext}>Next question &rarr;</button>
          : <button className="spe-qcard-skip" onClick={onSkip}>Skip</button>}
      </div>
    </div>
  );
}
