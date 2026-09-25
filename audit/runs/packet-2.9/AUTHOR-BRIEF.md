# Packet 2.9 — choose one quiz pin and one practice pin per chapter

You are choosing, for each chapter of a live Revvy Learn revision section, which EXISTING quiz item and
which EXISTING practice item the student is shown at the end of that chapter (the "check-in"). You write
nothing but your output file. You do not edit content, the repository or the database.

## Why

These sections pin nothing, so the app used to hand chapter 1 the first item in the bank, chapter 2 the
second, and so on. A student who had just read "Profit Maximisation" was asked about horizontal integration,
three chapters early. The fix is a pin per chapter, chosen by someone who has read the chapter.

## Input

`audit/runs/packet-2.9/sections/<section>.txt` holds, for one section: every chapter's full teaching text
(subsections, key ideas, misconceptions, examples, takeaway), then the quiz bank (`*` marks the keyed
correct option) and the practice bank, each numbered in stored order (`q0`, `q1` … / `p0`, `p1` …).
A "chapter" is one `########## CHAPTER` block.

## The rule for a QUIZ pin on chapter N

An item may be pinned to chapter N only if ALL of these hold:

1. **Taught here.** The keyed correct answer can be reached from what chapter N's text actually says. Quote
   the sentence(s) from chapter N that teach it. "The topic is related" is not enough: if the question
   turns on a fact, formula, definition or term the chapter text does not contain, it fails.
2. **Not early.** It does not need anything taught only in a LATER chapter. It may lean on earlier
   chapters as well as chapter N, but chapter N must be what it is about.
3. **Not untaught.** If the item tests something no chapter of this section teaches (common in these
   legacy banks: e.g. a question on a model the section never mentions), it may not be pinned anywhere.
4. **Once.** An item is pinned to at most one chapter.

If several items qualify, prefer the one that tests the chapter's central idea over a peripheral detail,
and a reasoning item over a recall-of-a-name item. If NONE qualifies, pin nothing for that chapter and say
why, listing the nearest misses and what each lacks. An empty check-in is acceptable; a wrong one is not.

## The rule for a PRACTICE pin on chapter N

The same four rules, applied to the practice question: a student who has read chapters 1..N could write a
creditable answer, and the question is about chapter N. A broad question (e.g. a 20-mark "Evaluate
globalisation") can go on the LAST chapter whose content it needs, and only if the chapters it needs have
actually taught that content; otherwise nowhere. Tariff does not affect eligibility, but the first pinned
chapter shows its item as a fully worked example and the last as an independent attempt, so where two
items qualify equally, prefer marks that rise across the chapters.

## Flag, do not fix

- A quiz item whose keyed answer is wrong or contestable against the chapter text.
- An item that tests content the section never teaches (rule 3) — list every one, pinned or not.
- Anything that says a UK GCE fact where the course is Edexcel International A level (IAL).

## Output

Write ONE JSON file, `audit/runs/packet-2.9/proposals/<group>.json`, shaped exactly:

```json
{
  "<section-id>": {
    "chapters": [
      {
        "block": 0,
        "title": "<chapter title>",
        "quiz": { "index": 3, "id": "<item id>", "evidence": "<verbatim quote from chapter N>", "why": "<one sentence>" },
        "quizNone": null,
        "practice": { "index": 1, "id": "<item id>", "evidence": "<verbatim quote>", "why": "<one sentence>" },
        "practiceNone": null
      }
    ],
    "untaught": [ { "kind": "quiz", "index": 7, "id": "<id>", "what": "<what it tests that no chapter teaches>" } ],
    "flags": [ "<anything else a reviewer should know>" ]
  }
}
```

Use `null` for `quiz`/`practice` when nothing qualifies and put the reason (with near misses) in
`quizNone`/`practiceNone`. `index` is the q/p number in the file; `id` must be copied exactly. Evidence
quotes must be verbatim from the chapter's own text, not paraphrase. Then reply with a one-paragraph
summary: chapters pinned, chapters left empty and why, and the count of untaught items.
