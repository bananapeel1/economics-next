"use client";
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

const AuthContext = createContext({
  user: null,
  loading: true,
  supabase: null,
  subscription: null,
  isPremium: false,
  refreshSubscription: () => {},
});

export function AuthProvider({ children, initialUser }) {
  const [user, setUser] = useState(initialUser || null);
  const [loading, setLoading] = useState(!initialUser);
  const [subscription, setSubscription] = useState(null);
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
    if (params.get('upgraded') === 'true') {
      // Remove the query param from URL
      const url = new URL(window.location.href);
      url.searchParams.delete('upgraded');
      window.history.replaceState({}, '', url.pathname + url.search);

      // Poll for subscription update (webhook may take a moment)
      let attempts = 0;
      const poll = setInterval(() => {
        attempts++;
        fetch('/api/subscription')
          .then(res => res.ok ? res.json() : null)
          .then(data => {
            if (data && data.plan === 'premium' && data.status === 'active') {
              setSubscription(data);
              clearInterval(poll);
            } else if (attempts >= 10) {
              clearInterval(poll);
            }
          })
          .catch(() => {
            if (attempts >= 10) clearInterval(poll);
          });
      }, 2000);

      return () => clearInterval(poll);
    }
  }, [user]);

  const isPremium = subscription?.plan === 'premium' && subscription?.status === 'active';

  return (
    <AuthContext.Provider value={{ user, loading, supabase, subscription, isPremium, refreshSubscription: fetchSubscription }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
