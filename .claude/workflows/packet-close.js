export const meta = {
  name: 'packet-close',
  description: 'Close a verified packet after a founder decision: one targeted fix, a targeted re-walk, then correct the books',
  whenToUse: 'After packet-run returns NOT PASSED on a walkthrough defect the founder has ruled on. args: {packet, section, fix, filedAs, decision}',
  phases: [
    { title: 'Fix', detail: 'the one packet-specific defect the founder kept in scope', model: 'opus' },
    { title: 'Re-walk', detail: 'targeted 390x844 check of exactly what changed', model: 'opus' },
    { title: 'Books', detail: 'correct the PROGRESS row and append the handoff', model: 'sonnet' },
  ],
}

const ROOT = '/Users/arongijsel/Claude APP/economics-next-remediation'
const a = args || {}
const PACKET = a.packet
const SECTION = a.section
const SLUG = SECTION ? SECTION.split('__').pop() : null
const FIX = a.fix
const FILED = a.filedAs || ''
const DECISION = a.decision || ''
// 26 Sep (packet 45): a fix can land AFTER the founder has published. Both default to the old behaviour.
const PUBLISHED = a.published === true
const STAGE_BOOKS = a.stageBooks !== false
if (!PACKET || !SECTION || !FIX) throw new Error('args.packet, args.section and args.fix are required')
const RUN = 'audit/runs/packet-' + PACKET

const COMMON = [
  '',
  'Revvy Learn remediation, packet ' + PACKET + ' (' + SECTION + '). Working directory: ' + ROOT + ',',
  'branch remediation/2026-09. Run every command from there. ' + (PUBLISHED
    ? 'The section is ALREADY PUBLISHED (live data is the pre-fix version); this fix goes to the DRAFT only and the founder re-publishes it.'
    : 'The section is STAGED in draft, not published.'),
  'Rule 6: you may not publish or write live content. Other sessions edit this worktree live:',
  'stage explicitly with git add <path>, never git add -A, never touch audit/EXAM-PRACTICE.md, do not commit.',
  'Verify by a DIFFERENT method than the one that produced the thing you check. Grep before read. Write',
  'working output to ' + RUN + '/ and return a short verdict, never content.',
  '',
  'FOUNDER DECISION: ' + DECISION,
  FILED ? 'Filed programme-wide as ' + FILED + ' and therefore NOT in this packet\'s scope.' : '',
  '',
].filter(Boolean).join('\n')

const VERDICT = {
  type: 'object',
  properties: {
    ok: { type: 'boolean' },
    summary: { type: 'string' },
    artefacts: { type: 'array', items: { type: 'string' } },
    filesTouched: { type: 'array', items: { type: 'string' } },
    escalate: { type: 'array', items: { type: 'string' } },
  },
  required: ['ok', 'summary', 'artefacts', 'filesTouched', 'escalate'],
}

phase('Fix')
const fixed = await agent(COMMON + [
  'YOUR JOB: fix exactly this, and nothing else: ' + FIX,
  '',
  'Read ' + RUN + '/verify-b.md for the measured evidence first. Fix it at the SOURCE OF TRUTH the',
  'packet used to author the section (the scripts/packet-' + PACKET + '-*.mjs runner, not the database),',
  're-stage through that runner, regenerate the bundle with its --dump path, then run',
  '  node audit/scripts/check-staged-drafts.mjs ' + SLUG + '     (must report matches)',
  '  npm run validate                                              (must exit 0, 0 new BLOCK)',
  'Append a "Fix round (post founder decision)" section to ' + RUN + '/built.md with file:line.',
  'Stage the runner, the bundle snapshot and built.md explicitly. Do not commit.',
].join('\n'), { label: 'fix', phase: 'Fix', model: 'opus', effort: 'high', schema: VERDICT })

