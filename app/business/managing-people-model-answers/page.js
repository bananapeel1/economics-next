import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Managing People Model Answers | Business | Revvy Learn',
  description: 'Annotated model answers for Edexcel IAL Business managing people (1.3.4). Covers Maslow\'s hierarchy, internal versus external recruitment, and financial incentives, with mark scheme breakdowns and examiner commentary.',
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
      sectionNumber="1.3.4"
        sectionId="managing-people"
      subject="business"
      backLink={{ href: '/business/unit-1', label: 'Unit 1: Marketing & People' }}
      title="Managing People Model Answers"
      subtitle="Section 1.3.4 — Annotated model answers for <strong>Maslow's hierarchy</strong>, motivation theories, and recruitment approaches."
    />
  );
}
