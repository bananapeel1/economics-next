#!/bin/bash
# Packet 55 — A/B the runner's new guards: plant each defect in a module, confirm the runner FAILS
# with the named guard, restore the module byte for byte (cmp), and confirm the clean run passes.
cd "$(dirname "$0")/../../.." || exit 2
R=scripts/packet-55-global-marketing.mjs
run() { node "$R" 2>&1 | grep -v "Warning\|Reparsing\|type.: .module\|trace-warnings"; }
plant() { # file, perl substitution, label, expected guard text
  local f=$1 sub=$2 label=$3 want=$4
  cp "$f" "$f.ab-bak"
  perl -0pi -e "$sub" "$f"
  if cmp -s "$f" "$f.ab-bak"; then echo "NOT PLANTED  $label"; mv "$f.ab-bak" "$f"; return; fi
  out=$(run)
  mv "$f.ab-bak" "$f"
  if echo "$out" | grep -q "$want"; then echo "FIRES        $label"; else echo "SILENT       $label"; echo "$out" | tail -5; fi
}
C=scripts/_packet55-content.mjs; A=scripts/_packet55-assessment.mjs; D=scripts/_packet55-diagrams.mjs
cp $C /tmp/p55c.$$ ; cp $A /tmp/p55a.$$ ; cp $D /tmp/p55d.$$
plant $C "s/An instant-noodle brand keeps/Hofstede would say an instant-noodle brand keeps/" "Hofstede in a realExample" "Hofstede and his dimensions"
plant $C "s/a third more, yet/a quarter more, yet/" "\"a quarter more\" for a third" "a third more"
plant $C "s/The gain is scale\./Research the new market culture, tastes and rules. The gain is scale./" "reorder item printed on its own step" "printed on its own step"
plant $A "s/\['product and price', 'place and promotion', 'price and promotion', 'product and place'\]/['price', 'place and promotion', 'price and promotion', 'product and place']/" "sachet keyed Price alone" "quiz-01"
plant $A "s/Explain one way Ansoff/Explain two ways Ansoff/" "Explain two ways" "topFix-05"
plant $D "s/'Moving right buys local fit at the price of the scale saving',/'Moving right buys local fit at the price of the scale saving', 'Eight countries: one campaign saves \\\$0.8m',/" "check-in key on the chapter-1 diagram" "check-in key"
plant $A "s/Level 1: names cultural or social factors/Level 1 (2 marks): names cultural or social factors/" "points allocated above 6 marks" "guidance allocates points"
cmp -s $C /tmp/p55c.$$ && cmp -s $A /tmp/p55a.$$ && cmp -s $D /tmp/p55d.$$ && echo "modules restored byte for byte" || echo "MODULE NOT RESTORED"
rm -f /tmp/p55c.$$ /tmp/p55a.$$ /tmp/p55d.$$
run > /dev/null; node "$R" >/dev/null 2>&1 && echo "control: clean run exits 0" || echo "control: clean run FAILS"
