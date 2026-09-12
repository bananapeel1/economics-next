import Link from 'next/link';
import UpgradeButton from '@/components/UpgradeButton';
import { FREE_FEATURES, PRO_FEATURES, LIFETIME_FEATURES } from '@/lib/feature-matrix';

export const metadata = {
  title: 'Revvy Learn Pro — £1 first month for new subscribers',
  description: 'New subscribers get every Revvy Learn revision tool for £1 for the first month, then £1.99/month. Or pay £12 once and keep it for life. Flashcards, quizzes, AI tutor, evaluation chains and model answers for Edexcel IAL Economics and Business.',
  openGraph: {
    title: 'Revvy Learn Pro — £1 first month for new subscribers',
    description: 'New subscribers get every revision tool for £1 for the first month, then £1.99. Cancel anytime, or pay £12 once and keep it forever.',
    url: 'https://revvylearn.com/upgrade',
    type: 'website',
  },
};

/* F031: these three arrays used to live here and disagreed with the paywall overlay's own copy
   and with the subject hubs' prose. They come from lib/feature-matrix.js now, which is also what
   the paywall reads, so the surfaces cannot contradict each other again. */
function Check() {
  return (
    <svg className="upgrade-check" width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Globe() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
    </svg>
  );
}

function FeatureList({ items }) {
  return (
    <ul className="upgrade-plan-list">
      {items.map(([name, desc]) => (
        <li key={name}>
          <Check />
          <div>
            <strong>{name}</strong>
            {desc && <span>{desc}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function UpgradePage() {
  return (
    <div className="upgrade-page">
      <div className="upgrade-page-inner">

        <div className="upgrade-header">
          <Link href="/" className="upgrade-back-link">&larr; Back to App</Link>
          <div className="upgrade-badge">REVVY LEARN PRO</div>
          <h1 className="upgrade-title">New subscribers get their first month for £1.</h1>
          <p className="upgrade-subtitle">
            The teaching stays free. Pro unlocks the tools that turn reading into marks.
          </p>
          {/* F031: the page asserted a free tier in one line of prose and then listed only the two
              paid plans, while the paywall overlay and the subject hubs each described the
              boundary differently. Showing what free actually includes, from the one matrix all
              three surfaces now read, is what stops them contradicting each other. */}
          <div className="upgrade-free-note">
            <strong>Free, with no account:</strong>{' '}
            {FREE_FEATURES.map(([name], i) => (
              <span key={name}>{i > 0 ? ' · ' : ''}{name}</span>
            ))}
          </div>
          <div className="upgrade-currency-pill">
            <Globe />
            <span>Pay in your local currency at checkout</span>
          </div>
        </div>

        <div className="upgrade-plans">

          <div className="upgrade-plan featured">
            <div className="upgrade-plan-flag">Most popular</div>
            <div className="upgrade-plan-head">
              <div className="upgrade-plan-for">If you&rsquo;re revising for one series</div>
              <div className="upgrade-plan-price">
                £1<span className="upgrade-plan-unit">first month</span>
              </div>
              <div className="upgrade-plan-sub">new subscribers &middot; then £1.99/month &middot; cancel anytime</div>
            </div>
            <UpgradeButton plan="monthly" label="Start Pro →" className="primary" />
            <FeatureList items={PRO_FEATURES} />
          </div>

          <div className="upgrade-plan">
            <div className="upgrade-plan-flag alt">Save 50%</div>
            <div className="upgrade-plan-head">
              <div className="upgrade-plan-for">If you&rsquo;ve got both years ahead of you</div>
              <div className="upgrade-plan-price">
                £12<span className="upgrade-plan-unit">once</span>
              </div>
              <div className="upgrade-plan-sub">
                <span className="upgrade-strike">£23.88 a year on monthly</span> &middot; pays for itself in 6 months
              </div>
            </div>
            <UpgradeButton plan="lifetime" label="Pay once — £12 →" className="value" />
            <FeatureList items={LIFETIME_FEATURES} />
          </div>

        </div>

        <div className="upgrade-reassure">
          <div className="upgrade-reassure-item">
            <strong>Cancel anytime in Settings</strong>
            <span>Settings → Cancel Subscription, then confirm in Stripe. No email, no waiting on a reply, no notice period.</span>
          </div>
          <div className="upgrade-reassure-item">
            <strong>Your currency, not ours</strong>
            <span>Prices here are in GBP. Checkout converts to your local currency automatically, so you see the real amount before you pay.</span>
          </div>
          <div className="upgrade-reassure-item">
            <strong>The notes stay free</strong>
            <span>The notes are readable without an account. Pro is the practice, not the content.</span>
          </div>
        </div>

        <div className="upgrade-final">
          <h2 className="upgrade-final-title">New here? One pound. One month. See if it works for you.</h2>
          <p className="upgrade-final-sub">
            If it doesn&apos;t, cancel before month two and you&apos;ve spent a pound finding out.
          </p>
          <div className="upgrade-final-cta">
            <UpgradeButton plan="monthly" label="Start Pro →" className="primary" />
          </div>
          <div className="upgrade-signin">
            Already subscribed? <Link href="/settings">Manage your plan</Link>
            {' · '}
            <Link href="/ial-revision/january-2027">January 2027 series</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
