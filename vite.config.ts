import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { prerenderSeo } from "./scripts/prerender-seo.mjs";

/**
 * Plugin de prerender SEO/GEO: após o build, gera um index.html estático por
 * rota (com title/description/canonical/OG/JSON-LD embutidos) dentro do outDir.
 * Roda em QUALQUER `vite build` — inclusive no preset da Vercel — então não
 * depende de o build chamar o script via npm. Falhas são apenas avisadas.
 */
function prerenderSeoPlugin() {
  let outDir = "";
  return {
    name: "rdc-prerender-seo",
    apply: "build" as const,
    configResolved(config: { build: { outDir: string } }) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      try {
        prerenderSeo(outDir);
      } catch (e) {
        console.warn(`[prerender] ignorado: ${(e as Error)?.message || e}`);
      }
    },
  };
}

const plugins = [react(), tailwindcss(), jsxLocPlugin(), prerenderSeoPlugin()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
