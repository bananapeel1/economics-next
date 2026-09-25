"use client";
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { isTrialEligible } from '@/lib/trial-eligibility';
import { hasPremiumAccess } from '@/lib/entitlements';
import { createClient } from '@/lib/supabase/client';

const AuthContext = createContext({
  user: null,
  loading: true,
  supabase: null,
  subscription: null,
  trialEligible: true,
  isPremium: false,
  entitlementKnown: false,
  activating: false,
  activationFailed: false,
  refreshSubscription: () => {},
});

// Post-checkout polling: how often and how long to wait before giving up.
// Previous values (10×2s = 20s) gave up before slow webhook reconciliation
// could complete. 30×2s = 60s matches realistic Stripe→webhook latency.
const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 30;

/*
 * V009. `initialUser` / `initialSubscription` used to be seeded by the ROOT layout, which made every
 * route in the app dynamic and cost the whole branch its prerendering. They are still accepted — a
 * segment that is dynamic anyway may seed them — but nothing passes them today, so on a prerendered
 * page this provider starts knowing NOTHING, and the difference between "free" and "not known yet"
 * becomes load-bearing.
 *
 * `isPremium` alone cannot carry it: `false` is both answers. `entitlementKnown` is the second bit.
 * Until it is true, no surface may draw a padlock, a paywall, an upgrade CTA or a plan badge —
 * F035's defect was exactly a false "locked" shown to somebody who pays, and a prerendered document
 * cannot answer the question in its HTML. Say nothing until you know.
 */
export function AuthProvider({ children, initialUser, initialSubscription = null }) {
  const [user, setUser] = useState(initialUser || null);
  const [loading, setLoading] = useState(!initialUser);
  const [subscription, setSubscription] = useState(initialSubscription);
  /*
   * WHICH student the current subscription answer belongs to: a user id, `null` for "nobody is
   * signed in, and that is a settled answer", `undefined` for "nothing has come back yet".
   *
   * A bare boolean is not enough, and the frame it loses is the one that matters. `setUser` and
   * `setLoading(false)` land in the SAME commit when auth settles, while the effect that refetches
   * the subscription runs after it — so for one render a signed-in student would carry
   * `loading:false` beside the mount run's "settled: nobody is signed in", and every padlock in
   * the app would draw. Comparing against the user id cannot produce that frame.
   */
  const [settledFor, setSettledFor] = useState(
    initialSubscription !== null ? (initialUser?.id ?? null) : undefined
  );
  // F031: "we could not find out" is not the same fact as "there is no subscription", and only one
  // of them means the student is entitled to the intro price.
  const [lookupFailed, setLookupFailed] = useState(false);
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
      // Nobody is signed in, so there is nothing to look up and the answer is already known.
      setSettledFor(null);
      return;
    }
    const forUser = user.id;
    setSettledFor(undefined);
    fetch('/api/subscription')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) { setSubscription(data); setLookupFailed(false); }
        else setLookupFailed(true);
      })
      .catch(() => { setSubscription(null); setLookupFailed(true); })
      // Settled means ANSWERED, not "answered yes". A failed lookup is a known state too — it is
      // the one `lookupFailed` already prices below — and leaving it unsettled would hang every
      // gated surface on screen for the rest of the visit.
      .finally(() => { setSettledFor(forUser); });
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
          if (data && hasPremiumAccess(data)) {
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

  const isPremium = hasPremiumAccess(subscription);
  /*
   * V009. True once this visit can make a TRUE statement about entitlement: auth has settled, and
   * either nobody is signed in or their subscription lookup has come back. Consumers that draw a
   * lock test `entitlementKnown && !isPremium`, never `!isPremium` on its own — see the call sites
   * in StudyApp, AnimatedTabBar, PaywallOverlay, SettingsPage and UpgradeButton.
   */
  const entitlementKnown = !loading && settledFor === (user?.id ?? null);
  // F031: whether the "£1 first month" offer applies to this account.
  //
  // Read from the payload, not recomputed here. `/api/subscription` decides it against the
  // database row and puts `trialEligible` on every response; `isTrialEligible` returns that
  // verbatim when it is present. The earlier version of this line asked the payload for a column
  // the payload has never carried, so it answered "eligible" for everybody, including the 43
  // accounts with a cancelled subscription who are then charged £1.99 at the till.
  //
  // Signed in with no row is a positive fact — nobody has a row until they check out — so that is
  // genuinely eligible. A FAILED lookup is not that fact, and the previous line treated the two
  // identically: a returning subscriber whose lookup errored was shown £1 and charged £1.99.
  // When we cannot tell, we quote the price we know we will honour.
  const trialEligible = lookupFailed ? false : subscription ? isTrialEligible(subscription) : true;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        supabase,
        subscription,
        trialEligible,
        isPremium,
        entitlementKnown,
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
