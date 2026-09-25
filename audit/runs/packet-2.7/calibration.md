# `recall.recoverable` — what the number rests on

Packet 2.7, 19 September 2026. Written because V030's whole finding is that a count printed without its
threshold is not a measurement, and it would be absurd to answer that with another bare count.

## The tier, first, because it changes what the number is for

`recall.recoverable` is **INFO**, not DEBT, and the reason is measured rather than chosen: at DEBT it
reported 20 new findings on packet 29's staged section, 9 on packet 30's, 9 on packet 33's, 4 on packet
36's and 8 on packet 37's, and a content runner's own gate is 0 new DEBT on its own section — so it would
have stopped every content packet in the programme from staging. Seeding the back catalogue into
`audit/validator-baseline.json` does not help, and was tried: 546 keys from both corpora, and every runner
still reported the same findings, because a key fingerprints the object and a runner validates the bundle
it BUILDS, not the row in the database. The baseline was restored unchanged. The gate lives in
`npm run recalls` instead, per section, against `audit/recall-census-baseline.json`. DECISIONS, 19 September.

## The gates

`lib/content-validator.mjs`, `RECOVERABLE_AT`, exported so the census prints the constant rather than a
regex over a comment: **fill-in 0.70 · classify 0.75 · reorder 0.75 · match 0.75.** Packet 29's were 0.85
and 0.95, and the real instances Verify B found on that section score 0.70 and 0.75 — the gate was set
above the thing it was looking for, which is how it reported "0 of 43".

## What it measures

For the recall on subsection S, the visible text of S — `title`, `keyIdea`, every `body[].text`,
`body[].items[]`, `body[].steps[]` and `body[].result`, `realExample.text`, `misconception`, `examMatters`
— read off `components/notes/NoteSection.jsx` and `BodyRenderer.jsx` field by field. Split on `.!?` only,
plus every adjacent pair. Scored with a DIRECTIONAL measure (how much of the *item's* vocabulary the
sentence contains), because the give-away is a long sentence swallowing a short item whole, and jaccard
scores that pairing low.

## Hand adjudication, 19 September

Thirteen instances read against their own screen: seven drawn in id-hash order off the top of the live
hit list, and six drawn from the **marginal band** — the 20 of 241 live hits (8%) whose highest score is
between 0.75 and 0.80, which is where a false positive would live.

| | verdict |
|---|---|
| 7 from the head of the live hit list | **7 genuine.** Four are reorders whose items are the flow steps printed directly above them, two at 1.00; three are fill-ins whose answers are in the key idea |
| 6 from the 0.75–0.80 band | **4 genuine, 2 weak.** Genuine: `measures-economic-performance` "Government increases spending or cuts taxes" against a flow step reading "Government boosts spending or cuts taxes"; `the-market` "Consumers willing to buy more at every price" against "At every possible price, consumers now want to buy more"; `managing-finance` "Minus interest and tax = Net Profit" against "Subtract interest and tax"; `the-market` shift-in-demand. Weak: `macroeconomic-objectives-policies` "Government cuts income tax" and `managing-people` "Short-term performance may improve" — ordinary topic overlap on a four-token item, where 0.75 is three words out of four |

**11 of 13.** The two weak ones are both in the marginal band, which is 8% of hits, so the headline figure
is not sensitive to them. It is stated as a floor and the rule is DEBT, which reports rather than blocks.

## Recall — what it misses, which is more than what it over-reports

Twenty-four live recalls are NOT flagged. Read five: two are genuine retrieval tasks (ranking assets by
liquidity, ordering a 2% inflation target's reasoning — the order is the answer and the screen never gives
it), and three are paraphrase-level give-aways the measure cannot reach: `marketing-mix-strategy`'s
"Business builds direct-to-consumer online channel" against a flow step reading "Business launches direct
online sales" is answerable by scrolling up and scores below the gate.

So: a lexical floor. A paraphrase is invisible to it, and so is anything printed on a different step — the
check-in takeaway, the diagram caption, the Notes tab. **A section at zero has not been cleared; it has
not been caught.**

## The one false-positive class that WAS closed

The first version matched with `String.includes`, so `elastic` was found inside `inelastic` and the phrase
`price elastic` inside the subsection title `Price elasticity of demand`. The base fixture caught it on
the first run. Both clauses now match on word boundaries; it cost one live and one staged instance.

## The A/B — `audit/runs/packet-2.7/ab-table.sh`, which re-runs it

