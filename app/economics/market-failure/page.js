import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';
import RelatedModelAnswers from '@/components/RelatedModelAnswers';

export const metadata = {
  title: 'Market Failure | IAL Economics WEC11 Complete Revision Notes',
  description: 'Complete market failure revision for Edexcel IAL Economics Unit 1 (WEC11). All types explained: externalities, public goods, merit & demerit goods, information failure, monopoly power. Diagrams, model answers and exam technique.',
  alternates: { canonical: 'https://revvylearn.com/economics/market-failure' },
  openGraph: {
    title: 'Market Failure | IAL Economics WEC11 Complete Revision Notes | Revvy Learn',
    description: 'The complete Edexcel IAL Economics guide to market failure: every type, every diagram, every model answer. Externalities, public goods, merit goods and more.',
    url: 'https://revvylearn.com/economics/market-failure',
    type: 'article',
  },
};

const TYPES_OF_FAILURE = [
  {
    slug: 'negative-externalities',
    number: 1,
    name: 'Negative externalities',
    shortDef: 'Costs imposed on third parties not in the transaction.',
    detail: 'Occurs when production or consumption of a good imposes costs on people outside the market. The marginal private cost (MPC) is below the marginal social cost (MSC), so the market overproduces at a price too low to reflect the true cost.',
    example: 'Factory pollution, passive smoking, road congestion.',
    diagram: 'MPC and MSC curves, with MSC above MPC. The welfare loss triangle sits between them at market-equilibrium quantity.',
  },
  {
    slug: 'positive-externalities',
    number: 2,
    name: 'Positive externalities',
    shortDef: 'Benefits enjoyed by third parties who did not pay for the good.',
    detail: 'Private benefits (MPB) fall below social benefits (MSB). The free market underproduces the good because consumers only consider their own benefit, not the spillover benefit to others.',
    example: 'Vaccinations, education, public libraries, bee-keeping near orchards.',
    diagram: 'MPB and MSB curves, with MSB above MPB. Welfare loss triangle is the area of underproduction.',
  },
  {
    slug: 'public-goods',
    number: 3,
    name: 'Public goods',
    shortDef: 'Goods that are non-excludable and non-rival.',
    detail: 'A pure public good cannot exclude non-payers (non-excludability) and one person\u2019s use does not reduce availability for others (non-rivalry). These two properties create the free-rider problem \u2014 no one reveals their willingness to pay, so the private market produces nothing. This is an example of complete market failure.',
    example: 'National defence, street lighting, flood defences, lighthouses.',
    diagram: 'Demonstrated through the free-rider problem rather than a standard supply-demand diagram.',
  },
  {
    slug: 'merit-goods',
    number: 4,
    name: 'Merit goods',
    shortDef: 'Goods under-consumed because consumers underestimate private benefits.',
    detail: 'Merit goods generate private benefits that consumers underestimate, usually because of information failure. They may also generate positive externalities. Government typically intervenes through subsidy, direct provision, or information campaigns.',
    example: 'Healthcare, education, pension saving, dental check-ups.',
    diagram: 'Same structure as positive externalities: MSB above MPB, with underconsumption at the free-market price.',
  },
  {
    slug: 'demerit-goods',
    number: 5,
    name: 'Demerit goods',
    shortDef: 'Goods over-consumed because consumers underestimate private costs.',
    detail: 'Demerit goods impose private costs on the consumer that they themselves fail to account for (often due to information failure or addiction), and typically impose external costs too. Government response: indirect taxes, advertising bans, minimum legal age, regulation.',
    example: 'Cigarettes, alcohol, gambling, high-sugar drinks, recreational drugs.',
    diagram: 'Same structure as negative externalities: MSC above MPC, with overconsumption at the free-market price.',
  },
  {
    slug: 'information-failure',
    number: 6,
    name: 'Information failure',
    shortDef: 'One or both sides of a transaction lack full information.',
    detail: 'Covers asymmetric information (one party knows more than the other), adverse selection (e.g. the \u201clemons\u201d used-car problem), and moral hazard (taking more risk because you are insured). Without good information, consumers and producers cannot make rational decisions, and resources are misallocated.',
    example: 'Used-car sales, insurance markets, pension products, prescription medicine.',
    diagram: 'Typically analysed through market-level outcomes rather than a single diagram. For pensions and healthcare, use the merit-good diagram to show underconsumption.',
  },
  {
    slug: 'monopoly-power',
    number: 7,
    name: 'Monopoly power and abuse of market power',
    shortDef: 'A single firm or small group restricts output to raise price.',
    detail: 'When firms have significant market power they can charge a price above marginal cost, reducing allocative efficiency and creating a deadweight welfare loss. This is often treated as a separate category or analysed in Unit 3 (WEC13), but is examinable as a form of market failure in Unit 1 too.',
    example: 'Natural monopolies (utilities), dominant tech platforms, pharmaceutical patents.',
    diagram: 'Monopoly diagram: price above P = MC, quantity below socially optimum, deadweight loss triangle.',
  },
];

