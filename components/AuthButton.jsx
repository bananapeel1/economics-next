"use client";
import { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useTheme } from './ThemeProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProgressChart, BoltIcon, CardClub } from './Icons';

/* Inline SVG mini-icons for dropdown items */
const StarIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const SunIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const MoonIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const GearIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const MailIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const CameraIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const LogOutIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;

export default function AuthButton() {
  const { user, loading, supabase, isPremium } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) return null;

  if (!user) {
    return (
      <div className="auth-actions-row">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <Link href="/login" className="auth-signin-btn">
          Sign In
        </Link>
      </div>
    );
  }

  const initial = user.email?.[0]?.toUpperCase() || '?';
  const avatarUrl = user.user_metadata?.avatar_url;

  async function handleSignOut() {
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.refresh();
  }

  return (
    <div className="auth-user-menu" ref={menuRef}>
      <button className="auth-avatar-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="auth-avatar-img" />
        ) : (
          <span className="auth-avatar-letter">{initial}</span>
        )}
      </button>
      {menuOpen && (
        <div className="auth-dropdown">
          <div className="auth-dropdown-email">{user.email}</div>
          <div className="auth-dropdown-plan">
            <span className={`auth-plan-badge ${isPremium ? 'premium' : 'free'}`}>
              {isPremium ? '⭐ Pro' : 'Free'}
            </span>
          </div>
          {!isPremium && (
            <Link href="/upgrade" className="auth-dropdown-item auth-dropdown-upgrade" onClick={() => setMenuOpen(false)}>
              <span className="auth-dropdown-icon"><StarIcon /></span>
              Upgrade to Pro
            </Link>
          )}
          {isPremium && (
            <Link href="/upgrade" className="auth-dropdown-item" onClick={() => setMenuOpen(false)}>
              <span className="auth-dropdown-icon"><StarIcon /></span>
              Your Plan
            </Link>
          )}
          <Link href="/progress" className="auth-dropdown-item" onClick={() => setMenuOpen(false)}>
            <span className="auth-dropdown-icon"><ProgressChart size={16} /></span>
            Learning Progress
          </Link>
          <button className="auth-dropdown-item" onClick={() => { toggleTheme(); }}>
            <span className="auth-dropdown-icon">{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</span>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <div className="auth-dropdown-divider" />
          <Link href="/settings" className="auth-dropdown-item" onClick={() => setMenuOpen(false)}>
            <span className="auth-dropdown-icon"><GearIcon /></span>
            Settings
          </Link>
          <Link href="/fun" className="auth-dropdown-item" onClick={() => setMenuOpen(false)}>
            <span className="auth-dropdown-icon"><CardClub size={16} /></span>
            Blackjack
          </Link>
          <Link href="/contact" className="auth-dropdown-item" onClick={() => setMenuOpen(false)}>
            <span className="auth-dropdown-icon"><MailIcon /></span>
            Contact
          </Link>
          <a
            href="https://instagram.com/revvylearn"
            target="_blank"
            rel="noopener noreferrer"
            className="auth-dropdown-item"
            onClick={() => setMenuOpen(false)}
          >
            <span className="auth-dropdown-icon"><CameraIcon /></span>
            Instagram
          </a>
          <div className="auth-dropdown-divider" />
          <button className="auth-dropdown-item" onClick={handleSignOut}>
            <span className="auth-dropdown-icon"><LogOutIcon /></span>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
