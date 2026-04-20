"use client";
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

const AuthContext = createContext({
  user: null,
  loading: true,
  supabase: null,
  subscription: null,
  isPremium: false,
  activating: false,
  activationFailed: false,
  refreshSubscription: () => {},
});

// Post-checkout polling: how often and how long to wait before giving up.
// Previous values (10×2s = 20s) gave up before slow webhook reconciliation
// could complete. 30×2s = 60s matches realistic Stripe→webhook latency.
const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 30;

export function AuthProvider({ children, initialUser }) {
  const [user, setUser] = useState(initialUser || null);
  const [loading, setLoading] = useState(!initialUser);
  const [subscription, setSubscription] = useState(null);
  const [activating, setActivating] = useState(false);
  const [activationFailed, setActivationFailed] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => authSub.unsubscribe();
  }, [supabase]);

  const fetchSubscription = useCallback(() => {
    if (!user) {
      setSubscription(null);
      return;
    }
    fetch('/api/subscription')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setSubscription(data);
      })
      .catch(() => setSubscription(null));
  }, [user]);

  // Fetch subscription status when user changes
  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  // Re-fetch subscription when returning from Stripe checkout
  useEffect(() => {
    if (typeof window === 'undefined' || !user) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('upgraded') !== 'true') return;

    // Remove the query param from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('upgraded');
    window.history.replaceState({}, '', url.pathname + url.search);

    setActivating(true);
    setActivationFailed(false);

    let attempts = 0;
    const poll = setInterval(() => {
      attempts++;
      fetch('/api/subscription')
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.plan === 'premium' && data.status === 'active') {
            setSubscription(data);
            setActivating(false);
            clearInterval(poll);
          } else if (attempts >= POLL_MAX_ATTEMPTS) {
            setActivating(false);
            setActivationFailed(true);
            clearInterval(poll);
          }
        })
        .catch(() => {
          if (attempts >= POLL_MAX_ATTEMPTS) {
            setActivating(false);
            setActivationFailed(true);
            clearInterval(poll);
          }
        });
    }, POLL_INTERVAL_MS);

    return () => clearInterval(poll);
  }, [user]);

  const isPremium = subscription?.plan === 'premium' && subscription?.status === 'active';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        supabase,
        subscription,
        isPremium,
        activating,
        activationFailed,
        refreshSubscription: fetchSubscription,
      }}
    >
      {children}
      {(activating || activationFailed) && (
        <ActivationBanner
          activating={activating}
          activationFailed={activationFailed}
          onDismiss={() => setActivationFailed(false)}
        />
      )}
    </AuthContext.Provider>
  );
}

function ActivationBanner({ activating, activationFailed, onDismiss }) {
  const bannerStyle = {
    position: 'fixed',
    bottom: 24,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999,
    background: activationFailed ? '#402a2a' : '#1e2a3f',
    color: '#e8ecf5',
    padding: '12px 18px',
    borderRadius: 8,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    maxWidth: 'calc(100vw - 32px)',
  };

  if (activating) {
    return (
      <div style={bannerStyle} role="status" aria-live="polite">
        <span
          style={{
            width: 14,
            height: 14,
            border: '2px solid #6b7a99',
            borderTopColor: '#e8ecf5',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <span>Activating your subscription…</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={bannerStyle} role="alert">
      <span>⚠️ Still processing — if it doesn&apos;t unlock in a minute,</span>
      <a
        href="mailto:support@revvylearn.com"
        style={{ color: '#9fb5d9', textDecoration: 'underline' }}
      >
        contact support
      </a>
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        style={{
          background: 'transparent',
          border: 'none',
          color: '#e8ecf5',
          cursor: 'pointer',
          fontSize: 18,
          padding: '0 4px',
          marginLeft: 4,
        }}
      >
        ×
      </button>
    </div>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