// A fix that could not be regenerated into the draft has not happened for the student. Re-walking
// the unchanged draft would only re-measure the defect (packet 37 did exactly that) and the drift
// check would report "matches" on old == old. Hard stop instead: straight to the books as BLOCKED.
let walk = null
if (fixed && fixed.ok) {
phase('Re-walk')
walk = await agent(COMMON + [
  'YOUR INSTRUCTIONS ARE THE FILE .claude/agents/student-walkthrough.md; read it and follow it.',
  '',
  'YOUR JOB: a TARGETED re-walk, not the full section. Dev server launch config remediation-dev on port',
  '3001 (reuse it if another session holds it). Viewport 390x844, signed out, ?draft=1. Navigate to',
  'the step(s) affected by this fix: ' + FIX,
  'Measure, do not eyeball: read the bounding boxes of the affected labels/elements with',
  'javascript_tool and report whether any overlap, then take one screenshot. Also confirm the fix did',
  'not change any other step: compare the step count and chapter headers to ' + RUN + '/verify-b.md.',
  'Write to ' + RUN + '/verify-b-fix.md. Return a short verdict.',
].join('\n'), { label: 're-walk', phase: 'Re-walk', model: 'opus', effort: 'high', schema: VERDICT })
} else {
  log('Fix did not land in the draft; skipping the re-walk and recording the packet as BLOCKED')
}

const passed = !!(fixed && fixed.ok && walk && walk.ok)

phase('Books')
const books = await agent(COMMON + [
  'YOUR JOB: bookkeeping only. Author nothing, fix nothing, do not commit.',
  'Outcome: fix ' + (fixed && fixed.ok ? 'applied' : 'FAILED TO LAND (regeneration refused; see built.md)') + '; re-walk ' + (walk ? (walk.ok ? 'clean' : 'FOUND A DEFECT') : 'not run') + '.',
  (fixed && !fixed.ok) ? 'The packet is BLOCKED, not closed. Say so in the row and the handoff, and name the blocker from built.md.' : '',
  '',
  'OTHER SESSIONS EDIT audit/PROGRESS.md AND audit/NEXT.md. Re-read each immediately before writing,',
  'change only this packet\'s row / append only one section, git add each explicitly.',
  '',
  '1. Verify the true state yourself before writing it: run',
  '     node audit/scripts/ledger.mjs unverified ' + PACKET,
  '     node audit/scripts/check-staged-drafts.mjs ' + SLUG,
  '   and read ' + RUN + '/verify-a.md, verify-b.md, verify-b-fix.md and built.md.',
  '2. Rewrite packet ' + PACKET + '\'s row in audit/PROGRESS.md in the style of the other done content rows:',
  PUBLISHED
    ? '   KEEP the row\'s existing PUBLISHED status, time and undo command (the section is live); add this fix as "staged to draft, awaiting the founder\'s re-publish"; the ledger result;'
    : '   built and verified, staged not published, holds for the packet 5/7 checkpoint; the ledger result;',
  '   the walkthrough result including the defect filed out as ' + FILED + ' and the fix made here;',
  '   the pointer-versioning ledger item this packet\'s Verify B caused to be filed on packet 5 (find it',
  '   with `node audit/scripts/ledger.mjs packet 5` - its title starts "Version the Learn Mode step',
  '   pointer" - and cite its id); snapshot files; gate results.',
  '3. Append "## Handoff — packet ' + PACKET + ' closed (' + 'brain)" to audit/NEXT.md with the same facts,',
  '   the exact publish command for the founder, the D013 post-publish census step if verify-b.md names',
  '   one, and the next unclaimed packet: check `git status --short | grep packet-<n>` and',
  '   `node audit/scripts/ledger.mjs packet <n> --open` for the next numbers, and report which is free.',
  STAGE_BOOKS ? '4. git add audit/PROGRESS.md audit/NEXT.md. Do not commit.'
    : '4. Do NOT git add audit/PROGRESS.md or audit/NEXT.md: a staged copy of a shared handoff file is a snapshot of every session\'s rows and has deleted them before. Leave both in the working tree. Do not commit.',
  'Return the new row verbatim, the heading appended, and the next free packet number with evidence.',
].join('\n'), { label: 'books', phase: 'Books', model: 'sonnet', schema: VERDICT })

return {
  packet: PACKET,
  verdict: passed ? (PUBLISHED ? 'CLOSED — fix staged to draft and re-walked, awaiting the founder\'s re-publish' : 'CLOSED — staged and verified, awaiting founder commit and the 5/7 checkpoint') : 'NOT CLOSED',
  fix: fixed ? { ok: fixed.ok, summary: fixed.summary, files: fixed.filesTouched } : null,
  rewalk: walk ? { ok: walk.ok, summary: walk.summary } : null,
  books: books ? { ok: books.ok, summary: books.summary } : null,
  escalate: [].concat((fixed && fixed.escalate) || [], (walk && walk.escalate) || [], (books && books.escalate) || []),
  artefacts: RUN + '/',
}
