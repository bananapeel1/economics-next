// `npm test`. The Learn Mode step model, packet 5. These are the invariants the audit found
// broken: a recall shown twice in a row, a recall never shown, two headings per step, a step count
// the overview could not predict, and a saved pointer past the end.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { buildSteps, countSteps, pickSpacedRecall, spacedPermutation, clampStep, furthestStep, recallId, firstStepOfBlock, contentVersion, encodePointer, parsePointer, resolvePointer, LEGACY_POINTER_EPOCH } from './learn-steps.js';
import { reorderStartOrder } from './recall-widgets.js';

const sec = (id, recall) => ({ id, title: `Title ${id}`, keyIdea: 'k', body: [{ type: 'paragraph', text: 'p' }], recall });
const reorder = (id) => ({ id: `${id}:recall`, type: 'reorder', prompt: 'Order', correctOrder: ['a', 'b', 'c', 'd'], shuffled: [2, 0, 3, 1] });
const fillin = (id) => ({ id: `${id}:recall`, type: 'fillin', prompt: 'Fill', template: ['x ___'], answers: ['y'], hints: ['h'] });

const content = [
  { title: 'Chapter A', takeaway: ['t'], quizIndices: [0], sections: [sec('a1', reorder('a1')), sec('a2', fillin('a2')), sec('a3')] },
  { title: 'Chapter B', takeaway: ['t'], sections: [sec('b1', fillin('b1'))] },
  { title: 'Chapter C', takeaway: ['t'], sections: [sec('c1', reorder('c1')), sec('c2', reorder('c2'))] },
];

test('one subsection per teach step, one check-in per chapter, in order', () => {
  const steps = buildSteps(content);
  assert.deepEqual(steps.map((s) => s.type), ['teach', 'teach', 'teach', 'checkin', 'teach', 'checkin', 'teach', 'teach', 'checkin']);
  assert.equal(countSteps(content), 9);
  assert.equal(steps[0].partCount, 3); assert.equal(steps[2].isLastInBlock, true); assert.equal(steps[4].isFirstInBlock, true);
  assert.equal(steps[3].quizIndices[0], 0, 'the check-in carries the chapter pins');
  assert.equal(firstStepOfBlock(steps, 2), 6);
});

test('every recall is shown on its own teach step exactly once', () => {
  const steps = buildSteps(content);
  const own = steps.filter((s) => s.type === 'teach' && s.section.recall).map((s) => s.section.recall.id);
  assert.deepEqual(own, ['a1:recall', 'a2:recall', 'b1:recall', 'c1:recall', 'c2:recall']);
});

test('a spaced recall comes from an earlier chapter, never the current one, and each is spaced at most once', () => {
  const steps = buildSteps(content);
  const used = new Set();
  const first = pickSpacedRecall(steps, 3, used);
  assert.equal(first, null, 'the first chapter has nothing earlier to space');
  const second = pickSpacedRecall(steps, 5, used);
  assert.equal(second.id, 'a1:recall'); assert.equal(second.fromBlockIndex, 0); assert.ok(5 - second.fromStep >= 2);
  used.add(second.id);
  const third = pickSpacedRecall(steps, 8, used);
  assert.equal(third.id, 'b1:recall', 'V034: chapter A has already supplied one, so chapter B goes next');
  used.add(third.id);
  const fourth = pickSpacedRecall(steps, 8, used);
  assert.equal(fourth.id, 'a2:recall', 'every eligible chapter has now supplied one, so A is revisited, earliest first');
  used.add(fourth.id);
  assert.equal(pickSpacedRecall(steps, 8, used), null, 'c1 and c2 belong to the current chapter and must not be spaced here');
  assert.equal(pickSpacedRecall(steps, 4, used), null, 'a teach step never carries a spaced recall');
});

