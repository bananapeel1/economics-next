import SectionModelAnswersPage from '@/components/SectionModelAnswersPage';

export const metadata = {
  title: 'Edexcel IAL The Market Model Answers | Business | Revvy Learn',
  description: 'Annotated model answer for Edexcel IAL Business The Market (1.3.2): primary market research, with the mark scheme broken down band by band and commentary on what scores.',
  alternates: { canonical: '/business/the-market-model-answers' },
  openGraph: {
    title: 'Edexcel IAL The Market Model Answers | Revvy Learn',
    description: 'A step-by-step model answer for Edexcel IAL Business primary market research, with the mark scheme broken down band by band.',
    url: 'https://revvylearn.com/business/the-market-model-answers',
  },
};

export default function TheMarketModelAnswersPage() {
  return (
    <SectionModelAnswersPage
      sectionNumber="1.2"
        sectionId="the-market"
      subject="business"
      backLink={{ href: '/business/unit-1', label: 'Unit 1: Marketing & People' }}
      title="The Market Model Answers"
      subtitle="Section 1.3.2 — An annotated model answer on <strong>primary market research</strong>, with the mark scheme broken down band by band."
    />
  );
}
