#!/bin/bash
# Packet 53 — A/B of the runner's checks: plant each defect in a module, confirm the runner fails
# with the expected message, restore byte for byte, confirm it passes. Run from the worktree root.
set -u
run() { node scripts/packet-53-influences-business-decisions.mjs 2>&1 | grep -v -i "warning\|reparsing\|eliminate\|trace-warnings"; }
ab() { # file, perl substitution, expected text
  local f="$1" sub="$2" want="$3"
  cp "$f" "$f.ab-bak"
  perl -0pi -e "$sub" "$f"
  if cmp -s "$f" "$f.ab-bak"; then echo "NOT PLANTED  $want"; mv "$f.ab-bak" "$f"; return; fi
  if run | grep -q -- "$want"; then echo "FIRES        $want"; else echo "SILENT (BAD) $want"; fi
  mv "$f.ab-bak" "$f"
}
C=scripts/_packet53-content.mjs; A=scripts/_packet53-assessment.mjs; D=scripts/_packet53-diagrams.mjs
ab $A "s/Strength describes how widely and deeply values are shared\./Strength, in Handy\\\\'s sense, describes how widely values are shared./" 'on an ASSESSED surface'
ab $C "s/Most businesses mix types\./Most businesses mix types, and short-termism is common./" 'short-termism / long-termism'
ab $A "s/Level 1: describes the two models in general terms\./Level 1: describes the two models, or Carroll\\\\'s pyramid, in general terms./" "Carroll's CSR pyramid"
ab $D "s/'Ask who decides, and by what authority'/'values are widely shared and deeply held'/" "is printed on the chapter's diagram"
ab $A "s/pr\(B3, 'Assess', 12,/pr(B3, 'Assess', 10,/" 'Appendix 6 gives 12'
ab $C "s/(Decisions are quick because people already agree on what matters)/Staff at every branch describe the firm in the same words, which is the mark of a strong culture. \$1/" 'recall.recoverable'
ab $C "s/\*\*Internal stakeholders\*\* are inside/Internal stakeholders are inside/" 'topFix-02: internal and external'
ab $A "s/qi\(null, 'In which culture do decisions depend mainly/qi(B1, 'In which culture do decisions depend mainly/" 'names the power culture'
ab $D "s/t\(40, 84, 'Customers'/t(40, 84, 'Keep satisfied'/" 'accuracy-01: a Mendelow quadrant label'
ab $C "s/Identify the stakeholders this particular decision affects/Draw the 2x2 grid for the stakeholders this particular decision affects/" 'accuracy-01: the "draw the 2x2 grid"'
ab $A "s/\['30 to 1', '3 to 1', '300 to 1', '50 to 1'\]/['125 to 1', '3 to 1', '300 to 1', '50 to 1']/" 'key figure 125'
echo "--- clean run after restore:"; run | sed -n 2,4p; run | grep -c "check.*failed"
for f in $C $A $D; do ls "$f.ab-bak" 2>/dev/null && echo "BACKUP LEFT: $f"; done
