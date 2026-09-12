/**
 * The row shape written by the three spaced-repetition progress routes
 * (/api/practice/progress, /api/flashcards-practice/progress, /api/written-practice/progress).
 *
 * Packet 2 dual-writes: `item_id` is recorded alongside `question_index`, never instead of
 * it. Nothing reads item_id yet. Packet 4 switches the queue, the unique constraint and the
 * conflict target together, and drops question_index — doing any of that earlier loses data
 * five silent ways, all listed at the top of scripts/packet-2-item-id.sql.
 *
 * Two rules this helper exists to enforce:
 *
 *  1. `item_id` is omitted from the payload when the caller does not supply one. An upsert
 *     carrying `item_id: null` would overwrite the value the packet 2 backfill wrote for
 *     that row — 1,041 rows were mapped and an older client could quietly erase them.
 *  2. `question_index` is always sent. The column is INTEGER NOT NULL, so a row without it
 *     fails with 23502, and none of the three POST callers check res.ok.
 */
export function buildProgressRow({
  userId,
  sectionId,
  questionIndex,
  itemId,
  ease,
  intervalDays,
  repetitions,
  nextReview,
  lastResult,
  lastConfidence,
  now = new Date(),
}) {
  const row = {
    user_id: userId,
    section_id: sectionId,
    question_index: questionIndex,
    ease: ease ?? 2.5,
    interval_days: intervalDays ?? 0,
    repetitions: repetitions ?? 0,
    next_review: nextReview ? new Date(nextReview).toISOString() : now.toISOString(),
    last_result: lastResult ?? null,
    last_confidence: lastConfidence ?? null,
    updated_at: now.toISOString(),
  };

  // Only ever add it. Never null it.
  if (typeof itemId === 'string' && itemId.length) row.item_id = itemId;

  return row;
}

/** The conflict target. Still the positional key: packet 4 moves it to item_id. */
export const PROGRESS_CONFLICT_TARGET = 'user_id,section_id,question_index';
