# Packet 13.2 — fix round 1

Applied after BOTH verifiers reported, deliberately: the dev server hot-reloads and Verify B was
mid-walk. Seven changes, from four sources. `audit/runs/packet-13.2/fix-round-1.mjs` is the first
four; the rest were applied directly and are listed here.

| # | From | Defect | Fix |
|---|---|---|---|
| 1 | Verify A, unclaimed | **`payback` reached no student.** Its only section has two check-ins, slot 0 was reserved, `arr` took the single free slot, and the Quiz tab takes `templatesForSection(...)[0]` — also `arr`. One of the three templates this packet built rendered nowhere. | `lib/quant-pool.js`: the slot-0 reservation now yields when holding it back would leave a drill unplaced. `decision-making-techniques` → `{0: arr, 1: payback}`. |
| 2 | Verify A, under D020 | An empty `unitCode` skipped the unit check while `subjectFrom('')` defaults to economics, so a Business section arriving without its unit code would be handed `multiplier` on 2.3.4. | `lib/quant-pool.js`: no unit code, no drill. |
| 3 | builder | `QuizTab`'s card had no `key`, so **New figures** redrew the question and left the previous answers in the boxes with the previous marking under them — against `CalculationItem`'s own documented contract. | `key={item.id}`. Re-checked live: stem changes, three inputs empty, marking gone. |
| 4 | builder | The Economics stem **printed the answer to its own first step**: "expect the rate of growth to fall from 5% to 4.1%" over figures whose growth rate is 5%. Since the other two steps carry from step one, the own figure rule was never exercised either. | Only the forecast rate is quoted now; the comparison moved into step three's label. |
| 5 | Verify B, D3 | The multiplier step asks for the answer "to two decimal places" and the worked solution printed `2.5` and `5` — the solution contradicting the instruction beside it. | `multiplier.mjs`: `toFixed(2)` in the solution lines. |
| 6 | Verify B, D2 | A wrong answer with no diagnosis was told `Not correct. MPS + MRT + MPM.` — the method line printed directly above the box it had just been typed into. The only feedback was the sentence the student had been reading while getting it wrong. | `marking.mjs`: `Not correct — the answer is 0.40.` The worked solution is one tap away in any case, so withholding it bought nothing. Units follow the step: `$500m`, `190 units`, `6.25%`. |
| 7 | Verify B, D1 | "Before the next chapter" ran on the **last** chapter's check-in, under a "Complete topic ✓" button — and on `national-income` that is exactly where the calculation sits, so the sentence naming the calculation also promised a chapter that does not exist. | `LearnModeTab`: "Before you finish" on the last step. Verified live: 3/14, 7/14 and 10/14 unchanged, 14/14 now reads "Before you finish: a quick question, a calculation and one thing from earlier." |

## What fix 4 cost, and what caught it

Dropping the forecast sentence from the stem was the first repair, and it took the stem's only
second varying figure with it: **94 distinct stems in 200 draws**, and `quant-check` failed it.
The guard was right — the item was still varied, but the QUESTION a student reads had collapsed.
The shipped fix keeps the forecast in the stem and removes only the rate that was the answer.

## Not fixed, recorded instead

- **V051, minted here against packet 13.3**: `npm run contrast` reads `app/globals.css` only, so
  every CSS module — including `CalculationItem.module.css` — is outside the light-mode guard.
  Verify B measured the card's method line at **2.83:1 in dark mode at 11px**, the lowest-contrast
  text on the page; it is `--text-dim`, used 25× at 9–13px, so it is the token rather than this
  packet, and widening the guard at the end of a packet would turn it red on inherited work. Light
  mode clears 4.5:1 everywhere on the card (lowest 4.90).
- **The Business placement matched on one word** ("market" → "Market Positioning and Orientation"
  rather than the chapter teaching market share). Both are in 1.3.1 and the match is defensible;
  a stricter rule would need a score floor, which is a change to make with more than one example.
- **`attempt` is in-memory only** (Verify A's caveat on D021): a student who presses New figures
  and then reloads gets the original figures back. Persisting it belongs with 13.3's SM-2 queue,
  which is where an attempt count acquires a reason to outlive the page.
- **No entitlement gate**, on either surface. Stated as the founder's in DECISIONS.md rather than
  left as a code comment, which is what Verify A asked for.

## Gate after the fix round

`npm run build` 0 · `npm test` **267/267** (two new placement tests) · `npm run validate` 0 ·
`npm run exposure` 0 · `npm run recalls` 0 · `npm run quant-check` 0 at 200 and at 2,000 draws.
