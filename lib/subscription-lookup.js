/**
 * One safe way to read a user's subscription row on the server.
 *
 * Every AI route used `.select(...).eq('user_id', id).single()`. PostgREST's `single()` errors
 * unless exactly one row comes back, and each caller destructured `{ data: sub }` while ignoring
 * the error — so both the no-row case and the more-than-one-row case collapsed to `sub = null`,
 * which `hasPremiumAccess` reads as free.
 *
 * The no-row case is correct by accident: a user who never subscribed is free. The duplicate case
 * is not: a user holding a cancelled row and an active row is a PAYING customer being refused the
 * feature they pay for. There are no duplicates in the table today (66 rows, 66 users), so this is
 * latent rather than live, but the shapes that produce duplicates are ordinary — a resubscribe
 * after cancelling, a lifetime purchase on top of a lapsed monthly, a webhook replay.
 *
 * This helper prefers an active row, then the most recently created one, and never throws.
 */
export async function getSubscriptionRow(supabase, userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('user_subscriptions')
    .select('plan, status, current_period_end, created_at, stripe_subscription_id')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    // Fail closed on access, loud in the log. Treating a lookup failure as "free" is the same
    // behaviour the old code had, but silently; at least say so.
    console.error('[subscription-lookup] read failed for user', userId, error.message);
    return null;
  }
  if (!data || data.length === 0) return null;

  // An active row wins regardless of age: a resubscribe leaves the cancelled row in place, and
  // created_at order alone would hand back whichever the database happened to write last.
  return data.find((row) => row.status === 'active') ?? data[0];
}
