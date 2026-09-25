/**
 * Severity of a content issue, derived from its reports.
 *
 * Students never choose severity. They cannot see reach (how many others hit the same question) and
 * nobody picks "low" for their own complaint, so a student-chosen severity sorts by frustration,
 * not by harm. The ingest route recomputes this every time a report attaches, unless an admin has
 * set it by hand (content_issues.severity_manual).
 *
 * The vocabulary is the ledger's (audit/ledger.json: critical / high / medium / low), so an issue
 * promoted into a packet keeps its grade.
 */
import { CATEGORIES, ANSWER_KEY_CATEGORIES } from './taxonomy.js';

export const SEVERITIES = ['low', 'medium', 'high', 'critical'];
const rank = (s) => SEVERITIES.indexOf(s);

/**
 * @param {Array<{category: string, reporterKey: string}>} reports every report attached to the issue
 * @returns {'low'|'medium'|'high'|'critical'}
 */
export function computeSeverity(reports) {
  if (!reports?.length) return 'medium';

  let level = 0;
  for (const r of reports) level = Math.max(level, rank(CATEGORIES[r.category]?.base ?? 'medium'));

  const reporters = new Set(reports.map((r) => r.reporterKey).filter(Boolean)).size;

  // Two people independently saying the answer key is wrong: everyone who opens this item is
  // being taught, or marked against, a wrong answer until it is fixed.
  const keyReporters = new Set(
    reports.filter((r) => ANSWER_KEY_CATEGORIES.has(r.category)).map((r) => r.reporterKey).filter(Boolean)
  ).size;
  if (keyReporters >= 2) return 'critical';

  // Reach: three separate students hitting the same item outranks one student's category.
  if (reporters >= 3) level = Math.min(level + 1, rank('critical'));

  return SEVERITIES[level];
}
