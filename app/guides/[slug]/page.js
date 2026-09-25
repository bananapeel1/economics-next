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

function StatRow({ stats }) {
  return (
    <div className="guide-stats">
      {stats.map((stat, i) => (
        <div key={i} className="guide-stat">
          <b>{stat.value}</b>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * How a paper's 80 marks divide, drawn to scale.
 *
 * The most useful fact on the Economics guide is that the source booklet
 * outweighs the essays, and it was buried in a table cell. One scale across all
 * four bars, so the comparison is the thing you see rather than something you
 * work out.
 */
function MarksChart({ chart }) {
  return (
    <figure className="guide-marks">
      <div className="guide-marks-legend">
        {chart.legend.map((item, i) => (
          <span key={i} className="guide-marks-key">
            <i className={`guide-marks-swatch s${item.key}`} aria-hidden="true" />
            {item.name}
          </span>
        ))}
      </div>
      {chart.units.map((unit, i) => (
        <div key={i} className="guide-marks-row">
          <div className="guide-marks-name">{unit.label}</div>
          <div className="guide-marks-bar">
            {unit.segments.map((seg, j) => (
              <div
                key={j}
                className={`guide-marks-seg s${seg.key}`}
                style={{ width: `${(seg.marks / chart.total) * 100}%` }}
              >
                <span>{seg.marks}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {chart.caption && <figcaption>{chart.caption}</figcaption>}
    </figure>
  );
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
      <div className="guide-layout">
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

      <div className="guide-main">
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
              {section.stats && <StatRow stats={section.stats} />}
              {section.marksChart && <MarksChart chart={section.marksChart} />}
              {section.list && (
                <ul className="guide-list">
                  {section.list.map((item, j) => (
                    <li key={j}>{renderProse(item)}</li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div className="guide-table-wrap">
                  <table className="guide-table">
                    {section.table.caption && <caption>{section.table.caption}</caption>}
                    <thead>
                      <tr>
                        {section.table.head.map((cell, j) => (
                          <th key={j} scope="col">{cell}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, j) => (
                        <tr key={j}>
                          {row.map((cell, k) => (
                            k === 0
                              ? <th key={k} scope="row">{renderProse(cell)}</th>
                              : <td key={k}>{renderProse(cell)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
      </div>
    </div>
  );
}
