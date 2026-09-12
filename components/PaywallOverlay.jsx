"use client";
import { useState } from 'react';
import { useAuth } from './AuthProvider';
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
  const { user, isPremium } = useAuth();
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
      {loading ? 'Loading...' : 'Get Pro — £1 first month'}
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
        <p className="preview-paywall-desc">Full access to every section &mdash; <strong>&pound;1 for your first month</strong>, then &pound;1.99. Cheaper than a coffee.</p>

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
          <span>&pound;1 first month</span>
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
            ? 'Get your first month for £1 and accelerate your revision.'
            : 'Sign in to unlock everything from £1 for your first month.'
          }
        </p>

        {/* Price */}
        <div className="paywall-price-block">
          <div className="paywall-price">
            <span className="paywall-price-amount">&pound;1</span>
            <span className="paywall-price-period">first month</span>
          </div>
          <div className="paywall-price-trial">then &pound;1.99/month &middot; cancel anytime &middot; or &pound;12 once for life</div>
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
            <span>&pound;1 first month</span>
            <span className="paywall-trust-dot" />
            <span>Cancel anytime</span>
          </div>
        </div>

      </div>
    </div>
  );
}
