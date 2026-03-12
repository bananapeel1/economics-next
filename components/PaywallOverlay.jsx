"use client";
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import Link from 'next/link';

export default function PaywallOverlay({ feature = 'this feature' }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      const { url, error } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        console.error('Checkout error:', error);
        setLoading(false);
      }
    } catch (e) {
      console.error('Checkout error:', e);
      setLoading(false);
    }
  }

  return (
    <div className="paywall-overlay">
      <div className="paywall-card">
        <div className="paywall-icon">🔒</div>
        <h2 className="paywall-title">Premium Feature</h2>
        <p className="paywall-description">
          {user
            ? `Upgrade to Premium to unlock ${feature} and accelerate your revision.`
            : `Sign in and upgrade to Premium to access ${feature}.`
          }
        </p>

        <div className="paywall-features">
          <div className="paywall-feature-item">
            <span className="paywall-check">✓</span>
            Interactive Flashcards
          </div>
          <div className="paywall-feature-item">
            <span className="paywall-check">✓</span>
            Practice Quizzes with Feedback
          </div>
          <div className="paywall-feature-item">
            <span className="paywall-check">✓</span>
            Common Mistakes Analysis
          </div>
          <div className="paywall-feature-item">
            <span className="paywall-check">✓</span>
            AI Tutor for Exam Prep
          </div>
        </div>

        {user ? (
          <button
            className="paywall-btn"
            onClick={handleUpgrade}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Upgrade to Premium'}
          </button>
        ) : (
          <Link href="/login" className="paywall-btn">
            Sign In to Get Started
          </Link>
        )}

        <p className="paywall-note">
          Content and Notes are always free. No credit card required to browse.
        </p>
      </div>
    </div>
  );
}
