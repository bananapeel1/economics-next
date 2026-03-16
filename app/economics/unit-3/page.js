import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';

export const metadata = {
  title: 'WEC13 Revision — Business Behaviour | Revvy Learn',
  description: 'Free Edexcel IAL Economics Unit 3 notes (WEC13). Market structures, costs, revenue, labour markets and government intervention with diagrams.',
  openGraph: {
    title: 'WEC13 Revision — Business Behaviour | Revvy Learn',
    description: 'Free Edexcel IAL Economics Unit 3 notes (WEC13). Market structures, costs, revenue, labour markets and government intervention.',
    url: 'https://revvylearn.com/economics/unit-3',
    type: 'article',
  },
};

const unit3Sections = [
  { id: 'types-sizes-businesses', number: '3.3.1', title: 'Types and Sizes of Businesses' },
  { id: 'revenue-costs-profits', number: '3.3.2', title: 'Revenue, Costs and Profits' },
  { id: 'market-structures-contestability', number: '3.3.3', title: 'Market Structures and Contestability' },
  { id: 'labour-markets', number: '3.3.4', title: 'Labour Markets' },
  { id: 'government-intervention-firms', number: '3.3.5', title: 'Government Intervention' },
];

export default async function Unit3Page() {
  const supabase = createServerClient();

  const noteResults = await Promise.all(
    unit3Sections.map(s =>
      supabase.from('section_notes').select('data').eq('section_id', s.id).single()
    )
  );

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/economics" className="resource-back-link">&larr; Economics Overview</Link>
        <span className="seo-unit-badge">Unit 3 &middot; WEC13</span>
        <h1 className="resource-page-title">Edexcel IAL Economics Unit 3: Business Behaviour</h1>
        <p className="resource-page-subtitle">
          Complete revision notes for Unit 3 (WEC13). Covers microeconomic theory of the firm including business objectives, revenue and cost theory, market structures, labour markets and competition policy.
        </p>
      </div>

      {/* Hero CTA */}
      <div className="seo-hero-cta">
        <div className="seo-hero-cta-content">
          <div className="seo-hero-cta-text">
            <span className="seo-hero-cta-label">Interactive Revision</span>
            <p>Flashcards, quizzes, AI tutor &amp; progress tracking for every topic below</p>
          </div>
          <Link href="/?section=types-sizes-businesses" className="seo-hero-cta-button">
            Open in App &rarr;
          </Link>
        </div>
      </div>

      {/* Quick nav */}
      <div className="seo-quick-nav">
        <span className="seo-quick-nav-label">Jump to topic:</span>
        <div className="seo-quick-nav-links">
          {unit3Sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="seo-quick-nav-pill">
              {s.number}
            </a>
          ))}
        </div>
      </div>

      {unit3Sections.map((section, idx) => {
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
          <Link href="/economics/unit-1">Unit 1: Markets in Action</Link>
          <Link href="/economics/unit-2">Unit 2: Macroeconomic Performance</Link>
          <Link href="/economics/unit-4">Unit 4: Global Economy</Link>
          <Link href="/glossary">Economics Glossary</Link>
        </div>
      </div>

      <div className="seo-cta">
        <h2>Start Revising Unit 3 Now</h2>
        <p>Interactive notes, flashcards, quizzes, practice questions and AI tutor — all free to try.</p>
        <Link href="/?section=types-sizes-businesses" className="seo-cta-button">Open Revvy Learn &rarr;</Link>
      </div>
    </div>
  );
}
