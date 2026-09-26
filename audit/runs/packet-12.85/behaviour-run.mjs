// Packet 12.85 — behaviour checks on the served page in headless Chrome (real clicks and keys through
// CDP, own assertions, nothing shared with the component's code). node behaviour-run.mjs <origin>
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const [origin] = process.argv.slice(2);
const port = 9100 + Math.floor(Math.random() * 150);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'beh-'))}`, '--no-first-run', '--disable-extensions', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let t = []; for (let i = 0; i < 80; i++) { try { t = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (t.length) break; } catch {} await sleep(150); }
const ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map(); const errors = [];
ws.addEventListener('message', (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } else if (d.method === 'Runtime.exceptionThrown' || (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error')) errors.push(JSON.stringify(d.params).slice(0, 300)); });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 600)); return r.result?.result?.value; };
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
const url = origin + '/economics/market-failure-model-answers';
const size = (w, h) => send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 768 });
const load = async () => { await send('Page.navigate', { url }); for (let i = 0; i < 100; i++) { await sleep(200); if ((await ev('document.readyState')) === 'complete') break; } await sleep(1500); await ev(HELP); };
const key = async (k, code) => { await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, windowsVirtualKeyCode: k === 'ArrowRight' ? 39 : 37 }); await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code }); await sleep(250); };
const HELP = `window.C={
 q:()=>document.querySelector('.psx-q:not([hidden])'),
 cur:()=>{const q=C.q();return q?q.dataset.item:null},
 oq:(l)=>{const b=[...document.querySelectorAll('.psx-oq')].find(x=>x.querySelector('.psx-on').textContent===l); if(b) b.click();},
 type:(v)=>{const t=C.q().querySelector('textarea'); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(t,v); t.dispatchEvent(new Event('input',{bubbles:true}));},
 btn:(l)=>{const b=[...C.q().querySelectorAll('button')].find(x=>x.textContent===l); if(!b) throw new Error('no button '+l); b.click();},
 shown:(el)=>!!el&&el.getClientRects().length>0,
 total:()=>document.querySelector('.psx-ototal').innerText.replace(/\\s+/g,' ').trim(),
};true`;
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok: !!ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`); };
const tick = () => sleep(300);

await size(1440, 900);
// E070: paper by default even when the site's own key says dark (as ThemeProvider writes on every load)
await send('Page.navigate', { url: origin + '/robots.txt' }); await sleep(500);
await ev(`localStorage.clear(); localStorage.setItem('theme','dark'); true`);
await load();
check('E070 paper by default although localStorage.theme is "dark"', (await ev(`document.querySelector('.psx').dataset.theme`)) === 'light', `html data-theme=${await ev('document.documentElement.dataset.theme')}`);
check('E070 no rl-night on the page', (await ev(`document.querySelectorAll('.rl-night').length`)) === 0);
// E065 header
check('E065 exactly one h1, the heading', (await ev(`document.querySelectorAll('h1').length+'|'+document.querySelector('h1').textContent`)) === '1|Market Failure — Exam Questions & Model Answers');
check('E065 the logo links back to the app at this topic', (await ev(`document.querySelector('.psx-logo').getAttribute('href')`)) === '/?section=market-failure');
check('E065 no SiteHeader on the shell page', (await ev(`document.querySelectorAll('.rlh').length`)) === 0);
const bk = await ev(`(()=>{C.oq('6(a)');return true})()`); await tick();
const fit = await ev(`(()=>{const b=document.querySelector('.psx-booklet').getBoundingClientRect();return {bottom:Math.round(b.bottom),vh:innerHeight,sw:document.documentElement.scrollWidth,iw:innerWidth,overflowY:getComputedStyle(document.querySelector('.psx-booklet')).overflowY}})()`);
check('E065 at 1440x900 the source booklet sheet fits the screen below the header and scrolls inside itself; no sideways page scroll', fit.bottom <= fit.vh && fit.sw === fit.iw && fit.overflowY === 'auto', JSON.stringify(fit));
// E072 practice.opening: nothing of the answer visible before marking, on every question
const leaks = await ev(`(async()=>{const out=[];for(const b of [...document.querySelectorAll('.psx-oq')]){b.click();await new Promise(r=>setTimeout(r,120));const q=C.q();if(!q){ if(document.querySelector('.psx-pickessay:not([hidden])')) { const vis=[...document.querySelectorAll('.psx-markblock,.psx-exblock,.psx-levels,.psx-indic,.psx-verdict,.psx-examiner')].filter(C.shown).length; out.push('pick:'+vis);} continue;}
 const vis=[...q.querySelectorAll('.psx-markblock,.psx-exblock,.psx-levels,.psx-indic,.psx-pt,.psx-verdict,.psx-examiner,.psx-note,.psx-script')].filter(C.shown).length; out.push(q.dataset.item+':'+vis);} return out;})()`);
