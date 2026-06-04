import { defineField, defineType } from "sanity";
import { Film } from "lucide-react";
import { localizedString } from "./localized";

export const videoSchema = defineType({
  name: "video",
  title: "Video YouTube",
  type: "document",
  icon: Film,
  fields: [
    localizedString("title", "Titolo"),
    defineField({
      name: "youtubeId",
      title: "ID YouTube",
      type: "string",
      description:
        'Solo l\'ID, non l\'URL intera. Es. da https://youtu.be/AbC1234 metti "AbC1234".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Formato",
      type: "string",
      options: {
        list: [
          { title: "Video standard (16:9)", value: "video" },
          { title: "Short (9:16)", value: "short" },
        ],
        layout: "radio",
      },
      initialValue: "video",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Anno",
      type: "number",
      validation: (Rule) => Rule.min(2000).max(2100),
    }),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
      initialValue: 0,
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
      youtubeId: "youtubeId",
      type: "type",
      year: "year",
    },
    prepare({ title, youtubeId, type, year }) {
      return {
        title: title || "(senza titolo)",
        subtitle: [year, type, youtubeId].filter(Boolean).join(" · "),
      };
    },
  },
});