test('a skipped recall comes back at the next eligible check-in ahead of the default pick (F055)', () => {
  const steps = buildSteps(content);
  const used = new Set();
  // Chapter B's fill-in was skipped; chapter C's check-in would otherwise show a1 (the earliest).
  const pick = pickSpacedRecall(steps, 8, used, new Set(['b1:recall']));
  assert.equal(pick.id, 'b1:recall');
  assert.ok(pick.fromBlockIndex < steps[8].blockIndex, 'still from an earlier chapter');
  // A skipped recall from the CURRENT chapter is not eligible: the chapter rule wins.
  assert.equal(pickSpacedRecall(steps, 3, used, new Set(['a1:recall'])), null);
  // Once used it is not shown again; the default order resumes.
  used.add('b1:recall');
  assert.equal(pickSpacedRecall(steps, 8, used, new Set(['b1:recall'])).id, 'a1:recall');
});

test('spaced recalls spread across the earlier chapters instead of exhausting chapter 1 (V034)', () => {
  /*
   * The shape the corpus actually has: five chapters, and chapter 1 holds as many recalls as there
   * are spaced slots. Under the old rule ("the earliest unspaced recall") every slot came from
   * chapter 1 — measured on `financial-planning`, all four check-ins read "Recall from chapter 1",
   * and across the staged corpus 80% of spaced showings came from the first chapter.
   */
  const wide = [
    { title: 'Ch 1', sections: [sec('p1', fillin('p1')), sec('p2', fillin('p2')), sec('p3', fillin('p3')), sec('p4', fillin('p4'))] },
    { title: 'Ch 2', sections: [sec('q1', fillin('q1')), sec('q2', fillin('q2'))] },
    { title: 'Ch 3', sections: [sec('r1', fillin('r1')), sec('r2', fillin('r2'))] },
    { title: 'Ch 4', sections: [sec('s1', fillin('s1')), sec('s2', fillin('s2'))] },
    { title: 'Ch 5', sections: [sec('t1', fillin('t1'))] },
  ];
  const steps = buildSteps(wide);
  const used = new Set();
  const picks = [];
  steps.forEach((st, i) => {
    if (st.type !== 'checkin') return;
    const pick = pickSpacedRecall(steps, i, used);
    if (pick) { used.add(pick.id); picks.push(pick); }
  });
  assert.equal(picks.length, 4, 'four check-ins have an earlier chapter to draw from');
  assert.deepEqual(picks.map((p) => p.fromBlockIndex), [0, 1, 2, 3], 'one from each earlier chapter, oldest first');
  assert.deepEqual(picks.map((p) => p.id), ['p1:recall', 'q1:recall', 'r1:recall', 's1:recall']);
  // and the spacing rule itself still holds on every one of them
  for (const p of picks) assert.ok(p.fromBlockIndex < steps.findIndex((st) => st.type === 'checkin' && st.blockIndex === p.fromBlockIndex));
});

test('a chapter is only drawn from twice once every other eligible chapter has been drawn from (V034)', () => {
  /* The A/B for the rule above: with only ONE earlier chapter there is nothing to spread over, so
     the pick is still the earliest unused recall in it — the old behaviour, unchanged. */
  const narrow = [
    { title: 'Ch 1', sections: [sec('p1', fillin('p1')), sec('p2', fillin('p2')), sec('p3', fillin('p3'))] },
    { title: 'Ch 2', sections: [sec('q1', fillin('q1'))] },
    { title: 'Ch 3', sections: [sec('r1', fillin('r1'))] },
  ];
  const steps = buildSteps(narrow);
  const used = new Set();
  const ch2 = steps.findIndex((st) => st.type === 'checkin' && st.blockIndex === 1);
  const first = pickSpacedRecall(steps, ch2, used);
  assert.equal(first.id, 'p1:recall'); used.add(first.id);
  // chapter 3's check-in: chapters 1 and 2 are both eligible and chapter 1 has supplied one, so 2 goes
  const ch3 = steps.findIndex((st) => st.type === 'checkin' && st.blockIndex === 2);
  const second = pickSpacedRecall(steps, ch3, used);
  assert.equal(second.id, 'q1:recall'); used.add(second.id);
  // both have now supplied one; chapter 1 is oldest, so it is revisited before chapter 2 would be
  assert.equal(pickSpacedRecall(steps, ch3, used).id, 'p2:recall');
});

