"use client";

import type { MouseEvent } from "react";

/** Evento conversion generico Google Ads — sparato su ogni CTA contatto. */
const EVENT_GENERIC = "ads_conversion_Prenotazione_appuntamen_1";

/** Click-to-call / write conversion specifica — solo tel/email/whatsapp (vale 1 EUR). */
const EVENT_CONVERSION_SEND_TO = "AW-18233564262/zSweCIWxjL8cEOa4uPZD";

type Options = {
  /** Se true: il link apre in nuova tab (target="_blank") — fire-and-forget eventi. */
  newTab?: boolean;
  /** Se true: spara anche la click-to-call/contact conversion (vale 1 EUR). */
  reportConversion?: boolean;
};

/**
 * onClick handler che spara conversion Google Ads quando l'utente clicca
 * un link di contatto, prima di seguire il link.
 *
 * Eventi sparati:
 *  - sempre: `ads_conversion_Prenotazione_appuntamen_1` (generico)
 *  - se reportConversion: anche `conversion` con send_to/value/currency
 *
 * Navigazione:
 *  - tel: / mailto: / link same-tab → "delayed navigation" (callback gtag o 2s)
 *  - link esterni target=_blank → nuova tab si apre subito, evento fire-and-forget
 *
 * Fallback se gtag non disponibile (ad-blocker, primo paint): link funziona col
 * suo behavior naturale, evento perso.
 */
export function trackContactClick(href: string, opts: Options = {}) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    const gtag = typeof window !== "undefined" ? window.gtag : undefined;

    // 1) Evento generico — sempre, fire-and-forget
    if (typeof gtag === "function") {
      gtag("event", EVENT_GENERIC);
    }

    if (opts.newTab) {
      // Link esterno con target=_blank: la nuova tab si apre col default behavior.
      // Sparo l'eventuale conversion in parallelo, senza preventDefault.
      if (typeof gtag === "function" && opts.reportConversion) {
        gtag("event", "conversion", {
          send_to: EVENT_CONVERSION_SEND_TO,
          value: 1.0,
          currency: "EUR",
        });
      }
      return;
    }

    // Same-tab (tel: / mailto:) — delayed navigation
    if (typeof gtag !== "function") {
      return; // gtag non disponibile: lascia il default browser behavior
    }

    e.preventDefault();
    const navigate = () => {
      window.location.href = href;
    };

    if (opts.reportConversion) {
      // Aspetto la conversion specifica (è quella con value/currency che importa misurare)
      gtag("event", "conversion", {
        send_to: EVENT_CONVERSION_SEND_TO,
        value: 1.0,
        currency: "EUR",
        event_callback: navigate,
        event_timeout: 2000,
      });
    } else {
      // Solo evento generico → uso quello per il delayed nav
      gtag("event", EVENT_GENERIC, {
        event_callback: navigate,
        event_timeout: 2000,
      });
    }
  };
}
