#!/bin/zsh
# Packet 12.7, E039 — R7 proved by A/B mutation.
# Unlike 12.6's script this NEVER edits the shared worktree: it copies the files the validator reads
# (data/, lib/, content/data-response/, the validator itself) into a scratch tree, mutates the COPY by
# exact string replacement (asserting exactly one occurrence), runs the validator there, reverts, runs
# again. Another session's dev server and index never see a mutated file.
set -e
REPO="$(cd "$(dirname "$0")/../../.." && pwd)"
OUT="$REPO/audit/runs/packet-12.7"
T="$(mktemp -d)/tree"
mkdir -p "$T/audit/scripts" "$T/content"
cp -R "$REPO/data" "$T/data"
cp -R "$REPO/lib" "$T/lib"
cp -R "$REPO/content/data-response" "$T/content/data-response"
cp "$REPO/audit/scripts/validate-model-answers.mjs" "$T/audit/scripts/"
echo '{"type":"module"}' > "$T/package.json"

run() {  # run <label>
  set +e
  (cd "$T" && node audit/scripts/validate-model-answers.mjs) > "$OUT/ab-$1.log" 2>&1
  local code=$?
  set -e
  echo "--- $1: exit $code"
  grep -E '^  R[1-7] ' "$OUT/ab-$1.log" || echo "  (no findings)"
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
E="$T/data/modelAnswersExpansion.js"
C7="text: 'Weighs how large the misallocation actually is, rather than asserting that it exists', marks: 1, seg: 'p4a'"
C20="text: 'States the criterion the judgement rests on and the condition that would reverse it', marks: 1, seg: 'p7b'"

echo "=== control: unmutated copy ==="
run r7-control

echo "=== R7 A — segRole absent (8-mark c7) ==="
edit $E "$C7, segRole: 'missed' }" "$C7 }"
run r7-absent-mutated
edit $E "$C7 }" "$C7, segRole: 'missed' }"
run r7-absent-reverted

echo "=== R7 B — wrong case (8-mark c7: 'missed' -> 'Missed') ==="
edit $E "$C7, segRole: 'missed' }" "$C7, segRole: 'Missed' }"
run r7-case-mutated
edit $E "$C7, segRole: 'Missed' }" "$C7, segRole: 'missed' }"
run r7-case-reverted

echo "=== R7 C — a third literal (new Evaluate 20 c20: 'earned' -> 'partial') ==="
edit $E "$C20, segRole: 'earned' }" "$C20, segRole: 'partial' }"
run r7-literal-mutated
edit $E "$C20, segRole: 'partial' }" "$C20, segRole: 'earned' }"
run r7-literal-reverted

echo "=== byte check: reverted copy equals the worktree file ==="
cmp "$E" "$REPO/data/modelAnswersExpansion.js" && echo "identical"
rm -rf "$(dirname "$T")"
