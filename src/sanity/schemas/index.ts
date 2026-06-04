import type { SchemaTypeDefinition } from "sanity";
import { projectSchema } from "./project";
import { serviceSchema } from "./service";
import { siteSettingsSchema } from "./siteSettings";
import { videoSchema } from "./video";

export const schemaTypes: SchemaTypeDefinition[] = [
  projectSchema,
  serviceSchema,
  videoSchema,
  siteSettingsSchema,
];
