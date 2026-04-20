import { getStripe, getSubscriptionPeriodEnd } from '@/lib/stripe';
import { createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

/**
 * A Postgres/PostgREST error has a `code` like 'PGRST116' or '23505'.
 * These are permanent (schema/data/RLS) — retrying won't help.
 * Network/timeout errors typically have no code or a non-matching one.
 */
function isPermanentError(err) {
  if (!err?.code) return false;
  return /^PGRST\d+$/.test(err.code) || /^[0-9A-Z]{5}$/.test(err.code);
}

/**
 * Find our Supabase user_id for a Stripe customer. First tries the DB
 * (fast path), then falls back to fetching the Stripe customer and
 * reading metadata.supabase_user_id (which ensureStripeCustomer sets).
 *
 * This fixes the race where customer.subscription.{created,updated}
 * events arrive before checkout.session.completed has inserted the row.
 */
async function findUserIdByCustomer(supabase, stripe, customerId, logCtx) {
  const { data: row, error } = await supabase
    .from('user_subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', customerId)
    .maybeSingle();

  if (error) {
    console.error('[webhook:%s] user lookup failed', logCtx.eventType, {
      eventId: logCtx.eventId, customerId, code: error.code, message: error.message,
    });
    throw error;
  }
  if (row?.user_id) return row.user_id;

  // Fallback: ask Stripe for the customer and read metadata set during checkout.
  try {
    const customer = await stripe.customers.retrieve(customerId);
    if (customer.deleted) return null;
    const userId = customer.metadata?.supabase_user_id;
    if (userId) {
      console.warn('[webhook:%s] user_id recovered from Stripe metadata (race fallback)', logCtx.eventType, {
        eventId: logCtx.eventId, customerId, userId,
      });
      return userId;
    }
  } catch (err) {
    console.error('[webhook:%s] Stripe customer fetch failed during fallback', logCtx.eventType, {
      eventId: logCtx.eventId, customerId, message: err.message,
    });
    throw err; // transient — let Stripe retry
  }

  console.warn('[webhook:%s] no user_id found for customer (orphan event)', logCtx.eventType, {
    eventId: logCtx.eventId, customerId,
  });
  return null;
}

/**
 * Write premium-active subscription state for a user.
 */
async function writeActiveSubscription(supabase, { userId, customerId, subscription }, logCtx) {
  const periodEnd = getSubscriptionPeriodEnd(subscription);
  const trialEnd = subscription.trial_end
    ? new Date(subscription.trial_end * 1000).toISOString()
    : null;

  const { error } = await supabase
    .from('user_subscriptions')
    .upsert({
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      plan: 'premium',
      status: 'active',
      current_period_end: periodEnd,
      trial_end: trialEnd,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });

  if (error) {
    console.error('[webhook:%s] upsert(active) failed', logCtx.eventType, {
      eventId: logCtx.eventId, userId, customerId, code: error.code, message: error.message,
    });
    throw error;
  }

  console.log('[webhook:%s] upserted premium/active', logCtx.eventType, {
    eventId: logCtx.eventId, userId, customerId, subscriptionId: subscription.id, periodEnd,
  });
}

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET is not configured');
    // 500 so Stripe retries after we fix the env var.
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('[webhook] signature verification failed', { message: err.message });
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const logCtx = { eventId: event.id, eventType: event.type };
  const supabase = createServerClient();
  const stripe = getStripe();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.supabase_user_id;
        const subscriptionId = session.subscription;

        if (!userId || !subscriptionId) {
          console.warn('[webhook:%s] missing userId or subscriptionId', event.type, {
            eventId: event.id, hasUserId: !!userId, hasSubscriptionId: !!subscriptionId,
          });
          break;
        }

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        await writeActiveSubscription(supabase, {
          userId, customerId: session.customer, subscription,
        }, logCtx);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        const userId = await findUserIdByCustomer(supabase, stripe, customerId, logCtx);
        if (!userId) break; // already logged by findUserIdByCustomer

        const isActive = ['active', 'trialing'].includes(subscription.status);

        if (isActive) {
          await writeActiveSubscription(supabase, { userId, customerId, subscription }, logCtx);
        } else {
          const { error } = await supabase
            .from('user_subscriptions')
            .update({
              stripe_subscription_id: subscription.id,
              plan: 'free',
              status: 'cancelled',
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId);
          if (error) {
            console.error('[webhook:%s] update(inactive) failed', event.type, {
              eventId: event.id, userId, customerId, code: error.code, message: error.message,
            });
            throw error;
          }
          console.log('[webhook:%s] set free/cancelled (status=%s)', event.type, subscription.status, {
            eventId: event.id, userId, customerId,
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        const userId = await findUserIdByCustomer(supabase, stripe, customerId, logCtx);
        if (!userId) break;

        const { error } = await supabase
          .from('user_subscriptions')
          .update({
            status: 'cancelled',
            plan: 'free',
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        if (error) {
          console.error('[webhook:%s] update(deleted) failed', event.type, {
            eventId: event.id, userId, customerId, code: error.code, message: error.message,
          });
          throw error;
        }
        console.log('[webhook:%s] set free/cancelled (deleted)', event.type, {
          eventId: event.id, userId, customerId,
        });
        break;
      }

      case 'invoice.paid': {
        // Renewal resilience: each successful invoice reaffirms active status
        // and syncs the current_period_end. Safe no-op if already up to date.
        const invoice = event.data.object;
        const customerId = invoice.customer;
        const subscriptionId = invoice.subscription;

        if (!subscriptionId) {
          // One-off invoice (not a subscription renewal) — nothing to do.
          break;
        }

        const userId = await findUserIdByCustomer(supabase, stripe, customerId, logCtx);
        if (!userId) break;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        if (!['active', 'trialing'].includes(subscription.status)) {
          console.log('[webhook:%s] invoice paid but subscription not active (status=%s), skipping', event.type, subscription.status, {
            eventId: event.id, userId, customerId, subscriptionId,
          });
          break;
        }
        await writeActiveSubscription(supabase, { userId, customerId, subscription }, logCtx);
        break;
      }

      default:
        console.log('[webhook:%s] received, no handler (ignored)', event.type, { eventId: event.id });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    // Permanent errors (schema/RLS/malformed data): acknowledge with 200 so
    // Stripe stops retrying. Manual reconciliation via the recovery script
    // is better than a poison-pill event blocking the queue.
    if (isPermanentError(err)) {
      console.error('[webhook:%s] permanent error, acknowledging to stop retries', event.type, {
        eventId: event.id, code: err.code, message: err.message,
      });
      return NextResponse.json({ received: true, error: 'permanent-logged' }, { status: 200 });
    }
    // Transient errors: return 5xx so Stripe retries with backoff.
    console.error('[webhook:%s] transient error, will retry', event.type, {
      eventId: event.id, message: err.message, stack: err.stack,
    });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
