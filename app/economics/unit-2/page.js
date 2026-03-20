import Link from 'next/link';
import UnitScrollBar from '../UnitScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Macroeconomic Performance — Edexcel IAL Economics Unit 2 (WEC12) | Revvy Learn',
  description: 'Complete revision notes for Edexcel IAL Economics Unit 2 (WEC12). AD/AS, inflation, unemployment, economic growth, fiscal and monetary policy.',
  openGraph: { title: 'Macroeconomic Performance — Edexcel IAL Economics Unit 2 (WEC12) | Revvy Learn', url: 'https://revvylearn.com/economics/unit-2', type: 'article' },
};

const UNIT = { number: 2, code: 'WEC12', title: 'Macroeconomic Performance & Policy' };

const SECTIONS = [
  { id: 'measures-economic-performance', ref: '2.3.1', title: 'Measures of Economic Performance',
    desc: 'How we measure the health of the whole economy — GDP, inflation, unemployment and the balance of payments. The key indicators that drive policy decisions.',
    subtopics: [
      { letter: 'a', name: 'GDP & National Income', kw: 'Real vs nominal GDP · GDP per capita · three methods of measurement' },
      { letter: 'b', name: 'Inflation & the CPI', kw: 'Consumer price index · cost-push · demand-pull · consequences' },
      { letter: 'c', name: 'Unemployment', kw: 'Claimant count · ILO · types: frictional, structural, cyclical' },
      { letter: 'd', name: 'Balance of Payments', kw: 'Current account · trade balance · capital flows · deficit causes' },
    ] },
  { id: 'aggregate-demand', ref: '2.3.2', title: 'Aggregate Demand',
    desc: 'Total spending in the economy — consumption, investment, government spending and net exports. Understanding what shifts the AD curve is essential for macro analysis.',
    subtopics: [
      { letter: 'a', name: 'Components of AD', kw: 'C + I + G + (X–M) · consumption function · investment determinants' },
      { letter: 'b', name: 'The AD Curve', kw: 'Downward sloping · wealth effect · interest rate effect · trade effect' },
      { letter: 'c', name: 'Shifts in AD', kw: 'Consumer confidence · fiscal policy · exchange rates · global demand' },
      { letter: 'd', name: 'The Multiplier', kw: 'k = 1/(1–MPC) · multiplier effect · injections and withdrawals' },
    ] },
  { id: 'aggregate-supply', ref: '2.3.3', title: 'Aggregate Supply',
    desc: 'The productive capacity of the economy in the short run and long run — what determines how much the economy can produce and how supply-side changes affect output and prices.',
    subtopics: [
      { letter: 'a', name: 'Short-Run Aggregate Supply', kw: 'Upward sloping · wage stickiness · input costs · SRAS shifts' },
      { letter: 'b', name: 'Long-Run Aggregate Supply', kw: 'Vertical LRAS · full capacity · Keynesian vs classical views' },
      { letter: 'c', name: 'Shifts in LRAS', kw: 'Technology · labour force · education · infrastructure · productivity' },
      { letter: 'd', name: 'AD/AS Equilibrium', kw: 'Short-run vs long-run equilibrium · output gaps · self-correction' },
    ] },
  { id: 'national-income', ref: '2.3.4', title: 'National Income',
    desc: 'The circular flow of income model — how money flows between households and firms, the role of injections and leakages, and how equilibrium national income is determined.',
    subtopics: [
      { letter: 'a', name: 'Circular Flow Model', kw: 'Two-sector · three-sector · open economy · leakages and injections' },
      { letter: 'b', name: 'Equilibrium National Income', kw: 'Where AD = AS · full employment · deflationary & inflationary gaps' },
      { letter: 'c', name: 'Injections & Leakages', kw: 'Investment · government spending · exports vs savings · taxes · imports' },
    ] },
  { id: 'economic-growth', ref: '2.3.5', title: 'Economic Growth',
    desc: 'What drives long-run increases in output — actual vs potential growth, business cycles, living standards, and the debate about sustainable development.',
    subtopics: [
      { letter: 'a', name: 'Actual vs Potential Growth', kw: 'Output gap · AD-driven vs LRAS-driven · short-run vs long-run' },
      { letter: 'b', name: 'Business Cycle', kw: 'Boom · recession · recovery · trough · leading indicators' },
      { letter: 'c', name: 'Costs & Benefits of Growth', kw: 'Living standards · inequality · environment · sustainability' },
      { letter: 'd', name: 'Developing Economies', kw: 'Barriers to growth · HDI · aid vs trade debate · institutional quality' },
    ] },
  { id: 'macroeconomic-objectives-policies', ref: '2.3.6', title: 'Macroeconomic Objectives & Policies',
    desc: 'The policy toolkit — fiscal, monetary and supply-side policies, their strengths and limitations, and the inevitable trade-offs between competing objectives.',
    subtopics: [
      { letter: 'a', name: 'Fiscal Policy', kw: 'Government spending · taxation · budget deficit · automatic stabilisers' },
      { letter: 'b', name: 'Monetary Policy', kw: 'Interest rates · quantitative easing · inflation targeting · central bank' },
      { letter: 'c', name: 'Supply-Side Policies', kw: 'Education · deregulation · privatisation · labour market flexibility' },
      { letter: 'd', name: 'Policy Conflicts & Trade-offs', kw: 'Phillips curve · growth vs inflation · short-run vs long-run' },
    ] },
];

