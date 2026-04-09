import Link from 'next/link';
import EconomicsScrollBar from './EconomicsScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Edexcel IAL Economics Notes — Free Revision for Units 1–4 (2026)',
  description: 'Free Edexcel IAL Economics revision notes for all units: Markets in Action (WEC11), Macroeconomic Performance (WEC12), Business Behaviour (WEC13) and Global Economy (WEC14). Interactive notes with diagrams, flashcards, quizzes and AI tutor.',
  alternates: { canonical: 'https://revvylearn.com/economics' },
  openGraph: {
    title: 'Edexcel IAL Economics Notes — Free Revision Units 1–4 | Revvy Learn',
    description: 'Free interactive revision for all Edexcel IAL Economics units. Notes, diagrams, flashcards, quizzes and AI tutor.',
    url: 'https://revvylearn.com/economics',
    type: 'article',
  },
};

const unit1Sections = [
  { id: 'introductory-concepts', number: '1.3.1', title: 'Introductory Concepts', meta: 'Scarcity, PPF, specialisation, price mechanism' },
  { id: 'consumer-behaviour-demand', number: '1.3.2', title: 'Consumer Behaviour & Demand', meta: 'Utility, demand curves, determinants of demand' },
  { id: 'supply', number: '1.3.3', title: 'Supply', meta: 'Supply curves, determinants, shifts' },
  { id: 'price-determination', number: '1.3.4', title: 'Price Determination', meta: 'Equilibrium, PED, PES, taxes & subsidies' },
  { id: 'market-failure', number: '1.3.5', title: 'Market Failure', meta: 'Externalities, public goods, information failure' },
  { id: 'government-intervention', number: '1.3.6', title: 'Government Intervention', meta: 'Taxes, subsidies, price controls, regulation' },
];

const unit2Sections = [
  { id: 'measures-economic-performance', number: '2.3.1', title: 'Measures of Economic Performance', meta: 'GDP, inflation, unemployment, BoP' },
  { id: 'aggregate-demand', number: '2.3.2', title: 'Aggregate Demand', meta: 'Components of AD, shifts, multiplier' },
  { id: 'aggregate-supply', number: '2.3.3', title: 'Aggregate Supply', meta: 'SRAS, LRAS, productive capacity' },
  { id: 'national-income', number: '2.3.4', title: 'National Income', meta: 'Circular flow, equilibrium, injections & leakages' },
  { id: 'economic-growth', number: '2.3.5', title: 'Economic Growth', meta: 'Actual vs potential, business cycles, living standards' },
  { id: 'macroeconomic-objectives-policies', number: '2.3.6', title: 'Macroeconomic Objectives & Policies', meta: 'Fiscal, monetary, supply-side policy; conflicts' },
];

const unit3Sections = [
  { id: 'types-sizes-businesses', number: '3.3.1', title: 'Types and Sizes of Businesses', meta: 'Objectives, growth, integration' },
  { id: 'revenue-costs-profits', number: '3.3.2', title: 'Revenue, Costs and Profits', meta: 'TR, TC, AR, MR, AC, MC, profit maximisation' },
  { id: 'market-structures-contestability', number: '3.3.3', title: 'Market Structures & Contestability', meta: 'Perfect competition, monopoly, oligopoly' },
  { id: 'labour-markets', number: '3.3.4', title: 'Labour Markets', meta: 'MRP, wage determination, monopsony' },
  { id: 'government-intervention-firms', number: '3.3.5', title: 'Government Intervention', meta: 'Competition policy, regulation, privatisation' },
];

const unit4Sections = [
  { id: 'causes-effects-globalisation', number: '4.3.1', title: 'Causes and Effects of Globalisation', meta: 'MNCs, trade blocs, benefits & costs' },
  { id: 'trade-global-economy', number: '4.3.2', title: 'Trade and the Global Economy', meta: 'Comparative advantage, free trade, protectionism' },
  { id: 'balance-payments-exchange-rates', number: '4.3.3', title: 'BoP, Exchange Rates & Competitiveness', meta: 'Current account, Marshall-Lerner, J-curve' },
  { id: 'poverty-inequality', number: '4.3.4', title: 'Poverty and Inequality', meta: 'Lorenz curve, Gini coefficient, relative vs absolute poverty' },
  { id: 'role-state-macroeconomy', number: '4.3.5', title: 'The Role of the State in the Macroeconomy', meta: 'Public goods, merit goods, redistribution' },
  { id: 'growth-development', number: '4.3.6', title: 'Growth and Development', meta: 'HDI, development strategies, barriers to growth' },
];

