#!/bin/zsh
# E033 proof standard. For R1, R2 and R4: mutate the retrofitted data, run `npm run validate`,
# record the exit code and the message; revert with the exact inverse edit; run it again.
# Six runs, three mutations. Nothing here touches git — the revert is a string replacement, so a
# concurrent session's staged work in these files is never read and never restored over.
set -e
cd "$(dirname "$0")/../../.."
OUT="audit/runs/packet-12.6"

run() {  # run <label>
  set +e
  npm run validate > "$OUT/ab-$1.log" 2>&1
  local code=$?
  set -e
  echo "--- $1: exit $code"
  grep -E '^  R[1-6] ' "$OUT/ab-$1.log" || true
}

edit() {  # edit <file> <from> <to>
  python3 - "$1" "$2" "$3" <<'PY'
import sys
p,a,b=sys.argv[1],sys.argv[2],sys.argv[3]
s=open(p,encoding='utf8').read()
n=s.count(a)
assert n==1, f'{p}: expected exactly 1 occurrence of {a!r}, found {n}'
open(p,'w',encoding='utf8').write(s.replace(a,b))
PY
}

D=data/modelAnswersData.js
E=data/modelAnswersExpansion.js

echo "=== R1 — criteria marks must sum to the item's tariff ==="
edit $D "text: 'Names the spill-over cost as falling on third parties outside the transaction', marks: 1" \
        "text: 'Names the spill-over cost as falling on third parties outside the transaction', marks: 2"
run r1-mutated
edit $D "text: 'Names the spill-over cost as falling on third parties outside the transaction', marks: 2" \
        "text: 'Names the spill-over cost as falling on third parties outside the transaction', marks: 1"
run r1-reverted

echo "=== R2 — every criterion's seg must resolve on the same item ==="
edit $D "marks: 1, seg: 'p1a' }," "marks: 1, seg: 'p1a-typo' },"
run r2-mutated
edit $D "marks: 1, seg: 'p1a-typo' }," "marks: 1, seg: 'p1a' },"
run r2-reverted

echo "=== R4 — the tariff must be legal for THIS subject (10 is legal Business, not Economics) ==="
edit $E "    sectionTitle: 'Market Failure',
    marks: 8," "    sectionTitle: 'Market Failure',
    marks: 10,"
run r4-mutated
edit $E "    sectionTitle: 'Market Failure',
    marks: 10," "    sectionTitle: 'Market Failure',
    marks: 8,"
run r4-reverted
