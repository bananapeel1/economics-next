#!/bin/bash
# Packet 54 fix round 3 — plant each topFix-05 path back (one at a time), expect the runner's new guard to fire, restore byte for byte.
cd "/Users/arongijsel/Claude APP/economics-next-remediation"
R=scripts/packet-54-assessing-competitiveness.mjs
plant() { # file, from, to, expected-substring
  before=$(shasum "$1" | cut -d' ' -f1)
  cp "$1" "$1.abbak"
  python3 - "$1" "$2" "$3" <<'PY'
import sys; p,a,b=sys.argv[1:4]; s=open(p).read(); assert a in s, a; open(p,'w').write(s.replace(a,b,1))
PY
  out=$(node $R 2>&1); code=$?
  cp "$1.abbak" "$1"; rm "$1.abbak"
  after=$(shasum "$1" | cut -d' ' -f1); [ "$before" = "$after" ] || echo "RESTORE MISMATCH $1"
  if [ $code -ne 0 ] && echo "$out" | grep -q -- "$4"; then echo "FIRED  ($4)"; else echo "SILENT ($4) exit=$code"; fi
}
C=scripts/_packet54-content.mjs; A=scripts/_packet54-assessment.mjs
plant $C "'In the year after those accounts, a downturn cuts its operating profit'" "'In the year that follows, a downturn cuts its operating profit'" "relative time anchor names no antecedent"
plant $C "'In the year after those accounts, a downturn cuts its operating profit'" "'Later, a downturn cuts its operating profit'" "downturn item does not anchor"
plant $C "'Sales fall in the year after those accounts," "'Sales fall in the following year," "relative time anchor names no antecedent"
plant $A "'In the year after those accounts, a downturn cuts operating profit, but" "'In the year that follows, a downturn cuts operating profit, but" "relative time anchor names no antecedent"
plant $A "'In the year after those accounts, a downturn cuts operating profit, but" "'Later, a downturn cuts operating profit, but" "extras chain's downturn step does not anchor"
plant $C "would first add interest owed to the bank every month; then, at the year end, the statement of financial position would show gearing pushed higher; and if sales fell in the year after that, the interest would still be owed." "would first add interest owed to the bank every month, even in a year when sales fell; then, at the year end, the statement of financial position would show gearing pushed higher." "narrates falling sales before the year-end gearing"
plant $C "      'Year-end accounts reveal a higher gearing ratio',
      'In the year after those accounts, a downturn cuts its operating profit'," "      'In the year after those accounts, a downturn cuts its operating profit',
      'Year-end accounts reveal a higher gearing ratio'," "out of order"
node $R >/dev/null 2>&1 && echo "CONTROL clean (exit 0)" || echo "CONTROL FAILED"
