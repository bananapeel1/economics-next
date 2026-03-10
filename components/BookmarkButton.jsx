"use client";
import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';

export default function BookmarkButton({ sectionId }) {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !sectionId) {
      setBookmarked(false);
      return;
    }

    // Check if this section is bookmarked
    fetch('/api/bookmarks')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        const isBookmarked = data.some(b => b.section_id === sectionId);
        setBookmarked(isBookmarked);
      })
      .catch(() => {});
  }, [user, sectionId]);

  if (!user) return null;

  async function toggle() {
    if (loading) return;
    setLoading(true);
    try {
      if (bookmarked) {
        await fetch('/api/bookmarks', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sectionId }),
        });
        setBookmarked(false);
      } else {
        await fetch('/api/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sectionId }),
        });
        setBookmarked(true);
      }
    } catch (err) {
      console.warn('Bookmark toggle failed', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className={`bookmark-btn ${bookmarked ? 'active' : ''}`}
      onClick={toggle}
      disabled={loading}
      title={bookmarked ? 'Remove bookmark' : 'Bookmark this section'}
    >
      {bookmarked ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 2h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L12 18.03l-7.234 4.536A.5.5 0 014 22.143V3a1 1 0 011-1z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 2h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L12 18.03l-7.234 4.536A.5.5 0 014 22.143V3a1 1 0 011-1z" />
        </svg>
      )}
    </button>
  );
}
