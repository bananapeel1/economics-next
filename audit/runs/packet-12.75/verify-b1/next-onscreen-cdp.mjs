// Verifier's independent check for the B1 fix (toQuestion) in packet 12.75.
// Method: headless Chrome over raw CDP, fresh profile per run, real viewport (Emulation.setDeviceMetricsOverride,
// mobile:true below 1024), taps are Input.dispatchMouseEvent at the element's on-screen centre after an
// elementFromPoint hit-test (so a covered button fails the run rather than being clicked through).
// Measure: after the tap, is the new question's stem on screen, unobscured (elementFromPoint at its centre is
// inside the stem), below the header, above the dock? Plus scrollY before/after.
// Control: `control` arg stubs window.scrollTo before each tap (the fix's only actuator); the measure must FAIL.
// Usage: node next-onscreen-cdp.mjs <origin> [control]
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const origin = process.argv[2];
const control = process.argv[3] === 'control';
const url = `${origin}/economics/market-failure-model-answers`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function session() {
  const port = 9600 + Math.floor(Math.random() * 300);
  const prof = mkdtempSync(join(tmpdir(), 'b1-prof-'));
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-first-run',
    '--no-default-browser-check', '--disable-extensions', 'about:blank'], { stdio: 'ignore' });
  let targets;
  for (let i = 0; i < 80; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (targets.length) break; } catch {} await sleep(200); }
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0; const pending = new Map();
  ws.addEventListener('message', (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 400)); return r.result?.result?.value; };
  return { send, ev, close: () => { try { ws.close(); } catch {} chrome.kill('SIGKILL'); } };
}

const HELP = `
window.__vis = (el) => el && el.checkVisibility({ checkVisibilityCSS: true });
window.__setDraft = (ta, v) => { const s = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set; s.call(ta, v); ta.dispatchEvent(new Event('input', { bubbles: true })); };
window.__stem = () => [...document.querySelectorAll('.ps-set:not([hidden]) .ps-qhead:not([hidden]) .ps-stem, .ps-qhead:not([hidden]) .ps-stem')].find(__vis);
window.__state = () => {
  const H = innerHeight, stem = __stem(), dock = document.querySelector('.ps-dock');
  const sr = stem ? stem.getBoundingClientRect() : null, dr = dock.getBoundingClientRect();
  const hdr = parseFloat(getComputedStyle(document.querySelector('.ps')).getPropertyValue('--rlh-h')) || 60;
  let hit = false;
  if (sr) { const e = document.elementFromPoint(Math.min(innerWidth - 2, sr.left + Math.min(40, sr.width / 2)), sr.top + Math.min(10, sr.height / 2)); hit = !!e && stem.contains(e); }
  const onScreen = !!sr && sr.top >= hdr - 1 && sr.top < Math.min(H, dr.top) - 10 && hit;
  return { scrollY: Math.round(scrollY), docH: document.documentElement.scrollHeight, q: dock.querySelector('.ps-facts').textContent.slice(0, 40),
    stemTop: sr && Math.round(sr.top), stemText: stem && stem.textContent.slice(0, 50), stemHit: hit, dockTop: Math.round(dr.top), dockBottom: Math.round(dr.bottom), onScreen };
};
window.__center = (sel, text) => {
  const els = [...document.querySelectorAll(sel)].filter(__vis).filter(e => !text || e.textContent.includes(text));
  const el = els[0]; if (!el) return { err: 'no ' + sel + ' ' + (text||'') };
  const r = el.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2;
  const hitEl = document.elementFromPoint(x, y);
  return { x, y, covered: !(hitEl && el.contains(hitEl)), by: hitEl ? hitEl.tagName + '.' + hitEl.className : null, label: el.textContent.slice(0, 40) };
};
`;

async function run(label, w, h, steps) {
  const { send, ev, close } = await session();
  const out = { label, w, h, control, results: [] };
  try {
    await send('Page.enable'); await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 1024 });
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await send('Page.navigate', { url });
    for (let i = 0; i < 100; i++) { await sleep(200); if (await ev(`!!document.querySelector('.ps-dock') && document.readyState==='complete'`)) break; }
    await sleep(1500); // hydrate
    await ev(HELP);
    // dev-only Next.js overlay can sit over the dock; remove it so it cannot intercept (dev build only)
    await ev(`document.querySelectorAll('nextjs-portal').forEach(n=>n.remove()); true`);
    const tap = async (sel, text) => {
      const c = await ev(`__center(${JSON.stringify(sel)}, ${JSON.stringify(text || '')})`);
      if (c.err) throw new Error(c.err);
      if (c.covered) throw new Error(`covered: ${sel} ${text} by ${c.by}`);
      await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: c.x, y: c.y });
      await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: c.x, y: c.y, button: 'left', clickCount: 1 });
      await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: c.x, y: c.y, button: 'left', clickCount: 1 });
      await sleep(350);
      return c.label;
    };
    const ctx = { ev, tap, sleep, record: (r) => out.results.push(r) };
    await steps(ctx);
  } catch (e) { out.error = String(e.message || e); }
  close();
  return out;
}

