import Link from 'next/link';

export const metadata = {
  title: 'Contact — Revvy Learn',
  description: 'Get in touch with the Revvy Learn team.',
};

export default function ContactPage() {
  return (
    <div className="resource-page">
      <div className="resource-page-header">
        <Link href="/" className="resource-back-link">&larr; Back to App</Link>
        <h1 className="resource-page-title">Contact</h1>
        <p className="resource-page-subtitle">
          Get in touch with the Revvy Learn team.
        </p>
      </div>
      <div className="contact-content">
        <div className="contact-card">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <div>
              <div className="contact-item-label">Email</div>
              <a href="mailto:hello@revvylearn.com" className="contact-item-value contact-link">
                hello@revvylearn.com
              </a>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📸</span>
            <div>
              <div className="contact-item-label">Instagram</div>
              <a
                href="https://instagram.com/revvylearn"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item-value contact-link"
              >
                @revvylearn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
