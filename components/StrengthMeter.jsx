"use client";
import { useState, useEffect } from 'react';
import { getStrengthData, calcEffectiveStrength, getStrengthColor, nextReviewAt } from '@/lib/strength';

/**
 * Visual strength bar — shows retrieval strength for a section.
 * Props: subjectId, sectionId, size ('small' | 'medium')
 */
/** "review today" / "review in 3 days" / "review Thursday", from a timestamp. */
function formatDue(ts) {
  if (!ts) return '';
  const ms = ts - Date.now();
  const days = Math.round(ms / 86400000);
  if (days <= 0) return 'review now';
  if (days === 1) return 'review tomorrow';
  if (days <= 6) return `review in ${days} days`;
  const weeks = Math.round(days / 7);
  return `review in ${weeks} week${weeks === 1 ? '' : 's'}`;
}

export default function StrengthMeter({ subjectId, sectionId, size = 'small' }) {
  const [effective, setEffective] = useState(0);
  const [color, setColor] = useState('red');
  const [dueLabel, setDueLabel] = useState('');

  useEffect(() => {
    const data = getStrengthData(subjectId, sectionId);
    if (data) {
      const eff = calcEffectiveStrength(data);
      setEffective(eff);
      setColor(getStrengthColor(eff));
      setDueLabel(formatDue(nextReviewAt(data)));
    }
  }, [subjectId, sectionId]);

  // Don't render if no data exists
  if (effective === 0 && !getStrengthData(subjectId, sectionId)) return null;

  const isSmall = size === 'small';

  return (
    <div className={`lm-strength-meter ${isSmall ? 'lm-strength-small' : 'lm-strength-medium'}`}>
      <div className="lm-strength-track">
        <div
          className={`lm-strength-fill lm-strength-${color}`}
          style={{ width: `${effective}%` }}
        />
      </div>
      {!isSmall && (
        <span className={`lm-strength-label lm-strength-label-${color}`}>
          {/* F004: a bare percentage only ever falls, so it reads as a punishment for finishing.
              A date is something the student can act on. */}
          {effective}% strength{dueLabel ? ` \u00b7 ${dueLabel}` : ''}
        </span>
      )}
    </div>
  );
}
