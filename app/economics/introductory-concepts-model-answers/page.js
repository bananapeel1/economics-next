import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL Introductory Concepts Model Answers | Economics | Revvy Learn',
  description: 'Free annotated model answers for Edexcel IAL Economics introductory concepts (1.3.1). Covers scarcity, opportunity cost, and the basic economic problem with mark scheme breakdowns and examiner tips.',
  alternates: { canonical: '/economics/introductory-concepts-model-answers' },
  openGraph: {
    title: 'Edexcel IAL Introductory Concepts Model Answers | Revvy Learn',
    description: 'Step-by-step model answers for Edexcel IAL Economics scarcity and opportunity cost questions.',
    url: 'https://revvylearn.com/economics/introductory-concepts-model-answers',
  },
};

export default function IntroductoryConceptsModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="1.3.1"
      subject="economics"
      backLink={{ href: '/economics/unit-1', label: 'Unit 1: Markets in Action' }}
      title="Introductory Concepts Model Answers"
      subtitle="Section 1.3.1 — Annotated model answers for <strong>scarcity</strong>, <strong>opportunity cost</strong>, and the basic economic problem."
    />
  );
}
