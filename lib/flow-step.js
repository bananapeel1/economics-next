/**
 * How a flow step becomes a title and an optional subtitle (F073).
 *
 * Two forms are accepted:
 *
 *   { title: 'Identify', subtitle: 'list every option' }   the explicit form; use this
 *   'Identify — list every option'                          the legacy string form
 *
 * The string form splits on a spaced EM DASH only (" — "), which is the convention the existing
 * content uses (4 of 1,083 live steps). It does not split on a hyphen or an en dash: "Float = LFT
 * - EST - duration" is a formula, and splitting it gave a student the title "Float = LFT" with the
 * subtitle "EST — duration" for a day in September 2026. If a step needs a subtitle, write the
 * object; the validator's `flow.separator` reports the string convention so it can be migrated.
 */
export function stepParts(step) {
  if (step && typeof step === 'object') {
    return { title: String(step.title || ''), subtitle: step.subtitle ? String(step.subtitle) : null };
  }
  const text = step == null ? '' : String(step);
  const parts = text.split(' — ');
  return { title: parts[0], subtitle: parts.length > 1 ? parts.slice(1).join(' — ') : null };
}
