#!/bin/bash
# PACKET 45 — mutation A/B of the runner. Copies the runner and its four modules into a scratch dir,
# plants ONE defect per run, and records whether the runner fails with the expected message.
# Run from the worktree root. The real modules are never edited.
ROOT="$(pwd)"
AB="$ROOT/audit/runs/packet-45/ab"
run() { # $1 name, $2 file, $3 perl substitution, $4 expected message fragment
  rm -rf "$AB"; mkdir -p "$AB"
  for f in _packet45-util.mjs _packet45-content.mjs _packet45-assessment.mjs _packet45-diagrams.mjs packet-45-labour-markets.mjs; do cp "scripts/$f" "$AB/$f"; done
  perl -pi -e "s#'\./_content-write\.mjs'#'$ROOT/scripts/_content-write.mjs'#; s#'\.\./lib/content-validator\.mjs'#'$ROOT/lib/content-validator.mjs'#" "$AB/packet-45-labour-markets.mjs"
  if [ -n "$2" ]; then perl -0pi -e "$3" "$AB/$2"; if cmp -s "$AB/$2" "scripts/$2"; then echo "SETUP FAIL  $1: mutation did not apply"; return; fi; fi
  out=$(node "$AB/packet-45-labour-markets.mjs" 2>&1); code=$?
  if [ -z "$2" ]; then [ $code -eq 0 ] && echo "PASS  clean copy exits 0" || echo "FAIL  clean copy exits $code"; return; fi
  if [ $code -ne 0 ] && echo "$out" | grep -qF -- "$4"; then echo "PASS  $1 (exit $code, \"$4\")"; else echo "FAIL  $1 (exit $code; expected \"$4\")"; fi
}
run clean "" "" ""
run accuracy-01 _packet45-content.mjs 's/(title: .Why Two Occupations Pay Differently.,\n\s+keyIdea: .)/$1Wages differ not because markets are failing. /' "accuracy-01 regressed"
run uncited-monopsony _packet45-content.mjs 's/(Some unions insist on long apprenticeships)/A monopsony pays less. $1/' "a pointer without its topic number"
run typed-spine _packet45-util.mjs 's/const dA = 60, dB = 2;/const dA = 61, dB = 2;/' "the spine is no longer"
run define-4 _packet45-assessment.mjs "s/pr\(B1, 'Define', 2, \"Define the term 'derived demand' as it applies to labour. \(2 marks\)\"/pr(B1, 'Define', 4, \"Define the term 'derived demand' as it applies to labour. (4 marks)\"/" "Define (4)"
run printed-key _packet45-assessment.mjs "s/\['\\\$16', '\\\$60', '\\\$35', '\\\$8'\]/['\\\$14', '\\\$60', '\\\$35', '\\\$8']/" "printed-answer leak"
run parallel-flow _packet45-content.mjs "s/\{ title: 'Fewer can do the job', subtitle: 'At every wage rate' \}/{ title: 'In a competitive market', subtitle: 'Jobs fall' }/" "structure-08"
run backward-bending _packet45-content.mjs 's/(Students shift the supply curve right when the wage rises\.)/$1 The backward-bending curve is different./' "backward-bending"
run opening-figure _packet45-assessment.mjs 's/(Two factors, each with its reason\.)/$1 Aim for 4 points./' "carries a figure"
run no-discuss _packet45-assessment.mjs "s/pr\(B5, 'Discuss', 14,/pr(B5, 'Examine', 8,/" "14-mark Discuss part"
run missing-why _packet45-content.mjs "s/'The chain starts with the union\\\\'s rule on entry.',\n//" "why lines against"
run label-collision _packet45-diagrams.mjs "s/g\.wageLine\(L\.eq\.W, CYAN, 'S = W'\),/g.wageLine(L.eq.W, CYAN, 'S = W') + t(340, 166, 'X label', { size: 12 }),/" "overlap"
rm -rf "$AB"
