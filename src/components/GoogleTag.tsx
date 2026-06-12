import Script from "next/script";
import { siteConfig } from "@/config/site";

/**
 * Google tag (gtag.js) — Google Ads conversion tracking.
 * Caricato con strategy "afterInteractive" così non blocca il first paint.
 * Renderizzato solo se siteConfig.googleTagId è valorizzato.
 * Incluso solo nelle rotte pubbliche del sito, NON nello Studio /studio
 * (vedi src/app/[locale]/layout.tsx).
 */
export function GoogleTag() {
  const id = siteConfig.googleTagId;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
