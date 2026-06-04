export const siteConfig = {
  domain: "https://theducksight.studio",
  brandName: "The Duck Sight Studio",
  ownerName: "Giulia Repetto",
  email: "hello@theducksight.studio",
  /** Numero in formato internazionale (per tel: link) e formato display (con spazi). */
  phone: {
    intl: "+393331929673",
    display: "+39 333 192 9673",
  },
  social: {
    instagram: "https://www.instagram.com/theducksight.studio/",
    linktree: "https://linktr.ee/theducksight.studio",
    youtube: "https://www.youtube.com/@theducksight.studio",
  },
  /** Province e città servite — usato sia per SEO locale (JSON-LD areaServed)
   *  sia per la sezione "Dove lavoro" della home. */
  serviceAreas: [
    { name: "Cesena", region: "Emilia-Romagna", code: "FC" },
    { name: "Rimini", region: "Emilia-Romagna", code: "RN" },
    { name: "Pesaro", region: "Marche", code: "PU" },
    { name: "Ravenna", region: "Emilia-Romagna", code: "RA" },
    { name: "Bologna", region: "Emilia-Romagna", code: "BO" },
  ],
  /** Base region (italiana) per indirizzo strutturato — Giulia confermerà comune esatto */
  baseAddress: {
    addressLocality: "Cesena",
    addressRegion: "Emilia-Romagna",
    addressCountry: "IT",
  },
} as const;

export type ServiceArea = (typeof siteConfig.serviceAreas)[number];
