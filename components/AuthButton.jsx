"use client";
import { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useTheme } from './ThemeProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
          <button className="auth-dropdown-item" onClick={() => { toggleTheme(); }}>
            <span style={{ marginRight: 8 }}>{theme === 'dark' ? '☀️' : '🌙'}</span>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <div className="auth-dropdown-divider" />
          <Link href="/settings" className="auth-dropdown-item" onClick={() => setMenuOpen(false)}>
            <span style={{ marginRight: 8 }}>⚙️</span>
            Settings
          </Link>
          <Link href="/contact" className="auth-dropdown-item" onClick={() => setMenuOpen(false)}>
            <span style={{ marginRight: 8 }}>📧</span>
            Contact
          </Link>
          <a
            href="https://instagram.com/revvylearn"
            target="_blank"
            rel="noopener noreferrer"
            className="auth-dropdown-item"
            onClick={() => setMenuOpen(false)}
          >
            <span style={{ marginRight: 8 }}>📸</span>
            Instagram
          </a>
          <div className="auth-dropdown-divider" />
          <button className="auth-dropdown-item" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
