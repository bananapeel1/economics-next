"use client";
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import Link from 'next/link';

export default function PaywallOverlay({ feature = 'this feature' }) {
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

  return (
    <div className="paywall-overlay">
      <div className="paywall-card">
        <div className="paywall-icon">🔒</div>
        <h2 className="paywall-title">Premium Feature</h2>
        <p className="paywall-description">
          {user
            ? `Start your free trial to unlock ${feature} and accelerate your revision.`
            : `Sign in to start your free trial and access ${feature}.`
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
          <div className="paywall-feature-item">
            <span className="paywall-check">✓</span>
            Chains of Analysis & Evaluation
          </div>
        </div>

        {errorMsg && (
          <p style={{ color: '#ef4444', fontSize: 13, margin: '0 0 12px' }}>{errorMsg}</p>
        )}

        {user ? (
          <button
            className="paywall-btn"
            onClick={handleUpgrade}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Start 5-Day Free Trial'}
          </button>
        ) : (
          <Link href="/login" className="paywall-btn">
            Sign In to Get Started
          </Link>
        )}

        <p className="paywall-note">
          No credit card required. Content and Notes are always free.
        </p>
      </div>
    </div>
  );
}
