# Packet 2.92 — Verify B, on the live site (main session, 25 September 2026, ~14:40 UTC)

Production, not a dev server: `https://revvylearn.com/business/unit-3/business-objectives-strategy`,
Browser pane at 390x844, signed out, no `?draft=1` (production never serves drafts).

What the pins say chapter 1 should show, read from `https://revvylearn.com/api/sections/business-objectives-strategy`
(no cookie): block 0 `diagramId` `business-objectives-strategy:diagram:20953362`, `quizIndices` `[0]` (the served,
remapped index) → `business-objectives-strategy:quiz:97e6dfcb`, `practiceIndices` `[0,1]` → first unused is
`business-objectives-strategy:practice:b6b8622f`.

Seen, step by step:

1. Overview card: "Learn Mode · Free · 42 steps". The section live before 13:53 UTC had 2 chapters; 42 steps is
   7 chapters of the packet-27 rebuild. The rebuild is what is served.
2. Start learning → pre-test offer ("Want a quick check first?") → "Just teach me".
3. Next ×5 through chapter 1's five subsections ("What a Mission Statement Is" … "Critical Appraisal: The Case Against").
4. **Step 6 of 42, "CHAPTER 1 OF 7 · Mission, Corporate Aims and Corporate Objectives — Chapter check-in".**
   - DIAGRAM: "Mission, Corporate Aims and Corporate Objectives", tabs "The chain" / "The critical appraisal". The pinned diagram.
   - QUICK QUIZ: "Corporate objectives are developed from:" with the four options of `quiz:97e6dfcb`
     (key: "the mission statement and the corporate aims"). The pinned question.
   - WORKED EXAMPLE: "Define the term 'corporate objective'." 2 marks, model paragraph, then the Pro lock on the full
     model answer. The pinned practice item.
   - Explain it back, then the chapter takeaway (three ticks).

Console: one error, `POST /api/learn-mode/state → 401`. That route refuses a save from a signed-out reader by design
(`app/api/learn-mode/state/route.js:72`). It is unrelated to pins; seen, not filed. The `/api/events` beacons read
`ERR_ABORTED` with a 204, which is the beacon being cut off by the next request, not a failure.

No Pro pass is needed for V060. A Pro reader's pins are the same array positions in the full bank; the probe
(`live-pins.mjs`, check D) resolves both readers and requires a signed-out check-in to show the same item id as the
Pro one wherever the free slice carries it. It does at all 56 check-ins.
