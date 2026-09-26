// Verifier's independent text-fit check for packet 12.75 E050.
// Method: headless Chrome, REAL viewport via Emulation.setDeviceMetricsOverride on the hydrated page
// (not an iframe, not document.write), state driven by clicks, own measurement function.
// Usage: node fit-cdp.mjs <origin> <out.json> [control]
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const origin = process.argv[2];
const out = process.argv[3];
const control = process.argv[4] === 'control';
const onlyWidths = process.argv[5] ? process.argv[5].split(',').map(Number) : null;
const url = `${origin}/economics/market-failure-model-answers`;
const port = 9800 + Math.floor(Math.random() * 150);
const prof = mkdtempSync(join(tmpdir(), 'fit-prof-'));
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-first-run',
  '--no-default-browser-check', '--disable-extensions', 'about:blank',
], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 60; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (targets.length) break; } catch {}
  await sleep(200);
}
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map();
ws.addEventListener('message', (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 500));
  return r.result?.result?.value;
};
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });

const setW = async (w) => {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: w < 1024 ? 844 : 900, deviceScaleFactor: 1, mobile: false });
  await ev('new Promise(r=>setTimeout(r,30))');
};

const HELPERS = `
window.__q = (s) => [...document.querySelectorAll(s)];
window.__settle = () => new Promise(r => setTimeout(r, 120));
window.__setDraft = (ta, v) => { const s = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set; s.call(ta, v); ta.dispatchEvent(new Event('input', { bubbles: true })); };
window.__measure = () => {
  const fails = [];
  const W = document.documentElement.clientWidth;
  if (document.documentElement.scrollWidth > W + 1) fails.push('PAGE ' + document.documentElement.scrollWidth + '>' + W);
  const root = document.querySelector('.ps');
  let checked = 0;
  for (const el of [root, ...root.querySelectorAll('*')]) {
    if (!el.checkVisibility({ checkVisibilityCSS: true })) continue;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) continue;
    checked++;
    const cs = getComputedStyle(el);
    const nm = el.tagName + '.' + String(el.getAttribute('class') || '').slice(0, 30);
    if (cs.overflowX !== 'visible' && el.scrollWidth > el.clientWidth + 1 && el.tagName !== 'TEXTAREA') fails.push('XOVER ' + nm + ' ' + el.scrollWidth + '>' + el.clientWidth);
    if (cs.textOverflow === 'ellipsis') fails.push('ELL ' + nm);
    if (cs.webkitLineClamp && cs.webkitLineClamp !== 'none') fails.push('CLAMP ' + nm);
    if (el.tagName === 'TEXTAREA') continue;
    for (const n of el.childNodes) {
      if (n.nodeType !== 3 || !n.textContent.trim()) continue;
      if (n.textContent.includes('\\u2026') && el.closest('.ps-top,.ps-qrow,.ps-dock,.ps-cards')) fails.push('DOTS ' + nm);
      const rg = document.createRange(); rg.selectNodeContents(n);
      for (const rr of rg.getClientRects()) {
        if (rr.width < 0.5) continue;
        if (rr.right > W + 1 || rr.left < -1) { fails.push('OFFVIEW ' + nm + ' "' + n.textContent.trim().slice(0, 24) + '" ' + Math.round(rr.left) + '-' + Math.round(rr.right)); break; }
        // clipped by any ancestor with non-visible overflow
        let clipped = false;
        for (let a = el; a && a !== document.body; a = a.parentElement) {
          const acs = getComputedStyle(a);
          if (acs.overflowX !== 'visible') { const ar = a.getBoundingClientRect(); if (rr.right > ar.right + 1.5 || rr.left < ar.left - 1.5) { fails.push('CUT ' + nm + ' by ' + a.tagName + '.' + String(a.getAttribute('class')||'').slice(0,20) + ' "' + n.textContent.trim().slice(0, 24) + '"'); clipped = true; } break; }
        }
        if (clipped) break;
      }
    }
  }
  const sig = {
    set: (__q('.ps-setswitch button[aria-pressed=true]')[0] || {}).textContent || '-',
    card: (__q('.ps-card[aria-current=step]')[0] || {}).getAttribute?.('aria-label')?.slice(0, 22) || '-',
    tab: (__q('.ps-set:not([hidden]) .ps-tabs button[aria-selected=true]')[0] || {}).textContent || '-',
    extractVisible: __q('.ps-set:not([hidden]) .ps-pane-extract').some(e => e.checkVisibility()),
    notesOpen: __q('.ps-note').filter(e => e.checkVisibility()).length,
    focusRows: __q('tr.is-focus').filter(e => e.checkVisibility()).length,
    answerVisible: __q('.ps-answer').filter(e => e.checkVisibility()).length,
    detailsOpen: __q('details[open]').filter(e => e.checkVisibility()).length,
    mode: __q('.ps-modes button').map(b=>b.getAttribute('aria-pressed')).join(','),
    ansItems: __q('.ps-answer').filter(e=>e.checkVisibility()).map(e=>e.closest('.ps-work').dataset.item).join(','),
    ls: Object.keys(localStorage).filter(k=>k.startsWith('rl:')).map(k=>k+'='+localStorage.getItem(k).slice(0,60)).join(' ; '),
    theme: document.documentElement.getAttribute('data-theme') + (document.querySelector('.rl-night') ? '/pinned' : '/unpinned'),
    twrap: __q('.ps-twrap').filter(e => e.checkVisibility()).map(t => t.scrollWidth + '/' + t.clientWidth).join(','),
  };
  return { n: fails.length, f: [...new Set(fails)].slice(0, 5), checked, sig };
};
`;

