"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { videos as fallbackVideos, type Video } from "@/data/videos";

type Props = {
  /** Video da Sanity (opzionale). Se vuoto si usa la lista statica. */
  videos?: Video[];
};

export function VideoSection({ videos: fromCMS }: Props) {
  const t = useTranslations("Videos");
  const locale = useLocale() as "it" | "en";
  const list = fromCMS && fromCMS.length > 0 ? fromCMS : fallbackVideos;

  if (list.length === 0) {
    // Sezione mostrata anche vuota, con CTA al canale — utile per scoprire il canale
    return (
      <section id="videos" className="relative bg-cream-50 py-20 md:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <p className="text-[1.05rem] uppercase tracking-[0.3em] text-teal">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[1.05] text-ink md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-ink/65 md:text-lg">
            {t("emptyState")}
          </p>
          <a
            href="https://www.youtube.com/@theducksight.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-transform hover:-translate-y-0.5"
          >
            <ExternalLink className="h-4 w-4" />
            {t("ctaChannel")}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="videos" className="relative bg-cream-50 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <p className="text-[1.05rem] uppercase tracking-[0.3em] text-teal">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-3 text-4xl leading-[1.05] text-ink md:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-base text-ink/65 md:text-lg">
              {t("subtitle")}
            </p>
          </div>
          <a
            href="https://www.youtube.com/@theducksight.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/40 hover:bg-ink/5 md:self-end"
          >
            <ExternalLink className="h-4 w-4" />
            {t("ctaChannel")}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {list.map((v, i) => (
            <VideoCard key={v.youtubeId} video={v} index={i} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({
  video,
  index,
  locale,
}: {
  video: Video;
  index: number;
  locale: "it" | "en";
}) {
  // Pattern "facade": carico solo la thumbnail finché l'utente non clicca.
  // Riduce drasticamente il peso pagina (un iframe YT pesa ~500KB).
  const [activated, setActivated] = useState(false);

  const aspect = video.type === "short" ? "aspect-[9/16]" : "aspect-video";
  // Cover custom (poster) se presente, altrimenti thumbnail automatica YouTube.
  const thumb =
    video.poster && video.poster.startsWith("/")
      ? video.poster
      : `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  const isCustomPoster = !!video.poster && video.poster.startsWith("/");
  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className="flex flex-col gap-3"
    >
      <div
        className={`group relative overflow-hidden rounded-2xl bg-ink/5 ${aspect}`}
      >
        {activated ? (
          <iframe
            src={embedUrl}
            title={video.title[locale]}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActivated(true)}
            aria-label={`Play: ${video.title[locale]}`}
            className="absolute inset-0 h-full w-full cursor-pointer"
          >
            <Image
              src={thumb}
              alt={video.title[locale]}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized={!isCustomPoster}
            />
          </button>
        )}
      </div>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg leading-tight text-ink md:text-xl">
          {video.title[locale]}
        </h3>
        {video.year && (
          <span className="shrink-0 text-xs uppercase tracking-wider text-ink/55">
            {video.year}
          </span>
        )}
      </div>
    </motion.article>
  );
}
