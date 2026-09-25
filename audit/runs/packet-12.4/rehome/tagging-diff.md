# Three-pass tagging — the two re-homed items, against Economics 3.3.2

Packet 12.4, E029. `economies-scale-4` and `econ-diseconomies-scale-8` were filed under 3.3.1 and
examine 3.3.2. Their `sectionNumber` and `sectionTitle` were corrected and they were tagged from
scratch against 3.3.2's 34 leaves. The earlier 3.3.1 verdict — "no agreed tag" — carries no
information here: it was the right answer to a different question.

## Result

| item | pass 1 | pass 2 | pass 3 | written |
|---|---|---|---|---|
| `economies-scale-4` | 1 | 1 | **0** | `ECON-3.3.2-3a` |
| `econ-diseconomies-scale-8` | 4 | 4 | **0** | `3a`, `3f-1`, `3f-2`, `3f-3` |

Passes 1 and 2 agreed exactly, tag for tag. Pass 3 proposed nothing at all.

## Pass 3 is not abstaining here — it is structurally unable to answer

This is the caveat from the main `tagging-diff.md` in its most extreme form, and it is worth showing
the mechanism rather than restating the caveat.

`tag-lexical.mjs` tags a leaf when a question shares at least two stems that are DISTINCTIVE for the
topic (present in at most 40% of its leaves), or one stem unique to a single leaf. Measured:

- `economies-scale-4` reduces to the stems `explain, meant, economy, scale`. **None of them is
  distinctive in 3.3.2**, because subtopic 3 is *about* economies of scale — `economy` and `scale`
  appear in most of its leaves, so the rule that makes the matcher precise everywhere else makes it
  blind exactly here.
- `econ-diseconomies-scale-8` reduces to `examine, firm, experience, diseconomy, scale`. Only
  `diseconomy` is distinctive, and it is not unique to one leaf, so one distinctive stem is not
  enough to fire.
- The target leaves say `communication problems`, `coordination problems` and `X-inefficiency`. The
  question says "the reasons why a firm might experience diseconomies of scale". **They share no
  content stem at all.** A student knows those three ARE the reasons; a stem matcher cannot.

So "two of three passes agreed" is technically true and materially misleading for these five tags:
the third instrument could not have agreed whatever the answer was. Recording that is the point of
this file.

## What was done about it instead

A fourth reader adjudicated all five written tags blind, shuffled among four negative controls drawn
from 3.3.2's own leaves that no pass proposed. It never saw which was which.

| group | pairs | judged "examines" |
|---|---|---|
| **the five written tags** | 5 | **5** |
| negative controls | 4 | **0** |

The controls are what make that meaningful: an adjudicator agreeing with everything would have
scored 4 of 4 on requirements about marginal revenue, total variable cost, average cost and external
economies, and it scored none of them. A hand-check by the packet author would have been pass 1
re-reading pass 1; this is not.

## The one tag worth challenging later

`ECON-3.3.2-3a` on `econ-diseconomies-scale-8` — "The relationship between long-run cost curves and
economies/diseconomies of scale". The question asks for the *reasons*, which are `3f-1` to `3f-3`;
`3a` is the cost-curve relationship an eight-mark "Examine" has to establish before it can analyse
them. Both reading passes proposed it independently and the blind adjudicator confirmed it, so it is
written — but of the five it is the one whose removal would be defensible.

## What no pass proposed, and why that is correct

`economies-scale-4` ends "and give an example". The examples live in `3d-1`..`3d-6` (financial,
technical, managerial, marketing, purchasing, risk bearing) and `3e-1`..`3e-3` (skilled labour,
transport links, shared knowledge). The question names none of them, so it examines any one of nine
rather than a particular one, and no leaf among them is tagged. This is the same rule applied to
"two factors" questions throughout the main pass: a question answerable from any member of a set
does not examine a specific member.
