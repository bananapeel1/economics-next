import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';

export const metadata = {
  title: 'Managing Business Activities — Edexcel IAL Business Unit 2 (WBS12) | Revvy Learn',
  description: 'Free revision notes for Edexcel IAL Business Unit 2 (WBS12). Covers raising finance, cash flow forecasting, budgets, break-even analysis, quality management, supply chains and external influences (PESTLE) with exam practice.',
  openGraph: {
    title: 'Managing Business Activities — Edexcel IAL Business Unit 2 (WBS12) | Revvy Learn',
    description: 'Free Edexcel IAL Business Unit 2 revision notes. Finance, cash flow, budgets, operations management and external influences.',
    url: 'https://revvylearn.com/business/unit-2',
    type: 'article',
  },
};

const unit2Sections = [
  { id: 'raising-finance', number: '2.1', title: 'Raising Finance' },
  { id: 'financial-planning', number: '2.2', title: 'Financial Planning' },
  { id: 'managing-finance', number: '2.3', title: 'Managing Finance' },
  { id: 'resource-management', number: '2.4', title: 'Resource Management' },
  { id: 'external-influences', number: '2.5', title: 'External Influences' },
];

export default async function BusinessUnit2Page() {
  const supabase = createServerClient();

  const noteResults = await Promise.all(
    unit2Sections.map(s =>
      supabase.from('section_notes').select('data').eq('section_id', s.id).single()
    )
  );

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/business" className="resource-back-link">&larr; Business Overview</Link>
        <span className="seo-unit-badge">Unit 2 · WBS12</span>
        <h1 className="resource-page-title">Edexcel IAL Business Unit 2: Managing Business Activities</h1>
        <p className="resource-page-subtitle">
          Complete revision notes for Business Unit 2 (WBS12). Covers raising finance, financial planning, managing finance, resource management and external influences on business.
        </p>
      </div>

      {/* Hero CTA */}
      <div className="seo-hero-cta">
        <div className="seo-hero-cta-content">
          <div className="seo-hero-cta-text">
            <span className="seo-hero-cta-label">Interactive Revision</span>
            <p>Flashcards, quizzes, AI tutor &amp; progress tracking for every topic below</p>
          </div>
          <Link href="/?section=raising-finance" className="seo-hero-cta-button">
            Open in App &rarr;
          </Link>
        </div>
      </div>

      {/* Quick nav */}
      <div className="seo-quick-nav">
        <span className="seo-quick-nav-label">Jump to topic:</span>
        <div className="seo-quick-nav-links">
          {unit2Sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="seo-quick-nav-pill">
              {s.number}
            </a>
          ))}
        </div>
      </div>

      {unit2Sections.map((section, idx) => {
        const notes = noteResults[idx]?.data?.data || [];
        return (
          <div key={section.id} id={section.id} className="seo-content-section">
            <div className="seo-section-header">
              <h2><span className="seo-section-num">{section.number}</span> {section.title}</h2>
              <Link href={`/?section=${section.id}`} className="seo-open-app-btn">
                Open in App &rarr;
              </Link>
            </div>
            {notes.length > 0 && (
              <div className="seo-notes-content">
                {notes.slice(0, 1).map((note, i) => (
                  <div key={i}>
                    <h3>{note.title}</h3>
                    <ul>
                      {(note.points || []).slice(0, 3).map((point, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: point }} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <Link href={`/?section=${section.id}`} className="seo-section-link">
              View full notes, flashcards &amp; quizzes &rarr;
            </Link>
          </div>
        );
      })}

      <div className="seo-related-links">
        <h2>Continue Revising</h2>
        <div className="seo-links-grid">
          <Link href="/business/unit-1">Unit 1: Marketing &amp; People</Link>
          <Link href="/business">All Business Units</Link>
          <Link href="/glossary">Business Glossary</Link>
          <Link href="/past-papers">Business Past Papers</Link>
        </div>
      </div>

      <div className="seo-cta">
        <h2>Start Revising Unit 2 Now</h2>
        <p>Interactive notes, flashcards, quizzes, practice questions and AI tutor — all free to try.</p>
        <Link href="/?section=raising-finance" className="seo-cta-button">Open Revvy Learn &rarr;</Link>
      </div>
    </div>
  );
}
