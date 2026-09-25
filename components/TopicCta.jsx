import Link from 'next/link';

/**
 * The three calls to action on a topic pillar page.
 *
 * These were hand-written in each page, so the same copy lived in three files
 * and "Open in app" appeared twice on every one of them. Copy lives here now,
 * and each slot names the next concrete step rather than the destination:
 * a reader at the end of the page has already opened the app in their head,
 * what they want to know is what is waiting there.
 *
 * `topic` is the human name — "market failure", "globalisation" — used in the
 * sentence, so pass it lower case unless it is a proper noun.
 */
const SLOTS = {
  hero: {
    className: 'elp-btn-primary',
    label: topic => `Start revising ${topic}`,
  },
  afterNotes: {
    className: 'eup-topic-open-link topic-cta-inline',
    label: topic => `Open the full ${topic} notes`,
  },
  closing: {
    className: 'elp-btn-primary topic-cta-lg',
    label: topic => `Practise ${topic} questions — free`,
  },
};

export default function TopicCta({ slot, href, topic, label }) {
  const config = SLOTS[slot];
  if (!config) return null;

  return (
    <Link href={href} className={config.className}>
      {label ?? config.label(topic)} &rarr;
    </Link>
  );
}
