import { defineField, defineType } from "sanity";
import { Film } from "lucide-react";
import {
  localizedString,
  localizedText,
  localizedPortableText,
} from "./localized";

export const projectSchema = defineType({
  name: "project",
  title: "Storie / Progetti",
  type: "document",
  icon: Film,
  fields: [
    localizedString("title", "Titolo"),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: "title.it",
        maxLength: 80,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Anno",
      type: "number",
      validation: (Rule) => Rule.required().min(2000).max(2100),
    }),
    defineField({
      name: "duration",
      title: "Durata (es. 12:40)",
      type: "string",
    }),
    localizedString("category", "Categoria"),
    localizedText("excerpt", "Estratto (1-2 righe)", 3),
    defineField({
      name: "cover",
      title: "Cover (immagine)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "videoUrl",
      title: "URL video (Vimeo / YouTube)",
      type: "url",
      description: "Link diretto al video. Preferire Vimeo per portfolio.",
    }),
    defineField({
      name: "accent",
      title: "Accento colore",
      type: "string",
      options: {
        list: [
          { title: "Teal (papera)", value: "teal" },
          { title: "Beak (becco)", value: "beak" },
          { title: "Ink (nero)", value: "ink" },
        ],
        layout: "radio",
      },
      initialValue: "teal",
    }),
    localizedPortableText("body", "Testo lungo / Storia completa"),
    defineField({
      name: "featured",
      title: "In evidenza in home",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Ordine (asc, opzionale)",
      type: "number",
      description:
        "Se vuoto i progetti sono ordinati per anno decrescente.",
    }),
  ],
  orderings: [
    {
      title: "Manuale (Ordine)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Anno (recenti prima)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title.it",
      subtitle: "category.it",
      year: "year",
      media: "cover",
    },
    prepare({ title, subtitle, year, media }) {
      return {
        title: title || "(senza titolo)",
        subtitle: [year, subtitle].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
