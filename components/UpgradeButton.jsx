"use client";
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { isLifetime } from '@/lib/entitlements';
import Link from 'next/link';

/**
 * Checkout CTA for a single plan. Used once per pricing tier so every column
 * is actionable, rather than funnelling everyone through one button below the
 * table.
 */
export default function UpgradeButton({ plan = 'monthly', label, className = '', ownedLabel }) {
  const { user, subscription, isPremium } = useAuth();
  const [loading, setLoading] = useState(false);

  const hasLifetime = isLifetime(subscription);

  // Lifetime is terminal — nothing left to sell.
  if (hasLifetime) {
    return <div className={`upgrade-owned ${className}`}>{ownedLabel || 'Included in your plan'}</div>;
  }

  // An existing subscriber can still upgrade to lifetime, but not re-subscribe.
  if (isPremium && plan === 'monthly') {
    return <div className={`upgrade-owned ${className}`}>{ownedLabel || 'Your current plan'}</div>;
  }

  if (!user) {
    return (
      <Link href="/login?redirect=/upgrade" className={`upgrade-btn ${className}`}>
        {label}
      </Link>
    );
  }

  async function go() {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        alert(data.error || 'Could not open checkout. Please try again.');
        setLoading(false);
        return;
      }
      window.location.href = data.url;
      // Navigating away — leave the button in its loading state.
    } catch {
      alert('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <button className={`upgrade-btn ${className}`} onClick={go} disabled={loading}>
      {loading ? 'Opening checkout…' : label}
    </button>
  );
}
