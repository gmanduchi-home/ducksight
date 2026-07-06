"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DuckLogo } from "./DuckLogo";

const navItems = [
  { key: "videos", href: "/#videos" },
  { key: "work", href: "/#work" },
  { key: "services", href: "/#services" },
  { key: "about", href: "/#about" },
  { key: "contact", href: "/#contact" },
] as const;

export function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <Link
          href="/"
          locale={locale as "it" | "en"}
          className="flex items-center gap-3"
          aria-label="The Duck Sight Studio — home"
        >
          <DuckLogo size={48} priority className="h-10 w-10 rounded-full md:h-12 md:w-12" />
          <span className="font-display text-base leading-none tracking-tight md:text-lg">
            The Duck Sight
            <span className="block text-[10px] uppercase tracking-[0.2em] text-ink/60 md:text-xs">
              Studio
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-teal"
            >
              {t(item.key)}
            </a>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink/5 bg-cream md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 font-display text-2xl text-ink transition-colors hover:bg-ink/5"
              >
                {t(item.key)}
              </a>
            ))}
            <div className="mt-2 border-t border-ink/10 pt-4">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
