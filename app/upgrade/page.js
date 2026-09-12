import Link from 'next/link';
import UpgradeButton from '@/components/UpgradeButton';

export const metadata = {
  title: 'Revvy Learn Pro — your first month is £1',
  description: 'Get every Revvy Learn revision tool for £1 for your first month, then £1.99/month. Cancel anytime. Or pay £12 once and keep it for life. Flashcards, quizzes, AI tutor, evaluation chains and model answers for Edexcel IAL Economics and Business.',
  openGraph: {
    title: 'Revvy Learn Pro — your first month is £1',
    description: 'Every revision tool for £1 for your first month, then £1.99. Cancel anytime, or pay £12 once and keep it forever.',
    url: 'https://revvylearn.com/upgrade',
    type: 'website',
  },
};

const FREE_FEATURES = [
  ['Revision notes', 'Every spec point, Units 1–4'],
  ['Diagrams', 'Every exam diagram, fully labelled'],
  ['Practice questions', 'Per topic, with mark schemes'],
  ['Past papers', 'Papers plus mark schemes'],
  ['Glossary & command words', null],
  ['Learn Mode', 'Guided walkthrough'],
];

const PRO_FEATURES = [
  ['Evaluation chains', 'The 20-mark technique, built step by step'],
  ['Model answers', 'Full-mark responses for every topic'],
  ['Flashcards', 'Spaced repetition (SM-2) schedules each card from your answers'],
  ['Quizzes with marking', 'Examiner-style feedback, not just right/wrong'],
  ['AI tutor', 'Answers in exam language, any hour of the night'],
  ['Revision PDFs', 'Download and print for offline revision'],
];

function Check({ muted }) {
  return <span className={`upgrade-check ${muted ? 'muted' : ''}`}>&#10003;</span>;
}

export default function UpgradePage() {
  return (
    <div className="upgrade-page">
      <div className="upgrade-page-inner">

        <div className="upgrade-header">
          <Link href="/" className="upgrade-back-link">&larr; Back to App</Link>
          <div className="upgrade-badge">REVVY LEARN PRO</div>
          <h1 className="upgrade-title">Your first month is £1.</h1>
          <p className="upgrade-subtitle">
            Then £1.99 a month, and you can cancel whenever you like. Every note on
            Revvy Learn stays free — Pro unlocks the tools that turn reading into marks.
          </p>
        </div>

        {/* Hero offer band */}
        <div className="upgrade-offer">
          <div className="upgrade-offer-main">
            <div className="upgrade-offer-price">
              <span className="upgrade-offer-amount">£1</span>
              <span className="upgrade-offer-unit">for your first month</span>
            </div>
            <div className="upgrade-offer-then">then £1.99/month · cancel anytime</div>
          </div>
          <div className="upgrade-offer-points">
            <div className="upgrade-offer-point"><Check /> Full access from the moment you join</div>
            <div className="upgrade-offer-point"><Check /> No contract, no notice period</div>
            <div className="upgrade-offer-point"><Check /> Prices in GBP &middot; pay in your local currency at checkout</div>
          </div>
        </div>

        <p className="upgrade-series-note">
          The January 2027 series is the next one up. Everything below is ready for it{' '}
          <Link href="/ial-revision/january-2027">see what&apos;s covered</Link>.
        </p>

        {/* Three tiers */}
        <div className="upgrade-tiers">

          <div className="upgrade-tier">
            <div className="upgrade-tier-label">FREE</div>
            <div className="upgrade-tier-price">£0</div>
            <div className="upgrade-tier-note">Always free. No sign-up needed.</div>
            <Link href="/" className="upgrade-btn ghost">Start reading</Link>
            <ul className="upgrade-list">
              {FREE_FEATURES.map(([name, desc]) => (
                <li key={name}>
                  <Check muted />
                  <div><strong>{name}</strong>{desc && <span>{desc}</span>}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="upgrade-tier featured">
            <div className="upgrade-tier-flag">Most popular</div>
            <div className="upgrade-tier-label">PRO — MONTHLY</div>
            <div className="upgrade-tier-price">
              £1<span className="upgrade-tier-period">first month</span>
            </div>
            <div className="upgrade-tier-note">then £1.99/month · cancel anytime</div>
            <UpgradeButton plan="monthly" label="Get Pro for £1 →" className="primary" />
            <ul className="upgrade-list">
              <li><Check /><div><strong>Everything in Free</strong></div></li>
              {PRO_FEATURES.map(([name, desc]) => (
                <li key={name}>
                  <Check />
                  <div><strong>{name}</strong>{desc && <span>{desc}</span>}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="upgrade-tier value">
            <div className="upgrade-tier-flag alt">Best value</div>
            <div className="upgrade-tier-label">PRO — LIFETIME</div>
            <div className="upgrade-tier-price">
              £12<span className="upgrade-tier-period">once</span>
            </div>
            <div className="upgrade-tier-note">no renewals, ever</div>
            <UpgradeButton plan="lifetime" label="Pay once — £12 →" className="value" />
            <ul className="upgrade-list">
              <li><Check /><div><strong>Everything in Pro</strong></div></li>
              <li><Check /><div><strong>Both years</strong><span>AS and A2, all four units</span></div></li>
              <li><Check /><div><strong>Every future update</strong><span>New topics and tools, included</span></div></li>
              <li><Check /><div><strong>Every exam series</strong><span>January and June, for as long as you need</span></div></li>
              <li><Check /><div><strong>Pays for itself in 6 months</strong><span>Cheaper than monthly if you revise past March</span></div></li>
            </ul>
          </div>

        </div>

        {/* Reassurance */}
        <div className="upgrade-reassure">
          <div className="upgrade-reassure-item">
            <strong>Cancel in two clicks</strong>
            <span>Settings → Cancel. No email, no waiting on a reply, no notice period.</span>
          </div>
          <div className="upgrade-reassure-item">
            <strong>Your currency, not ours</strong>
            <span>Prices here are in GBP. Checkout converts to your local currency automatically, so you see the real amount before you pay.</span>
          </div>
          <div className="upgrade-reassure-item">
            <strong>The notes stay free</strong>
            <span>Every spec point is readable without an account. Pro is the practice, not the content.</span>
          </div>
        </div>

        <div className="upgrade-final">
          <h2 className="upgrade-final-title">One pound. One month. See if it works for you.</h2>
          <p className="upgrade-final-sub">
            If it doesn&apos;t, cancel before month two and you&apos;ve spent a pound finding out.
          </p>
          <UpgradeButton plan="monthly" label="Get Pro for £1 →" className="primary large" />
          <div className="upgrade-signin">
            Already subscribed? <Link href="/settings">Manage your plan</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