const FAQS = [
  {
    q: 'What is market failure in economics?',
    a: 'Market failure happens when a free market, left to itself, does not allocate resources efficiently. In a perfectly functioning market, resources flow to where marginal social benefit (MSB) equals marginal social cost (MSC). When the price mechanism fails to reflect all costs and benefits \u2014 for example because of externalities, missing information, public goods or monopoly power \u2014 the market produces too much or too little of a good and total welfare falls.',
  },
  {
    q: 'What are the main types of market failure in Edexcel IAL Economics?',
    a: 'For WEC11 you should be able to explain negative externalities, positive externalities, public goods, merit goods, demerit goods, and information failure. Monopoly power and abuse of market power are also examinable as a form of market failure. Some mark schemes group merit/demerit goods with externalities, which is why you will see the types listed as four, five or six depending on the source.',
  },
  {
    q: 'What are the 4 types of market failure?',
    a: 'The most common four-category framework is: (1) externalities, (2) public goods, (3) information failure, (4) market power. This is the minimum you need to know. Edexcel IAL expects you to go deeper \u2014 splitting externalities into positive and negative, and treating merit and demerit goods as distinct categories.',
  },
  {
    q: 'What are the 5 types of market failure?',
    a: 'A five-type framework usually lists: (1) negative externalities, (2) positive externalities, (3) public goods, (4) merit and demerit goods (combined), (5) information failure. For WEC11 answers, be ready to add monopoly power as a sixth category if the question invites it.',
  },
  {
    q: 'What are the 6 types of market failure?',
    a: 'The six-type framework covers: (1) negative externalities, (2) positive externalities, (3) public goods, (4) merit goods, (5) demerit goods, (6) information failure. Some textbooks replace one of these with monopoly power. All are examinable in IAL Economics Unit 1.',
  },
  {
    q: 'What is the difference between partial and complete market failure?',
    a: 'Partial market failure is when a market exists but produces the wrong quantity \u2014 for example, a market for cigarettes overproduces because of negative externalities. Complete market failure is when a market fails to exist at all \u2014 for example, no private firm will supply national defence, because of the free-rider problem in pure public goods.',
  },
  {
    q: 'How does the government correct market failure?',
    a: 'Governments use indirect taxes (to reduce consumption of demerit goods), subsidies (to encourage merit goods), regulation and legislation (minimum standards, quotas, bans), direct provision of public goods, and information campaigns to reduce information failure. Every intervention carries risks \u2014 poor information, unintended consequences and regulatory capture can all lead to government failure.',
  },
  {
    q: 'What is a market failure diagram?',
    a: 'The standard market failure diagram shows marginal private and marginal social curves, with the gap between them indicating the externality. For a negative externality, MSC sits above MPC and the welfare loss is the triangle between them at the free-market quantity. For positive externalities and merit goods, MSB sits above MPB and the welfare loss is the triangle of underproduction.',
  },
  {
    q: 'Is market failure the same as market inefficiency?',
    a: 'They are related but not identical. Market inefficiency is any departure from allocative or productive efficiency. Market failure is a specific cause of inefficiency, where the free market mechanism itself is unable to reach the socially optimal outcome without intervention.',
  },
];

