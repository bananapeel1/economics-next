import Link from 'next/link';
import UnitScrollBar from '../UnitScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Business Behaviour — Edexcel IAL Economics Unit 3 (WEC13) | Revvy Learn',
  description: 'Complete revision notes for Edexcel IAL Economics Unit 3 (WEC13). Business objectives, revenue and cost analysis, market structures, labour markets and government intervention.',
  openGraph: { title: 'Business Behaviour — Edexcel IAL Economics Unit 3 (WEC13) | Revvy Learn', url: 'https://revvylearn.com/economics/unit-3', type: 'article' },
};

const UNIT = { number: 3, code: 'WEC13', title: 'Business Behaviour' };

const SECTIONS = [
  { id: 'types-sizes-businesses', ref: '3.3.1', title: 'Types and Sizes of Businesses',
    desc: 'Business objectives, types of organisation, organic and external growth, mergers and integration, economies and diseconomies of scale.',
    subtopics: [
      { letter: 'a', name: 'Business Objectives', kw: 'Profit maximisation · revenue maximisation · satisficing' },
      { letter: 'b', name: 'Types of Organisation', kw: 'Sole trader · partnership · Ltd · plc' },
      { letter: 'c', name: 'Growth of Firms', kw: 'Organic vs external · mergers' },
      { letter: 'd', name: 'Integration Types', kw: 'Horizontal · vertical · conglomerate' },
      { letter: 'e', name: 'Economies of Scale', kw: 'Technical · purchasing · financial · managerial' },
      { letter: 'f', name: 'Diseconomies & Demergers', kw: 'Communication · coordination · motivation' },
    ] },
  { id: 'revenue-costs-profits', ref: '3.3.2', title: 'Revenue, Costs and Profits',
    desc: 'Revenue, cost, and profit analysis — the quantitative framework for understanding firm behaviour. TR, AR, MR, TC, AC, MC, and the profit-maximising condition.',
    subtopics: [
      { letter: 'a', name: 'Revenue Concepts', kw: 'TR, AR, MR · price taker vs price maker' },
      { letter: 'b', name: 'Cost Concepts', kw: 'FC, VC, TC, ATC, MC · key relationships' },
      { letter: 'c', name: 'Short-Run Costs', kw: 'Diminishing returns · U-shaped curves' },
      { letter: 'd', name: 'Long-Run Costs', kw: 'LRAC envelope · MES · returns to scale' },
      { letter: 'e', name: 'Profit', kw: 'Normal vs supernormal · role as signal' },
      { letter: 'f', name: 'Profit Maximisation', kw: 'MC = MR rule · alternative objectives' },
    ] },
  { id: 'market-structures-contestability', ref: '3.3.3', title: 'Market Structures & Contestability',
    desc: 'The competitive spectrum from perfect competition to monopoly — how market structure determines price, output, profit, and efficiency outcomes.',
    subtopics: [
      { letter: 'a', name: 'Perfect Competition', kw: 'Price taker · normal profit in LR' },
      { letter: 'b', name: 'Monopolistic Competition', kw: 'Differentiation · excess capacity' },
      { letter: 'c', name: 'Oligopoly', kw: 'Interdependence · kinked demand · game theory' },
      { letter: 'd', name: 'Monopoly', kw: 'Supernormal profit · deadweight loss · efficiency' },
      { letter: 'e', name: 'Contestable Markets', kw: 'Sunk costs · hit-and-run · threat of entry' },
      { letter: 'f', name: 'Price Discrimination', kw: '1st, 2nd, 3rd degree · conditions · welfare' },
    ] },
  { id: 'labour-markets', ref: '3.3.4', title: 'Labour Markets',
    desc: 'How wages are determined — marginal revenue product theory, labour supply, monopsony power, trade unions, and the causes of wage differentials.',
    subtopics: [
      { letter: 'a', name: 'Demand for Labour', kw: 'MRP theory · derived demand · diminishing returns' },
      { letter: 'b', name: 'Supply of Labour', kw: 'Wage rate · non-monetary factors · backward-bending' },
      { letter: 'c', name: 'Wage Determination', kw: 'Competitive equilibrium · shifts in D and S' },
      { letter: 'd', name: 'Monopsony', kw: 'MCL above supply · exploitation · minimum wage' },
      { letter: 'e', name: 'Trade Unions', kw: 'Collective bargaining · bilateral monopoly' },
      { letter: 'f', name: 'Wage Differentials', kw: 'Human capital · compensating · discrimination' },
    ] },
  { id: 'government-intervention-firms', ref: '3.3.5', title: 'Government Intervention',
    desc: 'How governments regulate firms and markets — competition policy, regulation of monopoly, privatisation and nationalisation, and the risk of government failure.',
    subtopics: [
      { letter: 'a', name: 'Competition Policy', kw: 'CMA · SLC test · leniency programs' },
      { letter: 'b', name: 'Regulation of Monopoly', kw: 'RPI\u2013X · rate of return · information asymmetry' },
      { letter: 'c', name: 'Privatisation & Nationalisation', kw: 'Profit motive vs social objectives' },
      { letter: 'd', name: 'Government Failure', kw: 'Regulatory capture · unintended consequences' },
      { letter: 'e', name: 'Minimum Wage', kw: 'Competitive vs monopsony analysis' },
    ] },
];

