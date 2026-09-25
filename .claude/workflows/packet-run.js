export const meta = {
  name: 'packet-run',
  description: 'Run one Revvy Learn remediation packet end to end: brief, author, gate, Verify A, Verify B, handoff',
  whenToUse: 'The Fable brain invokes this once per packet. args: {packet, goal, section?, studentVisible?, maxFixRounds?}',
  phases: [
    { title: 'Brief', detail: 'read the handoff files and the ledger; write the work list', model: 'sonnet' },
    { title: 'Author', detail: 'do the packet work', model: 'opus' },
    { title: 'Gate', detail: 'npm test, npm run build, npm run validate', model: 'haiku' },
    { title: 'Verify A', detail: 'adversarial read-only verifier against the ledger', model: 'opus' },
    { title: 'Fix', detail: 'close rejections, then re-verify', model: 'opus' },
    { title: 'Verify B', detail: 'student walkthrough at 390x844', model: 'opus' },
    { title: 'Handoff', detail: 'update PROGRESS row and write the next brief', model: 'haiku' },
  ],
}

// ---------------------------------------------------------------------------
// WHY THIS EXISTS
//
// 28 content packets remain and each was a hand-driven session: paste
// audit/SESSION-PROMPT.md, babysit, read the verdict, write the handoff. This
// runs that loop with a cheap brain and expensive workers, so the expensive
// model is spent on authoring and verification and nothing else.
//
// THE TOKEN RULE THAT MATTERS MOST: artefacts, not payloads. Every agent writes
// its output to audit/runs/packet-<n>/ and returns a short verdict. Nothing in
// this file ever returns content into the brain's context. A design workflow in
// an earlier session returned 291KB of JSON into a conversation and that single
// mistake cost more than the whole run that produced it.
//
// Date.now() and Math.random() are unavailable in workflow scripts.
// ---------------------------------------------------------------------------

const ROOT = '/Users/arongijsel/Claude APP/economics-next-remediation'

const a = args || {}
const PACKET = a.packet
// Keep goals short and free of counts: numbers restated here go stale while the packet runs
// (packet 37's goal said 31 open ids and 'packets 32-36 awaiting commit'; both were false by Verify A).
const GOAL = a.goal || '(see the packet spec block in audit/NEXT.md)'
const SECTION = a.section || null
// 'business__managing-finance' -> 'managing-finance', the slug the content scripts take.
const SLUG = SECTION ? SECTION.split('__').pop() : null
const STUDENT_VISIBLE = a.studentVisible !== false
const MAX_FIX_ROUNDS = Number.isInteger(a.maxFixRounds) ? a.maxFixRounds : 2

if (!PACKET && PACKET !== 0) throw new Error('args.packet is required, e.g. {packet: 32, goal: "..."}')

const RUN = 'audit/runs/packet-' + PACKET

