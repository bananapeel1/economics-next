#!/bin/sh
# Re-runs the packet 2.7 A/B table. Sabotages one clause of `recall.recoverable` at a time in
# lib/content-validator.mjs, restoring after each, and prints the corpus count and the number of
# fixtures that fail. Run from the worktree root. ~7 minutes: each row re-reads both corpora.
#
# Verify A rejected the first version of this table on two counts and was right about both:
#   - it was PROSE in calibration.md with nothing to re-run it, and four of its five rows did not
#     reproduce, because they were measured before the >2-word filter and the word-boundary fix
#     moved the baseline from 239/356 to 241/358 and were never re-measured;
#   - its fixture column DOUBLE-COUNTED, because `node --test` prints each failure inline and again
#     under "failing tests:". The count below stops at that line, and it counts TESTS, not fixture
#     cases: two is the normal signature (the fixture case for that clause, plus the corpus control).
set -e
cd "$(dirname "$0")/../../.."
BK=$(mktemp); cp lib/content-validator.mjs "$BK"
restore() { cp "$BK" lib/content-validator.mjs; }
trap restore EXIT

corpus() { node audit/scripts/recall-census.mjs 2>/dev/null \
  | grep -oE "^recalls answerable by scrolling up: [0-9]+ of [0-9]+" \
  | sed 's/recalls answerable by scrolling up: //' | tr '\n' '/' | sed 's/.$//'; }
fixtures() { node --test lib/content-validator.test.mjs 2>/dev/null \
  | sed -n '1,/^✖ failing tests:/p' | grep -c "^✖ recall.recoverable" || true; }
row() { printf '%-42s %-22s %s\n' "$1" "$(corpus)" "$(fixtures)"; restore; }

printf '%-42s %-22s %s\n' "sabotage" "live / staged" "tests failing"
row "— none, the measure as built"

python3 - <<'P'
import io;p='lib/content-validator.mjs';s=io.open(p,encoding='utf-8').read()
s=s.replace(r'.split(/(?<=[.!?])\s+/))', r'.split(/(?<=[.!?;:])\s+/))',1);io.open(p,'w',encoding='utf-8').write(s)
P
row "split sentences on [.!?;:] again"

python3 - <<'P'
import io;p='lib/content-validator.mjs';s=io.open(p,encoding='utf-8').read()
s=s.replace('return [...sentences, ...pairs];','return sentences;',1);io.open(p,'w',encoding='utf-8').write(s)
P
row "drop the adjacent-pair window"

python3 - <<'P'
import io;p='lib/content-validator.mjs';s=io.open(p,encoding='utf-8').read()
s=s.replace('{ fillin: 0.70, classify: 0.75, reorder: 0.75, match: 0.75 }','{ fillin: 0.85, classify: 0.80, reorder: 0.95, match: 0.80 }',1)
io.open(p,'w',encoding='utf-8').write(s)
P
row "packet 29's gates, 0.85 / 0.95"

python3 - <<'P'
import io;p='lib/content-validator.mjs';s=io.open(p,encoding='utf-8').read()
old="""      sec?.title, sec?.keyIdea,
      ...(sec?.body || []).flatMap((b) => [
        b?.text,
        ...(b?.items || []),
        ...((b?.steps || []).map((x) => (x && typeof x === 'object' ? `${x.title || ''} ${x.subtitle || ''}` : x))),
        b?.result,
      ]),"""
new="""      sec?.keyIdea,
      ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || [])]),"""
assert old in s
io.open(p,'w',encoding='utf-8').write(s.replace(old,new,1))
P
row "read no flow.steps, flow.result or title"

python3 - <<'P'
import io;p='lib/content-validator.mjs';s=io.open(p,encoding='utf-8').read()
i=s.index('        /* (b) the FILLED PHRASE');j=s.index('      });',i)
io.open(p,'w',encoding='utf-8').write(s[:i]+s[j:])
P
row "remove the filled-phrase clause"

python3 - <<'P'
import io;p='lib/content-validator.mjs';s=io.open(p,encoding='utf-8').read()
s=s.replace("x.split(' ').length > 2","x.split(' ').length > 3",1);io.open(p,'w',encoding='utf-8').write(s)
P
row "units of 4+ words only, as packet 29 filtered"

row "— restored"
