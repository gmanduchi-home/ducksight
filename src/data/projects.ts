export type Project = {
  slug: string;
  year: number;
  duration?: string;
  category: { it: string; en: string };
  title: { it: string; en: string };
  excerpt: { it: string; en: string };
  cover: string;
  /** Path alle foto della galleria del progetto (relative a /public). */
  gallery?: string[];
  accent?: "teal" | "beak" | "ink";
};

export const projects: Project[] = [
  {
    slug: "alchemist-ale",
    year: 2026,
    category: { it: "Brand · Birra artigianale", en: "Brand · Craft beer" },
    title: { it: "Alchemist Ale", en: "Alchemist Ale" },
    excerpt: {
      it: "Reportage di una serata in birreria: lattine illustrate, spillatura, mani. Una storia di simboli e calore.",
      en: "An evening at the brewery: illustrated cans, taps, hands. A story of symbols and warmth.",
    },
    cover: "/projects/alchemist-ale/PANG8168.webp",
    gallery: [
      "/projects/alchemist-ale/PANG8168.webp",
      "/projects/alchemist-ale/PANG8174.webp",
      "/projects/alchemist-ale/PANG8177.webp",
      "/projects/alchemist-ale/PANG8179.webp",
      "/projects/alchemist-ale/PANG8191.webp",
      "/projects/alchemist-ale/PANG8193.webp",
      "/projects/alchemist-ale/PANG8204.webp",
      "/projects/alchemist-ale/PANG8227.webp",
      "/projects/alchemist-ale/Foto 2026-04-03 101508_1.1.1.webp",
      "/projects/alchemist-ale/IMG_20260328_194723.webp",
      "/projects/alchemist-ale/IMG_20260328_194853.webp",
      "/projects/alchemist-ale/IMG_20260328_203220.webp",
    ],
    accent: "beak",
  },
  {
    slug: "maternity",
    year: 2026,
    category: { it: "Ritratto · Maternity", en: "Portrait · Maternity" },
    title: { it: "L'attesa", en: "The wait" },
    excerpt: {
      it: "Un servizio maternity nel campo, all'ora dorata. Il tempo che si dilata mentre la luce si abbassa.",
      en: "A maternity shoot in the field at golden hour. Time stretching while the light goes low.",
    },
    cover: "/projects/maternity/PANG8454.webp",
    gallery: [
      "/projects/maternity/PANG8454.webp",
      "/projects/maternity/PANG8456.webp",
      "/projects/maternity/PANG8463.webp",
      "/projects/maternity/PANG8465.webp",
      "/projects/maternity/PANG8467.webp",
      "/projects/maternity/PANG8472.webp",
      "/projects/maternity/PANG8501.webp",
      "/projects/maternity/PANG8503.webp",
      "/projects/maternity/PANG8505.webp",
      "/projects/maternity/PANG8540.webp",
      "/projects/maternity/PANG8549.webp",
      "/projects/maternity/PANG8563.webp",
      "/projects/maternity/PANG8569.webp",
      "/projects/maternity/PANG8575.webp",
      "/projects/maternity/PANG8581.webp",
    ],
    accent: "teal",
  },
  {
    slug: "outdoor",
    year: 2025,
    category: { it: "Paesaggio · Outdoor", en: "Landscape · Outdoor" },
    title: { it: "Strada di campagna", en: "Country road" },
    excerpt: {
      it: "Una strada bianca al mattino tardo. Quello che la luce d'autunno riesce ancora a raccontare.",
      en: "A white road in late morning. What autumn light can still tell.",
    },
    cover: "/projects/outdoor/PANG7409_mod.webp",
    gallery: [
      "/projects/outdoor/PANG7409_mod.webp",
      "/projects/outdoor/PANG7412_mod.webp",
      "/projects/outdoor/PANG7416_mod.webp",
    ],
    accent: "ink",
  },
  {
    slug: "self-portrait",
    year: 2025,
    category: { it: "Autoritratto", en: "Self-portrait" },
    title: { it: "Self-Portrait", en: "Self-Portrait" },
    excerpt: {
      it: "Una serie di autoritratti in bianco e nero. Lo sguardo dietro la camera che diventa soggetto.",
      en: "A series of black and white self-portraits. The gaze behind the camera that becomes the subject.",
    },
    cover: "/projects/self-portrait/PANG8059.webp",
    gallery: [
      "/projects/self-portrait/PANG8055.webp",
      "/projects/self-portrait/PANG8059.webp",
      "/projects/self-portrait/PANG8068.webp",
      "/projects/self-portrait/PANG8075.webp",
      "/projects/self-portrait/PANG8079.webp",
      "/projects/self-portrait/PANG8097.webp",
    ],
    accent: "ink",
  },
];
