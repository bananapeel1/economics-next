import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL The Market Model Answers | Business | Revvy Learn',
  description: 'Edexcel IAL Business The Market (1.3.2) covers demand, supply and the elasticities. Model answers for this topic are being written; every other Business topic is covered.',
  alternates: { canonical: '/business/the-market-model-answers' },
  openGraph: {
    title: 'Edexcel IAL The Market Model Answers | Revvy Learn',
    description: 'Edexcel IAL Business 1.3.2 — demand, supply and the elasticities. Model answers for this topic are in progress.',
    url: 'https://revvylearn.com/business/the-market-model-answers',
  },
};

export default function TheMarketModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="1.3.2"
        sectionId="the-market"
      subject="business"
      backLink={{ href: '/business/unit-1', label: 'Unit 1: Marketing & People' }}
      title="The Market Model Answers"
      subtitle="Section 1.3.2 — <strong>demand, supply and the elasticities</strong>. The market-research model answer that used to sit here is examined under 1.3.1 and has moved to Meeting Customer Needs."
    />
  );
}
