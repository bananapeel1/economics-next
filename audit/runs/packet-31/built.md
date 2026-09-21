# Packet 31 — V035, the thirteen empty evaluation cards

**Claimed:** `V035` (high, `feature`→`high`). The only open id on packet 31; the rest of that packet
number belongs to the original `financial-planning` content packet and is confirmed.

## The finding, restated from the artefacts

`ExtrasTab.jsx:126` renders `{point.title}` and `:129` renders `{point.content}`, and nothing else.
Four staged sections author an evaluation frame in a shape the component does not read:

| packet | section | shape | frames | what a student saw |
|---|---|---|---|---|
| 23 | `supply` | `{point, detail}` | 4 | no heading **and** no body |
| 24 | `price-determination` | `{title, points[]}` | 3 | a question, no answer |
| 25 | `market-failure` | `{title, points[]}` | 3 | a question, no answer |
| 27 | `business-objectives-strategy` | `{title, points[]}` | 3 | a question, no answer |

Thirteen frames. Silent: an empty `<p>` throws nothing, which is why V028's sibling crash was found
and this was not.

## The decision: fix the content, not the component

Three packets independently authored `{title, points}`, which is a fair argument that the component
is the odd one out. It is not, and the evidence is in the clean sections. **Packet 28 writes what is
plainly a four-item list as flowing prose on purpose** — "Four questions, and the cost curves only
answer the first two. How far is…? How wide is…?" — and packets 29, 30, 34, 35, 36 and 38 all do the
same. 38 clean frames, one shape. `{title, content}` is the house style, `extras.shape` is BLOCK on
it, and widening the component would have made two shapes canonical and closed nothing.

So the nine `points` arrays were rewritten as prose. Every analytical move in every bullet survives;
nothing was dropped and nothing added beyond the connective tissue that turns a list into a judgement.
Packet 23's four are a pure key rename — its `detail` strings were already prose of the right register
and length (239 chars is the floor across the 38 clean frames; packet 23's are 232–290).

Packet 24's subsidy frame keeps `money(Math.abs(SUBSIDISED.buyerShare))` and `money(SUBSIDY)` as
**live expressions**, not numerals, so they cannot drift from the spine.

## Measurement

`probe-eval-cards.mjs` — does not re-implement `extras.shape` and does not hard-code the field name.
It brace-matches the `displayEvaluation.map` block out of `components/ExtrasTab.jsx` and reads out
every field the component interpolates, splitting heading from body, then renders each staged bundle
frame through React's own child rules (a plain object throws, an array concatenates, null prints
nothing). Packet 2.6's "parse the bound out of the file that owns it", applied to a field name.

```
before   51 frames / 25 bundles   13 EMPTY BODY across 4 sections
after    51 frames / 26 bundles    0 EMPTY BODY
```

**A/B, three ways.**

1. *Negative control I did not construct:* the 38 already-clean frames in packets 14–38 pass untouched.
2. *Planted defects:* `{title, points}` and `{point, detail}` pushed into packet 30's real bundle both
   fire, each with the right diagnosis (the second also reporting `(BLANK TOO)` for the heading).
3. *The independence test that matters:* `ExtrasTab.jsx` was temporarily widened to also render
   `point.detail`. **Without the probe being edited**, it picked up `point.detail`, reported
   `body: content, detail`, and the `{point, detail}` frame stopped firing while `{title, points}`
   still did. The probe reads the shipping file, not my model of it.

**`reach-ab.mjs` — do the guards still reach the rewritten text?** Packet 35's lesson: a content fix
can blind the check on that content, and its gloss guards went to 0 of 3 after a rewrite while the
build stayed green. A phrase pulled from **each runner's own `FREQUENCY_CLAIM` constant** (not a
hand-copied duplicate — packet 35's second lesson) was planted into the first rewritten `content`
string of all four modules. All four runners fired; all four cleared on restore.

**And a guard caught me, which is the point of having them.** Packet 27's `PAPER_PATTERN_CLAIM`
rejected my sentence "…rarely settles **a question** about this firm, and the case **usually**…" as an
uncited claim about how papers are built. A coincidental collision — I meant "question" in the
ordinary sense — but the phrasing is genuinely ambiguous to a student too, and the runner refused to
stage until it was reworded. Note the shape: **the original bullet was clear, and joining bullets into
prose created the collision.** Any packet flattening a list should expect this.

**`draft-drift.mjs` — what else would re-staging change?** The four modules staged days ago and
`--stage` replaces the whole draft, so a module that drifted since would have shipped a different,
unverified section under a V035 fix. Nothing in the gate could see that: `validate` and `npm test`
read files, Verify A reads the diff, and the runners' own `loadBundle` reads `data`, not `draft`.
The check walks every leaf path of the live `draft` against the rebuilt bundle.

```
pre-stage    supply 16 paths, all inside extras.evaluation   (4 frames x 4 key moves)
             the other three 6 each                          (3 frames x points->content)
             0 paths elsewhere in any of the four
post-stage   0 differing paths in all four
```

