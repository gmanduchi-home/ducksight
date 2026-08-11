import Script from "next/script";
import { siteConfig } from "@/config/site";

/**
 * Google tag (gtag.js) — Google Ads conversion tracking.
 * Caricato con strategy "afterInteractive" così non blocca il first paint.
 * Renderizzato solo se siteConfig.googleTagId è valorizzato.
 * Incluso solo nelle rotte pubbliche del sito, NON nello Studio /studio.
 *
 * Espone su window:
 *  - gtag                        — funzione base
 *  - gtag_report_conversion(url) — conversion click-to-call (1 EUR), helper
 *                                  ufficiale Google con delayed navigation
 *
 * NB: l'unica azione di conversione attiva è AW-18233564262/zSweCIWxjL8cEOa4uPZD
 * (vedi src/lib/track-contact.ts).
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
      <Script id="gtag-report-conversion" strategy="afterInteractive">
        {`
          window.gtag_report_conversion = function (url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            window.gtag('event', 'conversion', {
              send_to: 'AW-18233564262/zSweCIWxjL8cEOa4uPZD',
              value: 1.0,
              currency: 'EUR',
              event_callback: callback
            });
            return false;
          };
        `}
      </Script>
    </>
  );
}
