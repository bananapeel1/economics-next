import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Macroeconomic Policies Model Answers | Economics | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Economics macroeconomic policies (2.3.6). Covers fiscal policy, monetary policy, interest rates, and inflation with mark scheme breakdowns and examiner commentary.',
  alternates: { canonical: '/economics/macroeconomic-policies-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Macroeconomic Policies Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Economics macroeconomic policy questions — 8 and 20-mark essays.',
    url: 'https://revvylearn.com/economics/macroeconomic-policies-model-answers',
  },
};

export default function MacroeconomicPoliciesModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="2.3.6"
      subject="economics"
      backLink={{ href: '/economics/unit-2', label: 'Unit 2: Macroeconomic Performance' }}
      title="Macroeconomic Policies Model Answers"
      subtitle="Section 2.3.6 — Annotated model answers for <strong>fiscal vs monetary policy</strong>, interest rates, inflation, and unemployment questions."
    />
  );
}
