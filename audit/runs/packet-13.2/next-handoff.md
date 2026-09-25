## Packet 13.2 spec — six drill templates, Learn Mode and the Quiz tab (COMPLETE, 22 September 2026)

Brief, build notes, three fix rounds, four verification rounds and the 390×844 walkthrough:
**`audit/runs/packet-13.2/`**. Closed **D018–D027, D029, D030**; **D028 wont-fix and split** (see 3).
Minted **V051** against packet 13.3.

**Six things the next packet should not have to rediscover.**

1. **THE DEFECT CLASS THIS PACKET ACTUALLY FOUND: a drill that prints its own answer.** Five of the
   eight templates marked a student correct for typing a number they could already see —
   `breakeven` where the variable cost in the stem equalled the contribution (1 draw in 23), `arr`
   and `payback` where a cash flow equalled the figure step one asks for (1 in 21, 1 in 12), `ped`
   where a 25% price rise landed on a new price of $25 (1 in ~160), and
   `percentage-change-economics` where a wrong CHOICE was the right answer (1 in ~20,000, found by
   a verifier counting exhaustively). **Three of them were packet 13.1's, shipped and confirmed.**
   None of `quant-check`'s six original checks could see it: from inside a template every figure is
   correct, and it is the COMBINATION of a correct stem and a correct answer that leaks.
   `quant-check` check 7 now reads the rendered card. **If you add a template, expect to spend the
   time on the draw's rejections, not the prose.**

   **And the rule that took five rounds to state: a number in a CHOICE is never a coincidence.**
   Check 7's first version exempted bare small integers, because "Months into year 4" has to say
   4. `payback` then printed its two-mark months answer in two of three choices on every draw, and
   the exemption hid it. Choices are built from the answers; stems sometimes collide with them.
   The two are scanned differently now, and the same reasoning caught the round-5 case — a choice
   whose answer was named in the label above it.

2. **A probe that enumerates the draw's own parameters cannot find this.** It reuses the filter it
   is testing. `leak-census.mjs` reads the built item's own strings instead — stem, labels,
   prefixes, suffixes, choices — which is why it found four leaks the data-side reasoning had
   missed. The same principle is in `audit/runs/packet-31/probe-reads-shipping-file.md` territory:
   parse what ships.

3. **D028 was confirmed in round 1 and rejected in round 2, and the rejection was right.** It
   asserted two things — chapter matching AND "an unmatched drill never lands on the first
   check-in" — and a fix round traded the second away so `payback` could reach a student at all.
   Round 1's evidence line had stopped describing the file. **An id that asserts two things can be
   half-true, and half-true reads as confirmed.** Split into D029 and D030.

4. **Three of packet 13.1's four templates pointed at sections that do not exist.** `ped` carried
   `1.2.4` and `multiplier` `2.4.2` — UK GCE numbers; every IAL section number has **3 as its middle
   digit**. `breakeven` carried `2.3.1`, a real Business heading and the wrong one. The pool joins a
   template to a section BY spec number, so all three would have rendered nowhere. Every template
   now carries `specLeaf`, `qs` and **`specTerm`** — a phrase the specification uses under its own
   heading — and `lib/quant-pool.test.mjs` asserts it. **A shape check is not enough**: its first
   version passed `breakeven` at 2.3.1 because that heading exists.

5. **`quant-check`'s variety rule used to fail correct templates**, because it asked for 80% of the
   DRAWS to be distinct and sampling D times from V sets can only reach V(1−(1−1/V)^D). It is now
   80% of what sampling can reach, which makes **`variants` load-bearing in two directions**:
   under-declare and you fail `MIN_VARIANTS`, over-declare and you fail the variety floor. `ped`
   declares 1,740 counted by exhaustion, not 2,700 multiplied out.

6. **`quant.unit` is a UNIT-level rule and now reads better than the product is.** One WBS11
   template cleared it for all five WBS11 sections, but only **7 of 43 sections** carry a drill
   (`coverage.txt`). Raising the rule to per-section would print 36 new DEBT findings today — a
   decision, not a fix.

**What 13.2 left for 13.3 and 13.4**, with the reason: the SM-2 queue (`lib/spaced-repetition.js`,
keyed by `item_id` — that is the packet-2 dependency PROGRESS recorded against 13.2, and it belongs
to 13.3), `/calculations-practice`, the `quant_*` funnel events, and the twelve further templates.
**WEC13, WEC14 and WBS14 have no template at all** and are the 15 `quant.unit` keys still baselined.

**Three confirmed ids carry stale evidence, and a verifier should correct them — not a builder.**
`D007` cites `ped`'s variants as `5*3*6*5*6`, now a counted 1,740; `D019` cites
`quant-check.mjs:149-164` for the variety floor, now moved; `D006` cites `:66-79` for the slip
check, also moved. All three still hold in substance. The builder does not rewrite verification
evidence — that is the line this programme drew after a bookkeeping agent authored a fix.

**Four latent weaknesses in check 7, none live today**, all in `verify-a-round-5.md`: a choice
step's answer is skipped everywhere rather than only in its own choices; the small-integer
exemption is defeatable by a bare integer in a stem or by "6 per cent" written in words; the
method-line exemption is enforced by absence rather than by an assertion; the meta chips are not
scanned. Each needs a real case to calibrate against, and there is none yet.

**Carried, not fixed, each with its reason:**
- **V051** — `npm run contrast` reads `app/globals.css` only, so every CSS module is outside the
  light-mode guard. Verify B measured the card's method line at 2.83:1 in dark mode at 11px; it is
  `--text-dim`, used 25× at 9–13px, so it is the token, not this packet. Widening the guard at the
  end of a packet would turn it red on inherited work.
- **`attempt` is in-memory only.** A student who presses "New figures" and then reloads gets the
  original figures back. Persisting it belongs with 13.3's queue, where an attempt count acquires a
  reason to outlive the page.
- **The Business placement matched on one word** ("market" → "Market Positioning and Orientation"
  rather than the chapter teaching market share). Both are in 1.3.1; a score floor needs more than
  one example to calibrate.
- **No entitlement gate on either surface**, stated as the founder's in DECISIONS.md rather than
  left as a code comment.

**Operational, and it is not the packet's:** the machine's disk filled during this session —
**at one point no command could run at all**, because the harness could not create its own output
file. It recovered to ~570 MB free of 228 GB with nothing deleted. `economics-next/.next` is 2.5 GB
and this worktree's is 2.3 GB, both regenerable; the npm cache is 554 MB. **Free space before
starting 13.3**, or its gate will fail somewhere unhelpful.
