"use client";
import { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthButton() {
  const { user, loading, supabase } = useAuth();
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
      <Link href="/login" className="auth-signin-btn">
        Sign In
      </Link>
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
          <button className="auth-dropdown-item" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
