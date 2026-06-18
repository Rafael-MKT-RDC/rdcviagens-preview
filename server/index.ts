import express from "express";
import { createServer } from "http";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing.
  // Serve o index.html PRÉ-RENDERIZADO da rota (gerado por scripts/prerender-seo.mjs),
  // que já traz title/description/canonical/OG/JSON-LD no HTML inicial — importante
  // para crawlers/IA sem JavaScript (SEO/GEO). Se não houver, cai no index.html raiz (SPA).
  app.get("*", (req, res) => {
    const routePath = req.path.replace(/\/+$/, "");
    if (routePath && !routePath.includes(".")) {
      const prerendered = path.join(staticPath, routePath, "index.html");
      if (existsSync(prerendered)) {
        return res.sendFile(prerendered);
      }
    }
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
