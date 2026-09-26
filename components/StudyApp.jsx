"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useAuth } from './AuthProvider';
import Sidebar from './Sidebar';
import { shuffleAllOptions } from '@/lib/shuffle-options';
import { introOffer } from '@/lib/trial-eligibility';
import { useClientValue } from '@/lib/use-client-storage';
import ContentTab from './ContentTab';
import NotesTab from './NotesTab';
import DiagramsTab from './DiagramsTab';
import { diagramSpecsForSection } from '@/lib/diagram-pool';
import { subjectFrom } from '@/lib/ial-commands';
import FlashcardsTab from './FlashcardsTab';
import QuizTab from './QuizTab';
import TutorTab from './TutorTab';
import MistakesTab from './MistakesTab';
import AuthButton from './AuthButton';
import GlossaryTooltip from './GlossaryTooltip';
import PracticeQuestionsTab from './PracticeQuestionsTab';
import ExtrasTab from './ExtrasTab';
import PaywallOverlay from './PaywallOverlay';
import AnimatedTabBar from './AnimatedTabBar';
import LearnModeTab from './LearnModeTab';
import HomeScreen from './HomeScreen';
import { SpacedReview, MixedReview, countDueReviews, getDueReviews } from './ReviewMode';
import { BookAlt, Notes as NotesIcon, ChartHistogram, DrawerAlt, CardsBlank, Quiz as QuizIcon, Mistakes as MistakesIcon, Tutor as TutorIcon, Star, Padlock, LearnMode as LearnModeIcon } from './Icons';
import { trackFunnel } from '@/lib/funnel';
import { openFeedback } from '@/lib/feedback/client';
import { countSteps, clampStep, furthestStep, contentVersion, encodePointer, parsePointer } from '@/lib/learn-steps';

const HomeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;

const FREE_TABS = new Set(['learn-mode', 'content', 'notes', 'diagrams', 'practice']); // content kept for sidebar access
const PREVIEW_TABS = new Set(['flashcards', 'quiz', 'extras']); // Show preview then full paywall card (signed-in only)
const PREMIUM_TABS = new Set(['mistakes', 'tutor']); // Full paywall block (no preview)

const allTabs = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'learn-mode', label: 'Learn', Icon: LearnModeIcon },
  { id: 'notes', label: 'Notes', Icon: NotesIcon },
  /* Diagrams was Economics-only because all 23 sections holding diagram rows were Economics and no
     Business section had one at all, so opening the tab for Business would have shown an empty tab
     rather than a missing one: "the fix is the content, not the gate" (F114). Packet 41 wrote the
     content, so `subjects` is now a FLOOR rather than the whole gate — see the filter below, which
     also opens the tab for any section whose own payload carries a diagram. */
  { id: 'diagrams', label: 'Diagrams', Icon: ChartHistogram, subjects: ['economics'] },
  { id: 'practice', label: 'Practice', Icon: DrawerAlt },
  { id: 'flashcards', label: 'Flashcards', Icon: CardsBlank, premium: true },
  { id: 'quiz', label: 'Quiz', Icon: QuizIcon, premium: true },
  /* F114, the half that is a code fix. This was `subjects: ['business']`, but all 43 sections
     carry common_mistakes data — so 23 Economics sections held content written for them that no
     student could ever open, while the upgrade page sold "Mistakes review" to both subjects.
     Verified against the database before removing the gate: 43 of 43 rows are populated. */
  { id: 'mistakes', label: 'Mistakes', Icon: MistakesIcon, premium: true },
  { id: 'tutor', label: 'Tutor', Icon: TutorIcon, premium: true },
  { id: 'extras', label: 'Extras', Icon: Star, premium: true },
];

/* ── Section Overview (Dashboard Launchpad) ── */
/* F098: this screen was shown both while the fetch was in flight and when a section genuinely had
   nothing, with the same words either way. "Content for this section is being prepared" told a
   student on a slow school connection that the topic does not exist yet, when it was about to
   arrive. Loading says it is loading, and the "being prepared" wording is reserved for a response
   that really came back empty. V007 gave it a second caller — a paid tab whose data is still in
   flight — so it is a component rather than a block inside one branch of renderTab. */
/*
 * V038 fix round 4 — a payload says which section it describes.
 *
 * `rawSectionData` is deliberately NOT cleared on a section change (F098: keep the previous section
 * on screen while the new one arrives, rather than blanking to a loading card). That is a good
 * trade for prose — a paragraph of the topic you just left is a worse read than the one you asked
 * for, not a wrong ANSWER. It is not a good trade for Learn Mode, which does not merely display the
 * payload: it judges the student's saved place against it, and, until round 4, wrote the verdict to
 * storage. Section B's pointer judged by section A's deck is how every rejected round got in
 * (verify-a.md rounds 1-3).
 *
 * So the section id travels WITH the payload, from the moment the payload enters the app, and the
 * one consumer that judges rather than displays compares it before it is allowed to judge. A
 * payload tagged by a future path that forgets reads as "not this section", which parks Learn Mode
 * for one fetch — the safe direction, and a bounded one: `publicSectionPayload` always sets
 * `paidPending`, so the API fetch runs on every first paint and always carries both fields.
 */
function payloadForSection(data, sectionId) {
  return data ? { ...data, sectionId } : data;
}

function SectionLoading() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>&#128218;</div>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>Loading this section</div>
      <div style={{ fontSize: 14 }}>One moment.</div>
    </div>
  );
}

