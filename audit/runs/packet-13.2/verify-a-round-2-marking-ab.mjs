/* Verify A round 2 — fix 6 A/B. HEAD's marking.mjs (control) vs the shipping one (treatment),
 * over every template, 120 seeds each, and a wide sweep of responses per step. */
const ROOT = '/Users/arongijsel/Claude APP/economics-next-remediation';
const SP = '/private/tmp/claude-503/-Users-arongijsel-Claude-APP/d622bf5b-6b24-4743-a502-bdb609297ca1/scratchpad';
const { templates, buildItem } = await import(`${ROOT}/lib/quant/index.mjs`);
const now = await import(`${ROOT}/lib/quant/marking.mjs`);
const ctl = await import(`${SP}/ctl/marking-head.mjs`);

const stats = { cases: 0, byOutcome: {}, mismatchNonWrong: [], outcomeMismatch: [], wrongNotes: new Map() };
const push = (o) => { stats.byOutcome[o] = (stats.byOutcome[o]||0)+1; };

for (const t of templates) {
  for (let s = 0; s < 120; s++) {
    const item = buildItem(t.id, `ab-${t.id}-${s}`);
    // Build the full response space: for each step, many candidate answers.
    for (const step of item.steps) {
      const cands = [];
      if (step.type === 'choice') {
        cands.push(step.answer, ...(step.choices||[]), 'nonsense', null, '', undefined);
      } else {
        const a = Number(step.answer);
        cands.push(step.answer, String(a), a, a + (step.tolerance||0), a - (step.tolerance||0),
          a + 1e-10, -a, a*2, a/2, a+1, a-1, a+0.01, 0, 1, -1, 1e9,
          ...(step.slips||[]).map(sl => sl.value),
          null, '', undefined, 'abc', '$'+a, a.toFixed(2)+'%');
      }
      // Full responses so ofr chains fire, plus wrong-first-step responses so they fire the other way.
      const bases = [
        Object.fromEntries(item.steps.map(x => [x.id, x.answer])),
        Object.fromEntries(item.steps.map((x,i) => [x.id, i===0 ? (x.type==='choice' ? 'nope' : Number(x.answer)+3) : x.answer])),
        {},
      ];
      for (const base of bases) {
        for (const c of cands) {
          const responses = { ...base, [step.id]: c };
          const values = {};
          for (const x of item.steps) values[x.id] = x.type === 'choice' ? (responses[x.id] ?? null) : now.parseNumber(responses[x.id]);
          const rN = now.markStep(step, values[step.id], values);
          const rC = ctl.markStep(step, values[step.id], values);
          stats.cases++;
          push(rN.outcome);
          if (rN.outcome !== rC.outcome) stats.outcomeMismatch.push({t:t.id,step:step.id,c,n:rN.outcome,ctl:rC.outcome});
          if (rN.awarded !== rC.awarded || rN.marks !== rC.marks) stats.outcomeMismatch.push({t:t.id,step:step.id,c,awardedN:rN.awarded,awardedC:rC.awarded});
          if (rC.outcome !== 'wrong') {
            if (JSON.stringify(rN) !== JSON.stringify(rC)) stats.mismatchNonWrong.push({t:t.id,step:step.id,c,n:rN,ctl:rC});
          } else if (!stats.wrongNotes.has(`${t.id}:${step.id}`)) {
            stats.wrongNotes.set(`${t.id}:${step.id}`, { prefix: step.prefix||'', suffix: step.suffix||'', dp: step.dp, acceptAbs: !!step.acceptAbs, was: rC.note, isNow: rN.note });
          }
        }
      }
    }
  }
}
console.log('cases:', stats.cases);
console.log('outcome histogram:', stats.byOutcome);
console.log('outcome/awarded mismatches (any path):', stats.outcomeMismatch.length);
if (stats.outcomeMismatch.length) console.log(JSON.stringify(stats.outcomeMismatch.slice(0,5),null,1));
console.log('non-wrong result mismatches (correct/ofr/slip/blank must be identical):', stats.mismatchNonWrong.length);
if (stats.mismatchNonWrong.length) console.log(JSON.stringify(stats.mismatchNonWrong.slice(0,5),null,1));
console.log('\n--- the wrong note, before and after, one sample per numeric step ---');
for (const [k,v] of stats.wrongNotes) console.log(`${k.padEnd(38)} dp=${v.dp} prefix="${v.prefix}" suffix="${v.suffix}" abs=${v.acceptAbs}\n   WAS: ${v.was}\n   NOW: ${v.isNow}`);
