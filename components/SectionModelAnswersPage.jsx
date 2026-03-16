import ModelAnswersPage from '@/components/ModelAnswersPage';
import { MODEL_ANSWERS, SECTION_MODEL_ANSWERS_FAQ } from '@/data/modelAnswersData';
import Link from 'next/link';

export default function SectionModelAnswersPage({
  sectionNumber,
  subject,
  backLink,
  title,
  subtitle,
  seoIntro,
}) {
  const sectionAnswers = MODEL_ANSWERS.filter(
    a => a.sectionNumber === sectionNumber && a.subject === subject
  );

  const faqs = SECTION_MODEL_ANSWERS_FAQ[sectionNumber] || [];

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null;

  return (
    <div className="resource-page">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="resource-page-header">
        <Link href={backLink.href} className="resource-back-link">
          &larr; {backLink.label}
        </Link>
        <h1 className="resource-page-title">{title}</h1>
        <p className="resource-page-subtitle" dangerouslySetInnerHTML={{ __html: subtitle }} />
      </div>

      {seoIntro && (
        <div className="ma-seo-intro" dangerouslySetInnerHTML={{ __html: seoIntro }} />
      )}

      <ModelAnswersPage answers={sectionAnswers} freeMode={true} />

      <div className="seo-cta" style={{ marginTop: 32 }}>
        <h2>More Model Answers</h2>
        <p>Browse all Edexcel IAL Economics &amp; Business model answers with mark scheme breakdowns and examiner commentary.</p>
        <Link href="/model-answers" className="seo-cta-button">
          View All Model Answers &rarr;
        </Link>
      </div>
    </div>
  );
}
