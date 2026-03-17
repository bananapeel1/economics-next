import KeyIdea from './KeyIdea';
import BodyRenderer from './BodyRenderer';
import RealExample from './RealExample';
import MisconceptionCard from './MisconceptionCard';
import ExamMattersCard from './ExamMattersCard';

export default function NoteSection({ section, glossaryTerms }) {
  if (!section) return null;
  return (
    <div className="rl-note-section" id={section.id}>
      <h3 className="rl-note-section-title">{section.title}</h3>
      <KeyIdea text={section.keyIdea} glossaryTerms={glossaryTerms} />
      <BodyRenderer blocks={section.body} glossaryTerms={glossaryTerms} />
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
  );
}
