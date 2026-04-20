import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';
import RelatedModelAnswers from '@/components/RelatedModelAnswers';

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
    <div className="resource-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="resource-page-header">
        <Link href="/economics/unit-4" className="resource-back-link">&larr; Unit 4: Developments in the Global Economy</Link>
        <span className="seo-unit-badge">Section 4.3.1 &middot; WEC14</span>
        <h1 className="resource-page-title">Globalisation &mdash; Edexcel IAL Economics (WEC14) Complete Guide</h1>
        <p className="resource-page-subtitle">
          Every cause and effect of globalisation on the Edexcel IAL Economics specification, how multinational corporations drive it, and how to evaluate it in exam answers. Built for WEC14.
        </p>
      </div>

      <div className="seo-hero-cta">
        <div className="seo-hero-cta-content">
          <div className="seo-hero-cta-text">
            <span className="seo-hero-cta-label">Interactive Revision</span>
            <p>Flashcards, quizzes, AI tutor and progress tracking for this topic</p>
          </div>
          <Link href="/economics/unit-4/causes-effects-globalisation" className="seo-hero-cta-button">
            Open in app &rarr;
          </Link>
        </div>
      </div>

      <section className="seo-content-section">
        <h2>What is globalisation?</h2>
        <p>
          Globalisation is the increasing interdependence of national economies through cross-border trade in goods and services, flows of capital and labour, and the spread of technology and ideas. It is the dominant force shaping the global economy in Unit 4 of Edexcel IAL Economics (WEC14) and appears in every paper series in both short-answer and 20-mark form.
        </p>
        <p>
          Globalisation is not new &mdash; the first wave ran from the 1870s to 1914 &mdash; but it has accelerated dramatically since the 1980s. For WEC14, you need to explain the causes, weigh up the effects on different types of country, and evaluate the role of multinational corporations.
        </p>
      </section>

      <section className="seo-content-section">
        <h2>Causes of globalisation</h2>
        <p>
          The six main causes of globalisation for WEC14. Strong answers do not just list them; they identify the most important one for the specific context of the question and explain why.
        </p>

        <ol className="seo-types-list">
          {CAUSES.map(c => (
            <li key={c.slug} id={c.slug}>
              <h3>{c.number}. {c.name}</h3>
              <p>{c.detail}</p>
              <p><em>Example:</em> {c.example}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="seo-content-section">
        <h2>Effects of globalisation on developed countries</h2>
        <p>
          For developed economies, globalisation produces large consumer gains and substantial adjustment costs. A good WEC14 answer names winners and losers explicitly.
        </p>
        <ul>
          {EFFECTS_DEVELOPED.map((e, i) => (
            <li key={i}><strong>{e.pos ? '+' : '\u2212'}</strong> {e.text}</li>
          ))}
        </ul>
      </section>

      <section className="seo-content-section">
        <h2>Effects of globalisation on developing countries</h2>
        <p>
          For developing economies, globalisation has been associated with the largest reduction in poverty in human history &mdash; but also with significant environmental and social costs.
        </p>
        <ul>
          {EFFECTS_DEVELOPING.map((e, i) => (
            <li key={i}><strong>{e.pos ? '+' : '\u2212'}</strong> {e.text}</li>
          ))}
        </ul>
      </section>

      <section className="seo-content-section">
        <h2>Multinational corporations and globalisation</h2>
        <p>
          MNCs are both a cause and an outcome of globalisation. They organise global supply chains, move capital and technology across borders, and exert political as well as economic influence.
        </p>
        <ul>
          {MNC_EFFECTS.map((e, i) => (
            <li key={i}><strong>{e.pos ? '+' : '\u2212'}</strong> {e.text}</li>
          ))}
        </ul>
        <p>
          See the full breakdown on the Unit 4 pages for <Link href="/economics/unit-4/trade-global-economy">Trade and the Global Economy</Link> and <Link href="/economics/unit-4/balance-payments-exchange-rates">Balance of Payments and Exchange Rates</Link>.
        </p>
      </section>

      <section className="seo-content-section">
        <h2>How to evaluate globalisation in IAL exam answers</h2>
        <p>
          Evaluation separates high-band from mid-band answers. Strong evaluation acknowledges that globalisation is not inherently good or bad &mdash; its effects depend on context, policy choices and whose interests are counted.
        </p>
        <ul>
          <li><strong>It depends on the country.</strong> China and Vietnam have gained huge growth; sub-Saharan Africa has seen much smaller benefits.</li>
          <li><strong>It depends on the industry.</strong> Consumers gain from cheap imports; workers in industries that are outcompeted lose.</li>
          <li><strong>Short-run vs long-run.</strong> Adjustment costs come first; productivity gains come later. The balance depends on retraining, social safety nets and investment.</li>
          <li><strong>Distribution of gains.</strong> The average is positive, but average is misleading if gains go to a small number of winners.</li>
          <li><strong>Regulation and institutions.</strong> Gains are larger where property rights, labour standards and environmental rules are strong.</li>
          <li><strong>Is globalisation reversing?</strong> Slowbalisation, friendshoring and rising geopolitical tension are reshaping trade patterns &mdash; good top-end evaluation.</li>
        </ul>
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
          <Link href="/economics/unit-4/causes-effects-globalisation" className="seo-section-link">
            Open all globalisation notes interactively &rarr;
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
        </section>
      )}

      <section className="seo-faq-section">
        <h2>Globalisation FAQ</h2>
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
          <Link href="/economics/unit-4/trade-global-economy">Trade and the Global Economy</Link>
          <Link href="/economics/unit-4/balance-payments-exchange-rates">Balance of Payments &amp; Exchange Rates</Link>
          <Link href="/economics/unit-4/growth-development">Growth and Development</Link>
          <Link href="/economics/unit-4/poverty-inequality">Poverty and Inequality</Link>
          <Link href="/economics/unit-4">All Unit 4 Topics</Link>
          <Link href="/business/unit-4/globalisation">Globalisation in IAL Business</Link>
          <Link href="/past-papers">WEC14 Past Papers</Link>
          <Link href="/command-words">Command Words Guide</Link>
        </div>
      </div>

      <div className="seo-cta">
        <h2>Master globalisation interactively</h2>
        <p>Use flashcards, quizzes and the AI tutor to drill every cause, effect and evaluation point before exam day.</p>
        <Link href="/economics/unit-4/causes-effects-globalisation" className="seo-cta-button">Start revising &rarr;</Link>
      </div>
    </div>
  );
}