export default function Unit2Page() {
  return (
    <div className="elp-page eup-page" style={{ '--eup-accent': '#4f7ef8', '--eup-accent-bg': 'rgba(79,126,248,.08)', '--eup-accent-bd': 'rgba(79,126,248,.2)', '--eup-accent-glow': 'rgba(79,126,248,.15)' }}>
      <UnitScrollBar />
      <div className="elp-scroll-bar"><div className="elp-scroll-fill" id="eup-scroll-fill" style={{ background: 'var(--eup-accent)' }} /></div>

      <nav className="elp-nav">
        <Link href="/" className="elp-nav-logo"><div className="elp-nav-dot" /><span>Revvy Learn</span></Link>
        <div className="elp-nav-sep" />
        <div className="elp-nav-crumb"><Link href="/economics">Economics</Link><span style={{ color: 'var(--elp-tx-d)', margin: '0 6px' }}>/</span><span style={{ color: 'var(--eup-accent)', fontWeight: 600 }}>Unit 2</span></div>
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
            <h1 className="elp-hero-title">{UNIT.title} &mdash;<br /><em style={{ color: 'var(--eup-accent)' }}>the big picture of the economy</em></h1>
            <p className="elp-hero-desc">Complete revision notes for Unit 2. Aggregate demand and supply, inflation, unemployment, economic growth and the policy toolkit &mdash; everything you need for {UNIT.code}.</p>
            <div className="elp-hero-actions"><Link href={`/?section=${SECTIONS[0].id}`} className="elp-btn-primary">Start revising free &rarr;</Link><a href="#topics" className="elp-btn-secondary">Browse all topics</a></div>
            <div className="elp-hero-proof"><div className="elp-proof-item"><strong>6 topics</strong> fully covered</div><div className="elp-proof-dot" /><div className="elp-proof-item"><strong>Free</strong> notes for every spec point</div><div className="elp-proof-dot" /><div className="elp-proof-item">{UNIT.code} exam ready</div></div>
          </div>
          <div className="elp-hero-preview elp-fade-up" style={{ transitionDelay: '.15s' }}>
            <div className="elp-hero-badge elp-b1"><span className="elp-badge-icon">🎯</span><div className="elp-badge-text"><span className="elp-badge-val">6 topics</span><span className="elp-badge-lbl">fully spec-aligned</span></div></div>
            <div className="elp-preview-card">
              <div className="elp-preview-topbar"><div className="elp-preview-tab elp-active" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Notes</div><div className="elp-preview-tab">Flashcards</div><div className="elp-preview-tab">Quiz</div></div>
              <div className="elp-preview-body">
                <div className="elp-preview-section-title">2.3.2 &mdash; Aggregate Demand</div>
                <div className="elp-preview-key-idea" style={{ borderLeftColor: 'var(--eup-accent)' }}><div className="elp-pki-label" style={{ color: 'var(--eup-accent)' }}>🔑 Key idea</div><div className="elp-pki-text" style={{ color: '#bfdbfe' }}>AD = C + I + G + (X&ndash;M). Understanding what shifts each component is the key to macro analysis and policy evaluation.</div></div>
                <div className="elp-preview-bullets">
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#4f7ef8' }} /><div className="elp-pb-text"><strong>Consumption</strong> &mdash; largest component; driven by income, confidence, interest rates.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#f59e0b' }} /><div className="elp-pb-text"><strong>The multiplier</strong> &mdash; an initial injection creates a larger final change in GDP.</div></div>
                </div>
                <div className="elp-preview-flow"><div className="elp-pf-step">AD shifts right</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">Output rises</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">Employment up</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-result" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Inflation risk</div></div>
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
        <div className="elp-fade-up" style={{ marginBottom: 40 }}><div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />All six topics</div><h2 className="elp-s-title">Everything in Unit 2, spec point by spec point</h2><p className="elp-s-sub">Click any topic to open the full notes, diagrams, flashcards and practice questions in the app.</p></div>
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
            <div className="eup-concept"><div className="eup-concept-icon">📊</div><div><div className="eup-concept-title">AD/AS is your bread and butter</div><div className="eup-concept-desc">Almost every Unit 2 question can be answered with an AD/AS diagram. Master the shifts and you master the unit.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">🔄</div><div><div className="eup-concept-title">The multiplier effect</div><div className="eup-concept-desc">Any injection into the circular flow creates a larger final change in national income. k = 1/(1&ndash;MPC) is a must-know formula.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">⚖️</div><div><div className="eup-concept-title">Policy trade-offs are everything</div><div className="eup-concept-desc">Examiners reward you for recognising that pursuing one objective (e.g. low unemployment) may conflict with another (e.g. low inflation).</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">🕐</div><div><div className="eup-concept-title">Short run vs long run</div><div className="eup-concept-desc">Distinguish demand-side effects (short-run, shifts AD) from supply-side effects (long-run, shifts LRAS) in every answer.</div></div></div>
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
          <Link className="eup-continue-card" href="/economics/unit-1"><div className="eup-cc-icon">📐</div><div className="eup-cc-body"><div className="eup-cc-name">Unit 1: Markets in Action</div><div className="eup-cc-sub">WEC11 · Demand, supply, market failure, government intervention</div></div><div className="eup-cc-arrow">→</div></Link>
          <Link className="eup-continue-card" href="/economics/unit-3"><div className="eup-cc-icon">🏭</div><div className="eup-cc-body"><div className="eup-cc-name">Unit 3: Business Behaviour</div><div className="eup-cc-sub">WEC13 · Theory of the firm, market structures, labour markets</div></div><div className="eup-cc-arrow">→</div></Link>
          <Link className="eup-continue-card" href="/written-practice"><div className="eup-cc-icon">✍️</div><div className="eup-cc-body"><div className="eup-cc-name">Written Practice</div><div className="eup-cc-sub">AI-marked exam answers with instant feedback</div></div><div className="eup-cc-arrow">→</div></Link>
          <Link className="eup-continue-card" href="/past-papers"><div className="eup-cc-icon">📄</div><div className="eup-cc-body"><div className="eup-cc-name">{UNIT.code} Past Papers</div><div className="eup-cc-sub">Practise with real exam questions and mark schemes</div></div><div className="eup-cc-arrow">→</div></Link>
        </div>
      </div>

      <div className="elp-cta-section"><div className="elp-cta-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(79,126,248,.07) 0%, transparent 65%)' }} /><div className="elp-cta-inner elp-fade-up"><h2 className="elp-cta-title">Ready to revise Unit 2?</h2><p className="elp-cta-sub">Free notes for every spec point. Adaptive flashcards, practice questions and AI tutor unlock with a 3-day free trial.</p><div className="elp-cta-actions"><Link href={`/?section=${SECTIONS[0].id}`} className="elp-btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>Open Revvy Learn — it&apos;s free →</Link><Link href="/economics" className="elp-btn-secondary">← Back to all units</Link></div><p className="elp-cta-note">No signup required for notes · Cancel premium anytime · €0.99/month</p></div></div>

      <footer className="elp-footer"><div className="elp-footer-inner"><div className="elp-footer-logo"><div className="elp-nav-dot" style={{ width: 7, height: 7 }} />Revvy Learn</div><div className="elp-footer-sep" /><div className="elp-footer-links"><Link className="elp-footer-link" href="/economics">Economics</Link><Link className="elp-footer-link" href="/economics/unit-1">Unit 1</Link><Link className="elp-footer-link" href="/economics/unit-2">Unit 2</Link><Link className="elp-footer-link" href="/economics/unit-3">Unit 3</Link><Link className="elp-footer-link" href="/economics/unit-4">Unit 4</Link><Link className="elp-footer-link" href="/glossary">Glossary</Link><Link className="elp-footer-link" href="/past-papers">Past Papers</Link></div><div className="elp-footer-right">Edexcel IAL {UNIT.code} © Revvy Learn</div></div></footer>
    </div>
  );
}
