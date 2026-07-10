export type Video = {
  /** ID YouTube del video (parte dopo watch?v= o /shorts/). Es: "dQw4w9WgXcQ". */
  youtubeId: string;
  /** Tipo di formato — i shorts hanno aspect 9:16, i video standard 16:9. */
  type: "short" | "video";
  title: { it: string; en: string };
  /** Anno opzionale per ordinamento / display. */
  year?: number;
  /**
   * Path opzionale a un poster/copertina custom (in /public).
   * Se assente, si usa la thumbnail automatica di YouTube (i.ytimg.com/vi/…).
   */
  poster?: string;
};

/**
 * Lista video YouTube embeddati nella sezione "Reel & Video".
 * Per aggiungere un nuovo video: prendi l'ID dall'URL YouTube (es. "AbC1234XyZ")
 * e aggiungilo qui. Quando Sanity sarà popolato, questi sono il fallback statico.
 *
 * Canale: https://www.youtube.com/@theducksight.studio
 */
export const videos: Video[] = [
  {
    youtubeId: "Bi6NN4BxfGQ",
    type: "video",
    title: {
      it: "FOGGY — Quando il rumore della mente si dissolve nel silenzio della natura",
      en: "FOGGY — When the noise of the mind dissolves into the silence of nature",
    },
    year: 2026,
    poster: "/covers/foggy.webp",
  },
  {
    youtubeId: "I7iuIhDiiCM",
    type: "video",
    title: {
      it: "Making a Stage Fencing Show — Dietro le quinte dei Pendragon Stage Fighters",
      en: "Making a Stage Fencing Show — Behind the scenes of the Pendragon Stage Fighters",
    },
    year: 2026,
    poster: "/covers/pendragon.webp",
  },
  {
    youtubeId: "RdwguYNewqQ",
    type: "video",
    title: {
      it: "Alchemist Ale Fest — Mamma Mia Café, Imola",
      en: "Alchemist Ale Fest — Mamma Mia Café, Imola",
    },
    year: 2026,
    poster: "/covers/alchemist.webp",
  },
  {
    youtubeId: "s22AN8f8h9M",
    type: "video",
    title: {
      it: "Achille Marozzo — Dallo studio alla spada",
      en: "Achille Marozzo — From the study to the sword",
    },
    year: 2026,
    poster: "/covers/achille-marozzo.webp",
  },
  {
    youtubeId: "ZxzTQr2dVPQ",
    type: "video",
    title: {
      it: "Showfight — On-camera presenter",
      en: "Showfight — On-camera presenter",
    },
    year: 2026,
    poster: "/covers/showfight.webp",
  },
  {
    youtubeId: "Tpia217fqO4",
    type: "video",
    title: {
      it: "Making of Short Movie",
      en: "Making of Short Movie",
    },
    year: 2026,
    poster: "/covers/making-of.webp",
  },
];
