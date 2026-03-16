import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';

export const metadata = {
  title: 'WEC12 Revision — Macroeconomic Performance | Revvy Learn',
  description: 'Free Edexcel IAL Economics Unit 2 notes (WEC12). Aggregate demand, aggregate supply, growth, inflation and macro policies — with model answers.',
  openGraph: {
    title: 'WEC12 Revision — Macroeconomic Performance | Revvy Learn',
    description: 'Free Edexcel IAL Economics Unit 2 notes (WEC12). Aggregate demand, aggregate supply, growth, inflation and macro policies.',
    url: 'https://revvylearn.com/economics/unit-2',
    type: 'article',
  },
};

const unit2Sections = [
  { id: 'measures-economic-performance', number: '2.3.1', title: 'Measures of Economic Performance' },
  { id: 'aggregate-demand', number: '2.3.2', title: 'Aggregate Demand' },
  { id: 'aggregate-supply', number: '2.3.3', title: 'Aggregate Supply' },
  { id: 'national-income', number: '2.3.4', title: 'National Income' },
  { id: 'economic-growth', number: '2.3.5', title: 'Economic Growth' },
  { id: 'macroeconomic-objectives-policies', number: '2.3.6', title: 'Macroeconomic Objectives & Policies' },
];

export default async function Unit2Page() {
  const supabase = createServerClient();

  const noteResults = await Promise.all(
    unit2Sections.map(s =>
      supabase.from('section_notes').select('data').eq('section_id', s.id).single()
    )
  );

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/economics" className="resource-back-link">&larr; Economics Overview</Link>
        <span className="seo-unit-badge">Unit 2 · WEC12</span>
        <h1 className="resource-page-title">Edexcel IAL Economics Unit 2: Macroeconomic Performance &amp; Policy</h1>
        <p className="resource-page-subtitle">
          Complete revision notes for Unit 2 (WEC12). Covers macroeconomic theory including GDP, inflation, unemployment, aggregate demand and supply, and government policies.
        </p>
      </div>

      {/* Hero CTA — immediately visible */}
      <div className="seo-hero-cta">
        <div className="seo-hero-cta-content">
          <div className="seo-hero-cta-text">
            <span className="seo-hero-cta-label">Interactive Revision</span>
            <p>Flashcards, quizzes, AI tutor &amp; progress tracking for every topic below</p>
          </div>
          <Link href="/?section=measures-economic-performance" className="seo-hero-cta-button">
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
          <Link href="/economics/unit-1">Unit 1: Markets in Action</Link>
          <Link href="/economics/aggregate-demand">Aggregate Demand In-Depth</Link>
          <Link href="/glossary">Economics Glossary</Link>
          <Link href="/past-papers">Unit 2 Past Papers</Link>
        </div>
      </div>

      <div className="seo-cta">
        <h2>Start Revising Unit 2 Now</h2>
        <p>Interactive notes, flashcards, quizzes, practice questions and AI tutor — all free to try.</p>
        <Link href="/?section=measures-economic-performance" className="seo-cta-button">Open Revvy Learn &rarr;</Link>
      </div>
    </div>
  );
}
