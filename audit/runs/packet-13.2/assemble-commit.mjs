/**
 * PACKET 13.2 — commit assembler for the shared files.
 *
 *   node audit/runs/packet-13.2/assemble-commit.mjs            dry run: report what it would do
 *   node audit/runs/packet-13.2/assemble-commit.mjs --commit    build the commit and move the branch
 *
 * Adapted from packet 39b's, which is adapted from packet 32's. **It never writes to the working
 * tree.** Files are hashed straight into the object store, staged in a TEMPORARY index built from
 * HEAD, committed with `git commit-tree`, and the branch is moved with
 * `git update-ref <ref> <new> <old>` so a session committing underneath this one makes the update
 * FAIL rather than silently win.
 *
 * WHY. Several sessions share this worktree and one index. At the time packet 13.2 was ready,
 * `git status` showed another session's `audit/PROGRESS.md`, `audit/NEXT.md` and
 * `audit/DECISIONS.md` STAGED with their own uncommitted blocks in them. Committing this packet's
 * copy of any of those takes their work into a commit labelled `packet-13.2:`; committing by
 * explicit path does not help, because the path is the whole file. So each of the three is rebuilt
 * as **HEAD's version plus this packet's own block** and never as the working tree's version.
 *
 * TWO FILES ARE DELIBERATELY DIFFERENT.
 *
 * `audit/ledger.json` is committed WHOLE, from the working tree, and therefore carries another
 * session's newly minted E023-E028. That is packet 11's decision of 21 September and it still
 * holds: the ledger is a shared record with one sanctioned writer, and dropping rows from it is
 * unrecoverable, where sweeping a few `open` rows in is visible and harmless. Checked below rather
 * than assumed: nothing in HEAD's ledger may be REMOVED or CHANGED by this commit, only added.
 *
 * `audit/validator-baseline.json` is also staged from disk, because the only difference between
 * HEAD's copy and this one is this packet's own five removed `quant.unit` keys. Asserted below.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

const COMMIT = process.argv.includes('--commit');
const REF = 'refs/heads/remediation/2026-09';
const TMP = process.env.TMPDIR || '/tmp';
const sh = (cmd) => execSync(cmd, { maxBuffer: 1e9 }).toString();
const oldHead = sh('git rev-parse HEAD').trim();

/**
 * The ids this packet minted. D028 is here and is wont-fix: it asserted two things, a fix round
 * traded one away, and Verify A round 2 rejected it correctly. D029 and D030 are its split.
 * V051 is a finding minted here and assigned to 13.3. Nothing else of this packet's touches the
 * ledger.
 */
const MINE = new Set([
  'D018', 'D019', 'D020', 'D021', 'D022', 'D023', 'D024', 'D025', 'D026', 'D027',
  'D028', 'D029', 'D030', 'V051',
]);

/* ── ledger.json: added-only, and every addition accounted for ── */
const BUCKETS = ['code', 'content', 'feature', 'marketing'];
const byId = (L) => {
  const m = new Map();
  for (const b of BUCKETS) for (const x of L[b] || []) m.set(x.id, JSON.stringify(x));
  return m;
};
const headLedgerPath = `${TMP}/packet-13.2-head-ledger-${process.pid}.json`;
execSync(`git show HEAD:audit/ledger.json > "${headLedgerPath}"`);
const headLedger = byId(JSON.parse(readFileSync(headLedgerPath, 'utf8')));
const treeLedger = byId(JSON.parse(readFileSync('audit/ledger.json', 'utf8')));
execSync(`rm -f "${headLedgerPath}"`);

const added = [...treeLedger.keys()].filter((id) => !headLedger.has(id));
const removed = [...headLedger.keys()].filter((id) => !treeLedger.has(id));
const changed = [...treeLedger.keys()].filter((id) => headLedger.has(id) && headLedger.get(id) !== treeLedger.get(id));
const foreign = added.filter((id) => !MINE.has(id));
const missing = [...MINE].filter((id) => !treeLedger.has(id));

console.log(`assembled against HEAD ${oldHead.slice(0, 8)}`);
console.log(`  ledger: ${added.length} ids added (${MINE.size} this packet's, ${foreign.length} another session's, swept in by the packet-11 decision: ${foreign.join(', ') || 'none'})`);
console.log(`          ${removed.length} removed · ${changed.length} changed — both must be 0`);
if (removed.length || changed.length) { console.log('\nREFUSING: this commit would remove or alter a ledger row it does not own.'); process.exit(1); }
if (missing.length) { console.log(`\nREFUSING: ${missing.join(', ')} is claimed but not in the ledger on disk.`); process.exit(1); }

/* ── validator-baseline.json: five keys fewer than HEAD, and nothing else ── */
const headBasePath = `${TMP}/packet-13.2-head-baseline-${process.pid}.json`;
execSync(`git show HEAD:audit/validator-baseline.json > "${headBasePath}"`);
const headBase = JSON.parse(readFileSync(headBasePath, 'utf8'));
const treeBase = JSON.parse(readFileSync('audit/validator-baseline.json', 'utf8'));
execSync(`rm -f "${headBasePath}"`);
const goneKeys = headBase.keys.filter((k) => !treeBase.keys.includes(k));
const newKeys = treeBase.keys.filter((k) => !headBase.keys.includes(k));
console.log(`  baseline: ${goneKeys.length} keys removed, ${newKeys.length} added — a baseline may only shrink`);
for (const k of goneKeys) console.log(`            − ${k}`);
if (newKeys.length || goneKeys.length !== 5 || goneKeys.some((k) => !k.includes('|quant.unit|'))) {
  console.log('\nREFUSING: the baseline change is not exactly this packet\'s five quant.unit keys.');
  process.exit(1);
}

