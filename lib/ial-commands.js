/**
 * Pearson Edexcel IAL command words, per subject.
 *
 * Source: IAL Economics spec (2018) Appendix 6, p.68; IAL Business spec (2017) Appendix 6, p.56.
 * Extracted text lives in audit/raw/econ_spec.txt and audit/raw/bus_spec.txt.
 *
 * These are the ONLY command words used in the live papers. Anything else ("Outline", or "Assess"
 * in Economics) rehearses a question shape the student will never sit, and point-based guidance for
 * a levels-marked answer trains the wrong writing. Practice items whose command word is not on the
 * list for their subject are hidden until rewritten (audit/PLAN.md, day-0 hotfix).
 *
 * Tariffs come from lib/ial-marking.js and are NOT yet enforced by the UI filter: enforcing
 * (command, marks) pairs today would hide nearly all 215 live items at once. The validator
 * (lib/content-validator.mjs, packet 3) does enforce them on content pushes.
 */

import { ECONOMICS, BUSINESS } from './ial-marking.js';

/*
 * Packet 3. This file used to carry its own copy of both tariff tables. The two copies agreed —
 * checked entry by entry against audit/raw/tariff-census.json, which is parsed from the spec text —
 * but two copies of a fact is how the 12 September Unit 2 error happened: one gets corrected and the
 * other keeps being read. lib/ial-marking.js is the one place tariffs are stated; this module keeps
 * only the visibility helpers, which is what its four importers actually use.
 */
export const IAL_COMMANDS = {
  economics: ECONOMICS.tariffs,
  business: BUSINESS.tariffs,
};

/** Map a unit code (WEC11, WBS12, ...) or a subject slug to 'economics' | 'business'. */
export function subjectFrom(unitCodeOrSlug) {
  const s = String(unitCodeOrSlug || '').toLowerCase();
  if (s.startsWith('wbs') || s === 'business') return 'business';
  return 'economics';
}

/** The command word of a practice item: the stored field, else the first word of the question. */
export function practiceCommand(item) {
  if (item?.command) return String(item.command).trim();
  const first = String(item?.question || '').trim().split(/\s+/)[0] || '';
  return first.replace(/[^A-Za-z]/g, '');
}

/** True when the item's command word exists in the IAL papers for that subject. */
export function isIALCommand(item, unitCodeOrSlug) {
  const subject = subjectFrom(unitCodeOrSlug);
  const cmd = practiceCommand(item);
  return Object.prototype.hasOwnProperty.call(IAL_COMMANDS[subject], cmd);
}

/**
 * Should this practice item be shown to a student right now?
 * Hidden when flagged `hidden: true` in content, or when its command word is not IAL for the subject.
 */
export function isPracticeVisible(item, unitCodeOrSlug) {
  if (!item) return false;
  if (item.hidden) return false;
  return isIALCommand(item, unitCodeOrSlug);
}
