#!/bin/bash
# Page A/B for E057 close-out: a next dev server on :3007 in the scratchpad CLONE (never the worktree),
# restarted for every case (Turbopack serves stale output after edits), curl of the rendered page.
S=/private/tmp/claude-503/-Users-arongijsel-Claude-APP/b59aa64c-cc17-4f3e-b30e-5789da0476a6/scratchpad
C=$S/clone; DATA=$C/data/modelAnswersData.js; OUT=$S/page-ab; mkdir -p $OUT
cp $DATA $S/data0.js
LINE='export const MODEL_ANSWERS = [...BASE_ANSWERS, ...EXPANSION_ANSWERS];'
mutate() { python3 -c "
import sys; s=open('$S/data0.js').read(); l='''$LINE'''; assert l in s
s=s.replace(l, 'export const MODEL_ANSWERS = ((xs) => ' + sys.argv[1] + ')([...BASE_ANSWERS, ...EXPANSION_ANSWERS]);')
open('$DATA','w').write(s)" "$1"; }
serve() {
  (cd $C && exec /Users/arongijsel/.nvm/versions/node/v24.14.0/bin/node node_modules/.bin/next dev --port 3007 > $OUT/dev-$1.log 2>&1) &
  for i in $(seq 1 90); do curl -s -o /dev/null http://localhost:3007/ -m 2 && break; sleep 1; done
  for s in econ-u1-market-failure econ-u1-demand-elasticity econ-u1-price-determination bus-u1-marketing-mix bus-u1-meeting-customer-needs bus-u1-the-market; do
    curl -s -m 120 http://localhost:3007/data-response/$s > $OUT/$1-$s.html
  done
  kill $(lsof -ti tcp:3007 -sTCP:LISTEN) 2>/dev/null; sleep 2
}
cp $S/data0.js $DATA; serve P0
mutate "xs.map((x) => x.id === 'mf-extract-analyse-plastic-bag-charge-6' ? { ...x, question: x.question.replace('is likely to correct', 'is likely to reduce') } : x)"; serve P1
mutate "[...xs, { ...xs.find((x) => x.id === 'mf-extract-evaluate-soft-drinks-excise-20'), id: 'mf-extract-extra-f-20', marks: 20, question: 'Evaluate the case for a sugar-content tax.', paper: { section: 'C', kind: 'data_question', part: 'f' } }]"; serve P2
mutate "xs.map((x) => x.id === 'mf-extract-define-consumption-externality-2' ? { ...x, question: x.question + ' Use *two* <b>examples</b> [link](http://x) and 1. a # hash' } : x)"; serve P3
cp $S/data0.js $DATA; cmp $S/data0.js $DATA && echo restored
