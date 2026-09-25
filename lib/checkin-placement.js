import { matchDiagramsToBlocks, resolvePinnedItem, resolvePinnedDiagram, fallbackItemForBlock }
  from '../components/learn-mode/utils.js';
import { decidedNoQuestion } from './checkin-fallback.js';

/**
 * Where a chapter's quiz question, worked example and diagram come from. ONE copy, called by both
 * the client and the guard.
 *
 * WHY IT LIVES HERE RATHER THAN INSIDE LearnModeTab. It used to be a `useMemo` body in the
 * component, which meant anything that wanted to check the placement had to rebuild the branching
 * itself — and `audit/scripts/exposure-census.mjs` says what that costs: "A census that
 * reimplements the client tests the reimplementation." The first draft of
 * `audit/scripts/checkin-attribution.mjs` did exactly that, and would have gone on passing if the
 * component had started distributing positionally again, because the guard's copy of the branch
 * would not have changed with it. A guard that duplicates the logic it guards is not a guard.
 *
 * So the component and the guard now import this function, and the branch below is the only
 * statement anywhere about which item a chapter shows.
 *
 * @param {object}  args
 * @param {Array}   args.flatSteps      from lib/learn-steps.js buildSteps()
 * @param {Array}   args.contentData    the section's blocks
 * @param {Array}   args.diagramsData
 * @param {Array}   args.quizData
 * @param {Array}   args.practiceData   unsorted; this function sorts by marks, as the client did
 * @returns {{diagramMap: object, quizMap: object, practiceMap: object}} keyed by FLAT step index
 */
