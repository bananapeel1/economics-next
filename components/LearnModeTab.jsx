"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { highlightGlossaryTerms } from '@/lib/glossary-highlight';
import { recordReview } from '@/lib/strength';
// Placement — which question, worked example and diagram a chapter shows — is in
// lib/checkin-placement.js, shared with the guard that checks it. `distributeItems` is deliberately
// not imported anywhere in the client any more: the positional map it produced is what served a
// chapter-3 question at chapter 1 on 21 sections. It stays exported from utils.js only because
// audit/scripts/exposure-census.mjs and lib/preview-limits.test.mjs model the OLD behaviour in
// order to prove it is gone.
import { placeChapterItems } from '@/lib/checkin-placement';
import { buildSteps, pickSpacedRecall, clampStep, firstStepOfBlock, contentVersion, resolvePointer } from '@/lib/learn-steps';
import InlineDiagram from './learn-mode/InlineDiagram';
import InlinePractice from './learn-mode/InlinePractice';
import InlineQuiz from './learn-mode/InlineQuiz';
import { signalMoment } from '@/lib/feedback/client';
import ReportProblem from './feedback/ReportProblem';
import CalculationItem from './quant/CalculationItem';
import { templatesForSection, placeQuantItems, quantItem } from '@/lib/quant-pool';
import { readAnswerLog, orderByPriority } from '@/lib/answer-log';
import PreTest from './learn-mode/PreTest';
import { pickPretestQuestions } from '@/lib/pretest-pool';
import CompletionScreen from './learn-mode/CompletionScreen';
import ReorderRecall from './learn-mode/ReorderRecall';
import FillInRecall from './learn-mode/FillInRecall';
import MatchRecall from './learn-mode/MatchRecall';
import ClassifyRecall from './learn-mode/ClassifyRecall';
import DiagramRecall from './learn-mode/DiagramRecall';
import { recallId } from '@/lib/learn-steps';
import ExplainItBackUpgraded from './learn-mode/ExplainItBackUpgraded';
import { NoteSection, TakeawayCard } from './notes';
import { isPracticeVisible, subjectFrom } from '@/lib/ial-commands';
import { trackFunnel } from '@/lib/funnel';
import { readLocalState, writeLocalState, fetchServerState, saveSectionState } from '@/lib/section-state';

/* The rubric the AI grader marks against. Built from the whole chapter, not just the step the box
   sits on, because the student is explaining the chapter. keyIdea / misconception / examMatters live
   on the subsection, so they are gathered across the block. Packet 9, finding F015: the old grader
   received only the chapter title and marked against its own general knowledge. */
function chapterRubric(contentData, blockIndex, unitCode) {
  const block = Array.isArray(contentData) ? contentData[blockIndex] : null;
  const subs = Array.isArray(block?.sections) ? block.sections : [];
  const join = (key) => subs.map((x) => x && x[key]).filter(Boolean).join('\n');
  return {
    unitCode,
    keyIdea: join('keyIdea'),
    takeaway: block?.takeaway || null,
    misconception: join('misconception'),
    examMatters: join('examMatters'),
  };
}

/* Practice items whose command word is not on the IAL list for the subject (or flagged hidden in
   content) are withheld until rewritten. See audit/PLAN.md day-0 hotfix. */
function PracticeWithheld() {
  return (
    <div className="lm-practice-withheld" role="note">
      The practice question for this chapter is being rewritten to match the IAL exam format.
    </div>
  );
}

/**
 * One recall widget, by type: packet 7's four, plus the drawing drill from 13.7
 * (lib/recall-widgets.js). `showing` is 'first' on the recall's own step and 'spaced' on a later
 * check-in; every widget derives its own seeded order from it — the drill has no order to seed, so
 * it ignores `showing`. `pool` is the section's other fill-in answers, the distractor source for a
 * fill-in that carries none of its own.
 */
function Recall({ recall, keyPrefix, showing = 'first', pool, onComplete, onSkip }) {
  if (!recall || typeof recall !== 'object') return null;
  const props = { recall, showing, onComplete, onSkip };
  if (recall.type === 'reorder') return <ReorderRecall key={keyPrefix} {...props} />;
  if (recall.type === 'fillin') return <FillInRecall key={keyPrefix} {...props} pool={pool} />;
  if (recall.type === 'match') return <MatchRecall key={keyPrefix} {...props} />;
  if (recall.type === 'classify') return <ClassifyRecall key={keyPrefix} {...props} />;
  if (recall.type === 'diagram') return <DiagramRecall key={keyPrefix} {...props} />;
  return null;
}

const EMPTY_SCORES = () => ({
  quiz: { correct: 0, total: 0 }, recall: { correct: 0, total: 0, skipped: 0 },
  explain: { attempts: 0, total: 0 }, practice: { correct: 0, total: 0 },
  // Packet 13.2. Marks, not questions: a calculation is marked per step, and a student who
  // carried a wrong figure correctly through two of three steps has earned four of six.
  quant: { correct: 0, total: 0 },
});

/* ── Main Learn Mode Tab ──
   Packet 5. One subsection per step, a check-in step at the end of every chapter, and nothing
   above a step's title. The step model itself is lib/learn-steps.js, shared with the overview so
   the two show the same count. See audit/NEXT.md "Packet 5 spec" for the findings this answers. */
