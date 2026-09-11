"use client";
import { useEffect, useState } from 'react';
import { trackFunnel } from '@/lib/funnel';

/* Forty subscribers cancelled before this existed and not one reason was recorded. */
const CANCEL_REASONS = [
  ['not_using', "I'm not using it enough"],
  ['content_quality', 'The content or exercises were not good enough'],
  ['missing_content', "It doesn't cover what I need"],
  ['exams_over', 'My exams are over'],
  ['too_expensive', "It's too expensive"],
  ['technical', 'Something was broken or confusing'],
  ['other', 'Something else'],
];

/**
 * The cancel-save offer, shown to every subscriber who clicks "Cancel
 * subscription" — no eligibility gating, no reason survey.
 *
 * The reasoning is arithmetic: the average paying subscriber makes 3.33
 * payments before churning, netting about £4.80 after Stripe fees. A single
 * £6 charge nets £5.61. Anyone who takes this offer is worth more than an
 * average subscriber's entire remaining life, paid up front, with no renewal
 * risk — and the alternative on this screen is £0.
 *
 * Currency comes from the API because Stripe locks customer.currency on the
 * first invoice: customers who first paid in EUR can only ever be charged in
 * EUR, so they must be shown €6, not £6.
 */
export default function CancelOfferModal({ open, onClose, onDecline }) {
  const [terms, setTerms] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');

  function handleDecline() {
    if (!reason) return;
    trackFunnel('cancel_reason', { reason, comment: comment.trim().slice(0, 500) || null });
    onDecline?.();
  }

  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    fetch('/api/stripe/cancel-offer')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        // Fall back to GBP display rather than blocking the cancel path.
        setTerms(data?.available ? data : { display: '£6', normalDisplay: '£12' });
      })
      .catch(() => {
        if (!cancelled) setTerms({ display: '£6', normalDisplay: '£12' });
      });

    return () => { cancelled = true; };
  }, [open]);

  if (!open) return null;

  async function handleAccept() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/cancel-offer', { method: 'POST' });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body?.url) {
        setError(body?.error || 'Could not open checkout. Please try again.');
        setLoading(false);
        return;
      }
      window.location.href = body.url;
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  const price = terms?.display || '£6';
  const normal = terms?.normalDisplay || '£12';

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="cancel-offer-title">
      <div className="modal-box">
        <div className="cancel-offer-badge">Before you go</div>
        <h3 className="modal-title" id="cancel-offer-title">
          Keep everything, forever, for {price}
        </h3>
        <p className="modal-desc">
          Instead of cancelling, pay once and keep full access for good — every unit,
          every future update, no more monthly payments. That&apos;s half the normal{' '}
          {normal} lifetime price, and it&apos;s only on this screen.
        </p>

        <div className="cancel-offer-price">
          <span className="cancel-offer-price-now">{price}</span>
          <span className="cancel-offer-price-was">{normal}</span>
          <span className="cancel-offer-price-note">one payment · never billed again</span>
        </div>

        {error && <div className="settings-error">{error}</div>}

        <button className="modal-btn" onClick={handleAccept} disabled={loading}>
          {loading ? 'Opening checkout…' : `Get lifetime access — ${price}`}
        </button>

        <div className="cancel-reason">
          <label className="settings-label" htmlFor="cancel-reason-select">
            Before you cancel, what is the main reason?
          </label>
          <select
            id="cancel-reason-select"
            className="settings-input"
            value={reason}
            onChange={e => setReason(e.target.value)}
            disabled={loading}
            required
          >
            <option value="">Choose one…</option>
            {CANCEL_REASONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <input
            className="settings-input"
            type="text"
            placeholder="Anything else? (optional)"
            value={comment}
            onChange={e => setComment(e.target.value)}
            disabled={loading}
            maxLength={500}
          />
        </div>

        <button className="cancel-offer-decline" onClick={handleDecline} disabled={loading || !reason}
          title={reason ? undefined : 'Choose a reason first'}>
          No thanks, cancel my subscription
        </button>

        <button className="cancel-offer-back" onClick={onClose} disabled={loading}>
          Go back
        </button>
      </div>
    </div>
  );
}
