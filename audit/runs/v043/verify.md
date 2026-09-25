# V043: not a defect. The measurement was a probe calling a function with the wrong arguments

25 September 2026, Opus 5.5. Reads only. No code, content or database changed.

## The claim

V043: "The signed-out pre-test asks about chapters the student has not opened, on 22 of 43 live
sections and 29 of 43 staged … signature is identical everywhere: '2 of 3 — ch2, ch3'."
Source: `audit/runs/packet-38/pretest-ab.mjs`.

## Why the claim is false

`pretest-ab.mjs` works out the check-in questions like this:

```js
checkins.map((s) => resolvePinnedItem(s, payload.quiz, payload.content))
```

`resolvePinnedItem` takes `(items, pin, used)` (`components/learn-mode/utils.js:100`). Its first
line returns null when `items` is not an array, and a step object is not an array. So the probe's
reserved set is **empty on every section**, and the "pre-test" it reports is just the first three
items of the payload. Since V016, those three are **chapter 1's, 2's and 3's check-in questions**.
That is why the signature is always "ch2, ch3", on every section, in both corpora.

The app does not work that way. `LearnModeTab` passes `PreTest` the questions that
`placeChapterItems` placed (`blockQuizQuestions`), and `pickPretestQuestions` leaves all of them
out (V021).

## A/B: same inputs, one argument different (`pretest-chapters.mjs`, output in `pretest-chapters.out.txt`)

| run | live: sections with a later-chapter question (questions) | staged | reserved set empty |
|---|---|---|---|
| A: packet 38's call, signed out | **22 of 43 (44)**, reproduces V043 exactly | 40 of 43 (72) | **43 of 43** in both corpora |
| B: shipping call, signed out | 4 of 43 (6) | 2 of 43 (2) | 21 live (the wholly unpinned sections, which ask no check-in question since packet 2.8), 0 staged |
| B: shipping call, Pro | 4 of 43 (6), **the same sections and the same questions** | 2 of 43 (2) | same |

Other results from run B: no pre-test question is also a check-in question (0 in both corpora), and
signed-out matches Pro on every section. So nothing here depends on the payload or the paywall.
(Staged moved from V043's 29 to 40 under A because packet 2.9 has staged pins since. A's output
depends on the payload's order, not on what the pre-test actually asks.)

## On screen, independent of both probes (390×844, signed out, section state cleared)

`/economics/unit-2/macroeconomic-objectives-policies`, the section that filed V043. The pre-test
the real component rendered (`[data-pretest-q]` text):

- **`?draft=1`**: "Which of these is NOT one of the macroeconomic objectives…", "An economy's nominal
  GDP rises by 4%…", "The objective for inflation is best described as…". This is **B's prediction**
  exactly: three items no chapter pins. A predicted the check-in questions of chapters 1-3
  (`predict-macro-draft.txt`).
- **live**: "Which supply-side policy is classified as interventionist…", "A key weakness of
  supply-side policies…", "If the government simultaneously pursues low inflation and low
  unemployment…". Again **B's prediction** exactly. A predicted the Phillips curve, automatic
  stabiliser and crowding-out check-in questions (`predict-macro-live.txt`).

## What is left, and why it is not this defect

B still finds 4 live and 2 staged sections whose pre-test includes a question pinned to a later
chapter (`residual-live.txt`). The mechanism is content, not the payload: a block that pins two
items (`[2,3]`) asks the first one at its check-in, and the second stays unreserved and sits early
in the bank. It is identical for Pro. DECISIONS 2026-09-15 (packet 15) chose later-chapter
pre-test items deliberately: "Four core items — one each from chapters 3, 4, 5 and 6 — are
deliberately left unpinned, and the first three of those are the pre-test." A pre-test runs before
chapter 1, so every chapter is unopened at that point. The defect the programme guards against is
a pre-test question the check-in asks again (V021), and there are none.

If the founder wants a pre-test drawn only from chapter 1, that is a design change reversing that
decision. It should be a new item, not this one.

## For whoever reads packet 38's evidence next

`audit/runs/packet-38/pretest-ab.mjs` and `pretest-probe.mjs` both make the same call and both
report the empty reserved set as fact. `verify-b.md` §1's "two of the three are pinned to chapters
the student has not reached" is therefore also an artefact. On screen, that section's pre-test
asks three unpinned items.
