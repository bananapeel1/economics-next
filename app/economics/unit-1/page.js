import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';

export const metadata = {
  title: 'WEC11 Revision — Markets in Action | Revvy Learn',
  description: 'Free Edexcel IAL Economics Unit 1 notes (WEC11). Demand, supply, market failure and government intervention — with diagrams and flashcards.',
  openGraph: {
    title: 'WEC11 Revision — Markets in Action | Revvy Learn',
    description: 'Free Edexcel IAL Economics Unit 1 notes (WEC11). Demand, supply, market failure and government intervention.',
    url: 'https://revvylearn.com/economics/unit-1',
    type: 'article',
  },
};

const unit1Sections = [
  { id: 'introductory-concepts', number: '1.3.1', title: 'Introductory Concepts' },
  { id: 'consumer-behaviour-demand', number: '1.3.2', title: 'Consumer Behaviour & Demand' },
  { id: 'supply', number: '1.3.3', title: 'Supply' },
  { id: 'price-determination', number: '1.3.4', title: 'Price Determination' },
  { id: 'market-failure', number: '1.3.5', title: 'Market Failure' },
  { id: 'government-intervention', number: '1.3.6', title: 'Government Intervention' },
];

export default async function Unit1Page() {
  const supabase = createServerClient();

  const noteResults = await Promise.all(
    unit1Sections.map(s =>
      supabase.from('section_notes').select('data').eq('section_id', s.id).single()
    )
  );

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/economics" className="resource-back-link">&larr; Economics Overview</Link>
        <span className="seo-unit-badge">Unit 1 · WEC11</span>
        <h1 className="resource-page-title">Edexcel IAL Economics Unit 1: Markets in Action</h1>
        <p className="resource-page-subtitle">
          Complete revision notes for Unit 1 (WEC11). Covers microeconomic theory including demand, supply, market equilibrium, market failure and government intervention.
        </p>
      </div>

      {/* Hero CTA — immediately visible */}
      <div className="seo-hero-cta">
        <div className="seo-hero-cta-content">
          <div className="seo-hero-cta-text">
            <span className="seo-hero-cta-label">Interactive Revision</span>
            <p>Flashcards, quizzes, AI tutor &amp; progress tracking for every topic below</p>
          </div>
          <Link href="/?section=introductory-concepts" className="seo-hero-cta-button">
            Open in App &rarr;
          </Link>
        </div>
      </div>

      {/* Quick nav — jump to any section */}
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
          <Link href="/economics/unit-2">Unit 2: Macroeconomic Performance</Link>
          <Link href="/economics/market-failure">Market Failure In-Depth</Link>
          <Link href="/glossary">Economics Glossary</Link>
          <Link href="/past-papers">Unit 1 Past Papers</Link>
        </div>
      </div>

      <div className="seo-cta">
        <h2>Start Revising Unit 1 Now</h2>
        <p>Interactive notes, flashcards, quizzes, practice questions and AI tutor — all free to try.</p>
        <Link href="/?section=introductory-concepts" className="seo-cta-button">Open Revvy Learn &rarr;</Link>
      </div>
    </div>
  );
}
