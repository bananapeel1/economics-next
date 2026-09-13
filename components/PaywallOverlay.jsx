"use client";
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { introOffer } from '@/lib/trial-eligibility';
import Link from 'next/link';
import { PAYWALL_FEATURES as FEATURES } from '@/lib/feature-matrix';

/* ── Feature checklist ── */
/* F031: this list used to be written here and disagreed with the upgrade page — it promised
   "Full Model Answers, Not Just the First" while the upgrade page sold "Model answers" flatly,
   and neither matched the subject hubs. Derived from the one matrix now. */

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function PaywallOverlay({ feature = 'this feature', inline = false, previewText = '' }) {
  const { user, isPremium, trialEligible } = useAuth();
  /*
   * F031, the surfaces the first fix missed. /upgrade was corrected to show the price checkout
   * will actually charge, and this component went on hardcoding "£1 first month" in six places.
   * A student who has subscribed before was told £1 here and £1.99 on /upgrade, and charged
   * £1.99 — the contradiction the finding is named for, made worse rather than better.
   */
  const offer = introOffer(trialEligible);

  /*
   * What this page is allowed to say about the price.
   *
   * `trialEligible` defaults to true for a signed-out visitor, because there is no account to
   * check — but a signed-out visitor may perfectly well be a returning subscriber who has not
   * logged in yet, and checkout will charge them £1.99. So while nobody is signed in, the offer is
   * described as belonging to new subscribers rather than promised to whoever is reading.
   *
   * Derived once and used by BOTH variants. The previous fix put this reasoning in a comment above
   * the full overlay's subtitle and applied it only there, while the inline variant sixty lines
   * above went on promising £1 flat — and the inline one is the variant a signed-out reader
   * actually meets, on the model answers page and the fun quiz.
   */
  const priceChip = user ? `${offer.price} ${offer.unit}` : '\u00a31 first month for new subscribers';
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Don't show paywall to premium users
  if (isPremium) return null;

  async function handleUpgrade() {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      if (!res.ok) {
        let msg = 'Something went wrong. Please try again.';
        try {
          const body = await res.json();
          if (body?.error) msg = body.error;
        } catch (_) {}
        console.error('Checkout error:', msg);
        setErrorMsg(msg);
        setLoading(false);
        return;
      }
      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        setErrorMsg('Could not create checkout session.');
        setLoading(false);
      }
    } catch (e) {
      console.error('Checkout error:', e);
      setErrorMsg('Network error. Please try again.');
      setLoading(false);
    }
  }

  const ctaButton = user ? (
    <button className="paywall-btn" onClick={handleUpgrade} disabled={loading}>
      {loading ? 'Loading...' : `Get Pro \u2014 ${offer.price} ${offer.unit}`}
    </button>
  ) : (
    <Link href="/login" className="paywall-btn">Sign In to Get Started</Link>
  );

  // The button above goes straight to Stripe on the monthly plan, so the
  // £12 lifetime option was invisible to anyone who never visited /upgrade
  // — which is most people, since every gated tab lands here instead.
  const plansLink = (
    <Link href="/upgrade" className="paywall-plans-link">See all plans and pricing</Link>
  );

  /* ── Inline variant (compact, inside preview-fade-cta) ── */
  if (inline) {
    return (
      <div className="preview-paywall-banner">
        <h3 className="preview-paywall-title">Unlock All {feature}</h3>
        <p className="preview-paywall-desc">
          {user ? (
            <>
              Full access to every section &mdash; <strong>{offer.price} {offer.unit}</strong>
              {trialEligible ? ', then \u00a31.99. Cheaper than a coffee.' : '. Cancel anytime.'}
            </>
          ) : (
            <>
              Full access to every section. <strong>New subscribers get their first month for
              &pound;1</strong>, then &pound;1.99. Cheaper than a coffee.
            </>
          )}
        </p>

        <div className="paywall-inline-features">
          {FEATURES.map(f => (
            <div className="paywall-inline-feature" key={f}>
              <span className="paywall-check-icon"><CheckIcon /></span>
              <span>{f}</span>
            </div>
          ))}
        </div>

        {errorMsg && (
          <p style={{ color: '#ef4444', fontSize: 13, margin: '0 0 12px' }}>{errorMsg}</p>
        )}

        {ctaButton}
        {plansLink}

        <div className="paywall-trust-row-compact">
          <span>{priceChip}</span>
          <span className="paywall-trust-dot" />
          <span>Cancel anytime</span>
        </div>
        <p className="paywall-currency-note">Prices in GBP &mdash; you&rsquo;ll be charged in your local currency at checkout.</p>
      </div>
    );
  }

  /* ── Full overlay variant ── */
  return (
    <div className="paywall-overlay">
      <div className="paywall-card">

        {/* Preview count (when coming from preview mode) */}
        {previewText && (
          <div className="paywall-preview-text">{previewText}</div>
        )}

        {/* Badge */}
        <div className="paywall-badge-row">
          <div className="paywall-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l2.9 6.26L22 9.27l-5 5.14L18.18 22 12 18.56 5.82 22 7 14.41 2 9.27l7.1-1.01L12 2z" /></svg>
            Pro Plan
          </div>
        </div>

        {/* Title & subtitle */}
        <h2 className="paywall-title">
          {user
            ? `Unlock ${feature}`
            : `Access ${feature}`
          }
        </h2>
        <p className="paywall-subtitle">
          {user
            ? offer.headline
            // F031: a signed-out visitor may well be a returning subscriber, and this page cannot
            // know. It says who the price is for rather than promising it to whoever is reading.
            : 'Sign in to unlock everything. New subscribers get their first month for \u00a31.'
          }
        </p>

        {/* Price */}
        <div className="paywall-price-block">
          <div className="paywall-price">
            <span className="paywall-price-amount">{offer.price}</span>
            <span className="paywall-price-period">{user ? offer.unit : 'first month, new subscribers'}</span>
          </div>
          <div className="paywall-price-trial">
            {trialEligible
              ? 'then \u00a31.99/month \u00b7 cancel anytime \u00b7 or \u00a312 once for life'
              : 'you have subscribed before, so the \u00a31 first month does not apply \u00b7 cancel anytime \u00b7 or \u00a312 once for life'}
          </div>
          <div className="paywall-price-value">Shown in GBP &mdash; you&rsquo;ll be charged in your local currency at checkout</div>
        </div>

        {/* Feature checklist */}
        <div className="paywall-checklist">
          {FEATURES.map(f => (
            <div className="paywall-checklist-item" key={f}>
              <span className="paywall-check-icon"><CheckIcon /></span>
              <span>{f}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="paywall-cta-section">
          {errorMsg && (
            <p style={{ color: '#ef4444', fontSize: 13, margin: '0 0 12px', textAlign: 'center' }}>{errorMsg}</p>
          )}

          {ctaButton}
          {plansLink}

          <div className="paywall-trust-row">
            <span>{priceChip}</span>
            <span className="paywall-trust-dot" />
            <span>Cancel anytime</span>
          </div>
        </div>

      </div>
    </div>
  );
}
