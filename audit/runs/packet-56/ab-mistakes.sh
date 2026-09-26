#!/bin/bash
# Packet 56 — A/B the runner's common-mistakes check (the board's request, 26 Sep): an EMPTY mistake and an
# INVENTED field name must both fail through lib/mistakes-shape.js's mistakeGaps() ("would render without"),
# not only through the older canonical-field check. Restores the module byte for byte (cmp).
cd "$(dirname "$0")/../../.." || exit 2
BK=${1:?scratch dir}
R=scripts/packet-56-global-industries-mncs.mjs
A=scripts/_packet56-assessment.mjs
cp "$A" "$BK/orig-assessment"
plant() { local sub=$1 label=$2
  perl -0pi -e "$sub" "$A"
  if cmp -s "$A" "$BK/orig-assessment"; then echo "NOT PLANTED  $label"; return; fi
  out=$(node "$R" 2>&1); code=$?
  cp "$BK/orig-assessment" "$A"
  if [ $code -ne 0 ] && echo "$out" | grep -q "^.*mistake \"[^\"]*\" would render without"; then echo "FIRES        $label (exit $code): runner: $(echo "$out" | grep -m1 "mistake \"[^\"]*\" would render without" | sed "s/^ *//" | cut -c1-140) | validator: $(echo "$out" | grep -c "NEW BLOCK mistakes.shape") mistakes.shape BLOCK"
  else echo "SILENT       $label (exit $code)"; echo "$out" | grep -i mistake | head -3; fi
}
plant "s/'Describing a firm that sells abroad from its home factories as a multinational.'/''/" "an empty mistake box on card 1"
plant "s/title, mistake, correction, examTip \}\)/title, blunder: mistake, correction, examTip })/" "an invented field (blunder) on every card"
cmp -s "$A" "$BK/orig-assessment" && echo "module restored byte for byte" || echo "MODULE NOT RESTORED"
node "$R" >/dev/null 2>&1 && echo "control: clean run exits 0" || echo "control: clean run FAILS"
