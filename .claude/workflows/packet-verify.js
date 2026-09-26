export const meta = {
  name: 'packet-verify',
  description: 'Verify a fix that landed OUTSIDE the packet-run loop: Verify A on the named ids, a targeted Verify B, then the books. Nothing in this workflow fixes anything.',
  whenToUse: 'When a rejection survived the fix budget and a remedy has since been applied, or the founder has granted exactly one more fix round (args.fix) (by the founder, another session, or an agent that should not have). Never resume packet-run for this: its Verify B prompt is round-invariant and replays the stale walkthrough from cache. args: {packet, ids, fixFiles, focus, round?, studentVisible?, section?}',
  phases: [
    { title: 'Fix', detail: 'only when the founder granted one more round (args.fix)', model: 'opus' },
    { title: 'Verify A', detail: 'the named ids only, by a method that is not the fix\'s own', model: 'opus' },
    { title: 'Verify B', detail: 'targeted student walk of exactly the path the fix changed', model: 'opus' },
    { title: 'Books', detail: 'correct the row and append the handoff; author nothing', model: 'sonnet' },
  ],
}

const ROOT = '/Users/arongijsel/Claude APP/economics-next-remediation'
const a = args || {}
const PACKET = a.packet
const IDS = Array.isArray(a.ids) ? a.ids : []
const FIX_FILES = Array.isArray(a.fixFiles) ? a.fixFiles : []
const FOCUS = a.focus || ''
const ROUND = Number.isInteger(a.round) ? a.round : 3
const STUDENT_VISIBLE = a.studentVisible !== false
const SECTION = a.section || null
const FIX = a.fix || null   // founder-granted single fix round; absent = verify only
if (!PACKET || !IDS.length || !FIX_FILES.length || !FOCUS) throw new Error('args.packet, ids[], fixFiles[] and focus are required')
const RUN = 'audit/runs/packet-' + PACKET

const COMMON = [
  '',
  'Revvy Learn remediation, packet ' + PACKET + '. Working directory: ' + ROOT + ', branch remediation/2026-09.',
  'Run every command from there. Rule 5: other sessions edit this worktree live — stage explicitly with',
  'git add <path>, never git add -A, never touch audit/EXAM-PRACTICE.md, never stage audit/ledger.json',
  'while a verifier is running, and do not commit: the founder commits. Rule 6: you may not publish,',
  'restore, or write live content; if the permission layer refuses an action, stop and report the exact',
  'command. VERIFY INDEPENDENTLY: find your evidence by a DIFFERENT method than the one that produced',
  'the thing you check; a check that shares the fix\'s method cannot see the fix\'s blind spot.',
  'SCOPE OF A SENTENCE: no sentence may state a scope it did not measure. Name what you measured, at the',
  'width you measured it, and nothing wider; "fixed" before a verifier ran and "confirmed at 390x844" after',
  'measuring one render are both true of the thing done and false of the thing claimed.',
  'Artefacts, not payloads: write working output to ' + RUN + '/ and return a short verdict, never content.',
  'Grep before read. You have NO authority to change code, content, tests or scripts in this workflow:',
  'if you find yourself editing anything but your own artefact file, stop and put it in escalate.',
  '',
  'THE FIX UNDER TEST landed outside the packet-run fix loop, so nothing has verified it. It touches:',
  ...FIX_FILES.map(f => '  ' + f),
  'See it with: git diff HEAD -- ' + FIX_FILES.map(f => '"' + f + '"').join(' '),
  '',
].join('\n')

const VERIFY_SCHEMA = {
  type: 'object',
  properties: {
    confirmed: { type: 'array', items: { type: 'string' } },
    rejected: { type: 'array', items: { type: 'string' }, description: 'id — one-paragraph reason with file:line and the measurement' },
    unverifiedRemaining: { type: 'number' },
    summary: { type: 'string' },
    artefacts: { type: 'array', items: { type: 'string' } },
    filesTouched: { type: 'array', items: { type: 'string' } },
    escalate: { type: 'array', items: { type: 'string' } },
  },
  required: ['confirmed', 'rejected', 'unverifiedRemaining', 'summary', 'artefacts', 'filesTouched', 'escalate'],
}

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