export default function Unit3Page() {
  return (
    <div className="elp-page eup-page" style={{ '--eup-accent': '#ec4899', '--eup-accent-bg': 'rgba(236,72,153,.08)', '--eup-accent-bd': 'rgba(236,72,153,.2)', '--eup-accent-glow': 'rgba(236,72,153,.15)' }}>
      <UnitScrollBar />
      <div className="elp-scroll-bar"><div className="elp-scroll-fill" id="eup-scroll-fill" style={{ background: 'var(--eup-accent)' }} /></div>

      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo"><div className="elp-nav-dot" /><span>Revvy Learn</span></Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb"><Link href="/economics">Economics</Link><span style={{ color: 'var(--elp-tx-d)', margin: '0 6px' }}>/</span><span style={{ color: 'var(--eup-accent)', fontWeight: 600 }}>Unit 3</span></div>
        <div className="elp-nav-right"><Link href="/economics" className="elp-nav-link">All Units</Link><Link href="/login" className="elp-nav-cta">Sign In</Link></div>
      </nav>

      <div className="eup-topic-nav">
        <span className="eup-tnav-label">Jump to:</span>
        {SECTIONS.map(s => (<a key={s.ref} className="eup-tnav-pill" href={`#t-${s.ref.replace(/\./g, '')}`}>{s.ref}</a>))}
      </div>

      <section>
        <div className="elp-hero" style={{ paddingTop: 144 }}>
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Edexcel IAL Economics &middot; {UNIT.code}</div>
            <div className="eup-unit-badge-row"><span className="eup-unit-num">Unit {UNIT.number}</span><span className="eup-unit-code">{UNIT.code}</span></div>
            <h1 className="elp-hero-title">{UNIT.title} &mdash;<br /><em style={{ color: 'var(--eup-accent)' }}>theory of the firm decoded</em></h1>
            <p className="elp-hero-desc">Complete revision notes for Unit 3. Business objectives, revenue and cost analysis, market structures, labour markets and government intervention &mdash; the theory of the firm from first principles.</p>
            <div className="elp-hero-actions"><Link href={`/?section=${SECTIONS[0].id}`} className="elp-btn-primary">Start revising free &rarr;</Link><a href="#topics" className="elp-btn-secondary">Browse all topics</a></div>
            <div className="elp-hero-proof"><div className="elp-proof-item"><strong>5 topics</strong> fully covered</div><div className="elp-proof-dot" /><div className="elp-proof-item"><strong>Free</strong> notes for every spec point</div><div className="elp-proof-dot" /><div className="elp-proof-item">{UNIT.code} exam ready</div></div>
          </div>
          <div className="elp-hero-preview elp-fade-up" style={{ transitionDelay: '.15s' }}>
            <div className="elp-hero-badge elp-b1"><span className="elp-badge-icon">🎯</span><div className="elp-badge-text"><span className="elp-badge-val">5 topics</span><span className="elp-badge-lbl">fully spec-aligned</span></div></div>
            <div className="elp-preview-card">
              <div className="elp-preview-topbar"><div className="elp-preview-tab elp-active" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Notes</div><div className="elp-preview-tab">Flashcards</div><div className="elp-preview-tab">Quiz</div></div>
              <div className="elp-preview-body">
                <div className="elp-preview-section-title">3.3.3 &mdash; Market Structures</div>
                <div className="elp-preview-key-idea" style={{ borderLeftColor: 'var(--eup-accent)' }}><div className="elp-pki-label" style={{ color: 'var(--eup-accent)' }}>🔑 Key idea</div><div className="elp-pki-text" style={{ color: '#fbcfe8' }}>In perfect competition firms are price takers earning normal profit in the long run; a monopolist is a price maker earning supernormal profit &mdash; the trade-off is efficiency vs innovation.</div></div>
                <div className="elp-preview-bullets">
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#ec4899' }} /><div className="elp-pb-text"><strong>Perfect competition</strong> &mdash; many firms, homogeneous product, no barriers to entry.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#f59e0b' }} /><div className="elp-pb-text"><strong>Monopoly</strong> &mdash; single seller, high barriers, potential for deadweight loss.</div></div>
                </div>
                <div className="elp-preview-flow"><div className="elp-pf-step">Entry barriers fall</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">New firms enter</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">Supernormal profit eroded</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-result" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Normal profit in LR</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="elp-features-strip"><div className="elp-features-inner">
        <div className="elp-feat-item"><span className="elp-feat-icon">📋</span><div><div className="elp-feat-label">Spec-aligned notes</div><div className="elp-feat-sub">Every {UNIT.code} point covered</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon">🔄</span><div><div className="elp-feat-label">Spaced repetition</div><div className="elp-feat-sub">Adaptive flashcard algorithm</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon">⚡</span><div><div className="elp-feat-label">Practice questions</div><div className="elp-feat-sub">Exam-style, every topic</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon">🤖</span><div><div className="elp-feat-label">AI Tutor</div><div className="elp-feat-sub">Ask any Economics question</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon">📊</span><div><div className="elp-feat-label">Progress tracking</div><div className="elp-feat-sub">Mastery across all spec points</div></div></div>
      </div></div>

      <div className="elp-section" id="topics">
        <div className="elp-fade-up" style={{ marginBottom: 40 }}><div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />All five topics</div><h2 className="elp-s-title">Everything in Unit 3, spec point by spec point</h2><p className="elp-s-sub">Click any topic to open the full notes, diagrams, flashcards and practice questions in the app.</p></div>
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
            <div className="eup-concept"><div className="eup-concept-icon">📐</div><div><div className="eup-concept-title">Diagrams drive marks</div><div className="eup-concept-desc">MC/AC/AR/MR for every market structure. Draw them accurately and label them clearly &mdash; diagrams are the backbone of Unit 3 answers.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">🔗</div><div><div className="eup-concept-title">MC = MR is universal</div><div className="eup-concept-desc">The profit maximisation condition applies in every market structure. Understand why firms produce where MC = MR and you can tackle any question.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">⚖️</div><div><div className="eup-concept-title">Static vs dynamic efficiency</div><div className="eup-concept-desc">The big trade-off in evaluation. Monopolies may be allocatively inefficient but can achieve dynamic efficiency through supernormal profits funding R&amp;D.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">🎯</div><div><div className="eup-concept-title">Contestability changes everything</div><div className="eup-concept-desc">Focus on barriers to entry and sunk costs, not firm count. A market with few firms can still behave competitively if the threat of entry is credible.</div></div></div>
          </div>
        </div>
        <div className="elp-fade-up" style={{ transitionDelay: '.1s' }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: '#f59e0b' }} />Exam paper info</div>
          <h2 className="elp-s-title">{UNIT.code} at a glance</h2>
          <div className="eup-exam-info">
            <div className="eup-ei-label">Assessment details</div>
            <div className="eup-ei-row"><span className="eup-ei-key">Exam paper</span><span className="eup-ei-val" style={{ color: 'var(--eup-accent)' }}>{UNIT.code}</span></div>
            <div className="eup-ei-row"><span className="eup-ei-key">Duration</span><span className="eup-ei-val">1 hour 30 minutes</span></div>
            <div className="eup-ei-row"><span className="eup-ei-key">Total marks</span><span className="eup-ei-val">80 marks</span></div>
            <div className="eup-ei-row"><span className="eup-ei-key">% of A-Level</span><span className="eup-ei-val">20%</span></div>
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
          <Link className="eup-continue-card" href="/economics/unit-2"><div className="eup-cc-icon">📈</div><div className="eup-cc-body"><div className="eup-cc-name">Unit 2: Macroeconomic Performance</div><div className="eup-cc-sub">WEC12 · AD/AS, inflation, unemployment, economic growth</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/economics/unit-4"><div className="eup-cc-icon">🌍</div><div className="eup-cc-body"><div className="eup-cc-name">Unit 4: Global Economy</div><div className="eup-cc-sub">WEC14 · Trade, exchange rates, development, globalisation</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/written-practice"><div className="eup-cc-icon">✍️</div><div className="eup-cc-body"><div className="eup-cc-name">Written Practice</div><div className="eup-cc-sub">AI-marked exam answers with instant feedback</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/past-papers"><div className="eup-cc-icon">📄</div><div className="eup-cc-body"><div className="eup-cc-name">{UNIT.code} Past Papers</div><div className="eup-cc-sub">Practise with real exam questions and mark schemes</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
        </div>
      </div>

      <div className="elp-cta-section"><div className="elp-cta-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(236,72,153,.07) 0%, transparent 65%)' }} /><div className="elp-cta-inner elp-fade-up"><h2 className="elp-cta-title">Ready to revise Unit 3?</h2><p className="elp-cta-sub">Free notes for every spec point. Adaptive flashcards, practice questions and AI tutor unlock with a 3-day free trial.</p><div className="elp-cta-actions"><Link href={`/?section=${SECTIONS[0].id}`} className="elp-btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>Open Revvy Learn — it&apos;s free &rarr;</Link><Link href="/economics" className="elp-btn-secondary">&larr; Back to all units</Link></div><p className="elp-cta-note">No signup required for notes &middot; Cancel premium anytime &middot; &euro;0.99/month</p></div></div>

      <footer className="elp-footer"><div className="elp-footer-inner"><div className="elp-footer-logo"><div className="elp-nav-dot" style={{ width: 7, height: 7 }} />Revvy Learn</div><div className="elp-footer-sep" /><div className="elp-footer-links"><Link className="elp-footer-link" href="/economics">Economics</Link><Link className="elp-footer-link" href="/economics/unit-1">Unit 1</Link><Link className="elp-footer-link" href="/economics/unit-2">Unit 2</Link><Link className="elp-footer-link" href="/economics/unit-3">Unit 3</Link><Link className="elp-footer-link" href="/economics/unit-4">Unit 4</Link><Link className="elp-footer-link" href="/glossary">Glossary</Link><Link className="elp-footer-link" href="/past-papers">Past Papers</Link></div><div className="elp-footer-right">Edexcel IAL {UNIT.code} &copy; Revvy Learn</div></div></footer>
    </div>
  );
}