export function placeChapterItems({ flatSteps, contentData, diagramsData, quizData, practiceData }) {
  const sortedPractice = [...(practiceData || [])].sort((a, b) => a.marks - b.marks);
  const dMap = {}, qMap = {}, pMap = {};
  if (!flatSteps.length) return { diagramMap: dMap, quizMap: qMap, practiceMap: pMap };

  const slots = flatSteps.map((s, i) => ({ s, i })).filter(({ s }) => s.type === 'checkin' || s.type === 'legacy');
  const hasRefs = slots.some(({ s }) => s.diagramRef || s.quizIndices || s.practiceIndices || s.diagramId || s.quizIds || s.practiceIds);

  if (hasRefs) {
    const usedDiagrams = new Set();
    const usedQuiz = new Set();
    const usedPractice = new Set();

    slots.forEach(({ s: step, i: idx }) => {
      if (step.type !== 'checkin') return;
      const diagram = resolvePinnedDiagram(diagramsData, { id: step.diagramId, ref: step.diagramRef }, usedDiagrams);
      if (diagram) dMap[idx] = diagram;
      const quiz = resolvePinnedItem(quizData, { ids: step.quizIds, indices: step.quizIndices }, usedQuiz);
      if (quiz) qMap[idx] = quiz;
      // practiceIndices are authored against the RAW practiceData order (F013, F040, F111).
      const practice = resolvePinnedItem(practiceData, { ids: step.practiceIds, indices: step.practiceIndices }, usedPractice);
      if (practice) pMap[idx] = practice;
    });

    // Title fallback, per block (F041): fills only slots left empty by a failed or absent ref,
    // and only from diagrams no block has claimed, so it can never displace a pin that worked.
    const unclaimed = (diagramsData || []).map((d, di) => ({ d, di })).filter(({ di }) => !usedDiagrams.has(di));
    if (unclaimed.length) {
      const remaining = slots.filter(({ s, i }) => s.type === 'checkin' && !dMap[i]);
      const byTitle = matchDiagramsToBlocks(unclaimed.map(({ d }) => d), remaining.map(({ s }) => ({ title: s.blockTitle })));
      for (const [localIdx, diagram] of Object.entries(byTitle)) {
        const slot = remaining[Number(localIdx)];
        if (slot && !dMap[slot.i]) dMap[slot.i] = diagram;
      }
    }

    // The same fallback for the quiz (V026). A chapter that pins nothing, in a section where the
    // others do, resolved to nothing at all above — for a paying student as well as a free one.
    // It runs after the pins, out of what no pin claimed, so it can never displace one that worked.
    // A chapter whose author pinned an explicit empty list DECIDED there is no question to ask, and
    // is left alone (packet 2.9, `decidedNoQuestion` in lib/checkin-fallback.js says why).
    slots.forEach(({ s: step, i: idx }) => {
      if (step.type !== 'checkin' || qMap[idx] || decidedNoQuestion(step)) return;
      const spare = fallbackItemForBlock(quizData, step.blockTitle, usedQuiz);
      if (spare) qMap[idx] = spare;
    });
  } else {
    /*
     * The unpinned path — 21 of 43 live sections. It used to be
     * `distributeItems(quizData, slots.length)`, which is `map[i] = items[i]`: chapter 1 got
     * question 1 because it was first, not because it was about chapter 1. On
     * `types-sizes-businesses` that served "Which of the following best describes horizontal
     * integration?" at the end of the Business Objectives chapter, three chapters before
     * integration is taught, and the same line placed the worked example. Four other live
     * sections do it: market-structures-contestability serves a chapter-4 question at chapter 1,
     * and government-intervention-firms, global-marketing and global-markets-expansion each
     * serve a chapter-2 question at chapter 1.
     *
     * V026 already settled the principle for the PINNED path and wrote it down in
     * lib/checkin-fallback.js: "the choice is not between a question and a broken promise, it is
     * between a relevant question and one about a different chapter, and the second is worse than
     * a shorter check-in. So: the best match by shared vocabulary, or nothing." The diagram path
     * has refused to "dump on random blocks" since F041. This branch is the one place that rule
     * was never applied, and it is the branch serving half the corpus.
     *
     * So it now uses the same resolution as the pinned path's fallback. `checkinIntro` is built
     * from what the check-in actually carries, so a chapter that resolves nothing does not
     * promise anything — the sentence just gets shorter.
     *
     * READ THIS AS A FLOOR, NOT A FIX. checkin-fallback's own header says the bar is ONE shared
     * non-stop word and gives a case where that still misplaces ("Economic Systems" drawing a
     * scarcity question on `economic` alone). The authored fix is a pin per block;
     * `audit/scripts/checkin-attribution.mjs` fails the build on anything this cannot attribute,
     * so an unpinned chapter is now visible debt rather than a silent wrong answer.
     */
    const byBlock = matchDiagramsToBlocks(diagramsData, contentData);
    slots.forEach(({ s, i }) => { if (byBlock[s.blockIndex]) dMap[i] = byBlock[s.blockIndex]; });

    /*
     * A WHOLLY UNPINNED SECTION NOW SERVES NO QUESTION AND NO WORKED EXAMPLE AT ALL.
     *
     * The title-matching fallback was tried here first, and measuring it is what rejected it.
     * Across these 21 sections it realigned 33 of 52 chapter slots — proof of how wrong the
     * positional map was, since only 6 slots were already showing a question that shared any
     * vocabulary with their own chapter — but on `types-sizes-businesses` it produced:
     *
     *   chapter 1  Business Objectives    -> "Which of the following is a constraint on
     *                                        business growth?"   (matched on `business`)
     *   chapter 3  Growth of Firms        -> "Satisficing behaviour by firms is best
     *                                        explained by:"      (matched on `firms`)
     *
     * Satisficing is a chapter-1 topic. So the fallback swapped a question about chapter 3 for a
     * question about chapter 1, on the strength of one generic noun. checkin-fallback.js's own
     * header predicts this: the bar is ONE shared non-stop word, and it warns to read the rule as
     * "a floor under an unpinned chapter, not a substitute for pinning one". That floor is the
     * right call for ONE unpinned chapter in an otherwise pinned section (V026, above, unchanged)
     * where the section's other pins establish that the bank is chapter-addressed. It is the wrong
     * call for a section with no pins anywhere, because then nothing establishes that at all.
     *
     * So this branch places diagrams only — `matchDiagramsToBlocks` has refused to "dump on
     * random blocks" since F041 and returns nothing without a genuine match — and leaves the
     * question and worked-example slots empty. `checkinIntro` is built from what the check-in
     * actually carries, so nothing promises a question that is not there.
     *
     * THE FIX IS A PIN, AND THIS MAKES ITS ABSENCE VISIBLE INSTEAD OF WRONG.
     * `audit/scripts/checkin-attribution.mjs` fails the build on any served item it cannot
     * attribute to the chapter serving it, so these sections now read as measurable content debt
     * rather than as a student being asked about something three chapters away.
     */
  }
  return { diagramMap: dMap, quizMap: qMap, practiceMap: pMap };
}
