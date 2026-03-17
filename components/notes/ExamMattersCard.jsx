import { parseInlineMarkdown } from '@/lib/parse-inline-markdown';

export default function ExamMattersCard({ text, glossaryTerms }) {
  if (!text) return null;
  const html = parseInlineMarkdown(text, glossaryTerms);
  return (
    <div className="rl-exam-matters">
      <div className="rl-exam-matters-label">Exam Matters</div>
      <p dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
