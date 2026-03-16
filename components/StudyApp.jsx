"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './AuthProvider';
import Sidebar from './Sidebar';
import ContentTab from './ContentTab';
import NotesTab from './NotesTab';
import DiagramsTab from './DiagramsTab';
import FlashcardsTab from './FlashcardsTab';
import QuizTab from './QuizTab';
import TutorTab from './TutorTab';
import MistakesTab from './MistakesTab';
import AuthButton from './AuthButton';
import GlossaryTooltip from './GlossaryTooltip';
import PracticeQuestionsTab from './PracticeQuestionsTab';
import ExtrasTab from './ExtrasTab';
import PaywallOverlay from './PaywallOverlay';
import AnimatedTabBar from './AnimatedTabBar';
import LearnModeTab from './LearnModeTab';
import { SpacedReview, MixedReview, countDueReviews, getDueReviews } from './ReviewMode';
import { BookAlt, Notes as NotesIcon, ChartHistogram, DrawerAlt, CardsBlank, Quiz as QuizIcon, Mistakes as MistakesIcon, Tutor as TutorIcon, Star, Padlock, LearnMode as LearnModeIcon } from './Icons';

const FREE_TABS = new Set(['learn-mode', 'content', 'notes', 'diagrams', 'practice']); // content kept for sidebar access
const PREVIEW_TABS = new Set(['flashcards', 'quiz', 'extras']); // Show preview then full paywall card (signed-in only)
const PREMIUM_TABS = new Set(['mistakes', 'tutor']); // Full paywall block (no preview)

const allTabs = [
  { id: 'learn-mode', label: 'Learn', Icon: LearnModeIcon },
  { id: 'notes', label: 'Notes', Icon: NotesIcon },
  { id: 'diagrams', label: 'Diagrams', Icon: ChartHistogram, subjects: ['economics'] },
  { id: 'practice', label: 'Practice', Icon: DrawerAlt },
  { id: 'flashcards', label: 'Flashcards', Icon: CardsBlank, premium: true },
  { id: 'quiz', label: 'Quiz', Icon: QuizIcon, premium: true },
  { id: 'mistakes', label: 'Mistakes', Icon: MistakesIcon, premium: true, subjects: ['business'] },
  { id: 'tutor', label: 'Tutor', Icon: TutorIcon, premium: true },
  { id: 'extras', label: 'Extras', Icon: Star, premium: true },
];

