"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { useLocale } from "next-intl";
import type { Project } from "@/data/projects";
import { Lightbox } from "./Lightbox";

type Props = {
  project: Project;
  index: number;
};

const accentBg: Record<NonNullable<Project["accent"]>, string> = {
  teal: "from-teal/60 via-teal/40 to-cream",
  beak: "from-beak/60 via-beak/30 to-cream",
  ink: "from-ink/70 via-ink/40 to-cream",
};

export function ProjectCard({ project, index }: Props) {
  const locale = useLocale() as "it" | "en";
  const accent = project.accent ?? "teal";
  const hasCover = !!project.cover && project.cover.startsWith("/");
  const gallery = project.gallery ?? (hasCover ? [project.cover] : []);
  const canOpen = gallery.length > 0;
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
        className="group relative flex flex-col"
      >
        <button
          type="button"
          onClick={() => canOpen && setOpen(true)}
          disabled={!canOpen}
          aria-label={`${project.title[locale]} — apri gallery`}
          className="relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ink/5 md:aspect-[3/4] disabled:cursor-default"
        >
          {hasCover ? (
            <Image
              src={project.cover}
              alt={project.title[locale]}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${accentBg[accent]}`}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
              />
            </>
          )}

          {hasCover && (
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/60 to-transparent" />
          )}

          <div className="absolute left-5 top-5 font-display text-sm text-cream drop-shadow">
            {String(index + 1).padStart(2, "0")} / {project.year}
          </div>

          {gallery.length > 1 && (
            <div className="absolute right-5 top-5 rounded-full bg-cream/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-ink">
              {gallery.length} foto
            </div>
          )}

          {/* Hover overlay: zoom icon */}
          {canOpen && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/95 text-ink shadow-lg">
                <Maximize2 className="h-6 w-6" strokeWidth={1.75} />
              </div>
            </div>
          )}
        </button>

        <div className="mt-5 flex flex-col gap-2">
          <div className="text-[11px] uppercase tracking-[0.2em] text-teal">
            {project.category[locale]}
          </div>
          <h3 className="font-display text-2xl leading-tight text-ink md:text-3xl">
            {project.title[locale]}
          </h3>
          <p className="text-sm text-ink/65 md:text-base">
            {project.excerpt[locale]}
          </p>
        </div>
      </motion.article>

      {open && (
        <Lightbox
          images={gallery}
          title={project.title[locale]}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
