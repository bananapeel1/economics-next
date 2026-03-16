import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Government Intervention Model Answers | Economics | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Economics government intervention (1.3.6). Covers indirect taxes, subsidies, regulation, and correcting market failure with mark scheme breakdowns.',
  alternates: { canonical: '/economics/government-intervention-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Government Intervention Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Economics government intervention questions.',
    url: 'https://revvylearn.com/economics/government-intervention-model-answers',
  },
};

export default function GovernmentInterventionModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="1.3.6"
      subject="economics"
      backLink={{ href: '/economics/unit-1', label: 'Unit 1: Markets in Action' }}
      title="Government Intervention Model Answers"
      subtitle="Section 1.3.6 — Annotated model answers for <strong>indirect taxes</strong>, subsidies, and government intervention to correct market failure."
    />
  );
}
