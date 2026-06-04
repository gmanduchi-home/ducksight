import { getLocale } from "next-intl/server";
import "./globals.css";

/**
 * Root layout di Next.js — definisce <html> e <body>, obbligatorio per il build.
 * Locale letto via next-intl (default "it" sulle route esterne all'i18n come /studio).
 * I children passano poi attraverso:
 *  - [locale]/layout.tsx → Provider next-intl + Header + Footer (rotte sito)
 *  - studio/[[...tool]]/page.tsx → Sanity Studio full-page (no chrome del sito)
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="font-sans bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