test('the immediate showing and the spaced showing are never adjacent steps', () => {
  const steps = buildSteps(content);
  for (let i = 0; i < steps.length; i += 1) {
    const pick = pickSpacedRecall(steps, i, new Set());
    if (pick) assert.ok(i - pick.fromStep >= 2, `spaced recall on step ${i} came from step ${pick.fromStep}`);
  }
});

test('a reorder shown the second time starts from a different order, stably', () => {
  const r = reorder('x');
  const p = spacedPermutation(r);
  assert.deepEqual([...p].sort(), [0, 1, 2, 3], 'a permutation');
  assert.notDeepEqual(p, reorderStartOrder(r, 'first'), 'not the first-showing order');
  assert.notEqual(p[0], 0, 'the first item is not already in place');
  assert.ok(!p.every((v, i) => v === i), 'not the identity');
  assert.deepEqual(spacedPermutation(r), p, 'stable across renders');
  assert.deepEqual(spacedPermutation({ correctOrder: ['a', 'b'] }).sort(), [0, 1]);
  assert.deepEqual(spacedPermutation({ correctOrder: ['a'] }), [0]);
});

test('a saved pointer past the end is clamped, not shown as "Step 9 of 5"', () => {
  assert.equal(clampStep(8, 5), 4); assert.equal(clampStep(-1, 5), 0); assert.equal(clampStep(2.7, 5), 2);
  assert.equal(clampStep(NaN, 5), 0); assert.equal(clampStep(3, 0), 0);
});

test('the stored high-water mark is clamped too, so a poisoned row heals itself', () => {
  // The three shapes actually found in user_content_progress on 15 Sep 2026. Each is a pointer
  // written against a longer step list than the section now has; each used to survive for ever.
  assert.equal(furthestStep(20, 1, 9), 8, 'decision-making-techniques: step 20 of 9');
  assert.equal(furthestStep(9, 0, 6), 5, 'market-failure: step 9 of 6, six students');
  assert.equal(furthestStep(8, 3, 8), 7, 'price-determination: step 9 of 8, eight students');
  // and it still does the job it was written for
  assert.equal(furthestStep(3, 5, 20), 5, 'a step forward raises the mark');
  assert.equal(furthestStep(7, 2, 20), 7, 'a step back does not lower it');
  assert.equal(furthestStep(2, 2, 20, true), 19, 'completing the topic marks the last step');
  assert.equal(furthestStep(undefined, 0, 20), 0, 'the first write, with no row yet');
  assert.equal(furthestStep(5, 3, 0), 0, 'no steps to point at');
});

test('legacy blocks and empty input are handled', () => {
  assert.deepEqual(buildSteps(null), []);
  assert.deepEqual(buildSteps([]), []);
  const steps = buildSteps([{ title: 'Old', concepts: [{ title: 'c' }] }, { title: 'New', sections: [sec('n1')] }]);
  assert.deepEqual(steps.map((s) => s.type), ['legacy', 'teach', 'checkin']);
  assert.equal(recallId({ type: 'fillin' }, steps[1]), 'teach:n1:recall');
});

