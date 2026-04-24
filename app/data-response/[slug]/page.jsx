import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MarkdownPage from '@/components/MarkdownPage';
import '../markdown-page.css';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'data-response');

const PIECES = {
  'econ-u1-market-failure': {
    subject: 'Economics · Unit 1',
    shortTitle: 'Market Failure',
    description: 'Free Edexcel IAL Economics Unit 1 data-response practice on market failure. UAE plastics charge and GCC sugar-tax stimulus, 2/6/10-mark ladder with KAA+E model answers.',
  },
  'econ-u1-demand-elasticity': {
    subject: 'Economics · Unit 1',
    shortTitle: 'Demand Elasticity',
    description: 'Free Edexcel IAL Economics Unit 1 data-response practice on PED, YED and XED. India telecoms pricing stimulus with model answers and examiner commentary.',
  },
  'econ-u1-price-determination': {
    subject: 'Economics · Unit 1',
    shortTitle: 'Price Determination',
    description: 'Free Edexcel IAL Economics Unit 1 data-response practice on price determination, equilibrium and surplus. Red Sea and Panama Canal shipping disruption stimulus.',
  },
  'bus-u1-marketing-mix': {
    subject: 'Business · Unit 1',
    shortTitle: 'Marketing Mix',
    description: 'Free Edexcel IAL Business Unit 1 data-response practice on the marketing mix, PLC and Boston Matrix. BYD Gulf expansion stimulus with KAA+E model answers.',
  },
  'bus-u1-meeting-customer-needs': {
    subject: 'Business · Unit 1',
    shortTitle: 'Meeting Customer Needs',
    description: 'Free Edexcel IAL Business Unit 1 data-response practice on segmentation and niche vs mass markets. Shein/Temu vs Modanisa stimulus with model answers.',
  },
  'bus-u1-the-market': {
    subject: 'Business · Unit 1',
    shortTitle: 'The Market',
    description: 'Free Edexcel IAL Business Unit 1 data-response practice on demand, supply and elasticity. Ozempic/Wegovy shortage stimulus with KAA+E model answers.',
  },
};

export async function generateStaticParams() {
  return Object.keys(PIECES).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const piece = PIECES[slug];
  if (!piece) return { title: 'Not Found | Revvy Learn' };

  const title = `${piece.shortTitle} — IAL Data-Response Practice | Revvy Learn`;
  const canonical = `https://revvylearn.com/data-response/${slug}`;
  return {
    title,
    description: piece.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: piece.description,
      url: canonical,
      type: 'article',
    },
  };
}

export default async function DataResponsePage({ params }) {
  const { slug } = await params;
  const piece = PIECES[slug];
  if (!piece) notFound();

  let content;
  try {
    content = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), 'utf-8');
  } catch {
    notFound();
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://revvylearn.com' },
      { '@type': 'ListItem', position: 2, name: 'Data Response', item: 'https://revvylearn.com/data-response' },
      { '@type': 'ListItem', position: 3, name: piece.shortTitle },
    ],
  };

  const learningResourceLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: `${piece.shortTitle} — IAL Data-Response Practice`,
    description: piece.description,
    url: `https://revvylearn.com/data-response/${slug}`,
    educationalLevel: 'Advanced Level',
    learningResourceType: 'Practice Questions',
    teaches: piece.shortTitle,
    inLanguage: 'en-GB',
    isAccessibleForFree: true,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Revvy Learn',
      url: 'https://revvylearn.com',
    },
  };

  return (
    <div className="data-response-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceLd) }}
      />

      <nav className="data-response-crumbs">
        <Link href="/">Home</Link> &rsaquo;{' '}
        <Link href="/data-response">Data Response</Link> &rsaquo; {piece.shortTitle}
      </nav>

      <MarkdownPage content={content} />

      <div className="data-response-footer">
        <Link href="/data-response">All data-response practice</Link>
        <Link href="/economics">Economics notes</Link>
        <Link href="/business">Business notes</Link>
        <Link href="/model-answers">Model Answers</Link>
        <Link href="/command-words">Command Words</Link>
      </div>
    </div>
  );
}