// ---------------------------------------------------------------------- FIX
// Only when the founder granted one more round. The brain passes the ruling verbatim in args.fix.
let fixed = null
if (FIX) {
  phase('Fix')
  fixed = await agent(COMMON.replace('You have NO authority to change code, content, tests or scripts in this workflow:', 'You are the ONE agent in this workflow allowed to change code, and only for this:') + [
    'YOUR JOB: close exactly this, and nothing else: ' + FIX,
    '',
    'Read the LAST "re-verification" section of ' + RUN + '/verify-a.md first: it holds the measurement that',
    'produced the rejection. Reproduce it before you change anything. Then fix the CLASS, not the path:',
    'three rounds have each closed one path and left the next open. Re-read every caller of what you',
    'change. Run npm test, npm run build, npm run validate; all must exit 0. Append "## Fix round ' + ROUND + '"',
    'to ' + RUN + '/built.md with file:line and the A/B you measured. Stage each file explicitly. Do not commit.',
  ].join('\n'), { label: 'fix-r' + ROUND, phase: 'Fix', model: 'opus', effort: 'high', schema: VERDICT })
  if (!fixed || !fixed.ok) return { packet: PACKET, ids: IDS, verdict: 'NOT PASSED', fix: fixed, escalate: (fixed && fixed.escalate) || [], nextAction: 'Fix did not land; nothing verified.' }
}

// ------------------------------------------------------------------ VERIFY A
phase('Verify A')
const verify = await agent(COMMON + [
  'YOUR INSTRUCTIONS ARE THE FILE .claude/agents/packet-verifier.md; read it and follow it.',
  '',
  'Scope: ONLY these ids: ' + IDS.join(', ') + '. Every other id on packet ' + PACKET + ' is already',
  'settled and must not be reopened. Read the LAST "re-verification" section of ' + RUN + '/verify-a.md',
  'first: it is the rejection this fix answers, with the measurement that produced it. Reproduce that',
  'measurement against the fixed build, then look for what the fix did NOT cover — the rejection named',
  'the path it saw; your job includes the paths it did not. Any test or script the fix wrote for itself',
  '(anything under ' + RUN + '/ dated after the rejection) is NOT admissible evidence.',
  'Record the result through audit/scripts/ledger.mjs exactly as packet-verifier.md says, and append',
  '"## Re-verification round ' + ROUND + '" to ' + RUN + '/verify-a.md with file:line and the measurement.',
  'Run the gate: npm test, npm run build, npm run validate; report exit codes.',
].join('\n'), { label: 'verify-a-r' + ROUND, phase: 'Verify A', model: 'opus', effort: 'high', schema: VERIFY_SCHEMA })

const ledgerClear = !!(verify && verify.unverifiedRemaining === 0 && (!verify.rejected || !verify.rejected.length))

// ------------------------------------------------------------------ VERIFY B
let walkthrough = null
if (STUDENT_VISIBLE && ledgerClear) {
  phase('Verify B')
  walkthrough = await agent(COMMON + [
    'YOUR INSTRUCTIONS ARE THE FILE .claude/agents/student-walkthrough.md; read it and follow it: you are',
    'a first-time student on a 390x844 phone, you report what is on screen in order, and you fix nothing.',
    '',
    'A TARGETED re-walk, not the full packet. Dev server: launch config `remediation-dev` on port 3001',
    '(reuse it if another session holds it; if it serves stale JSX, restart it, never patch around it).',
    'Viewport 390x844, storage cleared, signed out, real input.',
    SECTION ? 'Section under test: ' + SECTION : '',
    '',
    'THE PATH TO WALK: ' + FOCUS,
    '',
    'Then confirm the packet\'s original acceptance check in ' + RUN + '/verify-b.md still holds after the',
    'fix (reproduce its exact steps, do not trust the fix\'s description of itself). Include console errors.',
    'Append "## Targeted re-walk after round ' + ROUND + '" to ' + RUN + '/verify-b.md. Return a short verdict',
    'and any blocking defect.',
  ].filter(Boolean).join('\n'), { label: 'verify-b-r' + ROUND, phase: 'Verify B', model: 'opus', effort: 'high', schema: VERDICT })
} else if (STUDENT_VISIBLE) {
  log('Verify A still rejects; skipping Verify B')
}

