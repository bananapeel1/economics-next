# Packet 50, Verify A, re-verification round 1 (26 Sep 2026)

I did not read `built.md`. I started from `ledger.mjs unverified 50`. It listed two ids, both rejected in round 0:
structure-07 and structure-10.

## Method (different from the fix's)

The runner checks these with regexes (`scripts/packet-50-managing-change.mjs:414-428`, `:589-597`). One is a
blocklist of old titles and a keyword stem per subsection; the other is a blocklist of phrases. Neither can see a
reworded filler misconception or a title that names the words but not the content. So I:

1. Imported `buildContent`/`NOTES` from `scripts/_packet50-content.mjs` myself and diffed block titles,
   takeaways, section titles, misconceptions and notes against `audit/snapshots/packet-50-bundle__business__managing-change.json`.
   Result: 0 diffs, so the bundle is the current source.
2. Read the DB draft through the running app: `curl localhost:3001/api/sections/managing-change?draft=1` (and live
   for contrast). The draft serves the same five blocks, the same 15 misconceptions and the same five notes titles.
   The live version still has the old 2-block content, which is expected because the packet is staged and not published.
3. Read every title, takeaway and misconception by hand.

## Verdicts

- **structure-07 CONFIRMED.** Block 1 is now "Triggers, Effects and Speed of Change" (bundle :9, source
  `_packet50-content.mjs:42`). Its three subsections are What Triggers Change, The Effects of Change, and Time and Speed of
  Change. Takeaways [0], [1] and [2] cover them in order, and notes[0] has the same title (:969). The round-0 title "Why Change
  Happens and How Fast" survives only in code comments, which students never see. The other four block titles each describe
  their three subsections. One weak spot: block 5's title "Contingency Planning: Mitigating Risk" holds the subsection "Is a
  Contingency Plan Worth It?". That is still judging mitigation, so I do not count it as the finding's defect.
- **structure-10 CONFIRMED.** The finding flagged three filler misconceptions, and all three are gone. (a) The section-1
  "disruptive/step change is always better" misconception, which round 0 caught relabelled, is now at :157. It is the opposite
  error with a mechanism: slower is not always safer, and the trigger's speed sets the pace. It ties to the spec's
  "time" key factor and is a real evaluation mistake. (b) Kotter-rigid is gone, along with Kotter. (c) The notes have no
  misconception field in the bundle or in the served draft. I read all 15 new misconceptions, and each one corrects a
  specific wrong belief with a reason. "More contingency planning is always better" (:920) underpins the spec's costs and
  benefits of contingency planning bullet, so it is not filler.

## Check-in answers (CONTENT-GATE, blocking)

Each check-in shows the first unused pinned quiz item (`components/learn-mode/utils.js:111-113`).

- CHECKIN triggers-effects-speed clean. Q3 asks for the online rival as an external trigger. The diagram (payoff curve,
  incremental vs step) says nothing about triggers.
- CHECKIN culture-size-leadership clean. Q8 asks for culture evidence. The diagram shows management layers and
  transformative leadership, not culture.
- CHECKIN managing-resistance clean. Q13 has the key support and training. The diagram's forces are customers, cost,
  vision, 120 posts, pride and rumours, with no training.
- CHECKIN identifying-key-risks clean. Q18's key is "6 against 5". The diagram shows 8, 15 and 12, so no key sits near a diagram number.
- CHECKIN mitigating-risk clean. Q23 is about succession planning. The diagram is the standby-system cost.

The non-check-in Q5 in chapter 1 is close to the diagram's "costs and learning come before gains". Q5 is not rendered
at the check-in, so this does not block.

## Unclaimed but relevant

None. `ledger.mjs packet 50 --open` prints 0 items, and structure-11 and specGap-07 are wont-fix.

Gate: both claimed ids are confirmed and all five check-ins are clean, so the gate can pass on these grounds.
