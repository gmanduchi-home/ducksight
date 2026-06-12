import Script from "next/script";
import { siteConfig } from "@/config/site";

/**
 * Google tag (gtag.js) — Google Ads conversion tracking.
 * Caricato con strategy "afterInteractive" così non blocca il first paint.
 * Renderizzato solo se siteConfig.googleTagId è valorizzato.
 * Incluso solo nelle rotte pubbliche del sito, NON nello Studio /studio
 * (vedi src/app/[locale]/layout.tsx).
 *
 * Espone anche `window.gtagSendEvent(url)` — helper "delayed navigation"
 * fornito da Google: spara una conversion e poi naviga (max 2s timeout).
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
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
      <Script id="gtag-send-event" strategy="afterInteractive">
        {`
          window.gtagSendEvent = function (url) {
            var callback = function () {
              if (typeof url === 'string') {
                window.location = url;
              }
            };
            window.gtag('event', 'ads_conversion_Prenotazione_appuntamen_1', {
              event_callback: callback,
              event_timeout: 2000,
            });
            return false;
          };
        `}
      </Script>
    </>
  );
}
