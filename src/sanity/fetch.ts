import { sanityClient } from "./client";
import { isSanityConfigured } from "./env";
import { projectsQuery, videosQuery } from "./queries";
import type { Project } from "@/data/projects";
import { projects as fallbackProjects } from "@/data/projects";
import type { Video } from "@/data/videos";
import { videos as fallbackVideos } from "@/data/videos";

type SanityProject = {
  _id: string;
  slug: string;
  title: { it: string; en: string };
  excerpt?: { it?: string; en?: string };
  category?: { it?: string; en?: string };
  year: number;
  duration?: string;
  cover?: unknown;
  videoUrl?: string;
  accent?: "teal" | "beak" | "ink";
};

/**
 * Carica i progetti dal CMS. Se Sanity non è configurato (es. dev locale senza
 * .env.local) o se la query fallisce, ricade sui dati statici di src/data/projects.ts
 * per mantenere il sito sempre renderizzabile.
 */
export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return fallbackProjects;

  try {
    const data = await sanityClient.fetch<SanityProject[]>(projectsQuery);
    if (!data || data.length === 0) return fallbackProjects;

    return data.map((p) => ({
      slug: p.slug,
      year: p.year,
      duration: p.duration,
      category: {
        it: p.category?.it ?? "",
        en: p.category?.en ?? "",
      },
      title: p.title,
      excerpt: {
        it: p.excerpt?.it ?? "",
        en: p.excerpt?.en ?? "",
      },
      // Quando ci sarà la cover Sanity la useremo via urlForImage().
      // Per ora: se non c'è cover, lasciamo stringa vuota e il componente userà il gradient.
      cover: "",
      accent: p.accent ?? "teal",
    }));
  } catch (err) {
    console.warn("[sanity] getProjects failed, using fallback:", err);
    return fallbackProjects;
  }
}

type SanityVideo = {
  _id: string;
  youtubeId: string;
  type: "video" | "short";
  title: { it: string; en: string };
  year?: number;
};

/** Carica i video YouTube dal CMS, con fallback a src/data/videos.ts. */
export async function getVideos(): Promise<Video[]> {
  if (!isSanityConfigured) return fallbackVideos;

  try {
    const data = await sanityClient.fetch<SanityVideo[]>(videosQuery);
    if (!data || data.length === 0) return fallbackVideos;
    return data.map((v) => ({
      youtubeId: v.youtubeId,
      type: v.type,
      title: v.title,
      year: v.year,
    }));
  } catch (err) {
    console.warn("[sanity] getVideos failed, using fallback:", err);
    return fallbackVideos;
  }
}
