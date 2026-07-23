"use client";

import type { MouseEvent } from "react";

/** Evento conversion generico Google Ads — sparato su ogni CTA contatto. */
const EVENT_GENERIC = "ads_conversion_Prenotazione_appuntamen_1";

/**
 * Conversion Google Ads sparate sui contatti "hot" (tel/whatsapp/email).
 * L'array è ordinato: la prima è quella storica click-to-call, le successive
 * sono conversion aggiuntive (nuove campagne Ads, remarketing, ecc.).
 * L'ULTIMA riceve il callback + timeout per il delayed navigation; le altre
 * sono fire-and-forget parallel.
 */
const CONVERSIONS: Array<Record<string, unknown>> = [
  {
    send_to: "AW-18233564262/zSweCIWxjL8cEOa4uPZD",
    value: 1.0,
    currency: "EUR",
  },
  {
    send_to: "AW-18233564262/77_7CKWhrdUcEOa4uPZD",
    value: 1.0,
    currency: "EUR",
    transaction_id: "",
  },
];

type Options = {
  /** Se true: il link apre in nuova tab (target="_blank") — fire-and-forget eventi. */
  newTab?: boolean;
  /** Se true: spara anche le conversion click-to-call/contact (vale 1 EUR ciascuna). */
  reportConversion?: boolean;
};

/**
 * onClick handler che spara conversion Google Ads quando l'utente clicca
 * un link di contatto, prima di seguire il link.
 *
 * Eventi sparati:
 *  - sempre: `ads_conversion_Prenotazione_appuntamen_1` (generico)
 *  - se reportConversion: tutte le conversion in CONVERSIONS[]
 *
 * Navigazione:
 *  - tel: / mailto: / link same-tab → "delayed navigation" (callback sull'ULTIMA
 *    conversion o 2s timeout — così tutte fanno in tempo a partire)
 *  - link esterni target=_blank → nuova tab si apre subito, eventi fire-and-forget
 *
 * Fallback se gtag non disponibile (ad-blocker, primo paint): link funziona col
 * suo behavior naturale, eventi persi.
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
      // Sparo le conversion in parallelo, senza preventDefault.
      if (typeof gtag === "function" && opts.reportConversion) {
        for (const conv of CONVERSIONS) {
          gtag("event", "conversion", conv);
        }
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
      // Sparo tutte le conversion, il callback è agganciato all'ULTIMA
      // (così tutte le altre partono prima e non blocchiamo la nav > 2s).
      for (let i = 0; i < CONVERSIONS.length; i++) {
        const isLast = i === CONVERSIONS.length - 1;
        gtag("event", "conversion", {
          ...CONVERSIONS[i],
          ...(isLast
            ? { event_callback: navigate, event_timeout: 2000 }
            : {}),
        });
      }
    } else {
      // Solo evento generico → uso quello per il delayed nav
      gtag("event", EVENT_GENERIC, {
        event_callback: navigate,
        event_timeout: 2000,
      });
    }
  };
}
