"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const AuthContext = createContext({
  user: null,
  loading: true,
  supabase: null,
  subscription: null,
  isPremium: false,
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

  // Fetch subscription status when user changes
  useEffect(() => {
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

  const isPremium = subscription?.plan === 'premium' && subscription?.status === 'active';

  return (
    <AuthContext.Provider value={{ user, loading, supabase, subscription, isPremium }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
