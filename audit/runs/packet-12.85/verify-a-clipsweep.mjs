// Independent clip sweep (verifier). Own probe: Range rects vs clipping ancestors, horizontal overflow,
// textarea overflow, ellipsis. Own state driver. Not audit/scripts/text-fit-sweep.js.
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const [origin, out, step = '10'] = process.argv.slice(2);
const port = 9400 + Math.floor(Math.random() * 300);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'vclip-'))}`, '--no-first-run', '--window-size=1960,1100', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let t = []; for (let i = 0; i < 100; i++) { try { t = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (t.length) break; } catch {} await sleep(150); }
const ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map();
ws.addEventListener('message', (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 600)); return r.result?.result?.value; };
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
const setW = async (w) => { await send('Emulation.setDeviceMetricsOverride', { width: w, height: 1000, deviceScaleFactor: 1, mobile: false }); };
const PROBE = `
window.__clip = (W) => {
  const d = document, bad = [];
  const root = d.querySelector('.psx');
  const walker = d.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
  const clipAnc = (node) => { const a = []; for (let e = node.parentElement; e && e !== d.body; e = e.parentElement) { const cs = getComputedStyle(e); if (/hidden|clip/.test(cs.overflowX) || /hidden|clip/.test(cs.overflowY)) a.push([e, cs]); } return a; };
  while ((n = walker.nextNode())) {
    if (!n.textContent.trim()) continue; const el = n.parentElement; if (!el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
    if (el.closest('.psx-toast')) continue;
    const rg = d.createRange(); rg.selectNodeContents(n);
    const rects = [...rg.getClientRects()].filter(r => r.width > 0.5 && r.height > 0.5);
    const anc = clipAnc(n);
    for (const r of rects) {
      if (r.left < -0.5 || r.right > W + 0.5) { bad.push('HX «' + n.textContent.trim().slice(0,24) + '» ' + Math.round(r.left) + '..' + Math.round(r.right)); break; }
      let cut = null;
      for (const [e, cs] of anc) { const b = e.getBoundingClientRect(); const bl = b.left + e.clientLeft, bt = b.top + e.clientTop, br = bl + e.clientWidth, bb = bt + e.clientHeight;
        if ((/hidden|clip/.test(cs.overflowX) && (r.left < bl - 0.5 || r.right > br + 0.5)) || (/hidden|clip/.test(cs.overflowY) && (r.top < bt - 0.5 || r.bottom > bb + 0.5))) { cut = e.className || e.tagName; break; } }
      if (cut) { bad.push('CUT «' + n.textContent.trim().slice(0,24) + '» in ' + cut); break; }
    }
    const cs = getComputedStyle(el); if (cs.textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 1) bad.push('ELL «' + n.textContent.trim().slice(0,24) + '»');
  }
  d.querySelectorAll('textarea').forEach(t => { if (t.checkVisibility() && t.scrollHeight > t.clientHeight + 1) bad.push('TA ' + (t.scrollHeight - t.clientHeight) + 'px'); });
  if (d.documentElement.scrollWidth > W + 1) bad.push('HSCROLL ' + d.documentElement.scrollWidth);
  return bad;
};
window.__h = {
  sleep: (ms) => new Promise(r => setTimeout(r, ms)),
  vis: (s) => [...document.querySelectorAll(s)].filter(e => e.checkVisibility()),
  oq: (t) => [...document.querySelectorAll('.psx-outline .psx-oq')].find(b => b.innerText.replace(/\\n/g,' ').includes(t)),
  btn: (txt) => [...document.querySelectorAll('.psx button')].filter(e => e.checkVisibility()).find(b => b.innerText.trim().startsWith(txt)),
  draft: async (txt) => { const ta = [...document.querySelectorAll('textarea.psx-lined')].find(e => e.checkVisibility()); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(ta, txt); ta.dispatchEvent(new Event('input', { bubbles: true })); await new Promise(r => setTimeout(r, 120)); },
};
'ok'`;
const LONG = Array.from({ length: 14 }, (_, i) => `Point ${i + 1}: the AED 0.25 charge raises the private cost of each bag towards its social cost, so consumers buy fewer bags and consumption moves towards the optimum.`).join('\\n');
const UNBROKEN = 'Supercalifragilisticexpialidocious-internalisation-of-externalities-'.repeat(4);
// Each state: [name, js run on a fresh load at 1200px, before sweeping widths]
const H = 'const {sleep,vis,oq,btn,draft}=window.__h;';
const states = [
  ['Section B 1 blank', `${H} oq('1 Explain').click(); await sleep(150);`],
  ['Section B 1 writing long', `${H} oq('1 Explain').click(); await sleep(150); await draft("${LONG}");`],
  ['Section B 2 Draw marking', `${H} oq('2 Draw').click(); await sleep(150); btn('I’ve drawn it').click(); await sleep(200); vis('.psx-markblock input')[1].click(); vis('.psx-see')[1].click(); await sleep(150);`],
  ['Section B 3 Calculate table', `${H} oq('3 Calculate').click(); await sleep(150);`],
  ['6(a) writing with booklet', `${H} oq('Define 2').click(); await sleep(150); await draft('A cost to a third party.');`],
  ['6(c) marked long (points)', `${H} oq('Analyse 6').click(); await sleep(150); await draft("${LONG}"); btn('Mark my answer').click(); await sleep(200); vis('.psx-markblock input')[0].click(); vis('.psx-see')[3].click(); vis('.psx-booklet .ps-fig')[0]?.click(); await sleep(150);`],
  ['6(c) marked unbroken word', `${H} oq('Analyse 6').click(); await sleep(150); btn('Edit my answer')?.click(); await sleep(120); await draft("${UNBROKEN}"); btn('Mark my answer').click(); await sleep(200);`],
  ['6(e) levels marking', `${H} oq('Discuss 14').click(); await sleep(150); await draft("${LONG}"); btn('Mark my answer').click(); await sleep(200); vis('.psx-levels button')[2].click(); await sleep(100); vis('.psx-levels button')[4].click(); await sleep(150);`],
  ['Section D picking', `${H} oq('7 Evaluate').click(); await sleep(200);`],
  ['Section D chosen, other shown', `${H} oq('7 Evaluate').click(); await sleep(150); vis('.psx-essaycard button')[0].click(); await sleep(150); oq('8 Evaluate').click(); await sleep(150);`],
  ['More practice Examine 8 revealed', `${H} oq('Examine 8').click(); await sleep(150); btn('Show the model answer').click(); await sleep(150);`],
  ['Model answers mode 6(c)', `${H} btn('Model answers').click(); await sleep(150); oq('Analyse 6').click(); await sleep(150);`],
  ['Model answers mode essay 8', `${H} btn('Model answers').click(); await sleep(150); oq('8 Evaluate').click(); await sleep(150);`],
];
const widths = []; for (let w = 320; w <= 1920; w += Number(step)) widths.push(w);
const result = { origin, step: Number(step), widths: widths.length, when: new Date().toISOString(), runs: {} };
const runs = process.env.BROKEN ? [['BROKEN light', 'light']] : [['light', 'light'], ['dark', 'dark']];
for (const [runName, theme] of runs) {
  const rr = result.runs[runName] = {};
  for (const [name, js] of (process.env.BROKEN ? states.filter(s => s[0].startsWith('6(c) marked long')) : states)) {
    await setW(1200);
    await send('Page.navigate', { url: 'about:blank' }); await sleep(100);
    await send('Page.navigate', { url: origin + '/economics/market-failure-model-answers' });
    for (let i = 0; i < 60; i++) { await sleep(150); if (await ev('document.readyState === "complete" && !!document.querySelector(".psx-outline .psx-oq")')) break; }
    await ev(`(()=>{ Object.keys(localStorage).filter(k=>k.startsWith('rl:')).forEach(k=>localStorage.removeItem(k)); localStorage.setItem('theme','dark'); ${theme === 'dark' ? "localStorage.setItem('rl:practice:theme','dark');" : ''} return 1; })()`);
    await send('Page.reload'); for (let i = 0; i < 60; i++) { await sleep(150); if (await ev('document.readyState === "complete" && !!document.querySelector(".psx-outline .psx-oq")')) break; }
    await sleep(600);
    await ev(PROBE);
    await ev(`(async()=>{ ${js} return 1; })()`);
    if (process.env.BROKEN) await ev(`(()=>{ const s=document.createElement('style'); s.textContent='.psx-yours{height:200px!important;overflow:hidden!important}'; document.head.appendChild(s); return 1; })()`);
    const themeNow = await ev('document.querySelector(".psx").dataset.theme');
    const fails = []; let checks = 0;
    for (const w of widths) { await setW(w); await sleep(60); const bad = await ev(`window.__clip(${w})`); checks++; for (const b of bad) fails.push(`${w}: ${b}`); }
    // phone outline open at phone widths
    rr[name] = { theme: themeNow, checks, failures: fails.length, first: fails.slice(0, 6) };
    process.stdout.write(`${runName} · ${name}: ${fails.length} fails (${themeNow})\n`);
  }
  if (!process.env.BROKEN) {
    // phone outline open
    const fails = []; let checks = 0;
    for (const w of widths.filter(w => w <= 980)) { await setW(w); await sleep(60); await ev(`(async()=>{ const b=document.querySelector('.psx-mbar button'); if (b && b.getAttribute('aria-expanded')!=='true') b.click(); await new Promise(r=>setTimeout(r,80)); return 1; })()`); const bad = await ev(`window.__clip(${w})`); checks++; for (const b of bad) fails.push(`${w}: ${b}`); }
    rr['phone outline open'] = { checks, failures: fails.length, first: fails.slice(0, 6) };
    process.stdout.write(`${runName} · phone outline open: ${fails.length} fails\n`);
  }
}
writeFileSync(out, JSON.stringify(result, null, 1));
chrome.kill(); process.exit(0);
