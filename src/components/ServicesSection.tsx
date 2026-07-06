import { useTranslations } from "next-intl";
import { Film, BookOpen, Mic } from "lucide-react";

const services = [
  { key: "videomaking", Icon: Film },
  { key: "research", Icon: BookOpen },
  { key: "voice", Icon: Mic },
] as const;

export function ServicesSection() {
  const t = useTranslations("Services");

  return (
    <section id="services" className="relative bg-cream-50 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-teal">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[1.05] text-ink md:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-ink/65 md:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {services.map(({ key, Icon }) => (
            <article
              key={key}
              className="group relative flex flex-col gap-4 rounded-2xl border border-ink/10 bg-cream p-7 transition-colors hover:border-teal/40 md:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-cream">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl leading-tight text-ink">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-sm text-ink/70 md:text-base">
                {t(`items.${key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