export default function LearnModeTab({
  contentData, diagramsData, practiceData, quizData, glossaryTerms,
  sectionId, subjectId, currentSection, currentUnit,
  currentStep, onStepChange, onPersistStep,
  savedPointer, contentVersionSince,
  isResuming, onResumeDismiss,
  onComplete, onNavigateToQuiz, onNavigateToTab,
  onAskTutor, isPremium,
  dueReviews, onStartReview, onStartMixedReview,
}) {
  const [showKeyboardHint, setShowKeyboardHint] = useState(false);
  const [nodePopped, setNodePopped] = useState(false);
  // F001/F027: seeded from the local cache so the first paint is instant, then reconciled against
  // the server below, which is the copy that follows the student between devices.
  const [isComplete, setIsComplete] = useState(() => !!readLocalState(subjectId, sectionId)?.completed);
  // The pre-test is opt-in. It used to be the forced first screen of every section (a 3-question
  // test on material the student had not seen), and it is where three quarters of section starts
  // ended. Now: step 0 shows a small offer; the test only renders if the student chooses it.
  const [showPretest, setShowPretest] = useState(false);
  const [pretestOffered, setPretestOffered] = useState(() => {
    const st = readLocalState(subjectId, sectionId);
    return !st?.pretestState && !isResuming && (quizData?.length > 0);
  });
  /*
   * V007, and the one place its cost lands on a FREE surface.
   *
   * `pretestOffered` is a useState INITIALISER, so it is computed once, at mount, from
   * `quizData.length`. That was safe while the server-rendered page shipped the whole quiz bank:
   * the array was never empty when this component mounted. It is now — the page may not read a paid
   * table, so the quiz arrives a moment later from `/api/sections/[id]` — and a student who opened
   * Learn Mode inside that window had the pre-test latched off for the rest of the visit. Learn Mode
   * is free, it is the busiest path in the product, and packet 5 exists because three quarters of
   * section opens ended on step 0; silently dropping its opt-in offer is the worst place to pay for
   * a paywall fix.
   *
   * So the offer is re-derived when the questions arrive. Every reason NOT to offer still wins:
   * a stored `pretestState` (which `declinePretest` writes before it clears this flag, and which the
   * server reconcile above writes through `writeLocalState` before it does the same), a resume, a
   * completed section, or a pre-test already on screen. Local state is re-read rather than captured,
   * so a decision taken since mount is seen.
   */
  useEffect(() => {
    if (!(quizData?.length > 0) || pretestOffered || showPretest || isComplete || isResuming) return;
    if (readLocalState(subjectId, sectionId)?.pretestState) return;
    setPretestOffered(true);
  }, [quizData?.length, pretestOffered, showPretest, isComplete, isResuming, subjectId, sectionId]);

  function declinePretest() {
    // Skipping has to be remembered on the server too, or the gate returns on the next device.
    saveSectionState(subjectId, sectionId, { pretestState: 'skipped' });
    trackFunnel('pretest_declined', { sectionId });
    setPretestOffered(false);
  }
  // F001/F027: the server is the source of truth for a signed-in student. Reconcile after the
  // first paint so switching device, clearing storage or opening a private window no longer wipes
  // completion, the review schedule and the pre-test choice.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const state = await fetchServerState([sectionId]);
      const mine = state?.[sectionId];
      if (cancelled || !mine) return;
      writeLocalState(subjectId, sectionId, mine);
      if (mine.completed) setIsComplete(true);
      if (mine.pretestState) setPretestOffered(false);
    })();
    return () => { cancelled = true; };
  }, [subjectId, sectionId]);

  const containerRef = useRef(null);

  // ── Score tracking for completion breakdown ──
  // F006: these were component state, so the breakdown vanished on revisit and double-counted on
  // retry. Seeded from the local cache and written with the completion record. `practice` is new
  // in packet 5 (F016): written answers now count.
  const [scores, setScores] = useState(() => {
    const saved = readLocalState(subjectId, sectionId)?.scores;
    return saved ? { ...EMPTY_SCORES(), ...saved } : EMPTY_SCORES();
  });
  function onQuizResult(correct) { setScores(s => ({ ...s, quiz: { correct: s.quiz.correct + (correct ? 1 : 0), total: s.quiz.total + 1 } })); }
  /* Packet 13.2. A calculation scores once, on the first time it is marked. "Mark my working"
     can be pressed again after a correction — it has to be, or a student who mistyped could
     never see the right feedback — and a score that moved on every press would be measuring
     the button. A fresh set of figures is a different item id and does count again. */
  const quantMarked = useRef(new Set());
  function onQuantResult(itemId, result) {
    if (!itemId || !result || quantMarked.current.has(itemId)) return;
    quantMarked.current.add(itemId);
    setScores(s => ({
      ...s,
      quant: { correct: s.quant.correct + result.awarded, total: s.quant.total + result.total },
    }));
  }
  // F007: only attempted recalls counted, so dismissing one with the × removed it from the score
  // entirely. A skipped check is a check not answered, not a check that never existed.
  // F055 (packet 7): a skip is also counted as skipped, its id is kept — in the section's local
  // state, so it survives a reload — and the spaced pick below shows it again at the next check-in.
  const skippedRef = useRef(new Set());
  useEffect(() => {
    skippedRef.current = new Set(readLocalState(subjectId, sectionId)?.recallSkipped || []);
  }, [subjectId, sectionId]);
  function persistSkipped() {
    writeLocalState(subjectId, sectionId, { recallSkipped: [...skippedRef.current] });
  }
  function onRecallResult(correct, id) {
    if (id && skippedRef.current.has(id)) { skippedRef.current.delete(id); persistSkipped(); }
    setScores(s => ({ ...s, recall: { ...s.recall, correct: s.recall.correct + (correct ? 1 : 0), total: s.recall.total + 1 } }));
  }
  function onRecallSkipped(id) {
    if (id) { skippedRef.current.add(id); persistSkipped(); }
    setScores(s => ({ ...s, recall: { ...s.recall, total: s.recall.total + 1, skipped: (s.recall.skipped || 0) + 1 } }));
  }
  // The distractor pool for fill-ins that carry none: every other fill-in answer in this section.
  const fillinPool = useMemo(() => {
    const words = [];
    for (const b of contentData || []) for (const sec of b?.sections || []) if (sec?.recall?.type === 'fillin') words.push(...(sec.recall.answers || []));
    return words;
  }, [contentData]);
  function onExplainAttempt() { setScores(s => ({ ...s, explain: { attempts: s.explain.attempts + 1, total: s.explain.total + 1 } })); }
  function onPracticeShown() { setScores(s => ({ ...s, practice: { ...s.practice, total: (s.practice?.total || 0) + 1 } })); }
  function onPracticeAttempt() { setScores(s => ({ ...s, practice: { correct: (s.practice?.correct || 0) + 1, total: s.practice?.total || 0 } })); }

  // ── The steps ──
  const flatSteps = useMemo(() => buildSteps(contentData), [contentData]);
  const totalSteps = flatSteps.length;
  /*
   * V038. The deck's own identity, and what the saved pointer is allowed to do about it.
   *
   * `clampStep` below keeps a pointer inside this deck; it has never known which deck the number
   * came from. A completed 14-step pointer clamped into a rebuilt 29-step deck resumed at "step 14
   * of 29 · 48%", three chapters into material the student had never seen, and rewrote their stored
   * position on the way past (audit/runs/packet-37/verify-b.md, section 3). So: a pointer whose
   * version does not match this deck is not applied. The student is told, and chooses.
   *
   * Fix round 2: "does not match" needs a positive disagreement, not merely a missing fingerprint.
   * Reading every legacy pointer as foreign put that notice in front of every signed-out returner
   * on every section (Verify A, 21 September). `contentVersionSince` is what supplies the evidence
   * for the legacy case; `resolvePointer` owns the rule.
   *
   * Fix round 4: all three inputs below must describe the SAME section — `contentData` (the deck),
   * `savedPointer` (the student's place) and `contentVersionSince` (when this deck was published).
   * Nothing in this component can check that; the caller holds the section id and the payload, so
   * the caller is where it is enforced (`StudyApp.jsx`, the `learn-mode` case of `renderTab`). Do
   * not render this component with a payload that belongs to another section, and do not render it
   * with `contentVersionSince` undefined: `resolvePointer` reads undefined as "not arrived" and
   * will refuse to resume a legacy pointer rather than guess.
   */
  const deckVersion = useMemo(() => contentVersion(contentData), [contentData]);
  const pointer = resolvePointer(savedPointer, deckVersion, totalSteps, { versionSince: contentVersionSince });
  const isRebuilt = pointer.stale;
  // F026: a saved pointer from an older step model, or from another section, must not render as
  // "Step 9 of 5". Clamp for rendering, and write the clamped value back so persistence agrees.
  const safeStep = isRebuilt ? pointer.step : clampStep(currentStep, totalSteps);
  useEffect(() => {
    // While the rebuilt notice is up, nothing is written back: the old pointer is the only record
    // the student has of where they got to, and overwriting it here is the destructive half of the
    // bug (18 → 13 in the evidence). The write happens when they pick start-again or jump-to-end.
    if (totalSteps && !isRebuilt && currentStep !== safeStep) onStepChange(safeStep, deckVersion);
  }, [currentStep, safeStep, totalSteps, isRebuilt, deckVersion]); // eslint-disable-line react-hooks/exhaustive-deps

  /*
   * V038 fix round 4 — the automatic stamp is gone, deliberately.
   *
   * Round 2 added an effect here that claimed a legacy bare-integer pointer for this deck the
   * moment the resolver said nothing contradicted it: `onStepChange(safeStep, deckVersion)` with
   * the step unchanged. It was the only write on this path that no student asked for, and it is
   * the step that turned all four rejected rounds from a wrong READING into a permanent wrong
   * RECORD — an automatic write cannot tell a right deck from a wrong one, so whatever the
   * resolver was handed got written to storage and could never be taken back
   * (verify-a.md rounds 1-3; measured again, before this change, on 21 September: an in-app switch
   * from national-income to aggregate-demand wrote `{"v":"14.chvz90","s":5}` onto
   * aggregate-demand's key, a fingerprint belonging to the other section's deck).
   *
   * Nothing is lost by removing it. A legacy pointer is upgraded to a versioned one by the first
   * step the student actually takes (`onStepChange(step, deckVersion)` below, and the clamp effect
   * above), and a pointer that is still legacy on the next visit is judged by
   * `LEGACY_POINTER_EPOCH` on that visit exactly as it was on this one — the date is not a
   * one-shot check, it is re-read on every render. What the stamp bought was one fewer date
   * comparison. What it cost was the student's place.
   */


  // ── Distribute diagrams/quiz/practice to check-in steps ──
  // (practice is sorted by marks inside placeChapterItems, which is the only consumer)

  /*
   * Placement moved to lib/checkin-placement.js so that this component and
   * audit/scripts/checkin-attribution.mjs share ONE statement about which item a chapter shows.
   * A guard holding its own copy of this branch would keep passing after the branch changed —
   * which is how the positional map survived so long.
   */
  const { diagramMap, quizMap, practiceMap } = useMemo(
    () => placeChapterItems({ flatSteps, contentData, diagramsData, quizData, practiceData }),
    [flatSteps, contentData, diagramsData, quizData, practiceData],
  );

  /* ── Quantitative drills (packet 13.2) ──
   *
   * Derived, not authored: `lib/quant-pool.js` matches this section's subject and spec number
   * against the template registry, so a section gains a calculation when a template claims it
   * and no content row changes. The join is the reason 13.2 corrected three spec codes first —
   * `1.2.4` and `2.4.2` are UK GCE numbers and match no IAL section, so the drills would have
   * been mounted here and appeared nowhere.
   *
   * The map is keyed by FLAT step index, like quizMap, and placement runs over the check-in
   * slots only. `attempt` is bumped by the card's own "New figures" button; it is in the key
   * as well as the seed so React rebuilds the card with empty inputs.
   */
  const [quantAttempts, setQuantAttempts] = useState({});
  useEffect(() => { setQuantAttempts({}); quantMarked.current = new Set(); }, [sectionId]);

  const quantMap = useMemo(() => {
    const map = {};
    if (!flatSteps.length) return map;
    const unitCode = currentUnit?.code || '';
    const forSection = templatesForSection({
      subject: subjectFrom(unitCode),
      unitCode,
      number: currentSection?.number || '',
    });
    if (!forSection.length) return map;

    const slots = flatSteps.map((s, i) => ({ s, i })).filter(({ s }) => s.type === 'checkin' || s.type === 'legacy');
    // The chapter titles, so a drill lands on the check-in of the chapter that teaches it.
    const placed = placeQuantItems(forSection, slots.map(({ s }) => s.blockTitle || s.block?.title || ''));
    for (const [ordinal, templateId] of Object.entries(placed)) {
      const slot = slots[Number(ordinal)];
      if (slot) map[slot.i] = templateId;
    }
    return map;
  }, [flatSteps, currentUnit?.code, currentSection?.number]);

  const practiceStepIndices = useMemo(() => Object.keys(practiceMap).map(Number).sort((a, b) => a - b), [practiceMap]);

  // F079: every question the check-ins will ask, so the pre-test can avoid them. Declared beside
  // the other memos, above every early return (the TDZ lesson from packet 8).
  const blockQuizQuestions = useMemo(() => Object.values(quizMap).filter(Boolean), [quizMap]);

  /* The offer must promise exactly what PreTest will render, so both ask the same function. This
     was `Math.min(3, quizData.length)` — blind to the reserved set, so it said "Three questions"
     and delivered two, and after V015 it would have said three and delivered two honest ones. */
  const pretestCount = useMemo(
    () => pickPretestQuestions(quizData, blockQuizQuestions).length,
    [quizData, blockQuizQuestions],
  );
  function getPracticeMode(stepIndex) {
    const ordinal = practiceStepIndices.indexOf(stepIndex);
    const total = practiceStepIndices.length;
    if (total <= 1) return 'independent';
    if (ordinal === 0) return 'worked';
    if (ordinal === total - 1) return 'independent';
    return 'guided';
  }

  // ── Spaced recall: chosen once per check-in per session, so Back and Next show the same one ──
  const spacedByStep = useRef({});
  const spacedUsed = useRef(new Set());
  function spacedFor(stepIdx) {
    if (stepIdx in spacedByStep.current) return spacedByStep.current[stepIdx];
    const pick = pickSpacedRecall(flatSteps, stepIdx, spacedUsed.current, skippedRef.current);
    if (pick) spacedUsed.current.add(pick.id);
    spacedByStep.current[stepIdx] = pick;
    return pick;
  }
  useEffect(() => { spacedByStep.current = {}; spacedUsed.current = new Set(); }, [sectionId, flatSteps]);

  function g(html) { return highlightGlossaryTerms(html, glossaryTerms); }

  // Scroll to top — instant for step transitions, smooth for reveals
  const scrollToTop = useCallback((instant = false) => {
    const behavior = instant ? 'instant' : 'smooth';
    const tabContent = document.querySelector('.tab-content');
    if (tabContent) tabContent.scrollTo({ top: 0, behavior });
    window.scrollTo({ top: 0, behavior });
  }, []);

  const [showMoreMenu, setShowMoreMenu] = useState(false);
  // Furthest step reached this session, for the chapter dots.
  const furthestRef = useRef(0);
  if (safeStep > furthestRef.current) furthestRef.current = safeStep;

  /* F097/F046: the swap is immediate. The old version disabled Next for a 350ms timer and then
     hard-cut to the new step; the enter animation the timer was meant to cover was never applied.
     The step body remounts on every step (keyed below) and carries the enter animation itself; the
     tick on the node is a decoration that runs alongside, blocking nothing. */
  const navigateToStep = useCallback((next) => {
    const target = clampStep(next, totalSteps);
    if (target === safeStep) return;
    if (target > safeStep) {
      setNodePopped(true);
      setTimeout(() => setNodePopped(false), 400);
      // The true "passed step N" signal, plus persistence of the furthest step reached
      trackFunnel('step_next', { sectionId, step: safeStep, totalSteps });
      onPersistStep?.(target, totalSteps);
    }
    scrollToTop(true);
    // V038: every write stamps the deck this step was reached on.
    onStepChange(target, deckVersion);
  }, [safeStep, totalSteps, sectionId, onPersistStep, onStepChange, scrollToTop, deckVersion]);

  /*
   * V038, the two ways out of a pointer from another version. Neither resumes: "start again" puts
   * the student at step 0 under THIS deck's version, and "jump to end" takes them to the last step
   * the way a normal forward navigation would, which persists it. Both replace the stale record
   * rather than reinterpreting it, so the notice does not come back.
   */
  const restartRebuilt = useCallback(() => {
    trackFunnel('rebuilt_auto_restart', { sectionId, step: 0, totalSteps, staleStep: pointer.staleStep });
    /*
     * BOTH records, not just the local one. Writing only the local pointer left a signed-in
     * student's old-deck row ({furthest_step:13, total_steps:14}) untouched; `savedPointer` is
     * re-read from both sources on every render, `resolvePointer` still scored that row as
     * another version standing further on than anything valid, and the notice re-rendered on the
     * next frame — "Start again" did nothing the student could see. `persistLearnStep` drops a
     * high-water mark from another version, so this replaces the row with 0 against THIS deck's
     * length instead of being swallowed by `Math.max`.
     */
    onPersistStep?.(0, totalSteps);
    onStepChange(0, deckVersion);
    scrollToTop(true);
  }, [sectionId, totalSteps, onPersistStep, onStepChange, deckVersion, scrollToTop, pointer.staleStep]);
  /*
   * The founder, 25 September: "don't show this. make sure it never appears" — the V038 notice
   * ("This topic has been rebuilt … Start again, or jump to the end"). It was about to meet every
   * returning student at once: the checkpoint publish rebuilt 27 sections the same day.
   *
   * So a stale pointer now does, silently, what "Start again" did: it writes step 0 against THIS
   * deck to both records (restartRebuilt's own reasoning, above, for why both) so the stale state
   * cannot recur, and the student simply opens the rebuilt topic at its start. Nothing about their
   * progress is claimed or lost that the notice was preserving — the old index "means nothing in
   * this deck", which is why the notice never offered a Continue. Completion is a separate record
   * (readLocalState().completed) and is untouched, so a student who had finished still sees it.
   *
   * "Jump to the end" is gone with the notice. It existed for a student who had finished; that
   * student's completion already survives, so the only thing it did was move their step pointer.
   *
   * Guarded on `deckVersion`: `resolvePointer` refuses to call a pointer stale before the deck's
   * version evidence has arrived (V038 round 4), so `isRebuilt` cannot fire on a half-loaded page,
   * and the mark makes this run once per section per deck.
   */
  /*
   * The review banner can be dismissed — the founder, 25 Sep: "add an x so users can remove it if
   * they dont want it". For the rest of the day, not forever: a due review is still worth a nudge
   * tomorrow, and the reviews themselves stay due and reachable from the progress screens.
   * Read after mount rather than in the initialiser, so the server render (which has no storage)
   * and the first client render agree; storage can throw in a private window, hence try/catch.
   */
  const REVIEW_BANNER_KEY = 'revvy-review-banner-dismissed';
  const today = () => new Date().toISOString().slice(0, 10);
  const [reviewBannerDismissed, setReviewBannerDismissed] = useState(false);
  useEffect(() => {
    try { setReviewBannerDismissed(localStorage.getItem(REVIEW_BANNER_KEY) === today()); } catch { /* no storage */ }
  }, []);
  const dismissReviewBanner = useCallback(() => {
    setReviewBannerDismissed(true);
    try { localStorage.setItem(REVIEW_BANNER_KEY, today()); } catch { /* no storage */ }
    trackFunnel('review_banner_dismissed', { sectionId, dueReviews });
  }, [sectionId, dueReviews]);

  const autoRestarted = useRef('');
  useEffect(() => {
    if (!isRebuilt || !deckVersion) return;
    const mark = `${sectionId}:${deckVersion}`;
    if (autoRestarted.current === mark) return;
    autoRestarted.current = mark;
    restartRebuilt();
  }, [isRebuilt, deckVersion, sectionId, restartRebuilt]);

  /* F045: keyboard navigation read state through a stale closure and stayed live on the pre-test
     and completion screens, so an arrow key could skip the test or desync the counter. It reads
     refs now, is off on those screens, and ignores keys while focus is inside a widget. */
  const navRef = useRef(navigateToStep);
  navRef.current = navigateToStep;
  const keyState = useRef({});
  keyState.current = { safeStep, totalSteps, showPretest, isComplete };
  useEffect(() => {
    function handleKeyDown(e) {
      const s = keyState.current;
      if (s.showPretest || s.isComplete || !s.totalSteps) return;
      const el = document.activeElement;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable
        || el.closest?.('.lm-recall-card, .lm-quiz-card, .lm-practice-card, .lm-explain-section, .lm-diagram-modal, [role="dialog"]'))) return;
      if (e.key === 'ArrowRight' && s.safeStep < s.totalSteps - 1) navRef.current(s.safeStep + 1);
      else if (e.key === 'ArrowLeft' && s.safeStep > 0) navRef.current(s.safeStep - 1);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem('revvy_keyboard_hint_shown')) {
      setShowKeyboardHint(true);
      localStorage.setItem('revvy_keyboard_hint_shown', 'true');
      const timer = setTimeout(() => setShowKeyboardHint(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle completion
  function handleComplete() {
    if (typeof window !== 'undefined') {
      // Server first-class, local as cache. `reviewed: true` advances the interval ladder and sets
      // the next due date server-side, so the schedule survives the browser (F001).
      saveSectionState(subjectId, sectionId, { completed: true, reviewed: true });
      writeLocalState(subjectId, sectionId, { scores });
      if (quizData?.length) {
        try {
          const existing = JSON.parse(localStorage.getItem('revvy_review_schedule') || '[]');
          if (!existing.find(r => r.sectionId === sectionId && r.subjectId === subjectId)) {
            // F017 / F008: ordered by the answer log, worst first, pre-test questions last. See
            // the packet 8 and 9 notes in git history for the full reasoning.
            let pretestKeys = new Set();
            try {
              const raw = localStorage.getItem(`revvy_pretest_${subjectId}_${sectionId}`);
              const pre = raw ? JSON.parse(raw) : null;
              pretestKeys = new Set((pre?.questions || []).map((q) => String(q?.question || '').replace(/\s+/g, ' ').trim()));
            } catch { /* no pre-test recorded, nothing to hold back */ }
            const key = (q) => String(q?.question || '').replace(/\s+/g, ' ').trim();
            const prioritised = orderByPriority(quizData, readAnswerLog(subjectId, sectionId));
            const ordered = [
              ...prioritised.filter((q) => !pretestKeys.has(key(q))),
              ...prioritised.filter((q) => pretestKeys.has(key(q))),
            ];
            existing.push({
              sectionId, subjectId,
              title: currentSection?.title || 'Unknown section',
              optionsShuffled: true, // F074: quizData arrives shuffled; ReviewMode must not shuffle again.
              questions: ordered,
              intervals: [1, 3, 7, 14, 30, 60], currentInterval: 0,
              nextDue: Date.now() + 1 * 24 * 60 * 60 * 1000, lastScore: null,
            });
            localStorage.setItem('revvy_review_schedule', JSON.stringify(existing));
          }
        } catch {}
      }
      recordReview(subjectId, sectionId, null);

      trackFunnel('section_complete', { sectionId, totalSteps });
      signalMoment('section_complete', { sectionId, title: currentSection?.title ?? null });
      onPersistStep?.(totalSteps - 1, totalSteps, { complete: true });
    }
    setIsComplete(true);
    onComplete?.();
  }

  // Funnel events (server-written, signed-in and anonymous).
  useEffect(() => {
    if (contentData?.length) trackFunnel('learn_open', { sectionId, totalSteps });
  }, [sectionId]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (pretestOffered && safeStep === 0) trackFunnel('pretest_offered', { sectionId });
  }, [pretestOffered]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (contentData?.length && !showPretest && !isComplete) trackFunnel('step_view', { sectionId, step: safeStep, totalSteps });
  }, [safeStep, showPretest, isComplete]); // eslint-disable-line react-hooks/exhaustive-deps

  /* The last step's Next finishes the section rather than navigating, so nothing scrolled: the
     student landed on "Topic complete" already scrolled to where the last step's footer had been,
     with the heading and their score off-screen above. Reported by the founder, 16 September. This
     also covers arriving already complete, from a reload or the server's copy of the state. */
  useEffect(() => {
    if (isComplete) scrollToTop(true);
  }, [isComplete, scrollToTop]);

  // Empty state
  if (!contentData?.length) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>&#128218;</div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>No content available for Learn Mode</div>
        <div style={{ fontSize: 14 }}>Content for this section is being prepared.</div>
      </div>
    );
  }

  // Pre-test gate
  if (showPretest && safeStep === 0) {
    return (
      <div className="lm-container">
        <PreTest quizData={quizData} subjectId={subjectId} sectionId={sectionId}
          reservedQuestions={blockQuizQuestions}
          onDone={() => { setShowPretest(false); setPretestOffered(false); setTimeout(scrollToTop, 50); }} />
      </div>
    );
  }

  // Completion screen
  if (isComplete) {
    return (
      <CompletionScreen
        subjectId={subjectId} sectionId={sectionId} currentSection={currentSection}
        contentData={contentData} quizData={quizData} scores={scores}
        onNavigateToQuiz={onNavigateToQuiz} onNavigateToTab={onNavigateToTab}
        onStartMixedReview={onStartMixedReview}
        onScrollTop={scrollToTop}
        onRetry={() => {
          // F006: clear the scores so the second attempt's number means something, on the server too.
          const fresh = EMPTY_SCORES();
          setScores(fresh);
          writeLocalState(subjectId, sectionId, { completed: false, scores: fresh });
          saveSectionState(subjectId, sectionId, { completed: false });
          setIsComplete(false);
          onStepChange(0, deckVersion);
          setTimeout(scrollToTop, 50);
        }}
      />
    );
  }

  // ── Current step data ──
  const step = flatSteps[safeStep];
  const currentDiagram = diagramMap[safeStep];
  const currentPractice = practiceMap[safeStep];
  const currentQuiz = quizMap[safeStep];
  /* Built here rather than in the map, so the map holds template ids and stays stable while the
     attempt counter moves. `quantItem` returns null for an id the registry no longer knows,
     which keeps a renamed template from taking the step down with it. */
  const currentQuantTemplate = quantMap[safeStep];
  const currentQuantAttempt = quantAttempts[currentQuantTemplate] || 0;
  const currentQuant = currentQuantTemplate
    ? quantItem({ sectionId }, currentQuantTemplate, currentQuantAttempt)
    : null;
  const isLastStep = safeStep === totalSteps - 1;
  const progressPct = ((safeStep + 1) / totalSteps) * 100;
  const blockCount = step?.blockCount || contentData.length;
  const chapterLabel = step ? `Chapter ${step.blockIndex + 1} of ${blockCount}` : '';
  const spaced = step?.type === 'checkin' ? spacedFor(safeStep) : null;
  /* One "Report a problem" per step (founder, 25 Sep 2026). A teaching step reports its subsection;
     a check-in or legacy step reports its chapter. The check-in's question and diagram carry their own. */
  const stepItem = step?.type === 'teach' ? step.section : contentData?.[step?.blockIndex];
  const stepReportTarget = step ? {
    surface: 'learn_step',
    sectionId,
    itemId: stepItem?.id ?? null,
    step: safeStep,
    label: `Step ${safeStep + 1} of ${totalSteps}`,
    rendered: {
      stem: step.type === 'teach'
        ? (step.section?.title ?? step.blockTitle ?? null)
        : `Chapter check-in: ${step.blockTitle ?? step.block?.title ?? ''}`,
    },
  } : null;

  // What this check-in actually carries, in the order the page shows it. A chapter with no diagram
  // must not promise one (see the comment beside the sentence below).
  const checkinIntro = (() => {
    if (step?.type !== 'checkin') return '';
    const parts = [
      currentDiagram && 'the diagram',
      currentQuiz && 'a quick question',
      // Named, because a check-in that carries a six-mark calculation and does not say so is
      // the same defect in reverse as promising a diagram there is none of (packet 16).
      currentQuant && 'a calculation',
      spaced && 'one thing from earlier',
    ].filter(Boolean);
    if (!parts.length) return '';
    const list = parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
    // There is no next chapter on the last check-in, and the button under it says "Complete
    // topic". Packet 13.2's Verify B found it on all three sections it walked — on
    // national-income that is exactly where the calculation sits, so the sentence naming the
    // calculation was also the sentence promising a chapter that does not exist.
    return `${isLastStep ? 'Before you finish' : 'Before the next chapter'}: ${list}.`;
  })();

  const practiceCard = (key) => (
    isPracticeVisible(currentPractice, currentUnit?.code)
      ? <InlinePractice key={key} question={currentPractice} onAskTutor={onAskTutor} mode={getPracticeMode(safeStep)}
          onShown={onPracticeShown} onAttempt={onPracticeAttempt} />
      : <PracticeWithheld key={key} />
  );

  return (
    <div className="lm-container" ref={containerRef}>
      {/* Review banner */}
      {dueReviews > 0 && onStartReview && !reviewBannerDismissed && (
        <div className="lm-review-banner">
          <span className="lm-review-banner-icon">&#128337;</span>
          <span className="lm-review-banner-text">{dueReviews} review{dueReviews !== 1 ? 's' : ''} due</span>
          <button className="lm-review-banner-btn" onClick={onStartReview}>Review now</button>
          {onStartMixedReview && <button className="lm-review-banner-mixed-btn" onClick={onStartMixedReview}>Mixed review</button>}
          <button type="button" className="lm-review-banner-close" onClick={dismissReviewBanner}
            aria-label="Hide the reviews reminder for today">&times;</button>
        </div>
      )}

      {/* Resume banner */}
      {!isRebuilt && isResuming && safeStep > 0 && (
        <div className="lm-resume-banner">
          <span className="lm-resume-text">You left off at step {safeStep + 1} of {totalSteps}. Pick up where you left off?</span>
          <div className="lm-resume-actions">
            <button className="lm-resume-continue" onClick={onResumeDismiss}>Continue</button>
            <button className="lm-resume-restart" onClick={() => { navigateToStep(0); onResumeDismiss?.(); }}>Start over</button>
          </div>
        </div>
      )}

      {/*
        * Optional pre-test offer (step 0 only, first visit only).
        *
        * The count is computed by the same function that picks the questions, so the offer cannot
        * promise a number the test does not deliver. It used to say three and show two on the
        * busiest path in the product (packet 16's walkthrough), and V015 would have widened the
        * gap. A section with no unreserved question hides the offer entirely.
        */}
      {/* V038: step 0 asks one question at a time. The rebuilt notice is the one that has to be
          answered first, so the pre-test offer waits until it has been. */}
      {!isRebuilt && pretestOffered && safeStep === 0 && pretestCount > 0 && (
        <div className="lm-pretest-offer" role="region" aria-label="Optional pre-test">
          <div className="lm-pretest-offer-text">
            <strong>Want a quick check first?</strong> {pretestCount === 1 ? 'One question' : `${pretestCount === 2 ? 'Two' : 'Three'} questions`} on what you might already know. Optional, and nothing is marked.
          </div>
          <div className="lm-pretest-offer-actions">
            <button className="lm-pretest-offer-yes" onClick={() => { trackFunnel('pretest_started', { sectionId }); setShowPretest(true); setTimeout(() => scrollToTop(true), 0); }}>
              Test yourself first
            </button>
            <button className="lm-pretest-offer-no" onClick={declinePretest}>
              Just teach me
            </button>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="lm-progress-container">
        <div className="lm-progress-track">
          <div className="lm-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="lm-progress-label">{Math.round(progressPct)}%</span>
      </div>

      {/* Chapter dots (F046): one per chapter, clickable once reached. */}
      {blockCount > 1 && (
        <div className="lm-chapter-dots" role="navigation" aria-label="Chapters">
          {contentData.map((b, bi) => {
            const first = firstStepOfBlock(flatSteps, bi);
            const reached = first <= furthestRef.current;
            const active = step?.blockIndex === bi;
            return (
              <button key={bi} type="button"
                className={`lm-chapter-dot ${active ? 'active' : ''} ${reached ? 'reached' : ''}`}
                title={`Chapter ${bi + 1}: ${b?.title || ''}`}
                aria-label={`Chapter ${bi + 1}: ${b?.title || ''}${active ? ' (current)' : reached ? '' : ' (not reached yet)'}`}
                aria-current={active ? 'step' : undefined}
                disabled={!reached}
                onClick={() => navigateToStep(first)} />
            );
          })}
        </div>
      )}

      <div className="lm-stepper-step">
        <div className="lm-stepper-rail" aria-hidden="true">
          <div className={`lm-stepper-node active ${nodePopped ? 'node-pop step-done' : ''}`}>
            <span>{nodePopped ? '✓' : safeStep + 1}</span>
          </div>
          {!isLastStep && <div className={`lm-stepper-line ${safeStep > 0 ? 'filled' : ''}`} />}
        </div>

        <div className="lm-stepper-content">
          <div className="lm-section-counter-row">
            <div className="lm-section-counter">Step {safeStep + 1} of {totalSteps}</div>
            <div className="lm-counter-actions">
            {stepReportTarget && <ReportProblem key={step?.key || safeStep} target={stepReportTarget} />}
            <div className="lm-more-menu-wrapper">
              <button className="lm-more-btn" onClick={() => setShowMoreMenu(v => !v)} title="More options" aria-label="More options" aria-expanded={showMoreMenu}>⋯</button>
              {showMoreMenu && (
                <div className="lm-more-dropdown">
                  <button className="lm-more-item" onClick={() => { navigateToStep(0); setShowMoreMenu(false); }}>
                    ↺ Restart learning
                  </button>
                  {/* F032: the 'content' tab has no place in the tab bar; the notes are the readable whole. */}
                  <button className="lm-more-item" onClick={() => { onNavigateToTab?.('notes'); setShowMoreMenu(false); }}>
                    ☰ Read the full notes
                  </button>
                </div>
              )}
            </div>
            </div>
          </div>

          {/* The step body remounts per step, which is what runs the enter animation (F046). */}
          <div className="lm-step-body step-enter" key={step?.key || safeStep}>
            {step?.type === 'teach' && (
              <>
                {/* F039/F067: the chapter, above the one heading this step has (F064). */}
                <div className="lm-eyebrow">
                  <span className="lm-eyebrow-chapter">{chapterLabel}</span>
                  <span className="lm-eyebrow-sep" aria-hidden="true">·</span>
                  <span className="lm-eyebrow-title">{step.blockTitle}</span>
                  {step.partCount > 1 && <span className="lm-eyebrow-part">part {step.partIndex + 1} of {step.partCount}</span>}
                </div>
                <h2 className="lm-section-title">{step.section.title}</h2>
                <div className="lm-content">
                  <NoteSection section={step.section} glossaryTerms={glossaryTerms} hideTitle />
                  {/* Its own recall, below the teaching it tests (F036, F038, F066, F100). */}
                  {step.section.recall && (
                    <div className="lm-recall-slot lm-recall-own">
                      <Recall recall={step.section.recall} keyPrefix={`own-${step.key}`} showing="first" pool={fillinPool}
                        onComplete={(ok) => onRecallResult(ok, recallId(step.section.recall, step))}
                        onSkip={() => onRecallSkipped(recallId(step.section.recall, step))} />
                    </div>
                  )}
                </div>
              </>
            )}

            {step?.type === 'checkin' && (
              <>
                <div className="lm-eyebrow lm-eyebrow-checkin">
                  <span className="lm-eyebrow-chapter">{chapterLabel}</span>
                  <span className="lm-eyebrow-sep" aria-hidden="true">·</span>
                  <span className="lm-eyebrow-title">{step.blockTitle}</span>
                </div>
                <h2 className="lm-section-title">Chapter check-in</h2>
                {/*
                  * The sentence names only what this check-in actually carries. A chapter whose
                  * material earns no diagram — 1.3.2's "significance of elasticities" is an argument,
                  * not a drawing — promised one here and then did not show it, which is the same
                  * class of defect as "Three questions" over a two-question pre-test (packet 16).
                  */}
                {checkinIntro && <p className="lm-checkin-intro">{checkinIntro}</p>}
                <div className="lm-content">
                  {currentDiagram && <InlineDiagram diagram={currentDiagram} sectionId={sectionId} />}
                  {currentQuiz && (
                    <InlineQuiz key={`quiz-${safeStep}`} question={currentQuiz}
                      subjectId={subjectId} sectionId={sectionId} stepIndex={safeStep}
                      onResult={onQuizResult} />
                  )}
                  {currentQuant && (
                    <CalculationItem key={currentQuant.id} item={currentQuant}
                      onResult={(result) => onQuantResult(currentQuant.id, result)}
                      onReseed={() => setQuantAttempts(a => ({ ...a, [currentQuantTemplate]: currentQuantAttempt + 1 }))} />
                  )}
                  {currentPractice && practiceCard(`practice-${safeStep}`)}

                  {/* Spaced recall: from an earlier chapter, with the cue that says so (F038, F053). */}
                  {spaced && (
                    <div className="lm-recall-slot lm-recall-spaced">
                      <div className="lm-spaced-cue">
                        <span className="lm-spaced-cue-label">Recall from chapter {spaced.fromBlockIndex + 1}</span>
                        <span className="lm-spaced-cue-title">{spaced.fromTitle}</span>
                      </div>
                      <Recall recall={spaced.recall} keyPrefix={`spaced-${step.key}`} showing="spaced" pool={fillinPool}
                        onComplete={(ok) => onRecallResult(ok, spaced.id)}
                        onSkip={() => onRecallSkipped(spaced.id)} />
                    </div>
                  )}

                  {step.blockTitle && (
                    <ExplainItBackUpgraded key={`explain-${safeStep}`} title={step.blockTitle}
                      sectionId={sectionId} blockIndex={step.blockIndex}
                      onAskTutor={onAskTutor} isPremium={isPremium} onAttempt={onExplainAttempt}
                      rubric={chapterRubric(contentData, step.blockIndex, currentUnit?.code)} />
                  )}
                  {step.takeaway && <TakeawayCard items={step.takeaway} glossaryTerms={glossaryTerms} />}
                </div>
              </>
            )}

            {step?.type === 'legacy' && (
              <>
                <h2 className="lm-section-title">{step.block.title || `Section ${safeStep + 1}`}</h2>
                <div className="lm-content">
                  {step.block.concepts?.map((concept, j) => (
                    <div className="concept-box" key={j} style={concept.accent ? { borderLeftColor: concept.accent } : {}}>
                      <div className="concept-box-title">{concept.title}</div>
                      <div className="concept-box-content">
                        {concept.points && <ul>{concept.points.map((p, k) => <li key={k} dangerouslySetInnerHTML={{ __html: g(p) }} />)}</ul>}
                        {concept.text && <p dangerouslySetInnerHTML={{ __html: g(concept.text) }} />}
                        {concept.formula && <div className="formula-box">{concept.formula}</div>}
                        {concept.formulas?.map((f, k) => <div className="formula-box" key={k}>{f}</div>)}
                      </div>
                      {concept.examTip && <div className="exam-tip"><div className="exam-tip-label">Exam Tip</div>{concept.examTip}</div>}
                    </div>
                  ))}
                  {step.block.examTip && <div className="exam-tip"><div className="exam-tip-label">Exam Tip</div>{step.block.examTip}</div>}
                  {currentDiagram && <InlineDiagram diagram={currentDiagram} sectionId={sectionId} />}
                  {currentQuiz && <InlineQuiz key={`quiz-${safeStep}`} question={currentQuiz} subjectId={subjectId} sectionId={sectionId} stepIndex={safeStep} onResult={onQuizResult} />}
                  {currentQuant && (
                    <CalculationItem key={currentQuant.id} item={currentQuant}
                      onResult={(result) => onQuantResult(currentQuant.id, result)}
                      onReseed={() => setQuantAttempts(a => ({ ...a, [currentQuantTemplate]: currentQuantAttempt + 1 }))} />
                  )}
                  {currentPractice && practiceCard(`practice-${safeStep}`)}
                  {step.block.title && <ExplainItBackUpgraded key={`explain-${safeStep}`} title={step.block.title} sectionId={sectionId} blockIndex={step.blockIndex} onAskTutor={onAskTutor} isPremium={isPremium} onAttempt={onExplainAttempt} rubric={chapterRubric(contentData, step.blockIndex, currentUnit?.code)} />}
                </div>
              </>
            )}
          </div>

          {/* Navigation. Sticky on phones (F093), Next always reachable (F065). */}
          <div className="lm-nav">
            {safeStep > 0
              ? <button className="lm-nav-back" onClick={() => navigateToStep(safeStep - 1)}><span aria-hidden="true">&larr;</span><span className="lm-nav-back-text"> Back</span></button>
              : <span className="lm-nav-placeholder" aria-hidden="true" />}
            <span className="lm-nav-counter" aria-hidden="true">{safeStep + 1} / {totalSteps}</span>
            {!isLastStep ? (
              <button className="lm-nav-next" onClick={() => navigateToStep(safeStep + 1)}>
                Next &rarr;
              </button>
            ) : (
              <button className="lm-nav-complete" onClick={handleComplete}>
                Complete topic &#10003;
              </button>
            )}
          </div>

          {showKeyboardHint && (
            <div className="lm-keyboard-hint">Use <kbd>&larr;</kbd> <kbd>&rarr;</kbd> arrow keys to navigate</div>
          )}
        </div>
      </div>
    </div>
  );
}
