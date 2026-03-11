import "./globals.css";
import { createClient } from '@/lib/supabase/server';
import { AuthProvider } from '@/components/AuthProvider';

export const metadata = {
  title: "Revvy Learn — Edexcel Economics Revision",
  description: "Comprehensive revision app for Edexcel International AS Level Economics covering Units 1 & 2",
};

export default async function RootLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider initialUser={user}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