const CTL = control ? `{const s=document.createElement('style'); s.textContent='.ps-table-block{container-type:normal!important}.ps-card{container-type:normal!important}'; document.head.appendChild(s);}` : '';

// state script pieces
const pick = (setI, qI) => `
  { const sb = __q('.ps-setswitch button'); if (sb[${setI}]) { sb[${setI}].click(); await __settle(); } }
  { const c = __q('.ps-card'); c[${qI}].click(); await __settle(); }`;
const tab = (which) => `{ const t = __q('.ps-set:not([hidden]) .ps-tabs button'); if (t.length) { t[${which === 'extract' ? 0 : 1}].click(); await __settle(); } }`;
const mark = `
  { const ta = __q('.ps-work:not([hidden]) .ps-draft')[0]; __setDraft(ta, 'The negative externality of consumption means a third party bears a cost. The AED 0.25 charge and the 45% fall show demand is price elastic, so the tax corrects part of the over-consumption, though −1.4 suggests revenue falls.'); await __settle(); }
  { __q('.ps-btn.is-primary')[0].click(); await __settle(); }
  { const ck = __q('.ps-work:not([hidden]) .ps-check'); ck[0].click(); await __settle(); if (ck[2]) { ck[2].click(); await __settle(); } }
  { const w = __q('.ps-work:not([hidden]) .ps-where'); w[0].click(); await __settle(); }`;
const study = `{ __q('.ps-modes button')[1].click(); await __settle(); }`;
const openDetails = `{ __q('.ps-work:not([hidden]) details').forEach(d => d.open = true); await __settle(); }`;
const studyNote = `{ const s = __q('.ps-work:not([hidden]) .ps-seg')[1]; if (s) { s.click(); await __settle(); } }`;
const light = `{ document.querySelectorAll('.rl-night').forEach(e => e.classList.remove('rl-night')); document.documentElement.setAttribute('data-theme','light'); await __settle(); }`;

const states = [];
for (const [si, sname, hasX] of [[0, 'Extract', true], [1, 'Standalone', false]]) {
  for (const qi of [0, 1, 2]) {
    states.push({ name: `${sname} Q${qi + 1} writing · work`, run: pick(si, qi) + tab('work') });
    if (hasX) states.push({ name: `${sname} Q${qi + 1} writing · extract tab`, run: pick(si, qi) + tab('extract') });
    states.push({ name: `${sname} Q${qi + 1} marking + note + details · work`, run: pick(si, qi) + mark + openDetails });
    if (hasX) states.push({ name: `${sname} Q${qi + 1} marked · extract tab (focus rows)`, run: pick(si, qi) + mark + tab('extract') });
    states.push({ name: `${sname} Q${qi + 1} model answers + note + details · work`, run: study + pick(si, qi) + tab('work') + studyNote + openDetails });
    if (hasX) states.push({ name: `${sname} Q${qi + 1} model answers · extract tab`, run: study + pick(si, qi) + studyNote + tab('extract') });
  }
}
states.push({ name: 'LIGHT unpinned · Extract Q3 writing · extract tab', run: pick(0, 2) + tab('extract') + light });
states.push({ name: 'LIGHT unpinned · Extract Q2 marking + note', run: pick(0, 1) + mark + openDetails + light });
states.push({ name: 'LIGHT unpinned · Standalone Q3 model answers', run: study + pick(1, 2) + studyNote + openDetails + light });

const widths = onlyWidths || Array.from({ length: (1920 - 320) / 5 + 1 }, (_, i) => 320 + i * 5);
const result = { method: 'headless Chrome CDP setDeviceMetricsOverride, hydrated page, own measure', control, widths: [widths[0], widths[widths.length - 1], widths.length], states: {} };
for (const st of states.filter(s => !process.env.ONLY || s.name.includes(process.env.ONLY))) {
  await setW(390);
  await send('Page.navigate', { url: 'about:blank' });
  await sleep(200);
  await send('Page.navigate', { url });
  for (let i = 0; i < 100; i++) { await sleep(150); const ok = await ev(`!!document.querySelector('.ps-card') && document.readyState==='complete'`).catch(() => false); if (ok) break; }
  await ev(`(async()=>{ try{localStorage.clear()}catch{} })()`);
  await send('Page.reload', {}); await sleep(300);
  for (let i = 0; i < 100; i++) { await sleep(150); const ok = await ev(`!!document.querySelector('.ps-card') && document.readyState==='complete'`).catch(() => false); if (ok) break; }
  await sleep(1500); // hydration + effects
  await ev(`(async()=>{ ${HELPERS} await document.fonts.ready; ${CTL} ${st.run} return true; })()`);
  const fails = {}; let total = 0; const sigs = new Set(); let checks = 0;
  for (const w of widths) {
    await setW(w);
    const m = await ev(`__measure()`);
    checks += m.checked;
    sigs.add(JSON.stringify({ ...m.sig, twrap: undefined, band: w < 1024 ? '<1024' : '>=1024' }));
    if (m.n) { total += 1; fails[w] = m.f; }
  }
  result.states[st.name] = { widthsFailing: total, checks, fails: Object.fromEntries(Object.entries(fails).slice(0, 12)), signatures: [...sigs].map((s) => JSON.parse(s)) };
  console.log(st.name, '→', total, 'failing widths');
}
writeFileSync(out, JSON.stringify(result, null, 1));
ws.close(); chrome.kill();
process.exit(0);
