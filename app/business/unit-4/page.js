import Link from 'next/link';
import UnitScrollBar from '../UnitScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Global Business — Edexcel IAL Business Unit 4 (WBS14) | Revvy Learn',
  description: 'Complete revision notes for Edexcel IAL Business Unit 4 (WBS14). Globalisation, global markets and expansion, global marketing, global industries and multinational corporations.',
  openGraph: { title: 'Global Business — Edexcel IAL Business Unit 4 (WBS14) | Revvy Learn', url: 'https://revvylearn.com/business/unit-4', type: 'article' },
};

const UNIT = { number: 4, code: 'WBS14', title: 'Global Business' };

const SECTIONS = [
  { id: 'globalisation', ref: '4.3.1', title: 'Globalisation',
    desc: 'The forces driving globalisation — why businesses trade internationally, the role of trade blocs, the impact on developed and developing economies, and the debate around free trade vs protectionism.',
    subtopics: [
      { letter: 'a', name: 'Causes of Globalisation', kw: 'Technology · trade liberalisation · deregulation · transport costs' },
      { letter: 'b', name: 'Trade Blocs & Agreements', kw: 'EU · NAFTA/USMCA · ASEAN · WTO · free trade areas · customs unions' },
      { letter: 'c', name: 'Protectionism', kw: 'Tariffs · quotas · subsidies · infant industry · dumping' },
      { letter: 'd', name: 'Impact of Globalisation', kw: 'FDI · cultural convergence · inequality · environmental impact' },
    ] },
  { id: 'global-markets-expansion', ref: '4.3.2', title: 'Global Markets & Expansion',
    desc: 'How businesses enter and compete in global markets — market entry strategies, assessing international opportunities, managing risk and Bartlett & Ghoshal\'s framework.',
    subtopics: [
      { letter: 'a', name: 'Market Entry Strategies', kw: 'Exporting · licensing · franchising · joint ventures · FDI · subsidiaries' },
      { letter: 'b', name: 'Assessing Opportunities', kw: 'Market size · growth potential · cultural distance · political risk' },
      { letter: 'c', name: 'Managing International Risk', kw: 'Exchange rate risk · political instability · legal differences · corruption' },
      { letter: 'd', name: 'Ansoff\'s Matrix (Global)', kw: 'Market development · diversification · existing vs new markets/products' },
      { letter: 'e', name: 'Bartlett & Ghoshal', kw: 'Global · transnational · international · multi-domestic strategies' },
    ] },
  { id: 'global-marketing', ref: '4.3.3', title: 'Global Marketing',
    desc: 'Adapting the marketing mix for international markets — standardisation vs adaptation, glocalisation, cultural differences and the challenges of marketing across borders.',
    subtopics: [
      { letter: 'a', name: 'Standardisation vs Adaptation', kw: 'Global branding · cost savings · local responsiveness · trade-offs' },
      { letter: 'b', name: 'Glocalisation', kw: 'Think global, act local · adapting products · pricing · promotion' },
      { letter: 'c', name: 'Cultural Differences', kw: 'Hofstede · language · religion · consumer behaviour · taboos' },
      { letter: 'd', name: 'Global Pricing', kw: 'Transfer pricing · price discrimination · exchange rate impact · grey markets' },
    ] },
  { id: 'global-industries-mncs', ref: '4.3.4', title: 'Global Industries & MNCs',
    desc: 'The role and impact of multinational corporations — transfer pricing, FDI, ethical issues, the impact on host and home countries, and the power of global brands.',
    subtopics: [
      { letter: 'a', name: 'Multinational Corporations', kw: 'Definition · reasons for MNCs · benefits · drawbacks · power' },
      { letter: 'b', name: 'Transfer Pricing & Tax', kw: 'Profit shifting · tax avoidance · ethical implications · regulation' },
      { letter: 'c', name: 'FDI & Host Countries', kw: 'Job creation · technology transfer · exploitation · environmental damage' },
      { letter: 'd', name: 'Ethical Issues in Global Business', kw: 'Labour standards · sweatshops · environmental responsibility · fair trade' },
      { letter: 'e', name: 'Controlling MNCs', kw: 'Government regulation · international law · pressure groups · CSR' },
    ] },
];