export default async function MarketFailurePillarPage() {
  const supabase = createServerClient();

  const [{ data: notes }, { data: practice }] = await Promise.all([
    supabase.from('section_notes').select('data').eq('section_id', 'market-failure').single(),
    supabase.from('section_practice').select('data').eq('section_id', 'market-failure').single(),
  ]);

  const notesData = notes?.data || [];
  const practiceData = (practice?.data || []).slice(0, 4);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const learningResourceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: 'Market Failure \u2014 Edexcel IAL Economics (WEC11) Complete Guide',
    description: 'Comprehensive revision notes on market failure for Edexcel International A-Level Economics Unit 1 (WEC11). Covers every type of market failure with diagrams, real examples and exam technique.',
    url: 'https://revvylearn.com/economics/market-failure',
    educationalLevel: 'Advanced Level',
    learningResourceType: 'Revision Notes',
    teaches: 'Market failure, externalities, public goods, merit and demerit goods, information failure, government intervention',
    educationalUse: 'revision',
    inLanguage: 'en-GB',
    isAccessibleForFree: true,
    audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Revvy Learn',
      url: 'https://revvylearn.com',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://revvylearn.com' },
      { '@type': 'ListItem', position: 2, name: 'Economics', item: 'https://revvylearn.com/economics' },
      { '@type': 'ListItem', position: 3, name: 'Unit 1: Markets in Action', item: 'https://revvylearn.com/economics/unit-1' },
      { '@type': 'ListItem', position: 4, name: 'Market Failure' },
    ],
  };

  return (
    <div className="resource-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="resource-page-header">
        <Link href="/economics/unit-1" className="resource-back-link">&larr; Unit 1: Markets in Action</Link>
        <span className="seo-unit-badge">Section 1.3.5 &middot; WEC11</span>
        <h1 className="resource-page-title">Market Failure &mdash; Edexcel IAL Economics (WEC11) Complete Guide</h1>
        <p className="resource-page-subtitle">
          Every type of market failure on the Edexcel IAL Economics specification, with diagrams, real examples, model answers and exam technique for WEC11.
        </p>
      </div>

      <div className="seo-hero-cta">
        <div className="seo-hero-cta-content">
          <div className="seo-hero-cta-text">
            <span className="seo-hero-cta-label">Interactive Revision</span>
            <p>Flashcards, quizzes, AI tutor and progress tracking for this topic</p>
          </div>
          <Link href="/economics/unit-1/market-failure" className="seo-hero-cta-button">
            Open in app &rarr;
          </Link>
        </div>
      </div>

      <section className="seo-content-section">
        <h2>What is market failure?</h2>
        <p>
          Market failure is one of the highest-weighted topics in Edexcel IAL Economics Unit 1 (WEC11) and appears in almost every paper series. It happens when the free market mechanism, left to itself, fails to allocate resources efficiently &mdash; the price paid in the market does not reflect all the costs and benefits of producing or consuming a good.
        </p>
        <p>
          In a perfectly functioning market, resources flow to the point where <strong>marginal social benefit (MSB)</strong> equals <strong>marginal social cost (MSC)</strong>. When externalities, public goods, missing information or monopoly power get in the way, the market produces too much or too little of a good and total welfare falls below its potential maximum.
        </p>
      </section>

      <section className="seo-content-section">
        <h2>The main types of market failure</h2>
        <p>
          For Edexcel IAL Economics you need to recognise and analyse each of the following types. Different textbooks count them as four, five or six categories &mdash; we cover all seven examinable forms below so you are ready for any mark scheme.
        </p>

        <ol className="seo-types-list">
          {TYPES_OF_FAILURE.map(t => (
            <li key={t.slug} id={t.slug}>
              <h3>{t.number}. {t.name}</h3>
              <p><strong>{t.shortDef}</strong></p>
              <p>{t.detail}</p>
              <p><em>Examples:</em> {t.example}</p>
              <p><em>Diagram:</em> {t.diagram}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="seo-content-section">
        <h2>Partial vs complete market failure</h2>
        <p>
          <strong>Partial market failure</strong> occurs when a market exists but produces the wrong quantity relative to the social optimum. Every externality, every merit good and every demerit good is an example.
        </p>
        <p>
          <strong>Complete market failure</strong> occurs when the market fails to form at all. Pure public goods are the classic case: because producers cannot exclude non-payers, and one person&rsquo;s use does not reduce availability, no profit-seeking firm will supply them. Only the government can provide them &mdash; usually funded through taxation.
        </p>
      </section>

      <section className="seo-content-section">
        <h2>Market failure diagrams</h2>
        <p>
          Examiners reward clear, fully labelled diagrams. The core diagrams you need to reproduce accurately for WEC11 are:
        </p>
        <ul>
          <li><strong>Negative externality of production</strong> &mdash; MSC above MPC, with the welfare-loss triangle between them at the free-market quantity.</li>
          <li><strong>Negative externality of consumption</strong> &mdash; MPB above MSB, with overconsumption to the right of the social optimum.</li>
          <li><strong>Positive externality of production</strong> &mdash; MPC above MSC, with underproduction.</li>
          <li><strong>Positive externality of consumption / merit good</strong> &mdash; MSB above MPB, with underconsumption.</li>
          <li><strong>Public goods</strong> &mdash; non-excludability and non-rivalry represented by the free-rider problem rather than a supply-demand diagram.</li>
          <li><strong>Monopoly market failure</strong> &mdash; output below P = MC, with deadweight loss triangle.</li>
        </ul>
        <p>
          For every diagram: label axes (P, Q), label all curves fully (MPC, MSC, MPB, MSB, D, S), mark the free-market equilibrium, mark the socially-optimal equilibrium, and shade the welfare loss.
        </p>
      </section>

      <section className="seo-content-section">
        <h2>How governments correct market failure</h2>
        <p>
          Every WEC11 question on market failure expects you to evaluate policy responses. The main tools are:
        </p>
        <ul>
          <li><strong>Indirect taxes</strong> on demerit goods and negative externalities (e.g. tobacco duty, carbon tax).</li>
          <li><strong>Subsidies</strong> on merit goods and positive externalities (e.g. free vaccination, solar-panel grants).</li>
          <li><strong>Regulation and legislation</strong> (e.g. minimum legal age, emission limits, pollution permits).</li>
          <li><strong>Direct provision</strong> of public goods funded through taxation (e.g. national defence, street lighting).</li>
          <li><strong>Information provision</strong> to reduce information failure (e.g. calorie labelling, financial literacy campaigns).</li>
          <li><strong>Property-right assignment</strong> to allow Coasian bargaining where transaction costs are low.</li>
        </ul>
        <p>
          See the full breakdown on <Link href="/economics/unit-1/government-intervention">Government Intervention</Link>. Always finish a WEC11 evaluation answer by discussing <strong>government failure</strong> &mdash; the risk that intervention itself produces a worse allocation of resources than the original market failure.
        </p>
      </section>

      {notesData.length > 0 && (
        <section className="seo-content-section">
          <h2>Interactive notes preview</h2>
          <div className="seo-stepper">
            {notesData.slice(0, 5).map((section, i) => (
              <div key={i} className="seo-stepper-step">
                <div className="seo-stepper-rail">
                  <div className="seo-stepper-node">{i + 1}</div>
                  {i < Math.min(notesData.length, 5) - 1 && <div className="seo-stepper-line" />}
                </div>
                <div className="seo-stepper-body">
                  <h3>{section.title}</h3>
                  <ul>
                    {(section.points || []).slice(0, 3).map((point, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: point }} />
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <Link href="/economics/unit-1/market-failure" className="seo-section-link">
            Open all market failure notes interactively &rarr;
          </Link>
        </section>
      )}

      {practiceData.length > 0 && (
        <section className="seo-faq-section">
          <h2>Exam-style practice questions</h2>
          {practiceData.map((q, i) => (
            <details key={i} className="seo-faq-item">
              <summary>{q.question || q.title}</summary>
              <div className="seo-faq-answer">
                <p>{q.guidance || q.answer || q.modelAnswer}</p>
              </div>
            </details>
          ))}
          <p style={{ marginTop: 16 }}>
            For fully worked 8- and 20-mark model answers, see the <Link href="/economics/market-failure-model-answers">Market Failure Model Answers</Link> page.
          </p>
        </section>
      )}

      <section className="seo-faq-section">
        <h2>Market failure FAQ</h2>
        {FAQS.map((f, i) => (
          <details key={i} className="seo-faq-item">
            <summary>{f.q}</summary>
            <div className="seo-faq-answer">
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </section>

      <div className="seo-related-links">
        <h2>Continue revising</h2>
        <div className="seo-links-grid">
          <Link href="/economics/unit-1/government-intervention">Government Intervention</Link>
          <Link href="/economics/unit-1/price-determination">Price Determination</Link>
          <Link href="/economics/market-failure-model-answers">Market Failure Model Answers</Link>
          <Link href="/economics/unit-1">All Unit 1 Topics</Link>
          <Link href="/economics">All Economics Units</Link>
          <Link href="/past-papers">WEC11 Past Papers</Link>
          <Link href="/glossary">Economics Glossary</Link>
          <Link href="/command-words">Command Words Guide</Link>
        </div>
      </div>

      <RelatedModelAnswers
        href="/economics/market-failure-model-answers"
        sectionTitle="Market Failure"
        count={1}
      />

      <div className="seo-cta">
        <h2>Master market failure interactively</h2>
        <p>Use flashcards, quizzes and the AI tutor to drill every type of market failure before exam day.</p>
        <Link href="/economics/unit-1/market-failure" className="seo-cta-button">Start revising &rarr;</Link>
      </div>
    </div>
  );
}
