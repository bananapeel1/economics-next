#!/bin/bash
# Packet 12.8, E057 — A/B mutation proof for R10-R13. Fix round 1 rewrite; fix round 2 adds A1 + V14-V29.
#
# Each mutation is applied to the real file; then THREE validators run on it:
#   A  = validate-model-answers.round0.mjs (frozen copy of the validator before fix round 1)
#   A1 = validate-model-answers.round1.mjs (frozen copy after fix round 1, the one rejected in round 2)
#   B  = audit/scripts/validate-model-answers.mjs (current)
# and the file is restored from a byte copy whose sha256 is checked before the next step.
# Every step also logs the mutation's own diff (+/- line counts, from `diff`, not from either
# validator), so a mutation that silently failed to apply cannot pass as "A saw nothing".
# Output: validator-ab.log beside this script.
set -u
cd "$(dirname "$0")/../../.."
HERE=audit/runs/packet-12.8
OUT=$HERE/validator-ab.log
DATA=data/modelAnswersExpansion.js
DATA2=data/modelAnswersData.js   # holds the fifth short answer (paper field at ~:299)
MD=content/data-response/econ-u1-market-failure.md
TMP=$(mktemp -d)
cp "$DATA" "$TMP/data.bak"; cp "$DATA2" "$TMP/data2.bak"; cp "$MD" "$TMP/md.bak"
SD=$(shasum -a 256 "$DATA" | cut -d' ' -f1); SD2=$(shasum -a 256 "$DATA2" | cut -d' ' -f1); SM=$(shasum -a 256 "$MD" | cut -d' ' -f1)
: > "$OUT"
findings() { node "$1" --json 2>/dev/null | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s);console.log(j.findings.length+" finding(s)"+(j.findings.length?": "+[...new Set(j.findings.map(f=>f.rule))].join(","):""));for(const f of j.findings)console.log("    "+f.rule+"  "+f.id+"  "+f.detail.slice(0,220))})'; }
run() {
  echo "=== $1" >> "$OUT"
  local dd dm
  dd=$(( $(diff "$TMP/data.bak" "$DATA" | grep -c '^[<>]') + $(diff "$TMP/data2.bak" "$DATA2" | grep -c '^[<>]') )); dm=$(diff "$TMP/md.bak" "$MD" | grep -c '^[<>]')
  echo "  mutation diff: data ${dd} line(s) (both data files), md ${dm} line(s)" >> "$OUT"
  echo "  A (round 0): $(findings $HERE/validate-model-answers.round0.mjs | head -1)" >> "$OUT"
  echo "  A1 (round 1): $(findings $HERE/validate-model-answers.round1.mjs | head -1)" >> "$OUT"
  echo "  B (current): $(findings audit/scripts/validate-model-answers.mjs | head -1)" >> "$OUT"
  findings audit/scripts/validate-model-answers.mjs | tail -n +2 >> "$OUT"
  cp "$TMP/data.bak" "$DATA"; cp "$TMP/data2.bak" "$DATA2"; cp "$TMP/md.bak" "$MD"
  [ "$(shasum -a 256 "$DATA" | cut -d' ' -f1)" = "$SD" ] && [ "$(shasum -a 256 "$DATA2" | cut -d' ' -f1)" = "$SD2" ] && [ "$(shasum -a 256 "$MD" | cut -d' ' -f1)" = "$SM" ] || { echo "RESTORE FAILED" >> "$OUT"; exit 2; }
}
run "control (no mutation)"

