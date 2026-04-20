import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';
import RelatedModelAnswers from '@/components/RelatedModelAnswers';

export const metadata = {
  title: 'Macroeconomic Objectives | IAL Economics WEC12 Complete Guide',
  description: 'Complete macroeconomic objectives revision for Edexcel IAL Economics Unit 2 (WEC12). Growth, low inflation, low unemployment, balance of payments, inequality and environment \u2014 with diagrams, trade-offs and model answers.',
  alternates: { canonical: 'https://revvylearn.com/economics/macroeconomic-objectives' },
  openGraph: {
    title: 'Macroeconomic Objectives | IAL Economics WEC12 Complete Guide | Revvy Learn',
    description: 'The complete Edexcel IAL Economics guide to macroeconomic objectives: every objective, every measurement, every policy trade-off. Growth, inflation, unemployment, BoP.',
    url: 'https://revvylearn.com/economics/macroeconomic-objectives',
    type: 'article',
  },
};

const OBJECTIVES = [
  {
    slug: 'economic-growth',
    number: 1,
    name: 'Sustained economic growth',
    shortDef: 'A steady increase in real GDP over time.',
    measurement: 'Percentage change in real GDP (not nominal \u2014 strip out inflation). Measured annually and quarterly.',
    detail: 'Actual growth moves the economy closer to its production possibility frontier (PPF); potential growth shifts the PPF outward through investment, education, technology and infrastructure. Short-run growth is AD-driven; long-run growth requires supply-side improvement.',
    target: 'Most governments target 2\u20133% annual real GDP growth.',
    costs: 'Environmental damage, inequality widening, demand-pull inflation if growth exceeds productive capacity.',
  },
  {
    slug: 'low-inflation',
    number: 2,
    name: 'Low and stable inflation',
    shortDef: 'A sustained but controlled increase in the general price level.',
    measurement: 'CPI (consumer price index) is the headline measure; RPI includes housing costs. Core inflation excludes volatile food and energy.',
    detail: 'Demand-pull inflation occurs when AD outpaces AS at or near full employment. Cost-push inflation results from rising input costs (oil, wages, imports). Built-in inflation comes from wage-price spirals.',
    target: 'Most central banks target 2%. Deflation and hyperinflation are both harmful.',
    costs: 'Eroded purchasing power, uncertainty for firms, reduced international competitiveness, fiscal drag, menu and shoe-leather costs.',
  },
  {
    slug: 'low-unemployment',
    number: 3,
    name: 'Low unemployment / full employment',
    shortDef: 'Everyone who wants a job at the current wage can find one.',
    measurement: 'Claimant count and the ILO/Labour Force Survey. The unemployment rate = unemployed / (unemployed + employed) \u00d7 100.',
    detail: 'Types of unemployment: cyclical (deficient AD), structural (skills or geographic mismatch), frictional (between jobs), seasonal, real-wage (wages above equilibrium), and technological.',
    target: 'Full employment does not mean zero unemployment \u2014 it means only frictional and voluntary unemployment remain. Around 3\u20134% is typical.',
    costs: 'Lost output (the output gap), rising government spending on benefits, falling tax revenue, hysteresis (long-term joblessness reduces future employability).',
  },
  {
    slug: 'balance-of-payments',
    number: 4,
    name: 'Sustainable balance of payments',
    shortDef: 'Avoiding large, persistent current account deficits or surpluses.',
    measurement: 'Current account balance as a % of GDP. Tracks trade in goods, trade in services, primary income (investment returns) and secondary income (transfers).',
    detail: 'A deficit means net outflows of money from the country to pay for imports; a surplus means net inflows. Temporary deficits can be normal, but persistent deficits signal loss of competitiveness. The Marshall-Lerner condition and J-curve show how exchange rate depreciation eventually improves the trade balance.',
    target: 'Most governments target near-balance over the medium term.',
    costs: 'Falling exchange rate, rising debt, lost confidence from international investors.',
  },
  {
    slug: 'income-equality',
    number: 5,
    name: 'Fair distribution of income',
    shortDef: 'Reducing inequality in income and wealth.',
    measurement: 'Lorenz curve and Gini coefficient. A Gini of 0 = perfect equality; 1 = perfect inequality. UK ~0.35, Scandinavian countries lower, US and emerging markets higher.',
    detail: 'Governments redistribute through progressive taxation, welfare benefits and public services. Inequality differs from poverty: a country can be rich overall but still highly unequal, or poor on average but with little inequality.',
    target: 'No single Gini target, but most governments aim to reduce inequality over time.',
    costs: 'Work-incentive reductions from high taxation, brain drain of top earners, political tensions if inequality is too high.',
  },
  {
    slug: 'environmental-sustainability',
    number: 6,
    name: 'Environmental sustainability',
    shortDef: 'Growth without depleting natural capital or damaging the environment.',
    measurement: 'CO\u2082 emissions, air and water quality indices, biodiversity loss, renewable energy share.',
    detail: 'Often treated as a constraint on other objectives. Green growth aims to decouple GDP from emissions. Policy tools include carbon taxes, pollution permits, subsidies for renewables and environmental regulation.',
    target: 'Net-zero emissions by 2050 is the widely-adopted commitment.',
    costs: 'Transition costs to green industries, regressive effects of carbon taxes, international competitiveness if other countries do not match action.',
  },
];

