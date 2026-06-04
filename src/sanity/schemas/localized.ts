import { defineField } from "sanity";

/** Campo testo bilingue IT/EN — un oggetto con due fields obbligatori. */
export function localizedString(name: string, title: string, required = true) {
  return defineField({
    name,
    title,
    type: "object",
    options: { columns: 2 },
    fields: [
      defineField({
        name: "it",
        title: "🇮🇹 Italiano",
        type: "string",
        validation: required ? (Rule) => Rule.required() : undefined,
      }),
      defineField({
        name: "en",
        title: "🇬🇧 English",
        type: "string",
        validation: required ? (Rule) => Rule.required() : undefined,
      }),
    ],
  });
}

/** Campo testo lungo (textarea) bilingue IT/EN. */
export function localizedText(name: string, title: string, rows = 3) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "it",
        title: "🇮🇹 Italiano",
        type: "text",
        rows,
      }),
      defineField({
        name: "en",
        title: "🇬🇧 English",
        type: "text",
        rows,
      }),
    ],
  });
}

/** Rich text (PortableText) bilingue IT/EN. */
export function localizedPortableText(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "it",
        title: "🇮🇹 Italiano",
        type: "array",
        of: [{ type: "block" }],
      }),
      defineField({
        name: "en",
        title: "🇬🇧 English",
        type: "array",
        of: [{ type: "block" }],
      }),
    ],
  });
}
