import "./globals.css";

export const metadata = {
  title: "Economics IAS — Edexcel Revision",
  description: "Comprehensive revision app for Edexcel International AS Level Economics covering Units 1 & 2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
