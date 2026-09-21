import ModelAnswersPage from '@/components/ModelAnswersPage';
import SiteHeader from '@/components/SiteHeader';
import { MODEL_ANSWERS, SECTION_MODEL_ANSWERS_FAQ } from '@/data/modelAnswersData';
import Link from 'next/link';

export default function SectionModelAnswersPage({
  sectionNumber,
  sectionId,
  subject,
  backLink,
  title,
  subtitle,
  seoIntro,
}) {
  const sectionAnswers = MODEL_ANSWERS.filter(
    a => a.sectionNumber === sectionNumber && a.subject === subject
  );

  // Subject first: Business 1.3.1 and Economics 1.3.1 are different topics. Packet 12.1, E005.
  const faqs = (SECTION_MODEL_ANSWERS_FAQ[subject] || {})[sectionNumber] || [];

  const topicName = title.replace(/\s*Model Answers\s*$/i, '').trim();

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
    <div className="resource-page rl-night">
      <SiteHeader crumb={`${subject === 'business' ? 'Business' : 'Economics'} / Model answers`} />

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

      {sectionAnswers.length === 0 ? (
        /* Honest rather than blank. After E005 renumbered the Business bank by wording, IAL Business
           1.3.2 (demand, supply, elasticities) has no model answer yet; the page used to show an
           empty card list with no explanation.

           One sentence, one expression. Written across two JSX lines it rendered as
           "The rest of Businessis covered": JSX drops the whitespace between an expression and a
           following line break, so the space before "is" disappeared. Packet 12.1 fix round B1. */
        <p className="ma-empty-note" role="note">
          {`No model answers are published for this topic yet. The rest of ${subject === 'business' ? 'Business' : 'Economics'} is covered — use the link below to browse every topic.`}
        </p>
      ) : (
        <ModelAnswersPage answers={sectionAnswers} freeMode={true} />
      )}

      {/* The old CTA sent the reader to /model-answers — another SEO page, not
          the app. Someone who has just read worked answers wants to attempt one,
          so this offers that, on the topic they are already reading, and it
          keeps the ?section= form so the click is measurable. */}
      <div className="seo-cta" style={{ marginTop: 32 }}>
        <h2>Now try one yourself</h2>
        <p>
          Practise {topicName} in the app: exam-style questions filtered by mark
          value, each with model answer guidance you can open when you are ready.
          Free, and it opens exactly where you are. Getting your own written
          answers AI-marked is a Pro feature.
        </p>
        <Link
          href={sectionId ? `/?section=${sectionId}` : '/model-answers'}
          className="seo-cta-button"
        >
          Practise {topicName} &rarr;
        </Link>
      </div>
    </div>
  );
}
