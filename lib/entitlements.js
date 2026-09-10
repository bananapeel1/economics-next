/**
 * Single source of truth for "does this user have paid access?".
 *
 * Two plans grant access:
 *   'premium'  — an active recurring subscription (expires, renews, can lapse)
 *   'lifetime' — a one-time purchase (never expires, has no Stripe subscription)
 *
 * The distinction matters because lifetime users have NO active Stripe
 * subscription. Any reconciliation that downgrades users without one would
 * strip their access — always check isLifetime() before downgrading.
 */

export const PLAN_FREE = 'free';
export const PLAN_PREMIUM = 'premium';
export const PLAN_LIFETIME = 'lifetime';

/** True if the user has paid access of any kind. */
export function hasPremiumAccess(sub) {
  if (!sub) return false;
  if (sub.status !== 'active') return false;
  return sub.plan === PLAN_PREMIUM || sub.plan === PLAN_LIFETIME;
}

/** True if the user bought lifetime. Never downgrade these users. */
export function isLifetime(sub) {
  return sub?.plan === PLAN_LIFETIME && sub?.status === 'active';
}

/** True if access comes from a recurring subscription that can lapse. */
export function isRecurring(sub) {
  return sub?.plan === PLAN_PREMIUM && sub?.status === 'active';
}