const TRADE_OFFS = [
  {
    pair: 'Growth vs inflation',
    body: 'Expansionary fiscal/monetary policy raises AD, boosting output and employment but risking demand-pull inflation. The Phillips Curve shows this trade-off in the short run.',
  },
  {
    pair: 'Growth vs environment',
    body: 'Rising real GDP typically means rising CO\u2082 emissions, resource use and pollution \u2014 unless accompanied by decoupling and green technology.',
  },
  {
    pair: 'Growth vs balance of payments',
    body: 'Higher domestic incomes pull in more imports, worsening the current account.',
  },
  {
    pair: 'Low inflation vs low unemployment',
    body: 'Classic Phillips Curve trade-off. Tight monetary policy cools inflation but raises unemployment.',
  },
  {
    pair: 'Income equality vs growth',
    body: 'High redistribution can blunt work incentives; very low redistribution may lead to social tension and under-investment in human capital.',
  },
];

const FAQS = [
  {
    q: 'What are the macroeconomic objectives in Edexcel IAL Economics?',
    a: 'The six macroeconomic objectives you need to know for WEC12 are: (1) sustained economic growth, (2) low and stable inflation, (3) low unemployment, (4) a sustainable balance of payments, (5) a fair distribution of income, and (6) environmental sustainability. The first four are the classic \u201cbig four\u201d \u2014 income equality and environmental sustainability are increasingly emphasised in modern exams.',
  },
  {
    q: 'What are the 4 main macroeconomic objectives?',
    a: 'The traditional four macroeconomic objectives are: economic growth, low inflation, low unemployment, and balance of payments stability. These are the core objectives you must be ready to analyse in any WEC12 answer \u2014 income equality and environmental sustainability are usually treated as additional modern objectives.',
  },
  {
    q: 'Why do macroeconomic objectives conflict?',
    a: 'Objectives conflict because policy tools that move one indicator in the desired direction often move another in the wrong direction. For example, cutting interest rates boosts growth and employment but risks inflation. Raising interest rates cools inflation but raises unemployment. Growth often worsens the current account and the environment. Governments must prioritise based on the current economic situation.',
  },
  {
    q: 'What is the Phillips Curve?',
    a: 'The Phillips Curve shows an inverse relationship between unemployment and inflation: when unemployment falls, inflation tends to rise, and vice versa. In the short run, this trade-off is real. In the long run, most economists argue the curve is vertical at the natural rate of unemployment, meaning that trying to push unemployment below its natural rate will only raise inflation without a lasting fall in joblessness.',
  },
  {
    q: 'How are macroeconomic objectives measured?',
    a: 'Growth is measured by real GDP change. Inflation by CPI. Unemployment by the claimant count and ILO Labour Force Survey. The balance of payments by the current account as a % of GDP. Income inequality by the Gini coefficient. Environmental sustainability by CO\u2082 emissions and other green indicators.',
  },
  {
    q: 'What is the difference between fiscal and monetary policy?',
    a: 'Fiscal policy uses government spending and taxation, decided by the Treasury. Monetary policy uses interest rates and quantitative easing, decided by the central bank. Both can be expansionary (to raise AD) or contractionary (to cool AD). Supply-side policy is a third category that targets LRAS and productive capacity.',
  },
  {
    q: 'What is the target inflation rate?',
    a: 'Most central banks target 2% CPI inflation. The Bank of England, US Federal Reserve and European Central Bank all target around 2%. This level is considered low enough to avoid major costs of inflation but high enough to avoid deflation and give monetary policy room to cut rates in a downturn.',
  },
  {
    q: 'Does full employment mean zero unemployment?',
    a: 'No. Full employment means only voluntary and frictional unemployment remain. People moving between jobs, returning to the workforce, or choosing not to work at current wages will always create some measured unemployment even at \u201cfull employment\u201d. The natural rate is typically around 3\u20135%.',
  },
];

