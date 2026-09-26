"use client";
import { useEffect, useState } from 'react';
import { FUN_UNITS, DEFAULT_UNITS } from '@/lib/fun-pool';

const SUBJECTS = [
  { slug: 'economics', name: 'Economics', icon: '\u{1F4C8}' },
  { slug: 'business', name: 'Business', icon: '\u{1F4BC}' },
];

/* The last subject and units a student dealt with, per device. A convenience only: if storage is
   blocked the picker starts from the defaults and still plays. */
const STORAGE_KEY = 'revvy-blackjack-choice';

function readStoredChoice() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function writeStoredChoice(choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
  } catch {}
}

const validUnits = (list) => (Array.isArray(list) ? FUN_UNITS.filter((n) => list.includes(n)) : []);

export default function SubjectSelect({ onSelect, unitTitles = {}, initialSubject = null, initialUnits = null }) {
  const [subject, setSubject] = useState(initialSubject);
  const [unitsBySubject, setUnitsBySubject] = useState(() => {
    const units = validUnits(initialUnits);
    return initialSubject && units.length ? { [initialSubject]: units } : {};
  });

  /* Storage is read after mount, never during render, or the server HTML and the first client render
     disagree. Units handed in (a Quiz-tab link, or the game just played) win over what was stored,
     for that subject only. */
  useEffect(() => {
    const stored = readStoredChoice();
    if (!stored) return;
    const storedUnits = stored.units && typeof stored.units === 'object' ? stored.units : {};
    setUnitsBySubject((current) => {
      const next = { ...current };
      for (const { slug } of SUBJECTS) {
        const units = validUnits(storedUnits[slug]);
        if (!next[slug] && units.length) next[slug] = units;
      }
      return next;
    });
    if (!initialSubject && SUBJECTS.some((s) => s.slug === stored.subject)) setSubject(stored.subject);
  }, [initialSubject]);

  const units = subject ? (unitsBySubject[subject] ?? DEFAULT_UNITS) : [];

  function toggleUnit(n) {
    const next = units.includes(n) ? units.filter((u) => u !== n) : validUnits([...units, n]);
    setUnitsBySubject((current) => ({ ...current, [subject]: next }));
  }

  function deal() {
    if (!subject || units.length === 0) return;
    const stored = readStoredChoice();
    writeStoredChoice({
      subject,
      units: { ...(stored?.units && typeof stored.units === 'object' ? stored.units : {}), [subject]: units },
    });
    onSelect(subject, units);
  }

  const titles = (subject && unitTitles[subject]) || {};

  return (
    <div className="fun-subject-select">
      <h2 className="fun-subject-heading">Choose Your Subject</h2>
      <p className="fun-subject-subtext">Beat the dealer, answer questions, level up.</p>
      <div className="fun-subject-cards" role="radiogroup" aria-label="Subject">
        {SUBJECTS.map((s) => (
          <button
            key={s.slug}
            type="button"
            role="radio"
            aria-checked={subject === s.slug}
            className={`fun-subject-card${subject === s.slug ? ' is-selected' : ''}`}
            onClick={() => setSubject(s.slug)}
          >
            <span className="fun-subject-icon" aria-hidden="true">{s.icon}</span>
            <span className="fun-subject-name">{s.name}</span>
            <span className="fun-subject-desc">Units 1–4</span>
          </button>
        ))}
      </div>

      {subject && (
        <fieldset className="fun-units">
          <legend className="fun-units-legend">Which units do you want questions on?</legend>
          <div className="fun-units-grid">
            {FUN_UNITS.map((n) => {
              const on = units.includes(n);
              return (
                <button
                  key={n}
                  type="button"
                  aria-pressed={on}
                  className={`fun-unit-chip${on ? ' is-on' : ''}`}
                  onClick={() => toggleUnit(n)}
                >
                  <span className="fun-unit-number">
                    <span className="fun-unit-check" aria-hidden="true">{on ? '\u2713' : ''}</span>
                    Unit {n}
                  </span>
                  {titles[n] && <span className="fun-unit-title">{titles[n]}</span>}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <button
        type="button"
        className="fun-btn fun-btn-hit fun-deal-btn"
        disabled={!subject || units.length === 0}
        onClick={deal}
      >
        {!subject ? 'Pick a subject' : units.length === 0 ? 'Pick at least one unit' : 'Deal me in'}
      </button>
    </div>
  );
}
