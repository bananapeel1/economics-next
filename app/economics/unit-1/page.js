import Link from 'next/link';
import UnitScrollBar from '../UnitScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Markets in Action — Edexcel IAL Economics Unit 1 (WEC11) | Revvy Learn',
  description: 'Complete revision notes for Edexcel IAL Economics Unit 1 (WEC11): Markets in Action. Demand, supply, equilibrium, market failure and government intervention with flashcards, quizzes and AI tutor.',
  openGraph: {
    title: 'Markets in Action — Edexcel IAL Economics Unit 1 (WEC11) | Revvy Learn',
    description: 'Free Edexcel IAL Economics Unit 1 revision notes. Demand, supply, elasticity, market failure and government intervention.',
    url: 'https://revvylearn.com/economics/unit-1',
    type: 'article',
  },
};

const UNIT = { number: 1, code: 'WEC11', title: 'Markets in Action', accent: 'teal' };

const SECTIONS = [
  {
    id: 'introductory-concepts', ref: '1.3.1', title: 'Introductory Concepts',
    desc: 'Scarcity, choice, and opportunity cost — the foundations of economic thinking. Covers the nature of economics, the production possibility frontier, specialisation, and the price mechanism as a resource-allocation system.',
    subtopics: [
      { letter: 'a', name: 'Scarcity & Opportunity Cost', kw: 'Unlimited wants · finite resources · next best alternative forgone · PPF' },
      { letter: 'b', name: 'The Production Possibility Frontier', kw: 'Productive efficiency · opportunity cost · actual vs potential output · shifts' },
      { letter: 'c', name: 'Specialisation & Exchange', kw: 'Division of labour · comparative advantage · money & barter · trade' },
      { letter: 'd', name: 'The Price Mechanism', kw: 'Signalling · rationing · incentive function · free market allocation' },
      { letter: 'e', name: 'Positive vs Normative Statements', kw: 'Facts vs value judgements · role of economists · policy debate' },
      { letter: 'f', name: 'Economic Systems', kw: 'Free market · command · mixed economy · resource allocation mechanisms' },
    ],
  },
  {
    id: 'consumer-behaviour-demand', ref: '1.3.2', title: 'Consumer Behaviour & Demand',
    desc: 'How consumers make decisions and what drives the demand curve — from utility theory and rational behaviour to the determinants of demand and price elasticity.',
    subtopics: [
      { letter: 'a', name: 'Rational Consumer Behaviour', kw: 'Utility maximisation · diminishing marginal utility · budget constraints' },
      { letter: 'b', name: 'The Demand Curve', kw: 'Law of demand · inverse P-Q relationship · movements vs shifts' },
      { letter: 'c', name: 'Determinants of Demand', kw: 'Income · tastes · prices of related goods · expectations · population' },
      { letter: 'd', name: 'Price Elasticity of Demand (PED)', kw: '% ΔQd ÷ % ΔP · elastic vs inelastic · revenue implications' },
      { letter: 'e', name: 'Income Elasticity of Demand (YED)', kw: 'Normal vs inferior goods · YED formula · income & demand shifts' },
      { letter: 'f', name: 'Cross Elasticity of Demand (XED)', kw: 'Substitutes (positive XED) · complements (negative XED) · cross-price effects' },
    ],
  },
  {
    id: 'supply', ref: '1.3.3', title: 'Supply',
    desc: 'What drives the supply of goods — from the supply curve and its determinants, to elasticity and the impact of taxes and subsidies on producer behaviour.',
    subtopics: [
      { letter: 'a', name: 'The Supply Curve', kw: 'Law of supply · positive P-Q relationship · joint supply · competitive supply' },
      { letter: 'b', name: 'Determinants of Supply', kw: 'Costs of production · technology · taxes · subsidies · number of firms' },
      { letter: 'c', name: 'Price Elasticity of Supply (PES)', kw: '% ΔQs ÷ % ΔP · spare capacity · stock levels · time period · factor mobility' },
      { letter: 'd', name: 'Taxes & Supply', kw: 'Ad valorem vs specific tax · supply shifts left · incidence of tax' },
      { letter: 'e', name: 'Subsidies & Supply', kw: 'Government grants · supply shifts right · lower consumer price · producer benefit' },
      { letter: 'f', name: 'Short Run vs Long Run Supply', kw: 'Fixed vs variable factors · PES in short run · capacity constraints' },
    ],
  },
  {
    id: 'price-determination', ref: '1.3.4', title: 'Price Determination',
    desc: 'How prices are set in competitive markets — equilibrium, consumer and producer surplus, and the effects of taxes, subsidies and price controls on market outcomes.',
    subtopics: [
      { letter: 'a', name: 'Market Equilibrium', kw: 'Where Qd = Qs · market clears · surpluses & shortages · price adjustment' },
      { letter: 'b', name: 'Changes in Equilibrium', kw: 'Shift in D or S → new P* and Q* · diagrammatic analysis · ceteris paribus' },
      { letter: 'c', name: 'Consumer & Producer Surplus', kw: 'Willingness to pay · CS above price line · PS below · total welfare' },
      { letter: 'd', name: 'Incidence of Taxation', kw: 'Tax wedge · consumer vs producer burden · depends on PED/PES' },
      { letter: 'e', name: 'Maximum & Minimum Prices', kw: 'Price ceiling → shortage · price floor → surplus · rationing consequences' },
      { letter: 'f', name: 'Deadweight Welfare Loss', kw: 'Lost CS + PS from inefficiency · DWL triangle · allocative inefficiency' },
    ],
  },
  {
    id: 'market-failure', ref: '1.3.5', title: 'Market Failure',
    desc: 'Why free markets fail to allocate resources efficiently — externalities, public goods, information failure, and moral hazard, with diagrams showing the gap between private and social optimum.',
    subtopics: [
      { letter: 'a', name: 'Types of Market Failure', kw: 'Externalities · public goods · information failure · merit/demerit goods' },
      { letter: 'b', name: 'Negative Externalities', kw: 'MPC < MSC · overproduction · DWL · MPC vs MSC diagram · examples' },
      { letter: 'c', name: 'Positive Externalities', kw: 'MPB < MSB · underproduction · education & healthcare · MSB diagram' },
      { letter: 'd', name: 'Public Goods', kw: 'Non-excludable · non-rival · free-rider problem · complete market failure' },
      { letter: 'e', name: 'Information Failure', kw: 'Asymmetric information · merit goods underprovided · demerit goods overconsumed' },
      { letter: 'f', name: 'Moral Hazard & Bubbles', kw: 'Post-contract information failure · speculation · irrational behaviour · 2008' },
    ],
  },
  {
    id: 'government-intervention', ref: '1.3.6', title: 'Government Intervention',
    desc: 'How governments correct market failure — indirect taxes, subsidies, price controls, regulation, information provision, and direct provision, including the risk of government failure.',
    subtopics: [
      { letter: 'a', name: 'Indirect Taxes', kw: 'Specific vs ad valorem · corrects negative externality · revenue for government' },
      { letter: 'b', name: 'Subsidies', kw: 'Corrects positive externality · supply shifts right · lower price · merit goods' },
      { letter: 'c', name: 'Regulation & Legislation', kw: 'Maximum/minimum standards · quotas · bans · compliance costs' },
      { letter: 'd', name: 'Direct Provision', kw: 'Government supplies public goods · NHS · defence · nationalisation' },
      { letter: 'e', name: 'Information Provision', kw: 'Reduces information failure · health campaigns · labelling · nudge theory' },
      { letter: 'f', name: 'Government Failure', kw: 'Information gaps · unintended consequences · regulatory capture · cost vs benefit' },
    ],
  },
];

