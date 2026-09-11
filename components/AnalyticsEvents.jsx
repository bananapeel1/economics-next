'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/**
 * Fires `open_app` whenever a visitor follows a link from a landing page into
 * the study app.
 *
 * Matches on the `?section=` href pattern rather than a per-link attribute, so
 * every door across the landing routes is covered without editing any page
 * file. New doors are picked up automatically.
 *
 * Listens in the capture phase so the event is recorded before the Next router
 * navigates away.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    function onClick(event) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest('a[href*="section="]');
      if (!link) return;

      let section = null;
      try {
        section = new URL(link.href, window.location.origin).searchParams.get('section');
      } catch {
        return;
      }
      if (!section) return;

      track('open_app', { from: window.location.pathname, section });
    }

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