const units = [
  {
    num: 1,
    heading: 'Markets in Action',
    code: 'WEC11',
    desc: 'The fundamentals of microeconomics \u2014 how markets work, the forces of supply and demand, price determination, why markets fail, and how governments intervene.',
    sections: unit1Sections,
    ctaSection: 'introductory-concepts',
  },
  {
    num: 2,
    heading: 'Macroeconomic Performance & Policy',
    code: 'WEC12',
    desc: 'Macroeconomics \u2014 measuring performance, aggregate demand and supply, national income, economic growth, and government macroeconomic policies.',
    sections: unit2Sections,
    ctaSection: 'measures-economic-performance',
  },
  {
    num: 3,
    heading: 'Business Behaviour',
    code: 'WEC13',
    desc: 'Theory of the firm \u2014 business objectives, revenue and cost theory, market structures from perfect competition to monopoly, labour markets, and government intervention.',
    sections: unit3Sections,
    ctaSection: 'types-sizes-businesses',
  },
  {
    num: 4,
    heading: 'Developments in the Global Economy',
    code: 'WEC14',
    desc: 'The global economy \u2014 globalisation, international trade, exchange rates and the balance of payments, poverty and inequality, the role of the state, and development strategies.',
    sections: unit4Sections,
    ctaSection: 'causes-effects-globalisation',
  },
];