**`probe-published.mjs` — the wider class.** The bundle probe can only see sections a packet has
dumped a file for, not the back catalogue published straight into `data`. Swept every
`section_extras` row across **both** columns: **188 frames, 43 sections, 0 empty.** The class is
closed in the database, not only in the four bundles.

## Gate

| step | result |
|---|---|
| `npm run build` | green |
| `npm test` | **240 / 240** |
| `npm run validate` | **structurally blind to this packet — see below** |
| `npm run exposure` | 0 signed-out · 0 signed-in · 0 unwritten |
| `npm run recalls` | no section worse than baseline |
| runners' own gates | 4 / 4 staged; each refuses to stage on any new BLOCK, and `extras.shape` is BLOCK |
| staged → `draft` verified | every field of all four drafts matches its bundle exactly |

**`npm run validate` cannot see this packet, and saying it passed would be dishonest.**
`validate-content.mjs:46` → `validateLive` (`scripts/_content-write.mjs:61`) → `loadBundle`
(`lib/content-gate.mjs:75`) → `.select('data')`. The published column. This packet's change is in
`draft`. Packet 38's point 3, met from the other side. The machine-checked evidence for V035 is the
four runners' own pre-stage gates plus the three probes above, not `validate`.

## Verify B — signed-out walkthrough, 390×844

`?draft=1`, dev server 3001. **The preview cap means a signed-out student meets exactly one
evaluation frame per section** (`PREVIEW_LIMITS.extrasEvaluation`), and in all four sections that one
frame was a V035 frame — so the defect was in front of free users, not only Pro.

- `economics/unit-1/supply` — card 1 now renders both the heading *"How inelastic supply really is
  depends on the period being considered"* and the full paragraph. This was the worst of the
  thirteen: heading blank too. Text fits the 390px frame, no clipping.
- `economics/unit-1/price-determination` — card 1 renders *"How far does the price mechanism allocate
  resources well?"* with the rewritten prose in full, no clipping.

Console: a script-tag warning and a hydration mismatch on both. **Not this packet's** — the untouched
control section `economics/unit-2/revenue-costs-profits` produces the identical pair on load, before
Extras is mounted. Pre-existing, and the known class.

The remaining nine frames are Pro-only and are the founder's one pass: sign in, open Extras on those
three sections, and read cards 2 and 3.

## Verify A — CONFIRMED

`V035` confirmed. The verifier re-derived the count with its own walker over every
`audit/snapshots/*.json` (548 frames, not the probe's corpus) and got the same 13 at HEAD and 0 in
the worktree; planted `{title, points}` back into `_packet24-assessment.mjs` and watched the runner
emit `NEW BLOCK extras.shape` and refuse to stage; queried all 43 `section_extras` rows over both
columns itself; imported all 54 `_packet*` modules and found 61 frames, 0 malformed; and
token-checked all 13 old frames against the new prose — **every analytical point survives, no
numerals hard-coded, both `money()` interpolations still live**. It also corrected the finding's own
citation in the ledger: the reads are `ExtrasTab.jsx:126` and `:129`, not the `150-160` first filed.

**Two of its concerns were acted on in this packet.**

1. **The A/B tested the wrong guard.** `reach-ab.mjs` proves the new prose is reachable by each
   runner's *prose* guards — a different question from whether `extras.shape`, the rule that
   actually closes V035, fires on the shape. Correct, and the gap was in the evidence, not the fix.
   **`extras-shape-ab.mjs` now A/Bs the rule itself** through `validateSection` — the same entry
   point the runners use — over all three defect shapes found in the tree plus the canonical one.

2. **`extras.shape` checked only half the card.** The chains branch has required a `title` since
   V028; the evaluation branch checked `content` alone, so a `{content}`-only frame would pass and
   render a blank heading — **which is half of exactly the defect V035 is named for**, since packet
   23's four frames were blank in both halves. `lib/content-validator.mjs:829-841` now requires
   both, and the A/B confirms packet 23's shape fires on *both* halves where before it fired on one.
   Nothing in the tree fails the new half: 240/240 tests still pass and `npm run validate` reports
   the **same 184** out-of-baseline findings as before the change, with `extras.shape` absent.

**Its third concern is a live ship hazard and is NOT this packet's**, but it is real and should not
be lost: the shared index holds a staged reversion of `components/ExtrasTab.jsx` (blob `3e8cbd3`)
that removes the V028 `chain.steps` guard and reinstates the wrong `(10–14 marks)` tariff. HEAD and
the working tree both hold the correct blob `7a33577`, so nothing is broken now — **but any commit
that takes staged content for that path ships a V028 regression.** This packet never named the path.
Worth clearing before the 5/7 ship checkpoint.

Its fourth concern — that `probe-eval-cards.mjs` reads only the 26 `packet-*-bundle__*` snapshots —
is fair. `probe-published.mjs` closes it over the database (188 frames, 43 sections, both columns)
and the verifier's own full-snapshot scan closes it over the files.
