'use client';
import { useAuth } from './AuthProvider';
import UpgradeButton from './UpgradeButton';
import { introOffer } from '@/lib/trial-eligibility';

/**
 * The monthly plan card, which has to know who is looking at it.
 *
 * F031. The upgrade page is a server component and showed one price to everybody: "£1 first
 * month". Checkout has always withheld that coupon from anyone who has subscribed before, so the
 * 43 accounts carrying a cancelled subscription row were shown a price they would not be charged
 * and found out at the till. The rule lives in lib/trial-eligibility.js and checkout reads the
 * same module, so the two cannot drift.
 *
 * Only this card is a client component; the rest of the page stays server-rendered.
 */
/* The list is rendered here rather than passed in: a server component cannot hand a function to a
   client component, which is what "Functions cannot be passed directly to Client Components" meant
   when the page 500'd. */
function Check() {
  return (
    <svg className="upgrade-check" width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function MonthlyPlanCard({ features }) {
  const { trialEligible } = useAuth();
  const offer = introOffer(trialEligible !== false);

  return (
    <div className="upgrade-plan featured">
      <div className="upgrade-plan-flag">Most popular</div>
      <div className="upgrade-plan-head">
        <div className="upgrade-plan-for">If you&rsquo;re revising for one series</div>
        <div className="upgrade-plan-price">
          {offer.price}<span className="upgrade-plan-unit">{offer.unit}</span>
        </div>
        <div className="upgrade-plan-sub">{offer.sub}</div>
      </div>
      <UpgradeButton plan="monthly" label={offer.cta} className="primary" />
      <ul className="upgrade-plan-list">
        {features.map(([name, desc]) => (
          <li key={name}>
            <Check />
            <div>
              <strong>{name}</strong>
              {desc && <span>{desc}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
