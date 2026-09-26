# E039 — R7 proved by A/B mutation, and the rendered difference measured

## R7 — `criteria[].segRole` is the literal `'earned'` or `'missed'`

`audit/scripts/validate-model-answers.mjs:123-129` (header `:23`, rationale `:36-39`). Runs inside
`npm run validate` (the script is already the second command of `validate` in `package.json`).

Method: `audit/runs/packet-12.7/mutate-ab.sh`. Unlike 12.6's script it never edits the shared
worktree: it copies `data/`, `lib/`, `content/data-response/` and the validator into a scratch tree,
mutates the COPY by exact string replacement (asserting one occurrence), runs the validator there,
reverts, runs again, and finally `cmp`s the reverted copy against the worktree file. Full stdout:
`ab-r7-*.log`; transcript: `mutate-ab.log`.

| Run | Mutation | Exit | Finding |
|---|---|---|---|
| control | none | 0 | 0 findings |
| A mutated | 8-mark `c7`: `segRole: 'missed'` removed | 1 | `R7 negative-externality-tax-8 criterion c7 has segRole (absent)` |
| A reverted | restored | 0 | 0 findings |
| B mutated | 8-mark `c7`: `'missed'` → `'Missed'` | 1 | `R7 … criterion c7 has segRole "Missed"` |
| B reverted | restored | 0 | 0 findings |
| C mutated | new Evaluate 20 `c20`: `'earned'` → `'partial'` | 1 | `R7 mf-extract-evaluate-soft-drinks-excise-20 criterion c20 has segRole "partial"` |
| C reverted | restored | 0 | 0 findings |
| byte check | reverted copy vs worktree `data/modelAnswersExpansion.js` | — | identical |

**B-side (the rule, not the data, is what fires):** HEAD's validator (`git show HEAD:audit/scripts/validate-model-answers.mjs`)
run on mutation A → exit 0, "0 findings". Without R7 the absent role passes.

## Rendered difference — measured, not eyeballed

Dev server on :3001 (this worktree), Browser pane tab emulated at **390x844** and then **1280x800**,
page `/economics/market-failure-model-answers`, 8-mark item, criteria `c6` (earned, seg `p3b`) and
`c7` (missed, seg `p4a`) ticked with `input.click()` (not a real tap — the tab was in the background).
Values are `getComputedStyle` / `getBoundingClientRect`:

| | 390x844 earned `p3b` | 390x844 missed `p4a` | 1280x800 earned | 1280x800 missed |
|---|---|---|---|---|
| class | `is-marked is-earned` | `is-marked is-missed` | same | same |
| `border-left-style` | solid | **dashed** | solid | **dashed** |
| `border-left-width` | 3px | 3px | — | — |
| `border-left-color` | rgb(111,168,255) | rgb(111,168,255) — **same colour** | same | same |
| background | rgb(26,29,43) | rgb(26,29,43) — **same** | — | — |
| label text | "Earned" | "Missed — this is where it goes" | same | same |
| label box (left–right, height) | 94–144, 16 | 94–303, 16 | 311–361, 16 | 311–520, 16 |
| segment box (left, width / left–right) | 81, 248 | 81, 248 | 298–996 | 298–996 |

Colour and background are identical between the two roles; the only differences are the text label
and the line style, which is what "without relying on colour" asks for. Label fits inside its
segment at both widths (one line, 16px high); `documentElement.scrollWidth` = 390 at 390 wide.
Console errors on the page: none. Not measured: a real touch tap, light theme (the pane rendered the
dark tokens), widths other than 390 and 1280.
