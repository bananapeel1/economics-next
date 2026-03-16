"use client";
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import Link from 'next/link';

/* ── Feature checklist ── */
const FEATURES = [
  'Interactive Flashcards',
  'Practice Quizzes with Feedback',
  'AI Tutor for Exam Prep',
  'Chains of Analysis & Evaluation',
  'Common Mistakes Analysis',
];

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function PaywallOverlay({ feature = 'this feature', inline = false }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
      {loading ? 'Loading...' : 'Start Free Trial'}
    </button>
  ) : (
    <Link href="/login" className="paywall-btn">Sign In to Get Started</Link>
  );

  /* ── Inline variant (compact, inside preview-fade-cta) ── */
  if (inline) {
    return (
      <div className="preview-paywall-banner">
        <h3 className="preview-paywall-title">Unlock All {feature}</h3>
        <p className="preview-paywall-desc">Full access to every section &mdash; just <strong>&euro;0.99/month</strong>. Cheaper than a coffee.</p>

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

        <div className="paywall-trust-row-compact">
          <span>3-day free trial</span>
          <span className="paywall-trust-dot" />
          <span>Cancel anytime</span>
        </div>
      </div>
    );
  }

  /* ── Full overlay variant ── */
  return (
    <div className="paywall-overlay">
      <div className="paywall-card">

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
            ? 'Start your free trial and accelerate your revision.'
            : 'Sign in to start your free trial and unlock everything.'
          }
        </p>

        {/* Price */}
        <div className="paywall-price-block">
          <div className="paywall-price">
            <span className="paywall-price-amount">&euro;0.99</span>
            <span className="paywall-price-period">/ month</span>
          </div>
          <div className="paywall-price-trial">3-day free trial</div>
          <div className="paywall-price-value">Cheaper than a single coffee &mdash; for unlimited revision tools</div>
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

          <div className="paywall-trust-row">
            <span>Cancel anytime</span>
            <span className="paywall-trust-dot" />
            <span>No credit card for trial</span>
          </div>
        </div>

      </div>
    </div>
  );
}
