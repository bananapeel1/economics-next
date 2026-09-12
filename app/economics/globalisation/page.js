import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';
import BackToApp from '@/components/BackToApp';
import { LearnMode } from '@/components/Icons';
import UnitScrollBar from '../UnitScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Globalisation | IAL Economics WEC14 Complete Revision Guide',
  description: 'Complete globalisation revision for Edexcel IAL Economics Unit 4 (WEC14). Causes, effects on developed and developing countries, multinational corporations, evaluation and exam technique with model answers.',
  alternates: { canonical: 'https://revvylearn.com/economics/globalisation' },
  openGraph: {
    title: 'Globalisation | IAL Economics WEC14 Complete Guide | Revvy Learn',
    description: 'The complete Edexcel IAL Economics guide to globalisation: causes, effects, MNCs, evaluation framework. Built for WEC14.',
    url: 'https://revvylearn.com/economics/globalisation',
    type: 'article',
  },
};

const ACCENT = {
  color: '#a78bfa',
  bg: 'rgba(167,139,250,.08)',
  bd: 'rgba(167,139,250,.2)',
  glow: 'rgba(167,139,250,.15)',
};

const CAUSES = [
  {
    slug: 'trade-liberalisation',
    number: 1,
    name: 'Trade liberalisation',
    detail: 'Reduction of tariffs, quotas and non-tariff barriers. Driven by the WTO (formed 1995, replacing GATT) and regional trade agreements like NAFTA (now USMCA), the EU, ASEAN and the African Continental Free Trade Area.',
    example: 'China joining the WTO in 2001 opened it to global trade flows that drove four decades of growth.',
  },
  {
    slug: 'technology',
    number: 2,
    name: 'Technology and communications',
    detail: 'The internet, cloud computing, containerisation, and cheaper air and sea freight have collapsed the cost of moving goods, capital, information and services across borders. Fibre-optic cables and satellites made real-time global coordination possible.',
    example: 'Containerisation cut shipping costs by ~90% between 1950 and 2000. A call from London to New York in 1930 cost \u00a3300 in today\u2019s money; in 2026 it is free over the internet.',
  },
  {
    slug: 'financial-deregulation',
    number: 3,
    name: 'Financial deregulation',
    detail: 'The lifting of capital controls from the 1980s allowed money to flow between countries far more freely. Banking deregulation and the rise of global capital markets mean a pension fund in Qatar can buy shares in a Brazilian mining firm instantly.',
    example: 'Global foreign direct investment rose from $54bn in 1980 to over $1.5trn in recent years.',
  },
  {
    slug: 'mncs',
    number: 4,
    name: 'Growth of multinational corporations',
    detail: 'MNCs drive globalisation by operating supply chains across borders \u2014 designing in one country, sourcing components from many, assembling in low-cost locations, and selling worldwide. They shift profits, technology and jobs internationally.',
    example: 'Apple designs in California, sources components from over 40 countries, assembles in China and Vietnam, and sells in more than 170 markets.',
  },
  {
    slug: 'political-change',
    number: 5,
    name: 'Political change and opening of markets',
    detail: 'The fall of the Soviet Union (1991), China\u2019s economic reforms (from 1978), India\u2019s liberalisation (1991), and the opening of Eastern Europe created billions of new consumers and workers in the global economy.',
    example: 'India\u2019s 1991 reforms lifted hundreds of millions out of poverty and made the country the world\u2019s third-largest economy by PPP.',
  },
  {
    slug: 'migration',
    number: 6,
    name: 'Migration',
    detail: 'Labour flows across borders driven by wage differentials, demographic imbalances and the search for opportunity. Migration spreads skills, remittances and cultural exchange \u2014 and is itself both a cause and an effect of globalisation.',
    example: 'Remittances from migrants in 2024 exceeded $650bn globally, dwarfing official aid and rivalling foreign direct investment into many developing economies.',
  },
];

const EFFECTS_DEVELOPED = [
  { pos: true, text: 'Lower consumer prices through access to cheaper imports (China, Vietnam, Bangladesh).' },
  { pos: true, text: 'Greater product variety and choice.' },
  { pos: true, text: 'Increased competition drives innovation and productivity.' },
  { pos: true, text: 'Access to larger export markets for firms with comparative advantage (e.g. UK financial services).' },
  { pos: true, text: 'Inward FDI creates jobs and brings capital and technology.' },
  { pos: false, text: 'Deindustrialisation as manufacturing moves to lower-cost countries (e.g. UK Midlands, US Rust Belt).' },
  { pos: false, text: 'Structural unemployment in declining industries.' },
  { pos: false, text: 'Downward pressure on wages for low-skilled workers (Stolper-Samuelson theorem).' },
  { pos: false, text: 'Rising inequality within developed countries.' },
  { pos: false, text: 'Cultural homogenisation and loss of local identity.' },
];

