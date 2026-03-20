import Link from 'next/link';
import UnitScrollBar from '../UnitScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Managing Business Activities — Edexcel IAL Business Unit 2 (WBS12) | Revvy Learn',
  description: 'Complete revision notes for Edexcel IAL Business Unit 2 (WBS12). Raising finance, financial planning, managing finance, resource management and external influences.',
  openGraph: { title: 'Managing Business Activities — Edexcel IAL Business Unit 2 (WBS12) | Revvy Learn', url: 'https://revvylearn.com/business/unit-2', type: 'article' },
};

const UNIT = { number: 2, code: 'WBS12', title: 'Managing Business Activities' };

const SECTIONS = [
  { id: 'planning-raising-finance', ref: '2.3.1', title: 'Raising Finance',
    desc: 'How businesses fund their activities — internal and external sources, short-term and long-term finance, and how the choice of finance depends on the type and stage of business.',
    subtopics: [
      { letter: 'a', name: 'Sources of Finance', kw: 'Internal vs external · short-term vs long-term · retained profit' },
      { letter: 'b', name: 'Debt vs Equity', kw: 'Loans · shares · debentures · venture capital · crowdfunding' },
      { letter: 'c', name: 'Business Plans', kw: 'Purpose · content · cash flow forecast · persuading investors' },
      { letter: 'd', name: 'Choosing Finance', kw: 'Cost · risk · ownership dilution · suitability · availability' },
    ] },
  { id: 'financial-planning', ref: '2.3.2', title: 'Financial Planning',
    desc: 'Planning and controlling business finances — cash flow forecasting, budgets and break-even analysis. The quantitative tools that help businesses survive and grow.',
    subtopics: [
      { letter: 'a', name: 'Cash Flow Forecasting', kw: 'Inflows · outflows · net cash flow · opening & closing balance' },
      { letter: 'b', name: 'Budgets & Variance', kw: 'Revenue & expenditure budgets · favourable · adverse variance' },
      { letter: 'c', name: 'Break-Even Analysis', kw: 'Fixed & variable costs · contribution · break-even point · margin of safety' },
      { letter: 'd', name: 'Improving Cash Flow', kw: 'Credit control · destocking · sale & leaseback · factoring' },
    ] },
  { id: 'managing-finance', ref: '2.3.3', title: 'Managing Finance',
    desc: 'Measuring and improving financial performance — profit, profitability ratios, liquidity and the difference between profit and cash. Essential for any 20-mark answer on finance.',
    subtopics: [
      { letter: 'a', name: 'Profit & Loss', kw: 'Gross profit · operating profit · net profit · income statement' },
      { letter: 'b', name: 'Profitability Ratios', kw: 'Gross profit margin · operating profit margin · ROCE' },
      { letter: 'c', name: 'Liquidity', kw: 'Current ratio · acid test · working capital · overtrading' },
      { letter: 'd', name: 'Business Failure', kw: 'Cash flow problems · over-expansion · poor financial management' },
    ] },
  { id: 'resource-management', ref: '2.3.4', title: 'Resource Management',
    desc: 'How businesses manage production and operations — production methods, capacity utilisation, quality management and supply chain logistics.',
    subtopics: [
      { letter: 'a', name: 'Production Methods', kw: 'Job · batch · flow · cell · lean production · just-in-time' },
      { letter: 'b', name: 'Capacity Utilisation', kw: 'Formula · under-utilisation · excess capacity · rationalisation' },
      { letter: 'c', name: 'Quality Management', kw: 'Quality control · assurance · TQM · Kaizen · benchmarking' },
      { letter: 'd', name: 'Stock & Supply Chain', kw: 'Buffer stock · JIT · supply chain management · procurement' },
      { letter: 'e', name: 'Technology in Operations', kw: 'CAD/CAM · automation · robotics · impact on productivity' },
    ] },
  { id: 'external-influences', ref: '2.3.5', title: 'External Influences',
    desc: 'The external environment that shapes business decisions — economic factors, legislation, the competitive environment and how businesses respond to change.',
    subtopics: [
      { letter: 'a', name: 'Economic Influences', kw: 'Interest rates · exchange rates · inflation · unemployment · GDP' },
      { letter: 'b', name: 'Legislation', kw: 'Employment law · consumer protection · competition law · health & safety' },
      { letter: 'c', name: 'The Competitive Environment', kw: 'Market structure · barriers to entry · Porter\'s five forces' },
      { letter: 'd', name: 'PESTLE Analysis', kw: 'Political · economic · social · technological · legal · environmental' },
    ] },
];

