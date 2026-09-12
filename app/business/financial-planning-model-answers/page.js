import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Financial Planning Model Answers | Business | Revvy Learn',
  description: 'Annotated model answers for Edexcel IAL Business financial planning (2.3.2). Two break-even questions: calculating the break-even point, and its usefulness for a start-up, with mark scheme breakdowns and commentary on what earns the marks.',
  alternates: { canonical: '/business/financial-planning-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Financial Planning Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Business financial planning questions.',
    url: 'https://revvylearn.com/business/financial-planning-model-answers',
  },
};

export default function FinancialPlanningModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="2.2"
        sectionId="financial-planning"
      subject="business"
      backLink={{ href: '/business/unit-2', label: 'Unit 2: Managing Business Activities' }}
      title="Financial Planning Model Answers"
      subtitle="Section 2.3.2 — Annotated model answers for <strong>break-even analysis</strong>: calculating the break-even point, and how useful it is for a start-up."
    />
  );
}
