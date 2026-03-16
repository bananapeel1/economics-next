import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';

export const metadata = {
  title: 'Marketing & People — Edexcel IAL Business Unit 1 (WBS11) | Revvy Learn',
  description: 'Free revision notes for Edexcel IAL Business Unit 1 (WBS11). Covers market research, the marketing mix (4Ps), STP, pricing strategies, managing people, HR, motivation theory and entrepreneurship with flashcards and exam practice.',
  openGraph: {
    title: 'Marketing & People — Edexcel IAL Business Unit 1 (WBS11) | Revvy Learn',
    description: 'Free Edexcel IAL Business Unit 1 revision notes. Marketing mix, pricing strategies, managing people, HR and entrepreneurship.',
    url: 'https://revvylearn.com/business/unit-1',
    type: 'article',
  },
};

const unit1Sections = [
  { id: 'meeting-customer-needs', number: '1.1', title: 'Meeting Customer Needs' },
  { id: 'the-market', number: '1.2', title: 'The Market' },
  { id: 'marketing-mix-and-strategy', number: '1.3', title: 'Marketing Mix & Strategy' },
  { id: 'managing-people', number: '1.4', title: 'Managing People' },
  { id: 'entrepreneurs-and-leaders', number: '1.5', title: 'Entrepreneurs & Leaders' },
];

export default async function BusinessUnit1Page() {
  const supabase = createServerClient();

  const noteResults = await Promise.all(
    unit1Sections.map(s =>
      supabase.from('section_notes').select('data').eq('section_id', s.id).single()
    )
  );

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/business" className="resource-back-link">&larr; Business Overview</Link>
        <span className="seo-unit-badge">Unit 1 · WBS11</span>
        <h1 className="resource-page-title">Edexcel IAL Business Unit 1: Marketing &amp; People</h1>
        <p className="resource-page-subtitle">
          Complete revision notes for Business Unit 1 (WBS11). Covers meeting customer needs, market research, the marketing mix, managing people, and entrepreneurship.
        </p>
      </div>

      {/* Hero CTA */}
      <div className="seo-hero-cta">
        <div className="seo-hero-cta-content">
          <div className="seo-hero-cta-text">
            <span className="seo-hero-cta-label">Interactive Revision</span>
            <p>Flashcards, quizzes, AI tutor &amp; progress tracking for every topic below</p>
          </div>
          <Link href="/?section=meeting-customer-needs" className="seo-hero-cta-button">
            Open in App &rarr;
          </Link>
        </div>
      </div>

      {/* Quick nav */}
      <div className="seo-quick-nav">
        <span className="seo-quick-nav-label">Jump to topic:</span>
        <div className="seo-quick-nav-links">
          {unit1Sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="seo-quick-nav-pill">
              {s.number}
            </a>
          ))}
        </div>
      </div>

      {unit1Sections.map((section, idx) => {
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
          <Link href="/business/unit-2">Unit 2: Managing Business Activities</Link>
          <Link href="/business">All Business Units</Link>
          <Link href="/glossary">Business Glossary</Link>
          <Link href="/past-papers">Business Past Papers</Link>
        </div>
      </div>

      <div className="seo-cta">
        <h2>Start Revising Unit 1 Now</h2>
        <p>Interactive notes, flashcards, quizzes, practice questions and AI tutor — all free to try.</p>
        <Link href="/?section=meeting-customer-needs" className="seo-cta-button">Open Revvy Learn &rarr;</Link>
      </div>
    </div>
  );
}
