import Link from 'next/link';

export const metadata = {
  title: 'Edexcel IAL Economics Revision Notes — Units 1\u20134 | Revvy Learn',
  description: 'Complete revision notes for Edexcel International A-Level Economics. Covers Unit 1 Markets in Action (WEC11), Unit 2 Macroeconomic Performance (WEC12), Unit 3 Business Behaviour (WEC13) and Unit 4 Global Economy (WEC14). Free notes, diagrams and practice questions.',
  openGraph: {
    title: 'Edexcel IAL Economics Revision Notes — Units 1\u20134 | Revvy Learn',
    description: 'Complete free revision notes for all Edexcel IAL Economics units: WEC11, WEC12, WEC13, WEC14. Diagrams, flashcards and practice questions.',
    url: 'https://revvylearn.com/economics',
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

const unit2Sections = [
  { id: 'measures-economic-performance', number: '2.3.1', title: 'Measures of Economic Performance' },
  { id: 'aggregate-demand', number: '2.3.2', title: 'Aggregate Demand' },
  { id: 'aggregate-supply', number: '2.3.3', title: 'Aggregate Supply' },
  { id: 'national-income', number: '2.3.4', title: 'National Income' },
  { id: 'economic-growth', number: '2.3.5', title: 'Economic Growth' },
  { id: 'macroeconomic-objectives-policies', number: '2.3.6', title: 'Macroeconomic Objectives & Policies' },
];

const unit3Sections = [
  { id: 'types-sizes-businesses', number: '3.3.1', title: 'Types and Sizes of Businesses' },
  { id: 'revenue-costs-profits', number: '3.3.2', title: 'Revenue, Costs and Profits' },
  { id: 'market-structures-contestability', number: '3.3.3', title: 'Market Structures and Contestability' },
  { id: 'labour-markets', number: '3.3.4', title: 'Labour Markets' },
  { id: 'government-intervention-firms', number: '3.3.5', title: 'Government Intervention' },
];

const unit4Sections = [
  { id: 'causes-effects-globalisation', number: '4.3.1', title: 'Causes and Effects of Globalisation' },
  { id: 'trade-global-economy', number: '4.3.2', title: 'Trade and the Global Economy' },
  { id: 'balance-payments-exchange-rates', number: '4.3.3', title: 'Balance of Payments, Exchange Rates and International Competitiveness' },
  { id: 'poverty-inequality', number: '4.3.4', title: 'Poverty and Inequality' },
  { id: 'role-state-macroeconomy', number: '4.3.5', title: 'The Role of the State in the Macroeconomy' },
  { id: 'growth-development', number: '4.3.6', title: 'Growth and Development' },
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

  return (
    <div className="resource-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Edexcel IAL Economics Revision Notes</h1>
        <p className="resource-page-subtitle">
          Complete revision notes for Edexcel International A-Level Economics (WEC11, WEC12, WEC13 &amp; WEC14). Covers all four units with interactive tools.
        </p>
      </div>

      <div className="seo-content-section">
        <h2>Unit 1: Markets in Action (WEC11)</h2>
        <p>
          Unit 1 covers the fundamentals of microeconomics. You will study how markets work, the forces of supply and demand, how prices are determined, why markets fail, and how governments intervene to correct market failure.
        </p>
        <div className="seo-topic-grid">
          {unit1Sections.map(s => (
            <Link key={s.id} href={`/?section=${s.id}`} className="seo-topic-card">
              <span className="seo-topic-number">{s.number}</span>
              <span className="seo-topic-title">{s.title}</span>
            </Link>
          ))}
        </div>
        <Link href="/?section=introductory-concepts" className="seo-unit-link">
          Start revising Unit 1 &rarr;
        </Link>
      </div>

      <div className="seo-content-section">
        <h2>Unit 2: Macroeconomic Performance &amp; Policy (WEC12)</h2>
        <p>
          Unit 2 focuses on macroeconomics. Topics include measuring economic performance, aggregate demand and supply, national income, economic growth, and government macroeconomic policies.
        </p>
        <div className="seo-topic-grid">
          {unit2Sections.map(s => (
            <Link key={s.id} href={`/?section=${s.id}`} className="seo-topic-card">
              <span className="seo-topic-number">{s.number}</span>
              <span className="seo-topic-title">{s.title}</span>
            </Link>
          ))}
        </div>
        <Link href="/?section=measures-economic-performance" className="seo-unit-link">
          Start revising Unit 2 &rarr;
        </Link>
      </div>

      <div className="seo-content-section">
        <h2>Unit 3: Business Behaviour (WEC13)</h2>
        <p>
          Unit 3 examines the theory of the firm. Topics include business objectives, revenue and cost theory, market structures (perfect competition, monopolistic competition, oligopoly, monopoly), labour markets, and government intervention in product and labour markets.
        </p>
        <div className="seo-topic-grid">
          {unit3Sections.map(s => (
            <Link key={s.id} href={`/?section=${s.id}`} className="seo-topic-card">
              <span className="seo-topic-number">{s.number}</span>
              <span className="seo-topic-title">{s.title}</span>
            </Link>
          ))}
        </div>
        <Link href="/?section=types-sizes-businesses" className="seo-unit-link">
          Start revising Unit 3 &rarr;
        </Link>
      </div>

      <div className="seo-content-section">
        <h2>Unit 4: Developments in the Global Economy (WEC14)</h2>
        <p>
          Unit 4 covers the global economy. Topics include globalisation, international trade, exchange rates and the balance of payments, poverty and inequality, the role of the state, and strategies for growth and development in emerging economies.
        </p>
        <div className="seo-topic-grid">
          {unit4Sections.map(s => (
            <Link key={s.id} href={`/?section=${s.id}`} className="seo-topic-card">
              <span className="seo-topic-number">{s.number}</span>
              <span className="seo-topic-title">{s.title}</span>
            </Link>
          ))}
        </div>
        <Link href="/?section=causes-effects-globalisation" className="seo-unit-link">
          Start revising Unit 4 &rarr;
        </Link>
      </div>

      <div className="seo-related-links">
        <h2>Related Resources</h2>
        <div className="seo-links-grid">
          <Link href="/glossary">Economics Glossary</Link>
          <Link href="/command-words">Command Words Guide</Link>
          <Link href="/past-papers">Past Papers &amp; Mark Schemes</Link>
          <Link href="/business">Business Revision Notes</Link>
        </div>
      </div>

      <div className="seo-cta">
        <h2>Start Revising with Interactive Tools</h2>
        <p>Access flashcards, quizzes, AI tutor and more for every Economics topic.</p>
        <Link href="/" className="seo-cta-button">Open Revvy Learn App</Link>
      </div>
    </div>
  );
}
