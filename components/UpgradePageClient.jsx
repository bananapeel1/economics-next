"use client";
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { isLifetime } from '@/lib/entitlements';
import Link from 'next/link';

export default function UpgradePageClient() {
  const { user, subscription, isPremium } = useAuth();
  const [loading, setLoading] = useState(null); // 'monthly' | 'lifetime' | null

  async function handleUpgrade(plan) {
    setLoading(plan);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Something went wrong');
        setLoading(null);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return; // Navigating away — keep the button in its loading state.
      }
    } catch (e) {
      console.error('Checkout error:', e);
    }
    setLoading(null);
  }

  if (isLifetime(subscription)) {
    return (
      <div className="upgrade-cta-section">
        <div className="upgrade-cta-active">
          <span>&#11088;</span> You have lifetime access
        </div>
        <Link href="/" className="upgrade-cta-btn">Back to App &rarr;</Link>
      </div>
    );
  }

  if (isPremium) {
    return (
      <div className="upgrade-cta-section">
        <div className="upgrade-cta-active">
          <span>&#11088;</span> You&apos;re on the Pro plan
        </div>
        <button
          className="upgrade-cta-btn"
          onClick={() => handleUpgrade('lifetime')}
          disabled={loading !== null}
        >
          {loading === 'lifetime' ? 'Loading...' : 'Switch to lifetime — £12 once →'}
        </button>
        <p className="upgrade-cta-note">
          One payment, no more monthly billing. We&apos;ll cancel your subscription automatically.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="upgrade-cta-section">
        <Link href="/login?redirect=/upgrade" className="upgrade-cta-btn">
          Get Pro — £1 for your first month &rarr;
        </Link>
        <p className="upgrade-cta-note">Then £1.99/month. Cancel anytime.</p>
      </div>
    );
  }

  return (
    <div className="upgrade-cta-section">
      <button
        className="upgrade-cta-btn"
        onClick={() => handleUpgrade('monthly')}
        disabled={loading !== null}
      >
        {loading === 'monthly' ? 'Loading...' : 'Get Pro — £1 for your first month →'}
      </button>
      <p className="upgrade-cta-note">Then £1.99/month. Cancel anytime.</p>

      <button
        className="upgrade-cta-btn secondary"
        onClick={() => handleUpgrade('lifetime')}
        disabled={loading !== null}
      >
        {loading === 'lifetime' ? 'Loading...' : 'Or pay once — £12 for lifetime access'}
      </button>
      <p className="upgrade-cta-note">
        Both years, every unit, every future update. No renewals, ever.
      </p>
    </div>
  );
}