export default function EconomicsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Edexcel International A-Level Economics",
    "description": "Complete revision course covering microeconomics and macroeconomics for the Edexcel IAL Economics specification.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Revvy Learn",
      "url": "https://revvylearn.com"
    },
    "hasCourseInstance": [
      { "@type": "CourseInstance", "name": "Unit 1: Markets in Action (WEC11)" },
      { "@type": "CourseInstance", "name": "Unit 2: Macroeconomic Performance & Policy (WEC12)" },
      { "@type": "CourseInstance", "name": "Unit 3: Business Behaviour (WEC13)" },
      { "@type": "CourseInstance", "name": "Unit 4: Developments in the Global Economy (WEC14)" }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Edexcel IAL Economics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Edexcel IAL (International A-Level) Economics is a globally recognised qualification offered by Pearson Edexcel. It is designed for international students and covers microeconomics, macroeconomics, business behaviour and the global economy across four units (WEC11–WEC14). IAL exams are available in January and June exam series."
        }
      },
      {
        "@type": "Question",
        "name": "How many units are in Edexcel IAL Economics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There are four units: Unit 1 Markets in Action (WEC11), Unit 2 Macroeconomic Performance and Policy (WEC12), Unit 3 Business Behaviour (WEC13), and Unit 4 Developments in the Global Economy (WEC14). Each unit has six spec points covering the full range of economic theory."
        }
      },
      {
        "@type": "Question",
        "name": "What topics are covered in IAL Economics Unit 1?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unit 1 (WEC11) Markets in Action covers six spec points: introductory concepts (scarcity, PPF, specialisation), consumer behaviour and demand, supply, price determination (equilibrium, elasticity), market failure (externalities, public goods, information failure), and government intervention (taxes, subsidies, regulation)."
        }
      },
      {
        "@type": "Question",
        "name": "Is Edexcel IAL the same as A-Level Economics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IAL (International A-Level) and domestic UK A-Level Economics share similar content but have different exam structures. IAL exams are modular — you can sit individual units in January or June — while the UK A-Level is linear with all exams in June. IAL is specifically designed for international students and is offered at exam centres worldwide."
        }
      }
    ]
  };

  return (
    <div className="elp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Scroll progress bar (client component) */}
      <EconomicsScrollBar />

      {/* Minimal header */}
      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo">
          <span className="elp-nav-dot" />
          Revvy Learn
        </Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb">
          Economics <span>/ Revision Notes</span>
        </div>
      </nav>

      {/* Hero */}
      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow">Edexcel IAL &middot; WEC11, WEC12, WEC13, WEC14</div>
            <h1 className="elp-hero-title">
              Economics revision<br />that <em>actually sticks</em>
            </h1>
            <p className="elp-hero-desc">
              Free revision notes for all four Edexcel IAL Economics units &mdash; structured around the spec, with adaptive practice, AI tutor, and spaced repetition built in.
            </p>
            <div className="elp-hero-actions">
              <Link href="/?section=introductory-concepts" className="elp-btn-primary">
                Start revising free &rarr;
              </Link>
              <Link href="#units" className="elp-btn-secondary">Browse all topics</Link>
            </div>
            <div className="elp-hero-proof">
              <div className="elp-proof-item"><strong>Free</strong> notes for every spec point</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item"><strong>4 units</strong> &middot; 24 spec points</div>
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
                <div className="elp-preview-section-title">1.3.5 &mdash; Market Failure</div>
                <div className="elp-preview-key-idea">
                  <div className="elp-pki-label">&#128273; Key idea</div>
                  <div className="elp-pki-text">
                    Markets fail when prices give people the wrong signals &mdash; causing too much or too little to be produced relative to what&apos;s best for society.
                  </div>
                </div>
                <div className="elp-preview-bullets">
                  <div className="elp-pb">
                    <div className="elp-pb-line" style={{ background: 'var(--elp-green)' }} />
                    <div className="elp-pb-text"><strong>Negative externality</strong> &mdash; cost imposed on third parties not in the transaction; causes overproduction.</div>
                  </div>
                  <div className="elp-pb">
                    <div className="elp-pb-line" style={{ background: 'var(--elp-blue)' }} />
                    <div className="elp-pb-text">Private cost &lt; social cost &rarr; market price is <strong>too low</strong> &rarr; output above social optimum.</div>
                  </div>
                  <div className="elp-pb">
                    <div className="elp-pb-line" style={{ background: 'var(--elp-amber)' }} />
                    <div className="elp-pb-text"><strong>Deadweight welfare loss</strong> &mdash; market produces beyond MSC = MSB; total welfare is reduced.</div>
                  </div>
                </div>
                <div className="elp-preview-flow">
                  <div className="elp-pf-step">Factory ignores pollution cost</div>
                  <div className="elp-pf-arrow">&rarr;</div>
                  <div className="elp-pf-step">P &lt; Social Cost</div>
                  <div className="elp-pf-arrow">&rarr;</div>
                  <div className="elp-pf-step">Overproduction</div>
                  <div className="elp-pf-arrow">&rarr;</div>
                  <div className="elp-pf-result">Welfare loss</div>
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
              <div className="elp-feat-sub">Every WEC11&ndash;14 point covered</div>
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
              <div className="elp-feat-sub">Ask any Economics question</div>
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
            <h2 className="elp-s-title">Everything you need to revise Economics</h2>
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
              <div className="elp-wyg-desc">Ask any Economics question and get an instant, exam-relevant answer. Works best for evaluating arguments and checking your reasoning.</div>
              <span className="elp-wyg-tag elp-tag-pro">Premium</span>
            </div>
            <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.28s' }}>
              <div className="elp-wyg-icon" style={{ background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)' }}>&#128202;</div>
              <div className="elp-wyg-title">Progress Tracking</div>
              <div className="elp-wyg-desc">See your mastery across all 24 spec points. Identify weaknesses before your exam and focus your revision where it matters most.</div>
              <span className="elp-wyg-tag elp-tag-pro">Premium</span>
            </div>
            <div className="elp-wyg-card elp-fade-up" style={{ transitionDelay: '.35s' }}>
              <div className="elp-wyg-icon" style={{ background: 'var(--elp-g-bg)', border: '1px solid var(--elp-g-bd)' }}>&#128506;</div>
              <div className="elp-wyg-title">Topic Links Map</div>
              <div className="elp-wyg-desc">Visual map showing how Economics topics connect &mdash; essential for 12-mark evaluation questions that expect chains of reasoning across units.</div>
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
            <span className="elp-resource-chip-icon">&#128214;</span> Economics Glossary
          </Link>
          <Link href="/command-words" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128292;</span> Command Words Guide
          </Link>
          <Link href="/past-papers" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#128196;</span> Past Papers &amp; Mark Schemes
          </Link>
          <Link href="/business" className="elp-resource-chip">
            <span className="elp-resource-chip-icon">&#127970;</span> Business Revision Notes
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
            <Link href="/business" className="elp-btn-secondary">Business notes instead</Link>
          </div>
          <p className="elp-cta-note">No signup required for notes &middot; Cancel premium anytime &middot; &euro;0.99/month</p>
        </div>
      </div>

      {/* SEO copy */}
      <section className="sr-only">
        <h2>About Edexcel IAL Economics</h2>
        <p>
          Edexcel International A-Level (IAL) Economics is one of the most popular qualifications for students at international schools worldwide. Offered by Pearson Edexcel, the IAL Economics specification covers the full range of economic theory across four units: Unit 1 Markets in Action (WEC11) introduces microeconomic fundamentals including supply, demand, elasticity, market failure and government intervention. Unit 2 Macroeconomic Performance and Policy (WEC12) covers aggregate demand and supply, national income, economic growth and macroeconomic policy tools.
        </p>
        <p>
          At A2 level, Unit 3 Business Behaviour (WEC13) examines the theory of the firm, market structures from perfect competition to monopoly, labour markets and competition policy. Unit 4 Developments in the Global Economy (WEC14) explores globalisation, international trade, exchange rates, poverty and inequality, and development economics.
        </p>
        <p>
          Revvy Learn provides free revision notes for every spec point across all four IAL Economics units. Unlike generic revision sites, our content is specifically built for the Edexcel IAL specification and is used by students in South Korea, Hong Kong, Malaysia, Singapore, Pakistan, Sri Lanka and across the Middle East. Each topic includes structured notes, diagrams, adaptive flashcards with spaced repetition, exam-style practice questions with model answers, and an AI tutor that helps you build evaluation chains for 20-mark essays.
        </p>
        <p>
          IAL Economics exams are available in both the January and June exam series, giving international students flexibility in when they sit each unit. Whether you are preparing for the January or June session, Revvy Learn covers the complete specification to help you achieve the highest grades.
        </p>
      </section>

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
