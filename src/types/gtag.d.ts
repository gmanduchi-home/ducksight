export {};

declare global {
  interface Window {
    /** dataLayer di Google gtag/GTM. */
    dataLayer?: unknown[];
    /** Google tag main function. */
    gtag?: (...args: unknown[]) => void;
    /** Helper Google: spara conversion generica poi naviga (max 2s timeout). */
    gtagSendEvent?: (url: string) => boolean;
    /** Click-to-call conversion (AW-18233564262/zSweCIWxjL8cEOa4uPZD, 1 EUR). */
    gtag_report_conversion?: (url?: string) => boolean;
  }
}
