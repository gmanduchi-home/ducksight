import { useTranslations } from "next-intl";
import { Phone, Mail, Camera, Link as LinkIcon } from "lucide-react";
import { siteConfig } from "@/config/site";

export function ContactSection() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="relative bg-cream py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-teal">
          {t("eyebrow")}
        </p>
        <h2 className="font-display mt-3 text-4xl leading-[1.05] text-ink md:text-7xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-ink/65 md:mt-8 md:text-lg">
          {t("body")}
        </p>

        {/* CTA primaria: telefono — il modo più diretto per conversione */}
        <div className="mt-10 md:mt-12">
          <a
            href={`tel:${siteConfig.phone.intl}`}
            className="inline-flex items-center gap-3 rounded-full bg-teal px-7 py-4 text-base font-medium text-cream shadow-lg shadow-teal/20 transition-all hover:-translate-y-0.5 hover:bg-teal-dark md:text-lg"
          >
            <Phone className="h-5 w-5" strokeWidth={2} />
            <span>
              <span className="md:hidden">{t("ctaPhone")}</span>
              <span className="hidden md:inline">
                {t("ctaPhone")} · {siteConfig.phone.display}
              </span>
            </span>
          </a>
          <div className="mt-3 text-xs text-ink/55 md:hidden">
            {siteConfig.phone.display}
          </div>
          <div className="mt-3 text-xs uppercase tracking-wider text-ink/50">
            {t("phoneNote")}
          </div>
        </div>

        {/* CTA secondarie */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/40 hover:bg-ink/5 md:w-auto"
          >
            <Mail className="h-4 w-4" />
            {t("ctaEmail")}
          </a>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/40 hover:bg-ink/5 md:w-auto"
          >
            <Camera className="h-4 w-4" />
            Instagram
          </a>
          <a
            href={siteConfig.social.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/40 hover:bg-ink/5 md:w-auto"
          >
            <LinkIcon className="h-4 w-4" />
            Linktree
          </a>
        </div>
      </div>
    </section>
  );
}
