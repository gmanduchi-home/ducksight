import { defineField, defineType } from "sanity";
import { Briefcase } from "lucide-react";
import { localizedString, localizedText } from "./localized";

export const serviceSchema = defineType({
  name: "service",
  title: "Servizi",
  type: "document",
  icon: Briefcase,
  fields: [
    defineField({
      name: "key",
      title: "Chiave (identificatore interno)",
      type: "string",
      options: {
        list: [
          { title: "Videomaking", value: "videomaking" },
          { title: "Editing", value: "editing" },
          { title: "Voice", value: "voice" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    localizedString("title", "Titolo"),
    localizedText("body", "Descrizione", 4),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Ordine",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title.it",
      subtitle: "key",
    },
  },
});
