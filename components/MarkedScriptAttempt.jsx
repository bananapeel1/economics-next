'use client';

/**
 * The attempt loop: write, then mark yourself against the criteria that add up to the tariff.
 *
 * Packet 12.6, E036. Rendered for one question, and ONLY when that question carries `criteria` —
 * the retrofitted shape is its own flag, so on 22 September this mounts on the three Economics
 * 1.3.5 Market Failure questions and on nothing else in the bank. The other sixty-three items go
 * down the untouched path in `SectionModelAnswersPage.jsx` and render exactly as they did.
 *
 * WHAT IT DELIBERATELY DOES NOT HAVE, and it is the point: there is no "score" button. The total
 * moves as the student ticks, because a button turns self-marking into a verdict handed down at the
 * end, and the thing worth learning is which criterion their paragraph missed, not the number. For
 * the same reason a tick MARKS ITS SEGMENT of the script rather than just counting: the answer to
 * "why didn't I get that mark" is a place in a script, not a figure.
 *
 * WHERE THE STATE LIVES. `localStorage`, keyed by question id, and nowhere else. Server-side
 * persistence is explicitly out of packet 12.6's scope, so this does not pretend to have it: the
 * draft is the student's, on this browser, and the component says so in as many words rather than
 * implying a sync that is not there. Every read and write is wrapped — a private window, blocked
 * site data, or a prerender all return nothing and the component renders empty and usable.
 *
 * HYDRATION. Nothing is read from storage during render. The first paint is the empty state on the
 * server and on the client alike; the effect below fills it in. Reading storage in a `useState`
 * initialiser would produce server HTML that disagrees with the first client render, which React
 * resolves by throwing the client's version away — the draft would flash and vanish.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_PREFIX = 'rl:attempt:v1:';

function storageKey(questionId) {
  return `${STORAGE_PREFIX}${questionId}`;
}

function readSaved(questionId) {
  try {
    const raw = window.localStorage.getItem(storageKey(questionId));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      draft: typeof parsed.draft === 'string' ? parsed.draft : '',
      ticked: Array.isArray(parsed.ticked) ? parsed.ticked.filter((t) => typeof t === 'string') : [],
    };
  } catch {
    return null; // private window, blocked storage, or somebody else's key shape. Start empty.
  }
}

function writeSaved(questionId, value) {
  try {
    window.localStorage.setItem(storageKey(questionId), JSON.stringify(value));
  } catch {
    /* Quota, private mode, disabled storage. The attempt still works for this visit. */
  }
}