// Every agent gets this. It is deliberately short: it forces the agent to read
// the real documents rather than trusting a paraphrase of them here.
const COMMON = [
  '',
  'You are working on the Revvy Learn remediation programme, packet ' + PACKET + '.',
  'Working directory: ' + ROOT + '  (branch remediation/2026-09). Run every command from there.',
  'Goal for this packet: ' + GOAL,
  SECTION ? 'Section: ' + SECTION : '',
  '',
  'READ THESE, DO NOT TRUST ANY SUMMARY OF THEM: audit/PROTOCOL.md; the "## Packet ' + PACKET + ' spec"',
  'block and the newest "Handoff" in audit/NEXT.md; this packet\'s row in audit/PROGRESS.md; the Settled',
  'list in audit/DECISIONS.md; and for content work audit/CONTENT-GATE.md including the recall contract.',
  'If any of those contradict each other, STOP and say so in your return value. Do not pick one.',
  '',
  'SIX RULES. Each is in audit/SESSION-PROMPT.md because breaking it cost this programme a day:',
  '  1. An audit item is a CLAIM, not an instruction. Check every item\'s scope against the specification',
  '     in audit/raw/ before acting. Four items once told a packet to delete a topic the spec requires.',
  '     Never look up a requirement by the spec NUMBER in a ledger item: 154 items cite UK GCE numbers',
  '     that do not exist in the IAL spec. Find the requirement by its WORDING in audit/raw/*_spec.txt.',
  '  2. Nothing that talks to Supabase may run during `next build`, and only the anon client at build',
  '     time. A green local build is not evidence the Vercel preview builds.',
  '  3. Content can crash production without a deploy. Before any publish, confirm the components on',
  '     origin/main can read every FIELD your content carries. Matching type names is not the test.',
  '  4. Fix the field you were shown, then read every other field of the same entry and its notes twin.',
  '  5. ANOTHER SESSION MAY BE IN THIS WORKTREE RIGHT NOW. Stage files explicitly. Never `git add -A`.',
  '     Never touch audit/EXAM-PRACTICE.md. Never commit audit/ledger.json while a verifier is running.',
  '  6. You may NOT publish, restore, or otherwise write live content. If the work needs it, stop and say',
  '     so in your return value with the exact command a human should run. Do not work around a refusal.',
  '',
  'VERIFY INDEPENDENTLY: a check that finds its evidence the same way the fix does cannot see the fix\'s',
  'blind spot. This has now bitten this programme four times. When you check something, locate the',
  'evidence by a DIFFERENT method than the one that produced it.',
  '',
  'TOKEN DISCIPLINE, which is why this runs as a workflow at all:',
  '  - Locate with grep/rg first; read only the line ranges you need. Do not cat whole files.',
  '  - Write your working output to ' + RUN + '/ . Return a SHORT verdict, never the content itself.',
  '  - Your return value is read by an orchestrator, not a human. No preamble, no restating the brief.',
  '',
].filter(Boolean).join('\n')

const VERDICT = {
  type: 'object',
  properties: {
    ok: { type: 'boolean' },
    summary: { type: 'string', description: 'at most 5 sentences, for an orchestrator' },
    artefacts: { type: 'array', items: { type: 'string' }, description: 'paths written under ' + RUN },
    filesTouched: { type: 'array', items: { type: 'string' }, description: 'repo files created or modified' },
    escalate: { type: 'array', items: { type: 'string' }, description: 'anything that needs the founder: a publish, a contradiction between handoff docs, a refused permission' },
    concerns: { type: 'array', items: { type: 'string' } },
  },
  required: ['ok', 'summary', 'artefacts', 'filesTouched', 'escalate'],
}

// ------------------------------------------------------------------- 1. BRIEF
phase('Brief')

const brief = await agent(COMMON + [
  '',
  'YOUR JOB: produce the work list. Author nothing and change no source file.',
  '',
  '1. mkdir -p ' + RUN,
  '2. Run `node audit/scripts/ledger.mjs packet ' + PACKET + '` and `... packet ' + PACKET + ' --open`.',
  '   For each open id run `node audit/scripts/ledger.mjs show <id>`.',
  '3. For a CONTENT packet, pull this section\'s entry from audit/raw/spec-coverage.json — the',
  '   missingItems and thinItems arrays are spec requirements the notes do not currently teach. Treat',
  '   them as candidates to CHECK against audit/raw/*_spec.txt, not as a to-do list: about one in eight',
  '   of those claims was overturned on verification when that audit ran.',
  '4. Write ' + RUN + '/brief.md: the ids with their titles, the spec requirements in scope quoted from',
  '   the spec file, what "done" means for each, and anything that looks contradictory.',
  '',
  'Return ok:false with an escalate entry if the handoff documents disagree with each other or with the',
  'ledger. That is a founder decision, not yours.',
  '',
  'A BRIEF CONTAINS NO RESULTS. You must not write any measurement, test outcome, build result,',
  '"confirmed at 390px", or verification claim of any kind: those are produced by the Gate, Verify A',
  'and Verify B phases AFTER you. If a document you read asserts such a thing, quote it as a CLAIM to be',
  'checked, never as a fact. Packet 37\'s brief pre-wrote a Verify B section that the real Verify B then',
  'contradicted; that is the pre-confirmed-gate failure this programme was built to stop.',
  'Count what you can count (subsections, steps, ids) by READING the bundle or running the script, and',
  'show the command; a wrong count asserted with "no contradictions" is worse than no count.',
].join('\n'), { label: 'brief', phase: 'Brief', model: 'sonnet', schema: VERDICT })