export default function Unit1Page() {
  return (
    <div className="elp-page eup-page" style={{ '--eup-accent': '#14b8a6', '--eup-accent-bg': 'rgba(20,184,166,.08)', '--eup-accent-bd': 'rgba(20,184,166,.2)', '--eup-accent-glow': 'rgba(20,184,166,.15)' }}>
      <UnitScrollBar />
      <div className="elp-scroll-bar"><div className="elp-scroll-fill" id="eup-scroll-fill" style={{ background: 'var(--eup-accent)' }} /></div>

      {/* NAV */}
      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo"><div className="elp-nav-dot" /><span>Revvy Learn</span></Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb">
          <Link href="/economics">Economics</Link>
          <span style={{ color: 'var(--elp-tx-d)', margin: '0 6px' }}>/</span>
          <span style={{ color: 'var(--eup-accent)', fontWeight: 600 }}>Unit 1</span>
        </div>
        <div className="elp-nav-right">
          <Link href="/economics" className="elp-nav-link">All Units</Link>
          <Link href="/login" className="elp-nav-cta">Sign In</Link>
        </div>
      </nav>

      {/* TOPIC JUMP NAV */}
      <div className="eup-topic-nav">
        <span className="eup-tnav-label">Jump to:</span>
        {SECTIONS.map(s => (
          <a key={s.ref} className="eup-tnav-pill" href={`#t-${s.ref.replace(/\./g, '')}`}>{s.ref}</a>
        ))}
      </div>

      {/* HERO */}
      <section>
        <div className="elp-hero" style={{ paddingTop: 144 }}>
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Edexcel IAL Economics &middot; {UNIT.code}</div>
            <div className="eup-unit-badge-row">
              <span className="eup-unit-num">Unit {UNIT.number}</span>
              <span className="eup-unit-code">{UNIT.code}</span>
            </div>
            <h1 className="elp-hero-title">{UNIT.title} &mdash;<br /><em style={{ color: 'var(--eup-accent)' }}>microeconomics done right</em></h1>
            <p className="elp-hero-desc">Complete revision notes for Unit 1. Demand, supply, price determination, market failure and government intervention &mdash; structured around the Edexcel spec, with flashcards, quizzes and AI tutor for every topic.</p>
            <div className="elp-hero-actions">
              <Link href="/?section=introductory-concepts" className="elp-btn-primary">Start revising free &rarr;</Link>
              <a href="#topics" className="elp-btn-secondary">Browse all topics</a>
            </div>
            <div className="elp-hero-proof">
              <div className="elp-proof-item"><strong>6 topics</strong> fully covered</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item"><strong>Free</strong> notes for every spec point</div>
              <div className="elp-proof-dot" />
              <div className="elp-proof-item">{UNIT.code} exam ready</div>
            </div>
          </div>

          <div className="elp-hero-preview elp-fade-up" style={{ transitionDelay: '.15s' }}>
            <div className="elp-hero-badge elp-b1">
              <span className="elp-badge-icon">🎯</span>
              <div className="elp-badge-text"><span className="elp-badge-val">6 topics</span><span className="elp-badge-lbl">fully spec-aligned</span></div>
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
                  <div className="elp-pki-label" style={{ color: 'var(--eup-accent)' }}>🔑 Key idea</div>
                  <div className="elp-pki-text" style={{ color: '#99f6e4' }}>Markets fail when prices give the wrong signals &mdash; causing too much or too little to be produced relative to the social optimum.</div>
                </div>
                <div className="elp-preview-bullets">
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#14b8a6' }} /><div className="elp-pb-text"><strong>Negative externality</strong> &mdash; cost imposed on third parties; causes overproduction.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#4f7ef8' }} /><div className="elp-pb-text">Private cost &lt; social cost &rarr; price too low &rarr; output above MSC = MSB.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#f59e0b' }} /><div className="elp-pb-text"><strong>Deadweight welfare loss</strong> &mdash; market produces beyond social optimum.</div></div>
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

      {/* FEATURES STRIP */}
      <div className="elp-features-strip">
        <div className="elp-features-inner">
          <div className="elp-feat-item"><span className="elp-feat-icon">📋</span><div><div className="elp-feat-label">Spec-aligned notes</div><div className="elp-feat-sub">Every {UNIT.code} point covered</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon">🔄</span><div><div className="elp-feat-label">Spaced repetition</div><div className="elp-feat-sub">Adaptive flashcard algorithm</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon">⚡</span><div><div className="elp-feat-label">Practice questions</div><div className="elp-feat-sub">Exam-style, every topic</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon">🤖</span><div><div className="elp-feat-label">AI Tutor</div><div className="elp-feat-sub">Ask any Economics question</div></div></div>
          <div className="elp-feat-item"><span className="elp-feat-icon">📊</span><div><div className="elp-feat-label">Progress tracking</div><div className="elp-feat-sub">Mastery across all spec points</div></div></div>
        </div>
      </div>

      {/* TOPICS */}
      <div className="elp-section" id="topics">
        <div className="elp-fade-up" style={{ marginBottom: 40 }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />All six topics</div>
          <h2 className="elp-s-title">Everything in Unit 1, spec point by spec point</h2>
          <p className="elp-s-sub">Click any topic to open the full notes, diagrams, flashcards and practice questions in the app.</p>
        </div>

        {SECTIONS.map((section, idx) => (
          <div key={section.id}>
            <div className="eup-topic-block elp-fade-up" id={`t-${section.ref.replace(/\./g, '')}`}>
              <div className="eup-topic-label-row">
                <div className="eup-topic-ref-badge">{section.ref}</div>
                <Link href={`/?section=${section.id}`} className="eup-topic-heading">{section.title}</Link>
                <Link className="eup-topic-open-link" href={`/?section=${section.id}`}>Open in app &rarr;</Link>
              </div>
              <p className="eup-topic-desc">{section.desc}</p>
              <div className="eup-subtopic-grid">
                {section.subtopics.map(st => (
                  <Link key={st.letter} href={`/?section=${section.id}`} className="eup-subtopic-tile">
                    <div className="eup-st-num">{st.letter}</div>
                    <div className="eup-st-body">
                      <div className="eup-st-name">{st.name}</div>
                      <div className="eup-st-keywords">{st.kw}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {idx < SECTIONS.length - 1 && <div className="eup-topic-divider" />}
          </div>
        ))}
      </div>

      {/* UNIT OVERVIEW */}
      <div className="eup-unit-overview">
        <div className="eup-unit-overview-inner">
          <div className="elp-fade-up">
            <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />Unit overview</div>
            <h2 className="elp-s-title">What you need to know for {UNIT.code}</h2>
            <div className="eup-key-concepts">
              <div className="eup-concept"><div className="eup-concept-icon">⚖️</div><div><div className="eup-concept-title">The core trade-off</div><div className="eup-concept-desc">Every concept in Unit 1 links back to scarcity — resources are finite, wants are not. The price mechanism coordinates decisions without central direction.</div></div></div>
              <div className="eup-concept"><div className="eup-concept-icon">📉</div><div><div className="eup-concept-title">Diagrams are non-negotiable</div><div className="eup-concept-desc">Examiners expect supply-demand diagrams for price determination and market failure questions. Every shift must be labelled.</div></div></div>
              <div className="eup-concept"><div className="eup-concept-icon">🔗</div><div><div className="eup-concept-title">Chain of analysis</div><div className="eup-concept-desc">8-mark questions reward full chains: cause → mechanism → outcome. E.g. tax → supply left → P rises → Qd falls.</div></div></div>
              <div className="eup-concept"><div className="eup-concept-icon">⚡</div><div><div className="eup-concept-title">Elasticity runs through everything</div><div className="eup-concept-desc">PED and PES determine who bears a tax, how much DWL results, and whether a policy achieves its intended effect.</div></div></div>
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
              <div className="eup-ei-row">
                <span className="eup-ei-key">Question types</span>
                <span className="eup-ei-val eup-marks-pills-inline">
                  <span className="eup-mp eup-mp-4">4</span>
                  <span className="eup-mp eup-mp-8">8</span>
                  <span className="eup-mp eup-mp-20">20</span>
                </span>
              </div>
              <div className="eup-ei-row"><span className="eup-ei-key">Data response</span><span className="eup-ei-val">Yes &mdash; Section A</span></div>
              <div className="eup-ei-row eup-ei-row-last"><span className="eup-ei-key">Essay questions</span><span className="eup-ei-val">Section B &mdash; choose 1 of 2</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTINUE REVISING */}
      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />Keep going</div>
        <h2 className="elp-s-title" style={{ fontSize: 22, marginBottom: 8 }}>Continue revising</h2>
        <div className="eup-continue-grid">
          <Link className="eup-continue-card" href="/economics/unit-2">
            <div className="eup-cc-icon">📈</div>
            <div className="eup-cc-body"><div className="eup-cc-name">Unit 2: Macroeconomic Performance &amp; Policy</div><div className="eup-cc-sub">WEC12 · AD/AS, inflation, unemployment, fiscal &amp; monetary policy</div></div>
            <div className="eup-cc-arrow">→</div>
          </Link>
          <Link className="eup-continue-card" href="/economics/unit-3">
            <div className="eup-cc-icon">🏭</div>
            <div className="eup-cc-body"><div className="eup-cc-name">Unit 3: Business Behaviour</div><div className="eup-cc-sub">WEC13 · Theory of the firm, market structures, labour markets</div></div>
            <div className="eup-cc-arrow">→</div>
          </Link>
          <Link className="eup-continue-card" href="/written-practice">
            <div className="eup-cc-icon">✍️</div>
            <div className="eup-cc-body"><div className="eup-cc-name">Written Practice</div><div className="eup-cc-sub">AI-marked exam answers with instant feedback</div></div>
            <div className="eup-cc-arrow">→</div>
          </Link>
          <Link className="eup-continue-card" href="/past-papers">
            <div className="eup-cc-icon">📄</div>
            <div className="eup-cc-body"><div className="eup-cc-name">{UNIT.code} Past Papers</div><div className="eup-cc-sub">Practise with real exam questions and mark schemes</div></div>
            <div className="eup-cc-arrow">→</div>
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="elp-cta-section">
        <div className="elp-cta-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(20,184,166,.07) 0%, transparent 65%)' }} />
        <div className="elp-cta-inner elp-fade-up">
          <h2 className="elp-cta-title">Ready to revise Unit 1?</h2>
          <p className="elp-cta-sub">Free notes for every spec point. Adaptive flashcards, practice questions and AI tutor unlock with a 3-day free trial.</p>
          <div className="elp-cta-actions">
            <Link href="/?section=introductory-concepts" className="elp-btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>Open Revvy Learn — it&apos;s free →</Link>
            <Link href="/economics" className="elp-btn-secondary">← Back to all units</Link>
          </div>
          <p className="elp-cta-note">No signup required for notes · Cancel premium anytime · €0.99/month</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="elp-footer">
        <div className="elp-footer-inner">
          <div className="elp-footer-logo"><div className="elp-nav-dot" style={{ width: 7, height: 7 }} />Revvy Learn</div>
          <div className="elp-footer-sep" />
          <div className="elp-footer-links">
            <Link className="elp-footer-link" href="/economics">Economics</Link>
            <Link className="elp-footer-link" href="/economics/unit-1">Unit 1</Link>
            <Link className="elp-footer-link" href="/economics/unit-2">Unit 2</Link>
            <Link className="elp-footer-link" href="/economics/unit-3">Unit 3</Link>
            <Link className="elp-footer-link" href="/economics/unit-4">Unit 4</Link>
            <Link className="elp-footer-link" href="/glossary">Glossary</Link>
            <Link className="elp-footer-link" href="/past-papers">Past Papers</Link>
          </div>
          <div className="elp-footer-right">Edexcel IAL {UNIT.code} © Revvy Learn</div>
        </div>
      </footer>
    </div>
  );
}
