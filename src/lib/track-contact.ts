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

/**
 * True se il device può davvero fare una telefonata.
 *
 * Su desktop il click su `tel:` apre Skype/FaceTime e l'utente chiude subito:
 * conterebbe come conversione senza che nessuna chiamata parta. Il link resta
 * cliccabile su ogni device — qui decidiamo solo se contarlo come conversione.
 */
function canPlaceCall(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  if (
    /Android|iPhone|iPod|Windows Phone|webOS|BlackBerry|Opera Mini|IEMobile/i.test(
      navigator.userAgent,
    )
  ) {
    return true;
  }

  // iPad e tablet moderni: si dichiarano desktop nello UA, li riconosciamo
  // dal puntatore "coarse" (dito) più la presenza di touch.
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches &&
    navigator.maxTouchPoints > 0
  );
}

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
 * Regole:
 *  - i link `tel:` contano come conversione SOLO da mobile/tablet (vedi
 *    canPlaceCall) — su desktop il link funziona ma non genera eventi
 *  - `mailto:` e altri same-tab → "delayed navigation": naviga sul callback di
 *    gtag, con timeout di sicurezza a 2s
 *  - link esterni target=_blank (WhatsApp) → la nuova tab si apre subito col
 *    behavior nativo (niente popup blocker), evento fire-and-forget
 *
 * Fallback se gtag non è disponibile (ad-blocker, click prima del primo paint):
 * il link funziona col suo behavior naturale, l'evento va perso.
 */
export function trackContactClick(href: string, opts: Options = {}) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    const gtag = typeof window !== "undefined" ? window.gtag : undefined;
    const isTelLink = href.startsWith("tel:");

    const shouldTrack =
      typeof gtag === "function" &&
      !!opts.reportConversion &&
      (!isTelLink || canPlaceCall());

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
