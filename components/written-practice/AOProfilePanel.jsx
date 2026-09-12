'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AO_DISPLAY, AO_KEYS } from '@/lib/ao-labels';
import { trackFunnel } from '@/lib/funnel';

/**
 * The AO profile panel.
 * =====================
 * This component renders strings, not claims. Every sentence it prints was assembled in
 * lib/ao-profile.js from the student's own written_ao_attempts rows and handed over by
 * GET /api/written-practice/ao-profile, so there is exactly one place in the codebase where a
 * claim can be phrased above its evidence — and it is not here.
 *
 * Two rules make that structural rather than aspirational:
 *
 *   1. NO ARITHMETIC. A percentage is rendered only where the payload carries a non-null `pct`.
 *      The payload sets `pct` to null at source whenever an objective is below its evidence floor
 *      or was never assessed, so this component is physically unable to print a rate it has not
 *      earned. If a number is missing, the fix belongs in lib/ao-profile.js.
 *
 *   2. NO COPY. Every user-facing string is either a field of the payload or the one eyebrow
 *      literal below. Nothing here paraphrases, softens or re-orders a sentence the aggregate
 *      wrote, and the four objective rows are iterated in AO_KEYS order and never sorted —
 *      sorting them would itself be a ranking claim the evidence does not support, since AO1 is
 *      measured on 4-mark Defines and AO4 only on 20-mark Evaluates.
 *
 * Failure behaviour is deliberate: on any error the panel renders nothing at all. It mounts on the
 * session summary a student just earned, and components/ProgressDashboard.jsx L40-48 — which
 * replaces a whole dashboard with an error string — is the pattern this must not copy.
 */

const EYEBROW = 'ASSESSMENT OBJECTIVES';
const SUBJECTS = ['economics', 'business'];

/**
 * One objective. The colour arrives from lib/ao-labels.js as a var() token string and is set here
 * as a custom property on the row, never as an inline `color:` — audit/scripts/contrast-check.mjs
 * reads globals.css only and is blind to a colour that exists solely in JSX.
 */
function ObjectiveRow({ aoKey, row }) {
  const isOk = row.state === 'ok' && row.pct !== null;

  return (
    <div className="aop-row" style={{ '--aop-ao-color': AO_DISPLAY[aoKey].color }}>
      <div className="aop-row-top">
        <span className="aop-row-label">{row.label}</span>
        {isOk && (
          <span className="aop-row-figures">
            <span className="aop-row-fraction">{row.fraction}</span>
            <span className="aop-row-pct">{row.pct}%</span>
          </span>
        )}
      </div>

      {isOk && (
        <div className="aop-bar">
          <div className="aop-bar-fill" style={{ width: `${row.pct}%` }} />
        </div>
      )}
      {/* Not assessed is not zero: a dashed empty track with no fill child at all, so it cannot be
          read as a bar that was filled to nothing. A 0%-width fill would be that claim. */}
      {row.state === 'not-assessed' && <div className="aop-bar aop-bar--none" />}

      {/* The row's own words in every state: the aggregate's sentence below the floor and when the
          objective was never assessed, and the answer count beside a rate — the count is the only
          calibration cue that cannot itself be wrong, so it never leaves the side of a percentage. */}
      {(row.text || isOk) && (
        <p className="aop-row-note">{row.text || row.answersLabel}</p>
      )}
    </div>
  );
}

