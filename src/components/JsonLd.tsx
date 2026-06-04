import { siteConfig } from "@/config/site";

type Props = {
  locale: "it" | "en";
};

// Schema.org structured data — fondamentale per SEO locale (Google Business / knowledge panel).
// Renderizza un <script type="application/ld+json"> con LocalBusiness + Person.
export function JsonLd({ locale }: Props) {
  const description =
    locale === "it"
      ? "Studio di videomaking, video editing e creazione video. Documentari e storytelling visivo di Giulia Repetto. Attivo tra Cesena, Rimini, Pesaro, Ravenna e Bologna."
      : "A studio of videomaking, video editing and visual storytelling by Giulia Repetto. Operating across Emilia-Romagna and Marche, Italy.";

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.domain}/#business`,
        name: siteConfig.brandName,
        alternateName: "D.S.Studio",
        description,
        url: siteConfig.domain,
        image: `${siteConfig.domain}/og-image.jpg`,
        email: siteConfig.email,
        telephone: siteConfig.phone.intl,
        priceRange: "€€",
        founder: {
          "@type": "Person",
          "@id": `${siteConfig.domain}/#giulia`,
          name: siteConfig.ownerName,
          jobTitle:
            locale === "it"
              ? "Videomaker, visual storyteller, voice creator"
              : "Videomaker, visual storyteller, voice creator",
          sameAs: [siteConfig.social.instagram, siteConfig.social.linktree],
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.baseAddress.addressLocality,
          addressRegion: siteConfig.baseAddress.addressRegion,
          addressCountry: siteConfig.baseAddress.addressCountry,
        },
        areaServed: siteConfig.serviceAreas.map((a) => ({
          "@type": "City",
          name: a.name,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: a.region,
          },
        })),
        sameAs: [siteConfig.social.instagram, siteConfig.social.linktree],
        knowsAbout: [
          "videomaking",
          "creazione video",
          "video editing",
          "documentari",
          "storytelling visivo",
          "voice over",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "it" ? "Servizi" : "Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name:
                  locale === "it"
                    ? "Creazione video"
                    : "Video creation",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name:
                  locale === "it" ? "Video editing" : "Video editing",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name:
                  locale === "it"
                    ? "Documentari e storytelling"
                    : "Documentaries and storytelling",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name:
                  locale === "it"
                    ? "Voce narrante e on-camera"
                    : "Voice and on-camera",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.domain}/#website`,
        url: siteConfig.domain,
        name: siteConfig.brandName,
        inLanguage: locale === "it" ? "it-IT" : "en-US",
        publisher: { "@id": `${siteConfig.domain}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
