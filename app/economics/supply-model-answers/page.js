import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Supply Model Answers | Economics | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Economics supply (1.3.3). Covers PES, supply shifts, and production costs with mark scheme breakdowns and examiner tips.',
  alternates: { canonical: '/economics/supply-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Supply Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Economics supply and PES questions.',
    url: 'https://revvylearn.com/economics/supply-model-answers',
  },
};

export default function SupplyModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="1.3.3"
      subject="economics"
      backLink={{ href: '/economics/unit-1', label: 'Unit 1: Markets in Action' }}
      title="Supply Model Answers"
      subtitle="Section 1.3.3 — Annotated model answers for <strong>price elasticity of supply</strong>, supply shifts, and production cost questions."
    />
  );
}
