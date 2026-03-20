import Link from 'next/link';
import UnitScrollBar from '../UnitScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Business Decisions and Strategy — Edexcel IAL Business Unit 3 (WBS13) | Revvy Learn',
  description: 'Complete revision notes for Edexcel IAL Business Unit 3 (WBS13). Business objectives, growth strategies, decision-making techniques, competitiveness and managing change.',
  openGraph: { title: 'Business Decisions and Strategy — Edexcel IAL Business Unit 3 (WBS13) | Revvy Learn', url: 'https://revvylearn.com/business/unit-3', type: 'article' },
};

const UNIT = { number: 3, code: 'WBS13', title: 'Business Decisions and Strategy' };

const SECTIONS = [
  { id: 'business-objectives-strategy', ref: '3.3.1', title: 'Business Objectives & Strategy',
    desc: 'How businesses set objectives and develop strategy — mission statements, corporate objectives, SWOT analysis and the relationship between strategy and tactics.',
    subtopics: [
      { letter: 'a', name: 'Mission & Objectives', kw: 'Mission statement · corporate objectives · SMART targets · hierarchy' },
      { letter: 'b', name: 'SWOT Analysis', kw: 'Strengths · weaknesses · opportunities · threats · strategic fit' },
      { letter: 'c', name: 'Strategy vs Tactics', kw: 'Long-term vs short-term · strategic direction · Ansoff\'s matrix' },
      { letter: 'd', name: 'Stakeholder Influences', kw: 'Shareholders · employees · customers · government · conflict' },
    ] },
  { id: 'business-growth', ref: '3.3.2', title: 'Business Growth',
    desc: 'How businesses grow and the strategic choices involved — organic vs external growth, mergers, takeovers, joint ventures and the reasons businesses choose different paths.',
    subtopics: [
      { letter: 'a', name: 'Organic Growth', kw: 'Internal expansion · new products · new markets · reinvestment' },
      { letter: 'b', name: 'External Growth', kw: 'Mergers · takeovers · horizontal · vertical · conglomerate' },
      { letter: 'c', name: 'Joint Ventures & Alliances', kw: 'Franchising · licensing · strategic alliances · risk sharing' },
      { letter: 'd', name: 'Reasons for Growth', kw: 'Economies of scale · market power · diversification · synergies' },
      { letter: 'e', name: 'Problems of Growth', kw: 'Diseconomies of scale · overtrading · culture clash · integration' },
    ] },
  { id: 'decision-making-techniques', ref: '3.3.3', title: 'Decision-Making Techniques',
    desc: 'Quantitative tools for business decisions — decision trees, critical path analysis, investment appraisal and the value and limitations of data-driven decision-making.',
    subtopics: [
      { letter: 'a', name: 'Decision Trees', kw: 'Expected value · probability · nodes · risk assessment · limitations' },
      { letter: 'b', name: 'Critical Path Analysis', kw: 'Network diagrams · EST · LFT · float time · critical activities' },
      { letter: 'c', name: 'Investment Appraisal', kw: 'Payback · ARR · NPV · discount factors · qualitative factors' },
      { letter: 'd', name: 'Data & Decision-Making', kw: 'Correlation · extrapolation · confidence intervals · big data' },
    ] },
  { id: 'influences-business-decisions', ref: '3.3.4', title: 'Influences on Business Decisions',
    desc: 'The internal and external forces that shape strategic decisions — corporate culture, ethics, stakeholder pressure, technology and the impact of the economic environment.',
    subtopics: [
      { letter: 'a', name: 'Corporate Culture', kw: 'Handy · strong vs weak culture · cultural change · Schein\'s model' },
      { letter: 'b', name: 'Business Ethics', kw: 'CSR · ethical dilemmas · trade-offs · pressure groups · reputation' },
      { letter: 'c', name: 'Technology & Innovation', kw: 'Disruptive innovation · digital transformation · R&D investment' },
      { letter: 'd', name: 'Economic Environment', kw: 'Business cycle · interest rates · government policy · globalisation' },
    ] },
  { id: 'assessing-competitiveness', ref: '3.3.5', title: 'Assessing Competitiveness',
    desc: 'How businesses measure and improve their competitive position — financial ratios, core competencies, Porter\'s generic strategies and benchmarking against rivals.',
    subtopics: [
      { letter: 'a', name: 'Financial Ratios', kw: 'Gearing · ROCE · labour productivity · unit costs · efficiency' },
      { letter: 'b', name: 'Core Competencies', kw: 'Unique resources · competitive advantage · value chain analysis' },
      { letter: 'c', name: 'Porter\'s Generic Strategies', kw: 'Cost leadership · differentiation · focus · stuck in the middle' },
      { letter: 'd', name: 'Benchmarking', kw: 'Internal · external · best practice · Kaizen · continuous improvement' },
    ] },
  { id: 'managing-change', ref: '3.3.6', title: 'Managing Change',
    desc: 'How businesses plan for and manage change — causes of change, barriers to change, scenario planning and the leadership skills needed to drive transformation.',
    subtopics: [
      { letter: 'a', name: 'Causes of Change', kw: 'Internal triggers · external drivers · disruptive technology · markets' },
      { letter: 'b', name: 'Barriers to Change', kw: 'Resistance · inertia · culture · communication · cost of change' },
      { letter: 'c', name: 'Scenario Planning', kw: 'What-if analysis · contingency planning · risk management · agility' },
      { letter: 'd', name: 'Leading Change', kw: 'Kotter\'s 8 steps · Lewin\'s model · vision · empowering employees' },
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
        <div className="elp-nav-crumb"><Link href="/business">Business</Link><span style={{ color: 'var(--elp-tx-d)', margin: '0 6px' }}>/</span><span style={{ color: 'var(--eup-accent)', fontWeight: 600 }}>Unit 3</span></div>
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
            <h1 className="elp-hero-title">{UNIT.title} &mdash;<br /><em style={{ color: 'var(--eup-accent)' }}>strategic thinking sharpened</em></h1>
            <p className="elp-hero-desc">Complete revision notes for Unit 3. Business objectives, growth strategies, decision-making techniques, competitiveness and managing change &mdash; everything you need for {UNIT.code}.</p>
            <div className="elp-hero-actions"><Link href={`/?section=${SECTIONS[0].id}`} className="elp-btn-primary">Start revising free &rarr;</Link><a href="#topics" className="elp-btn-secondary">Browse all topics</a></div>
            <div className="elp-hero-proof"><div className="elp-proof-item"><strong>6 topics</strong> fully covered</div><div className="elp-proof-dot" /><div className="elp-proof-item"><strong>Free</strong> notes for every spec point</div><div className="elp-proof-dot" /><div className="elp-proof-item">{UNIT.code} exam ready</div></div>
          </div>
          <div className="elp-hero-preview elp-fade-up" style={{ transitionDelay: '.15s' }}>
            <div className="elp-hero-badge elp-b1"><span className="elp-badge-icon">🎯</span><div className="elp-badge-text"><span className="elp-badge-val">6 topics</span><span className="elp-badge-lbl">fully spec-aligned</span></div></div>
            <div className="elp-preview-card">
              <div className="elp-preview-topbar"><div className="elp-preview-tab elp-active" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Notes</div><div className="elp-preview-tab">Flashcards</div><div className="elp-preview-tab">Quiz</div></div>
              <div className="elp-preview-body">
                <div className="elp-preview-section-title">3.3.3 &mdash; Decision-Making Techniques</div>
                <div className="elp-preview-key-idea" style={{ borderLeftColor: 'var(--eup-accent)' }}><div className="elp-pki-label" style={{ color: 'var(--eup-accent)' }}>🔑 Key idea</div><div className="elp-pki-text" style={{ color: '#bfdbfe' }}>Quantitative techniques like decision trees and investment appraisal reduce risk, but they rely on estimated data &mdash; qualitative judgement is always needed alongside the numbers.</div></div>
                <div className="elp-preview-bullets">
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#ec4899' }} /><div className="elp-pb-text"><strong>Decision trees</strong> &mdash; map out choices with probabilities and expected values to compare options.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: '#f59e0b' }} /><div className="elp-pb-text"><strong>Investment appraisal</strong> &mdash; payback, ARR and NPV each give a different perspective on a project.</div></div>
                </div>
                <div className="elp-preview-flow"><div className="elp-pf-step">Gather data</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">Apply technique</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">Evaluate result</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-result" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Informed decision</div></div>
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
        <div className="elp-fade-up" style={{ marginBottom: 40 }}><div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />All six topics</div><h2 className="elp-s-title">Everything in Unit 3, spec point by spec point</h2><p className="elp-s-sub">Click any topic to open the full notes, diagrams, flashcards and practice questions in the app.</p></div>
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
            <div className="eup-concept"><div className="eup-concept-icon">🎯</div><div><div className="eup-concept-title">Objectives shape every decision</div><div className="eup-concept-desc">Every strategy question requires you to link back to business objectives. Short-term vs long-term, stakeholder conflicts and the mission statement all matter.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">📐</div><div><div className="eup-concept-title">Quantitative tools have limits</div><div className="eup-concept-desc">Decision trees, CPA and investment appraisal give useful numbers, but examiners reward you for evaluating their limitations — estimated data, external changes, qualitative factors.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">🏆</div><div><div className="eup-concept-title">Competitiveness is relative</div><div className="eup-concept-desc">A business is only competitive compared to its rivals. Use Porter, ratios and benchmarking to analyse competitive position — and always consider the market context.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon">🔄</div><div><div className="eup-concept-title">Change is inevitable</div><div className="eup-concept-desc">Managing change requires understanding both the drivers (technology, markets, regulation) and the barriers (resistance, culture, cost). Kotter and Lewin are your go-to models.</div></div></div>
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
          <Link className="eup-continue-card" href="/business/unit-4"><div className="eup-cc-icon">🌍</div><div className="eup-cc-body"><div className="eup-cc-name">Unit 4: Global Business</div><div className="eup-cc-sub">WBS14 · Globalisation, global markets, international marketing, MNCs</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/written-practice"><div className="eup-cc-icon">✍️</div><div className="eup-cc-body"><div className="eup-cc-name">Written Practice</div><div className="eup-cc-sub">AI-marked exam answers with instant feedback</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/past-papers"><div className="eup-cc-icon">📄</div><div className="eup-cc-body"><div className="eup-cc-name">{UNIT.code} Past Papers</div><div className="eup-cc-sub">Practise with real exam questions and mark schemes</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
        </div>
      </div>

      <div className="elp-cta-section"><div className="elp-cta-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(236,72,153,.07) 0%, transparent 65%)' }} /><div className="elp-cta-inner elp-fade-up"><h2 className="elp-cta-title">Ready to revise Unit 3?</h2><p className="elp-cta-sub">Free notes for every spec point. Adaptive flashcards, practice questions and AI tutor unlock with a 3-day free trial.</p><div className="elp-cta-actions"><Link href={`/?section=${SECTIONS[0].id}`} className="elp-btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>Open Revvy Learn — it&apos;s free &rarr;</Link><Link href="/business" className="elp-btn-secondary">&larr; Back to all units</Link></div><p className="elp-cta-note">No signup required for notes &middot; Cancel premium anytime &middot; &euro;0.99/month</p></div></div>

      <footer className="elp-footer"><div className="elp-footer-inner"><div className="elp-footer-logo"><div className="elp-nav-dot" style={{ width: 7, height: 7 }} />Revvy Learn</div><div className="elp-footer-sep" /><div className="elp-footer-links"><Link className="elp-footer-link" href="/business">Business</Link><Link className="elp-footer-link" href="/business/unit-1">Unit 1</Link><Link className="elp-footer-link" href="/business/unit-2">Unit 2</Link><Link className="elp-footer-link" href="/business/unit-3">Unit 3</Link><Link className="elp-footer-link" href="/business/unit-4">Unit 4</Link><Link className="elp-footer-link" href="/glossary">Glossary</Link><Link className="elp-footer-link" href="/past-papers">Past Papers</Link></div><div className="elp-footer-right">Edexcel IAL {UNIT.code} &copy; Revvy Learn</div></div></footer>
    </div>
  );
}
