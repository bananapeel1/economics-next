#!/bin/zsh
# Mutation A/B for the packet 44 runner: each mutant must FAIL, the clean copy must PASS.
W="/Users/arongijsel/Claude APP/economics-next-remediation"
AB="${AB:-$(mktemp -d)}"
prep() {
  rm -rf "$AB/m"; mkdir -p "$AB/m"
  cp "$W"/scripts/_packet44-*.mjs "$AB/m/"
  sed -e "s#'./_content-write.mjs'#'$W/scripts/_content-write.mjs'#" -e "s#'../lib/content-validator.mjs'#'$W/lib/content-validator.mjs'#" "$W/scripts/packet-44-aggregate-supply.mjs" > "$AB/m/runner.mjs"
}
run() { (cd "$W" && node "$AB/m/runner.mjs" 2>&1 | grep -v "MODULE_TYPELESS\|Reparsing\|eliminate this\|trace-warnings"); }
check() { # name, expected-substring
  out=$(run); code=$?
  if echo "$out" | grep -q "packet check.* failed\|refusing"; then
    if echo "$out" | grep -qi -- "$2"; then echo "FIRES  $1"; else echo "FIRES-OTHER $1 :: $(echo "$out" | grep '^  - ' | head -2)"; fi
  else echo "MISSED $1"; fi
}
prep; out=$(run); echo "$out" | grep -q "packet checks" && echo "CLEAN  passes" || echo "CLEAN  FAILS"
prep; perl -0pi -e "s/A food-processing|Every firm in \\\$\\{E.country\\}/In 2022 UK firms in \\\${E.country}/" "$AB/m/_packet44-content.mjs"; check "M1 year+UK in an example" "a year"
prep; perl -0pi -e "s/The slope is a short-run property\./The slope is a short-run property; an output gap opens./" "$AB/m/_packet44-content.mjs"; check "M2 uncited output-gap pointer" "pointer without its topic number"
prep; perl -0pi -e "s/const capProd = round0\(\(labour \* 1e6 \* perWorkerProd\) \/ 1e9\);/const capProd = 830;/" "$AB/m/_packet44-util.mjs"; check "M3 a typed LRAS figure" "productivity: capacity"
prep; perl -0pi -e "s/'Its labour force is ___ million\.',/'Its labour force is ___ million and ___ in work.',/" "$AB/m/_packet44-content.mjs"; check "M4 two blanks on one line" "two blanks"
prep; perl -0pi -e "s/pr\(B1, 'Define', 2,/pr(B1, 'Define', 4,/" "$AB/m/_packet44-assessment.mjs"; check "M5 Define (4)" "Define"
prep; perl -0pi -e "s/const captions = \(a, b, colour = MUTED\) => t\(16, L.cap1/const captions = (a, b, colour = MUTED) => t(300, L.xTitle + 4, 'overlap') + t(16, L.cap1/" "$AB/m/_packet44-diagrams.mjs"; check "M6 a colliding label" "overlap"
prep; perl -0pi -e "s/'ECON-2.3.3-3b-6': \['competition-policy'\],/'ECON-2.3.3-3b-6': ['productivity'],/" "$AB/m/_packet44-content.mjs"; check "M7 a leaf mapped to a subsection that never says it" "never say"
prep; perl -0pi -e "s/qi\(B5, 'Which of these would shift LRAS to the left\?',/qi(B5, 'Which of these would shift the LRAS curve to the right?',/" "$AB/m/_packet44-assessment.mjs"; check "M8 near-duplicate stem" "near-dup"
prep; perl -0pi -e "s/  labourForceDiagram,\n\];/];/" "$AB/m/_packet44-diagrams.mjs"; check "M9 a block with no diagram" "diagram"
prep; perl -0pi -e "s/Singapore and Pakistan/Singapore and Pakistan \(stagflation\)/" "$AB/m/_packet44-content.mjs"; check "M10 banned word" "stagflation"
prep; perl -0pi -e "s/const Plr = round1\(\(adIntercept - adFall - capacity\) \/ adSlope\);/const Plr = 90;/" "$AB/m/_packet44-util.mjs"; check "M11 long-run point off AD1" "AD₁"
prep; perl -0pi -e "s/shuffled//; s/criterion: 'each step is caused by the one before it',/criterion: 'each step is caused by the one before it', shuffled: [1,0,2,3],/" "$AB/m/_packet44-content.mjs"; check "M12 shuffled on a reorder" "shuffled"
