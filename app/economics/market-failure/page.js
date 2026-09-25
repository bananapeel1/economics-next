import { createAnonClient } from '@/lib/supabase-anon';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import TopicCta from '@/components/TopicCta';
import BackToApp from '@/components/BackToApp';
import { BoltIcon, BookAlt, ChartHistogram, Clipboard, Document, DrawerAlt, LearnMode, NetworkGraph, PenIcon, ProgressChart, Settings, Star, Tutor } from '@/components/Icons';
import UnitScrollBar from '../UnitScrollBar';
import RelatedModelAnswers from '@/components/RelatedModelAnswers';
import '@/styles/landing.css';

export const metadata = {
  title: 'Market Failure Notes & Diagrams — Edexcel IAL Economics WEC11',
  description: 'Market failure revision for Edexcel IAL Economics Unit 1 (WEC11): externalities, public goods, merit & demerit goods, information failure and moral hazard, plus monopoly power as tested in Unit 3. Diagrams, real examples and exam technique.',
  alternates: { canonical: 'https://revvylearn.com/economics/market-failure' },
  openGraph: {
    title: 'Market Failure Notes & Diagrams — Edexcel IAL Economics WEC11 | Revvy Learn',
    description: 'The complete Edexcel IAL Economics guide to market failure: every type, every diagram, every model answer. Externalities, public goods, merit goods and more.',
    url: 'https://revvylearn.com/economics/market-failure',
    type: 'article',
  },
};

const ACCENT = {
  color: 'var(--ns-free)',
  bg: 'rgba(20,184,166,.08)',
  bd: 'rgba(20,184,166,.2)',
  glow: 'rgba(20,184,166,.15)',
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
    detail: 'When firms have significant market power they can charge a price above marginal cost, reducing allocative efficiency and creating a deadweight welfare loss. The IAL spec examines this in Unit 3 (WEC13) under market structures, not as a form of market failure in Unit 1 too.',
    example: 'Natural monopolies (utilities), dominant tech platforms, pharmaceutical patents.',
    diagram: 'Monopoly diagram: price above P = MC, quantity below socially optimum, deadweight loss triangle.',
  },
];

const DIAGRAMS = [
  { name: 'Negative externality of production', detail: 'MSC above MPC, with the welfare-loss triangle between them at the free-market quantity.' },
  { name: 'Negative externality of consumption', detail: 'MPB above MSB, with overconsumption to the right of the social optimum.' },
  { name: 'Positive externality of production', detail: 'MPC above MSC, with underproduction.' },
  { name: 'Positive externality / merit good consumption', detail: 'MSB above MPB, with underconsumption.' },
  { name: 'Public goods', detail: 'Non-excludability and non-rivalry represented by the free-rider problem.' },
  { name: 'Monopoly market failure', detail: 'Output below P = MC, with deadweight loss triangle.' },
];

const POLICY_TOOLS = [
  { name: 'Indirect taxes', detail: 'On demerit goods and negative externalities (e.g. tobacco duty, carbon tax).' },
  { name: 'Subsidies', detail: 'On merit goods and positive externalities (e.g. free vaccination, solar-panel grants).' },
  { name: 'Regulation & legislation', detail: 'Minimum legal age, emission limits, pollution permits.' },
  { name: 'Direct provision', detail: 'Public goods funded through taxation (e.g. national defence, street lighting).' },
  { name: 'Information provision', detail: 'Calorie labelling, financial literacy campaigns.' },
  { name: 'Property rights', detail: 'Assigned to allow Coasian bargaining where transaction costs are low.' },
];

