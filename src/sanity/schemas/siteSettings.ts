import { defineField, defineType } from "sanity";
import { Settings } from "lucide-react";
import {
  localizedString,
  localizedText,
} from "./localized";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Impostazioni sito",
  type: "document",
  icon: Settings,
  // Singleton: una sola istanza
  fields: [
    defineField({
      name: "title",
      title: "Nome studio",
      type: "string",
      initialValue: "The Duck Sight Studio",
      readOnly: true,
    }),
    localizedString("heroEyebrow", "Hero — Eyebrow (sopra-titolo)"),
    localizedString("heroTitle", "Hero — Titolo (parte fissa)"),
    localizedString("heroTitleAccent", "Hero — Titolo (parte in corsivo)"),
    localizedText("heroLede", "Hero — Sottotitolo descrittivo", 3),
    localizedText("aboutBody", "About — Testo dello studio", 6),
    defineField({
      name: "portrait",
      title: "Foto ritratto Giulia (sezione About)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "showreel",
      title: "URL showreel (Vimeo, opzionale)",
      type: "url",
    }),
    defineField({
      name: "email",
      title: "Email di contatto",
      type: "string",
      initialValue: "hello@theducksight.studio",
    }),
    defineField({
      name: "instagram",
      title: "URL Instagram",
      type: "url",
    }),
    defineField({
      name: "linktree",
      title: "URL Linktree",
      type: "url",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Impostazioni sito" };
    },
  },
});
