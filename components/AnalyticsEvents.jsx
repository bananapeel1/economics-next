'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/**
 * Fires `open_app` whenever a visitor follows a link from a landing page into
 * the study app.
 *
 * Matches on href shape rather than a per-link attribute, so every door across
 * the landing routes is covered without editing any page file and new ones are
 * picked up automatically.
 *
 * Two shapes count. The canonical `/<subject>/unit-<n>/<section>` is what the
 * landing pages link to now; the legacy `?section=` form still arrives from
 * external backlinks and 301s to the same place. Matching only the legacy form
 * is what this used to do, and when the landing pages were repointed at
 * canonical URLs it silently stopped firing — a drop in `open_app` that looked
 * like a conversion collapse and was only instrumentation.
 *
 * Listens in the capture phase so the event is recorded before the Next router
 * navigates away.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    function onClick(event) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest('a[href]');
      if (!link) return;

      let url = null;
      try {
        url = new URL(link.href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      // Legacy: /?section=<id>, still used by external backlinks.
      let section = url.searchParams.get('section');

      // Canonical: /<subject>/unit-<n>/<section>
      if (!section) {
        const match = url.pathname.match(/^\/(economics|business)\/unit-\d+\/([^/]+)\/?$/);
        if (match) section = match[2];
      }
      if (!section) return;

      track('open_app', { from: window.location.pathname, section });
    }

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
