import "./globals.css";
import { createClient } from '@/lib/supabase/server';
import { AuthProvider } from '@/components/AuthProvider';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata = {
  metadataBase: new URL('https://revvylearn.com'),
  alternates: {
    canonical: './',
    languages: { 'en': 'https://revvylearn.com' },
  },
  title: "Revvy Learn — Edexcel IAL Revision",
  description: "Free revision notes, flashcards, past papers, model answers and AI tutor for Edexcel International A-Level Economics and Business.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'SUCgmkz_aRMbcTiUDxOGBJfzifJo7yY2a3muEdY9Zbw',
  },
  openGraph: {
    title: 'Revvy Learn — Edexcel IAL Economics & Business Revision',
    description: 'Free interactive revision for Edexcel International A-Level Economics and Business. Notes, flashcards, quizzes, past papers and AI tutor.',
    url: 'https://revvylearn.com',
    siteName: 'Revvy Learn',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Revvy Learn — Edexcel IAL Economics & Business Revision',
    description: 'Free interactive revision for Edexcel International A-Level Economics and Business. Notes, flashcards, quizzes, past papers and AI tutor.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default async function RootLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Revvy Learn",
            "url": "https://revvylearn.com",
            "description": "Free revision platform for Edexcel International A-Level Economics and Business with interactive notes, flashcards, quizzes, past papers and AI tutor.",
            "sameAs": ["https://instagram.com/revvylearn"],
            "offers": {
              "@type": "Offer",
              "category": "Educational Resources",
              "description": "Edexcel IAL Economics and Business revision with interactive notes, flashcards, quizzes, and AI tutor"
            }
          })}}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Revvy Learn",
            "url": "https://revvylearn.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://revvylearn.com/glossary?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}}
        />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              var t = localStorage.getItem('theme');
              if (t === 'light' || t === 'dark') {
                document.documentElement.setAttribute('data-theme', t);
              } else {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            } catch(e) {
              document.documentElement.setAttribute('data-theme', 'dark');
            }
          })();
        `}} />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider initialUser={user}>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
