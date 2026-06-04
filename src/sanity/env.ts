// Variabili di ambiente Sanity — leggono da .env.local (vedi .env.local.example).
// In dev senza credenziali settate, i client cadono in fallback: i componenti devono
// gestire il caso "Sanity non configurato" leggendo dai dati statici di src/data/.

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

export const studioUrl = "/studio";

/** True se l'app è stata configurata con credenziali Sanity reali. */
export const isSanityConfigured = projectId.length > 0;
