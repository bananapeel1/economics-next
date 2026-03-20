import Link from 'next/link';
import UnitScrollBar from '../UnitScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Marketing & People — Edexcel IAL Business Unit 1 (WBS11) | Revvy Learn',
  description: 'Complete revision notes for Edexcel IAL Business Unit 1 (WBS11). Meeting customer needs, the market, marketing mix, managing people, entrepreneurs and leaders.',
  openGraph: { title: 'Marketing & People — Edexcel IAL Business Unit 1 (WBS11) | Revvy Learn', url: 'https://revvylearn.com/business/unit-1', type: 'article' },
};

const UNIT = { number: 1, code: 'WBS11', title: 'Marketing and People' };

const SECTIONS = [
  { id: 'meeting-customer-needs', ref: '1.3.1', title: 'Meeting Customer Needs',
    desc: 'How businesses identify, anticipate and satisfy customer requirements — mass vs niche markets, market research, product positioning and competitive advantage.',
    subtopics: [
      { letter: 'a', name: 'Mass & Niche Markets', kw: 'Market size · market share · mass vs niche · dynamic markets' },
      { letter: 'b', name: 'Market Research', kw: 'Primary & secondary · qualitative & quantitative · sampling methods' },
      { letter: 'c', name: 'Market Positioning', kw: 'Market mapping · competitive advantage · product differentiation' },
      { letter: 'd', name: 'Demand & Supply', kw: 'Factors affecting demand · supply basics · price determination' },
    ] },
  { id: 'the-market', ref: '1.3.2', title: 'The Market',
    desc: 'Understanding market dynamics — demand, supply, price elasticity, income elasticity and how markets reach equilibrium. The quantitative tools every business student needs.',
    subtopics: [
      { letter: 'a', name: 'Demand', kw: 'Law of demand · shifts vs movements · determinants of demand' },
      { letter: 'b', name: 'Supply', kw: 'Law of supply · shifts vs movements · determinants of supply' },
      { letter: 'c', name: 'Price Elasticity of Demand', kw: 'PED formula · elastic vs inelastic · revenue implications' },
      { letter: 'd', name: 'Income Elasticity of Demand', kw: 'YED formula · normal vs inferior goods · business implications' },
      { letter: 'e', name: 'Market Equilibrium', kw: 'Equilibrium price · excess demand & supply · market changes' },
    ] },
  { id: 'marketing-mix-strategy', ref: '1.3.3', title: 'Marketing Mix & Strategy',
    desc: 'The 4Ps in action — product lifecycle, pricing strategies, distribution channels and promotion. How businesses combine these to create effective marketing strategies.',
    subtopics: [
      { letter: 'a', name: 'Product & Product Life Cycle', kw: 'PLC stages · extension strategies · Boston Matrix · product portfolio' },
      { letter: 'b', name: 'Pricing Strategies', kw: 'Skimming · penetration · competitive · cost-plus · psychological' },
      { letter: 'c', name: 'Distribution & Place', kw: 'Channels · direct vs indirect · e-commerce · multi-channel' },
      { letter: 'd', name: 'Promotion', kw: 'Above/below the line · digital marketing · promotional mix' },
      { letter: 'e', name: 'Marketing Strategy', kw: 'STP · segmentation · targeting · positioning · Ansoff\'s matrix' },
    ] },
  { id: 'managing-people', ref: '1.3.4', title: 'Managing People',
    desc: 'The people side of business — recruitment, training, motivation theories, leadership styles and organisational design. How businesses get the best from their workforce.',
    subtopics: [
      { letter: 'a', name: 'Recruitment & Training', kw: 'Internal vs external · induction · on/off-the-job training' },
      { letter: 'b', name: 'Motivation Theory', kw: 'Taylor · Maslow · Herzberg · Mayo · financial & non-financial' },
      { letter: 'c', name: 'Leadership Styles', kw: 'Autocratic · democratic · paternalistic · laissez-faire · situational' },
      { letter: 'd', name: 'Organisational Design', kw: 'Hierarchy · span of control · delayering · centralisation · matrix' },
    ] },
  { id: 'entrepreneurs-leaders', ref: '1.3.5', title: 'Entrepreneurs & Leaders',
    desc: 'The role of entrepreneurs in business — motives, characteristics, barriers to entry, business objectives and the distinction between leadership and management.',
    subtopics: [
      { letter: 'a', name: 'Role of the Entrepreneur', kw: 'Innovation · risk-taking · opportunity recognition · intrapreneurship' },
      { letter: 'b', name: 'Business Objectives', kw: 'Profit · survival · growth · social enterprise · stakeholder objectives' },
      { letter: 'c', name: 'Barriers to Entry & Exit', kw: 'Start-up costs · regulation · brand loyalty · sunk costs' },
      { letter: 'd', name: 'Leadership vs Management', kw: 'Vision vs control · strategic vs operational · Mintzberg roles' },
    ] },
];

