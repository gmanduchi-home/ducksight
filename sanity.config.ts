import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  name: "default",
  title: "The Duck Sight Studio — CMS",
  projectId: projectId || "placeholder",
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenuti")
          .items([
            // Singleton: una sola istanza di siteSettings
            S.listItem()
              .title("Impostazioni sito")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.divider(),
            S.documentTypeListItem("project").title("Storie / Progetti"),
            S.documentTypeListItem("video").title("Video YouTube"),
            S.documentTypeListItem("service").title("Servizi"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
