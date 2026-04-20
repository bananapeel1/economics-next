"use client";
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import Link from 'next/link';

export default function UpgradePageClient() {
  const { user, isPremium } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Something went wrong');
        return;
      }
      if (data.url) window.location.href = data.url;
    } catch (e) {
      console.error('Checkout error:', e);
    }
    setLoading(false);
  }

  if (isPremium) {
    return (
      <div className="upgrade-cta-section">
        <div className="upgrade-cta-active">
          <span>&#11088;</span> You&apos;re on the Pro plan
        </div>
        <Link href="/" className="upgrade-cta-btn">Back to App &rarr;</Link>
      </div>
    );
  }

  return (
    <div className="upgrade-cta-section">
      {user ? (
        <button className="upgrade-cta-btn" onClick={handleUpgrade} disabled={loading}>
          {loading ? 'Loading...' : 'Start 3-day free trial \u2192'}
        </button>
      ) : (
        <Link href="/login?redirect=/upgrade" className="upgrade-cta-btn">
          Start 3-day free trial &rarr;
        </Link>
      )}
    </div>
  );
}
