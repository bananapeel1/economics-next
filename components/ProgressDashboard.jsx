'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProgressDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSubject, setActiveSubject] = useState(0);
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const [expandedUnits, setExpandedUnits] = useState(new Set([1])); // Unit 1 expanded by default

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
  const totalBank = overall.total || 1;

  function masteryColor(pct) {
    if (pct >= 70) return 'var(--accent-green)';
    if (pct >= 40) return '#f59e0b';
    return '#ef4444';
  }

  function statusBadge(mastered, learning, total) {
    if (total === 0) return { label: 'NEW', cls: 'lpd-badge-new' };
    const pct = Math.round((mastered / total) * 100);
    if (pct >= 70) return { label: 'MASTERED', cls: 'lpd-badge-mastered' };
    if (mastered > 0 || learning > 0) return { label: 'LEARNING', cls: 'lpd-badge-learning' };
    return { label: 'NEW', cls: 'lpd-badge-new' };
  }

  // Build ranked mastery data for bar chart
  const allSections = [];
  if (currentSubject) {
    for (const unit of currentSubject.units) {
      for (const sec of unit.sections) {
        const pct = sec.total > 0 ? Math.round((sec.mastered / sec.total) * 100) : 0;
        allSections.push({ ...sec, pct });
      }
    }
  }
  const rankedTopics = [...allSections].sort((a, b) => b.pct - a.pct);

  return (
    <div className="lpd-container">
      {/* A. Hero stats row */}
      <div className="lpd-hero">
        <div className="lpd-stat-card">
          <div className="lpd-ring-dot" style={{ background: masteryColor(overall.masteryPct) }} />
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
              <span className="lpd-ring-sub">MASTERY</span>
            </div>
          </div>
          <div className="lpd-stat-label">OVERALL MASTERY</div>
        </div>

        <div className="lpd-stat-card">
          <div className="lpd-stat-cap">DAY STREAK</div>
          <div className="lpd-stat-value lpd-streak-value">{streak}</div>
          <div className="lpd-stat-micro">
            {streak > 0 ? `days in a row 🔥` : 'Start today!'}
          </div>
          {streak > 0 && <div className="lpd-stat-hint">↑ Keep it going</div>}
        </div>

        <div className="lpd-stat-card">
          <div className="lpd-stat-cap">DUE FOR REVIEW</div>
          <div className="lpd-stat-value lpd-overdue-value">{overdueCount}</div>
          <div className="lpd-stat-micro">cards overdue</div>
          <div className="lpd-stat-hint" style={{ color: overdueCount === 0 ? 'var(--accent-green)' : '#f59e0b' }}>
            {overdueCount === 0 ? '✓ All caught up' : '→ Review now'}
          </div>
        </div>

        <div className="lpd-stat-card">
          <div className="lpd-stat-cap">REVIEWED</div>
          <div className="lpd-stat-value">{data.recentActivity?.last7days || 0}</div>
          <div className="lpd-stat-micro">of {totalBank} this week</div>
          <div className="lpd-stat-hint">{totalBank > 0 ? `${Math.round(((data.recentActivity?.last7days || 0) / totalBank) * 100)}% of bank` : ''}</div>
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

      {/* Mastery by Topic + Focus Areas side by side */}
      <div className="lpd-insights-row">
        {/* Mastery by Topic bar chart */}
        <div className="lpd-insight-card">
          <div className="lpd-insight-title">📊 Mastery by Topic</div>
          <div className="lpd-mastery-bars">
            {rankedTopics.length > 0 ? rankedTopics.map(sec => (
              <div className="lpd-mastery-row" key={sec.id}>
                <span className="lpd-mastery-name">{sec.title}</span>
                <div className="lpd-mastery-track">
                  <div className="lpd-mastery-fill" style={{ width: `${Math.max(sec.pct, 2)}%`, background: masteryColor(sec.pct) }} />
                </div>
                <span className="lpd-mastery-pct" style={{ color: masteryColor(sec.pct) }}>{sec.pct}%</span>
              </div>
            )) : (
              <div className="lpd-focus-empty">Select a subject above to see topic mastery.</div>
            )}
          </div>
        </div>

        {/* Focus Areas with Practice buttons */}
        <div className="lpd-insight-card">
          <div className="lpd-insight-title">🎯 Focus Areas</div>
          {weakestTopics && weakestTopics.length > 0 ? (
            <div className="lpd-focus-list">
              {weakestTopics.map(topic => (
                <div className="lpd-focus-item" key={topic.sectionId}>
                  <div className="lpd-focus-dot" style={{ background: masteryColor(topic.accuracy) }} />
                  <div className="lpd-focus-info">
                    <span className="lpd-focus-name">{topic.title}</span>
                    <span className="lpd-focus-sub">{topic.accuracy > 0 ? `${topic.accuracy}% mastery` : 'Not started'}</span>
                  </div>
                  <Link href={`/practice`} className="lpd-focus-btn">
                    Practice →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="lpd-focus-empty">No weak areas yet. Start practising!</div>
          )}
        </div>
      </div>

      {/* C. Topic mastery grid — collapsible units, Unit 1 expanded by default */}
      {currentSubject && currentSubject.units.map(unit => {
        const unitSections = unit.sections || [];
        const unitAvg = unitSections.length > 0
          ? Math.round(unitSections.reduce((s, sec) => s + (sec.total > 0 ? (sec.mastered / sec.total) * 100 : 0), 0) / unitSections.length)
          : 0;
        const isExpanded = expandedUnits.has(unit.number);

        return (
          <div className={`lpd-unit-group${isExpanded ? ' lpd-unit-group--open' : ''}`} key={unit.number}>
            <div
              className="lpd-unit-header"
              onClick={() => setExpandedUnits(prev => {
                const next = new Set(prev);
                if (next.has(unit.number)) next.delete(unit.number);
                else next.add(unit.number);
                return next;
              })}
              style={{ cursor: 'pointer' }}
            >
              <div className="lpd-unit-badge">{unit.number}</div>
              <span className="lpd-unit-title">{unit.title.toUpperCase()}</span>
              <span className="lpd-unit-avg" style={{ color: masteryColor(unitAvg) }}>{unitAvg}% avg</span>
              <span className={`lpd-unit-chevron${isExpanded ? ' lpd-unit-chevron--open' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
            <div className={`lpd-topic-grid-wrap${isExpanded ? ' lpd-topic-grid-wrap--open' : ''}`}>
              <div className="lpd-topic-grid">
                {unitSections.map(sec => {
                  const pct = sec.total > 0 ? Math.round((sec.mastered / sec.total) * 100) : 0;
                  const fillColor = masteryColor(pct);
                  const badge = statusBadge(sec.mastered, sec.learning, sec.total);
                  const isHovered = hoveredTopic === sec.id;

                  return (
                    <div
                      className="lpd-topic-card"
                      key={sec.id}
                      onMouseEnter={() => setHoveredTopic(sec.id)}
                      onMouseLeave={() => setHoveredTopic(null)}
                    >
                      <div className="lpd-topic-top">
                        <div className="lpd-topic-name">{sec.title}</div>
                        <span className={`lpd-badge ${badge.cls}`}>{badge.label}</span>
                      </div>
                      <div className="lpd-topic-bar">
                        <div className="lpd-topic-fill" style={{ width: `${pct}%`, background: fillColor }} />
                      </div>
                      <div className="lpd-topic-bottom">
                        <span className="lpd-topic-label" style={{ color: fillColor }}>{pct}%</span>
                        <span className="lpd-topic-count">{sec.mastered} / {sec.total} mastered</span>
                      </div>

                      {/* Hover tooltip */}
                      {isHovered && (
                        <div className="lpd-tooltip">
                          <div className="lpd-tooltip-title">{sec.title}</div>
                          <div className="lpd-tooltip-row"><span>Mastered</span><span>{sec.mastered}</span></div>
                          <div className="lpd-tooltip-row"><span>Total</span><span>{sec.total}</span></div>
                          {sec.lastReviewed && <div className="lpd-tooltip-row"><span>Last reviewed</span><span>{sec.lastReviewed}</span></div>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

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

      {/* Footer */}
      <div className="lpd-summary-footer">
        <span className="lpd-summary-item lpd-summary-mastered">{overall.mastered} mastered</span>
        <span className="lpd-summary-sep">/</span>
        <span className="lpd-summary-item lpd-summary-learning">{overall.learning} learning</span>
        <span className="lpd-summary-sep">/</span>
        <span className="lpd-summary-item lpd-summary-new">{overall.new} new</span>
        <span className="lpd-summary-sep">/</span>
        <span className="lpd-summary-item">{overall.total} total</span>
      </div>
    </div>
  );
}
