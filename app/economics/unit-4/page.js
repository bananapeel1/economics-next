import Link from 'next/link';
import { BoltIcon, CardsIcon, ChartHistogram, Clipboard, Document, DrawerAlt, LearnMode, NetworkGraph, PenIcon, ProgressChart, Star, Tutor } from '@/components/Icons';
import SiteHeader from '@/components/SiteHeader';
import UnitScrollBar from '../UnitScrollBar';
import '@/styles/landing.css';

export const metadata = {
  title: 'Developments in the Global Economy — Edexcel IAL Economics Unit 4 (WEC14) | Revvy Learn',
  description: 'Revision notes for Edexcel IAL Economics Unit 4 (WEC14): globalisation, international trade, exchange rates, poverty and inequality, the role of the state, and economic development.',
  openGraph: { title: 'Developments in the Global Economy — Edexcel IAL Economics Unit 4 (WEC14) | Revvy Learn', url: 'https://revvylearn.com/economics/unit-4', type: 'article' },
};

const UNIT = { number: 4, code: 'WEC14', title: 'Developments in the Global Economy' };

const SECTIONS = [
  { id: 'causes-effects-globalisation', ref: '4.3.1', title: 'Causes and Effects of Globalisation',
    desc: 'What drives globalisation and its impact on economies, businesses, and workers — trade liberalisation, technology, MNCs, and trade blocs.',
    subtopics: [
      { letter: 'a', name: 'What is Globalisation?', kw: 'integration · interdependence · drivers' },
      { letter: 'b', name: 'Benefits & Costs', kw: 'consumer gains · structural unemployment · inequality' },
      { letter: 'c', name: 'Multinational Corporations', kw: 'FDI · technology transfer · transfer pricing' },
      { letter: 'd', name: 'Trade Blocs', kw: 'FTA · customs union · single market · trade creation/diversion' },
    ] },
  { id: 'trade-global-economy', ref: '4.3.2', title: 'Trade and the Global Economy',
    desc: 'The case for free trade vs protectionism — comparative advantage, the WTO, tariffs, quotas and the arguments for and against trade barriers.',
    subtopics: [
      { letter: 'a', name: 'Comparative Advantage', kw: 'opportunity cost · specialisation · terms of trade' },
      { letter: 'b', name: 'The Case for Free Trade', kw: 'efficiency · lower prices · dynamic gains' },
      { letter: 'c', name: 'Protectionism', kw: 'tariffs · quotas · subsidies · infant industry · anti-dumping' },
      { letter: 'd', name: 'The WTO', kw: 'most-favoured nation · Doha Round · dispute settlement' },
    ] },
  { id: 'balance-payments-exchange-rates', ref: '4.3.3', title: 'BoP, Exchange Rates & Competitiveness',
    desc: 'International money flows — the balance of payments, exchange rate systems, currency determination, and the Marshall-Lerner and J-curve analysis.',
    subtopics: [
      { letter: 'a', name: 'Balance of Payments', kw: 'current account · financial account · deficit causes' },
      { letter: 'b', name: 'Exchange Rate Systems', kw: 'floating · fixed · managed float · trade-offs' },
      { letter: 'c', name: 'Exchange Rate Determination', kw: 'demand/supply · interest rates · speculation' },
      { letter: 'd', name: 'Marshall-Lerner & J-Curve', kw: 'PEDx + PEDm > 1 · short-run vs long-run' },
    ] },
  { id: 'poverty-inequality', ref: '4.3.4', title: 'Poverty and Inequality',
    desc: 'Measuring and addressing poverty and inequality — absolute vs relative poverty, the Lorenz curve, Gini coefficient, and the causes of widening income gaps.',
    subtopics: [
      { letter: 'a', name: 'Absolute vs Relative Poverty', kw: 'survival threshold · 60% median · growth effects' },
      { letter: 'b', name: 'Lorenz Curve & Gini', kw: 'measuring inequality · 0 to 1 · limitations' },
      { letter: 'c', name: 'Causes & Consequences', kw: 'wages · wealth · globalisation · social mobility' },
    ] },
  { id: 'role-state-macroeconomy', ref: '4.3.5', title: 'The Role of the State in the Macroeconomy',
    desc: 'Public expenditure, taxation, borrowing and debt, and the full policy toolkit — fiscal, monetary and supply-side approaches to managing the economy.',
    subtopics: [
      { letter: 'a', name: 'Public Expenditure', kw: 'capital vs current · crowding out · % of GDP' },
      { letter: 'b', name: 'Taxation', kw: 'direct vs indirect · progressive vs regressive · Laffer curve' },
      { letter: 'c', name: 'Borrowing & National Debt', kw: 'fiscal deficit · automatic stabilisers · debt servicing' },
      { letter: 'd', name: 'Macroeconomic Policies', kw: 'fiscal · monetary · supply-side · trade-offs' },
    ] },
  { id: 'growth-development', ref: '4.3.6', title: 'Growth and Development',
    desc: 'Economic growth vs development — HDI, barriers to development, market-led vs interventionist strategies, and the challenge of sustainability.',
    subtopics: [
      { letter: 'a', name: 'Growth vs Development', kw: 'GDP · HDI · why growth ≠ development' },
      { letter: 'b', name: 'Barriers to Development', kw: 'savings gap · weak institutions · primary commodity dependence' },
      { letter: 'c', name: 'Market-Led Strategies', kw: 'trade liberalisation · FDI · structural adjustment' },
      { letter: 'd', name: 'Interventionist Strategies', kw: 'ISI · state investment · aid · buffer stocks' },
      { letter: 'e', name: 'Sustainability', kw: 'natural capital · Environmental Kuznets Curve · green growth' },
    ] },
];

