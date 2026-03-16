import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Consumer Demand Model Answers | Economics | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Economics consumer behaviour and demand (1.3.2). Covers PED, income elasticity, and demand analysis with mark scheme breakdowns and examiner tips.',
  alternates: { canonical: '/economics/demand-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Consumer Demand Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Economics demand and elasticity questions.',
    url: 'https://revvylearn.com/economics/demand-model-answers',
  },
};

export default function DemandModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="1.3.2"
      subject="economics"
      backLink={{ href: '/economics/unit-1', label: 'Unit 1: Markets in Action' }}
      title="Consumer Demand Model Answers"
      subtitle="Section 1.3.2 — Annotated model answers for <strong>price elasticity of demand</strong>, consumer behaviour, and demand analysis questions."
    />
  );
}
