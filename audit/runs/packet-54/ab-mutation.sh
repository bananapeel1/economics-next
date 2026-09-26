#!/bin/bash
# Packet 54 — plant one defect at a time in a module, run the runner (dry), expect the named guard to fire, restore byte for byte.
cd "/Users/arongijsel/Claude APP/economics-next-remediation"
R=scripts/packet-54-assessing-competitiveness.mjs
plant() { # file, from, to, expected-substring
  cp "$1" "$1.abbak"
  python3 - "$1" "$2" "$3" <<'PY'
import sys; p,a,b=sys.argv[1:4]; s=open(p).read(); assert a in s, a; open(p,'w').write(s.replace(a,b,1))
PY
  out=$(node $R 2>&1); code=$?
  cp "$1.abbak" "$1"; rm "$1.abbak"
  if [ $code -ne 0 ] && echo "$out" | grep -q -- "$4"; then echo "FIRED  ($4)"; else echo "SILENT ($4) exit=$code"; fi
}
C=scripts/_packet54-content.mjs; A=scripts/_packet54-assessment.mjs; D=scripts/_packet54-diagrams.mjs
plant $C "Reading the statement means comparing lines" "Unlike VRIO, reading the statement means comparing lines" "VRIO / core competencies"
plant $A "'Profit for the year ÷ revenue × 100. Profit for the year is what" "'Operating profit ÷ revenue × 100. Profit for the year is what" "accuracy-03"
plant $C "'A Karachi logistics firm buys a fleet of new trucks." "'Tesla buys a fleet of new trucks." "named real firm"
plant $C "p('The acid test leaves out inventory because stock may be slow to sell, or sell only at a discount, when cash is needed quickly.')," "p('The acid test leaves out inventory because stock may be slow to sell, or sell only at a discount, when cash is needed quickly.'), p('Gross profit margin divides gross profit by revenue, after cost of sales.')," "is printed on its own step"
plant $D "title('Gearing magnifies gains and losses')," "title('Gearing magnifies gains and losses'), t(20, 290, 'Issuing new shares to repay part of a loan')," "is printed on the chapter's diagram"
plant $A "'Explain', 4, \`\${EXTRACT} Explain one reason" "'Explain', 4, \`\${EXTRACT} Explain two reasons" "Explain one"
plant $C "      'Its gearing ratio rises'," "      'Its interest bill rises'," "risk reorder is missing or out of order"
# control: the unmodified modules pass
node $R >/dev/null 2>&1 && echo "CONTROL clean (exit 0)" || echo "CONTROL FAILED"
