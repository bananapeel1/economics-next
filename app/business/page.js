import Link from 'next/link';

export const metadata = {
  title: 'IAL Business Revision — WBS11 to WBS14 | Revvy Learn',
  description: 'Free revision notes for all Edexcel IAL Business units: WBS11, WBS12, WBS13, WBS14. Flashcards, 20-mark essay guides and AI tutor included.',
  openGraph: {
    title: 'IAL Business Revision — WBS11 to WBS14 | Revvy Learn',
    description: 'Free revision notes for all Edexcel IAL Business units: WBS11, WBS12, WBS13, WBS14.',
    url: 'https://revvylearn.com/business',
    type: 'article',
  },
};

const units = [
  {
    number: 1,
    title: 'Marketing and People',
    code: 'WBS11',
    description: 'Unit 1 introduces how businesses meet customer needs, the market, marketing mix, managing people, and entrepreneurs and leaders.',
    firstSection: 'meeting-customer-needs',
    landingPage: '/business/unit-1',
    sections: [
      { id: 'meeting-customer-needs', number: '1.1', title: 'Meeting Customer Needs' },
      { id: 'the-market', number: '1.2', title: 'The Market' },
      { id: 'marketing-mix-and-strategy', number: '1.3', title: 'Marketing Mix & Strategy' },
      { id: 'managing-people', number: '1.4', title: 'Managing People' },
      { id: 'entrepreneurs-and-leaders', number: '1.5', title: 'Entrepreneurs & Leaders' },
    ],
  },
  {
    number: 2,
    title: 'Managing Business Activities',
    code: 'WBS12',
    description: 'Unit 2 covers raising finance, financial planning, managing finance, resource management, and external influences on business.',
    firstSection: 'raising-finance',
    landingPage: '/business/unit-2',
    sections: [
      { id: 'raising-finance', number: '2.1', title: 'Raising Finance' },
      { id: 'financial-planning', number: '2.2', title: 'Financial Planning' },
      { id: 'managing-finance', number: '2.3', title: 'Managing Finance' },
      { id: 'resource-management', number: '2.4', title: 'Resource Management' },
      { id: 'external-influences', number: '2.5', title: 'External Influences' },
    ],
  },
  {
    number: 3,
    title: 'Business Decisions and Strategy',
    code: 'WBS13',
    description: 'Unit 3 examines business objectives and strategy, business growth, decision-making techniques, influences on business decisions, and assessing competitiveness.',
    firstSection: 'business-objectives-strategy',
    sections: [
      { id: 'business-objectives-strategy', number: '3.1', title: 'Business Objectives & Strategy' },
      { id: 'business-growth', number: '3.2', title: 'Business Growth' },
      { id: 'decision-making-techniques', number: '3.3', title: 'Decision-Making Techniques' },
      { id: 'influences-on-business-decisions', number: '3.4', title: 'Influences on Business Decisions' },
      { id: 'assessing-competitiveness', number: '3.5', title: 'Assessing Competitiveness' },
      { id: 'managing-change', number: '3.6', title: 'Managing Change' },
    ],
  },
  {
    number: 4,
    title: 'Global Business',
    code: 'WBS14',
    description: 'Unit 4 explores globalisation, global markets and business expansion, global marketing, and global industries and companies.',
    firstSection: 'globalisation',
    sections: [
      { id: 'globalisation', number: '4.1', title: 'Globalisation' },
      { id: 'global-markets-and-business-expansion', number: '4.2', title: 'Global Markets & Business Expansion' },
      { id: 'global-marketing', number: '4.3', title: 'Global Marketing' },
      { id: 'global-industries-and-companies-mn', number: '4.4', title: 'Global Industries & Companies (MNCs)' },
    ],
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
      "name": `Unit ${u.number}: ${u.title} (${u.code})`
    }))
  };

  return (
    <div className="resource-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Edexcel IAL Business Revision Notes</h1>
        <p className="resource-page-subtitle">
          Complete revision notes for Edexcel International A-Level Business (WBS11, WBS12, WBS13 &amp; WBS14). All 4 units with interactive study tools.
        </p>
      </div>

      {/* Hero CTA */}
      <div className="seo-hero-cta">
        <div className="seo-hero-cta-content">
          <div className="seo-hero-cta-text">
            <span className="seo-hero-cta-label">Interactive Revision</span>
            <p>Flashcards, quizzes, AI tutor &amp; progress tracking for all 4 units</p>
          </div>
          <Link href="/?section=meeting-customer-needs" className="seo-hero-cta-button">
            Open in App &rarr;
          </Link>
        </div>
      </div>

      {units.map(unit => (
        <div key={unit.number} className="seo-content-section">
          <h2>Unit {unit.number}: {unit.title} ({unit.code})</h2>
          <p>{unit.description}</p>
          <div className="seo-topic-grid">
            {unit.sections.map(s => (
              <Link key={s.id} href={`/?section=${s.id}`} className="seo-topic-card">
                <span className="seo-topic-number">{s.number}</span>
                <span className="seo-topic-title">{s.title}</span>
              </Link>
            ))}
          </div>
          <Link href={`/?section=${unit.firstSection}`} className="seo-unit-link">
            Start revising Unit {unit.number} in the App &rarr;
          </Link>
        </div>
      ))}

      <div className="seo-related-links">
        <h2>Related Resources</h2>
        <div className="seo-links-grid">
          <Link href="/glossary">Business Glossary</Link>
          <Link href="/command-words">Command Words Guide</Link>
          <Link href="/past-papers">Past Papers &amp; Mark Schemes</Link>
          <Link href="/economics">Economics Revision Notes</Link>
        </div>
      </div>

      <div className="seo-cta">
        <h2>Start Revising with Interactive Tools</h2>
        <p>Access flashcards, quizzes, AI tutor and more for every Business topic.</p>
        <Link href="/?section=meeting-customer-needs" className="seo-cta-button">Open Revvy Learn &rarr;</Link>
      </div>
    </div>
  );
}
