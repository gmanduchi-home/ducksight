import { useTranslations } from "next-intl";
import { DuckLogo } from "./DuckLogo";
import { siteConfig } from "@/config/site";

export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-cream-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8 md:py-16">
        <div className="flex items-start gap-4">
          <DuckLogo size={64} className="h-14 w-14 shrink-0 rounded-full" />
          <div>
            <div className="font-display text-xl leading-tight">
              The Duck Sight Studio
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-ink/60">
              {t("tagline")}
            </div>
            <div className="mt-2 max-w-xs text-xs text-ink/55">
              {t("areas")}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm text-ink/70 md:items-end">
          <div className="flex flex-wrap gap-5 md:justify-end">
            <a
              href={`tel:${siteConfig.phone.intl}`}
              className="hover:text-teal"
            >
              {siteConfig.phone.display}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-teal"
            >
              Email
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal"
            >
              Instagram
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal"
            >
              YouTube
            </a>
            <a
              href={siteConfig.social.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal"
            >
              Linktree
            </a>
          </div>
          <div className="text-xs text-ink/50">
            © {year} Giulia Repetto — {t("rights")}
          </div>
        </div>
      </div>
    </footer>
  );
}
