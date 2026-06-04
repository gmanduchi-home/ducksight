"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";

export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-cream-50 p-1 text-xs font-medium"
    >
      {routing.locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            disabled={isPending}
            onClick={() => {
              if (loc === locale) return;
              startTransition(() => {
                router.replace(pathname, { locale: loc });
              });
            }}
            className={`rounded-full px-3 py-1 uppercase tracking-wider transition-colors ${
              isActive
                ? "bg-ink text-cream"
                : "text-ink/70 hover:text-ink"
            }`}
            aria-pressed={isActive}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
