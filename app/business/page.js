import Link from 'next/link';
import BusinessScrollBar from './BusinessScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Edexcel IAL Business Revision Notes — Units 1\u20134 | Revvy Learn',
  description: 'Complete revision notes for Edexcel International A-Level Business. Covers Unit 1 Marketing & People (WBS11), Unit 2 Managing Business Activities (WBS12). Free notes, flashcards, 20-mark essay guides and AI tutor.',
  openGraph: {
    title: 'Edexcel IAL Business Revision Notes — Units 1\u20134 | Revvy Learn',
    description: 'Complete free revision notes for all Edexcel IAL Business units: WBS11, WBS12. Flashcards, essay guides and practice questions.',
    url: 'https://revvylearn.com/business',
    type: 'article',
  },
};

const unit1Sections = [
  { id: 'meeting-customer-needs', number: '1.3.1', title: 'Meeting Customer Needs', meta: 'Mass/niche markets, market research, positioning' },
  { id: 'the-market', number: '1.3.2', title: 'The Market', meta: 'Demand, supply, PED, YED, market equilibrium' },
  { id: 'marketing-mix-strategy', number: '1.3.3', title: 'Marketing Mix & Strategy', meta: '4Ps, PLC, Boston Matrix, pricing, distribution' },
  { id: 'managing-people', number: '1.3.4', title: 'Managing People', meta: 'Recruitment, motivation, leadership, org design' },
  { id: 'entrepreneurs-leaders', number: '1.3.5', title: 'Entrepreneurs & Leaders', meta: 'Role of entrepreneur, motives, objectives' },
];

const unit2Sections = [
  { id: 'planning-raising-finance', number: '2.3.1', title: 'Planning & Raising Finance', meta: 'Business plans, sources of finance' },
  { id: 'financial-planning', number: '2.3.2', title: 'Financial Planning', meta: 'Cash flow, budgets, break-even analysis' },
  { id: 'managing-finance', number: '2.3.3', title: 'Managing Finance', meta: 'Profit, profitability ratios, liquidity' },
  { id: 'resource-management', number: '2.3.4', title: 'Resource Management', meta: 'Production methods, capacity, quality' },
  { id: 'external-influences', number: '2.3.5', title: 'External Influences', meta: 'Interest rates, exchange rates, legislation' },
];

const unit3Sections = [
  { id: 'business-objectives-strategy', number: '3.3.1', title: 'Business Objectives & Strategy', meta: 'Mission, objectives, SWOT, strategy' },
  { id: 'business-growth', number: '3.3.2', title: 'Business Growth', meta: 'Organic, external growth, mergers' },
  { id: 'decision-making-techniques', number: '3.3.3', title: 'Decision-Making Techniques', meta: 'Decision trees, critical path, data analysis' },
  { id: 'influences-business-decisions', number: '3.3.4', title: 'Influences on Business Decisions', meta: 'Corporate culture, stakeholders, ethics' },
  { id: 'assessing-competitiveness', number: '3.3.5', title: 'Assessing Competitiveness', meta: 'Financial ratios, core competencies' },
  { id: 'managing-change', number: '3.3.6', title: 'Managing Change', meta: 'Change management, scenario planning' },
];

const unit4Sections = [
  { id: 'globalisation', number: '4.3.1', title: 'Globalisation', meta: 'Causes, effects, MNCs, trade blocs' },
  { id: 'global-markets-expansion', number: '4.3.2', title: 'Global Markets & Expansion', meta: 'Market entry, Ansoff\'s matrix, risk' },
  { id: 'global-marketing', number: '4.3.3', title: 'Global Marketing', meta: 'Glocalisation, cultural differences' },
  { id: 'global-industries-mncs', number: '4.3.4', title: 'Global Industries & MNCs', meta: 'Transfer pricing, FDI, ethical issues' },
];

const units = [
  {
    num: 1,
    heading: 'Marketing and People',
    code: 'WBS11',
    desc: 'The foundations of business \u2014 how businesses identify and meet customer needs, understand markets, develop their marketing mix, manage people, and the role of entrepreneurs and leaders.',
    sections: unit1Sections,
    ctaSection: 'meeting-customer-needs',
  },
  {
    num: 2,
    heading: 'Managing Business Activities',
    code: 'WBS12',
    desc: 'Business finance and operations \u2014 raising and planning finance, managing cash flow and profitability, resource management, and external influences on business activity.',
    sections: unit2Sections,
    ctaSection: 'planning-raising-finance',
  },
  {
    num: 3,
    heading: 'Business Decisions and Strategy',
    code: 'WBS13',
    desc: 'Strategic decision-making \u2014 setting objectives, choosing growth strategies, using quantitative techniques, assessing competitiveness, and managing change in a dynamic environment.',
    sections: unit3Sections,
    ctaSection: 'business-objectives-strategy',
  },
  {
    num: 4,
    heading: 'Global Business',
    code: 'WBS14',
    desc: 'The global business environment \u2014 globalisation and its impact, strategies for entering global markets, international marketing, and the role of multinational corporations.',
    sections: unit4Sections,
    ctaSection: 'globalisation',
  },
];