export default function Unit4Page() {
  return (
    <div className="elp-page eup-page" style={{ '--eup-accent': 'var(--ns-brand)', '--eup-accent-bg': 'var(--ns-brand-bg)', '--eup-accent-bd': 'var(--ns-brand-bd)', '--eup-accent-glow': 'var(--ns-brand-bd)' }}>
      <UnitScrollBar />
      <div className="elp-scroll-bar"><div className="elp-scroll-fill" id="eup-scroll-fill" style={{ background: 'var(--eup-accent)' }} /></div>

      <SiteHeader crumb="Economics/Unit 4" />

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
            <p className="elp-hero-desc">Revision notes for Unit 4: globalisation, international trade, exchange rates, poverty and inequality, the role of the state, and economic development &mdash; the global perspective.</p>
            <div className="elp-hero-actions"><Link href={`/economics/unit-4/${SECTIONS[0].id}`} className="elp-btn-primary">Start revising free &rarr;</Link></div>
            <div className="elp-hero-proof"><div className="elp-proof-item"><strong>6 topics</strong> fully covered</div><div className="elp-proof-dot" /><div className="elp-proof-item"><strong>Free</strong> notes across all four units</div><div className="elp-proof-dot" /><div className="elp-proof-item">{UNIT.code} exam ready</div></div>
          </div>
          <div className="elp-hero-preview elp-fade-up" style={{ transitionDelay: '.15s' }}>
            <div className="elp-hero-badge elp-b1"><span className="elp-badge-icon"><Star size={18} /></span><div className="elp-badge-text"><span className="elp-badge-val">6 topics</span><span className="elp-badge-lbl">fully spec-aligned</span></div></div>
            <div className="elp-preview-card">
              <div className="elp-preview-topbar"><div className="elp-preview-tab elp-active" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Notes</div><div className="elp-preview-tab">Flashcards</div><div className="elp-preview-tab">Quiz</div></div>
              <div className="elp-preview-body">
                <div className="elp-preview-section-title">4.3.2 &mdash; Trade and the Global Economy</div>
                <div className="elp-preview-key-idea" style={{ borderLeftColor: 'var(--eup-accent)' }}><div className="elp-pki-label" style={{ color: 'var(--eup-accent)' }}><LearnMode size={18} /> Key idea</div><div className="elp-pki-text" style={{ color: '#bfdbfe' }}>Comparative advantage shows that even if one country is more efficient at everything, both nations gain from specialisation and trade.</div></div>
                <div className="elp-preview-bullets">
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: 'var(--ns-brand)' }} /><div className="elp-pb-text"><strong>Specialisation</strong> &mdash; countries produce goods at the lowest opportunity cost.</div></div>
                  <div className="elp-pb"><div className="elp-pb-line" style={{ background: 'var(--ns-amber)' }} /><div className="elp-pb-text"><strong>Terms of trade</strong> &mdash; the rate at which one good is exchanged for another internationally.</div></div>
                </div>
                <div className="elp-preview-flow"><div className="elp-pf-step">Trade opens</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">Specialisation</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-step">Output rises</div><div className="elp-pf-arrow" style={{ color: 'var(--eup-accent)' }}>&rarr;</div><div className="elp-pf-result" style={{ background: 'var(--eup-accent-bg)', borderColor: 'var(--eup-accent-bd)', color: 'var(--eup-accent)' }}>Consumer gains</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="elp-section" id="topics">
        <div className="elp-uh-tight elp-fade-up" style={{ marginBottom: 40 }}><div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--eup-accent)' }} />All six topics</div><h2 className="elp-s-title">Everything in Unit 4, spec point by spec point</h2><p className="elp-s-sub">Open any topic straight in the app.</p></div>
        {SECTIONS.map((section, idx) => (
          <div key={section.id}>
            <div className="eup-topic-block elp-fade-up" id={`t-${section.ref.replace(/\./g, '')}`}>
              <div className="eup-topic-label-row"><div className="eup-topic-ref-badge">{section.ref}</div><Link href={`/economics/unit-4/${section.id}`} className="eup-topic-heading">{section.title}</Link><Link className="eup-topic-open-link" href={`/economics/unit-4/${section.id}`}>Open in app &rarr;</Link></div>
              <p className="eup-topic-desc">{section.desc}</p>
              <div className="eup-subtopic-grid">{section.subtopics.map(st => (<Link key={st.letter} href={`/economics/unit-4/${section.id}`} className="eup-subtopic-tile"><div className="eup-st-num">{st.letter}</div><div className="eup-st-body"><div className="eup-st-name">{st.name}</div><div className="eup-st-keywords">{st.kw}</div></div></Link>))}</div>
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
            <div className="eup-concept"><div className="eup-concept-icon"><NetworkGraph size={18} /></div><div><div className="eup-concept-title">Think globally</div><div className="eup-concept-desc">Every answer should reference real-world examples. Use countries, trade agreements and data to support your analysis.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon"><ProgressChart size={18} /></div><div><div className="eup-concept-title">Data is king</div><div className="eup-concept-desc">Use Gini coefficients, HDI rankings, trade data and BoP figures to support arguments and demonstrate applied knowledge.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon"><ChartHistogram size={18} />️</div><div><div className="eup-concept-title">Winners and losers</div><div className="eup-concept-desc">Globalisation and trade create both winners and losers. Examiners reward you for analysing who gains and who loses from any policy change.</div></div></div>
            <div className="eup-concept"><div className="eup-concept-icon"><NetworkGraph size={18} /></div><div><div className="eup-concept-title">Everything connects</div><div className="eup-concept-desc">Trade affects the BoP, which affects exchange rates, which affects competitiveness. Show the chain of reasoning in every answer.</div></div></div>
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
            <div className="eup-ei-row"><span className="eup-ei-key">Question types</span><span className="eup-ei-val eup-marks-pills-inline"><span className="eup-mp eup-mp-4">4</span><span className="eup-mp eup-mp-8">8</span><span className="eup-mp eup-mp-20">20</span></span></div>
            <div className="eup-ei-row"><span className="eup-ei-key">Data response</span><span className="eup-ei-val">Yes &mdash; Section B</span></div>
            <div className="eup-ei-row eup-ei-row-last"><span className="eup-ei-key">Essay questions</span><span className="eup-ei-val">Section C &mdash; choose 2 of 3</span></div>
          </div>
        </div>
      </div></div>

      <div className="elp-section-sm elp-fade-up">
        <div className="elp-s-eyebrow"><div className="elp-s-eyebrow-dot" style={{ background: 'var(--elp-green)' }} />Keep going</div>
        <h2 className="elp-s-title" style={{ fontSize: 22, marginBottom: 8 }}>Continue revising</h2>
        <div className="eup-continue-grid">
          <Link className="eup-continue-card" href="/economics/unit-1"><div className="eup-cc-icon"><ChartHistogram size={18} /></div><div className="eup-cc-body"><div className="eup-cc-name">Unit 1: Markets in Action</div><div className="eup-cc-sub">WEC11 · Demand, supply, market failure, government intervention</div></div><div className="eup-cc-arrow">→</div></Link>
          <Link className="eup-continue-card" href="/economics/unit-3"><div className="eup-cc-icon"><DrawerAlt size={18} /></div><div className="eup-cc-body"><div className="eup-cc-name">Unit 3: Business Behaviour</div><div className="eup-cc-sub">WEC13 · Theory of the firm, market structures, labour markets</div></div><div className="eup-cc-arrow">→</div></Link>
          <Link className="eup-continue-card" href="/written-practice"><div className="eup-cc-icon"><PenIcon size={18} />️</div><div className="eup-cc-body"><div className="eup-cc-name">Written Practice</div><div className="eup-cc-sub">AI-marked exam answers with instant feedback</div></div><div className="eup-cc-arrow">→</div></Link>
          <Link className="eup-continue-card" href="/past-papers"><div className="eup-cc-icon"><Document size={18} /></div><div className="eup-cc-body"><div className="eup-cc-name">Past Papers</div><div className="eup-cc-sub">Real exam papers and mark schemes · Unit 1 available now</div></div><div className="eup-cc-arrow">→</div></Link>
        </div>
      </div>

      <div className="elp-features-strip"><div className="elp-features-inner">
        <div className="elp-feat-item"><span className="elp-feat-icon"><Clipboard size={18} /></span><div><div className="elp-feat-label">Spec-aligned notes</div><div className="elp-feat-sub">Every {UNIT.code} point covered</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon"><CardsIcon size={18} /></span><div><div className="elp-feat-label">Spaced repetition</div><div className="elp-feat-sub">SM-2 flashcard scheduling</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon"><BoltIcon size={18} /></span><div><div className="elp-feat-label">Practice questions</div><div className="elp-feat-sub">Exam-style, every topic</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon"><Tutor size={18} /></span><div><div className="elp-feat-label">AI Tutor</div><div className="elp-feat-sub">Ask any Economics question</div></div></div>
        <div className="elp-feat-item"><span className="elp-feat-icon"><ProgressChart size={18} /></span><div><div className="elp-feat-label">Progress tracking</div><div className="elp-feat-sub">Mastery across the topics you study</div></div></div>
      </div></div>

      <div className="elp-cta-section"><div className="elp-cta-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(167,139,250,.07) 0%, transparent 65%)' }} /><div className="elp-cta-inner elp-fade-up"><h2 className="elp-cta-title">Ready to revise Unit 4?</h2><p className="elp-cta-sub">Notes, diagrams and practice questions are free. Flashcards, quizzes and the AI tutor unlock with Pro — £1 for your first month as a new subscriber.</p><div className="elp-cta-actions"><Link href={`/economics/unit-4/${SECTIONS[0].id}`} className="elp-btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>Open Revvy Learn — it&apos;s free →</Link><Link href="/economics" className="elp-btn-secondary">← Back to all units</Link></div><p className="elp-cta-note">No signup required for notes · Cancel anytime · £1 first month for new subscribers, then £1.99 · charged in your local currency</p></div></div>

      <footer className="elp-footer"><div className="elp-footer-inner"><div className="elp-footer-logo"><img src="/logo.svg" alt="" className="elp-footer-mark" width={18} height={18} />Revvy Learn</div><div className="elp-footer-sep" /><div className="elp-footer-links"><Link className="elp-footer-link" href="/economics">Economics</Link><Link className="elp-footer-link" href="/economics/unit-1">Unit 1</Link><Link className="elp-footer-link" href="/economics/unit-2">Unit 2</Link><Link className="elp-footer-link" href="/economics/unit-3">Unit 3</Link><Link className="elp-footer-link" href="/economics/unit-4">Unit 4</Link><Link className="elp-footer-link" href="/glossary">Glossary</Link><Link className="elp-footer-link" href="/past-papers">Past Papers</Link></div><div className="elp-footer-right">Edexcel IAL {UNIT.code} © Revvy Learn</div></div></footer>
    </div>
  );
}