test('over the 43 live sections: steps = subsections + chapters, and no spaced pick is ever from the current chapter', () => {
  let sections = 0;
  for (const f of readdirSync('audit/content-sections')) {
    const d = JSON.parse(readFileSync(`audit/content-sections/${f}`, 'utf8'));
    const content = Array.isArray(d.content) ? d.content : [];
    if (!content.length) continue;
    sections += 1;
    const steps = buildSteps(content);
    const subs = content.reduce((n, b) => n + (Array.isArray(b.sections) ? b.sections.filter(Boolean).length : 0), 0);
    const chapters = content.filter((b) => Array.isArray(b.sections)).length;
    const legacy = content.filter((b) => !Array.isArray(b.sections)).length;
    assert.equal(steps.length, subs + chapters + legacy, `${f}: step count`);
    const used = new Set();
    steps.forEach((s, i) => {
      if (s.type !== 'checkin') return;
      const pick = pickSpacedRecall(steps, i, used);
      if (!pick) return;
      assert.ok(pick.fromBlockIndex < s.blockIndex, `${f}: spaced recall on step ${i} is from the current chapter`);
      assert.ok(i - pick.fromStep >= 2, `${f}: spaced recall on step ${i} is adjacent to its first showing`);
      used.add(pick.id);
    });
  }
  assert.ok(sections >= 40, `only ${sections} sections read`);
});

/* ── V038: the pointer carries the deck it was written against ─────────────────────────────── */

// The two decks from audit/runs/packet-37/verify-b.md, section 3: the live one and the rebuilt one.
const shortDeck = content;                                   // 9 steps
const longDeck = [
  ...content,
  { title: 'Chapter D', takeaway: ['t'], sections: [sec('d1', fillin('d1')), sec('d2', reorder('d2'))] },
];                                                           // 12 steps

test('contentVersion is stable, and differs for any deck a pointer could land in the wrong place in', () => {
  const v = contentVersion(shortDeck);
  assert.equal(v, contentVersion(shortDeck), 'same content, same version');
  assert.equal(v.startsWith('9.'), true, 'the step count is readable in the version');
  assert.notEqual(v, contentVersion(longDeck), 'a deck with more steps is another version');
  assert.equal(contentVersion([]), '');
  // The count alone is not the identity: a same-length rewrite is a different version too, which
  // is the case the DB's total_steps proxy cannot see and the local fingerprint can.
  const renamed = JSON.parse(JSON.stringify(shortDeck));
  renamed[0].sections[1].title = 'A different subsection';
  assert.equal(countSteps(renamed), countSteps(shortDeck));
  assert.notEqual(contentVersion(renamed), contentVersion(shortDeck));
  // So is a recall swapped for another one on the same subsection.
  const reworked = JSON.parse(JSON.stringify(shortDeck));
  reworked[1].sections[0].recall.id = 'b1:recall:v2';
  assert.notEqual(contentVersion(reworked), contentVersion(shortDeck));
});

test('the localStorage pointer round-trips, and a pre-V038 bare integer reads as no version', () => {
  const v = contentVersion(shortDeck);
  assert.deepEqual(parsePointer(encodePointer(5, v)), { step: 5, version: v });
  assert.deepEqual(parsePointer('13'), { step: 13, version: null }, 'legacy');
  assert.deepEqual(parsePointer(''), null);
  assert.deepEqual(parsePointer(null), null);
  assert.deepEqual(parsePointer('{ not json'), null, 'corrupt storage is no pointer, not a crash');
  assert.equal(encodePointer(5, ''), '5', 'no version, no claim of one');
});

