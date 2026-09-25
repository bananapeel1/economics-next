// Packet 2.9. Which practice items carry a practice.opening finding (their first guidance paragraph is the scheme).
import { validateLive } from '../../../scripts/_content-write.mjs';
for (const id of process.argv.slice(2)) {
  const v = await validateLive(id);
  const leaky = new Set(v.findings.filter((f) => f.rule === 'practice.opening').map((f) => f.where));
  console.log(id);
  (v.bundle.practice || []).forEach((p, i) => console.log(`  p${i} ${leaky.has(p.id) ? 'LEAKS' : 'ok   '} (${p.marks}m) ${String(p.question).slice(0, 90)}`));
}
