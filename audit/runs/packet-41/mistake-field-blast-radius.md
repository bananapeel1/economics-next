# Correction to packet 41's escalation: the mistakes-field defect is 14 sections, not 10

Written by the packet-41 brain session, 22 September 2026, AFTER the run returned PASSED.
The run's escalation named packets 24, 25, 26, 27, 28, 29, 30, 31, 35 and 36. That list is short by four.

## Method (independent of the run's own probe)

Not `audit/runs/packet-41/mistake-field-ab.mjs` — that is the builder's instrument, and a check that
reuses the implementation cannot see the implementation's blind spot. Instead:

1. `grep -n 'item\.' components/MistakesTab.jsx` — the component prints `item.title` (:85),
   `item.mistake` (:89), `item.correction` (:94) and `item.examTip` (:97). Four fields, no others.
2. `grep -rn looks_like components lib app` — **zero hits.** Nothing in the application has ever
   rendered that field.
3. `grep -rln looks_like scripts/` — the authoring side.
4. Counted `"looks_like"` against `"mistake":` in every `packet-*-bundle*.json` in `audit/snapshots/`,
   i.e. in the STAGED CONTENT, not in the runners that produced it.

## Result

| | |
|---|---|
| Staged bundles authoring the unrendered shape | **14** |
| Mistake cards that render a heading and two empty bodies | **96** |
| Bundles carrying a renderable `mistake` field | **0 of those 14** |

Per bundle: packet 24 (5), 25 (5), 26 (6), 27 (6), 28 (6), 29 (9), 30 (8), 31 (8), **32 (6)**,
**33 (8)**, **34 (7)**, 35 (8), 36 (7), **37 (7)**. The four in bold are the ones the escalation missed.

**Packet 38 is a fifteenth, unconfirmed.** `scripts/_packet38-assessment.mjs:319` authors
`const mk = (title, looks_like, why, instead) => ...`, the same constructor as 24-37, but no
`packet-38-bundle*.json` exists in `audit/snapshots/`, so there is no staged artefact to count. Confirm
it against the `draft` column before assuming either way.

**The window closes at 39.** `packet-39a-bundle` (6), `packet-39b-bundle` (10) and
`packet-41-bundle` (9) all carry the renderable `mistake` field and zero `looks_like`. Whatever changed
between 38 and 39a is the fix; find it before re-staging the fourteen, because it may already be a
shared helper.

## Why nothing caught it

`npm run validate` has no rule that reads mistake field names. Verify A reads the diff and the fields
are internally consistent within each packet. Verify B walks a SIGNED-OUT student, and the Mistakes tab
is a Pro surface — so the one instrument that would have seen a heading over two empty bodies is the
founder's own pass, which is exactly the surface the protocol already names as his one pass per packet.

This is `V035`'s shape. It is not packet 41's to fix elsewhere: packet 41 emits the rendered shape and
its runner parses `MistakesTab.jsx` for the fields it prints
(`scripts/packet-41-external-influences.mjs:670-690`), so it cannot regress. Who re-stages the other
fourteen is a founder decision, and none of them has shipped, so no student has seen an empty card yet.
