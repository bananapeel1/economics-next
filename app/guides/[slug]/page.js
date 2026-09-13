import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
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

// Section prose carries `[label](/path)` links so concepts can point at the topic
// page that teaches them. Only site-relative paths are accepted — an external
// href simply will not match, so nothing in the data can emit an outbound link.
const INLINE_LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

function renderProse(text) {
  const out = [];
  let cursor = 0;
  for (const match of text.matchAll(INLINE_LINK)) {
    if (match.index > cursor) out.push(text.slice(cursor, match.index));
    out.push(
      <Link key={match.index} href={match[2]} className="guide-inline-link">
        {match[1]}
      </Link>
    );
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}

function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
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
    ...(guide.published ? { 'datePublished': guide.published } : {}),
    ...(guide.updated ? { 'dateModified': guide.updated } : {}),
    'provider': {
      '@type': 'EducationalOrganization',
      'name': 'Revvy Learn',
      'url': 'https://revvylearn.com',
    },
  };

  return (
    <div className="resource-page rl-night">
      <SiteHeader crumb="Guides" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <div className="guide-shell">
      <div className="resource-page-header">
        <Link href="/guides" className="resource-back-link">&larr; All Guides</Link>
        <span className="seo-unit-badge">{guide.subject === 'economics' ? 'Economics' : 'Business'} Guide</span>
        <h1 className="resource-page-title">{guide.title}</h1>
        <p className="resource-page-subtitle">{guide.heroSubtitle}</p>
        {guide.updated && (
          <p className="guide-updated">
            Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
          </p>
        )}
      </div>

      {/* Hero CTA */}
      {guide.heroCta && (
        <div className="seo-hero-cta">
          <div className="seo-hero-cta-content">
            <div className="seo-hero-cta-text">
              <p>{guide.heroCta.blurb}</p>
            </div>
            <Link href={guide.heroCta.href} className="seo-hero-cta-button">
              {guide.heroCta.label} &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Table of contents */}
      <nav className="guide-toc" aria-label="In this guide">
        <div className="guide-toc-title">In this guide:</div>
        <ol>
          {guide.sections.map((section, i) => (
            <li key={i}>
              <a href={`#section-${i}`}>{section.heading}</a>
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
              <p>{renderProse(section.content)}</p>
              {section.cta && (
                <Link href={section.cta.href} className="guide-inline-cta">
                  {section.cta.label}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Related topics */}
      {guide.relatedTopics && guide.relatedTopics.length > 0 && (
        <div className="seo-related-links">
          <h2>Related Topics</h2>
          <div className="seo-links-grid">
            {guide.relatedTopics.map((topic, i) => (
              <Link key={i} href={topic.href}>{topic.title}</Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      {guide.closingCta && (
        <div className="seo-cta">
          <h2>{guide.closingCta.heading}</h2>
          <p>{guide.closingCta.blurb}</p>
          <Link href={guide.closingCta.href} className="seo-cta-button">
            {guide.closingCta.label} &rarr;
          </Link>
        </div>
      )}
      </div>
    </div>
  );
}