export default function BusinessPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Edexcel International A-Level Business",
    "description": "Complete revision course for Edexcel IAL Business covering Marketing, People, Finance, Strategy and Global Business across 4 units.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Revvy Learn",
      "url": "https://revvylearn.com"
    },
    "hasCourseInstance": units.map(u => ({
      "@type": "CourseInstance",
      "name": `Unit ${u.num}: ${u.heading} (${u.code})`
    }))
  };

  return (
    <div className="elp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Scroll progress bar (client component) */}
      <BusinessScrollBar />

      {/* Minimal header */}
      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo">
          <span className="elp-nav-dot" />
          Revvy Learn
        </Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb">
          Business <span>/ Revision Notes</span>
        </div>
      </nav>

      {/* Hero */}
      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Edexcel IAL &middot; WBS11, WBS12, WBS13, WBS14</div>
            <h1 className="elp-hero-title">
              Business revision<br />that <em>actually sticks</em>
            </h1>
            <p className="elp-hero-desc">
              Free revision notes for all four Edexcel IAL Business units &mdash; structured around the spec, with adaptive practice, AI tutor, and spaced repetition built in.
            </p>
            <div className="elp-hero-actions">
              <Link href="/?section=meeting-customer-needs" className="elp-btn-primary">
                Start revising free &rarr;
              </Link>
              <Link href="#units" className="elp-btn-secondary">Browse all topics</Link>
            </div>
            <div className="elp-hero-proof">
              <div className="elp-proof-item"><strong>Free</strong> notes for every spec point</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item"><strong>4 units</strong> &middot; 20 spec points</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">No signup needed</div>
            </div>
          </div>

          {/* Preview card */}
          <div className="elp-hero-preview elp-fade-up" style={{ transitionDelay: '.15s' }}>
            <div className="elp-hero-badge elp-b1">
              <span className="elp-badge-icon">&#127919;</span>
              <div className="elp-badge-text">
                <span className="elp-badge-val">Adaptive</span>
                <span className="elp-badge-lbl">spaced repetition</span>
              </div>
            </div>
            <div className="elp-preview-card">
              <div className="elp-preview-topbar">
                <div className="elp-preview-tab elp-active">Notes</div>
                <div className="elp-preview-tab">Flashcards</div>
                <div className="elp-preview-tab">Quiz</div>
              </div>
              <div className="elp-preview-body">
                <div className="elp-preview-section-title">1.3.1 &mdash; Meeting Customer Needs</div>
                <div className="elp-preview-key-idea">
                  <div className="elp-pki-label">&#128273; Key idea</div>
                  <div className="elp-pki-text">
                    Understanding customer needs is the foundation of successful business activity &mdash; firms must identify, anticipate and satisfy customer requirements to survive in competitive markets.
                  </div>
                </div>
                <div className="elp-preview-bullets">
                  <div className="elp-pb">
                    <div className="elp-pb-line" style={{ background: 'var(--elp-green)' }} />
                    <div className="elp-pb-text"><strong>Mass market</strong> &mdash; large, undifferentiated market targeting a broad customer base; benefits from economies of scale.</div>
                  </div>
                  <div className="elp-pb">
                    <div className="elp-pb-line" style={{ background: 'var(--elp-blue)' }} />
                    <div className="elp-pb-text"><strong>Niche market</strong> &mdash; small, specialised segment with specific needs; higher margins but limited scale.</div>
                  </div>
                  <div className="elp-pb">
                    <div className="elp-pb-line" style={{ background: 'var(--elp-amber)' }} />
                    <div className="elp-pb-text"><strong>Market research</strong> &mdash; gathering primary and secondary data to reduce risk and inform marketing decisions.</div>
                  </div>
                </div>
                <div className="elp-preview-flow">
                  <div className="elp-pf-step">Identify customer needs</div>
                  <div className="elp-pf-arrow">&rarr;</div>
                  <div className="elp-pf-step">Research the market</div>
                  <div className="elp-pf-arrow">&rarr;</div>
                  <div className="elp-pf-step">Position the product</div>
                  <div className="elp-pf-arrow">&rarr;</div>
                  <div className="elp-pf-result">Competitive advantage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <div className="elp-features-strip">
        <div className="elp-features-inner">
          <div className="elp-feat-item">
            <span className="elp-feat-icon">&#128203;</span>
            <div>
              <div className="elp-feat-label">Spec-aligned notes</div>
              <div className="elp-feat-sub">Every WBS11&ndash;14 point covered</div>
            </div>
          </div>
          <div className="elp-feat-item">
            <span className="elp-feat-icon">&#128260;</span>
            <div>
              <div className="elp-feat-label">Spaced repetition</div>
              <div className="elp-feat-sub">Adaptive flashcard algorithm</div>
            </div>
          </div>
          <div className="elp-feat-item">
            <span className="elp-feat-icon">&#9889;</span>
            <div>
              <div className="elp-feat-label">Practice questions</div>
              <div className="elp-feat-sub">Exam-style for every topic</div>
            </div>
          </div>
          <div className="elp-feat-item">
            <span className="elp-feat-icon">&#129302;</span>
            <div>
              <div className="elp-feat-label">AI Tutor</div>
              <div className="elp-feat-sub">Ask any Business question</div>
            </div>
          </div>
          <div className="elp-feat-item">
            <span className="elp-feat-icon">&#128202;</span>
            <div>
              <div className="elp-feat-label">Progress tracking</div>
              <div className="elp-feat-sub">See mastery across all topics</div>
            </div>
          </div>
        </div>
      </div>

      {/* Units section */}
      <div className="elp-section" id="units">
        <div className="elp-units-header elp-fade-up">
          <div className="elp-s-eyebrow">
            <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />
            Full specification
          </div>
          <h2 className="elp-s-title">All four units, every spec point</h2>
          <p className="elp-s-sub">
            Click any topic to open the full notes, diagrams, flashcards and practice questions in the app.
          </p>
        </div>

        {units.map((unit, idx) => (
          <div key={unit.num}>
            <div className="elp-unit-block elp-fade-up">
              <div className="elp-unit-label-row">
                <div className="elp-unit-num">{unit.num}</div>
                <div className="elp-unit-heading">{unit.heading}</div>
                <div className="elp-unit-code">{unit.code}</div>
              </div>
              <p className="elp-unit-desc">{unit.desc}</p>
              <div className="elp-topics-grid">
                {unit.sections.map((s) => (
                  <Link key={s.id} href={`/?section=${s.id}`} className="elp-topic-tile">
                    <div className="elp-tt-ref">{s.number}</div>
                    <div className="elp-tt-body">
                      <div className="elp-tt-name">{s.title}</div>
                      <div className="elp-tt-meta">{s.meta}</div>
                    </div>
                    <div className="elp-tt-arrow">&rarr;</div>
                  </Link>
                ))}
              </div>
              <Link href={`/?section=${unit.ctaSection}`} className="elp-unit-cta">
                Start revising Unit {unit.num} &rarr;
              </Link>
            </div>
            {idx < units.length - 1 && <div className="elp-unit-divider" />}
          </div>
        ))}
      </div>

      {/* What's included */}
      <div className="elp-wyg-section">
        <div className="elp-wyg-inner">
          <div className="elp-wyg-header elp-fade-up">
            <div className="elp-s-eyebrow" style={{ justifyContent: 'center' }}>
              <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-blue)' }} />
              What&apos;s included
            </div>
            <h2 className="elp-s-title">Everything you need to revise Business</h2>
            <p className="elp-s-sub">Notes are free. Flashcards, quizzes and AI tutor unlock with a subscription.</p>
          </div>
          <div className="elp-wyg-grid">
            <div className="elp-wyg-card elp-fade-up">
              <div className="elp-wyg-icon" style={{ background: 'var(--elp-g-bg)', border: '1px solid var(--elp-g-bd)' }}>&#128203;</div>
              <div className="elp-wyg-title">Structured Notes</div>
              <div className="elp-wyg-desc">Concise, spec-aligned notes for every topic &mdash; with key ideas, definitions, flow chains and exam tips. No textbook padding.</div>
              <span className="elp-wyg-tag elp-tag-free">Free</span>
            </div>
            <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.07s' }}>
              <div className="elp-wyg-icon" style={{ background: 'var(--elp-b-bg)', border: '1px solid var(--elp-b-bd)' }}>&#128260;</div>
              <div className="elp-wyg-title">Adaptive Flashcards</div>
              <div className="elp-wyg-desc">Spaced repetition that learns from you &mdash; topics you struggle with come back sooner, mastered ones space out automatically.</div>
              <span className="elp-wyg-tag elp-tag-pro">Premium</span>
            </div>
            <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.14s' }}>
              <div className="elp-wyg-icon" style={{ background: 'var(--elp-t-bg)', border: '1px solid var(--elp-t-bd)' }}>&#9889;</div>
              <div className="elp-wyg-title">Practice Questions</div>
              <div className="elp-wyg-desc">Exam-style questions with model answers for every unit &mdash; adaptive difficulty based on your performance.</div>
              <span className="elp-wyg-tag elp-tag-free">Free</span>
            </div>
            <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.21s' }}>
              <div className="elp-wyg-icon" style={{ background: 'var(--elp-p-bg)', border: '1px solid rgba(167,139,250,.2)' }}>&#129302;</div>
              <div className="elp-wyg-title">AI Tutor</div>
              <div className="elp-wyg-desc">Ask any Business question and get an instant, exam-relevant answer. Works best for evaluating arguments and checking your reasoning.</div>
              <span className="elp-wyg-tag elp-tag-pro">Premium</span>
            </div>
            <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.28s' }}>
              <div className="elp-wyg-icon" style={{ background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)' }}>&#128202;</div>
              <div className="elp-wyg-title">Progress Tracking</div>
              <div className="elp-wyg-desc">See your mastery across all 20 spec points. Identify weaknesses before your exam and focus your revision where it matters most.</div>
              <span className="elp-wyg-tag elp-tag-pro">Premium</span>
            </div>
            <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.35s' }}>
              <div className="elp-wyg-icon" style={{ background: 'var(--elp-g-bg)', border: '1px solid var(--elp-g-bd)' }}>&#128506;</div>
              <div className="elp-wyg-title">Topic Links Map</div>
              <div className="elp-wyg-desc">Visual map showing how Business topics connect &mdash; essential for 20-mark evaluation questions that expect chains of reasoning across units.</div>
              <span className="elp-wyg-tag elp-tag-free">Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related resources */}
      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow">
          <div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-teal)' }} />
          Also useful
        </div>
        <h2 className="elp-s-title" style={{ fontSize: '22px', marginBottom: '8px' }}>Related resources</h2>
        <div className="elp-resources-row">
          <Link href="/glossary" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128214;</span> Business Glossary
          </Link>
          <Link href="/command-words" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128292;</span> Command Words Guide
          </Link>
          <Link href="/past-papers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128196;</span> Past Papers &amp; Mark Schemes
          </Link>
          <Link href="/economics" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128200;</span> Economics Revision Notes
          </Link>
          <Link href="/topic-links" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128506;</span> Topic Links Map
          </Link>
        </div>
      </div>

      {/* CTA section */}
      <div className="elp-cta-section">
        <div className="elp-cta-bg" />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Ready to start revising?</h2>
          <p className="elp-cta-sub">
            Free notes for every spec point. Adaptive flashcards, quizzes and AI tutor unlock with a 3-day free trial.
          </p>
          <div className="elp-cta-actions">
            <Link
              href="/"
              className="elp-btn-primary"
              style={{ fontSize: '15px', padding: '14px 30px' }}
            >
              Open Revvy Learn &mdash; it&apos;s free &rarr;
            </Link>
            <Link href="/economics" className="elp-btn-secondary">Economics notes instead</Link>
          </div>
          <p className="elp-cta-note">No signup required for notes &middot; Cancel premium anytime &middot; &euro;0.99/month</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="elp-footer">
        <div className="elp-footer-inner">
          <Link href="/" className="elp-footer-logo">
            <span className="elp-nav-dot" style={{ width: '7px', height: '7px' }} />
            Revvy Learn
          </Link>
          <div className="elp-footer-sep" />
          <div className="elp-footer-links">
            <Link href="/economics" className="elp-footer-link">Economics</Link>
            <Link href="/business" className="elp-footer-link">Business</Link>
            <Link href="/glossary" className="elp-footer-link">Glossary</Link>
            <Link href="/past-papers" className="elp-footer-link">Past Papers</Link>
            <Link href="/topic-links" className="elp-footer-link">Topic Links</Link>
          </div>
          <div className="elp-footer-right">Edexcel IAL revision &copy; Revvy Learn</div>
        </div>
      </footer>
    </div>
  );
}
