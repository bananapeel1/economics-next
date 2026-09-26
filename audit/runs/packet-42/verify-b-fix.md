# Verify B (fix round) — packet 42, targeted re-walk of the scaffolding rewrite

Scope: the one blocking defect Verify B raised — the audit's internal leaf numbering addressed to
the student in `content[].sections[].body[].text`. Everything else about packet 42 was verified
clean earlier and is not re-litigated here.

Signed out, storage cleared, viewport **390x844** (set explicitly; the `mobile` preset is 375x812
and was discarded), dev server `remediation-dev` on port 3001 (already running from another
session; reused, not restarted). Route: `http://localhost:3001/business/unit-2/resource-management?draft=1`.
Nothing was edited, staged or committed by this run except this file.

---

## 1 · The count, on the served draft

The brief asks for a number off the served draft, not an eyeballed sample. Taken from a **fresh
`curl`** of `localhost:3001/api/sections/resource-management?draft=1` (1071 strings), scanned with a
pattern list **written here from Verify B's prose and the brief**, not imported from
`SCAFFOLDING_IN_PROSE` — a check that reuses the implementation cannot see the implementation's
blind spot.

| pattern | pre-fix payload | **served draft now** |
|---|---|---|
| `Leaf <digit><letter>` (the brief's 22) | **22** | **0** |
| `leaf` anywhere in `body[].text` (Verify B's 25) | **25** | **0** |
| `leaf` anywhere in the payload | **30** | **0** |
| `sub-topic` | 2 | **0** |
| the specification *speaking* (`asks/requires/defines/lists/names`) | 3 | **0** |
| a bare clause number as subject (`4d is`, `1e is`) | 23 | **0** |
| `spec point` · `the audit` · `packet N` · ledger ids · oracle ids | 0 | **0** |
| **total, independent scan** | **58** | **0** |

The three circulating figures (22 / 25 / 30) are not a contradiction: they are the same defect
counted with three patterns — capitalised `Leaf Nx`, `leaf` in body text, `leaf` anywhere. All three
are now 0.

**Rendered DOM, independently of the JSON.** All **30 steps** were walked in the browser and each
step's `.lm-container` innerText scanned with the same pattern list: **0 hits, 30 of 30 steps**.
This was scoped to the Learn panel on purpose — `document.body.innerText` starts with the
off-screen SEO block built from the `data` column ("Methods of Production / Job, Batch and Flow
Production"), the trap Verify B named; a whole-page grep reads the pre-packet corpus.

## 2 · Source, and whether the database agrees with it

PROTOCOL gate item 5: a source fix that is not re-dumped leaves the repository agreeing with itself.
Checked both directions:

- **live vs the fix round's post-dump snapshot** — flattened both to leaves and compared field by
  field: **1 of 1108 fields differs, and it is `contentVersionSince`** (`15:50:21.686Z` →
  `15:59:48.576Z`). Content is byte-identical; the row was re-written once more after the dump with
  the same payload.
- **served text vs the builder modules** — all **23** rewritten openers traced back into
  `scripts/_packet42-content.mjs`: 19 present verbatim, the other 4 are template literals whose
  interpolations (`${METHODS.join(', ')}`, `${B.firm}`, `${units(B.bufferInventory)}`) render to the
  served sentence (lines 85, 271, 398, 508). No opener is in the database without a source.
- No `Leaf <digit><letter>` remains in `_packet42-content.mjs` / `-assessment.mjs`. The residual
  matches in `_packet42-util.mjs`, `_packet42-diagrams.mjs` and the runner are **comments, the
  `LEAF_MAP` coverage oracle and the guard's own control strings** — build-time scaffolding that
  never reaches a student.

## 3 · Teaching substance

40 fields changed between the pre-fix and live payloads; the shape of the section did not:

| | pre-fix | live |
|---|---|---|
| chapters | Production, Productivity and Efficiency · Capacity Utilisation · Inventory Control · Quality Management | **identical** |
| subsections per chapter | 10 / 5 / 6 / 5 = 26 | **identical** |
| steps | 30 | **30** |
| quiz served / bank · practice · diagrams · flashcards · notes | 7 of 35 · 10 · 4 · 2 · 4 | **identical** |
| chapter headers, `part n of m`, section titles, step order | — | **identical at all 30 steps** (each row re-read and compared against verify-b.md) |

Changed fields: `body[].text` ×26, `examMatters` ×5, `misconception` ×1, `keyIdea` ×1,
`notes[].keyIdea` ×1, `diagrams[].description` ×1, `extras.evaluation[].content` ×1,
`quiz[].options[]` ×2 + `quiz[].correctIndex` ×1, `contentVersionSince`.

Every rewritten sentence now states the thing itself. No figure disappeared: every number in an
edited string (other than the clause labels themselves) survives into the new text. Samples:

- `Leaf 1a names **four** methods of production` → `There are **four** methods of production: job, batch, flow, cell.`
- `Leaf 2a gives the formula in full` → `The formula in full is **current output ÷ maximum possible output × 100**.`
- `Leaf 3a asks for the **interpretation of an inventory control diagram**` → `**Interpreting an inventory control diagram** means reading four things off a chart…`
- `4d is a competitive advantage leaf` → `This is a competitive advantage question`

No substitute internal word was introduced: `leaf`, `spec point`, `sub-topic`, `the audit` and the
specification-as-speaker are all at **0** in the served draft. The house-style word `leaf` is left
unspent.

## 4 · The class guard (Rule 3)

`scripts/packet-42-resource-management.mjs` holds the ban over `readable` = every string in the
bundle **plus the `<text>` bodies of every SVG**, with no exemption, and pushes to `problems`, which
exits 1 (line 929). Its A/B is in-file and in both directions: 10 positive controls that are the
verbatim sentences that shipped, and 7 negative controls — `leaves` as a verb, and the specification
**quoted** rather than speaking.

Re-ran the A/B harness myself against both payloads:

```
served-pre.json : 35 Rule 3 hits across 35 student-facing strings → GUARD FAILS (defect present)  exit 1
served draft now:  0 Rule 3 hits across  0 student-facing strings → GUARD PASSES (clean)          exit 0
```

So the guard is not blind to the defect it was written for. One scope note, not a defect: it reads
the in-memory bundle at build time, so it protects every future run of the runner but cannot see a
`draft` row written by anything other than the runner. Under PROTOCOL the runner is the only writer,
which is why the field-by-field comparison in §2 was done as well.

## 5 · Measurement (boxes, not eyeballs)

Bounding boxes read with `javascript_tool` at **390px viewport**, for `.lm-section-counter`,
`.lm-more-btn`, `.lm-eyebrow-chapter`, `.lm-eyebrow-title`, `.lm-eyebrow-part`, `.lm-section-title`,
`.lm-progress-label` and the first body block, on **all 30 steps**, pairwise:

- **overlapping pairs: 0 of 30 steps.**
- **boxes crossing the 0–390px viewport edges: 0 of 30 steps.**
- tightest pair anywhere: `.lm-eyebrow-title` ends at x=259.0 and `part n of 10` starts at x=267.0 —
  a **7.8px gap** (step 3, title "Production, Productivity and Efficiency", the longest chapter
  title). Unchanged by this fix; chapter titles were not edited.
- step 1, 390px: counter 82.0px @ y=233.2 · eyebrow chapter 101.8px @ y=272.8 · eyebrow title
  245.0px @ y=296.0 · part 71.1px @ y=297.0 · section title 356.0px @ y=322.8 · body 356.0px @
  y=367.4. `getComputedStyle().width` equals the rect width on every element measured (no 0.92
  artefact; none of these is an overlay).

One screenshot taken, step 1 at 390x844: `STEP 1 OF 30 · CHAPTER 1 OF 4 · Production, Productivity
and Efficiency · part 1 of 10 · "Job and Batch Production"`, KEY IDEA, then the body opening
**"There are four methods of production: job, batch, flow, cell."** The first thing a student reads
is now about production, not about the document.

## 6 · Things seen that are not this defect

1. **The quiz key moved, mechanically.** `quiz[4]` ("Productivity is best described as:") swapped
   options 0 and 1 and `correctIndex` went 0 → 1. The correct text is unchanged
   ("output per unit of input per time period") and its explanation still matches. Cause: the fix
   rewrote one quiz **stem** (`The specification defines efficiency as:` → `Efficiency is defined
   as:`), and `placeKeys` deals the key from a hash rank over the whole 35-item bank, so one stem
   re-ranks the bank. Consequence worth a founder's eye: in the seven served items the key pattern
   went `3,1,1,1,0,0,3` → `3,1,1,1,1,0,3`, i.e. **four consecutive items now key to slot B** where
   there were three. Verify B specifically credited this packet with "the quiz no longer answers B
   every time". Not a content error; a visible side effect of a hash-dealt key.
2. **`quiz[5].question` still reads "…a method of production named in the specification?"** and five
   strings still say "the specification's own wording / own test / own phrase" (misconception ×2,
   practice guidance, quiz explanation, and the question above). These are Rule 3's deliberate
   negative controls — the specification quoted, not speaking — and they are defensible exam-technique
   register. Flagged as a judgment call for the founder, not as a residue of the defect.
3. **Three `401` console errors**, all `POST /api/learn-mode/state` while signed out; the client
   falls back to local storage and the walk was unaffected. Expected anonymous behaviour, unrelated
   to any content change. Otherwise the console is clean: `[HMR] connected` and React DevTools
   notices only. (Verify B reported no console errors; it likely did not advance far enough to fire
   the state POST.)
4. **Pre-existing, untouched, still true:** the sidebar calls the section "Resources"; every step is
   3.5–3.9 phone screens before `Next →`; the inline diagram's smallest label is 9.18 CSS px at
   390px and 12.00 CSS px via `Enlarge diagram` (ruled and accepted by packet 11 / V037).

## Verdict

**The blocking defect is closed, on the served draft, and the class is held.** 22 / 25 / 30 → **0**
on the payload, 0 across all 30 rendered steps, source and database agree field by field (only
`contentVersionSince` differs), the teaching substance and every figure survive, the section is
still 30 steps and 4 chapters with the same headers as verify-b.md, no box overlaps or overflows at
390px, and the guard demonstrably fails on the text that shipped and passes on the text that
replaced it.

Two things for the founder rather than for this run: the quiz key now sits at slot B for four
consecutive served items, and the "specification quoted" sentences that Rule 3 keeps on purpose.
Nothing is published and nothing is committed.
