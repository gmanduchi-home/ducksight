"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative isolate overflow-hidden">
      {/* Sfondo gradiente decorativo — sostituire con <video> loop quando disponibile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream-50 to-cream-200" />
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-teal/30 blur-3xl md:h-[720px] md:w-[720px]"
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 2.4, ease: "easeOut", delay: 0.2 }}
          className="absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full bg-beak/30 blur-3xl md:h-[640px] md:w-[640px]"
        />
        {/* Grain texture — molto leggera */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
          }}
        />
      </div>

      <div className="mx-auto flex min-h-[88dvh] max-w-7xl flex-col justify-between px-5 pb-12 pt-16 md:px-8 md:pb-16 md:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-xs uppercase tracking-[0.3em] text-teal md:text-sm"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="font-display mt-8 max-w-5xl text-[clamp(2.5rem,8vw,7.5rem)] font-light leading-[0.95] tracking-tight text-ink"
        >
          {t("title")}{" "}
          <span className="italic text-teal">{t("titleAccent")}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-base text-ink/75 md:text-lg">
            {t("lede")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-transform hover:-translate-y-0.5"
            >
              {t("ctaWork")}
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/40 hover:bg-ink/5"
            >
              {t("ctaContact")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