/* ── Section Overview (Dashboard Launchpad) ── */
function SectionOverview({ section, unit, sectionData, tabs, onTabSelect, isPremium, user, savedProgress }) {
  const contentSteps = sectionData?.content?.length || 0;
  const notesSections = sectionData?.notes?.length || 0;
  const diagramCount = sectionData?.diagrams?.length || 0;
  const practiceCount = sectionData?.practice?.length || 0;
  const flashcardCount = sectionData?.flashcards?.length || 0;
  const quizCount = sectionData?.quiz?.length || 0;
  const hasDiagrams = tabs.some(t => t.id === 'diagrams');

  const progress = user && savedProgress ? savedProgress[section?.id] : null;
  const progressPct = progress
    ? Math.round(((progress.furthest_step + 1) / progress.total_steps) * 100)
    : 0;
  const hasProgress = !!progress;

  return (
    <div className="section-overview">
      <div className="overview-header">
        <div className="overview-unit-badge">Unit {unit?.number}: {unit?.title}</div>
        <h2 className="overview-title">{section?.title}</h2>
      </div>

      {/* ── Learn Mode Hero Card ── */}
      <button className="overview-hero" onClick={() => onTabSelect('learn-mode')}>
        <div className="overview-hero-left">
          <div className="overview-hero-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div className="overview-hero-info">
            <div className="overview-hero-label">RECOMMENDED &middot; START HERE</div>
            <div className="overview-hero-name">Learn Mode</div>
            <div className="overview-hero-meta">
              <span className="overview-hero-free">&#10003; Free</span>
              {contentSteps} steps
            </div>
            {hasProgress && (
              <div className="overview-hero-progress">
                <div className="overview-hero-progress-bar">
                  <div className="overview-hero-progress-fill" style={{ width: `${progressPct}%` }} />
                </div>
                <span className="overview-hero-progress-text">{progressPct}%</span>
              </div>
            )}
          </div>
        </div>
        <span className="overview-hero-btn">
          {hasProgress ? 'Continue learning \u2192' : 'Start learning \u2192'}
        </span>
      </button>

      {/* ── Free Resources ── */}
      <div className="overview-category">
        <div className="overview-category-header">
          <span className="overview-category-line" />
          <span className="overview-category-label">FREE RESOURCES</span>
          <span className="overview-category-line" />
        </div>
        <div className={`overview-grid ${hasDiagrams ? 'overview-grid-3' : 'overview-grid-2'}`}>
          <button className="overview-card" onClick={() => onTabSelect('notes')}>
            <span className="overview-card-icon"><NotesIcon size={24} /></span>
            <span className="overview-card-label">Content</span>
            <span className="overview-card-count">{notesSections || contentSteps} sections</span>
          </button>
          {hasDiagrams && (
            <button className={`overview-card ${diagramCount === 0 ? 'dimmed' : ''}`} onClick={() => onTabSelect('diagrams')}>
              <span className="overview-card-icon"><ChartHistogram size={24} /></span>
              <span className="overview-card-label">Diagrams</span>
              <span className="overview-card-count">{diagramCount > 0 ? 'All annotated' : 'Coming soon'}</span>
            </button>
          )}
          <button className={`overview-card ${practiceCount === 0 ? 'dimmed' : ''}`} onClick={() => onTabSelect('practice')}>
            <span className="overview-card-icon"><DrawerAlt size={24} /></span>
            <span className="overview-card-label">Practice</span>
            <span className="overview-card-count">{practiceCount} questions</span>
          </button>
        </div>
      </div>

      {/* ── Exam Resources ── */}
      <div className="overview-category">
        <div className="overview-category-header">
          <span className="overview-category-line" />
          <span className="overview-category-label">EXAM RESOURCES</span>
          <span className="overview-category-line" />
        </div>
        <div className="overview-grid overview-grid-2">
          <button className="overview-card overview-card-exam" onClick={() => { window.location.href = '/model-answers'; }}>
            <span className="overview-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </span>
            <span className="overview-card-label">Model Answers</span>
            <span className="overview-card-count">Examiner-level worked answers</span>
          </button>
          <button className="overview-card overview-card-exam" onClick={() => { window.location.href = '/topic-links'; }}>
            <span className="overview-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </span>
            <span className="overview-card-label">Topic Links</span>
            <span className="overview-card-count">How topics connect across units</span>
          </button>
        </div>
      </div>

      {/* ── Premium ── */}
      <div className="overview-category">
        <div className="overview-category-header">
          <span className="overview-category-line" />
          <span className="overview-category-label">{isPremium ? 'PREMIUM' : 'PREMIUM \u2014 3-DAY FREE TRIAL'}</span>
          <span className="overview-category-line" />
        </div>
        <div className="overview-grid overview-grid-3">
          <button className="overview-card overview-card-premium" onClick={() => onTabSelect('flashcards')}>
            {!isPremium && <span className="overview-card-lock"><Padlock size={12} /></span>}
            <span className="overview-card-icon"><CardsBlank size={24} /></span>
            <span className="overview-card-label">Flashcards</span>
            <span className="overview-card-count">{flashcardCount} cards</span>
          </button>
          <button className="overview-card overview-card-premium" onClick={() => onTabSelect('quiz')}>
            {!isPremium && <span className="overview-card-lock"><Padlock size={12} /></span>}
            <span className="overview-card-icon"><QuizIcon size={24} /></span>
            <span className="overview-card-label">Quiz</span>
            <span className="overview-card-count">{quizCount} questions</span>
          </button>
          <button className="overview-card overview-card-premium" onClick={() => onTabSelect('tutor')}>
            {!isPremium && <span className="overview-card-lock"><Padlock size={12} /></span>}
            <span className="overview-card-icon"><TutorIcon size={24} /></span>
            <span className="overview-card-label">AI Tutor</span>
            <span className="overview-card-count">Ask anything</span>
          </button>
        </div>
      </div>

      {/* ── Premium CTA Bar ── */}
      {!isPremium && (
        <div className="overview-cta-bar">
          <span className="overview-cta-icon">&#9889;</span>
          <span className="overview-cta-text">
            Unlock Flashcards, Quiz &amp; AI Tutor &mdash; <strong>3 days free</strong>, then &euro;0.99/month
          </span>
          <span className="overview-cta-cancel">Cancel anytime</span>
          <button className="overview-cta-btn" onClick={(e) => { e.stopPropagation(); window.location.href = '/upgrade'; }}>
            Try free &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

export default function StudyApp({ subjects, sections, units, initialSectionData, initialSectionId }) {
  const { user, isPremium } = useAuth();

  // Subject state — restore last-visited subject if available
  const savedSubjectId = typeof window !== 'undefined'
    ? localStorage.getItem('last-visited-subject')
    : null;
  const initialSubjectId = (savedSubjectId && subjects.some(s => s.id === savedSubjectId))
    ? savedSubjectId
    : (subjects[0]?.id || null);
  const [activeSubjectId, setActiveSubjectId] = useState(initialSubjectId);
  const activeSubject = subjects.find(s => s.id === activeSubjectId) || subjects[0];

  // Filter tabs by active subject slug
  const tabs = allTabs.filter(tab => !tab.subjects || tab.subjects.includes(activeSubject?.slug));

  // Filter units and sections by active subject
  const subjectUnits = units.filter(u => u.subject_id === activeSubjectId);
  const subjectSectionIds = new Set(sections.filter(s => subjectUnits.some(u => u.id === s.unit_id)).map(s => s.id));
  const subjectSections = sections.filter(s => subjectSectionIds.has(s.id));

  // Determine starting section: URL param > localStorage last-visited > initial > first
  const urlSection = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('section')
    : null;
  const lastVisited = typeof window !== 'undefined'
    ? localStorage.getItem('last-visited-section')
    : null;
  const startSection = (urlSection && subjectSections.some(s => s.id === urlSection))
    ? urlSection
    : (lastVisited && subjectSections.some(s => s.id === lastVisited))
      ? lastVisited
      : (initialSectionId || subjectSections[0]?.id);

  const [activeSection, setActiveSection] = useState(startSection);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Feature discovery badges — track which features the user has visited
  const [visitedFeatures, setVisitedFeatures] = useState(() => {
    if (typeof window === 'undefined') return {};
    try { return JSON.parse(localStorage.getItem('visited-features') || '{}'); }
    catch { return {}; }
  });

  function markFeatureVisited(featureId) {
    setVisitedFeatures(prev => {
      const next = { ...prev, [featureId]: true };
      localStorage.setItem('visited-features', JSON.stringify(next));
      return next;
    });
  }

  function handleTabSelect(tabId) {
    setActiveTab(tabId);
    if (!visitedFeatures[`tab-${tabId}`]) {
      markFeatureVisited(`tab-${tabId}`);
    }
    // Learn Mode: mark as seen on first click
    if (tabId === 'learn-mode' && typeof window !== 'undefined') {
      localStorage.setItem('revvy_learnmode_seen', 'true');
    }
  }
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sectionData, setSectionData] = useState(initialSectionData);
  const [isInitial, setIsInitial] = useState(true);
  const [glossaryTerms, setGlossaryTerms] = useState([]);
  const [contentStepInfo, setContentStepInfo] = useState(null);
  const [pendingTutorPrompt, setPendingTutorPrompt] = useState(null);

  // Learn Mode state — current step persisted to localStorage
  const [learnModeSection, setLearnModeSection] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem(`revvy_learnmode_${activeSubjectId}_${activeSection}_section`);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [learnModeResuming, setLearnModeResuming] = useState(false);

  // Learn Mode completions — scan localStorage on mount
  const [learnModeCompletions, setLearnModeCompletions] = useState(() => {
    if (typeof window === 'undefined') return {};
    const completions = {};
    subjectSections.forEach(s => {
      if (localStorage.getItem(`revvy_complete_${activeSubjectId}_${s.id}`) === 'true') {
        completions[s.id] = true;
      }
    });
    return completions;
  });

  // Review mode state
  const [dueReviewCount, setDueReviewCount] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return countDueReviews();
  });
  const [activeReview, setActiveReview] = useState(null); // null | { type: 'spaced', entry } | { type: 'mixed' }

  function refreshDueReviews() {
    setDueReviewCount(countDueReviews());
  }

  // Check due reviews on mount and when tab changes
  useEffect(() => {
    refreshDueReviews();
  }, [activeTab]);

  function handleStartReview() {
    const due = getDueReviews();
    if (due.length > 0) {
      setActiveReview({ type: 'spaced', entry: due[0] });
    }
  }

  function handleStartMixedReview() {
    setActiveReview({ type: 'mixed' });
  }

  function handleFinishReview() {
    setActiveReview(null);
    refreshDueReviews();
  }

  function goToTutor(prompt) {
    setPendingTutorPrompt(prompt);
    setActiveTab('tutor');
  }

  // Remember stepper position per section: { sectionId: { activeStep, furthestStep } }
  const stepperPositions = useRef({});

  // Saved progress: { sectionId: { furthest_step, total_steps, completed } }
  const [savedProgress, setSavedProgress] = useState({});

  // Scroll-aware header state
  const [headerHidden, setHeaderHidden] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const tabContentRef = useRef(null);
  const lastScrollTop = useRef(0);
  const scrollThreshold = 60;

  const currentSection = subjectSections.find(s => s.id === activeSection) || subjectSections[0];
  const currentUnit = units.find(u => u.id === currentSection?.unit_id);

  // Hydrate sidebar collapsed state
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') setSidebarCollapsed(true);
  }, []);

  // Persist last-visited section and subject to localStorage
  useEffect(() => {
    if (activeSection) {
      localStorage.setItem('last-visited-section', activeSection);
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSubjectId) {
      localStorage.setItem('last-visited-subject', activeSubjectId);
    }
  }, [activeSubjectId]);

  // ⚠️  TDZ GUARD: Effects that reference `saveProgress` (defined below with useCallback)
  // MUST be placed AFTER the saveProgress definition (~line 435). Placing them here
  // causes a "Cannot access 'saveProgress' before initialization" ReferenceError
  // because useCallback variables are in the temporal dead zone before their declaration.
  // See commit 45d4583 for the fix.

  // Persist Learn Mode section to localStorage (no DB dependency — safe here)
  useEffect(() => {
    if (typeof window !== 'undefined' && activeSubjectId && activeSection) {
      localStorage.setItem(
        `revvy_learnmode_${activeSubjectId}_${activeSection}_section`,
        String(learnModeSection)
      );
    }
  }, [learnModeSection, activeSubjectId, activeSection]);

  // Fetch glossary terms for active subject
  useEffect(() => {
    const url = activeSubjectId
      ? `/api/glossary?subject_id=${activeSubjectId}`
      : '/api/glossary';
    fetch(url)
      .then(res => res.ok ? res.json() : [])
      .then(setGlossaryTerms)
      .catch(() => {});
  }, [activeSubjectId]);

  // Fetch saved content progress when user is logged in
  useEffect(() => {
    if (!user) {
      setSavedProgress({});
      return;
    }
    fetch('/api/progress/content')
      .then(res => res.ok ? res.json() : [])
      .then(rows => {
        const map = {};
        rows.forEach(r => {
          map[r.section_id] = {
            furthest_step: r.furthest_step,
            total_steps: r.total_steps,
            completed: r.furthest_step >= r.total_steps - 1,
          };
        });
        setSavedProgress(map);
      })
      .catch(() => {});
  }, [user]);

  function toggleSidebarCollapsed() {
    setSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('sidebar-collapsed', String(next));
      return next;
    });
  }

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      return;
    }
    async function loadSection() {
      setSectionData(null);
      try {
        const res = await fetch(`/api/sections/${activeSection}`);
        if (res.ok) {
          const data = await res.json();
          setSectionData(data);
        }
      } catch (e) {
        console.warn('Failed to load section data', e);
      }
    }
    loadSection();
  }, [activeSection]);

  // Reset scroll state when section or tab changes
  useEffect(() => {
    setHeaderHidden(false);
    setReadProgress(0);
    lastScrollTop.current = 0;

    // Instantly remove header-hidden class + transition to avoid flash
    const headerEl = document.querySelector('.content-header');
    if (headerEl) {
      headerEl.style.transition = 'none';
      headerEl.classList.remove('header-hidden');
    }

    // Scroll to top — multiple attempts for iOS Safari compatibility
    const el = tabContentRef.current;
    if (el) {
      el.scrollTop = 0;
      try { el.scrollTo({ top: 0, behavior: 'instant' }); } catch (_) {}
    }

    // Fallback: iOS Safari sometimes needs a delayed scroll reset
    const t = setTimeout(() => {
      if (el) {
        el.scrollTop = 0;
        try { el.scrollTo({ top: 0, behavior: 'instant' }); } catch (_) {}
      }
      if (headerEl) headerEl.style.transition = '';
    }, 80);

    if (activeTab !== 'content') {
      setContentStepInfo(null);
    }

    return () => clearTimeout(t);
  }, [activeSection, activeTab]);

  // Scroll handler for auto-hide header + progress bar
  const rafId = useRef(null);
  const handleScroll = useCallback(() => {
    if (rafId.current) return; // throttle to one per frame
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      const el = tabContentRef.current;
      if (!el) return;

      const scrollTop = el.scrollTop;
      const maxScroll = el.scrollHeight - el.clientHeight;

      // Ignore rubber-band / overscroll values
      if (scrollTop < 0 || scrollTop > maxScroll + 50) {
        return;
      }

      const progress = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
      setReadProgress(progress);

      // Near bottom — always show header
      if (maxScroll - scrollTop < 60) {
        setHeaderHidden(false);
        lastScrollTop.current = scrollTop;
        return;
      }

      // Near top — always show header
      if (scrollTop < scrollThreshold) {
        setHeaderHidden(false);
        lastScrollTop.current = scrollTop;
        return;
      }

      const delta = scrollTop - lastScrollTop.current;
      if (delta > 12 && scrollTop > scrollThreshold) {
        setHeaderHidden(true);
      } else if (delta < -12) {
        setHeaderHidden(false);
      }

      lastScrollTop.current = scrollTop;
    });
  }, []);

  // Save progress to DB when a section is fully completed
  const saveProgress = useCallback((sectionId, furthestStep, totalSteps) => {
    if (!user) return;
    const completed = furthestStep >= totalSteps - 1;

    // Update local state immediately
    setSavedProgress(prev => ({
      ...prev,
      [sectionId]: { furthest_step: furthestStep, total_steps: totalSteps, completed },
    }));

    // Persist to DB
    fetch('/api/progress/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section_id: sectionId,
        furthest_step: furthestStep,
        total_steps: totalSteps,
      }),
    }).catch(() => {});
  }, [user]);

  // Debounced DB save for learn mode step changes (1s)
  useEffect(() => {
    if (user && activeSection && sectionData?.content?.length) {
      const timer = setTimeout(() => {
        saveProgress(activeSection, learnModeSection, sectionData.content.length);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [learnModeSection, activeSection, user, sectionData, saveProgress]);

  const handleStepChange = useCallback((info) => {
    setContentStepInfo(info);

    // Remember position for this section
    stepperPositions.current[activeSection] = {
      activeStep: info.activeStep,
      furthestStep: info.furthestStep,
    };

    // Save to DB when section is fully completed
    if (user && info.furthestStep >= info.totalSteps - 1) {
      saveProgress(activeSection, info.furthestStep, info.totalSteps);
    }
  }, [user, activeSection, saveProgress]);

  function handleSubjectChange(subjectId) {
    setActiveSubjectId(subjectId);
    // Find first section of new subject
    const newUnits = units.filter(u => u.subject_id === subjectId);
    const newSections = sections.filter(s => newUnits.some(u => u.id === s.unit_id));
    const firstId = newSections[0]?.id;
    if (firstId) {
      setActiveSection(firstId);
      setIsInitial(false);
      setSectionData(null);
      setActiveTab('learn-mode');
      setContentStepInfo(null);
      fetch(`/api/sections/${firstId}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => { if (data) setSectionData(data); })
        .catch(() => {});
    }
  }

  function handleSectionChange(sectionId) {
    setActiveSection(sectionId);
    setActiveTab('learn-mode');
    setSidebarOpen(false);
    setContentStepInfo(null);

    // Learn Mode: check for saved progress — prefer DB for logged-in, fallback to localStorage
    if (typeof window !== 'undefined') {
      const dbProgress = user && savedProgress[sectionId];
      const dbStep = dbProgress ? dbProgress.furthest_step : null;
      const localStep = localStorage.getItem(`revvy_learnmode_${activeSubjectId}_${sectionId}_section`);
      const step = dbStep ?? (localStep ? parseInt(localStep, 10) : 0);
      setLearnModeSection(step);
      setLearnModeResuming(step > 0);
    }
  }

  function renderTab() {
    // Show full paywall for premium-only tabs if not subscribed
    if (PREMIUM_TABS.has(activeTab) && !isPremium) {
      const tabLabel = tabs.find(t => t.id === activeTab)?.label || activeTab;
      return <PaywallOverlay feature={tabLabel} />;
    }

    if (!sectionData) {
      return (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>&#128218;</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>Loading content...</div>
          <div style={{ fontSize: 14 }}>Content for this section is being prepared.</div>
        </div>
      );
    }

    // Preview tabs: everyone gets preview if not premium
    const isPreview = PREVIEW_TABS.has(activeTab) && !isPremium;

    switch (activeTab) {
      case 'overview': return <SectionOverview section={currentSection} unit={currentUnit} sectionData={sectionData} tabs={tabs} onTabSelect={handleTabSelect} isPremium={isPremium} user={user} savedProgress={savedProgress} />;
      case 'learn-mode': {
        // If a review is active, show the review component instead
        if (activeReview?.type === 'spaced') {
          return <SpacedReview reviewEntry={activeReview.entry} onFinish={handleFinishReview} />;
        }
        if (activeReview?.type === 'mixed') {
          return <MixedReview onFinish={handleFinishReview} />;
        }
        return (
          <LearnModeTab
            key={activeSection}
            contentData={sectionData.content}
            diagramsData={sectionData.diagrams}
            practiceData={sectionData.practice}
            quizData={sectionData.quiz}
            glossaryTerms={glossaryTerms}
            sectionId={activeSection}
            subjectId={activeSubjectId}
            currentSection={currentSection}
            currentUnit={currentUnit}
            currentStep={learnModeSection}
            onStepChange={setLearnModeSection}
            isResuming={learnModeResuming}
            onResumeDismiss={() => setLearnModeResuming(false)}
            onComplete={() => {
              setLearnModeCompletions(prev => ({ ...prev, [activeSection]: true }));
              refreshDueReviews();
            }}
            onNavigateToQuiz={() => handleTabSelect('quiz')}
            onNavigateToTab={handleTabSelect}
            onAskTutor={isPremium ? goToTutor : null}
            isPremium={isPremium}
            dueReviews={dueReviewCount}
            onStartReview={handleStartReview}
            onStartMixedReview={handleStartMixedReview}
          />
        );
      }
      case 'content': return <ContentTab key={activeSection} data={sectionData.content} glossaryTerms={glossaryTerms} onStepChange={handleStepChange} initialPosition={stepperPositions.current[activeSection] || null} />;
      case 'notes': return <NotesTab data={sectionData.notes} glossaryTerms={glossaryTerms} />;
      case 'diagrams': return <DiagramsTab data={sectionData.diagrams} />;
      case 'practice': return <PracticeQuestionsTab questions={sectionData.practice} onAskTutor={isPremium ? goToTutor : null} sectionNumber={currentSection?.number} />;
      case 'flashcards': return <FlashcardsTab cards={sectionData.flashcards} sectionId={activeSection} previewMode={isPreview} />;
      case 'quiz': return <QuizTab questions={sectionData.quiz} sectionId={activeSection} onAskTutor={isPremium ? goToTutor : null} previewMode={isPreview} />;
      case 'mistakes': return <MistakesTab data={sectionData.mistakes} />;
      case 'tutor': return <TutorTab section={currentSection} unit={currentUnit} pendingPrompt={pendingTutorPrompt} onPromptConsumed={() => setPendingTutorPrompt(null)} />;
      case 'extras': return <ExtrasTab data={sectionData.extras} previewMode={isPreview} />;
      default: return null;
    }
  }

  return (
    <>
      <div className="mobile-header">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>&#9776;</button>
        <span className="mobile-title">{currentSection?.short_title}</span>
        <div className="mobile-header-actions">
          <AuthButton />
        </div>
      </div>

      <div className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} />

      <div className="app-layout">
        <Sidebar
          subjects={subjects}
          activeSubjectId={activeSubjectId}
          onSubjectChange={handleSubjectChange}
          sections={subjectSections}
          units={subjectUnits}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapsed}
          contentStepInfo={activeTab === 'content' ? contentStepInfo : null}
          savedProgress={user ? savedProgress : null}
          visitedFeatures={visitedFeatures}
          onResourceVisit={markFeatureVisited}
          learnModeCompletions={learnModeCompletions}
          onTabSelect={handleTabSelect}
        />

        <div className="main-content">
          <div className="reading-progress-bar">
            <div className="reading-progress-fill" style={{ width: `${readProgress * 100}%` }} />
          </div>

          <div
            className="tab-content"
            ref={tabContentRef}
            onScroll={handleScroll}
          >
            <div className={`content-header ${headerHidden ? 'header-hidden' : ''}`}>
              <div className="content-header-top">
                {sidebarCollapsed && (
                  <button className="sidebar-expand-btn" onClick={toggleSidebarCollapsed} title="Expand sidebar">
                    &#9776;
                  </button>
                )}
                <span className="content-header-section-num">Section {currentSection?.number}</span>
                <span className="content-header-unit-badge">Unit {currentUnit?.number}: {currentUnit?.title}</span>
                <AuthButton />
              </div>
              <h1 className="content-header-title">{currentSection?.title}</h1>
              <AnimatedTabBar
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={handleTabSelect}
                isPremium={isPremium}
                visitedFeatures={visitedFeatures}
                learnModeCompletions={learnModeCompletions}
                activeSection={activeSection}
              />
            </div>

            <div className="tab-content-body">
              {renderTab()}
            </div>
          </div>
          <GlossaryTooltip />
        </div>
      </div>
    </>
  );
}