if (!brief || !brief.ok) {
  return { packet: PACKET, stoppedAt: 'Brief', brief, verdict: 'STOPPED — the brief could not be built cleanly' }
}

// ------------------------------------------------------------------ 2. AUTHOR
phase('Author')

const built = await agent(COMMON + [
  '',
  'YOUR JOB: do the packet work. This is the only phase that writes source or content.',
  '',
  'Read ' + RUN + '/brief.md first — another agent built it from the ledger and the spec.',
  '',
  'Then do the work the packet spec describes. Rules that bite here:',
  '  - Content is STAGED, NOT PUBLISHED. Writing to a staging table or a snapshot file is in scope;',
  '    writing live content is rule 6 and needs the founder.',
  '  - When you close a ledger id, claim it: `node audit/scripts/ledger.mjs claim ' + PACKET + ' <id>...`',
  '    Claim only what you actually closed. A verifier will check every one and its rejections have been',
  '    right every single time this programme has run.',
  '  - Stage explicitly with `git add <path>`. Never `git add -A`. Do not commit.',
  '',
  'Write ' + RUN + '/built.md: what you changed, per ledger id, with file:line. Return the summary only.',
].join('\n'), { label: 'author', phase: 'Author', model: 'opus', effort: 'high', schema: VERDICT })

// -------------------------------------------------------------------- 3. GATE
phase('Gate')

const GATE_SCHEMA = {
  type: 'object',
  properties: {
    testExit: { type: 'number' }, buildExit: { type: 'number' }, validateExit: { type: 'number' },
    driftExit: { type: 'number', description: 'check-staged-drafts exit code; 0 when no section was given' },
    advisory: { type: 'array', items: { type: 'string' }, description: 'exit codes for contrast, spec-items, tariff-census, pin-check' },
    ok: { type: 'boolean', description: 'true only when test, build, validate and the drift check all exited 0' },
    failureHead: { type: 'string', description: 'if anything failed, the first 20 lines of the failing output and nothing else' },
  },
  required: ['testExit', 'buildExit', 'validateExit', 'driftExit', 'ok'],
}

const gate = await agent(COMMON + [
  '',
  'YOUR JOB: run the gate. Change nothing. Diagnose nothing. Report exit codes.',
  '',
  'In order, capturing each exit code:',
  '  npm test          npm run build          npm run validate',
  '  npm run exposure  npm run recalls        (HARD, packet 2.7 onward: exposure fails on a chapter',
  '   starved of a question it could have had; recalls fails when a section hands the student more',
  '   answers by scrolling up than audit/recall-census-baseline.json records, and a section with NO',
  '   row there is held to ZERO. recall.recoverable is INFO, so neither validate nor the runner\'s own',
  '   "0 new DEBT" gate can see it and this is the only command in the tree that can.)',
  SLUG ? '  node audit/scripts/check-staged-drafts.mjs ' + SLUG + '   (HARD: the staged snapshot must match the draft row;' : '',
  SLUG ? '   packet 36 shipped a snapshot that silently drifted from its draft after a fix round and Verify A missed it)' : '',
  'Then these as ADVISORY only (record the code, do not act):',
  '  npm run contrast     npm run spec-items     npm run tariff-census     npm run pin-check',
  '',
  'Write full output to ' + RUN + '/gate.log. Return exit codes and, if something failed, at most the',
  'first 20 lines of the failing command. Do not paste passing output anywhere in your return value.',
  '',
  'After a content publish the protocol also wants `node audit/scripts/validate-content.mjs --baseline`',
  'WITHOUT --confirm, and every key it wants to add read: a re-key of the same rule on the same item is',
  'expected, anything else is new debt. Run it only if built.md says content was published.',
].join('\n'), { label: 'gate', phase: 'Gate', model: 'haiku', schema: GATE_SCHEMA })

