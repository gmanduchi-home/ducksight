"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  images: string[];
  title: string;
  /** Indice della foto da mostrare per prima. */
  initialIndex?: number;
  onClose: () => void;
};

/**
 * Lightbox a tutto schermo per le gallery progetto.
 * - Tastiera: ESC chiude · ←/→ naviga
 * - Mobile: swipe (gestito via touchstart/touchend)
 * - Body scroll lock mentre aperto
 * - Portal su document.body (z-index/overflow safe)
 */
export function Lightbox({
  images,
  title,
  initialIndex = 0,
  onClose,
}: Props) {
  const [index, setIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Gallery");

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    setMounted(true);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  // Swipe touch handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const delta = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(delta) > 50) {
      if (delta > 0) prev();
      else next();
    }
    setTouchStart(null);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={onClose}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between px-5 py-4 md:px-8 md:py-5">
          <div className="min-w-0 text-cream">
            <div className="font-display truncate text-base md:text-lg">
              {title}
            </div>
            <div className="text-xs uppercase tracking-wider text-cream/60">
              {t("counter", {
                current: index + 1,
                total: images.length,
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label={t("close")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 md:h-12 md:w-12"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main image area */}
        <div
          className="relative flex-1 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
            >
              <Image
                src={images[index]}
                alt={`${title} — ${index + 1}/${images.length}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label={t("prev")}
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/25 md:left-6 md:h-14 md:w-14"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={t("next")}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/25 md:right-6 md:h-14 md:w-14"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip (desktop) */}
        {images.length > 1 && (
          <div
            className="hidden shrink-0 border-t border-cream/10 px-8 py-4 md:block"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="no-scrollbar flex justify-center gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md transition-all ${
                    i === index
                      ? "ring-2 ring-cream opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                  aria-label={`${i + 1}`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
