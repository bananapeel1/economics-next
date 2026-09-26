// Packet 12.8 (E064). State drivers for audit/scripts/text-fit-sweep.js on
// /economics/market-failure-model-answers, laid out as the WEC11 paper. Adapted from packet 12.75's
// fix1/sweep-states.js: every `run` is IDEMPOTENT (the sweep calls it at each of the 321 widths) and
// ENFORCES its state rather than toggling, and records a read-back signature at 390 and 1440 into
// window.__sig so it can be shown that each state engaged.
//
// States, in order (the essay "before choosing" states must run before any essay is chosen, and a
// choice cannot be undone, so the sweep is run once per theme on a fresh load):
//   Section B, each of 5 questions: writing (the Draw item: its sketch prompt; the Calculate item: its
//     context table), marking with a note open, Model answers with a note open (the Draw item: the
//     model diagram shown).
//   Section C, each of 5 parts: writing (work tab), writing (Extract tab), marking with a note open,
//     Model answers with a note open.
//   Section D: essay 1 and essay 2 before choosing; essay 1 chosen (writing); essay 2 after the choice
//     ("not your choice"); essay 1 marking with a note open; both essays in Model answers.
//   More practice: writing, marking with a note open, Model answers with a note open.
(() => {
  const DRAFT = 'A negative externality is a cost to a third party that the market price leaves out, so the market produces or consumes more than the social optimum.';
  const qa = (D, s) => [...D.querySelectorAll(s)];
  const cur = (D) => D.querySelector('.ps-set:not([hidden]) .ps-work:not([hidden])');
  const tabsOf = (D) => qa(D, '.ps-set:not([hidden]) .ps-tabs button');

  async function ensureSet(D, settle, si) {
    const b = qa(D, '.ps-setswitch button')[si];
    if (b && b.getAttribute('aria-pressed') !== 'true') { b.click(); await settle(); }
  }
  async function ensureCard(D, settle, ci) {
    const c = qa(D, '.ps-card')[ci];
    if (c && c.getAttribute('aria-current') !== 'step') { c.click(); await settle(); }
  }
  async function ensureMode(D, settle, answers) {
    const b = qa(D, '.ps-modes button')[answers ? 1 : 0];
    if (b.getAttribute('aria-pressed') !== 'true') { b.click(); await settle(); }
  }
  const phaseOf = (D) => {
    const w = cur(D);
    if (!w) return '?';
    if (!w.querySelector('.ps-attempt').hidden) {
      if (w.querySelector('.ps-sketch')) return 'attempt:sketch';
      if (w.querySelector('.ps-choice')) return 'attempt:choice';
      return 'attempt';
    }
    return w.querySelector('.ps-score') ? 'marking' : 'other';
  };
  async function ensureAttempt(D, settle) {
    if (phaseOf(D).startsWith('attempt')) return;
    const btn = qa(D, '.ps-set:not([hidden]) .ps-linkbtn').find((b) => /Edit your answer|Try it yourself/.test(b.textContent) && b.offsetParent !== null)
      || qa(D, '.ps-set:not([hidden]) .ps-linkbtn').find((b) => /Edit your answer|Try it yourself/.test(b.textContent));
    if (btn) { btn.click(); await settle(); }
  }
  async function choose(D, settle) {
    const b = qa(cur(D), '.ps-choice .ps-btn').find((x) => /Answer this essay/.test(x.textContent));
    if (b) { b.click(); await settle(); }
  }
  async function ensureMarking(D, settle) {
    if (phaseOf(D) === 'marking') return;
    await ensureAttempt(D, settle);
    if (phaseOf(D) === 'attempt:choice') await choose(D, settle);
    if (phaseOf(D) === 'attempt:sketch') {
      cur(D).querySelector('.ps-sketch .ps-btn').click();
      await settle();
      return;
    }
    const ta = cur(D).querySelector('textarea');
    if (!ta.value.trim()) {
      const W = D.defaultView;
      Object.getOwnPropertyDescriptor(W.HTMLTextAreaElement.prototype, 'value').set.call(ta, DRAFT);
      ta.dispatchEvent(new W.Event('input', { bubbles: true }));
      await settle();
    }
    const p = D.querySelector('.ps-btn.is-primary');
    if (/Mark my answer/.test(p.textContent)) { p.click(); await settle(); }
  }
  async function ensureTab(D, settle, which) {
    const t = tabsOf(D);
    if (!t.length) return;
    const b = which === 'extract' ? t[0] : t[1];
    if (b.getAttribute('aria-selected') !== 'true') { b.click(); await settle(); }
  }
  async function ensureNote(D, settle) {
    const w = cur(D);
    if (w.querySelector('.ps-note:not([hidden])')) return;
    const where = w.querySelector('.ps-where');
    if (where) { where.click(); await settle(); }
  }
  function light(D) {
    if (!window.__lightRun) return;
    D.documentElement.dataset.theme = 'light';
    D.querySelectorAll('.rl-night').forEach((e) => e.classList.remove('rl-night'));
  }
  window.__sig = window.__sig || {};
  function sign(D, name) {
    const W = D.defaultView;
    const w = W.innerWidth;
    if (w !== 390 && w !== 1440) return;
    const work = cur(D);
    const ex = D.querySelector('.ps-set:not([hidden]) .ps-pane-extract');
    const ctx = D.querySelector('.ps-set:not([hidden]) .ps-qhead:not([hidden]) .ps-context');
    const ctxTable = ctx?.querySelector('.ps-twrap');
    const fig = work?.querySelector('.ps-diagram img');
    window.__sig[`${window.__lightRun ? 'light' : 'dark'} · ${name} @${w}`] = {
      section: D.querySelector('.ps-setswitch button[aria-pressed="true"]')?.textContent,
      header: D.querySelector('.ps-set:not([hidden]) .ps-sechead-t')?.textContent,
      card: qa(D, '.ps-card').findIndex((c) => c.getAttribute('aria-current') === 'step') + 1,
      item: work?.dataset.item,
      mode: D.querySelector('.ps-modes button[aria-pressed="true"]')?.textContent.trim(),
      phase: phaseOf(D),
      tab: tabsOf(D).find((b) => b.getAttribute('aria-selected') === 'true')?.textContent ?? '(no tabs)',
      extractShown: !!ex && W.getComputedStyle(ex).display !== 'none',
      context: ctx ? ctx.textContent.slice(0, 40) : null,
      contextTableSideways: ctxTable ? ctxTable.scrollWidth - ctxTable.clientWidth : null,
      contextTableStacked: ctxTable ? W.getComputedStyle(ctxTable.querySelector('.ps-tlabel')).display !== 'none' : null,
      diagramShown: fig ? fig.offsetParent !== null : null,
      noteOpen: !!work?.querySelector('.ps-note:not([hidden])'),
      primary: D.querySelector('.ps-btn.is-primary')?.textContent.trim(),
      banked: D.querySelector('.ps-facts-banked b')?.textContent ?? null,
      pageSideways: D.documentElement.scrollWidth - W.innerWidth,
      theme: D.documentElement.dataset.theme,
      pinned: !!D.querySelector('.rl-night'),
    };
  }
  const S = [];
  const mk = (name, fn, after) => S.push({ name, run: async (D, settle) => { light(D); await fn(D, settle); await settle(); sign(D, name); }, after });
  const back = async (D, settle) => { await ensureMode(D, settle, false); };

  // Section B (set 0) and More practice (set 3): writing, marking, model answers.
  const plain = (si, label, n) => {
    for (let q = 0; q < n; q += 1) {
      mk(`${label} Q${q + 1} writing`, async (D, s) => { await ensureMode(D, s, false); await ensureSet(D, s, si); await ensureCard(D, s, q); await ensureAttempt(D, s); });
      mk(`${label} Q${q + 1} marking, note open`, async (D, s) => { await ensureMode(D, s, false); await ensureSet(D, s, si); await ensureCard(D, s, q); await ensureMarking(D, s); await ensureNote(D, s); });
      mk(`${label} Q${q + 1} Model answers, note open`, async (D, s) => { await ensureMode(D, s, true); await ensureSet(D, s, si); await ensureCard(D, s, q); await ensureNote(D, s); }, back);
    }
  };
  plain(0, 'Section B', 5);

  // Section C (set 1): the extract tab as well.
  for (let q = 0; q < 5; q += 1) {
    mk(`Section C (${'abcde'[q]}) writing`, async (D, s) => { await ensureMode(D, s, false); await ensureSet(D, s, 1); await ensureCard(D, s, q); await ensureAttempt(D, s); await ensureTab(D, s, 'work'); });
    mk(`Section C (${'abcde'[q]}) writing, Extract tab`, async (D, s) => { await ensureMode(D, s, false); await ensureSet(D, s, 1); await ensureCard(D, s, q); await ensureAttempt(D, s); await ensureTab(D, s, 'extract'); });
    mk(`Section C (${'abcde'[q]}) marking, note open`, async (D, s) => { await ensureMode(D, s, false); await ensureSet(D, s, 1); await ensureCard(D, s, q); await ensureMarking(D, s); await ensureTab(D, s, 'work'); await ensureNote(D, s); });
    mk(`Section C (${'abcde'[q]}) Model answers, note open`, async (D, s) => { await ensureMode(D, s, true); await ensureSet(D, s, 1); await ensureCard(D, s, q); await ensureTab(D, s, 'work'); await ensureNote(D, s); }, back);
  }

  // Section D (set 2): the choice, before and after.
  mk('Section D essay 1 before choosing', async (D, s) => { await ensureMode(D, s, false); await ensureSet(D, s, 2); await ensureCard(D, s, 0); });
  mk('Section D essay 2 before choosing', async (D, s) => { await ensureMode(D, s, false); await ensureSet(D, s, 2); await ensureCard(D, s, 1); });
  mk('Section D essay 1 chosen, writing', async (D, s) => { await ensureMode(D, s, false); await ensureSet(D, s, 2); await ensureCard(D, s, 0); await ensureAttempt(D, s); if (phaseOf(D) === 'attempt:choice') await choose(D, s); });
  mk('Section D essay 2 after the choice', async (D, s) => { await ensureMode(D, s, false); await ensureSet(D, s, 2); await ensureCard(D, s, 1); });
  mk('Section D essay 1 marking, note open', async (D, s) => { await ensureMode(D, s, false); await ensureSet(D, s, 2); await ensureCard(D, s, 0); await ensureMarking(D, s); await ensureNote(D, s); });
  mk('Section D essay 1 Model answers, note open', async (D, s) => { await ensureMode(D, s, true); await ensureSet(D, s, 2); await ensureCard(D, s, 0); await ensureNote(D, s); }, back);
  mk('Section D essay 2 Model answers, note open', async (D, s) => { await ensureMode(D, s, true); await ensureSet(D, s, 2); await ensureCard(D, s, 1); await ensureNote(D, s); }, back);

  plain(3, 'More practice', 1);
  window.__states = S;
})();
