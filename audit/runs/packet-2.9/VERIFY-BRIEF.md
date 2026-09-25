# Packet 2.9 — judge each chapter's pinned question, blind

Someone has chosen, for each chapter of a live Revvy Learn revision section, one quiz item and one practice
item to show the student at the end of that chapter. You are checking those choices. You have not been told
why they were chosen, and you should not try to find out: judge each one from the chapter text alone.
You write nothing but your output file.

## Input

- `audit/runs/packet-2.9/sections/<section>.txt` — every chapter's full teaching text, then the whole quiz
  bank (`*` marks the keyed answer) and practice bank, numbered `q0…` / `p0…` in stored order.
- `audit/runs/packet-2.9/verify-input.json` — for each section, each chapter's chosen quiz and practice item
  (index, id and text), or `null` where the chooser left the chapter without one.

## For every chosen item, a verdict

PASS only if all of these hold, and quote the sentence(s) from THIS chapter's text that teach the answer:

1. **Taught here.** The keyed correct answer can be reached from what this chapter's text actually says —
   the fact, formula, definition or term is in the chapter. Related-topic is not enough.
2. **Not early.** It does not need anything taught only in a later chapter.
3. **About this chapter.** Of all the chapters in the section, this is the one it belongs to (it may lean on
   earlier chapters too).
4. **The key is right.** The keyed answer is correct and the chapter text agrees with it.

Otherwise FAIL, naming which rule and why. For a practice item, "taught here" means a student who has read
chapters 1..N could write a creditable answer from what they read.

## For every chapter left empty, and every PASS, look for a better item

- If a chapter has no quiz (or no practice), check every UNCHOSEN item in the bank against rules 1-4. If one
  qualifies, report it as MISSED with its index and the quote.
- If a chosen item passes but an unchosen one is clearly a better test of the chapter's central idea, report
  it as BETTER (advisory — a PASS is still a PASS).

Be adversarial. The failure this packet exists to fix was a question about a different chapter being shown
as though it belonged to this one, and the gates in this repository could not see it because they match
vocabulary. A question that shares a word with the chapter title and tests something the chapter never
teaches is a FAIL.

## Output

Write `audit/runs/packet-2.9/verdicts/<group>.json`:

```json
{
  "<section-id>": [
    {
      "block": 0,
      "quiz":     { "verdict": "PASS|FAIL|NONE", "rule": null, "quote": "<verbatim from this chapter>", "reason": "<one sentence>" },
      "practice": { "verdict": "PASS|FAIL|NONE", "rule": null, "quote": "...", "reason": "..." },
      "missed":   [ { "kind": "quiz|practice", "index": 4, "quote": "...", "reason": "..." } ],
      "better":   [ { "kind": "quiz|practice", "index": 6, "reason": "..." } ]
    }
  ]
}
```

`NONE` means the chooser left that slot empty. Then reply with counts: PASS, FAIL (listed), MISSED (listed).
