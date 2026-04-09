import Link from 'next/link';
import guidesData from '@/data/guidesData';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return guidesData.map(guide => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = guidesData.find(g => g.slug === slug);
  if (!guide) return { title: 'Guide Not Found | Revvy Learn' };

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `https://revvylearn.com/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `https://revvylearn.com/guides/${guide.slug}`,
      type: 'article',
    },
  };
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const guide = guidesData.find(g => g.slug === slug);
  if (!guide) notFound();

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://revvylearn.com' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://revvylearn.com/guides' },
      { '@type': 'ListItem', position: 3, name: guide.title },
    ],
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    'name': guide.title,
    'description': guide.metaDescription,
    'url': `https://revvylearn.com/guides/${guide.slug}`,
    'educationalLevel': 'Advanced Level',
    'learningResourceType': 'Study Guide',
    'inLanguage': 'en-GB',
    'isAccessibleForFree': true,
    'provider': {
      '@type': 'EducationalOrganization',
      'name': 'Revvy Learn',
      'url': 'https://revvylearn.com',
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.sections.slice(0, 4).map(section => ({
      '@type': 'Question',
      name: section.heading.endsWith('?') ? section.heading : `What is ${section.heading.toLowerCase()} in A-Level ${guide.subject === 'economics' ? 'Economics' : 'Business'}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: section.content.slice(0, 300),
      },
    })),
  };

  return (
    <div className="resource-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="resource-page-header">
        <Link href="/guides" className="resource-back-link">&larr; All Guides</Link>
        <span className="seo-unit-badge">{guide.subject === 'economics' ? 'Economics' : 'Business'} Guide</span>
        <h1 className="resource-page-title">{guide.title}</h1>
        <p className="resource-page-subtitle">{guide.heroSubtitle}</p>
      </div>

      {/* Hero CTA */}
      <div className="seo-hero-cta">
        <div className="seo-hero-cta-content">
          <div className="seo-hero-cta-text">
            <span className="seo-hero-cta-label">Interactive Revision</span>
            <p>Flashcards, quizzes, AI tutor &amp; progress tracking for this topic</p>
          </div>
          <Link href={`/${guide.subject}`} className="seo-hero-cta-button">
            Open in App &rarr;
          </Link>
        </div>
      </div>

      {/* Table of contents */}
      <nav style={{ marginBottom: '32px', padding: '20px', background: 'var(--card-bg, #1a1a2e)', borderRadius: '8px', border: '1px solid var(--border, #2a2a3e)' }}>
        <div style={{ fontWeight: 600, marginBottom: '12px', color: 'var(--text-primary, #fff)' }}>In this guide:</div>
        <ol style={{ paddingLeft: '20px', margin: 0 }}>
          {guide.sections.map((section, i) => (
            <li key={i} style={{ marginBottom: '6px' }}>
              <a href={`#section-${i}`} style={{ color: 'var(--text-secondary, #bbb)', textDecoration: 'none' }}>
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Guide content */}
      <div className="seo-stepper">
        {guide.sections.map((section, i) => (
          <div key={i} className="seo-stepper-step" id={`section-${i}`}>
            <div className="seo-stepper-rail">
              <div className="seo-stepper-node">{i + 1}</div>
              {i < guide.sections.length - 1 && <div className="seo-stepper-line" />}
            </div>
            <div className="seo-stepper-body">
              <h2>{section.heading}</h2>
              <p style={{ lineHeight: 1.7, color: 'var(--text-secondary, #ccc)' }}>{section.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Related topics */}
      {guide.relatedTopics && guide.relatedTopics.length > 0 && (
        <div className="seo-related-links" style={{ marginTop: '32px' }}>
          <h2>Related Topics</h2>
          <div className="seo-links-grid">
            {guide.relatedTopics.map((topic, i) => (
              <Link key={i} href={topic.href}>{topic.title}</Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="seo-cta" style={{ marginTop: '32px' }}>
        <h2>Master This Topic Interactively</h2>
        <p>Use flashcards, quizzes and the AI tutor to nail your understanding.</p>
        <Link href={`/${guide.subject}`} className="seo-cta-button">Start Revising &rarr;</Link>
      </div>
    </div>
  );
}
