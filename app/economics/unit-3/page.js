import Link from 'next/link';
import PaperFacts from '@/components/PaperFacts';
import { BoltIcon, CardsIcon, ChartHistogram, Clipboard, Document, LearnMode, NetworkGraph, PenIcon, ProgressChart, Star, Tutor } from '@/components/Icons';
import SiteHeader from '@/components/SiteHeader';
import UnitScrollBar from '../UnitScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'WEC13 Business Behaviour — Edexcel IAL Economics Unit 3 Notes | Revvy Learn',
  description: 'Revision notes for all five Edexcel IAL Economics Unit 3 (WEC13) topics: business objectives, revenue and cost analysis, market structures, labour markets and government intervention.',
  openGraph: { title: 'WEC13 Business Behaviour — Edexcel IAL Economics Unit 3 Notes | Revvy Learn', url: 'https://revvylearn.com/economics/unit-3', type: 'article' },
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
    desc: 'How wages and employment are set \u2014 the demand for labour as a derived demand, the supply of labour to an occupation, equilibrium in competitive markets and in the public sector, and the immobility that makes labour markets fail.',
    subtopics: [
      { letter: 'a', name: 'The Demand for Labour', kw: 'Derived demand \u00b7 productivity \u00b7 wage vs price of capital \u00b7 elasticity' },
      { letter: 'b', name: 'The Supply of Labour', kw: 'Population \u00b7 net migration \u00b7 tax and benefits \u00b7 elasticity' },
      { letter: 'c', name: 'Wage Determination in a Competitive Market', kw: 'Equilibrium \u00b7 shifts in demand and supply' },
      { letter: 'd', name: 'Trade Unions and Public-Sector Pay', kw: 'Union influence on supply \u00b7 wage setting in the public sector' },
      { letter: 'e', name: 'Market Failure in the Labour Market', kw: 'Geographical and occupational immobility' },
    ] },
  { id: 'government-intervention-firms', ref: '3.3.5', title: 'Government Intervention',
    desc: 'Why governments intervene in product and labour markets — controlling monopolies and mergers, promoting competition, protecting suppliers and employees, and the limits of what intervention can achieve.',
    subtopics: [
      { letter: 'a', name: 'Controlling Monopolies and Mergers', kw: 'Price and profit regulation · quality standards · mergers' },
      { letter: 'b', name: 'Promoting Competition', kw: 'Deregulation · privatisation · competitive tendering' },
      { letter: 'c', name: 'Protecting Suppliers and Employees', kw: 'Local sourcing · employment legislation · nationalisation' },
      { letter: 'd', name: 'Impact and Limits', kw: 'Price, profit, quality and choice · regulatory capture · information gaps' },
      { letter: 'e', name: 'Wage Controls', kw: 'Minimum wage · maximum wage · monopsony' },
      { letter: 'f', name: 'Taxes, Mobility and Fair Treatment', kw: 'National insurance · immobility · discrimination and exploitation' },
    ] },
];

