import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';

export const metadata = {
  title: 'WEC14 Revision — Global Economy | Revvy Learn',
  description: 'Free Edexcel IAL Economics Unit 4 notes (WEC14). Globalisation, trade, exchange rates, poverty, inequality and economic development.',
  openGraph: {
    title: 'WEC14 Revision — Global Economy | Revvy Learn',
    description: 'Free Edexcel IAL Economics Unit 4 notes (WEC14). Globalisation, trade, exchange rates, poverty, inequality and economic development.',
    url: 'https://revvylearn.com/economics/unit-4',
    type: 'article',
  },
};

const unit4Sections = [
  { id: 'causes-effects-globalisation', number: '4.3.1', title: 'Causes and Effects of Globalisation' },
  { id: 'trade-global-economy', number: '4.3.2', title: 'Trade and the Global Economy' },
  { id: 'balance-payments-exchange-rates', number: '4.3.3', title: 'Balance of Payments, Exchange Rates and International Competitiveness' },
  { id: 'poverty-inequality', number: '4.3.4', title: 'Poverty and Inequality' },
  { id: 'role-state-macroeconomy', number: '4.3.5', title: 'The Role of the State in the Macroeconomy' },
  { id: 'growth-development', number: '4.3.6', title: 'Growth and Development' },
];

export default async function Unit4Page() {
  const supabase = createServerClient();

  const noteResults = await Promise.all(
    unit4Sections.map(s =>
      supabase.from('section_notes').select('data').eq('section_id', s.id).single()
    )
  );

  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/economics" className="resource-back-link">&larr; Economics Overview</Link>
        <span className="seo-unit-badge">Unit 4 &middot; WEC14</span>
        <h1 className="resource-page-title">Edexcel IAL Economics Unit 4: Developments in the Global Economy</h1>
        <p className="resource-page-subtitle">
          Complete revision notes for Unit 4 (WEC14). Covers globalisation, international trade, exchange rates, balance of payments, poverty, inequality, and strategies for economic growth and development.
        </p>
      </div>

      {/* Hero CTA */}
      <div className="seo-hero-cta">
        <div className="seo-hero-cta-content">
          <div className="seo-hero-cta-text">
            <span className="seo-hero-cta-label">Interactive Revision</span>
            <p>Flashcards, quizzes, AI tutor &amp; progress tracking for every topic below</p>
          </div>
          <Link href="/?section=causes-effects-globalisation" className="seo-hero-cta-button">
            Open in App &rarr;
          </Link>
        </div>
      </div>

      {/* Quick nav */}
      <div className="seo-quick-nav">
        <span className="seo-quick-nav-label">Jump to topic:</span>
        <div className="seo-quick-nav-links">
          {unit4Sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="seo-quick-nav-pill">
              {s.number}
            </a>
          ))}
        </div>
      </div>

      {unit4Sections.map((section, idx) => {
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
          <Link href="/economics/unit-3">Unit 3: Business Behaviour</Link>
          <Link href="/glossary">Economics Glossary</Link>
        </div>
      </div>

      <div className="seo-cta">
        <h2>Start Revising Unit 4 Now</h2>
        <p>Interactive notes, flashcards, quizzes, practice questions and AI tutor — all free to try.</p>
        <Link href="/?section=causes-effects-globalisation" className="seo-cta-button">Open Revvy Learn &rarr;</Link>
      </div>
    </div>
  );
}
