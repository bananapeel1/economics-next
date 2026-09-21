/**
 * Which section has a live data-response piece — and proof that the piece is still there.
 *
 * Packet 12.2, E012. The lab page links OUT to `/data-response/<slug>`, which is live, indexed and
 * canonical since `fe8b65a`. It never re-renders the stimulus: two pages carrying the same extract
 * is a duplicate-content problem on the one surface here that ranks, and the lab page's job is to
 * point at the real thing, not to copy it.
 *
 * WHY THE MAP IS HERE AND NOT IN `app/data-response/`. That route already holds TWO copies of the
 * piece list — a `PIECES` array in `page.jsx` and a `PIECES` object in `[slug]/page.jsx` — and
 * neither is exported. Refactoring them is a change to a live, indexed page, which packet 12.2 is
 * explicitly not allowed to make ("Code-only. No content publish. No live-page change"). So this
 * module adds a third file rather than editing those two, and pays for that with the guard below.
 *
 * THE GUARD. A third list can drift, so nothing here is trusted: `dataResponseFor()` returns a link
 * only when `content/data-response/<slug>.md` is actually on disk. A stale entry therefore renders
 * NOTHING, which is what E012 asks for, instead of a dead link. The check is the same one
 * `app/data-response/[slug]/page.jsx` makes before it renders — the file, not the list.
 *
 * HOW THE PAIRS WERE ESTABLISHED. Not by slug similarity: `econ-u1-demand-elasticity` and
 * `consumer-behaviour-demand` share no token. Each markdown file's own H1 was read and matched to
 * the section bundle's `meta.title` in `audit/content-sections/`:
 *
 *   "Market Failure"                      → economics 1.3.5 Market Failure
 *   "Price Determination"                 → economics 1.3.4 Price Determination
 *   "Consumer Behaviour and Elasticity"   → economics 1.3.2 Consumer Behaviour & Demand
 *   "Marketing Mix and Strategy"          → business  1.3.3 Marketing Mix and Strategy
 *   "Meeting Customer Needs"              → business  1.3.1 Meeting Customer Needs
 *   "The Market"                          → business  1.3.2 The Market
 *
 * All six markdown files are Unit 1. Every other section — including
 * `measures-economic-performance`, one of this packet's two walkthrough sections — has no piece,
 * and the lab page renders no block at all for it.
 */

import fs from 'node:fs';
import path from 'node:path';

/**
 * `'<subject>__<sectionSlug>'` → the live `/data-response/<slug>` piece.
 *
 * Keyed by subject first so Business 1.3.2 "The Market" and Economics 1.3.2 cannot collide
 * — the same mistake packet 12.1's E005 fixed in the model-answer bank.
 */
export const DATA_RESPONSE_BY_SECTION = Object.freeze({
  'economics__market-failure': { slug: 'econ-u1-market-failure', title: 'Market Failure — UAE plastics & GCC sugar tax' },
  'economics__price-determination': { slug: 'econ-u1-price-determination', title: 'Price Determination — Red Sea & Panama disruption' },
  'economics__consumer-behaviour-demand': { slug: 'econ-u1-demand-elasticity', title: 'Demand Elasticity — India telecoms price rises' },
  'business__marketing-mix-strategy': { slug: 'bus-u1-marketing-mix', title: 'Marketing Mix — BYD’s Gulf push' },
  'business__meeting-customer-needs': { slug: 'bus-u1-meeting-customer-needs', title: 'Meeting Customer Needs — Shein/Temu vs Modanisa' },
  'business__the-market': { slug: 'bus-u1-the-market', title: 'The Market — Ozempic supply shortage' },
});

const CONTENT_DIR = path.join(process.cwd(), 'content', 'data-response');

/**
 * The live piece for a section, or null.
 *
 * @param {string} subject - 'economics' | 'business'
 * @param {string} sectionSlug - e.g. 'market-failure'
 * @returns {{ href: string, slug: string, title: string }|null}
 */
export function dataResponseFor(subject, sectionSlug) {
  const piece = DATA_RESPONSE_BY_SECTION[`${subject}__${sectionSlug}`];
  if (!piece) return null;
  try {
    fs.accessSync(path.join(CONTENT_DIR, `${piece.slug}.md`));
  } catch {
    return null; // the list drifted; render nothing rather than a dead link
  }
  return { href: `/data-response/${piece.slug}`, slug: piece.slug, title: piece.title };
}
