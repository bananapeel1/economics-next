#!/bin/bash
# PACKET 45 fix round 1 — mutation A/B of the three new runner checks (structure-03 served pins,
# structure-09 filler in every field, specGap-08 price-taker assumption on every surface).
# Same harness as ab-mutation.sh. Run from the worktree root. The real modules are never edited.
# PRE is the pre-fix copy of the four modules (the state the verifier rejected), for the whole-state A/B.
ROOT="$(pwd)"
AB="$ROOT/audit/runs/packet-45/ab"
PRE="${PRE:-}"
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
run s03-examine-first _packet45-assessment.mjs "s/(  pr\(B4, 'Evaluate', 20,.*?\n\n)(  pr\(B4, 'Examine', 8,.*?\n\n)/\$2\$1/s" "20-mark practice item is no chapter's first pin"
run s09-need-more-workers _packet45-content.mjs 's/Students draw a rise in demand for the product as a movement along the demand curve for labour, because more workers are hired\./Students write that the demand for labour rises "because firms need more workers"./' "firms need workers\" filler"
run s09-mistake-needed-them _packet45-assessment.mjs 's/"The extra worker makes 3 more units/"More workers were hired because the firm needed them." "The extra worker makes 3 more units/' "is the \"firms need workers\" filler"
run s09-no-cut-price-mistake _packet45-assessment.mjs 's/at the price when the firm must cut its price to sell more/at the price/; s/A firm that must cut its price to sell more gains less than the price on each extra unit, because/A firm with falling prices gains less, because/' "no mistake names valuing extra output"
run g08-flashcard _packet45-assessment.mjs "s/extra output × marginal revenue\. Only for a firm selling at a given price does that equal extra output × the price of the product\./extra output × the price of the product./" "specGap-08: flashcard"
run g08-notes _packet45-content.mjs 's/For a firm selling at a given price, that is extra output × price; in general, extra output × marginal revenue\./That is extra output × price./' "specGap-08: notes"
run g08-body _packet45-content.mjs 's/is one of many workshops and sells every extra shirt at the market price of \$\{money\(L\.price\)\}, so that is/sells shirts, so that is/; s/which equals the price only for a firm selling at a given price\. A firm that must cut its price to sell more gains less than the price on each extra shirt\./the same thing./' "specGap-08: labour-markets:sub:hiring-rule"
if [ -n "$PRE" ]; then
  rm -rf "$AB"; mkdir -p "$AB"
  cp scripts/_packet45-util.mjs scripts/packet-45-labour-markets.mjs "$AB/"
  for f in _packet45-content.mjs _packet45-assessment.mjs _packet45-diagrams.mjs; do cp "$PRE/$f" "$AB/$f"; done
  perl -pi -e "s#'\./_content-write\.mjs'#'$ROOT/scripts/_content-write.mjs'#; s#'\.\./lib/content-validator\.mjs'#'$ROOT/lib/content-validator.mjs'#" "$AB/packet-45-labour-markets.mjs"
  echo "--- NEW runner against the PRE-FIX modules (the rejected state):"
  node "$AB/packet-45-labour-markets.mjs" 2>&1 | grep -E "^  - " 
fi
rm -rf "$AB"