# ---- R13: the verifier's holes (extra questions the round-0 parser could not see) ----
perl -0pi -e 's/(\*\*Question \(e\) \(14 marks\)\*\*[^\n]*\n)/$1\n**Question (f) (20 marks)** — Evaluate the case for a ban on single-use plastic bags in the UAE.\n/' "$MD"
run "R13 V1: sixth question '**Question (f) (20 marks)** — …' in ## Questions (verifier's example)"
perl -0pi -e 's/(\*\*Question \(e\) \(14 marks\)\*\*[^\n]*\n)/$1\n### Question (f) (20 marks)\n\nEvaluate the case for a ban on single-use plastic bags in the UAE.\n/' "$MD"
run "R13 V2: heading-style sixth question in ## Questions"
perl -0pi -e 's/(\*\*Question \(e\) \(14 marks\)\*\*[^\n]*\n)/$1\n**Question (f) (20 marks)**\n\nEvaluate the case for a ban on single-use plastic bags in the UAE.\n/' "$MD"
run "R13 V3: two-line sixth question in ## Questions"
perl -0pi -e 's/(\*\*Question \(e\) \(14 marks\)\*\*[^\n]*\n)/$1\n6. Evaluate the case for a ban on single-use plastic bags in the UAE. (20 marks)\n/' "$MD"
run "R13 V4: sixth question as a numbered list line, the word 'Question' absent"
perl -0pi -e 's/\z/\n## Questions\n\n**Question (f) (20 marks)** — Evaluate the case for a ban on single-use plastic bags in the UAE.\n/' "$MD"
run "R13 V5: a second ## Questions section at the end of the file"
perl -0pi -e 's/\z/\n## Extension\n\nQuestion (f): evaluate the case for a ban on single-use plastic bags in the UAE (20 marks).\n/' "$MD"
run "R13 V6: a sixth question in prose under another heading"
perl -0pi -e 's/(\*\*Question \(e\) \(14 marks\)\*\*[^\n]*\n)/$1\n**Question (b) (4 marks)** — Explain one other external cost of tobacco consumption.\n/' "$MD"
run "R13 V7: Question (b) stated twice"
perl -0pi -e 's/### Question \(d\) \(8 marks\)/### Question (d) (6 marks)/' "$MD"
run "R13 V8: model-answer heading states (d) at 6 marks"
perl -0pi -e 's/(## Common Mistakes)/### Question (f) (20 marks)\n\nA model answer for a question the bank does not have.\n\n$1/' "$MD"
run "R13 V9: a sixth model answer heading"

# ---- R10-R12: a page stripped of one kind of paper field (verifier's second hole) ----
perl -0pi -e "s/    paper: \{ section: 'C', kind: 'data_question', part: '[a-e]' \},\n//g" "$DATA"
run "R10 V10: every data-question part's paper field removed (shorts and essays keep theirs)"
perl -0pi -e "s/    paper: \{\n      section: 'B',\n      kind: 'short_answer',\n      context: '[^']*',\n    \},\n//g" "$DATA" "$DATA2"
run "R11 V11: every short answer's paper field removed"
perl -0pi -e "s/    paper: \{\n      section: 'D',\n      kind: 'essay',\n      context: '[^']*',\n    \},\n//g" "$DATA"
run "R12 V12: every essay's paper field removed"
perl -0pi -e "s/    paper: \{ section: 'C', kind: 'data_question', part: '[a-e]' \},\n//g; s/    paper: \{\n      section: '[BD]',\n      kind: '(?:short_answer|essay)',\n      context: '[^']*',\n    \},\n//g" "$DATA" "$DATA2"
run "R13 V13: every paper field on the page removed (page no longer opts in; the lettered md still does)"

