/**
 * PACKET 39a — commit assembler for the shared files.
 *
 *   node audit/runs/packet-39b/assemble-commit.mjs             dry run: report what it would do
 *   node audit/runs/packet-39b/assemble-commit.mjs --commit     build the commit and move the branch
 *
 * **IT NEVER WRITES TO THE WORKING TREE.** The first version of this script rewrote
 * `audit/ledger.json` on disk as HEAD-plus-mine, which would have deleted packet 40's and packet
 * 38's uncommitted ledger work from the file — the exact failure the packet 38 session reported to
 * this one an hour earlier, from the other side. Instead the assembled content is hashed straight
 * into the object store, staged in a TEMPORARY index built from HEAD, committed with
 * `git commit-tree`, and the branch is moved with `git update-ref <ref> <new> <old>` so a session
 * committing underneath this one makes the update FAIL rather than silently win.
 *
 * WHY THIS EXISTS. Six sessions share this worktree and one index. At the time packet 39a was ready
 * to commit, the working tree's `audit/ledger.json` held **37 id changes belonging to packet 40 and
 * packet 38**, and `git status` showed another session's files staged. Committing the working tree's
 * copy of a shared file takes whatever else is in it; committing by explicit path does not protect
 * against that, because the path is the whole file.
 *
 * So each shared file is rebuilt as **HEAD's version plus this packet's own edit**, never as the
 * working tree's version. For `ledger.json` that means: start from HEAD's JSON, apply ONLY the ids
 * this packet touched, and assert that every other id is byte-identical to HEAD's.
 *
 * Nothing is written back to the working tree. If another session commits while this is assembling,
 * `update-ref` refuses and the script says so; the commit object already exists and is not lost, so
 * re-running against the new HEAD is the whole recovery.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const COMMIT = process.argv.includes('--commit');
const sh = (cmd) => execSync(cmd, { maxBuffer: 1e9 }).toString();
const head = sh('git rev-parse --short HEAD').trim();

/** Every id this packet claimed, reassigned, or marked wont-fix. Nothing else may differ. */
const MINE = new Set([
  // the 26 ids packet 39b claimed and Verify A confirmed
  'C-causes-effects-globalisation-topFix-02', 'C-causes-effects-globalisation-topFix-03',
  'C-causes-effects-globalisation-specGap-05', 'C-causes-effects-globalisation-specGap-06',
  'C-trade-global-economy-topFix-01', 'C-trade-global-economy-topFix-03',
  'C-trade-global-economy-topFix-04', 'C-trade-global-economy-accuracy-01',
  'C-trade-global-economy-quiz-02', 'C-trade-global-economy-quiz-03',
  'C-trade-global-economy-structure-01', 'C-trade-global-economy-structure-02',
  'C-trade-global-economy-structure-05', 'C-trade-global-economy-structure-06',
  'C-trade-global-economy-structure-07', 'C-trade-global-economy-structure-09',
  'C-trade-global-economy-specGap-02', 'C-trade-global-economy-specGap-03',
  'C-trade-global-economy-specGap-06', 'C-trade-global-economy-specGap-07',
  'C-trade-global-economy-specThin-06', 'C-trade-global-economy-specThin-07',
  'C-trade-global-economy-specThin-08', 'C-trade-global-economy-specThin-09',
  'C-trade-global-economy-specThin-10', 'C-trade-global-economy-specThin-11',
  // reopened and reassigned to packet 12.4, because IAL Economics has no 10-mark item
  'C-trade-global-economy-topFix-05',
]);

const BUCKETS = ['code', 'content', 'feature', 'marketing'];
const walk = (L, fn) => {
  for (const b of BUCKETS) {
    const v = L[b];
    if (Array.isArray(v)) v.forEach(fn);
    else if (v && typeof v === 'object') for (const k of Object.keys(v)) {
      const inner = v[k];
      if (Array.isArray(inner)) inner.forEach(fn); else if (inner) fn(inner);
    }
  }
};
const index = (L) => { const m = new Map(); walk(L, (i) => { if (i && i.id) m.set(i.id, i); }); return m; };

/* ── ledger.json: HEAD's file, with only this packet's ids replaced ── */
const headLedger = JSON.parse(sh('git show HEAD:audit/ledger.json'));
const treeLedger = JSON.parse(readFileSync('audit/ledger.json', 'utf8'));
const headIdx = index(headLedger);
const treeIdx = index(treeLedger);

const report = { mineApplied: [], foreignDropped: [], missing: [] };
walk(headLedger, (item) => {
  if (!item || !item.id) return;
  if (!MINE.has(item.id)) return;
  const mineNow = treeIdx.get(item.id);
  if (!mineNow) { report.missing.push(item.id); return; }
  for (const k of Object.keys(item)) delete item[k];
  Object.assign(item, mineNow);
  report.mineApplied.push(item.id);
});
for (const [id, item] of treeIdx) {
  const h = headIdx.get(id);
  if (!h) { report.foreignDropped.push(`${id} (added by another session)`); continue; }
  if (MINE.has(id)) continue;
  if (JSON.stringify(h) !== JSON.stringify(item)) report.foreignDropped.push(id);
}

/* The assembled file must differ from HEAD ONLY in this packet's ids. */
const assembled = JSON.stringify(headLedger, null, 1);
const check = index(JSON.parse(assembled));
let drift = 0;
for (const [id, item] of check) {
  const h = headIdx.get(id);
  if (MINE.has(id)) continue;
  if (JSON.stringify(h) !== JSON.stringify(item)) { drift += 1; console.log(`  !! ${id} differs from HEAD and is not this packet's`); }
}