test('a pointer from another version is refused, not clamped into the new deck', () => {
  const vShort = contentVersion(shortDeck);
  const vLong = contentVersion(longDeck);
  const total = countSteps(longDeck);

  // The measured case: finished the 9-step deck, opens the 12-step rebuild.
  const p = resolvePointer(
    { local: { step: 8, version: vShort }, db: { step: 8, totalSteps: 9 } },
    vLong, total,
  );
  assert.equal(p.stale, true, 'rebuilt notice, not a resume');
  assert.equal(p.step, 0, 'nothing valid to resume to');
  assert.equal(p.staleStep, 8, 'what was refused, for the funnel');

  // A legacy unversioned pointer against a deck published AFTER legacy pointers stopped being
  // written is another version: the deck is newer than anything the integer could refer to.
  const legacy = resolvePointer(
    { local: { step: 6, version: null }, db: null }, vLong, total,
    { versionSince: new Date(LEGACY_POINTER_EPOCH + 86400e3).toISOString() },
  );
  assert.equal(legacy.stale, true);

  // A matching version still resumes exactly as before.
  const same = resolvePointer({ local: { step: 6, version: vLong }, db: null }, vLong, total);
  assert.deepEqual(same, { step: 6, stale: false, staleStep: 0 });

  // The server row's version proxy is its step count.
  const dbSame = resolvePointer({ local: null, db: { step: 7, totalSteps: total } }, vLong, total);
  assert.equal(dbSame.stale, false);
  assert.equal(dbSame.step, 7);

  // A legacy local pointer beside a server row that DOES belong to this deck is not a rebuild:
  // the valid source is further on, so the student resumes and is not nagged.
  const mixed = resolvePointer(
    { local: { step: 4, version: null }, db: { step: 7, totalSteps: total } }, vLong, total,
  );
  assert.equal(mixed.stale, false);
  assert.equal(mixed.step, 7);

  // Step 0 is not a position, so a fresh student is never told anything was rebuilt.
  assert.equal(resolvePointer({ local: { step: 0, version: null }, db: null }, vLong, total).stale, false);
  assert.equal(resolvePointer(null, vLong, total).stale, false);
  // No deck yet: nothing to compare against, nothing claimed.
  assert.deepEqual(resolvePointer({ local: { step: 8, version: vShort } }, '', 0), { step: 0, stale: false, staleStep: 0 });
});

test('a legacy pointer is refused only when something positively says the deck changed', () => {
  /*
   * Fix round 2. The first version of V038 read a missing fingerprint as "another version", which
   * is every pointer on every device on the day this ships: a legacy 5 on the UNCHANGED live
   * 14-step national-income deck raised "this topic has been rebuilt", suppressed the resume
   * banner and offered only two exits that both discard the place (Verify A, 21 September).
   */
  const vLong = contentVersion(longDeck);
  const total = countSteps(longDeck);
  const legacy = { local: { step: 6, version: null }, db: null };
  const iso = (ms) => new Date(ms).toISOString();

  // Nothing contradicts it, and the deck has answered with `null` — "never republished". It
  // resumes. Fix round 4: and nothing is written. `null` is an answer; the pointer may be read
  // against it, and the same answer will be there on the next visit.
  const unchanged = resolvePointer(legacy, vLong, total, { versionSince: null });
  assert.equal(unchanged.stale, false, 'no evidence of a rebuild is not evidence of a rebuild');
  assert.equal(unchanged.step, 6, 'the student keeps their place');
  assert.equal(unchanged.stamp, undefined, 'fix round 4: the automatic claim is gone entirely');

  // The twelve sections carrying a published_at today are all 14-15 September, before the epoch.
  assert.equal(resolvePointer(legacy, vLong, total, { versionSince: '2026-09-14T14:02:42.268+00:00' }).stale, false);

  // Published after legacy pointers stopped being written: the deck is newer than the pointer.
  // This is the signal that catches the ten staged rebuilds, every one of which GROWS, so neither
  // the range check nor a step count can see them.
  const rebuilt = resolvePointer(legacy, vLong, total, { versionSince: iso(LEGACY_POINTER_EPOCH + 5 * 86400e3) });
  assert.equal(rebuilt.stale, true);
  assert.equal(rebuilt.step, 0, 'nothing valid to resume to');
  assert.equal(rebuilt.staleStep, 6, 'what was refused, for the funnel');

  // A staged draft has never been published, so the caller reports the request time.
  assert.equal(resolvePointer(legacy, vLong, total, { versionSince: iso(Date.now()) }).stale, true);

  // Out of range: it cannot be an index in this deck, so it was written against another one.
  assert.equal(resolvePointer({ local: { step: total, version: null } }, vLong, total).stale, true);

  // The server row says the student's last deck had a different number of steps.
  assert.equal(
    resolvePointer({ local: { step: 6, version: null }, db: { step: 6, totalSteps: total + 3 } }, vLong, total).stale,
    true,
  );

  // A pointer at step 0 is not a position: a fresh device is never told anything was rebuilt,
  // whatever the dates say.
  assert.equal(resolvePointer({ local: { step: 0, version: null } }, vLong, total, { versionSince: iso(Date.now()) }).stale, false);
});

