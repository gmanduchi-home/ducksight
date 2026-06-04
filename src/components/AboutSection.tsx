import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

export function AboutSection() {
  const t = useTranslations("About");

  return (
    <section id="about" className="relative bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-20 md:grid-cols-12 md:gap-16 md:px-8 md:py-32">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ink-soft">
            <Image
              src="/about/giulia.webp"
              alt="Giulia Repetto — ritratto"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover grayscale"
              priority
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/60 to-transparent" />
            <div className="absolute bottom-5 left-5 font-display text-lg text-cream">
              Giulia Repetto
            </div>
          </div>
        </div>

        <div className="md:col-span-7 md:pt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-beak-light">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[1.05] md:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-xl text-base text-cream/80 md:mt-8 md:text-lg">
            {t("body")}
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-cream hover:text-ink md:mt-10"
          >
            {t("cta")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
