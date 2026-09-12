import Script from 'next/script';
import "./globals.css";
import "@/styles/theme-night.css";
import { createClient } from '@/lib/supabase/server';
import { AuthProvider } from '@/components/AuthProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import AnalyticsEvents from '@/components/AnalyticsEvents';

export const metadata = {
  metadataBase: new URL('https://revvylearn.com'),
  alternates: {
    canonical: './',
    languages: { 'en': 'https://revvylearn.com' },
  },
  title: "Revvy Learn — Edexcel IAL Revision",
  description: "Free revision notes, diagrams and practice questions for Edexcel International A-Level Economics and Business. Flashcards, quizzes and the AI tutor unlock with Pro.",
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
    description: 'Interactive revision for Edexcel International A-Level Economics and Business. Notes, diagrams and practice questions are free. Flashcards, quizzes and the AI tutor unlock with Pro.',
    url: 'https://revvylearn.com',
    siteName: 'Revvy Learn',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Revvy Learn — Edexcel IAL Economics & Business Revision',
    description: 'Interactive revision for Edexcel International A-Level Economics and Business. Notes, diagrams and practice questions are free. Flashcards, quizzes and the AI tutor unlock with Pro.',
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
        {/* F118: the theme must be set before first paint or the page flashes. As a bare
            <script> in the component tree this tripped React's "script tag while rendering"
            path and contributed to a hydration failure on every load. next/script with
            beforeInteractive is the supported way to run something this early in the App
            Router, and it is injected into the initial HTML rather than rendered as a child. */}
        <Script id="revvy-theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',(t==='light'||t==='dark')?t:'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`}
        </Script>
        {process.env.NEXT_PUBLIC_ANALYTICS_SRC ? (
          <script
            defer
            src={process.env.NEXT_PUBLIC_ANALYTICS_SRC}
            data-domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
            data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID}
          />
        ) : null}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&family=DM+Serif+Display:ital@0;1&family=Archivo:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* F118: these JSON-LD blocks used to sit inside <head> in the component tree. In the App
            Router that makes the server and client markup disagree, so React logged "Encountered a
            script tag while rendering React component" and then failed hydration on every page
            load, discarding the server markup and re-rendering on the client. Next's documented
            placement for structured data is inside the body; search engines read it either way. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Revvy Learn",
            "url": "https://revvylearn.com",
            "description": "Revision platform for Edexcel International A-Level Economics and Business. Notes, diagrams and practice questions are free. Flashcards, quizzes and the AI tutor unlock with Pro.",
            "sameAs": ["https://instagram.com/revvylearn"],
            "offers": [
              {
                "@type": "Offer",
                "category": "Educational Resources",
                "name": "Free",
                "price": "0",
                "priceCurrency": "GBP",
                "description": "Edexcel IAL Economics and Business revision notes, diagrams and practice questions, with no subscription"
              },
              {
                "@type": "Offer",
                "category": "Educational Resources",
                "name": "Revvy Learn Pro",
                "description": "Subscription unlocking flashcards, quizzes and the AI tutor"
              }
            ]
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

        <ThemeProvider>
          <AuthProvider initialUser={user}>
            {children}
            <AnalyticsEvents />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