export default async function MacroObjectivesPillarPage() {
  const supabase = createServerClient();

  const [{ data: notes }, { data: practice }] = await Promise.all([
    supabase.from('section_notes').select('data').eq('section_id', 'macroeconomic-objectives-policies').single(),
    supabase.from('section_practice').select('data').eq('section_id', 'macroeconomic-objectives-policies').single(),
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
    name: 'Macroeconomic Objectives \u2014 Edexcel IAL Economics (WEC12) Complete Guide',
    description: 'Comprehensive revision notes on the macroeconomic objectives for Edexcel International A-Level Economics Unit 2 (WEC12). Growth, inflation, unemployment, balance of payments, equity and environment with measurement, policy tools and trade-offs.',
    url: 'https://revvylearn.com/economics/macroeconomic-objectives',
    educationalLevel: 'Advanced Level',
    learningResourceType: 'Revision Notes',
    teaches: 'Macroeconomic objectives, economic growth, inflation, unemployment, balance of payments, income inequality, environmental sustainability, policy trade-offs',
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
      { '@type': 'ListItem', position: 3, name: 'Unit 2: Macroeconomic Performance & Policy', item: 'https://revvylearn.com/economics/unit-2' },
      { '@type': 'ListItem', position: 4, name: 'Macroeconomic Objectives' },
    ],
  };

  return (
    <div className="resource-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="resource-page-header">
        <Link href="/economics/unit-2" className="resource-back-link">&larr; Unit 2: Macroeconomic Performance &amp; Policy</Link>
        <span className="seo-unit-badge">Section 2.3.6 &middot; WEC12</span>
        <h1 className="resource-page-title">Macroeconomic Objectives &mdash; Edexcel IAL Economics (WEC12) Complete Guide</h1>
        <p className="resource-page-subtitle">
          Every macroeconomic objective on the Edexcel IAL Economics specification, how each one is measured, the policies used to achieve them, and why they conflict. Built for WEC12.
        </p>
      </div>

      <div className="seo-hero-cta">
        <div className="seo-hero-cta-content">
          <div className="seo-hero-cta-text">
            <span className="seo-hero-cta-label">Interactive Revision</span>
            <p>Flashcards, quizzes, AI tutor and progress tracking for this topic</p>
          </div>
          <Link href="/economics/unit-2/macroeconomic-objectives-policies" className="seo-hero-cta-button">
            Open in app &rarr;
          </Link>
        </div>
      </div>

      <section className="seo-content-section">
        <h2>What are macroeconomic objectives?</h2>
        <p>
          Macroeconomic objectives are the targets that governments pursue for the economy as a whole. For Edexcel IAL Economics Unit 2 (WEC12), you need to know the six main objectives, how each is measured, the policies used to achieve them, and the conflicts between them. Expect this topic in every January, June and October paper series.
        </p>
        <p>
          The four classic objectives are <strong>growth, low inflation, low unemployment and a sustainable balance of payments</strong>. Modern specifications add <strong>income equality</strong> and <strong>environmental sustainability</strong>. A strong WEC12 answer names all six, measures them correctly, and evaluates the trade-offs between them.
        </p>
      </section>

      <section className="seo-content-section">
        <h2>The six macroeconomic objectives</h2>
        <p>
          For a high-mark WEC12 answer, be ready to define, measure and evaluate each objective below. Every one of them maps to a published query searched by students taking the IAL exam.
        </p>

        <ol className="seo-types-list">
          {OBJECTIVES.map(o => (
            <li key={o.slug} id={o.slug}>
              <h3>{o.number}. {o.name}</h3>
              <p><strong>{o.shortDef}</strong></p>
              <p><em>How it is measured:</em> {o.measurement}</p>
              <p>{o.detail}</p>
              <p><em>Target:</em> {o.target}</p>
              <p><em>Costs / trade-offs:</em> {o.costs}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="seo-content-section">
        <h2>Policy trade-offs and conflicts</h2>
        <p>
          Every evaluation-style question on macroeconomic objectives expects you to recognise that they conflict. The exam rewards answers that weigh up trade-offs instead of treating objectives in isolation.
        </p>
        <ul>
          {TRADE_OFFS.map(t => (
            <li key={t.pair}><strong>{t.pair}.</strong> {t.body}</li>
          ))}
        </ul>
      </section>

      <section className="seo-content-section">
        <h2>Policy tools used to achieve objectives</h2>
        <p>
          Three broad categories of policy are used to move the economy toward each objective. Expect at least one WEC12 question on policy effectiveness per paper.
        </p>
        <ul>
          <li><strong>Fiscal policy</strong> &mdash; government spending (G) and taxation (T). Controlled by the Treasury. Expansionary fiscal policy raises AD; contractionary reduces it.</li>
          <li><strong>Monetary policy</strong> &mdash; interest rates and quantitative easing. Controlled by the central bank. Lower rates raise AD; higher rates cool it.</li>
          <li><strong>Supply-side policy</strong> &mdash; investment in education, infrastructure, deregulation, tax incentives. Raises LRAS and the productive capacity of the economy.</li>
        </ul>
        <p>
          See the full breakdown on <Link href="/economics/unit-2/macroeconomic-objectives-policies">Macroeconomic Objectives &amp; Policies</Link>. Always finish a WEC12 evaluation answer by considering time lags, confidence effects, and the risk that policy has unintended consequences.
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
          <Link href="/economics/unit-2/macroeconomic-objectives-policies" className="seo-section-link">
            Open all macroeconomic objectives notes interactively &rarr;
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
            For fully worked model answers, see the <Link href="/economics/macroeconomic-policies-model-answers">Macroeconomic Policies Model Answers</Link> page.
          </p>
        </section>
      )}

      <section className="seo-faq-section">
        <h2>Macroeconomic objectives FAQ</h2>
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
          <Link href="/economics/unit-2/economic-growth">Economic Growth</Link>
          <Link href="/economics/unit-2/aggregate-demand">Aggregate Demand</Link>
          <Link href="/economics/unit-2/aggregate-supply">Aggregate Supply</Link>
          <Link href="/economics/unit-2/measures-economic-performance">Measures of Economic Performance</Link>
          <Link href="/economics/macroeconomic-policies-model-answers">Macroeconomic Policies Model Answers</Link>
          <Link href="/economics/unit-2">All Unit 2 Topics</Link>
          <Link href="/past-papers">WEC12 Past Papers</Link>
          <Link href="/command-words">Command Words Guide</Link>
        </div>
      </div>

      <RelatedModelAnswers
        href="/economics/macroeconomic-policies-model-answers"
        sectionTitle="Macroeconomic Policies"
        count={1}
      />

      <div className="seo-cta">
        <h2>Master macroeconomic objectives interactively</h2>
        <p>Use flashcards, quizzes and the AI tutor to drill every objective, trade-off and policy tool before exam day.</p>
        <Link href="/economics/unit-2/macroeconomic-objectives-policies" className="seo-cta-button">Start revising &rarr;</Link>
      </div>
    </div>
  );
}