export default function Unit3Page() {
  return (
    <div className="elp-page eup-page" style={{ '--eup-accent': 'var(--ns-brand)', '--eup-accent-bg': 'var(--ns-brand-bg)', '--eup-accent-bd': 'var(--ns-brand-bd)', '--eup-accent-glow': 'var(--ns-brand-bd)' }}>
      <UnitScrollBar />
      <div className="elp-scroll-bar"><div className="elp-scroll-fill" id="eup-scroll-fill" style={{ background: 'var(--eup-accent)' }} /></div>

      <SiteHeader crumb="Economics/Unit 3" />

      <div className="eup-topic-nav">
        <span className="eup-tnav-label">Jump to:</span>
        {SECTIONS.map(s => (<a key={s.ref} className="eup-tnav-pill" href={`#t-${s.ref.replace(/\./g, '')}`}>{s.ref}</a>))}
      </div>

      <section>
        <div className="elp-hero">
          <div className="elp-fade-up">
            <div className="elp-hero-eyebrow" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Edexcel IAL Economics &middot; {UNIT.code}</div>
            <div className="eup-unit-badge-row"><span className="eup-unit-num">Unit {UNIT.number}</span><span className="eup-unit-code">{UNIT.code}</span></div>
            <h1 className="elp-hero-title">{UNIT.title} &mdash;<br /><em style={{ color: 'var(--eup-accent)' }}>{UNIT.code} notes</em></h1>
            <p className="elp-hero-desc">Revision notes for all five Unit 3 topics. Business objectives, revenue and cost analysis, market structures, labour markets and government intervention &mdash; the theory of the firm from first principles.</p>
            <div className="elp-hero-actions"><Link href={`/economics/unit-3/${SECTIONS[0].id}`} className="elp-btn-primary">Start revising free &rarr;</Link></div>
            <div className="elp-hero-proof"><div className="elp-proof-item"><strong>5 topics</strong> fully covered</div><div className="elp-proof-dot" /><div className="elp-proof-item"><strong>Free</strong> notes on every {UNIT.code} topic</div><div className="elp-proof-dot" /><div className="elp-proof-item">{UNIT.code} exam ready</div></div>
          </div>
          <div className="elp-hero-preview elp-fade-up" style={{ transitionDelay: '.15s' }}>
            <div className="elp-hero-badge elp-b1"><span className="elp-badge-icon"><Star size={18} /></span><div className="elp-badge-text"><span className="elp-badge-val">5 topics</span><span className="elp-badge-lbl">fully spec-aligned</span></div></div>
            <div className="elp-preview-card">
              <div className="elp-preview-topbar"><div className="elp-preview-tab elp-active" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Notes</div><div className="elp-preview-tab">Flashcards</div><div className="elp-preview-tab">Quiz</div></div>
              <div className="elp-preview-body">
                <div className="elp-preview-section-title">3.3.3 &mdash; Market Structures</div>
                <div className="elp-preview-key-idea" style={{ borderLeftColor: 'var(--eup-accent)' }}><div className="elp-pki-label" style={{ color: 'var(--eup-accent)' }}><LearnMode size={18} /> Key idea</div><div className="elp-pki-text" style={{ color: '#fbcfe8' }}>In perfect competition firms are price takers earning normal profit in the long run; a monopolist is a price maker earning supernormal profit &mdash; the trade-off is efficiency vs innovation.</div></div>
                <div className="elp-preview-bullets">
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: 'var(--ns-pink)' }} /><div className="elp-pb-text"><strong>Perfect competition</strong> &mdash; many firms, homogeneous product, no barriers to entry.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: 'var(--ns-amber)' }} /><div className="elp-pb-text"><strong>Monopoly</strong> &mdash; single seller, high barriers, potential for deadweight loss.</div></div>
                </div>
                <div className="elp-preview-flow"><div className="elp-pf-step">Entry barriers fall</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">New firms enter</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">Supernormal profit eroded</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-result" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Normal profit in LR</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PaperFacts code={UNIT.code} />

      <div className="elp-section" id="topics">
        <div className="elp-uh-tight elp-fade-up" style={{ marginBottom: 40 }}><div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />All five topics</div><h2 className="elp-s-title">All five Unit 3 topics, in spec order</h2><p className="elp-s-sub">Open any topic straight in the app.</p></div>
        {SECTIONS.map((section, idx) => (
          <div key={section.id}>
            <div className="eup-topic-block elp-fade-up" id={`t-${section.ref.replace(/\./g, '')}`}>
              <div className="eup-topic-label-row"><div className="eup-topic-ref-badge">{section.ref}</div><Link href={`/economics/unit-3/${section.id}`} className="eup-topic-heading">{section.title}</Link><Link className="eup-topic-open-link" href={`/economics/unit-3/${section.id}`}>Open in app &rarr;</Link></div>
              <p className="eup-topic-desc">{section.desc}</p>
              <div className="eup-subtopic-grid">{section.subtopics.map(st => (<Link key={st.letter} href={`/economics/unit-3/${section.id}`} className="eup-subtopic-tile"><div className="eup-st-num">{st.letter}</div><div className="eup-st-body"><div className="eup-st-name">{st.name}</div><div className="eup-st-keywords">{st.kw}</div></div></Link>))}</div>
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
            <div className="eup-concept"><div className="eup-concept-icon"><ChartHistogram size={18} /></div><div><div className="eup-concept-title">Diagrams drive marks</div><div className="eup-concept-desc">MC/AC/AR/MR for every market structure. Draw them accurately and label them clearly &mdash; diagrams are the backbone of Unit 3 answers.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon"><NetworkGraph size={18} /></div><div><div className="eup-concept-title">MC = MR is universal</div><div className="eup-concept-desc">The profit maximisation condition applies in every market structure. Understand why firms produce where MC = MR and you can tackle any question.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon"><ChartHistogram size={18} />️</div><div><div className="eup-concept-title">Static vs dynamic efficiency</div><div className="eup-concept-desc">The big trade-off in evaluation. Monopolies may be allocatively inefficient but can achieve dynamic efficiency through supernormal profits funding R&amp;D.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon"><Star size={18} /></div><div><div className="eup-concept-title">Contestability changes everything</div><div className="eup-concept-desc">Focus on barriers to entry and sunk costs, not firm count. A market with few firms can still behave competitively if the threat of entry is credible.</div></div></div>
          </div>
        </div>
        <div className="elp-fade-up" style={{ transitionDelay: '.1s' }}>
          <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--ns-amber)' }} />Exam paper info</div>
          <h2 className="elp-s-title">{UNIT.code} at a glance</h2>
          <div className="eup-exam-info">
            <div className="eup-ei-label">Assessment details</div>
            <div className="eup-ei-row"><span className="eup-ei-key">Exam paper</span><span className="eup-ei-val" style={{ color: 'var(--eup-accent)' }}>{UNIT.code}</span></div>
            <div className="eup-ei-row"><span className="eup-ei-key">Duration</span><span className="eup-ei-val">2 hours</span></div>
            <div className="eup-ei-row"><span className="eup-ei-key">Total marks</span><span className="eup-ei-val">80 marks</span></div>
            <div className="eup-ei-row"><span className="eup-ei-key">% of IAL</span><span className="eup-ei-val">25%</span></div>
            <div className="eup-ei-row"><span className="eup-ei-key">Question types</span><span className="eup-ei-val eup-marks-pills-inline"><span className="eup-mp eup-mp-4">2</span><span className="eup-mp eup-mp-4">4</span><span className="eup-mp eup-mp-8">6</span><span className="eup-mp eup-mp-8">8</span><span className="eup-mp eup-mp-20">14</span><span className="eup-mp eup-mp-20">20</span></span></div>
            <div className="eup-ei-row"><span className="eup-ei-key">Data response</span><span className="eup-ei-val">Yes &mdash; Section B</span></div>
            <div className="eup-ei-row eup-ei-row-last"><span className="eup-ei-key">Essay questions</span><span className="eup-ei-val">Section C &mdash; choose 2 of 3</span></div>
          </div>
        </div>
      </div></div>

      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />Keep going</div>
        <h2 className="elp-s-title" style={{ fontSize: 22, marginBottom: 8 }}>Continue revising</h2>
        <div className="eup-continue-grid">
          <Link className="eup-continue-card" href="/economics/unit-2"><div className="eup-cc-icon"><ChartHistogram size={18} /></div><div className="eup-cc-body"><div className="eup-cc-name">Unit 2: Macroeconomic Performance</div><div className="eup-cc-sub">WEC12 · AD/AS, inflation, unemployment, economic growth</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/economics/unit-4"><div className="eup-cc-icon"><NetworkGraph size={18} /></div><div className="eup-cc-body"><div className="eup-cc-name">Unit 4: Global Economy</div><div className="eup-cc-sub">WEC14 · Trade, exchange rates, development, globalisation</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/written-practice"><div className="eup-cc-icon"><PenIcon size={18} />️</div><div className="eup-cc-body"><div className="eup-cc-name">Written Practice</div><div className="eup-cc-sub">AI-marked exam answers with instant feedback</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
          <Link className="eup-continue-card" href="/past-papers"><div className="eup-cc-icon"><Document size={18} /></div><div className="eup-cc-body"><div className="eup-cc-name">{UNIT.code} Past Papers</div><div className="eup-cc-sub">Practise with real exam questions and mark schemes</div></div><div className="eup-cc-arrow">&rarr;</div></Link>
        </div>
      </div>

      <div className="elp-features-strip"><div className="elp-features-inner">
        <div className="elp-feat-item"><span className="elp-feat-icon"><Clipboard size={18} /></span><div><div className="elp-feat-label">Spec-aligned notes</div><div className="elp-feat-sub">All 5 {UNIT.code} topics, spec-numbered</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon"><CardsIcon size={18} /></span><div><div className="elp-feat-label">Spaced repetition</div><div className="elp-feat-sub">Flashcards on an SM-2 schedule</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon"><BoltIcon size={18} /></span><div><div className="elp-feat-label">Practice questions</div><div className="elp-feat-sub">Exam-style, every topic</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon"><Tutor size={18} /></span><div><div className="elp-feat-label">AI Tutor</div><div className="elp-feat-sub">Ask any Economics question</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon"><ProgressChart size={18} /></span><div><div className="elp-feat-label">Progress tracking</div><div className="elp-feat-sub">Mastery topic by topic</div></div></div>
      </div></div>

      <div className="elp-cta-section"><div className="elp-cta-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(236,72,153,.07) 0%, transparent 65%)' }} /><div className="elp-cta-inner elp-fade-up"><h2 className="elp-cta-title">Ready to revise Unit 3?</h2><p className="elp-cta-sub">Notes, diagrams and practice questions are free. Flashcards, quizzes and the AI tutor unlock with Pro — £1 for your first month as a new subscriber.</p><div className="elp-cta-actions"><Link href={`/economics/unit-3/${SECTIONS[0].id}`} className="elp-btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>Open Revvy Learn — it&apos;s free &rarr;</Link><Link href="/economics" className="elp-btn-secondary">&larr; Back to all units</Link></div><p className="elp-cta-note">No signup required for notes &middot; Cancel anytime &middot; &pound;1 first month for new subscribers, then &pound;1.99 &middot; charged in your local currency</p></div></div>

      <footer className="elp-footer"><div className="elp-footer-inner"><div className="elp-footer-logo"><img src="/logo.svg" alt="" className="elp-footer-mark" width={18} height={18} />Revvy Learn</div><div className="elp-footer-sep" /><div className="elp-footer-links"><Link className="elp-footer-link" href="/economics">Economics</Link><Link className="elp-footer-link" href="/economics/unit-1">Unit 1</Link><Link className="elp-footer-link" href="/economics/unit-2">Unit 2</Link><Link className="elp-footer-link" href="/economics/unit-3">Unit 3</Link><Link className="elp-footer-link" href="/economics/unit-4">Unit 4</Link><Link className="elp-footer-link" href="/glossary">Glossary</Link><Link className="elp-footer-link" href="/past-papers">Past Papers</Link></div><div className="elp-footer-right">Edexcel IAL {UNIT.code} &copy; Revvy Learn</div></div></footer>
    </div>
  );
}
