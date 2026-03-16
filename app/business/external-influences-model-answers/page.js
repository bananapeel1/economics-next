import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL External Influences Model Answers | Business | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Business external influences (2.5). Covers interest rates, exchange rates, economic and political factors with mark scheme breakdowns and examiner tips.',
  alternates: { canonical: '/business/external-influences-model-answers' },
  openGraph: {
    title: 'Edexcel IAL External Influences Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Business external influences questions — 20-mark essays.',
    url: 'https://revvylearn.com/business/external-influences-model-answers',
  },
};

export default function ExternalInfluencesModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="2.5"
      subject="business"
      backLink={{ href: '/business/unit-2', label: 'Unit 2: Managing Business Activities' }}
      title="External Influences Model Answers"
      subtitle="Section 2.5 — Annotated model answers for <strong>interest rates</strong>, exchange rates, and external factors affecting business performance."
    />
  );
}
