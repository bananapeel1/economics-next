import KeyIdea from './KeyIdea';
import BodyRenderer from './BodyRenderer';
import RealExample from './RealExample';
import MisconceptionCard from './MisconceptionCard';
import ExamMattersCard from './ExamMattersCard';

/**
 * One subsection: key idea, body, then the three lenses.
 *
 * `hideTitle` — Learn Mode renders the step's one heading itself (packet 5, F064: every subsection
 * title used to appear twice, as an h2 from the step and an h3 from here, back to back). The Notes
 * tab still wants the h3, so the default keeps it.
 */
export default function NoteSection({ section, glossaryTerms, hideTitle = false }) {
  if (!section) return null;
  return (
    <div className="rl-note-section" id={section.id}>
      {!hideTitle && <h3 className="rl-note-section-title">{section.title}</h3>}
      <KeyIdea text={section.keyIdea} glossaryTerms={glossaryTerms} />
      <BodyRenderer blocks={section.body} glossaryTerms={glossaryTerms} />
      {(section.realExample || section.misconception || section.examMatters) && (
        <div className="rl-lenses">
          {section.realExample && (
            <RealExample
              emoji={section.realExample.emoji}
              text={section.realExample.text}
              glossaryTerms={glossaryTerms}
            />
          )}
          {section.misconception && (
            <MisconceptionCard text={section.misconception} glossaryTerms={glossaryTerms} />
          )}
          {section.examMatters && (
            <ExamMattersCard text={section.examMatters} glossaryTerms={glossaryTerms} />
          )}
        </div>
      )}
    </div>
  );
}