export default function AOProfilePanel({ variant = 'summary', subject = null }) {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  // Errors are not held in state because nothing renders them; the panel simply stays absent.
  const [loading, setLoading] = useState(true);
  // The view event is fired from the fetch branch rather than a render effect. An effect-fired
  // event is what produced the audit's "75% never passed step 0" artefact (StudyApp.jsx L595-600),
  // and this ref keeps a re-fetch under a changed subject from double-counting one panel.
  const viewedRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const scope = SUBJECTS.includes(subject) ? subject : null;
    const url = scope
      ? `/api/written-practice/ao-profile?subject=${scope}`
      : '/api/written-practice/ao-profile';

    setLoading(true);

    fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        // A payload missing any of these is a payload this component cannot render honestly, so it
        // is treated exactly like a failed fetch.
        const ok = data && data.headline && data.objectives && data.meta;
        setProfile(ok ? data : null);
        setLoading(false);
        if (!ok) return;

        const key = `${scope || 'all'}|${data.headline.variant}`;
        if (viewedRef.current === key) return;
        viewedRef.current = key;
        if (data.headline.variant === 'empty') {
          trackFunnel('ao_profile_empty', { variant: data.headline.variant });
        } else {
          trackFunnel('ao_profile_view', {
            variant: data.headline.variant,
            answersCounted: data.meta.answersCounted,
          });
        }
      })
      .catch(() => {
        if (cancelled) return;
        setProfile(null);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [subject]);

  // Nothing while the fetch is in flight, in both variants. The summary is already a complete
  // screen and a placeholder that appears and vanishes is worse than a panel that arrives a beat
  // late — and there is no loading sentence in the approved copy to print instead.
  if (loading || !profile) return null;

  const { headline, objectives, chains, floorNote, exclusions, disclosure, nextAction } = profile;
  const isEmpty = headline.variant === 'empty';

  function handleAction(href) {
    trackFunnel('ao_action_click', {
      headlineVariant: headline.variant,
      command: profile.focus?.command ?? null,
      tariff: profile.focus?.tariff ?? null,
    });
    // "Practise a 20-mark Evaluate" is an instruction, and an instruction the app does not carry
    // out is the same kind of lie as a number it has not earned. This panel mounts on the session
    // summary AT /written-practice, and the primary action points back at /written-practice with
    // new search params: router.push keeps the engine mounted with phase still 'summary' and its
    // one-shot deep-link effect already spent, so the URL would change and the screen would not.
    // A same-path action therefore does a real navigation, which remounts the engine at step 1
    // with the params applied. trackFunnel posts with keepalive, so the event still lands.
    const samePath =
      typeof window !== 'undefined' && href.split('?')[0] === window.location.pathname;
    if (samePath) window.location.assign(href);
    else router.push(href);
  }

  return (
    <div className="aop-card" data-variant={variant}>
      <div className="aop-eyebrow">{EYEBROW}</div>

      {isEmpty ? (
        // One sentence and one button. No rows, no bars, no zeros: this is explicitly not the
        // /progress failure mode where a brand-new student meets a 0% ring.
        //
        // The exclusions footnote rides along here, because "no countable answers" and "no marked
        // answers" are not the same state. A student whose every marked answer was excluded is
        // entirely reachable — two of the five items in every Economics section carry a command
        // word that is not in Appendix 6, and nothing is hidden from practice — and without this
        // line they read "Nothing here yet" over answers they remember writing, with the one
        // sentence that reconciles the two suppressed. That is the silent exclusion the table's
        // own header forbids.
        <>
          <p className="aop-empty">{headline.text}</p>
          {exclusions && <p className="aop-exclusions">{exclusions.text}</p>}
        </>
      ) : (
        <>
          <p className="aop-headline">{headline.text}</p>
          {headline.technique && <p className="aop-technique">{headline.technique}</p>}

          <div className="aop-rows">
            {AO_KEYS.map((key) => (
              <ObjectiveRow key={key} aoKey={key} row={objectives[key]} />
            ))}
          </div>

          {floorNote?.recordLine && <p className="aop-record">{floorNote.recordLine}</p>}
          {/* `chains.text` is already floor-aware: it is a mean only when chains.shown, and the
              raw two-answer sentence otherwise. Gating on the text keeps the small-n line while
              making it impossible for a mean to appear below its floor. */}
          {chains?.text && <p className="aop-chains">{chains.text}</p>}
          {floorNote?.text && <p className="aop-floor">{floorNote.text}</p>}
          {exclusions && <p className="aop-exclusions">{exclusions.text}</p>}
        </>
      )}

      {/* Permanent. Not a tooltip, not a chevron, not dismissible, never smaller than the notes
          above it: it is the second half of the sentence every figure on this card makes. */}
      <p className="aop-disclosure">{disclosure}</p>

      {nextAction && (
        <div className="aop-actions">
          <button
            type="button"
            className="aop-action"
            onClick={() => handleAction(nextAction.href)}
          >
            {nextAction.label}
          </button>
          {nextAction.sublabel && <p className="aop-action-sub">{nextAction.sublabel}</p>}

          {nextAction.secondary && (
            <>
              <button
                type="button"
                className="aop-link"
                onClick={() => router.push(nextAction.secondary.href)}
              >
                {nextAction.secondary.label}
              </button>
              {nextAction.secondary.sublabel && (
                <p className="aop-link-sub">{nextAction.secondary.sublabel}</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
