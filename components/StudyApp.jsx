"use client";
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ContentTab from './ContentTab';
import NotesTab from './NotesTab';
import DiagramsTab from './DiagramsTab';
import FlashcardsTab from './FlashcardsTab';
import QuizTab from './QuizTab';
import TutorTab from './TutorTab';
import AuthButton from './AuthButton';

const tabs = [
  { id: 'content', label: 'Content', icon: '\uD83D\uDCD6' },
  { id: 'notes', label: 'Notes', icon: '\uD83D\uDCDD' },
  { id: 'diagrams', label: 'Diagrams', icon: '\uD83D\uDCCA' },
  { id: 'flashcards', label: 'Flashcards', icon: '\uD83C\uDCCF' },
  { id: 'quiz', label: 'Quiz', icon: '\u270F\uFE0F' },
  { id: 'tutor', label: 'Tutor', icon: '\uD83E\uDD16' },
];

export default function StudyApp({ sections, units, initialSectionData, initialSectionId }) {
  const [activeSection, setActiveSection] = useState(initialSectionId || sections[0]?.id);
  const [activeTab, setActiveTab] = useState('content');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sectionData, setSectionData] = useState(initialSectionData);
  const [isInitial, setIsInitial] = useState(true);

  const currentSection = sections.find(s => s.id === activeSection);
  const currentUnit = units.find(u => u.id === currentSection?.unit_id);

  // Hydrate sidebar collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') setSidebarCollapsed(true);
  }, []);

  function toggleSidebarCollapsed() {
    setSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('sidebar-collapsed', String(next));
      return next;
    });
  }

  useEffect(() => {
    // Skip fetch for initial section (data comes from server)
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

  function handleSectionChange(sectionId) {
    setActiveSection(sectionId);
    setActiveTab('content');
    setSidebarOpen(false);
  }

  function renderTab() {
    if (!sectionData) {
      return (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7a99' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>&#128218;</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#e8ecf5' }}>Loading content...</div>
          <div style={{ fontSize: 14 }}>Content for this section is being prepared.</div>
        </div>
      );
    }

    switch (activeTab) {
      case 'content': return <ContentTab data={sectionData.content} />;
      case 'notes': return <NotesTab data={sectionData.notes} />;
      case 'diagrams': return <DiagramsTab data={sectionData.diagrams} />;
      case 'flashcards': return <FlashcardsTab cards={sectionData.flashcards} sectionId={activeSection} />;
      case 'quiz': return <QuizTab questions={sectionData.quiz} sectionId={activeSection} />;
      case 'tutor': return <TutorTab section={currentSection} unit={currentUnit} />;
      default: return null;
    }
  }

  return (
    <>
      <div className="mobile-header">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>&#9776;</button>
        <span className="mobile-title">{currentSection?.short_title}</span>
      </div>

      <div className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} />

      <div className="app-layout">
        <Sidebar
          sections={sections}
          units={units}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapsed}
        />

        <div className="main-content">
          <div className="content-header">
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
                  className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tab-content">
            {renderTab()}
          </div>
        </div>
      </div>
    </>
  );
}
