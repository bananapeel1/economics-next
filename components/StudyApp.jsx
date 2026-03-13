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

const FREE_TABS = new Set(['content', 'notes', 'diagrams', 'practice']);
const PREMIUM_TABS = new Set(['flashcards', 'quiz', 'mistakes', 'tutor', 'extras']);

const allTabs = [
  { id: 'content', label: 'Content', icon: '\uD83D\uDCD6' },
  { id: 'notes', label: 'Notes', icon: '\uD83D\uDCDD' },
  { id: 'diagrams', label: 'Diagrams', icon: '\uD83D\uDCCA', subjects: ['economics'] },
  { id: 'practice', label: 'Practice', icon: '\uD83D\uDCDD' },
  { id: 'flashcards', label: 'Flashcards', icon: '\uD83C\uDCCF', premium: true },
  { id: 'quiz', label: 'Quiz', icon: '\u270F\uFE0F', premium: true },
  { id: 'mistakes', label: 'Mistakes', icon: '\u26A0\uFE0F', premium: true, subjects: ['business'] },
  { id: 'tutor', label: 'Tutor', icon: '\uD83E\uDD16', premium: true },
  { id: 'extras', label: 'Extras', icon: '\u2B50', premium: true },
];

export default function StudyApp({ subjects, sections, units, initialSectionData, initialSectionId }) {
  const { user, isPremium } = useAuth();

  // Subject state
  const [activeSubjectId, setActiveSubjectId] = useState(subjects[0]?.id || null);
  const activeSubject = subjects.find(s => s.id === activeSubjectId) || subjects[0];

  // Filter tabs by active subject slug
  const tabs = allTabs.filter(tab => !tab.subjects || tab.subjects.includes(activeSubject?.slug));

  // Filter units and sections by active subject
  const subjectUnits = units.filter(u => u.subject_id === activeSubjectId);
  const subjectSectionIds = new Set(sections.filter(s => subjectUnits.some(u => u.id === s.unit_id)).map(s => s.id));
  const subjectSections = sections.filter(s => subjectSectionIds.has(s.id));

  const urlSection = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('section')
    : null;
  const startSection = (urlSection && subjectSections.some(s => s.id === urlSection))
    ? urlSection
    : (initialSectionId || subjectSections[0]?.id);

  const [activeSection, setActiveSection] = useState(startSection);
  const [activeTab, setActiveTab] = useState('content');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sectionData, setSectionData] = useState(initialSectionData);
  const [isInitial, setIsInitial] = useState(true);
  const [glossaryTerms, setGlossaryTerms] = useState([]);
  const [contentStepInfo, setContentStepInfo] = useState(null);
  const [pendingTutorPrompt, setPendingTutorPrompt] = useState(null);

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
      setActiveTab('content');
      setContentStepInfo(null);
      fetch(`/api/sections/${firstId}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => { if (data) setSectionData(data); })
        .catch(() => {});
    }
  }

  function handleSectionChange(sectionId) {
    setActiveSection(sectionId);
    setActiveTab('content');
    setSidebarOpen(false);
    setContentStepInfo(null);
  }

  function renderTab() {
    // Show paywall for premium tabs if not subscribed
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

    switch (activeTab) {
      case 'content': return <ContentTab key={activeSection} data={sectionData.content} glossaryTerms={glossaryTerms} onStepChange={handleStepChange} initialPosition={stepperPositions.current[activeSection] || null} />;
      case 'notes': return <NotesTab data={sectionData.notes} glossaryTerms={glossaryTerms} />;
      case 'diagrams': return <DiagramsTab data={sectionData.diagrams} />;
      case 'practice': return <PracticeQuestionsTab questions={sectionData.practice} onAskTutor={isPremium ? goToTutor : null} />;
      case 'flashcards': return <FlashcardsTab cards={sectionData.flashcards} sectionId={activeSection} />;
      case 'quiz': return <QuizTab questions={sectionData.quiz} sectionId={activeSection} onAskTutor={isPremium ? goToTutor : null} />;
      case 'mistakes': return <MistakesTab data={sectionData.mistakes} />;
      case 'tutor': return <TutorTab section={currentSection} unit={currentUnit} pendingPrompt={pendingTutorPrompt} onPromptConsumed={() => setPendingTutorPrompt(null)} />;
      case 'extras': return <ExtrasTab data={sectionData.extras} />;
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
              <div className="tab-bar">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`tab-item ${activeTab === tab.id ? 'active' : ''} ${tab.premium && !isPremium ? 'tab-locked' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="tab-icon">{tab.icon}</span>
                    {tab.label}
                    {tab.premium && !isPremium && <span className="tab-lock-icon">🔒</span>}
                  </button>
                ))}
              </div>
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
