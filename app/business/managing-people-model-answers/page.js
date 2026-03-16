import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Managing People Model Answers | Business | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Business managing people (1.4). Covers motivation theories, recruitment, and workforce planning with mark scheme breakdowns and examiner tips.',
  alternates: { canonical: '/business/managing-people-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Managing People Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Business motivation and recruitment questions.',
    url: 'https://revvylearn.com/business/managing-people-model-answers',
  },
};

export default function ManagingPeopleModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="1.4"
      subject="business"
      backLink={{ href: '/business/unit-1', label: 'Unit 1: Marketing & People' }}
      title="Managing People Model Answers"
      subtitle="Section 1.4 — Annotated model answers for <strong>Maslow's hierarchy</strong>, motivation theories, and recruitment approaches."
    />
  );
}
