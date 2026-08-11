"use client";

import type { MouseEvent } from "react";

/**
 * UNICA conversion Google Ads del sito.
 *
 * Prima ne sparavamo tre per click (un evento generico + due `conversion` con
 * label diverse): se in Ads erano tutte contate come conversioni, un solo click
 * reale ne valeva tre. Ora l'unica azione ufficiale è questa label.
 */
const CONVERSION = {
  send_to: "AW-18233564262/zSweCIWxjL8cEOa4uPZD",
  value: 1.0,
  currency: "EUR",
} as const;

type Options = {
  /** Se true: il link apre in nuova tab (target="_blank") — fire-and-forget. */
  newTab?: boolean;
  /** Se true: spara la conversion. Se false, il link non genera eventi. */
  reportConversion?: boolean;
};

/**
 * onClick handler che spara la conversion Google Ads quando l'utente clicca
 * un link di contatto (telefono / WhatsApp / email), prima di seguire il link.
 *
 * Navigazione:
 *  - tel: / mailto: (same-tab) → "delayed navigation": naviga sul callback di
 *    gtag, con timeout di sicurezza a 2s
 *  - link esterni target=_blank → la nuova tab si apre subito col behavior
 *    nativo (niente popup blocker), evento fire-and-forget
 *
 * Fallback se gtag non è disponibile (ad-blocker, click prima del primo paint):
 * il link funziona col suo behavior naturale, l'evento va perso.
 */
export function trackContactClick(href: string, opts: Options = {}) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    const gtag = typeof window !== "undefined" ? window.gtag : undefined;
    const shouldTrack = typeof gtag === "function" && opts.reportConversion;

    if (opts.newTab) {
      // La nuova tab si apre da sé: nessun preventDefault, evento in parallelo.
      if (shouldTrack) gtag!("event", "conversion", CONVERSION);
      return;
    }

    if (!shouldTrack) return; // niente da tracciare: default browser behavior

    e.preventDefault();
    gtag!("event", "conversion", {
      ...CONVERSION,
      event_callback: () => {
        window.location.href = href;
      },
      event_timeout: 2000,
    });
  };
}
