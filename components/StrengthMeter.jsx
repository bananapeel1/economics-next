"use client";
import { useState, useEffect } from 'react';
import { getStrengthData, calcEffectiveStrength, getStrengthColor } from '@/lib/strength';

/**
 * Visual strength bar — shows retrieval strength for a section.
 * Props: subjectId, sectionId, size ('small' | 'medium')
 */
export default function StrengthMeter({ subjectId, sectionId, size = 'small' }) {
  const [effective, setEffective] = useState(0);
  const [color, setColor] = useState('red');

  useEffect(() => {
    const data = getStrengthData(subjectId, sectionId);
    if (data) {
      const eff = calcEffectiveStrength(data);
      setEffective(eff);
      setColor(getStrengthColor(eff));
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
          {effective}% strength
        </span>
      )}
    </div>
  );
}
