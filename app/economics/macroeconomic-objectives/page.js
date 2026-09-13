import { createAnonClient } from '@/lib/supabase-anon';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import BackToApp from '@/components/BackToApp';
import { BoltIcon, BookAlt, ChartHistogram, Clipboard, DrawerAlt, LearnMode, Mistakes, NetworkGraph, PenIcon, ProgressChart, Star, Tutor } from '@/components/Icons';
import UnitScrollBar from '../UnitScrollBar';
import RelatedModelAnswers from '@/components/RelatedModelAnswers';
import '@/styles/landing.css';

export const metadata = {
  title: 'The 4 Macroeconomic Objectives — Edexcel IAL Economics WEC12 Notes',
  description: 'Macroeconomic objectives revision for Edexcel IAL Economics Unit 2 (WEC12). Growth, low inflation, low unemployment, balance of payments, a balanced government budget and income equality \u2014 with diagrams, trade-offs and model answers.',
  alternates: { canonical: 'https://revvylearn.com/economics/macroeconomic-objectives' },
  openGraph: {
    title: 'The 4 Macroeconomic Objectives — Edexcel IAL Economics WEC12 Notes | Revvy Learn',
    description: 'The complete Edexcel IAL Economics guide to macroeconomic objectives: every objective, every measurement, every policy trade-off. Growth, inflation, unemployment, BoP.',
    url: 'https://revvylearn.com/economics/macroeconomic-objectives',
    type: 'article',
  },
};