Every clause of the measure is sabotaged in place and the corpus AND the test suite re-run. **The first
version of this table was prose, nothing re-ran it, and four of its five rows did not reproduce** — they
were measured before the >2-word filter and the word-boundary fix moved the baseline from 239/356 to
241/358, and were never re-measured. Verify A re-measured them, got different numbers on four rows, and
rejected the packet. It is a script now, and the numbers below are its output.

| sabotage (the pre-V029 behaviour) | live | staged | tests failing |
|---|---|---|---|
| — none, the measure as built | 241 of 264 | 358 of 667 | 0 |
| split sentences on `[.!?;:]` again | 240 | 346 | 2 |
| drop the adjacent-pair window | 233 | 314 | 2 |
| packet 29's gates, 0.85 / 0.95 | 214 | 287 | 2 |
| read neither `flow.steps`, `flow.result` nor `title` | 230 | 338 | 3 |
| remove the filled-phrase clause | 235 | 321 | 2 |
| units of 4+ words only, as packet 29 filtered | 239 | 356 | 2 |

The column counts TESTS, not fixture cases, and stops at `node --test`'s "failing tests:" line — the
first version counted the inline failures and the summary list twice and reported 2/2/2/4/2/2 for what
were 1/1/1/2/1/1 fixture cases. Two tests is the normal signature: the fixture case for that clause, plus
the corpus control test. Three is the field-list sabotage, which also drops the corpus floor.

**The colon is the smallest of the four reasons, and saying so is the point.** On its own it costs 12
staged instances, because the adjacent-pair window already recovers most give-aways that straddle a
clause boundary; the pair window itself is worth 44. The gates are by far the largest: 0.85/0.95 hides 27
live and 71 staged. V029 named four reasons and was right about all four; they are not the same size.

`node audit/scripts/recall-census.mjs --check` was A/B'd twice: against a planted regression
(`the-market` 11 → 0 in the baseline) it exits 1 naming the section and both numbers, and against a
section with **no** baseline entry — the case Verify A found, where 15 of 43 sections have no `draft` row,
including every section the remaining content packets will write — it now exits 1 saying "no baseline
entry — a new section is held to zero". Before that fix it passed silently, so the gate guarded only the
back catalogue, which is the half already known.

## The controls are real subsections, and the first version's were not

V029's fourth reason is that packet 29's negative control was an invented one-sentence teach paired with a
real recall. The first version of this packet answered it with `audit/fixtures/validator/cases.json` — a
synthetic bundle, SIX of whose ten cases patch the teach text as well as the recall (four patch `keyIdea`
and `body.0.text`, two replace a whole `body`), which is the same pattern one layer down — and wrote in `lib/content-validator.mjs` that "the controls in the test file are
whole subsections out of the corpus." **They were not, and Verify A rejected the packet for the sentence
as much as for the gap.** That is V017 and V020's own finding turned on the packet closing V029.

`lib/content-validator.test.mjs` now A/Bs the measure against whole subsections out of
`audit/content-sections/`, the committed t=0 corpus, named one at a time: four in
`entrepreneurs-leaders` that hand the answer over (`what-entrepreneurs-do`, `creating-running-expanding`,
`barriers-to-entrepreneurship`, `financial-motives`) and six with the same body shapes that do not —
three in the same section (`intrapreneurship`, `skills-and-characteristics`, `conflicts-between-objectives`)
and three in `managing-finance`, which supplies no positive. They are not cherry-picked: the rule fires on
9 of the 12 recalls in one section and 8 of the 11 in the other, so the six are the COMPLETE set of
unflagged recalls in the two (`intrapreneurship`, `skills-and-characteristics`,
`conflicts-between-objectives`, and `managing-finance`'s `interpreting-income-statements`,
`liquidity-ratios`, `external-causes-of-failure`). Plus the corpus floor in this file's own idiom: 249 of
272 on the t=0 corpus, which a weakened measure has to move.

The fixtures keep their job, which is a different one: each pins one CLAUSE so that weakening it fails a
test. Both are needed and the comment now says which is which.

## The design tension this exposes, and it is not a bug

`reorder.source` (DEBT) asks that a reorder's sequence be taught by a flow or an extras chain in the same
section — "a sequence the student was actually taught". `recall.recoverable` fires when that flow is in
the same SUBSECTION, because then it is printed directly above the widget. Both rules are right. The
authoring answer is that the flow lives in one subsection and the reorder in another, or that the reorder
extends the flow rather than restating it. `reorder.source` is section-scoped and this rule is
subsection-scoped precisely so that the two can both be satisfied. **Four of the seven head-of-list hits
are reorders sitting directly under their own flow, so this is the single largest contributor to the
figure.**
