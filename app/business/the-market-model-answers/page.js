import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL The Market Model Answers | Business | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Business the market (1.2). Covers market research, demand, supply, and competition with mark scheme breakdowns and examiner tips.',
  alternates: { canonical: '/business/the-market-model-answers' },
  openGraph: {
    title: 'Edexcel IAL The Market Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Business market research and competition questions.',
    url: 'https://revvylearn.com/business/the-market-model-answers',
  },
};

export default function TheMarketModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="1.2"
      subject="business"
      backLink={{ href: '/business/unit-1', label: 'Unit 1: Marketing & People' }}
      title="The Market Model Answers"
      subtitle="Section 1.2 — Annotated model answers for <strong>market research</strong>, demand, supply, and competitive analysis."
    />
  );
}
