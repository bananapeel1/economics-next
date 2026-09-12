import Link from 'next/link';

/**
 * The masthead for the public SEO pages.
 *
 * Replaces the old `.elp-nav`, which used a glowing green dot in place of a
 * logo and set the wordmark in DM Serif Display — a face the app uses nowhere.
 * This uses the real `/logo.svg` mark and the Archivo wordmark.
 *
 * Deliberately has no Economics/Business switch: these pages are search entry
 * points, so the visitor already knows which subject they came for, and the
 * choice belongs in the app.
 *
 * `crumb` is optional context (e.g. "WBS11 · Unit 1"); `href` is the way in.
 */
export default function SiteHeader({ crumb = null, href = '/', cta = 'Open the app' }) {
  return (
    <header className="rlh">
      <Link href="/" className="rlh-brand">
        <img src="/logo.svg" alt="" className="rlh-mark" width={30} height={30} />
        <span className="rlh-id">
          <span className="rlh-name">Revvy Learn</span>
          <span className="rlh-board">Edexcel International A-Level</span>
        </span>
      </Link>
      <span className="rlh-right">
        {crumb ? <span className="rlh-crumb">{crumb}</span> : null}
        <Link href={href} className="rlh-cta">{cta}</Link>
      </span>
    </header>
  );
}
