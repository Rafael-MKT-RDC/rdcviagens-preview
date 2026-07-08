import { createClient } from "@sanity/client";

// Leitura pública (read-only, sem token). Mesmo projeto/dataset do preview atual.
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "zb2hrfwb",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
