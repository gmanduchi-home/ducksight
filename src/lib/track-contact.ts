"use client";

import type { MouseEvent } from "react";

/** Nome dell'evento di conversione Google Ads — coordinato col pannello Ads. */
const CONVERSION_EVENT = "ads_conversion_Prenotazione_appuntamen_1";

type Options = {
  /** Se true: il link apre in nuova tab (target="_blank") — fire-and-forget evento. */
  newTab?: boolean;
};

/**
 * onClick handler che spara una conversion Google Ads quando l'utente
 * clicca un link di contatto, prima di seguire il link.
 *
 * Comportamento:
 *  - tel: / mailto: / link same-tab → "delayed navigation" (callback gtag o 2s timeout)
 *  - link esterni con target=_blank → la nuova tab si apre subito (no popup blocker)
 *    e l'evento parte in parallelo, fire-and-forget
 *
 * Se gtag non è ancora caricato (ad-blocker, primo paint), il link funziona
 * comunque col suo behavior naturale.
 */
export function trackContactClick(href: string, opts: Options = {}) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    const gtag = typeof window !== "undefined" ? window.gtag : undefined;

    if (opts.newTab) {
      if (typeof gtag === "function") {
        gtag("event", CONVERSION_EVENT);
      }
      // No preventDefault: l'<a target="_blank"> apre la nuova tab da sé
      return;
    }

    if (typeof gtag !== "function") {
      return; // gtag non disponibile (ad-blocker?) — lascia il default browser behavior
    }

    e.preventDefault();
    const navigate = () => {
      window.location.href = href;
    };
    gtag("event", CONVERSION_EVENT, {
      event_callback: navigate,
      event_timeout: 2000,
    });
  };
}