const FAQS = [
  {
    q: 'What is market failure in economics?',
    a: 'Market failure happens when a free market, left to itself, does not allocate resources efficiently. In a perfectly functioning market, resources flow to where marginal social benefit (MSB) equals marginal social cost (MSC). When the price mechanism fails to reflect all costs and benefits \u2014 for example because of externalities, missing information, public goods or monopoly power \u2014 the market produces too much or too little of a good and total welfare falls.',
  },
  {
    q: 'What are the main types of market failure in Edexcel IAL Economics?',
    a: 'For WEC11 (Unit 1: Markets in action) the spec lists five sources of market failure: externalities, the free-rider problem and non-provision of public goods, imperfect market information, moral hazard, and speculation and market bubbles. Two things work differently from UK A-level: mark schemes credit \u201cexternal benefits or costs of consumption\u201d rather than \u201cmerit good\u201d or \u201cdemerit good\u201d, and moral hazard plus market bubbles sit inside Unit 1 here. Monopoly power is examinable too, but as Unit 3 (WEC13) market structures rather than WEC11 market failure.',
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
    a: 'The six-type framework covers: (1) negative externalities, (2) positive externalities, (3) public goods, (4) merit goods, (5) demerit goods, (6) information failure. That is the standard textbook version, but it borrows its vocabulary from general economics rather than from the Edexcel IAL specification. For WEC11 the spec terms are external benefits and costs of consumption rather than \u201cmerit\u201d or \u201cdemerit\u201d goods, alongside externalities, public goods, imperfect market information, moral hazard, and speculation and market bubbles. Monopoly power is not examined until Unit 3.',
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

const KEY_CONCEPTS = [
  { icon: ChartHistogram, title: 'Markets fail when price misses costs', desc: 'Market failure is a price-mechanism failure: the price does not reflect all the social costs and benefits, so output drifts from the socially optimal point.' },
  { icon: ChartHistogram, title: 'Diagrams carry the marks', desc: 'WEC11 examiners reward fully labelled MPC/MSC or MPB/MSB diagrams with the welfare loss shaded. Every shift and every triangle must be labelled.' },
  { icon: NetworkGraph, title: 'Always chain to welfare', desc: 'Strong answers link a specific failure type to allocative inefficiency and deadweight welfare loss \u2014 not just \u201cit is bad\u201d.' },
  { icon: ChartHistogram, title: 'Balance with government failure', desc: 'Top-band evaluation ends with the risk that intervention creates its own distortions \u2014 information gaps, capture, unintended consequences.' },
];

export default async function MarketFailurePillarPage() {
  const supabase = createAnonClient();

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
    <div className="elp-page eup-page" style={{ '--eup-accent': ACCENT.color, '--eup-accent-bg': ACCENT.bg, '--eup-accent-bd': ACCENT.bd, '--eup-accent-glow': ACCENT.glow }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <UnitScrollBar />
      <div className="elp-scroll-bar"><div className="elp-scroll-fill" id="eup-scroll-fill" style={{ background: 'var(--eup-accent)' }} /></div>

      <SiteHeader crumb="Economics / Unit 1 / Market Failure" />

      {/* TOPIC JUMP NAV */}
      <div className="eup-topic-nav">
        <span className="eup-tnav-label">Jump to:</span>
        <a className="eup-tnav-pill" href="#overview">What it is</a>
        <a className="eup-tnav-pill" href="#types">The 7 types</a>
        <a className="eup-tnav-pill" href="#partial-complete">Partial vs complete</a>
        <a className="eup-tnav-pill" href="#diagrams">Diagrams</a>
        <a className="eup-tnav-pill" href="#intervention">Government</a>
        <a className="eup-tnav-pill" href="#faq">FAQ</a>
      </div>

      {/* HERO */}
      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Edexcel IAL Economics &middot; WEC11 &middot; 1.3.5</div>
            <div className="eup-unit-badge-row">
              <span className="eup-unit-num">Section 1.3.5</span>
              <span className="eup-unit-code">WEC11</span>
            </div>
            <h1 className="elp-hero-title">Market Failure &mdash;<br /><em style={{ color: 'var(--eup-accent)' }}>every type, every diagram</em></h1>
            <p className="elp-hero-desc">The complete Edexcel IAL Economics guide to market failure. Externalities, public goods, merit and demerit goods, information failure and monopoly power &mdash; with diagrams, real examples and exam technique for WEC11.</p>
            <div className="elp-hero-actions">
              <TopicCta slot="hero" href="/economics/unit-1/market-failure" topic="market failure" />
              <a href="#types" className="elp-btn-secondary">Jump to types</a>
            </div>
            <div className="elp-hero-proof">
              <div className="elp-proof-item"><strong>7 types</strong> fully explained</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item"><strong>Free</strong> for every student</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">WEC11 exam aligned</div>
            </div>
          </div>

          {/* Preview card mimicking the app */}
          <div className="elp-hero-preview elp-fade-up" style={{ transitionDelay: '.15s' }}>
            <div className="elp-hero-badge elp-b1">
              <span className="elp-badge-icon"><Star size={18} /></span>
              <div className="elp-badge-text"><span className="elp-badge-val">7 types</span><span className="elp-badge-lbl">fully explained</span></div>
            </div>
            <div className="elp-preview-card">
              <div className="elp-preview-topbar">
                <div className="elp-preview-tab elp-active" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Notes</div>
                <div className="elp-preview-tab">Flashcards</div>
                <div className="elp-preview-tab">Quiz</div>
              </div>
              <div className="elp-preview-body">
                <div className="elp-preview-section-title">1.3.5 &mdash; Market Failure</div>
                <div className="elp-preview-key-idea" style={{ borderLeftColor: 'var(--eup-accent)' }}>
                  <div className="elp-pki-label" style={{ color: 'var(--eup-accent)' }}><LearnMode size={18} /> Key idea</div>
                  <div className="elp-pki-text" style={{ color: '#99f6e4' }}>Markets fail when prices give the wrong signals &mdash; causing too much or too little to be produced relative to the social optimum.</div>
                </div>
                <div className="elp-preview-bullets">
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: 'var(--ns-free)' }} /><div className="elp-pb-text"><strong>Negative externality</strong> &mdash; cost imposed on third parties; causes overproduction.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: 'var(--ns-blue)' }} /><div className="elp-pb-text">Private cost &lt; social cost &rarr; price too low &rarr; output above MSC = MSB.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: 'var(--ns-amber)' }} /><div className="elp-pb-text"><strong>Deadweight loss</strong> &mdash; market produces beyond social optimum.</div></div>
                </div>
                <div className="elp-preview-flow">
                  <div className="elp-pf-step">Firm ignores social cost</div>
                  <div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div>
                  <div className="elp-pf-step">P too low</div>
                  <div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div>
                  <div className="elp-pf-step">Overproduction</div>
                  <div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div>
                  <div className="elp-pf-result" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Welfare loss</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <div className="elp-section" id="overview">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />The big picture</div>
          <h2 className="elp-s-title">What is market failure?</h2>
        </div>
        <div className="eup-topic-block elp-fade-up">
          <p className="eup-topic-desc">Market failure is one of the highest-weighted topics in Edexcel IAL Economics Unit 1 (WEC11) and appears in almost every paper series. It happens when the free market mechanism, left to itself, fails to allocate resources efficiently &mdash; the price paid in the market does not reflect all the costs and benefits of producing or consuming a good.</p>
          <p className="eup-topic-desc">In a perfectly functioning market, resources flow to the point where <strong>marginal social benefit (MSB)</strong> equals <strong>marginal social cost (MSC)</strong>. When externalities, public goods, missing information or monopoly power get in the way, the market produces too much or too little of a good and total welfare falls below its potential maximum.</p>
        </div>
      </div>

      {/* TYPES */}
      <div className="elp-section" id="types">
        <div className="elp-fade-up" style={{ marginBottom: 40 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />All seven types</div>
          <h2 className="elp-s-title">The seven types of market failure, explained</h2>
          <p className="elp-s-sub">Different textbooks count them as four, five or six categories &mdash; we work through seven, each with a clear definition, real examples and the diagram that goes with it.</p>
        </div>
        {TYPES_OF_FAILURE.map((type, idx) => (
          <div key={type.slug}>
            <div className="eup-topic-block elp-fade-up" id={type.slug}>
              <div className="eup-topic-label-row">
                <div className="eup-topic-ref-badge">{type.number}</div>
                <div className="eup-topic-heading">{type.name}</div>
              </div>
              <p className="eup-topic-desc"><strong>{type.shortDef}</strong></p>
              <p className="eup-topic-desc">{type.detail}</p>
              <div className="eup-subtopic-grid">
                <div className="eup-subtopic-tile">
                  <div className="eup-st-num"><Star size={18} /></div>
                  <div className="eup-st-body">
                    <div className="eup-st-name">Real examples</div>
                    <div className="eup-st-keywords">{type.example}</div>
                  </div>
                </div>
                <div className="eup-subtopic-tile">
                  <div className="eup-st-num"><ProgressChart size={18} /></div>
                  <div className="eup-st-body">
                    <div className="eup-st-name">Diagram</div>
                    <div className="eup-st-keywords">{type.diagram}</div>
                  </div>
                </div>
              </div>
            </div>
            {idx < TYPES_OF_FAILURE.length - 1 && <div className="eup-topic-divider" />}
          </div>
        ))}
      </div>

      {/* PARTIAL VS COMPLETE */}
      <div className="elp-section" id="partial-complete">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Depth of failure</div>
          <h2 className="elp-s-title">Partial vs complete market failure</h2>
        </div>
        <div className="eup-topic-block elp-fade-up">
          <p className="eup-topic-desc"><strong>Partial market failure</strong> occurs when a market exists but produces the wrong quantity relative to the social optimum. Every externality, every merit good and every demerit good is an example.</p>
          <p className="eup-topic-desc"><strong>Complete market failure</strong> occurs when the market fails to form at all. Pure public goods are the classic case: because producers cannot exclude non-payers, and one person&rsquo;s use does not reduce availability, no profit-seeking firm will supply them. Only the government can provide them &mdash; usually funded through taxation.</p>
        </div>
      </div>

      {/* DIAGRAMS */}
      <div className="elp-section" id="diagrams">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Exam-ready visuals</div>
          <h2 className="elp-s-title">Market failure diagrams</h2>
          <p className="elp-s-sub">Examiners reward clear, fully labelled diagrams. Label axes (P, Q), every curve (MPC, MSC, MPB, MSB, D, S), free-market and socially-optimal equilibria, and shade the welfare loss.</p>
        </div>
        <div className="eup-topic-block elp-fade-up">
          <div className="eup-subtopic-grid">
            {DIAGRAMS.map((d, i) => (
              <div key={i} className="eup-subtopic-tile">
                <div className="eup-st-num"><ChartHistogram size={18} /></div>
                <div className="eup-st-body">
                  <div className="eup-st-name">{d.name}</div>
                  <div className="eup-st-keywords">{d.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GOVERNMENT INTERVENTION */}
      <div className="elp-section" id="intervention">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Policy response</div>
          <h2 className="elp-s-title">How governments correct market failure</h2>
          <p className="elp-s-sub">WEC11 evaluation questions on market failure &mdash; Examine (8), Discuss (14) and Evaluate (20) &mdash; expect you to weigh up policy responses and end with the risk of government failure.</p>
        </div>
        <div className="eup-topic-block elp-fade-up">
          <div className="eup-subtopic-grid">
            {POLICY_TOOLS.map((p, i) => (
              <div key={i} className="eup-subtopic-tile">
                <div className="eup-st-num"><Settings size={18} /></div>
                <div className="eup-st-body">
                  <div className="eup-st-name">{p.name}</div>
                  <div className="eup-st-keywords">{p.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="eup-topic-desc" style={{ marginTop: 20 }}>See the full breakdown on <Link href="/economics/unit-1/government-intervention" style={{ color: 'var(--eup-accent)' }}>Government Intervention</Link>. Always finish a WEC11 evaluation answer by discussing <strong>government failure</strong> &mdash; the risk that intervention itself produces a worse allocation of resources than the original market failure.</p>
        </div>
      </div>

      {/* INTERACTIVE NOTES PREVIEW (supabase-driven) */}
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
            <TopicCta slot="afterNotes" href="/economics/unit-1/market-failure" topic="market failure" />
          </div>
        </div>
      )}

      {/* PRACTICE QUESTIONS */}
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
            <p className="eup-topic-desc" style={{ marginTop: 16 }}>For a fully worked model answer with the mark scheme and annotations, see the <Link href="/economics/market-failure-model-answers" style={{ color: 'var(--eup-accent)' }}>Market Failure Model Answers</Link> page.</p>
          </div>
        </div>
      )}

      {/* UNIT OVERVIEW: key concepts + exam info */}
      <div className="eup-unit-overview">
        <div className="eup-unit-overview-inner">
          <div className="elp-fade-up">
            <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Topic overview</div>
            <h2 className="elp-s-title">What you need to know for 1.3.5</h2>
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
            <h2 className="elp-s-title">WEC11 at a glance</h2>
            <div className="eup-exam-info">
              <div className="eup-ei-label">Assessment details</div>
              <div className="eup-ei-row"><span className="eup-ei-key">Unit</span><span className="eup-ei-val" style={{ color: 'var(--eup-accent)' }}>1.3.5 &mdash; WEC11</span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">Paper duration</span><span className="eup-ei-val">1 hour 45 minutes</span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">Paper marks</span><span className="eup-ei-val">80 marks</span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">% of A-Level</span><span className="eup-ei-val">25%</span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">Question styles</span><span className="eup-ei-val eup-marks-pills-inline"><span className="eup-mp eup-mp-4">4</span><span className="eup-mp eup-mp-8">8</span><span className="eup-mp eup-mp-20">20</span></span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">Common in</span><span className="eup-ei-val">Section C data-response &amp; Section D essay</span></div>
              <div className="eup-ei-row eup-ei-row-last"><span className="eup-ei-key">Sessions</span><span className="eup-ei-val">January, June, October</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="elp-section" id="faq">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Common questions</div>
          <h2 className="elp-s-title">Market failure FAQ</h2>
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

      {/* CONTINUE REVISING */}
      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />Keep going</div>
        <h2 className="elp-s-title" style={{ fontSize: 22, marginBottom: 8 }}>Continue revising</h2>
        <div className="eup-continue-grid">
          <Link className="eup-continue-card" href="/economics/unit-1/government-intervention">
            <div className="eup-cc-icon"><DrawerAlt size={18} /></div>
            <div className="eup-cc-body"><div className="eup-cc-name">Government Intervention</div><div className="eup-cc-sub">1.3.6 &middot; Taxes, subsidies, regulation, direct provision</div></div>
            <div className="eup-cc-arrow">&rarr;</div>
          </Link>
          <Link className="eup-continue-card" href="/economics/market-failure-model-answers">
            <div className="eup-cc-icon"><PenIcon size={18} /></div>
            <div className="eup-cc-body"><div className="eup-cc-name">Market Failure Model Answers</div><div className="eup-cc-sub">1.3.5 &middot; Annotated 4-mark answer with mark scheme</div></div>
            <div className="eup-cc-arrow">&rarr;</div>
          </Link>
          <Link className="eup-continue-card" href="/economics/unit-1">
            <div className="eup-cc-icon"><BookAlt size={18} /></div>
            <div className="eup-cc-body"><div className="eup-cc-name">All Unit 1 Topics</div><div className="eup-cc-sub">WEC11 &middot; Markets in Action</div></div>
            <div className="eup-cc-arrow">&rarr;</div>
          </Link>
          <Link className="eup-continue-card" href="/past-papers">
            <div className="eup-cc-icon"><Document size={18} /></div>
            <div className="eup-cc-body"><div className="eup-cc-name">WEC11 Past Papers</div><div className="eup-cc-sub">Real exam questions &amp; mark schemes</div></div>
            <div className="eup-cc-arrow">&rarr;</div>
          </Link>
        </div>
      </div>

      <RelatedModelAnswers
        href="/economics/market-failure-model-answers"
        sectionTitle="Market Failure"
        count={1}
      />

      {/* FEATURES STRIP */}
      <div className="elp-features-strip">
        <div className="elp-features-inner">
          <div className="elp-feat-item"><span className="elp-feat-icon"><Clipboard size={18} /></span><div><div className="elp-feat-label">Spec-aligned notes</div><div className="elp-feat-sub">Externalities, public goods &amp; information failure</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon"><ProgressChart size={18} /></span><div><div className="elp-feat-label">Labelled diagrams</div><div className="elp-feat-sub">MPC, MSC, MPB, MSB, welfare loss</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon"><BoltIcon size={18} /></span><div><div className="elp-feat-label">Practice questions</div><div className="elp-feat-sub">Exam-style with model answers</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon"><Tutor size={18} /></span><div><div className="elp-feat-label">AI Tutor</div><div className="elp-feat-sub">Ask any market failure question</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon"><NetworkGraph size={18} /></span><div><div className="elp-feat-label">Built for IAL</div><div className="elp-feat-sub">International A-Level focus</div></div></div>
        </div>
      </div>

      {/* CTA */}
      <div className="elp-cta-section">
        <div className="elp-cta-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(20,184,166,.07) 0%, transparent 65%)' }} />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Ready to master market failure?</h2>
          <p className="elp-cta-sub">Free notes across all four units. Flashcards, quizzes and AI tutor unlock with Pro — £1 for your first month as a new subscriber.</p>
          <div className="elp-cta-actions">
            <TopicCta slot="closing" href="/economics/unit-1/market-failure" topic="market failure" />
            <Link href="/economics/unit-1" className="elp-btn-secondary">&larr; Back to Unit 1</Link>
          </div>
          <p className="elp-cta-note">No signup required for notes &middot; Cancel anytime &middot; &pound;1 first month for new subscribers, then &pound;1.99 &middot; charged in your local currency</p>
        </div>
      </div>

      {/* FOOTER */}
      <BackToApp
        icon={LearnMode}
        heading={"Revise market failure in the app"}
        sub={"Diagrams and exam-style practice on this exact topic — free"}
        href="/economics/unit-1/market-failure"
        cta={"Open market failure"}
      />

      <footer className="elp-footer">
        <div className="elp-footer-inner">
          <div className="elp-footer-logo"><img src="/logo.svg" alt="" className="elp-footer-mark" width={18} height={18} />Revvy Learn</div>
          <div className="elp-footer-sep" />
          <div className="elp-footer-links">
            <Link className="elp-footer-link" href="/economics">Economics</Link>
            <Link className="elp-footer-link" href="/economics/unit-1">Unit 1</Link>
            <Link className="elp-footer-link" href="/economics/market-failure">Market Failure</Link>
            <Link className="elp-footer-link" href="/economics/market-failure-model-answers">Model Answers</Link>
            <Link className="elp-footer-link" href="/glossary">Glossary</Link>
            <Link className="elp-footer-link" href="/past-papers">Past Papers</Link>
          </div>
          <div className="elp-footer-right">Edexcel IAL WEC11 &copy; Revvy Learn</div>
        </div>
      </footer>
    </div>
  );
}