/** Files this packet owns outright: staged from disk exactly as they are. */
const OWN = [
  'lib/quant-pool.js', 'lib/quant-pool.test.mjs',
  'lib/quant/format.mjs', 'lib/quant/index.mjs', 'lib/quant/marking.mjs',
  'lib/quant/templates/arr.mjs', 'lib/quant/templates/breakeven.mjs',
  'lib/quant/templates/index-numbers.mjs', 'lib/quant/templates/multiplier.mjs',
  'lib/quant/templates/payback.mjs', 'lib/quant/templates/ped.mjs',
  'lib/quant/templates/percentage-change.mjs',
  'components/LearnModeTab.jsx', 'components/QuizTab.jsx', 'components/StudyApp.jsx',
  'components/learn-mode/CompletionScreen.jsx', 'components/quant/CalculationItem.jsx',
  'audit/scripts/quant-check.mjs', 'audit/validator-baseline.json', 'audit/ledger.json',
  'package.json',
];

/*
 * The whole run directory, read rather than listed: brief, build notes, four fix rounds, five
 * verification reports and every probe the verifiers wrote beside them. Enumerating them by hand
 * is how the last one gets left out.
 */
for (const name of readdirSync('audit/runs/packet-13.2').sort()) OWN.push(`audit/runs/packet-13.2/${name}`);

/** Every path this packet stages must be one no other session has touched. */
const status = sh('git status --porcelain').split('\n').filter(Boolean);
const stagedElsewhere = OWN.filter((p) => status.some((l) => l.slice(3).replace(/^"|"$/g, '') === p && l[0] !== ' ' && l[0] !== '?'));
const allowedStaged = new Set(['audit/ledger.json']);   // shared writer, see the header
const offenders = stagedElsewhere.filter((p) => !allowedStaged.has(p));
console.log(`  own files: ${OWN.length}, of which ${offenders.length} are staged in the shared index by somebody else`);
if (offenders.length) { console.log(`\nREFUSING: ${offenders.join(', ')} carries another session's staged work.`); process.exit(1); }

if (!COMMIT) {
  console.log('\ndry run — pass --commit to build the commit from a temporary index and move the branch.');
  process.exit(0);
}

const tmpIndex = `${TMP}/packet-13.2-index-${process.pid}`;
const git = (cmd) => execSync(`git ${cmd}`, { maxBuffer: 1e9, env: { ...process.env, GIT_INDEX_FILE: tmpIndex } }).toString();
const blobFrom = (content) => {
  const tmp = `${TMP}/packet-13.2-blob-${process.pid}`;
  writeFileSync(tmp, content);
  const sha = execSync(`git hash-object -w "${tmp}"`).toString().trim();
  execSync(`rm -f "${tmp}"`);
  return sha;
};

git('read-tree HEAD');
for (const path of OWN) git(`update-index --add --cacheinfo 100644,${blobFrom(readFileSync(path))},"${path}"`);

/* Shared prose: HEAD's text plus this packet's own block, never the working tree's copy. */
const place = (path, addition, where) => {
  const headText = sh(`git show HEAD:${path}`);
  let next;
  if (where === 'top') next = headText.replace(/^(# [^\n]*\n)/, `$1\n${addition}\n`);
  else if (where === 'row') {
    const row = new RegExp('^\\| 13\\.2 \\|.*$', 'm');
    if (!row.test(headText)) { console.log(`\nREFUSING: no packet 13.2 row in HEAD's ${path}.`); process.exit(1); }
    next = headText.replace(row, addition);
  } else next = `${headText.replace(/\n+$/, '')}\n\n${addition}\n`;
  if (next === headText) { console.log(`\nREFUSING: ${path} was not changed.`); process.exit(1); }
  git(`update-index --add --cacheinfo 100644,${blobFrom(next)},"${path}"`);
  return next.length - headText.length;
};

const read = (p) => readFileSync(`audit/runs/packet-13.2/${p}`, 'utf8').trim();
const addedProgress = place('audit/PROGRESS.md', read('progress-row.md'), 'row');
const addedDecisions = place('audit/DECISIONS.md', read('decisions-to-append.md'), 'end');
const addedNext = place('audit/NEXT.md', read('next-handoff.md'), 'top');

const tree = git('write-tree').trim();
const msgFile = `${TMP}/packet-13.2-msg-${process.pid}`;
writeFileSync(msgFile, readFileSync('audit/runs/packet-13.2/commit-message.txt'));
const commit = execSync(`git commit-tree ${tree} -p ${oldHead} -F "${msgFile}"`, { maxBuffer: 1e9 }).toString().trim();
execSync(`rm -f "${msgFile}" "${tmpIndex}"`);

try {
  execSync(`git update-ref ${REF} ${commit} ${oldHead}`);
} catch {
  console.log('\nREFUSED by update-ref: HEAD moved while this commit was being assembled.');
  console.log(`The commit object ${commit.slice(0, 8)} exists and is not lost. Re-run against the new HEAD.`);
  process.exit(1);
}

console.log(`  PROGRESS.md ${addedProgress >= 0 ? '+' : ''}${addedProgress} chars · DECISIONS.md +${addedDecisions} · NEXT.md +${addedNext}, each onto HEAD's version`);
console.log(`\ncommitted ${commit.slice(0, 8)} on top of ${oldHead.slice(0, 8)} — the working tree was not written to.`);
console.log("Other sessions' uncommitted changes to these files are still on disk and still uncommitted.");