const ACCENT = {
  color: 'var(--ns-blue)',
  bg: 'rgba(79,126,248,.08)',
  bd: 'rgba(79,126,248,.2)',
  glow: 'rgba(79,126,248,.15)',
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
    slug: 'balanced-government-budget',
    number: 6,
    name: 'Balanced government budget',
    shortDef: 'Government spending matched by tax revenue, so borrowing does not keep adding to national debt.',
    measurement: 'The budget deficit or surplus as a percentage of GDP, and national debt as a percentage of GDP.',
    detail: 'Separate the cyclical deficit, which rises automatically in a recession as tax receipts fall and benefit spending rises, from the structural deficit, which remains at full employment. Reducing a deficit through austerity cuts aggregate demand, so this objective conflicts directly with growth and low unemployment. Sustained borrowing raises debt interest and may crowd out private investment.',
    target: 'There is no single official target. The EU reference values, a deficit under 3% of GDP and debt under 60% of GDP, are the figures most often quoted.',
    costs: 'Austerity lowers AD, growth and employment in the short run. Cutting capital spending weakens long-run productive capacity. Raising taxes to close a deficit can blunt work and investment incentives.',
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

const POLICY_TOOLS = [
  { name: 'Fiscal policy', detail: 'Government spending (G) and taxation (T). Treasury-controlled. Expansionary raises AD; contractionary reduces it.' },
  { name: 'Monetary policy', detail: 'Interest rates and quantitative easing. Central bank-controlled. Lower rates raise AD; higher rates cool it.' },
  { name: 'Supply-side policy', detail: 'Education, infrastructure, deregulation, tax incentives. Raises LRAS and productive capacity.' },
];

const FAQS = [
  {
    q: 'What are the macroeconomic objectives in Edexcel IAL Economics?',
    a: 'The six macroeconomic objectives you need to know for WEC12 (spec 2.3.6) are: (1) economic growth, (2) low and stable inflation, (3) low unemployment, (4) balance of payments equilibrium on the current account, (5) a balanced government budget, and (6) greater income equality. The first four are the classic \u201cbig four\u201d \u2014 the balanced budget and income equality are the two the spec adds. Environmental sustainability is not one of the six: it appears in 2.3.6 as a conflict with growth, which is exactly the trade-off WEC12 evaluation questions reward.',
  },
  {
    q: 'What are the 4 main macroeconomic objectives?',
    a: 'The traditional four macroeconomic objectives are: economic growth, low inflation, low unemployment, and balance of payments stability. These are the core objectives you must be ready to analyse in any WEC12 answer \u2014 spec 2.3.6 adds two more, a balanced government budget and greater income equality.',
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
    a: 'Growth is measured by real GDP change. Inflation by CPI. Unemployment by the claimant count and ILO Labour Force Survey. The balance of payments by the current account as a % of GDP. Income inequality by the Gini coefficient. The government budget by the deficit or surplus as a % of GDP, alongside national debt as a % of GDP.',
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

const KEY_CONCEPTS = [
  { icon: Star, title: 'Six objectives, four classic', desc: 'Growth, low inflation, low unemployment and BoP stability are the \u201cbig four\u201d. A balanced government budget and greater income equality complete the six on the WEC12 spec.' },
  { icon: BoltIcon, title: 'Trade-offs are the question', desc: 'WEC12 evaluation marks reward recognising that pursuing one objective often worsens another. Always frame answers around trade-offs.' },
  { icon: DrawerAlt, title: 'Three policy levers', desc: 'Fiscal, monetary and supply-side. Know what each one does, who controls it, and the time lag before it bites.' },
  { icon: ProgressChart, title: 'Measurement matters', desc: 'CPI vs RPI, claimant count vs ILO, real vs nominal GDP \u2014 examiners reward precision in how each objective is measured.' },
];

export default async function MacroObjectivesPillarPage() {
  const supabase = createAnonClient();

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
    teaches: 'Macroeconomic objectives, economic growth, inflation, unemployment, balance of payments, income inequality, balanced government budget, policy trade-offs',
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
    <div className="elp-page eup-page" style={{ '--eup-accent': ACCENT.color, '--eup-accent-bg': ACCENT.bg, '--eup-accent-bd': ACCENT.bd, '--eup-accent-glow': ACCENT.glow }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <UnitScrollBar />
      <div className="elp-scroll-bar"><div className="elp-scroll-fill" id="eup-scroll-fill" style={{ background: 'var(--eup-accent)' }} /></div>

      <SiteHeader crumb="Economics / Unit 2 / Macroeconomic Objectives" />

      <div className="eup-topic-nav">
        <span className="eup-tnav-label">Jump to:</span>
        <a className="eup-tnav-pill" href="#overview">What they are</a>
        <a className="eup-tnav-pill" href="#objectives">The 6 objectives</a>
        <a className="eup-tnav-pill" href="#tradeoffs">Trade-offs</a>
        <a className="eup-tnav-pill" href="#tools">Policy tools</a>
        <a className="eup-tnav-pill" href="#faq">FAQ</a>
      </div>

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Edexcel IAL Economics &middot; WEC12 &middot; 2.3.6</div>
            <div className="eup-unit-badge-row">
              <span className="eup-unit-num">Section 2.3.6</span>
              <span className="eup-unit-code">WEC12</span>
            </div>
            <h1 className="elp-hero-title">Macroeconomic Objectives &mdash;<br /><em style={{ color: 'var(--eup-accent)' }}>every target, every trade-off</em></h1>
            <p className="elp-hero-desc">The complete Edexcel IAL Economics guide to macroeconomic objectives. Growth, inflation, unemployment, balance of payments, equality and environment &mdash; with measurement, policy tools and trade-offs for WEC12.</p>
            <div className="elp-hero-actions">
              <Link href="/economics/unit-2/macroeconomic-objectives-policies" className="elp-btn-primary">Open in app &rarr;</Link>
              <a href="#objectives" className="elp-btn-secondary">Jump to objectives</a>
            </div>
            <div className="elp-hero-proof">
              <div className="elp-proof-item"><strong>6 objectives</strong> fully covered</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item"><strong>5 trade-offs</strong> exam-ready</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">WEC12 exam aligned</div>
            </div>
          </div>

          <div className="elp-hero-preview elp-fade-up" style={{ transitionDelay: '.15s' }}>
            <div className="elp-hero-badge elp-b1">
              <span className="elp-badge-icon"><Star size={18} /></span>
              <div className="elp-badge-text"><span className="elp-badge-val">6 objectives</span><span className="elp-badge-lbl">all six explained</span></div>
            </div>
            <div className="elp-preview-card">
              <div className="elp-preview-topbar">
                <div className="elp-preview-tab elp-active" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Notes</div>
                <div className="elp-preview-tab">Flashcards</div>
                <div className="elp-preview-tab">Quiz</div>
              </div>
              <div className="elp-preview-body">
                <div className="elp-preview-section-title">2.3.6 &mdash; Macroeconomic Objectives</div>
                <div className="elp-preview-key-idea" style={{ borderLeftColor: 'var(--eup-accent)' }}>
                  <div className="elp-pki-label" style={{ color: 'var(--eup-accent)' }}><LearnMode size={18} /> Key idea</div>
                  <div className="elp-pki-text" style={{ color: '#bfdbfe' }}>The four classic objectives \u2014 growth, low inflation, low unemployment, BoP stability \u2014 conflict with each other. Trade-offs are the question.</div>
                </div>
                <div className="elp-preview-bullets">
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: 'var(--ns-blue)' }} /><div className="elp-pb-text"><strong>Growth</strong> measured by % change in real GDP.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: 'var(--ns-free)' }} /><div className="elp-pb-text"><strong>Inflation</strong> target: 2% CPI for most central banks.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: 'var(--ns-amber)' }} /><div className="elp-pb-text"><strong>Phillips Curve</strong>: short-run trade-off between inflation and unemployment.</div></div>
                </div>
                <div className="elp-preview-flow">
                  <div className="elp-pf-step">Cut interest rates</div>
                  <div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div>
                  <div className="elp-pf-step">AD up</div>
                  <div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div>
                  <div className="elp-pf-step">Growth, jobs up</div>
                  <div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div>
                  <div className="elp-pf-result" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Inflation risk</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="elp-section" id="overview">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />The big picture</div>
          <h2 className="elp-s-title">What are macroeconomic objectives?</h2>
        </div>
        <div className="eup-topic-block elp-fade-up">
          <p className="eup-topic-desc">Macroeconomic objectives are the targets that governments pursue for the economy as a whole. For Edexcel IAL Economics Unit 2 (WEC12), you need to know the six main objectives, how each is measured, the policies used to achieve them, and the conflicts between them. Expect this topic in every January, June and October paper series.</p>
          <p className="eup-topic-desc">The four classic objectives are <strong>growth, low inflation, low unemployment and a sustainable balance of payments</strong>. The WEC12 spec adds two more: <strong>a balanced government budget</strong> and <strong>greater income equality</strong>. A strong WEC12 answer names all six, measures them correctly, and evaluates the trade-offs between them.</p>
        </div>
      </div>

      <div className="elp-section" id="objectives">
        <div className="elp-fade-up" style={{ marginBottom: 40 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />All six objectives</div>
          <h2 className="elp-s-title">Macroeconomic objectives, defined and measured</h2>
          <p className="elp-s-sub">Be ready to define, measure and evaluate each objective. Every one maps to a published query searched by IAL students.</p>
        </div>
        {OBJECTIVES.map((o, idx) => (
          <div key={o.slug}>
            <div className="eup-topic-block elp-fade-up" id={o.slug}>
              <div className="eup-topic-label-row">
                <div className="eup-topic-ref-badge">{o.number}</div>
                <div className="eup-topic-heading">{o.name}</div>
              </div>
              <p className="eup-topic-desc"><strong>{o.shortDef}</strong></p>
              <p className="eup-topic-desc">{o.detail}</p>
              <div className="eup-subtopic-grid">
                <div className="eup-subtopic-tile">
                  <div className="eup-st-num"><ProgressChart size={18} /></div>
                  <div className="eup-st-body">
                    <div className="eup-st-name">How it is measured</div>
                    <div className="eup-st-keywords">{o.measurement}</div>
                  </div>
                </div>
                <div className="eup-subtopic-tile">
                  <div className="eup-st-num"><Star size={18} /></div>
                  <div className="eup-st-body">
                    <div className="eup-st-name">Target</div>
                    <div className="eup-st-keywords">{o.target}</div>
                  </div>
                </div>
                <div className="eup-subtopic-tile">
                  <div className="eup-st-num"><Mistakes size={18} /></div>
                  <div className="eup-st-body">
                    <div className="eup-st-name">Costs &amp; trade-offs</div>
                    <div className="eup-st-keywords">{o.costs}</div>
                  </div>
                </div>
              </div>
            </div>
            {idx < OBJECTIVES.length - 1 && <div className="eup-topic-divider" />}
          </div>
        ))}
      </div>

      <div className="elp-section" id="tradeoffs">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />The hard part</div>
          <h2 className="elp-s-title">Policy trade-offs and conflicts</h2>
          <p className="elp-s-sub">Every evaluation question expects you to recognise that objectives conflict. The exam rewards weighing trade-offs over treating objectives in isolation.</p>
        </div>
        <div className="eup-topic-block elp-fade-up">
          <div className="eup-subtopic-grid">
            {TRADE_OFFS.map((t, i) => (
              <div key={i} className="eup-subtopic-tile">
                <div className="eup-st-num"><ChartHistogram size={18} /></div>
                <div className="eup-st-body">
                  <div className="eup-st-name">{t.pair}</div>
                  <div className="eup-st-keywords">{t.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="elp-section" id="tools">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Policy levers</div>
          <h2 className="elp-s-title">How governments pursue objectives</h2>
          <p className="elp-s-sub">Three broad categories of policy. Expect at least one WEC12 question on policy effectiveness per paper.</p>
        </div>
        <div className="eup-topic-block elp-fade-up">
          <div className="eup-subtopic-grid">
            {POLICY_TOOLS.map((p, i) => (
              <div key={i} className="eup-subtopic-tile">
                <div className="eup-st-num"><DrawerAlt size={18} /></div>
                <div className="eup-st-body">
                  <div className="eup-st-name">{p.name}</div>
                  <div className="eup-st-keywords">{p.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="eup-topic-desc" style={{ marginTop: 20 }}>See the full breakdown on <Link href="/economics/unit-2/macroeconomic-objectives-policies" style={{ color: 'var(--eup-accent)' }}>Macroeconomic Objectives &amp; Policies</Link>. Always finish a WEC12 evaluation answer by considering time lags, confidence effects, and unintended consequences.</p>
        </div>
      </div>

      {notesData.length > 0 && (
        <div className="elp-section" id="notes">
          <div className="elp-fade-up" style={{ marginBottom: 24 }}>
            <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />From the app</div>
            <h2 className="elp-s-title">Interactive notes preview</h2>
          </div>
          <div className="eup-topic-block elp-fade-up">
            <div className="seo-stepper" style={{ marginTop: 0 }}>
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
            <Link href="/economics/unit-2/macroeconomic-objectives-policies" className="eup-topic-open-link" style={{ marginTop: 16, display: 'inline-block' }}>Open all notes interactively &rarr;</Link>
          </div>
        </div>
      )}

      {practiceData.length > 0 && (
        <div className="elp-section" id="practice">
          <div className="elp-fade-up" style={{ marginBottom: 24 }}>
            <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--ns-amber)' }} />Exam practice</div>
            <h2 className="elp-s-title">Exam-style practice questions</h2>
          </div>
          <div className="eup-topic-block elp-fade-up">
            <div className="seo-faq-section" style={{ marginTop: 0, padding: 0 }}>
              {practiceData.map((q, i) => (
                <details key={i} className="seo-faq-item">
                  <summary>{q.question || q.title}</summary>
                  <div className="seo-faq-answer">
                    <p>{q.guidance || q.answer || q.modelAnswer}</p>
                  </div>
                </details>
              ))}
            </div>
            <p className="eup-topic-desc" style={{ marginTop: 16 }}>For fully worked model answers, see the <Link href="/economics/macroeconomic-policies-model-answers" style={{ color: 'var(--eup-accent)' }}>Macroeconomic Policies Model Answers</Link> page.</p>
          </div>
        </div>
      )}

      <div className="eup-unit-overview">
        <div className="eup-unit-overview-inner">
          <div className="elp-fade-up">
            <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Topic overview</div>
            <h2 className="elp-s-title">What you need to know for 2.3.6</h2>
            <div className="eup-key-concepts">
              {KEY_CONCEPTS.map((c, i) => (
                <div key={i} className="eup-concept">
                  <div className="eup-concept-icon">{c.icon ? <c.icon size={18} /> : null}</div>
                  <div>
                    <div className="eup-concept-title">{c.title}</div>
                    <div className="eup-concept-desc">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="elp-fade-up" style={{ transitionDelay: '.1s' }}>
            <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--ns-amber)' }} />Where it appears</div>
            <h2 className="elp-s-title">WEC12 at a glance</h2>
            <div className="eup-exam-info">
              <div className="eup-ei-label">Assessment details</div>
              <div className="eup-ei-row"><span className="eup-ei-key">Unit</span><span className="eup-ei-val" style={{ color: 'var(--eup-accent)' }}>2.3.6 &mdash; WEC12</span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">Paper duration</span><span className="eup-ei-val">1 hour 45 minutes</span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">Paper marks</span><span className="eup-ei-val">80 marks</span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">% of A-Level</span><span className="eup-ei-val">25%</span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">Question styles</span><span className="eup-ei-val eup-marks-pills-inline"><span className="eup-mp eup-mp-4">4</span><span className="eup-mp eup-mp-8">8</span><span className="eup-mp eup-mp-20">20</span></span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">Common in</span><span className="eup-ei-val">Data-response &amp; 20-mark essay questions</span></div>
              <div className="eup-ei-row eup-ei-row-last"><span className="eup-ei-key">Sessions</span><span className="eup-ei-val">January, June, October</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="elp-section" id="faq">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Common questions</div>
          <h2 className="elp-s-title">Macroeconomic objectives FAQ</h2>
        </div>
        <div className="eup-topic-block elp-fade-up">
          <div className="seo-faq-section" style={{ marginTop: 0, padding: 0 }}>
            {FAQS.map((f, i) => (
              <details key={i} className="seo-faq-item">
                <summary>{f.q}</summary>
                <div className="seo-faq-answer">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />Keep going</div>
        <h2 className="elp-s-title" style={{ fontSize: 22, marginBottom: 8 }}>Continue revising</h2>
        <div className="eup-continue-grid">
          <Link className="eup-continue-card" href="/economics/unit-2/economic-growth">
            <div className="eup-cc-icon"><ChartHistogram size={18} /></div>
            <div className="eup-cc-body"><div className="eup-cc-name">Economic Growth</div><div className="eup-cc-sub">2.3.5 &middot; Actual vs potential, business cycles</div></div>
            <div className="eup-cc-arrow">&rarr;</div>
          </Link>
          <Link className="eup-continue-card" href="/economics/aggregate-demand">
            <div className="eup-cc-icon"><BoltIcon size={18} /></div>
            <div className="eup-cc-body"><div className="eup-cc-name">Aggregate Demand</div><div className="eup-cc-sub">2.3.2 &middot; AD = C + I + G + (X &minus; M)</div></div>
            <div className="eup-cc-arrow">&rarr;</div>
          </Link>
          <Link className="eup-continue-card" href="/economics/macroeconomic-policies-model-answers">
            <div className="eup-cc-icon"><PenIcon size={18} /></div>
            <div className="eup-cc-body"><div className="eup-cc-name">Macro Policies Model Answers</div><div className="eup-cc-sub">Fully worked 8- and 20-mark answers</div></div>
            <div className="eup-cc-arrow">&rarr;</div>
          </Link>
          <Link className="eup-continue-card" href="/economics/unit-2">
            <div className="eup-cc-icon"><BookAlt size={18} /></div>
            <div className="eup-cc-body"><div className="eup-cc-name">All Unit 2 Topics</div><div className="eup-cc-sub">WEC12 &middot; Macroeconomic Performance</div></div>
            <div className="eup-cc-arrow">&rarr;</div>
          </Link>
        </div>
      </div>

      <RelatedModelAnswers
        href="/economics/macroeconomic-policies-model-answers"
        sectionTitle="Macroeconomic Policies"
        count={2}
      />

      <div className="elp-features-strip">
        <div className="elp-features-inner">
          <div className="elp-feat-item"><span className="elp-feat-icon"><Clipboard size={18} /></span><div><div className="elp-feat-label">Spec-aligned notes</div><div className="elp-feat-sub">Every WEC12 2.3.6 point covered</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon"><ChartHistogram size={18} /></span><div><div className="elp-feat-label">Trade-offs explained</div><div className="elp-feat-sub">Phillips Curve and beyond</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon"><BoltIcon size={18} /></span><div><div className="elp-feat-label">Practice questions</div><div className="elp-feat-sub">Exam-style with model answers</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon"><Tutor size={18} /></span><div><div className="elp-feat-label">AI Tutor</div><div className="elp-feat-sub">Ask any macro policy question</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon"><NetworkGraph size={18} /></span><div><div className="elp-feat-label">Built for IAL</div><div className="elp-feat-sub">International A-Level focus</div></div></div>
        </div>
      </div>

      <div className="elp-cta-section">
        <div className="elp-cta-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(79,126,248,.07) 0%, transparent 65%)' }} />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Ready to master macroeconomic objectives?</h2>
          <p className="elp-cta-sub">Free notes across all four units. Flashcards, quizzes and AI tutor unlock with Pro — £1 for your first month.</p>
          <div className="elp-cta-actions">
            <Link href="/economics/unit-2/macroeconomic-objectives-policies" className="elp-btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>Open in app &mdash; it&apos;s free &rarr;</Link>
            <Link href="/economics/unit-2" className="elp-btn-secondary">&larr; Back to Unit 2</Link>
          </div>
          <p className="elp-cta-note">No signup required for notes &middot; Cancel anytime &middot; &pound;1 first month, then &pound;1.99 &middot; charged in your local currency</p>
        </div>
      </div>

      <BackToApp

        icon={LearnMode}

        heading={"Revise macro objectives in the app"}

        sub={"Diagrams, flashcards and exam-style practice on this exact topic"}

        href="/economics/unit-2/macroeconomic-objectives-policies"

        cta={"Open 2.3.6"}

      />

      <footer className="elp-footer">
        <div className="elp-footer-inner">
          <div className="elp-footer-logo"><img src="/logo.svg" alt="" className="elp-footer-mark" width={18} height={18} />Revvy Learn</div>
          <div className="elp-footer-sep" />
          <div className="elp-footer-links">
            <Link className="elp-footer-link" href="/economics">Economics</Link>
            <Link className="elp-footer-link" href="/economics/unit-2">Unit 2</Link>
            <Link className="elp-footer-link" href="/economics/macroeconomic-objectives">Macro Objectives</Link>
            <Link className="elp-footer-link" href="/economics/macroeconomic-policies-model-answers">Model Answers</Link>
            <Link className="elp-footer-link" href="/glossary">Glossary</Link>
            <Link className="elp-footer-link" href="/past-papers">Past Papers</Link>
          </div>
          <div className="elp-footer-right">Edexcel IAL WEC12 &copy; Revvy Learn</div>
        </div>
      </footer>
    </div>
  );
}
