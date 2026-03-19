'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProgressDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSubject, setActiveSubject] = useState(0);

  useEffect(() => {
    fetch('/api/progress/dashboard')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load progress data');
        return res.json();
      })
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="lpd-container">
        <div className="lpd-loading">
          <div className="lpd-loading-spinner" />
          <p className="lpd-loading-text">Loading your progress...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lpd-container">
        <div className="lpd-error">
          <p>Could not load progress data. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { overall, bySubject, dailyActivity, streak, overdueCount, weakestTopics } = data;
  const currentSubject = bySubject[activeSubject];
  const maxDaily = Math.max(...(dailyActivity || []).map(d => d.count), 1);

  // Color helper for mastery percentage
  function masteryColor(pct) {
    if (pct >= 70) return 'var(--accent-green)';
    if (pct >= 40) return 'var(--accent-amber)';
    return 'var(--accent-red)';
  }

  return (
    <div className="lpd-container">
      {/* A. Hero stats row */}
      <div className="lpd-hero">
        <div className="lpd-stat-card">
          <div
            className="lpd-ring"
            style={{
              background: `conic-gradient(${masteryColor(overall.masteryPct)} ${overall.masteryPct * 3.6}deg, var(--border-primary) 0deg)`,
            }}
          >
            <div className="lpd-ring-mask">
              <span className="lpd-ring-pct" style={{ color: masteryColor(overall.masteryPct) }}>
                {overall.masteryPct}%
              </span>
            </div>
          </div>
          <div className="lpd-stat-label">Overall Mastery</div>
        </div>

        <div className="lpd-stat-card">
          <div className="lpd-stat-value lpd-streak-value">{streak}</div>
          <div className="lpd-stat-label">Day Streak</div>
        </div>

        <div className="lpd-stat-card">
          <div className="lpd-stat-value lpd-overdue-value">{overdueCount}</div>
          <div className="lpd-stat-label">Overdue Cards</div>
        </div>

        <div className="lpd-stat-card">
          <div className="lpd-stat-value">{data.recentActivity?.last7days || 0}</div>
          <div className="lpd-stat-label">Reviewed (7d)</div>
        </div>
      </div>

      {/* B. Subject tabs */}
      {bySubject.length > 1 && (
        <div className="lpd-tabs">
          {bySubject.map((sub, idx) => (
            <button
              key={sub.slug}
              className={`lpd-tab ${activeSubject === idx ? 'active' : ''}`}
              onClick={() => setActiveSubject(idx)}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {/* C. Topic mastery grid */}
      {currentSubject && currentSubject.units.map(unit => (
        <div className="lpd-unit-group" key={unit.number}>
          <div className="lpd-unit-title">Unit {unit.number}: {unit.title}</div>
          <div className="lpd-topic-grid">
            {unit.sections.map(sec => {
              const pct = sec.total > 0 ? Math.round((sec.mastered / sec.total) * 100) : 0;
              const fillColor = masteryColor(pct);
              return (
                <div className="lpd-topic-card" key={sec.id}>
                  <div className="lpd-topic-name">{sec.title}</div>
                  <div className="lpd-topic-bar">
                    <div
                      className="lpd-topic-fill"
                      style={{ width: `${pct}%`, background: fillColor }}
                    />
                  </div>
                  <div className="lpd-topic-label" style={{ color: fillColor }}>
                    {sec.mastered}/{sec.total} mastered
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* D. Weakest topics card */}
      {weakestTopics && weakestTopics.length > 0 && (
        <div className="lpd-weak">
          <div className="lpd-weak-title">Focus Areas</div>
          <div className="lpd-weak-list">
            {weakestTopics.map(topic => (
              <div className="lpd-weak-item" key={topic.sectionId}>
                <div className="lpd-weak-info">
                  <span className="lpd-weak-name">{topic.title}</span>
                  <span className="lpd-weak-accuracy">{topic.accuracy}% mastery</span>
                </div>
                <Link href={`/practice?section=${topic.sectionId}`} className="lpd-weak-link">
                  Practice Now &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* E. Activity chart */}
      {dailyActivity && dailyActivity.length > 0 && (
        <div className="lpd-activity">
          <div className="lpd-activity-title">Activity (Last 7 Days)</div>
          <div className="lpd-bars">
            {dailyActivity.map(day => (
              <div
                key={day.date}
                className="lpd-bar"
                style={{ height: `${Math.max((day.count / maxDaily) * 100, 4)}%` }}
                title={`${day.label}: ${day.count} questions`}
              />
            ))}
          </div>
          <div className="lpd-bar-labels">
            {dailyActivity.map(day => (
              <div key={day.date} className="lpd-bar-label">{day.label}</div>
            ))}
          </div>
        </div>
      )}

      {/* Overall summary footer */}
      <div className="lpd-summary-footer">
        <span className="lpd-summary-item lpd-summary-mastered">{overall.mastered} mastered</span>
        <span className="lpd-summary-sep">/</span>
        <span className="lpd-summary-item lpd-summary-learning">{overall.learning} learning</span>
        <span className="lpd-summary-sep">/</span>
        <span className="lpd-summary-item lpd-summary-new">{overall.new} new</span>
        <span className="lpd-summary-sep">/</span>
        <span className="lpd-summary-item">{overall.total} total questions</span>
      </div>
    </div>
  );
}