const walkOk = !STUDENT_VISIBLE || !!(walkthrough && walkthrough.ok)
const passed = ledgerClear && walkOk

// --------------------------------------------------------------------- BOOKS
phase('Books')
const books = await agent(COMMON + [
  'YOUR JOB: bookkeeping only. You record; you never author, fix, or commit.',
  'Outcome for ' + IDS.join(', ') + ' after verification round ' + ROUND + ': ' + (passed ? 'PASSED' : 'DID NOT PASS'),
  '  ledger: ' + (verify ? verify.confirmed.length : 0) + ' confirmed, ' + (verify ? verify.rejected.length : 0) + ' rejected, ' + (verify ? verify.unverifiedRemaining : '?') + ' unverified',
  STUDENT_VISIBLE ? '  walkthrough: ' + (walkthrough ? (walkthrough.ok ? 'clean' : 'found a blocking defect') : 'not run') : '  walkthrough: n/a',
  '',
  'OTHER SESSIONS EDIT audit/PROGRESS.md AND audit/NEXT.md. Re-read each immediately before writing,',
  'change only packet ' + PACKET + '\'s row / append only one new section, git add each explicitly.',
  '1. Verify the state yourself first: node audit/scripts/ledger.mjs unverified ' + PACKET + '; read the',
  '   last sections of ' + RUN + '/verify-a.md and verify-b.md.',
  '2. Rewrite packet ' + PACKET + '\'s row in audit/PROGRESS.md honestly, in the style of the other rows.',
  '3. Append "## Handoff — packet ' + PACKET + ' verification round ' + ROUND + ' (brain)" to audit/NEXT.md: the',
  '   result, every unresolved item, and — if an earlier section of NEXT.md claims these ids are fixed',
  '   but unverified — say that this section supersedes it.',
  '4. git add audit/PROGRESS.md audit/NEXT.md. Do not commit.',
].join('\n'), { label: 'books-r' + ROUND, phase: 'Books', model: 'sonnet', schema: VERDICT })

const ALLOWED = ['audit/PROGRESS.md', 'audit/NEXT.md']
const breach = ((books && books.filesTouched) || []).filter(f => !ALLOWED.some(p => f.endsWith(p)) && !f.includes(RUN + '/'))

return {
  packet: PACKET,
  ids: IDS,
  verdict: passed ? 'PASSED' : 'NOT PASSED',
  fix: fixed ? { ok: fixed.ok, summary: fixed.summary, files: fixed.filesTouched } : null,
  ledger: verify ? { confirmed: verify.confirmed.length, rejected: verify.rejected, unverifiedRemaining: verify.unverifiedRemaining } : null,
  walkthrough: walkthrough ? { ok: walkthrough.ok, summary: walkthrough.summary } : (STUDENT_VISIBLE ? 'skipped' : 'n/a'),
  harnessBreach: breach.length ? breach : null,
  escalate: [].concat((verify && verify.escalate) || [], (walkthrough && walkthrough.escalate) || [], (books && books.escalate) || []),
  artefacts: RUN + '/  (verify-a.md, verify-b.md)',
  nextAction: passed
    ? 'Founder reviews ' + RUN + '/, then commits the fix files by name.'
    : 'Do NOT commit the fix files. A rejection after the fix budget is a founder decision.',
}
