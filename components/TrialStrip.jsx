"use client";
import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';

const DISMISS_KEY = 'revvy_trial_strip_dismissed';

export default function TrialStrip() {
  const { user, isPremium } = useAuth();
  const [dismissed, setDismissed] = useState(true); // hidden by default until hydrated
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const wasDismissed = localStorage.getItem(DISMISS_KEY) === 'true';
    setDismissed(wasDismissed);
  }, []);

  // Toggle body attribute so other elements can shift down
  const visible = !isPremium && !dismissed;
  useEffect(() => {
    if (visible) {
      document.body.setAttribute('data-trial-strip', 'true');
    } else {
      document.body.removeAttribute('data-trial-strip');
    }
    return () => document.body.removeAttribute('data-trial-strip');
  }, [visible]);

  if (!visible) return null;

  function handleDismiss() {
    localStorage.setItem(DISMISS_KEY, 'true');
    setDismissed(true);
  }

  async function handleStartTrial() {
    if (!user) {
      window.location.href = '/login?redirect=/?upgraded=true';
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      if (res.ok) {
        const { url } = await res.json();
        if (url) window.location.href = url;
      }
    } catch (e) {
      console.error('Checkout error:', e);
    }
    setLoading(false);
  }

  return (
    <div className="trial-strip">
      <div className="trial-strip-inner">
        <div className="trial-strip-content">
          <span className="trial-strip-icon">&#11088;</span>
          <span className="trial-strip-text">
            <strong>3 days free</strong>, then just &euro;0.99/month &mdash; unlock flashcards, quizzes, AI tutor and more.
          </span>
          <span className="trial-strip-value">Cheaper than a coffee.</span>
        </div>
        <div className="trial-strip-actions">
          <button
            className="trial-strip-btn"
            onClick={handleStartTrial}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Start free trial'}
          </button>
          <button className="trial-strip-close" onClick={handleDismiss} aria-label="Dismiss">
            &#10005;
          </button>
        </div>
      </div>
    </div>
  );
}
