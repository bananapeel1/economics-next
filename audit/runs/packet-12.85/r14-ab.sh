#!/bin/bash
# Packet 12.85, E068 — R14 proved by A/B mutation. Runs the REAL validator CLI (--json) on a scratch copy
# of the tree whose bank (and, for one case, whose structure file) is mutated; the worktree is never edited.
# Control first: the unmutated copy must report 0 findings. Every mutation must report >=1 R14 finding.
W="/Users/arongijsel/Claude APP/economics-next-remediation"
S=/private/tmp/claude-503/-Users-arongijsel-Claude-APP/b59aa64c-cc17-4f3e-b30e-5789da0476a6/scratchpad/p1285/r14
rm -rf $S; mkdir -p $S/audit
for d in lib data content; do cp -c -R "$W/$d" $S/; done; mkdir -p $S/public && cp -c -R "$W/public/diagrams" $S/public/
cp -c -R "$W/audit/scripts" "$W/audit/raw" $S/audit/; cp -c "$W/package.json" $S/
cp -c -R "$W/node_modules" $S/node_modules
DATA=$S/data/modelAnswersData.js; cp $DATA $S/data0.js; cp $S/audit/raw/ial-paper-structure.json $S/struct0.json
LINE='export const MODEL_ANSWERS = [...BASE_ANSWERS, ...EXPANSION_ANSWERS];'
grep -qF "$LINE" $DATA || { echo "anchor line missing"; exit 2; }
mutate() { python3 -c "
import sys; s=open('$S/data0.js').read(); l='''$LINE'''
s=s.replace(l, 'export const MODEL_ANSWERS = ((xs) => ' + sys.argv[1] + ')([...BASE_ANSWERS, ...EXPANSION_ANSWERS]);')
open('$DATA','w').write(s)" "$1"; }
run() { # name
  node $S/audit/scripts/validate-model-answers.mjs --json 2>/dev/null | python3 -c "
import json,sys; j=json.load(sys.stdin); f=j['findings']
r14=[x for x in f if x['rule']=='R14']
print('$1'.ljust(34), 'findings', len(f), '| R14', len(r14), '|', ' || '.join(sorted(set(x['id']+': '+x['detail'][:110] for x in f)))[:600])"
}
D14="x.id === 'mf-extract-evaluate-soft-drinks-excise-20'"
G20="x.id === 'market-failure-government-intervention-20'"
cp $S/data0.js $DATA; run "A control (unmutated)"
mutate "xs.map((x) => $D14 ? { ...x, criteria: [{ id: 'k1', band: 'KAA', text: 't', marks: 14, seg: 'p1a', segRole: 'earned' }] } : x)"; run "B1 levels item with criteria"
mutate "xs.map((x) => { if (!($D14)) return x; const { levels, ...y } = x; return y; })"; run "B2 levels removed"
mutate "xs.map((x) => $D14 ? { ...x, levels: { strands: x.levels.strands.filter((s) => s.strand === 'KAA') } } : x)"; run "B3 E strand dropped"
mutate "xs.map((x) => $D14 ? { ...x, levels: { strands: [...x.levels.strands, x.levels.strands[0]] } } : x)"; run "B4 KAA strand twice"
mutate "xs.map((x) => $G20 ? { ...x, levels: { strands: x.levels.strands.map((s) => s.strand === 'E' ? { ...s, indicative: [] } : s) } } : x)"; run "B5 empty indicative"
mutate "xs.map((x) => $G20 ? { ...x, levels: { strands: x.levels.strands.map((s) => s.strand === 'E' ? { ...s, indicative: ['ok', '  '] } : s) } } : x)"; run "B6 blank indicative line"
mutate "xs.map((x) => $D14 ? { ...x, verdict: [{ strand: 'KAA', level: 3, mark: 6 }, { strand: 'E', level: 3, mark: 6 }] } : x)"; run "B7 mark outside its level band"
mutate "xs.map((x) => $D14 ? { ...x, verdict: [{ strand: 'KAA', level: 4, mark: 9 }, { strand: 'E', level: 3, mark: 5 }] } : x)"; run "B8 level the 14 scheme lacks"
mutate "xs.map((x) => $D14 ? { ...x, verdict: [{ strand: 'KAA', level: 3, mark: 8 }] } : x)"; run "B9 verdict missing a strand"
mutate "xs.map((x) => $D14 ? { ...x, verdict: [{ strand: 'KAA', level: 3, mark: 7.5 }, { strand: 'E', level: 3, mark: 5 }] } : x)"; run "B10 non-integer mark"
mutate "xs.map((x) => $D14 ? { ...x, verdict: undefined } : x)"; run "B11 no verdict"
mutate "xs.map((x) => $G20 ? { ...x, script: x.script.map((p, i) => i ? p : { ...p, segments: p.segments.map((g, j) => j ? g : { ...g, strand: 'AO1' }) }) } : x)"; run "B12 segment strand not in scheme"
mutate "xs.map((x) => $D14 ? (({ levels, verdict, ...y }) => y)(x) : x)"; run "B13 14-mark paper item, no marking"
mutate "xs.map((x) => x.id === 'negative-externality-tax-8' ? { ...x, levels: { strands: [] } } : x)"; run "B14 levels on an 8-mark item"
# sum above the tariff: only reachable if a band's top exceeds the strand, so mutate the structure file copy
cp $S/data0.js $DATA
python3 -c "
import json; j=json.load(open('$S/struct0.json')); j['economics_levels']['20']['strands'][1]['levels'][2]['hi']=9
json.dump(j,open('$S/audit/raw/ial-paper-structure.json','w'))"
mutate "xs.map((x) => $G20 ? { ...x, verdict: [{ strand: 'KAA', level: 4, mark: 12 }, { strand: 'E', level: 3, mark: 9 }] } : x)"; run "B15 verdict sums above tariff"
cp $S/struct0.json $S/audit/raw/ial-paper-structure.json; cp $S/data0.js $DATA; run "C control again (restored)"
