#!/bin/bash
# Packet 47 — A/B of the runner's new checks: plant each defect in a module, confirm the runner
# fails with the expected message, restore, confirm it passes. Run from the worktree root.
set -u
run() { node scripts/packet-47-global-markets-expansion.mjs 2>&1 | grep -v -i "warning\|reparsing\|eliminate\|trace-warnings"; }
ab() { # file, perl substitution, expected text
  local f="$1" sub="$2" want="$3"
  cp "$f" "$f.ab-bak"
  perl -0pi -e "$sub" "$f"
  if cmp -s "$f" "$f.ab-bak"; then echo "NOT PLANTED  $want"; mv "$f.ab-bak" "$f"; return; fi
  if run | grep -q -- "$want"; then echo "FIRES        $want"; else echo "SILENT (BAD) $want"; fi
  mv "$f.ab-bak" "$f"
}
ab scripts/_packet47-content.mjs 's/Students treat any reason for going abroad/The Bartlett view treats any reason for going abroad/' 'Bartlett-Ghoshal'
ab scripts/_packet47-assessment.mjs "s/pr\(B2, 'Assess', 12,/pr(B2, 'Assess', 10,/" 'Appendix 6 gives 12'
ab scripts/_packet47-diagrams.mjs 's/Compare delivered cost per unit, never the wage alone/Compare delivered cost per unit: \$16 at one site/' 'key figure $16'
ab scripts/_packet47-content.mjs 's/Five factors are used to judge a country as a market:/The specification lists five factors:/' 'specification as the SPEAKER'
ab scripts/_packet47-assessment.mjs 's/title, mistake, correction, examTip \}\)/title, mistake, fix: correction, examTip })/' 'has no `correction`'
ab scripts/_packet47-content.mjs "s/type: 'reorder',\n    prompt: 'Put these in the order they happen, from the decline at home to the longer life:',\n    criterion: 'chronological: each stage follows the one before it in time',\n    correctOrder: \[\n      'Customers at home switch to newer models and the product\\\\'s sales there start to fall',/type: 'reorder',\n    prompt: 'Put these in the order they happen, from the decline at home to the longer life:',\n    criterion: 'chronological: each stage follows the one before it in time',\n    correctOrder: [\n      'The firm licenses the design abroad',/" 'entry-mode ladder'
ab scripts/_packet47-assessment.mjs "s/Explain one push factor that may have led/Explain a push factor that may have led/" 'not \"Explain one'
echo "--- clean run after restore:"; run | grep -c "check.*failed" ; run | sed -n 2,4p