export default function Unit4Page() {
  return (
    <div className="elp-page eup-page" style={{ '--eup-accent': '#a78bfa', '--eup-accent-bg': 'rgba(167,139,250,.08)', '--eup-accent-bd': 'rgba(167,139,250,.2)', '--eup-accent-glow': 'rgba(167,139,250,.15)' }}>
      <UnitScrollBar />
      <div className="elp-scroll-bar"><div className="elp-scroll-fill" id="eup-scroll-fill" style={{ background: 'var(--eup-accent)' }} /></div>

      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo"><div className="elp-nav-dot" /><span>Revvy Learn</span></Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb"><Link href="/business">Business</Link><span style={{ color: 'var(--elp-tx-d)', margin: '0 6px' }}>/</span><span style={{ color: 'var(--eup-accent)', fontWeight: 600 }}>Unit 4</span></div>
        <div className="elp-nav-right"><Link href="/business" className="elp-nav-link">All Units</Link><Link href="/login" className="elp-nav-cta">Sign In</Link></div>
      </nav>

      <div className="eup-topic-nav">
        <span className="eup-tnav-label">Jump to:</span>
        {SECTIONS.map(s => (<a key={s.ref} className="eup-tnav-pill" href={`#t-${s.ref.replace(/\./g, '')}`}>{s.ref}</a>))}
      </div>

      <section>
        <div className="elp-hero" style={{ paddingTop: 144 }}>
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Edexcel IAL Business &middot; {UNIT.code}</div>
            <div className="eup-unit-badge-row"><span className="eup-unit-num">Unit {UNIT.number}</span><span className="eup-unit-code">{UNIT.code}</span></div>
            <h1 className="elp-hero-title">{UNIT.title} &mdash;<br /><em style={{ color: 'var(--eup-accent)' }}>the global perspective</em></h1>
            <p className="elp-hero-desc">Complete revision notes for Unit 4. Globalisation, global markets, international marketing and multinational corporations &mdash; everything you need for {UNIT.code}.</p>
            <div className="elp-hero-actions"><Link href={`/?section=${SECTIONS[0].id}`} className="elp-btn-primary">Start revising free &rarr;</Link><a href="#topics" className="elp-btn-secondary">Browse all topics</a></div>
            <div className="elp-hero-proof"><div className="elp-proof-item"><strong>4 topics</strong> fully covered</div><div className="elp-proof-dot" /><div className="elp-proof-item"><strong>Free</strong> notes for every spec point</div><div className="elp-proof-dot" /><div className="elp-proof-item">{UNIT.code} exam ready</div></div>
          </div>
          <div className="elp-hero-preview elp-fade-up" style={{ transitionDelay: '.15s' }}>
            <div className="elp-hero-badge elp-b1"><span className="elp-badge-icon">🎯</span><div className="elp-badge-text"><span className="elp-badge-val">4 topics</span><span className="elp-badge-lbl">fully spec-aligned</span></div></div>
            <div className="elp-preview-card">
              <div className="elp-preview-topbar"><div className="elp-preview-tab elp-active" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Notes</div><div className="elp-preview-tab">Flashcards</div><div className="elp-preview-tab">Quiz</div></div>
              <div className="elp-preview-body">
                <div className="elp-preview-section-title">4.3.1 &mdash; Globalisation</div>
                <div className="elp-preview-key-idea" style={{ borderLeftColor: 'var(--eup-accent)' }}><div className="elp-pki-label" style={{ color: 'var(--eup-accent)' }}>🔑 Key idea</div><div className="elp-pki-text" style={{ color: '#bfdbfe' }}>Globalisation is the increasing integration of the world&rsquo;s economies through trade, investment and technology &mdash; creating both opportunities and challenges for businesses.</div></div>
                <div className="elp-preview-bullets">
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#a78bfa' }} /><div className="elp-pb-text"><strong>Trade liberalisation</strong> &mdash; removal of barriers to trade through trade blocs and WTO agreements.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#f59e0b' }} /><div className="elp-pb-text"><strong>MNCs</strong> &mdash; multinational corporations drive FDI but raise ethical and environmental concerns.</div></div>
                </div>
                <div className="elp-preview-flow"><div className="elp-pf-step">Trade barriers fall</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">Markets expand</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">MNCs invest abroad</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-result" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Global interdependence</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="elp-features-strip"><div className="elp-features-inner">
        <div className="elp-feat-item"><span className="elp-feat-icon">📋</span><div><div className="elp-feat-label">Spec-aligned notes</div><div className="elp-feat-sub">Every {UNIT.code} point covered</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon">🔄</span><div><div className="elp-feat-label">Spaced repetition</div><div className="elp-feat-sub">Adaptive flashcard algorithm</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon">⚡</span><div><div className="elp-feat-label">Practice questions</div><div className="elp-feat-sub">Exam-style, every topic</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon">🤖</span><div><div className="elp-feat-label">AI Tutor</div><div className="elp-feat-sub">Ask any Business question</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon">📊</span><div><div className="elp-feat-label">Progress tracking</div><div className="elp-feat-sub">Mastery across all spec points</div></div></div>
      </div></div>

      <div className="elp-section" id="topics">
        <div className="elp-fade-up" style={{ marginBottom: 40 }}><div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />All four topics</div><h2 className="elp-s-title">Everything in Unit 4, spec point by spec point</h2><p className="elp-s-sub">Click any topic to open the full notes, diagrams, flashcards and practice questions in the app.</p></div>
        {SECTIONS.map((section, idx) => (
          <div key={section.id}>
            <div className="eup-topic-block elp-fade-up" id={`t-${section.ref.replace(/\./g, '')}`}>
              <div className="eup-topic-label-row"><div className="eup-topic-ref-badge">{section.ref}</div><Link href={`/?section=${section.id}`} className="eup-topic-heading">{section.title}</Link><Link className="eup-topic-open-link" href={`/?section=${section.id}`}>Open in app &rarr;</Link></div>
              <p className="eup-topic-desc">{section.desc}</p>
              <div className="eup-subtopic-grid">{section.subtopics.map(st => (<Link key={st.letter} href={`/?section=${section.id}`} className="eup-subtopic-tile"><div className="eup-st-num">{st.letter}</div><div className="eup-st-body"><div className="eup-st-name">{st.name}</div><div className="eup-st-keywords">{st.kw}</div></div></Link>))}</div>
            </div>
            {idx < SECTIONS.length - 1 && <div className="eup-topic-divider" />}
          </div>
        ))}
      </div>

      <div className="eup-unit-overview"><div className="eup-unit-overview-inner">
        <div className="elp-fade-up">
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Unit overview</div>
          <h2 className="elp-s-title">What you need to know for {UNIT.code}</h2>
          <div className="eup-key-concepts">
            <div className="eup-concept"><div className="eup-concept-icon">🌍</div><div><div className="eup-concept-title">Globalisation is a double-edged sword</div><div className="eup-concept-desc">Trade creates winners and losers. Always evaluate both sides — economic growth and job creation vs inequality, cultural erosion and environmental damage.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">🚀</div><div><div className="eup-concept-title">Entry strategy depends on context</div><div className="eup-concept-desc">Exporting, licensing, franchising, JVs and FDI each carry different levels of risk, cost and control. Match the strategy to the market conditions and business resources.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">🎨</div><div><div className="eup-concept-title">Glocalisation is the sweet spot</div><div className="eup-concept-desc">The best global businesses balance standardisation (cost efficiency) with adaptation (local relevance). Use Bartlett & Ghoshal to frame your analysis.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">⚖️</div><div><div className="eup-concept-title">MNCs face ethical scrutiny</div><div className="eup-concept-desc">Transfer pricing, labour standards and environmental impact are key evaluation themes. Examiners want you to weigh economic benefits against ethical concerns.</div></div></div>
          </div>
        </div>
        <div className="elp-fade-up" style={{ transitionDelay: '.1s' }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: '#f59e0b' }} />Exam paper info</div>
          <h2 className="elp-s-title">{UNIT.code} at a glance</h2>
          <div className="eup-exam-info">
            <div className="eup-ei-label">Assessment details</div>
            <div className="eup-ei-row"><span className="eup-ei-key">Exam paper</span><span className="eup-ei-val" style={{ color: 'var(--eup-accent)' }}>{UNIT.code}</span></div>
            <div className="eup-ei-row"><span className="eup-ei-key">Duration</span><span className="eup-ei-val">2 hours</span></div>
            <div className="eup-ei-row"><span className="eup-ei-key">Total marks</span><span className="eup-ei-val">80 marks</span></div>
            <div className="eup-ei-row"><span className="eup-ei-key">% of A-Level</span><span className="eup-ei-val">25%</span></div>
            <div className="eup-ei-row"><span className="eup-ei-key">Question types</span><span className="eup-ei-val eup-marks-pills-inline"><span className="eup-mp eup-mp-4">4</span><span className="eup-mp eup-mp-8">8</span><span className="eup-mp eup-mp-20">20</span></span></div>
            <div className="eup-ei-row"><span className="eup-ei-key">Data response</span><span className="eup-ei-val">Yes &mdash; Section A</span></div>
            <div className="eup-ei-row eup-ei-row-last"><span className="eup-ei-key">Essay questions</span><span className="eup-ei-val">Section B &mdash; choose 1 of 2</span></div>
          </div>
        </div>
      </div></div>

      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />Keep going</div>
        <h2 className="elp-s-title" style={{ fontSize: 22, marginBottom: 8 }}>Continue revising</h2>
        <div className="eup-continue-grid">
          <Link className="eup-continue-card" href="/business/unit-3"><div className="eup-cc-icon">🧭</div><div className="eup-cc-body"><div className="eup-cc-name">Unit 3: Business Decisions and Strategy</div><div className="eup-cc-sub">WBS13 · Objectives, growth, decision-making, competitiveness, change</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/business/unit-1"><div className="eup-cc-icon">📈</div><div className="eup-cc-body"><div className="eup-cc-name">Unit 1: Marketing and People</div><div className="eup-cc-sub">WBS11 · Customer needs, the market, marketing mix, managing people</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/written-practice"><div className="eup-cc-icon">✍️</div><div className="eup-cc-body"><div className="eup-cc-name">Written Practice</div><div className="eup-cc-sub">AI-marked exam answers with instant feedback</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/past-papers"><div className="eup-cc-icon">📄</div><div className="eup-cc-body"><div className="eup-cc-name">{UNIT.code} Past Papers</div><div className="eup-cc-sub">Practise with real exam questions and mark schemes</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
        </div>
      </div>

      <div className="elp-cta-section"><div className="elp-cta-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(167,139,250,.07) 0%, transparent 65%)' }} /><div className="elp-cta-inner elp-fade-up"><h2 className="elp-cta-title">Ready to revise Unit 4?</h2><p className="elp-cta-sub">Free notes for every spec point. Adaptive flashcards, practice questions and AI tutor unlock with a 3-day free trial.</p><div className="elp-cta-actions"><Link href={`/?section=${SECTIONS[0].id}`} className="elp-btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>Open Revvy Learn — it&apos;s free &rarr;</Link><Link href="/business" className="elp-btn-secondary">&larr; Back to all units</Link></div><p className="elp-cta-note">No signup required for notes &middot; Cancel premium anytime &middot; &euro;0.99/month</p></div></div>

      <footer className="elp-footer"><div className="elp-footer-inner"><div className="elp-footer-logo"><div className="elp-nav-dot" style={{ width: 7, height: 7 }} />Revvy Learn</div><div className="elp-footer-sep" /><div className="elp-footer-links"><Link className="elp-footer-link" href="/business">Business</Link><Link className="elp-footer-link" href="/business/unit-1">Unit 1</Link><Link className="elp-footer-link" href="/business/unit-2">Unit 2</Link><Link className="elp-footer-link" href="/business/unit-3">Unit 3</Link><Link className="elp-footer-link" href="/business/unit-4">Unit 4</Link><Link className="elp-footer-link" href="/glossary">Glossary</Link><Link className="elp-footer-link" href="/past-papers">Past Papers</Link></div><div className="elp-footer-right">Edexcel IAL {UNIT.code} &copy; Revvy Learn</div></div></footer>
    </div>
  );
}