// ---------------------------------------------------------------- 4. VERIFY A
phase('Verify A')

const VERIFY_SCHEMA = {
  type: 'object',
  properties: {
    confirmed: { type: 'array', items: { type: 'string' } },
    rejected: { type: 'array', items: { type: 'string' }, description: 'id — why it is still reachable' },
    unverifiedRemaining: { type: 'number', description: 'from `ledger.mjs unverified ' + PACKET + '` after you recorded verdicts' },
    summary: { type: 'string' },
  },
  required: ['confirmed', 'rejected', 'unverifiedRemaining', 'summary'],
}

const VERIFY_PROMPT = [
  'YOUR INSTRUCTIONS ARE THE FILE .claude/agents/packet-verifier.md in the working directory. Read it',
  'first and follow its Procedure section exactly: you are read-only, adversarial, and you record',
  'every verdict through the ledger CLI.',
  '',
  'Verify packet ' + PACKET + ' of the Revvy Learn remediation. Working directory: ' + ROOT + '.',
  '',
  'You have NOT seen the builder\'s conversation and you must not ask for it. Do not read',
  RUN + '/built.md — being told what someone believes they did is how a verifier stops verifying.',
  'Start from `node audit/scripts/ledger.mjs unverified ' + PACKET + '` and the diff',
  '(`git diff` plus `git diff --cached`), and decide for yourself.',
  '',
  'Confirm an id ONLY if the defect in its title can no longer occur and you can point at the lines that',
  'make it so. Partial mitigation is a reject with a note on what remains. Record every verdict through',
  'the ledger CLI, one call per id.',
  '',
  'Find your evidence by a DIFFERENT method than the fix used. Four times now this programme has shipped',
  'a check that shared the fix\'s blind spot and certified a broken thing green.',
  '',
  'Write your reasoning to ' + RUN + '/verify-a.md. Return the id lists and the remaining unverified',
  'count, not your reasoning.',
].join('\n')

let verify = await agent(VERIFY_PROMPT, {
  label: 'verify-a', phase: 'Verify A', model: 'opus', effort: 'high',
  schema: VERIFY_SCHEMA,
})

// --------------------------------------------------------------------- 5. FIX
// Rejections are expected: every rejection this programme has produced was correct.
let fixRounds = 0
while (verify && verify.rejected && verify.rejected.length && fixRounds < MAX_FIX_ROUNDS) {
  fixRounds += 1
  phase('Fix')
  log('Verify A rejected ' + verify.rejected.length + ' id(s); fix round ' + fixRounds + ' of ' + MAX_FIX_ROUNDS)

  await agent(COMMON + [
    '',
    'YOUR JOB: close these verifier rejections. Fix round ' + fixRounds + '.',
    '',
    'REJECTED:',
    verify.rejected.map(r => '  - ' + r).join('\n'),
    '',
    'The verifier was right. Do not argue with it and do not re-claim an id you have not actually fixed.',
    'Apply rule 4: fix the field you were shown, then read every other field of the same entry and its',
    'notes twin, because a rule written for prose will not match a flow step, a takeaway or a flashcard.',
    '',
    'Append to ' + RUN + '/built.md. Stage explicitly. Do not commit.',
  ].join('\n'), { label: 'fix-' + fixRounds, phase: 'Fix', model: 'opus', effort: 'high', schema: VERDICT })

  phase('Verify A')
  verify = await agent(VERIFY_PROMPT + '\n\nThis is re-verification round ' + fixRounds +
    '. Re-check the previously rejected ids yourself; do not take a claim of a fix on trust.', {
    label: 'verify-a-r' + fixRounds, phase: 'Verify A', model: 'opus', effort: 'high',
    schema: VERIFY_SCHEMA,
  })
}

