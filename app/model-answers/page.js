import ModelAnswersPage from '@/components/ModelAnswersPage';
import { MODEL_ANSWERS, MODEL_ANSWERS_FAQ, MODEL_ANSWERS_SECTIONS } from '@/data/modelAnswersData';
import Link from 'next/link';

export const metadata = {
  title: 'IAL Economics & Business Model Answers | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Economics and Business. 4, 8 and 20-mark questions with mark scheme commentary and examiner tips.',
  alternates: {
    canonical: '/model-answers',
  },
  openGraph: {
    title: 'IAL Economics & Business Model Answers | Revvy Learn',
    description: 'Free annotated model answers for Edexcel IAL Economics and Business. 4, 8 and 20-mark questions with mark scheme commentary.',
    url: 'https://revvylearn.com/model-answers',
  },
};

export default function ModelAnswersRoute() {
  /* FAQ JSON-LD for Google featured snippets */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: MODEL_ANSWERS_FAQ.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <div className="resource-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Model Answers</h1>
        <p className="resource-page-subtitle">
          Annotated model answers for <strong>Edexcel International A-Level Economics and Business</strong> — 4, 8, and 20-mark questions with mark scheme breakdowns, PEEL structure, and examiner commentary.
        </p>
      </div>

      <ModelAnswersPage answers={MODEL_ANSWERS} sectionsMeta={MODEL_ANSWERS_SECTIONS} />
    </div>
  );
}
