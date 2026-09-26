// Packet 12.5: score the blind reader against the key it never saw. An adjudicated tag is written only
// for a pass-1 leaf the reader confirmed, on an item where the reader picked NO control; an item on
// which it picked a control stays untagged, because on that item the reader is not a reliable second.
import fs from 'node:fs';
const A = 'audit/runs/packet-12.5/adjudication/';
const { key } = JSON.parse(fs.readFileSync(A + 'key.json', 'utf8'));
const { verdicts } = JSON.parse(fs.readFileSync(A + 'verdicts.json', 'utf8'));
const input = JSON.parse(fs.readFileSync(A + 'input.json', 'utf8'));
let bad = 0;
for (const it of input.items) {
  if (!(it.key in verdicts)) { console.log('MISSING', it.key); bad++; continue; }
  const cand = new Set(it.candidates.map((c) => c.id));
  for (const id of verdicts[it.key]) if (!cand.has(id)) { console.log('NOT A CANDIDATE', it.key, id); bad++; }
}
if (bad) process.exit(1);
let realTotal = 0, realConfirmed = 0, ctlTotal = 0, ctlPicked = 0, itemsWithCtl = 0;
const out = {};
for (const [k, { real, controls }] of Object.entries(key)) {
  const v = new Set(verdicts[k]);
  const conf = real.filter((x) => v.has(x));
  const ctl = controls.filter((x) => v.has(x));
  realTotal += real.length; realConfirmed += conf.length; ctlTotal += controls.length; ctlPicked += ctl.length;
  if (ctl.length) itemsWithCtl++;
  out[k] = { confirmed: conf.sort(), rejected: real.filter((x) => !v.has(x)).sort(), controlsPicked: ctl.sort(), write: ctl.length ? [] : conf.sort() };
}
const written = Object.values(out).filter((o) => o.write.length).length;
const summary = { items: Object.keys(key).length, realTotal, realConfirmed, ctlTotal, ctlPicked, itemsWithControlPicked: itemsWithCtl, itemsWritten: written, tagsWritten: Object.values(out).reduce((n, o) => n + o.write.length, 0) };
fs.writeFileSync(A + 'scored.json', `${JSON.stringify({ rule: 'write = pass-1 leaves the blind reader confirmed, only on items where it picked no control', summary, items: out }, null, 1)}\n`);
console.log(summary);