// ---------------------------------------------------------------- 6. VERIFY B
let walkthrough = null
if (STUDENT_VISIBLE) {
  phase('Verify B')
  walkthrough = await agent([
    'YOUR INSTRUCTIONS ARE THE FILE .claude/agents/student-walkthrough.md in the working directory. Read',
    'it first and follow it: you are a first-time student on a 390x844 phone, you report what is on',
    'screen in order, and you fix nothing.',
    '',
    'Walk the student flow for packet ' + PACKET + ' of Revvy Learn. Working directory: ' + ROOT + '.',
    SECTION ? 'Section under test: ' + SECTION : '',
    '',
    'Dev server: launch config `remediation-dev` on port 3001. Viewport 390x844, storage cleared, real',
    'input, and scroll wherever the change renders. Read ' + RUN + '/brief.md for what the packet was',
    'meant to achieve for a student — not for what was built.',
    '',
    'Report what the STUDENT ends up with, never how a widget behaves. Include console errors.',
    '',
    'Two failures this programme has already shipped, so look for them specifically: a table that passes',
    'every structural check and is illegible at 390px because nothing measured cell WIDTH; and a resume',
    'pointer that renders "step 20 of 9" with a blank body.',
    '',
    'Write the walkthrough to ' + RUN + '/verify-b.md. Return a short verdict and any blocking defect.',
  ].filter(Boolean).join('\n'), {
    label: 'verify-b', phase: 'Verify B', model: 'opus', effort: 'high',
    schema: VERDICT,
  })
}

// ------------------------------------------------- 6b. FIX AFTER VERIFY B
// Added 18 Sep, packet 12.1 (mark-filter chip regression): a walkthrough failure deserves a fix
// round exactly like a Verify A rejection does. Without this, a student-visible defect found here
// had no path back to the Author — the loop only ever re-ran for ledger rejections. Shares the
// same MAX_FIX_ROUNDS budget as Verify A's loop (fixRounds + bRounds), not a separate allowance,
// so a packet cannot spend 2+2 rounds by construction.
let bRounds = 0
while (STUDENT_VISIBLE && walkthrough && !walkthrough.ok && (fixRounds + bRounds) < MAX_FIX_ROUNDS) {
  bRounds += 1
  phase('Fix')
  log('Verify B found a blocking defect; fix round B' + bRounds)

  await agent(COMMON + [
    '',
    'YOUR JOB: close the defect(s) the student walkthrough found. Fix round B' + bRounds + '.',
    '',
    'WALKTHROUGH VERDICT:',
    (walkthrough.summary || '(see ' + RUN + '/verify-b.md)'),
    '',
    'Read ' + RUN + '/verify-b.md for the exact repro steps. Restart the dev server before checking',
    'anything (`rm -rf .next/cache` first — Turbopack has served stale output through several reloads',
    'before). Apply rule 4: fix the field you were shown, then read every other field of the same entry',
    'and its twin.',
    '',
    'Append to ' + RUN + '/built.md. Stage explicitly. Do not commit. Do not edit audit/NEXT.md,',
    'PROGRESS.md or DECISIONS.md — Handoff does that once, at the end.',
  ].join('\n'), { label: 'fix-b' + bRounds, phase: 'Fix', model: 'opus', effort: 'high', schema: VERDICT })

  phase('Verify A')
  verify = await agent(VERIFY_PROMPT + '\n\nThis is re-verification after walkthrough fix round B' + bRounds +
    '. The fix may have touched ids Verify A already confirmed — re-check anything the diff shows changed,' +
    ' from the diff itself, not from a claim.', {
    label: 'verify-a-b' + bRounds, phase: 'Verify A', model: 'opus', effort: 'high',
    schema: VERIFY_SCHEMA,
  })

  phase('Verify B')
  walkthrough = await agent([
    'YOUR INSTRUCTIONS ARE THE FILE .claude/agents/student-walkthrough.md in the working directory. Read',
    'it first and follow it.',
    '',
    'Re-walk the student flow for packet ' + PACKET + ' after fix round B' + bRounds + '. Working',
    'directory: ' + ROOT + '. Restart `remediation-dev` (port 3001) before looking at anything.',
    'Viewport 390x844, storage cleared, real input.',
    '',
    'Read ' + RUN + '/verify-b.md for the defect(s) previously found; confirm each is gone by',
    'reproducing its exact steps, not by trusting the fix\'s own description of itself.',
    '',
    'Write to ' + RUN + '/verify-b-r' + bRounds + '.md. Return a short verdict and any blocking defect.',
  ].join('\n'), { label: 'verify-b-r' + bRounds, phase: 'Verify B', model: 'opus', effort: 'high', schema: VERDICT })
}
fixRounds += bRounds

