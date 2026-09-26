#!/bin/bash
# Packet 56 — A/B the runner's new guards: plant each defect in a module, confirm the runner FAILS
# with the named guard, restore the module byte for byte (cmp), and confirm the clean run passes.
# Backups go to the session scratchpad passed as $1 (never /tmp, never the worktree).
cd "$(dirname "$0")/../../.." || exit 2
BK=${1:?scratch dir}
R=scripts/packet-56-global-industries-mncs.mjs
run() { node "$R" 2>&1 | grep -v "Warning\|Reparsing\|type.: .module\|trace-warnings"; }
plant() { # file, perl substitution, label, expected guard text
  local f=$1 sub=$2 label=$3 want=$4
  cp "$f" "$BK/ab-bak"
  perl -0pi -e "$sub" "$f"
  if cmp -s "$f" "$BK/ab-bak"; then echo "NOT PLANTED  $label"; cp "$BK/ab-bak" "$f"; return; fi
  out=$(run)
  cp "$BK/ab-bak" "$f"
  if echo "$out" | grep -q "$want"; then echo "FIRES        $label"; else echo "SILENT       $label"; echo "$out" | tail -5; fi
}
U=scripts/_packet56-util.mjs; C=scripts/_packet56-content.mjs; A=scripts/_packet56-assessment.mjs; D=scripts/_packet56-diagrams.mjs
for f in $U $C $A $D; do cp $f "$BK/orig-$(basename $f)"; done
plant $C "s/Factory fires and building collapses/The Rana Plaza collapse and other building collapses/" "Rana Plaza in a realExample" "named real case"
plant $C "s/Repatriated profit is a real cost to the host, but/Repatriated profit can exceed the investment, making the host a net loser, but/" "the repatriation fallacy in the BoP body" "repatriation fallacy"
plant $C "s/Goods that were imported and expensive/Transfer pricing aside, goods that were imported and expensive/" "transfer pricing taught in a second subsection" "structure-02"
plant $C "s/The limits: many buyers say they care/Footage spreads widely on social media. The limits: many buyers say they care/" "reorder item printed on its own step" "printed on its own step"
plant $C "s/The \\*\\*balance of payments\\*\\* records all the money/The **current account** records all the money/" "Economics framing (current account)" "Economics framing"
plant $A "s/Explain one impact of/Explain two impacts of/" "Explain two" "topFix-04"
plant $D "s/'Hours, safety and job security matter as well as pay',/'Hours, safety and job security matter as well as pay', 'So small a stake gives no control of the business',/" "check-in key on the chapter-1 diagram" "check-in key"
plant $U "s/const wage = 300;/const wage = 312;/" "wage premium drifts from 25%" "wage premium is not 25%"
plant $A "s/Level 1: knowledge of transfer pricing/Level 1 (2 marks): knowledge of transfer pricing/" "points allocated above 6 marks" "guidance allocates points"
ok=1; for f in $U $C $A $D; do cmp -s $f "$BK/orig-$(basename $f)" || { ok=0; echo "MODULE NOT RESTORED $f"; }; done
[ $ok = 1 ] && echo "modules restored byte for byte"
node "$R" >/dev/null 2>&1 && echo "control: clean run exits 0" || echo "control: clean run FAILS"