export default function Unit2Page() {
  return (
    <div className="elp-page eup-page" style={{ '--eup-accent': '#f59e0b', '--eup-accent-bg': 'rgba(245,158,11,.08)', '--eup-accent-bd': 'rgba(245,158,11,.2)', '--eup-accent-glow': 'rgba(245,158,11,.15)' }}>
      <UnitScrollBar />
      <div className="elp-scroll-bar"><div className="elp-scroll-fill" id="eup-scroll-fill" style={{ background: 'var(--eup-accent)' }} /></div>

      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo"><div className="elp-nav-dot" /><span>Revvy Learn</span></Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb"><Link href="/business">Business</Link><span style={{ color: 'var(--elp-tx-d)', margin: '0 6px' }}>/</span><span style={{ color: 'var(--eup-accent)', fontWeight: 600 }}>Unit 2</span></div>
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
            <h1 className="elp-hero-title">{UNIT.title} &mdash;<br /><em style={{ color: 'var(--eup-accent)' }}>operations and finance decoded</em></h1>
            <p className="elp-hero-desc">Complete revision notes for Unit 2. Raising finance, financial planning, profitability, resource management and external influences &mdash; everything you need for {UNIT.code}.</p>
            <div className="elp-hero-actions"><Link href={`/?section=${SECTIONS[0].id}`} className="elp-btn-primary">Start revising free &rarr;</Link><a href="#topics" className="elp-btn-secondary">Browse all topics</a></div>
            <div className="elp-hero-proof"><div className="elp-proof-item"><strong>5 topics</strong> fully covered</div><div className="elp-proof-dot" /><div className="elp-proof-item"><strong>Free</strong> notes for every spec point</div><div className="elp-proof-dot" /><div className="elp-proof-item">{UNIT.code} exam ready</div></div>
          </div>
          <div className="elp-hero-preview elp-fade-up" style={{ transitionDelay: '.15s' }}>
            <div className="elp-hero-badge elp-b1"><span className="elp-badge-icon">🎯</span><div className="elp-badge-text"><span className="elp-badge-val">5 topics</span><span className="elp-badge-lbl">fully spec-aligned</span></div></div>
            <div className="elp-preview-card">
              <div className="elp-preview-topbar"><div className="elp-preview-tab elp-active" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Notes</div><div className="elp-preview-tab">Flashcards</div><div className="elp-preview-tab">Quiz</div></div>
              <div className="elp-preview-body">
                <div className="elp-preview-section-title">2.3.2 &mdash; Financial Planning</div>
                <div className="elp-preview-key-idea" style={{ borderLeftColor: 'var(--eup-accent)' }}><div className="elp-pki-label" style={{ color: 'var(--eup-accent)' }}>🔑 Key idea</div><div className="elp-pki-text" style={{ color: '#bfdbfe' }}>Cash flow is the lifeblood of a business &mdash; profitable firms can still fail if they run out of cash. Forecasting, budgeting and break-even analysis are essential planning tools.</div></div>
                <div className="elp-preview-bullets">
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#f59e0b' }} /><div className="elp-pb-text"><strong>Cash flow</strong> &mdash; the movement of money in and out of a business; timing matters as much as amount.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#10b981' }} /><div className="elp-pb-text"><strong>Break-even</strong> &mdash; the output level where total revenue equals total costs; contribution per unit is key.</div></div>
                </div>
                <div className="elp-preview-flow"><div className="elp-pf-step">Forecast cash flow</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">Set budgets</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">Monitor variance</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-result" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Financial control</div></div>
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
        <div className="elp-fade-up" style={{ marginBottom: 40 }}><div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />All five topics</div><h2 className="elp-s-title">Everything in Unit 2, spec point by spec point</h2><p className="elp-s-sub">Click any topic to open the full notes, diagrams, flashcards and practice questions in the app.</p></div>
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
            <div className="eup-concept"><div className="eup-concept-icon">💰</div><div><div className="eup-concept-title">Cash flow vs profit</div><div className="eup-concept-desc">A business can be profitable yet still run out of cash. Understanding the difference between profit and cash flow is essential for every finance question.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">📊</div><div><div className="eup-concept-title">Ratios tell the story</div><div className="eup-concept-desc">Profitability and liquidity ratios are the language of finance. Learn to calculate, interpret and evaluate them in context — not just in isolation.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">⚙️</div><div><div className="eup-concept-title">Operations drive efficiency</div><div className="eup-concept-desc">Lean production, capacity utilisation and quality management are how businesses reduce costs and improve competitiveness. Link to real examples in your answers.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">🌍</div><div><div className="eup-concept-title">External factors constrain choices</div><div className="eup-concept-desc">Interest rates, exchange rates, legislation and the competitive environment all shape business decisions. PESTLE analysis is your framework for evaluating these.</div></div></div>
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
          <Link className="eup-continue-card" href="/business/unit-1"><div className="eup-cc-icon">📈</div><div className="eup-cc-body"><div className="eup-cc-name">Unit 1: Marketing and People</div><div className="eup-cc-sub">WBS11 · Customer needs, the market, marketing mix, managing people</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/business/unit-3"><div className="eup-cc-icon">🧭</div><div className="eup-cc-body"><div className="eup-cc-name">Unit 3: Business Decisions and Strategy</div><div className="eup-cc-sub">WBS13 · Objectives, growth, decision-making, competitiveness, change</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/written-practice"><div className="eup-cc-icon">✍️</div><div className="eup-cc-body"><div className="eup-cc-name">Written Practice</div><div className="eup-cc-sub">AI-marked exam answers with instant feedback</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/past-papers"><div className="eup-cc-icon">📄</div><div className="eup-cc-body"><div className="eup-cc-name">{UNIT.code} Past Papers</div><div className="eup-cc-sub">Practise with real exam questions and mark schemes</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
        </div>
      </div>

      <div className="elp-cta-section"><div className="elp-cta-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(245,158,11,.07) 0%, transparent 65%)' }} /><div className="elp-cta-inner elp-fade-up"><h2 className="elp-cta-title">Ready to revise Unit 2?</h2><p className="elp-cta-sub">Free notes for every spec point. Adaptive flashcards, practice questions and AI tutor unlock with a 3-day free trial.</p><div className="elp-cta-actions"><Link href={`/?section=${SECTIONS[0].id}`} className="elp-btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>Open Revvy Learn — it&apos;s free &rarr;</Link><Link href="/business" className="elp-btn-secondary">&larr; Back to all units</Link></div><p className="elp-cta-note">No signup required for notes &middot; Cancel premium anytime &middot; &euro;0.99/month</p></div></div>

      <footer className="elp-footer"><div className="elp-footer-inner"><div className="elp-footer-logo"><div className="elp-nav-dot" style={{ width: 7, height: 7 }} />Revvy Learn</div><div className="elp-footer-sep" /><div className="elp-footer-links"><Link className="elp-footer-link" href="/business">Business</Link><Link className="elp-footer-link" href="/business/unit-1">Unit 1</Link><Link className="elp-footer-link" href="/business/unit-2">Unit 2</Link><Link className="elp-footer-link" href="/business/unit-3">Unit 3</Link><Link className="elp-footer-link" href="/business/unit-4">Unit 4</Link><Link className="elp-footer-link" href="/glossary">Glossary</Link><Link className="elp-footer-link" href="/past-papers">Past Papers</Link></div><div className="elp-footer-right">Edexcel IAL {UNIT.code} &copy; Revvy Learn</div></div></footer>
    </div>
  );
}