const EFFECTS_DEVELOPING = [
  { pos: true, text: 'Access to foreign capital and technology through FDI.' },
  { pos: true, text: 'Job creation in export industries (manufacturing, services).' },
  { pos: true, text: 'Technology and skills transfer.' },
  { pos: true, text: 'Higher growth rates, poverty reduction (China, India, Vietnam).' },
  { pos: true, text: 'Integration into global supply chains.' },
  { pos: false, text: 'Exploitation of cheap labour and poor working conditions.' },
  { pos: false, text: 'Environmental damage from unregulated industrialisation.' },
  { pos: false, text: 'Dependency on foreign firms that can relocate.' },
  { pos: false, text: 'Growing inequality within countries as gains concentrate in urban/export sectors.' },
  { pos: false, text: 'Brain drain as skilled workers emigrate.' },
  { pos: false, text: 'Vulnerability to global shocks and capital flight.' },
];

const MNC_EFFECTS = [
  { pos: true, text: 'Job creation, often at wages above the local average.' },
  { pos: true, text: 'Tax revenue for the host government.' },
  { pos: true, text: 'Technology transfer and training of local workforce.' },
  { pos: true, text: 'Investment in infrastructure that benefits the wider economy.' },
  { pos: true, text: 'Productivity spillovers to local firms.' },
  { pos: false, text: 'Profit repatriation \u2014 profits flow back to the home country, not reinvested locally.' },
  { pos: false, text: 'Transfer pricing to shift tax liability to lower-tax jurisdictions.' },
  { pos: false, text: 'Exploitation of weaker labour and environmental rules.' },
  { pos: false, text: 'Crowding out of local firms that cannot compete on scale.' },
  { pos: false, text: 'Political influence disproportionate to a firm\u2019s direct economic contribution.' },
];

const EVALUATION_POINTS = [
  { name: 'It depends on the country', detail: 'China and Vietnam have gained huge growth; sub-Saharan Africa has seen much smaller benefits.' },
  { name: 'It depends on the industry', detail: 'Consumers gain from cheap imports; workers in industries that are outcompeted lose.' },
  { name: 'Short-run vs long-run', detail: 'Adjustment costs come first; productivity gains come later. Balance depends on retraining, safety nets, investment.' },
  { name: 'Distribution of gains', detail: 'The average is positive, but the average is misleading if gains go to a small number of winners.' },
  { name: 'Regulation and institutions', detail: 'Gains are larger where property rights, labour standards and environmental rules are strong.' },
  { name: 'Is globalisation reversing?', detail: 'Slowbalisation, friendshoring and rising geopolitical tension are reshaping trade patterns \u2014 top-end evaluation.' },
];

