import Link from 'next/link';
import { Headset } from '../../components/Icons';

export const metadata = {
  title: 'Contact Revvy Learn | Edexcel A-Level Revision Support',
  description: 'Get in touch with the Revvy Learn team. Questions about Edexcel International A-Level Economics or Business revision? We are here to help.',
  openGraph: {
    title: 'Contact Revvy Learn | Edexcel A-Level Revision Support',
    description: 'Get in touch with the Revvy Learn team for Edexcel IAL revision support.',
    url: 'https://revvylearn.com/contact',
  },
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
            <span className="contact-icon"><Headset size={24} /></span>
            <div>
              <div className="contact-item-label">Email</div>
              <a href="mailto:arongijsel@gmail.com" className="contact-item-value contact-link">
                arongijsel@gmail.com
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
