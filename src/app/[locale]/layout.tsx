import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { GoogleTag } from "@/components/GoogleTag";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  const languageAlternates = Object.fromEntries(
    routing.locales.map((l) => [
      l,
      l === routing.defaultLocale ? "/" : `/${l}`,
    ]),
  );

  return {
    metadataBase: new URL(siteConfig.domain),
    title: {
      default: t("title"),
      template: `%s — ${siteConfig.brandName}`,
    },
    description: t("description"),
    keywords: t("keywords"),
    applicationName: siteConfig.brandName,
    authors: [{ name: siteConfig.ownerName, url: siteConfig.domain }],
    creator: siteConfig.ownerName,
    publisher: siteConfig.brandName,
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: languageAlternates,
    },
    openGraph: {
      type: "website",
      locale: locale === "it" ? "it_IT" : "en_US",
      url: locale === routing.defaultLocale ? "/" : `/${locale}`,
      siteName: siteConfig.brandName,
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: siteConfig.brandName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "geo.region": "IT-45",
      "geo.placename": "Cesena, Rimini, Pesaro, Ravenna, Bologna",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <GoogleTag />
      <JsonLd locale={locale as "it" | "en"} />
      <div className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
