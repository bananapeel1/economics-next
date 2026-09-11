"use client";
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { isLifetime } from '@/lib/entitlements';
import CancelOfferModal from './CancelOfferModal';

export default function SettingsPage() {
  const { user, subscription, isPremium, supabase } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [lifetimeLoading, setLifetimeLoading] = useState(false);
  const [showCancelOffer, setShowCancelOffer] = useState(false);

  const hasLifetime = isLifetime(subscription);

  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : '';

  const periodEnd = subscription?.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : '';

  const isOnTrial = isPremium && subscription?.trialEnd
    && new Date(subscription.trialEnd) > new Date();

  const trialEndDate = subscription?.trialEnd
    ? new Date(subscription.trialEnd).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : '';

  async function handleChangePassword(e) {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setPasswordLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordLoading(false);

    if (error) {
      setPasswordError(error.message);
    } else {
      setPasswordSuccess('Password updated successfully.');
      setNewPassword('');
      setConfirmPassword('');
    }
  }

  async function handleManageSubscription() {
    setPortalLoading(true);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        alert(body?.error || 'Could not open subscription portal.');
        setPortalLoading(false);
        return;
      }
      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        alert('Could not open subscription portal.');
        setPortalLoading(false);
      }
    } catch {
      alert('Network error. Please try again.');
      setPortalLoading(false);
    }
  }

  async function handleUpgrade(plan = 'monthly') {
    const setLoading = plan === 'lifetime' ? setLifetimeLoading : setUpgradeLoading;
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        alert(body?.error || 'Could not create checkout session.');
        setLoading(false);
        return;
      }
      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        alert('Could not create checkout session.');
        setLoading(false);
      }
    } catch {
      alert('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="settings-content">
      {/* Account Info */}
      <div className="settings-section">
        <h2 className="settings-section-title">Account</h2>
        <div className="settings-info-row">
          <span className="settings-info-label">Email</span>
          <span className="settings-info-value">{user?.email}</span>
        </div>
        <div className="settings-info-row">
          <span className="settings-info-label">Joined</span>
          <span className="settings-info-value">{joinedDate}</span>
        </div>
      </div>

      {/* Subscription */}
      <div className="settings-section">
        <h2 className="settings-section-title">Subscription</h2>
        {hasLifetime ? (
          <>
            <div className="settings-info-row">
              <span className="settings-info-label">Plan</span>
              <span className="settings-plan-badge premium">Lifetime</span>
            </div>
            <p className="settings-upgrade-hint">
              You have permanent access to everything. There&apos;s nothing to renew
              and you won&apos;t be billed again.
            </p>
          </>
        ) : isPremium ? (
          <>
            <div className="settings-info-row">
              <span className="settings-info-label">Plan</span>
              <span className="settings-plan-badge premium">
                {isOnTrial ? 'Pro (Trial)' : 'Pro'}
              </span>
            </div>
            {isOnTrial && trialEndDate ? (
              <div className="settings-info-row">
                <span className="settings-info-label">Trial ends</span>
                <span className="settings-info-value">{trialEndDate}</span>
              </div>
            ) : periodEnd ? (
              <div className="settings-info-row">
                <span className="settings-info-label">Renews</span>
                <span className="settings-info-value">{periodEnd}</span>
              </div>
            ) : null}
            <button
              className="settings-btn secondary"
              onClick={handleManageSubscription}
              disabled={portalLoading}
            >
              {portalLoading ? 'Loading...' : 'Manage Subscription'}
            </button>
            <button
              className="settings-btn secondary"
              onClick={() => setShowCancelOffer(true)}
              disabled={portalLoading}
            >
              Cancel Subscription
            </button>
          </>
        ) : (
          <>
            <div className="settings-info-row">
              <span className="settings-info-label">Plan</span>
              <span className="settings-plan-badge free">Free</span>
            </div>
            <p className="settings-upgrade-hint">
              Unlock Flashcards, Quizzes, AI Tutor and more with Pro.
            </p>
            <button
              className="settings-btn primary"
              onClick={() => handleUpgrade('monthly')}
              disabled={upgradeLoading || lifetimeLoading}
            >
              {upgradeLoading ? 'Loading...' : 'Get Pro — £1 first month, then £1.99/mo'}
            </button>
            <button
              className="settings-btn secondary"
              onClick={() => handleUpgrade('lifetime')}
              disabled={upgradeLoading || lifetimeLoading}
            >
              {lifetimeLoading ? 'Loading...' : 'Or pay once — £12 for lifetime access'}
            </button>
            <p className="settings-currency-note">Prices in GBP &mdash; you&rsquo;ll be charged in your local currency at checkout.</p>
          </>
        )}
      </div>

      <CancelOfferModal
        open={showCancelOffer}
        onClose={() => setShowCancelOffer(false)}
        onDecline={() => {
          setShowCancelOffer(false);
          handleManageSubscription();
        }}
      />

      {/* Change Password */}
      <div className="settings-section">
        <h2 className="settings-section-title">Change Password</h2>
        <form onSubmit={handleChangePassword}>
          {passwordError && <div className="settings-error">{passwordError}</div>}
          {passwordSuccess && <div className="settings-success">{passwordSuccess}</div>}
          <label className="settings-label">New Password</label>
          <input
            className="settings-input"
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            minLength={6}
            required
          />
          <label className="settings-label">Confirm Password</label>
          <input
            className="settings-input"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            minLength={6}
            required
          />
          <button
            className="settings-btn primary"
            type="submit"
            disabled={passwordLoading}
          >
            {passwordLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
