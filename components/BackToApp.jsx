import Link from 'next/link';

/**
 * The door back into the study app.
 *
 * Thirteen landing routes had no link into the app anywhere on the page — a
 * student could read the whole thing and never be offered the tool. This sits
 * at the foot of those pages.
 *
 * It is built from the app's own card styling rather than as a banner, and the
 * copy names the next study action instead of the product ("Mark it against the
 * model answers", not "Start your free trial").
 *
 * `href` should be the canonical topic URL. It used to need the `?section=`
 * form because that is what AnalyticsEvents matched on; the matcher now reads
 * canonical paths too, so the redirect hop is no longer the price of tracking.
 */
export default function BackToApp({
  icon: Icon,
  heading = 'Back to Revvy Learn',
  sub = 'Notes, diagrams and practice questions, free for both subjects',
  href = '/',
  cta = 'Open the app',
}) {
  return (
    <aside className="b2a">
      <div className="b2a-inner">
        {Icon ? (
          <span className="b2a-icon" aria-hidden="true"><Icon size={18} /></span>
        ) : null}
        <span className="b2a-text">
          <span className="b2a-heading">{heading}</span>
          {sub ? <span className="b2a-sub">{sub}</span> : null}
        </span>
        <Link href={href} className="b2a-btn">{cta}</Link>
      </div>
    </aside>
  );
}