const LONG = Array.from({ length: 260 }, (_, i) => ['the', 'tax', 'raises', 'price', 'so', 'consumption', 'falls', 'toward', 'the', 'social', 'optimum'][i % 11]).join(' ');
// Make the current question long, then scroll so the shell's bottom sits at the viewport bottom (dock stuck, deep in the page).
const makeLongAndScrollDeep = async ({ ev, tap }, mark = true) => {
  await ev(`(() => { const ta = [...document.querySelectorAll('.ps textarea')].find(__vis); if (ta) __setDraft(ta, ${JSON.stringify(LONG)}); return !!ta; })()`);
  await new Promise((r) => setTimeout(r, 200));
  if (mark) {
    const lbl = await ev(`document.querySelector('.ps-dock .is-primary').textContent`);
    if (/Mark my answer|Show the model answer/.test(lbl)) await tap('.ps-dock .is-primary');
  }
  await ev(`document.querySelectorAll('.ps details').forEach(d=>d.open=true); true`);
  await new Promise((r) => setTimeout(r, 150));
  return ev(`(() => { const ps = document.querySelector('.ps').getBoundingClientRect(); const bottomDoc = ps.bottom + scrollY; scrollTo(0, Math.max(0, bottomDoc - innerHeight)); return { scrollY: Math.round(scrollY), docH: document.documentElement.scrollHeight }; })()`);
};
const stubIfControl = (ev) => (control ? ev(`window.scrollTo = function(){}; true`) : true);

const tapNextAndRecord = async (ctx, name, sel = '.ps-dock .is-primary', text) => {
  const before = await ctx.ev('__state()');
  await stubIfControl(ctx.ev);
  const l = await ctx.tap(sel, text);
  await ctx.sleep(300);
  const after = await ctx.ev('__state()');
  ctx.record({ name, tapped: l.trim(), before: { scrollY: before.scrollY, q: before.q, onScreen: before.onScreen }, after });
};

const mobileFlow = async (ctx) => {
  await makeLongAndScrollDeep(ctx);
  await tapNextAndRecord(ctx, 'Q1 marked+long, deep scroll -> dock Next (go)');
  await makeLongAndScrollDeep(ctx);
  await tapNextAndRecord(ctx, 'Q2 marked+long, deep scroll -> dock Next (go)');
  await makeLongAndScrollDeep(ctx);
  await tapNextAndRecord(ctx, 'Q3 marked+long, deep scroll -> dock Next: Standalone (goSet)');
  // Standalone: go to Q2 via dock Next from top, make it long, scroll deep, tap Previous
  await ctx.ev('scrollTo(0,0); true');
  await tapNextAndRecord(ctx, 'Standalone Q1 at top, card 2 tapped (go, upward-only: must not scroll down)', '.ps-card', '2');
  await makeLongAndScrollDeep(ctx);
  await tapNextAndRecord(ctx, 'Standalone Q2 marked+long, deep scroll -> dock Previous (go)', '.ps-dock .is-ghost');
  // card tap with the qrow on screen: must not move the window down
  await ctx.ev('scrollTo(0,0); true');
  await tapNextAndRecord(ctx, 'Card 3 tapped at scrollY 0 (go, upward-only)', '.ps-card', '3');
  await ctx.ev('scrollTo(0,40); true');
  await tapNextAndRecord(ctx, 'Set switch tapped at scrollY 40 (goSet, upward-only)', '.ps-setswitch button', 'Extract');
};

const study = async (ctx) => {
  await ctx.tap('.ps-modes button', 'Model answers');
  await ctx.ev(`document.querySelectorAll('.ps details').forEach(d=>d.open=true); true`);
  await ctx.ev(`(() => { const ps = document.querySelector('.ps').getBoundingClientRect(); scrollTo(0, Math.max(0, ps.bottom + scrollY - innerHeight)); return true; })()`);
  await tapNextAndRecord(ctx, 'Model answers Q1, deep scroll -> dock Next (go)');
};

const desktop = async (ctx) => {
  await makeLongAndScrollDeep(ctx);
  await ctx.ev('scrollTo(0,0); true');
  await tapNextAndRecord(ctx, 'Desktop Q1 marked -> dock Next (go): window must stay put');
  await makeLongAndScrollDeep(ctx);
  await ctx.ev('scrollTo(0,300); true');
  await tapNextAndRecord(ctx, 'Desktop Q2 at scrollY 300 -> dock Next (go): toQuestion must not move window');
};

const all = [];
all.push(await run('mobile 390x844', 390, 844, mobileFlow));
all.push(await run('mobile 320x640', 320, 640, mobileFlow));
all.push(await run('tablet 768x1024', 768, 1024, mobileFlow));
all.push(await run('edge 1023x800', 1023, 800, mobileFlow));
all.push(await run('study 390x844', 390, 844, study));
all.push(await run('desktop 1024x800', 1024, 800, desktop));
all.push(await run('desktop 1440x900', 1440, 900, desktop));
console.log(JSON.stringify(all, null, 1));
