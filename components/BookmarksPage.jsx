"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookmarks')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setBookmarks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="resource-empty">Loading bookmarks...</div>;
  }

  if (bookmarks.length === 0) {
    return (
      <div className="resource-empty">
        <div style={{ fontSize: 36, marginBottom: 12 }}>🔖</div>
        <div style={{ fontWeight: 600, color: '#e8ecf5', marginBottom: 6 }}>No bookmarks yet</div>
        <div>Click the bookmark icon on any section to save it here for quick access.</div>
      </div>
    );
  }

  return (
    <div className="bookmarks-list">
      {bookmarks.map(b => {
        const section = b.sections;
        if (!section) return null;
        const unit = section.units;
        return (
          <Link
            key={b.section_id}
            href={`/?section=${b.section_id}`}
            className="bookmark-item"
          >
            <div className="bookmark-item-number">{section.number}</div>
            <div className="bookmark-item-info">
              <div className="bookmark-item-title">{section.title}</div>
              {unit && (
                <div className="bookmark-item-unit">Unit {unit.number}: {unit.title}</div>
              )}
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#6b7a99', flexShrink: 0 }}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        );
      })}
    </div>
  );
}
