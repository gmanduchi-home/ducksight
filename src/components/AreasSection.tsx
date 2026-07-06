import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export function AreasSection() {
  const t = useTranslations("Areas");

  return (
    <section id="areas" className="relative bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="text-[1.05rem] uppercase tracking-[0.3em] text-teal">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-3 text-4xl leading-[1.05] text-ink md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-base text-ink/65 md:text-lg">
              {t("subtitle")}
            </p>
          </div>

          <ul
            className="grid grid-cols-2 gap-3 md:col-span-7 md:grid-cols-3 md:gap-4"
            aria-label={t("title")}
          >
            {siteConfig.serviceAreas.map((area) => (
              <li
                key={area.name}
                className="group relative flex items-start gap-3 rounded-xl border border-ink/10 bg-cream-50 p-4 transition-colors hover:border-teal/40 md:p-5"
              >
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                  strokeWidth={1.5}
                />
                <div>
                  <div className="font-display text-lg leading-tight text-ink md:text-xl">
                    {area.name}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-ink/55">
                    {area.region} · {area.code}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
