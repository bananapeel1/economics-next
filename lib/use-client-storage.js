'use client';
import { useState, useEffect } from 'react';

/**
 * State that comes from the browser, without breaking hydration.
 *
 * F118. The server has no `localStorage`, so any value read while rendering is empty on the server
 * and populated in the browser. React compares the two, finds different markup, throws away the
 * server's tree and rebuilds the page from scratch. That is a wasted first paint on exactly the
 * low-end phones and school networks this cohort uses.
 *
 * A `useState(() => localStorage.getItem(...))` lazy initialiser looks safe and is not: the
 * initialiser runs during the first client render, which is the render being compared.
 *
 * Fixing this one component at a time does not hold. F099 was the same shape — reduced motion was
 * fixed per component and the verifier immediately found two more — and it was only solved by one
 * switch at the root. So this is the switch: every component that needs a stored value uses this,
 * and gets the server's answer on the first render and the browser's on the second.
 *
 * The cost is one extra render and a frame where the value is the fallback. For a "New" badge, a
 * saved step or a due count, that frame is invisible. A blank first paint is not.
 *
 * @param {() => T} read      runs in the browser only; may throw, that is handled
 * @param {T} fallback        what the server renders, and what a blocked/private store falls back to
 * @param {Array} deps        re-read when these change
 * @returns {[T, Function]}   value and setter, exactly like useState
 */
export function useClientValue(read, fallback, deps = []) {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    let next;
    try { next = read(); } catch { return; }
    if (next !== undefined) setValue(next);
    // The read function is redefined every render; `deps` is the real dependency list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [value, setValue];
}

/** False on the server and on the first client render, true afterwards. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  return hydrated;
}