const FAQS = [
  {
    q: 'What is globalisation?',
    a: 'Globalisation is the increasing interdependence and integration of the world\u2019s economies, societies and cultures through cross-border trade, investment, migration and the spread of technology. For Edexcel IAL Economics, the exam focus is on economic globalisation \u2014 trade, FDI, MNCs and the international labour market.',
  },
  {
    q: 'What are the main causes of globalisation?',
    a: 'The six main causes examined in Edexcel IAL Economics Unit 4 (WEC14) are: (1) trade liberalisation through the WTO and regional agreements, (2) advances in technology and communications, (3) financial deregulation, (4) the growth of multinational corporations, (5) political change and the opening of markets, and (6) migration. Technology and trade liberalisation are usually the two strongest drivers.',
  },
  {
    q: 'What are the causes and effects of globalisation?',
    a: 'The causes are trade liberalisation, technology, financial deregulation, MNC growth, political change and migration. The effects differ for developed and developing countries: developed economies see lower consumer prices, deindustrialisation and rising inequality; developing economies see growth, poverty reduction, technology transfer, but also environmental damage, exploitation and dependency risks. A full answer evaluates both groups.',
  },
  {
    q: 'What are the causes of globalisation in economics?',
    a: 'In economic terms globalisation is caused by anything that reduces the cost of cross-border transactions or raises their returns: falling tariffs, cheaper shipping and communication, deregulation of finance, and the extension of property rights and rule of law into more countries. Political decisions (such as China\u2019s market reforms) are the catalyst that lets these forces take effect.',
  },
  {
    q: 'What are the effects of globalisation?',
    a: 'Positive effects include higher global output, lower consumer prices, poverty reduction, technology diffusion and economies of scale. Negative effects include rising inequality within countries, deindustrialisation of some developed regions, environmental damage, exploitation of workers with weak protections, and vulnerability to global shocks. The net effect depends on country, policy and time horizon.',
  },
  {
    q: 'How should I evaluate globalisation in an IAL exam?',
    a: 'Good evaluation recognises that globalisation is not inherently good or bad. Discuss: (1) the country\u2019s level of development, (2) the strength of its institutions and regulation, (3) which industries and workers benefit vs lose, (4) the short-run vs long-run balance, and (5) whether gains are redistributed. Use real-world examples \u2014 China\u2019s export-led growth, UK deindustrialisation, the 2008 financial crisis, the global semiconductor supply chain.',
  },
  {
    q: 'What is the role of multinational corporations in globalisation?',
    a: 'MNCs are both a cause and a consequence of globalisation. They organise production across borders, integrate supply chains, shift capital and technology, and create jobs in host countries. They can bring investment and productivity gains, but also use transfer pricing to reduce tax bills and may exploit weaker regulation. The net impact depends heavily on the host country\u2019s regulatory framework.',
  },
  {
    q: 'Is globalisation reversing?',
    a: 'Since the 2008 financial crisis, the COVID-19 pandemic and rising geopolitical tensions, some analysts argue for \u201cdeglobalisation\u201d or \u201cslowbalisation\u201d. Global trade as a % of GDP has plateaued, and firms are rebuilding regional supply chains (\u201cfriendshoring\u201d). This is a good evaluation point for higher-mark answers \u2014 globalisation is dynamic, not a one-way process.',
  },
];

const KEY_CONCEPTS = [
  { icon: '\ud83c\udf0d', title: 'Six causes, two big drivers', desc: 'Tech and trade liberalisation are the engines. The others (finance, MNCs, politics, migration) accelerate the trend but do not start it.' },
  { icon: '\u2696\ufe0f', title: 'Winners and losers', desc: 'Globalisation has positive net gains globally but creates clear losers within countries. Naming both is what separates good from average answers.' },
  { icon: '\ud83c\udfed', title: 'MNCs are double-edged', desc: 'Same firm can bring jobs and FDI while extracting profit and avoiding tax. Evaluation depends on host-country regulation.' },
  { icon: '\ud83d\udd04', title: 'It can reverse', desc: 'Slowbalisation and friendshoring are reshaping global trade. Top-band answers acknowledge globalisation is not a one-way process.' },
];

