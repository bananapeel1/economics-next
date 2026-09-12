/**
 * Deterministic RNG for quantitative drill items.
 *
 * An item is never stored — only `{ template, seed }` is. The same seed therefore has
 * to rebuild the same question on a different device, in a different process, next term.
 * `Math.random` cannot do that, so everything downstream draws from here.
 *
 * mulberry32: 32 bits of state, fast, and good enough for question papers. It is not a
 * cryptographic generator and must never be used as one.
 */

/** FNV-1a, so a string seed ('2026-09-12:user:section') becomes a 32-bit state. */
export function hashSeed(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function makeRng(seed) {
  let a = typeof seed === 'number' ? seed >>> 0 : hashSeed(String(seed));

  const next = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return {
    next,
    /** Inclusive both ends. */
    int: (min, max) => min + Math.floor(next() * (max - min + 1)),
    /** Inclusive both ends, in multiples of `step`. */
    step: (min, max, step) => min + Math.floor(next() * (Math.floor((max - min) / step) + 1)) * step,
    pick: (arr) => arr[Math.floor(next() * arr.length)],
  };
}

/** A fresh seed for a new attempt. Short enough to read in a URL or a log line. */
export function newSeed() {
  return Math.random().toString(36).slice(2, 10);
}