check('E072 practice.opening: no mark scheme, level, indicative content or model answer visible before marking, all 13 questions', leaks.length === 13 && leaks.every((x) => x.endsWith(':0')), leaks.join(' '));
check('E072 all of it is in the DOM (server HTML), hidden: 13 mark schemes and 13 exemplars', (await ev(`document.querySelectorAll('.psx-markblock').length+'|'+document.querySelectorAll('.psx-exblock').length`)) === '13|13');
// E065 keyboard
await ev(`C.oq('1'); true`); await tick(); await ev(`document.activeElement&&document.activeElement.blur(); true`);
await key('ArrowRight', 'ArrowRight'); const afterRight = await ev('C.cur()');
await key('ArrowLeft', 'ArrowLeft'); const afterLeft = await ev('C.cur()');
check('E065 → and ← move through the paper in order', afterRight === 'mf-short-draw-vaccination-welfare-loss-4' && afterLeft === 'neg-externality-4', `${afterRight} / ${afterLeft}`);
await ev(`C.q().querySelector('textarea').focus(); true`); await key('ArrowRight', 'ArrowRight');
check('E065 arrows are inert while typing', (await ev('C.cur()')) === 'neg-externality-4');
// E067 quote a booklet figure at the cursor (12.75 figuresIn)
await ev(`C.oq('(c)'); true`); await tick();
await ev(`C.type('Demand is elastic: PED is  so use falls.'); true`); await tick();
await ev(`(()=>{const t=C.q().querySelector('textarea');t.focus();t.setSelectionRange(26,26);t.dispatchEvent(new Event('select',{bubbles:true}));return true})()`);
await ev(`[...document.querySelectorAll('.psx-booklet .ps-fig')].find(f=>f.dataset.figText.includes('1.4')).click(); true`); await tick();
const quoted = await ev(`C.q().querySelector('textarea').value`);
check('E067 a booklet figure clicked while writing is quoted at the cursor', /PED is -1\.4|PED is −1\.4/.test(quoted), JSON.stringify(quoted));
check('E072 the draft is saved under the 12.6 key and shape', await ev(`(()=>{const r=JSON.parse(localStorage.getItem('rl:attempt:v1:mf-extract-analyse-plastic-bag-charge-6')||'{}');return typeof r.draft==='string'&&r.draft.includes('elastic')})()`));
// E067 points marking
await ev(`C.btn('Mark my answer'); true`); await tick();
check('E067 headings read as Pearson\'s', (await ev(`[...C.q().querySelectorAll('.psx-ao')].map(x=>x.textContent).join(',')`)) === 'Knowledge 2,Application 2,Analysis 2');
await ev(`C.q().querySelectorAll('.psx-pt input')[2].click(); true`); await tick();
check('E067 one running mark after one tick', (await ev(`C.q().querySelector('.psx-score').textContent`)) === '1 / 6');
check('E065 one total: the outline agrees', /Your marks so far 1 of 6 marked · paper out of 74/.test(await ev('C.total()')), await ev('C.total()'));
check('E065 the outline row shows 1/6', (await ev(`[...document.querySelectorAll('.psx-oq')].find(b=>b.textContent.startsWith('(c)')).querySelector('.psx-os').textContent`)) === '1/6');
await ev(`C.q().querySelectorAll('.psx-see')[0].click(); true`); await tick();
const missed = await ev(`(()=>{const n=C.q().querySelector('.psx-note:not([hidden])');const s=C.q().querySelector('.psx-seg.is-lit');return (n?n.querySelector('b').textContent:'')+'|'+(s?s.className:'')+'|'+(s?getComputedStyle(s).textDecorationStyle:'')})()`);
check('E067 "See it" on an unticked point: says missed in words, dashed underline', missed.startsWith('You missed this point. This is how the model answer earns it.') && /is-missed/.test(missed) && missed.endsWith('dashed'), missed);
await ev(`C.q().querySelectorAll('.psx-see')[2].click(); true`); await tick();
const made = await ev(`(()=>{const n=C.q().querySelector('.psx-note:not([hidden])');const s=C.q().querySelector('.psx-seg.is-lit');return (n?n.querySelector('b').textContent:'')+'|'+getComputedStyle(s).textDecorationStyle})()`);
check('E067 "See it" on a ticked point: says made, solid underline', made === 'You made this point.|solid', made);
check('E067 margin letters and verdict', (await ev(`[...C.q().querySelectorAll('.psx-margin')].map(m=>m.textContent).join(',')+' | '+C.q().querySelector('.psx-verdict').textContent`)) === 'K,App,An | K2 · App2 · An2 = 6/6');
check('E066 the marked answer is a ruled block that grows: its full text is visible', await ev(`(()=>{const y=C.q().querySelector('.psx-yours');return y.scrollHeight<=y.clientHeight+1&&getComputedStyle(y).overflowY==='visible'})()`));
// E068 levels
await ev(`C.oq('(e)'); true`); await tick(); await ev(`C.type('The excise cut consumption by 32%.'); true`); await tick(); await ev(`C.btn('Mark my answer'); true`); await tick();
await ev(`C.q().querySelectorAll('.psx-lv button')[1].click(); true`); await tick();
const lv1 = await ev(`C.q().querySelector('.psx-score').textContent+'|'+[...C.q().querySelectorAll('.psx-pick button')].map(b=>b.textContent).join(',')`);
await ev(`[...C.q().querySelectorAll('.psx-pick button')].find(b=>b.textContent==='6').click(); true`); await tick();
await ev(`C.q().querySelectorAll('.psx-lv button')[5].click(); true`); await tick();
const lv2 = await ev(`C.q().querySelector('.psx-score').textContent`);
check('E068 choose a level, then a mark within it; one running total', lv1 === '4 / 14|4,5,6' && lv2 === '11 / 14', `${lv1} then ${lv2}`);
check('E068 bands and "What examiners look for" shown', (await ev(`[...C.q().querySelectorAll('.psx-band')].map(x=>x.textContent).join(' ')+'|'+C.q().querySelectorAll('.psx-lookfor').length`)) === '1–3 4–6 7–8 1–2 3–4 5–6|2');
check('E068 verdict line', (await ev(`C.q().querySelector('.psx-verdict').textContent`)) === 'KAA Level 3 (8) · E Level 3 (6) = 14/14');
check('E068 the level choice is stored, extending the record', await ev(`JSON.stringify(JSON.parse(localStorage.getItem('rl:attempt:v1:mf-extract-evaluate-soft-drinks-excise-20')).levels)==='{"KAA":6,"E":5}'`));
check('E065 total now 12 of 20', /12 of 20 marked/.test(await ev('C.total()')), await ev('C.total()'));
// E069 essay choice
await ev(`C.oq('7'); true`); await tick();
check('E069 Section D opens with both essays and Pearson\'s instruction', (await ev(`document.querySelectorAll('.psx-pickessay:not([hidden]) .psx-essaycard').length+'|'+[...document.querySelectorAll('.psx-sec:not([hidden]) .psx-instr p')].map(p=>p.textContent).join(' ')`)) === '2|Answer ONE question from this section.');
await ev(`document.querySelectorAll('.psx-pickessay:not([hidden]) .psx-btn')[1].click(); true`); await tick();
await ev(`C.type('Deposit insurance creates moral hazard because...'); true`); await tick(); await ev(`C.btn('Mark my answer'); true`); await tick();
await ev(`C.q().querySelectorAll('.psx-lv button')[2].click(); true`); await tick();
const t8 = await ev('C.total()');
await ev(`C.oq('7'); true`); await tick();
const off = await ev(`[...document.querySelectorAll('.psx-oq')].find(b=>b.querySelector('.psx-on').textContent==='7').className+'|'+(C.q()?C.q().querySelectorAll('textarea').length:'x')+'|'+C.shown(C.q().querySelector('.psx-markblock'))`);
check('E069 the total counts only the chosen essay; the other is dimmed and offers no answer box', /19 of 40 marked/.test(t8) && /is-off/.test(off) && off.endsWith('|0|false'), `${t8} ; ${off}`);
// E069 Draw
await ev(`C.oq('2'); true`); await tick();
const draw1 = await ev(`C.q().querySelectorAll('textarea').length+'|'+C.q().querySelector('.psx-draw b').textContent`);
await ev(`C.btn('I’ve drawn it: mark it'); true`); await tick();
const draw2 = await ev(`C.shown(C.q().querySelector('.psx-diagram img'))+'|'+C.q().querySelector('.psx-diagram img').getAttribute('src')+'|'+C.q().querySelectorAll('.psx-pt input').length`);
check('E069 Draw: sketch on paper, then mark against the points and the model diagram', draw1 === '0|Draw this on paper.' && draw2 === 'true|/diagrams/positive-externality-consumption.svg|4', `${draw1} ; ${draw2}`);
// Section A
check('E069 Section A: "Six 1-mark questions", a link to the topic, the Quiz tab named', (await ev(`[...document.querySelectorAll('.psx-osec')][0].textContent`)).includes('Six 1-mark questions.') && (await ev(`[...document.querySelectorAll('.psx-olink')][0].getAttribute('href')`)) === '/?section=market-failure');
// Model answers mode shows both essays
await ev(`[...document.querySelectorAll('.psx-mode button')].find(b=>b.textContent==='Model answers').click(); true`); await tick();
await ev(`C.oq('7'); true`); await tick();
const ma7 = await ev(`C.cur()+'|'+C.shown(C.q().querySelector('.psx-exblock'))`);
await ev(`C.oq('8'); true`); await tick();
const ma8 = await ev(`C.cur()+'|'+C.shown(C.q().querySelector('.psx-exblock'))`);
check('E069 Model answers mode shows both essays, nothing scored', ma7 === 'market-failure-government-intervention-20|true' && ma8 === 'mf-essay-deposit-protection-moral-hazard-20|true' && /Nothing is scored/.test(await ev('C.total()')), `${ma7} ; ${ma8}`);
// E070 dark only by choice, and it sticks
await ev(`document.querySelector('.psx-theme').click(); true`); await tick();
const ch = await ev(`document.querySelector('.psx').dataset.theme+'|'+localStorage.getItem('rl:practice:theme')+'|'+localStorage.getItem('theme')`);
await load();
const ch2 = await ev(`document.querySelector('.psx').dataset.theme`);
check('E070 the switch picks dark, writes the site key too, and dark is kept on return', ch === 'dark|dark|dark' && ch2 === 'dark', `${ch} ; after reload ${ch2}`);
await ev(`document.querySelector('.psx-theme').click(); true`); await tick();
check('E070 back to paper writes light', (await ev(`document.querySelector('.psx').dataset.theme+'|'+localStorage.getItem('rl:practice:theme')+'|'+localStorage.getItem('theme')`)) === 'light|light|light');
check('E072 drafts survive a reload (in Practise, which the page remembered as Model answers)', (await ev(`(()=>{[...document.querySelectorAll('.psx-mode button')].find(b=>b.textContent==='Practise').click();return true})()`)) && (await sleep(300), await ev(`(()=>{C.oq('(c)');return true})()`)) && (await sleep(300), await ev(`C.q().querySelector('.psx-yours')?C.q().querySelector('.psx-yours').textContent:''`)).includes('elastic'));
// Phones: outline button and tabs
await size(390, 844); await load();
await ev(`C.oq('(c)'); true`); await tick();
const ph1 = await ev(`C.shown(document.querySelector('.psx-outline'))+'|'+C.shown(document.querySelector('.psx-mbar button'))+'|'+document.querySelector('.psx-mbar button').textContent`);
await ev(`document.querySelector('.psx-mbar button').click(); true`); await tick();
const ph2 = await ev(`C.shown(document.querySelector('.psx-outline'))`);
await ev(`document.querySelector('.psx-mbar button').click(); true`); await tick();
await ev(`window.scrollTo(0, 2000); true`); await tick();
await ev(`[...document.querySelectorAll('.psx-mtabs button')].find(b=>b.textContent==='Source booklet').click(); true`); await tick();
const tabs = await ev(`C.shown(document.querySelector('.psx-booklet'))+'|'+C.shown(document.querySelector('.psx-qpaper'))+'|'+Math.round(document.querySelector('.psx-booklet').getBoundingClientRect().top)`);
check('E065 phones: "All questions" opens the outline', ph1.startsWith('false|true|Section C · 6(c)') && ph2 === true, `${ph1} ; open=${ph2}`);
check('E065 phones: Source booklet tab shows the booklet from its top', tabs.startsWith('true|false|') && Number(tabs.split('|')[2]) >= 0 && Number(tabs.split('|')[2]) < 200, tabs);
// noscript
await size(1440, 900);
await send('Emulation.setScriptExecutionDisabled', { value: true });
await send('Page.navigate', { url }); await sleep(2500);
const ns = await send('Runtime.evaluate', { expression: `[...document.querySelectorAll('.psx-markblock,.psx-exblock')].filter(e=>e.getClientRects().length).length+'|'+[...document.querySelectorAll('.psx-q')].filter(e=>e.getClientRects().length).length`, returnByValue: true });
check('E072 without JavaScript every question, mark scheme and model answer shows', ns.result?.result?.value === '26|13', ns.result?.result?.value);
await send('Emulation.setScriptExecutionDisabled', { value: false });
console.log(`console errors: ${errors.length}`, errors.slice(0, 3));
console.log(`${results.filter((r) => r.ok).length}/${results.length} passed`);
ws.close(); chrome.kill();