# ---- fix round 2: a tariffed task that never says "question" (verifier's three, then neighbours) ----
X='Evaluate the case for a ban on single-use plastic bags in the UAE.'
perl -0pi -e "s/(## Common Mistakes)/## Extension task\n\n**(f) (20 marks)** — $X\n\n\$1/" "$MD"
run "R13 V14: '## Extension task' + '**(f) (20 marks)** — Evaluate …' (verifier's first)"
perl -0pi -e "s/(## Common Mistakes)/**Extension (20 marks):** $X\n\n\$1/" "$MD"
run "R13 V15: '**Extension (20 marks):** …' (verifier's second)"
perl -0pi -e "s/(## Common Mistakes)/| Task | Question |\n|---|---|\n| (f) 20 marks | $X |\n\n\$1/" "$MD"
run "R13 V16: table row '| (f) 20 marks |' (verifier's third)"
perl -0pi -e "s/(## Common Mistakes)/**Extension (twenty marks):** $X\n\n\$1/" "$MD"
run "R13 V17: tariff as a number word, '(twenty marks)'"
perl -0pi -e "s/(## Common Mistakes)/**Extension:** $X (20)\n\n\$1/" "$MD"
run "R13 V18: printed-paper tariff, bare '(20)', no word 'marks', no part letter"
perl -0pi -e "s/(## Common Mistakes)/**Extension:** $X [20]\n\n\$1/" "$MD"
run "R13 V19: bracketed tariff '[20]'"
perl -0pi -e "s/(## Common Mistakes\n)/\$1\n- Try this 20-mark task: evaluate the case for a ban on single-use plastic bags in the UAE.\n/" "$MD"
run "R13 V20: '20-mark task' inside the Common Mistakes list"
perl -0pi -e "s/(## Common Mistakes)/**Extension (**20** marks):** $X\n\n\$1/" "$MD"
run "R13 V21: tariff split by markup, '(**20** marks)'"
perl -0pi -e "s/(## Common Mistakes)/**Extension** $X (20\nmarks)\n\n\$1/" "$MD"
run "R13 V22: tariff split over a line break"
perl -0pi -e "s/(## Common Mistakes)/**Extension &#40;20 marks&#41;:** $X\n\n\$1/" "$MD"
run "R13 V23: tariff written with HTML entities '&#40;20 marks&#41;'"
perl -0pi -e "s/(## Questions)/**Extension (20 marks):** $X\n\n\$1/" "$MD"
run "R13 V24: tariffed task inside ## Stimulus"
perl -0pi -e "s/(### Question \(e\) \(14 marks\)\n)/\$1\n**(ii)** $X\n/" "$MD"
run "R13 V25: roman part label '(ii)', no tariff, inside a model answer"
perl -0pi -e "s/(### Question \(e\) \(14 marks\)\n)/\$1\n**(f)** $X\n/" "$MD"
run "R13 V26: letter part label '(f)', no tariff, no word 'question'"
perl -0pi -e "s/(sugary drink consumption\.)( \*\*|\n)/\$1 **(f) (20 marks)** $X\$2/ if \$.==0; s/^(\*\*Question \(e\) \(14 marks\)\*\* — .*consumption\.)\$/\$1 (f) (20 marks) $X/m" "$MD"
perl -0pi -e "s/(question: 'Discuss whether the current 50% excise tax on carbonated soft drinks in the UAE is the most effective way to correct the market failure caused by sugary drink consumption\.)'/\$1 (f) (20 marks) $X'/" "$DATA"
run "R13+R9 V27: a sixth task appended to (e)'s question line AND to the bank's (e) question (wording still matches)"
perl -0pi -e "s/(context: 'A coastal city is building a sea wall[^']*)'/\$1 (20 marks) $X'/" "$DATA"
run "R9 V28: a tariffed task appended to a short answer's paper.context (bank-side twin)"
perl -0pi -e "s/(## Common Mistakes)/## Extension task\n\n$X\n\n\$1/" "$MD"
run "RESIDUAL V29 (expected 0 on all three): an untariffed, unlettered imperative under a new heading"

# ---- the original round-0 mutations, kept so B is shown not to regress ----
perl -0pi -e "s/    paper: \{ section: 'C', kind: 'data_question', part: 'b' \},\n//" "$DATA"
run "R10 A: part (b) removed from the data question -> multiset 2,6,8,14"
perl -0pi -e "s/(id: 'mf-extract-examine-bag-charge-optimum-8'[\s\S]*?)stimulus: 'econ-u1-market-failure'/\$1stimulus: 'econ-u1-demand-elasticity'/" "$DATA"
run "R10 B: part (d) on another extract"
perl -0pi -e "s/part: 'b' \}/part: 'a' }/" "$DATA"
run "R10 C: two parts lettered (a)"
perl -0pi -e 's/\*\*Question \(d\) \(8 marks\)\*\*/**Question (d) (6 marks)**/' "$MD"
run "R13 A: md states (d) as 6 marks"
perl -0pi -e 's/(\*\*Question \(e\) \(14 marks\)\*\* — )Discuss whether/${1}Evaluate whether/' "$MD"
run "R13 B: md (e) wording differs"
perl -0pi -e 's/\*\*Question \(c\) \(6 marks\)\*\*[^\n]*\n\n//' "$MD"
run "R13 C: md has no Question (c)"
perl -0pi -e 's/\*\*Question \(a\) \(2 marks\)\*\*/**Question 1 (2 marks)**/' "$MD"
run "R13 D: md numbers a question instead of lettering it"
perl -0pi -e "s/commandWord: 'Discuss',/commandWord: 'Evaluate',/" "$DATA"
run "R9 A: the 14-mark part labelled Evaluate"
perl -0pi -e "s/src: '\/diagrams\/positive-externality-consumption.svg'/src: '\/diagrams\/no-such-diagram.svg'/" "$DATA"
run "R9 B: the Draw item names a diagram that is not on disk"
perl -0pi -e "s/(id: 'mf-short-explain-sea-wall-public-good-4'[\s\S]*?)    paper: \{\n      section: 'B',\n      kind: 'short_answer',\n      context: '[^']*',\n    \},\n/\$1/" "$DATA"
run "R11: four short answers instead of five"
perl -0pi -e "s/(id: 'mf-essay-deposit-protection-moral-hazard-20'[\s\S]*?)    paper: \{\n      section: 'D',\n      kind: 'essay',\n      context: '[^']*',\n    \},\n/\$1/" "$DATA"
run "R12: one essay offered instead of two"
run "control after every restore"
rm -rf "$TMP"