// ----------------------------------------------------------------- 7. HANDOFF
const gateOk = !!(gate && gate.ok)
const ledgerClear = !!(verify && verify.unverifiedRemaining === 0 && (!verify.rejected || !verify.rejected.length))
const walkOk = !STUDENT_VISIBLE || !!(walkthrough && walkthrough.ok)
const passed = gateOk && ledgerClear && walkOk

phase('Handoff')

const handoff = await agent(COMMON + [
  '',
  'YOUR JOB: bookkeeping only. Author nothing, fix nothing, and do not commit.',
  '',
  'Outcome of packet ' + PACKET + ': ' + (passed ? 'PASSED the gate' : 'DID NOT PASS'),
  '  gate: test=' + (gate ? gate.testExit : '?') + ' build=' + (gate ? gate.buildExit : '?') +
    ' validate=' + (gate ? gate.validateExit : '?') + ' drift=' + (gate ? gate.driftExit : '?'),
  '  ledger: ' + (verify ? verify.confirmed.length : 0) + ' confirmed, ' +
    (verify ? verify.rejected.length : 0) + ' still rejected, ' +
    (verify ? verify.unverifiedRemaining : '?') + ' unverified',
  '  fix rounds used: ' + fixRounds + ' of ' + MAX_FIX_ROUNDS,
  STUDENT_VISIBLE ? '  walkthrough: ' + (walkOk ? 'clean' : 'found a blocking defect') : '  walkthrough: n/a',
  '',
  'ANOTHER SESSION IS EDITING audit/PROGRESS.md AND audit/NEXT.md. Re-read each file immediately before',
  'you write it, change only this packet\'s row / append only a new section, and never `git add -A`.',
  '',
  '1. Update this packet\'s row in audit/PROGRESS.md honestly. "done and verified" ONLY if the gate',
  '   passed AND the ledger is clear. Otherwise record what actually happened and what is left.',
  '2. Append a "## Handoff — what comes next" section to audit/NEXT.md naming the next packet, anything',
  '   this packet learned that the next one needs, and every unresolved item.',
  '3. Do not write a commit. The founder commits.',
].join('\n'), { label: 'handoff', phase: 'Handoff', model: 'haiku', schema: VERDICT })

// Everything below is read by the brain. Keep it small on purpose.
return {
  packet: PACKET,
  verdict: passed ? 'PASSED' : 'NOT PASSED',
  gate: gate ? { test: gate.testExit, build: gate.buildExit, validate: gate.validateExit, drift: gate.driftExit, failureHead: gate.failureHead || null } : null,
  ledger: verify ? {
    confirmed: verify.confirmed.length,
    rejected: verify.rejected,
    unverifiedRemaining: verify.unverifiedRemaining,
  } : null,
  fixRoundsUsed: fixRounds,
  walkthrough: walkthrough ? { ok: walkthrough.ok, summary: walkthrough.summary } : 'n/a',
  escalate: [].concat(
    (brief && brief.escalate) || [], (built && built.escalate) || [],
    (walkthrough && walkthrough.escalate) || [], (handoff && handoff.escalate) || [],
  ),
  artefacts: RUN + '/  (brief.md, built.md, gate.log, verify-a.md, verify-b.md)',
  nextAction: passed
    ? 'Founder reviews ' + RUN + '/, then commits and moves to the next packet.'
    : 'Do NOT commit. Read ' + RUN + '/ and decide: another fix round, a scope change, or a founder decision.',
}
