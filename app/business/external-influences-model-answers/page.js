import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL External Influences Model Answers | Business | Revvy Learn',
  description: 'Free annotated model answer for Edexcel IAL Business external influences (2.3.5): a 20-mark Evaluate essay on how an interest rate rise affects a UK retail business, with a mark scheme breakdown and examiner commentary.',
  alternates: { canonical: '/business/external-influences-model-answers' },
  openGraph: {
    title: 'Edexcel IAL External Influences Model Answers | Revvy Learn',
    description: 'Step-by-step model answer for an Edexcel IAL Business external influences question — a 20-mark interest rates essay.',
    url: 'https://revvylearn.com/business/external-influences-model-answers',
  },
};

export default function ExternalInfluencesModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="2.3.5"
        sectionId="external-influences"
      subject="business"
      backLink={{ href: '/business/unit-2', label: 'Unit 2: Managing Business Activities' }}
      title="External Influences Model Answers"
      subtitle="Section 2.3.5 — Annotated model answer for <strong>interest rates</strong>: a 20-mark Evaluate essay on how a rate rise affects a UK retail business."
    />
  );
}