test('fix round 4: a missing publish date is not an answer, and nothing is claimed on it', () => {
  /*
   * Rounds 1-3 each closed one path into `resolvePointer` and left the next open, and every one of
   * them fed it evidence that did not belong to the deck on screen: no date at all (SSR, round 2),
   * then another section's date (the in-app switch, round 3). Two states were doing three jobs —
   * `null` meant both "never republished" and "not here yet", and both resumed AND stamped.
   *
   * `undefined` is now "not arrived": no resume, no refusal, no write. `null` and a date are
   * answers and are judged normally. Nothing is ever stamped.
   */
  const vLong = contentVersion(longDeck);
  const total = countSteps(longDeck);
  const legacy = { local: { step: 6, version: null }, db: null };

  const notArrived = resolvePointer(legacy, vLong, total, { versionSince: undefined });
  assert.deepEqual(notArrived, { step: 0, stale: false, staleStep: 0 },
    'parked: not resumed, and NOT called foreign either — the false rebuilt notice of round 1');
  assert.deepEqual(resolvePointer(legacy, vLong, total), notArrived,
    'no deck argument at all is the same absence');

  // The two local signals that need no date are still read while the date is missing: they are
  // this deck's own evidence, not another payload's.
  assert.equal(resolvePointer({ local: { step: total, version: null } }, vLong, total).stale, true,
    'out of range is a disagreement the deck itself proves, date or no date');
  assert.equal(
    resolvePointer({ local: { step: 6, version: null }, db: { step: 6, totalSteps: total + 3 } }, vLong, total).stale,
    true, 'so is a server row whose deck had a different number of steps');

  // The answers, both of them, are judged as before — and neither is stamped.
  for (const versionSince of [null, '2026-09-14T14:02:42.268+00:00']) {
    const p = resolvePointer(legacy, vLong, total, { versionSince });
    assert.equal(p.stale, false, `an answer of ${String(versionSince)} lets the pointer resume`);
    assert.equal(p.step, 6);
    assert.equal(p.stamp, undefined, 'and never claims it');
  }
  assert.equal(
    resolvePointer(legacy, vLong, total, { versionSince: new Date(LEGACY_POINTER_EPOCH + 86400e3).toISOString() }).stamp,
    undefined, 'nor does a refusal');
});

test('the server row may not overrule the fingerprint on the device (Verify A, second gap)', () => {
  /*
   * `stale = other > valid` let a db row mask a fingerprint mismatch of the same size: a rewrite
   * that KEEPS the step count reads "same version" through the total_steps proxy, scores valid 6
   * against the local mismatch's other 6, and 6 > 6 is false — so the student was dropped silently
   * at the old index in rebuilt material. The proxy's blind spot is exactly this case, so when the
   * local pointer positively disagrees the proxy stops counting as valid.
   */
  const vOther = 'sameLength.fake';
  const vLong = contentVersion(longDeck);
  const total = countSteps(longDeck);
  const sameCountRewrite = resolvePointer(
    { local: { step: 6, version: vOther }, db: { step: 6, totalSteps: total } }, vLong, total,
  );
  assert.equal(sameCountRewrite.stale, true, 'the fingerprint knows what the step count cannot');
  assert.equal(sameCountRewrite.step, 0);
  // A matching fingerprint beside the same row still resumes: the demotion needs a disagreement.
  assert.equal(
    resolvePointer({ local: { step: 6, version: vLong }, db: { step: 7, totalSteps: total } }, vLong, total).step,
    7,
  );
});

