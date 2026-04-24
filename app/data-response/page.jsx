import Link from 'next/link';
import './markdown-page.css';

export const metadata = {
  title: 'IAL Data-Response Practice — Edexcel Economics & Business | Revvy Learn',
  description: 'Free stimulus-based data-response practice for Edexcel IAL Economics and Business. Real 2024–2026 scenarios, 2/6/10-mark question ladders, KAA+E model answers with examiner commentary.',
  alternates: { canonical: 'https://revvylearn.com/data-response' },
  openGraph: {
    title: 'IAL Data-Response Practice | Revvy Learn',
    description: 'Free stimulus-based practice with KAA+E model answers, for Edexcel International A-Level Economics and Business.',
    url: 'https://revvylearn.com/data-response',
    type: 'article',
  },
};

const PIECES = [
  {
    slug: 'econ-u1-market-failure',
    subject: 'Economics · Unit 1',
    title: 'Market Failure — UAE plastics & GCC sugar tax',
    blurb: 'Externalities, Pigouvian taxes and elasticity, using the UAE single-use plastics charge and GCC sugar-tax debate.',
  },
  {
    slug: 'econ-u1-demand-elasticity',
    subject: 'Economics · Unit 1',
    title: 'Demand Elasticity — India telecoms price rises',
    blurb: 'PED, YED and XED with ARPU data from Jio, Airtel and Vi after 2024 tariff increases.',
  },
  {
    slug: 'econ-u1-price-determination',
    subject: 'Economics · Unit 1',
    title: 'Price Determination — Red Sea & Panama disruption',
    blurb: 'Supply shifts, equilibrium and surplus analysis using the Drewry container-freight index from 2023–2026.',
  },
  {
    slug: 'bus-u1-marketing-mix',
    subject: 'Business · Unit 1',
    title: 'Marketing Mix — BYD\u2019s Gulf push',
    blurb: 'Integrated 4Ps, Boston Matrix and product life cycle using BYD\u2019s pricing and Euro 2024 sponsorship strategy.',
  },
  {
    slug: 'bus-u1-meeting-customer-needs',
    subject: 'Business · Unit 1',
    title: 'Meeting Customer Needs — Shein/Temu vs Modanisa',
    blurb: 'Segmentation, niche vs mass markets and market-research cost-benefit in GCC fashion ecommerce.',
  },
  {
    slug: 'bus-u1-the-market',
    subject: 'Business · Unit 1',
    title: 'The Market — Ozempic supply shortage',
    blurb: 'Demand shifts, inelastic supply and tiered pricing using the global Ozempic/Wegovy supply crunch.',
  },
];

export default function DataResponseIndex() {
  return (
    <div className="data-response-wrap">
      <nav className="data-response-crumbs">
        <Link href="/">Home</Link> &rsaquo; Data Response
      </nav>
      <h1>IAL Data-Response Practice</h1>
      <p className="data-response-index-intro">
        Stimulus-based practice pieces mapped to the Edexcel IAL Economics and Business specs.
        Each piece uses a recent (2024–2026) real-world scenario, a 2/6/10-mark question ladder,
        and fully worked KAA+E model answers with Level 3 vs Level 4 examiner notes and common-mistake callouts.
        All free to use — no signup required.
      </p>

      <div className="data-response-grid">
        {PIECES.map(p => (
          <Link key={p.slug} href={`/data-response/${p.slug}`} className="data-response-card">
            <div className="data-response-card-tag">{p.subject}</div>
            <h3>{p.title}</h3>
            <p>{p.blurb}</p>
          </Link>
        ))}
      </div>

      <div className="data-response-footer">
        <Link href="/economics">All Economics notes</Link>
        <Link href="/business">All Business notes</Link>
        <Link href="/model-answers">Model Answers</Link>
        <Link href="/past-papers">Past Papers</Link>
        <Link href="/command-words">Command Words</Link>
      </div>
    </div>
  );
}