export default function Unit1Page() {
  return (
    <div className="elp-page eup-page" style={{ '--eup-accent': '#10b981', '--eup-accent-bg': 'rgba(16,185,129,.08)', '--eup-accent-bd': 'rgba(16,185,129,.2)', '--eup-accent-glow': 'rgba(16,185,129,.15)' }}>
      <UnitScrollBar />
      <div className="elp-scroll-bar"><div className="elp-scroll-fill" id="eup-scroll-fill" style={{ background: 'var(--eup-accent)' }} /></div>

      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo"><div className="elp-nav-dot" /><span>Revvy Learn</span></Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb"><Link href="/business">Business</Link><span style={{ color: 'var(--elp-tx-d)', margin: '0 6px' }}>/</span><span style={{ color: 'var(--eup-accent)', fontWeight: 600 }}>Unit 1</span></div>
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
            <h1 className="elp-hero-title">{UNIT.title} &mdash;<br /><em style={{ color: 'var(--eup-accent)' }}>marketing fundamentals mastered</em></h1>
            <p className="elp-hero-desc">Complete revision notes for Unit 1. Meeting customer needs, the market, marketing mix, managing people and entrepreneurship &mdash; everything you need for {UNIT.code}.</p>
            <div className="elp-hero-actions"><Link href={`/?section=${SECTIONS[0].id}`} className="elp-btn-primary">Start revising free &rarr;</Link><a href="#topics" className="elp-btn-secondary">Browse all topics</a></div>
            <div className="elp-hero-proof"><div className="elp-proof-item"><strong>5 topics</strong> fully covered</div><div className="elp-proof-dot" /><div className="elp-proof-item"><strong>Free</strong> notes for every spec point</div><div className="elp-proof-dot" /><div className="elp-proof-item">{UNIT.code} exam ready</div></div>
          </div>
          <div className="elp-hero-preview elp-fade-up" style={{ transitionDelay: '.15s' }}>
            <div className="elp-hero-badge elp-b1"><span className="elp-badge-icon">🎯</span><div className="elp-badge-text"><span className="elp-badge-val">5 topics</span><span className="elp-badge-lbl">fully spec-aligned</span></div></div>
            <div className="elp-preview-card">
              <div className="elp-preview-topbar"><div className="elp-preview-tab elp-active" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Notes</div><div className="elp-preview-tab">Flashcards</div><div className="elp-preview-tab">Quiz</div></div>
              <div className="elp-preview-body">
                <div className="elp-preview-section-title">1.3.1 &mdash; Meeting Customer Needs</div>
                <div className="elp-preview-key-idea" style={{ borderLeftColor: 'var(--eup-accent)' }}><div className="elp-pki-label" style={{ color: 'var(--eup-accent)' }}>🔑 Key idea</div><div className="elp-pki-text" style={{ color: '#bfdbfe' }}>Understanding customer needs is the foundation of successful business activity &mdash; firms must identify, anticipate and satisfy requirements to survive in competitive markets.</div></div>
                <div className="elp-preview-bullets">
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#10b981' }} /><div className="elp-pb-text"><strong>Mass market</strong> &mdash; large, undifferentiated market; benefits from economies of scale.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#f59e0b' }} /><div className="elp-pb-text"><strong>Niche market</strong> &mdash; small, specialised segment; higher margins but limited scale.</div></div>
                </div>
                <div className="elp-preview-flow"><div className="elp-pf-step">Identify needs</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">Research market</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">Position product</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-result" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Competitive advantage</div></div>
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
        <div className="elp-fade-up" style={{ marginBottom: 40 }}><div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />All five topics</div><h2 className="elp-s-title">Everything in Unit 1, spec point by spec point</h2><p className="elp-s-sub">Click any topic to open the full notes, diagrams, flashcards and practice questions in the app.</p></div>
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
            <div className="eup-concept"><div className="eup-concept-icon">🎯</div><div><div className="eup-concept-title">Customer needs drive everything</div><div className="eup-concept-desc">Every business decision starts with understanding what customers want. Market research, segmentation and positioning are the tools to uncover and respond to those needs.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">📊</div><div><div className="eup-concept-title">Elasticity matters for pricing</div><div className="eup-concept-desc">Understanding PED and YED is essential for pricing decisions and forecasting revenue changes. Always link elasticity to real business strategy in your answers.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">🧩</div><div><div className="eup-concept-title">The 4Ps work together</div><div className="eup-concept-desc">Product, price, place and promotion must be consistent. Examiners reward answers that show how changes to one element of the marketing mix affect the others.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">👥</div><div><div className="eup-concept-title">People are a key resource</div><div className="eup-concept-desc">Motivation theory, leadership styles and organisational design all affect productivity. Link theory to practice: Herzberg explains why pay rises alone may not boost motivation.</div></div></div>
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
          <Link className="eup-continue-card" href="/business/unit-2"><div className="eup-cc-icon">💰</div><div className="eup-cc-body"><div className="eup-cc-name">Unit 2: Managing Business Activities</div><div className="eup-cc-sub">WBS12 · Finance, operations, resource management, external influences</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/business/unit-3"><div className="eup-cc-icon">🧭</div><div className="eup-cc-body"><div className="eup-cc-name">Unit 3: Business Decisions and Strategy</div><div className="eup-cc-sub">WBS13 · Objectives, growth, decision-making, competitiveness, change</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/written-practice"><div className="eup-cc-icon">✍️</div><div className="eup-cc-body"><div className="eup-cc-name">Written Practice</div><div className="eup-cc-sub">AI-marked exam answers with instant feedback</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/past-papers"><div className="eup-cc-icon">📄</div><div className="eup-cc-body"><div className="eup-cc-name">{UNIT.code} Past Papers</div><div className="eup-cc-sub">Practise with real exam questions and mark schemes</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
        </div>
      </div>

      <div className="elp-cta-section"><div className="elp-cta-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,.07) 0%, transparent 65%)' }} /><div className="elp-cta-inner elp-fade-up"><h2 className="elp-cta-title">Ready to revise Unit 1?</h2><p className="elp-cta-sub">Free notes for every spec point. Adaptive flashcards, practice questions and AI tutor unlock with a 3-day free trial.</p><div className="elp-cta-actions"><Link href={`/?section=${SECTIONS[0].id}`} className="elp-btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>Open Revvy Learn — it&apos;s free &rarr;</Link><Link href="/business" className="elp-btn-secondary">&larr; Back to all units</Link></div><p className="elp-cta-note">No signup required for notes &middot; Cancel premium anytime &middot; &euro;0.99/month</p></div></div>

      <footer className="elp-footer"><div className="elp-footer-inner"><div className="elp-footer-logo"><div className="elp-nav-dot" style={{ width: 7, height: 7 }} />Revvy Learn</div><div className="elp-footer-sep" /><div className="elp-footer-links"><Link className="elp-footer-link" href="/business">Business</Link><Link className="elp-footer-link" href="/business/unit-1">Unit 1</Link><Link className="elp-footer-link" href="/business/unit-2">Unit 2</Link><Link className="elp-footer-link" href="/business/unit-3">Unit 3</Link><Link className="elp-footer-link" href="/business/unit-4">Unit 4</Link><Link className="elp-footer-link" href="/glossary">Glossary</Link><Link className="elp-footer-link" href="/past-papers">Past Papers</Link></div><div className="elp-footer-right">Edexcel IAL {UNIT.code} &copy; Revvy Learn</div></div></footer>
    </div>
  );
}