export default function MarkedScriptAttempt({ item }) {
  const criteria = item.criteria || [];
  const script = item.script || [];

  const [draft, setDraft] = useState('');
  const [ticked, setTicked] = useState(() => new Set());
  const [loaded, setLoaded] = useState(false);
  const [scriptOpen, setScriptOpen] = useState(false);

  // One effect, one job: adopt whatever this browser already has for this question id.
  useEffect(() => {
    const saved = readSaved(item.id);
    if (saved) {
      setDraft(saved.draft);
      setTicked(new Set(saved.ticked));
      if (saved.ticked.length > 0) setScriptOpen(true);
    }
    setLoaded(true);
  }, [item.id]);

  // Persist only after the load has happened, or the first paint would overwrite the saved draft
  // with the empty string it starts with.
  useEffect(() => {
    if (!loaded) return;
    writeSaved(item.id, { draft, ticked: [...ticked] });
  }, [loaded, draft, ticked, item.id]);

  const toggle = useCallback((criterionId) => {
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(criterionId)) next.delete(criterionId);
      else next.add(criterionId);
      return next;
    });
    setScriptOpen(true); // the marked segment is the point of ticking; do not hide it
  }, []);

  /** Segment id -> the criteria that point at it, so a marked segment can say which mark it is. */
  const bySegment = useMemo(() => {
    const map = new Map();
    for (const c of criteria) {
      if (!map.has(c.seg)) map.set(c.seg, []);
      map.get(c.seg).push(c);
    }
    return map;
  }, [criteria]);

  const claimed = criteria.reduce((n, c) => (ticked.has(c.id) ? n + (Number(c.marks) || 0) : n), 0);
  const tariff = Number(item.marks) || 0;

  // The bands in the order the criteria list them — never sorted, because a mark scheme's order is
  // the order the examiner reads in.
  const bands = [];
  for (const c of criteria) {
    const last = bands[bands.length - 1];
    if (last && last.band === c.band) last.items.push(c);
    else bands.push({ band: c.band, items: [c] });
  }

  return (
    <section className="lab-attempt" aria-label={`Attempt and self-mark: ${item.commandWord} (${tariff} marks)`}>
      <h3 className="lab-attempt-head">Attempt it, then mark it</h3>

      <label className="lab-attempt-label" htmlFor={`attempt-${item.id}`}>
        Your answer
        {item.minutes ? <span className="lab-attempt-time">{` — about ${item.minutes} minutes at this tariff`}</span> : null}
      </label>
      <textarea
        id={`attempt-${item.id}`}
        className="lab-attempt-draft"
        rows={6}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Write your answer here. It stays in this browser."
        spellCheck
      />
      <p className="lab-note">
        Saved in this browser only, against this question. Close the tab and come back and it is
        still here; open it on another device and it is not. Nothing is sent anywhere.
      </p>

      <div className="lab-attempt-total" role="status" aria-live="polite">
        <strong>{`${claimed} of ${tariff} marks`}</strong>
        <span>{` claimed — ${ticked.size} of ${criteria.length} criteria ticked`}</span>
      </div>

      <ul className="lab-criteria">
        {bands.map((group) => (
          <li key={group.band} className="lab-criteria-band">
            <p className="lab-criteria-band-head">{group.band}</p>
            <ul className="lab-criteria-list">
              {group.items.map((c) => (
                <li key={c.id} className={ticked.has(c.id) ? 'lab-criterion is-ticked' : 'lab-criterion'}>
                  <label>
                    <input
                      type="checkbox"
                      checked={ticked.has(c.id)}
                      onChange={() => toggle(c.id)}
                    />
                    <span className="lab-criterion-text">{c.text}</span>
                    <span className="lab-criterion-marks">{c.marks === 1 ? '1 mark' : `${c.marks} marks`}</span>
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <details
        className="lab-details lab-attempt-script"
        open={scriptOpen}
        onToggle={(e) => setScriptOpen(e.currentTarget.open)}
      >
        <summary>
          {ticked.size > 0
            ? `The marked script — ${ticked.size} segment${ticked.size === 1 ? '' : 's'} marked`
            : 'The marked script — where each of those marks is earned'}
        </summary>
        {script.map((para) => (
          <div key={para.id} className="lab-script-para">
            <h4>
              {para.label}
              {para.aos?.length ? <span className="lab-script-aos">{para.aos.join(' · ')}</span> : null}
            </h4>
            {(para.segments || []).map((seg) => {
              const pointing = bySegment.get(seg.id) || [];
              const marked = pointing.some((c) => ticked.has(c.id));
              return (
                <div
                  key={seg.id}
                  id={`seg-${item.id}-${seg.id}`}
                  className={marked ? 'lab-script-seg is-marked' : 'lab-script-seg'}
                >
                  <p className="lab-script-text" dangerouslySetInnerHTML={{ __html: seg.html }} />
                  {marked && (
                    <p className="lab-script-claimed">
                      {pointing
                        .filter((c) => ticked.has(c.id))
                        .map((c) => `${c.marks === 1 ? '1 mark' : `${c.marks} marks`} — ${c.band}`)
                        .join(' · ')}
                    </p>
                  )}
                  {seg.note && <p className="lab-script-note">{seg.note}</p>}
                </div>
              );
            })}
          </div>
        ))}
      </details>
    </section>
  );
}
