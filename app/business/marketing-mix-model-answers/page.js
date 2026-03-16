import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Marketing Mix Model Answers | Business | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Business marketing mix and strategy (1.3). Covers the 4Ps, pricing strategies, and promotional methods with mark scheme breakdowns and examiner tips.',
  alternates: { canonical: '/business/marketing-mix-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Marketing Mix Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Business marketing mix questions.',
    url: 'https://revvylearn.com/business/marketing-mix-model-answers',
  },
};

export default function MarketingMixModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="1.3"
      subject="business"
      backLink={{ href: '/business/unit-1', label: 'Unit 1: Marketing and People' }}
      title="Marketing Mix Model Answers"
      subtitle="Section 1.3 — Annotated model answers for the <strong>4Ps</strong>, pricing strategies, and promotional methods in Edexcel IAL Business."
    />
  );
}
