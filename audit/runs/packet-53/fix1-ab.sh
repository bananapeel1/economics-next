#!/bin/bash
# Packet 53 fix round 1 — A/B of the two runner checks this round changed. Run from the worktree root.
set -u
run() { node scripts/packet-53-influences-business-decisions.mjs 2>&1 | grep -v -i "warning\|reparsing\|eliminate\|trace-warnings"; }
A=scripts/_packet53-assessment.mjs; U=scripts/_packet53-util.mjs
shasum $A $U > audit/runs/packet-53/fix1-ab.sha
cp $A $A.ab-bak; cp $U $U.ab-bak
echo "--- B: the PRE-FIX item (median ratio) with this round's runner:"
cp audit/runs/packet-53/fix1-before/_packet53-assessment.mjs $A; cp audit/runs/packet-53/fix1-before/_packet53-util.mjs $U
run | grep "pinned practice" || echo "SILENT (BAD)"
cp $A.ab-bak $A; cp $U.ab-bak $U
echo "--- B: the fixed item with one scheme figure the diagram prints (RM54m) planted:"
perl -0pi -e 's/Adding the bonus to the chief executive/Profit with certified oil is RM54m. Adding the bonus to the chief executive/' $A
cmp -s $A $A.ab-bak && echo "NOT PLANTED"
run | grep "pinned practice" || echo "SILENT (BAD)"
cp $A.ab-bak $A
echo "--- B: every mistake card with its correction dropped (the shipping reader must see the gap):"
perl -0pi -e 's/\{ id: id\(.mistake., title\), title, mistake, correction, examTip \}/{ id: id("mistake", title), title, mistake, examTip }/' $A
cmp -s $A $A.ab-bak && echo "NOT PLANTED"
run | grep -c "lib/mistakes-shape.js reads no the correct approach" || echo "SILENT (BAD)"
cp $A.ab-bak $A
rm -f $A.ab-bak $U.ab-bak
echo "--- A: clean run after restore:"; shasum -c audit/runs/packet-53/fix1-ab.sha; run | grep -c "packet checks failed"
