export {};

declare global {
  interface Window {
    /** dataLayer di Google gtag/GTM. */
    dataLayer?: unknown[];
    /** Google tag main function. */
    gtag?: (...args: unknown[]) => void;
    /** Helper di Google: spara conversion poi naviga (max 2s timeout). */
    gtagSendEvent?: (url: string) => boolean;
  }
}
