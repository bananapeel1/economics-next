// Packet 12.75 fix round 1, E048. Renders the page in headless Chrome with SCRIPT EXECUTION DISABLED
// (CDP Emulation.setScriptExecutionDisabled, a real navigation, so the HTML parser takes the
// scripting-off path and parses <noscript> as markup) and measures what a no-JS reader can see.
// Different method from the verifier's sandboxed-srcdoc render. Usage:
//   node noscript-cdp.mjs <origin> [label]      e.g. http://localhost:3017 fix
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const origin = process.argv[2];
const label = process.argv[3] || origin;
const url = `${origin}/economics/market-failure-model-answers`;
const port = 9300 + Math.floor(Math.random() * 500);
const prof = mkdtempSync(join(process.env.TMPDIR || tmpdir(), 'ns-prof-'));
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-first-run',
  '--no-default-browser-check', '--disable-extensions', 'about:blank',
], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (targets.length) break; } catch {}
  await sleep(200);
}
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map(); const events = [];
ws.addEventListener('message', (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } else events.push(d);
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send('Page.enable');
await send('Emulation.setScriptExecutionDisabled', { value: true });

const probe = `(() => {
  const vis = (el) => { if (!el) return false; const r = el.getBoundingClientRect(); return el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && r.width > 0 && r.height > 0; };
  const all = (s) => [...document.querySelectorAll(s)];
  const notes = all('[data-seg-note]');
  const notesWithText = notes.filter((n) => n.textContent.trim().length > 0);
  const cells = all('.ps-pane-extract .ps-table td, .ps-pane-extract .ps-table tbody th');
  const paras = all('.ps-pane-extract .ps-extract-para');
  const jsOnly = all('[data-ps-js-only]');
  const answers = all('.ps-answer');
  const crits = all('.ps-crit-text');
  const segs = all('.ps-seg');
  const examiner = all('.ps-examiner');
  const stems = all('.ps-stem');
  const twrap = all('.ps-pane-extract .ps-twrap');
  return {
    scriptingOffProof: { noscriptStyleParsed: !!document.querySelector('noscript style'), hydratedMarker: !!window.__NEXT_HYDRATED || typeof window.next === 'object' },
    width: innerWidth,
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
    notes: { total: notes.length, withText: notesWithText.length, visible: notes.filter(vis).length },
    extractPane: { panes: all('.ps-pane-extract').length, visible: all('.ps-pane-extract').filter(vis).length, paras: paras.length, parasVisible: paras.filter(vis).length, cells: cells.length, cellsVisible: cells.filter(vis).length,
      twrapSideways: twrap.map((w) => w.scrollWidth - w.clientWidth) },
    workPanes: { total: all('.ps-pane-work').length, visible: all('.ps-pane-work').filter(vis).length },
    stems: { total: stems.length, visible: stems.filter(vis).length },
    answers: { total: answers.length, visible: answers.filter(vis).length },
    criteria: { total: crits.length, visible: crits.filter(vis).length },
    segments: { total: segs.length, visible: segs.filter(vis).length },
    examiner: { total: examiner.length, visible: examiner.filter(vis).length },
    jsOnlyVisible: jsOnly.filter(vis).map((e) => e.className).slice(0, 10),
  };
})()`;

const out = [];
for (const [w, h] of [[320, 740], [360, 780], [390, 844], [768, 1024], [1023, 900], [1024, 900], [1440, 900]]) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false });
  events.length = 0;
  await send('Page.navigate', { url });
  for (let i = 0; i < 300 && !events.some((e) => e.method === 'Page.loadEventFired'); i++) await sleep(100);
  await sleep(400);
  const r = await send('Runtime.evaluate', { expression: probe, returnByValue: true });
  out.push(r.result.result.value ?? r.result);
}
ws.close(); chrome.kill();
console.log(JSON.stringify({ label, url, measured: new Date().toISOString(), results: out }, null, 1));
