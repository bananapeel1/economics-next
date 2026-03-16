import Link from 'next/link';

export default function RelatedModelAnswers({ href, sectionTitle, count }) {
  return (
    <div className="seo-related-model-answers">
      <div className="seo-related-ma-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      </div>
      <div className="seo-related-ma-content">
        <h3>Model Answers for {sectionTitle}</h3>
        <p>
          {count} annotated model answer{count !== 1 ? 's' : ''} with mark scheme breakdowns,
          PEEL structure, and examiner commentary.
        </p>
        <Link href={href} className="seo-related-ma-link">
          View Model Answers &rarr;
        </Link>
      </div>
    </div>
  );
}
