import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "#work", "#services", "#areas", "#about", "#contact"];

  return routing.locales.flatMap((locale) =>
    paths
      .filter((p) => !p.startsWith("#")) // hash routes non vanno nella sitemap
      .map((path) => {
        const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
        return {
          url: `${siteConfig.domain}${prefix}${path}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: path === "" ? 1.0 : 0.7,
          alternates: {
            languages: Object.fromEntries(
              routing.locales.map((l) => {
                const lp = l === routing.defaultLocale ? "" : `/${l}`;
                return [l, `${siteConfig.domain}${lp}${path}`];
              }),
            ),
          },
        };
      }),
  );
}