function SectionOverview({ section, unit, sectionData, tabs, onTabSelect, isPremium, user, savedProgress }) {
  // F031: the price on this bar must be the price checkout will charge.
  const { trialEligible } = useAuth();
  const offer = introOffer(trialEligible);
  /*
   * V009. `isPremium` arrives three-valued from StudyApp: true, false, or null for "not known yet".
   * Every padlock, the "£1 FIRST MONTH" label and the upgrade bar below are statements about what
   * this student has paid for, and on a prerendered page the answer is genuinely absent for the
   * first moment of the visit. `locked` is therefore `=== false`, never `!isPremium`: an unknown
   * entitlement draws the cards plain — no lock, no price, no CTA — and the true state replaces it
   * a moment later. Showing a paying student a padlock and an upsell is F035 with smaller pixels.
   */
  const locked = isPremium === false;
  // F030: the same function the engine uses, so the launchpad and "Step 1 of N" agree.
  const contentSteps = countSteps(sectionData?.content);
  const notesSections = sectionData?.notes?.length || 0;
  const diagramCount = sectionData?.diagrams?.length || 0;
  const practiceCount = sectionData?.practice?.length || 0;
  /* The two paid counts. `counts` carries the true size of each bank, which is the number this card
     has always meant to show; `length` is whatever the student was entitled to be sent, so a free
     student's Quiz card read "3 questions" the moment the API started capping (F086) and "25" on
     the server-rendered first section, for the same section. Undefined means the paid half has not
     arrived yet (V007), and an em dash says that without asserting a number. */
  const flashcardCount = sectionData?.counts?.flashcards ?? (sectionData?.paidPending ? null : (sectionData?.flashcards?.length || 0));
  const quizCount = sectionData?.counts?.quiz ?? (sectionData?.paidPending ? null : (sectionData?.quiz?.length || 0));
  const hasDiagrams = tabs.some(t => t.id === 'diagrams');

  const progress = user && savedProgress ? savedProgress[section?.id] : null;
  /* F026's other half. Both numbers here used to come from the saved row, and the row is a
     high-water mark written against whatever step count was live when the student last moved: on
     15 Sep 2026, 120 rows across 43 students held a furthest_step past their own total_steps, and
     this bar drew them at up to 233% full. Measure against the steps that exist NOW — the same
     count the engine uses, already computed above — and clamp the pointer into that range. The
     row's own total is the fallback for the moment before the content has loaded. */
  const progressSteps = contentSteps || progress?.total_steps || 0;
  /* V038. The row is only about THIS deck when it was written against a deck of this length —
     the same version proxy the engine resolves the pointer with. A 14-step row read against a
     rebuilt 29-step deck drew a confident "48%" that was not a measurement of anything the
     student had done (audit/runs/packet-37/verify-b.md, section 3). Say it has been rebuilt
     instead of drawing a number, and let Learn Mode ask them what to do about it. */
  const progressOtherVersion = !!progress && contentSteps > 0
    && Number.isFinite(progress.total_steps) && progress.total_steps !== contentSteps;
  const progressPct = progress && progressSteps && !progressOtherVersion
    ? Math.round(((clampStep(progress.furthest_step, progressSteps) + 1) / progressSteps) * 100)
    : 0;
  const hasProgress = !!progress && !progressOtherVersion;

  return (
    <div className="section-overview">
      <div className="overview-header">
        <div className="overview-unit-badge">Unit {unit?.number}: {unit?.title}</div>
        <h2 className="overview-title">{section?.title}</h2>
      </div>

      {/* ── Learn Mode Hero Card ── */}
      <button className="overview-hero" onClick={() => onTabSelect('learn-mode')}>
        <div className="overview-hero-left">
          <div className="overview-hero-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div className="overview-hero-info">
            <div className="overview-hero-label">RECOMMENDED &middot; START HERE</div>
            <div className="overview-hero-name">Learn Mode</div>
            <div className="overview-hero-meta">
              {locked && <span className="overview-hero-free">&#10003; Free</span>}
              {contentSteps} steps
            </div>
            {hasProgress && (
              <div className="overview-hero-progress">
                <div className="overview-hero-progress-bar">
                  <div className="overview-hero-progress-fill" style={{ width: `${progressPct}%` }} />
                </div>
                <span className="overview-hero-progress-text">{progressPct}%</span>
              </div>
            )}
            {/* The founder, 25 Sep: a student is never told a topic "has been rebuilt". Learn Mode now
                starts a rebuilt topic from the beginning without comment (LearnModeTab, V038), so
                this overview line has nothing left to announce. */}
          </div>
        </div>
        <span className="overview-hero-btn">
          {hasProgress ? 'Continue learning \u2192' : 'Start learning \u2192'}
        </span>
      </button>

      {/* ── Free Resources ── */}
      <div className="overview-category">
        <div className="overview-category-header">
          <span className="overview-category-line" />
          <span className="overview-category-label">FREE RESOURCES</span>
          <span className="overview-category-line" />
        </div>
        <div className="overview-grid overview-grid-4">
          <button className="overview-card overview-card-featured" onClick={() => onTabSelect('learn-mode')}>
            <span className="overview-card-icon"><LearnModeIcon size={24} /></span>
            <span className="overview-card-label">Learn</span>
            <span className="overview-card-count">{contentSteps} steps</span>
          </button>
          {/* F032: this opened a 'content' tab that has no entry in the tab bar, so nothing was
              selected and there was no obvious way back. The notes are the readable whole. */}
          <button className="overview-card" onClick={() => onTabSelect('notes')}>
            <span className="overview-card-icon"><NotesIcon size={24} /></span>
            <span className="overview-card-label">Notes</span>
            <span className="overview-card-count">{notesSections} topics</span>
          </button>
          {hasDiagrams && (
            <button className={`overview-card ${diagramCount === 0 ? 'dimmed' : ''}`} onClick={() => onTabSelect('diagrams')}>
              <span className="overview-card-icon"><ChartHistogram size={24} /></span>
              <span className="overview-card-label">Diagrams</span>
              <span className="overview-card-count">{diagramCount > 0 ? 'All annotated' : 'Coming soon'}</span>
            </button>
          )}
          <button className={`overview-card ${practiceCount === 0 ? 'dimmed' : ''}`} onClick={() => onTabSelect('practice')}>
            <span className="overview-card-icon"><DrawerAlt size={24} /></span>
            <span className="overview-card-label">Practice</span>
            <span className="overview-card-count">{practiceCount} questions</span>
          </button>
        </div>
      </div>

      {/* ── Exam Resources ── */}
      <div className="overview-category">
        <div className="overview-category-header">
          <span className="overview-category-line" />
          <span className="overview-category-label">EXAM RESOURCES</span>
          <span className="overview-category-line" />
        </div>
        <div className="overview-grid overview-grid-2">
          <button className="overview-card overview-card-exam" onClick={() => { window.location.href = '/model-answers'; }}>
            <span className="overview-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </span>
            <span className="overview-card-label">Model Answers</span>
            <span className="overview-card-count">Examiner-level worked answers</span>
          </button>
          <button className="overview-card overview-card-exam" onClick={() => { window.location.href = '/topic-links'; }}>
            <span className="overview-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </span>
            <span className="overview-card-label">Topic Links</span>
            <span className="overview-card-count">How topics connect across units</span>
          </button>
        </div>
      </div>

      {/* ── Premium ── */}
      <div className="overview-category">
        <div className="overview-category-header">
          <span className="overview-category-line" />
          <span className="overview-category-label">{locked ? 'PREMIUM \u2014 \u00A31 FIRST MONTH' : 'PREMIUM'}</span>
          <span className="overview-category-line" />
        </div>
        <div className="overview-grid overview-grid-4">
          <button className={`overview-card ${locked ? 'overview-card-premium' : ''}`} onClick={() => onTabSelect('flashcards')}>
            {locked && <span className="overview-card-lock"><Padlock size={12} /></span>}
            <span className="overview-card-icon"><CardsBlank size={24} /></span>
            <span className="overview-card-label">Flashcards</span>
            <span className="overview-card-count">{flashcardCount == null ? '\u2014' : `${flashcardCount} cards`}</span>
          </button>
          <button className={`overview-card ${locked ? 'overview-card-premium' : ''}`} onClick={() => onTabSelect('quiz')}>
            {locked && <span className="overview-card-lock"><Padlock size={12} /></span>}
            <span className="overview-card-icon"><QuizIcon size={24} /></span>
            <span className="overview-card-label">Quiz</span>
            <span className="overview-card-count">{quizCount == null ? '\u2014' : `${quizCount} questions`}</span>
          </button>
          <button className={`overview-card ${locked ? 'overview-card-premium' : ''}`} onClick={() => onTabSelect('tutor')}>
            {locked && <span className="overview-card-lock"><Padlock size={12} /></span>}
            <span className="overview-card-icon"><TutorIcon size={24} /></span>
            <span className="overview-card-label">AI Tutor</span>
            <span className="overview-card-count">Ask anything</span>
          </button>
          <button className={`overview-card ${locked ? 'overview-card-premium' : ''}`} onClick={() => { window.location.href = '/fun'; }}>
            {locked && <span className="overview-card-lock"><Padlock size={12} /></span>}
            <span className="overview-card-icon" style={{ fontSize: 24 }}>&#127183;</span>
            <span className="overview-card-label">Blackjack</span>
            <span className="overview-card-count">Learn while you play</span>
          </button>
        </div>
      </div>

      {/* ── Premium CTA Bar ── */}
      {locked && (
        <div className="overview-cta-bar">
          <span className="overview-cta-icon">&#9889;</span>
          <span className="overview-cta-text">
            {/* F031: the overview bar hardcoded the intro price for everyone, including the 43
                accounts that cannot have it. */}
            Unlock Flashcards, Quiz &amp; AI Tutor &mdash; <strong>{offer.price} {offer.unit}</strong>
            {trialEligible ? ', then \u00a31.99/month' : ' \u00b7 cancel anytime'}
          </span>
          <span className="overview-cta-cancel">Cancel anytime &middot; local currency</span>
          <button className="overview-cta-btn" onClick={(e) => { e.stopPropagation(); window.location.href = '/upgrade'; }}>
            Get Pro &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

export default function StudyApp({ subjects, sections, units, initialSectionData, initialSectionId, requestedSectionId = null }) {
  const { user, isPremium, entitlementKnown } = useAuth();
  /*
   * V009. `true` / `false` / `null`, where null is "not known yet". Everything that draws a padlock,
   * a plan label or an upgrade CTA takes THIS, not `isPremium` — on a prerendered page `isPremium`
   * is false before the answer arrives, and a padlock drawn on that is a false statement to a
   * student who has paid. Anything that merely withholds a convenience (the "ask the tutor" link)
   * can keep using `isPremium`: the cost of being wrong there is a missing shortcut, not a lie.
   */
  const entitlement = entitlementKnown ? isPremium : null;

  // Subject state — follow whichever section we were explicitly asked to open.
  // requestedSectionId is resolved on the server, so this produces the same
  // answer during SSR and hydration. Reading window.location alone did not:
  // it is undefined on the server, so the subject seeded to subjects[0] and
  // hydration never corrected it, sending Business links into Economics.
  //
  // F118. The `window.location.search` fallback that used to sit here is gone. It is null during
  // SSR and a real value on the client, so the first client render disagreed with the server's
  // markup and React threw the whole server tree away and re-rendered — the hydration failure
  // three earlier sessions hunted through the script tags. `requestedSectionId` is resolved on
  // the server by both mount sites, so it gives the same answer in both passes.
  const urlSectionParam = requestedSectionId;
  const subjectForUrlSection = urlSectionParam
    ? (() => {
        const sec = sections.find(s => s.id === urlSectionParam);
        if (!sec) return null;
        const unit = units.find(u => u.id === sec.unit_id);
        return unit ? subjects.find(s => s.id === unit.subject_id)?.id : null;
      })()
    : null;

  // F118: `last-visited-subject` is read after hydration, never during render. localStorage does
  // not exist on the server, so any render that consults it produces two different trees.
  const initialSubjectId = subjectForUrlSection || (subjects[0]?.id || null);
  const [activeSubjectId, setActiveSubjectId] = useState(initialSubjectId);
  const activeSubject = subjects.find(s => s.id === activeSubjectId) || subjects[0];

  // Filter units and sections by active subject
  const subjectUnits = units.filter(u => u.subject_id === activeSubjectId);
  const subjectSectionIds = new Set(sections.filter(s => subjectUnits.some(u => u.id === s.unit_id)).map(s => s.id));
  const subjectSections = sections.filter(s => subjectSectionIds.has(s.id));

  /*
   * Starting section: what the server was asked for, then what it rendered, then the first.
   *
   * F118. This used to read `window.location.search` and `localStorage` right here, in the render
   * body. Both are empty on the server and populated on the client, so on `/?section=supply` the
   * server rendered the first section of Economics and the client rendered Supply — two different
   * apps from the same markup. React cannot reconcile that, so it discards the server HTML and
   * re-renders from scratch, which is the cost this finding names: a wasted first paint on the
   * low-end phones and school networks this cohort actually uses.
   *
   * The two topic pages used to paper over it by writing `last-visited-section` in an inline
   * script placed before hydration, which made the mismatch worse rather than better — it changed
   * the client's answer without changing the server's. Both scripts are deleted.
   *
   * `last-visited-section` is still honoured, in an effect below, once hydration is finished.
   */
  const startSection = (urlSectionParam && subjectSections.some(s => s.id === urlSectionParam))
    ? urlSectionParam
    : (initialSectionId && subjectSections.some(s => s.id === initialSectionId))
      ? initialSectionId
      : subjectSections[0]?.id;

  const [activeSection, setActiveSection] = useState(startSection);
  const [hydrated, setHydrated] = useState(false);
  const restoreDoneRef = useRef(false);
  useEffect(() => { setHydrated(true); }, []);

  // F118: the client-only preferences, applied after the server's markup has been adopted. Only
  // when the URL did not name a section — an explicit link always beats where they were last.
  useEffect(() => {
    // Only an explicit request wins over where they were last. `requestedSectionId` is that
    // request — the ?section= param on home, the topic in the path on a topic page.
    // `initialSectionId` is NOT: on home it is simply the first section, a default, and guarding
    // on it would mean a returning student always landed on section one.
    if (!hydrated) return;
    if (urlSectionParam) { restoreDoneRef.current = true; return; }
    let lastSection = null;
    let lastSubject = null;
    try {
      lastSection = localStorage.getItem('last-visited-section');
      lastSubject = localStorage.getItem('last-visited-subject');
    } catch { return; }
    /*
     * Restore subject and section together, from the section.
     *
     * The first version of this compared `s.id === lastSubject`, a number against the string
     * localStorage always hands back, so the subject was never restored. It then validated the
     * section against every section in the product rather than the ones in the active subject, so
     * visiting a Business topic and returning to Home opened Economics 1.3.1 with nothing
     * highlighted in the sidebar, and overwrote the stored subject on the way past — losing the
     * memory it had just failed to use. Caught in verification.
     *
     * The section is the more specific fact, so it decides. Its own unit names its subject, and
     * the two can no longer disagree.
     */
    const section = lastSection ? sections.find((x) => String(x.id) === String(lastSection)) : null;
    if (section) {
      const unit = units.find((u) => u.id === section.unit_id);
      const subjectId = unit ? subjects.find((x) => x.id === unit.subject_id)?.id : null;
      if (subjectId != null) setActiveSubjectId(subjectId);
      setActiveSection(section.id);
    } else if (lastSubject) {
      const subject = subjects.find((x) => String(x.id) === String(lastSubject));
      if (subject) setActiveSubjectId(subject.id);
    }
    restoreDoneRef.current = true;
    // Once, on mount. Re-running would drag a reading student back to where they started.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Feature discovery badges. F118: read after hydration, never during the first render — this
  // one alone reproduced both hydration errors as soon as a student had clicked the PDFs link.
  const [visitedFeatures, setVisitedFeatures] = useClientValue(
    () => JSON.parse(localStorage.getItem('visited-features') || '{}'),
    {},
    [],
  );

  function markFeatureVisited(featureId) {
    setVisitedFeatures(prev => {
      const next = { ...prev, [featureId]: true };
      localStorage.setItem('visited-features', JSON.stringify(next));
      return next;
    });
  }

  function handleTabSelect(tabId) {
    setActiveTab(tabId);
    if (!visitedFeatures[`tab-${tabId}`]) {
      markFeatureVisited(`tab-${tabId}`);
    }
    // Learn Mode: mark as seen on first click
    if (tabId === 'learn-mode' && typeof window !== 'undefined') {
      localStorage.setItem('revvy_learnmode_seen', 'true');
    }
  }
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const dataMatchesSection = startSection === initialSectionId;
  // V038 fix round 4: tagged with the section it describes, at every point a payload enters.
  const [rawSectionData, setSectionData] = useState(dataMatchesSection ? payloadForSection(initialSectionData, initialSectionId) : null);

  /*
   * F074, critical. Of 769 quiz questions in the corpus the correct answer is option B in 492 of
   * them: **a student who picks B every time, without reading the question, scores 64%.** Option A
   * is correct 4.8% of the time. Nothing shuffled anywhere, so the pattern is learnable in one
   * sitting, and after that every score the product reports is measuring pattern-matching.
   *
   * Shuffled once, here, where the section's questions enter the app, so the inline quiz, the quiz
   * tab, the pre-test, the post-test, the drill, the review schedule and the mistakes tab all see
   * the same order. Shuffling per surface would show a student the same question with its options
   * in two different arrangements and make the ordering feel like a bug.
   *
   * The shuffle is deterministic on the question text — see lib/shuffle-options.js for why it must
   * be, which is F118 and the stored-attempt problem.
   */
  const sectionData = useMemo(() => {
    if (!rawSectionData?.quiz?.length) return rawSectionData;
    return { ...rawSectionData, quiz: shuffleAllOptions(rawSectionData.quiz) };
  }, [rawSectionData]);
  /*
   * Filter tabs by active subject slug — and, for Diagrams, by whether THIS SECTION has any.
   *
   * The subject gate above says why it was Economics-only: no Business section had a diagram row,
   * so opening the tab for Business would have shown an empty tab rather than a missing one, and
   * "the fix is the content, not the gate". Packet 41 authors eight diagrams for a Business
   * section, three of which no other surface can reach, so the premise is now false for that
   * section and true for the other 21. A count, not a subject, is the thing that was actually
   * being asked about.
   *
   * Economics is left exactly as it was — the subject gate still opens the tab there even while
   * the payload is in flight — so no Economics section can lose a tab it has today. A Business
   * section gains it only once its own payload carries a diagram. This is why the filter moved
   * below `sectionData`: it now depends on the section, not only on the subject.
   */
  /* Packets 13.7/13.8: a drawing drill is diagram content too. A section whose spec number a
     drill claims (lib/diagram-pool.js) opens the tab on the same "a count, not a subject" footing
     as a diagram row — which is how a Business drill reaches the tab at all. */
  const tabSection = subjectSections.find((s) => s.id === activeSection) || subjectSections[0];
  const tabUnitCode = units.find((u) => u.id === tabSection?.unit_id)?.code || '';
  const hasDrawingDrill = diagramSpecsForSection({
    subject: subjectFrom(tabUnitCode), unitCode: tabUnitCode, number: tabSection?.number || '',
  }).length > 0;
  const tabs = allTabs.filter(tab => (tab.id === 'diagrams'
    ? (tab.subjects.includes(activeSubject?.slug) || (sectionData?.diagrams?.length || 0) > 0 || hasDrawingDrill)
    : (!tab.subjects || tab.subjects.includes(activeSubject?.slug))));

  /* V007: the paid surfaces are withheld from the server-rendered page and arrive from the entitled
     API. True means "not here yet", which is a different fact from "this section has none". */
  const paidPending = !!sectionData?.paidPending;
  // Sections already fetched this visit (F092). Per-visit only: it is not a correctness cache,
  // and a reload gets fresh data, which is what we want while content is still being rewritten.
  const sectionCacheRef = useRef(new Map());
  // In-flight requests, keyed the same way, so two overlapping effect runs share one round trip.
  const inflightRef = useRef(new Map());
  /*
   * Merged from main's f6ad430 (24 Sep). The subject-switch handler below fetches outside the
   * loader effect, so it never had the effect's `cancelled` guard: a slow response for a section
   * the student has already left could overwrite the one they are reading. main fixed it with a
   * request token; here the payload already carries its section id (V038 round 4), so the only
   * missing fact is which section is current when the response lands.
   */
  const activeSectionRef = useRef(activeSection);
  useEffect(() => { activeSectionRef.current = activeSection; }, [activeSection]);
  const [isInitial, setIsInitial] = useState(dataMatchesSection);
  const [glossaryTerms, setGlossaryTerms] = useState([]);
  const [contentStepInfo, setContentStepInfo] = useState(null);
  const [pendingTutorPrompt, setPendingTutorPrompt] = useState(null);

  // Learn Mode step. F118: the server renders step 0 and the stored step arrives on the second
  // render, from the effect below. F048, the half the verifier caught: this used to be a
  // `useClientValue` that re-read the LOCAL pointer alone on every section change and set it, which
  // overrode the max-of-server-and-local that `navigateToSection` had just chosen — a signed-in
  // student with server progress and no local key landed on step 1 with no banner. One path sets
  // it now: `readSavedStep`, from the entry effect below and from the navigation handlers.
  const [learnModeSection, setLearnModeSection] = useState(0);
  const [learnModeResuming, setLearnModeResuming] = useState(false);

  // Learn Mode completions. F118: same reason — the sidebar ticks cannot be in the server markup.
  const [learnModeCompletions, setLearnModeCompletions] = useClientValue(
    () => {
      const completions = {};
      subjectSections.forEach((sec) => {
        if (localStorage.getItem(`revvy_complete_${activeSubjectId}_${sec.id}`) === 'true') {
          completions[sec.id] = true;
        }
      });
      return completions;
    },
    {},
    [activeSubjectId, subjectSections.length],
  );

  // Review mode state. F118: the due badge is a browser fact, so it appears on the second render.
  const [dueReviewCount, setDueReviewCount] = useClientValue(() => countDueReviews(), 0, []);
  const [activeReview, setActiveReview] = useState(null); // null | { type: 'spaced', entry } | { type: 'mixed' }

  function refreshDueReviews() {
    setDueReviewCount(countDueReviews());
  }

  // Check due reviews on mount and when tab changes
  useEffect(() => {
    refreshDueReviews();
  }, [activeTab]);

  function handleStartReview() {
    const due = getDueReviews();
    if (due.length > 0) {
      setActiveReview({ type: 'spaced', entry: due[0] });
    }
  }

  function handleStartMixedReview() {
    setActiveReview({ type: 'mixed' });
  }

  function handleFinishReview() {
    setActiveReview(null);
    refreshDueReviews();
  }

  function goToTutor(prompt) {
    setPendingTutorPrompt(prompt);
    setActiveTab('tutor');
  }

  // Remember stepper position per section: { sectionId: { activeStep, furthestStep } }
  const stepperPositions = useRef({});

  // Saved progress: { sectionId: { furthest_step, total_steps, completed } }
  const [savedProgress, setSavedProgress] = useState({});

  // Scroll-aware header state
  const [headerHidden, setHeaderHidden] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const tabContentRef = useRef(null);
  const lastScrollTop = useRef(0);
  const scrollThreshold = 60;

  const currentSection = subjectSections.find(s => s.id === activeSection) || subjectSections[0];
  const currentUnit = units.find(u => u.id === currentSection?.unit_id);

  // Hydrate sidebar collapsed state
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') setSidebarCollapsed(true);
  }, []);

  /*
   * Persist last-visited section and subject.
   *
   * Held until the restore above has run. These fire on mount too, and on the home page the
   * section on mount is simply the first one — so without the guard, opening Home overwrote the
   * memory of where the student actually was with "section one" before anything had read it. The
   * topic pages used to hide that behind an inline pre-hydration script, which is the same script
   * that caused F118.
   */
  useEffect(() => {
    if (!restoreDoneRef.current || !activeSection) return;
    try { localStorage.setItem('last-visited-section', activeSection); } catch {}
  }, [activeSection, hydrated]);

  useEffect(() => {
    if (!restoreDoneRef.current || !activeSubjectId) return;
    try { localStorage.setItem('last-visited-subject', activeSubjectId); } catch {}
  }, [activeSubjectId, hydrated]);

  // ⚠️  TDZ GUARD: Effects that reference `saveProgress` (defined below with useCallback)
  // MUST be placed AFTER the saveProgress definition (~line 435). Placing them here
  // causes a "Cannot access 'saveProgress' before initialization" ReferenceError
  // because useCallback variables are in the temporal dead zone before their declaration.
  // See commit 45d4583 for the fix.

  // Learn Mode step persistence.
  // This used to be an effect keyed on [learnModeSection, activeSection]. On a section change it fired
  // BEFORE the step for the new section was loaded, so it stamped the previous section's step onto the
  // new section's key (audit: cross-section resume contamination). Persist only from an explicit step
  // change, for the section that step belongs to; load with one helper used by every navigation path.
  /*
   * V038. Both saved pointers, each still carrying the identity of the deck it was written
   * against, because only LearnModeTab knows what the current deck IS — the content arrives after
   * this runs, on every navigation path. Nothing is compared here; this reads, and the engine
   * decides (`resolvePointer`).
   *
   *   local  { step, version }      version === null for every pointer written before this packet
   *   db     { step, totalSteps }   `user_content_progress` has no version column; the step count
   *                                 it was written with is the proxy
   */
  function readSavedPointer(subjectId, sectionId) {
    if (typeof window === 'undefined') return { local: null, db: null };
    const row = user && savedProgress?.[sectionId];
    const db = row && Number.isFinite(row.furthest_step)
      ? { step: row.furthest_step, totalSteps: Number.isFinite(row.total_steps) ? row.total_steps : null }
      : null;
    let local = null;
    try {
      local = parsePointer(localStorage.getItem(`revvy_learnmode_${subjectId}_${sectionId}_section`));
    } catch { /* blocked storage: the server copy is the whole story */ }
    return { local, db };
  }

  function readSavedStep(subjectId, sectionId) {
    if (typeof window === 'undefined') return 0;
    // F048: the server's furthest step used to beat the local one outright, so a student who moved
    // ahead in a browser whose write had not landed was sent back on return. Both are high-water
    // marks; the further one wins. LearnModeTab clamps the result into the current step range —
    // and, since V038, refuses to apply it at all when it came from another version of the deck.
    const { local, db } = readSavedPointer(subjectId, sectionId);
    return Math.max(db?.step || 0, local?.step || 0);
  }

  /*
   * F048: the resume banner only appeared after an in-app section change, because only the
   * navigation handlers set `learnModeResuming`. A reload or a deep link at step 4 dropped the
   * student straight into step 4 with no "continue or start over". Offered on entry to any section
   * whose saved step is above 0, once hydration has made the stored value readable.
   */
  useEffect(() => {
    if (!hydrated || !activeSection) return;
    const step = readSavedStep(activeSubjectId, activeSection);
    setLearnModeSection(step);
    if (step > 0) setLearnModeResuming(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, activeSection, activeSubjectId]);

  /*
   * F026: one path for every section navigation. It keeps the tab the student is on — a student
   * reading Diagrams across five topics stays on Diagrams — and only Home hands over to the
   * overview, which is the launchpad. It updates the URL, and it reads the saved step for the NEW
   * section, so nothing carries the old section's step across (the cross-section contamination
   * the audit measured). HomeScreen, the sidebar and the subject switch all come through here.
   */
  function navigateToSection(sectionId, { tab } = {}) {
    /*
     * A review belongs to the moment it was started, not to the Learn tab. `activeReview` used to
     * survive a section change, so a review begun in one topic sat in front of every topic opened
     * afterwards until it was finished — found by the founder opening a new topic and meeting
     * another topic's review first. Changing section ends it; the item stays due.
     */
    setActiveReview(null);
    setActiveSection(sectionId);
    setActiveTab(tab || (activeTab === 'home' ? 'overview' : activeTab));
    setSidebarOpen(false);
    setContentStepInfo(null);
    if (typeof window !== 'undefined') {
      const sec = sections.find(s => s.id === sectionId);
      const unit = units.find(u => u.id === sec?.unit_id);
      const subject = unit ? subjects.find(s => s.id === unit.subject_id) : null;
      if (sec && unit && subject) {
        try { window.history.replaceState(null, '', `/${subject.slug}/unit-${unit.number}/${sec.id}`); } catch { /* ignore */ }
      }
    }
    const step = readSavedStep(activeSubjectId, sectionId);
    setLearnModeSection(step);
    setLearnModeResuming(step > 0);
  }
  /*
   * F027, the half the verifier caught. `learnModeSection` is seeded from localStorage in its
   * useState initialiser and `savedProgress` arrives from the server a moment later, so nothing
   * reconciled the two for the section that is already open at mount — only the explicit
   * navigation handlers called `readSavedStep`. A student who reached step 9 on a school laptop
   * and opened Revvy on their phone landed on step 0 of the same topic, which is the exact
   * failure the whole server-state finding is about, still live on the commonest path.
   *
   * Applied once per section, and only when the server is genuinely ahead: a student who has
   * deliberately gone back a step must not be dragged forward again by a later fetch.
   */
  const learnStepRef = useRef(learnModeSection);
  useEffect(() => { learnStepRef.current = learnModeSection; }, [learnModeSection]);
  const resumeAppliedRef = useRef(false);
  useEffect(() => { resumeAppliedRef.current = false; }, [activeSection, activeSubjectId]);
  useEffect(() => {
    if (!user || !activeSection || resumeAppliedRef.current) return;
    const serverStep = savedProgress?.[activeSection]?.furthest_step;
    if (!Number.isFinite(serverStep)) return;
    resumeAppliedRef.current = true;
    if (serverStep > learnStepRef.current) {
      setLearnModeSection(serverStep);
      setLearnModeResuming(true);
    }
  }, [user, activeSection, activeSubjectId, savedProgress]);

  /*
   * V038: the step is stored with the version of the deck it was reached on. The engine passes
   * that version down with every step change, because the engine is the only thing that holds the
   * content. Without a version the value falls back to the old bare integer, which the resolver
   * then reads as "another version" — the safe direction.
   */
  function handleLearnStepChange(step, version) {
    setLearnModeSection(step);
    if (typeof window !== 'undefined' && activeSubjectId && activeSection) {
      try { localStorage.setItem(`revvy_learnmode_${activeSubjectId}_${activeSection}_section`, encodePointer(step, version)); } catch {}
    }
  }

  // Fetch glossary terms for active subject
  useEffect(() => {
    const url = activeSubjectId
      ? `/api/glossary?subject_id=${activeSubjectId}`
      : '/api/glossary';
    fetch(url)
      .then(res => res.ok ? res.json() : [])
      .then(setGlossaryTerms)
      .catch(() => {});
  }, [activeSubjectId]);

  // Fetch saved content progress when user is logged in
  useEffect(() => {
    if (!user) {
      setSavedProgress({});
      return;
    }
    fetch('/api/progress/content')
      .then(res => res.ok ? res.json() : [])
      .then(rows => {
        const map = {};
        rows.forEach(r => {
          map[r.section_id] = {
            furthest_step: r.furthest_step,
            total_steps: r.total_steps,
            completed: r.furthest_step >= r.total_steps - 1,
          };
        });
        setSavedProgress(map);
      })
      .catch(() => {});
  }, [user]);

  function toggleSidebarCollapsed() {
    setSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('sidebar-collapsed', String(next));
      return next;
    });
  }

  /*
   * Draft preview, development only (packet 16). `?draft=1` on the page URL is forwarded to
   * /api/sections/[id], which serves the staged `draft` payload instead of the live `data` — the
   * only way to walk a section that is finished but held back from publishing. The API refuses the
   * flag in any production build, so this is inert for a student; it is forwarded rather than
   * gated here so that one guard, on the server, is the whole of it.
   */
  const draftFlag = () => (typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('draft'));
  const sectionUrl = (id) => {
    const draft = draftFlag();
    return draft ? `/api/sections/${id}?draft=${encodeURIComponent(draft)}` : `/api/sections/${id}`;
  };

  useEffect(() => {
    // The first section arrives server-rendered as initialSectionData, read from the live `data`
    // column — so a draft preview has to refetch it rather than trust what the page shipped.
    //
    // V007: and since the page may not read a paid table, what it shipped is the free surfaces
    // alone (`paidPending`). The quiz, the flashcards, the extras and the mistakes come from this
    // route for everyone, free or Pro, because it is the only reader that knows who is asking.
    // The shortcut survives for a caller that ships a complete payload; today none does.
    /*
     * V009. Nothing goes to the network until we know who is asking. The cache key below is
     * `section : user : pro|free`, so firing before auth settles asks for the anonymous payload,
     * then refetches when the user arrives, then refetches again when entitlement does — three
     * requests where packet 2.1 measured and pinned ONE per load. `entitlementKnown` is false for
     * the length of one local session read (signed out) or one /api/subscription (signed in), and
     * every paid tab is showing `SectionLoading` for that window anyway.
     */
    if (!entitlementKnown) return;
    if (isInitial) {
      setIsInitial(false);
      if (!draftFlag() && !initialSectionData?.paidPending) return;
    }
    /* V007 put this fetch on the first paint of every visit, where it used to run only on a section
       change, so the two races it always had now happen to everyone.
       - Two effect runs can overlap (entitlement settling, React's development double-invoke), and
         the cache is only written when a response lands, so both would go to the network for the
         same URL. One promise per key, shared.
       - A response that arrives after the student has moved on must not be rendered. `cancelled`
         is the guard the section fetch has never had; without it a slow payload for the section
         they left overwrites the one they are reading. */
    let cancelled = false;
    async function loadSection() {
      // F092: a student moving between sections and back refetched 152 KB every time. Keep what
      // has already been loaded this visit, and keep the previous section on screen while the new
      // one arrives rather than blanking to a loading card (F098).
      // Keyed by section AND by who is asking. The payload varies by entitlement since F086, so a
      // cache keyed on the section alone would keep serving a free student's 2-question quiz after
      // they subscribed, and worse, a paying student's 25 after they signed out. Caught by the
      // packet verifier; it was a bug I introduced with the cache itself.
      const requestedId = activeSection; // V038 fix round 4: what this payload will describe
      const cacheKey = `${sectionUrl(requestedId)}:${user?.id || 'anon'}:${isPremium ? 'pro' : 'free'}`;
      const cached = sectionCacheRef.current.get(cacheKey);
      if (cached) { setSectionData(cached); return; }
      try {
        let pending = inflightRef.current.get(cacheKey);
        if (!pending) {
          pending = fetch(sectionUrl(requestedId))
            .then((res) => (res.ok ? res.json() : null))
            .finally(() => { inflightRef.current.delete(cacheKey); });
          inflightRef.current.set(cacheKey, pending);
        }
        const data = payloadForSection(await pending, requestedId);
        if (!data) return;
        sectionCacheRef.current.set(cacheKey, data);
        if (!cancelled) setSectionData(data);
      } catch (e) {
        console.warn('Failed to load section data', e);
      }
    }
    loadSection();
    return () => { cancelled = true; };
  }, [activeSection, user?.id, isPremium, entitlementKnown]);  // refetch when entitlement changes, not just the section

  // Reset scroll state when section or tab changes
  useEffect(() => {
    setHeaderHidden(false);
    setReadProgress(0);
    lastScrollTop.current = 0;

    // Instantly remove header-hidden class + transition to avoid flash
    const headerEl = document.querySelector('.content-header');
    if (headerEl) {
      headerEl.style.transition = 'none';
      headerEl.classList.remove('header-hidden');
    }

    // Scroll to top — multiple attempts for iOS Safari compatibility
    const el = tabContentRef.current;
    if (el) {
      el.scrollTop = 0;
      try { el.scrollTo({ top: 0, behavior: 'instant' }); } catch (_) {}
    }

    // Fallback: iOS Safari sometimes needs a delayed scroll reset
    const t = setTimeout(() => {
      if (el) {
        el.scrollTop = 0;
        try { el.scrollTo({ top: 0, behavior: 'instant' }); } catch (_) {}
      }
      if (headerEl) headerEl.style.transition = '';
    }, 80);

    if (activeTab !== 'content') {
      setContentStepInfo(null);
    }

    return () => clearTimeout(t);
  }, [activeSection, activeTab]);

  // Scroll handler for auto-hide header + progress bar
  const rafId = useRef(null);
  const handleScroll = useCallback(() => {
    if (rafId.current) return; // throttle to one per frame
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      const el = tabContentRef.current;
      if (!el) return;

      const scrollTop = el.scrollTop;
      const maxScroll = el.scrollHeight - el.clientHeight;

      // Ignore rubber-band / overscroll values
      if (scrollTop < 0 || scrollTop > maxScroll + 50) {
        return;
      }

      const progress = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
      setReadProgress(progress);

      // Near bottom — always show header
      if (maxScroll - scrollTop < 60) {
        setHeaderHidden(false);
        lastScrollTop.current = scrollTop;
        return;
      }

      // Near top — always show header
      if (scrollTop < scrollThreshold) {
        setHeaderHidden(false);
        lastScrollTop.current = scrollTop;
        return;
      }

      const delta = scrollTop - lastScrollTop.current;
      if (delta > 12 && scrollTop > scrollThreshold) {
        setHeaderHidden(true);
      } else if (delta < -12) {
        setHeaderHidden(false);
      }

      lastScrollTop.current = scrollTop;
    });
  }, []);

  // Save progress to DB when a section is fully completed
  const saveProgress = useCallback((sectionId, furthestStep, totalSteps) => {
    if (!user) return;
    const completed = furthestStep >= totalSteps - 1;

    // Update local state immediately
    setSavedProgress(prev => ({
      ...prev,
      [sectionId]: { furthest_step: furthestStep, total_steps: totalSteps, completed },
    }));

    // Persist to DB
    fetch('/api/progress/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section_id: sectionId,
        furthest_step: furthestStep,
        total_steps: totalSteps,
      }),
    }).then(res => {
      if (!res.ok) {
        console.warn('[progress] save failed', res.status);
        trackFunnel('progress_write_failed', { sectionId, step: furthestStep, status: res.status });
      }
    }).catch(err => {
      console.warn('[progress] save failed', err?.message);
      trackFunnel('progress_write_failed', { sectionId, step: furthestStep, status: 0 });
    });
  }, [user]);

  // Learn Mode progress is persisted from explicit step actions in LearnModeTab (onPersistStep), never
  // from an effect. The effect version wrote a furthest_step=0 row the moment any section loaded on any
  // tab, with the BLOCK count as total_steps; that is why 825 of 1,093 "starts" in the audit sat at
  // step 0 and why the overview showed the wrong step count on 21 sections. `totalSteps` here is the
  // real flat step count from LearnModeTab, and furthest never goes backwards — except when the
  // section itself gets shorter, which is the one case where it must (packet 5.1).
  const persistLearnStep = useCallback((step, totalSteps, { complete = false } = {}) => {
    if (!user || !activeSection || !totalSteps) return;
    /*
     * V038. The stored high-water mark may only be carried forward when it was written against a
     * deck of this length — the same version proxy `resolvePointer` uses on the way in, applied on
     * the way out so the two cannot disagree. Without this, a student who chose "start again" on a
     * rebuilt topic took one step and was dragged straight back to the old deck's number by
     * `Math.max`: the clamp heals a pointer that is too BIG, nothing healed one that belongs to a
     * different deck. A row from another version is not evidence about this one, so it is dropped
     * and replaced by the step actually reached here.
     */
    const row = savedProgress?.[activeSection];
    const sameVersion = row && Number.isFinite(row.total_steps) && row.total_steps === totalSteps;
    const prev = sameVersion ? row.furthest_step : 0;
    // Clamped on write as well as on read: see furthestStep in lib/learn-steps.js for why.
    const furthest = furthestStep(prev, step, totalSteps, complete);
    saveProgress(activeSection, furthest, totalSteps);
  }, [user, activeSection, savedProgress, saveProgress]);

  const handleStepChange = useCallback((info) => {
    setContentStepInfo(info);

    // Remember position for this section
    stepperPositions.current[activeSection] = {
      activeStep: info.activeStep,
      furthestStep: info.furthestStep,
    };

    // Save to DB when section is fully completed
    if (user && info.furthestStep >= info.totalSteps - 1) {
      saveProgress(activeSection, info.furthestStep, info.totalSteps);
    }
  }, [user, activeSection, saveProgress]);

  function handleSubjectChange(subjectId) {
    setActiveSubjectId(subjectId);
    // Find first section of new subject
    const newUnits = units.filter(u => u.subject_id === subjectId);
    const newSections = sections.filter(s => newUnits.some(u => u.id === s.unit_id));
    const firstId = newSections[0]?.id;
    if (firstId) {
      setActiveReview(null); // a review started under the old subject does not follow the student here
      setActiveSection(firstId);
      setIsInitial(false);
      setSectionData(null);
      // F026: a subject switch used to force the Learn tab too.
      setActiveTab(activeTab === 'home' ? 'overview' : activeTab);
      setContentStepInfo(null);
      // Load the new section's own saved step instead of carrying the old section's step across.
      const step = readSavedStep(subjectId, firstId);
      setLearnModeSection(step);
      setLearnModeResuming(step > 0);
      fetch(sectionUrl(firstId))
        .then(res => res.ok ? res.json() : null)
        .then(data => { if (data && activeSectionRef.current === firstId) setSectionData(payloadForSection(data, firstId)); })
        .catch(() => {});
    }
  }

  function handleSectionChange(sectionId) {
    navigateToSection(sectionId);
  }

  function renderTab() {
    /*
     * V007. Order matters here, and it is the whole of the no-flash guarantee.
     *
     * The server-rendered page ships the free surfaces only, so on first paint every paid tab is
     * withheld rather than empty. Answering that state with a paywall would show "Unlock Quiz" to a
     * paying student for the length of one fetch — F035's bug, in a new place — and answering it
     * with the arrays would draw "2 of 0" at everyone else. Neither is true yet. So the withheld
     * state is answered first, with the loading card, and entitlement is only consulted once the
     * data it governs has actually arrived.
     */
    if (paidPending && (PREMIUM_TABS.has(activeTab) || PREVIEW_TABS.has(activeTab))) {
      return <SectionLoading />;
    }

    /*
     * Merged from main's f6ad430: never draw one section's material under another section's
     * heading. A founder-reported bug had the header and sidebar on 3.3.1 while the body showed
     * 1.3.1's notes. The payload has carried its own section id since V038 round 4, so the check
     * reads that instead of the separate `sectionDataId` state main added.
     *
     * This SUPERSEDES F098's "keep the previous section on screen while the new one arrives" for
     * the body: a reader now sees the loading card for the length of one fetch on a section they
     * have not opened this visit, rather than the last section's notes under the new title. The
     * F092 cache keeps a revisit instant, so the cost is paid once per section per visit. Showing
     * a student material that does not belong where they are is the class of defect this week was
     * spent removing (V053); it is not a price worth paying to avoid a spinner.
     */
    if (!sectionData || sectionData.sectionId !== activeSection) {
      return <SectionLoading />;
    }

    /* Show the full paywall for premium-only tabs — but on the SERVER's verdict about this student,
       `sectionData.isPremium`, for the same reason the preview line below gives: the payload knows
       who was actually asked about, and it has already arrived by the time we get here (the
       withheld state is answered above). V009 made that the only usable answer on these pages: the
       document is prerendered now, so the client's `isPremium` starts as "not known yet" and
       reading it here would put "Unlock Tutor" in front of a paying student for the length of
       /api/subscription — which is F035, the bug the root layout's cookie read was added to fix. */
    if (PREMIUM_TABS.has(activeTab) && !sectionData.isPremium) {
      const tabLabel = tabs.find(t => t.id === activeTab)?.label || activeTab;
      return <PaywallOverlay feature={tabLabel} />;
    }

    /* Preview tabs: everyone gets the preview UI unless the payload they were SENT is the full one.
       Read from the response rather than from the client's own belief about entitlement — the two
       can disagree (an admin is entitled by `app_metadata.role`, which `useAuth` does not model),
       and when they do it is the payload that decides what is on the screen. */
    const isPreview = PREVIEW_TABS.has(activeTab) && !sectionData.isPremium;

    switch (activeTab) {
      case 'home': return <HomeScreen subjects={subjects} units={subjectUnits} sections={subjectSections} user={user} isPremium={entitlement} onNavigateToSection={(id) => navigateToSection(id, { tab: 'overview' })} onNavigateToTab={(tab) => setActiveTab(tab)} />;
      case 'overview': return <SectionOverview section={currentSection} unit={currentUnit} sectionData={sectionData} tabs={tabs} onTabSelect={handleTabSelect} isPremium={entitlement} user={user} savedProgress={savedProgress} />;
      case 'learn-mode': {
        // If a review is active, show the review component instead
        if (activeReview?.type === 'spaced') {
          return <SpacedReview reviewEntry={activeReview.entry} onFinish={handleFinishReview} />;
        }
        if (activeReview?.type === 'mixed') {
          return <MixedReview onFinish={handleFinishReview} />;
        }
        /*
         * V038 fix round 4 — the one place the evidence is checked against the section on screen.
         *
         * Learn Mode is handed three things that must all describe `activeSection`: the deck
         * (`sectionData.content`), the saved pointer (read below, per section, so it always does)
         * and `contentVersionSince`. Two of them come from the payload, and after an in-app section
         * change the payload is still the PREVIOUS section's for one render or one fetch (F098,
         * `navigateToSection`), while this component is keyed to the new one. That is how section
         * B's pointer came to be judged — and stamped — by section A's deck.
         *
         * `undefined` is checked as well as the id: a payload that carries no publish date has not
         * answered the question the legacy branch of `resolvePointer` asks, and `null` (never
         * republished) is an answer while `undefined` is not.
         *
         * Neither check may be turned into "render it anyway with defaults". Parking costs a
         * loading card for as long as the payload takes; judging with the wrong evidence costs the
         * student their place, permanently.
         */
        if (sectionData.sectionId !== activeSection || sectionData.contentVersionSince === undefined) {
          return <SectionLoading />;
        }
        return (
          <LearnModeTab
            key={activeSection}
            contentData={sectionData.content}
            diagramsData={sectionData.diagrams}
            practiceData={sectionData.practice}
            quizData={sectionData.quiz}
            glossaryTerms={glossaryTerms}
            sectionId={activeSection}
            subjectId={activeSubjectId}
            currentSection={currentSection}
            currentUnit={currentUnit}
            currentStep={learnModeSection}
            /* V038: read at render, after hydration, so it reflects the write the last step change
               made rather than a value captured on a navigation that has since been superseded. */
            savedPointer={hydrated ? readSavedPointer(activeSubjectId, activeSection) : null}
            /* V038 fix round 2: when this deck became the deck. The only thing that can tell a
               legacy bare-integer pointer from a pointer written against a rebuild, since the
               integer carries no identity of its own. Fix round 4: it is this section's, because
               the guard above has already refused any payload that belongs to another one, and it
               is present, because the same guard refuses `undefined`. */
            contentVersionSince={sectionData.contentVersionSince}
            onStepChange={handleLearnStepChange}
            onPersistStep={persistLearnStep}
            isResuming={learnModeResuming}
            onResumeDismiss={() => setLearnModeResuming(false)}
            onComplete={() => {
              setLearnModeCompletions(prev => ({ ...prev, [activeSection]: true }));
              refreshDueReviews();
            }}
            onNavigateToQuiz={() => handleTabSelect('quiz')}
            onNavigateToTab={handleTabSelect}
            onAskTutor={isPremium ? goToTutor : null}
            isPremium={entitlement}
            dueReviews={dueReviewCount}
            onStartReview={handleStartReview}
            onStartMixedReview={handleStartMixedReview}
          />
        );
      }
      case 'content': return <ContentTab key={activeSection} data={sectionData.content} glossaryTerms={glossaryTerms} onStepChange={handleStepChange} initialPosition={stepperPositions.current[activeSection] || null} />;
      case 'notes': return <NotesTab data={sectionData.notes} glossaryTerms={glossaryTerms} />;
      case 'diagrams': return <DiagramsTab data={sectionData.diagrams} sectionId={activeSection} unitCode={currentUnit?.code} sectionNumber={currentSection?.number} />;
      case 'practice': return <PracticeQuestionsTab questions={sectionData.practice} onAskTutor={isPremium ? goToTutor : null} sectionId={activeSection} sectionNumber={currentSection?.number} unitCode={currentUnit?.code} />;
      case 'flashcards': return <FlashcardsTab cards={sectionData.flashcards} totalCount={sectionData.counts?.flashcards} sectionId={activeSection} previewMode={isPreview} />;
      /* unitCode and sectionNumber are packet 13.2's: the Quiz tab derives its calculation
         drill from them, the same two fields PracticeQuestionsTab above already takes. */
      case 'quiz': return <QuizTab questions={sectionData.quiz} totalCount={sectionData.counts?.quiz} sectionId={activeSection} onAskTutor={isPremium ? goToTutor : null} previewMode={isPreview} unitCode={currentUnit?.code} sectionNumber={currentSection?.number} />;
      case 'mistakes': return <MistakesTab data={sectionData.mistakes} subjectId={activeSubjectId} sectionId={activeSection} quizData={sectionData.quiz} />;
      case 'tutor': return <TutorTab section={currentSection} unit={currentUnit} contentData={sectionData.content} pendingPrompt={pendingTutorPrompt} onPromptConsumed={() => setPendingTutorPrompt(null)} />;
      case 'extras': return <ExtrasTab data={sectionData.extras} totalCount={(sectionData.counts?.extrasChains || 0) + (sectionData.counts?.extrasEvaluation || 0)} previewMode={isPreview} />;
      default: return null;
    }
  }

  return (
    <>
      <div className="mobile-header">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>&#9776;</button>
        <span className="mobile-title">{currentSection?.short_title || 'Revvy Learn'}</span>
        <div className="mobile-header-actions">
          <AuthButton />
        </div>
      </div>

      <div className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} />

      <div className="app-layout">
        <Sidebar
          subjects={subjects}
          activeSubjectId={activeSubjectId}
          onSubjectChange={handleSubjectChange}
          sections={subjectSections}
          units={subjectUnits}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapsed}
          contentStepInfo={activeTab === 'content' ? contentStepInfo : null}
          savedProgress={user ? savedProgress : null}
          visitedFeatures={visitedFeatures}
          onResourceVisit={markFeatureVisited}
          learnModeCompletions={learnModeCompletions}
          onTabSelect={handleTabSelect}
          onHomeClick={() => setActiveTab('home')}
          // Close the phone drawer first: it sits above the card (z 200 against 40).
          onFeedback={() => { setSidebarOpen(false); openFeedback({ sectionId: activeSection }); }}
        />

        <div className="main-content">
          <div className="reading-progress-bar">
            <div className="reading-progress-fill" style={{ width: `${readProgress * 100}%` }} />
          </div>

          <div
            className="tab-content"
            ref={tabContentRef}
            onScroll={handleScroll}
          >
            <div className={`content-header ${headerHidden ? 'header-hidden' : ''}`}>
              <div className="content-header-top">
                {sidebarCollapsed && (
                  <button className="sidebar-expand-btn" onClick={toggleSidebarCollapsed} title="Expand sidebar">
                    &#9776;
                  </button>
                )}
                <span className="content-header-section-num">Section {currentSection?.number}</span>
                <span className="content-header-unit-badge">Unit {currentUnit?.number}: {currentUnit?.title}</span>
                <AuthButton />
              </div>
              <AnimatedTabBar
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={handleTabSelect}
                isPremium={entitlement}
                visitedFeatures={visitedFeatures}
                learnModeCompletions={learnModeCompletions}
                activeSection={activeSection}
              />
            </div>

            <div className="tab-content-body">
              {renderTab()}
            </div>
          </div>
          <GlossaryTooltip />
        </div>
      </div>
    </>
  );
}
