/**
 * Sanity Studio embedded — accessibile a /studio.
 * Pagina full-screen, esclusa dal middleware i18n (vedi src/middleware.ts).
 * Metadata e viewport sono esportati dal sibling layout.tsx (server component).
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