console.log(`assembled against HEAD ${head}`);
console.log(`  ledger: ${report.mineApplied.length} of ${MINE.size} ids applied · ${report.foreignDropped.length} other sessions' changes left OUT of this commit · ${drift} unexplained`);
if (report.missing.length) console.log(`  !! ${report.missing.length} of this packet's ids are not in the working tree: ${report.missing.join(', ')}`);
if (report.foreignDropped.length) console.log(`  other sessions' ids (correctly not committed here): ${report.foreignDropped.slice(0, 6).join(', ')}${report.foreignDropped.length > 6 ? ` …+${report.foreignDropped.length - 6}` : ''}`);
if (drift) { console.log('\nREFUSING: the assembled ledger differs from HEAD outside this packet.'); process.exit(1); }
if (report.missing.length) { console.log('\nREFUSING: an id this packet claims is missing from the working tree.'); process.exit(1); }

if (!COMMIT) {
  console.log('\ndry run — pass --commit to build the commit from a temporary index and move the branch.');
  process.exit(0);
}

/* ── the commit, built in a temporary index so the working tree is never touched ── */
const REF = 'refs/heads/remediation/2026-09';
const oldHead = sh('git rev-parse HEAD').trim();
const tmpIndex = `${process.env.TMPDIR || '/tmp'}/packet-39b-index-${process.pid}`;
const git = (cmd) => execSync(`git ${cmd}`, { maxBuffer: 1e9, env: { ...process.env, GIT_INDEX_FILE: tmpIndex } }).toString();

const blobFrom = (content) => {
  const tmp = `${process.env.TMPDIR || '/tmp'}/packet-39b-blob-${process.pid}`;
  writeFileSync(tmp, content);
  const sha = execSync(`git hash-object -w "${tmp}"`).toString().trim();
  execSync(`rm -f "${tmp}"`);
  return sha;
};

/** Files this packet owns outright: staged from disk exactly as they are. */
const OWN = [
  'scripts/_packet39b-util.mjs', 'scripts/_packet39b-content.mjs',
  'scripts/_packet39b-diagrams.mjs', 'scripts/_packet39b-assessment.mjs',
  'scripts/packet-39b-trade-global-economy.mjs',
  'audit/runs/packet-39b/brief.md', 'audit/runs/packet-39b/verify-b.md',
  'audit/runs/packet-39b/verify-draft.mjs', 'audit/runs/packet-39b/assemble-commit.mjs',
  'audit/runs/packet-39b/progress-row.md', 'audit/runs/packet-39b/decisions-to-append.md',
  'audit/runs/packet-39b/next-handoff.md', 'audit/runs/packet-39b/commit-message.txt',
  'audit/snapshots/packet-39b-bundle__economics__trade-global-economy.json',
];

git('read-tree HEAD');
for (const path of OWN) {
  const sha = blobFrom(readFileSync(path));
  git(`update-index --add --cacheinfo 100644,${sha},"${path}"`);
}
git(`update-index --add --cacheinfo 100644,${blobFrom(`${assembled}\n`)},"audit/ledger.json"`);

/* Shared prose files: HEAD's text plus this packet's own addition, never the working tree's copy. */
const appendToHead = (path, addition, where = 'end') => {
  const headText = sh(`git show HEAD:${path}`);
  const next = where === 'top'
    ? headText.replace(/^(# [^\n]*\n)/, `$1\n${addition}\n`)
    : `${headText.replace(/\n+$/, '')}\n\n${addition}\n`;
  git(`update-index --add --cacheinfo 100644,${blobFrom(next)},"${path}"`);
  return next.length - headText.length;
};

const progressRow = readFileSync('audit/runs/packet-39b/progress-row.md', 'utf8').trim();
const decisions = readFileSync('audit/runs/packet-39b/decisions-to-append.md', 'utf8').trim();
const nextBrief = readFileSync('audit/runs/packet-39b/next-handoff.md', 'utf8').trim();

const addedProgress = appendToHead('audit/PROGRESS.md', progressRow);
const addedDecisions = appendToHead('audit/DECISIONS.md', decisions);
const addedNext = appendToHead('audit/NEXT.md', nextBrief, 'top');

const tree = git('write-tree').trim();
const message = readFileSync('audit/runs/packet-39b/commit-message.txt', 'utf8');
const msgFile = `${process.env.TMPDIR || '/tmp'}/packet-39b-msg-${process.pid}`;
writeFileSync(msgFile, message);
const commit = execSync(`git commit-tree ${tree} -p ${oldHead} -F "${msgFile}"`, { maxBuffer: 1e9 }).toString().trim();
execSync(`rm -f "${msgFile}" "${tmpIndex}"`);

try {
  execSync(`git update-ref ${REF} ${commit} ${oldHead}`);
} catch (err) {
  console.log(`\nREFUSED by update-ref: HEAD moved while this commit was being assembled.`);
  console.log(`The commit object ${commit.slice(0, 8)} exists and is not lost. Re-run this script against the new HEAD.`);
  process.exit(1);
}

console.log(`  PROGRESS.md +${addedProgress} chars · DECISIONS.md +${addedDecisions} · NEXT.md +${addedNext}, each onto HEAD's version`);
console.log(`\ncommitted ${commit.slice(0, 8)} on top of ${oldHead.slice(0, 8)} — the working tree was not written to.`);
console.log('Other sessions\' uncommitted changes to these files are still on disk and still uncommitted.');
