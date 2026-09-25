/**
 * Learn Mode state, server-backed with localStorage as a cache.
 *
 * F001 and F027. Completion, the review schedule, strength inputs and the pre-test all lived only
 * in localStorage, so none of it followed a student between their school laptop and their phone,
 * survived clearing site data, or existed in a private window. Signing in changed nothing.
 *
 * The rule here: for a signed-in student the server is the source of truth and localStorage is a
 * cache that makes the first paint instant. For a signed-out student localStorage is all there is,
 * which is correct — there is nowhere else to put it — and the same functions work unchanged.
 *
 * Every write is fire-and-forget with the failure logged. It must never block the student: losing
 * a completion write is bad, but blocking the Next button on a slow school network is worse, and
 * the local copy still holds.
 */

const LOCAL_PREFIX = 'revvy_section_state';

function localKey(subjectId, sectionId) {
  return `${LOCAL_PREFIX}_${subjectId}_${sectionId}`;
}

/** Read the cached copy. Always safe, always synchronous, works signed out. */
export function readLocalState(subjectId, sectionId) {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(localKey(subjectId, sectionId));
    if (raw) return JSON.parse(raw);
    // Migrate the older single-purpose keys on first read, so a student who already finished a
    // section does not appear to have lost it the day this ships.
    const legacyComplete = localStorage.getItem(`revvy_complete_${subjectId}_${sectionId}`) === 'true';
    const legacyPretest = localStorage.getItem(`revvy_pretest_${subjectId}_${sectionId}`);
    if (!legacyComplete && !legacyPretest) return null;
    let pretestState = null;
    if (legacyPretest) {
      try {
        const p = JSON.parse(legacyPretest);
        pretestState = p?.skipped ? 'skipped' : 'taken';
      } catch { pretestState = 'taken'; }
    }
    return { completed: legacyComplete, pretestState };
  } catch {
    return null;
  }
}

export function writeLocalState(subjectId, sectionId, patch) {
  if (typeof window === 'undefined') return;
  try {
    const current = readLocalState(subjectId, sectionId) || {};
    localStorage.setItem(localKey(subjectId, sectionId), JSON.stringify({ ...current, ...patch }));
  } catch { /* private window, quota, blocked storage — the server copy still has it */ }
}

/** Fetch server state for some sections. Returns {} when signed out or the table is absent. */
export async function fetchServerState(sectionIds) {
  try {
    const q = sectionIds?.length ? `?sections=${sectionIds.join(',')}` : '';
    const res = await fetch(`/api/learn-mode/state${q}`);
    if (!res.ok) return {};
    const json = await res.json();
    if (json.unavailable) {
      // The migration has not been run. Worth one line in the console rather than silence, because
      // the previous version of this feature failed invisibly for its entire lifetime.
      console.warn('[section-state] server state unavailable; run scripts/packet-4-section-state.sql');
    }
    return json.state || {};
  } catch {
    return {};
  }
}

/**
 * Write one section's state. Local first so the UI is correct immediately, then the server.
 * Returns the server's view when it succeeds, so a caller can reconcile if it wants to.
 */
export async function saveSectionState(subjectId, sectionId, patch) {
  writeLocalState(subjectId, sectionId, patch);
  try {
    const res = await fetch('/api/learn-mode/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sectionId, subjectId, ...patch }),
    });
    if (res.status === 401) return null; // signed out: local copy is the whole story, as intended
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.error('[section-state] save failed:', body.error || res.status, body.detail || '');
      return null;
    }
    const json = await res.json();
    return json.state || null;
  } catch (e) {
    console.error('[section-state] save failed:', e?.message || e);
    return null;
  }
}