test('a refused pointer is never the high-water mark the next write builds on', () => {
  // persistLearnStep drops a row from another version before calling furthestStep; without that,
  // "start again" then one step writes the OLD deck's 8 straight back (Math.max), which is the
  // destructive half of the bug. Reproduced here on the function that does the arithmetic.
  const total = countSteps(longDeck);
  assert.equal(furthestStep(8, 1, total), 8, 'carried forward when the row belongs to this deck');
  assert.equal(furthestStep(0, 1, total), 1, 'and dropped to the step actually reached when it does not');
});

test('both ways out of the rebuilt notice leave a state that is no longer rebuilt', () => {
  // The rejection: "Start again" wrote only the LOCAL pointer, so a signed-in student's old-deck
  // row survived, still scored as another version further on than anything valid, and the notice
  // came straight back. Modelled here on what each control leaves in the two sources.
  const vShort = contentVersion(shortDeck);
  const vLong = contentVersion(longDeck);
  const total = countSteps(longDeck);
  const before = { local: { step: 8, version: vShort }, db: { step: 8, totalSteps: countSteps(shortDeck) } };
  assert.equal(resolvePointer(before, vLong, total).stale, true, 'the notice is up');

  // Start again — local {v:this,s:0}; db replaced by persistLearnStep at furthestStep(0,0,total)=0
  // against THIS deck's length, because the old row is from another version and is dropped.
  const afterRestartStep = furthestStep(0, 0, total);
  assert.equal(afterRestartStep, 0);
  const afterRestart = resolvePointer(
    { local: { step: 0, version: vLong }, db: { step: afterRestartStep, totalSteps: total } },
    vLong, total,
  );
  assert.deepEqual(afterRestart, { step: 0, stale: false, staleStep: 0 }, 'notice dismissed, at step 0');
  // And the local write alone — the signed-out student, and the state the rejection found when
  // the DB write was missing — must not leave the old row able to re-raise it.
  assert.equal(resolvePointer({ local: { step: 0, version: vLong }, db: null }, vLong, total).stale, false);
  assert.equal(
    resolvePointer({ local: { step: 0, version: vLong }, db: before.db }, vLong, total).stale, true,
    'the row from the old deck is exactly what re-raised the notice, so it must be rewritten',
  );

  // Jump to the end — both sources at the last step of this deck.
  const last = total - 1;
  const afterJump = resolvePointer(
    { local: { step: last, version: vLong }, db: { step: furthestStep(0, last, total), totalSteps: total } },
    vLong, total,
  );
  assert.deepEqual(afterJump, { step: last, stale: false, staleStep: 0 });
});

/* ── packet 13.7: the drawing drill reaches the student the same way everything else does ── */

const diagramRecall = (id) => ({ id: `${id}:recall`, type: 'diagram', specId: 'indirect-tax' });

test('a diagram recall is carried like any other, and comes back on the spaced pick', () => {
  const withDrill = [
    { title: 'Chapter A', takeaway: ['t'], sections: [sec('a1', diagramRecall('a1')), sec('a2', fillin('a2')), sec('a3')] },
    { title: 'Chapter B', takeaway: ['t'], sections: [sec('b1', fillin('b1'))] },
    { title: 'Chapter C', takeaway: ['t'], sections: [sec('c1', reorder('c1'))] },
  ];
  const steps = buildSteps(withDrill);

  const own = steps.find((s) => s.section?.recall?.type === 'diagram');
  assert.ok(own, 'the drawing drill appears on its own teach step');
  assert.equal(own.section.recall.specId, 'indirect-tax');

  // It is eligible for the spaced pick somewhere later in the section — the behaviour the packet
  // is for: the drill returns a few steps after the diagram was taught.
  const seen = [];
  for (let i = 0; i < steps.length; i += 1) {
    const pick = pickSpacedRecall(steps, i, new Set(), new Set());
    if (pick?.recall?.type === 'diagram') seen.push(i);
  }
  assert.ok(seen.length > 0, 'a diagram recall is offered as a spaced check-in at least once');
  assert.ok(seen.every((i) => i > steps.indexOf(own)), 'never before the step that taught it');
});
