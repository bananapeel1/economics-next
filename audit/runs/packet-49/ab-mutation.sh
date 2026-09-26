#!/bin/bash
# Packet 49 — A/B of the runner's checks: plant each defect in a module, confirm the runner fails
# with the expected message, restore byte for byte, confirm it passes. Run from the worktree root.
# Same harness as audit/runs/packet-53/ab-mutation.sh; the plants are this packet's own claims.
set -u
run() { node scripts/packet-49-business-growth.mjs 2>&1 | grep -v -i "warning\|reparsing\|eliminate\|trace-warnings"; }
ab() { # file, perl substitution, expected text
  local f="$1" sub="$2" want="$3"
  cp "$f" "$f.ab-bak"
  perl -0pi -e "$sub" "$f"
  if cmp -s "$f" "$f.ab-bak"; then echo "NOT PLANTED  $want"; mv "$f.ab-bak" "$f"; return; fi
  if run | grep -q -- "$want"; then echo "FIRES        $want"; else echo "SILENT (BAD) $want"; fi
  mv "$f.ab-bak" "$f"
}
C=scripts/_packet49-content.mjs; A=scripts/_packet49-assessment.mjs; D=scripts/_packet49-diagrams.mjs
shasum $C $A $D > audit/runs/packet-49/ab.sha
ab $C "s/Growth does not lower costs for ever\./Growth does not lower costs for ever, which is why some firms choose a demerger./" 'demergers — 0 hits'
ab $A "s/Level 1: describes organic and inorganic growth in general terms\./Level 1: describes organic and inorganic growth, or Ansoff\\\\'s Matrix, in general terms./" "Ansoff's Matrix"
ab $C "s/Businesses grow for three further reasons\./Businesses grow for three further reasons, though there are reasons for staying small too./" 'reasons for staying small'
ab $A "s/Owners have no reason to sell for what they could already get on the market/Owners want a share of the synergy, and have no reason to sell for what they could already get on the market/" 'on an ASSESSED surface'
ab $C "s/\*\*Selling online\*\*: a website/**Selling online**, or franchising: a website/" 'without its topic number 2.3.1'
ab $D "s/\['Laundry chain'\]/['a hostile takeover']/" "is printed on the chapter's diagram"
ab $A "s/pr\(B4, 'Assess', 12,/pr(B4, 'Assess', 10,/" 'Appendix 6 gives 12'
ab $A "s/fc\('What are economies of scale\?', 'The fall in cost per unit/fc('What are economies of scale?', 'A 22.5% fall in cost per unit/" "Calculate item's figure 22.5%"
ab $A "s/, while buying stock early and recruiting ahead of orders both pay cash out sooner, and all three make the shortage worse\./, which makes the shortage worse./" 'quiz-04'
ab $C "s/(A \*\*conglomerate\*\* is a business made up)/A car maker buying a steel mill is backward vertical integration. \$1/" 'recall.recoverable'
ab $C "s/'Culture clash is one reason takeovers disappoint; overpaying is another\.'/'Culture clash is the primary reason takeovers fail.'/" 'structure-06'
ab $D "s/line\(xm, ym \+ 4, xm, PLOT\.yBase/line(xm + 30, ym + 4, xm + 30, PLOT.yBase/" 'dashed "lowest cost" marker'
ab $A "s/qi\(B4, 'A bakery buys the mill that supplies its flour/qi(B3, 'A bakery buys the mill that supplies its flour/" 'names backward integration'
ab $A "s/content: \`Not always\./content: \`**Not always.**/" 'Markdown or HTML'
ab $C "s/lenders see a large firm as less risky/lenders in 2019 saw a large firm as less risky/" 'a year —'
ab $C "s/how a small business competes is covered in 2\.3\.5/how firms compete is covered elsewhere/" 'the one pointer to 2.3.5'
echo "--- clean run after restore:"; run | sed -n 2,4p; echo "failed-check lines: $(run | grep -c 'check.*failed')"
shasum -c audit/runs/packet-49/ab.sha
for f in $C $A $D; do ls "$f.ab-bak" 2>/dev/null && echo "BACKUP LEFT: $f"; done