export default async function GlobalisationPillarPage() {
  const supabase = createServerClient();

  const [{ data: notes }, { data: practice }] = await Promise.all([
    supabase.from('section_notes').select('data').eq('section_id', 'causes-effects-globalisation').single(),
    supabase.from('section_practice').select('data').eq('section_id', 'causes-effects-globalisation').single(),
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
    name: 'Globalisation \u2014 Edexcel IAL Economics (WEC14) Complete Guide',
    description: 'Comprehensive revision notes on globalisation for Edexcel International A-Level Economics Unit 4 (WEC14). Causes, effects on developed and developing countries, MNCs and evaluation.',
    url: 'https://revvylearn.com/economics/globalisation',
    educationalLevel: 'Advanced Level',
    learningResourceType: 'Revision Notes',
    teaches: 'Globalisation, causes of globalisation, effects of globalisation, multinational corporations, trade liberalisation, foreign direct investment',
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
      { '@type': 'ListItem', position: 3, name: 'Unit 4: Developments in the Global Economy', item: 'https://revvylearn.com/economics/unit-4' },
      { '@type': 'ListItem', position: 4, name: 'Globalisation' },
    ],
  };

  return (
    <div className="elp-page eup-page" style={{ '--eup-accent': ACCENT.color, '--eup-accent-bg': ACCENT.bg, '--eup-accent-bd': ACCENT.bd, '--eup-accent-glow': ACCENT.glow }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <UnitScrollBar />
      <div className="elp-scroll-bar"><div className="elp-scroll-fill" id="eup-scroll-fill" style={{ background: 'var(--eup-accent)' }} /></div>

      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo"><div className="elp-nav-dot" /><span>Revvy Learn</span></Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb">
          <Link href="/economics">Economics</Link>
          <span style={{ color: 'var(--elp-tx-d)', margin: '0 6px' }}>/</span>
          <Link href="/economics/unit-4">Unit 4</Link>
          <span style={{ color: 'var(--elp-tx-d)', margin: '0 6px' }}>/</span>
          <span style={{ color: 'var(--eup-accent)', fontWeight: 600 }}>Globalisation</span>
        </div>
        <div className="elp-nav-right">
          <Link href="/economics/unit-4" className="elp-nav-link">All Unit 4 Topics</Link>
          <Link href="/login" className="elp-nav-cta">Sign In</Link>
        </div>
      </nav>

      <div className="eup-topic-nav">
        <span className="eup-tnav-label">Jump to:</span>
        <a className="eup-tnav-pill" href="#overview">What it is</a>
        <a className="eup-tnav-pill" href="#causes">Causes</a>
        <a className="eup-tnav-pill" href="#effects-developed">Developed countries</a>
        <a className="eup-tnav-pill" href="#effects-developing">Developing countries</a>
        <a className="eup-tnav-pill" href="#mncs">MNCs</a>
        <a className="eup-tnav-pill" href="#evaluation">Evaluation</a>
        <a className="eup-tnav-pill" href="#faq">FAQ</a>
      </div>

      <section>
        <div className="elp-hero" style={{ paddingTop: 144 }}>
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Edexcel IAL Economics &middot; WEC14 &middot; 4.3.1</div>
            <div className="eup-unit-badge-row">
              <span className="eup-unit-num">Section 4.3.1</span>
              <span className="eup-unit-code">WEC14</span>
            </div>
            <h1 className="elp-hero-title">Globalisation &mdash;<br /><em style={{ color: 'var(--eup-accent)' }}>causes, effects, evaluation</em></h1>
            <p className="elp-hero-desc">The complete Edexcel IAL Economics guide to globalisation. Causes, effects on developed and developing countries, the role of multinational corporations and a full evaluation framework for WEC14.</p>
            <div className="elp-hero-actions">
              <Link href="/economics/unit-4/causes-effects-globalisation" className="elp-btn-primary">Open in app &rarr;</Link>
              <a href="#causes" className="elp-btn-secondary">Jump to causes</a>
            </div>
            <div className="elp-hero-proof">
              <div className="elp-proof-item"><strong>6 causes</strong> with examples</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item"><strong>30+ effects</strong> mapped</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">WEC14 exam aligned</div>
            </div>
          </div>

          <div className="elp-hero-preview elp-fade-up" style={{ transitionDelay: '.15s' }}>
            <div className="elp-hero-badge elp-b1">
              <span className="elp-badge-icon">&#127919;</span>
              <div className="elp-badge-text"><span className="elp-badge-val">6 causes</span><span className="elp-badge-lbl">fully spec-aligned</span></div>
            </div>
            <div className="elp-preview-card">
              <div className="elp-preview-topbar">
                <div className="elp-preview-tab elp-active" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Notes</div>
                <div className="elp-preview-tab">Flashcards</div>
                <div className="elp-preview-tab">Quiz</div>
              </div>
              <div className="elp-preview-body">
                <div className="elp-preview-section-title">4.3.1 &mdash; Globalisation</div>
                <div className="elp-preview-key-idea" style={{ borderLeftColor: 'var(--eup-accent)' }}>
                  <div className="elp-pki-label" style={{ color: 'var(--eup-accent)' }}>&#128273; Key idea</div>
                  <div className="elp-pki-text" style={{ color: '#ddd6fe' }}>Globalisation creates net global gains but produces winners and losers within every country. Evaluation = naming both.</div>
                </div>
                <div className="elp-preview-bullets">
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#a78bfa' }} /><div className="elp-pb-text"><strong>Trade liberalisation</strong> + tech are the two biggest drivers.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#10b981' }} /><div className="elp-pb-text">Developing economies: poverty reduction, but also exploitation risk.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#f59e0b' }} /><div className="elp-pb-text">Developed economies: lower prices but deindustrialisation.</div></div>
                </div>
                <div className="elp-preview-flow">
                  <div className="elp-pf-step">Tariffs fall</div>
                  <div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div>
                  <div className="elp-pf-step">Trade rises</div>
                  <div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div>
                  <div className="elp-pf-step">Specialisation</div>
                  <div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div>
                  <div className="elp-pf-result" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Global gains</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="elp-features-strip">
        <div className="elp-features-inner">
          <div className="elp-feat-item"><span className="elp-feat-icon">&#128203;</span><div><div className="elp-feat-label">Spec-aligned notes</div><div className="elp-feat-sub">Every WEC14 4.3.1 point covered</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon">&#127759;</span><div><div className="elp-feat-label">Real examples</div><div className="elp-feat-sub">China, India, Apple, the WTO</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon">&#9889;</span><div><div className="elp-feat-label">Practice questions</div><div className="elp-feat-sub">Exam-style with model answers</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon">&#129302;</span><div><div className="elp-feat-label">AI Tutor</div><div className="elp-feat-sub">Ask any globalisation question</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon">&#127758;</span><div><div className="elp-feat-label">Built for IAL</div><div className="elp-feat-sub">International A-Level focus</div></div></div>
        </div>
      </div>

      <div className="elp-section" id="overview">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />The big picture</div>
          <h2 className="elp-s-title">What is globalisation?</h2>
        </div>
        <div className="eup-topic-block elp-fade-up">
          <p className="eup-topic-desc">Globalisation is the increasing interdependence of national economies through cross-border trade in goods and services, flows of capital and labour, and the spread of technology and ideas. It is the dominant force shaping the global economy in Unit 4 of Edexcel IAL Economics (WEC14) and appears in every paper series in both short-answer and 20-mark form.</p>
          <p className="eup-topic-desc">Globalisation is not new &mdash; the first wave ran from the 1870s to 1914 &mdash; but it has accelerated dramatically since the 1980s. For WEC14, you need to explain the causes, weigh up the effects on different types of country, and evaluate the role of multinational corporations.</p>
        </div>
      </div>

      <div className="elp-section" id="causes">
        <div className="elp-fade-up" style={{ marginBottom: 40 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />All six causes</div>
          <h2 className="elp-s-title">Causes of globalisation</h2>
          <p className="elp-s-sub">Strong WEC14 answers identify the most important cause for the specific context of the question and explain why &mdash; not just list them.</p>
        </div>
        {CAUSES.map((c, idx) => (
          <div key={c.slug}>
            <div className="eup-topic-block elp-fade-up" id={c.slug}>
              <div className="eup-topic-label-row">
                <div className="eup-topic-ref-badge">{c.number}</div>
                <div className="eup-topic-heading">{c.name}</div>
              </div>
              <p className="eup-topic-desc">{c.detail}</p>
              <div className="eup-subtopic-grid">
                <div className="eup-subtopic-tile">
                  <div className="eup-st-num">&#128204;</div>
                  <div className="eup-st-body">
                    <div className="eup-st-name">Real example</div>
                    <div className="eup-st-keywords">{c.example}</div>
                  </div>
                </div>
              </div>
            </div>
            {idx < CAUSES.length - 1 && <div className="eup-topic-divider" />}
          </div>
        ))}
      </div>

      <div className="elp-section" id="effects-developed">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Effects on the rich world</div>
          <h2 className="elp-s-title">Effects on developed countries</h2>
          <p className="elp-s-sub">Large consumer gains and substantial adjustment costs. A good answer names winners and losers explicitly.</p>
        </div>
        <div className="eup-topic-block elp-fade-up">
          <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
            {EFFECTS_DEVELOPED.map((e, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < EFFECTS_DEVELOPED.length - 1 ? '1px solid var(--elp-bd-d)' : 'none' }}>
                <span style={{ flexShrink: 0, fontWeight: 700, color: e.pos ? '#10b981' : '#ef4444', fontSize: 16, lineHeight: '1.5' }}>{e.pos ? '+' : '\u2212'}</span>
                <span style={{ color: 'var(--elp-tx)', fontSize: 14, lineHeight: '1.6' }}>{e.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="elp-section" id="effects-developing">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Effects on the developing world</div>
          <h2 className="elp-s-title">Effects on developing countries</h2>
          <p className="elp-s-sub">Associated with the largest reduction in poverty in human history &mdash; but also significant environmental and social costs.</p>
        </div>
        <div className="eup-topic-block elp-fade-up">
          <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
            {EFFECTS_DEVELOPING.map((e, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < EFFECTS_DEVELOPING.length - 1 ? '1px solid var(--elp-bd-d)' : 'none' }}>
                <span style={{ flexShrink: 0, fontWeight: 700, color: e.pos ? '#10b981' : '#ef4444', fontSize: 16, lineHeight: '1.5' }}>{e.pos ? '+' : '\u2212'}</span>
                <span style={{ color: 'var(--elp-tx)', fontSize: 14, lineHeight: '1.6' }}>{e.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="elp-section" id="mncs">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Multinational corporations</div>
          <h2 className="elp-s-title">MNCs and globalisation</h2>
          <p className="elp-s-sub">Both a cause and an outcome of globalisation. Same firm can bring jobs and FDI while extracting profit and avoiding tax.</p>
        </div>
        <div className="eup-topic-block elp-fade-up">
          <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
            {MNC_EFFECTS.map((e, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < MNC_EFFECTS.length - 1 ? '1px solid var(--elp-bd-d)' : 'none' }}>
                <span style={{ flexShrink: 0, fontWeight: 700, color: e.pos ? '#10b981' : '#ef4444', fontSize: 16, lineHeight: '1.5' }}>{e.pos ? '+' : '\u2212'}</span>
                <span style={{ color: 'var(--elp-tx)', fontSize: 14, lineHeight: '1.6' }}>{e.text}</span>
              </li>
            ))}
          </ul>
          <p className="eup-topic-desc" style={{ marginTop: 20 }}>See related topics: <Link href="/economics/unit-4/trade-global-economy" style={{ color: 'var(--eup-accent)' }}>Trade and the Global Economy</Link> and <Link href="/economics/unit-4/balance-payments-exchange-rates" style={{ color: 'var(--eup-accent)' }}>Balance of Payments &amp; Exchange Rates</Link>.</p>
        </div>
      </div>

      <div className="elp-section" id="evaluation">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Top-band marks</div>
          <h2 className="elp-s-title">How to evaluate globalisation in IAL exam answers</h2>
          <p className="elp-s-sub">Strong evaluation acknowledges that globalisation is not inherently good or bad &mdash; its effects depend on context, policy choices and whose interests are counted.</p>
        </div>
        <div className="eup-topic-block elp-fade-up">
          <div className="eup-subtopic-grid">
            {EVALUATION_POINTS.map((p, i) => (
              <div key={i} className="eup-subtopic-tile">
                <div className="eup-st-num">&#9878;&#65039;</div>
                <div className="eup-st-body">
                  <div className="eup-st-name">{p.name}</div>
                  <div className="eup-st-keywords">{p.detail}</div>
                </div>
              </div>
            ))}
          </div>
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
            <Link href="/economics/unit-4/causes-effects-globalisation" className="eup-topic-open-link" style={{ marginTop: 16, display: 'inline-block' }}>Open all notes interactively &rarr;</Link>
          </div>
        </div>
      )}

      {practiceData.length > 0 && (
        <div className="elp-section" id="practice">
          <div className="elp-fade-up" style={{ marginBottom: 24 }}>
            <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: '#f59e0b' }} />Exam practice</div>
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
          </div>
        </div>
      )}

      <div className="eup-unit-overview">
        <div className="eup-unit-overview-inner">
          <div className="elp-fade-up">
            <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Topic overview</div>
            <h2 className="elp-s-title">What you need to know for 4.3.1</h2>
            <div className="eup-key-concepts">
              {KEY_CONCEPTS.map((c, i) => (
                <div key={i} className="eup-concept">
                  <div className="eup-concept-icon">{c.icon}</div>
                  <div>
                    <div className="eup-concept-title">{c.title}</div>
                    <div className="eup-concept-desc">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="elp-fade-up" style={{ transitionDelay: '.1s' }}>
            <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: '#f59e0b' }} />Where it appears</div>
            <h2 className="elp-s-title">WEC14 at a glance</h2>
            <div className="eup-exam-info">
              <div className="eup-ei-label">Assessment details</div>
              <div className="eup-ei-row"><span className="eup-ei-key">Unit</span><span className="eup-ei-val" style={{ color: 'var(--eup-accent)' }}>4.3.1 &mdash; WEC14</span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">Paper duration</span><span className="eup-ei-val">2 hours</span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">Paper marks</span><span className="eup-ei-val">100 marks</span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">% of A-Level</span><span className="eup-ei-val">30%</span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">Question styles</span><span className="eup-ei-val eup-marks-pills-inline"><span className="eup-mp eup-mp-4">5</span><span className="eup-mp eup-mp-8">10</span><span className="eup-mp eup-mp-20">15</span></span></div>
              <div className="eup-ei-row"><span className="eup-ei-key">Common in</span><span className="eup-ei-val">Synoptic essays drawing across all four units</span></div>
              <div className="eup-ei-row eup-ei-row-last"><span className="eup-ei-key">Sessions</span><span className="eup-ei-val">January, June, October</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="elp-section" id="faq">
        <div className="elp-fade-up" style={{ marginBottom: 24 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Common questions</div>
          <h2 className="elp-s-title">Globalisation FAQ</h2>
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
          <Link className="eup-continue-card" href="/economics/unit-4/trade-global-economy">
            <div className="eup-cc-icon">&#128666;</div>
            <div className="eup-cc-body"><div className="eup-cc-name">Trade &amp; the Global Economy</div><div className="eup-cc-sub">4.3.2 &middot; Comparative advantage, protectionism</div></div>
            <div className="eup-cc-arrow">&rarr;</div>
          </Link>
          <Link className="eup-continue-card" href="/economics/unit-4/balance-payments-exchange-rates">
            <div className="eup-cc-icon">&#128176;</div>
            <div className="eup-cc-body"><div className="eup-cc-name">Balance of Payments &amp; FX</div><div className="eup-cc-sub">4.3.3 &middot; Current account, Marshall-Lerner, J-curve</div></div>
            <div className="eup-cc-arrow">&rarr;</div>
          </Link>
          <Link className="eup-continue-card" href="/business/unit-4/globalisation">
            <div className="eup-cc-icon">&#127970;</div>
            <div className="eup-cc-body"><div className="eup-cc-name">Globalisation in IAL Business</div><div className="eup-cc-sub">WBS14 &middot; MNCs, market entry, glocalisation</div></div>
            <div className="eup-cc-arrow">&rarr;</div>
          </Link>
          <Link className="eup-continue-card" href="/economics/unit-4">
            <div className="eup-cc-icon">&#128214;</div>
            <div className="eup-cc-body"><div className="eup-cc-name">All Unit 4 Topics</div><div className="eup-cc-sub">WEC14 &middot; Developments in the Global Economy</div></div>
            <div className="eup-cc-arrow">&rarr;</div>
          </Link>
        </div>
      </div>

      <div className="elp-cta-section">
        <div className="elp-cta-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(167,139,250,.07) 0%, transparent 65%)' }} />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Ready to master globalisation?</h2>
          <p className="elp-cta-sub">Free notes for every spec point. Flashcards, quizzes and AI tutor unlock with Pro — £1 for your first month.</p>
          <div className="elp-cta-actions">
            <Link href="/economics/unit-4/causes-effects-globalisation" className="elp-btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>Open in app &mdash; it&apos;s free &rarr;</Link>
            <Link href="/economics/unit-4" className="elp-btn-secondary">&larr; Back to Unit 4</Link>
          </div>
          <p className="elp-cta-note">No signup required for notes &middot; Cancel anytime &middot; &pound;1 first month, then &pound;1.99 &middot; charged in your local currency</p>
        </div>
      </div>

      <BackToApp

        icon={LearnMode}

        heading={"Revise globalisation in the app"}

        sub={"Diagrams, flashcards and exam-style practice on this exact topic"}

        href="/?section=causes-effects-globalisation"

        cta={"Open 4.3.1"}

      />


      <footer className="elp-footer">
        <div className="elp-footer-inner">
          <div className="elp-footer-logo"><div className="elp-nav-dot" style={{ width: 7, height: 7 }} />Revvy Learn</div>
          <div className="elp-footer-sep" />
          <div className="elp-footer-links">
            <Link className="elp-footer-link" href="/economics">Economics</Link>
            <Link className="elp-footer-link" href="/economics/unit-4">Unit 4</Link>
            <Link className="elp-footer-link" href="/economics/globalisation">Globalisation</Link>
            <Link className="elp-footer-link" href="/business/unit-4/globalisation">Business Globalisation</Link>
            <Link className="elp-footer-link" href="/glossary">Glossary</Link>
            <Link className="elp-footer-link" href="/past-papers">Past Papers</Link>
          </div>
          <div className="elp-footer-right">Edexcel IAL WEC14 &copy; Revvy Learn</div>
        </div>
      </footer>
    </div>
  );
}
