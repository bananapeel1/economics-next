/**
 * Provider-agnostic analytics.
 *
 * Detects whichever analytics script is present on the page and forwards the
 * event to it. No-ops safely when none is installed, so this is harmless to
 * ship before a provider is chosen, and needs no code change once one is —
 * adding the script is enough.
 *
 * Supported: Plausible, Umami, GA4 (gtag), Vercel Web Analytics.
 */
export function track(name, props = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.plausible === 'function') {
      window.plausible(name, { props });
    } else if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(name, props);
    } else if (typeof window.gtag === 'function') {
      window.gtag('event', name, props);
    } else if (typeof window.va === 'function') {
      window.va('event', { name, data: props });
    }
  } catch {
    // Analytics must never break the page.
  }
}
